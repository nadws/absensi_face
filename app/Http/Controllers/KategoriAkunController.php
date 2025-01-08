<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class KategoriAkunController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 10;

        $kategori_akun = DB::table('kategori_pembayaran')->where('kategori', 'like', '%' . $search . '%')->paginate($paginate);


        return Inertia::render('kategori_akun/index', [
            'kategori_akun' => $kategori_akun,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }
    public function create()
    {
        return Inertia::render('kategori_akun/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'kategori' => 'required',
        ]);

        $data = [
            'kategori' => $request->kategori
        ];

        DB::table('kategori_pembayaran')->insert($data);
        return redirect()->route('kategoriakun');
    }
}
