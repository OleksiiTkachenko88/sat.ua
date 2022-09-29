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
            <div class="news-list">
<?if($arParams["DISPLAY_TOP_PAGER"]):?>
    <?=$arResult["NAV_STRING"]?>
<?endif;?>
<?$i = 0;?>



                <div class="col-xs-12">
					<div class="breadcrumbs">
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<a itemprop="url" href="<?echo SITE_DIR;?>"> 
								<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
						</span>
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<span itemprop="title"><?echo $arResult["NAME"];?></span> 
						</span>
					</div>
                    <div class="border-block">
                        <div class="header clearfix">
                            <div class="img-wrap">
                                <img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray19.png" alt="">
                            </div>
                            <h1><?echo $APPLICATION->GetTitle(false)?></h1>
                        </div>
                        <div class="news-list sub-pages-news news-row">
                            <div class="news-item clearfix">

<? $cnt = count($arResult["ITEMS"]);?>

<?foreach($arResult["ITEMS"] as $arItem):?>
<? $i ++ ; ?>

                                <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="inner-new">
                                    <div class="news-image">
                                        <img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="">
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

<? if ($i % 2 == 0 && $i < $cnt) {
echo '
                            </div>
                        </div>
                        <div class="news-list sub-pages-news news-row">
                            <div class="news-item clearfix">';
}?>

<?endforeach;?>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 news-pagination">

<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
                <?=$arResult["NAV_STRING"]?>
<?endif;?>
                </div>
            </div>
