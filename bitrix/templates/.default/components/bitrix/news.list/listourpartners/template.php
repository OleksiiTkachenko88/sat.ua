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
<div class="col-xs-12">
	<div class="breadcrumbs">
		<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
			<a itemprop="url" href="<?echo SITE_DIR;?>"> 
				<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
		</span>
		<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
			<span itemprop="title"><?echo $arResult["NAME"];?></span> 
		</span>
	</div>
	<div class="partners-list">
		<div class="border-block">
			<div class="header clearfix">
				<i class="fa fa-diamond fa-3x" aria-hidden="true"></i>
				<h1><?echo $APPLICATION->GetTitle()?></h1>
			</div>
			<div class="row parents-list-row">
<?foreach($arResult["ITEMS"] as $arItem):?>
				<div class="col-xs-6 col-md-4 col-lg-3">
					<div class="partners-item">
						<a href="<?=$arItem["DISPLAY_PROPERTIES"]["URL"]["VALUE"]?>" target="_blank" rel="nofollow">
							<img class="lazyload our-partners-image" data-src="<?=$arItem["DISPLAY_PROPERTIES"]["FILE"]["FILE_VALUE"]["SRC"]?>" src="<?=$templateFolder?>/img/default.jpg" alt="<?=$arItem["NAME"];?>"/>
						</a>
					</div>
				</div>
<?endforeach;?>
			</div>
		</div>
	</div>
