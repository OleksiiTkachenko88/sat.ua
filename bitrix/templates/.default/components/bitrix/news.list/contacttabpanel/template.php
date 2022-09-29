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
        <div class="tabs-content">
            <div class="container info-tabs">
<?$i = 0;?>
<?foreach($arResult["ITEMS"] as $arItem):?>
<?$i ++ ;?>
                        <div class="panel panel-default" data-id="<?echo $arItem['DISPLAY_PROPERTIES']['API_NUMBER']['DISPLAY_VALUE'];?>">
                            <div class="panel-heading col-sm-12" role="tab">
                                <h4 class="panel-title">
                                    <a role="button" class="panel-button" data-toggle="collapse"
                                       data-parent="#contacts-accordion" aria-expanded="true">
                                        <span><?echo $arItem["PREVIEW_TEXT"];?></span>
                                    </a>
                                </h4>
                            </div>
                            <div class="panel-collapse collapse <?if ($i == 1) echo ' in';?>" role="tabpanel">
                                <div class="panel-body">
                                    <div class="content-body-item">
                                        <?echo $arItem['PROPERTIES']["LEFT"]["~VALUE"]["TEXT"]?>
                                    </div>
                                    <div class="content-body-item">
                                        <?echo $arItem['PROPERTIES']["RIGHT"]["~VALUE"]["TEXT"]?>
                                    </div>
                                </div>
                            </div>
                        </div>


<?endforeach;?>
            </div>
        </div>



