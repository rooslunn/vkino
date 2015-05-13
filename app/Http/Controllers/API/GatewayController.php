<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\Gateway\Request as GatewayHelper;
//use Illuminate\Http\Request;

class GatewayController extends Controller
{
    protected $gateway;

    public function __construct(GatewayHelper $gateway)
    {
        $this->gateway = $gateway;
    }

    /**
     * Display a listing of the resource.
     *
     * @param $resource
     * @return string
     */
    public function index($resource)
    {
        return $this->gateway->query($resource);
    }
}
