Number.prototype.noExponents = function() {
  var data = String(this).split(/[eE]/);
  if (data.length == 1) return data[0];

  var z = '',
    sign = this < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
}


function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
var openwindow;
function openWindow(map, mark) {
    if (openwindow) {
        openwindow.close();
    }
    openwindow = mark.infowindow;
    openwindow.open(map, mark);

    findAncestor(document.getElementsByClassName('department-info')[0], 'gm-style-iw').parentElement.className += 'custom-iw';

}

function blockHeaders() {

    $('.border-block').each(function () {
        var wrapW = $(this).find('.header').width() - 10,
            imgW = $(this).find('.header .img-wrap').outerWidth();
        $(this).find('.header span').css('width', (wrapW - imgW) + 'px');
    });

}

function CutText() {
    $('.cut-text').each(function () {

        var text = $(this).text().replace(/\s+/g, ' ');

        $(this).html(text);


    });
    $(".cut-text").dotdotdot({
        watch: "window"
    });

}

function customGrid() {
    var windW = $(window).width();
    if (windW < 992) {
        $('.custom-grid').addClass('col-xs-12 col-sm-6 bottom-column');
        $('.custom-container').removeClass('right-column');
        $('.custom-row').addClass('row');
    } else {
        $('.custom-grid').removeClass('col-xs-12 col-sm-6 bottom-column');
        $('.custom-container').addClass('right-column');
        $('.custom-row').removeClass('row');
    }
}

function deviceContacts() {
    // console.log('deviceContacts');
    var windW = $(window).width(),
        windH = $(window).height();
    if ((windW < 992 && windH < 768) || (windW < 768 && windH < 992)) {
        $('.contacts-tabs').css('display', 'none');
        $('.contacts-accordion-wrap').css('display', 'block');
        var indPanel = 1;
        $('.contacts-accordion-wrap .panel').each(function () {
            var ident = $(this).attr('data-id');
            $(this).find('.panel-heading').attr('id', 'contact' + ident + '_' + indPanel);
            $(this).find('.panel-button').attr('href', '#collapse' + ident + '_' + indPanel);
            $(this).find('.panel-button').attr('aria-controls', 'collapse' + ident + '_' + indPanel);
            $(this).find('.panel-collapse').attr('id', 'collapse' + ident + '_' + indPanel);
            $(this).find('.panel-collapse').attr('aria-labelledby', 'contact' + ident + '_' + indPanel);
            indPanel += 1;
        });

        $('.panel-collapse').on('show.bs.collapse', function () {
            var centerPoint = $(this).closest('.panel').attr('data-id');
            $('.tab-link[name="' + centerPoint + '"]').trigger('click');
        });
    } else {
        $('.contacts-tabs').css('display', 'block');
        $('.contacts-accordion-wrap').css('display', 'none');

    }
}
Number.prototype.toDigits = function() {
     var str = this.toString(), tmp = '', i, d,
     x = str.match(/^(\d+)\.(\d+)[eE]([-+]?)(\d+)$/);
     if(x) {
         d = x[2];
         i = (x[3] == '-') ? x[4]-1 : x[4]-d.length;
         while(i--) {
             tmp += '0';
         }
         if(x[3] == '-') {
             return '0.'+tmp+x[1]+d;
         }
         return x[1]+d+tmp;
     }
    return str;
 };
function initMapDepartments(ident) {
    // console.log('initMapDepartments');
    objChange = offices.filter(function (obj) {
        return obj.number == ident;
    })[0];
    if (window.innerWidth > 767) {
        opt = {
            minZoom: 5,
            maxZoom: 20,
            zoom: 18,
            center: {lat: objChange.latitude, lng: objChange.longitude},
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
            }
        };
    } else {
        opt = {
            minZoom: 5,
            maxZoom: 20,
            zoom: 18,
            center: {lat: objChange.latitude, lng: objChange.longitude},
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

    map = new google.maps.Map(document.getElementById('map'), opt);

    map.getStreetView().setOptions(panoramaOptions);


    contentString = '<div class="department-info" style="height:170px;"><ul>' + '<li style="font-size: 14px;">' + objChange.number + '&nbsp;&nbsp;' + objChange.description + '</li>' +
        '<li>' + objChange.address + '</li>' + '<li style="padding-right: 10px;">' + objChange.phone + '</li></ul>' +
        '<ul>' + '<li><span>Будні дні: </span>' + objChange.schedule.wednesday + '</li>' + '<li><span>Суббота: </span>' + objChange.schedule.saturday + '</li>' + '</ul></div>';
    infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
        pixelOffset: new google.maps.Size(150, 195)
    });
    marker = new google.maps.Marker({
        position: {lat: objChange.latitude, lng: objChange.longitude},
        map: map,
        icon: image,
        title: objChange.description,
        store_id: objChange.number,
        infowindow: infowindow
    });

    google.maps.event.addListener(marker, 'click', function () {
        openWindow(map, marker);
    });

    // console.log('Geocoder');
            var geocoder = new google.maps.Geocoder();
            google.maps.event.addListener(map, 'click', function(e) {
                console.log(e);
                geocoder.geocode({
                    'latLng': e.latLng
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            console.log(results[0]);
                            console.log(results[0].formatted_address);
                        }
                    }
                });
            });

}

function mapRefresh(ident) {
    // console.log('mapRefresh');
    objChange = offices.filter(function (obj) {
        return obj.number == ident;
    })[0];
    marker.setMap(null);
    map.setCenter({lat: objChange.latitude, lng: objChange.longitude});
    map.setZoom(18);
    contentString = '<div class="department-info" style="height:170px;"><ul>' + '<li style="font-size: 14px;">' + objChange.number + '&nbsp;&nbsp;' + objChange.description + '</li>' +
        '<li>' + objChange.address + '</li>' + '<li style="padding-right: 10px;">' + objChange.phone + '</li></ul>' +
        '<ul>' + '<li><span>Будні дні: </span>' + objChange.schedule.wednesday + '</li>' + '<li><span>Суббота: </span>' + objChange.schedule.saturday + '</li>' + '</ul></div>';
    infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
        pixelOffset: new google.maps.Size(150, 195)
    });
    marker = new google.maps.Marker({
        position: {lat: objChange.latitude, lng: objChange.longitude},
        map: map,
        icon: image,
        title: objChange.description,
        store_id: objChange.number,
        infowindow: infowindow
    });

    google.maps.event.addListener(marker, 'click', function () {
        openWindow(map, marker);
    });

            

}
function attrDepartments() {
    // console.log('beforeACH');

    var indPanel = 1;
    $('.departments-table .panel').each(function () {
        var ident = $(this).attr('data-id');
        $(this).find('.panel-heading').attr('id', 'department' + ident + '_' + indPanel);
        $(this).find('.panel-button').attr('href', '#collapse' + ident + '_' + indPanel);
        $(this).find('.panel-button').attr('aria-controls', 'collapse' + ident + '_' + indPanel);
        $(this).find('.panel-collapse').attr('id', 'collapse' + ident + '_' + indPanel);
        $(this).find('.panel-collapse').attr('aria-labelledby', 'department' + ident + '_' + indPanel);
        $(this).find('.panel-collapse .map-in-list').attr('id', ident);
        indPanel += 1;
    });

    // console.log('beforecollapse');
    $('.departments-table .panel-collapse').on('show.bs.collapse', function () {
        // console.log('collapse');
        var centerPoint = $(this).closest('.panel').attr('data-id');
        // $('#office-center').val(centerPoint).trigger('click');
        if (document.getElementById("map")) {
            if ($('#map').parent('div').attr('id') !== centerPoint) {
                var old_element = $("#map").parent('div');
                var new_element = $("#map");

                $('#' + centerPoint).html(new_element);
                old_element.empty();

            }

            mapRefresh(centerPoint);
            var center = map.getCenter();

            google.maps.event.addDomListenerOnce(map, 'idle', function () {
                // console.log('idle');
                google.maps.event.trigger(map, 'resize');
                map.setCenter(center);
            });

            


        } else {
            $('#' + centerPoint).html(mapMarkup);
            initMapDepartments(centerPoint);
        }
    });


}
function valueDirections(id, pos) {
    // console.log('valueDirections');

    $(document).ready(function () {
        var objDir = offices.filter(function (obj) {
            return obj.number == id;
        })[0];
        var value = objDir.description;
        $('.direction-field.active').val(value).trigger('change');
		$('.direction-field.active').next('input').next('input').val(objDir.ref).trigger('change');
		$('.direction-field.active').next('input').next('input').next('input').val('');
		$('.direction-field.active').next('input').next('input').next('input').next('input').val('');
        $('.direction-field.active').next('input').val(id).trigger('change');
        if (!($('#fromDir-id').val() && $('#toDir-id').val())) {
            map.panTo(pos);
        }

    });
}


(function () {
    var
        form,
        a4 = [595.28, 841.89]; // for a4 size paper width and height

    $('#create_pdf').on('click', function () {

        $('body').scrollTop(0);
        $('section').css('overflow', 'visible');
        $('.declaration').addClass('pdf-form');
        form = $('.pdf-form');

        createPDF();
    });
    //create pdf
    function createPDF() {
        getCanvas().then(function (canvas) {
            var
                img = canvas.toDataURL("image/png"),
                doc = new jsPDF({
                    unit: 'px',
                    format: 'a4'
                });
            doc.addImage(img, 'JPEG', 20, 20);
            doc.save('declaration-pdf.pdf');
            form.css('width', '100%').css('height', 'auto');
            $('.declaration').removeClass('pdf-form');
        });
    }

    // create canvas object
    function getCanvas() {
        form.width((a4[0] * 1.33333) - 80).height((a4[1] * 1.33333) - 80).css('max-width', 'none').css('max-height', 'none');
        return html2canvas(form, {
            imageTimeout: 2000,
            removeContainer: true
        });
    }

}());


function hideGruz(){
    $('.hidden-gruz').show();
    // $('.gruz-info').hide();
    $('[name="volume"]').val(0).closest('.main-info-row').show();
    $('#length-range-value').val(0);
    $('#width-range-value').val(0);
    $('#height-range-value').val(0);
}

function check_office(othis, type, ref){
	var result_offices = [];
	var has_offices;
    for (var i = 0; i < offices.length; i++) {

        if(ref){
            if( offices[i].ref == othis.val() ){
                $('#'+type+'Address').text(offices[i].address);

            }
        } else {
            if( offices[i].cityRef == othis.val() ){
				result_offices.push(offices[i]);
                $('#'+type+'Address').text(result_offices[0].address);
			}
        }
	};


}


$(document).ready(function () {

    $('#fromDir-ref').change(function(){
        check_office($(this), 'from', 1);
    });

    $('#fromDir-cityref').change(function(){
    console.log('change');
        check_office($(this), 'from', 0);
    });

    $('#toDir-ref').change(function(){
    console.log('change ref');
        check_office($(this), 'to', 1);
    });

    $('#toDir-cityref').change(function(){
    console.log('chang to city');
        check_office($(this), 'to', 0);
    });

    $('#fromDir, #toDir').change(function(){
        if( $(this).val()=='' ){
            $(this).nextAll('input').val('');
        }
    });

    $(document).on("DOMSubtreeModified", '.type-block .jq-selectbox__select-text', function(){
        var type = $('.type-block li.selected').data('type');
        $('[name="totalweight"]').val(0).closest('.main-info-row').hide();
        $('[name="volume"]').val(0).removeAttr('disabled').closest('.main-info-row').show();

        if(type=='type_1'){
            $('[name="weight"]').val(1).attr('disabled', 'disabled');
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').hide();
            hideGruz();
        } else if(type=='type_3'){
            $('[name="weight"]').val(5).removeAttr('disabled').attr({'min': '1', 'max': '9.9'});
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').hide();
            hideGruz();
            $(document).on('change', '[name="weight"]', function(){
                var w = parseInt( $(this).val() );
                $('.subtype-block li.hidden-fields').removeClass('sel selected');
                $('.subtype-block li.'+type).each(function(){
                    if( w >parseInt($(this).data('min')) && w< parseInt($(this).data('max')) ){
                        $(this).addClass('sel selected');
                        $('.subtype-block .jq-selectbox__select-text').text($(this).text());
                    }
                });
            });
        } else  if(type=='type_2'){
            $('[name="weight"]').val(10).removeAttr('disabled').attr({'min': '10', 'max': ''});
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').hide();
            $('.hidden-gruz').hide();
            $('[name="volume"]').attr({'min': '0', 'max': ''});
        } else if(type=='type_4'){
            $('[name="weight"]').val(4).removeAttr('disabled').attr({'min': '4', 'max': '20'});
            $('[name="seatsAmount"]').val(1).attr({'min': '1', 'max': ''}).closest('.main-info-row').show();
            hideGruz();
            $('[name="volume"]').val(0).closest('.main-info-row').hide();
            $('[name="totalweight"]').val(20).closest('.main-info-row').show();
        } else if(type=='type_5'){
            $('[name="weight"]').val(20).removeAttr('disabled').attr({'min': '20', 'max': ''});
            $('[name="seatsAmount"]').val(1).attr({'min': '1', 'max': ''}).closest('.main-info-row').show();
            hideGruz();
            $('[name="volume"]').val(0).closest('.main-info-row').hide();
            $('[name="totalweight"]').val(20).closest('.main-info-row').show();
        }

        $('[name="declaredCost"]').val(300).attr({'min': '300', 'max': '50000'});
        $('.subtype-block li.hidden-fields').hide().removeClass('sel selected');
        $('.subtype-block li.'+type+':last').addClass('sel selected');
        $('.subtype-block .jq-selectbox__select-text').text( $('.subtype-block li.'+type+':last').text() );
        $('.subtype-block li.'+type).show();
        if( $('.subtype-block li.'+type).length<2 || type=='type_3' ){
            $('.subtype-block').parent().hide();
        } else {
            $('.subtype-block').parent().show();

        }
    });

    $('[name="weight"], [name="seatsAmount"]').change(function(){
        $('[name="totalweight"]').val( $('[name="weight"]').val()*$('[name="seatsAmount"]').val() );
    });

    $('[type="number"]').change(function(){
        var v = parseInt($(this).val());
        var min = parseInt($(this).attr('min'));
        var max = parseInt($(this).attr('max'));
        if( v<min ){
            $(this).val(min);
        }
        if( v>max ){
            $(this).val(max);
        }
    });

    $('#volume').change(function(){
        $('#length-range-value').val(0);
        $('#width-range-value').val(0);
        $('#height-range-value').val(0);
    });


    if (!device.mobile()) {
        $('select').styler();
    }
    deviceContacts();
    attrDepartments();


    $('.calculate-section .calc-submit').on('click', function (e) {
        e.preventDefault();

        $.event.trigger("submit-to-calc");

    });


    $('.calculate-section .sender-submit').on('click', function (e) {
        e.preventDefault();

        $.event.trigger("submit-to-calc-sender");

    });

    $('.calculate-section .departure-order').on('click', function (e) {
        e.preventDefault();

        $.event.trigger("submit-to-departure-order");

    });

    $('.calculate-section .delivery-calc').on('click', function (e) {
        e.preventDefault();

        $.event.trigger("submit-to-calc-delivery");

    });

    $('.calculate-section .delivery-submit').on('click', function (e) {
        e.preventDefault();

        $.event.trigger("submit-to-send-delivery");

    });

    $('.calculate-section .find-track-number').on('click', function (e) {
        e.preventDefault();

        $.event.trigger("find-track");

    });


    $(window).scroll(function () {

        var top = $(document).scrollTop(),
            pointPanel = (($(document).height() - $(window).height()) / 2) - ($('.right-panel').height() / 2);
        var windW = $(window).width();

        if (windW > 767) {
            if (top > 40) {
                $('header').css({
                    top: '0px',
                    left: '0px',
                    position: 'fixed'
                });
                $('header').addClass('fixed');

            } else {
                $('header').css({
                    top: 40 + 'px',
                    left: '0px',
                    position: 'absolute'
                });
                $('header').removeClass('fixed');
            }

        }
        if ($('.departments-table-header').length) {


            if ((top >= tableTop) && ( top < paginOffset )) {
                $('.departments-table-header').addClass('fixed');
                $('.departments-table-header').css('top', headerH + 'px');
                $('.departments-table').css('margin-top', tableHeaderH + 'px');

            } else {
                $('.departments-table-header').removeClass('fixed');
                $('.departments-table-header').css('top', 'auto');
                $('.departments-table').css('margin-top', '0px');
            }
        }


    });
    var headerH, tableHeaderH, tableTop, paginOffset;
    if ($('.departments-table-header').length) {
        if ($(window).width() > 767) {
            headerH = $('header').height();
            tableTop = ($('.departments-list-page').css('padding-top').replace('px', '') * 1) + $('.department-panel').outerHeight() - headerH;
            paginOffset = $('.news-pagination').offset().top  - ($('.news-pagination').css('margin-top').replace('px', '') * 1) - $('header').outerHeight() - $('.departments-table-header').outerHeight()/2;
        }else{
            headerH = $('header').height();
            tableTop = ($('.departments-list-page').css('padding-top').replace('px', '') * 1) + $('.department-panel').outerHeight();
            paginOffset = $('.news-pagination').offset().top  - ($('.news-pagination').css('margin-top').replace('px', '') * 1) - $('header').height() - $('.departments-table-header').outerHeight() + 30;
        }

        tableHeaderH = $('.departments-table-header').outerHeight();

    }


    $(window).resize(function () {
        setTimeout( function() {
            if ($('.departments-table-header').length) {
                tableHeaderH = $('.departments-table-header').outerHeight();
                if ($(window).width() > 767) {
                    headerH = $('header').height();
                    tableTop = ($('.departments-list-page').css('padding-top').replace('px', '') * 1) + $('.department-panel').outerHeight() - headerH;
                    paginOffset = $('.news-pagination').offset().top  - ($('.news-pagination').css('margin-top').replace('px', '') * 1) - $('header').outerHeight() - $('.departments-table-header').outerHeight()/2;
                }else{
                    headerH = $('header').height();
                    tableTop = ($('.departments-list-page').css('padding-top').replace('px', '') * 1) + $('.department-panel').outerHeight();
                    paginOffset = $('.news-pagination').offset().top  - ($('.news-pagination').css('margin-top').replace('px', '') * 1) - $('header').height() - $('.departments-table-header').outerHeight() + 30;
                }
                if ($('.departments-table-header').hasClass('fixed')) {
                    $('.departments-table-header').css('top', headerH + 'px');
                    $('.departments-table').css('margin-top', tableHeaderH + 'px');
                }
            }
        } , 500);



    });

    $('.right-panel .panel-tooltip').each(function(){
        var text = $(this).text();
        $(this).html('<span>' + text + '</span>');
    });

    if ($(window).width() < 992) {
      var wN = $(window).width() - 103 - 285;
      $('header nav').css('min-width',wN + 'px');
      $(window).resize(function () {
          if ($(window).width() < 992) {
              var wN = $(window).width() - 103 - 285;
              $('header nav').css('min-width', wN + 'px');
          }else{
              $('header nav').css('min-width', 1 + 'px');
          }
      });
    }


    function SliderAttr() {
        var ind = 1,
            indControl = 1;
        $('.flexslider .item').each(function () {
            $(this).attr('data-number', ind);
            ind += 1;
        });
        $('.flex-control-nav a').each(function () {
            $(this).attr('data-number', indControl);
            indControl += 1;
        });

        var offerNumber = $('.flexslider .item[data-theme="offers"]').attr('data-number');

        $('.slider-offers').on('click', function () {
            $('.flex-control-nav a[data-number=' + offerNumber + ']').trigger('click');
        });
    }

    $(".home-slideshow").flexslider({
        animation: "slide",
        slideshow: true,
        controlNav: true,
        directionNav: true,
        pauseOnAction: false,
        pauseOnHover: true,
        animationLoop: true,
        animationSpeed: 1000,
        slideshowSpeed: 10000,
		touch: true, 
        start: SliderAttr
    });

    $(window).load(function () {
        blockHeaders();
    });

    CutText();

    $("body").on('click', '.toTop', function () {

        $('html, body').animate({
            scrollTop: 0
        }, 800);

        return false;

    });
    $(document).on('click touchend', function (event) {

        if (!$(event.target).closest(".order-form, .order-link, .search-button, .close-search, .order-pop-dropdown").length || !$(event.target).closest(".track-form, .track-link, .search-button, .close-search").length || !$(event.target).closest(".mobile-nav").length) {
            if (!$(event.target).closest(".order-form, .order-link, .search-button, .close-search, .order-pop-dropdown").length) {

                $(".order-form").addClass("hidden-block");
                $('.order-link').removeClass('active');
            }
            if (!$(event.target).closest(".track-form, .track-link, .search-button, .close-search").length) {
                $(".track-form").addClass("hidden-block");
                $('.track-link').removeClass('active');
            }
            if (!$(event.target).closest(".mobile-nav, .nav-mobile-button").length) {
                $('.mobile-nav').removeClass('open-nav');
                $('html').removeClass('open-nav-body');
            }

        } else {
            return;
        }
        event.stopPropagation();
    });
    $('.order-link').on('click', function () {

        $('.track-form').addClass('hidden-block');
        $('.track-link').removeClass('active');
        $(this).toggleClass('active');
        $('.order-form').toggleClass('hidden-block');
    });
    $('.track-link').on('click', function () {
        $('.order-form').addClass('hidden-block');
        $('.order-link').removeClass('active');
        $(this).toggleClass('active');
        $('.track-form').toggleClass('hidden-block');
    });
    $('.search-button').on('click', function () {

        $('.search-form').removeClass('hidden-block');
    });
    $('.close-search').on('click', function () {

        $('.search-form').addClass('hidden-block');
    });

    $('.nav-mobile-button').on('click touchend', function () {
        $('.mobile-nav').addClass('open-nav');
        $('html').addClass('open-nav-body');
    });
    $('.close-nav').on('click touchend', function () {

        $('.mobile-nav').removeClass('open-nav');
        $('html').removeClass('open-nav-body');
    });

    customGrid();


    var videoControls = $('.video-banner .hover-preview');


    if (videoControls.length) {

        videoControls.on('click', function (e) {
            e.preventDefault();
            var el = $(this);
            el.addClass('pause');

            el.closest('.video-banner').find('video')[0].play();
            el.closest('.video-banner').find('video')[0].onpause = function () {
                el.removeClass('pause');
            };
            el.closest('.video-banner').find('video')[0].onended = function () {
                el.removeClass('pause');
            };
            el.closest('.video-banner').find('video')[0].ontimeupdate = function () {
                el.addClass('pause');
            };
            el.closest('.video-banner').find('video')[0].onseeking = function () {
                el.addClass('pause');
            };

        });
    }


    $(".show-hide")
        .on('click', '.show-button', function () {

            $(this).addClass('hidden-button');
            $('.comments-wrap').slideDown(300);
            $(".hide-button").removeClass('hidden-button');
        }).on('click', '.hide-button', function () {
        $(this).addClass('hidden-button');
        $('.comments-wrap').slideUp(300);
        $(".show-button").removeClass('hidden-button');
    });


    $(".post-content")
        .on('click', '.show-full-text', function () {

            $(".post-content .show-full-text").text('Згорнути').removeClass('show-full-text').addClass('hide-full-text');

            $('.post-content .content-text').css({
                'max-height': '100%'
            });
        })
        .on('click', '.hide-full-text', function () {

            $(".post-content .hide-full-text").text('ЧИТАТИ ВСЕ').removeClass('hide-full-text').addClass('show-full-text');

            $('.post-content .content-text').css({
                'max-height': '432px'
            });
        });

    $(".track-wrap .tracking-table")
        .on('click', '.show-button', function () {

            $(this).addClass('hidden-button');
            $('.additional-information').slideDown(300);
            $(".hide-button").removeClass('hidden-button');
        }).on('click', '.hide-button', function () {
        $(this).addClass('hidden-button');
        $('.additional-information').slideUp(300);
        $(".show-button").removeClass('hidden-button');
    });

    $('.rate-block').raty({
        hints: ['1', '2', '3', '4', '5'],
        score: function () {
            return $(this).attr('data-score');
        }
    });

    $('.contacts-tabs .tab-link').on('click', function () {
        var ident = $(this).attr('data-tab');
        var center = $(this).attr('name');
        $('.contacts-tabs .tab-link').removeClass('active-tab');
        $(this).addClass('active-tab');
        $('.contacts-tabs .info-item').removeClass('active-info');
        $('.contacts-tabs .info-item').fadeOut(0);
        $('.contacts-tabs .info-item[data-tab="' + ident + '"]').fadeIn(300);
        $('#office-center').val(center).trigger('click');
    });

    $(window).resize(function () {
        customGrid();
        setTimeout(function () {
            blockHeaders();
        }, 800);


    });

    /***************Calculate page**************/

    if (!device.mobile()) {
        $('.calculate-wrapper .qty-wrap input, .calculate-wrapper .main-info-row input[type="text"]').on('focus', function () {
            $(this).attr('placeholder', '');
        }).on('blur', function () {
            $(this).attr('placeholder', '0');
        });
    } else {
        $('.calculate-wrapper .qty-wrap input, .calculate-wrapper .main-info-row input[type="text"],.calculate-wrapper .price-range-details input[type="text"]').on('focus', function () {
            $(this).attr('placeholder', '');
        }).on('blur', function () {
            $(this).attr('placeholder', '0');
        });
    }

    $('.delivery-tabs a').on('click', function () {
		if ($(this).hasClass('delivery-tab-deny')) {return false;}
        $(this).closest('.delivery-item').find('.delivery-tabs a').removeClass('active').addClass('noactive');
        $(this).removeClass('noactive').addClass('active');
        if ($(this).hasClass('show-time')) {
            $(this).closest('.delivery-item').find('.tariff,.time').fadeIn(300);
            $(this).closest('.delivery-item').find('select').trigger('refresh');
        } else {
            $(this).closest('.delivery-item').find('.tariff,.time').fadeOut(300);
        }
        $.event.trigger({type: "renew-tab-type"});
    });
    $(".parcel-options-info")
        .on('click', '.parcel-block-subtitle', function () {
            $(this).toggleClass('slide-up-title');
            $(this).closest('.options-info-item').find('.options-body').slideToggle(300);

        });
    $(document).on('click', '.options-row-item input[type="checkbox"]', function () {

        $(this).closest('.options-row-item').toggleClass('checked-option');
    });


    var todayObj = new Date();
    var ddObj = todayObj.getDate();
    var mmObj = todayObj.getMonth() + 1; //January is 0!
    var yyyyObj = todayObj.getFullYear();
    if (ddObj < 10) {
        ddObj = '0' + ddObj;
    }
    if (mmObj < 10) {
        mmObj = '0' + mmObj;
    }
    todayObj = ddObj + '.' + mmObj + '.' + yyyyObj;
    //var todayObjMob = yyyyObj + '-' + mmObj + '-' + ddObj;
    var todayObjMob = ddObj + '-' + mmObj + '-' + yyyyObj ; //This format i need for declaration

    if ($('.calculate-section').length) {
        $('#datepicker1').val(todayObj);
        $('.print-time').text(todayObj);
    	$('#datefield1').val(todayObjMob);

    }
	$.datetimepicker.setLocale(datepicker_lang);
    $('#datepicker1').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        weekStart: 1,
        scrollMonth: false,
        mask: true,
		minDate: todayObj,
        onSelect: function (selected) {
            console.log(selected);
        }
    }).attr('readonly','readonly').attr('data-min', todayObj );
    $('#datepicker2').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        weekStart: 1,
        scrollMonth: false,
        mask: true,
        minDate: todayObj,
        onSelect: function (selected) {
            console.log(selected);
        }
    }).attr('readonly','readonly').attr('data-min', todayObj );

    $('#datepicker1, #datepicker2').on('keydown', function(e){ 
        var v = $( "#datepicker1" ).val();
        e.preventDefault();
        $( "#datepicker1" ).val(v);
        return false; 
    } );


    $('.time-date-table .date').on('click', function () {
        if ($(window).width() > 767) {
            $(this).parent('.date').find('.pick-field[type="text"]').datetimepicker('show');
        } else {
            $(this).parent('.date').find('.pick-field[type="date"]').trigger('click');
        }

    });

    $('#datepicker1, #toDir, #fromDir').change(function(){
			// console.log('go to check-to-date');
			//var minDate = $( "#datepicker1" ).datetimepicker( "option", 'minDate' );
			var minDate = new Date( $( "#datepicker1" ).data( 'min' ) );
			var valDate = new Date( $( "#datepicker1" ).val() );
	
			// var minDate = $( "#datepicker1" ).minDate();
			// console.log(minDate);
			if( minDate > valDate ){
				// console.log('not bigger');
				$( "#datepicker1" ).val(minDate);
			}
			// console.log(options);
			$.event.trigger("check-to-date");
    });

    $(function () {
        var availableTags = [];
        /*for (var i = 0; i < offices.length; i++) {
            var tag = new Object();
            tag.value = offices[i].description;
            tag.label = offices[i].description;
            tag.id = offices[i].number;
            tag.ref = offices[i].ref;
            availableTags.push(tag);
        }*/
        $("#fromDir").autocomplete({
            source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getTown',
            //source: availableTags,
            minLength: 3,
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (e, ui) {
                $("#fromDir").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#fromDir").val(ui.item.value);
                $("#fromDir-id").val('');
                $("#fromDir-ref").val('');
                $("#fromDir-cityref").val(ui.item.id).trigger('change');
                $("#fromDir-cityrspref").val(ui.item.rspRef);
				$("#fromDir-delivery-tabs>li:eq(0)").find("a").removeClass("delivery-tab-deny");
                // $('#fromDir-delivery-tabs').find('a').removeClass('active');
                // $('#fromDir-delivery-tabs').find('a.show-time').addClass('active');
                // console.log($('#fromDir-delivery-tabs').find('a.show-time'));
				if (!ui.item.rspList || ui.item.rspList == '' || typeof(ui.item.rspList) == undefined) {
					$("#fromDir-delivery-tabs>li:eq(0)").find("a").addClass("delivery-tab-deny");
					$("#fromDir-delivery-tabs>li:eq(1)").find("a").trigger("click");
				} else {
					$("#fromDir-delivery-tabs>li:eq(0)").find("a").removeClass("delivery-tab-deny");
					$("#fromDir-delivery-tabs>li:eq(0)").find("a").trigger("click");
					if($("input[name='fromDir-sender']").val()=="true") {
						$("#fromDir-delivery-tabs>li:eq(0)").find("a").addClass("delivery-tab-deny");
						$("#fromDir-delivery-tabs>li:eq(1)").find("a").trigger("click");
					}
				}
				$.event.trigger("check-to-date");
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = {value: "", id: "", label: noResultInfo};
                    ui.content.push(noResult);
                }
            }
        });

        $("#toDir").autocomplete({
			source:'/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&rsp=' + $("#fromDelivery-cityref").val() + '&action=getTown',
            //source: availableTags,
            minLength: 3,
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (e, ui) {
                $("#toDir").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#toDir").val(ui.item.value);
                /*$("#toDir-id").val(ui.item.id);
                $("#toDir-ref").val(ui.item.ref);*/
                $("#toDir-id").val('');
                $("#toDir-ref").val('');
                $("#toDir-cityref").val(ui.item.id).trigger('change');
                $("#toDir-cityrspref").val(ui.item.rspRef).trigger('change');
				$("#toDir-delivery-tabs>li:eq(0)").find("a").removeClass("delivery-tab-deny");
                // console.log($('#toDir-delivery-tabs').find('a.show-time'));
                // $('#toDir-delivery-tabs').find('a').removeClass('active');
                // $('#toDir-delivery-tabs').find('a.show-time').addClass('active');
				if (!ui.item.rspList || ui.item.rspList == '' || typeof(ui.item.rspList) == undefined) {
					$("#toDir-delivery-tabs>li:eq(0)").find("a").addClass("delivery-tab-deny");
					$("#toDir-delivery-tabs>li:eq(1)").find("a").trigger("click");
				} else {
					$("#toDir-delivery-tabs>li:eq(0)").find("a").removeClass("delivery-tab-deny");
					$("#toDir-delivery-tabs>li:eq(0)").find("a").trigger("click");
				}
                $("#toDir-id").trigger('change');
				$.event.trigger("check-to-date");
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = {value: "", id: "", label: noResultInfo};
                    ui.content.push(noResult);
                }
            }
        });
    });

    /**************************Map calculation********************/
    $(".calculate-section .tracking-table")
        .on('click', '.show-button', function () {
            $(this).addClass('hidden-button');
            $('.map-hide-wrap').addClass('opened');
            $(".hide-button").removeClass('hidden-button');
            map.setOptions(optShow);
        }).on('click', '.hide-button', function () {
        $(this).addClass('hidden-button');
        $('.map-hide-wrap').removeClass('opened');
        $(".show-button").removeClass('hidden-button');
        map.setOptions(optHide);
        if (openwindow) {
            openwindow.close();
        }
    });

	/*******Map calculation of the new tracking page*******/
    $(".calculate-section .tracking-table")
        .on('click', '.show-map-button', function () {
            $(this).addClass('hidden-button');
            $('.map-hide-wrap').addClass('opened');
            $(".hide-map-button").removeClass('hidden-button');
			$(".department-panel").css("display", "none");
            map.setOptions(optShow);
        }).on('click', '.hide-map-button', function () {
        $(this).addClass('hidden-button');
        $('.map-hide-wrap').removeClass('opened');
        $(".show-map-button").removeClass('hidden-button');
			$(".department-panel").css("display", "");
        map.setOptions(optHide);
        if (openwindow) {
            openwindow.close();
        }
    });

    $('.direction-field').on('focus', function () {
        $('.direction-field').removeClass('active');
        $(this).addClass('active');
    });
    $('.direction-field').on('keyup', function (e) {
        if ($(this).val().length < 3) {
            $(this).next('input').val('').trigger('change');
        }
    });
    $('.toggle-dir').on('click', function () {
        var fromlabel = $('#fromDir').val();
        var tolabel = $('#toDir').val();
        // var fromdate = $('#datepicker1').val();
        // var todate = $('#datepicker2').val();
        var from = $('#fromDir-id').val();
        var to = $('#toDir-id').val();
        var fromref = $('#fromDir-ref').val();
        var toref = $('#toDir-ref').val();
        var fromcityref = $('#fromDir-cityref').val();
        var tocityref = $('#toDir-cityref').val();
        var fromcityrspref = $('#fromDir-cityrspref').val();
        var tocityrspref = $('#toDir-cityrspref').val();
        $('#fromDir').val(tolabel);
        $('#toDir').val(fromlabel);
        $('#fromDir-ref').val(toref).trigger('change');
        $('#toDir-ref').val(fromref).trigger('change');
        $('#fromDir-cityref').val(tocityref).trigger('change');
        $('#toDir-cityref').val(fromcityref).trigger('change');
        $('#fromDir-cityrspref').val(tocityrspref);
        $('#toDir-cityrspref').val(fromcityrspref);
        $('#fromDir-id').val(to).trigger('change');
        $('#toDir-id').val(from).trigger('change');

        //$('#datepicker1').val(todate);
        //$('#datepicker2').val(fromdate);

        if( $('[name="fromDir-type"]').val() != $('[name="toDir-type"]').val() ){
            $( '.delivery-tabs a.noactive' ).trigger( 'click' );
        }

    });



    $('.department-id').on('change', function () {

        if (directionsDisplay) {
            directionsDisplay.setMap(null);
        }

        if ($('#fromDir-id').val() && $('#toDir-id').val()) {
            directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;
            var from = $('#fromDir-id').val();
            var to = $('#toDir-id').val();
            if (from != to) {
                var objFrom = offices.filter(function (obj) {
                    return obj.number == from;
                })[0];
                var objTo = offices.filter(function (obj) {
                    return obj.number == to;
                })[0];
                fromPosition = {lat: objFrom.latitude, lng: objFrom.longitude};
                toPosition = {lat: objTo.latitude, lng: objTo.longitude};
                directionsDisplay.setMap(map);
                directionsDisplay.setOptions({
                    polylineOptions: {strokeColor: "#f9be3b", strokeWeight: 6},
                    suppressMarkers: true
                });
                if (openwindow) {
                    openwindow.close();
                }
                calculateAndDisplayRoute(directionsService, directionsDisplay);
            }
			$.event.trigger("check-to-date");
        }
    });
    $('.direction-field').on('focus', function () {

        if ($('#fromDir-id').val() && $('#toDir-id').val()) {

        } else {
            updateBounds();
        }
    });


    /******************Range sliders and cube animation*****************/

    if ($('.calculate-section').length && !device.mobile()) {
        $('#length-range').noUiSlider({
            range: [0, $('#length-range').attr('data-max')],
            start: [0],
            handles: 1,
            step: 1,
            serialization: {
                to: [$('#length-range-value')],
                resolution: 1
            },
            slide: getLengthRange
        });
        $('#width-range').noUiSlider({
            range: [0, $('#width-range').attr('data-max')],
            start: [0],
            handles: 1,
            step: 1,
            serialization: {
                to: [$('#width-range-value')],
                resolution: 1
            },
            slide: getWidthRange
        });
        $('#height-range').noUiSlider({
            range: [0, $('#height-range').attr('data-max')],
            start: [0],
            handles: 1,
            step: 1,
            serialization: {
                to: [$('#height-range-value')],
                resolution: 1
            },
            slide: getHeightRange
        });
    }

    //0,296875
    //0,515625


    function volumeValues() {
        if (($('#length-range-value').val() > 3) && ($('#height-range-value').val() > 3) && ($('#width-range-value').val() > 3)) {
            $('#shape').css('opacity', 1);
            if ($('#length-range-value').val() * $('#height-range-value').val() * $('#width-range-value').val() > pogruzValue) {
                $('.visual-img img').removeClass('visible-image');
                $('.visual-img img[data-vol="3"]').addClass('visible-image');
            } else if ($('#length-range-value').val() * $('#height-range-value').val() * $('#width-range-value').val() > manValue) {
                $('.visual-img img').removeClass('visible-image');
                $('.visual-img img[data-vol="2"]').addClass('visible-image');
            } else {
                $('.visual-img img').removeClass('visible-image');
                $('.visual-img img[data-vol="1"]').addClass('visible-image');
            }
        } else {
            $('#shape').css('opacity', 0);
            $('.visual-img img').removeClass('visible-image');
            $('.visual-img img[data-vol="1"]').addClass('visible-image');
        }
        var n = $('#length-range-value').val()*$('#height-range-value').val()*$('#width-range-value').val()/1000000000;

//fow standart type of gruz make min value od weight equal 1 if one of sides more than 600mm
		if($("#length-range-value").val()>=600 || $("#width-range-value").val()>=600 || $("#height-range-value").val()>=600) {
			$('input[name="weight"]').attr('min','1')
			}
			else 
			{
			$('input[name="weight"]').attr('min','10');
				if($('input[name="weight"]').val()<10) {
					$('input[name="weight"]').val('10');
				}
			}


        //$('#volume').val( n.noExponents() );

        //edit 09082017
		var fixed = n.toFixed(3);
        $('#volume').val( fixed );
 		//endedit
        // $('#volume').val( ($('#length-range-value').val()/1000)*($('#height-range-value').val()/1000)*($('#width-range-value').val()/1000) );

    }

    function getLengthRange() {

        var lCube = $('#length-range-value').val() * 128 / ($('#length-range').attr('data-max') * 1);
        $('.side.back, .side.front, .side.top, .side.bottom').css('width', lCube + 'px');
        $('.side.right, .side.top').css('right', (128 - lCube) + 'px');

        volumeValues();

    }

    function getWidthRange() {

        var wCube = $('#width-range-value').val() * 128 / ($('#width-range').attr('data-max') * 1);
        $('.side.right, .side.left').css('width', wCube * 0.515625 + 'px');
        $('.side.top, .side.bottom').css('height', wCube * 0.296875 + 'px');
        $('.side.front, .side.bottom').css('bottom', (38 - wCube * 0.296875) + 'px');
        $('.side.front, .side.bottom').css('left', (66 - wCube * 0.515625) + 'px');
        $('.side.top').css('top', (128 - $('.side.back').height()) + 'px');

        volumeValues();

    }

    function getHeightRange() {

        var hCube = $('#height-range-value').val() * 128 / ($('#height-range').attr('data-max') * 1);
        $('.side.back, .side.front, .side.right, .side.left').css('height', hCube + 'px');
        $('.side.top').css('top', (128 - hCube) + 'px');

        volumeValues();

    }

    $('#height-range-value').on('change', function () {
        getHeightRange();
    });
    $('#width-range-value').on('change', function () {
        getWidthRange();
    });
    $('#length-range-value').on('change', function () {
        getLengthRange();
    });


    /*******************Autocomplete Departments***********************/

    $(function () {
        /*var availableDepartments = [];
        for (var i = 0; i < offices.length; i++) {
            var tag = new Object();
            tag.value = offices[i].description;
            tag.label = offices[i].description;
            tag.id = offices[i].number;
            availableDepartments.push(tag);
        }*/
        $('#department-search').autocomplete({
            source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getRsp',
            minLength: 2,
            classes: {
                "ui-autocomplete": "departments-dropdown"
            },
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (event, ui) {
                $(event.target).val(ui.item.value);

                return false;
            },
            select: function (event, ui) {
                $("#department-search").val(ui.item.value);
                $("#department-search-id").val(ui.item.id);
                if (ui.item.id.length > 0) {
                    $("#department-search-form").submit();
                }
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = {value: "", id: "", label: noResultInfo};
                    ui.content.push(noResult);
                }
            }
        });
        $('.order-form .long-input-wrap input[type="text"]').autocomplete({
            source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getTown',
            minLength: 3,
            classes: {
                "ui-autocomplete": "departments-dropdown order-pop-dropdown"
            },
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (event, ui) {
                $(event.target).val(ui.item.value);

                return false;
            },
            select: function (event, ui) {
                $(event.target).val(ui.item.value);
                $(event.target).next('input[type="hidden"]').val(ui.item.id);
                $("#simple_calc_" + $(event.target).data("napravlenie") + "_text").text(ui.item.value_short);
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = {value: "", id: "", label: noResultInfo};
                    ui.content.push(noResult);
                }
            }
        });

    });


    /*******************Input mask***********************/
    $ (function (){
   $("#sender-phone").mask("+38(099)999-99-99");
   });

});