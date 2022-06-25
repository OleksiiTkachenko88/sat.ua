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

if(!$arResult["NavShowAlways"])
{
	if ($arResult["NavRecordCount"] == 0 || ($arResult["NavPageCount"] == 1 && $arResult["NavShowAll"] == false))
		return;
}
$strNavQueryString = ($arResult["NavQueryString"] != "" ? $arResult["NavQueryString"]."&amp;" : "");
$strNavQueryStringFull = ($arResult["NavQueryString"] != "" ? "?".$arResult["NavQueryString"] : "");
?>
<?if ($arResult["NavPageNomer"] < $arResult["NavPageCount"]):?>
    <div class="table__footer-left">
		<?if ($arResult["NavPageCount"] == ($arResult["NavPageNomer"]+1) ):?>
			<a class="btn btn--prev btn--muted" href="<?=$arResult["sUrlPath"]?><?=$strNavQueryStringFull?>">
				<?//=GetMessage("nav_prev")?>
				<span class="hidden-md-down">Попередні <?=$arParams["NAV_RESULT"]->SIZEN?></span>
                <i class="icon icon--arrow-left-light-grey btn__icon--outline"></i>
            </a>
		<?else:?>
			<a class="btn btn--prev btn--muted" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=($arResult["NavPageNomer"]+1)?>">
                <span class="hidden-md-down">Попередні <?=$arParams["NAV_RESULT"]->SIZEN?></span>
                <i class="icon icon--arrow-left-light-grey btn__icon--outline"></i>
				<?//=GetMessage("nav_prev")?>
            </a>
		<?endif?>
    </div>	
<?endif?>
<?if ($arResult["bShowAll"]):?>
<div class="table__footer-center">
	<?if ($arResult["NavShowAll"]):?>
		<a class="btn btn--more btn--more--alt" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>SHOWALL_<?=$arResult["NavNum"]?>=0" rel="nofollow">
    		<?//=GetMessage("nav_paged")?>
    		Усі відділення
    		<i class="icon icon--arrow-down-grey"></i>
        </a>
	<?else:?>
		<a class="btn btn--more btn--more--alt" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>SHOWALL_<?=$arResult["NavNum"]?>=1" rel="nofollow">
    		<?//=GetMessage("nav_all")?>
    		Усі відділення
    		<i class="icon icon--arrow-down-grey"></i>
        </a>
	<?endif?>
</div>
<?endif?>
<?if ($arResult["NavPageNomer"] > 1):?>
    <div class="table__footer-right">
        <a class="btn btn--next btn--muted" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=($arResult["NavPageNomer"]-1)?>">
			<span class="hidden-md-down">Наступні <?=$arParams["NAV_RESULT"]->SIZEN?></span>
			<i class="icon icon--arrow-right-light-grey btn__icon--outline"></i>
		</a>
	</div>
<?endif?>
