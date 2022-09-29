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
<div class="news-list sub-pages-news news-row">
	<div class="news-item clearfix">
<?p($_GET);?>
<?p($arResult);?>
<?foreach($arResult["ITEMS"] as $arItem):?>
		<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="inner-new">
			<div class="news-item-text">
				<div class="title cut-text">
					<?echo $arItem["NAME"]?>
				</div>
				<div class="text-new cut-text">
					<?echo $arItem["PREVIEW_TEXT"];?>
				</div>
			</div>
		</a>
<?endforeach;?>
	</div>
</div>