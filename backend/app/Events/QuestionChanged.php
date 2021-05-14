<?php

namespace App\Events;

use App\Http\Resources\QuestionResource;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class QuestionChanged implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $quiz;
  public $question;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($quiz) {
    $this->quiz = $quiz;
    $this->question = new QuestionResource($quiz->question);
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
