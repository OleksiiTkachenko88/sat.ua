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
<div class="breadcrumbs">
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<a itemprop="url" href="<?echo SITE_DIR;?>"> 
			<span itemprop="title"><?=getMessage("API_MAIN_PAGE");?></span> </a>| 
	</span>
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<a itemprop="url" href="<?echo $arResult["LIST_PAGE_URL"];?>">
			<span itemprop="title"><?=getMessage("API_INTEGRATION_HEADER");?></span> </a>| 
	</span>
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<span itemprop="title"><?=$arResult["NAME"];?></span> 
	</span>
</div>

<?if($arParams["DISPLAY_DATE"]!="N" && $arResult["TIMESTAMP_X"]):?>
                        <div class="date"><?=$arResult["TIMESTAMP_X"]?></div>
<?endif?>
<?if($arParams["DISPLAY_NAME"]!="N" && $arResult["NAME"]):?>
<h1><?=$arResult["NAME"]?></h1>
<?endif?>
	<div class="content-text">
		<?echo $arResult["DETAIL_TEXT"];?>
		<div class="file">
			<h2><?echo $arResult["DISPLAY_PROPERTIES"]["FILE"]["DISPLAY_VALUE"];?></h2>
		</div>
	</div>
						<a class="link-more show-full-text"><?=getMessage("READ_ALL");?></a>
	<?
	if(array_key_exists("USE_SHARE", $arParams) && $arParams["USE_SHARE"] == "Y")
	{
		?>
		<div class="news-detail-share">
			<noindex>
			<?
			$APPLICATION->IncludeComponent("bitrix:main.share", "", array(
					"HANDLERS" => $arParams["SHARE_HANDLERS"],
					"PAGE_URL" => $arResult["~DETAIL_PAGE_URL"],
					"PAGE_TITLE" => $arResult["~NAME"],
					"SHORTEN_URL_LOGIN" => $arParams["SHARE_SHORTEN_URL_LOGIN"],
					"SHORTEN_URL_KEY" => $arParams["SHARE_SHORTEN_URL_KEY"],
					"HIDE" => $arParams["SHARE_HIDE"],
				),
				$component,
				array("HIDE_ICONS" => "Y")
			);
			?>
			</noindex>
		</div>
		<?
	}
	?>
