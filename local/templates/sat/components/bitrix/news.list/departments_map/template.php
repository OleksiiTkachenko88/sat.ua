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

<div id="map-departm" class="page__map-container">
	<div class="page__map-overlay" id="departments_map" style="width: 100%; hheight: 100%;"></div>
	
	<? if($arParams['DEPARTMENTS_MAP'] == 'Y') { ?>
		<div class="page__map-overlay page__map-overlay--top">
			<div class="container-fluid">
				<div class="table__container table__container--department">
					<table id="table-cont" class="table table-hover table--department table--accent">
						<thead>
							<tr>
								<th colspan="4" class="p-a-0">
									<div class="table__col-1">
										<i class="icon table__icon table__icon--map"></i> <?=GetMessage('DEPARTMENTS_OUR')?></div>
									<div class="table__col-2">
										<a href="<?=SITE_DIR?>/departments/" class="btn table__btn"><?=GetMessage('DEPARTMENTS_LIST')?></a>
									</div>
									<div class="table__col-3">
										<span class="btn table__btn active"><?=GetMessage('DEPARTMENTS_MAP')?></span>
									</div>
								</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	<? } ?>
</div>
