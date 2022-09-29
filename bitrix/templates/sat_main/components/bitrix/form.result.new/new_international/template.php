<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<?
$arQuestions = $arResult["QUESTIONS"];
$arQuestionsCheck = $arResult["arQuestions"];
?>

<div class="col-xs-12">
	<div class="border-block">
		<div class="header clearfix">
			<div class="img-wrap">
				<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray20.png" alt="">
			</div>
			<span><?echo GetMessage("HEADER")?></span>
		</div>

<?if ($arResult["isFormNote"] != "Y")
{
?>
		<div class="questions-list">
<?=$arResult["FORM_HEADER"]?>

<?if ($arResult["isFormErrors"] == "Y"):?>
<script>
$(function () {
	var coord_obj = $(".form-error").offset();
	window.scrollTo(0, coord_obj.top-150);
});
</script>
			<!--<div class="form-error"><?=$arResult["FORM_ERRORS_TEXT"];?></div>-->
			<div class="form-error">
				<font class="errortext"><?echo GetMessage("ERROR_MESSAGE");?>
				</font>
			</div>
<?endif;?>

	<?foreach ($arResult["QUESTIONS"] as $FIELD_SID => $arQuestion):?>

		<?if (is_array($arResult["FORM_ERRORS"]) && array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])):?>
		<span class="error-fld" title="<?=htmlspecialcharsbx($arResult["FORM_ERRORS"][$FIELD_SID])?>"></span>
		<?endif;?>
	<?endforeach;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_127"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_FIO")?>">
				<div class="input-group-addon">
				<i class="fa fa-user fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control user" name="form_text_34" value="<?=$_POST["form_text_34"]?>" placeholder="<?echo GetMessage("Q_FIO")?>">
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_917"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_PHONE")?>">
				<div class="input-group-addon">
				<i class="fa fa-mobile fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control phone" name="form_text_35" value="<?=$_POST["form_text_35"]?>" placeholder="<?echo GetMessage("Q_PHONE")?>">
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_423"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_MAIL")?>">
				<div class="input-group-addon">
				<i class="fa fa-envelope fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control mail" name="form_text_36" value="<?=$_POST["form_text_36"]?>" placeholder="<?echo GetMessage("Q_MAIL")?>">
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_416"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_COUNT")?>">
				<div class="input-group-addon">
				<i class="fa fa-dropbox fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control" name="form_text_37" value="<?=$_POST["form_text_37"]?>" placeholder="<?echo GetMessage("Q_COUNT")?>">
			</div>
			<?endif;?>


<?if($arQuestionsCheck["SIMPLE_QUESTION_995"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_OB")?>">
				<div class="input-group-addon">
				<i class="fa fa-dropbox fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control" name="form_text_52" value="<?=$_POST["form_text_52"]?>" placeholder="<?echo GetMessage("Q_OB")?>">
			</div>
			<?endif;?>




			<?if($arQuestionsCheck["SIMPLE_QUESTION_342"]["ACTIVE"] == "Y" && $arQuestionsCheck["SIMPLE_QUESTION_419"]["ACTIVE"] == "Y"):?>
			<div class="country-block">
				<div class="input-group country" title="<?echo GetMessage("Q_COUNTRY_FROM")?>">
					<div class="input-group-addon">
					<i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
					</div>
					<input type="text" class="inputtext form-control country-from" name="form_text_38" value"<?=$_POST["form_text_38"]?>" placeholder="<?echo GetMessage("Q_COUNTRY_FROM")?>">
				</div>

				<div class="change-block" style="display:none">
					<i class="fa fa-exchange fa-2x" aria-hidden="true"></i>
				</div>

				<div class="input-group country" title="<?echo GetMessage("Q_COUNTRY_TO")?>">
					<div class="input-group-addon">
					<i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
					</div>
					<input type="text" class="inputtext form-control country-to" name="form_text_39" value="<?=$_POST["form_text_39"]?>" placeholder="<?echo GetMessage("Q_COUNTRY_TO")?>">
				</div>
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_304"]["ACTIVE"] == "Y"):?>
			<div class="additional-information" title="<?echo GetMessage("Q_ADDITIONAL_INFO")?>">
				<textarea name="form_textarea_40" cols="40" rows="5" class="inputtextarea form-control" maxlength="600" value="<?=$_POST["form_text_40"]?>" placeholder="<?echo GetMessage("Q_ADDITIONAL_INFO")?>"></textarea>
			</div>
			<?endif;?>
			<div class="btn-block">
				<div class="rate-wrap">
					<input class="submit-button" <?=(intval($arResult["F_RIGHT"]) < 10 ? "disabled=\"disabled\"" : "");?> type="submit" name="web_form_submit" value="<?=htmlspecialcharsbx(strlen(trim($arResult["arForm"]["BUTTON"])) <= 0 ? GetMessage("FORM_ADD") : GetMessage("SEND"));?>" />
				</div>
			</div>
		</div>
<?
} //endif (isFormNote)
?>
		<?if(strlen($arResult["FORM_NOTE"])>0):?>

		<div class="questions-list">
		<div class="rate-wrap">
			<h3 class="success-text"><?/*=$arResult["FORM_NOTE"]*/  echo GetMessage("SUCCESS_MESSAGE")?></h3>
		</div>
		</div>
<script>
$(function () {
	var coord_obj = $(".success-text").offset();
	window.scrollTo(0, coord_obj.top-150);
});
</script>
		<?endif;?>

	</div>
</div>
