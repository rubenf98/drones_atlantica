<?php

namespace App\Http\Controllers;

use App\Http\Requests\FlightReportRequest;
use App\Http\Resources\FlightReportResource;
use App\Models\Condition;
use App\Models\FlightReport;
use App\Models\Localization;
use App\Models\Nearby;
use App\Models\Operator;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class FlightReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FlightReportResource::collection(
            FlightReport::with('crashReport')->with('startLocalization')->with('operator')->with('drone')
                ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FlightReportRequest $request)
    {
        $validator = $request->validated();

        $condition = Condition::store($validator);
        $nearby = Nearby::store($validator);

        $validator['condition_id'] = $condition->id;
        $validator['nearby_id'] = $nearby->id;

        if (!Arr::get($validator, "operator_id")) {
            $operator = Operator::store($validator);
            $validator['operator_id'] = $operator->id;
        }

        if (!Arr::get($validator, "start_localization_id")) {
            $start_localization = Localization::store($validator, "start");
            $validator['start_localization_id'] = $start_localization->id;
        }

        if (Arr::get($validator, "reuseStartLocalization")) {
            $validator['end_localization_id'] = $validator['start_localization_id'];
        }

        $record = FlightReport::store($validator);

        // if ($validator['image']) {
        //     $imageName = time() . '_' . $record->id . '.' . $validator['image']->extension();

        //     $validator['image']->move(public_path('images/drones'), $imageName);
        //     $record->image = $imageName;
        //     $record->save();
        // }


        return new FlightReportResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FlightReport  $flightReport
     * @return \Illuminate\Http\Response
     */
    public function show(FlightReport $flightReport)
    {
        return new FlightReportResource($flightReport);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FlightReport  $flightReport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FlightReport $flightReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FlightReport  $flightReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(FlightReport $flightReport)
    {
        //
    }
}
