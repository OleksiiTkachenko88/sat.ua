<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Анкета для заявки потенційного партнера - Залишити заявку на співпрацю | Швидка | вигідно | надійно");
$APPLICATION->SetPageProperty("title", "Франчайзинг. Анкета потенційного партнера. | Транспортна компанія “САТ”");
?>
<style>
  .strategy-post .post-content{margin-top:-300px; margin-bottom:35px;}
  @media (max-width: 768px){.strategy-banner .strategy-banner-content{padding-top: 200px;}
  .strategy-post .post-content{margin-top:0px; margin-bottom:0;}
  }
</style>
  <div class="strategy-banner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/img/partners-baner.png');">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="strategy-banner-content">
            <div class="strategy-banner-text clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

<div class="strategy-post">
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <div class="post-content">
          <div class="breadcrumbs">
            <span itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
              <a itemprop="url" href="<?echo SITE_DIR;?>">
                <span itemprop="title"><?=getMessage("MAIN_PAGE");?></span>
              </a>|
            </span>
            <span itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
              <span itemprop="title"><?echo $APPLICATION->GetDirProperty("H1");?></span>
            </span>
          </div>

          <?
            $APPLICATION->IncludeComponent(
              "bitrix:form.result.new",
              "new_carrier",
              [
                "LIST_URL" => "",
                "WEB_FORM_ID" => "9"
              ],
              false
            );
          ?>
        </div>
      </div>
    </div>
  </div>
</div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
