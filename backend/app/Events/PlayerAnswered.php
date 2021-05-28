<?php

namespace App\Events;

use App\Models\Player;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PlayerAnswered implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;
  public $quizId;
  public $players;
  public $correct;
  public $option;

  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($quizId, $correct, $option) {
    $this->quizId = $quizId;
    $this->players = Player::where('quiz_id', $quizId)->get();
    $this->correct = $correct;
    $this->option = $option;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn() {
    return new Channel('quiz-' . $this->quizId);
  }
}
