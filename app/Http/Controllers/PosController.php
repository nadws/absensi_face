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
            'no_invoice' => $no_invoice,
            'kategori' => DB::table('kategori_pembayaran')->get(),
            'akun' => DB::table('akun_pembayaran')->get()
        ]);
    }

    public function save_payment(Request $request)
    {

        $urutan = DB::selectOne("SELECT MAX(urutan) as urutan FROM invoice");
        if (empty($urutan->urutan)) {
            $no_invoice = 'INV-1001';
            $urutan = 1001;
        } else {
            $no_invoice = 'INV-' . ($urutan->urutan + 1);
            $urutan = $urutan->urutan + 1;
        }
        $ttl_rp = 0;
        for ($i = 0; $i < count($request->id_produk); $i++) {
            $produk = DB::table('produks')->where('id', $request->id_produk[$i])->first();
            $data = [
                'id_produk' => $request->id_produk[$i],
                'no_invoice' => $no_invoice,
                'qty_debit' => 0,
                'qty_kredit' => 1,
                'ttl_rp' => $produk->harga,
                'status' => 'keluar',
                'admin' => auth()->user()->name,
                'created_at' => now(),
                'created_at' => now(),
            ];
            DB::table('stok_produk')->insert($data);
            $ttl_rp += $produk->harga;
        }
        $data_invoice = [
            'tgl_invoice' => now(),
            'no_invoice' => $no_invoice,
            'ttl_rp' => $ttl_rp,
            'admin' => auth()->user()->name,
            'urutan' => $urutan,
            'created_at' => now(),
            'created_at' => now(),
        ];
        DB::table('invoice')->insert($data_invoice);
        return redirect()->route('pos')->with('success', 'Pembayaran Berhasil');
    }
}
