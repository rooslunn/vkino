<?php namespace App\Providers\Gateway;

use Illuminate\Support\ServiceProvider;
use App\Http\Requests\Gateway\GuzzleHttpClient;

class HttpServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton('App\Contracts\Gateway\HttpClient', function () {
            return new GuzzleHttpClient();
        });
    }
}
