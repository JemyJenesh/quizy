<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class QuizEnded implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $quiz;
  public $winner_player_id;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($quiz) {
    $this->quiz = $quiz;
    $this->winner_player_id = $quiz->players->count() > 0 ? $quiz->players()->orderBy('score', 'desc')->first()->id : null;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn() {
    return new Channel('quiz-' . $this->quiz->id);
  }
}
