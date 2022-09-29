<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
CJSCore::Init(array("fx"));
?>
<!DOCTYPE html>
<html xml:lang="<?=LANGUAGE_ID?>" lang="<?=LANGUAGE_ID?>">
<head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-156797935-1"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'UA-156797935-1');
	</script>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width">
	<link rel="shortcut icon" type="image/x-icon" href="<?=SITE_DIR?>favicon.ico" />
	<noscript>
	<link data-font="g-font-roboto" data-protected="true" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
	<link data-font="g-font-open-sans" data-protected="true" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=cyrillic" rel="stylesheet">
	</noscript>
	<?$APPLICATION->ShowHead();?>
	<?
	$APPLICATION->SetAdditionalCSS("/bitrix/css/main/bootstrap.css");
	$APPLICATION->SetAdditionalCSS("/bitrix/css/main/font-awesome.css");
	?>
	<title><?$APPLICATION->ShowTitle()?></title>
</head>
<body>
<div id="panel"><?$APPLICATION->ShowPanel();?></div>
<header class="night-header">
	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-12">
				<div class="night-sat-logo">
					<a href="https://nexpress.com.ua" rel="nofollow">
						<img src="<?=SITE_TEMPLATE_PATH?>/images/night-logo.png" />
					</a>
					<a href="https://www.sat.ua" rel="nofollow">
						<img src="<?=SITE_TEMPLATE_PATH?>/images/sat-logo.png" />
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
<div class="workarea">
	<div class="container-fluid">