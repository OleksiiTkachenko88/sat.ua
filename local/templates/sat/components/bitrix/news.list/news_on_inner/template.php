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
<section class="panel panel--news">
    <header class="panel__heading">
        <div class="panel__heading-primary-content">
            <h3 class="panel__title"><?=$arResult["NAME"]?></h3>
        </div>
    </header>

    <div class="panel__item-list panel__item-list--col-2">
    	<?foreach($arResult["ITEMS"] as $arItem) { ?>
	        <div class="panel__item panel__item--hoverable">
	            <img src="<?=$arResult["DETAIL_PICTURE"]["SRC"]?>" alt="" width="300" height="170" class="panel__item-image">
	            <small class="panel__item-sup-title"><?echo $arItem["DISPLAY_ACTIVE_FROM"]?></small>
	            <strong class="panel__item-title"><?=$arItem['NAME']?></strong>
	
	            <div class="panel__item-text panel__item-text--line-2">
	                <?echo $arItem["PREVIEW_TEXT"];?>
	            </div>
	
	            <div class="panel__item-footer">
					<span class="btn btn--icon">
						<i class="icon panel__item-more-icon"></i>
					</span>
	            </div>
	            <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="panel__item-cover-link"></a>
	        </div>
        <? } ?>
    </div>
</section>