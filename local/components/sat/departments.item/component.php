<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

use Bitrix\Main\Loader,
	Bitrix\Main,
	Bitrix\Iblock;

$ibLang = (strlen(LANGUAGE_ID)> 0) ? LANGUAGE_ID : "ru";

$arParams["LANGUAGE"] = trim($ibLang);
unset($ibLang);

$arResult["MAP_ID"] = trim($arParams["MAP_ID"]);
//if(!isset($arParams["CACHE_TIME"]))
//	$arParams["CACHE_TIME"] = 36000000;

$arParams["IBLOCK_TYPE"] = trim($arParams["IBLOCK_TYPE"]);
if(strlen($arParams["IBLOCK_TYPE"])<=0)
	$arParams["IBLOCK_TYPE"] = "shared";

$arParams["IBLOCK_ID"] = trim($arParams["IBLOCK_ID"]);
$arParams["ELEMENT_REF"] = trim($arParams["ELEMENT_REF"]);
$arParams["ELEMENT_NUMBER"] = trim($arParams["ELEMENT_NUMBER"]);

if(strlen($arParams["MAP_PAGE"]) > 0)
	$arResult["LINK"]["MAP"] = trim($arParams["MAP_PAGE"]);

if(!Loader::includeModule("iblock"))
{
	return;
}

if(!strlen($arParams["ELEMENT_NUMBER"]) > 0 && !is_numeric($arParams["ELEMENT_NUMBER"]))
{
	$this->abortResultCache();
	ShowError(GetMessage("DATA_ERROR"));
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
	$this->abortResultCache();
	return;
}

$arIBlock = $rsIBlock -> GetNext();

$arResult["IBLOCK_ID"] = $arIBlock["ID"];
unset($arIBlock);

if(!is_numeric($arResult["IBLOCK_ID"])) {
	$this->abortResultCache();
	ShowError(GetMessage("IB_DATA_ERROR"));
	return;
}

$arSelect = array(
	"ID",
	"IBLOCK_SECTION_ID",
	"CODE",
	"NAME",
	"PROPERTY_DESCRIPTION_UK",
	"PROPERTY_REF",
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
	"PROPERTY_SCHEDULE_SUNDAY",
);

$arFilter = array(
	"IBLOCK_ID"=>$arResult["IBLOCK_ID"],
	"GLOBAL_ACTIVE"=>"Y",
	array(
	"LOGIC" => "OR",
	array("PROPERTY_REF" => $arParams["ELEMENT_REF"]),
	array("PROPERTY_NUMBER" => $arParams["ELEMENT_NUMBER"]),
	),
);


$db_list = CIBlockElement::GetList(array(), $arFilter, false, false, $arSelect);
$ar_result = $db_list->GetNext();

$arResult["ELEMENT"] = array();

switch($arParams["LANGUAGE"]) {
	case "ua":
		$arResult["ELEMENT"] = array(	"NUMBER" => trim($ar_result["PROPERTY_NUMBER_VALUE"]),
										"NAME" => trim($ar_result["PROPERTY_DESCRIPTION_UK_VALUE"]),
										"ADDRESS" => trim($ar_result["PROPERTY_ADDRES_UK_VALUE"]),
										"PHONE" => trim($ar_result["PROPERTY_PHONE_VALUE"]),
										"EMAIL" => trim($ar_result["PROPERTY_EMAIL_VALUE"]),
										"COORD" => array(
											"LATITUDE" => trim($ar_result["PROPERTY_LATITUDE_VALUE"]),
											"LONGITUDE" => trim($ar_result["PROPERTY_LONGITUDE_VALUE"]),
										),
								);
		if(	$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_TUESDAY_VALUE"] &&
			$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_WEDNESDAY_VALUE"] &&
			$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_THURSDAY_VALUE"] &&
			$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_FRIDAY_VALUE"]) 
			{
				$arResult["ELEMENT"]["SHEDULE"]["WEEKDAYS"] = $ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["SATURDAY"] = $ar_result["PROPERTY_SCHEDULE_SATURDAY_VALUE"];
			}
			else
			{
				$arResult["ELEMENT"]["SHEDULE"]["MONDAY"] = $ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["TUESDAY"] = $ar_result["PROPERTY_SCHEDULE_TUESDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["WEDNESDAY"] = $ar_result["PROPERTY_SCHEDULE_WEDNESDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["THURSDAY"] = $ar_result["PROPERTY_SCHEDULE_THURSDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["FRIDAY"] = $ar_result["PROPERTY_SCHEDULE_FRIDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["SATURDAY"] = $ar_result["PROPERTY_SCHEDULE_SATURDAY_VALUE"];
			}
	break;
	default:
		$arResult["ELEMENT"] = array(	"NUMBER" => trim($ar_result["PROPERTY_NUMBER_VALUE"]),
										"NAME" => trim($ar_result["NAME"]),
										"ADDRESS" => trim($ar_result["PROPERTY_ADDRES_VALUE"]),
										"PHONE" => trim($ar_result["PROPERTY_PHONE_VALUE"]),
										"EMAIL" => trim($ar_result["PROPERTY_EMAIL_VALUE"]),
										"COORD" => array(
											"LATITUDE" => trim($ar_result["PROPERTY_LATITUDE_VALUE"]),
											"LONGITUDE" => trim($ar_result["PROPERTY_LONGITUDE_VALUE"]),
										),
								);
		if(	$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_TUESDAY_VALUE"] &&
			$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_WEDNESDAY_VALUE"] &&
			$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_THURSDAY_VALUE"] &&
			$ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $ar_result["PROPERTY_SCHEDULE_FRIDAY_VALUE"]) 
			{
				$arResult["ELEMENT"]["SHEDULE"]["WEEKDAYS"] = $ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["SATURDAY"] = $ar_result["PROPERTY_SCHEDULE_SATURDAY_VALUE"];
			}
			else
			{
				$arResult["ELEMENT"]["SHEDULE"]["MONDAY"] = $ar_result["PROPERTY_SCHEDULE_MONDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["TUESDAY"] = $ar_result["PROPERTY_SCHEDULE_TUESDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["WEDNESDAY"] = $ar_result["PROPERTY_SCHEDULE_WEDNESDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["THURSDAY"] = $ar_result["PROPERTY_SCHEDULE_THURSDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["FRIDAY"] = $ar_result["PROPERTY_SCHEDULE_FRIDAY_VALUE"];
				$arResult["ELEMENT"]["SHEDULE"]["SATURDAY"] = $ar_result["PROPERTY_SCHEDULE_SATURDAY_VALUE"];
			}
	break;
}

unset($ar_result);


$this->IncludeComponentTemplate();
?>