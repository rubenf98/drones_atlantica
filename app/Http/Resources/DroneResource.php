<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DroneResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'serial_number' => $this->serial_number,
            "n_motors" => $this->n_motors,
            "mtom" => $this->mtom,
            "height" => $this->height,
            "width" => $this->width,
            "drone_length" => $this->length,
            "max_speed" => $this->max_speed,
            "max_distance" => $this->max_distance,
            "max_altitude" => $this->max_altitude,
            "danger_transportation" => $this->danger_transportation,
            "designation" => $this->designation,
            "propulsion_type" => $this->propulsion_type,
            "image" => $this->image,
            "drone_type" => $this->droneType,
            "project" => $this->project,
            "manufacturer" => $this->manufacturer,
            "active" => $this->active,
            "created_at" => (string) $this->created_at,
            "n_flight_reports" => $this->n_flight_reports,
            "n_crash_reports" => $this->n_crash_reports

        ];
    }
}
