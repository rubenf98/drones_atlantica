<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localization extends Model
{
    use HasFactory;
    protected $fillable = ['district', 'conceil', 'place', 'latitude', 'longitude'];

    public static function generateDataArray($validator, $prefix)
    {
        return [
            "district" => $validator[$prefix . '_district'],
            "conceil" => $validator[$prefix . '_conceil'],
            "place" => $validator[$prefix . '_place'],
            "latitude" => $validator[$prefix . '_latitude'],
            "longitude" => $validator[$prefix . '_longitude'],
        ];
    }

    public static function store($validator, $prefix)
    {
        return self::create(self::generateDataArray($validator, $prefix));
    }

    public function flightReport()
    {
        return $this->hasMany(FlightReport::class);
    }
}
