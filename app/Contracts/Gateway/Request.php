<?php namespace App\Contracts\Gateway;

interface Request
{
    public function query($entity);
}
