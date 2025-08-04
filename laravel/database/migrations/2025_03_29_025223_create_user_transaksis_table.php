<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_transaksis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->unsignedBigInteger("sponsor_id");
            $table->foreign("sponsor_id")->references("id")->on("sponsors")->onDelete("cascade");
            $table->string("rekening_transfer");
            $table->string("nama_bisnis");
            $table->string("provider_transfer");
            $table->string("no_rekening");
            $table->string("email");
            $table->string("bukti_pembayaran");
            $table->enum("status", ["diterima", "menunggu", "tidak diterima"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_transaksis');
    }
};
