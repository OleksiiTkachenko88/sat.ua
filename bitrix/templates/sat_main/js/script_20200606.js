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
	while ((el = el.parentElement) && !el.classList.contains(cls)){
    	return el;
	}
}
var openwindow;

function openWindow(map, mark) {
    if (openwindow) {
        openwindow.close();
    }
    openwindow = mark.infowindow;
    openwindow.open(map, mark);

	setTimeout(function(){$('.gm-style-iw').parent().addClass('custom-iw');}, 100);
	//findAncestor(document.getElementsByClassName('department-info')[0], 'gm-style-iw').parentElement.className += 'custom-iw';
}

function openWindowMain(map, mark) {
    if (openwindow) {
        openwindow.close();
    }
    openwindow = mark.infowindow;
    openwindow.open(map, mark);

    findAncestor(document.getElementsByClassName('department-info')[0], 'gm-style-iw').parentElement.className += 'main-custom-iw';

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

            var geocoder = new google.maps.Geocoder();
            google.maps.event.addListener(map, 'click', function(e) {
                geocoder.geocode({
                    'latLng': e.latLng
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                        }
                    }
                });
            });

}

function mapRefresh(ident) {
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

function showGruz(){
    $('.hidden-gruz').hide();
    $('#length-range-value').val(0);
    $('#width-range-value').val(0);
    $('#height-range-value').val(0);
}

function hideGruz(){
    $('.hidden-gruz').show();
    $('#length-range-value').val(0);
    $('#width-range-value').val(0);
    $('#height-range-value').val(0);
}

function GruzParams (length, width, height) {
             var subLength = sub.data('length');
            var subWidth = sub.data('width');
            var subHeight = 200;
            $('#length-range').parent().children('span:last').text(subLength+' см');
            $('#width-range').parent().children('span:last').text(subWidth+' см');
            $('#height-range').parent().children('span:last').text(subHeight+' см');

            $('#length-range').attr('data-max', subLength);
            $('#width-range').attr('data-max', subWidth);

            $('#length-range').attr('disabled', true);
            $('#width-range').attr('disabled', true);
            $('#length-range-value').attr('readonly', true);
            $('#width-range-value').attr('readonly', true);

            $('#length-range').css('opacity',0.2);
            $('#width-range').css('opacity',0.2);

            $('#height-range').attr('data-max', subHeight);

            if ($('.calculate-section').length && $('#length-range').length && !device.mobile()) {
                $('#length-range').noUiSlider({
                    range: [0, subLength],
                    start: [subLength],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#length-range-value')],
                        resolution: 1
                    },
                    slide: getLengthRange
                }, true);
                $('#width-range').noUiSlider({
                    range: [0, subWidth],
                    start: [subWidth],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#width-range-value')],
                        resolution: 1
                    },
                    slide: getWidthRange
                }, true);
                $('#height-range').noUiSlider({
                    range: [0, subHeight],
                    start: [0],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#height-range-value')],
                        resolution: 1
                    },
                    slide: getHeightRange
                }, true);
            }
}

$(document).ready(function () {

    $(document).on("DOMSubtreeModified", '.type-block .jq-selectbox__select-text', function(){
        var type = $('.type-block li.selected').data('type');
        $('[name="totalweight"]').val(0).closest('.main-info-row').hide();
        $('[name="volume"]').val(0).removeAttr('disabled').closest('.main-info-row').show();
        $('[name="seatsAmount"]').attr({'min': 1});

        if(type=='type_1'){ //Документы
            $('[name="weight"]').val(1).attr({'min': '', 'max':'1', 'disabled':'disabled'});
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').hide();
            $('[name="volume"]').val(0).closest('.main-info-row').hide();
            hideGruz();
        } else  if(type=='type_2'){ //Базовый
            var sub = $('.subtype-block .hidden-fields li.selected');
            var minWeight = (sub.data('min'))?sub.data('min'):"1";
            var maxWeight = (sub.data('max') && sub.data('max')!== 1)?sub.data('max'):"30000";
            $('[name="weight"]').val(minWeight).removeAttr('disabled').attr({'min': minWeight, 'max': maxWeight});
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').hide();
            showGruz();
        } else if(type=='type_3'){ //Паллета
            var sub = $('.subtype-block .hidden-fields li.selected');
            var minWeight = (sub.data('min'))?sub.data('min'):"1";
            var maxWeight = (sub.data('max'))?sub.data('max'):"1000";
            $('[name="weight"]').val(minWeight).removeAttr('disabled').attr({'min': minWeight, 'max': maxWeight});
            $('[name="volume"]').closest('.main-info-row').hide();
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').show();
            $('[name="totalweight"]').val(minWeight).closest('.main-info-row').show();
            showGruz();
        } else if(type=='type_4'){ //Легковая шина
            $('[name="weight"]').val(4).removeAttr('disabled').attr({'min': '4', 'max': '20'});
            $('[name="seatsAmount"]').val(1).attr({'min': '1', 'max': ''}).closest('.main-info-row').show();
            hideGruz();
            $('[name="volume"]').val(0).closest('.main-info-row').hide();
            $('[name="totalweight"]').val(4).closest('.main-info-row').show();
        } else if(type=='type_5'){//Грузовая шина
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
        if( $('.subtype-block li.'+type).length<2){
            $('.subtype-block').parent().hide();
        } else {
            $('.subtype-block').parent().show();
        }
    });

    //Изменение подтарифа
    $(document).on("DOMSubtreeModified", '.subtype-block .jq-selectbox__select-text', function(){
        var type = $('.type-block li.selected').data('type');
        var sub = $('.subtype-block .jq-selectbox__dropdown li.selected');
        if(type == 'type_3') {
            var subLength = sub.data('length');
            var subWidth = sub.data('width');
            var subHeight = 200;
            $('#length-range').parent().children('span:last').text(subLength+' см');
            $('#width-range').parent().children('span:last').text(subWidth+' см');
            $('#height-range').parent().children('span:last').text(subHeight+' см');

            $('#length-range').attr('data-max', subLength);
            $('#width-range').attr('data-max', subWidth);

            $('#length-range').attr('disabled', true);
            $('#width-range').attr('disabled', true);
            $('#length-range-value').attr('readonly', true);
            $('#width-range-value').attr('readonly', true);

            $('#length-range').css('opacity',0.2);
            $('#width-range').css('opacity',0.2);

            $('#height-range').attr('data-max', subHeight);

            if ($('.calculate-section').length && !device.mobile() && $('#length-range').length) {
                $('#length-range').noUiSlider({
                    range: [0, subLength],
                    start: [subLength],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#length-range-value')],
                        resolution: 1
                    },
                    slide: getLengthRange
                }, true);
                $('#width-range').noUiSlider({
                    range: [0, subWidth],
                    start: [subWidth],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#width-range-value')],
                        resolution: 1
                    },
                    slide: getWidthRange
                }, true);
                $('#height-range').noUiSlider({
                    range: [0, subHeight],
                    start: [0],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#height-range-value')],
                        resolution: 1
                    },
                    slide: getHeightRange
                }, true);
            }
        } else if(type == 'type_1' || type =='type_2' || type =='type_4' || type =='type_5' ) {
            var subLength = 760;
            var subLength2 = 760;
            var subWidth = 500;
            var subHeight = 500;
            $('#length-range').parent().children('span:last').text(subLength+' см');
            $('#width-range').parent().children('span:last').text(subWidth+' см');
            $('#height-range').parent().children('span:last').text(subHeight+' см');

            $('#length-range').attr('data-max', subLength);
            $('#width-range').attr('data-max', subWidth);

            $('#length-range').attr('disabled', false);
            $('#width-range').attr('disabled', false);
            $('#length-range-value').attr('readonly', false);
            $('#width-range-value').attr('readonly', false);

            $('#length-range').css('opacity',1);
            $('#width-range').css('opacity',1);

            $('#height-range').attr('data-max', subHeight);

            if ($('.calculate-section').length && !device.mobile()) {
                $('#length-range').noUiSlider({
                    range: [0, subLength2], //Ограничение по вводу с клавиатуры
                    start: [0],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#length-range-value')],
                        resolution: 1
                    },
                    slide: getLengthRange
                }, true);
                $('#width-range').noUiSlider({
                    range: [0, subWidth],
                    start: [0],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#width-range-value')],
                        resolution: 1
                    },
                    slide: getWidthRange
                }, true);
                $('#height-range').noUiSlider({
                    range: [0, subHeight],
                    start: [0],
                    handles: 1,
                    step: 1,
                    serialization: {
                        to: [$('#height-range-value')],
                        resolution: 1
                    },
                    slide: getHeightRange
                }, true);
            }
        }
    getLengthRange();
    getWidthRange();
    getHeightRange();
    });

    $('[name="weight"], [name="seatsAmount"]').on('change keyup', function(){
        $('[name="totalweight"]').val( $('[name="weight"]').val()*$('[name="seatsAmount"]').val() );
    });

    $('[name="seatsAmount"]').on('change keyup', function(){
        $('#volume').val(($('#length-range-value').val()*$('#height-range-value').val()*$('#width-range-value').val()*$('[name="seatsAmount"]').val()/1000000).toFixed(3));
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

        $('#length-range').val(0);
        $('#width-range').val(0);
        $('#height-range').val(0);
    });


    if (!device.mobile()) {
        $('select').styler();
    }
    deviceContacts();

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


            if (top > pointPanel) {
                $('.right-panel .show-on-scroll').css({
                    'height': '0px',
                    'overflow': 'visible'
                });

            } else {
                $('.right-panel .show-on-scroll').css({
                    'height': '0px',
                    'overflow': 'hidden'
                });
            }
        }
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

    $(".news-carousel").owlCarousel({
        autoplay: true,
        autoplaySpeed: 700,
        autoplayHoverPause: true,
        navSpeed: 700,
        dragEndSpeed: 700,
        nav: ($(".news-carousel .item").length > 1) ? true : false,
        loop: ($(".news-carousel .item").length > 1) ? true : false,
        margin: 0,
        items: 1
    });

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

    $(".parcel-options-info")
        .on('click', '.parcel-block-subtitle', function () {
            $(this).toggleClass('slide-up-title');
            $(this).closest('.options-info-item').find('.options-body').slideToggle(300);

        });
    $(document).on('click', '.options-row-item input[type="checkbox"]', function () {

        $(this).closest('.options-row-item').toggleClass('checked-option');
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

    /******************Range sliders and cube animation*****************/
 if ($('.calculate-section').length && !device.mobile() && $('#length-range').length) {
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
    function volumeValues() {
        var type = $('.type-block li.selected').data('type');
        if (($('#length-range-value').val() > 3) && ($('#height-range-value').val() > 3) && ($('#width-range-value').val() > 3)) {
            $('#shape').css('opacity', 1);
            if (type == "type_3") {
                 $('.visual-img img').removeClass('visible-image');
                $('.visual-img img[data-vol="2"]').addClass('visible-image');
            } else if ($('#length-range-value').val() * $('#height-range-value').val() * $('#width-range-value').val() > pogruzValue) {
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
//23.10.2019 add *$('[name="seatsAmount"]').val()
        var n = $('#length-range-value').val()*$('#height-range-value').val()*$('#width-range-value').val()*$('[name="seatsAmount"]').val()/1000000;

//fow standart type of gruz make min value od weight equal 1 if one of sides more than 60sm
        if($("#length-range-value").val()>=60 || $("#width-range-value").val()>=60 || $("#height-range-value").val()>=60) {
            $('input[name="weight"]').attr('min','1')
            }
        var fixed = n.toFixed(3);
        $('#volume').val( fixed );
    }

    function getLengthRange() {
        var type = $('.type-block li.selected').data('type');
        var lCube = $('#length-range-value').val() * 128 / ($('#length-range').attr('data-max') * 1);
        $('.side.back, .side.front, .side.top, .side.bottom').css('width', lCube + 'px');
        $('.side.right, .side.top').css('right', (128 - lCube) + 'px');
        volumeValues();
    }

    function getWidthRange() {
        var type = $('.type-block li.selected').data('type');
        var wCube = $('#width-range-value').val() * 128 / ($('#width-range').attr('data-max') * 1);
        $('.side.right, .side.left').css('width', wCube * 0.515625 + 'px');
        $('.side.top, .side.bottom').css('height', wCube * 0.296875 + 'px');
        $('.side.front, .side.bottom').css('bottom', (38 - wCube * 0.296875) + 'px');
        $('.side.front, .side.bottom').css('left', (66 - wCube * 0.515625) + 'px');
        $('.side.top').css('top', (128 - $('.side.back').height()) + 'px');
        volumeValues();
    }

    function getHeightRange() {
        var type = $('.type-block li.selected').data('type');
        if (type == "type_3") {
            var hCube = $('#height-range-value').val() * 128 / ($('#height-range').attr('data-max') * 1);
            $('.side.back, .side.front, .side.right, .side.left').css('height', hCube + 'px');
            $('.side.top').css('top', (128 - hCube) + 'px');
        }
        else {
            var hCube = $('#height-range-value').val() * 128 / ($('#height-range').attr('data-max') * 1);
            $('.side.back, .side.front, .side.right, .side.left').css('height', hCube + 'px');
            $('.side.top').css('top', (128 - hCube) + 'px');
        }
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
    /*********************UA PAY*************************/
    $('.pay-text .pay-conditions').on('click', function(e){
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: '/bitrix/templates/sat_main/include/pay_conditions.php',
            dataType: 'html',
            success: function(data){
                var popup = BX.PopupWindowManager.create("popup-pay-conditions", null, {
                    content: data,
                    draggable: true,
                    resizable: false,
                    closeIcon: false,
                    overlay: {
                      backgroundColor: '#1e3e6c',
                      opacity: '80',
                    },
                    buttons: [
                        new BX.PopupWindowButton({
                        text: (api_lang=='uk')?"Закрити":"Закрыть",
                        className: "pay-close",
                        events: {click: function(){
                            $('body').css('overflow', "auto");
                            this.popupWindow.close();
                        }}
                    })],
                    events: {
                        onAfterPopupShow: function(){
                            $('body').css('overflow', "hidden");
                        }
                    }
                });
                popup.show();
            },
        });
    });
/***** end ******/
/****** Privat24 | UAPay ********/

	let paymentMethod;

	//radio uncheck on load page
	if($('input:radio.payment-input')){
		$('input:radio.payment-input').prop("checked", false);
	}

	//choice payment method
	$('input:radio.payment-input').change(function(){
		paymentMethod = $( this ).attr("id");
		$("button[type=submit]#payButton").attr("paymentmethod", paymentMethod);

		if($("button[type=submit]#payButton").attr("paymentmethod")) {
			$("#payButton .c-sum").hide();
			$("#payButton .c-sum#"+paymentMethod+"-sum").show();
			$(".tracking-table .pay-wrap").show()
		}
	});

	//get redirect URL
	$("button[type='submit']#payButton").on('click', function(e){
		let self = this;
		let webTN = $( this ).data('webttnnumber');
		let webTS = parseInt($( this ).data('webttnsum'));
		let webOS = parseInt($( this ).data('webordersum'));
		let webTId = $( this ).data('webttnid');
		let webOId = $( this ).data('weborderid');
		if(!$("button[type=submit]#payButton").attr("paymentmethod")){
			return
		}

		switch(paymentMethod){
			case 'privat24':
				$.ajax({
					url: "/bitrix/templates/sat_main/privat24.php",
					data: {"action": "getPrivatPage", "nng": webTN},
					beforeSend: function() {
						$(".pay-btn-zone .lds-ellipsis").height($(self).height());
						$(".pay-btn-zone .lds-ellipsis").css("line-height", $(self).css('line-height'));
						$(self).hide();
						$(".pay-btn-zone .lds-ellipsis").show();
					},
					success: function(msg) {
						var url = msg;
						window.location.href = url;
					}
				})
			break;
			case 'uapay':
				if(webTS == webOS && webOId.length) {
					$.ajax({
						url: "/bitrix/templates/sat_main/uapay.php",
						data: {"action":"checkOrder","orderId": webOId},
						type: "GET",
						dataType : 'json',
						beforeSend: function() {
							$(".pay-btn-zone .lds-ellipsis").height($(self).height());
							$(".pay-btn-zone .lds-ellipsis").css("line-height", $(self).css('line-height'));
							$(self).hide();
							$(".pay-btn-zone .lds-ellipsis").show();
						},
						success: function(msg) {
							if(msg.orderStatus == "NEW" && msg.status == false && msg.data.id == webOId){
								var url ='https://pay.uapay.ua/payment/'+ webOId;
								window.location.href = url;
							}
							else if(msg.orderStatus == "NEW" && msg.status == false && msg.data.id !== webOId){
								var url ='https://pay.uapay.ua/payment/'+ msg.data.id;
								window.location.href = url;
							}
							else if(msg.orderStatus == "FINISHED" && msg.status){
								location.reload();
							}
							else if(msg.orderStatus =="WRONG_ID" && msg.status == false){
								$.ajax({
									url: "/bitrix/templates/sat_main/uapay.php",
									data: {"action":"getUaPayPage","sum": webTS,"ref": webTId},
									type: "GET",
									dataType : 'json',
									success: function(msg) {
										var url = msg;
										window.location.href = url;
									}
								});
							}
						}
					});
				}
				else if(webTS !== webOS && webTId.length) {
					$.ajax({
						url: "/bitrix/templates/sat_main/uapay.php",
						data: {"action":"getUaPayPage","sum": webTS,"ref": webTId},
						type: "GET",
						dataType : 'json',
						success: function(msg) {
							console.log(msg);
							var url = msg;
							window.location.href = url;
						}
					});
				}
			break;
		}
	});
/****** end ******/
});
