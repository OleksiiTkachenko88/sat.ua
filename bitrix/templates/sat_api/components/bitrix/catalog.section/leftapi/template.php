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
$this->setFrameMode(true);?>
<div class="news-list">
	<div class="col-xs-12">
		<div class="header clearfix">
			<div class="img-wrap">
				<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/api-methods-icon.png" alt="">
			</div>
			<span><?echo $arResult["NAME"];?></span>
		</div>
		<div class="news-list methods-list">
			<ul>
			<?if(0 < count($arResult["ITEMS"])):
				foreach($arResult["ITEMS"] as $arElement):
					if($arElement['PROPERTIES']['REQUEST_METHOD']['VALUE_ENUM']=='GET'):$MethodSpan = 'green';
					elseif($arElement['PROPERTIES']['REQUEST_METHOD']['VALUE_ENUM']=='POST'):$MethodSpan = 'yelow';
					else:$MethodSpan = '';
					endif;?>
				<li>
					<div class="method-item">
						<a href="<?=$arElement['DETAIL_PAGE_URL']?>">
							<span class="type <?=$MethodSpan?>"><?=$arElement['PROPERTIES']['REQUEST_METHOD']['VALUE_ENUM']?></span>
							<?if($arElement['DETAIL_PAGE_URL'] == $APPLICATION->GetCurPage("")):?>
							<span class="description" style="color:#404041;text-decoration:underline"><?=$arElement['NAME']?></span>
							<?else:?>
								<span class="description"><?=$arElement['NAME']?></span>
							<?endif;?>
						</a>
					</div>
				</li>
				<?endforeach;?>
			<?unset($arElement);?>
			<?endif;?>
			</ul>
		</div>
	</div>
	<div class="clearfix">
		<a href="<?=$arResult["LIST_PAGE_URL"];?>" class="button-more">
			<span class="text"><?echo GetMessage("GET_ALL_API");?></span>
			<span class="arrow"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png" alt=""></span>
		</a>
	</div>
</div>