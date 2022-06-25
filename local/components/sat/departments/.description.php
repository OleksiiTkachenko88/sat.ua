<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arComponentDescription = array(
	"NAME" => GetMessage("DEPARTMENT_NAME"),
	"DESCRIPTION" => GetMessage("DEPARTMENT_DESC"),
	"COMPLEX" => "Y",
	"SORT" => 400,
	"PATH" => array(
		"ID" => "sat_content",
		"NAME" => GetMessage("SAT_CONTENT"),
		"CHILD" => array(
			"ID" => "department",
			"NAME" => GetMessage("DEPARTMENT_COMPLEX"),
			"CHILD" => array(
				"ID" => "department_cmpx",
			),
		),
	),
);

?>