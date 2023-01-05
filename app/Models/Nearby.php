<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nearby extends Model
{
    use HasFactory;
    protected $fillable = ['people', 'animals', 'vehicles', 'aircrafts'];

    public function flightReport()
    {
        return $this->belongsTo('App\FlightReport');
    }

}
