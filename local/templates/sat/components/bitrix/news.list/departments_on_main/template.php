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
// p($arResult);
?>
<script>
var departmens = [];

<?foreach($arResult['ITEMS'] as $arItem):?>
    
    <?if($arItem["PROPERTIES"]["LATITUDE"]["VALUE"]!=0 && $arItem["PROPERTIES"]["LONGITUDE"]["VALUE"]!=0):?>
        departmens.push({
            id          : "<?=$arItem["ID"]?>",
            name        : "<?=$arItem["NAME"]?>",
            description : "<?=$arItem["PROPERTIES"]["ADDRESS"]["VALUE"]?>",
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

<div class="col-xs-12 col-lg-3">
	<section id="panel_map" class="panel panel--map hidden-md-down">
		<header class="panel__heading">
			<div class="panel__heading-primary-content">
				<i class="icon panel__icon"></i>
				<h3 class="panel__title"><?=GetMessage("DEPARTMENTS");?></h3>
			</div>
		</header>
		<div class="panel__map" id="departments_map" style="height:600px;"></div>
		<?/*
<footer class="panel__footer">
			<div class="panel__footer-primary-content">Ваше відділення&nbsp;
				<span class="num"><?// № 121 ?>&nbsp;</span>
			</div>
			<div class="panel__footer-secondary-content">
				<a href="" class="btn btn--accent btn--outline btn--icon">
					<i class="icon icon--arrow-right-light-grey"></i>
				</a>
			</div>
		</footer>
*/?>
	</section>
</div>


<?/*
<div class="table__container table__container--department">
	<div class="table-responsive hidden-md-down">
		<table cellpadding="0" cellspacing="0" class="table table-hover table--department m-b-0">
			<thead>
				<tr>
					<th colspan="4" class="p-a-0">
						<div class="table__col-1">
							<i class="icon table__icon table__icon--map"></i> Наші видділення</div>
						<div class="table__col-2">
							<span class="btn table__btn active">Списком</span>
						</div>
						<div class="table__col-3">
							<a href="#" class="btn table__btn">На карті</a>
						</div>
					</th>
				</tr>
				<tr>
					<th>Місто
						<i class="table__sort table__sort-down"></i>
					</th>
					<th>Адреса</th>
					<th>Номер
						<i class="table__sort table__sort-down"></i>
					</th>
					<th>Контакти</th>
				</tr>
			</thead>
			<tbody>
				<? foreach($arResult['ITEMS'] as $arItem) { ?>
				<tr class="tr-collapse-toggle">
					<td class="td-location"><?=$arItem['NAME']?></td>
					<td class="td-address"><?=$arItem['PROPERTIES']['ADDRESS']['VALUE']?>
						<div class="collapse">
							Буднi днi: 09:00-18:00
							<br>Суббота: 09:00-18:00
						</div>
					</td>
					<td class="td-number"><?=$arItem['PROPERTIES']['NUMBER']['VALUE']?></td>
					<td>
						<div class="___text-nowrap"><?=$arItem['PROPERTIES']['PHONE']['VALUE']?></div>
						<div class="collapse">
							<div class="text-nowrap">brofary@sat.ua</div>
							<div class="text-nowrap">0 800 30 99 09</div>
							<div class="text-nowrap">info@sat.ua</div>
						</div>
					</td>
				</tr>
				
				<tr class="tr-collapse">
					<td colspan="4" class="td-map">
						<div class="collapse">
    						<div class="td-map__inner" id="map_department<?=$arItem["ID"]?>" lat="<?=$arItem['PROPERTIES']['LATITUDE']['VALUE']?>" lng="<?=$arItem['PROPERTIES']['LONGITUDE']['VALUE']?>">
								<img src="http://placehold.it/1600x695)" alt="" width="1600" height="695">
							</div>
						</div>
					</td>
				</tr>
				<? } ?>
			</tbody>
		</table>
	</div>
	<div class="table-responsive hidden-lg-up">
		<table cellpadding="0" cellspacing="0" class="table table-hover table--department m-b-0">
			<thead>
				<tr>
					<th colspan="3" class="p-a-0">
						<div class="table__col-1">
							<i class="icon table__icon table__icon--map"></i> Наші видділення</div>
						<div class="table__col-2">
							<span class="btn table__btn active">Списком</span>
						</div>
						<div class="table__col-3">
							<a href="#" class="btn table__btn">На карті</a>
						</div>
					</th>
				</tr>
				<tr>
					<th>Місто
						<i class="table__sort table__sort-down"></i>
					</th>
					<th>Адреса</th>
					<th>Номер
						<i class="table__sort table__sort-down"></i>
					</th>
				</tr>
			</thead>
			<tbody>
				<? foreach($arResult['ITEMS'] as $arItem) { ?>
				<tr class="tr-collapse-toggle">
					<td class="td-location"><?=$arItem['NAME']?></td>
					<td class="td-address">
						<span class="uk-overlay-fade"><?=$arItem['PROPERTIES']['PHONE']['VALUE']?></span>
					</td>
					<td class="td-number"><?=$arItem['PROPERTIES']['NUMBER']['VALUE']?></td>
				</tr>
				<tr class="tr-collapse">
					<td>
						<div class="collapse"><?=$arItem['PROPERTIES']['ADDRESS']['VALUE']?>
							<br>Буднi днi: 09:00-18:00
							<br>Суббота: 09:00-18:00</div>
					</td>
					<td>
						<div class="collapse">
							<div class="text-nowrap">6 067 217 07 31</div>
							<div class="text-nowrap">brofary@sat.ua</div>
							<div class="text-nowrap">0 800 30 99 09</div>
							<div class="text-nowrap">info@sat.ua</div>
						</div>
					</td>
					<td></td>
				</tr>
				<tr class="tr-collapse">
					<td colspan="3" class="td-map">
						<div class="collapse">
							<div class="td-map__inner">
								<img src="http://placehold.it/1600x695)" alt="" width="1600" height="695">
							</div>
						</div>
					</td>
				</tr>
				<? } ?>
			</tbody>
		</table>
	</div>
	<div class="table__footer">
		<div class="table__footer-left">
			<a href="" class="btn btn--prev btn--muted">
				<span class="hidden-md-down">Попередні 15</span>
				<i class="icon icon--arrow-left-light-grey btn__icon--outline"></i>
			</a>
		</div>
		<div class="table__footer-center">
			<button type="button" class="btn btn--more btn--more--alt">Усі відділення
				<i class="icon icon--arrow-down-grey"></i>
			</button>
		</div>
		<div class="table__footer-right">
			<a href="" class="btn btn--next btn--muted">
				<span class="hidden-md-down">Наступні 15</span>
				<i class="icon icon--arrow-right-light-grey btn__icon--outline"></i>
			</a>
		</div>
	</div>
</div>*/?>