<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arComponentDescription = array(
    "NAME" => GetMessage("IBLOCK_CHARTS_NAME"),
    "COMPLEX" => "Y",
    "PATH" => array(
        "ID" => "sat_content",
        "NAME" => GetMessage("SAT_CONTENT"),
        "CHILD" => array(
            "ID" => "charts",
            "NAME" => GetMessage("T_IBLOCK_DESC_CHARTS"),
            "SORT" => 10,
            "CHILD" => array(
                "ID" => "charts_cmpx",
            ),
        ),
    ),
);

?>