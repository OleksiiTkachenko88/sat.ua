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
<a name="main_slider"></a>
<div class="swiper-container swiper-container--main">
	
		<div class="swiper-wrapper">
			<?foreach($arResult["ITEMS"] as $arItem) { ?>
				<?
					$hash	= 'slide'.$arItem['ID'];
					
					if(!empty($arItem['PROPERTIES']['TYPE']['VALUE_XML_ID']))
						$hash = 'slide_'.$arItem['PROPERTIES']['TYPE']['VALUE_XML_ID'];
				?>
				<div data-hash="<?=$hash?>" style="background-image: url(<?=$arItem['PREVIEW_PICTURE']['SRC']?>);" class="swiper-slide main-slide main-slide--hoverable">
					<img src="<?=$arItem['PREVIEW_PICTURE']['SRC']?>" alt="" width="1600" height="900" class="main-slide__img hidden">
					<div class="main-slide__overlay-panel">
						<div class="container-fluid slide_cont">
							<h2 class="main-slide__title"><?=$arItem['NAME']?></h2>
							<? if(!empty($arItem['PROPERTIES']['DESCRIPTION']['VALUE'])) { ?>
								<p id="vozmoz" class="main-slide__descr"><?=$arItem['PROPERTIES']['DESCRIPTION']['VALUE']?></p>
							<? } ?>
							<? if(1 || !empty($arItem['PROPERTIES']['LINK']['VALUE'])) { ?>
								<a id="detal" href="<?=$arItem['PROPERTIES']['LINK']['VALUE']?>" class="btn btn--more main-slide__more"><?=GetMessage("DETAIL");?>
									<i class="icon icon--arrow-right-grey"></i>
								</a>
							<? } ?>
						</div>
					</div>
				</div>
			<? } ?>
		</div>
	<div class="swiper-button-wrapper">
		<div class="container-fluid" id="but_nav">
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>
</div>
