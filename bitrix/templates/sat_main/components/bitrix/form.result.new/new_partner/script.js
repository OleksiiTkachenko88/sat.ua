window.addEventListener('load', () => {
  $('input[name="form_text_8"]').mask("+38(099)999-99-99");
  $('input[name="form_text_9"]').attr('id','fromDir');

  const validEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const form = document.querySelector('form[action$="/partners/new/"]');
  const fullname = form.querySelector('[name="form_text_7"]');
  const phone = form.querySelector('[name="form_text_8"]');
  const email = form.querySelector('[name="form_email_13"]');

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

    if (!validEmail(email.value)) {
      email.classList.add(errorClassName);
      if (!error) {
        errorTop = getLabelTop(email);
        error = true;
      }
    } else {
      email.classList.remove(errorClassName);
    }

    if (error) {
      event.preventDefault();
      const headerRect = document.querySelector('header').getBoundingClientRect();
      const top = errorTop + window.scrollY - headerRect.top - headerRect.height;
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }

    fbq('track', 'Lead'); // Facebook Pixel Code
  };


  form.addEventListener('submit', onSubmit);

});





