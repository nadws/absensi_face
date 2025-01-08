<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

class AkunPembayaran extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 10;

        $akun = DB::table('akun_pembayaran')
            ->leftJoin('kategori_pembayaran', 'kategori_pembayaran.id', '=', 'akun_pembayaran.kategori_akun_id')
            ->where('akun', 'like', '%' . $search . '%')->orWhere('kategori', 'like', '%' . $search . '%')
            ->select('akun_pembayaran.id', 'akun_pembayaran.akun', 'kategori_pembayaran.kategori')
            ->paginate($paginate);


        return Inertia::render('Akun/index', [
            'akun' => $akun,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }

    public function create()
    {

        $kategori = DB::table('kategori_pembayaran')->get()->toArray();
        $jsonKategori = array_map(function ($item) {
            return [
                'value' => (string) $item->id,
                'label' => $item->kategori,
            ];
        }, $kategori);

        $data = [
            'kategori' => $jsonKategori
        ];

        return Inertia::render('Akun/create', $data);
    }

    public function store(Request $request)
    {
        dd($request->kategori);

        $request->validate([
            'kategori' => 'required',
        ]);

        $data = [
            'akun' => $request->akun,
            'kategori_akun' => $request->kategori
        ];

        DB::table('akun_pembayaran')->insert($data);
        return redirect()->route('akun');
    }
}
