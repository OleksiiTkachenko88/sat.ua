<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
        <?foreach($arResult["ITEMS"] as $arItem):?>

                        <div class="col-xs-12 col-sm-4 center-column">
                            <a href="<?echo $arItem["PROPERTIES"]["URL"]["VALUE"]?>" class="recommend-item">
                                <div class="img-wrap">
                                    <!--<img src="<?echo $arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="
											<?if(!empty($arItem["PROPERTIES"]["ALT"]["VALUE"])) {
											echo $arItem["PROPERTIES"]["ALT"]["VALUE"];}else{echo $arItem["NAME"];}?>
																							">-->
                                    <img class="lazyload" data-src="<?echo $arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="
											<?if(!empty($arItem["PROPERTIES"]["ALT"]["VALUE"])) {
											echo $arItem["PROPERTIES"]["ALT"]["VALUE"];}else{echo $arItem["NAME"];}?>
																							">
                                </div>
                                <span><?echo $arItem["NAME"]?></span>


                            </a>
                        </div>
        <?endforeach;?>



