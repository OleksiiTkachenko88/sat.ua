<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Розрахувати вартість перевезення - Транспортна компанія “САТ” | ВИГІДНО! НАДІЙНО! ВЧАСНО! ☎ 0 800 30 99 09 (безкоштовно по Україні)");
$APPLICATION->SetPageProperty("title", "Розрахувати вартість перевезення | Транспортна компанія “САТ”");
$APPLICATION->SetTitle("Розрахувати вартість перевезення");

function remove_utf8_bom($text) {
  $bom = pack('H*','EFBBBF');
  return preg_replace("/^$bom/", '', $text);
}

function getConditionsOptions($url) {
  $apiLang = getMessage('API_LANG');
  $tmp = file_get_contents("{$url}?language={$apiLang}");
  if (!$tmp) return '';
	$tmp2 = json_decode(remove_utf8_bom($tmp), TRUE);
  if (!$tmp2['success']) return '';
  $options = '';
  foreach ($tmp2['data'] as $v) $options .= "<option value=\"{$v['ref']}\">{$v['description']}</option>";
  return $options;
}

$departureConditionsOptions = getConditionsOptions("{$api_host}main/json/getDepartureConditions");
$deliveryConditionsOptions = getConditionsOptions("{$api_host}main/json/getDeliveryConditions");

$pathIconStore = SITE_TEMPLATE_PATH . "/img/icons/icon-black1.png";
$pathIconDoor = SITE_TEMPLATE_PATH . "/img/icons/icon-black2.png";
$pathIconTariff = SITE_TEMPLATE_PATH . "/img/icons/icon-gray17.png";
$pathIconDate = SITE_TEMPLATE_PATH . "/img/icons/icon-gray16.png";
$pathIconTime = SITE_TEMPLATE_PATH . "/img/icons/icon-gray18.png";
?>

<style>
  .visually-hidden {
    position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
  }

  .hide {
    display: none;
  }

  .wrapper-calculate-header {
    border-bottom: 1px solid #acacac;
    padding: 0 15px;
    background-color: #ffd64a;
    margin-bottom: 15px;
  }

  .calculate-header {
    height: 60px;
    display: flex;
    align-items: center;
  }

  .calculate-header__img {
    max-height: 36px;
    max-width: 45px;
    margin-right: 15px;
    flex-shrink: 0;
  }

  .calculate-header__title {
    font-size: 16px;
    line-height: 18px;
    font-family: inherit;
    color: #404041;
    text-transform: uppercase;
  }

  .delivery-tabs {
    display: flex;
    border-bottom: 1px solid #acacac;
    height: 65px;
    line-height: 65px;
    text-align: center;
  }

  .delivery-tabs__item {
    width: 50%;
    font-size: 16px;
    color: #404041;
    background-color: #ffd64a;
  }

  .delivery-tabs__input:checked + .delivery-tabs__item  {
    background-color: white;
  }

  .delivery-tabs__input:disabled + .delivery-tabs__item  {
    background-color: #d5d5d5;
    opacity: .7;
    cursor: default;
  }

  .delivery-tabs__item-img {
    vertical-align: middle;
    margin-right: 18px;
    height: 31px;
  }

  .block-tariff {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 36px;
    color: #404041;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
  }

  .block-tariff__img {
    margin-right: 7px;
    height: 24px;
  }

  .block-tariff__select {
    width: 120px;
  }

  .block-tariff .jq-selectbox:not(.opened) .jq-selectbox__select {
    border: 1px solid transparent !important;
  }

  .time-date-row {
    display: flex;
    float: left;
    flex-wrap: wrap;
  }

  .block-datepicker {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 36px;
    color: #404041;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
  }

  .block-datepicker__img {
    margin-right: 7px;
    height: 24px;
  }

  .block-datepicker__input {
    width: 107px;
    text-align: center;
    padding: 0;
    cursor: pointer;
    height: 36px;
    border: 1px solid #acacac;
  }

  .block-datepicker__input:disabled {
    background-color: #e2e2e2;
  }

  .block-timepicker {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 36px;
    color: #404041;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
  }

  .block-timepicker__img {
    margin-right: 7px;
    height: 24px;
  }

  .block-timepicker__text {
    margin-right: 7px;
  }

  .block-timepicker__select {
    margin-right: 7px;
    width: 67px;
  }

  .block-timepicker__select .jq-selectbox__select {
    font-size: 14px !important;
  }

  .block-timepicker__select.disabled .jq-selectbox__select {
    cursor: default;
    background-color: #e2e2e2;
  }

  .block-timepicker .jq-selectbox__trigger::after {
    display: none !important;
  }

  .block-timepicker .jq-selectbox__dropdown {
    width: 100%;
    text-align: center;
  }

  .block-timepicker .jq-selectbox__dropdown li {
    padding: 0 !important;
  }

  .field-wrap input[type="number"] {
    width: 100px !important;
  }

  .wrapper-btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px -20px 10px 0;
  }

  .submit-button--calc {
    margin: 0 20px 20px 0 !important;
  }

  .options-info-item .options-info-item {
    margin-left: 20px;
  }

  .options-body > .options-info-item:first-child {
    margin-top: -9px;
  }

  .options-info-item .options-info-item .parcel-block-subtitle::before {
    background: #2c66a0;
  }

  .options-info-item .options-info-item .options-body {
    background-color: #f3f3f3;
  }
</style>

<div class="calculate-section">
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <div class="tracking-table">
          <div class="calculate-wrapper">
            <div class="wrapper-calculate-header">
              <div class="calculate-header">
                <img
                  class="calculate-header__img"
                  src="<?= SITE_TEMPLATE_PATH ?>/img/icons/icon_calc_top.png"
                  alt="<?= getMessage("ALT_CALC_LOGO"); ?>"
                />
                <h1 class="calculate-header__title"><?$APPLICATION->ShowTitle(false);?></h1>
              </div>
            </div>

            <div class="section-from">
              <div class="directions-row">
                <a id="toggleDir" class="toggle-dir">
                  <img src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black-toggle.png" />
                </a>
                <div class="direction-item direction-from">
                  <div class="icon-dir">A</div>
                  <input
                    id="fromDir"
                    class="direction-field"
                    placeholder="<?=GetMessage("ENTER_FROM_PUNKT");?>"
                  />
                </div>
              </div>

              <div class="delivery-row wrapper-parcel-info">
                <div class="delivery-item clearfix">
                  <div class="delivery-tabs">
                    <input
                      id="fromTabStore"
                      class="delivery-tabs__input visually-hidden"
                      type="radio"
                      name="from-delivery-tabs"
                      value="0"
                      checked
                    />

                    <label class="delivery-tabs__item" for="fromTabStore">
                      <img class="delivery-tabs__item-img" src="<?= $pathIconStore; ?>" />
                      <?= GetMessage("STORE"); ?>
                    </label>

                    <input
                      id="fromTabDoor"
                      class="delivery-tabs__input visually-hidden"
                      type="radio"
                      name="from-delivery-tabs"
                      value="1"
                    />

                    <label class="delivery-tabs__item" for="fromTabDoor">
                      <img class="delivery-tabs__item-img" src="<?= $pathIconDoor ?>" />
                      <?= GetMessage("ADDRESS"); ?>
                    </label>
                  </div>

                  <div class="time-date-row">
                    <div id="fromWrapperBlockTariff">
                      <div class="block-tariff">
                        <img class="block-tariff__img" src="<?= $pathIconTariff; ?>" />
                        <select id="fromDeliveryType" class="block-tariff__select" />
                          <?= $departureConditionsOptions; ?>
                        </select>
                      </div>
                    </div>

                    <div class="block-datepicker">
                      <img class="block-datepicker__img" src="<?= $pathIconDate; ?>" />
                      <input id="fromDate" class="block-datepicker__input" readonly />
                    </div>

                    <div class="block-timepicker">
                      <img class="block-timepicker__img" src="<?= $pathIconTime; ?>" />
                      <span id="fromTimeStartText" class="block-timepicker__text" />
                        <?= GetMessage("FROM_TIME"); ?>
                      </span>
                      <div id="fromWrapperTimeStart">
                        <select id="fromTimeStart" class="block-timepicker__select"></select>
                      </div>
                      <span id="fromTimeEndText" class="block-timepicker__text">
                        <?= GetMessage("TO_TIME"); ?>
                      </span>
                      <div id="fromWrapperTimeEnd">
                        <select id="fromTimeEnd" class="block-timepicker__select"></select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="section-to">
              <div class="directions-row">
                <div class="direction-item direction-to">
                  <div class="icon-dir">B</div>
                  <input
                    id="toDir"
                    class="direction-field"
                    placeholder="<?= GetMessage("ENTER_TO_PUNKT"); ?>"
                  />
                </div>
              </div>
              <div class="delivery-row wrapper-parcel-info">
                <div class="delivery-item clearfix">
                  <div class="delivery-tabs">
                    <input
                      id="toTabStore"
                      class="delivery-tabs__input visually-hidden"
                      type="radio"
                      name="to-delivery-tabs"
                      value="0"
                      checked
                    />

                    <label class="delivery-tabs__item" for="toTabStore">
                      <img class="delivery-tabs__item-img" src="<?= $pathIconStore; ?>" />
                      <?= GetMessage("STORE"); ?>
                    </label>

                    <input
                      id="toTabDoor"
                      class="delivery-tabs__input visually-hidden"
                      type="radio"
                      name="to-delivery-tabs"
                      value="1"
                    />

                    <label class="delivery-tabs__item" for="toTabDoor">
                      <img class="delivery-tabs__item-img" src="<?= $pathIconDoor; ?>" />
                      <?= GetMessage("ADDRESS"); ?>
                    </label>
                  </div>

                  <div class="time-date-row">
                    <div id="toWrapperBlockTariff">
                      <div class="block-tariff">
                        <img class="block-tariff__img" src="<?= $pathIconTariff; ?>" />
                        <select id="toDeliveryType" class="block-tariff__select" />
                          <?= $deliveryConditionsOptions; ?>
                        </select>
                      </div>
                    </div>

                    <div class="block-datepicker">
                      <img class="block-datepicker__img" src="<?= $pathIconDate; ?>" />
                      <input id="toDate" class="block-datepicker__input" readonly />
                    </div>

                    <div class="block-timepicker">
                      <img class="block-timepicker__img" src="<?= $pathIconTime; ?>" />
                      <span id="toTimeStartText" class="block-timepicker__text" />
                        <?= GetMessage("FROM_TIME"); ?>
                      </span>
                      <div id="toWrapperTimeStart">
                        <select id="toTimeStart" class="block-timepicker__select"></select>
                      </div>
                      <span id="toTimeEndText" class="block-timepicker__text">
                        <?= GetMessage("TO_TIME"); ?>
                      </span>
                      <div id="toWrapperTimeEnd">
                        <select id="toTimeEnd" class="block-timepicker__select"></select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="wrapper-parcel-info clearfix">
              <div class="parcel-main-info clearfix">
                <div class="parcel-block-title">
                  <?= GetMessage("ENTER_GRUZ_TYPE"); ?>
                </div>
                <div class="main-info-item">
                  <div class="main-info-row">
                    <label><?= GetMessage("GRUZ_TYPE"); ?></label>
                    <div class="field-wrap type-block">
                      <select id="typeOfCargo"><!-- AJAX --></select>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("GRUZ_SUBTYPE"); ?></label>
                    <div class="field-wrap subtype-block">
                      <select id="subtypeOfCargo"><!-- AJAX --></select>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("CALC_COUNT"); ?></label>
                    <div class="field-wrap">
                      <input type="number" placeholder="0" id="seatsAmount" />
                      <span><?= GetMessage("ITEMS_SHORT"); ?></span>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("WEIGHT"); ?></label>
                    <div class="field-wrap">
                      <input type="number" placeholder="0" id="weight" />
                      <span><?= GetMessage("KG"); ?></span>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("TOTAL_WEIGHT"); ?></label>
                    <div class="field-wrap">
                      <input type="number" placeholder="0" id="totalWeight" readonly />
                      <span><?=GetMessage("KG");?></span>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("LENGTH"); ?></label>
                    <div class="field-wrap">
                      <input type="number" min="0" placeholder="0" id="length" />
                      <span>см</span>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("WIDTH"); ?></label>
                    <div class="field-wrap">
                      <input type="number" min="0" placeholder="0" id="width" />
                      <span>см</span>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("HEIGHT"); ?></label>
                    <div class="field-wrap">
                      <input type="number" min="0" placeholder="0" id="height" />
                      <span>см</span>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("OBJEM"); ?></label>
                    <div class="field-wrap">
                      <input type="number" min="0" step="0.001" placeholder="0" id="volume" />
                      <span>м<sup>3</sup></span>
                    </div>
                  </div>
                  <div class="main-info-row">
                    <label><?= GetMessage("DECLARED_COST"); ?></label>
                    <div class="field-wrap">
                      <input type="number" placeholder="0" id="declaredCost" min="300" max="50000" />
                      <span>грн</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="parcel-options-info">
                <div class="parcel-block-title"><?= GetMessage("SERVICES"); ?></div>
                <div id="servicesBlock"><!-- AJAX --></div>
              </div>
            </div>
          </div>
          <div class="declaration-wrapper clearfix">
              <!-- <div class="print-time"></div> -->
              <div class="declaration clearfix">
                  <div class="left-info">
                      <div class="barcode">
                          <img src="<?=SITE_TEMPLATE_PATH?>/img/barcode.png" alt="">
                      </div>
                  <!-- Added span with id/class for ajax responce -->
                      <table>
                          <tr>
                            <td rowspan="2" class="top-align center-align">
                              <div class="icon-dir">A</div>
                              <br>
                              <span id="fromType" class="text-dir"></span>
                            </td>
                            <td id="fromCity" class="city"></td>
                          </tr>
                          <tr>
                              <td><span id="fromAddress"></span><br></td>
                          </tr>
                          <tr>
                              <td rowspan="3" class="arrow-align center-align"><img class="arrow"
                                                                                    src="<?=SITE_TEMPLATE_PATH?>/img/declaration-arrow.png"
                                                                                    alt=""></td>
                              <td class="pt">
                                <div id="fromDateTicket" class="date"></div>
                              </td>
                          </tr>
                          <tr>
                              <td>
                                  <div class="upc"></div>
                              </td>
                          </tr>
                          <tr>
                            <td class="pb">
                              <div id="toDateTicket" class="date"></div>
                            </td>
                          </tr>
                          <tr>
                            <td rowspan="2" class="bottom-align center-align">
                              <span id="toType" class="text-dir"></span>
                              <br>
                              <div class="icon-dir">Б</div>
                            </td>
                            <td>
                              <span id="toAddress"></span>
                              <br>
                            </td>
                          </tr>
                          <tr>
                            <td id="toCity" class="city"></td>
                          </tr>
                      </table>
                      <div class="hot-line">
                          <div class="number">0 800 30 99 09</div>
                          <div class="text"><?=GetMessage("FREE_HOT_LINE");?></div>
                      </div>
                  </div>
                  <div class="right-info">
                            <table class="border">
                          <tr>
                              <td><?=GetMessage("GRUZ_TYPE");?></td>
                              <td class="dark upper decType" colspan="4"><?=GetMessage("GRUZ_TYPE_1");?></td>
                          </tr>
                          <tr class="hidden_dec type_2_show type_3_show type_4_show type_5_show">
                              <td><?=GetMessage("GRUZ_SUBTYPE");?></td>
                              <td class="dark upper decSubtype" colspan="4"> </td>
                          </tr>
                          <tr class="hidden_dec type_1_show type_2_show">
                              <td><?=GetMessage("WEIGHT");?></td>
                              <td class="dark"><span class="decWei"></span> кг</td>
                          </tr>
                          <tr class="hidden_dec type_2_show">
                              <td><?=GetMessage("LENGTH");?></td>
                              <td class="dark"><span id="decLen"></span> см</td>
                              <td></td>
                              <td><?=GetMessage("WIDTH");?></td>
                              <td class="dark right"><span id="decWid"></span> см</td>
                          </tr>
                          <tr class="hidden_dec type_2_show">
                              <td><?=GetMessage("HEIGHT");?></td>
                              <td class="dark"><span id="decHei"></span> см</td>
                              <td></td>
                              <td><?=GetMessage("OBJEM");?></td>
                              <td class="dark right"><span id="decVol"></span> м<sup>3</sup></td>
                          </tr>
                          <tr class="hidden_dec type_3_show type_4_show type_5_show">
                              <td><?=GetMessage("CALC_COUNT");?></td>
                              <td class="dark "><span id="decAva"></span></td>
                              <td></td>
                              <td><?=GetMessage("WEIGHT");?></td>
                              <td class="dark right"><span class="decWei"></span> кг</td>
                          </tr>
                          <tr class="hidden_dec type_3_show">
                              <td><?=GetMessage("LENGTH");?></td>
                              <td class="dark"><span id="decLen"></span> см</td>
                              <td></td>
                              <td><?=GetMessage("WIDTH");?></td>
                              <td class="dark right"><span id="decWid"></span> см</td>
                          </tr>
                          <tr class="hidden_dec type_3_show">
                              <td><?=GetMessage("HEIGHT");?></td>
                              <td class="dark"><span id="decHei"></span> см</td>
                              <td></td>
                              <td></td>
                              <td></td>
                          </tr>
                      </table>
                      <table class="border">
                          <tr>
                              <td><?=GetMessage("GABARIT_PRICE");?></td>
                              <td class="dark right"><span id="decDimen"></span> грн</td>
                          </tr>
                          <tr class="hidden_dec departure_cost">
                              <td><?=GetMessage("DEPARTURE_PRICE");?></td>
                              <td class="dark right"><span id="decDeparture"></span> грн</td>
                          </tr>
                          <tr class="hidden_dec delivery_cost">
                              <td><?=GetMessage("DELIVERY_PRICE");?></td>
                              <td class="dark right"><span id="decDelivery"></span> грн</td>
                          </tr>
                          <tr>
                              <td><?=GetMessage("CREATION_PRICE");?></td>
                              <td class="dark right"><span id="decCreation"></span> грн</td>
                          </tr>
                          <tr>
                              <td><?=GetMessage("INSURANCE_PRICE");?></td>
                              <td class="dark right"><span id="decInsurance"></span> грн</td>
                          </tr>
                      </table>
                      <!-- Added class for ajax result  -->
                      <table class="border advservices">
                          <tr>
                              <td colspan="2" class="pb"><?=GetMessage("ADD_SERVICES");?></td>
                          </tr>
                      </table>
                      <table>
                          <tr>
                              <td><?=GetMessage("DECLARED_COST");?></td>
                              <td class="middle-text dark right"><span id="decCost"></span> грн</td>
                          </tr>
                          <tr>
                              <td class="big-text"><?=GetMessage("COST");?></td>
                              <td class="big-text dark right"><span id="totalCost"></span> грн</td>
                          </tr>
                      </table>
                  </div>
              </div>
              <ul class="declaration-buttons">
                  <li><a id="create_pdf"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-blue1.png" alt=""></a></li>
                  <li><a><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-blue2.png" alt=""></a></li>
                  <li><a href="javascript:window.print()"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-blue3.png" alt=""></a></li>
              </ul>
          </div>

          <div class="wrapper-btns">
            <button id="btnCalc" class="submit-button submit-button--calc"><?=GetMessage("COUNT");?></button>
            <button id="btnDeparture" class="hide submit-button submit-button--calc"><?=GetMessage("DEPARTURE_ORDER");?></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="<?=SITE_TEMPLATE_PATH?>/js/date-lib.js?20200712"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/calcDates.js?20200712"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/orderCalculation.min.js?20200716-1"></script>

<? require("./modalDeparture.php"); ?>
<? require("./modalDepartureSuccess.php"); ?>

<? require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
