window.addEventListener('load', () => {
  const API_URL = '/bitrix/templates/sat_main/api.php';

  const modalDeparture = document.getElementById('modalDeparture');
  const fromDirModal = modalDeparture.querySelector('#fromDirModal');
  const phone = modalDeparture.querySelector('#phone');

  const initDir = () => {
    const response = (event, { content }) => !content.length
      && content.push({ value: '', id: '', label: noResultInfo });

    const open = () => (device.mobile() || device.tablet())
      && $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');

    const select = (event, { item }) => fromDirModal.dataset.dirId = item.id;

    const autocompleteOptions = {
      source: `${API_URL}?lang=${api_lang}&action=getTown`,
      minLength: 3,
      open,
      response,
      select
    }

    const onFocusDir = ({ target }) => target.classList.add('active');
    const onBlurDir = ({ target }) => target.classList.remove('active');

    $(fromDirModal).autocomplete(autocompleteOptions);
    const autocomplete = $(fromDirModal).autocomplete('widget')[0];
    autocomplete.style.zIndex = 202;
    fromDirModal.addEventListener('focus', onFocusDir);
    fromDirModal.addEventListener('blur', onBlurDir);
  }

  const getParamsOrderCalculation = () => {
    const params = new URLSearchParams();
    params.append('action', 'global_calc');
    params.append('townSender', window.fromDirObj.dirId); // идентификатор города отправления
    params.append('townRecipient', window.toDirObj.dirId); //идентификатор города получения
    params.append('declaredCost', declaredCost.value) // заявленная стоимость
    params.append('cargoType', subtypeOfCargo.options[subtypeOfCargo.selectedIndex].dataset.ref) //идентификатор вида груза
    params.append('seatsAmount', seatsAmount.value)//количество мест
    params.append('weight', totalWeight.value) //вес груза
    params.append('length', length.value)//длина всех мест отправления
    params.append('width', width.value)//ширина всех мест отправления
    params.append('height', height.value)//высота всех мест отправления
    params.append('volume', volume.value)//объем груза
    params.append('departure', window.fromDirObj.dirType) //доставка груза до дверей получателя
    params.append('delivery', window.toDirObj.dirType) //выезд за грузом до дверей отправителя

    const serviceAdd = (el, index) => {
      const count = el.closest('.options-row-item').querySelector('.qty-wrap input').value;
      params.append(`addServices[${index}][service]`, el.dataset.ref);
      params.append(`addServices[${index}][count]`, count);
    };

    const serviceList = document.querySelectorAll('.service:checked');
    serviceList.forEach(serviceAdd);

    if (window.fromDirObj.dirType) params.append('departureCondition', window.fromDirObj.deliveryType);
    if (window.toDirObj.dirType) params.append('deliveryCondition', window.toDirObj.deliveryType);
    return params;
  }

  const bntCalcOnClick = async () => {
    const person = modalDeparture.querySelector('#person');
    const description = modalDeparture.querySelector('#description');

    let valid = true;

    const { dirId } = fromDirModal.dataset;
    if (!dirId) {
      fromDirModal.classList.add('text-field__input--error');
      valid = false;
    } else {
      fromDirModal.classList.remove('text-field__input--error');
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

    if (!valid) return;

    const params = getParamsOrderCalculation();
    params.set('action', 'departure_send');
    params.set('townSender', dirId); // идентификатор города отправления
    params.append('contactSender', person.value); // ФИО контактного лица
    params.append('senderPhone', phone.value); // телефон отправителя
    params.append('additionalInformation', description.value); // примечание

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const resData = await response.json();
    if (resData.success !== 'true') return;

    modalVisible('modalDeparture', false);
    modalVisible('modalDepartureSuccess', true);
    setTimeout(() => modalVisible('modalDepartureSuccess', false), 5000);
  };

  document.getElementById('btnDepartureModal').addEventListener('click', bntCalcOnClick);

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
