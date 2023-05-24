<?php

namespace App\Http\Controllers;

use App\Http\Resources\OperatorResource;
use App\Models\Operator;
use Illuminate\Http\Request;

class FetchInoperationalOperatorInvokable extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return OperatorResource::collection(Operator::where("status", false)->get());
    }
}
