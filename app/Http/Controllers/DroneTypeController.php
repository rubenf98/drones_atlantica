<?php

namespace App\Http\Controllers;

use App\Http\Resources\DroneTypeResource;
use App\Models\DroneType;
use Illuminate\Http\Request;

class DroneTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DroneTypeResource::collection(DroneType::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DroneType  $droneType
     * @return \Illuminate\Http\Response
     */
    public function show(DroneType $droneType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DroneType  $droneType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DroneType $droneType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DroneType  $droneType
     * @return \Illuminate\Http\Response
     */
    public function destroy(DroneType $droneType)
    {
        //
    }
}
