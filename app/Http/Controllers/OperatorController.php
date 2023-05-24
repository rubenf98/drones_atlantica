<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatorRequest;
use App\Http\Resources\OperatorResource;
use App\Models\Operator;
use Illuminate\Http\Request;

class OperatorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginate = 10;

        if ($request->has('selectorMode')) {
            $paginate = 10000;
        }

        return OperatorResource::collection(Operator::where('status', true)->paginate($paginate));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OperatorRequest $request)
    {
        $validator = $request->validated();

        $record = Operator::create($validator);

        return new OperatorResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Operator  $operator
     * @return \Illuminate\Http\Response
     */
    public function show(Operator $operator)
    {
        return new OperatorResource($operator);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Operator  $operator
     * @return \Illuminate\Http\Response
     */
    public function update(OperatorRequest $request, Operator $operator)
    {
        $validator = $request->validated();

        $operator->update($validator);

        return new OperatorResource($operator);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Operator  $operator
     * @return \Illuminate\Http\Response
     */
    public function destroy(Operator $operator)
    {
        $operator->delete();

        return response()->json(null, 204);
    }
}
