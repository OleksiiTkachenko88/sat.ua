<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();
use Bitrix\Main\Localization\Loc;

$menuItems	= array();
foreach($arResult as $arItem)
{
	if($arItem['DEPTH_LEVEL'] == 1)
		$menuItems[] = $arItem;
	else
		$menuItems[sizeof($menuItems) - 1]['CHILD'][]	= $arItem;
}

?>
<h3 class="mega-footer__extra-heading hidden-md-down"><?=GetMessage("SITE_MAP");?></h3>
<? //dump($menuItems) ?>
<nav class="mega-footer__middle-section hidden-md-down">
	<? foreach($menuItems as $arItem) { ?>
		<?
			//$arItem['TEXT']	= str_replace(' ', '&nbsp;', $arItem['TEXT']);
		?>
		<div class="mega-footer__section">
			<h5 class="mega-footer__heading"><?=$arItem['TEXT']?></h5>
			<? if(sizeof($arItem['CHILD']) > 0) { ?>
				<ul class="mega-footer__link-list">
					<? foreach($arItem['CHILD'] as $child) { ?>
					<li>
						<a href="<?=$child['LINK']?>" title="<?=$child['TEXT']?>"><?=$child['TEXT']?></a>
					</li>
					<? } ?>
				</ul>				
			<? } ?>
		</div>
		<?/* <li><a href="<?=$arItem["LINK"]?>" title="<?=$arItem['TEXT']?>"><?=$arItem['TEXT']?></a></li> */?>
	<? } ?>
</nav>
<?
	return;
?>

<nav class="mega-footer__middle-section hidden-md-down">
	<div class="mega-footer__section">
		<h5 class="mega-footer__heading">Замовити</h5>
		<ul class="mega-footer__link-list">
			<li>
				<a href="">Калькулятор</a>
			</li>
		</ul>
	</div>
	<div class="mega-footer__section">
		<h5 class="mega-footer__heading">ТРЕКІНГ</h5>
		<ul class="mega-footer__link-list">
			<li>
				<a href="">Відстежити вантаж</a>
			</li>
			<li>
				<a href="">Замовлення</a>
			</li>
		</ul>
	</div>
	<div class="mega-footer__section">
		<h5 class="mega-footer__heading">Надпоштові можливості</h5>
		<ul class="mega-footer__link-list">
			<li>
				<a href="">Послуги</a>
			</li>
			<li>
				<a href="">Академія</a>
				<ul>
					<li>
						<a href="">Кейси</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<div class="mega-footer__section">
		<h5 class="mega-footer__heading">Акції</h5>
		<ul class="mega-footer__link-list">
			<li>
				<a href="">Найкращі пропозиції</a>
			</li>
			<li>
				<a href="">Акції для вас</a>
			</li>
			<li>
				<a href="">Ваші бонуси</a>
			</li>
		</ul>
	</div>
	<div class="mega-footer__section">
		<h5 class="mega-footer__heading">Компанія SAT</h5>
		<ul class="mega-footer__link-list">
			<li>
				<a href="">Легенда</a>
			</li>
			<li>
				<a href="">Новини</a>
			</li>
		</ul>
	</div>
	<div class="mega-footer__section">
		<h5 class="mega-footer__heading">Контакти</h5>
		<ul class="mega-footer__link-list">
			<li>
				<a href="">Бізнес</a>
			</li>
			<li>
				<a href="">Клієнти</a>
			</li>
			<li>
				<a href="">Відділення</a>
				<ul>
					<li>
						<a href="">Списком</a>
					</li>
					<li>
						<a href="">На карті</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</nav>
