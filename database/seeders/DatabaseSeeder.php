<?php

namespace Database\Seeders;

use App\Models\pemilikModel;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        user::factory()->create([
            'name' => 'Nanda',
            'email' => 'nandw567@gmail.com',
            'password' => bcrypt('password123'),
            'role' => 'superadmin',
        ]);
    }
}
