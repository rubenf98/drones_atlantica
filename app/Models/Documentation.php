<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documentation extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_certificate',
        'type_certificate',
        'license_plate',
        'noise_certificate',
        'noise_certificate_id',
        'airworthiness_certificate',
        'airworthiness_certificate_id',
        'drone_id',
    ];

    public function drone()
    {
        return $this->belongsTo('App\Drone');
    }
}
