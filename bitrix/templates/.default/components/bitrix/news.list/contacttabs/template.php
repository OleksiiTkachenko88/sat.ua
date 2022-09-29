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
        <div class="tabs-header">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="tabs-nav">
<?$i = 0;?>
<?foreach($arResult["ITEMS"] as $arItem):?>
<?$i ++ ;?>

                            <a class="tab-link<?if ($i == 1) echo ' active-tab';?>" data-tab="<?echo $arItem['DISPLAY_PROPERTIES']['API_NUMBER']['DISPLAY_VALUE'];?>" name="<?echo $arItem['DISPLAY_PROPERTIES']['API_NUMBER']['DISPLAY_VALUE'];?>"><span><?echo $arItem["PREVIEW_TEXT"];?></span></a>

<?endforeach;?>
                        </div>
                    </div>
                </div>
            </div>
        </div>


