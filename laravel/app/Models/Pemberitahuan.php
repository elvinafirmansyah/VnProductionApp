<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pemberitahuan extends Model
{
    //
    protected $table = "pemberitahuans";

    // user_id	sponsor_id	nama	deskripsi	foto_bukti
    protected $fillable = [
        'user_id',
        'transaksi_id',
        'nama',
        'deskripsi',
        'foto_bukti',
    ];

    public function transaksi() {
        return $this->belongsTo(UserTransaksi::class, "transaksi_id");
    }
}
