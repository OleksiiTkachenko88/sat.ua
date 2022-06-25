import $ from 'jquery';
import swiper from '../blocks/swiper/swiper.js';

require('../blocks/util/util.js');
require('../blocks/bootstrap-slider/bootstrap-slider.js');
require('../blocks/collapse/collapse.js');
require('../blocks/uk-core/uk-core.js');
require('../blocks/uk-modal/uk-modal.js');
require('../blocks/uk-switcher/uk-switcher.js');
require('../blocks/uk-toggle/uk-toggle.js');
require('../blocks/uk-sticky/uk-sticky.js');
require('../blocks/uk-form-select/uk-form-select.js');
require('../blocks/uk-accordion/uk-accordion.js');
require('../blocks/uk-button/uk-button.js');
require('../blocks/uk-offcanvas/uk-offcanvas.js');
require('../blocks/easy-autocomplete/easy-autocomplete.js');
require('../blocks/nanoscroller/nanoscroller.js');
require('../blocks/raty-fa/raty-fa.js');
require('../blocks/autoresize/autoresize.js');

$(() => {

    $('.nano').nanoScroller();
    
    var swiperMain = swiper('.swiper-container--main', {
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0,
        loop: true
    });

    if ($('.swiper-container--main').length) {
        swiperMain.on('onSlideChangeStart', function(swiper){
            $('.js-swiper-main-navigation a').removeClass('active').eq(swiper.activeIndex).addClass('active');
        });

        $('.js-swiper-main-navigation').find('a').on('click', function(){
            var index = $(this).data('slide');

            swiperMain.slideTo(index);
            return false;
        });        
    }

    var swiperPanelPartner = swiper('.panel--partner .panel__swiper-container', {
        paginationClickable: true,
        spaceBetween: 20,
        loop: true
    });

	$('.panel--partner .panel__prev').on('click', function(){
		swiperPanelPartner.slidePrev();
	});

	$('.panel--partner .panel__next').on('click', function(){
		swiperPanelPartner.slideNext();
	});


    $('.table--department').each(function(){
        var $table = $(this);
        var $toggles = $table.find('.tr-collapse-toggle');

        $toggles.on('click', function(){
            var $toggle = $(this);
            var $collapseInner = $toggle.find('.collapse');
            var $collapseNext = $toggle.nextUntil('.tr-collapse-toggle').find('.collapse');

            $collapseNext.eq(0).on('hidden.bs.collapse', function(){
                $toggle.removeClass('tr-active uk-overlay-active');
            });

            $table.find('.collapse').not($collapseInner).not($collapseNext).collapse('hide');

            if ($toggle.hasClass('tr-active')) {
                $collapseInner.collapse('hide');
                $collapseNext.collapse('hide');
            } else {
                $toggle.addClass('tr-active uk-overlay-active');
                $collapseInner.collapse('show');
                $collapseNext.collapse('show');
            }
        });
    });

   $('.page__col-side-toggle-icon').on('click', function(){
        var $parent = $(this).parents('.page__col-side:first');
        var $body = $('body');

        if ($parent.hasClass('is-visible')) {
            $parent.removeClass('is-visible');
            $body.removeClass('page-offcanvas');
        } else {
            $parent.addClass('is-visible');
            $body.addClass('page-offcanvas');
        }
    });

    $('.page__col-side-tint').on('click', function(){
        $(this).siblings('.page__col-side').removeClass('is-visible');
    });

   $('.page__navbar-header .js-toggle-search').on('click', function() {
        var navbar = $(this).parents('.page__navbar-header');
        var navbarSearch = navbar.next('.page__navbar-header--search');
        navbarSearch.find('.js-close').one('click', function() {
            navbarSearch.removeClass('is-expand');
            return false;
        });
        navbarSearch.toggleClass('is-expand');
        return false;
   });

    $(function(){
        var $window = $(window);
        var $document = $(document);
        var $pageHeader = $('.page__header');
        var documentScrollLeft = 0;

        $window.scroll(function(e) {
            documentScrollLeft = $document.scrollLeft();

            if ($pageHeader.css('position') == 'fixed') {
                $pageHeader.css({
                    left: -documentScrollLeft + 'px'
                });
                $window.one('resize', function(e){
                    $window.trigger('scroll');
                });
            } else {
                $pageHeader.css({
                    left: ''
                });
            }
        }).trigger('scroll');
    });

    $(function(){

        if ($('#cube_slider_length').length == 0) {
            return;
        }

        var cubeLengthChange = function(e) {
            $('#cube_input_length').val(length.getValue());
        };

        var cubeWidthChange = function(e) {
            $('#cube_input_width').val(width.getValue());
        };

        var cubeHeightChange = function(e) {
            $('#cube_input_height').val(height.getValue());
        };

        var cubeScaleUpdate = function(){

            var scaleX = (width.getValue() * 100 / ($('#cube_slider_width').data('slider-max') - $('#cube_slider_width').data('slider-min'))) / 100;
            var scaleY = (height.getValue() * 100 / ($('#cube_slider_height').data('slider-max') - $('#cube_slider_height').data('slider-min'))) / 100;
            var scaleZ = (length.getValue() * 100 / ($('#cube_slider_length').data('slider-max') - $('#cube_slider_length').data('slider-min'))) / 100;
            // var translateX = -(1 - scaleX) * 100 + '%';
            // var translateY = (1 - scaleY) * 100 + '%';
            // var translateZ = (1 - scaleZ) * 100 + '%';

            $('#cube').css('transform', 'scale3d('+ scaleX +','+ scaleY +','+ scaleZ +')');
            // $('#cube').css('transform', 'scale3d('+ scaleX +','+ scaleY +','+ scaleZ +') translate3d(' + translateX + ',' + translateY + ',' + translateZ + ')');
        };

        var length = $('#cube_slider_length').slider()
            .on('slide', cubeLengthChange)
            .on('slide', cubeScaleUpdate)
            .on('change', cubeLengthChange)
            .on('change', cubeScaleUpdate)
            .data('slider');

        var width = $('#cube_slider_width').slider()
            .on('slide', cubeWidthChange)
            .on('slide', cubeScaleUpdate)
            .on('change', cubeWidthChange)
            .on('change', cubeScaleUpdate)
            .data('slider');

        var height = $('#cube_slider_height').slider()
            .on('slide', cubeHeightChange)
            .on('slide', cubeScaleUpdate)
            .on('change', cubeHeightChange)
            .on('change', cubeScaleUpdate)
            .data('slider');

        $('#cube_input_length')
            .on('change', function(){
                var parsed = parseInputValue($('#cube_slider_length').data('slide-min'), $('#cube_slider_length').data('slide-max'), $(this).val(), $('#cube_slider_length').data('slide-value'));

                length.setValue(parsed);
                $('#cube_slider_length').trigger('change');
            });

        $('#cube_input_width')
            .on('change', function(){
                var parsed = parseInputValue($('#cube_slider_width').data('slide-min'), $('#cube_slider_width').data('slide-max'), $(this).val(), $('#cube_slider_width').data('slide-value'));

                width.setValue(parsed);
                $('#cube_slider_width').trigger('change');
            });

        $('#cube_input_height')
            .on('change', function(){
                var parsed = parseInputValue($('#cube_slider_height').data('slide-min'), $('#cube_slider_height').data('slide-max'), $(this).val(), $('#cube_slider_height').data('slide-value'));

                height.setValue(parsed);
                $('#cube_slider_height').trigger('change');
            });

        $('#cube_input_height').trigger('change');

        function parseInputValue(min, max, value, defaultValue) {
            var parsed = parseFloat(value);

            if (parsed >= max) {
                parsed = max;
            } else if (parsed <= min) {
                parsed = min;
            }

            return parsed;
        }
    });

    $('.page__map-container.collapse .btn--more').on('click', function(){
        var $more = $(this);
        var $collapse = $more.parents('.page__map-container.collapse');

        if ($collapse.hasClass('in')) {
            $collapse.removeClass('active').collapse('hide');
        } else {
            $collapse.addClass('active').collapse('show');
        }

        return false;
    });

    $('.comment-container .btn--more').on('click', function(){
        var $more = $(this);
        var $container = $more.parents('.comment-container');
        var $collapse = $container.find('.collapse');

        if ($collapse.hasClass('in')) {
            $container.removeClass('active');
            $collapse.collapse('hide');
        } else {
            $container.addClass('active');
            $collapse.collapse('show');
        }

        return false;
    });

    $('#mobile_menu')
        .on('show.uk.offcanvas', function(event){
            $('.page__header').addClass('page__header_moved');
        })
        .on('click', function(event) {
            if ($(event.target).closest(".uk-offcanvas-bar").length > 0) {
            } else {
                $('.page__header').removeClass('page__header_moved');
            }
        });

    
    // search
    
    $('#search')
        .easyAutocomplete({
            url: "assets/data/search.json",
            getValue: "name",
            list: {   
                maxNumberOfElements: 10,
                match: {
                    enabled: true
                }
            },
            highlightPhrase: false
        });

    var timer;
    $('.page__header').on('inactive.uk.sticky', function(){
        var $self = $(this);

        clearTimeout(timer);

        $self.addClass('animated');
        timer = setTimeout(function(){
            $self.removeClass('animated');
        }, 190);
    });

    // rating

    $('#rating').raty({
      half: false,
      score: 2,
      starOff: 'fa fa-star-o fa_accent',
      starOn: 'fa fa-star fa_accent'
      // starHalf : 'fa fa-star-half-o fa_accent'
    }); 

    
    // sidebar
    
    var offset = 900;
    var duration = 200;

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > offset) {
            $('#sidenav').find('.sidenav__link.is-fade').show();
        } else {
            $('#sidenav').find('.sidenav__link.is-fade').hide();
        }
    }).trigger('scroll');

    // scroller

    new Swiper('.js-swiper-container-scrollable', {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
    });

    // autoResize textarea

    $('textarea.form-control--alt').autoResize();
});
