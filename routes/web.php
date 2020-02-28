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

    return view('welcome');

});

Route::get('/check', function () {

    return session('chat');

});

Route::get('/chat', 'ChatController@getChat');

Route::post('/postChat', 'ChatController@postChat');

Route::post('/saveChatSession', 'ChatController@saveChatSession');

Route::get('/getOldMessages', 'ChatController@getOldMessages');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
