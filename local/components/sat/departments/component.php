<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
use Bitrix\Main\Loader,
	Bitrix\Main,
	Bitrix\Iblock;

$arDefaultUrlTemplates404 = array(
	"list" => "",
	"map" => "map/",
	"town" => "#SECTION_CODE#/",
	"element" => "map/#SECTION_CODE#/#ELEMENT_CODE#/",
);


$arDefaultVariableAliases404 = array();

$arDefaultVariableAliases = array();

$arComponentVariables = array(
	"SECTION_ID",
	"SECTION_CODE",
	"ELEMENT_ID",
	"ELEMENT_CODE",
);

if($arParams["SEF_MODE"] == "Y")
{
	$arVariables = array();

	$engine = new CComponentEngine($this);
	if (\Bitrix\Main\Loader::includeModule('iblock'))
	{
		$engine->addGreedyPart("#SECTION_CODE_PATH#");
		$engine->setResolveCallback(array("CIBlockFindTools", "resolveComponentEngine"));
	}

	$arUrlTemplates = CComponentEngine::MakeComponentUrlTemplates($arDefaultUrlTemplates404, $arParams["SEF_URL_TEMPLATES"]);
	$arVariableAliases = CComponentEngine::MakeComponentVariableAliases($arDefaultVariableAliases404, $arParams["VARIABLE_ALIASES"]);


	$componentPage = $engine->guessComponentPath(
		$arParams["SEF_FOLDER"],
		$arUrlTemplates,
		$arVariables
	);

	if (strlen($componentPage) <= 0)
		$componentPage = "list";

	CComponentEngine::InitComponentVariables($componentPage, $arComponentVariables, $arVariableAliases, $arVariables);
	$arResult = array(
		"FOLDER" => $arParams["SEF_FOLDER"],
		"URL_TEMPLATES" => $arUrlTemplates,
		"VARIABLES" => $arVariables,
		"ALIASES" => $arVariableAliases,
		"COMPONENT_PAGE" => $componentPage,
		"LIST_TITLE" => $arParams["LIST_TITLE"],
	);
}
else
{
	$arVariables = array();

	$arVariableAliases = CComponentEngine::MakeComponentVariableAliases($arDefaultVariableAliases, $arParams["VARIABLE_ALIASES"]);
	CComponentEngine::InitComponentVariables(false, $arComponentVariables, $arVariableAliases, $arVariables);

	$componentPage = "";

	if(isset($arVariables["ELEMENT_ID"]) && intval($arVariables["ELEMENT_ID"]) > 0)
		$componentPage = "element";
	elseif(isset($arVariables["ELEMENT_CODE"]) && strlen($arVariables["ELEMENT_CODE"]) > 0)
		$componentPage = "element";
	elseif(isset($arVariables["SECTION_ID"]) && intval($arVariables["SECTION_ID"]) > 0)
		$componentPage = "town";
	elseif(isset($arVariables["SECTION_CODE"]) && strlen($arVariables["SECTION_CODE"]) > 0)
		$componentPage = "town";
	else
		$componentPage = "list";

	$currentPage = htmlspecialcharsbx($APPLICATION->GetCurPage())."?";
	$arResult = array(
		"FOLDER" => "",
		"URL_TEMPLATES" => array(
			"town" => $currentPage.$arVariableAliases["SECTION_ID"]."=#SECTION_ID#",
			"element" => $currentPage.$arVariableAliases["SECTION_ID"]."=#SECTION_ID#"."&".$arVariableAliases["ELEMENT_ID"]."=#ELEMENT_ID#",
		),
		"VARIABLES" => $arVariables,
		"ALIASES" => $arVariableAliases,
		"COMPONENT_PAGE" => $componentPage,
		"LIST_TITLE" => $arParams["LIST_TITLE"],
	);

}

if($componentPage == "list") {
	$APPLICATION->SetTitle($arParams["LIST_TITLE"]);
	$APPLICATION->SetPageProperty("title", $arParams["PAGE_LIST_TITLE"]);
	$APPLICATION->SetPageProperty("description", $arParams["PAGE_LIST_DESC"]);
}
elseif($componentPage == "map"){
	$APPLICATION->SetTitle($arParams["MAP_TITLE"]);
	$APPLICATION->SetPageProperty("title", $arParams["PAGE_MAP_TITLE"]);
	$APPLICATION->SetPageProperty("description", $arParams["PAGE_MAP_DESC"]);
}
elseif ($componentPage == "element"){

}

/*
$page = $APPLICATION->GetCurPage();
if ($componentPage == "list" && $page !== $arResult["FOLDER"])
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
*/

$this->IncludeComponentTemplate($componentPage);