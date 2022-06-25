webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _swiper = __webpack_require__(4);
	
	var _swiper2 = _interopRequireDefault(_swiper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(79);
	__webpack_require__(83);
	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(".nano").nanoScroller();
	
	    var swiperMain = (0, _swiper2.default)('.swiper-container--main', {
	        paginationClickable: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        spaceBetween: 0,
	        loop: true
	    });
	
	    if ((0, _jquery2.default)('.swiper-container--main').length) {
	        swiperMain.on('onSlideChangeStart', function (swiper) {
	            (0, _jquery2.default)('.js-swiper-main-navigation a').removeClass('active').eq(swiper.activeIndex).addClass('active');
	        });
	
	        (0, _jquery2.default)('.js-swiper-main-navigation').find('a').on('click', function () {
	            var index = (0, _jquery2.default)(this).data('slide');
	
	            swiperMain.slideTo(index);
	            return false;
	        });
	    }
	
	    var swiperPanelPartner = (0, _swiper2.default)('.panel--partner .panel__swiper-container', {
	        paginationClickable: true,
	        spaceBetween: 20,
	        loop: true
	    });
	
	    (0, _jquery2.default)('.panel--partner .panel__prev').on('click', function () {
	        swiperPanelPartner.slidePrev();
	    });
	
	    (0, _jquery2.default)('.panel--partner .panel__next').on('click', function () {
	        swiperPanelPartner.slideNext();
	    });
	
	    (0, _jquery2.default)('.table--department').each(function () {
	        var $table = (0, _jquery2.default)(this);
	        var $toggles = $table.find('.tr-collapse-toggle');
	
	        $toggles.on('click', function () {
	            var $toggle = (0, _jquery2.default)(this);
	            var $collapseInner = $toggle.find('.collapse');
	            var $collapseNext = $toggle.nextUntil('.tr-collapse-toggle').find('.collapse');
	
	            $collapseNext.eq(0).on('hidden.bs.collapse', function () {
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
	
	    (0, _jquery2.default)('.page__col-side-toggle-icon').on('click', function () {
	        var $parent = (0, _jquery2.default)(this).parents('.page__col-side:first');
	        var $body = (0, _jquery2.default)('body');
	
	        if ($parent.hasClass('is-visible')) {
	            $parent.removeClass('is-visible');
	            $body.removeClass('page-offcanvas');
	        } else {
	            $parent.addClass('is-visible');
	            $body.addClass('page-offcanvas');
	        }
	    });
	
	    (0, _jquery2.default)('.page__col-side-tint').on('click', function () {
	        (0, _jquery2.default)(this).siblings('.page__col-side').removeClass('is-visible');
	    });
	
	    (0, _jquery2.default)('.page__navbar-header .js-toggle-search').on('click', function () {
	        var navbar = (0, _jquery2.default)(this).parents('.page__navbar-header');
	        var navbarSearch = navbar.next('.page__navbar-header--search');
	        navbarSearch.find('.js-close').one('click', function () {
	            navbarSearch.removeClass('is-expand');
	            return false;
	        });
	        navbarSearch.toggleClass('is-expand');
	        return false;
	    });
	
	    (0, _jquery2.default)(function () {
	        var $window = (0, _jquery2.default)(window);
	        var $document = (0, _jquery2.default)(document);
	        var $pageHeader = (0, _jquery2.default)('.page__header');
	        var documentScrollLeft = 0;
	
	        $window.scroll(function (e) {
	            documentScrollLeft = $document.scrollLeft();
	
	            if ($pageHeader.css('position') == 'fixed') {
	                $pageHeader.css({
	                    left: -documentScrollLeft + 'px'
	                });
	                $window.one('resize', function (e) {
	                    $window.trigger('scroll');
	                });
	            } else {
	                $pageHeader.css({
	                    left: ''
	                });
	            }
	        }).trigger('scroll');
	    });
	
	    (0, _jquery2.default)(function () {
	
	        if ((0, _jquery2.default)('#cube_slider_length').length == 0) {
	            return;
	        }
	
	        var cubeLengthChange = function cubeLengthChange(e) {
	            (0, _jquery2.default)('#cube_input_length').val(length.getValue());
	        };
	
	        var cubeWidthChange = function cubeWidthChange(e) {
	            (0, _jquery2.default)('#cube_input_width').val(width.getValue());
	        };
	
	        var cubeHeightChange = function cubeHeightChange(e) {
	            (0, _jquery2.default)('#cube_input_height').val(height.getValue());
	        };
	
	        var cubeScaleUpdate = function cubeScaleUpdate() {
	
	            var scaleX = width.getValue() * 100 / ((0, _jquery2.default)('#cube_slider_width').data('slider-max') - (0, _jquery2.default)('#cube_slider_width').data('slider-min')) / 100;
	            var scaleY = height.getValue() * 100 / ((0, _jquery2.default)('#cube_slider_height').data('slider-max') - (0, _jquery2.default)('#cube_slider_height').data('slider-min')) / 100;
	            var scaleZ = length.getValue() * 100 / ((0, _jquery2.default)('#cube_slider_length').data('slider-max') - (0, _jquery2.default)('#cube_slider_length').data('slider-min')) / 100;
	            // var translateX = -(1 - scaleX) * 100 + '%';
	            // var translateY = (1 - scaleY) * 100 + '%';
	            // var translateZ = (1 - scaleZ) * 100 + '%';
	
	            (0, _jquery2.default)('#cube').css('transform', 'scale3d(' + scaleX + ',' + scaleY + ',' + scaleZ + ')');
	            // $('#cube').css('transform', 'scale3d('+ scaleX +','+ scaleY +','+ scaleZ +') translate3d(' + translateX + ',' + translateY + ',' + translateZ + ')');
	        };
	
	        var length = (0, _jquery2.default)('#cube_slider_length').slider().on('slide', cubeLengthChange).on('slide', cubeScaleUpdate).on('change', cubeLengthChange).on('change', cubeScaleUpdate).data('slider');
	
	        var width = (0, _jquery2.default)('#cube_slider_width').slider().on('slide', cubeWidthChange).on('slide', cubeScaleUpdate).on('change', cubeWidthChange).on('change', cubeScaleUpdate).data('slider');
	
	        var height = (0, _jquery2.default)('#cube_slider_height').slider().on('slide', cubeHeightChange).on('slide', cubeScaleUpdate).on('change', cubeHeightChange).on('change', cubeScaleUpdate).data('slider');
	
	        (0, _jquery2.default)('#cube_input_length').on('change', function () {
	            var parsed = parseInputValue((0, _jquery2.default)('#cube_slider_length').data('slide-min'), (0, _jquery2.default)('#cube_slider_length').data('slide-max'), (0, _jquery2.default)(this).val(), (0, _jquery2.default)('#cube_slider_length').data('slide-value'));
	
	            length.setValue(parsed);
	            (0, _jquery2.default)('#cube_slider_length').trigger('change');
	        });
	
	        (0, _jquery2.default)('#cube_input_width').on('change', function () {
	            var parsed = parseInputValue((0, _jquery2.default)('#cube_slider_width').data('slide-min'), (0, _jquery2.default)('#cube_slider_width').data('slide-max'), (0, _jquery2.default)(this).val(), (0, _jquery2.default)('#cube_slider_width').data('slide-value'));
	
	            width.setValue(parsed);
	            (0, _jquery2.default)('#cube_slider_width').trigger('change');
	        });
	
	        (0, _jquery2.default)('#cube_input_height').on('change', function () {
	            var parsed = parseInputValue((0, _jquery2.default)('#cube_slider_height').data('slide-min'), (0, _jquery2.default)('#cube_slider_height').data('slide-max'), (0, _jquery2.default)(this).val(), (0, _jquery2.default)('#cube_slider_height').data('slide-value'));
	
	            height.setValue(parsed);
	            (0, _jquery2.default)('#cube_slider_height').trigger('change');
	        });
	
	        (0, _jquery2.default)('#cube_input_height').trigger('change');
	
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
	
	    (0, _jquery2.default)('.page__map-container.collapse .btn--more').on('click', function () {
	        var $more = (0, _jquery2.default)(this);
	        var $collapse = $more.parents('.page__map-container.collapse');
	
	        if ($collapse.hasClass('in')) {
	            $collapse.removeClass('active').collapse('hide');
	        } else {
	            $collapse.addClass('active').collapse('show');
	        }
	
	        return false;
	    });
	
	    (0, _jquery2.default)('.comment-container .btn--more').on('click', function () {
	        var $more = (0, _jquery2.default)(this);
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
	
	    (0, _jquery2.default)('#mobile_menu').on('show.uk.offcanvas', function (event) {
	        (0, _jquery2.default)('.page__header').addClass('page__header_moved');
	    }).on('click', function (event) {
	        if ((0, _jquery2.default)(event.target).closest("uk-offcanvas-bar").length > 0) {} else {
	            (0, _jquery2.default)('.page__header').removeClass('page__header_moved');
	        }
	    });
	
	    // search
	
	    (0, _jquery2.default)('#search').easyAutocomplete({
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
	    (0, _jquery2.default)('.page__header').on('inactive.uk.sticky', function () {
	        var $self = (0, _jquery2.default)(this);
	
	        clearTimeout(timer);
	
	        $self.addClass('animated');
	        timer = setTimeout(function () {
	            $self.removeClass('animated');
	        }, 190);
	    });
	
	    // rating
	
	    (0, _jquery2.default)('#rating').raty({
	        half: true,
	        score: 2.3,
	        starOff: 'fa fa-star-o fa_accent',
	        starOn: 'fa fa-star fa_accent',
	        starHalf: 'fa fa-star-half-o fa_accent'
	    });
	
	    var offset = 900;
	    var duration = 200;
	
	    (0, _jquery2.default)(window).on('scroll', function () {
	        if ((0, _jquery2.default)(this).scrollTop() > offset) {
	            (0, _jquery2.default)('#sidenav').find('.sidenav__link.is-fade').show();
	        } else {
	            (0, _jquery2.default)('#sidenav').find('.sidenav__link.is-fade').hide();
	        }
	    }).trigger('scroll');
	});

/***/ }
])
//# sourceMappingURL=0.8d0e6a589a407fafbd85.hot-update.js.map