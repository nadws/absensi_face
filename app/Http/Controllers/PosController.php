<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 8;
        $kategori = $request->kat;


        if ($kategori == null || $kategori == 'null') {
            $produk = DB::table('produks as a')
                ->selectRaw('
                    a.id,
                    a.nama_produk,
                    (COALESCE(a.stok, 0) + COALESCE(b.debit, 0) - COALESCE(b.kredit, 0)) as stok,
                    a.harga, a.foto
                ')
                ->leftJoin(DB::raw('(
                    SELECT b.id_produk, SUM(b.qty_debit) as debit, SUM(b.qty_kredit) as kredit
                    FROM stok_produk as b
                    GROUP BY b.id_produk
                ) as b'), 'b.id_produk', '=', 'a.id')
                ->where('nama_produk', 'like', '%' . $search . '%')->orderBy('nama_produk', 'asc')->paginate(8);
        } else {
            $produk = DB::table('produks as a')
                ->selectRaw('
                    a.id,
                    a.nama_produk,
                    (COALESCE(a.stok, 0) + COALESCE(b.debit, 0) - COALESCE(b.kredit, 0)) as stok,
                    a.harga, a.foto
                ')
                ->leftJoin(DB::raw('(
                    SELECT b.id_produk, SUM(b.qty_debit) as debit, SUM(b.qty_kredit) as kredit
                    FROM stok_produk as b
                    GROUP BY b.id_produk
                ) as b'), 'b.id_produk', '=', 'a.id')
                ->where('nama_produk', 'like', '%' . $search . '%')->orderBy('nama_produk', 'asc')
                ->where('pemilik_id', $kategori)
                ->paginate(8);
        }

        return Inertia::render('Pos/index', [
            'data' => [
                'produk' => $produk,
                'pemilik' => DB::table('pemiliks')->get()
            ],

            'filters' => [
                'search' => $search,
                'paginate' => $paginate,
                'kategori' => $kategori
            ],
        ]);
    }

    public function payment(Request $request)
    {
        $urutan = DB::selectOne("SELECT MAX(urutan) as urutan FROM invoice");
        if (empty($urutan->urutan)) {
            $no_invoice = 'INV-1001';
        } else {
            $no_invoice = 'INV-' . ($urutan->urutan + 1);
        }

        return Inertia::render('Pos/payment', [
            'no_invoice' => $no_invoice
        ]);
    }
}
