<?php
/**
 * Created by PhpStorm.
 * User: russ
 * Date: 13/05/15
 * Time: 11:42
 */

namespace App\Contracts\Storage;


interface Cache {
    public function has($key);
    public function get($key);
    public function put($key, $value, $expiresAt);
}