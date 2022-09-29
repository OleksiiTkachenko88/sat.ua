<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Вывод партнера");
?>

    <div class="single-new-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-content">
                    <div class="post-content">

<?
if(isset($_GET['utm_source'])):
	$code = stristr($_REQUEST["CODE"], '?utm_source', true);
	$APPLICATION->IncludeComponent(
		"bitrix:news.detail", 
		"partners", 
		array(
			"ACTIVE_DATE_FORMAT" => "d.m.Y",
			"ADD_ELEMENT_CHAIN" => "N",
			"ADD_SECTIONS_CHAIN" => "Y",
			"AJAX_MODE" => "N",
			"AJAX_OPTION_ADDITIONAL" => "",
			"AJAX_OPTION_HISTORY" => "N",
			"AJAX_OPTION_JUMP" => "N",
			"AJAX_OPTION_STYLE" => "Y",
			"BROWSER_TITLE" => "-",
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
			"ELEMENT_CODE" => $code,
			"ELEMENT_ID" => "",
			"FIELD_CODE" => array(
				0 => "",
				1 => "",
			),
			"IBLOCK_ID" => GetMessage("PARTNERS_ID"),
			"IBLOCK_TYPE" => "ru",
			"IBLOCK_URL" => "",
			"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
			"MESSAGE_404" => "",
			"META_DESCRIPTION" => "-",
			"META_KEYWORDS" => "-",
			"PAGER_BASE_LINK_ENABLE" => "N",
			"PAGER_SHOW_ALL" => "N",
			"PAGER_TEMPLATE" => ".default",
			"PAGER_TITLE" => "Страница",
			"PROPERTY_CODE" => array(
				0 => "",
				1 => "PRIORITY_CITIES",
				2 => "",
			),
			"SET_BROWSER_TITLE" => "Y",
			"SET_CANONICAL_URL" => "N",
			"SET_LAST_MODIFIED" => "N",
			"SET_META_DESCRIPTION" => "Y",
			"SET_META_KEYWORDS" => "Y",
			"SET_STATUS_404" => "N",
			"SET_TITLE" => "N",
			"SHOW_404" => "N",
			"USE_PERMISSIONS" => "N",
			"USE_SHARE" => "N",
			"COMPONENT_TEMPLATE" => "partners",
			"STRICT_SECTION_CHECK" => "N",
			"FILE_404" => SITE_DIR."redirect/404.php"
		),
		false
	);
else:
$APPLICATION->IncludeComponent(
	"bitrix:news.detail", 
	"partners", 
	array(
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"ADD_ELEMENT_CHAIN" => "N",
		"ADD_SECTIONS_CHAIN" => "Y",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"BROWSER_TITLE" => "-",
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
		"ELEMENT_CODE" => $_REQUEST["CODE"],
		"ELEMENT_ID" => "",
		"FIELD_CODE" => array(
			0 => "",
			1 => "",
		),
		"IBLOCK_ID" => GetMessage("PARTNERS_ID"),
		"IBLOCK_TYPE" => "ru",
		"IBLOCK_URL" => "",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"MESSAGE_404" => "",
		"META_DESCRIPTION" => "-",
		"META_KEYWORDS" => "-",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Страница",
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "PRIORITY_CITIES",
			2 => "",
		),
		"SET_BROWSER_TITLE" => "Y",
		"SET_CANONICAL_URL" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "Y",
		"SET_META_KEYWORDS" => "Y",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "Y",
		"USE_PERMISSIONS" => "N",
		"USE_SHARE" => "N",
		"COMPONENT_TEMPLATE" => "partners",
		"STRICT_SECTION_CHECK" => "N",
		"FILE_404" => SITE_DIR."redirect/404.php"
	),
	false
);
endif;
?>
                        
                    </div>
                      <!--<div class="show-hide text-center">
                        <a class="button-more hide-button"><span class="text">згорнути коментарі</span><span
                                class="arrow"><img
                                src="<?=SITE_TEMPLATE_PATH;?>/img/icons/arrow-black-up.png" alt=""></span></a>
                        <a class="button-more show-button hidden-button"><span
                                class="text">показати коментарі</span><span
                                class="arrow"><img
                                src="<?=SITE_TEMPLATE_PATH;?>/img/icons/arrow-black-down.png" alt=""></span></a>
                    </div>
                    <div class="comments-wrap">
                        <div class="comment clearfix">
                            <div class="user-prev">
                                <div class="round-user">
                                    <img src="<?=SITE_TEMPLATE_PATH;?>/img/text-images/user1.png" alt="">
                                </div>
                            </div>
                            <div class="comment-text">
                                <div class="clearfix">
                                    <div class="name">Сергій Семеренко</div>
                                    <div class="date">17.04.2017</div>
                                </div>
                                <div class="text">
                                    Как всем известно, благотворительность это древнейшая форма гуманитарного содействия
                                    или участия.
                                </div>
                            </div>
                        </div>
                        <div class="comment clearfix">
                            <div class="user-prev">
                                <div class="round-user">
                                    <img src="<?=SITE_TEMPLATE_PATH;?>/img/text-images/user2.png" alt="">
                                </div>
                            </div>
                            <div class="comment-text">
                                <div class="clearfix">
                                    <div class="name">Сергій Семеренко</div>
                                    <div class="date">17.04.2017</div>
                                </div>
                                <div class="text">
                                    Как всем известно, благотворительность это древнейшая форма гуманитарного содействия
                                    или участия.
                                </div>
                            </div>
                        </div>
                        <div class="comment clearfix">
                            <div class="user-prev">
                                <div class="round-user">
                                    <img src="<?=SITE_TEMPLATE_PATH;?>/img/text-images/user3.png" alt="">
                                </div>
                            </div>
                            <div class="comment-text">
                                <div class="clearfix">
                                    <div class="name">Сергій Семеренко</div>
                                    <div class="date">17.04.2017</div>
                                </div>
                                <div class="text">
                                    Как всем известно, благотворительность это древнейшая форма гуманитарного содействия
                                    или участия.
                                </div>
                            </div>
                        </div>
                        <div class="comment-form clearfix">
                            <div class="title">Додайте ваш коментар</div>
                            <div class="clearfix">
                                <div class="user-prev">
                                    <div class="round-user">
                                        <i class="fa fa-user" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <input type="text" placeholder="Ваше ім’я">
                            </div>
                            <textarea placeholder="Напишіть коментар..."></textarea>
                            <input type="submit" class="submit-button" value="коментувати">
                        </div>
                    </div>-->
                </div>
                <div class="col-xs-12 col-sm-6 col-aside">
                    <div class="border-block aside-page">
                        <div class="header clearfix">
                            <div class="img-wrap">
                                <img src="<?=SITE_TEMPLATE_PATH;?>/img/icons/icon-gray2.png" alt="">
                            </div>
                            <span><?echo getMessage("FOR_PARTNERS_UF");?></span>
                        </div>
						
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"leftnews",
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
		"NEWS_COUNT" => "7",
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

                        <div class="clearfix">
                            <a href="<?=SITE_DIR?>partners/" class="button-more"><span class="text"><?echo getMessage("FOR_PARTNERS_UF");?></span><span
                                    class="arrow"><img
                                    src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png" alt=""></span></a>
                        </div>
                    </div>
                </div>

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