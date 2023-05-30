<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CrashReport extends Model
{
    use HasFactory;
    protected $fillable = ['date', 'description', 'flight_report_id', 'latitude', 'longitude', 'damage', 'analysis', 'corrections'];

    public function flightReport()
    {
        return $this->belongsTo(FlightReport::class)->with('drone.project');
    }

    public function media()
    {
        return $this->hasMany(CrashMedia::class);
    }
}
