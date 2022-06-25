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
	<div class="navigation__container">
		<div id="nav-con" class="container-fluid">
			<nav data-uk-switcher="{connect: '#contact_tabs'}" class="navigation">
				<? foreach($arResult['ITEMS'] as $k => $arItem) { ?>
					<a href="" class="navigation__link <?=($k == 0 ? 'uk-active' : '')?>">
						<span class="navigation__link-inner"><?=$arItem['NAME']?></span>
					</a>
				<? } ?>
			</nav>
		</div>
	</div>
	<div id="contact_tabs" class="uk-switcher">
		<? foreach($arResult['ITEMS'] as $k => $arItem) { ?>
			<div <?=($k == 0 ? 'class="uk-active"' : '')?>>
				<div class="container-fluid fluid_contain">				
					<?=$arItem['PREVIEW_TEXT']?>
				</div>
			</div>
		<? } ?>
	</div>