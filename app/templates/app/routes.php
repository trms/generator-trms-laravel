<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});

<% if (includeAdmin) { %>

Route::get('admin', function()
{
	return View::make('layouts.adminPageTemplate');
});

<% } %>


<% if (includeUsers) { %>

Route::get('login',function(){
	return View::make('users.login');
});

Route::resource('admin/users','UserController');

Route::resource('admin/backup','BackupController');

Route::get('logout','AuthController@destroy');

Route::resource('auth', 'AuthController');

Route::controller('password','RemindersController');

<% } %>



<% if (includeBackup) { %>


<% } %>