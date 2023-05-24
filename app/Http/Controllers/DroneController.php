<?php

namespace App\Http\Controllers;

use App\Http\Requests\DroneRequest;
use App\Http\Requests\UpdateDroneRequest;
use App\Http\Resources\DroneResource;
use App\Models\Drone;
use App\QueryFilters\DroneFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class DroneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(DroneFilters $filters)
    {
        return DroneResource::collection(Drone::filterBy($filters)->where("operational", true)->with('droneType')->with('manufacturer')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DroneRequest $request)
    {
        $validator = $request->validated();

        $record = Drone::create($validator);

        if (Arr::get($validator, 'file')) {
            $imageName = time() . '_' . $record->id . '.' . $validator['file']->extension();

            $validator['file']->move(public_path('images/drones'), $imageName);
            $record->image = $imageName;
            $record->save();
        }


        return new DroneResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Drone  $drone
     * @return \Illuminate\Http\Response
     */
    public function show(Drone $drone)
    {
        return new DroneResource($drone);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Drone  $drone
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDroneRequest $request, Drone $drone)
    {
        $validator = $request->validated();

        $drone->update($validator);

        if (Arr::get($validator, 'file')) {
            $imageName = time() . '_' . $drone->id . '.' . $validator['file']->extension();

            $validator['file']->move(public_path('images/drones'), $imageName);
            $drone->image = "/images/drones/" .  $imageName;
            $drone->save();
        }

        return new DroneResource($drone);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Drone  $drone
     * @return \Illuminate\Http\Response
     */
    public function destroy(Drone $drone)
    {
        $drone->delete();

        return response()->json(null, 204);
    }
}
