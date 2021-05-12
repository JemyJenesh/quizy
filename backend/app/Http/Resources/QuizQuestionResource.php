<?php

namespace App\Http\Resources;

use App\Http\Resources\OptionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizQuestionResource extends JsonResource {
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request) {
    return [
      'id' => $this->question->id,
      'text' => $this->question->text,
      'category' => $this->question->category->name,
      'category_id' => $this->question->category_id,
      'answer' => $this->question->options()->where('is_correct', true)->first()->text,
      'options' => OptionResource::collection($this->question->options),
      'is_selected' => $this->is_selected,
    ];
  }
}
