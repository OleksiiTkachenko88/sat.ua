#!/usr/bin/php7.1
<?
$_SERVER["DOCUMENT_ROOT"] = "/var/www/sat81j/sat.ua";
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];

define("NO_KEEP_STATISTIC", true);
define("NOT_CHECK_PERMISSIONS", true);

set_time_limit(0);

$filename = $DOCUMENT_ROOT. '/ua/cron/getRsp.json';
$tmp = file_get_contents("http://78.154.176.238:8983/getRsp?language=uk");
file_put_contents($filename, $tmp);
?>
