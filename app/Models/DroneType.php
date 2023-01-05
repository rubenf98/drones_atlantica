<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DroneType extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function drones()
    {
        return $this->hasMany('App\Drone');
    }
}
