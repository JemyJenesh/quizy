<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model {
  use HasFactory;

  protected $guarded = [];

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function quizQuestions() {
    return $this->hasMany(QuizQuestion::class);
  }

  public function players() {
    return $this->hasMany(Player::class);
  }

  public function question() {
    return $this->belongsTo(Question::class);
  }
}
