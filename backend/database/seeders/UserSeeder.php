<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserAddress;
use App\Models\Cart;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Admin User - menggunakan updateOrCreate untuk menghindari duplicate
        $admin = User::updateOrCreate(
            ['email' => 'admin@toko.com'],
            [
                'name' => 'Admin Toko',
                'password' => Hash::make('password'),
                'phone' => '08123456789',
                'role' => 'admin',
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );

        // Customer Sample
        $customer = User::updateOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('password'),
                'phone' => '08987654321',
                'role' => 'customer',
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );

        // Create cart for customer if not exists
        if (!$customer->cart) {
            Cart::create(['user_id' => $customer->id]);
        }

        // Create cart for admin if not exists
        if (!$admin->cart) {
            Cart::create(['user_id' => $admin->id]);
        }

        // Sample Address for customer
        UserAddress::updateOrCreate(
            [
                'user_id' => $customer->id,
                'label' => 'rumah'
            ],
            [
                'name' => 'John Doe',
                'phone' => '08987654321',
                'address' => 'Jl. Merdeka No. 123, RT 01/02',
                'province' => 'DKI Jakarta',
                'city' => 'Jakarta Selatan',
                'subdistrict' => 'Kebayoran Baru',
                'postal_code' => '12180',
                'province_id' => 6, // DKI Jakarta di RajaOngkir
                'city_id' => 151, // Jakarta Selatan
                'subdistrict_id' => 1234,
                'is_default' => true,
            ]
        );

        $this->command->info('User seeder completed successfully!');
        $this->command->info('Admin: admin@toko.com / password');
        $this->command->info('Customer: customer@example.com / password');
    }
}
