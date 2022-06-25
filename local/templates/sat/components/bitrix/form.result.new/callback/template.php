<?
	if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die(); 
?>

<script>
    $(document).ready(function(){
    	//$(".phone_masked").mask("+7(999) 999-99-99");
    })    
</script>

<div class="">
	<div class="sat-modal-dialog">
		<? if ($arResult["isFormNote"] != "Y") { ?>
		<?=str_replace('<form', '<form class="form-horizontal" ', $arResult["FORM_HEADER"]);?>
			<div class="uk-modal-content">
				<h3 class="text-center"><?=$arResult['arForm']["NAME"]?></h3>
				<?if ($arResult["isFormErrors"] == "Y") { ?>
					<div class="form-group">
						<label class="col-sm-1 control-label">
							&nbsp;
						</label>
						<div class="col-sm-11 text-danger" style="padding-top:8px;color:red;">
							<?=implode('<br/>', $arResult['FORM_ERRORS']); ?>
						</div>
						<br/><br/>
					</div>
				<? } ?>
				<?
				foreach ($arResult["QUESTIONS"] as $FIELD_SID => $arQuestion)
				{
					if ($arQuestion['STRUCTURE'][0]['FIELD_TYPE'] == 'hidden')
					{
						echo $arQuestion["HTML_CODE"];
					}
					else
					{
						//if($arQuestion['STRUCTURE'][0]['FIELD_TYPE'] == 'text' || $arQuestion['STRUCTURE'][0]['FIELD_TYPE'] == 'email'):
						
						switch($arQuestion['STRUCTURE'][0]['FIELD_TYPE'])
						{
							case 'text':
							?>
								<input
								<?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])) {?>
									placeholder="<?=$arQuestion["CAPTION"]?>: Заполните поле"
								<? } else { ?>
									placeholder="<?=$arQuestion["CAPTION"]?> "
								<? } ?>
								name="form_<?=$arQuestion['STRUCTURE'][0]['FIELD_TYPE']?>_<?=$arQuestion['STRUCTURE'][0]["ID"]?>"
								type="<?=$arQuestion['STRUCTURE'][0]['FIELD_TYPE']?>"
								class="form-control uk-width-1-1 input-lg text-xs-center <?if($FIELD_SID == "PHONE"):?>phone_masked<?endif;?>
									<?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])):?>
										error
									<?endif;?>"
								value="<?=$_REQUEST["form_".$arQuestion['STRUCTURE'][0]['FIELD_TYPE']."_".$arQuestion['STRUCTURE'][0]['ID']]?>"/>
								<br/>
								
							<?
							break;
							?>
							<?
							case 'textarea':
							?>
							<textarea 
								<?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])) {?>
									placeholder="<?=$arQuestion["CAPTION"]?>: Заполните поле"
								<? } else { ?>
									placeholder="<?=$arQuestion["CAPTION"]?> "
								<? } ?>
								name="form_<?=$arQuestion['STRUCTURE'][0]['FIELD_TYPE']?>_<?=$arQuestion['STRUCTURE'][0]["ID"]?>"
								class="form-control uk-width-1-1 input-lg text-xs-center 
									<?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])):?>
										error
									<?endif;?>"
								><?=$_REQUEST["form_".$arQuestion['STRUCTURE'][0]['FIELD_TYPE']."_".$arQuestion['STRUCTURE'][0]['ID']]?></textarea>
							<?
							break;
							?>
						<?
						}
					}
				}
				?>
			</div>
			<div class="uk-modal-footer text-xs-right">
				<button type="button" class="btn btn-lg uk-modal-close">Отмена</button>
				<input  class="btn btn-lg btn--accent btn--raised jjs-modal-ok" <?=(intval($arResult["F_RIGHT"]) < 10 ? "disabled=\"disabled\"" : "");?> type="submit" name="web_form_submit" value="<?=htmlspecialcharsbx(strlen(trim($arResult["arForm"]["BUTTON"])) <= 0 ? GetMessage("FORM_ADD") : $arResult["arForm"]["BUTTON"]);?>" />
				
				<?/*
<button type="button" class="btn btn-lg uk-modal-close">Отмена</button>
				<button type="button" class="btn btn-lg btn--accent btn--raised js-modal-ok">Отправить</button>
*/?>
			</div>
			<?=$arResult["FORM_FOOTER"]?>
<? 
		} //END FORM_NOTE
		else
		{
			?>
			<div class="uk-modal-content">
				<h3 class="text-center">Спасибо, ваша заявка отправлена!</h3>
			</div>
			<?
		}
		?>
	</div>
</div>
<? /*
	<div class="col-sm-12 individual_offer">
		<div class="form-group">
			<h4 class="text-center"><?=$arResult["FORM_NOTE"]?></h4>
			
		</div>
		<? if ($arResult["isFormNote"] != "Y") { ?>
			<?=str_replace('<form', '<form class="form-horizontal" style="min-width:400px;max-width:500px;" ', $arResult["FORM_HEADER"]);?>

			<? if ($arResult["isFormTitle"]) { ?>
				<div class="form-group">
					<h3 class="col-sm-12 text-center"><?=$arResult["FORM_TITLE"]?></h3>
				</div>
			<? } ?>
			<?if ($arResult["isFormErrors"] == "Y") { ?>
				<div class="form-group">
					<label class="col-sm-1 control-label">
						&nbsp;
					</label>
					<div class="col-sm-11 text-danger" style="padding-top:8px;">
						<?=implode('<br/>', $arResult['FORM_ERRORS']); ?>
					</div>
				</div>
			<? } ?>
			<?
			foreach ($arResult["QUESTIONS"] as $FIELD_SID => $arQuestion)
			{
				if ($arQuestion['STRUCTURE'][0]['FIELD_TYPE'] == 'hidden')
				{
					echo $arQuestion["HTML_CODE"];
				}
				else
				{
					//if($arQuestion['STRUCTURE'][0]['FIELD_TYPE'] == 'text' || $arQuestion['STRUCTURE'][0]['FIELD_TYPE'] == 'email'):
					
					switch($arQuestion['STRUCTURE'][0]['FIELD_TYPE'])
					{
						case 'text':
						?>
						<div class="form-group <?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])):?>has-error<?endif;?>">
							<label class="col-sm-3 control-label">
								<?=$arQuestion["CAPTION"]?> <?if ($arQuestion["REQUIRED"] == "Y"):?>*<?endif;?>
							</label>
							<div class="col-sm-8">
								<input
								<?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])) {?>
									placeholder="<?=$arQuestion["CAPTION"]?>: Заполните поле"
								<? } else { ?>
									placeholder="<?=$arQuestion["CAPTION"]?> "
								<? } ?>
								name="form_<?=$arQuestion['STRUCTURE'][0]['FIELD_TYPE']?>_<?=$arQuestion['STRUCTURE'][0]["ID"]?>"
								type="<?=$arQuestion['STRUCTURE'][0]['FIELD_TYPE']?>"
								class="form-control <?if($FIELD_SID == "PHONE"):?>phone_masked<?endif;?>
									<?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])):?>
										error
									<?endif;?>"
								value="<?=$_REQUEST["form_".$arQuestion['STRUCTURE'][0]['FIELD_TYPE']."_".$arQuestion['STRUCTURE'][0]['ID']]?>"/>
							</div>
						</div>
						<?
						break;
						
						case 'textarea':
						?>
						<div class="form-group">
							<label class="col-sm-3 control-label"><?=$arQuestion["CAPTION"]?></label>
							<div class="col-sm-8">
								<textarea
									<?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])) {?>
										placeholder="<?=$arQuestion["CAPTION"]?>: Заполните поле"
									<? } else { ?>
										placeholder="<?=$arQuestion["CAPTION"]?>"
									<? } ?>
									rows="5"
									class="form-control <?if(array_key_exists($FIELD_SID, $arResult['FORM_ERRORS'])):?>error<?endif;?>"
									name="form_<?=$arQuestion['STRUCTURE'][0]['FIELD_TYPE']?>_<?=$arQuestion['STRUCTURE'][0]["ID"]?>"
									type="<?=$arQuestion['STRUCTURE'][0]['FIELD_TYPE']?>"><?=$_REQUEST["form_".$arQuestion['STRUCTURE'][0]['FIELD_TYPE']."_".$arQuestion['STRUCTURE'][0]['ID']]?></textarea>
							</div>
						</div>
						<?
						break;
					}
				}
			} 
			?>
			
			<?
			if($arResult["isUseCaptcha"] == "Y")
			{
			?>
					<div class="form-group">
						<label class="col-sm-3 control-label">
							<?=GetMessage("FORM_CAPTCHA_FIELD_TITLE")?><?=$arResult["REQUIRED_SIGN"];?>
						</label>
						<div class="col-sm-8" style="padding-top:8px;">
							<input type="hidden" name="captcha_sid" value="<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" /><img src="/bitrix/tools/captcha.php?captcha_sid=<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" width="180" height="40" />
							<br/><br/>
							<input type="text" name="captcha_word" size="30" maxlength="50" value="" class="inputtext" />
						</div>
					</div>
			<?
			} // isUseCaptcha
			?>			

				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-8">
						<?//<button type="submit" class="btn btn-primary">Запросить индивидуальное предложение</button>?>
						<input  class="btn btn-primary" <?=(intval($arResult["F_RIGHT"]) < 10 ? "disabled=\"disabled\"" : "");?> type="submit" name="web_form_submit" value="<?=htmlspecialcharsbx(strlen(trim($arResult["arForm"]["BUTTON"])) <= 0 ? GetMessage("FORM_ADD") : $arResult["arForm"]["BUTTON"]);?>" />

					</div>
				</div>
			<?=$arResult["FORM_FOOTER"]?>
		<? 
		} //END FORM_NOTE
		else
		{
			?>
			<script>
				//ga('send', 'event', 'Форма','Отправка', 'Консультация автоматизация');
				//yaCounter25452629.reachGoal('SendForm');
			</script>
			<?
		}
		?>
	</div>

*/