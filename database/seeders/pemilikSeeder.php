<?php

namespace Database\Seeders;

use App\Models\pemilikModel;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class pemilikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        pemilikModel::factory()->create([
            'pemilik' => 'Agemono',
        ]);
    }
}
