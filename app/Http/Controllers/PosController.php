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
            $produk = DB::table('produks')->where('nama_produk', 'like', '%' . $search . '%')->orderBy('nama_produk', 'asc')->paginate(8);
        } else {
            $produk = DB::table('produks')->where('nama_produk', 'like', '%' . $search . '%')->where('pemilik_id', $kategori)->orderBy('nama_produk', 'asc')->paginate(8);
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
}
