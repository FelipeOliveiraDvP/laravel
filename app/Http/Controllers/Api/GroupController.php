<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Group;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::all()->toArray();

        return array_reverse($groups);
    }

    public function details($id)
    {
        $group = Group::find($id);

        return response()->json($group);
    }

    public function create(Request $request)
    {
        $group = new Group([
            'name'          => $request->name,
            'description'   => $request->description
        ]);

        $group->save();

        return response()->json('Grupo criado com sucesso!', 201);
    }

    public function udpate($id, Request $request)
    {
        $group = Group::find($id);
        $group->udpate($request->all());

        return response()->json('Grupo atualizado com sucesso!');
    }

    public function delete($id)
    {
        $group = Group::find($id);
        $group->delete();

        return response()->json('Grupo removido com sucesso!');
    }
}
