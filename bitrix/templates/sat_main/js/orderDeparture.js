window.addEventListener('load', () => {
  const API_URL = '/bitrix/templates/sat_main/api.php';

  const fromDir = document.getElementById('fromDir');
  const phone = document.getElementById('phone');

  const initDir = () => {
    const response = (event, { content }) => !content.length
      && content.push({ value: '', id: '', label: noResultInfo });

    const open = () => (device.mobile() || device.tablet())
      && $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');

    const select = (event, { item }) => fromDir.dataset.dirId = item.id;

    const autocompleteOptions = {
      source: `${API_URL}?lang=${api_lang}&action=getTown`,
      minLength: 3,
      open,
      response,
      select
    }

    const onFocusDir = ({ target }) => target.classList.add('active');
    const onBlurDir = ({ target }) => target.classList.remove('active');

    $(fromDir).autocomplete(autocompleteOptions);
    fromDir.addEventListener('focus', onFocusDir);
    fromDir.addEventListener('blur', onBlurDir);
  }

  const bntCalcOnClick = async () => {
    const person = document.getElementById('person');
    const description = document.getElementById('description');

    let valid = true;

    const { dirId } = fromDir.dataset;
    if (!dirId) {
      fromDir.classList.add('text-field__input--error');
      valid = false;
    } else {
      fromDir.classList.remove('text-field__input--error');
    }

    if (!person.value) {
      person.classList.add('text-field__input--error');
      valid = false;
    } else {
      person.classList.remove('text-field__input--error');
    }

    const phoneValue = phone.value.replace(/\(|\)|-|_/g, '');
    if (phoneValue.length < 13) {
      phone.classList.add('text-field__input--error');
      valid = false;
    } else {
      phone.classList.remove('text-field__input--error');
    }

    if (!valid) {
      const calculateWrapper = document.querySelector('.calculate-section');
      const scrollTop = calculateWrapper.getBoundingClientRect().top - 50;
      $('html').animate({ scrollTop }, 500);
      return;
    }

    const params = new URLSearchParams();
    params.append('action', 'departure_send');
    params.append('townSender', dirId); // идентификатор города отправления
    params.append('townRecipient', dirId); //идентификатор города получения
    params.append('contactSender', person.value); // ФИО контактного лица
    params.append('senderPhone', phone.value); // телефон отправителя
    params.append('additionalInformation', description.value); // примечание

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const resData = await response.json();
    if (resData.success !== 'true') return;

    modalVisible('modalDepartureSuccess', true);
    setTimeout(() => modalVisible('modalDepartureSuccess', false), 5000);
  };

  document.getElementById('btnDeparture').addEventListener('click', bntCalcOnClick);

  const mask = ['+', '3', '8','(', '0', /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  let phoneMask;

  const onPhoneFocus = event => {
    if (phoneMask) return;
    phoneMask = vanillaTextMask.maskInput({ inputElement: event.target, mask, showMask: true });
    const index = event.target.value.indexOf('_')
    setTimeout(() => event.target.setSelectionRange(index, index), 0);
  }

  const onPhoneBlur = event => {
    if (phoneMask && phoneMask.textMaskInputElement.state.previousPlaceholder === event.target.value) {
      phoneMask.destroy();
      phoneMask = null;
      event.target.value = '';
    }
  }

  phone.addEventListener('focus', onPhoneFocus);
  phone.addEventListener('blur', onPhoneBlur);

  initDir();
});
