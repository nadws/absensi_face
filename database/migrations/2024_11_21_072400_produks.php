<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('produks', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->string('nama_produk', 100)->nullable();
            $table->string('kd_produk', 20)->nullable();
            $table->text('deskripsi')->nullable();
            $table->double('harga')->nullable();
            $table->string('foto')->nullable();
            $table->string('admin')->nullable();
            $table->double('harga_beli')->nullable();
            $table->double('stok')->nullable();
            $table->integer('satuan_id');
            $table->integer('pemilik_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
