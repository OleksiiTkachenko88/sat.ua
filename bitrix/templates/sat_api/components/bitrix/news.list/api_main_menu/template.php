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
<div class="home-menu">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="menu-block">
					<!-- тут работает foreach -->
			<?foreach($arResult["ITEMS"] as $arItem):?>
					<a href="<?=$arItem["PROPERTIES"]["URL"]["VALUE"];?>" class="menu-item <?=$curPage;?>">
						<div class="image-block">
							<img src="<?=$arItem["DETAIL_PICTURE"]["SRC"];?>" alt="<?=$arItem["PROPERTIES"]["TITLE"]["VALUE"]["TEXT"];?>">
						</div>
						<div class="header-block">
							<span><?=$arItem["PROPERTIES"]["TITLE"]["VALUE"]["TEXT"];?></span>
						</div>
					</a>
			<?endforeach;?>
					<!-- -->
				</div>
			</div>
		</div>
	</div>
</div>