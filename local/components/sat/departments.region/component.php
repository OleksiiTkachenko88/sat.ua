<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

use Bitrix\Main\Loader,
	Bitrix\Main,
	Bitrix\Iblock,
	Bitrix\Iblock\InheritedProperty;

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
		"ID",
		"IBLOCK_ID",
		"IBLOCK_SECTION_ID",
		"DEPTH_LEVEL",
		"SECTION_CODE",
		"CODE",
		"NAME",
		"LIST_PAGE_URL",
		"SECTION_PAGE_URL",
		"UF_*"
	);

   $arFilter = array(
		"IBLOCK_ID"=>$arResult["ID"],
		"GLOBAL_ACTIVE" => "Y",
	);

	if(SITE_DIR == "/") {
		$arResult["MAIN_LANG"] = "UK";
		$arResult["ADD_LANG"] = "RU";

		$arOrder = array(
			"depth_level"=>"ASC",
			"UF_REGION_NAME_UK"=>"ASC"
		);
	}
	else {
		$arResult["MAIN_LANG"] = "RU";
		$arResult["ADD_LANG"] = "UK";

		$arOrder = array(
			"depth_level"=>"ASC",
			"UF_REGION_NAME_RU"=>"ASC"
		);
	}

	if(isset($arParams["VARIABLES"]["SECTION_ID"]) && intval($arParams["VARIABLES"]["SECTION_ID"]) > 0)
		$isCurrent = $arParams["VARIABLES"]["SECTION_ID"];
	elseif(isset($arParams["VARIABLES"]["SECTION_CODE"]) && strlen($arParams["VARIABLES"]["SECTION_CODE"]) > 0)
		$isCurrent = $arParams["VARIABLES"]["SECTION_CODE"];

	$db_list = CIBlockSection::GetList($arOrder, $arFilter, true, $arSelect);
	while($ar_result = $db_list->GetNext())
	{
		$ar_result["TOWN_URL"] = CComponentEngine::MakePathFromTemplate($arParams["TOWN_URL"],
									array(
										"SECTION_ID" => $ar_result["ID"],
										"SECTION_CODE" => $ar_result["CODE"],
									));
		if(strlen($ar_result["IBLOCK_SECTION_ID"])<=0){
			$arResult["REGIONS_LIST"][$ar_result["ID"]] = $ar_result;
		}
		elseif(strlen($ar_result["IBLOCK_SECTION_ID"])>0){
			$ar_result["IS_CURRENT"] = (isset($isCurrent) && ( $ar_result["CODE"] == $isCurrent || $ar_result["ID"] == $isCurrent)) ? "Y" : "N";
			$arResult["REGIONS_LIST"][$ar_result["IBLOCK_SECTION_ID"]]["CITIES_LIST"][$ar_result["ID"]] = $ar_result;

			if($ar_result["IS_CURRENT"] == "Y") {
				$arResult["REGIONS_LIST"][$ar_result["IBLOCK_SECTION_ID"]]["IS_CURRENT"] = "Y";
				if($arParams["SET_TITLE"]=="Y") {
					$description = ($arResult["MAIN_LANG"] == "UK") ? $ar_result["UF_REGION_NAME_UK"] :$ar_result["UF_REGION_NAME_RU"];

					$title = CComponentEngine::MakePathFromTemplate($arParams["SEO_TITLE"], 
																		array(
																		"NAME" => $description
																		)
																	);

					$page_title = CComponentEngine::MakePathFromTemplate($arParams["SEO_PAGE_TITLE"], 
																		array(
																		"NAME" => $description
																		)
																	);

					$page_description = CComponentEngine::MakePathFromTemplate($arParams["SEO_PAGE_DESC"], 
																		array(
																		"NAME" => $description
																		)
																	);

					$APPLICATION->SetTitle($title);
					$APPLICATION->SetPageProperty("title", $page_title);
					$APPLICATION->SetPageProperty("description", $page_description);
				}
			}
		}
	}

	$this->setResultCacheKeys(array(
		"ID",
		"IBLOCK_TYPE_ID",
		"LIST_PAGE_URL",
		"MAIN_LANG",
		"ADD_LANG",
		"NAME",
		"REGIONS_LIST",
	));

	$this->includeComponentTemplate();
}

?>