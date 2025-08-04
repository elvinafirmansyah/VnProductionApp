<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTransaksi extends Model
{
    //
    protected $table = "user_transaksis";

    // user_id	sponsor_id	rekening_transfer	provider_transfer	no_rekening	email	bukti_pembayaran status
    protected $fillable = [
        'user_id',
        'sponsor_id',
        'rekening_transfer',
        'nama_bisnis',
        'provider_transfer',
        'no_rekening',
        'email',
        'bukti_pembayaran',
        'status',
    ];

    public function sponsor() {
        return $this->belongsTo(Sponsor::class, "sponsor_id");
    }

    public function user() {
        return $this->belongsTo(User::class, "user_id");
    }
}
