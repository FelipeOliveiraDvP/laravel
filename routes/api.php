<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\GroupController;
use App\Http\Controllers\API\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::group(['prefix' => 'groups', 'middleware' => 'auth:sanctum'], function () {
    Route::get('/', [GroupController::class, 'index']);
    Route::get('/{id}', [GroupController::class, 'details']);
    Route::post('/', [GroupController::class, 'create']);
    Route::put('/{id}', [GroupController::class, 'update']);
    Route::delete('/{id}', [GroupController::class, 'delete']);
});
