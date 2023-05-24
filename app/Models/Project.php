<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CrashReport;

class Project extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'full_image'];
    protected $appends = ['n_flight_reports', 'n_crash_reports', 'n_drones', 'n_manufacturers', 'n_flight_hours', 'n_active'];

    public function getNActiveAttribute()
    {
        $drones = $this->drones;
        $counter = 0;
        foreach ($drones as $drone) {
            if ($drone->active) {
                $counter++;
            }
        }

        return $counter;
    }

    public function getNFlightReportsAttribute()
    {
        return $this->flightReports()->count();
    }

    public function getNFlightHoursAttribute()
    {
        $flightReports = $this->flightReports;
        $counter = 0;

        foreach ($flightReports as  $flightReport) {
            $counter += $flightReport->flight_duration;
        }

        $stringValue = explode(".", (string) round($counter / 60, 2));

        if (count($stringValue) > 1) {
            $hour  = strlen($stringValue[0]) == 2 ? $stringValue[0] : "0" . $stringValue[0];
            $minute = strlen($stringValue[1]) == 2 ? $stringValue[1] : "0" . $stringValue[1];
            return $hour . ":" . $minute;
        }

        return 0;
    }

    public function getNManufacturersAttribute()
    {
        $drones = $this->drones;
        $count = [];
        foreach ($drones as $drone) {
            array_push($count, $drone->manufacturer_id);
        }
        return count(array_count_values($count));
    }

    public function getNCrashReportsAttribute()
    {
        $flightReports = $this->flightReports()->get();

        $counter = 0;
        foreach ($flightReports as $key => $flightReport) {
            $counter += CrashReport::where('flight_report_id', $flightReport->id)->count();
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

    public function manufacturers()
    {
        return $this->hasManyThrough(Manufacturer::class, Drone::class);
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
