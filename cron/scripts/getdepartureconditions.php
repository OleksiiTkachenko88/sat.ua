#!/usr/bin/php7.1
<?
$_SERVER["DOCUMENT_ROOT"] = "/var/www/sat81j/sat.ua";
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);

//require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules­/main/include/prolog_before.php");
set_time_limit(0);

$filename = $DOCUMENT_ROOT. '/ua/cron/getDepartureConditions.json';

$tmp = file_get_contents("https://catalog.sat.ua/getDepartureConditions?language=uk");
file_put_contents($filename, $tmp);
?>
