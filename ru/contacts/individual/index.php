<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("H1", "Индивидуальные условия");
$APPLICATION->SetPageProperty("description", "Индивидуальные условия - ТК \"САТ\" ");
$APPLICATION->SetPageProperty("title", "Индивидуальные условия");
$APPLICATION->SetTitle("Индивидуальные условия SAT");
?>
<div class="international-banner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/img/individual_usl_ru.jpg');">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="international-banner-content">
					<div class="international-banner-text clearfix">
						<h1><?echo getMessage("INDIVIDUAL_Z");?></h1>
                       	</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="international-post">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="post-content">
					<div class="breadcrumbs">
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<a itemprop="url" href="<?echo SITE_DIR;?>"> 
								<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
						</span>
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<span itemprop="title"><?echo getMessage("INDIVIDUAL_Z");?></span> 
						</span>
					</div>
					<div class="info-content">
	<?
	$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "index_inc.php", Array(), Array(
	"MODE"      => "html",
	"NAME"      => "текста",
	"TEMPLATE"  => "text.php"
	));
	?>
					</div>
					
					<a class="link-more show-full-text"><?=getMessage("READ_ALL1")?></a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="international-form-content">
	<div class="container">
		<div class="row">


<?$APPLICATION->IncludeComponent(
	"bitrix:form.result.new", 
	"individual", 
	array(
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"CHAIN_ITEM_LINK" => "",
		"CHAIN_ITEM_TEXT" => "",
		"EDIT_URL" => "",
		"IGNORE_CUSTOM_TEMPLATE" => "N",
		"LIST_URL" => "",
		"SEF_MODE" => "N",
		"SUCCESS_URL" => "",
		"USE_EXTENDED_ERRORS" => "N",
		"WEB_FORM_ID" => "17",
		"COMPONENT_TEMPLATE" => "individual",
		"SEF_FOLDER" => "/ru/individual/",
		"VARIABLE_ALIASES" => array(
			"WEB_FORM_ID" => "WEB_FORM_ID",
			"RESULT_ID" => "RESULT_ID",
		)
	),
	false
);?> 

		</div>
	</div>
</div>


<div class="home-center-content">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-6">
				<div class="border-block">
					<div class="header clearfix">
						<div class="img-wrap">
							<img src="<?=SITE_TEMPLATE_PATH;?>/img/icons/icon-gray2.png" alt="">
						</div>
						<span><?echo getMessage("NEWS");?></span>
					</div>
					<div class="wide-new content-inner">
<?$APPLICATION->IncludeComponent("bitrix:news.list", "innernews", Array(
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
		"DISPLAY_BOTTOM_PAGER" => "Y",	// Выводить под списком
		"DISPLAY_DATE" => "Y",
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
		"IBLOCK_ID" => GetMessage("NEWS_ID"),	// Код информационного блока
		"IBLOCK_TYPE" => "-",	// Тип информационного блока (используется только для проверки)
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",	// Включать инфоблок в цепочку навигации
		"INCLUDE_SUBSECTIONS" => "Y",	// Показывать элементы подразделов раздела
		"MESSAGE_404" => "",	// Сообщение для показа (по умолчанию из компонента)
		"NEWS_COUNT" => "1",	// Количество новостей на странице
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
			1 => "VIDEO",
			2 => "",
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
		"COMPONENT_TEMPLATE" => "innercase",
		"STRICT_SECTION_CHECK" => "N",	// Строгая проверка раздела для показа списка
	),
	false
);?>
					</div>
				</div>
			</div>

			<div class="col-xs-12 col-sm-12 col-md-6">
				<div class="border-block">
					<div class="header clearfix">
						<div class="img-wrap">
							<img src="<?=SITE_TEMPLATE_PATH;?>/img/icons/icon-gray3.png" alt="">
						</div>
						<span><?echo getMessage("FOR_PARTNERS_UF");?></span>
					</div>
					<div class="wide-new content-inner">
<?$APPLICATION->IncludeComponent(
"bitrix:news.list",
"innerpartner",
Array(
	"ACTIVE_DATE_FORMAT" => "d.m.Y",
	"ADD_SECTIONS_CHAIN" => "Y",
	"AJAX_MODE" => "N",
	"AJAX_OPTION_ADDITIONAL" => "",
	"AJAX_OPTION_HISTORY" => "N",
	"AJAX_OPTION_JUMP" => "N",
	"AJAX_OPTION_STYLE" => "Y",
	"CACHE_FILTER" => "N",
	"CACHE_GROUPS" => "Y",
	"CACHE_TIME" => "36000000",
	"CACHE_TYPE" => "A",
	"CHECK_DATES" => "Y",
	"DETAIL_URL" => "",
	"DISPLAY_BOTTOM_PAGER" => "Y",
	"DISPLAY_DATE" => "Y",
	"DISPLAY_NAME" => "Y",
	"DISPLAY_PICTURE" => "Y",
	"DISPLAY_PREVIEW_TEXT" => "Y",
	"DISPLAY_TOP_PAGER" => "N",
	"FIELD_CODE" => array("",""),
	"FILTER_NAME" => "",
	"HIDE_LINK_WHEN_NO_DETAIL" => "N",
	"IBLOCK_ID" => GetMessage("PARTNERS_ID"),
	"IBLOCK_TYPE" => GetMessage("IBLOCK_TYPE"),
	"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
	"INCLUDE_SUBSECTIONS" => "Y",
	"MESSAGE_404" => "",
	"NEWS_COUNT" => "1",
	"PAGER_BASE_LINK_ENABLE" => "N",
	"PAGER_DESC_NUMBERING" => "N",
	"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
	"PAGER_SHOW_ALL" => "N",
	"PAGER_SHOW_ALWAYS" => "N",
	"PAGER_TEMPLATE" => "blog",
	"PAGER_TITLE" => "Новости",
	"PARENT_SECTION" => "",
	"PARENT_SECTION_CODE" => "",
	"PREVIEW_TRUNCATE_LEN" => "",
	"PROPERTY_CODE" => array("",""),
	"SET_BROWSER_TITLE" => "N",
	"SET_LAST_MODIFIED" => "N",
	"SET_META_DESCRIPTION" => "N",
	"SET_META_KEYWORDS" => "N",
	"SET_STATUS_404" => "N",
	"SET_TITLE" => "N",
	"SHOW_404" => "N",
	"SORT_BY1" => "SORT",
	"SORT_BY2" => "ACTIVE_FROM",
	"SORT_ORDER1" => "DESC",
	"SORT_ORDER2" => "DESC"
)
);?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>