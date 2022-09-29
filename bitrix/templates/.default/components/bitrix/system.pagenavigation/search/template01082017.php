<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();




$strNavQueryString = ($arResult["NavQueryString"] != "" ? $arResult["NavQueryString"]."&amp;" : "");

$strNavQueryStringFull = ($arResult["NavQueryString"] != "" ? "?".$arResult["NavQueryString"] : "");



if($arResult["NavPageCount"] > 1)
{
?>

<?if ($arResult["NavPageNomer"] > 1):?>
                    <a class="button-more f_left" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=($arResult["NavPageNomer"]-1)?>"><span class="arrow"><img
                            src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black-reverse.png" alt=""></span><span class="text"><?=GetMessage("nav_prev")?></span></a>
<?endif;?>

<?if($arResult["NavPageNomer"] < $arResult["NavPageCount"]):?>
                    <a class="button-more f_right" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=($arResult["NavPageNomer"]+1)?>"><span class="text"><?=GetMessage("nav_next")?></span><span class="arrow"><img
                            src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png" alt=""></span></a>
<?endif;?>

<?}?>
