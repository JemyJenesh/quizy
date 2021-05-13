<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayersTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('players', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->integer('score')->default(0);
      $table->integer('order');
      $table->boolean('is_eliminated')->default(false);
      $table->foreignId('quiz_id')->constrained();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('players');
  }
}
