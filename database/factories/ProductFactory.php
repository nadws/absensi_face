<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'sku' => fake()->unique()->ean13(),
            'unit' => "pcs",
            'initial_price' => fake()->randomFloat(2, 100000, 1000000),
            'selling_price' => fake()->randomFloat(2, 100000, 1000000),

            'image' => fake()->imageUrl(),
        ];
    }
}
