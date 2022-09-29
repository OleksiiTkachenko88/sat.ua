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
                        <div class="news-list sub-pages-news news-row">
                            <div class="news-item clearfix">
<?foreach($arResult["ITEMS"] as $arItem):?>
                                <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="inner-new">
                                    <div class="news-image">
                                        <img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="<?=$arItem["PREVIEW_PICTURE"]["DESCRIPTION"]?>">
                                        <div class="hover-preview"><span><? echo getMessage("SHOW_MORE_UF");?></span></div>
                                    </div>
                                    <div class="news-item-text">
                                    <?if($arParams["DISPLAY_DATE"]!="N" && $arItem["TIMESTAMP_X"]):?>
                                        <div class="date"><?=$arItem["TIMESTAMP_X"]?></div>
                                    <?endif?>
                                        <div class="title cut-text">
											<?echo $arItem["NAME"]?>
                                        </div>
                                        <div class="text-new cut-text">
											<?echo $arItem["PREVIEW_TEXT"];?>
                                        </div>
                                        <div class="button-more"><span class="arrow"><img
                                                src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png"
                                                alt=""></span></div>
                                    </div>
                                </a>
<?endforeach;?>
                            </div>
                        </div>


