<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drone extends Model
{
    use HasFactory;
    protected $fillable = [
        'project_id', 'manufacturer_id', 'drone_type_id', 'serial_number', 'n_motors',
        'n_motors', 'max_weight', 'max_altitude', 'max_speed', 'max_distance', 'danger_transportation', 'designation', 'propulsion_type',
    ];

    public function manufacturer()
    {
        return $this->belongsTo('App\Manufacturer');
    }

    public function project()
    {
        return $this->belongsTo('App\Manufacturer');
    }

    public function type()
    {
        return $this->belongsTo('App\DroneType');
    }

    public function documentation()
    {
        return $this->hasOne('App\Documentation');
    }
}
