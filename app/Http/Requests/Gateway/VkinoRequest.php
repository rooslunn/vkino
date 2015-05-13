<?php namespace App\Http\Requests\Gateway;

use App\Contracts\Gateway\HttpClient;
use App\Contracts\Gateway\Request;
use App\Http\Requests\Gateway\DataFormat;

class VkinoRequest implements Request
{
    private $httpClient;

    private $config;

    public function __construct(HttpClient $httpClient, array $config)
    {
        $this->httpClient = $httpClient;
        $this->config = $config;
    }

    public function query($entity)
    {
        $url = $this->config['base_uri'] . $entity . '.' . DataFormat::JSON;
        $username = $this->config['username'];
        $password = $this->config['password'];
        try {
            $response = $this->httpClient->get($url, ['auth' => [$username, $password]]);
            $data = $response->getBody();
        } catch (\Exception $e) {
            $data = json_encode(['error' => $e->getMessage()]);
        }

        return $data;
    }
}
