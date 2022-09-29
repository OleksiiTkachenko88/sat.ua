window.addEventListener('load', () => {
  const form = document.querySelector('form[action*="/carrier/new"]');
  const fullname = document.getElementById('fullname');
  const phone = document.getElementById('phone');
  const cityName = document.getElementById('city_name');
  const city = document.getElementById('city');
  const brand1 = document.getElementById('brand1');
  const volume1 = document.getElementById('volume1');
  const length1 = document.getElementById('length1');
  const width1 = document.getElementById('width1');
  const height1 = document.getElementById('height1');
  const btnSend = document.getElementById('btnSend');
  const addAuto = document.getElementById('addAuto');
  const removeAuto = document.getElementById('removeAuto');

  $(phone).mask('+38(099)999-99-99');

  const initCity = () => {
    const response = (event, { content }) => !content.length
      && content.push({ value: '', id: '', label: noResultInfo });

    const open = () => (device.mobile() || device.tablet())
      && $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');

    const autocompleteOptions = {
      source: `/bitrix/templates/sat_main/api.php?lang=${api_lang}&action=getTown`,
      minLength: 3,
      open,
      response,
      select: (event, { item }) => city.value = item.id
    }

    $(cityName).autocomplete(autocompleteOptions);
  }

  initCity();

  phone.addEventListener('click', event => {
    setTimeout(() => {
      const index = event.target.value.indexOf('_');
      console.log(index);
      if (index !== -1) event.target.setSelectionRange(index, index);
    }, 50);
  });

  const getLabelTop = el => el.parentElement.querySelector('label').getBoundingClientRect().top;

  const onSubmit = event => {
    let error = false;
    let errorTop = 0;
    const errorClassName = 'text-field--error';

    if (!fullname.value) {
      fullname.classList.add(errorClassName);
      errorTop = getLabelTop(fullname);
      error = true;
    } else {
      fullname.classList.remove(errorClassName);
    }

    if (!phone.value) {
      phone.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(phone);
        error = true;
      }
    } else {
      phone.classList.remove(errorClassName);
    }

    const typeStyler = document.getElementById('form_dropdown_type-styler');
    const type = document.getElementById('form_dropdown_type');

    if (type.options[type.selectedIndex].text === 'Выберите значение') {
      typeStyler.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(typeStyler);
        error = true;
      }
    } else {
      typeStyler.classList.remove(errorClassName);
    }

    if (!city.value) {
      cityName.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(cityName);
        error = true;
      }
    } else {
      cityName.classList.remove(errorClassName);
    }

    const flpStyler = document.getElementById('form_dropdown_flp-styler');
    const flp = document.getElementById('form_dropdown_flp');

    if (flp.options[flp.selectedIndex].text === 'Выберите значение') {
      flpStyler.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(flpStyler);
        error = true;
      }
    } else {
      flpStyler.classList.remove(errorClassName);
    }

    const relocationStyler = document.getElementById('form_dropdown_relocation-styler');
    const relocation = document.getElementById('form_dropdown_relocation');

    if (relocation.options[relocation.selectedIndex].text === 'Выберите значение') {
      relocationStyler.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(relocationStyler);
        error = true;
      }
    } else {
      relocationStyler.classList.remove(errorClassName);
    }

    if (!brand1.value) {
      brand1.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(brand1);
        error = true;
      }
    } else {
      brand1.classList.remove(errorClassName);
    }

    const year1Styler = document.getElementById('form_dropdown_year1-styler');
    const year1 = document.getElementById('form_dropdown_year1');

    if (year1.options[year1.selectedIndex].text === 'Выберите значение') {
      year1Styler.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(year1Styler);
        error = true;
      }
    } else {
      year1Styler.classList.remove(errorClassName);
    }

    if (+volume1.value < 0.5 || +volume1.value > 136) {
      volume1.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(volume1);
        error = true;
      }
    } else {
      volume1.classList.remove(errorClassName);
    }

    const payload1Styler = document.getElementById('form_dropdown_payload1-styler');
    const payload1 = document.getElementById('form_dropdown_payload1');

    if (payload1.options[payload1.selectedIndex].text === 'Выберите значение') {
      payload1Styler.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(payload1Styler);
        error = true;
      }
    } else {
      payload1Styler.classList.remove(errorClassName);
    }

    const compartmenttype1Styler = document.getElementById('form_dropdown_compartmenttype1-styler');
    const compartmenttype1 = document.getElementById('form_dropdown_compartmenttype1');

    if (compartmenttype1.options[compartmenttype1.selectedIndex].text === 'Выберите значение') {
      compartmenttype1Styler.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(payload1Styler);
        error = true;
      }
    } else {
      compartmenttype1Styler.classList.remove(errorClassName);
    }

    if (+length1.value < 50 || +length1.value > 1360) {
      length1.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(length1);
        error = true;
      }
    } else {
      length1.classList.remove(errorClassName);
    }

    if (+width1.value < 140 || +width1.value > 250) {
      width1.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(width1);
        error = true;
      }
    } else {
      width1.classList.remove(errorClassName);
    }

    if (+height1.value < 30 || +height1.value > 290) {
      height1.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(height1);
        error = true;
      }
    } else {
      height1.classList.remove(errorClassName);
    }

    const taillift1Styler = document.getElementById('form_dropdown_taillift1-styler');
    const taillift1 = document.getElementById('form_dropdown_taillift1');

    if (taillift1.options[taillift1.selectedIndex].text === 'Выберите значение') {
      taillift1Styler.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(payload1Styler);
        error = true;
      }
    } else {
      taillift1Styler.classList.remove(errorClassName);
    }

    if (error) {
      event.preventDefault();
      const headerRect = document.querySelector('header').getBoundingClientRect();
      const top = errorTop + window.scrollY - headerRect.top - headerRect.height;
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }

    setTimeout( () => btnSend.style.visibility = 'hidden', 50);
  };


  form.addEventListener('submit', onSubmit);

  let quantityAuto = 1;
  const onAddAuto = evt => {
    evt.preventDefault();
    const list = document.querySelectorAll(`.auto${++quantityAuto}`);
    list.forEach(el => el.classList.remove('hide'));
    if (quantityAuto === 3) addAuto.classList.add('hide');
    else addAuto.classList.remove('hide');

    if (quantityAuto === 1) removeAuto.classList.add('hide');
    else removeAuto.classList.remove('hide');
  }

  addAuto.addEventListener('click', onAddAuto);

  const onRemoveAuto = evt => {
    evt.preventDefault();
    const list = document.querySelectorAll(`.auto${quantityAuto--}`);
    list.forEach(el => el.classList.add('hide'));
    if (quantityAuto === 3) addAuto.classList.add('hide');
    else addAuto.classList.remove('hide');

    if (quantityAuto === 1) removeAuto.classList.add('hide');
    else removeAuto.classList.remove('hide');
  }

  removeAuto.addEventListener('click', onRemoveAuto);
});





