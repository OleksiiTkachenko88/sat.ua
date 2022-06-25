<?
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/urlrewrite.php');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
 
global  $APPLICATION;
$old = file($_SERVER['DOCUMENT_ROOT']."/redirect/old.txt");
$new = file($_SERVER['DOCUMENT_ROOT']."/redirect/new.txt");
foreach($old as $code => $link):
	$link = trim($link);
	if($APPLICATION->GetCurPage()==$link):
		header("HTTP/1.1 301 Moved Permanently");
		header("Location: https://www.sat.ua".trim($new[$code]));
		exit();
	endif;
endforeach;

header('Location: https://www.sat.ua'.SITE_DIR.'404.php');
die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>