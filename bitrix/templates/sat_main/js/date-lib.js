const dateLib = (() => {
  const zeroStart = (num, digits = 2) => num.toString().padStart(digits, '0');
  const getDateTime = (date = new Date()) => new Date(date);

  const formatDate = (format, datePar) => {
    if (!format) return '';
    const date = getDateTime(datePar);
    let result = format.toString();

    const mask = {
      YYYY: date.getFullYear().toString(),
      YY: date.getFullYear().toString().slice(2),
      MM: zeroStart(date.getMonth() + 1),
      DD: zeroStart(date.getDate()),
      HH: zeroStart(date.getHours()),
      mm: zeroStart(date.getMinutes()),
      ss: zeroStart(date.getSeconds()),
      SSS: zeroStart(date.getMilliseconds(), 3)
    };

    Object.entries(mask).forEach(({ 0: key, 1: value }) => {
      result = result.replace(new RegExp(key, 'g'), value);
    });

    return result;
  };

  const addDays = (amount = 0, datePar) => {
    const date = getDateTime(datePar);
    date.setDate(date.getDate() + amount);
    return date;
  };

  const subtractDays = (amount = 0, datePar) => {
    const date = getDateTime(datePar);
    date.setDate(date.getDate() - amount);
    return date;
  };

  const addHours = (amount = 0, datePar) => {
    const date = getDateTime(datePar);
    date.setHours(date.getHours() + amount);
    return date;
  };

  const subtractHours = (amount = 0, datePar) => {
    const date = getDateTime(datePar);
    if (amount) date.setHours(date.getHours() - amount);
    return date;
  };

  const addMinutes = (amount = 0, datePar) => {
    const date = getDateTime(datePar);
    date.setMinutes(date.getMinutes() + amount);
    return date;
  };

  const dateToObj = datePar => {
    const date = getDateTime(datePar);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  };

  const getDateObj = ({ year, month, day }) => {
    const currentDate = new Date();
    return {
      year: year || currentDate.getFullYear(),
      month: month >= 1 && month <= 12 ? +month : currentDate.getMonth() + 1,
      day: +day || currentDate.getDay()
    };
  };

  const monthToStr = month => zeroStart(month);
  const dayToStr = day => zeroStart(day);

	const setDateTimeFromObj = (obj, propDate) => {
    const date = getDateTime(propDate);
		if (typeof obj.days === 'number') date.setDate(obj.days);
		if (typeof obj.hours === 'number') date.setHours(obj.hours);
		if (typeof obj.minutes === 'number') date.setMinutes(obj.minutes);
		if (typeof obj.seconds === 'number') date.setSeconds(obj.seconds);
		if (typeof obj.milliseconds === 'number') date.setMilliseconds(obj.milliseconds);
		return date;
	}

  return {
    formatDate,
    addDays,
    subtractDays,
    addHours,
    subtractHours,
    addMinutes,
    dateToObj,
    getDateObj,
    monthToStr,
    dayToStr,
    setDateTimeFromObj
  }
})();
