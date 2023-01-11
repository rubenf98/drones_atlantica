<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CrashReport;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'full_image'];
    protected $appends = ['n_flight_reports', 'n_crash_reports', 'n_drones'];

    public function getNFlightReportsAttribute()
    {
        return $this->flightReports()->count();
    }

    public function getNCrashReportsAttribute()
    {
        $flightReports = $this->flightReports()->get();
        
        $counter = 0;
        foreach ($flightReports as $key => $flightReport) {
            if (CrashReport::where('flight_report_id', $flightReport->id)->count()) {
                $counter++;
            }
        }
        return $counter;
    }

    public function getNDronesAttribute()
    {
        return $this->drones()->count();
    }


    public function drones()
    {
        return $this->hasMany(Drone::class);
    }

    public function flightReports()
    {
        return $this->hasManyThrough(FlightReport::class, Drone::class);
    }

    public function crashes()
    {
        return $this->hasManyThrough(CrashReport::class, Drone::class);
    }
}
