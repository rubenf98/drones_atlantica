<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlightReport extends Model
{
    use HasFactory;

    public function condition()
    {
        return $this->hasOne('App\Condition');
    }

    public function nearby()
    {
        return $this->hasOne('App\Nearby');
    }

    public function operator()
    {
        return $this->hasOne('App\Operator');
    }

    public function startLocalization()
    {
        return $this->hasOne('App\Localization', 'start_localization_id');
    }

    public function endLocalization()
    {
        return $this->hasOne('App\Localization', 'end_localization_id');
    }

    public function drone()
    {
        return $this->hasOne('App\Drone');
    }

    public function user()
    {
        return $this->hasOne('App\User');
    }
}
