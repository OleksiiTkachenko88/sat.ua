<?
  require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
  $APPLICATION->SetPageProperty("description", "Виїзд за вантажем до відправника - Транспортна компанія “САТ” | ВИГІДНО! НАДІЙНО! ВЧАСНО! ☎ 0 800 30 99 09 (безкоштовно по Україні)");
  $APPLICATION->SetPageProperty("title", "Виїзд за вантажем до відправника | Транспортна компанія “САТ”");
  $APPLICATION->SetTitle("Замовити виїзд за вантажем до відправника");
?>

<style>
  .hide {
    display: none;
  }

  .calculate-section {
    border: 1px solid #acacac;
    width: 100%;
    margin: 0 auto 20px;
    font-family: "SFUIDisplay",sans-serif;
  }

  @media (min-width: 768px) {
    .calculate-section {
      width: 750px;
    }
  }

  @media (min-width: 992px) {
    .calculate-section {
        width: 950px;
    }
  }

  @media (min-width: 1200px) {
    .calculate-section {
      width: 950px;
    }
  }

  @media (min-width: 1341px) {
    .calculate-section {
      width: 1180px;
    }
  }

  @media (min-width: 1600px) {
    .calculate-section {
      width: 1450px;
    }
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

  .calculate-form {
    padding: 0 15px;
  }

  .wrapper-text-field {
    display: flex;
    flex-wrap: wrap;
    margin-right: -20px;
  }

  .text-field {
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 20px;
    min-width: 250px;
  }

  .text-field--error {
    border: 1px solid #FF6111;
  }

  .text-field__img {
    flex-shrink: 0;
    max-height: 24px;
    margin-right: 5px;
  }

  .text-field__input {
    height: 36px;
    line-height: 34px;
    background: #fff;
    outline: none;
    border: 1px solid #acacac;
    padding: 0px 13px;
    font-size: 14px;
    color: #404041;
    font-family: inherit;
    -webkit-appearance: none;
    width: 100%;
  }

  .text-field__input--uppercase {
    text-transform: uppercase;
  }

  .text-field__input--error {
    border: 1px solid #FF6111;
  }

  .textarea-field {
    width: 100%;
    display: block;
    -webkit-appearance: none;
    line-height: 19px;
    outline: none;
    border: 1px solid #acacac;
    padding: 7px 12px;
    font-size: 14px;
    color: #58595b;
    font-family: inherit;
    resize: vertical;
    margin-bottom: 20px;
  }

  .wrapper-submit-button {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .submit-button {
    margin: 0 !important;
  }
</style>

<div class="calculate-section">
  <div class="wrapper-calculate-header">
    <div class="calculate-header">
      <img
        class="calculate-header__img"
        src="<?= SITE_TEMPLATE_PATH ?>/img/icons/icon_departure_top.png"
        alt="<?= getMessage("ALT_DEPARTURE_LOGO"); ?>"
      />

      <h1 class="calculate-header__title"><?$APPLICATION->ShowTitle(false);?></h1>
    </div>
  </div>
  <div class="calculate-form">
    <div class="wrapper-text-field">
      <div class="text-field">
        <img
          class="text-field__img"
          src="<?= SITE_TEMPLATE_PATH ?>/img/icons/sender-adr.png"
        />
        <input
          id="fromDir"
          class="text-field__input text-field__input--uppercase"
          placeholder="<?= GetMessage("ENTER_FROM_PUNKT"); ?>"
        />
      </div>

      <div class="text-field">
        <img
          class="text-field__img"
          src="<?= SITE_TEMPLATE_PATH ?>/img/icons/sender-man.png"
        />
        <input
          id="person"
          class="text-field__input"
          placeholder="<?=GetMessage("DEPARTURE_PERSON");?>"
        />
      </div>

      <div class="text-field">
        <img
          class="text-field__img"
          src="<?= SITE_TEMPLATE_PATH ?>/img/icons/sender-phone.png"
        />
        <input
          id="phone"
          class="text-field__input"
          placeholder="<?= GetMessage("DEPARTURE_PHONE"); ?>"
        />
      </div>
    </div>

    <textarea
      id="description"
      class="textarea-field"
      placeholder="<?= GetMessage("ENTER_NOTE"); ?>"
      rows="5"
    ></textarea>

    <div class="wrapper-submit-button">
      <button id="btnDeparture" class="submit-button"><?= GetMessage("DEPARTURE_SEND"); ?></button>
    </div>
  </div>
</div>

<? require("../calculation/modalDepartureSuccess.php"); ?>

<script src="<?= SITE_TEMPLATE_PATH ?>/js/vanillaTextMask.js"></script>
<script src="<?= SITE_TEMPLATE_PATH ?>/js/orderDeparture.js"></script>

<? require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>
