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
        Schema::create('invoice', function (Blueprint $table) {
            $table->integer('id')->primary()->autoIncrement();
            $table->string('no_invoice');
            $table->date('tgl_invoice');
            $table->double('ttl_rp');
            $table->double('kembalian');
            $table->string('admin', 50);
            $table->integer('urutan');
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
