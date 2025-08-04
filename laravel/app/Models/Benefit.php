<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Benefit extends Model
{
    //
    protected $table = "benefits";

    protected $fillable = [
        'sponsor_id',
        'nama',
    ];
}
