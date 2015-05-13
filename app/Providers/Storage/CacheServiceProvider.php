<?php namespace App\Providers\Storage;

use Illuminate\Support\ServiceProvider;
use App\Services\Storage\RedisKino;

class CacheServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap the application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}

	/**
	 * Register the application services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->singleton('App\Contracts\Storage\Cache', function () {
			return new RedisKino();
		});
	}

}
