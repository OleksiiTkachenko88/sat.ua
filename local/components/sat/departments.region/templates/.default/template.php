<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

$lang = $arResult["MAIN_LANG"];
$additional_lang = $arResult["ADD_LANG"];
?>
<div class="region-table">
	<div class="region-table-header">
		<div class="region-show-btn">
			<i class="fa fa-arrow-circle-o-left fa-2x"></i>
		</div>
		<div class="town-search">
			<div class="search-input">
				<input type="text">
				<span class="highlight"></span>
				<span class="bar"></span>
				<label class="text-uppercase"><?=GetMessage("HEADER_TOWN")?></label>
				<i class="fa fa-search" aria-hidden="true"></i>
				<i class="fa fa-times" aria-hidden="true"></i>
			</div>
		</div>
	</div>
	<div class="region-table-body">
	<?if($arResult["REGIONS_LIST"]):	?>
		<div class="panel-group" role="tablist" id="region-list">
		<?foreach($arResult["REGIONS_LIST"] as $id => $val):?>
			<div class="panel panel-default">
				<div class="panel-heading nopadding">
					<div class="region-head <?=($val["IS_CURRENT"] == "Y")?"active":"collapsed"?>" data-toggle="collapse" href="#<?=$id?>" data-parent="#region-list">
						<div class="text-uppercase" data-additional-lang="<?echo $val["UF_REGION_NAME_".$additional_lang]?>"><?echo $val["UF_REGION_NAME_".$lang];?></div>
						<div class="align-ie"></div>
						<div class="badge pull-right"><?echo count($val["CITIES_LIST"]);?></div>
					</div>
				</div>
				<div id="<?=$id?>" class="panel-collapse collapse <?=($val["IS_CURRENT"] == "Y")?"in active":""?>" role="tabpanel">
					<div class="panel-body nopadding">
						<div class="city-list">
					<?foreach($val["CITIES_LIST"] as $element):?>
							<?if($element["IS_CURRENT"] == "Y"):?>
								<div href="<?echo $element["TOWN_URL"];?>" class="city-item active" data-additional-lang="<?echo $element["UF_REGION_NAME_".$additional_lang];?>"><?echo $element["UF_REGION_NAME_".$lang]?></div>
							<?else:?>
								<a href="<?echo $element["TOWN_URL"];?>" class="city-item" data-additional-lang="<?echo $element["UF_REGION_NAME_".$additional_lang];?>"><?echo $element["UF_REGION_NAME_".$lang]?></a>
							<?endif;?>
					<?endforeach;?>
						</div>
					</div>
				</div>
			</div>
		<?endforeach;?>
		</div>
	<?endif;?>
	</div>
</div>