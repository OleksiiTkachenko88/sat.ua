<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var CBitrixComponent $this */
/** @var array $arParams */
/** @var array $arResult */
/** @var string $componentPath */
/** @var string $componentName */
/** @var string $componentTemplate */
/** @global CDatabase $DB */
/** @global CUser $USER */

/** @global CMain $APPLICATION */

use Bitrix\Main\Loader;

if (!isset($arParams["CACHE_TIME"]))
    $arParams["CACHE_TIME"] = 36000000;

$arParams["IBLOCK_TYPE"] = trim($arParams["IBLOCK_TYPE"]);
if (strlen($arParams["IBLOCK_TYPE"]) <= 0)
    $arParams["IBLOCK_TYPE"] = (LANGUAGE_ID == "ua") ? "ua" : "ru";

$arParams["IBLOCK_ID"] = trim($arParams["IBLOCK_ID"]);

if (!is_array($arParams["SECTION_FIELD_CODE"]))
    $arParams["SECTION_FIELD_CODE"] = array();
foreach ($arParams["SECTION_FIELD_CODE"] as $key => $val)
    if (!$val)
        unset($arParams["SECTION_FIELD_CODE"][$key]);

if (!is_array($arParams["FIELD_CODE"]))
    $arParams["FIELD_CODE"] = array();
foreach ($arParams["FIELD_CODE"] as $key => $val)
    if (!$val)
        unset($arParams["FIELD_CODE"][$key]);

if (!is_array($arParams["PROPERTY_CODE"]))
    $arParams["PROPERTY_CODE"] = array();
foreach ($arParams["PROPERTY_CODE"] as $key => $val)
    if ($val === "")
        unset($arParams["PROPERTY_CODE"][$key]);

$arParams["CHARTS_COUNT"] = trim($arParams["CHARTS_COUNT"]);
$arParams["CHARTS_VAL_COUNT"] = trim($arParams["CHARTS_VAL_COUNT"]);

if (strlen($arParams["ACTIVE_DATE_FORMAT"]) <= 0)
    $arParams["ACTIVE_DATE_FORMAT"] = $DB->DateFormatToPHP(CSite::GetDateFormat("SHORT"));


if ($this->startResultCache()) {
    if (!Loader::includeModule('iblock')) {
        $this->abortResultCache();
        ShowError(GetMessage("IBLOCK_MODULE_NOT_INSTALLED"));
        return;
    }

    if (is_numeric($arParams["IBLOCK_ID"])) {
        $rsIBlock = CIBlock::GetList(array(), array(
            "ACTIVE" => "Y",
            "ID" => $arParams["IBLOCK_ID"],
        ));
    } else {
        $this->abortResultCache();
        ShowError(GetMessage("IBLOCK_NOT_SET"));
        return;
    }

    $arResult = $rsIBlock->GetNext();
    if (!$arResult) {
        $this->abortResultCache();
        ShowError(GetMessage("IBLOCK_NOT_FIND"));
        return;
    }

    $chartsCount = count($arParams["CHARTS_COUNT"]) > 0;
    if (!$chartsCount) {
        $this->abortResultCache();
        ShowError("Должен быть хоть один график на странице");
        return;
    }
    $arSectionSelect = array_merge($arParams["SECTION_FIELD_CODE"], array(
        "ID",
        "IBLOCK_ID",
        "UF_CHART_VUE",
        "UF_CHART_MIN_VAL",
        "UF_CHART_MAX_VAL"
    ));

    $arSectionFilter = array(
        "ACTIVE" => "Y",
        "GLOBAL_ACTIVE" => "Y",
        "IBLOCK_ID" => $arParams["IBLOCK_ID"],
    );


    $arElementsSelect = array_merge($arParams["FIELD_CODE"], array(
        "ID",
        "IBLOCK_ID",
        "IBLOCK_SECTION_ID",
        "DATE_ACTIVE_FROM",
        "DATE_ACTIVE_TO",
    ));

    $bGetProperty = count($arParams["PROPERTY_CODE"]) > 0;
    if ($bGetProperty) {
        foreach ($arParams["PROPERTY_CODE"] as $key => $val) {
            $arElementsSelect[] = "PROPERTY_" . $val;
        }

    }

    $arElementsFilter = array(
        "IBLOCK_ID" => $arResult["ID"],
        "IBLOCK_LID" => SITE_ID,
        "ACTIVE" => "Y",
    );

    $arSort = array(
        $arParams["SORT_BY1"] => $arParams["SORT_ORDER1"],
        $arParams["SORT_BY2"] => $arParams["SORT_ORDER2"],
    );
    $n = 0;
    for ($i = 1; $i <= $arParams["CHARTS_COUNT"]; $i++) {
        $arSectionFilter["ID"] = $arParams["SECT_LIST_" . $i];
        $arElementsFilter["IBLOCK_SECTION_ID"] = $arParams["SECT_LIST_" . $i];
        $arSection = CIBlockSection::GetList(array(), $arSectionFilter, true, $arSectionSelect)->Fetch();
        /*
                if (intval($arSection["ELEMENT_CNT"]) < intval($arParams["CHARTS_VAL_COUNT"])) {
                    $this->abortResultCache();
                    ShowError("Недостаточно элементов для показа в графике " .$arSection["NAME"] .". Необходимо минимум элементов: ".$arParams["CHARTS_VAL_COUNT"]);
                    return;
                }
        */
        $sectionType = CUserFieldEnum::GetList(array(), array("ID" => $arSection["UF_INDICATOR_VUE"]))->arResult[0]["XML_ID"];
        $arSection["ELEMENTS_VAL_COUNT"] = ($sectionType == "PIPE") ? 1 : $arParams["CHARTS_VAL_COUNT"];
        $arResult["ITEMS"][] = $arSection;

        $dbElements = CIBlockElement::GetList($arSort, $arElementsFilter, false, array("nTopCount" => intval($arSection["ELEMENTS_VAL_COUNT"])), $arElementsSelect);
        while ($arElements = $dbElements->GetNext()) {
            $arElements["X_LABEL"] = FormatDate("M", MakeTimeStamp($arElements["DATE_ACTIVE_FROM"])); //M - скоращенное название f - полное
            $arResult["ITEMS_ELEMENTS"][$n][] = $arElements;
        }
        $n++;
    }

    $this->includeComponentTemplate();

    $this->setResultCacheKeys(array(
        "ID",
        "NAME",
        "ITEMS",
        "ITEMS_ELEMENTS",
        "IBLOCK_ID",
    ));
}

CJSCore::Init("chartjs");
