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
        'project_id', 'acquisition', 'manufacturer_id', 'drone_type_id', 'serial_number', 'n_motors', 'image',
        'mtom', 'height', 'width', 'length', 'max_speed', 'max_distance', 'max_altitude', 'autonomy',
        'connection_type', 'connection_distance',
        'n_motors', 'danger_transportation', 'designation', 'propulsion_type', 'active', 'operational'
    ];

    public function crashes()
    {
        return $this->hasManyThrough(CrashReport::class, FlightReport::class);
    }

    public function flightReports()
    {
        return $this->hasMany(FlightReport::class);
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
