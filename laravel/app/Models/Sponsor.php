<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sponsor extends Model
{
    //
    protected $table = "sponsors";

    protected $fillable = [
        'admin_id',
        'nama',
        'harga',
    ];

    public function admin() {
        return $this->belongsTo(Admin::class, "admin_id");
    }

    public function benefits() {
        return $this->hasMany(Benefit::class, "sponsor_id");
    }

    public function provider_transfers() {
        return $this->hasMany(ProviderTransfer::class, "sponsor_id");
    }


}
