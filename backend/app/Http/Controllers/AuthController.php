<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller {
  public function register(Request $request) {
    $request->validate([
      'name' => 'required',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:8',
    ]);

    $user = User::create($request->only(['name', 'email', 'password']));

    return response([
      'user' => $user,
      'token' => $user->createToken('auth-token')->plainTextToken,
    ]);
  }

  public function login(Request $request) {
    $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);

    if (!auth()->attempt($request->only(['email', 'password']))) {
      return response(['message' => 'Invalid email or password.'], 422);
    }

    return response([
      'user' => auth()->user(),
      'token' => auth()->user()->createToken('auth-token')->plainTextToken,
    ]);
  }

  public function logout(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out successfully.']);
  }
}
