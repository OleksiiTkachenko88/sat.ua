<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();?>
<?if(!$map_page && !isset($GLOBALS['map_page']) && !defined('ERROR_404')):?>			
<!-- close container-fluid -->
</div>
<?endif;?>
		
				<?/*<div class="panel__container panel__container--main panel__container--main--banner m-b-0">
			<div class="container-fluid">
				<div class="row panel__container-row">
					<div class="col-xs-12 col-lg-6">
						<section class="panel panel--action">
							<header class="panel__heading">
								<div class="panel__heading-primary-content">
									<i class="icon panel__icon"></i>
									<h3 class="panel__title">Найкраща пропозиція</h3>
								</div>
							</header>
							<div style="background-image: url(http://placehold.it/695x465);" class="banner banner--h--465">
								<a href="">
									<img src="http://placehold.it/695x465" alt="" width="695" height="465" class="invisible">
									<div class="banner__overlay-panel">
										<h3 class="banner__title banner__title--size-1">Акція</h3>
									</div>
								</a>
							</div>
						</section>
					</div>
					<div class="col-xs-12 col-lg-6">
						<section class="panel panel--action">
							<header class="panel__heading">
								<div class="panel__heading-primary-content">
									<i class="icon panel__icon"></i>
									<h3 class="panel__title">Акції для вас</h3>
								</div>
								<div class="panel__heading-secondary-content">
									<div class="btn btn--accent btn--outline btn--icon">
										<i class="icon icon--arrow-right-light-grey"></i>
									</div>
								</div>
							</header>
							<div style="background-image: url(http://placehold.it/695x245);" class="banner banner--h--245">
								<a href="">
									<img src="http://placehold.it/695x245" alt="" width="695" height="245" class="invisible">
									<div class="banner__overlay-panel banner__overlay-panel--right banner__overlay-panel--background">
										<h3 class="banner__title banner__title--size-2 banner__title--alt">
											<span class="small">Кожному&nbsp;клієнту</span> подарунок</h3>
									</div>
								</a>
							</div>
							<div class="row panel__container-row">
								<div class="col-xs-6">
									<div style="background-image: url(http://placehold.it/340x210);" class="banner banner--h--210">
										<a href="">
											<img src="http://placehold.it/340x210" alt="" width="340" height="210" class="invisible">
											<div class="banner__overlay-panel banner__overlay-panel--top banner__overlay-panel--inverse">
												<h3 class="banner__title banner__title--size-3 banner__title--alt">
													<span class="small">Безкоштовне завантаження</span> у&nbsp;подарунок</h3>
											</div>
										</a>
									</div>
								</div>
								<div class="col-xs-6">
									<div style="background-image: url(http://placehold.it/340x210);" class="banner banner--h--210">
										<a href="">
											<img src="http://placehold.it/340x210" alt="" width="340" height="210" class="invisible">
											<div class="banner__overlay-panel banner__overlay-panel--right banner__overlay-panel--inverse">
												<h3 class="banner__title banner__title--size-4 banner__title--alt">Знижка 10%
													<span class="small">на перевезення
														<br>меблів у березні</span>
												</h3>
											</div>
										</a>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
					<div class="panel__container-footer">
				<div class="container-fluid">
					<button type="button" class="btn btn--more">Більше акцій
						<i class="icon icon--arrow-down-grey"></i>
					</button>
				</div>
			</div>
				</div>*/?>
<? if(($APPLICATION->GetCurDir() == "/" || $APPLICATION->GetCurDir() == SITE_DIR.'/' )  && !defined('ERROR_404')) { ?> 
	<?
	//$bannerFilter	= array('!PROPERTY_BANNER_4_ON_LINE' => false);
	//dump($APPLICATION->GetDirProperty("ACTION_LIST_TYPE"));
	
	switch($APPLICATION->GetDirProperty("ACTION_LIST_TYPE"))
	{
		case 2: 
			$action_template	= 'action_on_main_2_on_line';
			$action_count		= 2;
			break;
		
		default:
			$action_count		= 4;
			$action_template	= 'action_on_main';
			break;
	}
	?>				
	<?$APPLICATION->IncludeComponent("bitrix:news.list", $action_template,Array(
	            "DISPLAY_DATE" => "Y",
	            "DISPLAY_NAME" => "Y",
	            "DISPLAY_PICTURE" => "Y",
	            "DISPLAY_PREVIEW_TEXT" => "Y",
	            "AJAX_MODE" => "N",
	            "IBLOCK_TYPE" => "news",
	            "IBLOCK_ID" => \Sat::getInstance()->IBLOCK[SITE_ID]["ACTION"],
	            "NEWS_COUNT" => $action_count,
	            "SORT_BY1" => "ACTIVE_FROM",
	            "SORT_ORDER1" => "DESC",
	            "SORT_BY2" => "SORT",
	            "SORT_ORDER2" => "ASC",
	            "FILTER_NAME" => "bannerFilter",
	            "FIELD_CODE" => Array("ID", "PREVIEW_PICTURE", "DETAIL_PICTURE"),
	            "PROPERTY_CODE" => Array("BANNER_4_ON_LINE"),
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
	            "PAGER_DESC_NUMBERING" => "N",
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
				
				<?/*<div class="panel__container panel__container--main panel__container--main--banner m-b-0">
					<div class="container-fluid">
				<div class="row panel__container-row">
					<div class="col-xs-12 col-lg-6">
						<section class="panel panel--action">
							<header class="panel__heading">
								<div class="panel__heading-primary-content">
									<i class="icon panel__icon"></i>
									<h3 class="panel__title">Найкраща пропозиція</h3>
								</div>
							</header>
							<div style="background-image: url(http://placehold.it/695x465);" class="banner banner--h--465">
								<a href="">
									<img src="http://placehold.it/695x465" alt="" width="695" height="465" class="invisible">
									<div class="banner__overlay-panel">
										<h3 class="banner__title banner__title--size-1">Акція</h3>
									</div>
								</a>
							</div>
						</section>
					</div>
					<div class="col-xs-12 col-lg-6">
						<section class="panel panel--action">
							<header class="panel__heading">
								<div class="panel__heading-primary-content">
									<i class="icon panel__icon"></i>
									<h3 class="panel__title">Найкраща пропозиція</h3>
								</div>
							</header>
							<div style="background-image: url(http://placehold.it/695x465);" class="banner banner--h--465">
								<a href="">
									<img src="http://placehold.it/695x465" alt="" width="695" height="465" class="invisible">
									<div class="banner__overlay-panel">
										<h3 class="banner__title banner__title--size-1">Акція</h3>
									</div>
								</a>
							</div>
						</section>
					</div>
				</div>
			</div>
					<div class="panel__container-footer">
				<div class="container-fluid">
					<button type="button" class="btn btn--more">Більше акцій
						<i class="icon icon--arrow-down-grey"></i>
					</button>
				</div>
			</div>
				</div>*/?>
				<div  id="sat_recom" class="panel__container panel__container--main panel__container--main--recommend" >
			<div id="recomend" class="container-fluid">
				<section class="panel panel--recommend">
					<header class="panel__heading">
						<div class="panel__heading-primary-content">
							<i class="icon panel__icon"></i>
							<h3 class="panel__title">SAT рекомендує</h3>
						</div>						
					</header>
					<div id="block_list" class="panel__block-list">
						<a href="" class="panel__block block_x panel__block--doc">
							<i class="icon panel__block-icon"></i>
							<h3 class="panel__block-title">Документи</h3>
							
						</a>
						<a href="" class="panel__block block_x panel__block--pack">
							<i class="icon panel__block-icon"></i>
							<h3 class="panel__block-title">Тарифи</h3>
							
						</a>
						<a href="" class="panel__block block_x panel__block--trans">
							<i class="icon panel__block-icon"></i>
							<h3 class="panel__block-title">API</h3>
							
						</a>
						
					</div>
					<div class="right_panel">
						<div class="right_div">
							<a href="" >
								<div class="a_right"><img src="<?=MARKUP?>/images/svg/lock.svg" alt="" width="40" height="40" > <p>блокування <br>видачі</p></div>
							</a>
						</div>
						<div class="right_div">
							<a href="">
								<div class="a_right"><img src="<?=MARKUP?>/images/svg/return_poddon.svg" alt="" width="40" height="50"><p>повернення <br>піддонів</p></div>
							</a>
						</div>							
						<div class="right_div">
							<a href="">
								<div class="a_right"><img src="<?=MARKUP?>/images/svg/return_docs.svg" alt="" width="40" height="40"><p>повернення <br>документів</p></div>
							</a>
						</div>
						<div class="right_div">
							<a href="">
								<div class="a_right"><img src="<?=MARKUP?>/images/svg/envelope.svg" alt="" width="40" height="40"><p>Накладений <br>платіж</p></div>
							</a>
						</div>
					</div>
					<div class="both"></div>
					<div class="bottom_block1">
						<a href="">
								<div class="a_bottom"><img src="<?=MARKUP?>/images/svg/truck.svg" alt="" width="60" height="50"><p>замовлення виїзду</p></div>
						</a>
					</div>
					<div class="bottom_block2">
						<a href="">
								<div class="a_bottom"><img src="<?=MARKUP?>/images/svg/delivery.svg" alt="" width="50" height="50"><p>замовлення доставки</p></div>
						</a>
					</div>
				</section>
			</div>
		</div>
			</div>
			<footer class="page__footer">
			<div class="mega-footer">
				<div id="foot" class="container-fluid mega-footer__container">
					<div class="mega-footer__logo"></div>
					<?$APPLICATION->IncludeComponent(
		                "bitrix:menu",
		                "bottom",
		                Array(
		                    "ROOT_MENU_TYPE" => "bottom",
		                    "MAX_LEVEL" => "2",
		                    "CHILD_MENU_TYPE" => "bottom_sub",
		                    "USE_EXT" => "Y",
		                    "DELAY" => "A",
		                    "ALLOW_MULTI_SELECT" => "Y",
		                    "MENU_CACHE_TYPE" => "Y",
		                    "MENU_CACHE_TIME" => "3600",
		                    "MENU_CACHE_USE_GROUPS" => "Y",
		                    "MENU_CACHE_GET_VARS" => ""
		                )
		            );?>
					<!--
<h3 class="mega-footer__extra-heading hidden-md-down">Мапа сайту</h3>
					<nav class="mega-footer__middle-section hidden-md-down">
						<div class="mega-footer__section">
							<h5 class="mega-footer__heading">Замовити</h5>
							<ul class="mega-footer__link-list">
								<li>
									<a href="">Калькулятор</a>
								</li>
							</ul>
						</div>
						<div class="mega-footer__section">
							<h5 class="mega-footer__heading">ТРЕКІНГ</h5>
							<ul class="mega-footer__link-list">
								<li>
									<a href="">Відстежити вантаж</a>
								</li>
								<li>
									<a href="">Замовлення</a>
								</li>
							</ul>
						</div>
						<div class="mega-footer__section">
							<h5 class="mega-footer__heading">Надпоштові можливості</h5>
							<ul class="mega-footer__link-list">
								<li>
									<a href="">Послуги</a>
								</li>
								<li>
									<a href="">Академія</a>
									<ul>
										<li>
											<a href="">Кейси</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div class="mega-footer__section">
							<h5 class="mega-footer__heading">Акції</h5>
							<ul class="mega-footer__link-list">
								<li>
									<a href="">Найкращі пропозиції</a>
								</li>
								<li>
									<a href="">Акції для вас</a>
								</li>
								<li>
									<a href="">Ваші бонуси</a>
								</li>
							</ul>
						</div>
						<div class="mega-footer__section">
							<h5 class="mega-footer__heading">Компанія SAT</h5>
							<ul class="mega-footer__link-list">
								<li>
									<a href="">Легенда</a>
								</li>
								<li>
									<a href="">Новини</a>
								</li>
							</ul>
						</div>
						<div class="mega-footer__section">
							<h5 class="mega-footer__heading">Контакти</h5>
							<ul class="mega-footer__link-list">
								<li>
									<a href="">Бізнес</a>
								</li>
								<li>
									<a href="">Клієнти</a>
								</li>
								<li>
									<a href="">Відділення</a>
									<ul>
										<li>
											<a href="">Списком</a>
										</li>
										<li>
											<a href="">На карті</a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</nav>
-->
					<div class="mega-footer__spacer hidden-md-down"></div>
					<div class="mega-footer__bottom-section">
						<div class="mega-footer__section">
							<p class="mega-footer__copyright">
								<?$APPLICATION->IncludeComponent(
				                    "bitrix:main.include",
				                    "",
				                    Array(
				                        "AREA_FILE_SHOW" => "file",
				                        "PATH" => SITE_DIR."/include/footer_address.php",
				                    )
				                );?>
							</p>
						</div>
						<div class="mega-footer__section mega-footer__section--phone">
							<?$APPLICATION->IncludeComponent(
			                    "bitrix:main.include",
			                    "",
			                    Array(
			                        "AREA_FILE_SHOW" => "file",
			                        "PATH" => SITE_DIR."/include/hot_line.php",
			                    )
			                );?>
						</div>
						<div class="mega-footer__section mega-footer__section--social">
							<a href="" class="mega-footer__social-btn mega-footer__social-btn--facebook">
								<i class="icon"></i>
							</a>
							<a href="" class="mega-footer__social-btn mega-footer__social-btn--vkontakte">
								<i class="icon"></i>
							</a>
							<a href="" class="mega-footer__social-btn mega-footer__social-btn--twitter">
								<i class="icon"></i>
							</a>
							<a href="" class="mega-footer__social-btn mega-footer__social-btn--youtube">
								<i class="icon"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
		</div>

	
	</body>

</html>