<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuizPlayerController;
use App\Http\Controllers\QuizQuestionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. 'email' => 'required|email|unique:users,email',
'password' => 'required|min:8', These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('categories', CategoryController::class);
Route::apiResource('questions', QuestionController::class);
Route::apiResource('quizzes', QuizController::class);
Route::apiResource('quiz-questions', QuizQuestionController::class);
Route::apiResource('games', GameController::class);
Route::apiResource('quizzes.players', QuizPlayerController::class)->only(['index']);
Route::apiResource('players', QuizPlayerController::class)->only(['store', 'destroy', 'show']);

Route::post('/answers', [GameController::class, 'answer']);
Route::post('/pass', [GameController::class, 'pass']);
