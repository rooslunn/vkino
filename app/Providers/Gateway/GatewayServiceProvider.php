<?php namespace App\Providers\Gateway;

use Illuminate\Support\ServiceProvider;
use App\Http\Requests\Gateway\VkinoRequest;

class GatewayServiceProvider extends ServiceProvider
{
    protected $defer = true;

    public function register()
    {
        $this->app->singleton('App\Contracts\Gateway\Request', function ($app) {
            return new VkinoRequest(
                $app['App\Contracts\Gateway\HttpClient'],
                $app['config']['gateway']
            );
        });
    }

    public function provides()
    {
        return ['App\Contracts\Gateway\Request'];
    }
}
