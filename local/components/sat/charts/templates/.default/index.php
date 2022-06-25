<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */

?>
<div class="container">

    <div class="row">
        <div class="content-wrap" style="margin: -16px">
            <div class="col-xs-12">
                <div class="item header text-uppercase">
                    <h1><?=getMessage("UF_CHART_PAGE_HEADER")?></h1>
                </div>
            </div>

            <? if ($arResult["SHOW_MAIN_CHART"] == "Y"): ?>
                <div class="col-xs-12">
                    <? $APPLICATION->IncludeComponent(
                        "sat:charts.item",
                        "",
                        array(
                            "IBLOCK_TYPE" => $arResult["IBLOCK_TYPE"],
                            "IBLOCK_ID" => $arResult["IBLOCK_ID"],
                            "SECTION_ID" => $arResult["MAIN_CHART"]["ID"],
                            "IS_MAIN" => $arResult["SHOW_MAIN_CHART"],
                            "CANVAS" => $arResult["MAIN_CHART"]["CANVAS"],
                            "COUNT" => $arResult["MAIN_CHART"]["COUNT"],
                            "CACHE_TYPE" => $arResult["CACHE_TYPE"],
                            "CACHE_TIME" => $arResult["CACHE_TIME"],
                            "VALUE_PROP" => $arResult["CHART_VAL_PROP"],
                            "MIN_PROP" => $arResult["CHART_PROP"]["MIN"],
                            "MAX_PROP" => $arResult["CHART_PROP"]["MAX"],
                            "TYPE_PROP" => $arResult["CHART_PROP"]["TYPE"],
                            "COLOR" => $arResult["MAIN_CHART"]["COLOR"]

                        ),
                        $component
                    );
                    ?>
                </div>
            <? endif; ?>
            <? if ($arResult["SHOW_SECONDARY_CHARTS"] == "Y" && !empty($arResult["SECONDARY_CHARTS"])):

                ?>
                <? foreach ($arResult["SECONDARY_CHARTS"] as $key => $val):
                ?>
                <div class="col-xs-12 col-md-6">
                    <? $APPLICATION->IncludeComponent(
                        "sat:charts.item",
                        "",
                        array(
                            "IBLOCK_TYPE" => $arResult["IBLOCK_TYPE"],
                            "IBLOCK_ID" => $arResult["IBLOCK_ID"],
                            "SECTION_ID" => $val["ID"],
                            "CANVAS" => $val["CANVAS"],
                            "COUNT" => $val["COUNT"],
                            "COLOR" => $val["COLOR"],
                            "CACHE_TYPE" => $arResult["CACHE_TYPE"],
                            "CACHE_TIME" => $arResult["CACHE_TIME"],
                            "VALUE_PROP" => $arResult["CHART_VAL_PROP"],
                            "MIN_PROP" => $arResult["CHART_PROP"]["MIN"],
                            "MAX_PROP" => $arResult["CHART_PROP"]["MAX"],
                            "TYPE_PROP" => $arResult["CHART_PROP"]["TYPE"],

                        ),
                        $component
                    );
                    ?>

                </div>
            <? endforeach; ?>
            <? endif; ?>

        </div>
    </div>
</div>