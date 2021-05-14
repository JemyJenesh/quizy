<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $questions = [
      [
        'text' => 'What is the capital of Norway?',
        'category' => 1,
        'options' => [
          [
            'text' => 'Madrid',
            'is_correct' => false,
          ],
          [
            'text' => 'Dili',
            'is_correct' => false,
          ],
          [
            'text' => 'Oslo',
            'is_correct' => true,
          ],
          [
            'text' => 'Havana',
            'is_correct' => false,
          ],
        ],
      ],
      [
        'text' => 'What is the capital of Nepal?',
        'category' => 1,
        'options' => [
          [
            'text' => 'Pokhara',
            'is_correct' => false,
          ],
          [
            'text' => 'Chitwan',
            'is_correct' => false,
          ],
          [
            'text' => 'Hetauda',
            'is_correct' => false,
          ],
          [
            'text' => 'Kathmandu',
            'is_correct' => true,
          ],
        ],
      ],
      [
        'text' => 'What is the capital of Spain?',
        'category' => 1,
        'options' => [
          [
            'text' => 'Madrid',
            'is_correct' => true,
          ],
          [
            'text' => 'Havana',
            'is_correct' => false,
          ],
          [
            'text' => 'Bangkok',
            'is_correct' => false,
          ],
          [
            'text' => 'Beirut',
            'is_correct' => false,
          ],
        ],
      ],
      [
        'text' => 'Kabaddi is the national game of which country?',
        'category' => 2,
        'options' => [
          [
            'text' => 'Pakistan',
            'is_correct' => false,
          ],
          [
            'text' => 'Australia',
            'is_correct' => false,
          ],
          [
            'text' => 'Bangladesh',
            'is_correct' => true,
          ],
          [
            'text' => 'Russia',
            'is_correct' => false,
          ],
        ],
      ],
      [
        'text' => 'What is the National sport of Argentina?',
        'category' => 2,
        'options' => [
          [
            'text' => 'Pato',
            'is_correct' => true,
          ],
          [
            'text' => 'Bull Fighting',
            'is_correct' => false,
          ],
          [
            'text' => 'Football',
            'is_correct' => false,
          ],
          [
            'text' => 'Wrestling',
            'is_correct' => false,
          ],
        ],
      ],
      [
        'text' => 'What is the National Sport of Bhutan?',
        'category' => 2,
        'options' => [
          [
            'text' => 'Tennis',
            'is_correct' => false,
          ],
          [
            'text' => 'Skating',
            'is_correct' => false,
          ],
          [
            'text' => 'Archery',
            'is_correct' => true,
          ],
          [
            'text' => 'Badminton',
            'is_correct' => false,
          ],
        ],
      ],
    ];

    foreach ($questions as $q) {
      $question = Question::create([
        'text' => $q['text'],
        'category_id' => $q['category'],
        'user_id' => 1,
      ]);
      foreach ($q['options'] as $op) {
        $question->options()->create($op);
      }
    }
  }
}
