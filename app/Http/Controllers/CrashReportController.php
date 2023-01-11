<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrashReportRequest;
use App\Http\Resources\CrashReportResource;
use App\Models\CrashMedia;
use App\Models\CrashReport;
use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;

class CrashReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CrashReportResource::collection(CrashReport::with('flightReport')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CrashReportRequest $request)
    {
        $validator = $request->validated();

        $record = CrashReport::create($validator);

        if ($validator['images']) {
            $imageName = time() . '_' . $record->id;
            foreach ($validator['images'] as $image) {
                $out = new ConsoleOutput();
                $out->writeln($image);
                $imageName = $imageName . '_CR.' . $image->extension();
                // move_uploaded_file($image, public_path('images/crash_reports' . $imageName));
                // $image->move(public_path('images/crash_reports'), $imageName);
                $out->writeln($image->extension());
                CrashMedia::create([
                    'path' =>  $imageName,
                    'crash_report_id' => $record->id,
                    'file_type' => $image->extension(),
                ]);
            }
        }

        return new CrashReportResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CrashReport  $crashReport
     * @return \Illuminate\Http\Response
     */
    public function show(CrashReport $crashReport)
    {
        return new CrashReportResource($crashReport);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CrashReport  $crashReport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CrashReport $crashReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CrashReport  $crashReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(CrashReport $crashReport)
    {
        //
    }
}
