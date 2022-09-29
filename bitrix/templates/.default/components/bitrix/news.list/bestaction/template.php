<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>


<?foreach($arResult["ITEMS"] as $arItem):?>
					 <div class="border-block"  style="border-bottom:0">
						<a href="<?=SITE_DIR?>offers/" class="header clearfix">
                            <div class="img-wrap">
                                <img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray19.png" alt="">
                            </div>
                            <span><?echo GetMessage("INFO_FOR_DEVELOPERS");?></span>
						</a>
					</div>
					<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="border-block" style="border-top:none">
                        <div class="content-inner">

                            <!--<div style="background-image: url('<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>');"></div>-->
							<div class="lazyload" data-src='<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>'></div>
                            <!--<div class="hover-preview"><span><?echo GetMessage("SHOW_MORE_UF");?></span></div>-->
				            <div class="hover-preview" style="display:table; width: 100%; height: 100%;"><span style="display:table-cell; vertical-align: middle; line-height: normal; padding: 15px;"><?echo $arItem['NAME'];?></span></div>
                        </div>
					</a>
<?endforeach;?>
