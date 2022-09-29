<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

/*if(!$arResult['NavShowAlways']) {
	if ($arResult['NavRecordCount'] == 0 || ($arResult['NavPageCount'] == 1 && $arResult['NavShowAll'] == false)) {
		return;
	}
}
*/

$strNavQueryString = ($arResult["NavQueryString"] != "" ? $arResult["NavQueryString"]."&amp;" : "");

$strNavQueryStringFull = ($arResult["NavQueryString"] != "" ? "?".$arResult["NavQueryString"] : "");

ob_start();

if($arResult["NavPageCount"] > 1) {
	if ($arResult["NavPageNomer"] > 1){?>
                    <a class="button-more f_left" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=($arResult["NavPageNomer"]-1)?>"><span class="arrow"><img
                            src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black-reverse.png" alt="" rel="nofollow"></span><span class="text"><?=GetMessage("nav_prev")?></span></a>


	<?}
	if($arResult["NavPageNomer"] < $arResult["NavPageCount"]){?>
                    <a class="button-more f_right" href="<?=$arResult["sUrlPath"]?>?<?=$strNavQueryString?>PAGEN_<?=$arResult["NavNum"]?>=<?=($arResult["NavPageNomer"]+1)?>"><span class="text"><?=GetMessage("nav_next")?></span><span class="arrow"><img
                            src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black.png" alt="" rel="nofollow"></span></a>
<?	}
}?>

<?php
$paging = ob_get_contents();
$paging = preg_replace_callback('/href="([^"]+)"/is', function($matches) {
							$url = $matches[1];
							$newUrl = '';
							if ($arUrl = parse_url($url)) {
								$newUrl .= $arUrl['path'];
								if (substr($newUrl, -1) != '/') {
									$newUrl .= '/';
								}
								$newUrl = preg_replace('#(pagen[\d]+/)#is', '', $newUrl);
								parse_str(htmlspecialcharsback($arUrl['query']), $arQuery);
								foreach ($arQuery as $k => $v) {
									if (in_array($k, array('SECTION_CODE'))) {
										unset($arQuery[$k]);
									} elseif (substr($k, 0, 5)=='PAGEN') {
										if(intval($v)>1){
											$newUrl .= 'pagen-'.intval($v).'/';
										}
										else $newUrl .= '';
										unset($arQuery[$k]);
									}
								}
								$buildQuery = http_build_query($arQuery, '', '&amp;');
								if (strlen($buildQuery)) {
									$newUrl .= '?'.$buildQuery;
								}
							}
							return 'href="'.$newUrl.'"';
						}, $paging);
ob_end_clean();

echo $paging;
?>