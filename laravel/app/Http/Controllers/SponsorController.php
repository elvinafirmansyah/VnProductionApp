<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use App\Models\ProviderTransfer;
use App\Models\Sponsor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SponsorController extends Controller
{
    //
    public function index() {
        $user = Auth::guard("user")->user();
        
        $sponsors =  Sponsor::with(["admin", "benefits", "provider_transfers"])->get();

        return response()->json($sponsors);
    }

    public function show($id) {
        $sponsor = Sponsor::with(["admin", "benefits", "provider_transfers"])->find($id);   

        return response()->json($sponsor);
    }

    public function store(Request $request) {
        $admin = Auth::guard("admin")->user();

        $data = Validator::make($request->all(), [
            "nama" => ["required", "string"],
            "harga" => ["required", "string"],
            "benefits" => ["required", "array"],
            "provider_transfers" => ["required", "array"],
            "provider_transfer.*.nama" => ["required", "string"],
            "provider_transfer.*.rekening_transfer" => ["required", "numeric"],
        ]);

        if ($data->fails()) {
            return response()->json([
                "error" => $data->errors()
            ]);
        }

        $request["admin_id"] = $admin->id;

        $sponsor = Sponsor::create($request->all());

        $provider_transfers = $request["provider_transfers"];
        $benefits = $request["benefits"];

        foreach ($benefits as $benefit) {
            Benefit::create([
                "sponsor_id" => $sponsor->id,
                "nama" => $benefit,
            ]);
        }

        foreach ($provider_transfers as $provider_transfer) {
            ProviderTransfer::create([
                "sponsor_id" => $sponsor->id,
                "nama" => $provider_transfer["nama"],
                "rekening_transfer" => $provider_transfer["rekening_transfer"],
            ]);
        }

        return response()->json([
            "message" => "sponsor berhasil dibuat",
            "sponsor" => $sponsor,
            "provider_transfers" => $provider_transfers,
            "beenfits" => $benefits 
        ]);
        
    }

    public function destroy($id) {
        $admin = Auth::guard("admin")->user();

        $sponsor = Sponsor::find($id);

        if ($sponsor->admin_id !== $admin->id) {
            return response()->json([
                "message" => "anda dilarang untuk menghapus"
            ]);
        }

        $sponsor->delete();

        return response()->json([
            "message" => "berhasil dihapus"
        ]);
    }

}
