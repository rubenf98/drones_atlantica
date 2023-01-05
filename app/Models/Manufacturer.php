<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'title', 'address', 'door_number', 'postal_code',
        'locality', 'country', 'email', 'phone',
    ];

    public function drones()
    {
        return $this->hasMany('App\Drone');
    }
}
