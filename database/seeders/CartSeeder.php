<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [];

        for ($i = 1; $i <= 500; $i++) {
            $state = rand(0, 1); // true hoặc false
            $paymentDate = $state ? Carbon::now()->subDays(rand(1, 180)) : null; // Nếu state = true thì có ngày thanh toán, ngược lại là null

            $items[] = [
                'user_id' => 1,
                'item_id' => rand(1, 19),
                'quantity' => rand(1, 5),
                'type' => rand(0, 1) ? 'cage' : 'accessory',
                'state' => $state,
                'payment_date' => $paymentDate, // Đảm bảo đúng logic
                'created_at' => Carbon::now()->subDays(rand(1, 60)),
                'updated_at' => Carbon::now()->subDays(rand(1, 60)),
            ];
        }

        for ($i = 1; $i <= 120; $i++) {
            $state = rand(0, 1);
            $paymentDate = $state ? Carbon::now()->subDays(rand(1, 120)) : null; // Nếu state = true thì có ngày thanh toán, ngược lại là null

            $items[] = [
                'user_id' => 1,
                'item_id' => rand(1, 19),
                'quantity' => rand(1, 5),
                'type' => rand(0, 1) ? 'cage' : 'accessory',
                'state' => $state,
                'payment_date' => $paymentDate,
                'created_at' => Carbon::now()->subDays(rand(1, 60)),
                'updated_at' => Carbon::now()->subDays(rand(1, 60)),
            ];
        }

        DB::table('carts')->insert($items);
    }
}
