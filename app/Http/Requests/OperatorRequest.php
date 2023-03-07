<?php

namespace App\Http\Requests;

use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class OperatorRequest extends FormRequest
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
            'name' => $this->operator_name,
            'title' => $this->operator_title,
            'address' => $this->operator_address,
            'door_number' => $this->operator_door_number,
            'postal_code' => $this->operator_postal_code,
            'locality' => $this->operator_locality,
            'country' => $this->operator_country,
            'email' => $this->operator_email,
            'phone' => $this->operator_phone
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
            'name' => 'required|string',
            'address' => 'nullable|string',
            'title' => 'nullable|string',
            'door_number' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'locality' => 'nullable|string',
            'country' => 'nullable|string',
            'email' => 'required|email:rfc',
            'phone' => 'nullable|string',
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
