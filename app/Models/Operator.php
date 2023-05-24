<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Operator extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'title', 'address', 'door_number', 'postal_code',
        'locality', 'country', 'email', 'phone', 'status'
    ];
    public static function generateDataArray($validator)
    {
        return [
            "name" => $validator['operator_name'],
            "address" => Arr::get($validator, 'operator_address'),
            "title" => Arr::get($validator, 'operator_title'),
            "door_number" => Arr::get($validator, 'operator_door_number'),
            "postal_code" => Arr::get($validator, 'operator_postal_code'),
            "locality" => Arr::get($validator, 'operator_locality'),
            "country" => Arr::get($validator, 'operator_country'),
            "email" => $validator['operator_email'],
            "phone" => Arr::get($validator, 'operator_phone'),
            "status" => $validator['status'],
        ];
    }

    public static function store($validator)
    {
        return self::create(self::generateDataArray($validator));
    }

    public function flightReport()
    {
        return $this->hasMany(FlightReport::class);
    }
}
