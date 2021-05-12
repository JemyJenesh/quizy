<?php

namespace App\Http\Resources;

use App\Http\Resources\QuestionResource;
use App\Models\Question;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizDetailResource extends JsonResource {
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request) {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'description' => $this->description,
      // 'quizQuestions' => QuizQuestionResource::collection($this->quizQuestions()->with('question')->get()),
      'quizQuestions' => QuestionResource::collection(
        Question::whereIn('id', $this->quizQuestions()->get()->pluck('question_id'))->get()
      ),
      // 'categories' => CategoryResource::collection(Category::withCount([
      //   'questions',
      //   'questions as questions_count' => function ($query) {
      //     $query->whereHas('quizzes', function ($q) {
      //       $q->where('is_selected', false);
      //     });
      //   }])->whereIn('id', $this->questions->map(function ($item) {
      //   return $item['category_id'];
      // })->unique())->get()),
      'created_at' => $this->created_at->diffForHumans(),
      'updated_at' => $this->updated_at->diffForHumans(),
    ];
  }
}
