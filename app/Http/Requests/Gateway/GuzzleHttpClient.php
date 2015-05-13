<?php namespace App\Http\Requests\Gateway;

use App\Contracts\Gateway\HttpClient;
use GuzzleHttp\Client as GuzzleClient;

class GuzzleHttpClient extends GuzzleClient implements HttpClient {

}