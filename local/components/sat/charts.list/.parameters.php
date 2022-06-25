<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/** @var array $arCurrentValues */

if (!CModule::IncludeModule("iblock"))
    return;

$arTypesEx = CIBlockParameters::GetIBlockTypes(array("-" => " "));

$arSorts = array("ASC"=>GetMessage("T_IBLOCK_DESC_ASC"), "DESC"=>GetMessage("T_IBLOCK_DESC_DESC"));

$arIBlocks = array();
$db_iblock = CIBlock::GetList(array("SORT" => "ASC"), array("TYPE" => ($arCurrentValues["IBLOCK_TYPE"] != "-" ? $arCurrentValues["IBLOCK_TYPE"] : "")));
while ($arRes = $db_iblock->Fetch())
    $arIBlocks[$arRes["ID"]] = "[" . $arRes["ID"] . "] " . $arRes["NAME"];

$arProperty_LNS = array();
$arProperty_SORT = array();
$rsProp = CIBlockProperty::GetList(array("sort"=>"asc", "name"=>"asc"), array("ACTIVE"=>"Y", "IBLOCK_ID"=>(isset($arCurrentValues["IBLOCK_ID"])?$arCurrentValues["IBLOCK_ID"]:$arCurrentValues["ID"])));
while ($arr=$rsProp->Fetch())
{
    $arProperty[$arr["CODE"]] = "[".$arr["CODE"]."] ".$arr["NAME"];
    if (in_array($arr["PROPERTY_TYPE"], array("L", "N", "S")))
    {
        $arProperty_LNS[$arr["CODE"]] = "[".$arr["CODE"]."] ".$arr["NAME"];
    }
}

$arProperty_SORT = array(
    "ID"=>GetMessage("T_IBLOCK_DESC_FID"),
    "NAME"=>GetMessage("T_IBLOCK_DESC_FNAME"),
    "ACTIVE_FROM"=>GetMessage("T_IBLOCK_DESC_FACT"),
    "SORT"=>GetMessage("T_IBLOCK_DESC_FSORT"),
);

$arComponentParameters = array(
    "GROUPS" => array(),
    "PARAMETERS" => array(
        "IBLOCK_TYPE" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("T_IBLOCK_DESC_LIST_TYPE"),
            "TYPE" => "LIST",
            "VALUES" => $arTypesEx,
            "DEFAULT" => "",
            "REFRESH" => "Y",
        ),
        "IBLOCK_ID" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("T_IBLOCK_DESC_LIST_ID"),
            "TYPE" => "LIST",
            "VALUES" => $arIBlocks,
            "DEFAULT" => '',
            "ADDITIONAL_VALUES" => "N",
            "REFRESH" => "Y",
        ),
        "CHARTS_COUNT" => array(
            "PARENT" => "BASE",
            "NAME" => GetMessage("T_IBLOCK_DESC_LIST_CONT"),
            "TYPE" => "STRING",
            "DEFAULT" => "4",
            "REFRESH" => "Y",
        ),

        "SECTION_FIELD_CODE" => CIBlockParameters::GetSectionFieldCode(GetMessage("IBLOCK_SECTION_FIELD"), "DATA_SOURCE"),

        "FIELD_CODE" => CIBlockParameters::GetFieldCode(GetMessage("IBLOCK_FIELD"), "DATA_SOURCE"),
        "PROPERTY_CODE" => array(
            "PARENT" => "DATA_SOURCE",
            "NAME" => GetMessage("T_IBLOCK_PROPERTY"),
            "TYPE" => "LIST",
            "MULTIPLE" => "Y",
            "VALUES" => $arProperty_LNS,
            "ADDITIONAL_VALUES" => "Y",
        ),
        "CHARTS_VAL_COUNT" => array(
            "PARENT" => "VISUAL",
            "NAME" => GetMessage("CHARTS_VAT_COUNT"),
            "TYPE" => "STRING",
            "DEFAULT" => "5"
        ),
        "ACTIVE_DATE_FORMAT" => CIBlockParameters::GetDateFormat(GetMessage("T_IBLOCK_DESC_ACTIVE_DATE_FORMAT"), "ADDITIONAL_SETTINGS"),
        "CACHE_TIME"  =>  array("DEFAULT"=>36000000),
        "SORT_BY1" => array(
            "PARENT" => "DATA_SOURCE",
            "NAME" => GetMessage("SORT_EL_BY1"),
            "TYPE" => "LIST",
            "DEFAULT" => "SORT",
            "VALUES" => $arProperty_SORT,
            "ADDITIONAL_VALUES" => "Y",
        ),
        "SORT_ORDER1" => array(
            "PARENT" => "DATA_SOURCE",
            "NAME" => GetMessage("SORT_EL_ORDER1"),
            "TYPE" => "LIST",
            "DEFAULT" => "DESC",
            "VALUES" => $arSorts,
            "ADDITIONAL_VALUES" => "Y",
        ),
        "SORT_BY2" => array(
            "PARENT" => "DATA_SOURCE",
            "NAME" => GetMessage("SORT_EL_BY2"),
            "TYPE" => "LIST",
            "DEFAULT" => "ACTIVE_FROM",
            "VALUES" => $arProperty_SORT,
            "ADDITIONAL_VALUES" => "Y",
        ),
        "SORT_ORDER2" => array(
            "PARENT" => "DATA_SOURCE",
            "NAME" => GetMessage("SORT_EL_ORDER2"),
            "TYPE" => "LIST",
            "DEFAULT" => "DESC",
            "VALUES" => $arSorts,
            "ADDITIONAL_VALUES" => "Y",
        ),
    )
);

if (0 < intval($arCurrentValues["IBLOCK_ID"]) && 0 < intval($arCurrentValues["CHARTS_COUNT"])) {
    $arSections = array();
    $db_sections = CIBlockSection::GetList(
        array("SORT" => "ASC"),
        array("IBLOCK_ID" => $arCurrentValues["IBLOCK_ID"], "ACTIVE" => "Y", "GLOBAL_ACTIVE" => "Y"),
        false,
        array("ID", "NAME"));
    while ($arRes = $db_sections->Fetch()) {
        $arSections[$arRes["ID"]] = "[" . $arRes["ID"] . "] " . $arRes["NAME"];
    }
        $length = $arCurrentValues["CHARTS_COUNT"];
        for ($i = 0; $i < $length; $i++) {
            $arComponentParameters["PARAMETERS"]["SECT_LIST_" . ($i + 1)] = array(
                "PARENT" => "BASE",
                "NAME" => GetMessage("CHARTS_DATA") . ($i + 1) . ":",
                "TYPE" => "LIST",
                "VALUES" => $arSections,
                "DEFAULT" => "",
                "REFRESH" => "Y",
            );
     }
}


//CIBlockParameters::Add404Settings($arComponentParameters, $arCurrentValues);
