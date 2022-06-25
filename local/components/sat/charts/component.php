<? if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var CBitrixComponent $this */

if (!CModule::IncludeModule("iblock")) {
    ShowError("Бла бла бла");
    return;
}

$arDefaultUrlTemplates404 = array(
    "index" => "index.php"
);

$arDefaultVariableAliases404 = array();
$arDefaultVariableAliases = array();
$componentPage = "";
$arComponentVariables = array();


if ($arParams["SEF_MODE"] == "Y") {
    $arVariables = array();

    $arUrlTemplates = CComponentEngine::MakeComponentUrlTemplates($arDefaultUrlTemplates404, $arParams["SEF_URL_TEMPLATES"]);
    $arVariableAliases = CComponentEngine::MakeComponentVariableAliases($arDefaultVariableAliases404, $arParams["VARIABLE_ALIASES"]);


    $componentPage = CComponentEngine::ParseComponentPath($arParams["SEF_FOLDER"], $arUrlTemplates, $arVariables);

    if (empty($componentPage) || (!array_key_exists($componentPage, $arDefaultUrlTemplates404))) {
        $componentPage = "index";
    }

    CComponentEngine::InitComponentVariables($componentPage, $arComponentVariables, $arVariableAliases, $arVariables);

    foreach ($arUrlTemplates as $url => $value) {
        if (strlen($arParams["PATH_TO_" . strToUpper($url)]) <= 0)
            $arResult["PATH_TO_" . strToUpper($url)] = $arParams["SEF_FOLDER"] . $value;
        else
            $arResult["PATH_TO_" . strToUpper($url)] = $arParams["PATH_TO_" . strToUpper($url)];
    }
} else {
    $arVariables = array();
    $arVariableAliases = CComponentEngine::MakeComponentVariableAliases($arDefaultVariableAliases, $arParams["VARIABLE_ALIASES"]);
    CComponentEngine::InitComponentVariables(false, $arComponentVariables, $arVariableAliases, $arVariables);

    if (empty($componentPage) || (!array_key_exists($componentPage, $arDefaultUrlTemplates404))) {
        $componentPage = "index";
    }
}

$arMainChart = ($arParams["SHOW_MAIN_CHART"] == "Y") ?
    array(
        "ID" => $arParams["MAIN_CHART_ID"],
        "COUNT" => $arParams["MAIN_CHART_VAL_COUNT"],
        "CANVAS" => $arParams["MAIN_CHART_CANVAS"],
        "COLOR" => $arParams["MAIN_CHART_COLOR"],
    )
    : array();

$arDataSecondaryCharts = array();
for ($i = 0; $i < $arParams["SECONDARY_CHARTS_COUNT"]; $i++) {
    $arDataSecondaryCharts[] = array(
        "ID" => $arParams["SECONDARY_CHART_ID_".$i],
        "COUNT" => $arParams["SECONDARY_CHARTS_VAL_COUNT"],
        "CANVAS" => $arParams["SECONDARY_CHART_CANVAS_".$i],
        "COLOR" => $arParams["SECONDARY_CHART_COLOR_".$i],
    );
}
$arSecondaryCharts = ($arParams["SHOW_SECONDARY_CHARTS"] == "Y") ?
    $arDataSecondaryCharts
    : array();
$arResult = array_merge(
    array(
        "SEF_MODE" => $arParams["SEF_MODE"],
        "SEF_FOLDER" => $arParams["SEF_FOLDER"],
        "VARIABLES" => $arVariables,
        "ALIASES" => $arParams["SEF_MODE"] == "Y" ? array() : $arVariableAliases,
        "SET_TITLE" => $arParams["SET_TITLE"],
        "CACHE_TYPE" => $arParams["CACHE_TYPE"],
        "CACHE_TIME" => $arParams["CACHE_TIME"],
       // "CACHE_TIME_LONG" => $arParams["CACHE_TIME_LONG"],
        "IBLOCK_TYPE" =>$arParams["IBLOCK_TYPE"],
        "IBLOCK_ID" =>$arParams["IBLOCK_ID"],
        "SHOW_MAIN_CHART" => $arParams["SHOW_MAIN_CHART"],
        "SHOW_SECONDARY_CHARTS" => $arParams["SHOW_SECONDARY_CHARTS"],
        "MAIN_CHART" => $arMainChart,
        "SECONDARY_CHARTS" => $arSecondaryCharts,
        "CHART_PROP" => array("MAX"=>$arParams["CHART_MAX_VAL_PROP"], "MIN"=>$arParams["CHART_MIN_VAL_PROP"], "TYPE"=>$arParams["CHART_TYPE_PROP"]),
        "CHART_VAL_PROP" => $arParams["CHART_VAL_PROP"]
    )
);

$this->IncludeComponentTemplate($componentPage);

