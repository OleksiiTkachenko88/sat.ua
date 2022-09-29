<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?if (!empty($arResult)) {?>
<nav class="header-nav">

<?
$i = 0;
foreach($arResult as $arItem) {
	$i++;
	if($arParams["MAX_LEVEL"] == 1 && $arItem["DEPTH_LEVEL"] > 1) 
		continue;
	if($arItem["SELECTED"]) {?>
		<?switch ($i){
			case '2':
				?><a class="selected track-link"><?=$arItem["TEXT"]?></a><?
				break;
			default:
				?><a href="<?=$arItem["LINK"]?>" class="selected"><?=$arItem["TEXT"]?></a><?
				break;
		}?>
	<?} else {?>
		<?switch ($i){
			case '2':
				?><a class="track-link"><?=$arItem["TEXT"]?></a><?
				break;
			default:
				?><a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a><?
				break;
		}?>
	<?}?>
	
<?}?>

</nav>
<?}?>