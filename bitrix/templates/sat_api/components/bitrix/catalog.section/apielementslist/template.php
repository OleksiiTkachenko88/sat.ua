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
	<div class="col-xs-12">

		<div class="border-block">
			<div class="breadcrumbs">
				<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
					<a itemprop="url" href="<?echo SITE_DIR;?>"> 
						<span itemprop="title"><?echo getMessage("MAIN_PAGE");?></span> </a>| 
				</span>
				<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
					<a itemprop="url" href="<?echo $arResult["LIST_PAGE_URL"];?>"> 
						<span itemprop="title"><?echo getMessage("API_HEADER");?></span> </a>| 
				</span>
				<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
					<span itemprop="title"><?echo $arResult["NAME"];?></span> 
				</span>
			</div>
			<div class="header clearfix">
				<div class="img-wrap">
					<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/api-methods-icon.png" alt="">
				</div>
				<h1><?echo $arResult["NAME"];?></h1>
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
								<span class="description"><?=$arElement['NAME']?></span>
							</a>
						</div>
					</li>
					<?endforeach;?>
				<?unset($arElement);?>
				<?endif;?>
				</ul>
			</div>
		</div>
	</div>
	<div class="col-xs-12 news-pagination">
	<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
		<?=$arResult["NAV_STRING"]?>
	<?endif;?>
	</div>
</div>
