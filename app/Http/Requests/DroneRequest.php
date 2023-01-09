<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class DroneRequest extends FormRequest
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
            'danger_transportation' => $this->danger_transportation ? 1 : 0
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
            'serial_number' => ['required', Rule::unique('drones')->where(fn ($query) => $query->where('project_id', $this->project_id))],
            'designation' => 'nullable|string',
            'propulsion_type' => 'nullable|string',

            'height' => 'required|integer|min:0',
            'length' => 'required|integer|min:0',
            'width' => 'required|integer|min:0',
            'n_motors' => 'required|integer|min:0',
            'mtom' => 'required|integer|min:0',

            'max_altitude' => 'required|integer|min:0',
            'max_distance' => 'required|integer|min:0',
            'max_speed' => 'required|integer|min:0',

            'danger_transportation' => 'required|bool',
            'image' => 'nullable|image|mimes:jpg,jpeg',

            'drone_type_id' => 'required|integer|exists:drone_types,id',
            'project_id' => 'required|integer|exists:projects,id',
            'manufacturer_id' => 'required|integer|exists:manufacturers,id',
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
