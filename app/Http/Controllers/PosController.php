<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 10;
        $products = Product::paginate(8);
        return Inertia::render('Pos/index', [
            'products' => $products,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }
}
