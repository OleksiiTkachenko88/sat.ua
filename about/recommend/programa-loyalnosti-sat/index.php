<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("H2", "Найкращі вакансії для співшукачів роботи");
$APPLICATION->SetPageProperty("H1", "Вакансії");
$APPLICATION->SetPageProperty("description", "Вакансії - Інформація для клієнтів та партнерів транспортної компанії САТ | ☎ 0 800 30 99 09 (безкоштовно по Україні)");
$APPLICATION->SetTitle("Вакансії | Транспортна компанія “САТ”");
?>
<?
function getInfo ($key, $arr = array()) {
    return (is_array($arr) && isset($arr[$key])) ? $arr[$key] : '';
}
$track = array();
$track_error = array();
function remove_utf8_bom($text) {
    $bom = pack('H*','EFBBBF');
    $text = preg_replace("/^$bom/", '', $text);
    return $text;
}
                $url = 'https://urm.sat.ua/openws/hs/api/v2.0/ma/nomenclature?';
                $tmp = file_get_contents($url);
                $tmp = remove_utf8_bom($tmp);
                $tmp2 = json_decode($tmp, TRUE);
                //print_r($tmp2);
                if ($tmp2['success'] && $tmp2['success'] != 'false' && !empty($tmp2['data'])) {
                    $out = '';
                    $data = isset($tmp2['data'][0]) ? $tmp2['data'][0] : array();
                    if (!empty($data)) {
                        $track['type'] = getInfo('type', $data);
                        $track['number'] = getInfo('number', $data);
                        $track['number_format'] = str_pad(number_format($track['number'], 0, '.', ' '), 11, '0', STR_PAD_LEFT);
						$track['sum'] = (getInfo('sum', $data))?getInfo('sum', $data):"0";
                        $track['status'] = getInfo('currentStatus', $data);
                        $track['weight'] = getInfo('weight', $data);
                        $track['width'] = getInfo('width', $data);
                        $track['length'] = getInfo('length', $data);
                        $track['height'] = getInfo('height', $data);
                        $track['HideSum'] = getInfo('HideSum', $data);

                        $track['volume'] = getInfo('volume', $data);
                        $track['cargoType'] = getInfo('cargoType', $data);
                        $track['seatsAmount'] = getInfo('seatsAmount', $data);

                        $track['from'] = getInfo('description', $data['rspFrom']);
                        $track['from_address'] = getInfo('address', $data['rspFrom']);
                        $track['from_ref'] = getInfo('ref', $data['rspFrom']);
                        $track['from_rsp_num'] = getInfo('number', $data['rspFrom']);
                        $track['from_date'] = getInfo('date', $data);
                        $track['from_type'] = trim(explode('-', $track['type'])[0]);

                        $track['to'] = getInfo('description', $data['rspTo']);
                        $track['to_address'] = getInfo('address', $data['rspTo']);
                        $track['to_ref'] = getInfo('ref', $data['rspTo']);
                        $track['to_rsp_num'] = getInfo('number', $data['rspTo']);
                        $track['to_date'] = getInfo('incomingDate', $data);
                        $track['to_type'] = trim(explode('-', $track['type'])[1]);


						if( $track['status']!=="Виданий отримувачу"):
							if( $track['status'] !== "Доставлено отримувачу"):
								($track['to_type'] == "двері")? $track['to_address'] = GetMessage("DELIVERY_TEXT_2"):$track['to_address'];
							else:
								($track['to_type'] == "двері")? $track['to_address'] = GetMessage("DELIVERY_TEXT_1"):$track['to_address'];
							endif;
						endif;
						$track['payer'] = getInfo('payerName', $data['payData'][0]);
                        $track['payer_sum'] = getInfo('sum', $data['payData'][0]);

                        $track['addServices'] = isset($data['addServices']) ? $data['addServices'] : array();
						/*add 19-11-2018 for UAPay*/
						$track['webTtnId'] = getInfo('ref', $data);
						$track['webLastOrderSum'] = getInfo('orderSum', $data['webPayData']['orderInformation']);
						$track['webLastOrderId'] = getInfo('orderId', $data['webPayData']['orderInformation']);
                        $track['webTtnSum'] = getInfo('ttnSum', $data['webPayData']['orderInformation']);
						/**/
						/*Electrum*/
						$track['codSum'] = getInfo('codSum', $data["codData"]);
						$track['commissionSum'] = getInfo('commissionSum', $data["codData"]);
						/*end Electrum*/
						/*commission uapay privat24*/
						$track['uapayCommission'] = getInfo('uapay', $data["webPayData"]["commission"]);
						$track['privat24Commission'] = getInfo('privat24', $data["webPayData"]["commission"]);
						/**/
                    }
                    $out = 'ok|' . $out;
					unset($track_error);
                } else {
                    $out = 'error|';
                    $track_error = 'error';
                }

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
                            <h1><?echo $APPLICATION->GetPageProperty("H1");?></h1><br>
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
								Розроблено компанією 
								<a target="_blank" href="https://rabota.ua/" rel="nofollow">rabota.ua</a> 
								спеціально для компанії 
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
<?$APPLICATION->IncludeComponent("bitrix:news.list", "btnbig", array(
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
		"IBLOCK_ID" => "21",
		"IBLOCK_TYPE" => "ua",
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
		"PARENT_SECTION" => "11",
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
		"COMPONENT_TEMPLATE" => "btnbig",
		"STRICT_SECTION_CHECK" => "N"
	),
	false,
	array(
	"ACTIVE_COMPONENT" => "Y"
	)
);?>

<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"btnsmalldown",
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
		"IBLOCK_ID" => "21",
		"IBLOCK_TYPE" => "ua",
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
		"PARENT_SECTION" => "12",
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
		"IBLOCK_ID" => "21",
		"IBLOCK_TYPE" => "ua",
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
		"PARENT_SECTION" => "13",
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