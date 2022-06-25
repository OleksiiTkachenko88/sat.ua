<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
use Bitrix\Main\Localization\Loc;
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
// p($arResult);
?>
<script>

var departmens = [];

<?foreach($arResult['ITEMS'] as $arItem):?>
    
    <?if($arItem["PROPERTIES"]["LATITUDE"]["VALUE"]!=0 && $arItem["PROPERTIES"]["LONGITUDE"]["VALUE"]!=0):?>
        departmens.push({
            id          : "<?=$arItem["ID"]?>",
            description : "<?=$arItem["NAME"]?>",
            address     : "<?=$arItem["PROPERTIES"]["ADDRESS"]["VALUE"]?>",
            phone       : "<?=$arItem["PROPERTIES"]["PHONE"]["VALUE"]?>",
            ref         : "<?=$arItem["PROPERTIES"]["REF"]["VALUE"]?>",
            number      : "<?=$arItem["PROPERTIES"]["NUMBER"]["VALUE"]?>",
            cityref     : "<?=$arItem["PROPERTIES"]["CITYREF"]["VALUE"]?>",
            latitude    : "<?=$arItem["PROPERTIES"]["LATITUDE"]["VALUE"]?>",
            longitude   : "<?=$arItem["PROPERTIES"]["LONGITUDE"]["VALUE"]?>",
        });
    <?endif;?>
    
<?endforeach;?>
var departmens_json = JSON.stringify(departmens);

</script>



<div class="page__map-container collapse ">
	<div class="page__map-overlay" id="departments_map" style="width: 100%; height: 100%;"></div>
	<div class="page__map-overlay page__map-overlay--bottom text-xs-center">
		<span id="butt_up" class="btn btn--more">
			<span class="btn__text">Разгорнути карту</span>
			<span class="btn__text">Згорнути карту</span>
			<i class="icon icon--arrow-down-grey"></i>
		</span>
	</div>
</div>


<?/*<div class="page__map-container collapse">
	<div class="page__map-overlay" id="departments_map" style="width: 100%; height: 100%;"></div>
	<div class="page__map-overlay page__map-overlay--bottom text-xs-center">
		<span id="butt_up" class="btn btn--more">
			<span class="btn__text">Разгорнути карту</span>
			<span class="btn__text">Згорнути карту</span>
			<i class="icon icon--arrow-down-grey"></i>
		</span>
	</div>
</div>*/?>
