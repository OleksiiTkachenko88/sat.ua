<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

if (!CModule::IncludeModule("form")) return;

$arrForms = array();
$rsForm = CForm::GetList($by='s_sort', $order='asc', array("SITE" => $_REQUEST["site"]), $v3);
while ($arForm = $rsForm->Fetch())
{
	$arrForms[$arForm["ID"]] = "[".$arForm["ID"]."] ".$arForm["NAME"];
}

$arComponentParameters = array(
	"GROUPS" => array(
		"FORM_PARAMS" => array(
			"NAME" => GetMessage("COMP_FORM_GROUP_PARAMS")
		),
	),

	"PARAMETERS" => array(
		"OFFICE_NAME" => array(
			"NAME" => 'Название офиса',
			"TYPE" => "STRING",
			"DEFAULT" => "Центральный офис",
			"PARENT" => "FORM_PARAMS",
		),
		"OFFICE_ADDRESS" => array(
			"NAME" => 'Адрес офиса',
			"TYPE" => "STRING",
			"DEFAULT" => "350072 г. Краснодар ул. Солнечная, 15/5",
			"PARENT" => "FORM_PARAMS",
		),
		"PROVIDER" => array(
			"NAME" => 'Поставщикам (ссылка)',
			"TYPE" => "STRING",
			"DEFAULT" => "",
			"PARENT" => "FORM_PARAMS",
		),
		"INVESTOR" => array(
			"NAME" => 'Инвесторам (ссылка)',
			"TYPE" => "STRING",
			"DEFAULT" => "",
			"PARENT" => "FORM_PARAMS",
		),
		"EMAIL" => array(
			"NAME" => 'EMAIL',
			"TYPE" => "STRING",
			"DEFAULT" => "info@magnit.ru",
			"PARENT" => "FORM_PARAMS",
		),
		"LAT" => array(
			"NAME" => 'Координаты LAT',
			"TYPE" => "STRING",
			"DEFAULT" => "55.7628466",
			"PARENT" => "FORM_PARAMS",
		),
		"LNG" => array(
			"NAME" => 'Координаты LNG',
			"TYPE" => "STRING",
			"DEFAULT" => "37.6220263",
			"PARENT" => "FORM_PARAMS",
		),
		"OFFICE_DESCRIPTION" => array(
			"NAME" => 'Описание',
			"TYPE" => "STRING",
			"DEFAULT" => "<p>Горячая линия для покупателей <br><a href=\"+78002009002\" class=\"office-detail__phone\">8 800 200-90-02</a></p> <p><a href=\"#\" class=\"i-link i-link_red\">Поставщикам</a></p> <p><a href=\"#\" class=\"i-link i-link_red\">Инвесторам</a></p>",
			"PARENT" => "FORM_PARAMS",
		),


	),
);
?>