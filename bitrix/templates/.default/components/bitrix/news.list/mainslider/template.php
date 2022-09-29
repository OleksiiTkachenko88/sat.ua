<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
    <div class="home-slideshow flexslider 18">
        <ul class="slides">
        <?foreach($arResult["ITEMS"] as $arItem):?>
			<!--<li class="item" style="background-image: url('<?echo $arItem["PREVIEW_PICTURE"]["SRC"]?>');">-->
			<li class="lazyload item main-slider" data-src="<?echo $arItem["PREVIEW_PICTURE"]["SRC"]?>">
                <div class="container">
                    <div class="slide-text clearfix">
                        <div class="title"><?echo $arItem["PREVIEW_TEXT"]?></div>
						<?if(!empty($arItem["PROPERTIES"]["URL"]["VALUE"])) {?>
                        <a href="<?echo $arItem["PROPERTIES"]["URL"]["VALUE"]?>" class="button-more">
							<span class="text"><?echo GetMessage("SHOW_MORE");?></span><span class="arrow"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png" alt=""></span>
                        </a>
						<?}?>
                    </div>
                </div>
            </li>
        <?endforeach;?>
        </ul>
    </div>