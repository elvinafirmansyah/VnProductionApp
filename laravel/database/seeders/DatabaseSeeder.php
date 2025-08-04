<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Benefit;
use App\Models\ProviderTransfer;
use App\Models\Sponsor;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'nama' => 'user',
            'email' => 'user@gmail.com',
            'password' => Hash::make("user"),
        ]);

        $admin1 = Admin::factory()->create([
            'nama' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make("admin"),
        ]);

        $sponsorA = Sponsor::create([
            'admin_id' => $admin1->id,                
            'nama' => 'Paket Platinum Sponsor',                
            'harga' => 200000,                  
        ]);
        
        $sponsorB = Sponsor::create([
            'admin_id' => $admin1->id,                
            'nama' => 'Paket Gold Sponsor',               
            'harga' => 150000,                  
        ]);

        Benefit::create([
            'sponsor_id' => $sponsorA->id,  
            'nama' => 'Logo di poster acara'  
        ]);
        
        Benefit::create([
            'sponsor_id' => $sponsorA->id,  
            'nama' => 'Nama di closing credit'  
        ]);
        
        // Menambahkan Benefit untuk Sponsor Brand B
        Benefit::create([
            'sponsor_id' => $sponsorB->id,  
            'nama' => 'Banner sponsor di venue'  
        ]);

        
        Benefit::create([
            'sponsor_id' => $sponsorB->id, 
            'nama' => 'Nama di website komunitas' 
        ]);


        ProviderTransfer::create([
            'sponsor_id' => $sponsorA->id,
            'nama' => "BCA",
            'rekening_transfer' => '2001234567' 
        ]);

        ProviderTransfer::create([
            'sponsor_id' => $sponsorA->id,
            'nama' => "Bank Mandiri",
            'rekening_transfer' => '3349842721' 
        ]);

        ProviderTransfer::create([
            'sponsor_id' => $sponsorB->id,
            'nama' => "BCA",
            'rekening_transfer' => '355213135113' 
        ]);

        ProviderTransfer::create([
            'sponsor_id' => $sponsorB->id,
            'nama' => "Bank Mandiri",
            'rekening_transfer' => '000987637172' 
        ]);

        ProviderTransfer::create([
            'sponsor_id' => $sponsorB->id,
            'nama' => "Dana",
            'rekening_transfer' => '41391839183' 
        ]);
    }
}
