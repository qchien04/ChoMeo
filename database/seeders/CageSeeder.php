<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cage;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class CageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 10) as $index) {
            Cage::create([
                'name' => 'Cage ' . $index,
                'image' => 'Cage ' . $index,
                'capacity' => $faker->numberBetween(5, 50), // Sức chứa từ 5 - 50 con
                'quantity' => $faker->numberBetween(1, 50), // Số lượng thực tế
                'breed' => $faker->randomElement(['Chó', 'Mèo']),
                'price' => $faker->randomFloat(2, 100, 5000), // Giá từ 100 - 5000
                'description' => $faker->sentence(10), // Mô tả ngắn
                'parameter' => json_encode([
                    'length' => $faker->numberBetween(50, 200) . 'cm',
                    'width' => $faker->numberBetween(50, 200) . 'cm',
                    'height' => $faker->numberBetween(50, 200) . 'cm',
                ]), // Thông số kích thước
                'evaluate' => $faker->randomFloat(2, 1, 5), // Đánh giá từ 1 - 5 sao
                'number_of_evaluate' => $faker->numberBetween(1, 500), // Số lượt đánh giá
            ]);

        }
    }
}
