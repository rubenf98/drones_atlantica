<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Condition extends Model
{
    use HasFactory;
    protected $fillable = ['weather', 'transmission', 'safety'];

    public function flightReports()
    {
        return $this->belongsTo('App\FlightReport');
    }
}
