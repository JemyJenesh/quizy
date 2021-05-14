<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $categories = ['General', 'Sports', 'Mathematics'];
    foreach ($categories as $category) {
      Category::create([
        'name' => $category,
        'description' => $category,
        'user_id' => 1,
      ]);
    }
  }
}
