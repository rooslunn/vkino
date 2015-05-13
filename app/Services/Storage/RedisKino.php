<?php

namespace App\Services\Storage;

use App\Contracts\Storage\Cache;
use Illuminate\Support\Facades\Redis;

class RedisKino  implements Cache
{

    protected $conn;

    public function __construct()
    {
        $this->conn = Redis::connection();
    }

    public function has($key)
    {
        return $this->conn->exists($key);
    }

    public function get($key)
    {
        return $this->conn->get($key);
    }

    public function put($key, $value, $expiresAt)
    {
        $this->conn->set($key, $value);
    }
}