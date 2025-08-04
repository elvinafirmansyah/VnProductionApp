<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
// use Illuminate\Auth\RequestGuard;

use function Laravel\Prompts\error;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function pemberitahuan(Request $request) {
        $user = Auth::guard("user")->user();

        $pemberitahuan = User::where("email", $user->email)->with(["pemberitahuan.transaksi"])->get();

        $data = $pemberitahuan->map(function ($d) {
            foreach($d->pemberitahuan as $dpemberitahuan) {
              return [
                 "id" => $dpemberitahuan->id,
                 "transaksi_id" => $dpemberitahuan->transaksi_id,
                 "nama" => $dpemberitahuan->nama,
                 "deskripsi" => $dpemberitahuan->deskripsi,
                 "foto_bukti" => $dpemberitahuan->foto_bukti,
                 "transaksi" => $dpemberitahuan->transaksi,
              ];
            };
         });

        return response()->json($data);
    }

    public function transaksi(Request $request) {
        $user = Auth::guard("user")->user();

        $transaksi = User::where("id", $user->id)->with(["transaksi.sponsor"])->get();

        // $data = $transaksi->map(function ($d) {
        //    foreach($d->transaksi as $dtransaksi) {
        //      return [
        //         "id" => $dtransaksi->id,
        //         "sponsor_id" => $dtransaksi->sponsor_id,
        //         // "sponsor_id" => $dtransaksi->sponsor_id,
        //         "rekening_transfer" => $dtransaksi->rekening_transfer,
        //         "provider_transfer" => $dtransaksi->provider_transfer,
        //         "no_rekening" => $dtransaksi->no_rekening,
        //         "email" => $dtransaksi->email,
        //         "bukti_pembayaran" => $dtransaksi->bukti_pembayaran,
        //         "status" => $dtransaksi->status,
        //         "sponsor" => $dtransaksi->sponsor,
        //         "user" => $dtransaksi->user
        //      ];
        //    };
        // });

       $data_valid = $transaksi[0]->transaksi->map(function($dtransaksi) {
            return [
                "id" => $dtransaksi->id,
                "sponsor_id" => $dtransaksi->sponsor_id,
                "rekening_transfer" => $dtransaksi->rekening_transfer,
                "provider_transfer" => $dtransaksi->provider_transfer,
                "no_rekening" => $dtransaksi->no_rekening,
                "email" => $dtransaksi->email,
                "bukti_pembayaran" => $dtransaksi->bukti_pembayaran,
                "status" => $dtransaksi->status,
                "sponsor" => $dtransaksi->sponsor,
                "user" => $dtransaksi->user
            ];
        });

        $data = [];
        // foreach ($transaksi[0]->transaksi as )


        return response()->json($data_valid);
    }

    public function register(Request $request)
    {
        $data = Validator::make($request->all(), [
            "nama" => ["required", "string"],
            "email" => ["required", "email", "unique:users,email"],
            "password" => ["required", "min:6", "string"],
        ]);

        if ($data->fails()) {
            return response()->json([
                "error" => $data->errors()
            ]);
        }

        $user = User::create([
            "nama" => $request->nama,
            "email" =>$request->email,
            "password" => Hash::make($request->password),
        ]);

        $token = $user->createToken('user_token')->plainTextToken;

        // Auth::guard("user")->login($user);

        return response()->json([
            "message" => "register berhasil",
            "user" => $user,
            "token" => $token
        ], 201);
    }

    public function login(Request $request) {
        $data = Validator::make($request->all(), [
            "email" => ["required", "email"],
            "password" => ["required", "string"],
        ])->validate();

        $user = User::where("email", $data["email"])->first();

        if (!$user || !Hash::check($data["password"], $user->password)) {
            return response()->json([
                "error" => "email dan password salah"
            ]);
        }

        $token = $user->createToken('user_token')->plainTextToken;

        // Auth::guard("user")->login($user);

        return response()->json([
            "message" => "login berhasil",
            "user" => $user,
            "token" => $token
        ]);

    } 
    
    public function logout(Request $request) {
        try {
            $user = Auth::guard("sanctum")->user();

            if ($user) {
                $user->currentAccessToken()->delete();

                return response()->json([
                    "message" => "logout berhasil"
                ]);
            }

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage() 
            ]);
        }
        // return response(''   , 204);
    }
}
