<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Показники компанії - Транспортна компанія “САТ” | ВИГІДНО! НАДІЙНО! ВЧАСНО! ☎ 0 800 30 99 09 (безкоштовно по Україні)");
$APPLICATION->SetPageProperty("title", "Показники компанії | Транспортна компанія “САТ”");
?>

<? $APPLICATION->IncludeComponent(
	"sat:charts", 
	".default", 
	array(
		"COMPONENT_TEMPLATE" => ".default",
		"IBLOCK_TYPE" => "ua",
		"IBLOCK_ID" => "35",
		"SHOW_MAIN_CHART" => "Y",
		"SHOW_SECONDARY_CHARTS" => "Y",
		"MAIN_CHART_ID" => "5992",
		"MAIN_CHART_CANVAS" => "main-chart",
		"SEF_MODE" => "N",
		"CACHE_TYPE" => "A",
		"CACHE_TIME" => "3600",
		"SET_TITLE" => "N",
		"SECONDARY_CHARTS_COUNT" => "6",
		"SECONDARY_CHART_ID_0" => "5993",
		"SECONDARY_CHART_CANVAS_0" => "secondary-chart-1",
		"SECONDARY_CHART_ID_1" => "5994",
		"SECONDARY_CHART_CANVAS_1" => "secondary-chart-2",
		"SECONDARY_CHART_ID_2" => "5995",
		"SECONDARY_CHART_CANVAS_2" => "secondary-chart-3",
		"SECTION_FIELD_CODE" => array(
			0 => "",
			1 => "",
		),
		"SECONDARY_CHART_ID_3" => "5996",
		"SECONDARY_CHART_CANVAS_3" => "secondary-chart-4",
		"SECONDARY_CHART_ID_4" => "5997",
		"SECONDARY_CHART_CANVAS_4" => "secondary-chart-5",
		"SECONDARY_CHART_ID_5" => "5998",
		"SECONDARY_CHART_CANVAS_5" => "secondary-chart-6",
		"MAIN_CHART_VAL_COUNT" => "6",
		"SECONDARY_CHARTS_VAL_COUNT" => "6",
		"CHART_TYPE_PROP" => "UF_CHART_VUE",
		"CHART_MIN_VAL_PROP" => "UF_CHART_MIN_VAL",
		"CHART_MAX_VAL_PROP" => "UF_CHART_MAX_VAL",
		"SEF_FOLDER" => "/indicators/",
		"CHART_VAL_PROP" => "INDICATOR_VAL",
		"MAIN_CHART_COLOR" => "#225EE9",
		"SECONDARY_CHART_COLOR_0" => "#225EE9",
		"SECONDARY_CHART_COLOR_1" => "#225EE9",
		"SECONDARY_CHART_COLOR_2" => "#225EE9",
		"SECONDARY_CHART_COLOR_3" => "#225EE9",
		"SECONDARY_CHART_COLOR_4" => "#fce400",
		"SECONDARY_CHART_COLOR_5" => "#0085FF"
	),
	false
);
?>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>