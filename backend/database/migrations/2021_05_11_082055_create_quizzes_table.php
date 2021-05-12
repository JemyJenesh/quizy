<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizzesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('quizzes', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('description')->nullable();
      $table->string('pin')->nullable();
      $table->foreignId('question_id')->nullable()->constrained();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('quizzes');
  }
}
