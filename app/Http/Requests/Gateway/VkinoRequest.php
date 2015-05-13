<?php namespace App\Http\Requests\Gateway;

use App\Contracts\Gateway\HttpClient;
use App\Contracts\Gateway\Request;
use App\Contracts\Storage\Cache;

class VkinoRequest implements Request
{
    protected $httpClient;

    protected $cache;

    protected $config;

    public function __construct(HttpClient $httpClient, Cache $cache, array $config)
    {
        $this->httpClient = $httpClient;
        $this->cache = $cache;
        $this->config = $config;
    }

    public function query($entity)
    {
        if ($this->cache->has($entity)) {
            return $this->cache->get($entity);
        }

        $url = $this->config['base_uri'] . $entity . '.' . DataFormat::JSON;
        $username = $this->config['username'];
        $password = $this->config['password'];
        try {
            $response = $this->httpClient->get($url, ['auth' => [$username, $password]]);
            $data = $response->getBody();
            $this->populateInCache($entity, $data);
        } catch (\Exception $e) {
            $data = json_encode(['error' => $e->getMessage()]);
        }

        return $data;
    }

    protected function populateInCache($entity, $data)
    {
        $expiresAt = 'EX ' . $this->config['cache_expire_time'] * 60;
        $this->cache->put($entity, $data, $expiresAt);
    }
}
