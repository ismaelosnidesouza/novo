<?php

use Illuminate\Http\Request;

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
Route::post('auth/register', 'AuthController@register');
Route::post('auth/login', 'AuthController@login');

Route::middleware('auth:api')->group(function ($e) {

    Route::get('alunos', 'AlunoController@index');
    Route::get('alunos/{aluno}', 'AlunoController@show');
    Route::post('alunos', 'AlunoController@store');
    Route::put('alunos/{aluno}', 'AlunoController@update');
    Route::delete('alunos/{aluno}', 'AlunoController@destroy');

    Route::post('alunos/{aluno}/notas', 'NotasController@store');
    Route::get('alunos/{aluno}/notas', 'NotasController@index');
    Route::get('alunos/{aluno}/notas/{nota}', 'NotasController@show');
    Route::put('alunos/{aluno}/notas/{nota}', 'NotasController@update');
    Route::delete('alunos/{aluno}/notas/{nota}', 'NotasController@destroy');

    Route::post('auth/logout', 'AuthController@logout');
    Route::get('auth', 'AuthController@index');

});
