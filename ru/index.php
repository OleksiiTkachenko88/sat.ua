<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Грузоперевозки по Украине - Грузовые перевозки по Украине от транспортной компании \"САТ\" | Заказать грузоперевозки по Украине по телефону 0 800 30 99 09 | Рассчитать стоимость доставки, узнать статус движения груза, получить контакты через карту подразделений – это доступно в On-line режиме 24 часа в сутки | Быстрая | Выгодно | Надежно");
$APPLICATION->SetPageProperty("title", "Грузоперевозки по Украине | Доставка грузов по Киеву, Украине | Транспортная компания \"САТ\"");
$APPLICATION->SetTitle("Грузоперевозки по Украине");
?>
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"mainslider",
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
		"IBLOCK_ID" => GetMessage("MAIN_SLIDER_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("URL",""),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "ACTIVE_FROM",
		"SORT_BY2" => "SORT",
		"SORT_ORDER1" => "DESC",
		"SORT_ORDER2" => "ASC"
	)
);?> <?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"mainicons",
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
		"IBLOCK_ID" => GetMessage("MAIN_ICONS_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("URL","TITLE","TEXT","ICON"),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "ACTIVE_FROM",
		"SORT_BY2" => "SORT",
		"SORT_ORDER1" => "DESC",
		"SORT_ORDER2" => "ASC"
	)
);?>
<div class="login-panel">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
					<!--<span class="clearfix login-inner" style="word-spacing:2em">ОПЫТ РЕШЕНИЯ РЕСУРС</span>-->
				<h1 class="clearfix login-inner" style="word-spacing:0.5em"><?$APPLICATION->ShowTitle(false);?></h1>
<!--
                    <a href="" class="clearfix login-inner"><div>
                        УДОБНЫЙ <span>ЛИЧНЫЙ КАБИНЕТ</span> <img class="desctop-icon" src="<?=SITE_TEMPLATE_PATH?>/img/icons/login.png" alt=""> ПРЕДОСТАВИТ ВАМ
                        ВСЕ
                        ПРЕИМУЩЕСТВА ПОСТОЯННОГО КЛИЕНТА</div> <img class="mobile-icon" src="<?=SITE_TEMPLATE_PATH?>/img/icons/login.png" alt="">
                    </a>
-->
            </div>
		</div>
	</div>
</div>
<div class="home-center-content">
	<div class="container">
		<div class="row">
<?$APPLICATION->IncludeComponent(
	"sat:departments.item", 
	"img", 
	array(
		"COMPONENT_TEMPLATE" => ".default",
		"ELEMENT_NUMBER" => "009",
		"ELEMENT_REF" => "bbf8e497-33a7-11dd-a17a-001a4d3b885e",
		"IBLOCK_ID" => "33",
		"IBLOCK_TYPE" => "shared",
		"MAP_ID" => "map",
		"MAP_PAGE" => "departments/map/"
	),
	false
);?>
			<div class="col-xs-12 col-sm-6 col-md-3">
				<div class="border-block">
					<a href="<?=SITE_DIR?>about/news/" class="header clearfix">
						<div class="img-wrap">
							<img src="/bitrix/templates/sat_main/img/icons/icon-gray2.png" alt="">
						</div>
						<span><?echo GetMessage("NEWS");?></span>
					</a>
					<div class="news-list content-inner">
 <?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"mainnews",
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
		"IBLOCK_ID" => GetMessage("NEWS_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "3",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
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
		"SORT_ORDER2" => "ASC"
	)
);?>
					</div>
				</div>
			</div>
			
			<div class="col-xs-12 col-sm-6 col-md-3">
				<? $APPLICATION->IncludeComponent("sat:charts.list", "template2", Array(
	"IBLOCK_TYPE" => "ru",	// Тип информационнного блока (используется только для проверки):
		"IBLOCK_ID" => "36",	// Код информационного блока:
		"CHARTS_COUNT" => "4",	// Количество графиков на странице:
		"SECT_LIST_1" => "5999",	// График №1:
		"SECT_LIST_2" => "6000",	// График №2:
		"SECT_LIST_3" => "6001",	// График №3:
		"SECT_LIST_4" => "6002",	// График №4:
		"SECTION_FIELD_CODE" => array(	// Поля секции
			0 => "NAME",
			1 => "UF_INDICATOR_VAL",
			2 => "",
		),
		"FIELD_CODE" => array(	// Поля:
			0 => "SORT",
			1 => "DATE_ACTIVE_FROM",
			2 => "DATE_ACTIVE_TO",
			3 => "",
		),
		"PROPERTY_CODE" => array(	// Свойства:
			0 => "INDICATOR_VAL",
			1 => "",
		),
		"SORT_BY1" => "ACTIVE_FROM",	// Поле для первой сортировки: 
		"SORT_ORDER1" => "DESC",	// Направление первой сортировки: 
		"SORT_BY2" => "SORT",	// Поледля второй сортировки: 
		"SORT_ORDER2" => "DESC",	// Направление второй сортировки: 
		"CHARTS_VAL_COUNT" => "6",	// Количество значений графика:
		"AJAX_MODE" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"CACHE_TYPE" => "A",	// Тип кеширования
		"CACHE_TIME" => "36000000",	// Время кеширования (сек.)
		"ACTIVE_DATE_FORMAT" => "d.m.Y",	// Формат показа даты:
		"COMPONENT_TEMPLATE" => ".default"
	),
	false
); ?>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-3">
				<? $APPLICATION->IncludeComponent(
					"bitrix:news.list",
					"main_page_partners",
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
						"FIELD_CODE" => array("", ""),
						"FILTER_NAME" => "",
						"HIDE_LINK_WHEN_NO_DETAIL" => "N",
						"IBLOCK_ID" => GetMessage("PARTNERS_ID"),
						"IBLOCK_TYPE" => "ru",
						"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
						"INCLUDE_SUBSECTIONS" => "Y",
						"MESSAGE_404" => "",
						"NEWS_COUNT" => "5",
						"PAGER_BASE_LINK_ENABLE" => "N",
						"PAGER_DESC_NUMBERING" => "N",
						"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
						"PAGER_SHOW_ALL" => "N",
						"PAGER_SHOW_ALWAYS" => "N",
						"PAGER_TEMPLATE" => ".default",
						"PAGER_TITLE" => "Новости",
						"PARENT_SECTION" => "",
						"PARENT_SECTION_CODE" => "",
						"PREVIEW_TRUNCATE_LEN" => "",
						"PROPERTY_CODE" => array("URL", ""),
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
				); ?>
			</div>
		</div>
	</div>
</div>

<?
$APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"ourpartners_slider", 
	array(
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"ADD_SECTIONS_CHAIN" => "N",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "N",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "N",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "Y",
		"DISPLAY_DATE" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array(
			0 => "NAME",
			1 => "SORT",
			2 => "",
		),
		"FILTER_NAME" => "OUR_PARTNERS_SLIDER_FILTER",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => GetMessage("PARTNERS_SLIDER_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "N",
		"INCLUDE_SUBSECTIONS" => "N",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "URL",
			2 => "FILE",
			3 => "",
		),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "NAME",
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "ASC",
		"COMPONENT_TEMPLATE" => "ourpartners_slider",
		"STRICT_SECTION_CHECK" => "N"
	),
	false
);
?>

 <?
$main_action_vid = '1';
if(CModule::IncludeModule("iblock")){
$tmp = CIBlockElement::GetProperty(getMessage("MAIN_ACTION_VID_RAZDEL_ID"), getMessage("MAIN_ACTION_VID_ID"));
if($ar_props = $tmp->Fetch()) {
	if ($ar_props["VALUE_XML_ID"]) {
		$main_action_vid = $ar_props["VALUE_XML_ID"];
	}
}
}
?> <?
if ($main_action_vid == '1') {//вид номер 1 - с лучшим предложением
?>
<div class="home-center-content main-info-content">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="border-block">

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

<div class="offers-home">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-6 col-md-6">
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"bestaction", 
	array(
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
		"FIELD_CODE" => array(
			0 => "",
			1 => "",
		),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => GetMessage("OFFERS_ID"),
		"IBLOCK_TYPE" => "ua",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "1",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "",
		),
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
		"SORT_ORDER2" => "ASC",
		"COMPONENT_TEMPLATE" => "bestaction",
		"STRICT_SECTION_CHECK" => "N"
	),
	false
);?>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6">
				<div class="border-block">
					<a href="<?=SITE_DIR?>cases/" class="header clearfix">
						<div class="img-wrap">
							<img src="/bitrix/templates/sat_main/img/icons/icon-gray15.png" alt="">
						</div>
						<span><?echo GetMessage("CASES");?></span>
					</a>
				</div>
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"mainaction", 
	array(
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
		"FIELD_CODE" => array(
			0 => "",
			1 => "",
		),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => GetMessage("CASES_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "4",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "",
		),
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
		"SORT_ORDER2" => "ASC",
		"COMPONENT_TEMPLATE" => "mainaction",
		"STRICT_SECTION_CHECK" => "N"
	),
	false
);?>
			</div>
<!--			<div class="col-xs-12 text-center">
 <a href="<?=SITE_DIR?>offers/" class="button-more"><span class="text"><?echo GetMessage("MORE_ACTIONS_SMALL");?></span><span class="arrow"><img src="/bitrix/templates/sat_main/img/icons/arrow-black.png" alt=""></span></a>
			</div>
-->
		</div>
	</div>
</div>
 <?
//конец первого вариант вывода акций
} else {
//второй вид - без главного предложения
?>

<div class="offers-home grid-four">
	<div class="container">
		<div class="row">
			 <?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"mainaction2",
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
		"IBLOCK_ID" => GetMessage("OFFERS_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "4",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => GetMessage("YOUR_OFFERS_RAZDEL_ID"),
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
		"SORT_ORDER2" => "ASC"
	)
);?>
			<div class="col-xs-12 text-center">
 <a href="<?=SITE_DIR?>offers/" class="button-more"><span class="text"><?echo GetMessage("MORE_ACTIONS_SMALL");?></span><span class="arrow"><img src="/bitrix/templates/sat_main/img/icons/arrow-black.png" alt=""></span></a>
			</div>
		</div>
	</div>
</div>
 <?
}//конец второго варианта вывода акций
?>
<div class="recommends-wrap">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-12">
				<div class="recommend-title">
					<div class="img-wrap">
						<img src="/bitrix/templates/sat_main/img/icons/icon-gray5.png" alt="">
					</div>
					<span><a href="<?=SITE_DIR;?>about/recommend/">SAT <?echo GetMessage("RECOMMEND");?></a></span>
				</div>
			</div>
			<div class="col-xs-12 col-md-9">
				<div class="row">
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"btnbig",
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
		"IBLOCK_ID" => "22",
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "14",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("URL",""),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "ACTIVE_FROM",
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "DESC"
	)
);?>
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"btnsmalldown", 
	array(
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
		"FIELD_CODE" => array(
			0 => "",
			1 => "",
		),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => "22",
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "15",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array(
			0 => "ALT",
			1 => "URL",
			2 => "",
		),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "ACTIVE_FROM",
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "DESC",
		"COMPONENT_TEMPLATE" => "btnsmalldown",
		"STRICT_SECTION_CHECK" => "N"
	),
	false
);?>
					
				</div>
			</div>
			<div class="col-xs-12 col-md-3 custom-container right-column">
				<div class="custom-row">
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"btnsmallright",
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
		"IBLOCK_ID" => "22",
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "16",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("URL",""),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "ACTIVE_FROM",
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "DESC"
	)
);?>
					
				</div>
			</div>
		</div>
	</div>
</div>
 <br><?require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");?>