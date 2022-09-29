<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<nav class="mobile-nav">
    <a class="close-nav close-button">
        <div>
            <i class="rotate-left-i"></i>
            <i class="hider-i"></i>
            <i class="rotate-right-i"></i>
        </div>
    </a>
    <div class="mobile-nav-inner">
<?if (!empty($arResult)):?>

<?
foreach($arResult as $arItem):
	if($arParams["MAX_LEVEL"] == 1 && $arItem["DEPTH_LEVEL"] > 1) 
		continue;
?>
	<?if($arItem["SELECTED"]):?>
		<a href="<?=$arItem["LINK"]?>" class="nav-title selected"><?=$arItem["TEXT"]?></a>
	<?else:?>
		<a href="<?=$arItem["LINK"]?>" class="nav-title"><?=$arItem["TEXT"]?></a>
	<?endif?>
	
<?endforeach?>
<!--
        <div class="nav-buttons">
            <a href=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png" alt=""></a>
            <a href="#" class="bx24_form"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png" alt=""></a>
			<a href="#" class="bx24_chat"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/chat2.png" alt=""></a>
        </div>
-->
    </div>
</nav>
<?endif?>