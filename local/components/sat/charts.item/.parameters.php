<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
if (!CModule::IncludeModule("iblock"))
    return false;
$arTypesEx = CIBlockParameters::GetIBlockTypes(array("-" => " "));

$arIBlocks = array();
$db_iblock = CIBlock::GetList(array("SORT" => "ASC"), array("TYPE" => ($arCurrentValues["IBLOCK_TYPE"] != "-" ? $arCurrentValues["IBLOCK_TYPE"] : "")));
while ($arRes = $db_iblock->Fetch())
    $arIBlocks[$arRes["ID"]] = "[" . $arRes["ID"] . "] " . $arRes["NAME"];


$arComponentParameters = array(
    "PARAMETERS" => array(
        "IBLOCK_TYPE" => array(
            "PARENT" => "BASE",
            "NAME" => "Тип инфоблока",
            "TYPE" => "LIST",
            "VALUES" => $arTypesEx,
            "DEFAULT" => "",
            "REFRESH" => "Y",
        ),
        "IBLOCK_ID" => array(
            "PARENT" => "BASE",
            "NAME" => "Идентификатор инфоблока",
            "TYPE" => "LIST",
            "VALUES" => $arIBlocks,
            "DEFAULT" => '',
            "ADDITIONAL_VALUES" => "N",
            "REFRESH" => "Y",
        ),
        "COUNT" => array(
            "PARENT" => "BASE",
            "NAME" => "Количество элементов",
            "TYPE" => "STRING",
            "DEFAULT" => '6',
        ),
        "VALUE_PROP" => array(
            "PARENT" => "VISUAL",
            "NAME" => "Свойство с значением элемента",
            "TYPE" => "STRING",
            "DEFAULT" => 'INDICATOR_VAL'
        ),
        "COLOR" => array(
            "PARENT" => "VISUAL",
            "NAME" => "Цвет графика",
            "TYPE" => "COLORPICKER",
            "DEFAULT" => '#0085FF'
        ),
        "IS_MAIN" => array(
            "PARENT" => "VISUAL",
            "NAME" => "Главный (с дополнительными значениями)",
            "TYPE" => "CHECKBOX",
            "MULTIPLE" => "N",
            "VALUE" => "Y",
            "DEFAULT" => 'N'
        ),
    )
);

if (0 < intval($arCurrentValues["IBLOCK_ID"])) {
    $arSectEntity = array();
    $arSections = array();

    $db_section_entity = CUserTypeEntity::GetList(array(), array("ENTITY_ID" => "IBLOCK_" . ($arCurrentValues["IBLOCK_ID"] . "_SECTION")));
    while ($arRes = $db_section_entity->Fetch())
        $arSectEntity[$arRes["FIELD_NAME"]] = '[' . $arRes["ID"] . '] ' . $arRes["FIELD_NAME"];

    $db_sections = CIBlockSection::GetList(
        array("SORT" => "ASC"),
        array("IBLOCK_ID" => $arCurrentValues["IBLOCK_ID"], "ACTIVE" => "Y", "GLOBAL_ACTIVE" => "Y"),
        false,
        array("ID", "NAME"));
    while ($arRes = $db_sections->Fetch()) {
        $arSections[$arRes["ID"]] = "[" . $arRes["ID"] . "] " . $arRes["NAME"];
    }

    $arComponentParameters["PARAMETERS"]["SECTION_ID"] = array(
        "PARENT" => "BASE",
        "NAME" => "График",
        "TYPE" => "LIST",
        "VALUES" => $arSections,

    );
    $arComponentParameters["PARAMETERS"]["CANVAS"] = array(
        "PARENT" => "BASE",
        "NAME" => "id графика",
        "TYPE" => "STRING",
        "DEFAULT" => 'main-chart-item',
    );

    $arComponentParameters["PARAMETERS"]["MIN_PROP"] = array(
        "PARENT" => "VISUAL",
        "NAME" => "Свойство с минимальным значением",
        "TYPE" => "LIST",
        "VALUES" => $arSectEntity
    );
    $arComponentParameters["PARAMETERS"]["MAX_PROP"] = array(
        "PARENT" => "VISUAL",
        "NAME" => "Свойство с максимальным значением",
        "TYPE" => "LIST",
        "VALUES" => $arSectEntity
    );
    $arComponentParameters["PARAMETERS"]["TYPE_PROP"] = array(
        "PARENT" => "VISUAL",
        "NAME" => "Свойство с типом графика",
        "TYPE" => "LIST",
        "VALUES" => $arSectEntity
    );
}
