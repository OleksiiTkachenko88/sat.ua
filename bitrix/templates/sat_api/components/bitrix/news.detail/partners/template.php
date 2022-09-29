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
<?
$offices = array();
if($arResult["PROPERTIES"]["PRIORITY_CITIES"]["VALUE"]):
	foreach($arResult["PROPERTIES"]["PRIORITY_CITIES"]["VALUE"] as $key=>$value) {
		$description = $arResult["PROPERTIES"]["PRIORITY_CITIES"]["DESCRIPTION"][$key];
		$coord = explode(", ", $value);
		$latitude = $coord[0];
		$longitude = $coord[1];
		$offices[] =  array("description"	=> $description,
							"latitude"		=> floatval($latitude),
							"longitude"		=> floatval($longitude)
					);
	}

$offices = json_encode($offices);
?>
 <script>
        var offices = <?=$offices?>;


    </script>

<div class="map-partners" id="mapPartners" style></div>

    <script>

        if (window.innerWidth > 1024) {
            var image = '<?=SITE_TEMPLATE_PATH?>/img/marker.png';
        } else {
            var image = '<?=SITE_TEMPLATE_PATH?>/img/marker-small.png';
        }
        var markerClusterer = null;
        var map = null;
        var markers;
        var newBoundary;


        function refreshMap() {

            markers = [];

            for (var i = 0; i < offices.length; i++) {
				var contentString = '<div class="department-info" style="height:170px;"><ul>' + '<li style="font-size: 14px; list-style-type: none;">' + offices[i].description + '</li>' + '</ul></div>';
                var marker = new google.maps.Marker({
                    position: {lat: offices[i].latitude, lng: offices[i].longitude},
                    map: map,
                    icon: image,
                    title: offices[i].description,
                });
                markers.push(marker);


                google.maps.event.addListener(marker, 'click', function () {

                    map.panTo(this.position);
                    openWindow(map,this);

                });
            }
            newBoundary = new google.maps.LatLngBounds();

            for (index in markers) {
                var position = markers[index].position;
                newBoundary.extend(position);
            }

            map.fitBounds(newBoundary);

            markerClusterer = new MarkerClusterer(map, markers, {imagePath: '<?=SITE_TEMPLATE_PATH?>/images/m'});
            google.maps.event.addListener(markerClusterer, 'clusterclick', function(cluster) {
                if (openwindow) {
                    openwindow.close();
                }
            });
        }


        function initMap() {
            if (window.innerWidth > 767) {
               var opt = {
                    minZoom: 5,
                    maxZoom: 20,
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
                    minZoom: 5,
                    maxZoom: 20,
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

            var panoramaOptions = {
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
            map = new google.maps.Map(document.getElementById('mapPartners'), opt);
            map.getStreetView().setOptions(panoramaOptions);

            refreshMap();

            google.maps.Map.prototype.setCenterWithOffset = function(latlng, offsetX, offsetY) {
                var map = this;
                var ov = new google.maps.OverlayView();
                ov.onAdd = function() {
                    var proj = this.getProjection();
                    var aPoint = proj.fromLatLngToContainerPixel(latlng);
                    aPoint.x = aPoint.x+offsetX;
                    aPoint.y = aPoint.y+offsetY;
                    map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
                };
                ov.draw = function() {};
                ov.setMap(this);
            };
            var latlng;
            function calculateCenter() {
                latlng = map.getCenter()
            }
            google.maps.event.addDomListenerOnce(map, 'idle', function() {
                calculateCenter();

                if (window.innerWidth > 767) {
                    map.setCenterWithOffset(latlng, 0, -50);
                }
            });

            map.addListener('zoom_changed', function() {

                if (openwindow) {
                    openwindow.close();
                }
            });


        }


    </script>
<?endif;?>


<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arResult["DETAIL_PICTURE"])):?>
<img src="<?=$arResult["DETAIL_PICTURE"]["SRC"]?>" alt="<?echo $arResult["NAME"];?>">
<?endif?>
<div class="breadcrumbs">
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<a itemprop="url" href="<?echo SITE_DIR;?>"> 
			<span itemprop="title"><?=getMessage("MAIN_PAGE");?></span> </a>| 
	</span>
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<a itemprop="url" href="<?echo $arResult["LIST_PAGE_URL"];?>">
			<span itemprop="title"> <?echo $arResult["IBLOCK"]["NAME"];?> </span> </a>| 
	</span>
	<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
		<span itemprop="title"><?echo $arResult["NAME"];?></span> 
	</span>
</div>
<?if($arParams["DISPLAY_DATE"]!="N" && $arResult["TIMESTAMP_X"]):?>
                        <div class="date"><?=$arResult["TIMESTAMP_X"]?></div>
<?endif?>
<?if($arParams["DISPLAY_NAME"]!="N" && $arResult["NAME"]):?>
<h1><?=$arResult["NAME"]?></h1>

<?endif?>
                        <div class="content-text">
							<?echo $arResult["DETAIL_TEXT"];?>
						</div>
						<a class="link-more show-full-text"><?=getMessage("READ_ALL");?></a>
<?if (isset($arResult["DISPLAY_PROPERTIES"]["DEPARTMENT_MAP"]["FILE_VALUE"]["SRC"]) && !empty($arResult["DISPLAY_PROPERTIES"]["DEPARTMENT_MAP"]["FILE_VALUE"]["SRC"])) {?>
<img src="<?=$arResult["DISPLAY_PROPERTIES"]["DEPARTMENT_MAP"]["FILE_VALUE"]["SRC"]?>" alt="">
<?
}
?>
	<?
	if(array_key_exists("USE_SHARE", $arParams) && $arParams["USE_SHARE"] == "Y")
	{
		?>
		<div class="news-detail-share">
			<noindex>
			<?
			$APPLICATION->IncludeComponent("bitrix:main.share", "", array(
					"HANDLERS" => $arParams["SHARE_HANDLERS"],
					"PAGE_URL" => $arResult["~DETAIL_PAGE_URL"],
					"PAGE_TITLE" => $arResult["~NAME"],
					"SHORTEN_URL_LOGIN" => $arParams["SHARE_SHORTEN_URL_LOGIN"],
					"SHORTEN_URL_KEY" => $arParams["SHARE_SHORTEN_URL_KEY"],
					"HIDE" => $arParams["SHARE_HIDE"],
				),
				$component,
				array("HIDE_ICONS" => "Y")
			);
			?>
			</noindex>
		</div>
		<?
	}
	?>
