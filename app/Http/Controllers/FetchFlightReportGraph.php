<?php

namespace App\Http\Controllers;

use App\Models\FlightReport;
use Carbon\Carbon;
use Illuminate\Http\Request;

class FetchFlightReportGraph extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $reports = FlightReport::all();
        $response = [];

        foreach ($reports as $key => $report) {
            $date = Carbon::parse($report->date)->format('d-m-Y');
            if (array_key_exists($date, $response)) {
                $response[$date] = $response[$date] + 1;
            } else {
                $response[$date] = 1;
            }
        }

        return $response;
    }
}
