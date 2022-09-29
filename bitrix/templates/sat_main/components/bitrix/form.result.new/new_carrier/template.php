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

<?= $arResult["QUESTIONS"]["city"]["HTML_CODE"] ?>

<table class="form-table data-table">
  <tbody>
    <tr>
      <td class="first-item">
        <div class="main-info-row">
          <label><?= GetMessage("fullname");?></label><br>
          <?=$arResult["QUESTIONS"]["fullname"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("phone");?></label><br>
          <?=$arResult["QUESTIONS"]["phone"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("type");?></label><br>
          <?=$arResult["QUESTIONS"]["type"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("city");?></label><br>
          <?=$arResult["QUESTIONS"]["city_name"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("flp");?></label><br>
          <?=$arResult["QUESTIONS"]["flp"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("relocation");?></label><br>
          <?=$arResult["QUESTIONS"]["relocation"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr>
      <td colspan="2">
        <label><?= GetMessage("comment");?><br></label>
        <?=$arResult["QUESTIONS"]["comment"]["HTML_CODE"]?>
      </td>
    </tr>

    <!-- Auto 1 -->

    <tr>
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("brand");?></label><br>
          <?=$arResult["QUESTIONS"]["brand1"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("year");?></label><br>
          <?=$arResult["QUESTIONS"]["year1"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("volume");?></label><br>
          <?=$arResult["QUESTIONS"]["volume1"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("payload");?></label><br>
          <?=$arResult["QUESTIONS"]["payload1"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("compartmenttype");?></label><br>
          <?=$arResult["QUESTIONS"]["compartmenttype1"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item"></td>
    </tr>

    <tr>
      <td colspan=2 style="font-weight: bold;font-size: 18px;text-align:center;">
        <?= GetMessage("compartmentTitle");?>
      </td>
    </tr>

    <tr>
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("length");?></label><br>
          <?=$arResult["QUESTIONS"]["length1"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("width");?></label><br>
          <?=$arResult["QUESTIONS"]["width1"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr>
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("height");?></label><br>
          <?=$arResult["QUESTIONS"]["height1"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("taillift");?></label><br>
          <?=$arResult["QUESTIONS"]["taillift1"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr>
      <td colspan="2">
        <label><?= GetMessage("commentAuto");?><br></label>
        <?=$arResult["QUESTIONS"]["comment1"]["HTML_CODE"]?>
      </td>
    </tr>

    <!-- Auto 2 -->

    <tr class="auto2 hide">
      <td colspan=2 style="font-weight: bold;font-size: 18px;text-align:center;backrgound-color:#eee;">
        <?= GetMessage("auto");?> 2
      </td>
    </tr>

    <tr class="auto2 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("brand");?></label><br>
          <?=$arResult["QUESTIONS"]["brand2"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("year");?></label><br>
          <?=$arResult["QUESTIONS"]["year2"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto2 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("volume");?></label><br>
          <?=$arResult["QUESTIONS"]["volume2"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("payload");?></label><br>
          <?=$arResult["QUESTIONS"]["payload2"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto2 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("compartmenttype");?></label><br>
          <?=$arResult["QUESTIONS"]["compartmenttype2"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item"></td>
    </tr>

    <tr class="auto2 hide">
      <td colspan=2 style="font-weight: bold;font-size: 18px;text-align:center;">
        <?= GetMessage("compartmentTitle");?>
      </td>
    </tr>

    <tr class="auto2 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("length");?></label><br>
          <?=$arResult["QUESTIONS"]["length2"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("width");?></label><br>
          <?=$arResult["QUESTIONS"]["width2"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto2 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("height");?></label><br>
          <?=$arResult["QUESTIONS"]["height2"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("taillift");?></label><br>
          <?=$arResult["QUESTIONS"]["taillift2"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto2 hide">
      <td colspan="2">
        <label><?= GetMessage("commentAuto");?><br></label>
        <?=$arResult["QUESTIONS"]["comment2"]["HTML_CODE"]?>
      </td>
    </tr>

    <!-- Auto 3 -->

    <tr class="auto3 hide">
      <td colspan=2 style="font-weight: bold;font-size: 18px;text-align:center;backrgound-color:#eee;">
        <?= GetMessage("auto");?> 3
      </td>
    </tr>

    <tr class="auto3 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("brand");?></label><br>
          <?=$arResult["QUESTIONS"]["brand3"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("year");?></label><br>
          <?=$arResult["QUESTIONS"]["year3"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto3 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("volume");?></label><br>
          <?=$arResult["QUESTIONS"]["volume3"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("payload");?></label><br>
          <?=$arResult["QUESTIONS"]["payload3"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto3 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("compartmenttype");?></label><br>
          <?=$arResult["QUESTIONS"]["compartmenttype3"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item"></td>
    </tr>

    <tr class="auto3 hide">
      <td colspan=2 style="font-weight: bold;font-size: 18px;text-align:center;">
        <?= GetMessage("compartmentTitle");?>
      </td>
    </tr>

    <tr class="auto3 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("length");?></label><br>
          <?=$arResult["QUESTIONS"]["length3"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("width");?></label><br>
          <?=$arResult["QUESTIONS"]["width3"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto3 hide">
      <td>
        <div class="main-info-row">
          <label><?= GetMessage("height");?></label><br>
          <?=$arResult["QUESTIONS"]["height3"]["HTML_CODE"]?>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <label><?= GetMessage("taillift");?></label><br>
          <?=$arResult["QUESTIONS"]["taillift3"]["HTML_CODE"]?>
        </div>
      </td>
    </tr>

    <tr class="auto3 hide">
      <td colspan="2">
        <label><?= GetMessage("commentAuto");?><br></label>
        <?=$arResult["QUESTIONS"]["comment3"]["HTML_CODE"]?>
      </td>
    </tr>


    <tr>
      <td>
        <div class="main-info-row">
          <button class="submit-button" id="addAuto"><?= GetMessage("addAuto");?></button>
        </div>
      </td>
      <td class="second-item">
        <div class="main-info-row">
          <button class="submit-button hide btn-remove-auto" id="removeAuto"><?= GetMessage("removeAuto");?></button>
        </div>
      </td>
    </tr>

  </tbody>
  <tfoot>
    <? if($arResult["isUseCaptcha"] == "Y") { ?>
      <tr>
        <td></td>
      </tr>
      <tr>
        <td><label><?=GetMessage("FORM_CAPTCHA_FIELD_TITLE")?><?=$arResult["REQUIRED_SIGN"];?></label></td>
        <td>
          <div class="main-info-row two-params">
            <input type="hidden" name="captcha_sid" value="<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" />
            <img src="/bitrix/tools/captcha.php?captcha_sid=<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" width="180" height="40" /><br>
            <input type="text" name="captcha_word" size="30" maxlength="50" value="" class="inputtext" />
          </div>
        </td>
      </tr>
    <? } ?>
  </tfoot>
</table>
<div class="rate-wrap">
  <input class="submit-button" id='btnSend' <?=(intval($arResult["F_RIGHT"]) < 10 ? "disabled=\"disabled\"" : "");?> type="submit" name="web_form_submit" value="<?=htmlspecialcharsbx(strlen(trim($arResult["arForm"]["BUTTON"])) <= 0 ? GetMessage("FORM_ADD") : GetMessage("SEND"));?>" />
</div>
<?=$arResult["FORM_FOOTER"]?>
<?
} //endif (isFormNote)
?>
