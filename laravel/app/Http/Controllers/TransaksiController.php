<?php

namespace App\Http\Controllers;

use App\Models\Pemberitahuan;
use App\Models\ProviderTransfer;
use App\Models\Sponsor;
use App\Models\UserTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $request->merge([
            "size" => $request->input("size", 10)
        ]);

        $data = $request->validate([
            "page" => ["integer", "min:0"],
            "size" => ["integer", "min:1"],
        ]);

        if (!$data) {
            $transaksi = UserTransaksi::orderBy("id", "desc")->with(["user", "sponsor"])->paginate($request["size"])->appends(["size" => $request["size"]]);

            return response()->json($transaksi);
        }

        $transaksi = UserTransaksi::orderBy("id", "desc")->with(["user", "sponsor"])->paginate($data["size"])->appends(["size" => $data["size"]]);;

        return response()->json($transaksi);
    }

    public function rekening_provider($id) {
        $provider = ProviderTransfer::find($id);

        return response()->json($provider);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $sponsor_id)
    {
        //
        // sponsor_id	rekening_transfer	provider_transfer	no_rekening	email	bukti_pembayaran	status	
        $user = Auth::guard('user')->user();

        $sponsor = Sponsor::find($sponsor_id);

        $data = Validator::make($request->all(), [
            "provider_transfer" => ["required", "string"],
            "no_rekening" => ["required", "string"],
            "nama_bisnis" => ["required", "string"],
            "email" => ["required", "email"],
            "bukti_pembayaran" => ["required", "image"],
        ]);

        if ($data->fails()) {
            return response()->json([
                "error" => $data->errors()
            ]);
        }

        $foto_bukti = $request->file("bukti_pembayaran")->store("transaksi");
        
        $transaksi = UserTransaksi::create([
            "user_id" => $user->id,
            "sponsor_id" => $sponsor->id,
            "rekening_transfer" => $request->rekening_transfer,
            "nama_bisnis" => $request->nama_bisnis,
            "provider_transfer" => $request->provider_transfer,
            "no_rekening" => $request->no_rekening,
            "email" => $request->email,
            "bukti_pembayaran" => $foto_bukti,
            "status" => "menunggu",
        ]);

        return response()->json([
            'message' => "transaksi berhasil",
            'transaksi' => $transaksi,
        ]);

    }

    
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $transaksi = UserTransaksi::with(["user", "sponsor"])->find($id);

        return response()->json($transaksi);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserTransaksi $userTransaksi)
    {
        //
    }
}
