<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arComponentDescription = array(
	"NAME" => getMessage("IBLOCK_NAME"),
	"SORT" => 20,
	"CACHE_PATH" => "Y",
	"PATH" => array(
		"ID" => "sat_content",
		"CHILD" => array(
			"ID" => "charts",
			"SORT" => 10
		),
	),
);

?>