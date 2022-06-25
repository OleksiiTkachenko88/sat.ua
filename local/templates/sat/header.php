<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
IncludeTemplateLangFile(__FILE__);
$APPLICATION->RestartBuffer();
?>
<!DOCTYPE html>
<html lang="<?=SITE_ID?>">
<head>

    <meta charset="UTF-8">
    <?//<meta http-equiv="X-UA-Compatible" content="IE=edge">?>

    <title><?$APPLICATION->ShowTitle()?></title>
    <?//<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">?>
    <meta name="viewport" content="width=640">

    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCufEmth-1bERYkpzAUgHDzmM6Bi1dRLoo"></script>
    <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
        
    <link rel="icon" href="<?=MARKUP?>/favicon.png" type="image/png" />

	<?
    	$APPLICATION->ShowHead();
		$asset = Bitrix\Main\Page\Asset::getInstance();

		\CJSCore::Init(array('ajax'));
        
        $asset->addCss(MARKUP.'/styles/app.min.css');
		$asset->addJs(MARKUP .'/scripts/app.min.js');
		
        $asset->addCss('/local/templates/sat/assets/lib/flatpickr/flatpickr.min.css');
    	$asset->addJs('/local/templates/sat/assets/lib/flatpickr/flatpickr.min.js');
    	$asset->addJs('/local/templates/sat/assets/lib/flatpickr/locale/ru.js');
    	
    	$asset->addJs('/local/templates/sat/assets/lib/lscache.min.js');    	
    	
/*
    	$asset->addCss('/local/templates/sat/assets/lib/jquery-ui/jquery-ui.css');
    	$asset->addCss('/local/templates/sat/assets/lib/jquery-ui/jquery-ui.structure.css');
    	$asset->addCss('/local/templates/sat/assets/lib/jquery-ui/jquery-ui.theme.min.css');
*/


//         $asset->addJs('/local/templates/sat/assets/lib/datepicker.js');
//         $asset->addJs('/local/templates/sat/assets/lib/malihu-custom-scrollbar-plugin-3.1.5/jquery.mCustomScrollbar.js');


	    //$asset->addCss('/local/templates/sat/assets/lib/select2/dist/css/select2.min.css');
	    $asset->addJs('/local/templates/sat/assets/lib/typeahead.js/typeahead.bundle.js');
	    $asset->addJs('/local/templates/sat/assets/lib/typeahead.js/bloodhound.min.js');
					   
        $asset->addCss('/local/templates/sat/assets/lib/fancybox/source/jquery.fancybox.css?v=2.1.5');
    	$asset->addJs('/local/templates/sat/assets/lib/fancybox/source/jquery.fancybox.pack.js?v=2.1.5');

		$asset->addJs('/local/js/calculator.js');
		$asset->addJs('/local/js/map.js');	    
		
        $asset->addJs('/local/js/scripts.js');

	?>
<script>

	
	$(document).ready(function(){	
		$('#js_show_calculator').click(function(){
			$("#mini_calc_new").toggleClass('is-active').toggle();
			
			$("#mini_tracking").removeClass('is-active').hide();
		});
		
		$('#js_tracking').click(function(){
			$("#mini_tracking").toggleClass('is-active').toggle();
			
			$("#mini_calc_new").removeClass('is-active').hide();
		});

	});	
			/*
$(document).on("click",function(event){
				if(check_touch(event)==1){
					return false;
				}else{
					if(event["target"]["id"]=="js_show_calculator"  ){				
						$("#mini_calc_new").toggleClass('is-active');
					}
					
					if(event["target"]["id"]!="mini_calc_new" && event["target"]["id"]!="js_show_calculator"){
						$("#mini_calc_new").removeClass('is-active');
					}
					
					
					if(event["target"]["id"]=="js_tracking" ){				
						$("#mini_tracking").toggleClass('is-active');
					}
					
					if(event["target"]["id"]!="mini_tracking" && event["target"]["id"]!="js_tracking"){
						$("#mini_tracking").removeClass('is-active');
					}	
					
					if(event["target"]["id"]!="search"){
						$(".page__navbar-header").next('.page__navbar-header--search').removeClass('is-expand');				
					}
				}
			
				
			});	
			
			function check_touch(element){
			
				if(element["target"].toString().indexOf("Rect")>=0){
					return 1;
				}else if(element["target"].toString().indexOf("Input")>=0){
					return 1;
				}else if(element["target"].toString().indexOf("Paragraph")>=0){
					return 1;
				}else if(element["target"]["className"].toString().indexOf("js_no_touch")>=0){
					return 1;
				}else{
					return 0;
				}
			}
*/
		</script>
		
		<style>
            .minicalculator{
        		margin-top: -40px;
    		}
			.is-active{
				display:block !important;
			}
		</style>		
		
</head>
<?	
	$page_id	= '';
	$map_template	= 'contacts_map';
	
	if($APPLICATION->GetCurDir() == "/" || $APPLICATION->GetCurDir() == SITE_DIR.'/')
	{
		$page_class 	= 'page--layout-main page--index';
		$page_id		= 'page-index2';
		$page_content_class 	= 'page_home';
	}
	if(CSite::InDir(SITE_DIR.'/page/'))
	{
		$page_class 	= 'page--layout-main page--index';
		$page_id		= 'page_strateg';
		$page_content_class = 'page_strategy';
		$container_fluid_id	= 'panel_body';
	}
	if(CSite::InDir(SITE_DIR.'/news/'))
	{
		$page_class 		= 'page--layout-side';
		$page_id			= 'page_news';
		$container_fluid_id	= 'cont_news';
		$page_content_class = 'page_news';
		
	}
	if(CSite::InDir(SITE_DIR.'/action/'))
	{
		$page_class 	 = 'page--layout-side';
		$page_id			= 'page_news';
		$container_fluid_id	= 'cont_news';
	}
	if(CSite::InDir(SITE_DIR.'/departments/map/'))
	{
		$page_class 	 = 'page--layout-main page--layout-main--map';
		$map_page		 		= true;
		$GLOBALS['map_page']	= true;
		$departments_map		= true;
		$map_template			= 'departments_map';
	}
	if(CSite::InDir(SITE_DIR.'/contacts/'))
	{
		$page_class 		 		= 'page--layout-main page--layout-main--map';
		$contacts_page		 		= true;
		$GLOBALS['contacts_page']	= true;
		$GLOBALS['map_page']		= true;
		$page_id					= 'page_contact';
	}
    if(CSite::InDir(SITE_DIR.'/calculator/'))
	{
		$page_class 	 			= 'page--layout-main page--layout-main--map';
		$calculator_page 			= true;
		$GLOBALS['map_page']		= true;
		$page_id					= 'page_calculat';
		$map_template				= 'calculator_map';
	}
	if(CSite::InDir(SITE_DIR.'/tracking/'))
	{
		$page_class 	 			= 'page--layout-main page--layout-main--map';
		$calculator_page 			= true;
		$GLOBALS['map_page']		= true;
	}
?>
<body class="page  <?=$page_class?>">
<?$APPLICATION->ShowPanel();?>
	<div class="page <?=$page_class?>">
		<div id="<?=$page_id?>" class="page__content <?=$page_content_class?>">
			<header data-uk-sticky="{top:-40}" class="page__header">
				<div id="page-cont" class="container-fluid page__header-container">
					<div class="page__header-container-inner">
						<nav class="navbar nav_logo navbar--header page__navbar-header">
						<div class="navbar__primary-content nav_new">
							<a href="#mobile_menu" data-uk-offcanvas="{mode:'slide'}" class="navbar__button-icon navbar__button-icon--menu">
								<i class="icon"></i>
							</a>
							<a href="/" class="navbar__brand">
								<span class="navbar__brand-space"></span>
								<img src="<?=MARKUP?>/images/sat-logo-mobile.png" alt="" width="161" height="62" class="navbar__brand-logo-mobile">
								<img src="<?=MARKUP?>/images/sat-logo-desktop.png" alt="" width="242" height="91" class="navbar__brand-logo-desktop">
							</a>
														<?$APPLICATION->IncludeComponent(
				                "bitrix:menu",
				                "top",
				                Array(
				                    "ROOT_MENU_TYPE" => "top",
				                    "MAX_LEVEL" => "1",
				                    "CHILD_MENU_TYPE" => "top",
				                    "USE_EXT" => "Y",
				                    "DELAY" => "A",
				                    "ALLOW_MULTI_SELECT" => "Y",
				                    "MENU_CACHE_TYPE" => "Y",
				                    "MENU_CACHE_TIME" => "3600",
				                    "MENU_CACHE_USE_GROUPS" => "Y",
				                    "MENU_CACHE_GET_VARS" => ""
				                )
				            );?>							
						</div>

						<div class="navbar__secondary-content">
							<div class="navbar__phone-wrapper">
								<?$APPLICATION->IncludeComponent(
				                    "bitrix:main.include",
				                    "",
				                    Array(
				                        "AREA_FILE_SHOW" => "file",
				                        "PATH" => SITE_DIR."/include/hot_line_header.php",
				                    )
				                );?>
							</div>
							<a href="" class="navbar__button-icon navbar__button-icon--entry">
								<i class="icon"></i>
							</a>

							<?//=$APPLICATION->GetCurPage(false);?>
							<?
								$language_change		= array('/ru' => '/ua', '/ua' => '/ru');
								$change_language_link	= str_replace(SITE_DIR, $language_change[SITE_DIR], $APPLICATION->GetCurPage(false));
							?>
							<? if(SITE_ID == 'ua') { ?>
								<a href="<?=$change_language_link?>" class="navbar__button-icon navbar__button-icon--lang">
									<span>ua</span>
								</a>
							<? } else { ?>
								<a href="<?=$change_language_link?>" class="navbar__button-icon navbar__button-icon--lang">
									<span>ru</span>
								</a>
							<? } ?>


							<a href="" class="navbar__button-icon navbar__button-icon--search js-toggle-search">
								<i class="icon"></i>
							</a>

						</div>
					</nav>
											
						<div class="navbar navbar--header page__navbar-header page__navbar-header--search">
						<form action="<?=SITE_DIR?>/search/" class="navbar__primary-content">
							<i class="icon icon--search-accent navbar__icon"></i>
							<div class="navbar__search uk-width-1-1">
								<input name="q" type="text" placeholder="Пошук надпоштових можливостей" class="form-control uk-width-1-1 navbar__search-form-control">
							</div>
							<span class="navbar__button-icon navbar__button-icon--close js-close">
								<i class="icon"></i>
							</span>
						</form>
					</div>
						
						<div id="mini_calc_new"  class="mini_calc" >
								<!--<div class="transparency"></div>
								<svg> 

								<rect x="0" y="0" height="300" width="1900" fill="rgb(177,182,182)" fill-opacity="0.8" />
								</svg>-->
								<div class="row_top js_no_touch">
									<div class="start_calc js_no_touch" style="background-image:url(<?=MARKUP?>/images/white_fon.png);">
										<input type="text" placeholder="Введіть місто відправлення" class="calc_form_start">
										<div class="img_start js_no_touch"><img class='js_no_touch' src="<?=MARKUP?>/images/svg/start.svg"></div>
										<img class="krest js_no_touch" src="<?=MARKUP?>/images/krest.png">
									</div>
									<div class="finish_calc js_no_touch" style="background-image:url(<?=MARKUP?>/images/white_fon.png);">
										<input type="text" placeholder="Кам'янець-Подiльский" class="calc_form_finish">
										<div class="img_finish js_no_touch"><img class='js_no_touch' src="<?=MARKUP?>/images/svg/finish.svg"></div>
										<img class="krest js_no_touch" src="<?=MARKUP?>/images/krest.png">
									</div>
									<div class="weight_calc js_no_touch" style="background-image:url(<?=MARKUP?>/images/white_fon.png);">
										<input type="text" placeholder="500 кг" class="calc_form_weight">
										<div class="img_weight js_no_touch"><img class='js_no_touch' src="<?=MARKUP?>/images/svg/weight.svg"></div>
									</div>
									<div class="butt_enter"><a class="a_enter" href="#"><p>розрахувати</p></a></div>
								</div>
								<div class="clear"></div>
								<div class="row_bottom js_no_touch">
									<div class="img_car js_no_touch"><img class='js_no_touch' src="<?=MARKUP?>/images/svg/car.svg"></div>
									<p class="otpr js_no_touch">Отправка</p>
									<p class="itog"> Чоп - Кам'янець-Подiльский</p>  <p class="ves"> 500 кг  </p> <p class="summ"> от  47 325 грн </p>
									<div class="enter_zamov"><a class="a_zamov" href="#"><p>оформити замовлення</p></a></div>
								</div>
							</div>
							
						<div class="mini_track tracking" id="mini_tracking" >
								<!--<div class="transparency"></div>
								<svg> 

								<rect x="0" y="0" height="470" width="1900" fill="rgb(177,182,182)" fill-opacity="0.8" />
								</svg>-->
								<div class="numm_decl js_no_touch">
									<img class="trek js_no_touch" src="<?=MARKUP?>/images/trek.png">
									<input type="text" placeholder="Вкажіть номер декларації" class="trek_form">									
								</div>
								<div class="but_sled"><a class="a_sled" href="#"><p>Отследить</p></a></div>
								<div class="div_recive js_no_touch"><img class="recive js_no_touch" src="<?=MARKUP?>/images/svg/man_recive.svg"></div>
								<p class="city_sled">Кам'янець-Подiльский</p>
								<div class="vydacha js_no_touch">									
									<p class="trek_vydacha">Вантаж видано отримувачу</p>									
								</div>
								<div class="but_podrobn"><a class="a_podrobn" href="#"><p>Подробнее</p></a></div>
							</div>
						
						<div class="mini_track tracking" id="mini_tracking1">
								<!--<div class="transparency"></div>
								<svg> 

								<rect x="0" y="0" height="470" width="1900" fill="rgb(177,182,182)" fill-opacity="0.8" />
								</svg>-->
								<div class="numm_decl js_no_touch">
									<img class="trek js_no_touch" src="<?=MARKUP?>/images/trek.png">
									<input type="text" placeholder="Вкажіть номер декларації" class="trek_form">									
								</div>
								<div class="but_sled"><a class="a_sled" href="#"><p>Отследить</p></a></div>
								<div class="div_recive1 js_no_touch">
									<div class="fon_track1 js_no_touch"><img class="car_track1 js_no_touch" src="<?=MARKUP?>/images/car_track.png"></div>
									<p class="city1">Чоп</p>
									<p class="city2">Кам'янець-Подiльский</p>
								</div>
								
								<div class="vydacha js_no_touch">									
									<p class="trek_vydacha">Вантаж знаходиться у місці призначення</p>									
								</div>
								<div class="but_podrobn"><a class="a_podrobn" href="#"><p>Подробнее</p></a></div>
							</div>
						
						<div class="mini_track tracking" id="mini_tracking2" >
								<!--<div class="transparency"></div>

								<rect x="0" y="0" height="470" width="1900" fill="rgb(177,182,182)" fill-opacity="0.8" />
								</svg>-->
								<div class="numm_decl js_no_touch">
									<img class="trek js_no_touch" src="<?=MARKUP?>/images/trek.png">
									<input type="text" placeholder="Вкажіть номер декларації" class="trek_form">									
								</div>
								<div class="but_sled"><a class="a_sled" href="#"><p>Отследить</p></a></div>
								<div class="div_recive2 js_no_touch">
									<div class="fon_track2 js_no_touch"><img class="car_track2 js_no_touch" src="<?=MARKUP?>/images/car_track.png"></div>
									<p class="city1">Чоп</p>
									<p class="city2" style="color:#FFD64A; background:#1E3E6C">Кам'янець-Подiльский</p>
								</div>
								
								<div class="vydacha js_no_touch">									
									<p class="trek_vydacha">Вантаж перебуває у дорозі</p>									
								</div>
								<div class="but_podrobn"><a class="a_podrobn" href="#"><p>Подробнее</p></a></div>
							</div>
										
						<div class="mini_track tracking" id="mini_tracking3" >
								<!--<div class="transparency"></div>
								<svg> 

								<rect x="0" y="0" height="470" width="1900" fill="rgb(177,182,182)" fill-opacity="0.8" />
								</svg>-->
								<div class="numm_decl js_no_touch">
									<img class="trek js_no_touch" src="<?=MARKUP?>/images/trek.png">
									<input type="text" placeholder="Вкажіть номер декларації" class="trek_form">									
								</div>
								<div class="but_sled "><a class="a_sled" href="#"><p>Отследить</p></a></div>
								<div class="div_recive3 js_no_touch">
									<div class="fon_track3 js_no_touch"><img class="car_track3 js_no_touch" src="<?=MARKUP?>/images/car_track.png"></div>
									<p class="city1">Чоп</p>
									<p class="city2" style="color:#FFD64A;background:#1E3E6C">Кам'янець-Подiльский</p>
								</div>
								
								<div class="vydacha js_no_touch">									
									<p class="trek_vydacha">Вантаж знаходиться у місці відправлення</p>									
								</div>
								<div class="but_podrobn"><a class="a_podrobn" href="#"><p>Подробнее</p></a></div>
							</div>
						
						<div class="mini_track tracking" id="mini_tracking4" >
								<!--<div class="transparency"></div>
								<svg> 

								<rect x="0" y="0" height="470" width="1900" fill="rgb(177,182,182)" fill-opacity="0.8" />
								</svg>-->
								<div class="numm_decl js_no_touch">
									<img class="trek js_no_touch" src="<?=MARKUP?>/images/trek.png">
									<input type="text" placeholder="Вкажіть номер декларації" class="trek_form">									
								</div>
								<div class="but_sled"><a class="a_sled" href="#"><p>Отследить</p></a></div>
								
							</div>						
					</div>
				</div>
				<div id="mobile_menu" class="uk-offcanvas">
					<div class="uk-offcanvas-bar uk-offcanvas-bar--menu">
						<ul class="uk-nav uk-nav-offcanvas uk-nav-offcanvas--menu">
							<li>
								<a href="<?=SITE_DIR?>/">Главная</a>
							</li>
							<li>
								<a href="<?=SITE_DIR?>/about/">Компания SAT</a>
							</li>
							<li <?//class="uk-active"?>>
								<a href="<?=SITE_DIR?>/tracking/">Трекинг</a>
							</li>
							<li>
								<a href="<?=SITE_DIR?>/calculator/">Замовити</a>
							</li>
							<li>
								<a href="<?=SITE_DIR?>/contacts/">Контакти</a>
							</li>
							<li class="uk-nav-header">Помощь онлайн</li>
							<li class="phone">
								<a href="/local/ajax/form/callback.php" class="fancybox fancybox.ajax " title="">
									<i class="icon"></i>
								</a>
							</li>
							<li class="email">
								<a href="/local/ajax/form/write_to_us.php" class="fancybox fancybox.ajax " >
									<i class="icon"></i>
								</a>
							</li>
							<?/*
<li class="chat">
								<a href="#">
									<i class="icon"></i>
								</a>
							</li>
*/?>
						</ul>
					</div>
				</div>
			</header>
			
			<? if(($APPLICATION->GetCurDir() == "/" || $APPLICATION->GetCurDir() == SITE_DIR.'/') && !defined('ERROR_404')) { ?>
				<?$APPLICATION->IncludeComponent("bitrix:news.list","banners_on_main",Array(
				        "DISPLAY_DATE" => "Y",
				        "DISPLAY_NAME" => "Y",
				        "DISPLAY_PICTURE" => "Y",
				        "DISPLAY_PREVIEW_TEXT" => "Y",
				        "AJAX_MODE" => "N",
				        "IBLOCK_TYPE" => SITE_ID,
				        "IBLOCK_ID" => \Sat::getInstance()->IBLOCK[SITE_ID]["BANNERS"],
				        "NEWS_COUNT" => "15",
				        "SORT_BY1" => "ACTIVE_FROM",
				        "SORT_ORDER1" => "DESC",
				        "SORT_BY2" => "SORT",
				        "SORT_ORDER2" => "ASC",
				        "FILTER_NAME" => "",
				        "FIELD_CODE" => Array("ID"),
				        "PROPERTY_CODE" => Array("LINK"),
				        "CHECK_DATES" => "Y",
				        "DETAIL_URL" => "",
				        "PREVIEW_TRUNCATE_LEN" => "",
				        "ACTIVE_DATE_FORMAT" => "j F Y",
				        "SET_TITLE" => "N",
				        "SET_BROWSER_TITLE" => "N",
				        "SET_META_KEYWORDS" => "N",
				        "SET_META_DESCRIPTION" => "N",
				        "SET_LAST_MODIFIED" => "N",
				        "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
				        "ADD_SECTIONS_CHAIN" => "N",
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
			<? }?>
			<? if(isset($_REQUEST['PAGE_ELEMENT_CODE'])) { ?>
				<?$APPLICATION->IncludeComponent(
					"bitrix:news.detail",
					"page_detail_slider",
					Array(
						"ACTIVE_DATE_FORMAT" => "j M Y",
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
						"ELEMENT_CODE" => $_REQUEST["PAGE_ELEMENT_CODE"],
						"ELEMENT_ID" => $_REQUEST["ELEMENT_ID"],
						"FIELD_CODE" => array("NAME","PREVIEW_TEXT","PREVIEW_PICTURE","DETAIL_TEXT","DETAIL_PICTURE",""),
						"FILE_404" => "",
						"IBLOCK_ID" => \Sat::getInstance()->IBLOCK[SITE_ID]["PAGE_BANNER"],
						"IBLOCK_TYPE" => SITE_ID,
						"IBLOCK_URL" => "",
						"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
						"MESSAGE_404" => "",
						"META_DESCRIPTION" => "-",
						"META_KEYWORDS" => "-",
						"PAGER_BASE_LINK_ENABLE" => "N",
						"PAGER_SHOW_ALL" => "N",
						"PAGER_TEMPLATE" => ".default",
						"PAGER_TITLE" => "Страница",
						"PROPERTY_CODE" => array("IMAGES", "SUBTITLE", "SUBTITLE2"),
						"SET_BROWSER_TITLE" => "Y",
						"SET_CANONICAL_URL" => "N",
						"SET_LAST_MODIFIED" => "N",
						"SET_META_DESCRIPTION" => "Y",
						"SET_META_KEYWORDS" => "Y",
						"SET_STATUS_404" => "Y",
						"SET_TITLE" => "Y",
						//"SHOW_404" => "Y",
						"USE_PERMISSIONS" => "N",
						"USE_SHARE" => "N"
					)
				);?>
							
			<? } ?>
			
			<nav id="sidenav" class="sidenav hidden-md-down">
				<a href="<?=SITE_DIR?>/calculator/" class="sidenav__link sidenav__link--calc is-fade">
					<span class="sidenav__pointer">Калькулятор</span>
					<i class="icon sidenav__icon"></i>
				</a>
				<a href="<?=SITE_DIR?>/calculator/#doors" class="sidenav__link sidenav__link--truck is-fade">
					<span class="sidenav__pointer">Калькулятор</span>
					<i class="icon sidenav__icon"></i>
				</a>
				<a href="<?=SITE_DIR?>/tracking/" class="sidenav__link sidenav__link--cargo is-fade">
					<span class="sidenav__pointer">Отслеживание</span>
					<i class="icon sidenav__icon"></i>
				</a>
				<a href="<?=SITE_DIR?>/departments/map/" class="sidenav__link sidenav__link--map is-fade">
					<span class="sidenav__pointer">Отделения</span>
					<i class="icon sidenav__icon"></i>
				</a>
				<a href="/local/ajax/form/callback.php" class="fancybox fancybox.ajax sidenav__link sidenav__link--phone">
					<span class="sidenav__pointer">Обратная связь</span>
					<i class="icon sidenav__icon"></i>
				</a>
				<a  href="/local/ajax/form/write_to_us.php" class="fancybox fancybox.ajax sidenav__link sidenav__link--mail">
					<span class="sidenav__pointer">Написать письмо</span>
					<i class="icon sidenav__icon"></i>
				</a>
				<a href="" class="sidenav__link sidenav__link--chat">
					<span class="sidenav__pointer">Помощь онлайн</span>
					<i class="icon sidenav__icon"></i>
				</a>
				<a href="" class="sidenav__link sidenav__link--entry active">
					<span class="sidenav__pointer">Текст</span>
					<i class="icon sidenav__icon"></i>
				</a>

			</nav>
			<? if($map_page == true || $contacts_page == true) { ?>
			
				<?$APPLICATION->IncludeComponent("bitrix:news.list", $map_template,Array(
				        "DISPLAY_DATE" => "Y",
				        "DISPLAY_NAME" => "Y",
				        "DISPLAY_PICTURE" => "Y",
				        "DISPLAY_PREVIEW_TEXT" => "Y",
				        "AJAX_MODE" => "N",
				        "IBLOCK_TYPE" => SITE_ID,
				        "IBLOCK_ID" => \Sat::getInstance()->IBLOCK[SITE_ID]["DEPARTMENT"],
				        "NEWS_COUNT" => "100",
				        "SORT_BY1" => "ACTIVE_FROM",
				        "SORT_ORDER1" => "DESC",
				        "SORT_BY2" => "SORT",
				        "SORT_ORDER2" => "ASC",
				        "FILTER_NAME" => "",
				        "FIELD_CODE" => Array("ID"),
				        "PROPERTY_CODE" => Array("ADDRESS"),
				        "CHECK_DATES" => "Y",
				        "DETAIL_URL" => "",
				        "PREVIEW_TRUNCATE_LEN" => "",
				        "ACTIVE_DATE_FORMAT" => "j F Y",
				        "SET_TITLE" => "N",
				        "SET_BROWSER_TITLE" => "N",
				        "SET_META_KEYWORDS" => "N",
				        "SET_META_DESCRIPTION" => "N",
				        "SET_LAST_MODIFIED" => "N",
				        "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
				        "ADD_SECTIONS_CHAIN" => "N",
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
				        "AJAX_OPTION_ADDITIONAL" => "",
				        "DEPARTMENTS_MAP" => ($departments_map ? 'Y' : 'N')
				    )
				);?>			
			<?}elseif($calculator_page == true) { ?>	
			<?$APPLICATION->IncludeComponent("bitrix:news.list","departments_map_calculator",Array(
				        "DISPLAY_DATE" => "Y",
				        "DISPLAY_NAME" => "Y",
				        "DISPLAY_PICTURE" => "Y",
				        "DISPLAY_PREVIEW_TEXT" => "Y",
				        "AJAX_MODE" => "N",
				        "IBLOCK_TYPE" => SITE_ID,
				        "IBLOCK_ID" => \Sat::getInstance()->IBLOCK[SITE_ID]["DEPARTMENT"],
				        "NEWS_COUNT" => "100",
				        "SORT_BY1" => "ACTIVE_FROM",
				        "SORT_ORDER1" => "DESC",
				        "SORT_BY2" => "SORT",
				        "SORT_ORDER2" => "ASC",
				        "FILTER_NAME" => "",
				        "FIELD_CODE" => Array("ID"),
				        "PROPERTY_CODE" => Array("ADDRESS"),
				        "CHECK_DATES" => "Y",
				        "DETAIL_URL" => "",
				        "PREVIEW_TRUNCATE_LEN" => "",
				        "ACTIVE_DATE_FORMAT" => "j F Y",
				        "SET_TITLE" => "N",
				        "SET_BROWSER_TITLE" => "N",
				        "SET_META_KEYWORDS" => "N",
				        "SET_META_DESCRIPTION" => "N",
				        "SET_LAST_MODIFIED" => "N",
				        "INCLUDE_IBLOCK_INTO_CHAIN" => "N",
				        "ADD_SECTIONS_CHAIN" => "N",
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
			<? } ?>
			
			<?if(!$map_page && !defined('ERROR_404')):?>
    			<div id="<?=$container_fluid_id?>" class="container-fluid">
            <?endif;?>