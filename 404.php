<?
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/urlrewrite.php');
CHTTP::SetStatus("404 Not Found");
@define("ERROR_404","Y");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("404");?>
<div class="news_page">
	<div class="page__error-container">
		<div class="container-fluid uk-vertical-align">
			<div class="uk-vertical-align-middle">
				<img src="<?=SITE_TEMPLATE_PATH?>/images/error_404.png" alt="" width="558" height="328" class="page__error-img page__error-img--404">
				<div class="page__error-text">Упс! Ми не можемо знайти сторінку, яку ви шукаєте.</div>
				<div class="page__error-hint">Можливо, запитувана Вами сторінка була переміщена або видалена.
					<br>Будь ласка, скористайтеся навігацією або формою пошуку, щоб знайти потрібну Вам інформацію
				</div>
			</div>
		</div>
	</div>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>