#!/usr/bin/php7.1
<?
$_SERVER["DOCUMENT_ROOT"] = "/var/www/sat81j/sat.ua";
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);

set_time_limit(0);

$filename = $DOCUMENT_ROOT. '/ru/cron/getRsp_index.json';
$tmp = file_get_contents("https://catalog.sat.ua/getRsp?language=ru&ref=bbf8e497-33a7-11dd-a17a-001a4d3b885e");
file_put_contents($filename, $tmp);
?>
