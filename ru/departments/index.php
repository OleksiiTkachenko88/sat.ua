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
		"SEF_FOLDER" => "/ru/departments/",
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
		"LIST_TITLE" => "Отделения компании",
		"TOWN_TITLE" => "Грузоперевозки - #NAME#",
		"PAGE_LIST_TITLE" => "Отделения компании в Украине. Адреса отделений, график работы, телефон | Транспортная компания “САТ”",
		"PAGE_LIST_DESC" => "Отделения компании, представительства “САТ” в Украине | ВЫГОДНО! НАДЕЖНО! ВОВРЕМЯ! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (стоимость звонков согласно тарифов вашего оператора)",
		"PAGE_TOWN_TITLE" => "Грузоперевозки #NAME#. Грузовые перевозки недорого - Цены, отзывы | Транспортная компания “САТ”",
		"PAGE_TOWN_DESC" => "Грузоперевозки #NAME# - Звонить по номеру 0 800 30 99 09 | Рассчитать стоимость грузоперевозки, узнать статус движения груза, получить контакты через карту отделений – это доступно в On-line режиме 24 часа в сутки | Быстро | Выгодно | Надежно.",
		"MAP_TITLE" => "Отделения компании",
		"PAGE_MAP_TITLE" => "Отделения компании на карте | Транспортная компания “САТ”",
		"PAGE_MAP_DESC" => "Отделения компании на карте - Транспортная компания “САТ” | ВЫГОДНО! НАДЕЖНО! ВОВРЕМЯ! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (стоимость звонков согласно тарифов вашего оператора)",
		"ELEMENT_MAP_TITLE" => "Отделение #NAME#",
		"PAGE_ELEMENT_MAP_TITLE" => "Отделение #NAME# на карте | Транспортная компания “САТ”",
		"PAGE_ELEMENT_MAP_DESC" => "Отделение #NAME# на карте - Транспортная компания “САТ” | ВЫГОДНО! НАДЕЖНО! ВОВРЕМЯ! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (стоимость звонков согласно тарифов вашего оператора)",
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
