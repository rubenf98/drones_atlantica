<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DroneController;
use App\Http\Controllers\DroneTypeController;
use App\Http\Controllers\FetchFlightReportGraph;
use App\Http\Controllers\FlightReportController;
use App\Http\Controllers\LocalizationController;
use App\Http\Controllers\ManufacturerController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});
Route::get('/selector/projects', 'App\Http\Controllers\ProjectController@selector');
Route::get('/flight-reports/graph', FetchFlightReportGraph::class);

Route::apiResource('projects', ProjectController::class);
Route::apiResource('drones', DroneController::class);
Route::apiResource('drone-type', DroneTypeController::class);
Route::apiResource('manufacturers', ManufacturerController::class);
Route::apiResource('localizations', LocalizationController::class);
Route::apiResource('operators', OperatorController::class);
Route::apiResource('flight-reports', FlightReportController::class);
