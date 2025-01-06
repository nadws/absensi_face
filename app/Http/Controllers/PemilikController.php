<?php

namespace App\Http\Controllers;

use App\Models\pemilikModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemilikController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $paginate = $request->paginate ?? 10;

        $pemilik = pemilikModel::where('pemilik', 'like', '%' . $search . '%')->orderBy('id', 'desc')->paginate($paginate);


        return Inertia::render('Pemilik/index', [
            'kategori' => $pemilik,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Pemilik/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'pemilik' => 'required',
        ]);

        pemilikModel::create($request->all());
        return redirect()->route('pemilik');
    }
}
