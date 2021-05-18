<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model {
  use HasFactory;

  protected $guarded = [];

  protected $casts = [
    'is_selected' => 'boolean',
  ];

  public function question() {
    return $this->belongsTo(Question::class);
  }

  public function quiz() {
    return $this->belongsTo(Quiz::class);
  }
}
