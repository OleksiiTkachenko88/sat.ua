<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?
$api_host = 'http://urm.sat.ua/api_proxy/api/proxy/';
$api_host_2 = 'http://urm.sat.ua/openws/hs/api/v1.0/';
IncludeTemplateLangFile(__FILE__);
?> 
<!DOCTYPE html>
<html lang="ru">
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
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/bootstrap.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/font-awesome.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/fonts.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/jquery-ui.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/jquery-ui.theme.min.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/style.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/add.css");
$APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH ."/css/api_style.css");
$APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH ."/js/jquery-1.11.1.min.js");
?>
	<script>var api_lang = '<?echo getMessage("API_LANG");?>';</script>
	<script>var datepicker_lang = '<?echo getMessage("DATEPICKER_LANG");?>';</script>
	<script>var noResultInfo = '<?echo getMessage("NO_RESULT");?>';</script>

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
                        <img src="<?=SITE_TEMPLATE_PATH?>/img/header-logo-api-text.png" alt="<?echo getMessage("ALT_API_LOGO")?>">
                    </a>
					
<?$APPLICATION->IncludeComponent(
	"bitrix:menu", 
	"api-maintop", 
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "left",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "top",
		"USE_EXT" => "N",
		"COMPONENT_TEMPLATE" => "api-maintop"
	),
	false
);?>

                    <a class="search-button"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/search.png" alt=""></a>

                    <div class="hot-line">
<?$APPLICATION->IncludeComponent(
	"bitrix:main.include",
	"",
	Array(
		"AREA_FILE_SHOW" => "file",
		"AREA_FILE_SUFFIX" => "inc",
		"EDIT_TEMPLATE" => "",
		"PATH" => SITE_TEMPLATE_PATH . "/include/top_phone_inc.php"
	)
);?>
                      
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
</header>
<nav class="mobile-nav">
    <a class="close-nav close-button">
        <div>
            <i class="rotate-left-i"></i>
            <i class="hider-i"></i>
            <i class="rotate-right-i"></i>
        </div>
    </a>
    <div class="mobile-nav-inner">
	
<?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"mobiletop",
	Array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "",
		"DELAY" => "N",
		"MAX_LEVEL" => "1",
		"MENU_CACHE_GET_VARS" => array(""),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "mobile",
		"USE_EXT" => "N"
	)
);?>
    </div>
</nav>
<?
$page_class = '';
switch(true) {
	case ($APPLICATION->GetCurDir() == SITE_DIR. "api/"):
		$page_class = 'api-page home-page';
		break;
	case (stristr($APPLICATION->GetCurDir(), '/api/methods/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/api/news/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/api/integration/') != false):
	case (stristr($APPLICATION->GetCurDir(), '/api/search/') != false):
		$page_class = 'api-page api-news-page news-page';
		break;
	case (stristr($APPLICATION->GetCurDir(), '/api/registration/') != false):
		$page_class = 'api-page registration-page';
		break;
	default:
		$page_class = 'api-page news-page strategy-page';
		break;
}
?>
<section class="<?echo $page_class;?>">
</head>
