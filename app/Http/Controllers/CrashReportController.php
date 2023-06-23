<?php

namespace App\Http\Controllers;

use App\Http\Requests\CrashReportRequest;
use App\Http\Requests\UpdateCrashReportRequest;
use App\Http\Resources\CrashReportResource;
use App\Models\CrashMedia;
use App\Models\CrashReport;
use Illuminate\Http\Request;
use Symfony\Component\Console\Output\ConsoleOutput;
use Intervention\Image\Facades\Image;

class CrashReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CrashReportResource::collection(CrashReport::with('flightReport')->latest()->paginate(10));
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
        $images = [];
        $inputs = $request->all();
        // $out = new ConsoleOutput();

        foreach ($inputs as $key => $value) {
            // $out->writeln($key);
            if (str_contains($key, "image_")) {
                array_push($images, $value);
            }
        }

        if (count($images)) {
            $imageName = time() . '_' . $record->id;

            foreach ($images as $index => $image) {
                Image::make($image)->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })->save(storage_path('app/public/crash_reports/' . $index . "_" . $imageName . "." . $image->extension()));

                CrashMedia::create([
                    'path' =>  $index . "_"  . $imageName,
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
    public function update(UpdateCrashReportRequest $request, CrashReport $crashReport)
    {
        $validator = $request->validated();

        $crashReport->update($validator);
        $images = [];
        $inputs = $request->all();
        // $out = new ConsoleOutput();

        if (array_key_exists("remove", $validator)) {
            foreach ($validator["remove"] as $removeId) {
                $removeRecord = CrashMedia::find($removeId);
                $removeRecord->delete();
            }
        }

        foreach ($inputs as $key => $value) {
            // $out->writeln($key);
            if (str_contains($key, "image_")) {
                array_push($images, $value);
            }
        }

        if (count($images)) {
            $imageName = time() . '_' . $crashReport->id;

            foreach ($images as $index => $image) {
                Image::make($image)->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                })->save(storage_path('app/public/crash_reports/' . $index . "_" . $imageName . "." . $image->extension()));

                CrashMedia::create([
                    'path' =>  $index . "_"  . $imageName,
                    'crash_report_id' => $crashReport->id,
                    'file_type' => $image->extension(),
                ]);
            }
        }

        return new CrashReportResource($crashReport);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CrashReport  $crashReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(CrashReport $crashReport)
    {
        $crashReport->delete();

        return response()->json(null, 204);
    }
}
