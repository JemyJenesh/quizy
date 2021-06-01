<?php

namespace App\Http\Resources;

use App\Http\Resources\QuizQuestionResource;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Http\Resources\Json\JsonResource;

class GameQuizDetailResource extends JsonResource {
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
      'turn' => $this->turn,
      'pin' => $this->pin,
      'players_count' => $this->players->count(),
      'quizQuestions' => QuizQuestionResource::collection($this->quizQuestions()->with('question')->get())->groupBy('question.category.name'),
      'categories' => Category::select('id', 'name')->withCount(['questions', 'questions as remaining_questions_count' => function ($query) {
        $query->whereHas('quizQuestions', function ($q) {
          $q->where('is_selected', false);
        });
      }])->whereIn('id', Question::whereIn('id', $this->quizQuestions->pluck('question_id'))->get()->pluck('category_id'))->get(),
      // 'categories' => CategoryResource::collection(Category::withCount([
      //   'questions',
      //   'questions as questions_count' => function ($query) {
      //     $query->whereHas('quizzes', function ($q) {
      //       $q->where('is_selected', false);
      //     });
      //   }])->whereIn('id', $this->questions->map(function ($item) {
      //   return $item['category_id'];
      // })->unique())->get()),
      'players' => $this->players,
      'is_passed' => $this->is_passed,
      'question' => new QuestionResource($this->question),
      'created_at' => $this->created_at->diffForHumans(),
      'updated_at' => $this->updated_at->diffForHumans(),
    ];
  }
}
