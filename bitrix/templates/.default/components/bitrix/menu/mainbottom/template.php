<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<div class="row-map">

<?if (!empty($arResult)):?>
<?
$cnt = count($arResult);
?>
<?
$previousLevel = 0;
$i = 1;
foreach($arResult as $arItem):?>

	<?if ($previousLevel && $arItem["DEPTH_LEVEL"] <= $previousLevel):?>
		<?/*if (($arItem["DEPTH_LEVEL"] == 1 && $previousLevel == 1) || ($arItem["DEPTH_LEVEL"] < $previousLevel)):*/?>
		<?if ($arItem["DEPTH_LEVEL"] == 1):?>
			</div>
<!-- 1 -->
		<?else:?>
			<?=str_repeat("</ul></li>", ($previousLevel - $arItem["DEPTH_LEVEL"]));?>
		<?endif?>
	<?endif?>

	<?if ($arItem["IS_PARENT"]):?>
		<?if ($arItem["DEPTH_LEVEL"] == 1):?>
		    <div class="footer-nav-item">
                <div class="nav-title"><?=$arItem["TEXT"]?></div>
                <ul>
		<?else:?>
			<li<?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>><a href="<?=$arItem["LINK"]?>" class="parent"><?=$arItem["TEXT"]?></a>
				<ul>
		<?endif?>
	<?else:?>
			<?if ($arItem["DEPTH_LEVEL"] == 1):?>
				<div class="footer-nav-item">
					<div class="nav-title"><?=$arItem["TEXT"]?></div>
			<?else:?>
				<li<?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>><a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a></li>
			<?endif?>
	<?endif?>

	<?$previousLevel = $arItem["DEPTH_LEVEL"];?>
	
<?$i++;?>

<?endforeach?>

<?if ($previousLevel > 1)://close last item tags?>
	<?=str_repeat("</ul></li>", ($previousLevel-1) );?>
<?endif?>


<?endif?>
</div></div> 
<!-- 2 -->