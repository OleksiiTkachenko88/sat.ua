<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
?>
<?$APPLICATION->IncludeComponent(
	"sat:departments",
	".default",
	array(
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "N",
		"COMPONENT_TEMPLATE" => ".default",
		"DEPARTMENT_COUNT" => "0",
		"MAIN_URL" => "https://catalog.sat.ua",
		"REGION_COUNT" => "0",
		"REGION_URL" => "getTowns",
		"RSP_URL" => "getRsp",
		"SEF_FOLDER" => "/departments/",
		"SEF_MODE" => "Y",
		"IBLOCK_TYPE" => "shared",
		"IBLOCK_ID" => "33",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"SET_TITLE" => "Y",
		"SET_STATUS_404" => "N",
		"SHOW_404" => "Y",
		"MESSAGE_404" => "",
		"LIST_TITLE" => "Відділення компанії",
		"TOWN_TITLE" => "Вантажоперевезення - #NAME#",
		"PAGE_LIST_TITLE" => "Відділення компанії в Україні. Адреси відділень, графік роботи, телефон | Транспортна компанія \"САТ\"",
		"PAGE_LIST_DESC" => " Відділення компанії, представництва \"САТ\" в Україні | ВИГІДНО! НАДІЙНО! ПІД ЧАС! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (вартість дзвінків згідно тарифів вашого оператора)",
		"PAGE_TOWN_TITLE" => "Вантажоперевезення #NAME#. Вантажні перевезення недорого - Ціни, відгуки, | Транспортна компанія \"САТ\"",
		"PAGE_TOWN_DESC" => " Вантажоперевезення #NAME# - Дзвонити за номером 0 800 30 99 09 | Розрахувати вартість вантажоперевезення, дізнатися статус руху вантажу, отримати контакти через карту відділень - це доступно в On-line режимі 24 години на добу | Швидко | Вигідно | Надійно.",
		"MAP_TITLE" => "Відділення компанії",
		"PAGE_MAP_TITLE" => "Відділення компанії на карті | Транспортна компанія “САТ”",
		"PAGE_MAP_DESC" => "Відділення компанії на карті - Транспортна компанія “САТ” | ВИГІДНО! НАДІЙНО! ВЧАСНО! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (вартість дзвінків згідно тарифів вашого оператора)",
		"ELEMENT_MAP_TITLE" => "Відділення #NAME#",
		"PAGE_ELEMENT_MAP_TITLE" => "Відділення #NAME# на карті | Транспортна компанія “САТ”",
		"PAGE_ELEMENT_MAP_DESC" => "Відділення #NAME# на карті - Транспортна компанія “САТ” | ВИГІДНО! НАДІЙНО! ВЧАСНО! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (вартість дзвінків згідно тарифів вашого оператора)",
		"FILE_404" => "/redirect/404.php",
		"TEXT_IBLOCK_ID" => "34",
		"SEF_URL_TEMPLATES" => array(
			"list" => "",
			"town" => "#SECTION_CODE#/",
			"map" => "map/",
			"element" => "map/#ELEMENT_CODE#/",
		)
	),
	false
);?>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
