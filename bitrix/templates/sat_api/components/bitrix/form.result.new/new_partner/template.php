<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<?if ($arResult["isFormErrors"] == "Y"):?><?=$arResult["FORM_ERRORS_TEXT"];?><?endif;?>
<?if ($arResult["isFormErrors"] == "N" && $arResult["isFormNote"] == "Y"){?>
<div class='form-note'>
	<span><?=GetMessage("FORM_NOTE")?></span>
</div>
<?}?>
<?if ($arResult["isFormNote"] != "Y")
{
?>
<?=$arResult["FORM_HEADER"]?>


<table>
<?
if (D["isFormDescription"] == "Y" || $arResult["isFormTitle"] == "Y" || $arResult["isFormImage"] == "Y")
{
?>
	<tr>
		<td><?
/***********************************************************************************
					form header
***********************************************************************************/
if ($arResult["isFormTitle"])
{
?>
	<h1><?=GetMessage("FORM_TITLE_PARTNERS")?></h1>
<?
} //endif ;

	if ($arResult["isFormImage"] == "Y")
	{
	?>
	<a href="<?=$arResult["FORM_IMAGE"]["URL"]?>" target="_blank" alt="<?=GetMessage("FORM_ENLARGE")?>"><img src="<?=$arResult["FORM_IMAGE"]["URL"]?>" <?if($arResult["FORM_IMAGE"]["WIDTH"] > 300):?>width="300"<?elseif($arResult["FORM_IMAGE"]["HEIGHT"] > 200):?>height="200"<?else:?><?=$arResult["FORM_IMAGE"]["ATTR"]?><?endif;?> hspace="3" vscape="3" border="0" /></a>
	<?//=$arResult["FORM_IMAGE"]["HTML_CODE"]?>
	<?
	} //endif
	?>
		</td>
	</tr>
	<?
} // endif
	?>
</table>
<br />
<?
/***********************************************************************************
						form questions
***********************************************************************************/
?>
<table class="form-table data-table">
<tbody>
<!--start top-->
<tr>
	<td class="first-item">
		<div class="main-info-row">
			<lable><?echo GetMessage("Q1");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_121"]["HTML_CODE"]?>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row">
			<lable><?echo GetMessage("Q5");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_859"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div class="main-info-row">
			<lable><?echo GetMessage("Q2");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_643"]["HTML_CODE"]?>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row">
			<lable><?echo GetMessage("Q6");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_901"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div class="main-info-row">
			<lable><?echo GetMessage("Q3");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_752"]["HTML_CODE"]?>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row">
			<lable><?echo GetMessage("Q7");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_759"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div class="main-info-row">
			<lable><?echo GetMessage("Q4");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_831"]["HTML_CODE"]?>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row">
			<lable><?echo GetMessage("Q8");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_375"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<!--end top-->

<!--start main-->
<tr>
	<td>
		<div>
			<lable><?echo GetMessage("Q_TRANSPORT");?></lable>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row two-params">
			<lable><?echo GetMessage("Q9");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_177"]["HTML_CODE"]?>
		</div>
		<div class="main-info-row two-params">
			<lable><?echo GetMessage("Q10");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_435"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div>
			<lable><?echo GetMessage("Q_OFFICE");?></lable>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row one-param">
			<lable><?echo GetMessage("Q11");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_910"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div>
			<lable><?echo GetMessage("Q_SKLAD");?></lable>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row one-param">
			<lable><?echo GetMessage("Q12");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_265"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div>
			<lable><?echo GetMessage("Q_TECH");?></lable>
		</div>
	</td>
	<td class="second-item">
		<div class="main-info-row one-param">
			<lable><?echo GetMessage("Q13");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_531"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td colspan="2">
		<div class="main-info-row">
			<lable><?echo GetMessage("Q14");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_697"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td colspan="2">
		<div class="main-info-row">
			<lable><?echo GetMessage("Q15");?></lable><br>
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_263"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<tr>
	<td>
		<div>
			<lable><?echo GetMessage("Q16");?></lable>
		</div>
	</td>
	<td>
		<div class="main-info-row">
			<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_845"]["HTML_CODE"]?>
		</div>
	</td>
</tr>
<!--end main-->
<!--start bottom-->
<tr>
	<td colspan="2"><lable><?echo GetMessage("Q17");?></lable></td>
</tr>
<tr>
	<td colspan="2"><?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_868"]["HTML_CODE"]?></td>
</tr>
<!--end bottom-->
</tbody>
<tfoot>
	<tr>
<?
if($arResult["isUseCaptcha"] == "Y")
{
?>
		<tr>
			<td></td>
		</tr>
		<tr>
			<td><lable><?=GetMessage("FORM_CAPTCHA_FIELD_TITLE")?><?=$arResult["REQUIRED_SIGN"];?></lable></td>
			<td>
				<div class="main-info-row two-params">
					<input type="hidden" name="captcha_sid" value="<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" />
					<img src="/bitrix/tools/captcha.php?captcha_sid=<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" width="180" height="40" /><br>
					<input type="text" name="captcha_word" size="30" maxlength="50" value="" class="inputtext" />
				</div>
			</td>
		</tr>
<?
} // isUseCaptcha
?>
</tfoot>
</table>
<div class="rate-wrap">
	<input class="submit-button" <?=(intval($arResult["F_RIGHT"]) < 10 ? "disabled=\"disabled\"" : "");?> type="submit" name="web_form_submit" value="<?=htmlspecialcharsbx(strlen(trim($arResult["arForm"]["BUTTON"])) <= 0 ? GetMessage("FORM_ADD") : GetMessage("SEND"));?>" />
</div>
<?=$arResult["FORM_FOOTER"]?>
<?
} //endif (isFormNote)
?>