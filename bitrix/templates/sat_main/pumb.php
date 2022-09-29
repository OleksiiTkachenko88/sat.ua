<?php
$out = 'ok';
$arr = array();
$url = '';
$api_host = 'https://xyz.sat.ua/postavka/hs/pumb/query/?apiKey=bb53336a2cfcdedf7689914c36ede5e3';

function remove_utf8_bom($text) {
	$bom = pack('H*','EFBBBF');
	$text = preg_replace("/^$bom/", '', $text);
	return $text;
}


$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action != '') {
	switch($action) {
		case 'getPumb':
			$sum = isset($_REQUEST['sum']) && !empty($_REQUEST['sum']) ? (int)trim(strip_tags($_REQUEST['sum'])) : '';
			$ref = isset($_REQUEST['ref']) && !empty($_REQUEST['ref']) ? trim(strip_tags($_REQUEST['ref'])) : '';

			$params = array("id" => $ref, "amount" => $sum);
			$body = json_encode($params);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);			
			$tmp = curl_exec($ch);
			echo $tmp;
		break;
	}
}

?>