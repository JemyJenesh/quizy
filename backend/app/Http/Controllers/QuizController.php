<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizDetailResource;
use App\Http\Resources\QuizResource;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller {
  public function __construct() {
    $this->middleware('auth:sanctum');
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $quizzes = auth()->user()->quizzes()->latest()->get();
    return QuizResource::collection($quizzes);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $validData = $request->validate([
      'name' => 'required|unique:quizzes,name,null,id,user_id,' . auth()->id(),
      'description' => 'required',
    ]);

    $quiz = auth()->user()->quizzes()->create($validData);

    return new QuizResource($quiz);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function show(Quiz $quiz) {
    return new QuizDetailResource($quiz);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Quiz $quiz) {
    $validData = $request->validate([
      'name' => 'required|unique:quizzes,name,' . $quiz->id . ',id,user_id,' . auth()->id(),
      'description' => 'required',
    ]);

    $quiz->update($validData);

    return new QuizResource($quiz);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Quiz  $quiz
   * @return \Illuminate\Http\Response
   */
  public function destroy(Quiz $quiz) {
    $data = new QuizResource($quiz);
    $quiz->delete();
    return $data;
  }
}
