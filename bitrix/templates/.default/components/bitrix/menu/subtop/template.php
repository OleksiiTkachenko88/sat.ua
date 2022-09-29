<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?if (!empty($arResult)):?>
<div class="clearfix sub-header">
	<nav class="sub-header-nav">

	<?
	$previousLevel = 0;

	foreach($arResult as $arItem):?>

		<?if ($previousLevel && $arItem["DEPTH_LEVEL"] < $previousLevel):?>
			<?=str_repeat("</div></div>", ($previousLevel - $arItem["DEPTH_LEVEL"]));?>
		<?endif?>

		<?if ($arItem["IS_PARENT"]):?>
			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<div class="dropdown">
					<a
            id="dropdownMenuLink"
            class="main-item dropdown-toggle"
            href="<?= strpos($arItem["LINK"], 'partners') ? 'https://franchise.sat.ua/' : $arItem["LINK"] ?>"
            <?= strpos($arItem["LINK"], 'international') || strpos($arItem["LINK"], 'partners') ? 'style="pointer-events: auto;"' : '' ?>
          >
            <?=$arItem["TEXT"]?>
          </a>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
			<?endif?>
		<?else:?>
			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<a href="<?=$arItem["LINK"]?>" class="main-item"><?=$arItem["TEXT"]?></a>
			<?else:?>
				<a class="dropdown-item" href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a>
			<?endif?>
		<?endif?>

	<?$previousLevel = $arItem["DEPTH_LEVEL"];?>

	<?endforeach?>

	<?if ($previousLevel > 1)://close last item tags?>
		<?=str_repeat("</div></div>", ($previousLevel-1) );?>
	<?endif?>

	</nav>
</div>
<?endif?>



