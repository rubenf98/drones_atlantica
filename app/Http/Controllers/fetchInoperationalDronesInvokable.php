<?php

namespace App\Http\Controllers;

use App\Http\Resources\DroneResource;
use App\Models\Drone;
use Illuminate\Http\Request;

class fetchInoperationalDronesInvokable extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return DroneResource::collection(Drone::where("operational", false)->with('droneType')->with('manufacturer')->get());
    }
}
