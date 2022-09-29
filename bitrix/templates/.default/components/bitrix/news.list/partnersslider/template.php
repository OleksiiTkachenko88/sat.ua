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
    			<div class="owl-carousel">
<?foreach($arResult["ITEMS"] as $key => $value):?>
					<div class="lazyload owl-item" data-src= "<?=$value["DISPLAY_PROPERTIES"]["FILE"]["FILE_VALUE"]["SRC"]?>">
						<?if(isset($value["DISPLAY_PROPERTIES"]["URL"]["VALUE"])):?>
							<a href="<?=$value["DISPLAY_PROPERTIES"]["URL"]["VALUE"]?>" target="_blank" rel="nofollow"></a>
						<?endif;?>
					</div>
<?endforeach;?>
    			</div>
				<div class="footer">
				</div>
			</div>
		</div>
	</div>
</div>