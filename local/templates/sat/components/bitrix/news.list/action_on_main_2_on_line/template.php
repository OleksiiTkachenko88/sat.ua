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
<div class="panel__container panel__container--main panel__container--main--banner m-b-0">
	<div class="container-fluid">
		<div class="row panel__container-row">
			<?foreach($arResult["ITEMS"] as $arItem) { ?>
				<div class="col-xs-12 col-lg-6">
					<section class="panel panel--action">
						<header class="panel__heading">
							<div class="panel__heading-primary-content">
								<i class="icon panel__icon"></i>
								<h3 class="panel__title"><?=$arItem['NAME']?></h3>
							</div>
						</header>
						<?
						$banner	= $arItem['DETAIL_PICTURE'];
						  
						if(intval($arItem['PROPERTIES']['BANNER_4_ON_LINE']['VALUE']))
						{
							$banner	= CFile::GetFileArray($arItem['PROPERTIES']['BANNER_4_ON_LINE']['VALUE']);
						}
							//dump($arItem);
						?>
						<div style="background-image: url(<?=$banner['SRC']?>);" class="banner banner--h--465">
							<a href="">
								<img src="<?=$banner['SRC']?>" alt="" width="695" height="465" class="invisible">
								<?/*
								<div class="banner__overlay-panel">
									<h3 class="banner__title banner__title--size-1">Акція</h3>
								</div>
								*/?>
							</a>
						</div>
					</section>
				</div>
			<? } ?>
		</div>
	</div>
	<div class="panel__container-footer">
		<div class="container-fluid">
			<?/*
<button type="button" class="btn btn--more">Більше акцій
				<i class="icon icon--arrow-down-grey"></i>
			</button>
*/
			?>
			<a href="<?=SITE_DIR?>/actions/" _type="button" class="btn btn--more" _style="border:none;"><?=GetMessage('MORE_ACTIONS')?>
				<i class="icon icon--arrow-down-grey"></i>
			</a>
		</div>
	</div>
</div>