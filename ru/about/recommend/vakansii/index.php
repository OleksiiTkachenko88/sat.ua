<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("H1", "Вакансии");
$APPLICATION->SetPageProperty("H2", "Лучшие вакансии для всех соискателей работы");
$APPLICATION->SetPageProperty("description", "Вакансии - Информация для клиентов и партнеров транспортной компании САТ | ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (стоимость звонков согласно тарифов вашего оператора)");
$APPLICATION->SetTitle("Вакансии | Транспортная компания “САТ”");
?>
<style>
	.news-page {
		padding-top:0px;
	}
	.vacancy {
		display: inline-block; 
		width:25%; 
		height:100px;
		background-size: cover;
		margin-left:-1px;
		margin-right:-1px;
		margin-bottom: 5px;
		margin-top: 60px;
	 	transition: 0.5s;
		}
	.vacancy img {
		max-width:100%;
		padding:10%;
	}
	.vacancy:hover {
		padding:10px;

	}
	.strategy-post .post-content{margin-top:-300px; margin-bottom:35px;}
	.strategy-banner .strategy-banner-text {bottom:420px;}
	@media (max-width: 768px){.strategy-banner .strategy-banner-content{padding-top: 200px;}
	.strategy-post .post-content{margin-top:0px; margin-bottom:0;}
	.vacancy{margin-top:0px}
	}
	@media (max-width: 1340px){
		.vacancy{margin-top:70px}
	}

</style>

   <div class="strategy-banner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/img/vacancy.jpg');">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="strategy-banner-content">
                        <div class="strategy-banner-text clearfix">
                            <h1><?echo $APPLICATION->GetPageProperty("H1");?></h1>
                            <h2><?echo $APPLICATION->GetPageProperty("H2");?></h2>
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
								<span itemprop="title"><?echo $APPLICATION->GetPageProperty("H1");?>
								</span>
						</div>
						<section>
							<iframe id="RUAFRAME" frameborder="0" scrolling="no" src="https://rabota.ua/export/context/company.aspx?ntid=227085" style="width:100%;border:none;"></iframe>
							<script type="text/javascript" src="https://rabota.ua/export/context/company.js"></script>
							<div style="font-family: inherit; margin-top: 15px;">
								Разработано компанией 
								<a target="_blank" href="https://rabota.ua/" rel="nofollow">rabota.ua</a> 
								специально для компании 
								<a target="_blank" href="https://rabota.ua/company227085" rel="nofollow">SAT</a>
							</div>
						</section>
                    </div>
					<div class="vacancy">
						<a href="https://rabota.ua/ua/company227085?gclid=Cj0KCQiAgZTRBRDmARIsAJvVWAv1qOaVRaP1cELmOBiSUMool8Brdi2HTzSxV6SIEjh-G_Q7wsH-_pEaAsEJEALw_wcB" target="_blank" rel="nofollow">
							<img src="/upload/medialibrary/58a/58a4a2fe2a450d05560fe0a1955757e3.png" alt="rabotaua">
						</a>
					</div>
					<div class="vacancy">
						<a href="https://www.work.ua/jobs/by-company/11174/" target="_blank" rel="nofollow">
							<img src="/upload/medialibrary/9af/9af14c979d8187cde6019075de590259.png" alt="workua">
						</a>
					</div>
					<div class="vacancy">
						<a href="https://ua.jooble.org/" target="_blank" rel="nofollow">
							<img src='<?=SITE_TEMPLATE_PATH;?>/images/v_jooble.png' alt="jooble"></a>
					</div>
					<div class="vacancy">

						<a href="https://www.linkedin.com/company/10590942/" target="_blank" rel="nofollow">
							<img src="/upload/medialibrary/2d3/2d36aff786d50561bd3a68fe19941f68.png" alt="linkedin">
						</a>
					</div>
                </div>
            </div>
        </div>
    </div>
<div class="recommends-wrap">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-12">
				<div class="recommend-title">
					<div class="img-wrap">
						<img src="/bitrix/templates/sat_main/img/icons/icon-gray5.png" alt="">
					</div>
					<span><a href="<?=SITE_DIR;?>about/recommend/">SAT <?echo GetMessage("RECOMMEND");?></a></span>
				</div>
			</div>
			<div class="col-xs-12 col-md-9">
				<div class="row">
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"btnbig",
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
		"IBLOCK_ID" => "22",
		"IBLOCK_TYPE" => "ru",
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
		"PARENT_SECTION" => "14",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("URL",""),
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
		"SORT_ORDER2" => "DESC"
	)
);?>
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list", 
	"btnsmalldown", 
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
		"DISPLAY_BOTTOM_PAGER" => "Y",
		"DISPLAY_DATE" => "Y",
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
		"IBLOCK_ID" => "22",
		"IBLOCK_TYPE" => "ru",
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
		"PARENT_SECTION" => "15",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array(
			0 => "ALT",
			1 => "URL",
			2 => "",
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
		"COMPONENT_TEMPLATE" => "btnsmalldown",
		"STRICT_SECTION_CHECK" => "N"
	),
	false
);?>
					
				</div>
			</div>
			<div class="col-xs-12 col-md-3 custom-container right-column">
				<div class="custom-row">
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"btnsmallright",
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
		"IBLOCK_ID" => "22",
		"IBLOCK_TYPE" => "ru",
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
		"PARENT_SECTION" => "16",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("URL",""),
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
		"SORT_ORDER2" => "DESC"
	)
);?>
					
				</div>
			</div>
		</div>
	</div>
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>