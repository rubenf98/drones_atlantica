<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\Console\Output\ConsoleOutput;

class FlightReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $out = new ConsoleOutput();

        // $ids = explode(",", $this->drone_id);

        $this->merge([
            'drone_id' => $this->drone_id[1],
            'operator_id' => $this->operator_id != "undefined" ? $this->operator_id : null,
            'user_id' => Auth::user()->id,
            'date' => Carbon::createFromFormat("d-m-Y H:i", $this->date),
            'nearby_vehicles' => $this->nearby_vehicles ? $this->nearby_vehicles : null,
            'nearby_aircrafts' => $this->nearby_aircrafts ? $this->nearby_aircrafts : null,
            'nearby_animals' => $this->nearby_animals ? $this->nearby_animals : null,
            'nearby_people' => $this->nearby_people ? $this->nearby_people : null,
            'reuseStartLocalization' => $this->reuseStartLocalization ? 1 : 0,
            'status' => 1
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date' => 'required|date',
            'drone_id' => 'required|exists:drones,id',
            'operator_id' => 'nullable|integer|exists:operators,id',
            'user_id' => 'required|integer|exists:users,id',

            'operator_name' => 'required_without:operator_id|string',
            'operator_address' => 'nullable|string',
            'operator_title' => 'nullable|string',
            'operator_door_number' => 'nullable|string',
            'operator_postal_code' => 'nullable|string',
            'operator_locality' => 'nullable|string',
            'operator_country' => 'nullable|string',
            'operator_email' => 'required_without:operator_id|email:rfc',
            'operator_phone' => 'nullable|string',
            'status' => 'required',

            'analysis' => 'nullable|string',
            'corrections' => 'nullable|string',

            'reuseStartLocalization' => 'nullable|integer',

            'start_localization_id' => 'nullable|integer|exists:localizations,id',
            'end_localization_id' => 'required_without:reuseStartLocalization|integer|exists:localizations,id',

            'start_district' => 'required_without:start_localization_id|string',
            'start_conceil' => 'required_without:start_localization_id|string',
            'start_place' => 'required_without:start_localization_id|string',
            'start_latitude' => 'required_without:start_localization_id',
            'start_longitude' => 'required_without:start_localization_id',

            'end_district' => 'required_without_all:end_localization_id,reuseStartLocalization|string',
            'end_conceil' => 'required_without_all:end_localization_id,reuseStartLocalization|string',
            'end_place' => 'required_without_all:end_localization_id,reuseStartLocalization|string',
            'end_latitude' => 'required_without_all:end_localization_id,reuseStartLocalization',
            'end_longitude' => 'required_without_all:end_localization_id,reuseStartLocalization',


            'flight_duration' => 'required|numeric|min:0',
            'max_distance' => 'required|numeric|min:0',
            'max_altitude' => 'required|numeric|min:0',

            'description' => 'required|string|min:0',
            'objective' => 'required|string|min:0',
            'plan' => 'required|string|min:0',

            'pre_verification' => 'nullable|string|min:0',
            'during_verification' => 'nullable|string|min:0',
            'post_verification' => 'nullable|string|min:0',

            'condition_weather' => 'nullable|string|min:0',
            'condition_safety' => 'nullable|string|min:0',
            'condition_transmission' => 'nullable|string|min:0',

            'connection_type' => 'required|string|min:0',
            'transmission_power' => 'required|numeric|min:0',

            'pix4d' => 'nullable|string',
            'anac' => 'nullable|string',
            'aan' => 'nullable|string',

            'payload' => 'nullable|string',
            'client' => 'nullable|string',
            'connected_devices' => 'nullable|string',
            'visibility' => 'nullable|string',

            'nearby_vehicles' => 'nullable|string',
            'nearby_aircrafts' => 'nullable|string',
            'nearby_animals' => 'nullable|string',
            'nearby_people' => 'nullable|string',

            'authorizations' => 'nullable|array',
            'authorizations.*' => 'mimes:pdf',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422));
    }
}
