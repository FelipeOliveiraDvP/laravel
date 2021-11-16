<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function index()
    {
        $users = DB::table('users')
            ->join('groups', 'groups.id', '=', 'users.group_id')
            ->select([
                'users.id',
                'users.name',
                'users.email',
                'users.login',
                'users.created_at',
                'users.updated_at',
                'groups.name as user_group'
            ])
            ->get()
            ->toArray();

        return array_reverse($users);
    }

    public function details($id)
    {
        $user = User::find($id);

        return response()->json($user);
    }

    public function create(Request $request)
    {
        $user = new User([
            'name'      => $request->name,
            'email'     => $request->email,
            'login'     => $request->login,
            'password'  => Hash::make($request->password),
            'group_id'  => $request->group_id,
        ]);

        $user->save();

        return response()->json('Usuário criado com sucesso!', 201);
    }

    public function update($id, Request $request)
    {
        $user = User::find($id);
        $user->update([
            'name'      => $request->name,
            'email'     => $request->email,
            'login'     => $request->login,
            'password'  => Hash::make($request->password),
            'group_id'  => $request->group_id,
        ]);

        return response()->json('Usuário atualizado com sucesso!');
    }

    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();

        return response()->json('Usuário removido com sucesso!');
    }

    public function register(Request $request)
    {
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->login = $request->login;
            $user->group_id = $request->group_id;
            $user->password = Hash::make($request->password);
            $user->save();

            $success = true;
            $message = 'Usuário cadastrado com sucesso!';
        } catch (\Illuminate\Database\QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        return response()->json($response);
    }

    public function login(Request $request)
    {
        $credentials = [
            'email'     => $request->email,
            'password'  => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $success = true;
            $message = 'Login efetuado com sucesso!';
            $user = Auth::user();
        } else {
            $success = false;
            $message = 'Não autorizado';
            $user = null;
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
            'user'    => $user,
        ];
        return response()->json($response);
    }

    public function logout()
    {
        try {
            Session::flush();
            $success = true;
            $message = 'Logout efetuado com sucesso!';
        } catch (\Illuminate\Database\QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        return response()->json($response);
    }
}
