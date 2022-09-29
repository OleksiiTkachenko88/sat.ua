const debounce = (func, interval = 200) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(func.bind(null, ...args), interval);
  };
}


window.throttle = (callback, wait, immediate = false) => {
  let timeout = null;
  let initialCall = true;

  return (...args) => {
    const callNow = immediate && initialCall;

    const run = () => {
      callback(...args);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      run();
    }

    if (!timeout) timeout = setTimeout(run, wait);
  };
};


const modalVisible = (modalId, status) => {
  const body = document.querySelector('body');
  const modal = document.getElementById(modalId);
  const form = modal.querySelector('form');

  const classBody = 'open-modal';
  const classModal = 'wrapper-modal--open';

  const modalsOpenList = document.querySelectorAll(classModal);
  if (modalsOpenList) modalsOpenList.forEach(el => el.classList.remove(classModal));

  if (form) form.reset();
  if (status) {
    body.classList.add(classBody);
    modal.classList.add(classModal);
  } else {
    body.classList.remove(classBody);
    modal.classList.remove(classModal);
  }
}

window.addEventListener('load', () => {
  const onChangeNumbers = ({ target }) => {
    const value = parseInt(target.value);
    const min = parseInt(target.dataset.min);
    const max = parseInt(target.dataset.max);
    if (value < min) target.value = min;
    if (value > max) target.value = max;
  }

  const elementsNumbers = document.querySelectorAll('[type="number"]');
  elementsNumbers.forEach(el => el.addEventListener('change', onChangeNumbers));

  if (!device.mobile()) $('select').styler();

  const onPanelBtnSubscribeClick = () => {
    const subscribeFormError = document.querySelector('.form-subscribe-modal__error');
    subscribeFormError.innerHTML = '';
    modalVisible('modalSubscribe', true)
  }

  const panelBtnSubscribe = document.querySelector('.panel-button.subscribe');
  panelBtnSubscribe.addEventListener('click', onPanelBtnSubscribeClick);

  const onModalClose = event => {
    if (event.target !== event.currentTarget) return;
    event.preventDefault();

    const modal = event.target.classList.contains('wrapper-modal')
      ? event.target
      : event.target.closest('.wrapper-modal');

    modalVisible(modal.id, false);
  };

  const modalCloseElList = document.querySelectorAll('.modal-close, .wrapper-modal');
  modalCloseElList.forEach(el => el.addEventListener('click', onModalClose));


  // --------------------------

//   hideTopWarning();
});

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
}

function openWindowMain(map, mark) {
  if (openwindow) openwindow.close();
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


$(document).ready(function () {
   deviceContacts();

   const topWarning = document.getElementById('topWarning');
   const { bottom } = topWarning.getBoundingClientRect();
   const header = document.querySelector('header');
   header.style.top = `${bottom}px`;

    $(window).scroll(function () {
        var top = $(document).scrollTop(),
            pointPanel = (($(document).height() - $(window).height()) / 2) - ($('.right-panel').height() / 2);
        var windW = $(window).width();




        if (windW > 767) {
            if (top > bottom) {
                $('header').css({
                    top: '0px',
                    left: '0px',
                    position: 'fixed'
                });
                $('header').addClass('fixed');
            } else {
                $('header').css({
                    top: bottom + 'px',
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
        } else {
          $('header').css({ top: top > bottom ? 0 : bottom + 'px' })
        }
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

    // if (!device.mobile()) {
    //     $('.calculate-wrapper .qty-wrap input, .calculate-wrapper .main-info-row input[type="text"]').on('focus', function () {
    //         $(this).attr('placeholder', '');
    //     }).on('blur', function () {
    //         $(this).attr('placeholder', '0');
    //     });
    // } else {
    //     $('.calculate-wrapper .qty-wrap input, .calculate-wrapper .main-info-row input[type="text"],.calculate-wrapper .price-range-details input[type="text"]').on('focus', function () {
    //         $(this).attr('placeholder', '');
    //     }).on('blur', function () {
    //         $(this).attr('placeholder', '0');
    //     });
    // }

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
            case 'pumb':
				$.ajax({
					url: "/bitrix/templates/sat_main/pumb.php",
					data: {"action": "getPumb", "sum": webTS,"ref": webTId},
					beforeSend: function() {
						$(".pay-btn-zone .lds-ellipsis").height($(self).height());
						$(".pay-btn-zone .lds-ellipsis").css("line-height", $(self).css('line-height'));
						$(self).hide();
						$(".pay-btn-zone .lds-ellipsis").show();
					},
					success: function(msg) {                        
                        msg = JSON.parse(msg);
						var url = msg.data[0].url;
                       // console.log(url);
						window.location.href = url;
					}
				})
			break;
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
