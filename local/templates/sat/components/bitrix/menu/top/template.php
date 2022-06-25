<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
use Bitrix\Main\Localization\Loc;

?>

<ul class="navbar__nav">
	<? foreach($arResult as $i => $arItem) { ?>
		<?
			$arItem['TEXT']	= str_replace(' ', '&nbsp;', $arItem['TEXT']);
			
			if(isset($arItem['PARAMS']['id']))
				$id	= 'id = "'.$arItem['PARAMS']['id'].'" href="javascript:void(0)"';
			else
				$id	= '';
		?>
		<li><a  title="<?=$arItem['TEXT']?>" <?=($id ? $id : 'href="'.$arItem["LINK"].'"')?>><?=$arItem['TEXT']?></a></li>
	<? } ?>
</ul>
