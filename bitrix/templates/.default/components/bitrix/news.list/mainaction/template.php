<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<? $i = 0;?>

<table class="offers-table-block">
	<tr>
		<?foreach($arResult["ITEMS"] as $arItem):?>
		<? 
		$i++;
		$t=$i-1;
		?>
		<td>
			<a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="content-inner-grid">
				<!--<div style="background-image: url('<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>')"></div>-->
				<div class="lazyload" data-src="<?=$arItem["PREVIEW_PICTURE"]["SRC"]?>"></div>
				<!--<div class="hover-preview"><span><?echo GetMessage("SHOW_MORE_UF");?></span></div>-->
				<div class="hover-preview" style="display:table; width: 100%; height: 100%;"><span style="display:table-cell; vertical-align: middle; line-height: normal; padding: 15px;"><?echo $arResult['ITEMS'][$t]['NAME'];?></span></div>
			</a>
		</td>
<?if ($i == 2):?>
	</tr><tr>
<?endif?>
<?endforeach;?>
	</tr>
</table>
