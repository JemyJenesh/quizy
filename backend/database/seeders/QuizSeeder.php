<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    Quiz::create([
      'name' => 'Sample Quiz',
      'description' => 'Sample Quiz',
      'user_id' => 1,
    ]);
  }
}
