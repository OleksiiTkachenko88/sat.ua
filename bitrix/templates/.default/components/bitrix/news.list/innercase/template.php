<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?foreach($arResult["ITEMS"] as $arItem):?>
                            <div class="item">
							<?if (isset($arItem["DISPLAY_PROPERTIES"]["VIDEO"]["FILE_VALUE"]["SRC"]) && !empty($arItem["DISPLAY_PROPERTIES"]["VIDEO"]["FILE_VALUE"]["SRC"])) {?>
                                <div class="new-banner video-banner">
                                    <video controls>
                                        <source src="<?=$arItem["DISPLAY_PROPERTIES"]["VIDEO"]["FILE_VALUE"]["SRC"]?>"
                                                type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                                    </video>
                                    <a class="hover-preview"><img src="<?=SITE_TEMPLATE_PATH;?>/img/icons/play.png" alt=""></a>
                                </div>
								<?} else {?>
								<div class="new-banner"
                                     style='background-image: url("<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>");'>
                                </div>
								<?}?>
                                <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="news-item">
                                    <div class="inner-new">
                                        <div class="date"><?echo $arItem["TIMESTAMP_X"]?></div>
                                        <div class="title cut-text"><?=$arItem["NAME"]?></div>
                                        <div class="text-new cut-text"><?=$arItem["PREVIEW_TEXT"]?></div>
                                        <div class="button-more"><span class="text"><? echo getMessage("CASES");?></span><span
                                                class="arrow"><img
                                                src="<?=SITE_TEMPLATE_PATH;?>/img/icons/arrow-black.png" alt=""></span></div>
                                    </div>
                                </a>
                            </div>
<?endforeach;?>
