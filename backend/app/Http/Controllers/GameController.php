<?php

namespace App\Http\Controllers;

use App\Events\PlayerAnswered;
use App\Events\QuestionChanged;
use App\Events\QuestionPassed;
use App\Events\QuestionPassingEnd;
use App\Events\QuizEnded;
use App\Http\Resources\GameQuizResource;
use App\Models\Option;
use App\Models\Player;
use App\Models\Quiz;
use Illuminate\Http\Request;

class GameController extends Controller {
  public function __construct() {
    $this->middleware('auth:sanctum')->except(['answer', 'pass']);
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
      if ($quiz->is_passed) {
        $quiz->update([
          'question_id' => $question->question_id,
          'turn' => ($quiz->pass % $quiz->players->count()) + 1,
          'pass' => 0,
          'is_passed' => false,
        ]);
      } else {
        $quiz->update([
          'question_id' => $question->question_id,
          'turn' => ($quiz->turn % $quiz->players->count()) + 1,
        ]);
      }
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
      'pass' => 0,
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
      'player_id' => 'required',
    ]);

    $player = Player::find($request->player_id);

    if (is_null($request->option_id)) {
      $player->update([
        'score' => $player->score - 2,
      ]);

      PlayerAnswered::dispatch($player->quiz_id, null);

      return response(null, 200);
    }

    $isCorrect = Option::find($request->option_id)->is_correct;

    if ($isCorrect) {
      $player->update([
        'score' => $player->score + ($player->quiz->is_passed ? 5 : 10),
      ]);
    } else {
      $player->update([
        'score' => $player->score - ($player->quiz->is_passed ? 0 : 2),
      ]);
    }

    PlayerAnswered::dispatch($player->quiz_id, $isCorrect);

    return response(null, 200);

  }

  public function pass(Request $request) {
    $request->validate([
      'player_id' => 'required',
    ]);

    $player = Player::find($request->player_id);
    $nextTurn = ($player->quiz->turn % $player->quiz->players->count()) + 1;

    if ($player->quiz->pass == $nextTurn) {
      QuestionPassingEnd::dispatch($player->quiz);
      return response(null, 200);
    }
    $player->quiz()->update([
      'turn' => $nextTurn,
      'pass' => $player->quiz->is_passed ? $player->quiz->pass : $player->quiz->turn,
      'is_passed' => true,
    ]);

    QuestionPassed::dispatch($player->quiz);

    return response(null, 200);

  }

}
