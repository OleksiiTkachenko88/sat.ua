<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<? $i = 0;?>

<?foreach($arResult["ITEMS"] as $arItem):?>
<? $i++;?>
                <div class="col-xs-12 col-sm-6 col-md-3">
                    <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="border-block">
                        <div class="header clearfix">
                            <div class="img-wrap">
                                <img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray4.png" alt="">
                            </div>
                            <span><?echo $arItem["NAME"]?></span>
                        </div>
                        <div class="content-inner"
                             style="background-image: url('<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>');"></div>
                    </a>
                </div>

<?endforeach;?>

