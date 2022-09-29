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
			<span><?echo GetMessage("HEADER2")?></span>
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

			<?if($arQuestionsCheck["REGION_QUESTION_1274"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_FIO")?>">
				<div class="input-group-addon">
				<i class="fa fa-user fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control user" name="form_text_505" value="<?=$_POST["form_text_505"]?>" placeholder="<?echo GetMessage("Q_FIO")?>">
			</div>
			<?endif;?>

			<?if($arQuestionsCheck["REGION_QUESTION_9174"]["ACTIVE"] == "Y"):?>
			<div class="input-group" title="<?echo GetMessage("Q_PHONE")?>">
				<div class="input-group-addon">
				<i class="fa fa-mobile fa-2x" aria-hidden="true"></i>
				</div>
				<input type="text" class="inputtext form-control phone" name="form_text_506" value="<?=$_POST["form_text_506"]?>" placeholder="<?echo GetMessage("Q_PHONE")?>">
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
