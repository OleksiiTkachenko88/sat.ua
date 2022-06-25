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
$images	= CFile::GetFileArray($arResult['PROPERTIES']['IMAGES']['VALUE']);

?>
<div class="swiper-container swiper-container--main swiper-container--strategy">
	<div class="swiper-wrapper">
		<div style="background-image: url(<?=$images['SRC']?>);" class="swiper-slide main-slide main-slide--strategy main-slide--hoverable">
			<img src="<?=$images['SRC']?>" alt="" width="1600" height="900" class="main-slide__img hidden">
			<div class="main-slide__overlay-panel">
				<div class="container-fluid slide_cont">
					<div id="slide_head" class="main-slide__header">
						<h2 class="main-slide__extra-title">
							<span class="uniform-bg-3">
								<span class="uniform-bg-2">
									<span class="uniform-bg-1"><?=$arResult['NAME']?></span>
								</span>
							</span>
						</h2>
						<h3 class="main-slide__title">
							<span class="uniform-bg-3">
								<span class="uniform-bg-2">
									<span class="uniform-bg-1"><?=$arResult['PROPERTIES']['SUBTITLE']['VALUE']?></span>
								</span>
							</span>
						</h3>
					</div>
					<p class="main-slide__descr"><?=$arResult['PROPERTIES']['SUBTITLE2']['VALUE']?></p>
				</div>
			</div>
		</div>
	</div>
	<?/*
<div class="swiper-button-wrapper">
		<div class="container-fluid">
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		</div>
	</div>
*/?>
</div>