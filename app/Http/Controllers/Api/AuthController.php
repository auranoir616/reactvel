<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password'=> 'required',
        ]);
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'email or password is incorrect'
            ],422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response()->json(compact('user','token'));
    }
    public function signup(Request $request){
        $data = $request->validate([
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'password'=> [
                'required',
                'confirmed',
                Password::min(3)
            ]
        ]);
        // $data = $request->all();
    try{
        $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => bcrypt($data['password'])

    ]);
        $token = $user->createToken('main')->plainTextToken;
        return response()->json(compact('user','token'));

    }catch(\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
        
    }
    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }

}
