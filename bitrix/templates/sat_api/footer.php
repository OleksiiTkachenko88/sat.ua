<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<?
IncludeTemplateLangFile(__FILE__);
?>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-15699898-1']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; 
ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>

</section>
<footer>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-2 hidden-mobile">
                <a href="<?=SITE_DIR;?>" class="logo"><img src="<?=SITE_TEMPLATE_PATH?>/img/logo-footer.png" alt="<?echo getMessage("ALT_MAIN_LOGO")?>"></a>
            </div>
            <div class="col-xs-12 col-sm-10">
                <div class="project-map-wrap">
                    <a class="toTop"><i class="fa fa-angle-up" aria-hidden="true"></i></a>
                    <div class="project-map hidden-mobile">
					
<?$APPLICATION->IncludeComponent(
	"bitrix:menu", 
	"api-mainbottom", 
	array(
		"ALLOW_MULTI_SELECT" => "N",
		"CHILD_MENU_TYPE" => "podmenu",
		"DELAY" => "N",
		"MAX_LEVEL" => "3",
		"MENU_CACHE_GET_VARS" => array(
		),
		"MENU_CACHE_TIME" => "3600",
		"MENU_CACHE_TYPE" => "N",
		"MENU_CACHE_USE_GROUPS" => "Y",
		"ROOT_MENU_TYPE" => "bottom",
		"USE_EXT" => "N",
		"COMPONENT_TEMPLATE" => "api-mainbottom"
	),
	false,
	array(
		"ACTIVE_COMPONENT" => "Y"
	)
);?>

                    </div>
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
                    </div>
                    <div class="col-xs-12 col-sm-6">
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
</div>
<script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr-custom.js"></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/html2canvas.min.js"></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/device.min.js"></script>
<!--<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-ui.min.js"></script>-->
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.datetimepicker.full.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.fancybox.pack.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.formstyler.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/easing.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.flexslider-min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/verge.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.raty-fa.js"></script>
<script language="javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery.dotdotdot.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.nouislider.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/bootstrap.min.js"></script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/maskedinput.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/respond.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/script.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/api_mask.js"></script>

<?if(stristr($APPLICATION->GetCurDir(), '/api/methods/') != false):?>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/autoresize.jquery.js"></script>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/api_script.js"></script>
<?endif;?>
</body>
</html>