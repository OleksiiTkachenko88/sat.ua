<?
  if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
  $this->setFrameMode(true);
?>

<style>
  .page-contacts {
    background: #1e3e6c;
    padding: 35px 0;
    color: white;
    font-size: 12px;
  }

  @media (min-width: 1001px) {
    .page-contacts {
      padding-top: 120px;
    }
  }

  @media (min-width: 1341px) {
    .page-contacts {
      font-size: 14px;
    }
  }

  @media (min-width: 1600px) {
    .page-contacts {
      font-size: 16px;
    }
  }

  .page-contacts__wrapper-content {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .page-contacts__wrapper-content {
      flex-direction: row;
      align-items: center;
    }
  }

  .page-contacts__wrapper-content a {
    padding-top: 6px;
    padding-bottom: 6px;
    display: flex;
    color: inherit;
  }

  .page-contacts__wrapper-content a:hover {
    color: #88e3ff;
  }


  .page-contacts__wrapper-content li {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }


  .page-contacts__wrapper-content ul img {
    max-width: 20px;
    max-height: 20px;
    margin-right: 14px;
    vertical-align: middle;
  }

  @media (min-width: 1600px) {
    .page-contacts__wrapper-content ul img {
      max-width: 26px;
      max-height: 26px;
      margin-right: 20px;
    }
  }

  .page-contacts__wrapper-content ul span {
    font-size: 14px;
    display: block;
  }

  .page-contacts__wrapper-content ul span+span {
    margin-top: 6px;
  }

  @media (min-width: 1341px) {
    .page-contacts__wrapper-content ul span {
      font-size: 16px;
    }
  }

  @media (min-width: 1341px) {
    .page-contacts__wrapper-content ul span {
      font-size: 18px;
    }
  }

  .page-contacts__wrapper-content p+ul,
  .page-contacts__wrapper-content p+p {
    margin-top: 18px;
  }

  @media (min-width: 1341px) {
    .page-contacts__wrapper-content p+ul,
    .page-contacts__wrapper-content p+p {
      margin-top: 20px;
    }
  }
  @media (min-width: 1600px) {
    .page-contacts__wrapper-content p+ul,
    .page-contacts__wrapper-content p+p {
      margin-top: 24px;
    }
  }

  .page-contacts__content {
    flex-grow: 1;
    margin-bottom: 20px;
  }

  @media (min-width: 768px) {
    .page-contacts__content {
      margin-bottom: 0;
      margin-right: 20px;
    }
  }

  @media (min-width: 1341px) {
    .page-contacts__content {
      margin-left: 150px;
    }
  }

  .page-contacts__map {
    width: 100%;
    min-height: 500px;
  }

  @media (min-width: 768px) {
    .page-contacts__map {
      width: 50%;
    }
  }
</style>


<div class="page-contacts">
  <div class="container">
    <div class="page-contacts__wrapper-content">
      <div class="page-contacts__content">
        <?= $arResult["ITEMS"][0]['PROPERTIES']["LEFT"]["~VALUE"]["TEXT"]?>
      </div>
      <div class="page-contacts__map" id="pageContactsMap"></div>
    </div>
  </div>
</div>


<script>
  window.addEventListener('load', () => {
    const position = { lat: 50.443578, lng: 30.647352 };

    let options;
    if (window.innerWidth > 767) {
      options = {
        zoom: 18,
        center: position,
        scrollwheel: false,
        clickableIcons: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.LEFT_CENTER,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE
          ]
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl: false,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        }
      };
    } else {
      options = {
        zoom: 18,
        center: position,
        scrollwheel: false,
        clickableIcons: false,
        mapTypeControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl: false
      };
    }

    const panoramaOptions = {
      addressControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      panControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      enableCloseButton: true
    }

    const map = new google.maps.Map(document.getElementById('pageContactsMap'), options);
    map.getStreetView().setOptions(panoramaOptions);

    new google.maps.Marker({
      position,
      map,
      icon: `<?=SITE_TEMPLATE_PATH;?>/img/marker${window.innerWidth > 767 ? '' : '-small'}.png`,
      title: 'Київ № 1'
    });
  });
</script>
