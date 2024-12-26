<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StokOpnameController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 10;
        $invoice = DB::table('stok_opname')->where('no_invoice', 'like', '%' . $search . '%')->orWhere('opname_date', 'like', '%' . $search . '%')->paginate($paginate);
        return Inertia::render('Stokopname/index', [
            'invoicestok' => $invoice,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }
    public function viewOpname(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 10;

        $produk = Product::leftJoin('pemiliks', 'pemiliks.id', '=', 'produks.pemilik_id')
            ->leftJoin(DB::raw('(
            SELECT b.id_produk, SUM(b.qty_debit) as debit, SUM(b.qty_kredit) as kredit
            FROM stok_produk as b
            GROUP BY b.id_produk
        ) as b'), 'b.id_produk', '=', 'produks.id')
            ->selectRaw('produks.* ,pemiliks.pemilik, (COALESCE(b.debit, 0) - COALESCE(b.kredit, 0)) as stok_akhir')
            ->where('nama_produk', 'like', '%' . $search . '%')->orWhere('kd_produk', 'like', '%' . $search . '%')->orWhere('harga', 'like', '%' . $search . '%')->orderBy('id', 'desc')->paginate($paginate);

        return Inertia::render('Stokopname/viewopname', [
            'produk' => $produk,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }
}
