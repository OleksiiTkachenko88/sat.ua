<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?foreach($arResult["ITEMS"] as $arItem):?>
                    <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="item">
                                <!--<div class="new-banner"
                                     style='background-image: url("<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>");'>
                                </div>-->
                                <div class="lazyload new-banner"
                                     data-src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>">
                                </div>
                                <div class="news-item">
                                    <div class="inner-new">
                                        <div class="date"><?echo $arItem["TIMESTAMP_X"]?></div>
                                        <div class="title cut-text"><?=$arItem["NAME"]?></div>
                                        <div class="text-new cut-text"><?=$arItem["PREVIEW_TEXT"]?>
                                        </div>
                                        <div class="button-more"><span class="text"><?echo GetMessage("FOR_PARTNERS_SMALL");?></span><span
                                                class="arrow"><img
                                                src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png" alt=""></span></div>
                                    </div>
                                </div>
                            </a>
<?endforeach;?>
