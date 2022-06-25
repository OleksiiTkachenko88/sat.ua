<?
include_once("constants.php");
include_once("global_variables.php");
use Bitrix\Main\Web\HttpClient;


include_once ($_SERVER["DOCUMENT_ROOT"]."/local/js/js_config.php");

require 'guzzle/vendor/autoload.php';
AddEventHandler("forum", "onAfterMessageAdd", Array("CheckMessage", "forumHandler"));

class CheckMessage
{
    function forumHandler($ID, $arFields) {
		$arRes = array(
			'IBLOCK_ELEMENT_ID' =>$arFields['PARAM2'],
			'TOPIC_TITLE'	 => $arFields['TOPIC_INFO']['TITLE'],
			'MESSAGE_DATE'	 => $arFields['POST_DATE'],
			'MESSAGE_TEXT'	 => $arFields['POST_MESSAGE'],
		);
		if(isset($arRes['IBLOCK_ELEMENT_ID'])) {
			$ID = $arRes['IBLOCK_ELEMENT_ID'];
			$res = CIBlockElement::GetByID($ID);
			if($ar_res = $res->GetNext()){
				$arRes['PATH2FORUM'] = 'https://www.sat.ua'.$ar_res['DETAIL_PAGE_URL'];
			}

		CEvent::Send( "NEW_FORUM_MESSAGE", SITE_ID, $arRes);
		}
	}
}

class JWT
{
	function jwt_encode($payload) {
		$key = '5WdUIcGip47bmRMBTGBbLA==';
		$header = array('alg' => 'HS256', 'typ' => 'JWT');
		$payload['iat'] = time();
		$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));
		$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
		$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $key, true);
		$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
		$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
		return $jwt;
	}
}

class Sat
{
	//Здесь хранится экземпляр класса
	private static $_Instance;

	public $IBLOCK		= array(
							'ru' 	=> array(
										'NEWS'          => 4,
										'ACTION'        => 5,
										'DEPARTMENT'    => 6,
										'PARTNER'       => 7,
										'BANNERS'       => 8,
										'CARGO_TYPES'   => 9,
										'CITIES'        => 10,
										'CONTACTS'      => 15,
										'PAGE_BANNER'   => 16
									),
							'ua'	=> array(
										'NEWS'			=> 12,
										'ACTION' 	  	=> 13,
										'PARTNER'     	=> 14,
										'BANNERS'		=> 11,
									)
						);

	public static function getInstance()
	{
		//Проверяем был ли создан объект ранее
		if (!self::$_Instance)
		{
			//Если нет, то создаем его
			self::$_Instance = new self();
		}
		//Возвращаем объект
		return self::$_Instance;
	}

	private function __construct()
	{
		//parent::__construct();
		//\Bitrix\Main\Loader::includeModule("iblock");
		//\Bitrix\Main\Loader::includeModule("highloadblock");
	}

	private function __clone()
	{
    }

    private function __wakeup()
    {
    }

    function getIBlockID($code, $lang = 0)
    {
	    if($lang == 0)
	    	$lang = SITE_ID;
    }

}

function p($array, $only_for_admin = true)
{
	global $USER;
	if($USER->IsAdmin() || !$only_for_admin)
	{
		echo '<pre>'.print_r($array, 1).'</pre>';
	}
}

function dump($array, $only_for_admin = true)
{
	global $USER;
	if($USER->IsAdmin() || !$only_for_admin)
	{
		echo '<pre>'.print_r($array, 1).'</pre>';
	}
}

AddEventHandler('main', 'OnBeforeEventAdd', ['EventHandler', 'OnBeforeEventAddHandler']);
AddEventHandler('form', 'onAfterResultAdd', ['EventHandler', 'OnAfterResultAddHandler']);

class EventHandler {
  function OnBeforeEventAddHandler(&$event, &$lid, &$arFields, &$message_id, &$files, &$languageId) {
    if ($event == 'FORM_FILLING_SIMPLE_FORM_3') {
      // \ob_start();
      // echo PHP_EOL."<pre>".PHP_EOL;
      // var_dump([
      //     'event' => $event,
      //     'lid' => $lid,
      //     'arFields' => $arFields,
      //     'message_id' => $message_id,
      //     'files' => $files,
      //     'languageId' => $languageId
      // ]);
      // \file_put_contents($_SERVER['DOCUMENT_ROOT'].'/local/php_interface/OnBeforeEventAdd.txt', \ob_get_clean(), FILE_APPEND);

      $phone = preg_replace('/\+|\(|\)|-/', '', $arFields['SIMPLE_QUESTION_643']);
      $fio = $arFields['SIMPLE_QUESTION_121'];
      $text = "Добрый день!

			Уважаемый {$fio}, благодарим Вас за оставленную заявку.

			Специалист отдела развития агентской сети SAT свяжется с Вами в ближайшие время для уточнения деталей.

			SAT - Логистика для бизнеса

			www.sat.ua   0 800 30 99 09";

      $apiHost = 'https://api.sat.ua:8021/dev_taxi/hs/api/v1.0/sms/sendmessage/json?';
      $apiKey = 'db54d54e-6d44-43bd-a9ae-a1ed5efc';

      $url = $apiHost . http_build_query(['apiKey' => $apiKey, 'phone' => $phone, 'text' => $text]);
			$tmp = file_get_contents($url);
      // file_put_contents($_SERVER['DOCUMENT_ROOT'].'/local/php_interface/OnBeforeEventAdd.txt', $tmp, FILE_APPEND);
    }
    return true;
  }

  function OnAfterResultAddHandler($WEB_FORM_ID, $RESULT_ID) {
    if ($WEB_FORM_ID != 8 && $WEB_FORM_ID != 9) return;
    $arAnswer = CFormResult::GetDataByID($RESULT_ID, [], $arResult, $arAnswer2);


    $avto1 = [
      "brand"           => $arAnswer['brand1'][0]['USER_TEXT'],
      "year"            => $arAnswer['year1'][0]['ANSWER_VALUE'],
      "volume"          => $arAnswer['volume1'][0]['USER_TEXT'],
      "payload"         => $arAnswer['payload1'][0]['ANSWER_VALUE'],
      "compartmenttype" => $arAnswer['compartmenttype1'][0]['ANSWER_VALUE'],
      "length"          => $arAnswer['length1'][0]['USER_TEXT'],
      "width"           => $arAnswer['width1'][0]['USER_TEXT'],
      "height"          => $arAnswer['height1'][0]['USER_TEXT'],
      "taillift"        => $arAnswer['taillift1'][0]['ANSWER_VALUE'],
      "comment"         => $arAnswer['comment1'][0]['USER_TEXT'],
    ];

    $avto2 = [
      "brand"           => $arAnswer['brand2'][0]['USER_TEXT'],
      "year"            => $arAnswer['year2'][0]['ANSWER_VALUE'],
      "volume"          => $arAnswer['volume2'][0]['USER_TEXT'],
      "payload"         => $arAnswer['payload2'][0]['ANSWER_VALUE'],
      "compartmenttype" => $arAnswer['compartmenttype2'][0]['ANSWER_VALUE'],
      "length"          => $arAnswer['length2'][0]['USER_TEXT'],
      "width"           => $arAnswer['width2'][0]['USER_TEXT'],
      "height"          => $arAnswer['height2'][0]['USER_TEXT'],
      "taillift"        => $arAnswer['taillift2'][0]['ANSWER_VALUE'],
      "comment"         => $arAnswer['comment2'][0]['USER_TEXT'],
    ];

    $avto3 = [
      "brand"           => $arAnswer['brand3'][0]['USER_TEXT'],
      "year"            => $arAnswer['year3'][0]['ANSWER_VALUE'],
      "volume"          => $arAnswer['volume3'][0]['USER_TEXT'],
      "payload"         => $arAnswer['payload3'][0]['ANSWER_VALUE'],
      "compartmenttype" => $arAnswer['compartmenttype3'][0]['ANSWER_VALUE'],
      "length"          => $arAnswer['length3'][0]['USER_TEXT'],
      "width"           => $arAnswer['width3'][0]['USER_TEXT'],
      "height"          => $arAnswer['height3'][0]['USER_TEXT'],
      "taillift"        => $arAnswer['taillift3'][0]['ANSWER_VALUE'],
      "comment"         => $arAnswer['comment3'][0]['USER_TEXT'],
    ];

    $arr = [
      "fio"        => $arAnswer['fullname'][0]['USER_TEXT'],
      "phone"      => $arAnswer['phone'][0]['USER_TEXT'],
      "type"       => $arAnswer['type'][0]['ANSWER_VALUE'],
      "city"       => $arAnswer['city'][0]['USER_TEXT'],
      "flp"        => $arAnswer['flp'][0]['ANSWER_VALUE'],
      "relocation" => $arAnswer['relocation'][0]['ANSWER_VALUE'],
      "comment"    => $arAnswer['comment'][0]['USER_TEXT'],
      'avto'       => [$avto1, $avto2, $avto3]
    ];

    $httpClient = new HttpClient();
    $httpClient->setHeader('Content-Type', 'application/json');
    $httpClient->setHeader('app', 'website');
    $httpClient->setHeader('apikey', '8c236ec1-6e15-424b-8daf-33913831');
    $url = 'http://api.sat.ua/openws/hs/servicedesk/carrierapplication';
    $response = $httpClient->post($url, json_encode($arr));
  }
}
?>
