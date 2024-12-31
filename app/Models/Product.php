<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'produks';
    protected $fillable = [
        'id',
        'nama_produk',
        'kd_produk',
        'deskripsi',
        'harga',
        'stok',
        'foto',
        'admin',
        'harga_beli',
        'pemilik_id',
        'satuan_id',
        'opname',
    ];
}
