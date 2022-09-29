<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("title", " Регистрационная форма для получения ключа API (apiKey) | Портал для разработчиков API \"SAT\"");

?>
<div class="registration-baner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/images/api-home-bg.png');">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="registration-content-padding">
<?$APPLICATION->IncludeComponent(
	"bitrix:form.result.new", 
	"api-registration-form", 
	array(
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"CHAIN_ITEM_LINK" => "",
		"CHAIN_ITEM_TEXT" => "",
		"EDIT_URL" => "",
		"IGNORE_CUSTOM_TEMPLATE" => "N",
		"LIST_URL" => "",
		"SEF_MODE" => "N",
		"SUCCESS_URL" => "",
		"USE_EXTENDED_ERRORS" => "N",
		"WEB_FORM_ID" => "4",
		"COMPONENT_TEMPLATE" => "api-registration-form",
		"SEF_FOLDER" => "/ru/api/registration/",
		"VARIABLE_ALIASES" => array(
			"WEB_FORM_ID" => "WEB_FORM_ID",
			"RESULT_ID" => "RESULT_ID",
		)
	),
	false
);?>
				</div>
			</div>
		</div>
	</div>
</div>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>