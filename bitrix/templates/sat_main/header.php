<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?><?

use Bitrix\Main\Page\Asset;

$api_host = 'http://urm.sat.ua/api_proxy/api/proxy/';
$api_host = 'http://urm.sat.ua/openws/hs/api/v1.0/';

//Тест
$api_host_2 = 'https://xyz.sat.ua/postavka/hs/api/v1.0/';

//Прод
//$api_host_2 = 'https://urm.sat.ua/openws/hs/api/v1.0/';

IncludeTemplateLangFile(__FILE__);

$page_lang = SITE_DIR == '/ru/' ? 'ru' : 'ua';

?>
<!DOCTYPE html>
<html lang="<?echo SITE_DIR == '/' ? 'uk' : 'ru';?>">
<head>
	<?$APPLICATION->ShowHead();?>
    <meta http-equiv="X-UA-Compatible" content="IE=EDGE">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="google-site-verification" content="JSM7kv2laNsf8IXQKkxs32v-kdeYgHIBfY1pNL9-qUc" />
    <meta name="google-site-verification" content="0oxdDIY9BZMT7YW3erFAKnru_QF2eUw12T_wr4Sb238" />
    <meta name="google-site-verification" content="bbLo1agQogSiEwJ4hXjSZa6jyFciikQkdME1-gy_njo" />
    <meta name="cmsmagazine" content="f990972124b4bfba7a538e0d12fcc4c5" />
    <meta name="it-rating" content="it-rat-103daf83acc946394fc6ddd56bdde868" />
    <title><?$APPLICATION->ShowTitle()?></title>
<?
	/*start min*/
	/*
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/font-awesome.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/fonts.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/bootstrap.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/jquery.fancybox.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/owl.theme.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/owl.transitions.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/owl.carousel.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/flexslider.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/jquery-ui.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/jquery-ui.structure.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/jquery-ui.theme.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/jquery.datetimepicker.min.css");

$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/style.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/add.css");
*/
/*end min*/
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH . "/css/intime.css");
$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH ."/js/jquery-1.11.1.min.js");
$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH ."/js/lazyload.min.js");

?>
<link type="text/css" rel="stylesheet" href="/min/?g=20211207" />

	<script>
	$(document).ready(function(){
		$(document).on("click", ".order-form .results-row .order-button", function(e){
			e.preventDefault();
			var url = '<?=SITE_DIR;?>order/departure/';
			$("#simple_calc").attr("id", "simple_calc_ok").attr("action", url).submit();
		})
	})
	</script>
	<script>var api_lang = '<?echo getMessage("API_LANG");?>';</script>
	<script>var datepicker_lang = '<?echo getMessage("DATEPICKER_LANG");?>';</script>
	<script>var noResultInfo = '<?echo getMessage("NO_RESULT");?>';</script>

	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-MR78KTN');
	</script>
	<!-- End Google Tag Manager -->

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-15699898-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-15699898-1');
</script>
<!-- END Global site tag (gtag.js) - Google Analytics -->


  <!-- Facebook Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '890525521154138');
    fbq('track', 'PageView');
    fbq('track', 'ViewContent');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=2644773382440925&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Facebook Pixel Code -->

    <!--[if lte IE 8 ]>
    <link href="css/ie.css" rel="stylesheet"> <![endif]-->
    <!--[if lt IE 9]>
    <script>
        document.createElement('header');
        document.createElement('figure');
        document.createElement('section');
        document.createElement('main');
        document.createElement('aside');
        document.createElement('footer');
    </script>
    <![endif]-->


</head>
<body>

<!-- Шапка сверху с чат ботом-->

<? $APPLICATION->IncludeComponent(
  "bitrix:main.include",
  "",
  [
    "AREA_FILE_SHOW" => "file",
    "PATH" => SITE_TEMPLATE_PATH . "/include/social_shapka.php"
  ]
);?>

<div id="page-wrapper">
	<div id="panel"><?$APPLICATION->ShowPanel();?></div>
<header>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="clearfix header-inner">
                    <a class="nav-mobile-button">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </a>
                    <a href="<?= SITE_DIR ?>" class="logo">
                        <img src="<?=SITE_TEMPLATE_PATH?>/img/header-logo-text-bfon-white.png" alt="<?echo getMessage("ALT_MAIN_LOGO")?>">
                    </a>





<?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"maintop",
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "left",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "Y",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "top",
		"USE_EXT" => "N",
		"COMPONENT_TEMPLATE" => "maintop"
	),
	false
);?>

<?
$current_page = $APPLICATION->GetCurPage();
if($page_lang == "ua"):
$page = "/ru".$current_page;
elseif($page_lang == "ru"):
$current_page_arr = explode("/", $current_page);
unset($current_page_arr[1]);
$page = implode("/",$current_page_arr);
endif;
?>

<?
switch($page_lang):
		case "ru":
			$APPLICATION->AddHeadString('<link rel="alternate" href="https://'.$_SERVER["HTTP_HOST"].$current_page. '" hreflang="ru-UA">',true);
			$APPLICATION->AddHeadString('<link rel="alternate" href="https://'.$_SERVER["HTTP_HOST"].$page. '" hreflang="uk-UA">',true);
		break;
		case "ua":
			$APPLICATION->AddHeadString('<link rel="alternate" href="https://'.$_SERVER["HTTP_HOST"].$current_page. '" hreflang="uk-UA">',true);
			$APPLICATION->AddHeadString('<link rel="alternate" href="https://'.$_SERVER["HTTP_HOST"].$page. '" hreflang="ru-UA">',true);
		break;
endswitch;
?>
<a class="search-button"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/search.png"></a>
<a class="lang" href="<?echo $page?>" id="<?echo SITE_DIR == '/' ? 'UA' : 'RU';?>">
  <span class="lang-icon"><?echo SITE_DIR == '/' ? 'UA' : 'RU';?></span>
</a>

<? $APPLICATION->IncludeComponent(
	"bitrix:main.include",
	"",
	Array(
		"AREA_FILE_SHOW" => "file",
		"PATH" => SITE_TEMPLATE_PATH . "/include/social_header.php"
	)
);?>

                    <div class="order-form header-inputs-form hidden-block">
                      <div class="inner-form">
                        <div class="inputs-row clearfix simple_calc_row">
                          <div class="loader"></div>
                          <form id="simple_calc" action="#" method="post" class="clearfix">
								            <input type="hidden" name="action" value="simple_calc">
                            <div class="long-input-wrap input-wrap from-wrap">
                              <input type="text" class="required" placeholder="<?echo getMessage("ENTER_CITY_FROM");?>" data-napravlenie="from" autocomplete="off">
									            <input type="hidden" name="simple_calc_from_ref" value="">
                            </div>
                            <div class="long-input-wrap input-wrap to-wrap">
                              <input type="text" class="required" placeholder="<?echo getMessage("ENTER_CITY_TO");?>" data-napravlenie="to" autocomplete="off">
									            <input type="hidden" name="simple_calc_to_ref" value="">
                            </div>
                            <div class="short-input-wrap input-wrap weight-wrap">
                              <input type="text" class="required" placeholder="<?echo getMessage("WEIGHT_KG");?>" name="simple_calc_weight" autocomplete="off">
                            </div>
                            <input type="submit" class="order-button" value="<?echo getMessage("COUNT");?>">
                          </form>

                            <script>
                              (() => {
                                const onSubmitSimpleCalc = () => {
                                  gtag('event', 'simpleCalc', {'event_category': 'klik'});
                                };

                                const simpleCalc = document.getElementById('simple_calc');
                                simpleCalc.addEventListener('submit', onSubmitSimpleCalc);
                              })();
                            </script>
                        </div>

                        <div class="results-row clearfix" style="display:none;">
                          <div class="results">
                            <div class="result-item">
                              <img src="<?=SITE_TEMPLATE_PATH?>/img/icons/car-black.png" alt="">
                            </div>
                            <div class="result-item from-to">
                              <div>
                                <span id="simple_calc_from_text">Київ</span> - <span id="simple_calc_to_text">Кам'янець-Подiльский</span>
                              </div>
                            </div>
                            <div class="result-item border-result">
                              <div>
             jnjtytyj                   <span><span id="simple_calc_weight_text">500</span> кг</span>
                              </div>
                            </div>
                            <div class="result-item border-result">
                              <div>
                                <span><?= getMessage("FROM_PRICE");?> <span id="simple_calc_result_text">47 325</span> грн</span>
                              </div>
                            </div>
                          </div>
                          <input type="submit" class="order-button" value="<?= getMessage("MAKE_ORDER");?>"
                            onclick="gtag('event', 'simpleDeparture', {'event_category': 'klik'});"
                          >
                        </div>
                      </div>
                    </div>
                    <div class="track-form header-inputs-form hidden-block">
                        <div class="inner-form">
                            <div class="inputs-row clearfix simple_track_row"><div class="loader"></div><form id="simple_track" action="#" method="post" class="clearfix">
								<input type="hidden" name="action" value="simple_track">
                                <div class="long-input-wrap input-wrap track-wrap">
                                    <input type="text" placeholder="<?=getMessage("ENTER_DECLARATION_NUMBER");?>" class="required only_number" name="simple_track_number" autocomplete="off" maxlength="9">
                                </div>

                                <input type="submit" class="order-button" value="<?=getMessage("LOOK_FOR");?>"></form>
                            </div>
                            <div class="results-row clearfix" style="display:none;">
								<div id="simple_track_result">
                                  <div class="results">

                                    <div class="result-item from-to">
                                        <div><span>Кам'янець-Подiльский</span></div>
                                    </div>
                                    <div class="result-item border-result">
                                        <div>Вантаж видано отримувачу</div>
                                    </div>

                                  </div>
								</div>
								<form action="<?=SITE_DIR?>treking/tracking/" method="post">
									<input name="tm" value="" type="hidden">
									<input type="submit" class="order-button" value="<?=getMessage("SHOW_MORE");?>">
								</form>
                            </div>
                        </div>
                    </div>
                    <div class="search-form hidden-block">
                        <div class="search-input-wrap"><form action="<?=SITE_DIR?>search/" method="get">
                            <input type="text" placeholder="<?=getMessage("SEARCH_PLH");?>" name="q">
							<input type="submit" value="ok">
							</form>
                        </div>
                        <a class="close-search close-button">
                            <div>
                                <i class="rotate-left-i"></i>
                                <i class="hider-i"></i>
                                <i class="rotate-right-i"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
<?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"subtop",
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "dropdown",
		"DELAY" => "N",
		"MAX_LEVEL" => "2",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "subtop",
		"USE_EXT" => "N",
		"COMPONENT_TEMPLATE" => "subtop"
	),
	false
);?>
			</div>
		</div>
	</div>
</header>

<?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"mobiletop_multilevel",
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "mobiledropdown",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "mobile",
		"USE_EXT" => "N",
		"COMPONENT_TEMPLATE" => "mobiletop_multilevel"
	),
	false
);?>

<aside class="aside-panel aside-panel--left">
  <div class="buttons-wrap">
    <?
      $APPLICATION->IncludeFile(
        SITE_TEMPLATE_PATH . "/include/panel_left_btns_" . GetMessage("IBLOCK_TYPE") . "_inc.php",
        [],
        ['MODE' => 'text']
      );
    ?>
  </div>
</aside>

<aside class="aside-panel aside-panel--right">
  <div class="buttons-wrap">
    <?
      $APPLICATION->IncludeFile(
        SITE_TEMPLATE_PATH . "/include/panel_right_btns_" . GetMessage("IBLOCK_TYPE") . "_inc.php",
        [],
        ['MODE' => 'text']
      );
    ?>
  </div>
</aside>

<? $APPLICATION->IncludeComponent(
  "bitrix:main.include",
  "",
  [
    "AREA_FILE_SHOW" => "file",
    "PATH" => SITE_TEMPLATE_PATH . "/include/social_rigth.php"
  ]
);?>

<?
$page_class = '';
$showIntimeTracking = false;
switch(true) {
	case ($APPLICATION->GetCurDir() == SITE_DIR):
		$page_class = 'home-page show-apps-panel';
		$showIntimeTracking = true;
		break;
	case ($APPLICATION->GetCurDir() == SITE_DIR . 'departments/' || (stristr($APPLICATION->GetCurDir(), '/departments/') != false && !stristr($APPLICATION->GetCurDir(), SITE_DIR . 'departments/map/') !=false)):
		$page_class = 'news-page departments-list-page';
		break;
	case ($APPLICATION->GetCurDir() == SITE_DIR . 'departments/map/' || stristr($APPLICATION->GetCurDir(), SITE_DIR . 'departments/map/') !=false):
		$page_class = 'news-page departments-map-page';
		break;
	case ($APPLICATION->GetCurDir() == SITE_DIR . 'treking/tracking/' || stristr($APPLICATION->GetCurDir(), SITE_DIR . 'treking/tracking/') !=false):
		$page_class = 'news-page tracking-page show-apps-panel';
		$showIntimeTracking = true;
		break;
	case (stristr($APPLICATION->GetCurDir(), '/departments/map/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/about/strategy/') != false && $APPLICATION->GetCurDir() == SITE_DIR . 'about/strategy/'):
	case (stristr($APPLICATION->GetCurDir(), '/about/recommend/') != false && $APPLICATION->GetCurDir() == SITE_DIR . 'about/recommend/'):
	case (stristr($APPLICATION->GetCurDir(), '/about/contacts/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/partners/new/') != false):
		$page_class = 'news-page strategy-page';
		break;
	case (stristr($APPLICATION->GetCurDir(), '/international/') != false ):
		$page_class = 'news-page international-page';
		break;
	case (stristr($APPLICATION->GetCurDir(), '/about/') != false && $APPLICATION->GetCurDir() != SITE_DIR . 'about/'):
	case (stristr($APPLICATION->GetCurDir(), '/news/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/partners/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/search/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/order/calculation/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/order/departure/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/order/delivery/') != false):
    case (stristr($APPLICATION->GetCurDir(), '/indicators/') != false):
		$page_class = 'news-page';
		break;
	case (stristr($APPLICATION->GetCurDir(), '/offers/') != false || stristr($APPLICATION->GetCurDir(), '/cases/') != false):
		$page_class = 'news-page offers-list-page';
		break;
	default:
		$page_class = 'news-page strategy-page';
		break;
}
//for pagination
if(isset($_REQUEST["PAGEN_1"])):
	$APPLICATION->SetPageProperty("robots", "noindex, follow");
	$APPLICATION->AddHeadString('<link rel="canonical" href="https://'.$_SERVER["HTTP_HOST"].$current_page.'">',true);
endif;
?>
<section class="<?echo $page_class;?>">
