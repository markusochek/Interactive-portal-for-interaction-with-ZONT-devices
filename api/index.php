<?php error_reporting(-1);
header("Content-type:application/json; charset-utf-8");
require_once("application/Application.php");

function router($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            //openWeatherMap
            case 'getOpenWeatherMap': return json_decode($app->getOpenWeatherMap($params));

            //zont
            case 'getAuthtoken' : return json_decode($app->getAuthtoken($params));
            case 'getTemperatureDevice': return json_decode($app->getTemperatureDevice($params));

            //temperature
            case 'setTemperature': return $app->setTemperature($params);
            case 'getTemperature': return $app->getTemperature($params);
        }
    }
    return false;
}

echo json_encode(router($_GET));