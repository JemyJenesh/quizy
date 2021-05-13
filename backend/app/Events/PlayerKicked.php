<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PlayerKicked implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $player;
  /**
   * Create a new event instance.
   *
   * @return void
   */
  public function __construct($player) {
    $this->player = $player;
  }

  /**
   * Get the channels the event should broadcast on.
   *
   * @return \Illuminate\Broadcasting\Channel|array
   */
  public function broadcastOn() {
    return new Channel('quiz-' . $this->player->quiz_id);
  }
}
