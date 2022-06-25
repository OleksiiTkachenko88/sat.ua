<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
$this->setFrameMode(true);
?>
<div class="department-map-wrapper">
	<div class="department-panel-wrap">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<div class="department-panel">
						<div class="title-panel">
							<div class="img-wrap">
								<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray1.png" alt="">
							</div>
							
							<span><h1><?$APPLICATION->ShowTitle(false);?></h1></span>
						</div>
						<div class="department-nav">
							<a href="<?=$arResult["FOLDER"].$arResult["URL_TEMPLATES"]["list"]?>"><?echo getMessage("IN_LIST");?></a>
							<a href="<?=$arResult["FOLDER"].$arResult["URL_TEMPLATES"]["map"]?>" class="active"><?echo getMessage("IN_MAP");?></a>
							<a href="/upload/sat_branches.pdf" download><?echo getMessage("DOWNLOAD");?></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="map-tracking" id="mapFull">	</div>
</div>
<?
	$APPLICATION->IncludeComponent(
		"sat:departments.list",
		"map",
		array(
		"IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
		"IBLOCK_ID" => $arParams["IBLOCK_ID"],
		"CACHE_TYPE" => $arParams["CACHE_TYPE"],
		"CACHE_TIME" => $arParams["CACHE_TIME"],
		"LIST_URL" => $arResult["FOLDER"],
		"TOWN_URL" => $arResult["FOLDER"].$arResult["URL_TEMPLATES"]["town"],
		"RSP_URL" => $arResult["FOLDER"].$arResult["URL_TEMPLATES"]["element"],
		"COMPONENT_PAGE" => $arResult["COMPONENT_PAGE"],
		"VARIABLES" => $arResult["VARIABLES"],
		"ALIASES" => $arResult["ALIASES"],
		"SET_STATUS_404" => $arParams["SET_STATUS_404"],
		"SHOW_404" => $arParams["SHOW_404"],
		"MESSAGE_404" => $arParams["MESSAGE_404"],
		"FILE_404" => $arParams["FILE_404"]
		),
		$component
	);
?>
