<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Pemberitahuan;
use App\Models\UserTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function register(Request $request) {
        $data = Validator::make($request->all(), [
            "nama" => ["required", "string"],
            "email" => ["required", "email", "unique:admins,email"],
            "password" => ["required", "min:6", "string"],
        ]);

        if ($data->fails()) {
            return response()->json([
                "error" => $data->errors()
            ]);
        }

        $admin = Admin::create([
            "nama" => $request->nama,
            "email" =>$request->email,
            "password" => Hash::make($request->password),
        ]);

        $token = $admin->createToken("admin_token")->plainTextToken;

        return response()->json([
            "message" => "register berhasil",
            "admin" => $admin,
            "token" => $token
        ]);
    }

    public function login(Request $request) {
        $data = Validator::make($request->all(), [
            "email" => ["required", "email"],
            "password" => ["required", "string"],
        ]);

        if ($data->fails()) {
            return response()->json([
                "error" => $data->errors()
            ]);
        }
        
        $admin = Admin::where("email", $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                "error" => "email dan password salah"
            ]);
        }

        $token = $admin->createToken("admin_token")->plainTextToken;

        return response()->json([
            "message" => "login berhasil",
            "user" => $admin,
            "token" => $token
        ]);
    }

    public function logout(Request $request) {
        try {
            $admin = Auth::guard("sanctum")->user();

            if ($admin) {
                $admin->currentAccessToken()->delete();

                return response()->json([
                    "message" => "logout berhasil"
                ]);
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage() 
            ]);
        }
    }

    public function update(Request $request, $id) {
        try {
            $data = Validator::make($request->all(), [
                // "nama" => ["required", "string"],
                "foto" => ["required", "image"],
                // "password" => ["required", "min:6", "string"],
            ]);
    
            if ($data->fails()) {
                return response()->json([
                    "error" => $data->errors()
                ]); 
            }
    
            $foto_bukti = $request->file("foto")->store("foto_bukti");
    
            $transaksi = UserTransaksi::with("user", "sponsor")->where("id", $id)->first();
    
            $transaksi->update([
                "status" => "diterima"
            ]);
    
            $pemberitahuan = Pemberitahuan::create([
                "user_id" => $transaksi->user->id,
                "transaksi_id" => $transaksi->id,
                "nama" => "Konfirmasi Kerjasama dengan {$transaksi->sponsor->nama}",
                "deskripsi" => "Kami dengan senang hati menginformasikan bahwa {$transaksi->user->nama} telah resmi mengkonfirmasi kerja sama sponsorship dengan Anda.  Terima kasih atas dukungan Anda, dan kami menantikan kerjasama yang sukses.",
                "foto_bukti" => $foto_bukti
            ]);
    
            return response()->json([
                "message" => "pemberitahuan berhasil dikirim",
                "pemberitahuan" => $pemberitahuan
            ], 201);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 201);
        }

    }

    
}
