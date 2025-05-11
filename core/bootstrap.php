<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';

use Core\Classes\EnvLoader;

use Core\Classes\Cors;

use Core\Classes\Cache;



Cors::enable();
Cache::init(null, 86400);




try {
    EnvLoader::loadEnv(file: $_SERVER['DOCUMENT_ROOT'] . '/.env');
} catch (Exception $e) {
    echo "error loading .env file: " . $e->getMessage();
}