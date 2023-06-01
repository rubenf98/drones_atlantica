<?php

namespace App\Http\Controllers;

use App\Http\Requests\FlightReportRequest;
use App\Http\Resources\FlightReportResource;
use App\Models\Authorization;
use App\Models\Condition;
use App\Models\FlightReport;
use App\Models\Localization;
use App\Models\Nearby;
use App\Models\Operator;
use App\QueryFilters\FlightReportFilters;
use Carbon\Carbon;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

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
                ->latest()->paginate(10)
        );
    }

    public function selector(FlightReportFilters $filters)
    {
        return FlightReportResource::collection(FlightReport::filterBy($filters)->get());
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

        if (Arr::get($validator, "authorizations")) {
            foreach ($validator["authorizations"] as $authorization) {
                $path = Storage::putFile('public/authorizations', new File($authorization));
                Authorization::create([
                    "path" =>  $path,
                    "flight_report_id" => $record->id
                ]);
            }
        }

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
    public function update(FlightReportRequest $request, FlightReport $flightReport)
    {
        $validator = $request->validated();

        $condition = $flightReport->condition;
        $condition->edit($validator);

        $nearby = $flightReport->nearby;
        $nearby->edit($validator);

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

        $flightReport->update($flightReport->generateDataArray($validator));
        $serial = 'R-19' . Carbon::parse($flightReport->date)->format('y');
        $flightReport->serial_number = $serial . str_pad($flightReport->id, 4, '0', STR_PAD_LEFT);
        $flightReport->save();
        return new FlightReportResource($flightReport);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FlightReport  $flightReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(FlightReport $flightReport)
    {
        $flightReport->delete();

        return response()->json(null, 204);
    }
}
