<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Condition extends Model
{
    use HasFactory;
    protected $fillable = ['weather', 'transmission', 'safety'];

    public function flightReport()
    {
        return $this->hasOne(FlightReport::class);
    }

    public static function generateDataArray($validator)
    {
        return [
            "weather" => Arr::get($validator, 'condition_weather'),
            "transmission" => Arr::get($validator, 'condition_transmission'),
            "safety" => Arr::get($validator, 'condition_safety'),
        ];
    }

    public static function store($validator)
    {
        return self::create(self::generateDataArray($validator));
    }
}
