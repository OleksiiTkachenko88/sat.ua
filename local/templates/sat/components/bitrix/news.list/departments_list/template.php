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
?>

<div id="departm" class="table__container table__container--department">
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
							<a href="<?=SITE_DIR?>/departments/map/" class="btn table__btn">На карті</a>
						</div>
					</th>
				</tr>
				<tr>
					<th>
					<input type="text" placeholder="Місто" class="city">
					</th>
					<th>Адреса</th>
					<th>Номер</th>
					<th>Контакти</th>
				</tr>
				<?/*<tr>
					<th>Місто
						<i class="table__sort table__sort-down"></i>
					</th>
					<th>Адреса</th>
					<th>Номер
						<i class="table__sort table__sort-down"></i>
					</th>
					<th>Контакти</th>
				</tr>*/?>
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
    						<div class="td-map__inner" id="map_department<?=$arItem["ID"]?>" phone="<?=$arItem['PROPERTIES']['PHONE']['VALUE']?>" description="<?=$arItem['NAME']?>" address="<?=$arItem['PROPERTIES']['ADDRESS']['VALUE']?>" latitude="<?=$arItem['PROPERTIES']['LATITUDE']['VALUE']?>" longitude="<?=$arItem['PROPERTIES']['LONGITUDE']['VALUE']?>"></div>
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
    						<div class="td-map__inner" id="mobile_map_department<?=$arItem["ID"]?>" phone="<?=$arItem['PROPERTIES']['PHONE']['VALUE']?>" description="<?=$arItem['NAME']?>" address="<?=$arItem['PROPERTIES']['ADDRESS']['VALUE']?>" latitude="<?=$arItem['PROPERTIES']['LATITUDE']['VALUE']?>" longitude="<?=$arItem['PROPERTIES']['LONGITUDE']['VALUE']?>"></div>
							<?/*<div class="td-map__inner">
								<img src="http://placehold.it/1600x695)" alt="" width="1600" height="695">
							</div>*/?>
						</div>
					</td>
				</tr>
				<? } ?>
			</tbody>
		</table>
	</div>
	<div class="table__footer">
    	<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
        	<?=$arResult["NAV_STRING"]?>
        <?endif;?>
    	<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
	</div>
</div>