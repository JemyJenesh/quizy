<?php

namespace App\Http\Controllers;

use App\Events\PlayerJoined;
use App\Events\PlayerKicked;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\QuestionResource;
use App\Models\Player;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizPlayerController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function index(Quiz $quiz) {
    $players = $quiz->players;
    return PlayerResource::collection($players);
  }

  public function show(Player $player) {
    $quiz = $player->quiz()->withCount('players')->first();
    $question = $player->quiz->question ? new QuestionResource($player->quiz->question) : null;
    return response(compact('quiz', 'player', 'question'));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $quiz = Quiz::wherePin($request->pin)->first();
    if (!$quiz) {
      return response([
        'errors' => [
          'message' => ['Pin is invalid!'],
        ],
      ], 422);
    }
    if (!is_null($quiz->question_id)) {
      return response([
        'errors' => [
          'message' => ['The quiz has already began!'],
        ],
      ], 422);
    }
    $request->validate([
      'name' => 'required|unique:players,name,NULL,id,quiz_id,' . $quiz->id,
      'pin' => 'required',
    ]);
    $player = $quiz->players()->create([
      "name" => $request->name,
      "order" => $quiz->players->count() + 1,
    ]);

    PlayerJoined::dispatch($player);

    return response($player, 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Player  $player
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Player $player) {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Player  $player
   * @return \Illuminate\Http\Response
   */
  public function destroy(Player $player) {
    $quiz = $player->quiz;

    PlayerKicked::dispatch($player);
    $player->delete();
    $quiz->players()->where('order', '>', $player->order)->decrement('order', 1);

    return response(null, 200);
  }
}
