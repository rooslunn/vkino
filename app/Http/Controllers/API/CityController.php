<?php namespace App\Http\Controllers\API;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Contracts\Gateway\Request as GatewayHelper;
//use Illuminate\Http\Request;

class CityController extends Controller
{
    protected $gateway;

    public function __construct(GatewayHelper $gateway)
    {
        $this->gateway = $gateway;
    }

    /**
     * Display a listing of the resource.
     *
     * @return string
     */
    public function index()
    {
        return $this->gateway->query('cities/all');
    }
}
