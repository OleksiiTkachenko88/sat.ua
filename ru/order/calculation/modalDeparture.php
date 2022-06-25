<style>
  .hide {
    display: none;
  }

  .calculate-form {
    padding: 0 15px;
  }

  .wrapper-text-field {
    display: flex;
    flex-direction: column;
  }

  .text-field {
    display: flex;
    max-width: 100%;
    align-items: center;
    margin-bottom: 20px;
  }

  .text-field__input--uppercase {
    text-transform: uppercase;
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

  .wrapper-modal--departure > :first-child {
    max-width: 500px;
    width: 100%;
  }
</style>

<div class="wrapper-modal wrapper-modal--departure" id="modalDeparture" tabindex="-1" role="dialog" aria-hidden="true">
  <div>
    <div class="modal__header">
      <h2 class="modal-title"><?= getMessage("DEPARTURE_ORDER"); ?></h2>
      <button type="button" class="modal-btn-close modal-close" aria-label="Закрыть">&times;</button>
    </div>
    <div class="calculate-form">
      <div class="wrapper-text-field">
        <div class="text-field">
          <img
            class="text-field__img"
            src="<?= SITE_TEMPLATE_PATH ?>/img/icons/sender-adr.png"
          />
          <input
            id="fromDirModal"
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

      <button id="btnDepartureModal" class="modal-btn-success"><?= GetMessage("DEPARTURE_SEND"); ?></button>
    </div>
  </div>
</div>

<script src="<?= SITE_TEMPLATE_PATH ?>/js/vanillaTextMask.js"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/orderDepartureModal.js?20210415"></script>
