<?
  if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
  $this->setFrameMode(true);
?>

<style>
  .page-contacts {
    background-color: #1e3e6c;
  }

  .page-contacts__wrapper-content {
    display: flex;
    flex-direction: column;
    padding: 35px 0;
    color: white;
    font-size: 12px;
  }

  @media (min-width: 768px) {
    .page-contacts__wrapper-content {
      flex-direction: row;
    }
  }


  @media (min-width: 1001px) {
    .page-contacts__wrapper-content {
      padding-top: 120px;
    }
  }

  @media (min-width: 1341px) {
    .page-contacts__wrapper-content {
      font-size: 14px;
    }
  }

  @media (min-width: 1600px) {
    .page-contacts__wrapper-content {
      font-size: 16px;
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
  }

  @media (min-width: 768px) {
    .page-contacts__content {
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
  }

  @media (min-width: 1341px) {
    .page-contacts__map {
      width: 50%;
    }
  }

  .page-contacts__map img {
    display: block;
    height: 350px;
  }
</style>

<div class="page-contacts">
  <div class="container">
    <div class="page-contacts__wrapper-content">
      <div class="page-contacts__content">
        <?= $arResult["ITEMS"][0]['PROPERTIES']["LEFT"]["~VALUE"]["TEXT"]?>
      </div>
      <div class="page-contacts__map">
        <?= $arResult["ITEMS"][0]['PROPERTIES']["RIGHT"]["~VALUE"]["TEXT"]?>
      </div>
    </div>
  </div>
</div>
