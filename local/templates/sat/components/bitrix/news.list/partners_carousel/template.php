<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
use Bitrix\Main\Localization\Loc;
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
// p($arResult);
?>
<div class="col-xs-12 col-lg-6">
		<section id="panel_partner" class="panel panel--partner">
			<header class="panel__heading">
				<div class="panel__heading-primary-content">
					<i class="icon panel__icon"></i>
					<h3 class="panel__title"><?=$arResult["NAME"]?></h3>
				</div>
				<div class="panel__heading-secondary-content">
					<div class="btn btn--accent btn--raised btn--icon panel__prev">
						<i class="icon icon--chevron-left"></i>
					</div>
					<div class="btn btn--accent btn--raised btn--icon panel__next">
						<i class="icon icon--chevron-right"></i>
					</div>
				</div>
			</header>
			<div class="swiper-container panel__swiper-container">
				<div class="swiper-wrapper">
    			<?foreach($arResult["ITEMS"] as $arItem):?>    				

					<div class="swiper-slide">
    					
    					<?if($arItem["PREVIEW_PICTURE"]["SRC"]!=""):?>
                            <div style="background-image: url(<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>);" class="panel__image">
    							<a href="<?=$arItem['DETAIL_PAGE_URL']?>">
    								<img src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>" alt="" width="695" height="400" class="invisible">
    							</a>
    						</div>
    					<?else:?>
    						<div style="background-image: url(http://placehold.it/695x400);" class="panel__image">
    							<a href="<?=$arItem['DETAIL_PAGE_URL']?>">
    								<img src="http://placehold.it/695x400" alt="" width="695" height="400" class="invisible">
    							</a>
    						</div>
						<?endif;?>
						<div id="item_panel" class="panel__item panel__item--hoverable">
							<small class="panel__item-sup-title"><?=$arItem["DISPLAY_ACTIVE_FROM"]?></small>
							<strong class="panel__item-title"><?=$arItem["NAME"]?></strong>
							<div class="panel__item-text panel__item-text--line-2"><?=$arItem["PREVIEW_TEXT"]?></div>
							<div id="partner1"
								class="panel__item-footer">
								<span class="btn btn--more btn--muted"><?=Loc::getMessage("PARTNERS_LINK");?>
									<i class="icon icon--arrow-right-light-grey btn__icon--outline"></i>
								</span>
						    </div>
                            <a href="<?=SITE_DIR?>/partners/" class="panel__item-cover-link"></a>
					    </div>
				    </div>
				<?endforeach;?>
			    </div>
	        </div>
	    </section>
</div>
