<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Nearby extends Model
{
    use HasFactory;
    protected $fillable = ['people', 'animals', 'vehicles', 'aircrafts'];

    public static function generateDataArray($validator)
    {
        return [
            "people" => Arr::get($validator, 'nearby_people'),
            "animals" => Arr::get($validator, 'nearby_animals'),
            "vehicles" => Arr::get($validator, 'nearby_vehicles'),
            "aircrafts" => Arr::get($validator, 'nearby_aircrafts'),
        ];
    }

    public static function store($validator)
    {
        return self::create(self::generateDataArray($validator));
    }


    public function flightReport()
    {
        return $this->hasOne(FlightReport::class);
    }
}
