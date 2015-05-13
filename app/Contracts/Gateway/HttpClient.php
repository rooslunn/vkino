<?php namespace App\Contracts\Gateway;

interface HttpClient
{
    public function get($url, $options = []);
}
