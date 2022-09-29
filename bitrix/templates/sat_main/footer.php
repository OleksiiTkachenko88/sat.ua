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
                <form class="subscribe-form" id="subscribeForm" data-ok-info="<?=GetMessage('subscr_form_response_NOTE');?>">
                  <input type="email" class="text-field" placeholder="<?=GetMessage('subscr_form_email_title');?>..." name="email">
                  <input type="submit" class="submit" value="<?=GetMessage('subscr_form_button');?>">
                  <div class="clearfix"></div>                 
                  <div class="form_info"></div>
                </form>
              </div>
            <div class="subscribe-text"><?=getMessage("subscr_text");?></div>
          </div>

          <script>
            window.addEventListener('load', () => {
              const onSubmitFormSubscribe = async event => {
                event.preventDefault();
                const emailValue = event.target.querySelector('[name="email"]').value;
                const loader = event.target.querySelector('.loader');
                const formInfo = event.target.querySelector('.form_info');

                if (!emailValue.length) return formInfo.innerHTML = `<span class='form_error'><?=GetMessage('subscr_form_email_title');?></span>`;

                const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regEmail.test(emailValue)) return formInfo.innerHTML = `<span class='form_error'><?=GetMessage('subscr_error_validation_email');?></span>`;

                loader.style.display = 'display: block';
                const response = await fetch(`/subscribe.php?lang=${api_lang}&email=${emailValue}`);
                loader.style.display = 'display: none';
                if (!response.ok) return formInfo.innerHTML = `<span class='form_error'>Error HTTP: ${response.status}</span>`;
                const data = await response.json();
                if (!data) return;
                if (data.status === 'error') return formInfo.innerHTML = `<span class='form_error'>${data.msg}</span>`;
                formInfo.innerHTML = event.target.dataset.okInfo;
              }

              const subscribeForm = document.getElementById('subscribeForm');
              subscribeForm.addEventListener('submit', onSubmitFormSubscribe);
            });
            </script>
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
        </div>
        <div class="row bottom-footer">
            <div class="col-xs-12 col-sm-7 col-md-8 f_right">
                <div class="row">
                    <div class="col-xs-12 col-sm-6" style="display:none">
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
                        </div>
                <div class="hot-line-new">
                <?=getMessage("FREE_HOT_LINE");?>
                </div>
<div class="buttons">
<div class="col-xs-3 col-sm-2">
</div>
<div class="col-xs-12 col-sm-6 col-md-4">
<a href="https://play.google.com/store/apps/details?id=m.sat.ua.m" target="_blank" class="logo"><img src="<?=SITE_TEMPLATE_PATH?>/img/android.png" alt="<?echo getMessage("ALT_MAIN_LOGO") ?>"></a>
 </div>
<div class="col-xs-12 col-sm-6 col-md-4">
                <a href="https://apps.apple.com/ua/app/sat-%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D0%BA%D0%B8/id1491453268?l=ru" target="_blank" class="logo"><img src="<?=SITE_TEMPLATE_PATH?>/img/apple.png" alt="<?echo getMessage("ALT_MAIN_LOGO")?>"></a>


                    </div>
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
    </div>
</footer>
</div>

<style>
  body.open-modal {
    overflow: hidden;
  }

	.wrapper-modal {
		position: fixed;
		top: 0;
    left: 0;
    height: 0;
    width: 0;
		z-index: 201;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    overflow: hidden;
    display: flex;
		background-color: rgba(0, 0, 0, 0.7);
	}

  .wrapper-modal:not(.wrapper-modal--open) {
    /* transition: all 0s .6s ease-out; */
  }

	.wrapper-modal--open {
    height: 100%;
		width: 100%;
	}

	.wrapper-modal > :first-child {
    transform: scale(0);
		outline: 0;
		text-align: left;
		overflow-y: auto;
		background-color: #d0d2d3;
		border: 1px solid rgba(0,0,0,.2);
		border-radius: 5px;
    padding: 15px;
		transition: transform .5s .1s ease-out;
  }

  .wrapper-modal--open > :first-child {
		transform: scale(1);
  }

	.modal__header {
		display: flex;
		justify-content: space-between;
    font-size: 22px;
    margin-bottom: 20px;
	}

	.modal-title {
    padding: 0;
		margin: 0;
    color: #2766a0;
		font-family: inherit;
		font-weight: inherit;
    font-size: 22px !important;
    text-align: center;
    flex-grow: 1;
	}

	.modal-btn-close {
		cursor: pointer;
		background-color: transparent;
		border: 0;
		font-weight: bold;
		line-height: 1;
		color: rgba(0, 0, 0, .5);
		text-shadow: 0 1px 0 #fff;
		padding: 10px;
		margin: -15px -15px 0 0;
  }

  .modal-btn-success {
    width: 100%;
    border: none;
    display: block;
    box-shadow: none;
    border-radius: 0;
    height: 50px;
    line-height: 49px;
    background: #ffd64a;
    color: #1e3e6c;
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    font-family: "SFUIDisplayMedium", sans-serif;
    padding: 0 23px;
    outline: none;
    transition: all 0.4s;
  }

  .modal-btn-success:hover {
    background: #2766a0;
    color: #ffd64a;
  }

  /* FORM SUBSCRIBE */

  .wrapper-modal--subscribe > :first-child {
    max-width: 590px;
    width: 100%;
  }

  .form-subscribe-modal{
    display: flex;
  }

  @media (max-width: 590px) {
    .form-subscribe-modal {
      flex-wrap: wrap;
    }
  }

  .form-subscribe-modal__description {
    color: #757575;
    font-family: "SFUIDisplay",sans-serif;
    letter-spacing: 0.5px;
    font-size: 13px;
    color: #333;
    margin-bottom: 20px;
  }

  .form-subscribe-modal__text-field {
    flex-basis: 360px;
    flex-grow: 1;
    display: block;
    height: 50px;
    line-height: 30px;
    background: transparent;
    outline: none;
    border: none;
    border-bottom: 1px solid #58595b;
    padding: 10px 0px 9px 0;
    box-shadow: none;
    border-radius: 0;
    font-size: 14px;
    color: #58595b;
    font-family: "SFUIDisplayLight",sans-serif;
  }

  .form-subscribe-modal__btn {
    margin-top: 20px;
  }

  @media (min-width: 590px) {
    .form-subscribe-modal__btn {
      margin-top: 0;
      margin-left: 30px;
      width: auto;
    }
  }

  .form-subscribe-modal__error {
    margin-top: 20px;
    font-family: "SFUIDisplay",sans-serif;
    font-size: 13px;
    color: #d00;
  }
</style>

<div class="wrapper-modal wrapper-modal--subscribe" id="modalSubscribe" tabindex="-1" role="dialog" aria-hidden="true">
  <div>
    <div class="modal__header">
      <h2 class="modal-title"><?= getMessage("subscr_title"); ?></h2>
      <button type="button" class="modal-btn-close modal-close" aria-label="Закрыть">
        &times;
      </button>
    </div>
    <div>
      <div class="form-subscribe-modal__description"><?=getMessage("subscr_text");?></div>
      <form class="form-subscribe-modal" id="formSubscribeModal">
        <input
          type="email"
          class="form-subscribe-modal__text-field"
          placeholder="<?= GetMessage('subscr_form_email_title'); ?>..."
          name='email'
        />

        <button type="submit" class="modal-btn-success form-subscribe-modal__btn">
          <?=GetMessage('subscr_form_button');?>
        </button>
      </form>
      <div class="form-subscribe-modal__error hide"></div>
    </div>
  </div>
</div>

<script>
window.addEventListener('load', () => {
  const onSubmitSubscribeModal = async event => {
    event.preventDefault();
    const emailValue = document.querySelector('.form-subscribe-modal__text-field').value;
    const subscribeFormError = document.querySelector('.form-subscribe-modal__error');
    subscribeFormError.classList.remove('hide');
    if (!emailValue.length) return subscribeFormError.innerHTML = `<?=GetMessage('subscr_form_email_title');?>`;

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(emailValue)) return subscribeFormError.innerHTML = `<?=GetMessage('subscr_error_validation_email');?>`;

    const response = await fetch(`/subscribe.php?lang=${api_lang}&email=${emailValue}`);
    if (!response.ok) return subscribeFormError.innerHTML = `Error HTTP: ${response.status}`;
    const data = await response.json();
    if (data.status !== 'ok') return subscribeFormError.innerHTML = `${data.msg}`;
    subscribeFormError.classList.add('hide');
    modalVisible('modalSubscribe', false);
    modalVisible('modalSubscribeSuccess', true);
    setTimeout(() => modalVisible('modalSubscribeSuccess', false), 5000);
  }

  const formSubscribeModal = document.querySelector('.form-subscribe-modal');
  formSubscribeModal.addEventListener('submit', onSubmitSubscribeModal);
});
</script>

<style>
   /* FORM SUBSCRIBE SUCCESS */
   .wrapper-modal--subscribe-success > :first-child {
    max-width: 500px;
    width: 100%;
  }

  .subscribe-success-text {
    color: #757575;
    font-family: "SFUIDisplay",sans-serif;
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
</style>

<div class="wrapper-modal wrapper-modal--subscribe-success" id="modalSubscribeSuccess" tabindex="-1" role="dialog" aria-hidden="true">
  <div>
    <div class="modal__header">
      <h2 class="modal-title"><?= getMessage("subscr_title"); ?></h2>
      <button type="button" class="modal-btn-close modal-close" aria-label="Закрыть">
        &times;
      </button>
    </div>
    <div>
      <div class="subscribe-success-text"><?=GetMessage('subscr_form_response_NOTE');?></div>
      <button class="modal-btn-success" id="subscribeSuccessModalBtn">OK</button>
    </div>
  </div>
</div>

<script>
window.addEventListener('load', () => {
  const subscribeSuccessModalBtn = document.getElementById('subscribeSuccessModalBtn');
  subscribeSuccessModalBtn.addEventListener('click', () => modalVisible('modalSubscribeSuccess', false));
});
</script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr-custom.js" async></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr-custom-old.js" async></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/html2canvas.min.js" async></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jspdf.min.js" async></script>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/device.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-ui.min.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.datetimepicker.full.min.js"></script>
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
<script src="<?=SITE_TEMPLATE_PATH?>/js/script.js?20210415" async></script>
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
