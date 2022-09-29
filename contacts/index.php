<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Центр інформаційної підтримки - Транспортна компанія “САТ” | ВИГІДНО! НАДІЙНО! ВЧАСНО! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (вартість дзвінків згідно тарифів вашого оператора)");
$APPLICATION->SetPageProperty("title", "Центр інформаційної підтримки | Транспортна компанія “САТ”");
$APPLICATION->SetTitle("Центр інформаційної підтримки");

$page = $APPLICATION->GetCurPage();
if($page == '/contacts/'):
header("HTTP/1.1 301 Moved Permanently");
header("Location: https://www.sat.ua/contacts/company/");
endif;

$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"contacttabtext",
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
		"IBLOCK_ID" => GetMessage("CONTACTS_ID"),
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
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "API_NUMBER",
			2 => "LEFT",
			3 => "RIGHT",
			4 => "",
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
		"COMPONENT_TEMPLATE" => "contacttabtext",
		"STRICT_SECTION_CHECK" => "N"
	),
	false
);

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
?>
