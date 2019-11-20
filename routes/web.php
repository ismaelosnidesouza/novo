<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Route::get('/departamento', function () {
    return view('departamento');
});

Route::get('/funcionario', function () {
    return view('funcionario');
});

Route::get('/login', function () {
    return view('login');
});
