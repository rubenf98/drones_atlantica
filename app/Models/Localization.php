<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localization extends Model
{
    use HasFactory;
    protected $fillable = ['district', 'conceil', 'place', 'latitude', 'longitude'];

    public function flightReport()
    {
        return $this->belongsTo('App\FlightReport');
    }
}
