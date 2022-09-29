<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?
IncludeTemplateLangFile(__FILE__);
?>
<script>
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15699898-1']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
<script data-skip-moving="true">
        (function(w,d,u){
                var s=d.createElement('script');s.async=1;s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
        })(window,document,'https://portal.sat.ua/upload/crm/site_button/loader_1_7cdd6p.js');
</script>
    <div class="subscribe-wrapper">
        <div class="container">
            <div class="background-subscribe">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-8">
                        <h2><?=getMessage("subscr_title");?></h2>
						<div class="clearfix">
						<form action="#" method="post" id="subscribe_form" data-ok-info="<?=GetMessage('subscr_form_response_NOTE');?>">
                            <input type="email" class="text-field" placeholder="<?=GetMessage('subscr_form_email_title');?>..." name="email">
                            <input type="submit" class="submit" value="<?=GetMessage('subscr_form_button');?>">
							<div class="clearfix"></div>
							<div class="loader"></div>
							<div class="form_info"></div>
						</form>
<script>
$(document).ready(function(){
    $('#subscribe_form').on("submit", function(e){
		e.preventDefault();
		var email = $('#subscribe_form input[name="email"]').val();
		var loader = $(this).find(".loader");
		var form_info = $(this).find(".form_info");
		var ok_info = $(this).data('okInfo');
		if (email.length > 0) {
			loader.show();
			$.getJSON('<?=SITE_DIR;?>subscribe.php', {
				email : email
			}, function(data){
				loader.hide();
				if (data.status == 'ok'){
					form_info.html(ok_info);
				} else {
					form_info.html("<span class='form_error'>" + data.msg + "</span>");
				}
			});
		} else {
			form_info.html("<span class='form_error'>" + "<?=GetMessage('subscr_form_email_title');?>" + "</span>");
		}
    });
});
</script>
                        </div>
                        <div class="subscribe-text"><?=getMessage("subscr_text");?></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<footer>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-2 hidden-mobile">
                <a href="<?=SITE_DIR;?>" class="logo"><img src="<?=SITE_TEMPLATE_PATH?>/img/logo-footer.png" alt="<?echo getMessage("ALT_MAIN_LOGO")?>"></a>
            </div>
            <div class="col-xs-12 col-sm-10">
                <div class="project-map-wrap">
                    <a class="toTop"><span><?echo GetMessage("UP_SMALL");?></span><i class="fa fa-angle-up" aria-hidden="true"></i></a>
                    <div class="project-map hidden-mobile">

<?$APPLICATION->IncludeComponent(
	"bitrix:menu",
	"mainbottom",
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "podmenu",
		"DELAY" => "N",
		"MAX_LEVEL" => "3",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "Y",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "bottom",
		"USE_EXT" => "N",
		"COMPONENT_TEMPLATE" => "mainbottom"
	),
	false
);?>

                    </div>
                </div>
     </div>
        <div class="row bottom-footer">
            <div class="col-xs-12 col-sm-7 col-md-8 f_right">
                <div class="row">
                    <div class="col-xs-12 col-sm-6">
                        <div class="hot-line">
<?$APPLICATION->IncludeComponent(
	"bitrix:main.include",
	"",
	Array(
		"AREA_FILE_SHOW" => "file",
		"AREA_FILE_SUFFIX" => "inc",
		"EDIT_TEMPLATE" => "",
		"PATH" => SITE_TEMPLATE_PATH . "/include/bottom_phone_inc.php"
	)
);?>
                        <span><?=getMessage("FREE_HOT_LINE");?></span>
                        </div>
<div class="buttons">
<div class="col-xs-3 col-sm-2">
</div>
<div class="col-xs-12 col-sm-6 col-md-4">
<a href="https://play.google.com/store/apps/details?id=m.sat.ua.m" target="_blank" class="logo"><img src="<?=SITE_TEMPLATE_PATH?>/img/android.png" alt="<?echo getMessage("ALT_MAIN_LOGO") ?>"></a>
 </div>
<div class="col-xs-12 col-sm-6 col-md-4">
                <a href="https://apps.apple.com/ua/app/sat-%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D0%BA%D0%B8/id1491453268?l=ru" target="_blank" class="logo"><img src="<?=SITE_TEMPLATE_PATH?>/img/apple.png" alt="<?echo getMessage("ALT_MAIN_LOGO")?>"></a>


                    <div class="col-xs-12 col-sm-5">
                        <div class="social-icons">
<?
$APPLICATION->IncludeFile(SITE_TEMPLATE_PATH . "/include/bottom_networks_" . GetMessage("IBLOCK_TYPE") . "_inc.php", Array(), Array(
    "MODE"      => "text"
    ));
?>
</div>
</div>
 </div>
</div>
            <div class="col-xs-12 col-sm-5 col-md-4">
                <div class="copyright">
                    <?=getMessage("BOTTOM_COPYRIGHT");?>
 </div>
</div>
</div>
</footer>
<script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr-custom.js" async></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr-custom-old.js" async></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/html2canvas.min.js" async></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jspdf.min.js" async></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/device.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-ui.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.datetimepicker.full.min_20200606.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.fancybox.pack.js"></script>
<script>
	if(device.mobile()) {
		setTimeout(function() {
		  $('select').styler();
		}, 100)
	}
</script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.formstyler.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/owl.carousel.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/easing.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.flexslider-min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/verge.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.raty-fa.js"></script>
<script language="javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery.dotdotdot.min.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.nouislider.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/bootstrap.min.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/maskedinput.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/respond.js" async></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/script_20200606.js" async></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/mobile-app-panel.js" async></script>
<?if(stristr($page_class, "international-page")!==false):?>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/inputmask.bundle.min.js"></script>
<?endif;?>
<?
	$dir = $APPLICATION->GetCurDir();
/*
	$mainPageMap = (
		$dir == SITE_DIR )
		? true :false;

	if($mainPageMap):
		echo '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMGEU4rqRZcp8V5geNv-8uLKri6HjNumU&language=' . GetMessage("MAP_LANG") . '&region=uk&callback=initMainPageMap" async defer></script>';
	endif;
*/
	$show_map = (
		$dir == SITE_DIR . 'departments/map/' ||
		stristr($dir, SITE_DIR . 'departments/map/') !=false ||
		$dir == SITE_DIR . 'contacts/departments/map/' ||
		$dir == SITE_DIR . 'contacts/company/' ||
		$dir == SITE_DIR . 'partners/prioritetnye-goroda/' ||
		$dir == SITE_DIR . 'treking/zakaz/')

	? true : false;
	$show_map2 = (
		$dir == SITE_DIR . 'contacts/departments/list/'
		)
	? true : false;

	if ($show_map) {
		echo '
			<script src="' . SITE_TEMPLATE_PATH . '/js/markerclusterer.js"></script>
			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKIzOcpR-5CcJAWJjkEJWNz-_8W7lKsmY&language=' . GetMessage("MAP_LANG") . '&region=uk&callback=initMap" async defer></script>
		';
	}
	if ($show_map2) {
		echo '
			<script src="' . SITE_TEMPLATE_PATH . '/js/markerclusterer.js"></script>
			<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDKIzOcpR-5CcJAWJjkEJWNz-_8W7lKsmY&language=' . GetMessage("MAP_LANG") . '&region=uk&v=3.30" async defer></script>
		';
	}

?>
<script src="<?=SITE_TEMPLATE_PATH?>/js/add.js"></script>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MR78KTN"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<!-- script Target -->
<script type="text/javascript" id="adpartner_init">
	var adexQ = adexQ || [];
	!function(e){var t=e.createElement("script");t.type="text/javascript",t.async=!0,t.src="//a4p.adpartner.pro/tracker/script?id=254";var r=e.getElementById("adpartner_init");r.parentNode.insertBefore(t,r)}(window.document);
</script>
<!-- end script Target -->
</body>
</html>
