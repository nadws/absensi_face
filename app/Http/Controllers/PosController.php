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
        $paginate = $request->paginate ?? 10;

        $products = Product::where('name', 'like', '%' . $search . '%')->paginate(8);
        $produk = DB::table('produks')->where('nama_produk', 'like', '%' . $search . '%')->paginate(8);
        return Inertia::render('Pos/index', [
            'products' => $products,
            'produk' => $produk,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }
}
