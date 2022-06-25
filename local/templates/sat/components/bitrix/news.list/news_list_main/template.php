<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
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
<div class="col-xs-12 col-lg-3">
	<section id="panel_news" class="panel panel--news">
		<header class="panel__heading">
			<div class="panel__heading-primary-content">
				<i class="icon panel__icon"></i>
				<h3 class="panel__title"><?=$arResult["NAME"]?></h3>
			</div>
		</header>
		<ul class="panel__item-list">
    		<?foreach($arResult["ITEMS"] as $arItem):?>
                <li class="panel__item panel__item--hoverable">
                    <?if($arParams["DISPLAY_DATE"]!="N" && $arItem["DISPLAY_ACTIVE_FROM"]):?>
            			<small class="panel__item-sup-title"><?echo $arItem["DISPLAY_ACTIVE_FROM"]?></small>
            		<?endif?>
                    <strong class="panel__item-title"><?=TruncateText($arItem["NAME"],27)?></strong>
                    <?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
            			<div class="panel__item-text panel__item-text--line-2"><?echo $arItem["PREVIEW_TEXT"];?></div>
            		<?endif;?>
                    <div class="panel__item-footer">
                        <span class="btn btn--icon">
                            <i class="icon panel__item-more-icon"></i>
                        </span>
                    </div>
                    <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="panel__item-cover-link"></a>
                </li>
            <?endforeach;?>
        </ul>
    </section>
</div>