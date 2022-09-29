<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Форма для заявки потенциального партнёра – Оставить заявку на сотрудничество | Быстрая | Выгодно | Надежно");
$APPLICATION->SetPageProperty("title", "Анкета потенциального партнёра. | Транспортная компания “САТ”");
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
                        <div class="strategy-banner-text clearfix">

                            <!--<a class="submit-button" href="<?echo $APPLICATION->GetDirProperty("BTN_URL");?>"><?echo $APPLICATION->GetDirProperty("BTN_TEXT");?></a>-->
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
							<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
								<a itemprop="url" href="<?echo SITE_DIR;?>"> 
									<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
							</span>
							<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
								<span itemprop="title"><?echo $APPLICATION->GetDirProperty("H1");?></span> 
							</span>
						</div>
<?$APPLICATION->IncludeComponent(
	"bitrix:form.result.new", 
	"new_partner", 
	array(
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"CHAIN_ITEM_LINK" => "",
		"CHAIN_ITEM_TEXT" => "",
		"EDIT_URL" => "",
		"IGNORE_CUSTOM_TEMPLATE" => "N",
		"LIST_URL" => "",
		"SEF_MODE" => "N",
		"SUCCESS_URL" => "",
		"USE_EXTENDED_ERRORS" => "N",
		"WEB_FORM_ID" => "3",
		"COMPONENT_TEMPLATE" => "new_partner",
		"SEF_FOLDER" => "/ru/partners/new/",
		"VARIABLE_ALIASES" => array(
			"WEB_FORM_ID" => "WEB_FORM_ID",
			"RESULT_ID" => "RESULT_ID",
		)
	),
	false
);?>                       
                    </div>
                </div>
            </div>
        </div>
    </div>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>