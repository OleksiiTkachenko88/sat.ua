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

$this->setFrameMode(true);
?>
<div class="border-block">
    <a href="<?= SITE_DIR . "indicators/" ?>" class="header clearfix charts-header">
        <div class="img-wrap">
            <img class="lazyload" data-src="<?= $templateFolder . "/images/icon.png" ?>" alt="">
        </div>
        <span><?=getMessage("UF_INDICATORS"); ?></span>
    </a>
        <div id="charts-list" class="content-inner charts-list">
            <? $i = 0;
            $count = count($arResult["ITEMS"]);

            foreach ($arResult["ITEMS"] as $chartItem):
                $i++;
                ?>
                <div class="chart-item">

                    <div class="title text-uppercase"><?= $chartItem["NAME"] ?></div>
                    <canvas id="<?= $chartItem["ID"] . "_" . $i ?>" class="chart-canvas"></canvas>

                </div>
                <script>
                    BX.ready(function () {
                        window.obj = new BX.SAT.Indicators.Chart(<?=$count?>,<?=CUtil::PhpToJSObject($chartItem)?>, <?=CUtil::PhpToJSObject($arResult["ITEMS_ELEMENTS"][$i - 1])?>, <?=$i?>);
                    });
                </script>
            <? endforeach; ?>
        </div>
    </div>

