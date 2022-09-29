window.addEventListener('load', () => {
  const API_URL = '/bitrix/templates/sat_main/api.php';

  const fromDirObj = { id: 0, prefix: 'from' };
  const toDirObj = { id: 1, prefix: 'to' };

  const fromDir = document.getElementById('fromDir');
  const fromDate = document.getElementById('fromDate');
  const fromTimeStart = document.getElementById('fromTimeStart');

  const toDir = document.getElementById('toDir');
  const toDate = document.getElementById('toDate');

  const getServices = async () => {
    const params = new URLSearchParams();
    params.append('action', 'getServices');
    params.append('lang', api_lang);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const text = await response.text();
    if (!text) return;
    const servicesBlock = document.getElementById('servicesBlock');
    servicesBlock.innerHTML = text;
  }

  const getTypes = async () => {
    const params = new URLSearchParams();
    params.append('action', 'getTypes');
    params.append('lang', api_lang);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const json = await response.json();

    const type = document.getElementById('type');
    type.innerHTML = json.type;
    $(type).trigger('refresh');

    const subtype = document.getElementById('subtype');
    subtype.innerHTML = json.subtype;
    $(subtype).trigger('refresh');
  }

  const getDeliveryTerms = async () => {
    if (!fromDirObj.rspRef || !toDirObj.rspRef) return;
    const params = new URLSearchParams();
    params.append('action', 'getDeliveryTerms');
    if (toDirObj.dirType) params.append('delivery', 1); //доставка груза до дверей получателя
    params.append('rspSender', fromDirObj.rspRef);
    params.append('rspRecipient', toDirObj.rspRef);
    params.append('date', `${fromDate.value} ${fromTimeStart.value}`);

    const response = await fetch(`${API_URL}?${params}`);
    if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
    const { success, data } = await response.json();
    if (success !== 'true') return;

    const { date, time } = data[0];

    let dateResponse = strToDate(date);
    dateResponse = setTimeFromStr(dateResponse, time);

    toDirObj.dateObj = calcDates(dateResponse, dateResponse, toDirObj.deliveryTypeId, toDirObj.id);
    setDateTimePicker(toDirObj);
    toDateTimeDisabled();
  }

  const setDateTimePicker = dirObj => {
    setDatePicker(dirObj);
    addTimeElement(dirObj, 'Start');
    addTimeElement(dirObj, 'End');
  }

  const toDateTimeDisabled = () => {
    const timeStart = document.getElementById('toTimeStart');
    const timeEnd = document.getElementById('toTimeEnd');

    let dateIsDisabled = false;
    let timeStartIsDisabled = false;
    let timeEndIsDisabled = false;

    if (!toDirObj.deliveryTypeId) {
      dateIsDisabled = true;
      timeStartIsDisabled = true;
    }

    if (!toDirObj.dateObj || !toDirObj.dateObj.dateStart) {
      dateIsDisabled = true;
      timeStartIsDisabled = true;
      timeEndIsDisabled = true;
    }

    document.getElementById('toDate').disabled = dateIsDisabled;
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

    toDateTimeDisabled();
  }

  const changeDeliveryTabs = async element => {
    const dirObj = element.id.slice(0, 2) === toDirObj.prefix ? toDirObj: fromDirObj;
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

    if (dirObj.id) return;

    const dateCurrent =  dirObj.dateObj && dirObj.dateObj.dateCurrent || new Date();
    dirObj.dateObj = calcDates(new Date(), dateCurrent, deliveryTypeId, dirObj.id);
    setDateTimePicker(dirObj);
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

    const onSelectDate = propDate => {
      const dirObj = element.id.slice(0, 2) === toDirObj.prefix ? toDirObj: fromDirObj;
      const date = new Date(propDate);
      date.setHours(dirObj.dateObj.dateCurrent.getHours());
      date.setMinutes(dirObj.dateObj.dateCurrent.getMinutes());
      dirObj.dateObj = calcDates(dirObj.dateObj.dateInit, date, dirObj.deliveryTypeId, dirObj.id);

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
      value: dateLib.formatDate('DD.MM.YYYY', dirObj.dateObj.dateCurrent),
      beforeShowDay: date => [Boolean(date.getDay())], // Запрет выбора воскресенья в календарях
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
      const dirObj = id.slice(0, 2) === toDirObj.prefix ? toDirObj: fromDirObj;

      if (id.includes('End')) {
        const date = setTimeFromStr(dirObj.dateObj.dateEnd, value);
        fromDirObj.dateObj.dateEnd = date;
        return;
      }

      const date = setTimeFromStr(dirObj.dateObj.dateCurrent, value);
      dirObj.dateObj = calcDates(dirObj.dateObj.dateInit, date, dirObj.deliveryTypeId, dirObj.id);

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

    const select = (event, { item }) => {
      const dirObj = event.target.id.slice(0, 2) === toDirObj.prefix ? toDirObj : fromDirObj;

      dirObj.dirId = item.id;
      dirObj.rspRef = item.rspRef;
      dirObj.dirValue = item.value_short;

      getDeliveryTerms();

      const tabStore = document.getElementById(`${dirObj.prefix}TabStore`);
      tabStore.disabled = false;

      if (item.rspList) return;
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
      select
    }

    const dirs = document.querySelectorAll('.direction-field');
    dirs.forEach(el => $(el).autocomplete(autocompleteOptions))

    const toggleDirOnClick = () => {
      [toDir.value, fromDir.value] = [fromDir.value, toDir.value];
      [todirObj.dirId, fromdirObj.dirId] = [fromdirObj.dirId, todirObj.dirId];
      [toDirObj.rspRef, fromDirObj.rspRef] = [fromDirObj.rspRef, toDirObj.rspRef];
      getDeliveryTerms();
    };

    const toggleDir = document.getElementById('toggleDir');
    toggleDir.addEventListener('click', toggleDirOnClick)
  }

  const deliveryTypes = document.querySelectorAll('select.block-tariff__select');
  deliveryTypes.forEach(el => $(el).change(event => changeDeliveryTabs(event.target)));

  const bntCalcOnClick = function () {
    if (!fromDirObj.dirId || !toDirObj.dirId) {
      const calculateWrapper = document.querySelector('.calculate-wrapper');
      const scrollTop = calculateWrapper.getBoundingClientRect().top - 50;
      $('html').animate({ scrollTop }, 500);
      if (!fromDirObj.dirId) fromDir.classList.add('error');
      if (!toDirObj.dirId) toDir.classList.add('error');
      return;
    }

    $('.declaration-wrapper').slideUp(300);

    var services = [];
    $('.service:checked').each(function(i){
      services[i] = {
        service: $(this).data('ref'),
        count: $(this).closest('.options-row-item').find('.qty-wrap input').val()
      }
    });
    var data = {
      action: 'global_calc',
      townSender: fromDirObj.dirId, // идентификатор города отправления
      townRecipient: toDirObj.dirId, //идентификатор города получения
      "declaredCost" : $('[name="declaredCost"]').val(), // declaredCost - заявленная стоимость
      "cargoType": $('.subtype-block li.selected').data('ref'), //идентификатор вида груза
      "seatsAmount": $('[name="seatsAmount"]').val(),//количество мест
      "weight": ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val(), //вес груза
      "width": $('[name="width"]').val(),//ширина всех мест отправления
      "length": $('[name="length"]').val(),//длина всех мест отправления
      "height" : $('[name="height"]').val(),//высота всех мест отправления
      "volume" : $('[name="volume"]').val(),//объем груза
      departure:  fromDirObj.dirType, //доставка груза до дверей получателя
      delivery: toDirObj.dirType, //выезд за грузом до дверей отправителя
      "addServices": services
    }

    if (fromDirObj.dirType) data.departureCondition = fromDirObj.deliveryType;
    if (toDirObj.dirType) data.deliveryCondition = toDirObj.deliveryType;

    $.ajax({
      url: API_URL,
      data,
      type: "GET",
      dataType : 'html',
      success: function(msg) {
        msg = JSON.parse(msg);
        $('.advS').remove();
        if( msg.success === "true" ){
          var subtarif = msg.data[0].tarif;
          var total = msg.data[0].cost;
          var creation = msg.data[0].creationCost;
          var insurance = msg.data[0].insuranceCost;
          var departure = msg.data[0].departureCost;
          var delivery = msg.data[0].deliveryCost;
          var transport = total - (creation + insurance + departure + delivery);

          if( msg.data[0].addServices ){
            $('.advservices').show();
            for(var i=0; i<msg.data[0].addServices.length; i++ ){
              var t = $('[data-ref="'+msg.data[0].addServices[i].service+'"]').next().next().text();
              if( t.match(/\(.+\)$/) ){
                t = t.replace(/\(/, '</span> / ');
                t = t.replace(/\)/, '');
              } else if( t.match(/ в /) ){
                t = t.replace(/ в /, '</span> / ');
              } else {
                t += "</span>";
              }
              var ss = '<tr class="advS"><td class="upper"><span class="dark"><i class="fa fa-check"aria-hidden="true"></i>'+t+'</td><td class="dark right">'+msg.data[0].addServices[i].cost+' грн</td></tr>';
              transport -= msg.data[0].addServices[i].cost;

              $('.advservices tbody').append(ss);

            }
          } else {
            $('.advservices').hide();
          }
          const fromTabLabel = document.querySelector('[name=from-delivery-tabs]:checked + .delivery-tabs__item');
          document.getElementById('fromType').textContent = fromTabLabel.textContent.trim();

          const toTabLabel = document.querySelector('[name=to-delivery-tabs]:checked + .delivery-tabs__item');
          document.getElementById('toType').textContent = toTabLabel.textContent.trim();

          document.getElementById('fromDateTicket').textContent = fromDate.value;
          document.getElementById('toDateTicket').textContent = toDate.value;

          document.getElementById('fromCity').textContent = fromDirObj.dirValue;
          document.getElementById('toCity').textContent = toDirObj.dirValue;

          var type = $('.type-block li.selected').data('type');

          $('.hidden_dec').css('display', 'none');
          $('.'+type+'_show').css('display', 'table-row');
          $('.decSubtype').text( subtarif );
          $('#decCost').text( $('[name="declaredCost"]').val() );
          $('#decAva').text( $('[name="seatsAmount"]').val() );
          $('#decVol').text( $('[name="volume"]').val() );
          $('.'+type+'_show #decWid').text( $('[name="width"]').val() );
          $('.'+type+'_show #decLen').text( $('[name="length"]').val() );
          $('.'+type+'_show #decHei').text( $('[name="height"]').val() );
          $('.decWei').text( ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val() );


          $('#decDimen').text( transport );
          $('#decDeparture').text( departure );
          ( departure > 0 )?$('.departure_cost').css('display', 'table-row'):"";
          $('#decDelivery').text( delivery );
          ( delivery > 0 )?$('.delivery_cost').css('display', 'table-row'):"";

          $('#decCreation').text( creation );
          $('#decInsurance').text( insurance );

          $('#totalCost').text(total);
          $('.decType').text( $('.type-block li.selected').text() );

          $('.declaration-wrapper').slideDown(300);
        }
      }
    })
  };

  $('#btnCalc').on('click', bntCalcOnClick);

  getServices();
  getTypes();
  initTabs();
  initTimePicker();
  initDirs();
});
