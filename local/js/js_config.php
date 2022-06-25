<?
$arJsConfig = array(
    'chartjs' => array(
        'js' => '/local/js/chartjs/Chart.min.js',
        'css' => '/local/js/chartjs/Chart.min.css',
        'scip_core' => true,
    )
);

foreach ($arJsConfig as $ext => $arExt) {
    CJSCore::RegisterExt($ext, $arExt);
}