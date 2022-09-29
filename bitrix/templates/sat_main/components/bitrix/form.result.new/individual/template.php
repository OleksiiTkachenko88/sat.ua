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

			<?if($arQuestionsCheck["SIMPLE_QUESTION_127_1"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_FIO")?>">
				<div class="input-group-addon">
				<i class="fa fa-user fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control user" name="form_text_668" value="<?=$_POST["form_text_668"]?>" placeholder="<?echo GetMessage("Q_FIO")?>">
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_917_1"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_PHONE")?>">
				<div class="input-group-addon">
				<i class="fa fa-mobile fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control phone" name="form_text_669" value="<?=$_POST["form_text_669"]?>" placeholder="<?echo GetMessage("Q_PHONE")?>">
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_416_1"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_COUNT")?>">
				<div class="input-group-addon">
				<i class="fa fa-dropbox fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control" name="form_text_671" value="<?=$_POST["form_text_671"]?>" placeholder="<?echo GetMessage("Q_COUNT")?>">
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["SIMPLE_QUESTION_304_1"]["ACTIVE"] == "Y"):?>
			<div class="additional-information" title="<?echo GetMessage("Q_ADDITIONAL_INFO")?>">
				<textarea name="form_textarea_40" cols="40" rows="5" class="inputtextarea form-control" maxlength="600" value="<?=$_POST["form_text_672"]?>" placeholder="<?echo GetMessage("Q_ADDITIONAL_INFO")?>"></textarea>
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
