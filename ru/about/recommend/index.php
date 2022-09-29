<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "SAT рекомендует - Транспортная компания “САТ” | ВЫГОДНО! НАДЕЖНО! ВОВРЕМЯ! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (стоимость звонков согласно тарифов вашего оператора)");
$APPLICATION->SetPageProperty("title", "SAT рекомендует | Транспортная компания “САТ”");
$APPLICATION->SetTitle("SAT рекомендует");
?>

<div class="strategy-banner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/img/strategy-banner.jpg');">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="strategy-banner-content">
                        <div class="strategy-banner-text clearfix">
                            <h1><?echo $APPLICATION->GetDirProperty("H1");?></h1>
                            <h2><?echo $APPLICATION->GetDirProperty("H2");?></h2>
                            <!--<a class="submit-button" href="<?echo $APPLICATION->GetDirProperty("BTN_URL");?>"><?echo $APPLICATION->GetDirProperty("BTN_TEXT");?></a>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="strategy-post">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="post-content">
					<div class="breadcrumbs">
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<a itemprop="url" href="<?echo SITE_DIR;?>"> 
								<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
						</span>
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<a itemprop="url" href="<?echo (SITE_DIR."".$APPLICATION->GetDirProperty("PARENT_DIR"));?>"> 
								<span itemprop="title"><?echo $APPLICATION->GetDirProperty("PARENT_H1");?></span> </a>| 
						</span>
						<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
							<span itemprop="title"><?echo $APPLICATION->GetDirProperty("H1");?></span> 
						</span>
					</div>
<?
$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "index_inc.php", Array(), Array(
    "MODE"      => "html",
    "NAME"      => "текста",
    "TEMPLATE"  => "text.php"
    ));
?>
                        
                        <a class="link-more show-full-text"><?=getMessage("READ_ALL")?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="news-list-wrapper">
        <div class="container">
            <div class="row">

<?
$real_title = $APPLICATION->getTitle();
$APPLICATION->SetTitle('SAT ' . getMessage("RECOMMEND"));
$APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"listrecommendnews", 
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
		"DISPLAY_BOTTOM_PAGER" => "N",
		"DISPLAY_DATE" => "N",
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
		"IBLOCK_ID" => GetMessage("RECOMMEND_ID"),
		"IBLOCK_TYPE" => "-",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => "blog",
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
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "DESC",
		"COMPONENT_TEMPLATE" => "listrecommendnews"
	),
	false
);
//$APPLICATION->SetTitle($real_title);
?>

            </div>
        </div>
    </div>

    <div class="home-center-content">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6">
                    <div class="border-block">
                        <div class="header clearfix">
                            <div class="img-wrap">
                                <img src="<?=SITE_TEMPLATE_PATH;?>/img/icons/icon-gray15.png" alt="">
                            </div>
                            <span><?echo getMessage("CASES");?></span>
                        </div>
                        <div class="wide-new content-inner">
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"innercase",
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
		"IBLOCK_ID" => GetMessage("CASES_ID"),
		"IBLOCK_TYPE" => GetMessage("IBLOCK_TYPE"),
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "1",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => "blog",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("VIDEO",""),
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
);?>
                        </div>
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-6">
                    <div class="border-block">
                        <div class="header clearfix">
                            <div class="img-wrap">
                                <img src="<?=SITE_TEMPLATE_PATH;?>/img/icons/icon-gray3.png" alt="">
                            </div>
                            <span><?echo getMessage("FOR_PARTNERS_UF");?></span>
                        </div>
                        <div class="wide-new content-inner">
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"innerpartner",
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
		"IBLOCK_ID" => GetMessage("PARTNERS_ID"),
		"IBLOCK_TYPE" => GetMessage("IBLOCK_TYPE"),
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "1",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => "blog",
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
		"SORT_ORDER2" => "DESC"
	)
);?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>