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

<style>



</style>


        <div class="tabs-content">
            <div class="container info-tabs">
<?$i = 0;?>
<?foreach($arResult["ITEMS"] as $arItem):?>
<?$i ++ ;?>

                <div class="row info-item <?echo $i == 1 ? ' active-info' : '';?>" data-tab="<?echo $arItem['DISPLAY_PROPERTIES']['API_NUMBER']['DISPLAY_VALUE'];?>">
                    <div class="col-xs-12 col-sm-6">
                        <?echo $arItem['PROPERTIES']["LEFT"]["~VALUE"]["TEXT"]?>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                      <div class="map-tracking" id="map"></div>

                    </div>
                </div>

<?endforeach;?>
            </div>
        </div>



