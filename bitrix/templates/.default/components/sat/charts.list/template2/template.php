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
    <a href="<?= SITE_DIR . "contacts/individual/" ?>" class="header clearfix charts-header">
        <div class="img-wrap">
            <img class="lazyload" data-src="<?= $templateFolder . "/images/icon.png" ?>" alt="">
        </div>
        <span><?=getMessage("UF_INDICATORS"); ?></span>
    </a>
        <div class="content-inner">
            <div id="carousel-partners-news" class="carousel slide" data-ride="carousel" data-interval='8000'>
                <div class="carousel-inner" role="listbox">
                         <div class="item <?= ($key == $randomSlideNumber) ? "active" : "" ?>">
                            <div class="item-banner lazyload" data-src="<?= $templateFolder . "/images/individual_usl_" ?><?= $page_lang === 'ru' ? 'ru' : 'ua' ?>.jpg" alt="">
                            </div>
                            <div class="item-description">
                                <div class="text-uppercase date"><?= $arItem["TIMESTAMP_X"] ?></div>
                                <div class="text-uppercase title">

                                </div>
 <div class="text">
<?= getMessage("T1") ?>

<div class="text">
<?= getMessage("T2") ?>

<div class="text">
<?= getMessage("T3") ?>

<div class="text">
<?= getMessage("T4") ?>
</div>
</div>
</div>
</div>

                            </div>
                            <div class="navigation">
                                <a class="more-content text-uppercase"
                                   href="<?= SITE_DIR . "contacts/individual/" ?>"><?= getMessage("T5") ?></a>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
