<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class FlightReportResource extends JsonResource
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
            'date' => Carbon::parse($this->date)->format('d-m-Y H:i'),
            'objective' => $this->objective,
            'plan' => $this->plan,
            'flight_duration' => $this->flight_duration,
            'description' => $this->description,
            'visibility' => $this->visibility,
            'max_altitude' => $this->max_altitude,
            'max_distance' => $this->max_distance,
            'pix4d' => $this->pix4d,
            'client' => $this->client,
            'condition' => $this->condition,
            'nearby' => $this->nearby,
            'payload' => $this->payload,
            'user' => $this->user,
            'analysis' => $this->analysis,
            'corrections' => $this->corrections,
            'pre_verification' => $this->pre_verification,
            'during_verification' => $this->during_verification,
            'post_verification' => $this->post_verification,
            'connected_devices' => $this->connected_devices,
            'connection_type' => $this->connection_type,
            'transmission_power' => $this->transmission_power,
            'drone' => new DroneResource($this->drone),
            'operator' => $this->operator,
            'startLocalization' => $this->startLocalization,
            'endLocalization' => $this->endLocalization,
            'crashReport' => $this->crashReport,
            'created_at' => (string) $this->created_at,
        ];
    }
}
