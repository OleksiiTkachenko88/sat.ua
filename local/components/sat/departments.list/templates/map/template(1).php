<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<script>
	var offices = <?=json_encode($arResult["DEPARTMENTS_LIST"]);?>;
	var map_lang = <?=json_encode($arResult["MAIN_LANG"]);?>;
	var active_rsp = <?=json_encode($arResult["ACTIVE_RSP"]);?>;

if (window.innerWidth > 1024) {
	var image = '<?=SITE_TEMPLATE_PATH?>/img/marker.png';
} else {
	var image = '<?=SITE_TEMPLATE_PATH?>/img/marker-small.png';
}
var markerClusterer = null;
var map = null;
var markers;
var newBoundary;

var activeMarker;

function openWindowActive(map, mark) {
		mark.infowindow.open(map, mark);
		setTimeout(function(){$('.gm-style-iw').parent().addClass('custom-iw');}, 500);
}

function refreshMap() {

	markers = [];

	for(var item in offices) {
		var number = offices[item].PROPERTY_NUMBER_VALUE;
		var wednesday = offices[item].PROPERTY_SCHEDULE_WEDNESDAY_VALUE;
		var saturday = offices[item].PROPERTY_SCHEDULE_SATURDAY_VALUE;
		var phone = offices[item].PROPERTY_PHONE_VALUE;
		var latitude = parseFloat(offices[item].PROPERTY_LATITUDE_VALUE);
		var longitude = parseFloat(offices[item].PROPERTY_LONGITUDE_VALUE);
		var code = offices[item].CODE;
		var id = offices[item].ID;
		var townUrl = offices[item].TOWN_URL;
		const typeCODTitle = offices[item].typeCODTitle;
		const typeCODUrl = offices[item].typeCODUrl;
		var urlToMap = "https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=" + latitude + "," + longitude;

    const typeCODElement = !typeCODTitle ? '' :
      `
        <p>
          <a
            style="font-weight: bold;"
            href="${typeCODUrl}">${typeCODTitle}
          </a>
        </p>
      `;

    if(map_lang == "UK") {
			var description = offices[item].PROPERTY_DESCRIPTION_UK_VALUE;
			var address = offices[item].PROPERTY_ADDRES_UK_VALUE;

      var contentString =
        `<div class="department-info">
          <ul>
            <li style="font-size: 14px;">${number}&nbsp;&nbsp;${description}</li>
            <li>${address}</li>
            <li style="padding-right: 10px;">${phone}</li>
            <li><a href="${townUrl}">Відділення міста</a></li>
            <li><a href="${urlToMap}" target="_blank" rel="nofollow">Маршрут</a></li>
          </ul>
          <ul>
            <li><span>Будні дні: </span>${wednesday}</li>
            <li><span>Субота: </span>${saturday}</li>
          </ul>
          ${typeCODElement}
        </div>`;
		} else {
			var description = offices[item].NAME;
			var address = offices[item].PROPERTY_ADDRES_VALUE;
      var contentString =
        `<div class="department-info">
          <ul>
            <li style="font-size: 14px;">${number}&nbsp;&nbsp;${description}</li>
            <li>${address}</li>
            <li style="padding-right: 10px;">${phone}</li>
            <li><a href="${townUrl}">Отделения города</a></li>
            <li><a href="${urlToMap}" target="_blank" rel="nofollow">Маршрут</a></li>
          </ul>
          <ul>
            <li><span>Будние дни: </span>${wednesday}</li>
            <li><span>Суббота: </span>${saturday}</li>
          </ul>
          ${typeCODElement}
        </div>`;
		}

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 200,
			pixelOffset: new google.maps.Size(150,195)
		});

		var marker = new google.maps.Marker({
			position: {lat: latitude, lng: longitude},
			map: map,
			icon: image,
			title: description,
			store_id: number,
			infowindow: infowindow,
			customInfo: {"code": code, "id": id}
		});

		markers.push(marker);

		google.maps.event.addListener(marker, 'click', function () {
				map.panTo(this.position);
				openWindow(map,this);
		});


		if(marker.customInfo.code == active_rsp || marker.customInfo.id == active_rsp) {
			//map.panTo(marker.position);
			//openWindowActive(map, marker);
				activeMarker = marker;

		}

	}

	newBoundary = new google.maps.LatLngBounds();

	for (index in markers) {
		var position = markers[index].position;
		newBoundary.extend(position);
		if($("html").hasClass('bx-ie')) {
			map.fitBounds(newBoundary); //add fo ie 15022018
			markerClusterer = new MarkerClusterer(map, markers, {imagePath: '<?=SITE_TEMPLATE_PATH?>/images/m'});  //add for ie 15022018
		}
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
	map = new google.maps.Map(document.getElementById('mapFull'), opt);
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

		if(typeof(activeMarker) == "object") {
			map.setZoom(11);
			latlng = activeMarker.position;
			openWindowActive(map, activeMarker);
		} else {
			latlng = map.getCenter();
		}
	}

	google.maps.event.addDomListenerOnce(map, 'idle', function() {
		calculateCenter();
		if (window.innerWidth > 767) {
			map.setCenterWithOffset(latlng, 0, -50);
		} else {
			map.setCenterWithOffset(latlng, 0, 0);
		}
	});

	map.addListener('zoom_changed', function() {

		if (openwindow) {
			openwindow.close();
		}
	});
}

</script>
