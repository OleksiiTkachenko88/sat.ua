<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Центр інформаційної підтримки - Транспортна компанія “САТ” | ВИГІДНО! НАДІЙНО! ВЧАСНО! ☎ 0 800 30 99 09 (безкоштовно по Україні)");
$APPLICATION->SetPageProperty("title", "Центр інформаційної підтримки | Транспортна компанія “САТ”");
$APPLICATION->SetTitle("Центр інформаційної підтримки");
?>
<?
$page = $APPLICATION->GetCurPage();
if($page == '/contacts/'):
header("HTTP/1.1 301 Moved Permanently");
header("Location: https://www.sat.ua/contacts/company/");
endif;

$offices = '[]';
$tmp = file_get_contents("http://78.154.176.238:8983/getRsp?language=" . getMessage("API_LANG"));
function remove_utf8_bom($text) {
    $bom = pack('H*','EFBBBF');
    $text = preg_replace("/^$bom/", '', $text);
    return $text;
}
if ($tmp) {
	$tmp = remove_utf8_bom($tmp);
	$tmp2 = json_decode($tmp);
	if ($tmp2->success) {
		$offices = json_encode($tmp2->data);
	}
}
?> 
<input type="hidden" id="office-center" value="">  
 <div class="map-tracking" id="map"></div>
  <script>
    function initMap() {
      const offices = <?=$offices;?>;
      const objInit = offices.find(obj => obj.number === '299');

      if (window.innerWidth > 767) {
          var opt = {
              zoom: 15,
              center: {lat: objInit.latitude, lng: objInit.longitude},
              scrollwheel: false,
              clickableIcons: false,
              mapTypeControl: true,
              mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                  position: google.maps.ControlPosition.LEFT_CENTER,
                  mapTypeIds: [
                      google.maps.MapTypeId.ROADMAP,
                      google.maps.MapTypeId.SATELLITE
                  ]
              },
              zoomControl: true,
              zoomControlOptions: {
                  position: google.maps.ControlPosition.LEFT_CENTER
              },
              streetViewControl: false,
              streetViewControlOptions: {
                  position: google.maps.ControlPosition.LEFT_CENTER
              },
          };
      } else {
          var opt = {
              zoom: 15,
              center: {lat: objInit.latitude, lng: objInit.longitude},
              scrollwheel: false,
              clickableIcons: false,
              mapTypeControl: false,
              zoomControl: true,
              zoomControlOptions: {
                  position: google.maps.ControlPosition.LEFT_CENTER
              },
              streetViewControl: false
          };
      }

      const panoramaOptions = {
        addressControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        panControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        enableCloseButton: true
      }

      map = new google.maps.Map(document.getElementById('map'), opt);
      map.getStreetView().setOptions(panoramaOptions);

      new google.maps.Marker({
        position: {lat: objInit.latitude, lng: objInit.longitude},
        map: map,
        icon: `<?=SITE_TEMPLATE_PATH;?>/img/marker${window.innerWidth > 767 ? '' : '-small'}.png`,
        title: objInit.description
      });
    }
  </script>
<div class="contacts-tabs" >

<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"contacttabtext",
	Array(
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"ADD_SECTIONS_CHAIN" => "Y",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "Y",
		"DISPLAY_DATE" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array("",""),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => GetMessage("CONTACTS_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("API_NUMBER","LEFT","RIGHT"),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "ACTIVE_FROM",
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "DESC"
	)
);?>



    </div>  
    <div class="contacts-accordion-wrap">
        <div class="container">
            <div class="row">
                    <div class="panel-group" id="contacts-accordion" role="tablist" aria-multiselectable="true">
-->
<?$APPLICATION->IncludeComponent(
	"bitrix:news.list",
	"contacttabtext",
	Array(
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"ADD_SECTIONS_CHAIN" => "Y",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_ADDITIONAL" => "",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"CACHE_TIME" => "36000000",
		"CACHE_TYPE" => "A",
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"DISPLAY_BOTTOM_PAGER" => "Y",
		"DISPLAY_DATE" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PICTURE" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"DISPLAY_TOP_PAGER" => "N",
		"FIELD_CODE" => array("",""),
		"FILTER_NAME" => "",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"IBLOCK_ID" => GetMessage("CONTACTS_ID"),
		"IBLOCK_TYPE" => "ru",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"INCLUDE_SUBSECTIONS" => "Y",
		"MESSAGE_404" => "",
		"NEWS_COUNT" => "20",
		"PAGER_BASE_LINK_ENABLE" => "N",
		"PAGER_DESC_NUMBERING" => "N",
		"PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
		"PAGER_SHOW_ALL" => "N",
		"PAGER_SHOW_ALWAYS" => "N",
		"PAGER_TEMPLATE" => ".default",
		"PAGER_TITLE" => "Новости",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"PREVIEW_TRUNCATE_LEN" => "",
		"PROPERTY_CODE" => array("API_NUMBER","LEFT","RIGHT"),
		"SET_BROWSER_TITLE" => "N",
		"SET_LAST_MODIFIED" => "N",
		"SET_META_DESCRIPTION" => "N",
		"SET_META_KEYWORDS" => "N",
		"SET_STATUS_404" => "N",
		"SET_TITLE" => "N",
		"SHOW_404" => "N",
		"SORT_BY1" => "SORT",
		"SORT_BY2" => "ACTIVE_FROM",
		"SORT_ORDER1" => "ASC",
		"SORT_ORDER2" => "DESC"
	)
);?>

                        <!--<div class="panel panel-default" data-id="28">
                            <div class="panel-heading col-sm-12" role="tab">
                                <h4 class="panel-title">
                                    <a role="button" class="panel-button" data-toggle="collapse"
                                       data-parent="#contacts-accordion" aria-expanded="true">
                                        <span>ПРИВАТНИЙ<br>КЛІЄНТ</span>
                                    </a>
                                </h4>
                            </div>
                            <div class="panel-collapse collapse in" role="tabpanel">
                                <div class="panel-body">
                                    <div class="content-body-item">
                                        <p>Центральний офіс ТОВ «Транспортна компанія «САТ»<br>
                                            вулиця Гродненська, 32, Київ, Україна, 02660</p>
                                        <ul>
                                            <li><a href="tel:044 490 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>044 490 99 09</span></a></li>
                                            <li><a href="tel:067 555 11 33"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 555 11 33</span></a></li>
                                            <li><a href="tel:050 487 2 487"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>050 487 2 487</span></a></li>
                                            <li><a href="tel:0 800 30 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                  alt=""><span>0 800 30 99 09</span></a></li>
                                            <li><a href="mailto:info@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png"
                                                                                  alt=""><span>info@sat.ua</span></a></li>
                                        </ul>
                                    </div>
                                    <div class="content-body-item">
                                        <p>Відділ по зв’язкам із прессою:<br>
                                            За всіма питаннями звертайтесь, будь-ласка до Ірини Миханік</p>
                                        <ul>
                                            <li><a href="tel:067 370 71 05"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 370 71 05</span></a></li>
                                            <li><a href="mailto:pr@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png" alt=""><span>pr@sat.ua</span></a>
                                            </li>
                                        </ul>
                                        <p>Дополнительные склад на приём и выдачу грузов в г. Киев</p>
                                        <p>Отделение №2: ул. Корабельная, 6<br>
                                            Отделение №3: ул. Якутская, 8 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default" data-id="29">
                            <div class="panel-heading col-sm-12" role="tab">
                                <h4 class="panel-title">
                                    <a role="button" class="panel-button" data-toggle="collapse"
                                       data-parent="#contacts-accordion" aria-expanded="false">
                                        <span>КОРПОРАТИВНИЙ<br>КЛІЄНТ</span>
                                    </a>
                                </h4>
                            </div>
                            <div class="panel-collapse collapse" role="tabpanel">
                                <div class="panel-body">
                                    <div class="content-body-item">
                                        <p>Київ № 2<br>
                                            вул. Корабельна, 6</p>
                                        <ul>
                                            <li><a href="tel:044 490 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>044 490 99 09</span></a></li>
                                            <li><a href="tel:067 555 11 33"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 555 11 33</span></a></li>
                                            <li><a href="tel:050 487 2 487"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>050 487 2 487</span></a></li>
                                            <li><a href="tel:0 800 30 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                  alt=""><span>0 800 30 99 09</span></a></li>
                                            <li><a href="mailto:info@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png"
                                                                                  alt=""><span>info@sat.ua</span></a></li>
                                        </ul>
                                    </div>
                                    <div class="content-body-item">
                                        <p>Відділ по зв’язкам із прессою:<br>
                                            За всіма питаннями звертайтесь, будь-ласка до Ірини Миханік</p>
                                        <ul>
                                            <li><a href="tel:067 370 71 05"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 370 71 05</span></a></li>
                                            <li><a href="mailto:pr@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png" alt=""><span>pr@sat.ua</span></a>
                                            </li>
                                        </ul>
                                        <p>Дополнительные склад на приём и выдачу грузов в г. Киев</p>
                                        <p>Отделение №2: ул. Корабельная, 6<br>
                                            Отделение №3: ул. Якутская, 8 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default" data-id="30">
                            <div class="panel-heading col-sm-12" role="tab">
                                <h4 class="panel-title">
                                    <a role="button" class="panel-button" data-toggle="collapse"
                                       data-parent="#contacts-accordion" aria-expanded="false">
                                        <span>ПАРТНЕР<br>(ФРАНЧАЙЗИНГ)</span>
                                    </a>
                                </h4>
                            </div>
                            <div class="panel-collapse collapse" role="tabpanel">
                                <div class="panel-body">
                                    <div class="content-body-item">
                                        <p>Київ № 3<br>
                                            вул. Якутська, 8</p>
                                        <ul>
                                            <li><a href="tel:044 490 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>044 490 99 09</span></a></li>
                                            <li><a href="tel:067 555 11 33"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 555 11 33</span></a></li>
                                            <li><a href="tel:050 487 2 487"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>050 487 2 487</span></a></li>
                                            <li><a href="tel:0 800 30 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                  alt=""><span>0 800 30 99 09</span></a></li>
                                            <li><a href="mailto:info@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png"
                                                                                  alt=""><span>info@sat.ua</span></a></li>
                                        </ul>
                                    </div>
                                    <div class="content-body-item">
                                        <p>Відділ по зв’язкам із прессою:<br>
                                            За всіма питаннями звертайтесь, будь-ласка до Ірини Миханік</p>
                                        <ul>
                                            <li><a href="tel:067 370 71 05"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 370 71 05</span></a></li>
                                            <li><a href="mailto:pr@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png" alt=""><span>pr@sat.ua</span></a>
                                            </li>
                                        </ul>
                                        <p>Дополнительные склад на приём и выдачу грузов в г. Киев</p>
                                        <p>Отделение №2: ул. Корабельная, 6<br>
                                            Отделение №3: ул. Якутская, 8 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel panel-default" data-id="5">
                            <div class="panel-heading col-sm-12" role="tab">
                                <h4 class="panel-title">
                                    <a role="button" class="panel-button" data-toggle="collapse"
                                       data-parent="#contacts-accordion" aria-expanded="false">
                                        <span>КОМПАНІЯ<br>ПОСТАЧАЛЬНИК</span>
                                    </a>
                                </h4>
                            </div>
                            <div class="panel-collapse collapse" role="tabpanel">
                                <div class="panel-body">
                                    <div class="content-body-item">
                                        <p>Бориспіль<br>
                                            вул. Артема, 5</p>
                                        <ul>
                                            <li><a href="tel:044 490 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>044 490 99 09</span></a></li>
                                            <li><a href="tel:067 555 11 33"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 555 11 33</span></a></li>
                                            <li><a href="tel:050 487 2 487"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>050 487 2 487</span></a></li>
                                            <li><a href="tel:0 800 30 99 09"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                  alt=""><span>0 800 30 99 09</span></a></li>
                                            <li><a href="mailto:info@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png"
                                                                                  alt=""><span>info@sat.ua</span></a></li>
                                        </ul>
                                    </div>
                                    <div class="content-body-item">
                                        <p>Відділ по зв’язкам із прессою:<br>
                                            За всіма питаннями звертайтесь, будь-ласка до Ірини Миханік</p>
                                        <ul>
                                            <li><a href="tel:067 370 71 05"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/phone.png"
                                                                                 alt=""><span>067 370 71 05</span></a></li>
                                            <li><a href="mailto:pr@sat.ua"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/letter.png" alt=""><span>pr@sat.ua</span></a>
                                            </li>
                                        </ul>
                                        <p>Дополнительные склад на приём и выдачу грузов в г. Киев</p>
                                        <p>Отделение №2: ул. Корабельная, 6<br>
                                            Отделение №3: ул. Якутская, 8 </p>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                    </div>

            </div>
        </div>

    </div>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
