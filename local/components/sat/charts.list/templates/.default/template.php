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
        <div class="content-inner">
            <div id="carousel-partners-news" class="carousel slide" data-ride="carousel" data-interval='8000'>
                <div class="carousel-inner" role="listbox">
                    <?$randomSlideNumber = random_int(0, count($arResult["ITEMS"])-1);?>
                    <? foreach ($arResult["ITEMS"] as $key => $arItem): ?>
                        <div class="item <?= ($key == $randomSlideNumber) ? "active" : "" ?>">
                            <div class="item-banner lazyload" data-src="<?= $arItem["PREVIEW_PICTURE"]["SRC"] ?>">
                            </div>
                            <div class="item-description">
                                <div class="text-uppercase date"><?= $arItem["TIMESTAMP_X"] ?></div>
                                <div class="text-uppercase title">
                                    <?= $arItem["NAME"] ?>
                                </div>
                                <div class="text">
                                    <?= $arItem["PREVIEW_TEXT"] ?>
                                </div>
                            </div>
                            <div class="navigation">
                                <a class="more-content text-uppercase"
                                   href="<?= $arItem["DETAIL_PAGE_URL"] ?>"><?= getMessage("DETAIL_TEXT") ?></a>
                            </div>
                        </div>
                    <? endforeach; ?>
                    <div class="btn-nav btn-prev"></div>
                    <div class="btn-nav btn-next"></div>
                </div>
            </div>
        </div>
    </div>
