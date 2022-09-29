<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?if (!empty($arResult)):?>
<nav class="mobile-nav">
    <a class="close-nav close-button">
        <div>
            <i class="rotate-left-i"></i>
            <i class="hider-i"></i>
            <i class="rotate-right-i"></i>
        </div>
    </a>
    <div class="mobile-nav-inner navbar-nav">
	<?
	$previousLevel = 0;

	foreach($arResult as $arItem):?>

		<?if ($previousLevel && $arItem["DEPTH_LEVEL"] < $previousLevel):?>
			<?=str_repeat("</div></div>", ($previousLevel - $arItem["DEPTH_LEVEL"]));?>
		<?endif?>
	
		<?if ($arItem["IS_PARENT"]):?>
			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<div class="dropdown">
					<a href="<?=$arItem["LINK"]?>" class="nav-title dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false"><?=$arItem["TEXT"]?>
						<span class="caret"></span>
					</a>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
			<?endif?>
		<?else:?>
			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<a href="<?=$arItem["LINK"]?>" class="nav-title <?=($arItem["SELECTED"])?'selected':''?>"><?=$arItem["TEXT"]?></a>
			<?else:?>
				<a href="<?=$arItem["LINK"]?>" class="nav-title sub-title dropdown-item"><?=$arItem["TEXT"]?></a>
			<?endif?>
		<?endif?>

	<?$previousLevel = $arItem["DEPTH_LEVEL"];?>

	<?endforeach?>
	
	<?if ($previousLevel > 1)://close last item tags?>
		<?=str_repeat("</div></div>", ($previousLevel-1) );?>
	<?endif?>
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