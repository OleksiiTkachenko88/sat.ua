<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

use Bitrix\Main\Loader,
	Bitrix\Main,
	Bitrix\Iblock;

if(!isset($arParams["CACHE_TIME"]))
	$arParams["CACHE_TIME"] = 36000000;

$arParams["IBLOCK_TYPE"] = trim($arParams["IBLOCK_TYPE"]);
if(strlen($arParams["IBLOCK_TYPE"])<=0)
	$arParams["IBLOCK_TYPE"] = "shared";

$arParams["IBLOCK_ID"] = trim($arParams["IBLOCK_ID"]);

if($this->startResultCache()){
	if(!Loader::includeModule("iblock"))
	{
		$this->abortResultCache();
		ShowError(GetMessage("IBLOCK_MODULE_NOT_INSTALLED"));
		return;
	}

	if(is_numeric($arParams["IBLOCK_ID"]))
	{
		$rsIBlock = CIBlock::GetList(array(), array(
			"ACTIVE" => "Y",
			"ID" => $arParams["IBLOCK_ID"],
		));
	}
	else
	{
		$rsIBlock = CIBlock::GetList(array(), array(
			"ACTIVE" => "Y",
			"CODE" => $arParams["IBLOCK_ID"],
			"SITE_ID" => SITE_ID,
		));
	}

	$arResult = $rsIBlock->GetNext();

	$arSelect = array(
    "PROPERTY_TYPE_CODE",
		"ID",
		"IBLOCK_ID",
		"IBLOCK_SECTION_ID",
		"CODE",
		"NAME",
		"LIST_PAGE_URL",
		"DETAIL_PAGE_URL",
		"PROPERTY_DESCRIPTION_UK",
		"PROPERTY_REF",
		"PROPERTY_CITY_REF",
		"PROPERTY_ADDRES",
		"PROPERTY_ADDRES_UK",
		"PROPERTY_NUMBER",
		"PROPERTY_PHONE",
		"PROPERTY_EMAIL",
		"PROPERTY_LATITUDE",
		"PROPERTY_LONGITUDE",
		"PROPERTY_SCHEDULE_MONDAY",
		"PROPERTY_SCHEDULE_TUESDAY",
		"PROPERTY_SCHEDULE_WEDNESDAY",
		"PROPERTY_SCHEDULE_THURSDAY",
		"PROPERTY_SCHEDULE_FRIDAY",
		"PROPERTY_SCHEDULE_SATURDAY",
    "PROPERTY_SCHEDULE_SUNDAY"
	);

   $arFilter = array(
		"IBLOCK_ID"=>$arResult["ID"],
		"GLOBAL_ACTIVE"=>"Y"
	);

	if(!isset($arParams["COMPONENT_PAGE"]) || $arParams["COMPONENT_PAGE"] == "list")
		$arResult["PAGE_ID"] = "list";

	if(isset($arParams["VARIABLES"]["SECTION_ID"]) && intval($arParams["VARIABLES"]["SECTION_ID"]) > 0)
		$arFilter["SECTION_ID"] = $arParams["VARIABLES"]["SECTION_ID"];
	elseif(isset($arParams["VARIABLES"]["SECTION_CODE"]) && strlen($arParams["VARIABLES"]["SECTION_CODE"]) > 0)
		$arFilter["SECTION_CODE"] = $arParams["VARIABLES"]["SECTION_CODE"];


	if(SITE_DIR == "/") {
		$arResult["MAIN_LANG"] = "UK";
		$arResult["ADD_LANG"] = "RU";

		$arOrder = array(
			"PROPERTY_DESCRIPTION_UK"=>"ASC"
		);
	}
	else {
		$arResult["MAIN_LANG"] = "RU";
		$arResult["ADD_LANG"] = "UK";

		$arOrder = array(
			"NAME"=>"ASC"
		);
	}

  function getBraches() {
    $branches = file_get_contents('https://catalog.sat.ua/GetRsp?app=website');
    $branchList = json_decode($branches, TRUE);
    return $branchList['data'];
  }

  function ucfirst_utf8($str) {
    return mb_substr(mb_strtoupper($str, 'utf-8'), 0, 1, 'utf-8')
      . mb_substr(mb_strtolower($str, 'utf-8'), 1, mb_strlen($str)-1, 'utf-8');
  }

  $branches = getBraches();

  file_put_contents('./__LOG__.json', json_encode($branches));

	$db_list = CIBlockElement::GetList($arOrder, $arFilter, false, false, $arSelect);
	while($ar_result = $db_list->GetNext()) {
    $res = CIBlockSection::GetByID($ar_result["IBLOCK_SECTION_ID"]);
		if ($ar_res = $res->GetNext()) {
			$ar_result["TOWN_URL"] = CComponentEngine::MakePathFromTemplate($arParams["TOWN_URL"],
        [ "SECTION_CODE" => $ar_res["CODE"] ]
      );
    }

    $ref = $ar_result['PROPERTY_REF_VALUE'];
    $branchArr = array_filter($branches, function($v) use ($ref) { return $v['ref'] == $ref; });
    $branch = array_shift($branchArr);

    $region = ucfirst_utf8($branch['region'][$arResult["MAIN_LANG"]]);
    $region = str_replace("область", "обл.", $region);
    $region = str_replace("-ф", "-Ф", $region); // Костыль для Івано-франківська
    $ar_result['region'] = $region;
    $typeCOD = strtoupper($branch['typeCOD'][0] ?? 'general');

    $ar_result["typeCODTitle"] = $arResult["MAIN_LANG"] == "UK"
      ? ($typeCOD == 'CARD' ? 'Доступна послуга післяплати' : '')
      : ($typeCOD == 'CARD' ? 'Доступен наложеный платеж' : '');


    $ar_result["typeCODUrl"] = $arResult["MAIN_LANG"] == "UK"
      ? 'https://www.sat.ua/about/recommend/dostavka-vantazhu-nakladenym-platezhem/'
      : 'https://www.sat.ua/ru/about/recommend/dostavka-vantazhu-nakladenym-platezhem/';

		$ar_result["DETAIL_URL"] = CComponentEngine::MakePathFromTemplate($arParams['RSP_URL'],
		  [ 'ELEMENT_CODE' => $ar_result['CODE'] ]
    );

		$arResult["DEPARTMENTS_LIST"][$ar_result["ID"]] = $ar_result;

    if ($ar_result["ID"] == $arParams["VARIABLES"]["ELEMENT_ID"]
      || $ar_result["CODE"] == $arParams["VARIABLES"]["ELEMENT_CODE"]) {

      $name = ($arResult["MAIN_LANG"] == "UK")
        ? $ar_result["PROPERTY_DESCRIPTION_UK_VALUE"]
        : $ar_result["NAME"];

			$title = CComponentEngine::MakePathFromTemplate($arParams["SEO_TITLE"],
				[ 'NAME' => $name ]
      );

			$page_title = CComponentEngine::MakePathFromTemplate($arParams["SEO_PAGE_TITLE"],
			  [ 'NAME' => $name ]
      );

			$page_description = CComponentEngine::MakePathFromTemplate($arParams["SEO_PAGE_DESC"],
			  [ 'NAME' => $name ]
      );

			$APPLICATION->SetTitle($title);
			$APPLICATION->SetPageProperty("title", $page_title);
			$APPLICATION->SetPageProperty("description", $page_description);
		}
	}

	if(isset($arParams["VARIABLES"]["ELEMENT_ID"]) && intval($arParams["VARIABLES"]["ELEMENT_ID"]) > 0)
		$arResult["ACTIVE_RSP"] = $arParams["VARIABLES"]["ELEMENT_ID"];
	elseif(isset($arParams["VARIABLES"]["ELEMENT_CODE"]) && strlen($arParams["VARIABLES"]["ELEMENT_CODE"]) > 0)
		$arResult["ACTIVE_RSP"] = $arParams["VARIABLES"]["ELEMENT_CODE"];
	else
		$arResult["ACTIVE_RSP"] = "";


	if (!$arResult["DEPARTMENTS_LIST"])
	{
		$this->abortResultCache();
		Iblock\Component\Tools::process404(
			trim($arParams["MESSAGE_404"]) ?: GetMessage("T_NEWS_NEWS_NA")
			,true
			,$arParams["SET_STATUS_404"] === "Y"
			,$arParams["SHOW_404"] === "Y"
			,$arParams["FILE_404"]
		);
		return;
	}

	$this->setResultCacheKeys(array(
		"ID",
		"IBLOCK_TYPE_ID",
		"LIST_PAGE_URL",
		"MAIN_LANG",
		"ADD_LANG",
		"NAME",
		"DEPARTMENTS_LIST",
	));


	$this->includeComponentTemplate();
}

?>

