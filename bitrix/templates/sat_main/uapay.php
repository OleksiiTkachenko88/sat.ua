<?php
$out = 'ok';
$arr = array();
$url = '';
$api_host = 'https://urm.sat.ua/acquiring/hs/';
$apiKey = '8c236ec1-6e15-424b-8daf-33913831';

function remove_utf8_bom($text) {
	$bom = pack('H*','EFBBBF');
	$text = preg_replace("/^$bom/", '', $text);
	return $text;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($action != '') {
	switch($action) {
		case 'getUaPayPage':
			$sum = isset($_REQUEST['sum']) && !empty($_REQUEST['sum']) ? (int)trim(strip_tags($_REQUEST['sum'])) : '';
			$ref = isset($_REQUEST['ref']) && !empty($_REQUEST['ref']) ? trim(strip_tags($_REQUEST['ref'])) : '';

			$params = array("externalId" => $ref, "amount" => $sum);
			$body = json_encode($params);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "uapay/query");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$tmp = curl_exec($ch);
			$tmp = remove_utf8_bom($tmp);
			$tmp = json_decode($tmp, TRUE);
			if($tmp['status']){
				$out = json_encode($tmp['data']['paymentPageUrl']);
			}
		break;
		case 'checkOrder':
			$order = isset($_REQUEST['orderId']) && !empty($_REQUEST['orderId']) ? trim(strip_tags($_REQUEST['orderId'])) : '';
			$params = array("orderId" => $order);
			$body = json_encode($params);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "uapay/payments");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$tmp = curl_exec($ch);
			$tmp = remove_utf8_bom($tmp);
			$out = $tmp;
		break;
	}
}
echo $out;