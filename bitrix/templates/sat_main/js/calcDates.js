const calcDates = (() => {
  const START_HOURS_DEFAULT = 9;
  const END_HOURS_DEFAULT = 19;
  const END_HOURS_SATURDAY = 15;
  const DOOR_END_HOURS_TODAY = 12; // время приема заявок для Двери в текущий день
  const STANDARD_HOURS_DELIVERY = 4; // время доставки для "двери" - "стандарт"
  const EXACT_HOURS_DELIVERY_TODAY = 3; // виїзд за вантажем у точно домовлений час, але не менше ніж через 3 години з моменту оформлення замовлення

  const formatToTime = dateLib.formatDate.bind(null, 'HH:mm');

  const getWorkDayAdd = (dateStart, time, endTime, holydays) => {
    let date = dateLib.formatDate('YYYY-MM-DD', dateStart);

    if (time < endTime && !holydays.includes(date)) return 0;

    let i = 0;
    do {
      const dateNew = dateLib.addDays(++i, dateStart);
      date = dateLib.formatDate('YYYY-MM-DD', dateNew);
    } while (holydays.includes(date));
    return i;
  }

  const getEndHours = (dayOfWeek, endTimeDef, endTimeSat) => dayOfWeek < 6 ? endTimeDef : endTimeSat;

  const getTimeList = (dateStart, dateEnd) => {
    const list = [];
    let date = new Date(dateStart);

    while (+date <= +dateEnd) {
      list.push(formatToTime(date));
      date = dateLib.addMinutes(15, date);
    }
    return list;
  }

  const checkCurrent = date => {
    const dateNow = new Date();
    const isCurrentDay = date.getDate() === dateNow.getDate()
    && date.getMonth() === dateNow.getMonth()
    && date.getFullYear() === dateNow.getFullYear();

    const isCurrentHours = isCurrentDay && date.getHours() === dateNow.getHours();
    return { isCurrentDay, isCurrentHours }
  }

  const minutesRound = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes > 1 && minutes <= 15) minutes = 15;
    else if (minutes > 15 && minutes <= 30) minutes = 30;
    else if (minutes > 30 && minutes <= 45) minutes = 45;
    else if (minutes > 45) ++hours;

    return dateLib.setDateTimeFromObj({ hours, minutes, seconds: 0, milliseconds: 0 }, date);
  }

  const getDateStart = options => {
    const { startHours, holydays } = options;
    let dateStart = options.date;
    const dateNow = new Date();

    if (+dateStart < +dateNow) dateStart = dateNow;

    const { isCurrentDay, isCurrentHours } = checkCurrent(dateStart);
    if (isCurrentHours) dateStart = dateLib.addHours(1, dateStart);

    let dateStartHours = dateStart.getHours();

    const dayOfWeek = dateStart.getDay()
    const endHours = getEndHours(dayOfWeek, options.endHoursDef, options.endHoursSat);
    const endHoursToday = (isCurrentDay && options.endHoursToday)
      || (options.isNight && 23) || endHours;
    const workDaysAdd = getWorkDayAdd(dateStart, dateStartHours, endHoursToday, holydays);
    let dateStartDays = dateStart.getDate();

    if (workDaysAdd || !isCurrentDay || dateStartHours < startHours) {
      dateStartDays += workDaysAdd;
      dateStartHours = startHours
    } else {
      dateStartHours += options.addStartHoursToday || 0;
    }

    const objTimeSet = { days: dateStartDays, hours: dateStartHours, minutes: 0, seconds: 0, milliseconds: 0 };
    dateStart = dateLib.setDateTimeFromObj(objTimeSet, dateStart);
    return dateStart;
  }

  const getWorkDate = options => {
    const { dateInit, startHours, endHoursDef, endHoursSat, betweenStartEnd, holydays } = options;
    let { dateCurrent } = options;

    const isNight = endHoursDef < startHours;

    const optionsDateStart = {
      isNight,
      startHours,
      endHoursDef,
      endHoursSat,
      endHoursToday: options.endHoursToday,
      addStartHoursToday: options.addStartHoursToday,
      holydays
    }

    const dateCurrentStart = getDateStart(Object.assign({}, optionsDateStart, { date: dateCurrent }));

    let dayOfWeek = dateCurrentStart.getDay();
    let endHours = getEndHours(dayOfWeek, endHoursDef, endHoursSat);

    let dateEnd = dateLib.setDateTimeFromObj({ hours: endHours }, dateCurrentStart);
    if (isNight) dateEnd = dateLib.addDays(1, dateEnd);

    dateCurrent = minutesRound(dateCurrent);
    if (isNight && +dateCurrent < +dateCurrentStart) {
      const hours = dateCurrent.getHours()
      if (options.isDelivery && hours < startHours
        || hours > endHours) dateCurrent = new Date(dateCurrentStart);
      else dateCurrent = dateLib.addDays(1, dateCurrent);
    }
    else if (+dateCurrent < +dateCurrentStart) dateCurrent = new Date(dateCurrentStart);

    if (+dateLib.addHours(betweenStartEnd, dateCurrent) > +dateEnd) {
      dateCurrent = dateLib.subtractHours(betweenStartEnd, dateEnd);
    }

    const dateCurrentStartEnd = dateLib.subtractHours(betweenStartEnd, dateEnd);
    const dateCurrentEndStart = dateLib.addHours(betweenStartEnd, dateCurrent);

    if (isNight && dateCurrent.getHours() < startHours) dateCurrent = dateLib.subtractDays(1, dateCurrent);

    return {
      dateInit,
      dateStart: getDateStart(Object.assign({}, optionsDateStart, { date: dateInit })),
      dateEnd,
      dateCurrent,
      timeStartSelected: formatToTime(dateCurrent),
      timeStartList: getTimeList(dateCurrentStart, dateCurrentStartEnd),
      timeEndList: getTimeList(dateCurrentEndStart, dateEnd)
    };
  }

  return (dateInit = new Date(), dateCurrent, typeDelivery = 0, isDelivery, holydays) => {
    const options = {
      isDelivery,
      dateInit,
      dateCurrent,
      startHours: START_HOURS_DEFAULT,
      endHoursDef: END_HOURS_DEFAULT,
      endHoursSat: END_HOURS_SATURDAY,
      holydays
    };

    switch (typeDelivery) {
      case 1: {
        // "Виїзд Стандарт" - послуга передбачає виїзд за вантажем протягом операційного дня
        // згідно до маршруту руху транспорту служби доставки упродовж 4-х годин
        // від часу оформлення заявки (заявка приймається до 12:00)
        options.endHoursToday = DOOR_END_HOURS_TODAY;
        options.betweenStartEnd = STANDARD_HOURS_DELIVERY;
        break;
      }
      case 2: {
        // "Виїзд Вчасно"- послуга передбачає виїзд за вантажем у точно домовлений час,
        // але не менше ніж через 3 години з моменту оформлення замовлення
        // (заявка приймається до 12:00) та на відстань до 30 км.,
        // або не менше ніж через 1 годину з моменту початку роботи та за 1 годину до закриття представництва
        options.startHours = START_HOURS_DEFAULT + 1;
        options.endHoursDef = END_HOURS_DEFAULT - 1;
        options.endHoursSat = END_HOURS_SATURDAY - 1;
        options.endHoursToday = DOOR_END_HOURS_TODAY;
        options.addStartHoursToday = EXACT_HOURS_DELIVERY_TODAY;
        break;
      }
      case 3: {
        // "Виїзд/Доставка Нічний" - послуга передбачає виїзд за вантажем або доставку
        // з 19:00 до 9:00 згідно до маршруту руху транспорту служби доставки
        options.startHours = END_HOURS_DEFAULT;
        options.endHoursDef = START_HOURS_DEFAULT;
        options.endHoursSat = START_HOURS_DEFAULT;
        options.endHoursToday = DOOR_END_HOURS_TODAY;
        options.betweenStartEnd = STANDARD_HOURS_DELIVERY;
        break;
      }
    }

    return getWorkDate(options);
  }
})();
