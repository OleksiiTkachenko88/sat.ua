<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

$this->setFrameMode(true);
?>
<div class="container">
	<div class="breadcrumbs-wrap">
		<div class="row">
			<div class="col-sm-12">
				<div class="breadcrumbs">
					<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
						<a itemprop="url" href="<?echo SITE_DIR;?>"> 
							<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
					</span>
					<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
						<span itemprop="title"><?echo $arResult["LIST_TITLE"]?></span> 
					</span>
				</div>
			</div>
		</div>
	</div>
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
					<a href="<?=$arResult["FOLDER"].$arResult["URL_TEMPLATES"]["list"]?>" class="active"><?echo getMessage("IN_LIST");?></a>
					<a href="<?=$arResult["FOLDER"].$arResult["URL_TEMPLATES"]["map"]?>"><?echo getMessage("IN_MAP");?></a>
					<a href="/upload/sat_branches.pdf" download><?echo getMessage("DOWNLOAD");?></a>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="departments-region-wrap">
			<div class="col-lg-9 col-sm-8 col-xs-12">
			<?
				$APPLICATION->IncludeComponent(
					"sat:departments.list",
					"",
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
			</div>
			<div class="col-lg-3 col-sm-4 region-mobile-nav">
			<?
				$APPLICATION->IncludeComponent(
					"sat:departments.region",
					"",
					array(
					"IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
					"IBLOCK_ID" => $arParams["IBLOCK_ID"],
					"CACHE_TYPE" => $arParams["CACHE_TYPE"],
					"CACHE_TIME" => $arParams["CACHE_TIME"],
					"LIST_URL" => $arResult["FOLDER"],
					"TOWN_URL" => $arResult["FOLDER"].$arResult["URL_TEMPLATES"]["town"],
					"RSP_URL" => $arResult["FOLDER"].$arResult["URL_TEMPLATES"]["element"],
					"SET_TITLE" => $arParams["SET_TITLE"],
					"SEO_TITLE" => $arParams["LIST_TITLE"],
					"SEO_PAGE_TITLE" => $arParams["PAGE_LIST_TITLE"],
					"SEO_PAGE_DESC" => $arParams["PAGE_LIST_DESC"],
					),
					$component
				);
			?>
			</div>
		</div>
	</div>
<?
	$APPLICATION->IncludeComponent(
		"sat:departments.text.seo",
		"",
		array(
		"IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
		"IBLOCK_ID" => $arParams["TEXT_IBLOCK_ID"],
		"CODE" => "all",
		),
		$component
	);
?>
</div>