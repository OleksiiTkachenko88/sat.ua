//Очищаем ВГХ при фокусе
$(document).ready(function () {
  $('#weight').focus(function(){
    if ($(this).val()=='0')
    $(this).val('');
    });

  $('#weight').focus(function(){
    if ($(this).val()=='1')
    $(this).val('');
    });    

  $('[name="volume"]').focus(function(){
    if ($(this).val()=='0')
    $(this).val('');
    });

  $('#length').focus(function(){
    if ($(this).val()=='0')
    $(this).val('');
    });
  $('#width').focus(function(){
    if ($(this).val()=='0')
    $(this).val('');
    });    
  $('#height').focus(function(){
    if ($(this).val()=='0')
    $(this).val('');
    });
  $('#declaredCost').focus(function(){
    if ($(this).val()=='500')
    $(this).val('');
    });


});
window.addEventListener('load', () => {
  const API_URL = '/bitrix/templates/sat_main/api.php';

  window.fromDirObj = { id: 0, prefix: 'from' };
  window.toDirObj = { id: 1, prefix: 'to' };
  let cargoDescriptionId = '';

  const declarationRecomendedServicesCostEl = document.getElementById('declarationRecomendedServicesCost');

  const fromDir = document.getElementById('fromDir');
  const fromDate = document.getElementById('fromDate');
  const fromTimeStart = document.getElementById('fromTimeStart');

  const toDir = document.getElementById('toDir');
  const toDate = document.getElementById('toDate');

  const typeOfCargo = document.getElementById('typeOfCargo');
  const subtypeOfCargo = document.getElementById('subtypeOfCargo');
  const weight = document.getElementById('weight');
  const totalWeight = document.getElementById('totalWeight');
  const length = document.getElementById('length');
  const width = document.getElementById('width');
  const height = document.getElementById('height');
  const volume = document.getElementById('volume');
  const seatsAmount = document.getElementById('seatsAmount');
  const declaredCost = document.getElementById('declaredCost');

  const getServices = async () => {
    const params = new URLSearchParams();
    params.append('action', 'getServicesNew');
    params.append('lang', api_lang);
    try {
      const response = await fetch(`${API_URL}?${params}`);
      if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
      const { success, data } = await response.json();
      if (!success) return;

      data.sort((a, b) => b.sortOrder - a.sortOrder);

      let serviceGroup = '';
      let categoryGroup = '';
      let out = '';

      data.forEach(item => {
        if (serviceGroup !== item.serviceGroup ){
          if (serviceGroup) out += '</div></div>';
          out += `
            <div class="options-info-item">
              <a class="parcel-block-subtitle">${item.serviceGroup}</a>
              <div class="options-body">`;
          serviceGroup = item.serviceGroup;
        }

        if (categoryGroup !== item.categoryGroup && item.categoryGroup) {
          if (categoryGroup) out += '</div></div>';

          out += `
            <div class="options-info-item">
              <a class="parcel-block-subtitle">${item.categoryGroup}</a>
              <div class="options-body">`;
          categoryGroup = item.categoryGroup;
        }

        if (categoryGroup !== '' && !item.categoryGroup) {
          out += '</div></div>';
          categoryGroup = item.categoryGroup;
        }

        const disabled = item.fixedCount === '1' ? 'disabled' : '';

        const units =
            ['009000007', '009000004', '009000006', '009000016', '009000011',
             '009000014', '009000013', '009000005', '009000003', '009000012'
            ].includes(item.categoryGroupID)
            ||
            ['75dcd8d4-0a19-11e9-940a-00505601031c', '16f17237-0a19-11e9-940a-00505601031c',
             '3ae42d3e-0a19-11e9-940a-00505601031c', '5923b57b-0a19-11e9-940a-00505601031c',
             '86712653-0a19-11e9-940a-00505601031c',
             'f4343182-f586-11e9-940d-00505601031c', 'cb9d8fe8-f586-11e9-940d-00505601031c',
             'e0c2b043-f586-11e9-940d-00505601031c',

            ].includes(item.ref)
          ? 'м3'
          : 'шт';

        const isLattice = item.categoryGroupID === '009000012';

        out += `
          <div class="options-row-item options-body-item ${isLattice ? 'options-row-item--size options-row-item--size-hidden' : ''}">
            <label>
              <input type="checkbox" class="service" name="services[]" data-ref="${item.ref}" data-cost="" />
              <span></span>
              <div>${item.description}</div>
            </label>
        `;

        if (isLattice) {
          const { height = 0, length = 0, width = 0 } = item.additionalSize;

          out += `
            <div class="qty-wrap">
              <span>${api_lang === 'ru' ? 'ОБЪЕМ' : 'ОБ\'ЄМ'}</span>
              <input type="text" value="0" placeholder="0" disabled />
              <span>${units}</span>
            </div>

            <div class="options-row-item__wrap-size">
              <div class="qty-wrap">
                <span>${api_lang === 'ru' ? 'ДЛИНА' : 'ДОВЖИНА'}</span>
                <input type="text" placeholder="0" data-size="${length}" data-length inputmode="numeric" />
                <span>см</span>
              </div>

              <div class="qty-wrap">
                <span>ШИРИНА</span>
                <input type="text" placeholder="0" data-size="${width}" data-width inputmode="numeric"/>
                <span>см</span>
              </div>

              <div class="qty-wrap">
                <span>${api_lang === 'ru' ? 'ВЫСОТА' : 'ВИСОТА'}</span>
                <input type="text" placeholder="0" data-size="${height}" data-height inputmode="numeric"/>
                <span>см</span>
              </div>
            </div>
          `;
        } else {
          out += `
            <div class="qty-wrap">
              <input type="text" value="1" placeholder="0" ${disabled} inputmode="numeric"/>
              <span>${units}</span>
            </div>
          `;
        }

        out += `
          </div>
        `;
      });
      out += '</div></div>';

      const servicesBlock = document.getElementById('servicesBlock');
      servicesBlock.innerHTML = out;

      // ----------------

      const calcVolume = rowEl => {
        const serviceLength = rowEl.querySelector('[data-length]');
        const serviceWidth = rowEl.querySelector('[data-width]');
        const serviceHeight = rowEl.querySelector('[data-height]');

        const volume = (+serviceLength.value ? +serviceLength.value + +serviceLength.dataset.size : 0)
          * (+serviceWidth.value ? +serviceWidth.value + +serviceWidth.dataset.size : 0)
          * (+serviceHeight.value ? +serviceHeight.value + +serviceHeight.dataset.size : 0);

        const item = rowEl.closest('.options-body-item');
        item.querySelector(':scope > .qty-wrap input').value = Math.round(volume / 1000) / 1000;

        const cargoType = subtypeOfCargo.options[subtypeOfCargo.selectedIndex].dataset.ref;
        const error = item.querySelector(':scope > .error');

        if (cargoType === 'Базовый' &&
          (+serviceLength.value > +length.value
          || +serviceWidth.value > +width.value
          || +serviceHeight.value > +height.value)
        ) {
          if (!error) {
            const errorNode = document.createElement('div');
            errorNode.classList.add('error');
            errorNode.textContent = api_lang === 'ru'
              ? 'Обращаем внимание, габариты груза для услуги обрешетка отличаются от общих габаритов груза.'
              : 'Звертаємо увагу, габарити вантажу для послуги обрешетування відрізняються від загальних габаритів вантажу.';
            item.append(errorNode);
          }
        } else {
          if (error) error.remove();
        }
      }

      const sizeList = document.querySelectorAll('.options-row-item__wrap-size input');
      if (sizeList) {
        const onCalcVolume = ({ currentTarget }) => calcVolume(currentTarget.closest('.options-row-item__wrap-size'));
        sizeList.forEach(el => el.addEventListener('input', onCalcVolume));
      }

      // ----------------

      const serviceListCheckbox = document.querySelectorAll('.options-row-item--size [name="services[]"]');
      if (serviceListCheckbox) {
        const onVisibleSizes = ({ currentTarget }) => currentTarget.closest('.options-row-item--size')
          .classList.toggle('options-row-item--size-hidden');
        serviceListCheckbox.forEach(el => el.addEventListener('input', onVisibleSizes));
      }

      // ----------------

      const onServiceClick = ({ currentTarget }) => {
        currentTarget.classList.toggle('slide-up-title');
        const parent = currentTarget.closest('.options-info-item');
        const body  = parent.querySelector('.options-body');
        body.style.display = (currentTarget.classList.contains('slide-up-title')) ? 'block' : 'none';
      };

      const serviceList = servicesBlock.querySelectorAll('.parcel-block-subtitle');
      if (serviceList) serviceList.forEach( el => el.addEventListener('click', onServiceClick));
    } catch (err) {
      console.error(err);
    }
  }

  const getShowpacking = async () => {
    if (!cargoDescriptionId) return;

    const params = new URLSearchParams();
    params.append('action', 'showpacking');
    params.append('height', height.value);
    params.append('length', length.value);
    params.append('volume', volume.value);
    params.append('weight', weight.value);
    params.append('width', width.value);
    params.append('description', cargoDescriptionId);
    params.append('language', api_lang);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const list = await response.json();

    const recomendedServices = document.getElementById('recomendedServices');
    recomendedServices.style.display = 'none';

    const recomendedServicesList = document.getElementById('recomendedServicesList');
    recomendedServicesList.textContent = '';

    if (list && list.length) {
      // recomendedServices.style.display = 'block';

      list.forEach(el => {
        const item = document.createElement('li');
        item.textContent = el.service.description.toUpperCase();
        item.classList.add('calculator-info__item');
        recomendedServicesList.append(item);
      })
    };
  }

  [height, length, volume, weight, width].forEach(el => el.addEventListener('change', getShowpacking));

  const getTypesOfCargo = async () => {
    const params = new URLSearchParams();
    params.append('action', 'getTypes');
    params.append('lang', api_lang);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const json = await response.json();

    typeOfCargo.innerHTML = json.type;
    $(typeOfCargo).trigger('refresh');

    subtypeOfCargo.innerHTML = json.subtype;
    $(subtypeOfCargo).trigger('refresh');

    onChangeTypeOfCargo();
  }

  const getHolydays = async (cityRef) => {
    const params = new URLSearchParams();
    params.append('action', 'getHolydays');
    params.append('cityRef', cityRef);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    return await response.json();
  }

  const getDeliveryTerms = async () => {
    setDateTimePicker(window.fromDirObj);
    fromDateTimeDisabled();

    if (!window.fromDirObj.rspRef || !window.toDirObj.rspRef) return;
    const params = new URLSearchParams();
    params.append('action', 'getDeliveryTerms');
    if (window.toDirObj.dirType) params.append('delivery', 1); //доставка груза до дверей получателя
    params.append('rspSender', window.fromDirObj.rspRef);
    params.append('rspRecipient', window.toDirObj.rspRef);
    params.append('date', `${fromDate.value} ${fromTimeStart.value}`);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const { success, data } = await response.json();
    if (success !== 'true') return;

    const { date, time } = data[0];

    let dateResponse = strToDate(date);
    dateResponse = setTimeFromStr(dateResponse, time);

    window.toDirObj.dateObj = calcDates(dateResponse, dateResponse, window.toDirObj.deliveryTypeId,
      window.toDirObj.id, window.toDirObj.holydays);
    setDateTimePicker(window.toDirObj);
    toDateTimeDisabled();
  }

  const setDateTimePicker = dirObj => {
    if ((dirObj.id && !dirObj.dateObj)|| !dirObj.dirId) return;

    if (!dirObj.id) {
      const dateCurrent = dirObj.dateObj && dirObj.dateObj.dateCurrent || new Date();
      dirObj.dateObj = calcDates(new Date(), dateCurrent, dirObj.deliveryTypeId, dirObj.id, dirObj.holydays);
    }

    setDatePicker(dirObj, dirObj.holydays);
    addTimeElement(dirObj, 'Start');
    addTimeElement(dirObj, 'End');
  }

  const fromDateTimeDisabled = () => {
    const timeStart = document.getElementById('fromTimeStart');
    const timeEnd = document.getElementById('fromTimeEnd');

    let dateIsDisabled = false;
    let timeStartIsDisabled = false;
    let timeEndIsDisabled = false;

    if (!window.fromDirObj.rspRef) {
      dateIsDisabled = true;
      timeStartIsDisabled = true;
      timeEndIsDisabled = true;
    }

    fromDate.disabled = dateIsDisabled;
    timeStart.disabled = timeStartIsDisabled;
    $(timeStart).trigger('refresh');
    timeEnd.disabled = timeEndIsDisabled;
    $(timeEnd).trigger('refresh');
  }

  const toDateTimeDisabled = () => {
    const timeStart = document.getElementById('toTimeStart');
    const timeEnd = document.getElementById('toTimeEnd');

    let dateIsDisabled = false;
    let timeStartIsDisabled = false;
    let timeEndIsDisabled = false;

    if (!window.toDirObj.deliveryTypeId) {
      dateIsDisabled = true;
      timeStartIsDisabled = true;
    }

    if (!window.toDirObj.dateObj || !window.toDirObj.dateObj.dateStart) {
      dateIsDisabled = true;
      timeStartIsDisabled = true;
      timeEndIsDisabled = true;
    }

    toDate.disabled = dateIsDisabled;
    timeStart.disabled = timeStartIsDisabled;
    $(timeStart).trigger('refresh');
    timeEnd.disabled = timeEndIsDisabled;
    $(timeEnd).trigger('refresh');
  }

  const elementVisibleDeliveryTabs = ({ id, prefix, deliveryTypeId }) => {
    let wrapperBlockTariffIsHidden = false;
    let wrapperTimeStartIsHidden = false;
    let wrapperTimeEndIsHidden = false;
    let timeStartTextIsHidden = false;
    let timeEndTextIsHidden = false;

    switch (deliveryTypeId) {
      case 0: {
        wrapperBlockTariffIsHidden = true;
        timeStartTextIsHidden = true;
        timeEndTextIsHidden = true;
        wrapperTimeEndIsHidden = true;

        break;
      }

      case 2: {
        wrapperTimeEndIsHidden = true;
        timeStartTextIsHidden = true;
        timeEndTextIsHidden = true;
        break;
      }
    }

    document.getElementById(`${prefix}WrapperBlockTariff`).hidden = wrapperBlockTariffIsHidden;
    document.getElementById(`${prefix}TimeStartText`).hidden = timeStartTextIsHidden;
    document.getElementById(`${prefix}WrapperTimeStart`).hidden = wrapperTimeStartIsHidden;
    document.getElementById(`${prefix}TimeEndText`).hidden = timeEndTextIsHidden;
    document.getElementById(`${prefix}WrapperTimeEnd`).hidden = wrapperTimeEndIsHidden;

    fromDateTimeDisabled();
    toDateTimeDisabled();
  }

  const changeDeliveryTabs = async element => {
    const dirObj = element.id.slice(0, 2) === window.toDirObj.prefix ? window.toDirObj: window.fromDirObj;
    const parentElem = element.closest('.delivery-item');
    const dirType = +parentElem.querySelector('[name$=-delivery-tabs]:checked').value;
    const deliveryType = parentElem.querySelector('select.block-tariff__select').value;

    let deliveryTypeId = 0;
    if (!dirType) {
      deliveryTypeId = 0;
    } else if (['5211f93e-4ba2-4406-bd2d-0f021f1987e3', '8a810b11-6184-4be5-b199-9d6285b6d4a1'].includes(deliveryType)) {
      deliveryTypeId = 1;
    } else if (['44c01960-8164-4316-b31f-378d6a4a0513', 'd71b1869-c419-4a2b-8981-5aaa2f50a6b4'].includes(deliveryType)) {
      deliveryTypeId = 2;
    } else if (['64590fa9-19ac-4caf-aad5-0df11478fa6f', 'dd8e2bef-1def-4c67-853c-f7beb0c11724'].includes(deliveryType)) {
      deliveryTypeId = 3;
    }

    dirObj.dirType = dirType;
    dirObj.deliveryTypeId = deliveryTypeId;
    dirObj.deliveryType = deliveryType;

    elementVisibleDeliveryTabs(dirObj);
    getDeliveryTerms();
  }

  const addTimeElement = (dirObj, suffix) => {
    const element = document.getElementById(`${dirObj.prefix}Time${suffix}`);
    const list = dirObj.dateObj[`time${suffix}List`];
    let current = element.value;

    if (suffix === 'Start') current = dirObj.dateObj.timeStartSelected;
    element.options.length = 0;
    list.forEach(time => element.append(new Option(time, time, null, current === time)));
    $(element).trigger('refresh');
  }

  const setDatePicker = dirObj => {
    const element = document.getElementById(`${dirObj.prefix}Date`);
    const dateStop = new Date();
    dateStop.setMonth(dateStop.getMonth() + 1);

    const onSelectDate = propDate => {
      const dirObj = element.id.slice(0, 2) === window.toDirObj.prefix ? window.toDirObj: window.fromDirObj;
      const date = new Date(propDate);
      date.setHours(dirObj.dateObj.dateCurrent.getHours());
      date.setMinutes(dirObj.dateObj.dateCurrent.getMinutes());
      dirObj.dateObj = calcDates(dirObj.dateObj.dateInit, date, dirObj.deliveryTypeId, dirObj.id, dirObj.holydays);

      addTimeElement(dirObj, 'Start');
      addTimeElement(dirObj, 'End');

      if (!dirObj.id) getDeliveryTerms();
    }

    const options = {
      i18n: { uk: { dayOfWeekShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] } },
      timepicker: false,
      format: 'd.m.Y',
      dayOfWeekStart: 1,
      scrollMonth: false,
      mask: true,
      minDate: dirObj.dateObj.dateStart,
      maxDate: dateStop,
      value: dateLib.formatDate('DD.MM.YYYY', dirObj.dateObj.dateCurrent),
      beforeShowDay: date => [!dirObj.holydays.includes(dateLib.formatDate('YYYY-MM-DD', date))], // Запрет выбора воскресенья в календарях
      onSelectDate
    };

    $.datetimepicker.setLocale(datepicker_lang);
    $(element).datetimepicker(options);
  }

  const strToDate = str => new Date(str.replace(/(\d\d)\.(\d\d)\.(\d\d\d\d)/, '$3-$2-$1'));

  const setTimeFromStr = (date, time) => dateLib
    .setDateTimeFromObj({ hours: +time.slice(0, 2), minutes: +time.slice(3, 5) }, date);

  const initTimePicker = () => {
    const fromTimeStartOnChange = event => {
      const { id, value } = event.target;
      const dirObj = id.slice(0, 2) === window.toDirObj.prefix ? window.toDirObj: window.fromDirObj;

      if (id.includes('End')) {
        const date = setTimeFromStr(dirObj.dateObj.dateEnd, value);
        window.fromDirObj.dateObj.dateEnd = date;
        return;
      }

      const date = setTimeFromStr(dirObj.dateObj.dateCurrent, value);
      dirObj.dateObj = calcDates(dirObj.dateObj.dateInit, date, dirObj.deliveryTypeId,
        dirObj.id, dirObj.holydays);

      addTimeElement(dirObj, 'End');
      if (!dirObj.id) getDeliveryTerms();
    }

    const times = document.querySelectorAll('select.block-timepicker__select');
    times.forEach(el => $(el).change(fromTimeStartOnChange));
  }

  const initTabs = () => {
    const deliveryTabs = document.querySelectorAll('.delivery-tabs__input');
    deliveryTabs.forEach(el => {
      if (el.checked) changeDeliveryTabs(el);
      el.addEventListener('click', event => changeDeliveryTabs(event.target));
    });
  }

  const initDirs = () => {
    const response = (event, { content }) => !content.length
      && content.push({ value: '', id: '', label: noResultInfo });

    const open = () => (device.mobile() || device.tablet())
      && $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');

    const select = async (event, { item }) => {
      const dirObj = event.target.id.slice(0, 2) === window.toDirObj.prefix ? window.toDirObj : window.fromDirObj;

      dirObj.dirId = item.id;
      dirObj.rspRef = item.rspRef;
      dirObj.dirValue = item.value_short;
      dirObj.holydays = await getHolydays(dirObj.dirId);

      getDeliveryTerms();

      const tabStore = document.getElementById(`${dirObj.prefix}TabStore`);
      tabStore.disabled = false;

      if (item.rspList !== '[]') return;
      tabStore.disabled = true;
      const tab = document.getElementById(`${dirObj.prefix}TabDoor`);
      tab.checked = true;
      changeDeliveryTabs(tab);
    };

    const autocompleteOptions = {
      source: `${API_URL}?lang=${api_lang}&action=getTown`,
      minLength: 3,
      open,
      response,
      select: (event, { item }) => select(event, { item })
    }

    const onFocusDir = ({ target }) => target.classList.add('active');
    const onBlurDir = ({ target }) => target.classList.remove('active');

    const dirs = document.querySelectorAll('.direction-field');
    dirs.forEach(el => {
      $(el).autocomplete(autocompleteOptions);
      el.addEventListener('focus', onFocusDir);
      el.addEventListener('blur', onBlurDir);
    });

    const toggleDirOnClick = () => {
      [toDir.value, fromDir.value] = [fromDir.value, toDir.value];
      [window.toDirObj.dirId, window.fromDirObj.dirId] = [window.fromDirObj.dirId, window.toDirObj.dirId];
      [window.toDirObj.rspRef, window.fromDirObj.rspRef] = [window.fromDirObj.rspRef, window.toDirObj.rspRef];
      getDeliveryTerms();
    };

    const toggleDir = document.getElementById('toggleDir');
    toggleDir.addEventListener('click', toggleDirOnClick)
  }

  const initCargoDescriptionList = () => {
    const response = (event, { content }) => !content.length
      && content.push({ value: '', id: '', label: noResultInfo });

    const open = () => (device.mobile() || device.tablet())
      && $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');

    const autocompleteOptions = {
      source: `${API_URL}?action=getCargoDescriptionList`,
      minLength: 2,
      open,
      response,
      select: (event, { item }) => {
        cargoDescriptionId = item.id;
        getShowpacking();
      }
    }

    const cargoDescriptionListEl = document.getElementById('cargoDescriptionList');
    $(cargoDescriptionListEl).autocomplete(autocompleteOptions);
  }

  const deliveryTypes = document.querySelectorAll('select.block-tariff__select');
  deliveryTypes.forEach(el => $(el).change(event => changeDeliveryTabs(event.target)));

  const getLabelTop = el => el.closest('.main-info-row').querySelector('label').getBoundingClientRect().top;

  const bntCalcOnClick = async () => {
    let error = false;
    const errorClassName = 'error';
    $('.loader').css('display','inline-block');
    $('.error-calc').css('display','none');
    if (!window.fromDirObj.dirId) {
      fromDir.classList.add(errorClassName);
      if (!error) {
        errorTop = fromDir.getBoundingClientRect().top;
        error = true;
      }
    } else {
      fromDir.classList.remove(errorClassName);
    }

    if (!window.toDirObj.dirId) {
      toDir.classList.add(errorClassName);
      if (!error) {
        errorTop = toDir.getBoundingClientRect().top;
        error = true;
      }
    } else {
      toDir.classList.remove(errorClassName);
    }

    if (length.required && length.value === '0') {
      length.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(length);
        error = true;
      }
    } else {
      length.classList.remove(errorClassName);
    }

    if (width.required && width.value === '0') {
      width.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(width);
        error = true;
      }
    } else {
      width.classList.remove(errorClassName);
    }

    if (height.required && height.value === '0') {
      height.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(height);
        error = true;
      }
    } else {
      height.classList.remove(errorClassName);
    }

    if (error) {
      const headerRect = document.querySelector('header').getBoundingClientRect();
      const top = errorTop - 10 + window.scrollY - headerRect.top - headerRect.height;
      window.scrollTo({ top, behavior: 'smooth' });
      $('.loader').css('display','none');
      return;
    }

    fbq('track', 'AddToCart'); // Facebook Pixel Code
    gtag('event', 'calc', {'event_category': 'klik'});

    $('.declaration-wrapper').slideUp(300);

    const cargoType = subtypeOfCargo.options[subtypeOfCargo.selectedIndex].dataset.ref;
    const data = {
      addServices: [],
      cargoType, //идентификатор вида груза
      declaredCost: declaredCost.value, // заявленная стоимость
      delivery: window.toDirObj.dirType, //выезд за грузом до дверей отправителя
      deliveryCondition: window.toDirObj.dirType &&  window.toDirObj.deliveryType,
      departure: window.fromDirObj.dirType, //доставка груза до дверей получателя
      departureCondition: window.fromDirObj.dirType && window.fromDirObj.deliveryType,
      townSender:  window.fromDirObj.dirId, // идентификатор города отправления
      townRecipient: window.toDirObj.dirId, //идентификатор города получения
      seatsAmount: seatsAmount.value, //количество мест
      length: length.value, //длина всех мест отправления
      width: width.value, //ширина всех мест отправления
      weight: totalWeight.value, //вес груза
      height: height.value, //высота всех мест отправления
      volume: volume.value, //объем груза,
      description: cargoDescriptionId,
      language: api_lang
    }

    const serviceAdd = el => data.addServices.push({
      service: el.dataset.ref,
      count: el.closest('.options-row-item').querySelector('.qty-wrap input').value
    });

    document.querySelectorAll('.service:checked').forEach(serviceAdd);

    const url = `${API_URL}?action=global_calc_v2`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify(data);

    const res = await fetch(url, { method, headers, body });
    if (!res.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const resData = await res.json();

    const servicesList = document.querySelectorAll('.advS');
    if (servicesList) servicesList.forEach(el => el.remove());

    const recomendedServiceList = document.querySelectorAll('.recomended-service');
    if (recomendedServiceList) recomendedServiceList.forEach(el => el.remove());

    if( resData.success === 'true' ) {
      const responseData = resData.data[0];
      var subtarif = resData.data[0].tarif;
      var total = resData.data[0].cost;
      var creation = resData.data[0].creationCost;
      var insurance = resData.data[0].insuranceCost;
      var departure = resData.data[0].departureCost;
      var delivery = resData.data[0].deliveryCost;
      var transport = total - (creation + insurance + departure + delivery);

      const addServicesEl = document.querySelector('.advservices');
      addServicesEl.style.display = 'none';

      let hasLathing = false;

      if (responseData.addServices) {
        addServicesEl.style.display = null;

        responseData.addServices.forEach(el => {
          const { ref } = el.service;

          if([
            'eaa660db-e92d-11eb-941f-00505601031c', // Укадання вантажу в посилене обрешетування (довжина більше 200 см і вага більше 150 кг)
            '456a461e-1bf5-11ea-940d-00505601031c', // Укладання вантажу в обрешетування, куб.м
            'ddf16bac-1bf5-11ea-940d-00505601031c' // Укладання вантажу в обрешетування на піддоні, куб.м
          ].includes(ref)) hasLathing = true;

          let { description } = el.service;

          if (description.match(/\(.+\)$/)) {
            description = description.replace(/\(/, '</span> / ');
            description = description.replace(/\)/, '');
          } else if (description.match(/ в /)) {
            description = description.replace(/ в /, '</span> / ');
          } else {
            description += '</span>';
          }

          const row = document.createElement('tr');
          row.classList.add('advS');
          row.innerHTML = `
            <td class="upper">
              <span class="dark">
                <i class="fa fa-check"aria-hidden="true"></i>
                ${description}
              </td>
            <td class="dark right">${el.cost}&nbsp;грн</td>
          `;

          addServicesEl.querySelector('tbody').append(row);
          transport -= el.cost;
        })
      };

      const declarationRecomendedServicesEl = document.getElementById('declarationRecomendedServices');
      declarationRecomendedServicesEl.style.display = 'none';

      let declarationRecomendedServicesCostSum = 0;
      if (responseData.recomendedServices) {
        // declarationRecomendedServicesEl.style.display = null;

        const declarationRecomendedServicesWrapperCostEl = document.getElementById('declarationRecomendedServicesWrapperCost');

        responseData.recomendedServices.forEach(el => {
          let { description } = el.service;

          let descriptionMain = description;
          let descriptionAdditional = '';

          if (description.match(/\(.+\)$/)) {
            const desciptionArr =description.split('(');
            descriptionMain = desciptionArr[0];
            descriptionAdditional = desciptionArr.slice(1).join('').replace(/\)/, '');
          } else if (description.match(/ в /)) {
            const desciptionArr =description.split(' в ');
            descriptionMain = desciptionArr[0];
            descriptionAdditional = desciptionArr.slice(1).join('');
          } else {
            description += '</span>';
          }

          const row = document.createElement('tr');
          row.classList.add('recomended-service');

          const colName = document.createElement('td');
          colName.classList.add('upper');

          const labelName = document.createElement('label');

          const inputName = document.createElement('input');
          inputName.type = 'checkbox';
          inputName.checked = true;

          inputName.addEventListener('change', ({ target }) => {
            declarationRecomendedServicesCostEl.textContent = +declarationRecomendedServicesCostEl.textContent
              + (target.checked ? el.cost : -el.cost);
          });

          labelName.append(inputName);

          const descriprionEl = document.createElement('span');
          descriprionEl.textContent = descriptionMain;
          labelName.append(descriprionEl);

          if (descriptionAdditional) labelName.append(document.createTextNode(` / ${descriptionAdditional}`));

          colName.append(labelName);
          row.append(colName);

          const colValue = document.createElement('td');
          colValue.classList.add('right');
          colValue.innerHTML = `${el.cost}&nbsp;грн`;
          row.append(colValue);

          declarationRecomendedServicesEl.querySelector('tbody').insertBefore(row, declarationRecomendedServicesWrapperCostEl);
          declarationRecomendedServicesCostSum += el.cost;
        });
      };

      const fromTabLabel = document.querySelector('[name=from-delivery-tabs]:checked + .delivery-tabs__item');
      document.getElementById('fromType').textContent = fromTabLabel.textContent.trim();

      const toTabLabel = document.querySelector('[name=to-delivery-tabs]:checked + .delivery-tabs__item');
      document.getElementById('toType').textContent = toTabLabel.textContent.trim();

      document.getElementById('fromDateTicket').textContent = fromDate.value;
      document.getElementById('toDateTicket').textContent = toDate.value;

      document.getElementById('fromCity').textContent = window.fromDirObj.dirValue;
      document.getElementById('toCity').textContent = window.toDirObj.dirValue;

      const { type } = typeOfCargo.options[typeOfCargo.selectedIndex].dataset;

      $('.hidden_dec').css('display', 'none');
      $('.'+type+'_show').css('display', 'table-row');
      $('.decSubtype').text( subtarif );
      $('#decCost').text(declaredCost.value);
      $('#decAva').text( seatsAmount.value );
      $('#decVol').text( volume.value );
      $('.'+type+'_show #decWid').text(width.value);
      $('.'+type+'_show #decLen').text(length.value);
      $('.'+type+'_show #decHei').text(height.value);
      $('.decWei').text(totalWeight.value);

      $('#decDimen').text( transport );
      $('#decDeparture').text( departure );
      ( departure > 0 )?$('.departure_cost').css('display', 'table-row'):"";
      $('#decDelivery').text( delivery );
      ( delivery > 0 )?$('.delivery_cost').css('display', 'table-row'):"";

      $('#decCreation').text( creation );
      $('#decInsurance').text( insurance );

      $('#totalCost').text(total);
      declarationRecomendedServicesCostEl.textContent = declarationRecomendedServicesCostSum + total;

      $('.decType').text( $('.type-block li.selected').text() );

      const warningLathing = document.getElementById('warningLathing');
      warningLathing.style.display = 'none';
      if (hasLathing) warningLathing.style.display = null;

      $('.declaration-wrapper').slideDown(300);
      $('.loader').css('display','none');
    } else { 
      //Добавил вывод ошибки из 1С в расчете выезда 06072022
      var err_text = resData.error.note;
      $('.error-calc').css('display','flex');
      $('.error-calc').text(err_text);
      $('.loader').css('display','none');
      }
  };

  document.getElementById('btnCalc').addEventListener('click', bntCalcOnClick);

  const elementInit = (elem, parent) => {
    elem.value = 0;
    parent.classList.add('hide');
  }

  const onChangeTypeOfCargo = (event) => {
    const { type, infoTitle, infoOptions } = typeOfCargo.options[typeOfCargo.selectedIndex].dataset;

    const blockInfoTypeOfCargo = document.getElementById('infoTypeOfCargo');
    blockInfoTypeOfCargo.style.display = infoTitle ? 'block' : 'none';
    document.getElementById('infoTitleTypeOfCargo').textContent = infoTitle;

    infoOptionsTypeOfCargoEl = document.getElementById('infoOptionsTypeOfCargo');
    infoOptionsTypeOfCargoEl.style.display = 'none';
    infoOptionsTypeOfCargoEl.textContent = '';

    if (infoOptions) {
      infoOptionsTypeOfCargoEl.style.display = null;

      infoOptions.split(';').forEach(el => {
        const infoOptionEl = document.createElement('li');
        infoOptionEl.classList.add('calculator-info__item');
        infoOptionEl.textContent = el;
        infoOptionsTypeOfCargoEl.append(infoOptionEl);
      })
    }

    const subtypeOfCargoWrapper = subtypeOfCargo.closest('.main-info-row');

    if (!event || event && event.target === typeOfCargo) {
      subtypeOfCargoWrapper.classList.add('hide');

      let amountSubtypesOfCargo = 0;
      let indexSubtypesOfCargo = -1;

      for (let i = 0; i < subtypeOfCargo.options.length; ++i) {
        const option = subtypeOfCargo.options[i];
        option.classList.add('hide');
        if (!option.classList.contains(type)) continue;
        ++amountSubtypesOfCargo;
        if (indexSubtypesOfCargo === -1) indexSubtypesOfCargo = i;
        option.classList.remove('hide');
      }

      subtypeOfCargo.options[indexSubtypesOfCargo].selected = true;
      if ( amountSubtypesOfCargo > 2) subtypeOfCargoWrapper.classList.remove('hide');
      $(subtypeOfCargo).trigger('refresh');
    }

    const subtypeRef = subtypeOfCargo.options[subtypeOfCargo.selectedIndex].dataset.ref;
    
    //Если выбрана полупалета, отображаем доп текст

    if (subtypeRef == 'Полупалета') {
      $('.polupalet').css('display', 'block');
    } else {
      $('.polupalet').css('display', 'none');
    }

    length.required = false;
    width.required = false;
    height.required = false;

    const weightWrapper = weight.closest('.main-info-row');
    const totalWeightWrapper = totalWeight.closest('.main-info-row');
    const seatsAmountWrapper = seatsAmount.closest('.main-info-row');
    const lengthWrapper = length.closest('.main-info-row');
    const widthWrapper = width.closest('.main-info-row');
    const heightWrapper = height.closest('.main-info-row');
    const volumeWrapper = volume.closest('.main-info-row');

    const weightLabel = weightWrapper.querySelector('label');
    weightLabel.textContent = weightLabel.dataset.textDefault;
    const volumeLabel = volumeWrapper.querySelector('label');
    volumeLabel.textContent = volumeLabel.dataset.textDefault;

    declaredCost.value = declaredCost.min;

    elementInit(weight, weightWrapper);
    elementInit(totalWeight, totalWeightWrapper);
    elementInit(length, lengthWrapper);
    elementInit(width, widthWrapper);
    elementInit(height, heightWrapper);
    elementInit(volume, volumeWrapper);

    seatsAmount.value = 1;
    seatsAmount.min = 1;
    seatsAmountWrapper.classList.add('hide');

    weight.disabled = false;

    let { length: subtypeMaxLength, width: subtypeMaxWidth, min: subtypeMinWeight, max: subtypeMaxWeight } =
      subtypeOfCargo.options[subtypeOfCargo.selectedIndex].dataset;

    let maxLength = 760;
    let maxWidth = 500;
    let maxHeight = 500;

    let valueLength = 0;
    let valueWidth = 0;
    let valueHeight = 0;

    document.querySelector('#labelSub').textContent = 'Підтип вантажу';

    switch (type) {
      case 'type_1': { //Документы
        weight.value = 1;
        break;
      }
      case 'type_2': { //Базовый
        subtypeMinWeight = 1;
        subtypeMaxWeight = subtypeMaxWeight && subtypeMaxWeight !== 1 ? subtypeMaxWeight :30000;
        seatsAmountWrapper.classList.remove('hide');
        //weightWrapper.classList.remove('hide');
      //  weightLabel.textContent = weightLabel.dataset.textBasic;
        totalWeight.value = subtypeMinWeight;
        totalWeightWrapper.classList.remove('hide');
        lengthWrapper.classList.remove('hide');
        widthWrapper.classList.remove('hide');
        heightWrapper.classList.remove('hide');
        volumeWrapper.classList.remove('hide');
        volumeLabel.textContent = volumeLabel.dataset.textBasic;
        break;
      }
      case 'type_3': { //Паллета
        //weightWrapper.classList.remove('hide');
        subtypeMinWeight = subtypeMinWeight || 1;
        subtypeMaxWeight = subtypeMaxWeight || 1000;
        seatsAmountWrapper.classList.remove('hide');
        totalWeight.value = subtypeMinWeight;
        totalWeightWrapper.classList.remove('hide');
        maxLength = subtypeMaxLength;
        maxWidth = subtypeMaxWidth;
        valueLength = subtypeMaxLength;
        valueWidth = subtypeMaxWidth;
        maxHeight = 200;
        heightWrapper.classList.remove('hide');
        document.querySelector('#labelSub').textContent = 'Підтип палети';
        break;
      }
      case 'type_4': { //Легковая шина
        //weightWrapper.classList.remove('hide');
        subtypeMinWeight = 4;
        subtypeMaxWeight = 20;
        seatsAmountWrapper.classList.remove('hide');
        totalWeight.value = 4;
        totalWeightWrapper.classList.remove('hide');
        document.querySelector('#labelSub').textContent = 'Підтип шини';
        break;
      }
      case 'type_5': { //Грузовая шина
        //weightWrapper.classList.remove('hide');
        subtypeMinWeight = 20;
        subtypeMaxWeight = 30000;
        seatsAmountWrapper.classList.remove('hide');
        totalWeight.value = 20;
        totalWeightWrapper.classList.remove('hide');
        document.querySelector('#labelSub').textContent = 'Підтип шини';

        if (subtypeRef === 'гКолеса23') {
          lengthWrapper.classList.remove('hide');
          widthWrapper.classList.remove('hide');
          heightWrapper.classList.remove('hide');

          length.required = true;
          width.required = true;
          height.required = true;
        }

        break;
      }
    }

    weight.value = subtypeMinWeight;
    weight.min = subtypeMinWeight;
    weight.max = subtypeMaxWeight;
    length.value = valueLength;
    length.max = maxLength;
    width.value = valueWidth;
    width.max = maxWidth;
    height.value = valueHeight;
    height.max = maxHeight;

    calcTotalWeight();
    calcVolume();
  };

  $(typeOfCargo).change(onChangeTypeOfCargo);
  $(subtypeOfCargo).change(onChangeTypeOfCargo);

  const calcTotalWeight = () => totalWeight.value = weight.value * seatsAmount.value;
  const calcVolume = () => volume.value =
    (length.value * width.value * height.value * seatsAmount.value / 1000000).toFixed(3);

  weight.addEventListener('change', calcTotalWeight);
  //seatsAmount.addEventListener('change', calcTotalWeight);
  seatsAmount.addEventListener('change', calcVolume);
  length.addEventListener('change', calcVolume);
  width.addEventListener('change', calcVolume);
  height.addEventListener('change', calcVolume);
  volume.addEventListener('change', () => length.value = width.value = height.value = 0);

  const onBtnDepartureClick = () => {
    const modalDeparture = document.getElementById('modalDeparture');
    const fromDirModal = modalDeparture.querySelector('#fromDirModal');
    const person = modalDeparture.querySelector('#person');
    const phone = modalDeparture.querySelector('#phone');
    const description = modalDeparture.querySelector('#description');

    let dirValue = '';
    let dirId = null;

    if (window.fromDirObj.dirId) {
      dirValue = window.fromDirObj.dirValue;
      dirId = window.fromDirObj.dirId;
    }

    fromDirModal.value = dirValue;
    if (dirId) fromDirModal.dataset.dirId = dirId;
    person.value = '';
    description.value = '';
    phone.value = '';

    const inputErrorList = document.querySelectorAll('.text-field__input--error');
    if (inputErrorList) inputErrorList.forEach(el => el.classList.remove('text-field__input--error'));
    modalVisible(modalDeparture.id, true);
  }

  const btnDeparture = document.getElementById('btnDeparture');
  btnDeparture.addEventListener('click', onBtnDepartureClick);


  getServices();
  getTypesOfCargo();
  initTabs();
  initTimePicker();
  initDirs();
  initCargoDescriptionList();
});
