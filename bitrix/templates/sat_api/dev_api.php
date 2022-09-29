<?php
$out = '';
$arr = array();

$api_registration_host = 'https://urm.sat.ua/study/hs/api/v1.0/';
$api_host = 'http://urm.sat.ua/openws/hs/api/v1.0/';
$apiKey = '8c236ec1-6e15-424b-8daf-33913831';
$apiHost = 'https://catalog.sat.ua/';


function remove_utf8_bom($text) {
    $bom = pack('H*','EFBBBF');
    $text = preg_replace("/^$bom/", '', $text);
    return $text;
}

$action = isset($_GET['type']) ? $_GET['type'] : '';
$url = isset($_GET['url']) ? $_GET['url'] : '';
$body = isset($_GET['body']) ? $_GET['body'] : '';
$headers = isset($_GET['headers']) ? $_GET['headers'] : '';
if ($action != '') {
    switch($action) {
        case 'GET':
            unset($_GET['action']);
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
				$tmp = curl_exec($ch);
				$out = $tmp;
				curl_close($ch);
		break;
        case 'POST':
            unset($_GET['action']);
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
                curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
				$tmp = curl_exec($ch);
				$out = $tmp;
				curl_close($ch);
		break;
        case 'getTowns':
			$term = (isset($_GET['term']) && !empty($_GET['term'])) ? trim(strip_tags($_GET['term'])) : '';
			$term = mb_convert_encoding($term, 'utf-8', mb_detect_encoding($term));
            if ($term && !empty($term)) {
				$url = "{$apiHost}getTowns?" .http_build_query(["searchString" => $term]);
				$tmp = file_get_contents($url);
				$tmp = remove_utf8_bom($tmp);
				$tmp = json_decode($tmp, TRUE);
					foreach ($tmp['data'] as $k => $v) {
						if(stripos($v['description'], $term)===0 || stripos($v['oldDescription'], $term)===0) {
								$arr[] = array(
											"label"	=>	$v['description'] ." - ".$v['region'],
											"value"	=>	$v['description'] .(($v['district']=='город')?" - " : " - " .$v['district']. " - ").$v['region'],
											"id"	=>	$v['ref']
										);
							}
					}
			}
		$out = json_encode($arr);
		break;
		case 'registration':
			$name = isset($_GET['registration_form_name']) && !empty($_GET['registration_form_name']) ? trim(strip_tags($_GET['registration_form_name'])) : '';
			$email = isset($_GET['registration_form_email']) && !empty($_GET['registration_form_email']) ? trim(strip_tags($_GET['registration_form_email'])) : '';
			$phone = isset($_GET['registration_form_phone']) && !empty($_GET['registration_form_phone']) ? trim(strip_tags($_GET['registration_form_phone'])) : '';
			$contact = isset($_GET['registration_form_contact']) && !empty($_GET['registration_form_contact']) ? trim(strip_tags($_GET['registration_form_contact'])) : '';
			$city = isset($_GET['registration_form_city']) && !empty($_GET['registration_form_city']) ? trim(strip_tags($_GET['registration_form_city'])) : '';
			$cityuser = isset($_GET['registration_form_cityuser']) && !empty($_GET['registration_form_cityuser']) ? trim(strip_tags($_GET['registration_form_cityuser'])) : '';

		if ($name != '' && $email != '' && $phone != '' && $contact != '' && $city != '') {

			$params = array("name" => $name, "email" => $email, "phone" => $phone, "contact" => $contact, "cityuser" => $cityuser, "city" => $city, "number" => "");
				$params = json_encode($params, 256);
				unset($_GET['action']);
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL, $api_registration_host. 'registration_new');
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
					curl_setopt($ch, CURLOPT_POST, true);
					curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
					$tmp = curl_exec($ch);
					$tmp = remove_utf8_bom($tmp);
					$tmp = json_decode($tmp, TRUE);
					$res = array();
					$res['success'] = 'false';
					if($tmp) {
						if($tmp['success']) {
							$res['success'] = 'true';
							$res['data'] = $tmp['data'];
						} else {
							$res['success'] = 'false';
						}
					} else {
						$res['success'] = 'false';
					}
					$out = json_encode($res, 256);
					curl_close($ch);

		}
		break;
	}
}
echo $out;
