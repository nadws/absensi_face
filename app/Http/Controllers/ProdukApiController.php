<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProdukApiController extends Controller
{
    public function index()
    {
        $kategori = DB::table('pemiliks')->get()->toArray();

        $jsonKategori = array_map(function ($item) {
            return [
                'value' => (string) $item->id,
                'label' => $item->pemilik,
            ];
        }, $kategori);
        return response()->json($produk);
    }
}
