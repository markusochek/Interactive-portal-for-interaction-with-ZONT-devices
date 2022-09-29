<?php
require_once 'req/src/Autoload.php';
class Application {
    function __construct() {
        WpOrg\Requests\Autoload::register();

        $dbhost = "localhost";
        $dbport = "3306";
        $dbname = "zont";
        $dbuser = "markusok";
        $dbpass = "botkill";

        try {
            $this->db = new PDO
            (
                "mysql:host=$dbhost;
                dbname=$dbname;
                port=$dbport",
                $dbuser,
                $dbpass
            );
            $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        }
        catch (PDOException $e) {
            echo ("Connected failed: ");  
            file_put_contents('PDOErrors.txt', $e->getMessage(), FILE_APPEND); 
        }
    }

    function __destruct() {
        $this->db = null;
    }

    public function setTemperature($params) {
        $query = "INSERT INTO `temperature` (dateTime, device, temperature) VALUES (?, ?, ?)";
        $data = array(date("y.m.d H:i:s"), $params['device'], $params['temperature']);
        $stmt = $this->db->prepare($query);
        $stmt->execute($data);
        return true;
    }

    public function getTemperature() {
        $query = "SELECT dateTime, device, temperature FROM temperature ORDER BY device, dateTime";
        return $this->db->query($query)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getTemperatureDevice() {
        $url = 'https://zont-online.ru/api/devices';
        $data = array('load_io' => true);

        $headers = array('X-ZONT-Client' => '*******', 'Content-Type' => 'application/json', 'X-ZONT-Token' =>'fw9k6tc3lrihgaedgizxwwxciybsx5yl');
        $options = array('auth' => array('****', '*****'));
        $response = WpOrg\Requests\Requests::post($url, $headers, json_encode($data), $options);
        $result = json_decode($response->body, true);

        return $response->body;
    }

    public function getAuthtoken() {
        $response = WpOrg\Requests\Requests::post(
        'https://zont-online.ru/api/get_authtoken',
        ['X-ZONT-Client' => '********', 'Content-Type' => 'application/json'],
        json_encode(['client_name' => 'My cool app']),
        ['auth' => ['****', ******']]);

        return $response->body;
    }

    public function getOpenWeatherMap() {
        $response = WpOrg\Requests\Requests::get(
            'https://api.openweathermap.org/data/2.5/forecast?lat=56,73&lon=53,28&appid=0e5cdc6ef6626962793e3b93de03e995'
        );
        return $response->body;
    }
}
