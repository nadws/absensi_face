<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pemilikModel extends Model
{
    use HasFactory;
    protected $table = 'pemiliks';
    protected $fillable = [
        'id',
        'pemilik',
    ];
}
