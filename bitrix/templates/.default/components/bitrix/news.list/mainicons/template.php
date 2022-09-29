<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

    <div class="slider-bottom">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="clearfix icons-wrap">
		<?$i==0;?>
        <?foreach($arResult["ITEMS"] as $arItem):?>
                        <a href="<?echo $arItem["PROPERTIES"]["URL"]["VALUE"]?>" class="icon-item <?echo $i ==2 ? ' slider-international': '';?>">
                            <div class="header-block">
                                <span><?echo $arItem["PROPERTIES"]["TITLE"]["~VALUE"]["TEXT"]?></span>
                            </div>
                            <div class="image-block">
								<img class="lazyload" data-src="<?echo $arItem["DISPLAY_PROPERTIES"]["ICON"]["FILE_VALUE"]["SRC"]?>" 
									alt="<?echo $arItem["PROPERTIES"]["ALT"]["VALUE"]?>">
							</div>
                            <div class="bottom-block">
                                <span><?echo $arItem["PROPERTIES"]["TEXT"]["~VALUE"]["TEXT"]?></span>

                            </div>
                        </a>
		<?$i++;?>
        <?endforeach;?>
                    </div>
                </div>
            </div>
        </div>
    </div>