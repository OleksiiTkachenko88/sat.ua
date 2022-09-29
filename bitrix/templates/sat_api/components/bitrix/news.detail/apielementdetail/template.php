<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<script>
	var RequestMethod = '<?=$arResult["PROPERTIES"]["REQUEST_METHOD"]["VALUE"];?>';
	var RequestURL = '<?=$arResult["PROPERTIES"]["TRY_URL"]["VALUE"]?>';
</script>
<?
$arParamsList = array(	"format"		=>array("xml", "json"),
						"Content-Type"	=>array("text/xml", "application/json"),
					  	"Headers-List"	=>array("Accept", "Accept-Charset", "Accept-Encoding", 
												"Accept-Language", "Age", "Autorization", 
												"Cache-Control", "Connection", "Content-Disposition", 
												"Content-Encoding", "Content-Length", "Content-Location", 
												"Content-Range", "Content-Type", "Cookie", "Date", "ETag", 
												"Expect", "Expires", "From", "Host", "If-Match",
												"If-Modified-Since", "If-None-Match", "If-Range", 
												"If-Unmodified-Since", "Keep-Alive", "Last-Modified", 
												"Location", "Origin", "Ocp-Apim-Subscription-Key",
												"Ocp-Apim-Trace", "Pragma", "Proxy-Authorization", 
												"Range", "Referer", "Remote-User", "Retry-After", 
												"Server", "Set-Cookie", "Transfer-Encoding", "User-Agent",
												"Vary", "Warning", "WWW-Authenticate", "X-Forwarded-For") 
				);

?>
<div class="breadcrumbs">
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<a itemprop="url" href="<?echo SITE_DIR;?>"> 
			<span itemprop="title"><?echo getMessage("MAIN_PAGE");?></span> </a>| 
	</span>
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<a itemprop="url" href="<?echo $arResult["LIST_PAGE_URL"];?>">
			<span itemprop="title"><?echo getMessage("API_HEADER");?></span> </a>| 
	</span>
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<a itemprop="url" href="<?=$arResult["SECTION"]["PATH"][0]["SECTION_PAGE_URL"];?>">
			<span itemprop="title"><?=$arResult["SECTION"]["PATH"][0]["NAME"];?></span> </a>| 
	</span>
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<span itemprop="title"><?echo $arResult["NAME"];?></span> 
	</span>
</div>
<?if($arParams["DISPLAY_NAME"]!="N" && $arResult["SECTION"]["PATH"][0]["NAME"]):?>
<h2><?=$arResult["SECTION"]["PATH"][0]["NAME"]?></h2>
<?endif?>
<?if($arParams["DISPLAY_NAME"]!="N" && $arResult["NAME"]):?>
<h1><?=$arResult["NAME"]?></h1>
<?endif?>
<?if($arResult["PROPERTIES"]["METHOD_DESCRIPTION"]["~VALUE"]):?>
<div class="panel-body"><?=$arResult["PROPERTIES"]["METHOD_DESCRIPTION"]["~VALUE"]?></div>
<?endif?>
<?if($arResult["PROPERTIES"]["TRY_URL"]["VALUE"]):?>
<input type="submit" class="submit-button try-start" value="<?echo getMessage("API_TRY");?>">

<!-- START Часть "Попробовать", которая скрыта до нажатия кнопки" -->
	<div class="try-it">
		<h4><?=$arResult["PROPERTIES"]["TRY_PARAMS"]["NAME"];?></h4>
		<div class="panel-body">
			<?foreach($arResult["PROPERTIES"]["TRY_PARAMS"]["VALUE"] as $key=>$value):?>
			<div class="row">
				<div class="col-md-4">
					<label class="control-label" name='parameterName' parameter-name="<?=$value;?>"><?=$value;?></label>
				</div>
				<div class="col-md-4">
					<input class="control-form" name="parameterValue" placeholder="<?echo getMessage("GET_API_VALUE");?>" spellcheck="false" 
						parameter-name="<?=$value;?>" type="text">
				</div>
				<div class="col-md-3">
					<?if($value !== "format"):?>
					<button id="deleteParameter" class="btn btn-link" type="button" parameter-name="<?=$value;?>" aria-label="<?echo getMessage("API_DEL_PARAM");?>">
						<span class="glyphicon glyphicon-minus"></span><?echo getMessage("API_DEL_PARAM");?>
					</button>
					<?endif;?>
				</div>
			</div>
			<?endforeach;?>
			<button id="addParameter" class="btn btn-link" type="button" >
                <span class="glyphicon glyphicon-plus"></span>
                <?echo getMessage("API_ADD_PARAM");?>
            </button>
		</div>
		<h4><?echo getMessage("GET_API_HEADERS");?></h4>
		<div class="panel-body">
			<?if($arResult["PROPERTIES"]["REQUEST_METHOD"]["VALUE"] !== "GET"):?>
			<div class="row">
				<div class="col-md-4">
					<label class="control-label"  name="headerName" header-name="Content-Type">Content-Type</label>
				</div>
				<div class="col-md-4">
				<input class="control-form immybox" name="headerValue" placeholder="<?echo getMessage("GET_API_VALUE");?>" spellcheck="false" 
						header-name="Content-Type" type="text">
				</div>
				<div class="col-md-3">
				<button id="deleteHeader" class="btn btn-link" type="button" header-name="Content-Type" aria-label="<?echo getMessage("API_DEL_HEADER");?>">
					<span class="glyphicon glyphicon-minus"></span><?echo getMessage("API_DEL_HEADER");?>
				</button>
				</div>
			</div>
			<?endif;?>
			<button id="addHeader" class=" btn btn-link" type="button">
                <span class="glyphicon glyphicon-plus"></span>
                <?echo getMessage("API_ADD_HEADER");?>
            </button>
		</div>
	<?if($arResult["PROPERTIES"]["REQUEST_METHOD"]["VALUE"] !== "GET"):?>
<!-- START Текст запроса -->
		<?if($arResult["PROPERTIES"]["METHOD_TEXT"]["VALUE"]):?>
			<h4><?=$arResult["PROPERTIES"]["METHOD_TEXT"]["NAME"]?></h4> 
			<div class="panel-body">
				<?=$arResult["PROPERTIES"]["METHOD_TEXT"]["~VALUE"]["TEXT"]?>
			</div>
		<?endif?>
<!-- END Текст запроса -->
<!-- START Пример запроса -->
		<textarea id="postContent" name="try-post-content"></textarea>
<!-- END Пример запроса -->
	<?endif;?>

		<h4><?=$arResult["PROPERTIES"]["TRY_URL"]["NAME"];?></h4>
			<div class="try-url">
				<span id="requestUrl"><?=$arResult["PROPERTIES"]["TRY_URL"]["VALUE"];?></span>
			</div>
		<div class="submit-wrapper text-center">
			<div class="loader"></div>
			<input type="submit" class="submit-button try-submit" value="<?echo getMessage("API_SUBMIT");?>">
		</div>
		<div class="try-request">
			<h4><?echo getMessage("API_RESPONSE_TEXT");?></h4>
			<div class="try-request-text">
				<span id="requestText"></span>
			</div>
		</div>
	</div>
<!-- END Часть "Попробовать", которая скрыта до нажатия кнопки" -->

<!-- START URL запроса -->
<h4><?=$arResult["PROPERTIES"]["URL_METHOD"]["NAME"]?></h4>
<div class="panel-body">
	<label><b><?=$arResult["PROPERTIES"]["URL_METHOD"]["VALUE"]?></b></label>
</div>
<!-- END URL запроса -->
<?endif?>

<!-- START Параметры запроса -->
<?if($arResult["PROPERTIES"]["METHOD_PARAMS"]["VALUE"]):?>
<h4><?=$arResult["PROPERTIES"]["METHOD_PARAMS"]["NAME"]?></h4>
<div class="panel-body">
	<?=$arResult["PROPERTIES"]["METHOD_PARAMS"]["~VALUE"]["TEXT"]?>
</div>
<?endif?>
<!-- END Параметры запроса -->

<?if($arResult["PROPERTIES"]["REQUEST_METHOD"]["VALUE"] !== "GET"):?>
<!-- START Текст запроса -->
	<?if($arResult["PROPERTIES"]["METHOD_TEXT"]["VALUE"]):?>
<h4><?=$arResult["PROPERTIES"]["METHOD_TEXT"]["NAME"]?></h4> 
<div class="panel-body">
	<?=$arResult["PROPERTIES"]["METHOD_TEXT"]["~VALUE"]["TEXT"]?>
</div>
	<?endif?>
<!-- END Текст запроса -->
<!-- START Пример запроса -->
	<?if($arResult["PROPERTIES"]["METHOD_EXAMPLE"]["VALUE"]):?>
		<div class="method-example">
		<?foreach($arResult["PROPERTIES"]["METHOD_EXAMPLE"]["DESCRIPTION"] as $key=>$value):?>
			<input type="radio" name="method" <?=($key+2=="2")?" checked='checked'":"";?> name="m-example" id="<?=$key+2;?>"/>
			<label for="<?=$key+2;?>"><?=$value;?></label>
		<?endforeach;?>
		<?foreach($arResult["PROPERTIES"]["METHOD_EXAMPLE"]["VALUE"] as $key=>$value):?>
			<div class="method-information" type="<?=$arResult["PROPERTIES"]["METHOD_EXAMPLE"]["DESCRIPTION"][ $key ]?>"><?=$arResult["PROPERTIES"]["METHOD_EXAMPLE"]["VALUE"][$key]["TEXT"];?></div>
		<?endforeach;?>
		</div>
	<?endif?>
<!-- END Пример запроса -->
<?endif;?>

<!-- START Текст ответа -->
<?if($arResult["PROPERTIES"]["ANSWER_TEXT"]["VALUE"]):?>
<h4><?=$arResult["PROPERTIES"]["ANSWER_TEXT"]["NAME"]?></h4> 
<div class="panel-body">
	<?=$arResult["PROPERTIES"]["ANSWER_TEXT"]["~VALUE"]["TEXT"]?>
</div>
<?endif?>
<!-- END Текст ответа -->

<!-- START Пример ответа -->
<?if($arResult["PROPERTIES"]["ANSWER_EXAMPLE"]["VALUE"]):?>
<h4><?=$arResult["PROPERTIES"]["ANSWER_EXAMPLE"]["NAME"]?></h4>

	<div class="answer-example">
	<?foreach($arResult["PROPERTIES"]["ANSWER_EXAMPLE"]["DESCRIPTION"] as $key=>$value):?>
		<input type="radio" name="answer" <?=($key=="0")?" checked='checked'":"";?> name="odin" id="<?=$key;?>"/>
		<label for="<?=$key?>"><?=$value;?></label>
	<?endforeach;?>
	<?foreach($arResult["PROPERTIES"]["ANSWER_EXAMPLE"]["VALUE"] as $key=>$value):?>
 		<div class="answer-information" type="<?=$arResult["PROPERTIES"]["ANSWER_EXAMPLE"]["DESCRIPTION"][ $key ]?>"><?=$arResult["PROPERTIES"]["ANSWER_EXAMPLE"]["VALUE"][$key]["TEXT"];?></div>
	<?endforeach;?>
	</div>
<?endif?>
<!-- END Пример ответа -->
                        <div class="content-text">
							<?echo $arResult["DETAIL_TEXT"];?>
						</div>
						<a class="link-more show-full-text"><?=getMessage("READ_ALL");?></a>