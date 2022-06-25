<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");?>
<?
    $APPLICATION->IncludeComponent("bitrix:form.result.new","callback",Array(
	"AJAX_MODE" => "Y",
	"AJAX_OPTION_JUMP" => "Y",
	"AJAX_OPTION_STYLE" => "N",
	"AJAX_OPTION_HISTORY" => "Y",
	"AJAX_OPTION_ADDITIONAL" => "",
	"SEF_MODE" => "N", 
	"WEB_FORM_ID" => 1, 
	"LIST_URL" => "", 
	"EDIT_URL" => "", 
	"SUCCESS_URL" => "", 
	"CHAIN_ITEM_TEXT" => "", 
	"CHAIN_ITEM_LINK" => "", 
	"IGNORE_CUSTOM_TEMPLATE" => "Y", 
	"USE_EXTENDED_ERRORS" => "Y", 
	"CACHE_TYPE" => "A", 
	"CACHE_TIME" => "3600", 
	"SEF_FOLDER" => "/", 
	"VARIABLE_ALIASES" => Array(
		)
	)
); exit();?>

<div class="">
	<div class="sat-modal-dialog">
		<div class="uk-modal-content">
			<input type="text" value="" placeholder="Имя" class="form-control uk-width-1-1 input-lg text-xs-center">
			<br/>
			<input id="phone" type="text" value="" placeholder="Номер телефона" class="form-control uk-width-1-1 input-lg text-xs-center">
		</div>
		<div class="uk-modal-footer text-xs-right">
			<button type="button" class="btn btn-lg uk-modal-close">Отмена</button>
			<button type="button" class="btn btn-lg btn--accent btn--raised js-modal-ok">Отправить</button>
		</div>
	</div>
</div>