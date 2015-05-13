<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/**
 * Landing page
 */
get('/', 'HomeController@index');

/**
 * API for frontend
 */
Route::pattern('api_resource', '[a-z0-9/]+');
resource('api/{api_resource}', 'API\GatewayController');


// Route::controllers([
//     'auth' => 'Auth\AuthController',
//     'password' => 'Auth\PasswordController',
// ]);
