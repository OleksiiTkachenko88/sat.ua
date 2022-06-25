<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
$this->setFrameMode(true);
$this->AddEditAction($arResult['ID'], $arResult["BTN"]['EDIT_LINK'], CIBlock::GetArrayByID($arResult["IBLOCK_ID"], "ELEMENT_EDIT"));
$this->AddDeleteAction($arResult['ID'], $arResult["BTN"]['DELETE_LINK'], CIBlock::GetArrayByID($arResult["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => "Удалить?"));
?>
<?if(strlen($arResult["TEXT"])>0):?>

<div class="text-description-page" id="<?=$this->GetEditAreaId($arResult["ID"]);?>">
	<div class="row">
		<div class="col-xs-12">
			<div id="short_text" class="text-description-content box-hide">
			<?=$arResult["TEXT"];?>
			</div>
			<div class="text-description-more">
				<a href="#" id="short_text_show_link" class="text-description-more-link">
					<span class="link-text text-uppercase dotted"><?=GetMessage("READ_ALL")?></span>
				</a>
			</div>
		</div>
	</div>
</div>
<?endif;?>