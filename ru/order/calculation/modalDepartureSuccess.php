<style>
   /* FORM DEPARTURE SUCCESS */
  .wrapper-modal--departure-success > :first-child {
    max-width: 500px;
    width: 100%;
  }

  .departure-success-text {
    color: #757575;
    font-family: "SFUIDisplay",sans-serif;
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }
</style>

<div class="wrapper-modal wrapper-modal--departure-success" id="modalDepartureSuccess" tabindex="-1" role="dialog" aria-hidden="true">
  <div>
    <div class="modal__header">
      <h2 class="modal-title"><?= getMessage("DEPARTURE_ORDER"); ?></h2>
      <button type="button" class="modal-btn-close modal-close" aria-label="Закрыть">
        &times;
      </button>
    </div>
    <div>
      <div class="departure-success-text"><?= GetMessage("DEPARTURE_SUCCESS"); ?></div>
      <button class="modal-btn-success" id="departureSuccessModalBtn">OK</button>
    </div>
  </div>
</div>

<script>
  const departureSuccessModalBtn = document.getElementById('departureSuccessModalBtn');
  departureSuccessModalBtn.addEventListener('click', () => modalVisible('modalDepartureSuccess', false));
</script>
