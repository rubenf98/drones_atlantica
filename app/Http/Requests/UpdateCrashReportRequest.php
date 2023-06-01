<?php

namespace App\Http\Requests;


use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Auth;


class UpdateCrashReportRequest extends FormRequest
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
        $this->merge([
            'date' => Carbon::parse($this->date),
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
            'flight_report_id' => 'nullable|integer|exists:flight_reports,id',
            'damage' => 'nullable|string',
            'analysis' => 'nullable|string',
            'description' => 'nullable|string',
            'corrections' => 'nullable|string',
            'images_*' => 'nullable|image|mimes:jpg,jpeg',
            'remove' => 'nullable|array',
            'latitude' => 'required',
            'longitude' => 'required',
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
