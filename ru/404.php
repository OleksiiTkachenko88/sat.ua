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
 <img width="558" src="/bitrix/templates/sat_main/images/error_404.png" height="328" alt="" class="page__error-img page__error-img--404">
				<div class="page__error-text">
					Упс! Ми не можем найти страницу, которую вы запрашиваете.
				</div>
				<div class="page__error-hint">
					Возможно, запрашиваемая Вами страница была перемещена или удаленна. <br>
					Пожалуйста, воспользуйтесь навигацией или формой поиска, что бы найти нужную Вам информацию.
				</div>
			</div>
		</div>
	</div>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>