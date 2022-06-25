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

	$arIblock = $rsIBlock->GetNext();

	if(isset($arIblock["ID"])){
		$arResult["IBLOCK_ID"] = trim($arIblock["ID"]);
		$arResult["LANGUAGE"] = trim(strtoupper(LANGUAGE_ID));
		$arResult["CODE"] = trim($arParams["CODE"]);
	}
	else
	{
		$this->abortResultCache();
		return;
	}
unset($arIblock);

	$arSelect = array(
		"ID",
		"IBLOCK_ID",
		"CODE",
		"PROPERTY_DESCRIPTION_".$arResult["LANGUAGE"]
	);

   $arFilter = array(
		"IBLOCK_ID"=>$arResult["IBLOCK_ID"],
		"ACTIVE"=>"Y",
		"CODE" => $arResult["CODE"]
	);

	$elList = array();

	$db_list = CIBlockElement::GetList($arOrder, $arFilter, false, false, $arSelect);
	while($ar_result = $db_list->GetNext())
	{
		$elList[] = $ar_result;
	}

	if(count($elList) !== 1) {
		$this->abortResultCache();
		return;
	}
	$arResult["ID"] = $elList[0]["ID"];
	$arResult["TEXT"] = $elList[0]["~PROPERTY_DESCRIPTION_".$arResult["LANGUAGE"]."_VALUE"]["TEXT"];



	unset($elList);

	$this->setResultCacheKeys(array(
		"IBLOCK_ID",
		"LANGUAGE",
		"TEXT"
	));

	if(isset($arResult["ID"]))
	{
		if($USER->IsAuthorized())
		{
			if(	$APPLICATION->GetShowIncludeAreas() )
			{
				$arButtons = CIBlock::GetPanelButtons(
					$arResult["IBLOCK_ID"],
					$arResult["ID"],
					0,
					array("SECTION_BUTTONS"=>false, "SESSID"=>false)
				);

				$arResult["BTN"]["EDIT_LINK"] = $arButtons["edit"]["edit_element"]["ACTION_URL"];
				$arResult["BTN"]["DELETE_LINK"] = $arButtons["edit"]["delete_element"]["ACTION_URL"];
			}
		}
	}
	$this->includeComponentTemplate();
}

?>

