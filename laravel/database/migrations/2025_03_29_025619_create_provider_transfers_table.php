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
        Schema::create('provider_transfers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("sponsor_id");
            $table->foreign("sponsor_id")->references("id")->on("sponsors")->onDelete("cascade");
            $table->string("nama");
            $table->string("rekening_transfer");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_transfers');
    }
};
