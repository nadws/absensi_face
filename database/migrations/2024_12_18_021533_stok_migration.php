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
        Schema::create('stok_produk', function (Blueprint $table) {
            $table->integer('id')->primary();
            $table->integer('id_produk');
            $table->double('qty_debit');
            $table->double('qty_kredit');
            $table->double('ttl_rp');
            $table->enum('status', ['masuk', 'keluar']);
            $table->string('admin', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
