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
            'danger_transportation' => $this->danger_transportation ? 1 : 0,
            'active' => $this->active ? 1 : 0
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
            'serial_number' => ['required', Rule::unique('drones')->ignore($this->drone->serial_number, 'serial_number')->where(fn ($query) => $query->where('project_id', $this->project_id))],
            'designation' => 'nullable|string',
            'propulsion_type' => 'nullable|string',

            'height' => 'nullable|numeric|min:0',
            'length' => 'nullable|numeric|min:0',
            'width' => 'nullable|numeric|min:0',
            'n_motors' => 'nullable|integer|min:0',
            'mtom' => 'nullable|numeric|min:0',

            'max_altitude' => 'nullable|numeric|min:0',
            'max_distance' => 'nullable|numeric|min:0',
            'max_speed' => 'nullable|numeric|min:0',

            'danger_transportation' => 'required|bool',
            'active' => 'required|bool',
            'file' => 'nullable|image|mimes:jpg,jpeg',

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
