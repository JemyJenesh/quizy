<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model {
  use HasFactory;

  protected $guarded = [];

  public function quiz() {
    return $this->belongsTo(Quiz::class);
  }
}
