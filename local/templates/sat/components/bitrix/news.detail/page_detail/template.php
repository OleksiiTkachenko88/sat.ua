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
<section class="panel panel--p-alt">
    <div class="panel__body">
        <h3 class="panel__body-title panel__body-title--alt"><?=$arResult['NAME']?></h3>

        <p class="panel__body-text panel__column-2">
			<?if(strlen($arResult["DETAIL_TEXT"])>0):?>
        		<?echo $arResult["DETAIL_TEXT"];?>
        	<?else:?>
        		<?echo $arResult["PREVIEW_TEXT"];?>
        	<?endif?>
        </p>
    </div>
</section>
