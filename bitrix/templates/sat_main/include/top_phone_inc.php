<a id="headerPhone" href="tel:0800309909" onclick="fbq('track', 'Contact')">0 800 30 99 09</a>

<script>
  (() => {
    const onClickHeaderPhone = () => {
      fbq('track', 'Contact');
      gtag('event', 'headerPhone', {'event_category': 'klik'});
      console.log('111');
    };

    const topHeaderPhone = document.getElementById('headerPhone');
    headerPhone.addEventListener('click', onClickHeaderPhone);
  })();
</script>
