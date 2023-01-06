<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cerbero\QueryFilters\FiltersRecords;
use App\Models\FlightReport;

class Drone extends Model
{
    use FiltersRecords;
    protected $appends = ['n_flight_reports', 'n_crash_reports'];

    public function getNFlightReportsAttribute()
    {
        return $this->flightReports()->count();
    }


    public function getNCrashReportsAttribute()
    {
        return $this->crashes()->count();
    }


    protected $fillable = [
        'project_id', 'manufacturer_id', 'drone_type_id', 'serial_number', 'n_motors', 'image',
        'n_motors', 'max_weight', 'max_altitude', 'max_speed', 'max_distance', 'danger_transportation', 'designation', 'propulsion_type',
    ];

    public function crashes()
    {
        return $this->hasManyThrough(CrashReport::class, FlightReport::class);
    }

    public function flightReports()
    {
        return $this->belongsTo(FlightReport::class);
    }


    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function droneType()
    {
        return $this->belongsTo(DroneType::class);
    }

    public function documentation()
    {
        return $this->hasOne(Documentation::class);
    }
}
