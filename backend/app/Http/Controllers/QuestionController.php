<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuestionResource;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller {
  public function __construct() {
    $this->middleware('auth:sanctum');
  }
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $questions = auth()->user()->questions()->latest()->get();
    return QuestionResource::collection($questions);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $validData = $request->validate([
      'text' => 'required|unique:questions,text,null,id,user_id,' . auth()->id(),
      'category_id' => 'required|exists:categories,id',
      'options' => 'required',
      'options.*.text' => 'required',
      'options.*.is_correct' => 'required',
    ], [
      'text.unique' => 'The question already exists!',
      'category_id.exists' => "This category doesn't exist!",
    ]);

    $question = auth()->user()->questions()->create([
      'text' => $validData['text'],
      'category_id' => $validData['category_id'],
    ]);

    foreach ($validData['options'] as $option) {
      $question->options()->create([
        'text' => $option['text'],
        'is_correct' => $option['is_correct'],
      ]);
    }

    return new QuestionResource($question);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Question  $question
   * @return \Illuminate\Http\Response
   */
  public function show(Question $question) {
    return new QuestionResource($question);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Question  $question
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Question $question) {
    $validData = $request->validate([
      'text' => 'required|unique:questions,text,' . $question->id . ',id,user_id,' . auth()->id(),
      'category_id' => 'required|exists:categories,id',
      'options' => 'required',
      'options.*.id' => 'required|exists:options,id',
      'options.*.text' => 'required',
      'options.*.is_correct' => 'required',
    ], [
      'text.unique' => 'The question already exists!',
      'category_id.exists' => "This category doesn't exist!",
      'options.*.id.exists' => "This option doesn't exist!",
    ]);

    $question->update([
      'text' => $validData['text'],
      'category_id' => $validData['category_id'],
    ]);

    foreach ($validData['options'] as $option) {
      Option::whereId($option['id'])->update([
        'text' => $option['text'],
        'is_correct' => $option['is_correct'],
      ]);
    }

    return new QuestionResource($question);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Question  $question
   * @return \Illuminate\Http\Response
   */
  public function destroy(Question $question) {
    $question->delete();
    return $question;
  }
}
