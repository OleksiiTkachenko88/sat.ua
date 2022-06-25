<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

use Bitrix\Main\Loader;

if (!isset($arParams["CACHE_TIME"]))
    $arParams["CACHE_TIME"] = 36000000;

$arParams["IBLOCK_TYPE"] = trim($arParams["IBLOCK_TYPE"]);
$arParams["IBLOCK_ID"] = trim($arParams["IBLOCK_ID"]);
$arParams["SECTION_ID"] = trim($arParams["SECTION_ID"]);
$arParams["COUNT"] = intval($arParams["COUNT"]);
$arParams["CANVAS"] = trim($arParams["CANVAS"]);
$arParams["MIN_PROP"] = trim($arParams["MIN_PROP"]);
$arParams["MAX_PROP"] = trim($arParams["MAX_PROP"]);
$arParams["TYPE_PROP"] = trim($arParams["TYPE_PROP"]);
$arParams["COLOR"] = trim($arParams["COLOR"]);

if ($this->startResultCache()) {
    if (!Loader::includeModule('iblock')) {
        $this->abortResultCache();
        ShowError("Инфоблоки не работают");
        return;
    }
    if (is_numeric($arParams["IBLOCK_ID"])) {
        $rsIBlock = CIBlock::GetList(array(), array(
            "ACTIVE" => "Y",
            "ID" => $arParams["IBLOCK_ID"],
        ))->Fetch();

        $arResult["IBLOCK_ID"] = $rsIBlock["ID"];
    } else {
        $this->abortResultCache();
        ShowError("Не найден инфоблок");
        return;
    }

    if (is_numeric($arParams["SECTION_ID"])) {

        $arFilter = array(
            "ACTIVE" => "Y",
            "IBLOCK_ID" => $arResult["IBLOCK_ID"],
            "GLOBAL_ACTIVE" => "Y",
            "ID" => $arParams["SECTION_ID"],
        );

        $arSelect = array_merge(
            array(
                "ID",
                "NAME",
                "PICTURE",
                "DESCRIPTION",
            ),
            array(
                $arParams["TYPE_PROP"],
                $arParams["MAX_PROP"],
                $arParams["MIN_PROP"],
            )
        );
        $arSection = CIBlockSection::GetList(
            array(), $arFilter, false, $arSelect
        )->Fetch();


        $typeProp = CUserFieldEnum::GetList(
            array(),
            array("USER_FIELD_NAME" => $arParams["TYPE_PROP"], "ID" => $arSection[$arParams["TYPE_PROP"]])
        )->Fetch();

        $arResult["CHART"] = array(
            "ID" => $arSection["ID"],
            "NAME" => $arSection["NAME"],
            "DESCRIPTION" => $arSection["DESCRIPTION"],
            "PICTURE" => CFile::GetPath($arSection["PICTURE"]),
            "CANVAS" => $arParams["CANVAS"],
            "PROP" => array(
                "MIN" => $arSection[$arParams["MIN_PROP"]],
                "MAX" => $arSection[$arParams["MAX_PROP"]],
                "TYPE" => empty($typeProp) ? "line" : strtolower(trim($typeProp["XML_ID"]))
            )
        );

        $count = ($arResult["CHART"]["PROP"]["TYPE"] == "pie") ? 1 : $arParams["COUNT"];


        $arSort = array(
            "ACTIVE_TO" => "DESC"
        );

        $arFilter = array(
            "ACTIVE" => "Y",
            "IBLOCK_ID" => $arResult["IBLOCK_ID"],
            "SECTION_ID" => $arResult["CHART"]["ID"],
        );

        $arSelect = array_merge(
            array(
                "ACTIVE_FROM",
                "ACTIVE_TO"
            ),
            array("PROPERTY_" . $arParams["VALUE_PROP"])
        );

        $arMounts = array("FULL" => array(), "SHORT" => array());

        for ($i = 1; $i <= 12; $i++) {
            $date = "01:" . $i . ":1000";
            $arMounts["FULL"][] = FormatDate("f", MakeTimeStamp($date));
            $arMounts["SHORT"][] = FormatDate("M", MakeTimeStamp($date));
        }


        $year = false;
        $fromMonth = false;
        $toMonth = false;
        $dbElements = CIBlockElement::GetList($arSort, $arFilter, false, array("nTopCount" => $count), $arSelect);
        while ($arElements = $dbElements->Fetch()) {
            if (!$year) {
                $year = FormatDate("Y", MakeTimeStamp($arElements["ACTIVE_TO"]));
            }
            if (!$toMonth) {
                $toMonth = FormatDate("f", MakeTimeStamp($arElements["ACTIVE_TO"]));
            }
            $fromMonth = FormatDate("f", MakeTimeStamp($arElements["ACTIVE_FROM"]));


            $arResult["CHART"]["LABELS"]["Y"][] = $arElements["PROPERTY_" . $arParams["VALUE_PROP"] . "_VALUE"];
            $arResult["CHART"]["LABELS"]["X"][] = FormatDate("M", MakeTimeStamp($arElements["ACTIVE_TO"]));
            $arResult["CHART"]["LABELS"]["FULL"][] = FormatDate("f", MakeTimeStamp($arElements["ACTIVE_TO"]));
            $arResult["CHART"]["DISPLAY"][] = "Y";
            $arResult["CHART"]["COLOR"][] = $arParams["COLOR"];
            $arResult["CHART"]["LABELS"]["INT"][] = $arElements["PROPERTY_" . $arParams["VALUE_PROP"] . "_VALUE"];
        }
        $arResult["CHART"]["PERIOD"] = $fromMonth . " - " . $toMonth . " " . $year;

        if ($arResult["CHART"]["PROP"]["TYPE"] == "pie") {

            $secondPieValue = $arResult["CHART"]["PROP"]["MAX"] - $arResult["CHART"]["LABELS"]["Y"][0];

            array_unshift($arResult["CHART"]["LABELS"]["Y"], $secondPieValue);
            array_unshift($arResult["CHART"]["LABELS"]["X"], " ");
            array_unshift($arResult["CHART"]["COLOR"], "#F2F2F2");
            array_unshift($arResult["CHART"]["DISPLAY"], "N");

        }

        if ($arParams["IS_MAIN"] == "Y" && $arResult["CHART"]["PROP"]["TYPE"] !== "pie") {
            $arResult["CHART"]["IS_MAIN"] = "Y";
            $arResult["CHART"]["EMPTY_BEFORE_AFTER"] = $elementsCountToAddBeforeAndAfter = intval(count($arResult["CHART"]["LABELS"]["Y"]) / 2);
            $valDef = 0;
            foreach ($arResult["CHART"]["LABELS"]["Y"] as $key => $val) {
                $valDef += $val;
            }
            $valDef = round(($valDef) / count($arResult["CHART"]["LABELS"]["Y"]), PHP_ROUND_HALF_DOWN);


            $key_min = array_search($arResult["CHART"]["LABELS"]["X"][0], $arMounts["SHORT"]);
            $key_max = array_search($arResult["CHART"]["LABELS"]["X"][count($arResult["CHART"]["LABELS"]["X"]) - 1], $arMounts["SHORT"]);


            for ($i = $key_min + 1; $i <= $key_min + $elementsCountToAddBeforeAndAfter; $i++) {
                $n = $i;
                if ($i > 11)
                    $n = $i - 12;

                array_unshift($arResult["CHART"]["LABELS"]["X"], $arMounts["SHORT"][$n]);
                array_unshift($arResult["CHART"]["LABELS"]["Y"], $valDef);
                array_unshift($arResult["CHART"]["LABELS"]["FULL"], $arMounts["FULL"][$n]);
                array_unshift($arResult["CHART"]["DISPLAY"], "N");
                array_unshift($arResult["CHART"]["COLOR"], "#e6edfb");
                array_unshift($arResult["CHART"]["LABELS"]["INT"], "");
            }

            for ($i = $key_max - 1; $i >= $key_max - $elementsCountToAddBeforeAndAfter; $i--) {
                $n = $i;
                if ($i % 12 == 0)
                    $l++;

                if ($i < 0)
                    $n = 12 + $i;


                array_push($arResult["CHART"]["LABELS"]["X"], $arMounts["SHORT"][$n]);
                array_push($arResult["CHART"]["LABELS"]["Y"], $valDef);
                array_push($arResult["CHART"]["LABELS"]["FULL"], $arMounts["FULL"][$n]);
                array_push($arResult["CHART"]["DISPLAY"], "N");
                array_push($arResult["CHART"]["COLOR"], "#e6edfb");
                array_push($arResult["CHART"]["LABELS"]["INT"], "");
            }

        }

        foreach ($arResult["CHART"]["LABELS"]["Y"] as $key => $val) {

            $arResult["CHART"]["DATA"][] = array(
                "Y" => $val,
                "X" => $arResult["CHART"]["LABELS"]["X"][$key],
                "INT" => $arResult["CHART"]["LABELS"]["INT"][$key],
                "DISPLAY" => $arResult["CHART"]["DISPLAY"][$key],
                "COLOR" => $arResult["CHART"]["COLOR"][$key],
            );
        }

        $arResult["CHART"]["DATA"] = array_reverse($arResult["CHART"]["DATA"]);
        $arResult["CHART"]["LABELS"]["X"] = array_reverse($arResult["CHART"]["LABELS"]["X"]);
        $arResult["CHART"]["LABELS"]["Y"] = array_reverse($arResult["CHART"]["LABELS"]["Y"]);
        $arResult["CHART"]["LABELS"]["FULL"] = array_reverse($arResult["CHART"]["LABELS"]["FULL"]);
        $arResult["CHART"]["LABELS"]["INT"] = array_reverse($arResult["CHART"]["LABELS"]["INT"]);
        $arResult["CHART"]["DISPLAY"] = array_reverse($arResult["CHART"]["DISPLAY"]);
        $arResult["CHART"]["COLOR"] = array_reverse($arResult["CHART"]["COLOR"]);

    } else {
        $this->abortResultCache();
        ShowError("Не найдена секция");
        return;
    }


    $this->IncludeComponentTemplate();

    $this->setResultCacheKeys(array(
        "IBLOCK_ID",
        "CHART",
    ));

}

CJSCore::Init("chartjs");











