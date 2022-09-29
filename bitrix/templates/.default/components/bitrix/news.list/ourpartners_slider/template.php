<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<div class="partners-slider">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="header">
					<div class="img-wrap">
						<i class="fa fa-diamond fa-3x" aria-hidden="true"></i>
					</div>
					<span><?echo GetMessage("OUR_PARTNERS");?></span>
					<div class="owl-nav">
						<div class="owl-prev"></div>
						<div class="owl-next"></div>
					</div>
				</div>
    			<div class="owl-carousel owl-theme">
				<?foreach($arResult["ITEMS"] as $key => $value):?>
					<a class="lazyitem" href="<?=$value["DISPLAY_PROPERTIES"]["URL"]["VALUE"]?>" target="_blank" rel="nofollow">
							<img class="lazyimage" data-src="<?=$value["DISPLAY_PROPERTIES"]["FILE"]["FILE_VALUE"]["SRC"]?>" src="<?=$templateFolder?>/img/default.jpg" alt="<?=$value["NAME"];?>"/>
					</a>
				<?endforeach;?>
    			</div>
				<div class="footer">
					<a href="<?=SITE_DIR?>about/our-partners/">
					<div class="button-more"><span class="text"><?echo getMessage("FOR_PARTNERS_SLIDER_SMALL")?></span><span class="arrow"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png" alt=""></span></div>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>