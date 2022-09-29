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
$strSectionEdit = CIBlock::GetArrayByID($arParams["IBLOCK_ID"], "SECTION_EDIT");
$strSectionDelete = CIBlock::GetArrayByID($arParams["IBLOCK_ID"], "SECTION_DELETE");
$arSectionDeleteParams = array("CONFIRM" => GetMessage('CT_BCSL_ELEMENT_DELETE_CONFIRM'));
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
					<span itemprop="title"><?echo getMessage("API_HEADER");?></span> 
				</span>
			</div>
			<div class="header clearfix">
				<div class="img-wrap">
					<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/api-methods-icon.png" alt="">
				</div>
				<h1>Интерфейсы API</h1>
			</div>
			<div class="news-list methods-list">
			<?if(0 < $arResult["SECTIONS_COUNT"]):?>
				<ul>
					<?foreach ($arResult['SECTIONS'] as &$arSection):
						$this->AddEditAction($arSection['ID'], $arSection['EDIT_LINK'], $strSectionEdit);
						$this->AddDeleteAction($arSection['ID'], $arSection['DELETE_LINK'], $strSectionDelete, $arSectionDeleteParams);?>
					<li>
						<div class="method-item">
							<a href="<? echo $arSection['SECTION_PAGE_URL']; ?>"><span class="description"><?=$arSection['NAME'];?></span>
								<?if($arParams["COUNT_ELEMENTS"]):?> 
								<span class="count">(<?=$arSection['ELEMENT_CNT'];?>)</span>
								<?endif;?>
							</a>
						</div>
					</li>
					<?endforeach;?>
				<?unset($arSection);?>
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
