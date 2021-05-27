<?php

namespace App\Http\Resources;

use App\Http\Resources\QuizQuestionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GameQuizResource extends JsonResource {
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
      'question' => new QuizQuestionResource($this->question),
      'quizQuestions' => QuizQuestionResource::collection($this->quizQuestions()->with('question')->get())->groupBy('question.category.name'),
      'created_at' => $this->created_at->diffForHumans(),
      'updated_at' => $this->updated_at->diffForHumans(),
    ];
  }
}
