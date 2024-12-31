<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
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

        return Inertia::render('Product/index', [
            'produk' => $produk,
            'filters' => [
                'search' => $search,
                'paginate' => $paginate
            ],
        ]);
    }

    public function create()
    {
        $kode  = DB::selectOne("SELECT max(kd_produk) as kode FROM produks");
        if (empty($kode->kode)) {
            $kd_produk = '1001';
        } else {
            $kd_produk = $kode->kode + 1;
        }
        $kategori = DB::table('pemiliks')->get()->toArray();

        $jsonKategori = array_map(function ($item) {
            return [
                'value' => (string) $item->id,
                'label' => $item->pemilik,
            ];
        }, $kategori);



        return Inertia::render('Product/create', [
            'kd_produk' => $kd_produk,
            'kategori' => $jsonKategori,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kd_produk' => 'required',
            'nama_produk' => 'required',
            'kategori' => 'required',
            'harga' => 'required',
            'harga_beli' => 'required',
            'stok' => 'required',
        ]);




        $kode  = DB::selectOne("SELECT max(kd_produk) as kode FROM produks");
        if (empty($kode->kode)) {
            $kd_produk = '1001';
        } else {
            $kd_produk = $kode->kode + 1;
        }


        if ($request->foto == 'image.png') {
            $fileName = "image.png";
        } else {
            $fileName = $kd_produk . '_' . $request->file('foto')->getClientOriginalName();
            $request->file('foto')->storeAs('public/image', $fileName);
        }



        $product = Product::create([
            'kd_produk' => $kd_produk,
            'nama_produk' => $request->nama_produk,
            'pemilik_id' => $request->kategori,
            'harga' => $request->harga,
            'harga_beli' => $request->harga_beli,
            'stok' => $request->stok,
            'admin_id' => auth()->user()->name,
            'satuan_id' => 1,
            'foto' => asset('storage/image/' . $fileName),
            'opname' => $request->opname,
        ]);
        $productId = $product->id;

        DB::table('stok_produk')->insert([
            'id_produk' => $productId,
            'no_invoice' => 'stok awal',
            'qty_debit' => $request->stok,
            'qty_kredit' => 0,
            'ttl_rp' => $request->harga,
            'admin' => auth()->user()->name,
            'status' => 'masuk',
            'created_at' => now(),

        ]);

        return redirect()->route('products')->with('success', 'Produk berhasil ditambahkan');
    }
}
