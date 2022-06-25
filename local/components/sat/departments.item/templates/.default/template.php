<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
$this->setFrameMode(true);
?>
<div class="col-xs-12 col-sm-6 col-md-3 hidden-mobile">
	<div class="border-block">
		<a href="<?=SITE_DIR . $arResult["LINK"]["MAP"]?>" class="header clearfix">
		<div class="img-wrap">
			<img src="<?=SITE_TEMPLATE_PATH?>/icons/icon-gray1.png" alt="">
		</div>
		<span><?echo GetMessage("HEADER_DEPARTAMENTS");?></span></a>
		<div class="map-home content-inner" id="<?=$arParams["MAP_ID"]?>">
		</div>
		<div class="item-content" id="department-content">
		</div>
	</div>
</div>
<?if (is_array($arResult['ELEMENT']) && count($arResult['ELEMENT'])>0):?>
<script type="text/javascript">
	BX.message({
		element: <?echo CUtil::PhpToJsObject($arResult["ELEMENT"])?>,
		image: "<?echo SITE_TEMPLATE_PATH . '/img/marker.png'?>",
		weekdays: "<?echo getMessage('WEEKDAYS')?>",
		monday: "<?echo getMessage('MONDAY')?>",
		tuesday: "<?echo getMessage('TUESDAY')?>",
		wednesday: "<?echo getMessage('WEDNESDAY')?>",
		thursday: "<?echo getMessage('THURSDAY')?>",
		friday: "<?echo getMessage('FRIDAY')?>",
		saturday: "<?echo getMessage('SATURDAY')?>",
	});
</script>
<?endif;?>