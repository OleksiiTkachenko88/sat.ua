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
var senderPhone = '911';

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

function valueDirections(id, pos) {
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

function reCalc(){
    $('.departure-order').css('display','none'); //убираем кнопку заказа, если было изменение
    $('.sender-submit').css('display',''); //отображаемкнопку расчета, если было изменение
    $('.error-depature').css('display','none'); //убираем ошибку из 1С
    $('.declaration-wrapper').slideUp(300); //скрываем ранее расчитанную стоимость
}

function showGruz(){
    $('.hidden-gruz').hide();
    $('#length-range-value').val(0);
    $('#width-range-value').val(0);
    $('#height-range-value').val(0);
   // $('.gruzType').css('display','');
    $('.type_auto').css('display','');
    $('.amountInfo').show();
    reCalc();  //убираем кнопку заказа, если было изменение 
    $(".depature-declared").css("display", "none"); 

}

function hideGruz(){
    $('.hidden-gruz').show();
    $('#length-range-value').val(0);
    $('#width-range-value').val(0);
    $('#height-range-value').val(0);
  //  $('.gruzType').css('display','none');
    $('.type_auto').css('display','none');
    $('.amountInfo').hide();
    reCalc();  //убираем кнопку заказа, если было изменение  
    $(".depature-declared").css("display", "none");
}

$('[name="weight"]').val(0).closest('.main-info-row').hide();
$('[name="totalweight"]').val(0).closest('.main-info-row').hide();
$('[name="volume"]').val(0).removeAttr('disabled').closest('.main-info-row').show();
$('[name="seatsAmount"]').attr({'min': 1});    
//Документы
$('[name="weight"]').val(1).attr({'min': '1', 'max':'1', 'disabled':'disabled'});
$('[name="totalweight"]').val('1');
$('[name="seatsAmount"]').val(1).closest('.main-info-row').hide();
$('[name="volume"]').val(0).closest('.main-info-row').hide();
$('#cargoDescriptionList-ref').val('a53aa0b8-25a6-11ec-9422-00505601031c'); //Описание груза Документы

hideGruz();

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

    $('#fromDir-ref').change(function(){
        check_office($(this), 'from', 1);
    });

    $('#fromDir-cityref').change(function(){
        check_office($(this), 'from', 0);
    });

    $('#toDir-ref').change(function(){
        check_office($(this), 'to', 1);
    });

    $('#toDir-cityref').change(function(){
        check_office($(this), 'to', 0);
    });

    $('#fromDir-ref').change(function(){
        check_office($(this), 'from', 1);
    }); 

    //Поиск физика отправителя
    $('#sender-phone').change(function(){
        senderPhone = $('#sender-phone').val();
        senderPhone = senderPhone.replace(/\D/g, '');
        $("#sender-person").autocomplete({
            source: '/bitrix/templates/sat_main/api.php?action=getPerson&phone=' + senderPhone,
            minLength: 3,
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (e, ui) {
                $("#sender-person").val(ui.item.value);              
                return false;
            },
            select: function (event, ui) {               
                $("#sender-person").val(ui.item.value); 
                if ($('#sender-org-ref').val()=='') { 
                $("#sender-org-ref").val(ui.item.ref).trigger('change'); 
                }             
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    //var noResult = {value: "", id: "", label: noResultInfo};
                  //  ui.content.push(noResult);
                }
            }
            });
    }); 

     //Поиск физика получателя
    $('#recipient-phone').change(function(){
        recipientPhone = $('#recipient-phone').val();
        recipientPhone = recipientPhone.replace(/\D/g, '');
        $("#recipient-person").autocomplete({
            source: '/bitrix/templates/sat_main/api.php?action=getPerson&phone=' + recipientPhone,
            minLength: 3,
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (e, ui) {
                $("#recipient-person").val(ui.item.value);              
                return false;
            },
            select: function (event, ui) {               
                $("#recipient-person").val(ui.item.value); 
                if ($('#recipient-org-ref').val()=='') { 
                $("#recipient-org-ref").val(ui.item.ref).trigger('change'); 
                }             
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    //var noResult = {value: "", id: "", label: noResultInfo};
                  //  ui.content.push(noResult);
                }
            }
            });
    }); 

    //Очистка ВГХ и остальных при фокусе
    $('.slider-range-value').focus(function(){
        if ($(this).val()=='0')
        $(this).val('');
    });

    $('[name="totalweight"]').focus(function(){
        if ($(this).val()=='0')
        $(this).val('');
    });

    $('[name="volume"]').focus(function(){
        if ($(this).val()=='0')
        $(this).val('');
    });

    $('[name="declaredCost"]').focus(function(){
        if ($(this).val()=='500')
        $(this).val('');
    });
    
 
   // $("#toDir-cityref").val(ui.item.id).trigger('change');
    $(document).on('change', '#type', function(){
        var type = $('.type-block li.selected').data('type');
     //   $('#toDir').val(document.getElementById('type').selectedIndex);
        $('[name="totalweight"]').val(0).closest('.main-info-row').hide();
        $('[name="volume"]').val(0).removeAttr('disabled').closest('.main-info-row').show();
        $('[name="seatsAmount"]').attr({'min': 1});        

        if( document.getElementById('type').selectedIndex == '0' ) { //Документы
            $('[name="weight"]').val(1).attr({'min': '1', 'max':'1', 'disabled':'disabled'});
            $('[name="totalweight"]').val('1');
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').hide();
            $('[name="volume"]').val(0).closest('.main-info-row').hide();
            $('#cargoDescriptionList-ref').val('a53aa0b8-25a6-11ec-9422-00505601031c'); //Описание груза Документы
            hideGruz();
        } else  if(( document.getElementById('type').selectedIndex == '1' )){ //Базовый
            var sub = $('.subtype-block .hidden-fields li.selected');
            var minWeight = 0;
            var maxWeight = (sub.data('max') && sub.data('max')!== 1)?sub.data('max'):"30000";
            $('[name="totalweight"]').val(minWeight).removeAttr('disabled').attr({'min': minWeight, 'max': maxWeight});
            $('[name="totalweight"]').val(minWeight).closest('.main-info-row').show();
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').show();
            $('#cargoDescriptionList-ref').val('b102c7ea-4836-11dd-a181-001a4d3b885e'); //Описание груза ТНС           
            //$('#cargoDescriptionList-ref').val(''); Описание груза Очищаем, в фунции showGruz отображаем поле
            //разблокируем, если вернулись с другого тарифа
            var subLength = 760;
            var subWidth = 760;
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
            $('#length-range').noUiSlider({
                range: [0, subLength],
                start: 0,
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
                start: 0,
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
                start: 0,
                handles: 1,
                step: 1,
                serialization: {
                    to: [$('#height-range-value')],
                    resolution: 1
                },
                slide: getHeightRange
            }, true);
         //   $('#fromDir').val('data-native-menu');
            showGruz();
        } else if(( document.getElementById('type').selectedIndex == '2' )){ //Паллета 
            document.querySelector('#labelSub').textContent = 'Підтип палети';
            var sub = $('.subtype-block .hidden-fields li.selected');
            var minWeight = 0;
            var maxWeight = (sub.data('max'))?sub.data('max'):"1000";
           // $('[name="weight"]').val(minWeight).removeAttr('disabled').attr({'min': minWeight, 'max': '1000'});
            $('[name="volume"]').closest('.main-info-row').hide();
            $('[name="seatsAmount"]').val(1).closest('.main-info-row').show();
            $('[name="totalweight"]').val(minWeight).closest('.main-info-row').show();
            $('#cargoDescriptionList-ref').val('b102c7ea-4836-11dd-a181-001a4d3b885e'); //Описание груза ТНС   
            // $('#cargoDescriptionList-ref').val('');       
            showGruz();
            //Костыль на время при выборе тарифа палеты
            $('#length-range-value').val('85');
            $('#width-range-value').val('65');  
            $('#length-range').attr('disabled', true);
            $('#width-range').attr('disabled', true);
            $('#length-range-value').attr('readonly', true);
            $('#width-range-value').attr('readonly', true);          
        } else if(( document.getElementById('type').selectedIndex == '3' )){ //Легковая шина
           // $('[name="weight"]').val(4).removeAttr('disabled').attr({'min': '4', 'max': '20'});
           document.querySelector('#labelSub').textContent = 'Підтип шини';
            $('[name="seatsAmount"]').val(1).attr({'min': '1', 'max': ''}).closest('.main-info-row').show();
            $('#cargoDescriptionList-ref').val('c7e94721-7601-11e8-9404-00505601031c'); //Описание груза Шины
            hideGruz();
            $('[name="volume"]').val(0).closest('.main-info-row').hide();
            $('[name="totalweight"]').val(4).closest('.main-info-row').show();
        } else if(( document.getElementById('type').selectedIndex == '4' )){//Грузовая шина
           // $('[name="weight"]').val(20).removeAttr('disabled').attr({'min': '20', 'max': ''});
           document.querySelector('#labelSub').textContent = 'Підтип шини';
            $('[name="seatsAmount"]').val(1).attr({'min': '1', 'max': ''}).closest('.main-info-row').show();
            $('#cargoDescriptionList-ref').val('c7e94721-7601-11e8-9404-00505601031c'); //Описание груза Шины
            hideGruz();            
            $('[name="volume"]').val(0).closest('.main-info-row').hide();
            $('[name="totalweight"]').val(20).closest('.main-info-row').show();
        }

        $('[name="declaredCost"]').val(500).attr({'min': '500', 'max': '100000000'});
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
    $(document).on('change', '#subtype', function(){
      //  var type = $('.type-block li.selected').data('type');
        var sub = $('.subtype-block .jq-selectbox__dropdown li.selected');
        if( document.getElementById('type').selectedIndex == '2' ) { //палета
            var subLength = sub.data('length');
            var subWidth = sub.data('width');
            var subHeight = sub.data('maxheight');
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

            if ($('.calculate-section').length && $('#length-range').length) {
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
        } else if( document.getElementById('type').selectedIndex == '0'  || document.getElementById('type').selectedIndex == '1' || document.getElementById('type').selectedIndex == '3' || document.getElementById('type').selectedIndex == '4' ) {
            var subLength = 760;
            var subLength2 = 760;
            var subWidth = 760;
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
    reCalc();  //убираем кнопку заказа, если было изменение  
    });

    $('[name="weight"], [name="seatsAmount"]').on('change keyup', function(){
       // $('[name="totalweight"]').val( $('[name="weight"]').val()*$('[name="seatsAmount"]').val() );
        
    });

//23.10.2019
    $('[name="seatsAmount"]').on('change keyup', function(){
        $('#volume').val(($('#length-range-value').val()*$('#height-range-value').val()*$('#width-range-value').val()*$('[name="seatsAmount"]').val()/1000000).toFixed(3));
    });
//

    $('[type="number"]').change(function(){
        reCalc();  //убираем кнопку заказа, если было изменение  
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

    //Разряды для декл стоимости
    /*$('[name="declaredCost"]').change(function(){
        var decCost =  $('[name="declaredCost"]').val();
        decCost = decCost.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        console.log(decCost);       
        $('[name="declaredCost"]').val(decCost);
    });*/

    $('[name="declaredCost"]').change(function(){
        var decCost =  $('[name="declaredCost"]').val();
        if (decCost >= 100000) {
            $(".depature-declared").css("display", "flex");
        } else {
            $(".depature-declared").css("display", "none");
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
    //attrDepartments();


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


            if (top > pointPanel) {
                $('.right-panel .show-on-scroll').css({
//28.08.2018
//                    'height': $('.right-panel .show-on-scroll')[0].scrollHeight + 'px',
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
/*
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
*/

    });
/*    var headerH, tableHeaderH, tableTop, paginOffset;
    if ($('.departments-table-header').length) {
        if ($(window).width() > 767 && $(window).width() <= 991) {
            headerH = $('header').height() - $('.sub-header').height();
            tableTop = ($('.departments-list-page').css('padding-top').replace('px', '') * 1) + $('.department-panel').outerHeight() - headerH;
            paginOffset = $('.news-pagination').offset().top  - ($('.news-pagination').css('margin-top').replace('px', '') * 1) - $('header').outerHeight() - $('.departments-table-header').outerHeight()/2;
        } else if ($(window).width() > 991) {
            //headerH = $('header').height();
			headerH = $('header').height() - $('.sub-header').height();
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
                if($(window).width() > 767 && $(window).width() <= 991) {
                    headerH = $('header').height() - $('.sub-header').height();
                    tableTop = ($('.departments-list-page').css('padding-top').replace('px', '') * 1) + $('.department-panel').outerHeight() - headerH;
                    paginOffset = $('.news-pagination').offset().top  - ($('.news-pagination').css('margin-top').replace('px', '') * 1) - $('header').outerHeight() - $('.departments-table-header').outerHeight()/2;
                } else if($(window).width() > 991) {
                    //headerH = $('header').height();
 					headerH = $('header').height()-$('.sub-header').height();
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
*/

    // $('.right-panel .panel-tooltip').each(function(){
    //     var text = $(this).text();
    //     $(this).html('<span>' + text + '</span>');
    // });

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

                $('.order-form').addClass('hidden-block');
                $('.order-link').removeClass('active');
            }
            if (!$(event.target).closest(".track-form, .track-link, .search-button, .close-search").length) {
                $('.track-form').addClass('hidden-block');
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
            $(this).attr('placeholder', '');
        });
    } else {
        $('.calculate-wrapper .qty-wrap input, .calculate-wrapper .main-info-row input[type="text"], .calculate-wrapper .price-range-details input[type="text"]').on('focus', function () {
            $(this).attr('placeholder', '');
        }).on('blur', function () {
            $(this).attr('placeholder', '');
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
        $.event.trigger({type: "check-to-date"});

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
    var todayObjMob = ddObj + '-' + mmObj + '-' + yyyyObj ; //This format i need for declaration

    if ($('.calculate-section').length) {
        // $('#datepicker1').val(todayObj);
        // $('.print-time').text(todayObj);
        // $('#datefield1').val(todayObjMob);

    }

    window.holydays = [];

    const dateStop = new Date();
    dateStop.setMonth(dateStop.getMonth() + 1);

    $.datetimepicker.setLocale(datepicker_lang);
    $('#datepicker1').datetimepicker({
        i18n: { uk: { dayOfWeekShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ] },
                ru: { dayOfWeekShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ] }  },
        timepicker: false,
        format: 'd.m.Y',
        dayOfWeekStart: 1,
        scrollMonth: false,
        mask: true,
        minDate: todayObj,
        maxDate: dateStop,
        beforeShowDay: date => [!window.holydays.includes(dateLib.formatDate('YYYY-MM-DD', date))],
        onSelect: function (selected) {
        }
    }).attr('readonly','readonly').attr('data-min', todayObj ).attr('disabled', true);

    $('#datepicker2').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        weekStart: 0,
        scrollMonth: false,
        mask: true,
        minDate: todayObj,
        maxDate: dateStop,
        beforeShowDay: date => [!window.holydays.includes(dateLib.formatDate('YYYY-MM-DD', date))],
        onSelect: function (selected) {
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
            var minDate = new Date( $( "#datepicker1" ).data( 'min' ) );
            var valDate = new Date( $( "#datepicker1" ).val() );
            if( minDate > valDate ){
                $( "#datepicker1" ).val(minDate);
            }
            $.event.trigger("check-to-date");
    });



    $(function () {
        //console.log(document.getElementById('sender-phone').value);
        senderPhone = document.getElementById('sender-phone').value;
        const getHolydays = async (cityRef) => {
            const params = new URLSearchParams();
            params.append('action', 'getHolydays');
            params.append('cityRef', cityRef);           
            const API_URL = '/bitrix/templates/sat_main/api.php';
            const response = await fetch(`${API_URL}?${params}`);
               if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
               window.holydays = await response.json();
               }

        var availableTags = [];   
        
        $("#fromDir").autocomplete({
            source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getTown',
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
                getHolydays(ui.item.id);
                $('#datepicker1').attr('disabled', false);
                $("#fromDir").val(ui.item.value);
                $("#fromDir-id").val('');
                $("#fromDir-ref").val('');
                $("#fromDir-cityref").val(ui.item.id).trigger('change');
                //---------220622
                
                place = ui.item.id;
                reCalc();  //убираем кнопку заказа, если было изменение  

                //поиск адресса отправителя
                $("#sender-address").autocomplete({
                    source: '/bitrix/templates/sat_main/api.php?action=getAddress&place=' + place,
                    minLength: 3,
                    open: function (event, ui) {
                        if (device.mobile() || device.tablet()) {
                            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                        }
                    },
                    focus: function (e, ui) {
                        $("#sender-address").val(ui.item.value);              
                        return false;
                    },
                    select: function (event, ui) {               
                        $("#sender-address").val(ui.item.value);               
                        return false;
                    },
                    response: function (event, ui) {
                        if (!ui.content.length) {
                            //var noResult = {value: "", id: "", label: noResultInfo};
                          //  ui.content.push(noResult);
                        }
                    }
                    });

                //Поиск юрика отправителя
                $("#sender-org").autocomplete({
                    source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getCompany',
                    minLength: 8,
                    open: function (event, ui) {
                        if (device.mobile() || device.tablet()) {
                            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                        }
                    },
                    focus: function (e, ui) {
                        $("#sender-org").val(ui.item.value);
                        return false;
                    },
                    select: function (event, ui) {               
                        $("#sender-org").val(ui.item.value);
                        $("#sender-org-ref").val(ui.item.ref).trigger('change'); 
                        $("#counterpartyType").val(ui.item.counterpartyType).trigger('change');//Для проверки возможности Ф1 отправителя         
                        return false;
                    },
                    response: function (event, ui) {
                        if (!ui.content.length) {
                            var noResult = {value: "", id: "", label: noResultInfo};
                            ui.content.push(noResult);
                        }
                    }
                });

                //Поиск юрика получателя
                $("#recipient-org").autocomplete({
                    source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getCompany',
                    minLength: 8,
                    open: function (event, ui) {
                        if (device.mobile() || device.tablet()) {
                            $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                        }
                    },
                    focus: function (e, ui) {
                        $("#recipient-org").val(ui.item.value);
                        return false;
                    },
                    select: function (event, ui) {               
                        $("#recipient-org").val(ui.item.value);
                        $("#recipient-org-ref").val(ui.item.ref).trigger('change'); 
                        $("#counterpartyTypeRecipient").val(ui.item.counterpartyType).trigger('change');//Для проверки возможности Ф1 получателя         
                        return false;
                    },
                    response: function (event, ui) {
                        if (!ui.content.length) {
                            var noResult = {value: "", id: "", label: noResultInfo};
                            ui.content.push(noResult);
                        }
                    }
                });

                //---------220622               
                $("#fromDir-cityrspref").val(ui.item.rspRef);
                $("#fromDir-delivery-tabs>li:eq(0)").find("a").removeClass("delivery-tab-deny");
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
            source:'/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getTown',
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
                $("#toDir-id").val('');
                $("#toDir-ref").val('');
                $("#toDir-cityref").val(ui.item.id).trigger('change');
                $("#toDir-cityrspref").val(ui.item.rspRef).trigger('change');
                $("#toDir-delivery-tabs>li:eq(0)").find("a").removeClass("delivery-tab-deny");
                if (!ui.item.rspList || ui.item.rspList == '' || typeof(ui.item.rspList) == undefined) {
                    $("#toDir-delivery-tabs>li:eq(0)").find("a").addClass("delivery-tab-deny");
                    $("#toDir-delivery-tabs>li:eq(1)").find("a").trigger("click");
                } else {
                    $("#toDir-delivery-tabs>li:eq(0)").find("a").removeClass("delivery-tab-deny");
                    $("#toDir-delivery-tabs>li:eq(0)").find("a").trigger("click");
                }
                $("#toDir-id").trigger('change');
                $.event.trigger("check-to-date");
                reCalc();  //убираем кнопку заказа, если было изменение  
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = {value: "", id: "", label: noResultInfo};
                    ui.content.push(noResult);
                }
            }
        }); 
        $("#cargoDescriptionList").autocomplete({
            source:'/bitrix/templates/sat_main/api.php?lang=&action=getCargoDescriptionList',
            minLength: 2,
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (e, ui) {
                $("#cargoDescriptionList").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#cargoDescriptionList").val(ui.item.label);
                $("#cargoDescriptionList-ref").val(ui.item.id).trigger('change');    
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
        if( $('[name="fromDir-type"]').val() != $('[name="toDir-type"]').val() ){
            $( '.delivery-tabs a.noactive' ).trigger( 'click' );
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
    $('#type_auto').on('change', function () {
        reCalc();  //убираем кнопку заказа, если было изменение  
    });
    $('#type').on('change', function () {
        $('#cargoDescriptionList-ref').val(''); //Описание груза ref
        $('#cargoDescriptionList').val(''); //Описание груза 
        reCalc();  //убираем кнопку заказа, если было изменение  
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

    window.addEventListener('load', () => {
    const phone = document.getElementById('sender-phone');
    const phoneRecipient = document.getElementById('recipient-phone');
  
    $(phone).mask('+38(099)999-99-99');
    phone.addEventListener('click', event => {
      setTimeout(() => {
        const index = event.target.value.indexOf('_');
        if (index !== -1) event.target.setSelectionRange(index, index);
      }, 50);
    });

    $(phoneRecipient).mask('+38(099)999-99-99');
    phoneRecipient.addEventListener('click', event => {
      setTimeout(() => {
        const index = event.target.value.indexOf('_');
        if (index !== -1) event.target.setSelectionRange(index, index);
      }, 50);
    });
  
  
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
