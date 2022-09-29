<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Франчайзинг в Україні, купити франчайзинг для малого, середнього, великого бізнесу. Інформація для клієнтів та партнерів транспортної компанії САТ | ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (вартість дзвінків згідно тарифів вашого оператора)");
$APPLICATION->SetPageProperty("title", "Франчайзинг в Україні, купити франчайзинг | Транспортна компанія \"САТ\"");
$APPLICATION->SetTitle("Франчайзинг");
?>
<style>
	.news-page {
		padding-top:0px;
	}
	.strategy-post .breadcrumbs-content {
		margin-top: -180px;
	}
	.news-page .border-block {
		margin-top: -120px;
	}
	.list-1 ul{
		list-style-position: inside;
		-moz-column-count:2; /* Firefox */
		-webkit-column-count:2; /* Safari and Chrome */
		column-count:2;
		list-style-type:circle;
	}
	.list-2 ul{
		list-style-position: inside;
		-moz-column-count:2; /* Firefox */
		-webkit-column-count:2; /* Safari and Chrome */
		column-count:2;
		list-style-type:disc;
	}
	.content-main-text li {
		list-style-position: inside;
		text-transform: uppercase;
		margin-bottom: 7px;
	}
	.content-main-text ul{
		list-style-position: inside;
	}
	@media (min-width: 1600px) {
		.strategy-post .breadcrumbs-content {
			margin-top: -190px;
		}
	}
	@media screen and (max-width: 1339px) {
		.strategy-post .breadcrumbs-content {
			margin-top: -185px;
		}
		.news-page .border-block {
			margin-top: -140px;
		}
		.strategy-banner .strategy-banner-content {
			height:600px;
		}
	}
	@media screen and (max-width: 990px) {
		.strategy-post .breadcrumbs-content {
			margin-top: -160px;
		}
		.news-page .border-block {
			margin-top: -115px;
		}
		.strategy-banner .strategy-banner-content {
			height:500px;
		}
	}
	@media screen and (max-width: 767px) {
		.border-block {
			margin-bottom:0px;
		}
		.strategy-post .breadcrumbs-content {
			margin-top: -260px;
		}
		.news-page .border-block {
			margin-top: -225px;
		}
		.strategy-banner  {
			height:300px;
		}
	}
	@media screen and (max-width: 764px) {

	}
	@media screen and (max-width: 567px) {
		.news-page .border-block {
			margin-top: -350px;
			margin-left: -15px;
			margin-right: -15px;
		}
		.strategy-post .post-content {
			margin-bottom: 0px;
		}
		.breadcrumbs-content {
			display:none;
		}
		.content-main-text {
			margin-top:0px !important;
		}
	}
	@media screen and (max-width: 400px) {
		.strategy-banner .strategy-banner-text .submit-button {
			font-size:11px;
    		padding: 0 10px;
		}
	}
</style>

<div class="strategy-banner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/img/partners-baner.png');">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="strategy-banner-content">
					<div class="strategy-banner-text clearfix">
						<h1><?echo $APPLICATION->GetDirProperty("H1");?></h1>
						<h2><?echo $APPLICATION->GetDirProperty("H2");?></h2>
						<a class="submit-button" href="<?echo $APPLICATION->GetDirProperty("BTN_URL");?>"><?echo $APPLICATION->GetDirProperty("BTN_TEXT");?></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="strategy-post">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="post-content breadcrumbs-content">
					<div class="breadcrumbs">
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<a itemprop="url" href="<?echo SITE_DIR;?>"> 
								<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
						</span>
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<a itemprop="url" href="<?echo (SITE_DIR."".$APPLICATION->GetDirProperty("PARENT_DIR"));?>"> 
								<span itemprop="title"><?echo $APPLICATION->GetDirProperty("PARENT_H1");?></span> </a>| 
						</span>
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<span itemprop="title"><?echo $APPLICATION->GetDirProperty("H1");?></span> 
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="strategy-post">
	<div class="container">
		<div class="row">
<?
$real_title = $APPLICATION->getTitle();
$APPLICATION->SetTitle(getMessage("NEWS"));
$APPLICATION->IncludeComponent("bitrix:news.list", "listpartnersnewsmain", Array(
	"ACTIVE_DATE_FORMAT" => "d.m.Y",	// Формат показа даты
		"ADD_SECTIONS_CHAIN" => "Y",	// Включать раздел в цепочку навигации
		"AJAX_MODE" => "N",	// Включить режим AJAX
		"AJAX_OPTION_ADDITIONAL" => "",	// Дополнительный идентификатор
		"AJAX_OPTION_HISTORY" => "N",	// Включить эмуляцию навигации браузера
		"AJAX_OPTION_JUMP" => "N",	// Включить прокрутку к началу компонента
		"AJAX_OPTION_STYLE" => "Y",	// Включить подгрузку стилей
		"CACHE_FILTER" => "N",	// Кешировать при установленном фильтре
		"CACHE_GROUPS" => "Y",	// Учитывать права доступа
		"CACHE_TIME" => "36000000",	// Время кеширования (сек.)
		"CACHE_TYPE" => "A",	// Тип кеширования
		"CHECK_DATES" => "Y",	// Показывать только активные на данный момент элементы
		"DETAIL_URL" => "",	// URL страницы детального просмотра (по умолчанию - из настроек инфоблока)
		"DISPLAY_BOTTOM_PAGER" => "N",	// Выводить под списком
		"DISPLAY_DATE" => "N",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",	// Выводить над списком
		"FIELD_CODE" => array(	// Поля
			0 => "",
			1 => "",
		),
		"FILTER_NAME" => "",	// Фильтр
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",	// Скрывать ссылку, если нет детального описания
		"IBLOCK_ID" => GetMessage("PARTNERS_ID"),	// Код информационного блока
		"IBLOCK_TYPE" => "-",	// Тип информационного блока (используется только для проверки)
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",	// Включать инфоблок в цепочку навигации
		"INCLUDE_SUBSECTIONS" => "Y",	// Показывать элементы подразделов раздела
		"MESSAGE_404" => "",	// Сообщение для показа (по умолчанию из компонента)
		"NEWS_COUNT" => "6",	// Количество новостей на странице
		"PAGER_BASE_LINK_ENABLE" => "N",	// Включить обработку ссылок
		"PAGER_DESC_NUMBERING" => "N",	// Использовать обратную навигацию
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",	// Время кеширования страниц для обратной навигации
		"PAGER_SHOW_ALL" => "N",	// Показывать ссылку "Все"
		"PAGER_SHOW_ALWAYS" => "N",	// Выводить всегда
		"PAGER_TEMPLATE" => "blog",	// Шаблон постраничной навигации
		"PAGER_TITLE" => "Новости",	// Название категорий
		"PARENT_SECTION" => "",	// ID раздела
		"PARENT_SECTION_CODE" => "",	// Код раздела
		"PREVIEW_TRUNCATE_LEN" => "",	// Максимальная длина анонса для вывода (только для типа текст)
		"PROPERTY_CODE" => array(	// Свойства
			0 => "",
			1 => "",
		),
		"SET_BROWSER_TITLE" => "N",	// Устанавливать заголовок окна браузера
		"SET_LAST_MODIFIED" => "N",	// Устанавливать в заголовках ответа время модификации страницы
		"SET_META_DESCRIPTION" => "N",	// Устанавливать описание страницы
		"SET_META_KEYWORDS" => "N",	// Устанавливать ключевые слова страницы
		"SET_STATUS_404" => "N",	// Устанавливать статус 404
		"SET_TITLE" => "N",	// Устанавливать заголовок страницы
		"SHOW_404" => "N",	// Показ специальной страницы
		"SORT_BY1" => "SORT",	// Поле для первой сортировки новостей
		"SORT_BY2" => "ACTIVE_FROM",	// Поле для второй сортировки новостей
		"SORT_ORDER1" => "DESC",	// Направление для первой сортировки новостей
		"SORT_ORDER2" => "DESC",	// Направление для второй сортировки новостей
		"COMPONENT_TEMPLATE" => "listnewsforlegend",
		"STRICT_SECTION_CHECK" => "N",	// Строгая проверка раздела для показа списка
	),
	false
);
$APPLICATION->SetTitle($real_title);
?>
		</div>
	</div>
</div>


<div class="strategy-post">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="post-content content-main-text" style="margin-bottom:15px; margin-top: -1px;">
<?
$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "index_inc.php", Array(), Array(
    "MODE"      => "html",
    "NAME"      => "текста",
    "TEMPLATE"  => "text.php"
    ));
?>
				</div>
			</div>
		</div>
	</div>
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>