<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "ТК “САТ”");
$APPLICATION->SetPageProperty("title", "ТК \"САТ\"");
$APPLICATION->SetTitle("SAT");
?>

<div class="international-post">
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
							<span itemprop="title"><?echo $APPLICATION->GetDirProperty("EUROPE2");?></span> 
						</span>
					</div>
					
					<a class="link-more show-full-text"><?=getMessage("READ_ALL")?></a>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="international-form-content">
	<div class="container">
		<div class="row">

	<div class="container"></div>
			<div></div>
  <div id="header_region">
    <p><?echo getMessage("SHAPKA2")?></p>
  </div>
	<?
	$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "index_inc.php", Array(), Array(
	"MODE"      => "html",
	"NAME"      => "текста",
	"TEMPLATE"  => "text.php"
	));
	?>
<?$APPLICATION->IncludeComponent(
	"bitrix:form.result.new", 
	"new_region", 
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
		"WEB_FORM_ID" => "11",
		"COMPONENT_TEMPLATE" => "new_region",
		"SEF_FOLDER" => "ru/region/Qse5h91/",
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


