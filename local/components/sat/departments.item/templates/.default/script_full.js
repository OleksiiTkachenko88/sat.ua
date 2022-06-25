function initMainPageMap() {
var map;
var image = BX.message('image');
var obj = BX.message('element');
var position = {lat: parseFloat(obj.COORD.LATITUDE), lng: parseFloat(obj.COORD.LONGITUDE)};
if(obj.SHEDULE.WEEKDAYS == undefined){
	var shedule = 	'<li><span>' + BX.message('monday') + '</span>' + obj.SHEDULE.MONDAY + '</li>' + 
					'<li><span>' + BX.message('tuesday') + '</span>' + obj.SHEDULE.TUESDAY + '</li>' + 
					'<li><span>' + BX.message('wednesday') + '</span>' + obj.SHEDULE.WEDNESDAY + '</li>' + 
					'<li><span>' + BX.message('thursday') + '</span>' + obj.SHEDULE.THURSDAY + '</li>' + 
					'<li><span>' + BX.message('friday') + '</span>' + obj.SHEDULE.FRIDAY + '</li>' + 
					'<li><span>' + BX.message('saturday') + '</span>' + obj.SHEDULE.SATURDAY + '</li>';
}
else
{
	var shedule = 	'<li><span>' + BX.message('weekdays') + '</span>' + obj.SHEDULE.WEEKDAYS + '</li>' + 
					'<li><span>' + BX.message('saturday') + '</span>' + obj.SHEDULE.SATURDAY + '</li>'; 
}
var opt = {
	center: position,
	zoom: 13,
	scrollwheel: false,
	clickableIcons: false,
	streetViewControl: false, 
	disableDefaultUI: true,
	draggable: false,
	disableDoubleClickZoom: true
};

	map = new google.maps.Map(document.getElementById('map'), opt);
	var contentString = '<span class="number">' + obj.NUMBER + '</span>'+ 
						'<span class="name">' + obj.NAME + '</span>' +
						'<div class="table">'+
							'<ul>'+
							'<li>' + obj.ADDRESS + '</li>' + 
								'<li>' + obj.PHONE + '</li>' + 
								'<li>' + obj.EMAIL + '</li>'+
							'</ul>' +
							'<ul>' + shedule + '</ul>'+
						'</div>';



	var marker = new google.maps.Marker({
		position: {lat: parseFloat(obj.COORD.LATITUDE), lng: parseFloat(obj.COORD.LONGITUDE)},
		map: map,
		icon: image,
		title: obj.NAME,
		store_id: obj.NUMBER,
	});

	google.maps.event.addListener(marker, 'click', function () {
		$( '#department-content' ).addClass("active").html( contentString );
	});
}


$(function() {
	$( document ).on('click', '#department-content', function() {
		$(this).removeClass("active");
	});
});