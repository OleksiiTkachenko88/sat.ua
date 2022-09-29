<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Новости");

if(!isset($_REQUEST["ID"]) || !intval($_REQUEST["ID"]))
{
    \Bitrix\Main\Loader::includeModule("iblock");
    $arSelect 	= Array("ID", "NAME", "CODE");
    $arFilter	= array('IBLOCK_ID' => \Sat::getInstance()->IBLOCK[SITE_ID]["NEWS"], "ACTIVE" => "Y");
    $res 		= CIBlockElement::GetList(Array('DATE_ACTIVE_FROM' => 'DESC', 'ID' => 'DESC'), $arFilter, false, Array("nTopCount"=>1), $arSelect);
    if($arFields = $res->GetNext())
    {
    	$_REQUEST["ID"] = $arFields['ID'];
    }
}
?>
<div class="page__row">
<?$detailId=$APPLICATION->IncludeComponent("bitrix:news.detail","news_detail",Array(
        "DISPLAY_DATE" => "Y",
        "DISPLAY_NAME" => "Y",
        "DISPLAY_PICTURE" => "Y",
        "DISPLAY_PREVIEW_TEXT" => "Y",
        "USE_SHARE" => "Y",
        "SHARE_HIDE" => "N",
        "SHARE_TEMPLATE" => "",
        "SHARE_HANDLERS" => array(""),
        "SHARE_SHORTEN_URL_LOGIN" => "",
        "SHARE_SHORTEN_URL_KEY" => "",
        "AJAX_MODE" => "Y",
        "IBLOCK_TYPE" => SITE_ID,
        "IBLOCK_ID" => \Sat::getInstance()->IBLOCK[SITE_ID]["NEWS"],
        "ELEMENT_ID" => $_REQUEST["ID"],
        "ELEMENT_CODE" => "",
        "CHECK_DATES" => "Y",
        "FIELD_CODE" => Array("ID"),
        "PROPERTY_CODE" => Array("DESCRIPTION"),
        "IBLOCK_URL" => "",
        "DETAIL_URL" => "",
        "SET_TITLE" => "Y",
        "SET_CANONICAL_URL" => "Y",
        "SET_BROWSER_TITLE" => "Y",
        "BROWSER_TITLE" => "-",
        "SET_META_KEYWORDS" => "Y",
        "META_KEYWORDS" => "-",
        "SET_META_DESCRIPTION" => "Y",
        "META_DESCRIPTION" => "-",
        "SET_STATUS_404" => "N",
        "SET_LAST_MODIFIED" => "Y",
        "INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
        "ADD_SECTIONS_CHAIN" => "Y",
        "ADD_ELEMENT_CHAIN" => "N",
        "ACTIVE_DATE_FORMAT" => "j F Y",
        "USE_PERMISSIONS" => "N",
        "GROUP_PERMISSIONS" => Array("1"),
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "3600",
        "CACHE_GROUPS" => "Y",
        "DISPLAY_TOP_PAGER" => "Y",
        "DISPLAY_BOTTOM_PAGER" => "Y",
        "PAGER_TITLE" => "Страница",
        "PAGER_TEMPLATE" => "",
        "PAGER_SHOW_ALL" => "Y",
        "PAGER_BASE_LINK_ENABLE" => "Y",
        "SET_STATUS_404" => "N",
        "SHOW_404" => "N",
        "MESSAGE_404" => "",
        "PAGER_BASE_LINK" => "",
        "PAGER_PARAMS_NAME" => "arrPager",
        "AJAX_OPTION_JUMP" => "N",
        "AJAX_OPTION_STYLE" => "Y",
        "AJAX_OPTION_HISTORY" => "N"
    )
);?>
<?
$newsFilter = array("!ID"=>$detailId);
$APPLICATION->IncludeComponent("bitrix:news.list","news_list",Array(
        "DISPLAY_DATE" => "Y",
        "DISPLAY_NAME" => "Y",
        "DISPLAY_PICTURE" => "Y",
        "DISPLAY_PREVIEW_TEXT" => "Y",
        "AJAX_MODE" => "N",
        "IBLOCK_TYPE" => "news",
        "IBLOCK_ID" => \Sat::getInstance()->IBLOCK[SITE_ID]["NEWS"],
        "NEWS_COUNT" => "20",
        "SORT_BY1" => "ACTIVE_FROM",
        "SORT_ORDER1" => "DESC",
        "SORT_BY2" => "SORT",
        "SORT_ORDER2" => "ASC",
        "FILTER_NAME" => "newsFilter",
        "FIELD_CODE" => Array("ID"),
        "PROPERTY_CODE" => Array("DESCRIPTION"),
        "CHECK_DATES" => "Y",
        "DETAIL_URL" => "",
        "PREVIEW_TRUNCATE_LEN" => "",
        "ACTIVE_DATE_FORMAT" => "j F Y",
        "SET_TITLE" => "Y",
        "SET_BROWSER_TITLE" => "Y",
        "SET_META_KEYWORDS" => "Y",
        "SET_META_DESCRIPTION" => "Y",
        "SET_LAST_MODIFIED" => "Y",
        "INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
        "ADD_SECTIONS_CHAIN" => "Y",
        "HIDE_LINK_WHEN_NO_DETAIL" => "Y",
        "PARENT_SECTION" => "",
        "PARENT_SECTION_CODE" => "",
        "INCLUDE_SUBSECTIONS" => "Y",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "3600",
        "CACHE_FILTER" => "Y",
        "CACHE_GROUPS" => "Y",
        "DISPLAY_TOP_PAGER" => "Y",
        "DISPLAY_BOTTOM_PAGER" => "Y",
        "PAGER_TITLE" => "Новости",
        "PAGER_SHOW_ALWAYS" => "Y",
        "PAGER_TEMPLATE" => "",
        "PAGER_DESC_NUMBERING" => "Y",
        "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
        "PAGER_SHOW_ALL" => "Y",
        "PAGER_BASE_LINK_ENABLE" => "Y",
        "SET_STATUS_404" => "N",
        "SHOW_404" => "N",
        "MESSAGE_404" => "",
        "PAGER_BASE_LINK" => "",
        "PAGER_PARAMS_NAME" => "arrPager",
        "AJAX_OPTION_JUMP" => "N",
        "AJAX_OPTION_STYLE" => "Y",
        "AJAX_OPTION_HISTORY" => "N",
        "AJAX_OPTION_ADDITIONAL" => ""
    )
);?>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>