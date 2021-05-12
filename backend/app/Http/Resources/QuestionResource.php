<?php

namespace App\Http\Resources;

use App\Http\Resources\OptionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource {
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array
   */
  public function toArray($request) {
    return [
      'id' => $this->id,
      'text' => $this->text,
      'category' => $this->category->name,
      'category_id' => $this->category_id,
      'answer' => $this->options()->where('is_correct', true)->first()->text,
      'options' => OptionResource::collection($this->options),
      'created_at' => $this->created_at->diffForHumans(),
      'updated_at' => $this->updated_at->diffForHumans(),
    ];
  }
}
