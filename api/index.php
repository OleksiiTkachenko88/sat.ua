<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("title", "Портал для разработчиков API \"SAT\"");
?>
<div class="home-baner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/images/api-home-bg.png');">
</div>
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"api_main_menu", 
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
		"DISPLAY_DATE" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array(
			0 => "DETAIL_PICTURE",
			1 => "",
		),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => GetMessage("API_INDEX"),
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
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "TITLE",
			2 => "URL",
			3 => "",
		),
		"SET_BROWSER_TITLE" => "Y",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "Y",
		"SET_META_KEYWORDS" => "Y",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "Y",
		"SHOW_404" => "N",
		"SORT_BY1" => "ACTIVE_FROM",
		"SORT_BY2" => "SORT",
		"SORT_ORDER1" => "DESC",
		"SORT_ORDER2" => "ASC",
		"STRICT_SECTION_CHECK" => "N",
		"COMPONENT_TEMPLATE" => "api_main_menu"
	),
	false
);?>
<div class="home-center-content">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<h1 class="api-main-title"><?echo GetMessage("API_MAIN_H1");?></h1>
				<div class="border-block">
					<div class="content-block">
						<div class="row">
							<div class="col-md-6">
								<div class="item">
<?
$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "api_index_inc.php", Array(), Array(
    "MODE"      => "html",
    "NAME"      => "текста",
    "TEMPLATE"  => "text.php"
    ));
?>
								</div>
							</div>
							<div class="col-md-6">
								<div class="item">
									<div class="adaptive-wrap">
									   <iframe width="640" height="360" src="https://www.youtube.com/embed/hE8t6Tg36lg" frameborder="0" allowfullscreen></iframe>
									</div>
								</div>
							</div>
						</div>
						<div class="item">
<?
$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "api_index_steps_inc.php", Array(), Array(
    "MODE"      => "html",
    "NAME"      => "текста",
    "TEMPLATE"  => "text.php"
    ));
?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>