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
        "VARIABLE_ALIASES" => array(),
        "SEF_MODE" => array(
            "index" => array(
                "NAME" => "Главная страница",
                "DEFAULT" => "index.php",
                "VARIABLES" => array(),
            ),
        ),
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
        "SHOW_MAIN_CHART" => array(
            "NAME" => "Отображать основной график(на всю страницу)",
            "TYPE" => "CHECKBOX",
            "MULTIPLE" => "N",
            "VALUE" => "Y",
            "DEFAULT" => "Y",
            "PARENT" => "BASE",
            "REFRESH" => "Y",
            "SORT" => 500
        ),
        "SHOW_SECONDARY_CHARTS" => array(
            "NAME" => "Отображать вторичные графики(на половину страницы)",
            "TYPE" => "CHECKBOX",
            "MULTIPLE" => "N",
            "VALUE" => "Y",
            "DEFAULT" => "N",
            "PARENT" => "BASE",
            "REFRESH" => "Y",
            "SORT" => 800
        ),
        "CACHE_TIME" => Array("DEFAULT" => 3600),
        "SET_TITLE" => Array(),
    ),
);

if (0 < intval($arCurrentValues["IBLOCK_ID"])) {
    $arSections = array();
    $arSectEntity = array();
    $arSecondaryItemsCount = array();


    $db_section_entity = CUserTypeEntity::GetList(array(), array("ENTITY_ID" => "IBLOCK_".($arCurrentValues["IBLOCK_ID"]."_SECTION")));
    while($arRes=$db_section_entity->Fetch()){
       $arSectEntity[$arRes["FIELD_NAME"]] = '['.$arRes["ID"].'] '.$arRes["FIELD_NAME"];
    }

    $db_sections = CIBlockSection::GetList(
        array("SORT" => "ASC"),
        array("IBLOCK_ID" => $arCurrentValues["IBLOCK_ID"], "ACTIVE" => "Y", "GLOBAL_ACTIVE" => "Y"),
        false,
        array("ID", "NAME"));
    while ($arRes = $db_sections->Fetch()) {
        $arSections[$arRes["ID"]] = "[" . $arRes["ID"] . "] " . $arRes["NAME"];
    }

    if ($arCurrentValues["SHOW_MAIN_CHART"] == "Y" && !empty($arSections)) {

        $arComponentParameters["PARAMETERS"]["MAIN_CHART_VAL_COUNT"] = array(
            "PARENT"=>"VISUAL",
            "NAME" => "Количество выводимых элементов главного графика",
            "TYPE" => "STRING",
            "DEFAULT" => "6"
        );

        $arComponentParameters["PARAMETERS"]["MAIN_CHART_ID"] = array(
            "PARENT" => "BASE",
            "NAME" => "Главный график",
            "TYPE" => "LIST",
            "VALUES" => $arSections,
            "SORT" => 510,
            "REFRESH" => "Y"
        );
        $arComponentParameters["PARAMETERS"]["MAIN_CHART_CANVAS"] = array(
            "PARENT" => "BASE",
            "NAME" => "ID блока с главным графиком",
            "TYPE" => "STRING",
            "DEFAULT" => "main-chart",
            "SORT" => 515
        );
        $arComponentParameters["PARAMETERS"]["MAIN_CHART_COLOR"] = array(
            "PARENT" => "BASE",
            "NAME" => "Цвет графика",
            "TYPE" => "COLORPICKER",
            "DEFAULT" => "#e6edfb",

        );

        unset($arSections[$arCurrentValues["MAIN_CHART_ID"]]);
    }


    if ($arCurrentValues["SHOW_SECONDARY_CHARTS"] == "Y" && !empty($arSections)) {

        $maxCount = count($arSections);

        for ($i = 1; $i <= $maxCount; $i++) {
            $arSecondaryItemsCount[$i] = $i;
        }

        $arComponentParameters["PARAMETERS"]["SECONDARY_CHARTS_VAL_COUNT"] = array(
            "PARENT"=>"VISUAL",
            "NAME" => "Количество выводимых элементов вторичных графика",
            "TYPE" => "STRING",
            "DEFAULT" => "6"
        );

        $arComponentParameters["PARAMETERS"]["SECONDARY_CHARTS_COUNT"] = array(
            "PARENT" => "BASE",
            "NAME" => "Количество вторичных графиков на странице",
            "TYPE" => "LIST",
            "VALUES" => $arSecondaryItemsCount,
            "REFRESH" => "Y",
            "SORT" => 810
        );
    }

    if ($arCurrentValues["SHOW_SECONDARY_CHARTS"] == "Y"  && 0 < intval($arCurrentValues["SECONDARY_CHARTS_COUNT"])) {
        for ($i = 1; $i <= intval($arCurrentValues["SECONDARY_CHARTS_COUNT"]); $i++) {
            $arComponentParameters["PARAMETERS"]["SECONDARY_CHART_ID_".($i-1)] = array(
                "PARENT" => "BASE",
                "NAME" => "График №" . $i,
                "TYPE" => "LIST",
                "VALUES" => $arSections,
                "SORT" => 820
            );
            $arComponentParameters["PARAMETERS"]["SECONDARY_CHART_CANVAS_".($i-1)] = array(
                "PARENT" => "BASE",
                "NAME" => "id графика №" . $i,
                "TYPE" => "STRING",
                "DEFAULT" => 'secondary-chart-'.$i,
                "SORT" => 820
            );
            $arComponentParameters["PARAMETERS"]["SECONDARY_CHART_COLOR_".($i-1)] = array(
                "PARENT" => "BASE",
                "NAME" => "Цвет графика №" . $i,
                "TYPE" => "COLORPICKER",
                "DEFAULT" => '#0085FF',
            );
        }

    }

    $arComponentParameters["PARAMETERS"]["CHART_TYPE_PROP"] = array(
        "PARENT"=>"VISUAL",
        "NAME" => "Тип графика",
        "TYPE" => "LIST",
        "VALUES" => $arSectEntity,
    );

    $arComponentParameters["PARAMETERS"]["CHART_MIN_VAL_PROP"] = array(
        "PARENT"=>"VISUAL",
        "NAME" => "Минимальное значение",
        "TYPE" => "LIST",
        "VALUES" => $arSectEntity,
    );

    $arComponentParameters["PARAMETERS"]["CHART_MAX_VAL_PROP"] = array(
        "PARENT"=>"VISUAL",
        "NAME" => "Максимальное значение",
        "TYPE" => "LIST",
        "VALUES" => $arSectEntity,
    );

    $arComponentParameters["PARAMETERS"]["CHART_VAL_PROP"] = array(
        "PARENT"=>"VISUAL",
        "NAME" => "Свойство из значением элемента графика",
        "TYPE" => "STRING",
        "DEFAULT" => "INDICATOR_VAL"
    );
}