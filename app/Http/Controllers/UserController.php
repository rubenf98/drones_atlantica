<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UserResource::collection(User::paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $validator = $request->validated();

        $record = User::create($validator);

        if (Arr::get($validator, 'file')) {
            $imageName = time() . '_' . $record->id . '.' . $validator['file']->extension();

            $validator['file']->move(public_path('images/users'), $imageName);
            $record->image = "/images/users/" .  $imageName;
            $record->save();
        }

        return new UserResource($record);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $validator = $request->validated();

        $user->update($validator);

        if (Arr::get($validator, 'file')) {
            $imageName = time() . '_' . $user->id . '.' . $validator['file']->extension();

            $validator['file']->move(public_path('images/users'), $imageName);
            $user->image = "/images/users/" .  $imageName;
            $user->save();
        }

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(null, 204);
    }
}
