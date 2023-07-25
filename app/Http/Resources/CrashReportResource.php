<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
            'date' => Carbon::parse($this->date)->format('d-m-Y H:i'),
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
