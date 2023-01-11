<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class FlightReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'date', 'client', 'pix4d', 'visibility', 'max_altitude', 'max_distance', 'payload',
        'description', 'objective', 'plan',
        'connection_type', 'transmission_power', 'connected_devices', 'flight_duration',
        'pre_verification', 'during_verification', 'post_verification',
        'user_id', 'drone_id', 'operator_id', 'start_localization_id', 'end_localization_id', 'nearby_id', 'condition_id'
    ];

    public static function generateDataArray($validator)
    {
        return [
            "date" => $validator["date"],
            "client" => Arr::get($validator, 'client'),
            "pix4d" => Arr::get($validator, 'pix4d'),
            "visibility" => Arr::get($validator, 'visibility'),
            "max_altitude" => Arr::get($validator, 'max_altitude'),
            "max_distance" => Arr::get($validator, 'max_distance'),
            "payload" => Arr::get($validator, 'payload'),

            "description" => Arr::get($validator, 'description'),
            "objective" => Arr::get($validator, 'objective'),
            "plan" => Arr::get($validator, 'plan'),

            "connection_type" => Arr::get($validator, 'connection_type'),
            "transmission_power" => Arr::get($validator, 'transmission_power'),
            "connected_devices" => Arr::get($validator, 'connected_devices'),
            "flight_duration" => Arr::get($validator, 'flight_duration'),

            "pre_verification" => Arr::get($validator, 'pre_verification'),
            "during_verification" => Arr::get($validator, 'during_verification'),
            "post_verification" => Arr::get($validator, 'post_verification'),

            "user_id" => $validator["user_id"],
            "drone_id" => $validator["drone_id"],
            "operator_id" => $validator["operator_id"],
            "start_localization_id" => $validator["start_localization_id"],
            "end_localization_id" => $validator["end_localization_id"],
            "nearby_id" => $validator["nearby_id"],
            "condition_id" => $validator["condition_id"],
        ];
    }

    public static function store($validator)
    {
        $record = self::create(self::generateDataArray($validator));

        $date = Carbon::parse($validator["date"]);
        $serial = 'R-19' . $date->format('y');

        $record->serial_number = $serial . str_pad($record->id, 4, '0', STR_PAD_LEFT);
        $record->save();

        return $record;
    }

    public function condition()
    {
        return $this->belongsTo(Condition::class);
    }

    public function nearby()
    {
        return $this->belongsTo(Nearby::class);
    }

    public function operator()
    {
        return $this->belongsTo(Operator::class);
    }

    public function startLocalization()
    {
        return $this->belongsTo(Localization::class, 'start_localization_id');
    }

    public function endLocalization()
    {
        return $this->belongsTo(Localization::class, 'end_localization_id');
    }

    public function drone()
    {
        return $this->belongsTo(Drone::class)->with('project');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function crashReport()
    {
        return $this->hasOne(CrashReport::class);
    }
}
