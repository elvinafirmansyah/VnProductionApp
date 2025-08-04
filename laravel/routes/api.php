<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PemberitahuanController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\UserController;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// both auth
Route::middleware("auth:sanctum")->group(function() {
    Route::get('user', function () {
        if (Auth::guard("user")->user()) {
            return response()->json([
                "user" => Auth::guard("user")->user(),
                "role" => "user"
            ]);
        }
        if (Auth::guard("admin")->user()) {
            return response()->json([
                "user" => Auth::guard("admin")->user(),
                "role" => "admin"
            ]);
        }
    });

    // transaksi
    Route::get("transaksi/{id}", [TransaksiController::class, "show"]);


    // sponsor
    Route::get("sponsors", [SponsorController::class, "index"]);
    Route::get("sponsors/{id}", [SponsorController::class, "show"]);

    Route::get('provider_transfer/{nama}', [TransaksiController::class, "rekening_provider"]);
});
Route::middleware("auth:user")->group(function() {
    Route::post("auth/user/logout", [UserController::class, "logout"]);

    Route::get("transaksi_saya", [UserController::class, "transaksi"]);

    // notif
    Route::get("pemberitahuan", [UserController::class, "pemberitahuan"]);

    Route::delete("pemberitahuan/{id}/delete", [PemberitahuanController::class, "destroy"]);

    // transaksi
    Route::post("transaksi/{sponsor_id}/create", [TransaksiController::class, "store"]);


    
});

Route::middleware(["auth:admin"])->group(function() {
    Route::post("auth/admin/logout", [AdminController::class, "logout"]);

    Route::post("sponsor/create", [SponsorController::class, "store"]);

    Route::get("transaksi", [TransaksiController::class, "index"]);
    

    Route::post("transaksi/{id}/update", [AdminController::class, "update"]);

    Route::delete("sponsor/{id}/delete", [SponsorController::class, "destroy"]);
    // Route::post("sponsor/{id}", [SponsorController::class, "store"]);    
});
// user

Route::middleware(["guest"])->group(function() {
    Route::get("check", [UserController::class, "check"]);

    Route::post("auth/user/register", [UserController::class, "register"]);
    Route::post("auth/user/login", [UserController::class, "login"]);
    //admin
    Route::post("auth/admin/register", [AdminController::class, "register"]);
    Route::post("auth/admin/login", [AdminController::class, "login"]);
});