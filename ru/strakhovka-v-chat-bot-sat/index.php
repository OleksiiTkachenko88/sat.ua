<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("H1", "Оформление страхового полиса в чат-боте SAT");
$APPLICATION->SetPageProperty("description", "Оформление страхового полиса в чат-боте SAT");
$APPLICATION->SetPageProperty("title", "Оформление страхового полиса в чат-боте SAT");
$APPLICATION->SetTitle("Оформление страхового полиса в чат-боте SAT");
?>
<div class="strategy-banner" style="background-image: url('<?=SITE_TEMPLATE_PATH;?>/img/SKbaner2.jpg');">
<div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="strategy-banner-content">
                        <div class="strategy-banner-text clearfix">
                            <h1><?= $APPLICATION->ShowTitle(false)?></h1>
                           
                        </div>
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

							<a itemprop="url" href="<?echo SITE_DIR;?>">
								<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>|
					

							<span itemprop="title"><?echo $APPLICATION->GetDirProperty("H2");?></span>

					</div>
	<?
	$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "index_inc.php", Array(), Array(
	"MODE"      => "html",
	"NAME"      => "текста",
	"TEMPLATE"  => "text.php"
	));
	?>
					</div>
					

				</div>
			</div>
		</div>
	</div>







<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>