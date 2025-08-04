<?php

namespace Database\Seeders;

use App\Models\Pemberitahuan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PemberitahuanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Pemberitahuan::create([
            'sponsor_id' => $sponsorB->id,
            'nama' => "Dana",
            'rekening_transfer' => '41391839183' 
        ]);
    }
}
