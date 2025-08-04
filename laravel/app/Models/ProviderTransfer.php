<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProviderTransfer extends Model
{
    //
    protected $table = "provider_transfers";

    protected $fillable = [
        'sponsor_id',
        'nama',
        'rekening_transfer',
    ];
}
