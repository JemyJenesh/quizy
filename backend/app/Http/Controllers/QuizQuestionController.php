<?php

namespace App\Http\Controllers;

use App\Models\QuizQuestion;
use Illuminate\Http\Request;

class QuizQuestionController extends Controller {
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
      'questions.*' => 'exists:questions,id',
    ]);

    QuizQuestion::where('quiz_id', $request->quiz_id)->delete();

    foreach ($request->questions as $question) {
      QuizQuestion::create([
        'quiz_id' => $request->quiz_id,
        'question_id' => $question,
      ]);
    }

    return response(null, 200);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\QuizQuestion  $quizQuestion
   * @return \Illuminate\Http\Response
   */
  public function show(QuizQuestion $quizQuestion) {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\QuizQuestion  $quizQuestion
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, QuizQuestion $quizQuestion) {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\QuizQuestion  $quizQuestion
   * @return \Illuminate\Http\Response
   */
  public function destroy(QuizQuestion $quizQuestion) {
    //
  }
}
