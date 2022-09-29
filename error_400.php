<?
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/urlrewrite.php');

CHTTP::SetStatus("404 Not Found");
@define("ERROR_404","Y");

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");

$APPLICATION->SetTitle("400");

?>
<div class="news_page">
<div class="page__error-container">
	<div class="container-fluid uk-vertical-align">
		<div class="uk-vertical-align-middle">
			<img src="<?=SITE_TEMPLATE_PATH?>/images/error_400.png" alt="" width="677" height="440" class="page__error-img page__error-img--400">
			<div class="page__error-text">Упс! Невірний запит</div>
		</div>
	</div>
</div>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>