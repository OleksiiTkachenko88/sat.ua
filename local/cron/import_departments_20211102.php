<?
// Константы
/////////////////////////////////////////////////////////////////////////////////////
define("NOT_CHECK_PERMISSIONS", true);
define("NO_KEEP_STATISTIC", true);

define("KEY_API_KEY", "apiKey");
define("API_KEY", "8c236ec1-6e15-424b-8daf-33913831");

define("KEY_LANG", "language");
define("LANG_RU", "ru");
define("LANG_UK", "uk");

define("API_MAIN_URL", "http://78.154.176.238:8983/");
define("GET_TOWNS_METHOD", "getTowns");
define("GET_RSP_METHOD", "getRsp");

define("KEY_CONTAINS_RSP", "containsRsp");
define("CONTAINS_RSP", "true");

define("D_IBLOCK_ID", 33);

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Чтобы не приходилось на разных хост-площадках прописывать руками $_SERVER["DOCUMENT_ROOT"]
// расчитываем пути к корню сайта. Логика скрипта считает, что скрипт выполняется в каталоге 1-го уровня
/////////////////////////////////////////////////////////////////////////////////////////////////////
$need_auth = false;

$f_info = pathinfo(__FILE__);

if (!$_SERVER["DOCUMENT_ROOT"]) {
	$ar_parts_path = explode("/",$f_info["dirname"]);
	$path_root = "";

	for ($i = 1; $i < count($ar_parts_path) - 2; $i++) {
		$path_root .= "/".$ar_parts_path[$i];
	}

	$_SERVER["DOCUMENT_ROOT"] = $path_root;

} else {
	$need_auth = true;
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Константы файлов логов
/////////////////////////////////////////////////////////////////////////////////////////////////////
define("LOG_FILENAME_SHORT",$f_info["filename"]."_".date('Y-m-d').".txt");
define("LOG_FILENAME", $f_info["dirname"]."/log/".LOG_FILENAME_SHORT);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Уровни сообщений логов
//[i] - информация
//[e] - ошибка
//[d] - опасность
//[s] - скрипт отработал успешно
//[u] - скрипт не отработал
/////////////////////////////////////////////////////////////////////////////////////////////////////

global $USER;

// если скрипт запущен через веб-интерфейс проверяем относится ли пользователь к группе администраторов
if (($need_auth) && (!$USER->IsAdmin())) {
	AddMessage2Log("[d] Скрипт запущен неизвестным источником");
	die("Недостаточно прав для выполнения скрипта");
}

// авторизуемся под учётной записью с правами администратора, которую используют задачи cron
$USER->Authorize(1);

if (!CModule::IncludeModule("iblock")) {
	AddMessage2Log("[e] Не могу инициализировать инфоблок iblock");
	die();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////   РАБОТА С ГОРОДАМИ КОМПАНИИ   ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Формируем запрос к АПИ getTowns RU для получение списка городов
/////////////////////////////////////////////////////////////////////////////////////////////////////
$listTowns = '';

$url_params_city = array(
	KEY_LANG => LANG_RU,
	KEY_CONTAINS_RSP => CONTAINS_RSP,
	KEY_API_KEY => API_KEY
);

$tmp = file_get_contents(API_MAIN_URL . GET_TOWNS_METHOD ."?". http_build_query($url_params_city));
$tmp = json_decode($tmp,TRUE);
if(json_last_error() === JSON_ERROR_NONE){
	if($tmp["success"]) {
		$listTowns = $tmp["data"];
	} else {
		AddMessage2Log("[e] Ошибка при запросе к ".API_MAIN_URL . GET_TOWNS_METHOD ."?". http_build_query($url_params_city)."\n "
		."[u] Скрипт завершил работу");
		die();
	}
} else {
	AddMessage2Log("[e] Не смог получить корректный дезультат при запросе к ".API_MAIN_URL . GET_TOWNS_METHOD ."?". http_build_query($url_params_city)."\n "
	."[u] Скрипт завершил свою работу.");
	die();
}

foreach($listTowns as $key => $val) {
	$listTownsRU[$val["ref"]] = array(	"ref" => $val["ref"],
										"description" => trim($val["description"]),
										"region" => $val["region"],
										"rspList" => $val["rspList"]
									);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Формируем запрос к АПИ getTowns UK для получение списка городов
/////////////////////////////////////////////////////////////////////////////////////////////////////
$url_params_city = array(
	KEY_LANG => LANG_UK,
	KEY_CONTAINS_RSP => CONTAINS_RSP,
	KEY_API_KEY => API_KEY
);

$tmp = file_get_contents(API_MAIN_URL . GET_TOWNS_METHOD ."?". http_build_query($url_params_city));
$tmp = json_decode($tmp,TRUE);
if(json_last_error() === JSON_ERROR_NONE){
	if($tmp["success"]) {
		$listTowns = $tmp["data"];
	} else {
		AddMessage2Log("[e] Ошибка при запросе к ".API_MAIN_URL . GET_TOWNS_METHOD ."?". http_build_query($url_params_city)."\n "
		."[u] Скрипт завершил работу");
		die();
	}
} else {
	AddMessage2Log("[e] Не смог получить корректный дезультат при запросе к ".API_MAIN_URL . GET_TOWNS_METHOD ."?". http_build_query($url_params_city)."\n "
	."[u] Скрипт завершил свою работу.");
	die();
}

foreach($listTowns as $key => $val) {
	$listTownsUK[$val["ref"]] = array(	"ref" => $val["ref"],
										"description" => trim($val["description"]),
										"region" => $val["region"]
									);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
//Создаем супермассив вида Область - Город = идентификатор
/////////////////////////////////////////////////////////////////////////////////////////////////////
foreach($listTownsRU as $key =>$val) {
	$fullRegion[strtoupper($val["region"])." --- ".strtoupper($listTownsUK[$key]['region'])][$val["description"]." --- ".$listTownsUK[$key]['description']] = $val['ref'];
}

//Проверка fullRegion на пустоту
if(count($fullRegion) > 0) {
	foreach($fullRegion as $key =>$val) {
		if(!count($val)) {
			AddMessage2Log("[i] Массив fullRegion[".$key."] пустой. \n "
			."[u] Скрипт завершил свою работу.");
			die();
		}
	}
} else {
	AddMessage2Log("[i] Массив fullRegion пустой. \n "
	."[u] Скрипт завершил свою работу.");
	die();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////
//fullRegion - нужный массив городов, который заливаем в инфоблок. Он служит секциями инфоблока.
/////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////   РАБОТА С ОТДЕЛЕНИЯМИ КОМПАНИИ   /////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Формируем запрос к АПИ getRsp RU для получение списка отделений
/////////////////////////////////////////////////////////////////////////////////////////////////////
$listRsp = '';
$fullRsp = array();

$url_params_rsp = array(
	KEY_LANG => LANG_RU,
	KEY_API_KEY => API_KEY
	);

$tmp = file_get_contents(API_MAIN_URL . GET_RSP_METHOD ."?". http_build_query($url_params_rsp));
$tmp = json_decode($tmp,TRUE);
if(json_last_error() === JSON_ERROR_NONE){
	if($tmp["success"]) {
		$listRsp = $tmp["data"];
	}
} else {
	AddMessage2Log("[e] Не смог получить корректный дезультат при запросе к ".API_MAIN_URL . GET_RSP_METHOD ."?". http_build_query($url_params_rsp)."\n "
	."[u] Скрипт завершил свою работу.");
	die();
}

foreach($listRsp as $val) {
	$listRspRU[$val["cityRef"]][$val["ref"]] = $val;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Формируем запрос к АПИ getRsp UK для получение списка отделений
/////////////////////////////////////////////////////////////////////////////////////////////////////
$url_params_rsp = array(
	KEY_LANG => LANG_UK,
	KEY_API_KEY => API_KEY
	);

$tmp = file_get_contents(API_MAIN_URL . GET_RSP_METHOD ."?". http_build_query($url_params_rsp));
$tmp = json_decode($tmp,TRUE);
if(json_last_error() === JSON_ERROR_NONE){
	if($tmp["success"]) {
		$listRsp = $tmp["data"];
	}
} else {
	AddMessage2Log("[e] Не смог получить корректный дезультат при запросе к ".API_MAIN_URL . GET_RSP_METHOD ."?". http_build_query($url_params_rsp)."\n "
	."[u] Скрипт завершил свою работу.");
	die();
}

foreach($listRsp as $key => $val) {
	$listRsp[$key]["description"] = trim($val["description"]);
	$listRspUK[$val["cityRef"]][$val["ref"]]["description_uk"] = $val["description"];
	$listRspUK[$val["cityRef"]][$val["ref"]]["address_uk"] = $val["address"];
}

foreach($listRspRU as $cityRef=>$Rsp) {
	foreach($Rsp as $rspRef=>$RspData){
		$fullRsp[$cityRef][$rspRef] = array_merge($listRspRU[$cityRef][$rspRef], $listRspUK[$cityRef][$rspRef]);

	}
}

//Проверка fullRsp на пустоту
if(count($fullRsp) > 0) {
	foreach($fullRsp as $key =>$val) {
		if(!count($val)) {
			AddMessage2Log("[i] Массив fullRsp[".$key."] пустой. \n "
			."[u] Скрипт завершил свою работу.");
			die();
		}
	}
} else {
	AddMessage2Log("[i] Массив fullRsp пустой. \n "
	."[u] Скрипт завершил свою работу.");
	die();
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//fullRsp - наш супермассив отделений с привязкой к городу (по идентификатору)
/////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////   РАБОТА С ИНФОБЛОКОМ ОТДЕЛЕНИЙ КОМПАНИИ   ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
$arRegions = array();
$arTowns = array();
$arRsp = array();

//Парметры перевода для создания кода
$translitParams = array(
			"replace_space" => "-",
			"replace_other" => "-"
		);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Получение массива областей (это элементы с DEPTH_LEVEL=>1)
/////////////////////////////////////////////////////////////////////////////////////////////////////
$arFilter = Array('IBLOCK_ID'=>D_IBLOCK_ID);
$uf_array = Array("ID", "GLOBAL_ACTIVE", "ACTIVE", "NAME", "DEPTH_LEVEL", "IBLOCK_SECTION_ID", "UF_REGION_NAME_RU", "UF_REGION_NAME_UK", "UF_REGION_NAME_ALL", "UF_CITY_REF", "ELEMENT_CNT");
$db_list = CIBlockSection::GetList(Array($by=>$order), $arFilter, true, $uf_array);
while($ar_result = $db_list->GetNext())
{
	if($ar_result["DEPTH_LEVEL"] == 1 && empty($ar_result["UF_CITY_REF"])){
		$arRegions[$ar_result["UF_REGION_NAME_ALL"]] = $ar_result;
	}
	elseif ($ar_result["DEPTH_LEVEL"] == 2 && !empty($ar_result["UF_CITY_REF"])) {
		$arTowns[$ar_result["UF_REGION_NAME_ALL"]] = $ar_result;
	}
}

//Проверяем области на сайте. Если в инфоблоке есть лишние области, тогда их удаляем
foreach($arRegions as $siteDescription => $siteVal) {
	if($fullRegion[$siteDescription]) {
		continue;
	}
	elseif(strlen($siteVal["ID"])>0){
		AddMessage2Log("[i] Найден лишний элемент в инфоблоке. [".$siteVal["ID"]."]".$siteVal["NAME"]."\n "
		."[i] Удаляем его.");
		$del = CIBlockSection::Delete($siteVal["ID"]);
		if($del) {
		AddMessage2Log("[i] Удаление прошло успешно.");
		} else {
			AddMessage2Log("[i] Раздел не удален.");
		}
	}
}

echo Cutil::translit('Льовов', LANG_RU, $translitParams) . ']]]';

//Проверяем области с АПИ. Если в АПИ пришли новые области, тогда добавляем их
foreach($fullRegion as $apiDescription => $apiVal ){
	if($arRegions[$apiDescription]) {
		continue;
	}
	else{
		AddMessage2Log("[i] Найден новый элемент в АПИ. ".$apiDescription." \n "
		."[i] Добавляем его.");
		$name = explode(" --- ", $apiDescription);
		$arFields = array(
			"CREATED_BY" => $USER->GetID(),
			"IBLOCK_ID" => D_IBLOCK_ID,
			"NAME" => $name[0],
			"UF_REGION_NAME_RU" => $name[0],
			"UF_REGION_NAME_UK" => $name[1],
			"UF_REGION_NAME_ALL" => $apiDescription,
			"CODE" => Cutil::translit($name[0], LANG_RU, $translitParams)
			);

		$bs = new CIBlockSection;
		$res = $bs->Add($arFields);

		if($res){
			AddMessage2Log("[i] Добавление прошло успешно.");
		}
		elseif (!$res) {
		  	$error = $bs->LAST_ERROR;
			AddMessage2Log("[e] Ошибка добавления:".$error);
		}
	}
}



//Функция получения Наименования области по ID
function GetRegionName($array, $id) {
	foreach($array as $key =>$val) {
		if($val["ID"] == $id){
			$description = $key;
		}
	}
	return $description;
}

//Проверяем города в инфоблоке. Если в инфоблоке есть лишние города, тогда их удаляем
foreach($arTowns as $siteDescription => $siteVal) {
	$regionId = $siteVal["IBLOCK_SECTION_ID"];
	$regionName = GetRegionName($arRegions, $regionId);
	if($fullRegion[$regionName][$siteDescription]) {
		continue;
	}
	elseif(strlen($siteVal["ID"])>0 && strlen($regionName)>0){
		AddMessage2Log("[i] Найден лишний элемент в инфоблоке. [".$siteVal["ID"]."]".$siteVal["NAME"]."\n "
		."[i] Удаляем его.");
		$del = CIBlockSection::Delete($siteVal["ID"]);
		if($del) {
		AddMessage2Log("[i] Удаление прошло успешно.");
		} else {
			AddMessage2Log("[e] Раздел не удален.");
		}
	}
}

//Повторно смотрим в инфоблок, чтобы обновить инфу по регионам
$db_list = CIBlockSection::GetList(Array($by=>$order), $arFilter, false, $uf_array);
while($ar_result = $db_list->GetNext())
{
	if($ar_result["DEPTH_LEVEL"] == 1 && empty($ar_result["UF_CITY_REF"])){
		$arRegions[$ar_result["UF_REGION_NAME_ALL"]] = $ar_result;
	}
	elseif ($ar_result["DEPTH_LEVEL"] == 2 && !empty($ar_result["UF_CITY_REF"])) {
		$arTowns[$ar_result["UF_REGION_NAME_ALL"]] = $ar_result;
	}
}


//Проверяем города с АПИ. Если в АПИ пиршли новые города, тогда добавляем их
foreach($fullRegion as $apiRegions => $apiTownsList) {
	foreach($apiTownsList as $apiTownDescription => $apiTownsRef) {
		if($arTowns[$apiTownDescription]) {
			continue;
		}
		else {
			AddMessage2Log("[i] Найден новый элемент (город) в АПИ. ".$apiTownDescription." \n "
			."[i] Добавляем его.");

			$name = explode(" --- ", $apiTownDescription);
			$arFields = array(
				"CREATED_BY"    => $USER->GetID(),
				"IBLOCK_ID" => D_IBLOCK_ID,
				"IBLOCK_SECTION_ID" => $arRegions[$apiRegions]["ID"],
				"NAME" => $name[0],
				"UF_REGION_NAME_RU" => $name[0],
				"UF_REGION_NAME_UK" => $name[1],
				"UF_REGION_NAME_ALL" => $apiTownDescription,
				"UF_CITY_REF" => $apiTownsRef,
				"CODE" => Cutil::translit($name[0], LANG_RU, $translitParams)
				);

			$bs = new CIBlockSection;
			$res = $bs->Add($arFields);
			if($res){
				AddMessage2Log("[i] Добавление прошло успешно.");
			}
			elseif (!$res) {
				$error = $bs->LAST_ERROR;
				AddMessage2Log("[e] Ошибка добавления: ".$error);
			}
		}
	}
}


//Повторно смотрим в инфоблок, чтобы обновить инфу по городам
$db_list = CIBlockSection::GetList(Array($by=>$order), $arFilter, false, $uf_array);
while($ar_result = $db_list->GetNext())
{
	if($ar_result["DEPTH_LEVEL"] == 1 && empty($ar_result["UF_CITY_REF"])){
		$arRegions[$ar_result["UF_REGION_NAME_ALL"]] = $ar_result;
	}
	elseif ($ar_result["DEPTH_LEVEL"] == 2 && !empty($ar_result["UF_CITY_REF"])) {
		$arTowns[$ar_result["UF_REGION_NAME_ALL"]] = $ar_result;
	}
}

//Получаем список отделений на сайте
$arRsp = array();

$arSelect = Array("ID", "IBLOCK_SECTION_ID", "NAME", "CODE", "PROPERTY_ADDRES", "PROPERTY_PHONE",
"PROPERTY_EMAIL", "PROPERTY_REF", "PROPERTY_NUMBER",
"PROPERTY_CITY_REF", "PROPERTY_LATITUDE", "PROPERTY_LONGITUDE",
"PROPERTY_SCHEDULE_MONDAY", "PROPERTY_SCHEDULE_TUESDAY", "PROPERTY_SCHEDULE_WEDNESDAY", "PROPERTY_SCHEDULE_THURSDAY",
"PROPERTY_SCHEDULE_FRIDAY", "PROPERTY_SCHEDULE_SATURDAY", "PROPERTY_SCHEDULE_SUNDAY",
"PROPERTY_DESCRIPTION_UK", "PROPERTY_ADDRES_UK");
$arFilter = Array("IBLOCK_ID"=>D_IBLOCK_ID);
$res = CIBlockElement::GetList(Array("SORT"=>"ASC"), $arFilter, $arSelect);
while($arRes = $res->GetNext())
{
	$arRsp[$arRes["PROPERTY_CITY_REF_VALUE"]][$arRes["PROPERTY_REF_VALUE"]] = $arRes;

}

//Функция поиска ID элемента(отделения) инфоблока по его идентификатору в АПИ
function GetCityID($array, $ref) {
	foreach($array as $key =>$val) {
		if($val["UF_CITY_REF"] == $ref){
			$id = $val["ID"];
		}
	}
	return $id;
}


//Проверяем отделения ифоблоока. Если есть лишние, тогда удаляем их. Если данные отделений поменялись, тогда обновляем данные.
foreach ($arRsp as $cityRef => $rspList) {
	foreach($rspList as $rspRef => $rspData){
		if($fullRsp[$cityRef][$rspRef]) {
			$apiElementData = $fullRsp[$cityRef][$rspRef];
			if(	strval($rspData["NAME"]) !== strval($apiElementData["description"]) ||
				strval($rspData["PROPERTY_DESCRIPTION_UK_VALUE"]) !== strval($apiElementData["description_uk"]) ||
				htmlspecialcharsBack($rspData["PROPERTY_ADDRES_VALUE"]) !== htmlspecialcharsBack($apiElementData["address"]) ||
				htmlspecialcharsBack($rspData["PROPERTY_ADDRES_UK_VALUE"]) !== htmlspecialcharsBack($apiElementData["address_uk"]) ||
				strval($rspData["PROPERTY_NUMBER_VALUE"]) !== strval($apiElementData["number"]) ||
				strval($rspData["PROPERTY_PHONE_VALUE"]) !== strval($apiElementData["phone"]) ||
				strval($rspData["PROPERTY_EMAIL_VALUE"]) !== strval($apiElementData["email"]) ||
				strval($rspData["PROPERTY_LATITUDE_VALUE"]) !== strval($apiElementData["latitude"]) ||
				strval($rspData["PROPERTY_LONGITUDE_VALUE"]) !== strval($apiElementData["longitude"]) ||
				strval($rspData["PROPERTY_SCHEDULE_MONDAY_VALUE"]) !== strval($apiElementData["schedule"]["monday"]) ||
				strval($rspData["PROPERTY_SCHEDULE_TUESDAY_VALUE"]) !== strval($apiElementData["schedule"]["tuesday"]) ||
				strval($rspData["PROPERTY_SCHEDULE_WEDNESDAY_VALUE"]) !== strval($apiElementData["schedule"]["wednesday"]) ||
				strval($rspData["PROPERTY_SCHEDULE_THURSDAY_VALUE"]) !== strval($apiElementData["schedule"]["thursday"]) ||
				strval($rspData["PROPERTY_SCHEDULE_FRIDAY_VALUE"]) !== strval($apiElementData["schedule"]["friday"]) ||
				strval($rspData["PROPERTY_SCHEDULE_SATURDAY_VALUE"]) !== strval($apiElementData["schedule"]["saturday"]) ||
				strval($rspData["PROPERTY_SCHEDULE_SUNDAY_VALUE"]) !== strval($apiElementData["schedule"]["sunday"])
			)
			{
				//Если изменились поля, тогда обновляем элемент
				$id = $rspData["ID"];
				$sectionID = $rspData["IBLOCK_SECTION_ID"];

				AddMessage2Log("[i] В АПИ измененились данные отделения [".$sectionID."][".$id."] ".$apiElementData["description"]."\n "
				."[i] Изменяем его в инфоблоке.");

				$PROP = array(
					"REF" => $apiElementData["ref"],
					"CITY_REF" => $apiElementData["cityRef"],
					"NUMBER" => $apiElementData["number"],
					"DESCRIPTION_UK" => $apiElementData["description_uk"],
					"ADDRES" => $apiElementData["address"],
					"ADDRES_UK" => $apiElementData["address_uk"],
					"PHONE" => $apiElementData["phone"],
					"EMAIL" => $apiElementData["email"],
					"LATITUDE" => $apiElementData["latitude"],
					"LONGITUDE" => $apiElementData["longitude"],
					"SCHEDULE_MONDAY" => $apiElementData["schedule"]["monday"],
					"SCHEDULE_TUESDAY" => $apiElementData["schedule"]["tuesday"],
					"SCHEDULE_WEDNESDAY" => $apiElementData["schedule"]["wednesday"],
					"SCHEDULE_THURSDAY" => $apiElementData["schedule"]["thursday"],
					"SCHEDULE_FRIDAY" => $apiElementData["schedule"]["friday"],
					"SCHEDULE_SATURDAY" => $apiElementData["schedule"]["saturday"],
					"SCHEDULE_SUNDAY" => $apiElementData["schedule"]["sunday"],
				);

				$arRspFields = array(
					"MODIFIED_BY"    => $USER->GetID(),
					"IBLOCK_ID"      => D_IBLOCK_ID,
					"IBLOCK_SECTION_ID" => $sectionID,
					"ACTIVE" => "Y",
					"NAME" => $apiElementData["description"],
					"CODE" => Cutil::translit( $apiElementData["description"], LANG_RU, $translitParams),
					"PROPERTY_VALUES" => $PROP
				);

				$el = new CIBlockElement;
				$res = $el->Update($id, $arRspFields);

				if($res)
					AddMessage2Log("[i] Изменение прошло успешно.");
				else
					$error = $el->LAST_ERROR;
					AddMessage2Log("[e] Ошибка изменения: ".$error);
			}
			else {
				continue;
			}


		}
		elseif(!$fullRsp[$cityRef][$rspRef]) {
		AddMessage2Log("[i] Найден лишний элемент(отделение) в инфоблоке. [".$rspData["ID"]."]".$rspData["NAME"]."\n "
		."[i] Удаляем его.");
		$del = CIBlockElement::Delete($rspData["ID"]);
			if($del) {
				AddMessage2Log("[i] Удаление прошло успешно.");
				$count = CIBlockSection::GetSectionElementsCount($rspData["IBLOCK_SECTION_ID"]);
				if($count == 0){
					$delSection = CIBlockSection::Delete($rspData["IBLOCK_SECTION_ID"]);
					if($delSection) {
						AddMessage2Log("[i] Удаление города прошло успешно.");
					} else {
						AddMessage2Log("[e] Раздел не удален.");
					}
				}
			} else {
				AddMessage2Log("[e] Элемент(отделение) не удален.");
			}
		}
	}
}


//Обновляем массив отделений после измениений и удалений лишних
$res = CIBlockElement::GetList(Array("SORT"=>"ASC"), $arFilter, $arSelect);
while($arRes = $res->GetNext())
{
	$arRsp[$arRes["PROPERTY_CITY_REF_VALUE"]][$arRes["PROPERTY_REF_VALUE"]] = $arRes;

}


//Добавление новых элементов (отделений) в наш инфоблок

foreach ($fullRsp as $cityRef => $dataList) {
	$citySectionID = GetCityID($arTowns, $cityRef);
	foreach($dataList as $rspRef => $dataRsp) {
		if($arRsp[$cityRef][$rspRef]) {
			continue;
		}
		elseif(strlen($dataRsp["ref"])>0 && strlen($dataRsp["cityRef"])>0 && strlen($dataRsp["description_uk"])>0) {

			AddMessage2Log("[i] Найдено новое отделение в АПИ. ".$dataRsp["description"]."\n "
			."[i] Добавляем его.");

			$PROP = array(
					"REF" => $dataRsp["ref"],
					"CITY_REF" => $dataRsp["cityRef"],
					"NUMBER" => $dataRsp["number"],
					"DESCRIPTION_UK" => $dataRsp["description_uk"],
					"ADDRES" => $dataRsp["address"],
					"ADDRES_UK" => $dataRsp["address_uk"],
					"PHONE" => $dataRsp["phone"],
					"EMAIL" => $dataRsp["email"],
					"LATITUDE" => $dataRsp["latitude"],
					"LONGITUDE" => $dataRsp["longitude"],
					"SCHEDULE_MONDAY" => $dataRsp["schedule"]["monday"],
					"SCHEDULE_TUESDAY" => $dataRsp["schedule"]["tuesday"],
					"SCHEDULE_WEDNESDAY" => $dataRsp["schedule"]["wednesday"],
					"SCHEDULE_THURSDAY" => $dataRsp["schedule"]["thursday"],
					"SCHEDULE_FRIDAY" => $dataRsp["schedule"]["friday"],
					"SCHEDULE_SATURDAY" => $dataRsp["schedule"]["saturday"],
					"SCHEDULE_SUNDAY" => $dataRsp["schedule"]["sunday"],
					);

			$arRspFields = array(
				"CREATED_BY"    => $USER->GetID(),
				"IBLOCK_ID"      => D_IBLOCK_ID,
				"IBLOCK_SECTION_ID" => $citySectionID,
				"ACTIVE" => "Y",
				"NAME" => $dataRsp["description"],
				"CODE" => Cutil::translit( $dataRsp["description"], LANG_RU, $translitParams),
				"PROPERTY_VALUES" => $PROP
			);

			$el = new CIBlockElement;
			$res = $el->Add($arRspFields);

			if($res)
				AddMessage2Log("[i] Добавление прошло успешно.");
			else
				$error = $el->LAST_ERROR;
				AddMessage2Log("[e] Ошибка добавления: ".$error);
		}
	}
}

//Ококнчательная проверка инфоблока на пустые секции
$arFilter = Array('IBLOCK_ID'=>D_IBLOCK_ID);
$uf_array = Array("ID", "GLOBAL_ACTIVE", "ACTIVE", "NAME", "DEPTH_LEVEL", "IBLOCK_SECTION_ID", "UF_REGION_NAME_RU", "UF_REGION_NAME_UK", "UF_REGION_NAME_ALL", "UF_CITY_REF", "ELEMENT_CNT");
$db_list = CIBlockSection::GetList(Array($by=>$order), $arFilter, true, $uf_array);
while($ar_result = $db_list->GetNext())
{
	if(!$ar_result["ELEMENT_CNT"]) {
		$delSection = CIBlockSection::Delete($ar_result["ID"]);
		if($delSection) {
			AddMessage2Log("[i] Удаление города прошло успешно. В нем нет отделений.");
		} else {
			AddMessage2Log("[e] Раздел не удален. ");
		}
	}
}
?>
