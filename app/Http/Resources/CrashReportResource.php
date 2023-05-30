<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CrashReportResource extends JsonResource
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
            'date' => $this->date,
            'damage' => $this->damage,
            'analysis' => $this->analysis,
            'description' => $this->description,
            'corrections' => $this->corrections,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'media' => $this->media,
            'flightReport' => $this->flightReport,
            'drone' => $this->flightReport->drone,
        ];
    }
}
