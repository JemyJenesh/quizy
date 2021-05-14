<?php

namespace App\Http\Controllers;

use App\Events\PlayerAnswered;
use App\Events\QuestionChanged;
use App\Events\QuizEnded;
use App\Http\Resources\GameQuizResource;
use App\Models\Option;
use App\Models\Player;
use App\Models\Quiz;
use Illuminate\Http\Request;

class GameController extends Controller {
  public function __construct() {
    $this->middleware('auth:sanctum')->except('answer');
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $request->validate([
      'quiz_id' => 'required|exists:quizzes,id',
    ]);

    $quiz = Quiz::find($request->quiz_id);

    if (is_null($quiz->pin)) {
      $quiz->update([
        'pin' => sprintf("%05d", mt_rand(1, 99999)),
      ]);
    }

    return response(null, 200);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function show($quiz) {
    $quiz = Quiz::find($quiz);
    return new GameQuizResource($quiz);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $quiz) {
    $quiz = Quiz::find($quiz);

    $question = $quiz->quizQuestions()->whereHas('question', function ($q) use ($request) {
      $q->where('category_id', $request->category_id);
    })->where('is_selected', false)->inRandomOrder()->first();

    if ($question) {
      $question->update([
        'is_selected' => true,
      ]);
      $quiz->update([
        'question_id' => $question->question_id,
        'turn' => ($quiz->turn % $quiz->players->count()) + 1,
      ]);
      QuestionChanged::dispatch($quiz);
    }

    return response(null, 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function destroy($quiz) {
    $quiz = Quiz::with('players')->find($quiz);

    $quiz->update([
      'pin' => null,
      'question_id' => null,
      'turn' => 0,
    ]);
    $quiz->quizQuestions()->update([
      'is_selected' => false,
    ]);
    QuizEnded::dispatch($quiz);
    $quiz->players()->delete();
    return response(null, 200);
  }

  public function answer(Request $request) {
    $request->validate([
      'option_id' => 'required',
      'player_id' => 'required',
    ]);

    $isCorrect = Option::find($request->option_id)->is_correct;

    $player = Player::find($request->player_id);
    if ($isCorrect) {
      $player->update([
        'score' => $player->score + 10,
      ]);
    }

    PlayerAnswered::dispatch($player->quiz_id, $isCorrect);

    return response(null, 200);

  }
}
