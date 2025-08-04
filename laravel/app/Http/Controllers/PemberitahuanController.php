<?php

namespace App\Http\Controllers;

use App\Models\Pemberitahuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PemberitahuanController extends Controller
{
    
    public function destroy($id) {
        $user = Auth::guard("user")->user();

        $pemberitahuan = Pemberitahuan::find($id);

        if ($pemberitahuan->user_id !== $user->id) {
            return response()->json([
                "message" => "anda dilarang untuk menghapus"
            ]);
        }

        $pemberitahuan->delete();

        return response()->json([
            "message" => "berhasil dihapus"
        ]);
    }
}
