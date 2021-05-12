<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizQuestionsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('quiz_questions', function (Blueprint $table) {
      $table->id();
      $table->foreignId('quiz_id')->constrained()->onDelete('cascade');
      $table->foreignId('question_id')->constrained()->onDelete('cascade');
      $table->boolean('is_selected')->default(false);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('quiz_questions');
  }
}
