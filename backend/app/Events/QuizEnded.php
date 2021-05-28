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
  public $message;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($quiz) {
    $this->quiz = $quiz;
    $this->message = $quiz->players()->orderBy('score', 'asc')->first()->name . ' won the quiz!';
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
