<?
$out = false;
$privatUrl = 'https://next.privat24.ua/payments/form/';
$token = 'd6ab1f41-da8f-494b-aedd-ef2c9696a387';

//$personalAccount - nng number
//$token - privat token SAT
//$privatUrl - payment url
//Full url should look like this "$privatUrl+{"token": "$token", "personalAccount": "$personalAccount"}"

$action = isset($_GET['action']) ? $_GET['action'] : '';

if($action != '') {
	switch($action) {
		case 'getPrivatPage':
		$personalAccount = isset($_REQUEST['nng']) && !empty($_REQUEST['nng']) ? trim(strip_tags($_REQUEST['nng'])) : '';
		$params = json_encode(array("token" => $token, "personalAccount" => $personalAccount));

		if(isset($personalAccount) && $personalAccount != ''){
			$privatUrl .= $params;
			$out = $privatUrl;
		}
	}
}
echo $out;
?>