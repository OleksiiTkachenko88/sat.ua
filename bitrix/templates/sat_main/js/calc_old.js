$('.order-not-callback').css('display','none');
//Скрываем input поля для ввода данных отправителя
function inputSenderVisibleNot (){
	$('.sender-info .delivery-row').css('display','none');
	$('.loader').css('display','none');
	$('.address').val();
	$('.order-not-callback').css('display','none');
	
}
//отображаем input поля для ввода данных отправителя
function inputSenderVisible(){
	$('.sender-info .delivery-row').css('display','');
	$('.loader').css('display','none');
	$('.order-not-callback').css('display','inline-flex');
}

var addServicesNew = []; //Для формирования услуг при расчете выезда, чтоб отображать при заказе выезда

!function(wnd, $, undefined){
	var Calc = function(options) {
        this.Init(options);
    }
	Calc.prototype = {
        constructor : Calc,
        defaults : {},
        params : {},
        Init : function(options) {
			if ($("input[name='fromDir-type']").length > 0) {
				this.params = $.extend({}, this.defaults, options);
				this.checkTabs();
				if ($("input[name='fromDir-sender']").val()=='true') {
					this.checkSenderServices();
					this.checkTypes();
					this.bindTabs();
					this.bindToDate();
					this.bindSenderCalc();
					this.bindDepartureSend();
				}
				else if($("input[name='fromDir-sender']").val()=='false') {
					this.checkDeliveryServices();
					this.getDeliveryTrack();
					this.bindToDate();
					this.bindDeliveryCalc();
                    this.bindDeliverySend();
					//this.bindDeliverySend();

				}
				else
				{
				this.checkServices();
				this.checkTypes();
				this.bindTabs();
				this.bindToDate();
				this.bindCalc();
				}
			}
		},
		checkTabsTime : function() {
			var self = this;
			if ($("input[name='fromDir-type']").val() == '2') {
				var sel = $("#fromDir-delivery-type").val();
				if (!sel) return;
				var objFrom = departureConditions.filter(function (obj) {
                    return obj.ref == sel;
                })[0];
				var sendingTime = objFrom.timeTable[0].sendingTime;
				var now = new Date();
				var d = new Date();
				var todayDate = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + '.' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '.' + d.getFullYear();
				var nowHour = now.getHours();
				var nowMin = now.getMinutes();
				if(nowMin=='0'|| nowMin=='00'){
					var checkTime = (nowHour<10)? '0'+nowHour: nowHour +':00';
				} else {
					var checkTime = (nowHour+1<10)? '0'+(nowHour+1): (nowHour+1) +':00';

				}

				if( $('#datepicker1').val()==todayDate ){
					$('.fromTime .jq-selectbox__select-text:first').text(checkTime);
					$('.fromTime .jq-selectbox__dropdown:first li').css('display', 'block');
					$('.fromTime .jq-selectbox__dropdown:first li.selected').removeClass('selected sel');
					$('.fromTime .jq-selectbox__dropdown:first li:contains("'+checkTime+'")').addClass('selected sel').prevAll().css('display', 'none');

				} else {
					$('.fromTime .jq-selectbox__dropdown:first li').css('display', 'block');
				}
				var sendingTimeHour = sendingTime.split(":")[0];
				if (nowHour > sendingTimeHour && todayDate == $("#datepicker1").val()) {
					if (todayDate == $("#datepicker1").val()) {//если выбрано сегодня, добавляем день к выбранному в календаре
						var tmp = $("#datepicker1").val().split('.');
						var dd = tmp[2] + '-' +  tmp[1] + '-' + tmp[0];
						var tomorrow = new Date(dd);
						tomorrow.setDate(tomorrow.getDate() + 1);
						var ddObj = tomorrow.getDate();
						var mmObj = tomorrow.getMonth() + 1; //January is 0!
						var yyyyObj = tomorrow.getFullYear();
						if (ddObj < 10) {
							ddObj = '0' + ddObj;
						}
						if (mmObj < 10) {
							mmObj = '0' + mmObj;
						}
						var tomorrowObj = ddObj + '.' + mmObj + '.' + yyyyObj;
						var tomorrowObjMob = yyyyObj + '-' + mmObj + '-' + ddObj;
						if ($('.calculate-section').length) {
							$('#datepicker1').val(tomorrowObj);
							$('.print-time').text(tomorrowObj);
							$('#datefield1').val(tomorrowObjMob);
						}
						$('.fromTime .jq-selectbox__select-text:first').text('09:00');
						$('.fromTime .jq-selectbox__dropdown:first li').css('display', 'block');
						$('.fromTime .jq-selectbox__dropdown:first li.selected').removeClass('selected sel');
						$('.fromTime .jq-selectbox__dropdown:first li:contains("09:00")').addClass('selected sel');
						$('.fromTime .jq-selectbox__select-text:last').text('12:00');
						$('.fromTime .jq-selectbox__dropdown:last li.selected').removeClass('selected sel');
						$('.fromTime .jq-selectbox__dropdown:first li:contains("12:00")').addClass('selected sel');
					}
					//теперь ставим минимальную дату "на завтра" в календарь
					var d = new Date();
          d.setDate(d.getDate() + 1);
					$('#datepicker1').datetimepicker({
						minDate: d
					}).attr('data-min', d );
					$.event.trigger("check-to-date");
				}
			}
			if ($("input[name='toDir-type']").val() == '2') {
				var sel = $("#toDir-delivery-type").val();
				if (!sel) return;
				var objTo = deliveryCondition.filter(function (obj) {
                    return obj.ref == sel;
                })[0];
				var sendingTime = objTo.timeTable[0].sendingTime;
				var sendingTimeHour = sendingTime.split(":")[0];
				var now = new Date();
				var nowHour = now.getHours();
				var d = new Date();
				var todayDate = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + '.' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)) + '.' + d.getFullYear();
				if (nowHour > sendingTimeHour && todayDate == $("#datepicker2").val()) {
					if (todayDate == $("#datepicker2").val()) {//если выбрано сегодня, добавляем день к выбранному в календаре
						var tmp = $("#datepicker2").val().split('.');
						var dd = tmp[2] + '-' +  tmp[1] + '-' + tmp[0];
						var tomorrow = new Date(dd);
						tomorrow.setDate(tomorrow.getDate() + 1);
						var ddObj = tomorrow.getDate();
						var mmObj = tomorrow.getMonth() + 1; //January is 0!
						var yyyyObj = tomorrow.getFullYear();
						if (ddObj < 10) {
							ddObj = '0' + ddObj;
						}
						if (mmObj < 10) {
							mmObj = '0' + mmObj;
						}
						var tomorrowObj = ddObj + '.' + mmObj + '.' + yyyyObj;
						var tomorrowObjMob = yyyyObj + '-' + mmObj + '-' + ddObj;
						if ($('.calculate-section').length) {
							$('#datepicker2').val(tomorrowObj);
							$('.print-time').text(tomorrowObj);
							$('#datefield2').val(tomorrowObjMob);
						}
					}
					//теперь ставим минимальную дату "на завтра" в календарь
					var d = new Date();
					d.setDate(d.getDate() + 1);

					$('#datepicker2').datetimepicker({
						minDate: d
					}).attr('data-min', d );
					$.event.trigger("check-to-date");
				}
			}
		},
		checkTabs : function() {
			// 1 - склад, 2 - двери
			var fromDirType = $("#fromDir-delivery-tabs").find("a.active").hasClass("hide-time") ? '1' : '2';
			var toDirType = $("#toDir-delivery-tabs").find("a.active").hasClass("hide-time") ? '1' : '2';
			$("input[name='fromDir-type']").val(fromDirType);
			$("input[name='toDir-type']").val(toDirType);
			this.checkTabsTime();
		},
		bindTabs : function() {
			var self = this;
			$(document).on("renew-tab-type", function(){
				self.checkTabs();
			})
		},
		bindToDate : function() {
			var self = this;
			$(document).on("check-to-date", function(){
    			var todayObj = new Date();
				var fromDate = $("#datepicker1").val();
				var fromRsp = $("#fromDir-ref").val() ? $("#fromDir-ref").val() : $("#fromDir-cityrspref").val();
				var toRsp = $("#toDir-ref").val() ? $("#toDir-ref").val() : $("#toDir-cityrspref").val();
				if (fromDate && fromRsp && toRsp) {
					const delivery = $("input[name='toDir-type']").val() == '2' ? '&delivery=1' : ''; //доставка груза до дверей получателя
					var data2 = `action=getDeliveryTerms${delivery}&rspSender=${fromRsp}&rspRecipient=${toRsp}&date=${fromDate}&lang=${api_lang}`;
					//var data2 = 'action=getDeliveryTerms&rspSender=' + fromRsp + '&rspRecipient=' + toRsp + '&date=' + fromDate + '&lang=' + api_lang;
					//Добавлена передача параметра delivery для корректного расчета сроков доставки
					$.ajax({
						url: "/bitrix/templates/sat_main/api.php",
						data: data2,
						type: "GET",
						dataType : 'json',
						beforeSend:function(){

						},
						success: function(msg) {
							if (msg.success && msg.success != 'false') {
								var info = msg.data[0];
								if (info.date) {
									$("#datepicker2").val(info.date);
									var tmp = info.date.split('.');
									var dd = tmp[2] + '-' +  tmp[1] + '-' + tmp[0];
									$('#datepicker2').datetimepicker({
										minDate: new Date(dd)
									}).attr('data-min', dd );
								}
								if ($("input[name='toDir-type']").val() == '2' && info.time) {

								}
							}
						}
					})
				} else {
					console.log('12');
				}
			})
		},
		checkTypes: function(){
			var data = {
				"action":"getTypes",
				"lang" : api_lang
			};
			$.ajax({
				url: "/bitrix/templates/sat_main/api.php",
				data: data,
				type: "GET",
				dataType : 'json',
				beforeSend:function(){

				},
				success: function(msg) {
					if( msg.type!='' ){
						$('#type').html(msg.type).trigger('refresh');
						// $('#type').closest('jqselect').find('ul').html(msg.divtype);
					}
					if( msg.subtype!='' ){
						$('#subtype').html(msg.subtype).trigger('refresh');
						// $('#subtype').closest('jqselect').find('ul').html(msg.divsubtype);
					}
				}
			});
		},
		checkServices: function(){
			var data = {
				"action":"getServices",
				"lang" : api_lang
			};
			$.ajax({
				url: "/bitrix/templates/sat_main/api.php",
				data: data,
				type: "GET",
				dataType : 'html',
				beforeSend:function(){

				},
				success: function(msg) {
					if ( msg != '') {
						$('.services-block').html(msg).slideDown();
					}
				}
			});
		},
		checkSenderServices: function(){
			var data = {
				"action":"getSenderServices",
				"lang" : api_lang
			};
			$.ajax({
				url: "/bitrix/templates/sat_main/api.php",
				data: data,
				type: "GET",
				dataType : 'html',
				beforeSend:function(){

				},
				success: function(msg) {
					if ( msg != '') {
						$('.services-block').html(msg).slideDown();
					}
				}
			});
		},
		checkDeliveryServices: function(){
			var data = {
				"action":"getDeliveryServices",
				"lang" : api_lang
			};
			$.ajax({
				url: "/bitrix/templates/sat_main/api.php",
				data: data,
				type: "GET",
				dataType : 'html',
				beforeSend:function(){

				},
				success: function(msg) {
					if ( msg != '') {
						$('.services-block').html(msg).slideDown();
					}
				}
			});
		},

		getDeliveryTown: function(){
			var data = {
				"action": "getDeliveryTown",
				"lang" : api_lang,
				"toCityRef": $('#toDir-cityref').val(),
			}
			$.ajax({
				url: "/bitrix/templates/sat_main/api.php",
				// url: "https://api.sat.ua/v1.0/calc/json",
				data: data,
				type: "GET",
				dataType : 'html',
				success: function(msg) {
					msg = JSON.parse(msg);
					if( msg.success === "true" ){
						var toCity = msg.data[0].description+' - '+msg.data[0].district+' - '+msg.data[0].region;
						$('#toDir').val( toCity );
						$('#fromDelivery').val($('#toDir').val());
					}
				}
			});
		},
		bindCalc: function(){
			var self = this;
			$(document).on("submit-to-calc", function(){
				$('.declaration-wrapper').slideUp(300);
				$('.error').removeClass('error');
				var a = $(this),
				valid = false;

				if( ($('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="") ||
					($('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="") ){
					$('body, html').animate({
						scrollTop: $('.calculate-wrapper').offset().top-50
					}, 500);
					if( $('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="" ){
						$('#fromDir').addClass('error');
					}
					if( $('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="" ){
						$('#toDir').addClass('error');
					}
				} else {
					valid = true;

				}

				if(valid){
					var services = [];
					var ss = $('.service:checked');
					$('.service:checked').each(function(i){
						services[i] = {
							"service": $(this).data('ref'),
	                		"count": $(this).closest('.options-row-item').find('.qty-wrap input').val()
						}
					});
					var data = {
						"action": "global_calc",
						// ID - свой идентификатор набора параметров. Возвращается после расчета
						// "lang": api_lang,
						"rspSender": $('#fromDir-ref').val(),//'3f5c127b-9336-11da-9860-00024407fbce', //$('#fromDir-ref').val(), идентификатор отделения отправления
						"townSender": $('#fromDir-cityref').val(), //"3f5c127b-9336-11da-9860-00024407fbce", //$('#fromDir-cityref').val(), // идентификатор города отправления
						"rspRecipient": $('#toDir-ref').val(), //'8d7f5ea4-9436-11dd-98c6-001cc0108cd1', //$('#toDir-ref').val(), идентификатор отделения получения
						"townRecipient": $('#toDir-cityref').val(), //"8d7f5ea4-9436-11dd-98c6-001cc0108cd1", //$('#toDir-cityref').val(), //идентификатор города получения
						"declaredCost" : $('[name="declaredCost"]').val(), // declaredCost - заявленная стоимость
						"cargoType": $('.subtype-block li.selected').data('ref'), //$('[name="type"]').val(),//$('[name="type"]').val(), //идентификатор вида груза
						"seatsAmount": $('[name="seatsAmount"]').val(),//количество мест
						"weight": ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val(),//1, //$('[name="weight"]').val(),//вес груза
						"width": $('[name="width"]').val(),//ширина всех мест отправления
						"length": $('[name="length"]').val(),//длина всех мест отправления
						"height" : $('[name="height"]').val(),//высота всех мест отправления
						"volume" : $('[name="volume"]').val(),//объем груза
						"departure" :  ($("input[name='fromDir-type']").val() == '2')? 1: 0, //доставка груза до дверей получателя
						"delivery" : ($("input[name='toDir-type']").val() == '2')? 1: 0, //выезд за грузом до дверей отправителя
						// "departureCondition": $('[name="weight"]').val(),//дополнительное условие выезда за грузом
						// "deliveryCondition": $('[name="weight"]').val(),//дополнительное условие доставки груза
						"addServices": services
					}
					if( $("input[name='fromDir-type']").val() == '2' ){
						data['departureCondition'] = $('#fromDir-delivery-type option:contains('+$('#fromDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}

					if( $("input[name='toDir-type']").val() == '2' ){
						data['deliveryCondition'] = $('#toDir-delivery-type option:contains('+$('#toDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}
					$.ajax({
						url: "/bitrix/templates/sat_main/api.php?lang="+api_lang,
						// url: "https://api.sat.ua/v1.0/calc/json",
						data: data,
						type: "GET",
						dataType : 'html',
						beforeSend:function(){
							a.parents("div").find(".loader").show();
							$('.calculate-section').css({'opacity':'0.6'});
						},
						success: function(msg) {
							msg = JSON.parse(msg);
							$('.calculate-section').css({'opacity':'1'});
							$('.advS').remove();
							if( msg.success === "true" ){
								var subtarif = msg.data[0].tarif;
								var total = msg.data[0].cost;
								var creation = msg.data[0].creationCost;
								var insurance = msg.data[0].insuranceCost;
								var departure = msg.data[0].departureCost;
								var delivery = msg.data[0].deliveryCost;
								var transport = total - (creation + insurance + departure + delivery);

								if( msg.data[0].addServices ){
									$('.advservices').show();
									for(var i=0; i<msg.data[0].addServices.length; i++ ){
										var t = $('[data-ref="'+msg.data[0].addServices[i].service+'"]').next().next().text();
										console.log(t);
										console.log( t.match(/\s[В|В|в|в|b|B]\s/) );
										if( t.match(/\(.+\)$/) ){
											t = t.replace(/\(/, '</span> / ');
											t = t.replace(/\)/, '');
										} else if( t.match(/ в /) ){
											t = t.replace(/ в /, '</span> / ');
										} else {
											t += "</span>";
										}
										var ss = '<tr class="advS"><td class="upper"><span class="dark"><i class="fa fa-check"aria-hidden="true"></i>'+t+'</td><td class="dark right">'+msg.data[0].addServices[i].cost+' грн</td></tr>';
										transport -= msg.data[0].addServices[i].cost;

										$('.advservices tbody').append(ss);

									}
								} else {
									$('.advservices').hide();
								}
								$('.fromType').text( $('#fromDir-delivery-tabs a.active span').text() );
								$('.toType').text( $('#toDir-delivery-tabs a.active span').text() );
								$('.fromDate').text( $('#datepicker1').val() );
								if( $('#datepicker2').val()=='__.__.____' || $('#datepicker2').val()=='') {
								 	$('#datepicker2').val(msg.data[0].incomingDate);
								}
								$('.toDate').text( $('#datepicker2').val() );
								var from = $('#fromDir').val();
								var to = $('#toDir').val();
								if( from.match(/\s\-\s/)!=-1 ){
									var f = from.split(/\s\-\s/);
									from = f[0];
								}
								if( to.match(/\s\-\s/)!=-1 ){
									var t = to.split(/\s\-\s/);
									to = t[0];
								}
								$('.fromCity').text( from );
								$('.toCity').text( to );

								var type = $('.type-block li.selected').data('type');

								$('.hidden_dec').css('display', 'none');
								$('.'+type+'_show').css('display', 'table-row');
								$('.decSubtype').text( subtarif );
								$('#decCost').text( $('[name="declaredCost"]').val() );
								$('#decAva').text( $('[name="seatsAmount"]').val() );
								$('#decVol').text( $('[name="volume"]').val() );
								$('.'+type+'_show #decWid').text( $('[name="width"]').val() );
								$('.'+type+'_show #decLen').text( $('[name="length"]').val() );
								$('.'+type+'_show #decHei').text( $('[name="height"]').val() );
								$('.decWei').text( ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val() );


								$('#decDimen').text( transport );
								$('#decDeparture').text( departure );
								( departure > 0 )?$('.departure_cost').css('display', 'table-row'):"";
								$('#decDelivery').text( delivery );
								( delivery > 0 )?$('.delivery_cost').css('display', 'table-row'):"";

								$('#decCreation').text( creation );
								$('#decInsurance').text( insurance );

								$('#totalCost').text(total);
								$('.decType').text( $('.type-block li.selected').text() );

						        $('.declaration-wrapper').slideDown(300);
						    } else {
						    }

						},
						error: function( data){
						}
					})
				}
			});
		},
		bindSenderCalc: function(){
			var self = this;
			$(document).on("submit-to-calc-sender", function(){
				$('.declaration-wrapper').slideUp(300);
				$('.error').removeClass('error');
				var a = $(this),
				valid = false;
				if( ($('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="") ||
					($('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="") ||
				  /*$('#sender-address').val()=='' ||
					$('#sender-person').val()=="" ||
                    $('#sender-phone').val()=="" */ 
                //    $('#cargoDescriptionList-ref').val()=='' || 
					$('[name="totalweight"]').val()=='0' ||
					$('#datepicker1').val()=="__.__.____") {
					$('body, html').animate({
						scrollTop: $('.calculate-wrapper').offset().top-50
					}, 500);
					if( $('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="" ){
						$('#fromDir').addClass('error');
					}
					if( $('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="" ){
						$('#toDir').addClass('error');
					}
					if( $('#cargoDescriptionList-ref').val()=='' ){
						$('#cargoDescriptionList').addClass('error');
					}/*
					if( $('#sender-person').val()=='' ){
						$('#sender-person').addClass('error');
					}
					if( $('#sender-phone').val()=='' ){
						$('#sender-phone').addClass('error');
                   }
                */
                    if( $('#datepicker1').val()=="__.__.____"){
						$('#datepicker1').addClass('error');
					}
					if( $('[name="totalweight"]').val()=='0'){
						$('[name="totalweight"]').addClass('error');
					}
					//Тариф Палеты, обязательно высота
					if(( $('[name="height"]').val()=='0') &&  ( document.getElementById('type').selectedIndex == '2' )){ //палета
						$('[name="height"]').addClass('error');
						$('body, html').animate({
							scrollTop: $('.calculate-wrapper').offset().top-50
						}, 500);
					}
					//Тариф Базовый, обязательно ДШВ
					if(( $('[name="length"]').val()=='0') &&  ( document.getElementById('type').selectedIndex == '1' )){ //палета
						$('[name="length"]').addClass('error');
						$('body, html').animate({
							scrollTop: $('.calculate-wrapper').offset().top-50
						}, 500);
					} 
					if(( $('[name="width"]').val()=='0') &&  ( document.getElementById('type').selectedIndex == '1' )){ //палета
						$('[name="width"]').addClass('error');
						$('body, html').animate({
							scrollTop: $('.calculate-wrapper').offset().top-50
						}, 500);
					}
					if(( $('[name="height"]').val()=='0') &&  ( document.getElementById('type').selectedIndex == '1' )){ //палета
						$('[name="height"]').addClass('error');
						$('body, html').animate({
							scrollTop: $('.calculate-wrapper').offset().top-50
						}, 500);
					}

					
				} else {
					valid = true;								


				}

				if(valid){					
					var services = [];	
							
						
					/* Запись из выбранных услуг, услуги убрали 07072022
					var ss = $('.service:checked');
					$('.service:checked').each(function(i){
						services[i] = {
							"service": $(this).data('ref'),
	                		"count": $(this).closest('.options-row-item').find('.qty-wrap input').val()
						}
					});*/
					/*07072022 добавил обработку вида загрузки с подстановкой доп услуги */
					if ( document.getElementById("type_auto").selectedIndex == '2' ){
						services[0] = {
							"service": "3d2bf7a6-ca02-11e8-9405-00505601031c",
							"count": "1"
						}
					}
					if ( document.getElementById("type_auto").selectedIndex == '3' ){
						services[0] = {
							"service": "e68659ec-6460-11ea-940d-00505601031c",
							"count": "1"
						}
					}					
					
					var data = {
						"action": "global_calc",
						// ID - свой идентификатор набора параметров. Возвращается после расчета
						// "lang": api_lang,
						"rspSender": $('#fromDir-ref').val(),//'3f5c127b-9336-11da-9860-00024407fbce', //$('#fromDir-ref').val(), идентификатор отделения отправления
						"townSender": $('#fromDir-cityref').val(), //"3f5c127b-9336-11da-9860-00024407fbce", //$('#fromDir-cityref').val(), // идентификатор города отправления
						"rspRecipient": $('#toDir-ref').val(), //'8d7f5ea4-9436-11dd-98c6-001cc0108cd1', //$('#toDir-ref').val(), идентификатор отделения получения
						"townRecipient": $('#toDir-cityref').val(), //"8d7f5ea4-9436-11dd-98c6-001cc0108cd1", //$('#toDir-cityref').val(), //идентификатор города получения
						"declaredCost" : $('[name="declaredCost"]').val(), // declaredCost - заявленная стоимость
						"cargoType": $('.subtype-block li.selected').data('ref'), //$('[name="type"]').val(),//$('[name="type"]').val(), //идентификатор вида груза
						"sender": $('#sender-org-ref').val(), 
						"senderAddress": $('#sender-address').val(), //senderAddress - адрес отправителя
						"contactSender": $('#sender-person').val(), //contactSender - ФИО контактного лица
						"senderPhone ": $('#sender-phone').val(), //senderPhone - телефон отправителя
						"additionalInformation": $("textarea[name='sender-textarea']").val(), //additionalInformation - примечание

						"seatsAmount": $('[name="seatsAmount"]').val(),//количество мест
						"weight": ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val(),//1, //$('[name="weight"]').val(),//вес груза
						"width": $('[name="width"]').val(),//ширина всех мест отправления
						"length": $('[name="length"]').val(),//длина всех мест отправления
						"height" : $('[name="height"]').val(),//высота всех мест отправления
						"volume" : $('[name="volume"]').val(),//объем груза
						"departure" :  ($("input[name='fromDir-type']").val() == '2')? 1: 0, //доставка груза до дверей получателя
						"delivery" : ($("input[name='toDir-type']").val() == '2')? 1: 0, //выезд за грузом до дверей отправителя
						// "departureCondition": $('[name="weight"]').val(),//дополнительное условие выезда за грузом
						// "deliveryCondition": $('[name="weight"]').val(),//дополнительное условие доставки груза
						"addServices": services
					}
					if( $("input[name='fromDir-type']").val() == '2' ){
						data['departureCondition'] = $('#fromDir-delivery-type option:contains('+$('#fromDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}

					if( $("input[name='toDir-type']").val() == '2' ){
						data['deliveryCondition'] = $('#toDir-delivery-type option:contains('+$('#toDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}
					$.ajax({
						url: "/bitrix/templates/sat_main/api.php?lang="+api_lang,
						data: data,
						type: "GET",
						dataType : 'html',
						beforeSend:function(){
							$('.loader').css('display','inline-block');
							$('.calculate-section').css({'opacity':'0.6'});
						},
						success: function(msg) {
							msg = JSON.parse(msg);
							$('.calculate-section').css({'opacity':'1'});
							$('.advS').remove();
							if( msg.success === "true" ){
								$('.departure-order').css('display',''); //отображаем кнопку заказа
    							$('.sender-submit').css('display','none'); //убираем кнопку расчета							
								//отображаем поля для ввода данных отправителя
								inputSenderVisible();
								$('body, html').animate({
									scrollTop: $('.calculate-wrapper').offset().top+1200
								}, 500);								

                document.getElementById('orderNotCallback').classList.remove('order-not-callback--hidden');

								var subtarif = msg.data[0].tarif;
								var total = msg.data[0].cost;
								var creation = msg.data[0].creationCost;
								var insurance = msg.data[0].insuranceCost;
								var departure = msg.data[0].departureCost;
								var delivery = msg.data[0].deliveryCost;
								var transport = total - (creation + insurance + departure + delivery);

								if( msg.data[0].addServices ){
									$('.advservices').show();								
									for(var i=0; i<msg.data[0].addServices.length; i++ ){
										var t = $('[data-ref="'+msg.data[0].addServices[i].service.description+'"]').next().next().text();
										var serv = $('[data-ref="'+msg.data[0].addServices[i].service+'"]');
										serv.attr('data-cost', msg.data[0].addServices[i].cost);
										if( t.match(/\(.+\)$/) ){
											t = t.replace(/\(/, '</span> / ');
											t = t.replace(/\)/, '');
										} else if( t.match(/ в /) ){
											t = t.replace(/ в /, '</span> / ');
										} else {
											t += "</span>";
										}
										var ss = '<tr class="advS"><td class="upper"><span class="dark"><i class="fa fa-check"aria-hidden="true"></i>'+msg.data[0].addServices[i].service.description+'</td><td class="dark right">'+msg.data[0].addServices[i].cost+' грн.</td></tr>';
										transport -= msg.data[0].addServices[i].cost;
										addServicesNew[i] = msg.data[0].addServices[i]; //Записываем услуги, чтоб вывесьти в итоге заказа
										$('.advservices tbody').append(ss);
									}
								} else {
									$('.advservices').hide();
								}
								$('#fromAddress').text($('#sender-address').val());
								$('#fromSender').text($('#sender-person').val());
								$('#fromPhone').text($('#sender-phone').val());
								$('.fromDate').text( $('#datepicker1').val() );
								if( $('#datepicker2').val()=='__.__.____' || $('#datepicker2').val()=='') {
								 	$('#datepicker2').val(msg.data[0].incomingDate);
								}
								$('.toDate').text( $('#datepicker2').val() );
								var from = $('#fromDir').val();
								var to = $('#toDir').val();
								if( from.match(/\s\-\s/)!=-1 ){
									var f = from.split(/\s\-\s/);
									from = f[0];
								}
								if( to.match(/\s\-\s/)!=-1 ){
									var t = to.split(/\s\-\s/);
									to = t[0];
								}
								$('.fromCity').text( from );
								$('.toCity').text( to );

								var type = $('.type-block li.selected').data('type');

								$('.hidden_dec').css('display', 'none');
								$('.'+type+'_show').css('display', 'table-row');
								$('.decSubtype').text( subtarif );
								$('#decCost').text( $('[name="declaredCost"]').val() );
								$('#decAva').text( $('[name="seatsAmount"]').val() );
								$('#decVol').text( $('[name="volume"]').val() );
								$('.'+type+'_show #decWid').text( $('[name="width"]').val() );
								$('.'+type+'_show #decLen').text( $('[name="length"]').val() );
								$('.'+type+'_show #decHei').text( $('[name="height"]').val() );
								$('.decWei').text( ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val() );

								$('#decDimen').text( transport );
								$('#decDeparture').text( departure );
								( departure > 0 )?$('.departure_cost').css('display', 'table-row'):"";
								$('#decDelivery').text( delivery );
								( delivery > 0 )?$('.delivery_cost').css('display', 'table-row'):"";

								$('#decCreation').text( creation );
								$('#decInsurance').text( insurance );

								$('#totalCost').text(total);
								$('.decType').text( $('.type-block li.selected').text() );                            
								$('#departureNote').text($("textarea[name='sender-textarea']").val());

								$('#departureSuccess').text('');
								$('#deparuteSuccessZone').css('display', 'none');


								//$('.sender-submit').css('display','none');
								$('.departure-order').css('display','');
								if( $("input[name='toDir-type']").val() == '2' ){
									$('#toAddress').empty();
								}
						        $('.declaration-wrapper').slideDown(300);
								$('.error-depature').css('display','none');								

						    } else { 
								//Добавил вывод ошибки из 1С в расчете выезда 06072022
								var err_text = msg.error.note;
								$('.error-depature').css('display','flex');
								$('.error-depature').text(err_text);
								$('.loader').css('display','none');
						    }



						},
						error: function( data){
						}
					})
				}
			});
		},

		bindDepartureSend: function(){
			var self = this;
			$(document).on("submit-to-departure-order", function(){
			$('.declaration-wrapper').slideUp(300);
				$('.error').removeClass('error');
				var a = $(this),
				valid = false;

				if( ($('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="") ||
					($('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="") ||
					$('#sender-address').val()=='' ||
					$('#sender-person').val()=="" ||
                    $('#sender-phone').val()=="" ||
				   ($('#counterpartyType').val() != "0" && ( document.getElementById("paymentMethod").selectedIndex == '1' )) ||
					//Получатель
				   ($('#counterpartyTypeRecipient').val() != "0" && ( document.getElementById("paymentMethod").selectedIndex == '3' )) ||
					$('#recipient-phone').val()=="" && ( document.getElementById("paymentMethod").selectedIndex > '1' ) ||
					$('#recipient-person').val()=="" && ( document.getElementById("paymentMethod").selectedIndex > '1' )
                    ){					
						var err_text = 'Заповніть всі необхідні поля';
						$('.error-depature').css('display','flex');
						$('.error-depature').text(err_text);
				
					//Если выбран Ф1 и не выбран по коду отправитель									
					if($('#counterpartyType').val() != "0" && $('#counterpartyType').val() != "1" && ( document.getElementById("paymentMethod").selectedIndex == '1' )){
						$('#sender-org').addClass('error');
						var err_text = (api_lang=='uk')?"Для вибору безготівкової оплати, оберіть відправника за кодом ЄДРПОУ/ІПН":
						                                "Для выбора безналичной оплаты, выберите отправителя по коду ЕГРПОУ/ИНН";
						$('.error-depature').css('display','flex');
						$('.error-depature').text(err_text);
					}

					//Если выбран Ф1 и нет договора	отправитель
					if($('#counterpartyType').val() == "1" && ( document.getElementById("paymentMethod").selectedIndex == '1' )){
						$('#sender-org').addClass('error');
						var err_text = (api_lang=='uk')?"У відправника відсутній активний договір з компанією, для заключення договору відправте документи на info@sat.ua":
						                                "У отправителя отсутствует активный договор з компанией, для заключения договора отправте документы на info@sat.ua";
						$('.error-depature').css('display','flex');
						$('.error-depature').text(err_text);
					}	

					//Если выбрали оплату на получателя
					if (( document.getElementById("paymentMethod").selectedIndex == '2' ) || ( document.getElementById("paymentMethod").selectedIndex == '3' )){
						if( $('#recipient-person').val() == '' ||
                    		$('#recipient-phone').val()== '' ||
							$('#counterpartyTypeRecipient').val() != "0" && ( document.getElementById("paymentMethod").selectedIndex == '3' )
                    ){
						//$('.error-depature').css('display','none');
						if( $('#recipient-person').val()=='' ){
							$('#recipient-person').addClass('error');
						}
						if( $('#recipient-phone').val()=='' ){
							$('#recipient-phone').addClass('error');
						}
						if( $('#counterpartyTypeRecipient').val() != "0" && ( document.getElementById("paymentMethod").selectedIndex == '3' ) ){
							$('#recipient-org').addClass('error');
						}
						//Если выбран Ф1 и не выбран по коду получатель									
						if($('#counterpartyTypeRecipient').val() != "0" && $('#counterpartyTypeRecipient').val() != "1" && ( document.getElementById("paymentMethod").selectedIndex == '3' )){
							$('#recipient-org').addClass('error');
							var err_text = (api_lang=='uk')?"Для вибору безготівкової оплати, оберіть отримувача за кодом ЄДРПОУ/ІПН":
						                                    "Для выбора безналичной оплаты, выберите получателя по коду ЕГРПОУ/ИНН";
							$('.error-depature').css('display','flex');
							$('.error-depature').text(err_text);
					}

						//Если выбран Ф1 и нет договора	получатель
						if($('#counterpartyTypeRecipient').val() == "1" && ( document.getElementById("paymentMethod").selectedIndex == '3' )){
							$('#recipient-org').addClass('error');
							var err_text = (api_lang=='uk')?"У отримувача відсутній активний договір з компанією, для заключення договору відправте документи на info@sat.ua":
						                                    "У получателя отсутствует активный договор з компанией, для заключения договора отправте документы на info@sat.ua";
							$('.error-depature').css('display','flex');
							$('.error-depature').text(err_text);
					}
					}
					}

					if( $('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="" ){
						$('#fromDir').addClass('error');
					}
					if( $('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="" ){
						$('#toDir').addClass('error');
					}
					if( $('#sender-address').val()=='' ){
						$('#sender-address').addClass('error');
					}
					if( $('#sender-person').val()=='' ){
						$('#sender-person').addClass('error');
					}
					if( $('#sender-phone').val()=='' ){
						$('#sender-phone').addClass('error');
          }
				} else {
					valid = true;
					$('.departure-order').css('display','');
					$('body, html').animate({
						scrollTop: $('.calculate-wrapper').offset().top+500
					}, 500);
					$('.error-depature').css('display','none');
				}

				if(valid){                    
					var services = [];
					var recipients = [];
					var paymentMethod = [{
						"payerType": "Отправитель",
						"paymentMethod": "Cash"
					},
					{
						"payerType": "Отправитель",
						"paymentMethod": "NonCash"

					},
					{
						"payerType": "Получатель",
						"paymentMethod": "Cash"

					},
					{
						"payerType": "Получатель",
						"paymentMethod": "NonCash"

					}];
					/* Запись из выбранных услуг, услуги убрали 07072022
					var ss = $('.service:checked');
					$('.service:checked').each(function(i){
						services[i] = {
							"service": $(this).data('ref'),
	                		"count": $(this).closest('.options-row-item').find('.qty-wrap input').val(),
							"cost": parseInt($(this).data('cost'))
						}
					});*/
					/*07072022 добавил обработку вида загрузки с подстановкой доп услуги */
					if ( document.getElementById("type_auto").selectedIndex == '2' ){
						services[0] = {
							"service": "3d2bf7a6-ca02-11e8-9405-00505601031c",
							"count": "1"
						}
					}
					if ( document.getElementById("type_auto").selectedIndex == '3' ){
						services[0] = {
							"service": "e68659ec-6460-11ea-940d-00505601031c",
							"count": "1"
						}
					}

				  	//Переделал наоборот, на время) переделал на !document.getElementById('NotCallbackId').checked
         	        if(document.getElementById('NotCallbackId').checked){
				    	var notCallbackStatus = false;
						var writeMode = 'save'; //на КЦ
			        	  } else {
							var notCallbackStatus = true;
							var writeMode = 'posting'; //логистам					
				    }
					
					//Получатель Если нет рефа юрика или физика (он записываеться в одно поле recipientOrgRef), тогда добавляем данные разового
					if ( $("input[name='recipientOrgRef']").val() == '' ){	
						//Формируем направление					
						recipients[0] = {
							"useSingleRecipient": true,
							"singleRecipientFullName": $("input[name='recipientPerson']").val(),
							"declaredCost" : $('#declaredCost').val(), // declaredCost - заявленная стоимость
							"seatsAmount": $('[name="seatsAmount"]').val(),//количество мест
							"weight": ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val(),//1, //$('[name="weight"]').val(),//вес груза
							"width": $('[name="width"]').val(),//ширина всех мест отправления
							"length": $('[name="length"]').val(),//длина всех мест отправления
							"height" : $('[name="height"]').val(),//высота всех мест отправления
							"volume" : $('[name="volume"]').val(),//объем груза
							"townRecipient": $('#toDir-cityref').val(), //"8d7f5ea4-9436-11dd-98c6-001cc0108cd1", //$('#toDir-cityref').val(), //идентификатор города получения
							"cargoType": $('.subtype-block li.selected').data('ref'), //$('[name="type"]').val(),//$('[name="type"]').val(), //идентификатор вида груза
							"description": $('#cargoDescriptionList-ref').val(), //описание груза
							"recipientPhone": $('#recipient-phone').val().replace(/-|_|\s|\(|\)/g, ''), //recipientPhone - телефон получателя
							"contactRecipient": $("input[name='recipientPerson']").val(), //contactRecipient - контакт получателя
							//Плательщик
							"paymentMethod": paymentMethod[document.getElementById("paymentMethod").selectedIndex].paymentMethod,
							"payerType": paymentMethod[document.getElementById("paymentMethod").selectedIndex].payerType
							
						}
					} else {
							//Формируем направление
					    recipients[0] = {
							"recipient" : $('#recipient-org-ref').val(), // #recipient-org-ref - сюда пишеться реф и юрика и физика							
						    "declaredCost" : $('#declaredCost').val(), // declaredCost - заявленная стоимость
							"seatsAmount": $('[name="seatsAmount"]').val(),//количество мест
							"weight": ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val(),//1, //$('[name="weight"]').val(),//вес груза
							"width": $('[name="width"]').val(),//ширина всех мест отправления
							"length": $('[name="length"]').val(),//длина всех мест отправления
							"height" : $('[name="height"]').val(),//высота всех мест отправления
							"volume" : $('[name="volume"]').val(),//объем груза
							"townRecipient": $('#toDir-cityref').val(), //"8d7f5ea4-9436-11dd-98c6-001cc0108cd1", //$('#toDir-cityref').val(), //идентификатор города получения
							"cargoType": $('.subtype-block li.selected').data('ref'), //$('[name="type"]').val(),//$('[name="type"]').val(), //идентификатор вида груза
							"description": $('#cargoDescriptionList-ref').val(), //описание груза
							"recipientPhone": $('#recipient-phone').val().replace(/-|_|\s|\(|\)/g, ''), //recipientPhone - телефон получателя
							"contactRecipient": $("input[name='recipientPerson']").val(), //contactRecipient - контакт получателя
							//Плательщик
							"paymentMethod": paymentMethod[document.getElementById("paymentMethod").selectedIndex].paymentMethod,
							"payerType": paymentMethod[document.getElementById("paymentMethod").selectedIndex].payerType
						}
					}
			
					
					
					//console.log(recipients);
					var data = {
						"action": "departure_send",
						"writeMode": writeMode,
						// ID - свой идентификатор набора параметров. Возвращается после расчета
						"language": api_lang,
						"townSender": $('#fromDir-cityref').val(), //"3f5c127b-9336-11da-9860-00024407fbce", //$('#fromDir-cityref').val(), // идентификатор города отправления
						//"townRecipient": $('#toDir-cityref').val(), //"8d7f5ea4-9436-11dd-98c6-001cc0108cd1", //$('#toDir-cityref').val(), //идентификатор города получения
						//ПОЛУЧАТЕЛЬ добавляем в направление
						"recipients": recipients,
						//"declaredCost" : $('#declaredCost').val(), // declaredCost - заявленная стоимость
						"cargoType": $('.subtype-block li.selected').data('ref'), //$('[name="type"]').val(),//$('[name="type"]').val(), //идентификатор вида груза
                        "description": $('#cargoDescriptionList-ref').val(), //описание груза
						"sender": $('#sender-org-ref').val(), //юрик
						"senderAddress": $('#sender-address').val(), //senderAddress - адрес отправителя
						"contactSender": $('#sender-person').val(), //contactSender - ФИО контактного лица
						"senderPhone": $('#sender-phone').val().replace(/-|_|\s|\(|\)/g, ''), //senderPhone - телефон отправителя
						"additionalInformation": $("textarea[name='sender-textarea']").val(), //additionalInformation - примечание
						"dateOfCompletion": $('#datepicker1').val(),
                      	"seatsAmount": $('[name="seatsAmount"]').val(),//количество мест
						"weight": ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val(),//1, //$('[name="weight"]').val(),//вес груза
						"width": $('[name="width"]').val(),//ширина всех мест отправления
						"length": $('[name="length"]').val(),//длина всех мест отправления
						"height" : $('[name="height"]').val(),//высота всех мест отправления
						"volume" : $('[name="volume"]').val(),//объем груза
						"departure" :  ($("input[name='fromDir-type']").val() == '2')? 1: 0, //доставка груза до дверей получателя
						"delivery" : ($("input[name='toDir-type']").val() == '2')? 1: 0, //выезд за грузом до дверей отправителя
						//Плательщик
						"paymentMethod": paymentMethod[document.getElementById("paymentMethod").selectedIndex].paymentMethod,
						"payerType": paymentMethod[document.getElementById("paymentMethod").selectedIndex].payerType,
						// "departureCondition": $('[name="weight"]').val(),//дополнительное условие выезда за грузом
						// "deliveryCondition": $('[name="weight"]').val(),//дополнительное условие доставки груза
						
                        notCallback: !document.getElementById('NotCallbackId').checked,
						"addServices": services
					}
					if( $("input[name='fromDir-type']").val() == '2' ){
						data['departureCondition'] = $('#fromDir-delivery-type option:contains('+$('#fromDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}

					if( $("input[name='toDir-type']").val() == '2' ){
						data['deliveryCondition'] = $('#toDir-delivery-type option:contains('+$('#toDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}			
					
					
					//Вид загрузки
					if ( document.getElementById("type_auto").selectedIndex == '0' ){
						data['loadType'] = 'standard';
					}
					if ( document.getElementById("type_auto").selectedIndex == '1' ){
						data['loadType'] = 'top';
					}
					if ( document.getElementById("type_auto").selectedIndex == '2' ){
						data['loadType'] = 'side';
					}
					if ( document.getElementById("type_auto").selectedIndex == '3' ){
						data['loadType'] = 'hydro';
					}
					//Отправитель Если нет рефа юрика или физика (он записываеться в одно поле senderOrgRef), тогда добавляем данные разового
					if ( $("input[name='senderOrgRef']").val() == '' ){
						data['useSingleSender'] = true;
						data['singleSenderFullName'] = $("input[name='senderPerson']").val();
					}
                    
					
					
					$.ajax({
						url: "/bitrix/templates/sat_main/api.php",
						// url: "https://api.sat.ua/v1.0/calc/json",
						data: data,
						type: "GET",
						dataType : 'html',
						beforeSend:function(){
							$('.loader').css('display','inline-block');
							$('.calculate-section').css({'opacity':'0.6'});
						},
						success: function(msg) {
							msg = JSON.parse(msg);
							$('.calculate-section').css({'opacity':'1'});
							$('.advS').remove();
							if( msg.success === "true" ){
                            	var total = msg.data[0].cost;
								var totalDeparture = msg.data[0].departureCost;
								var totalDelivery = msg.data[0].deliveryCost;
                				var departureNumber = msg.data[0].number;
								var creation = msg.data[0].creationCost;
								var insurance = msg.data[0].insuranceCost;

                const modalDepartureSuccess = document.getElementById('modalDepartureSuccess');
                const modalText = modalDepartureSuccess.querySelector('.departure-success-text');
                modalText.textContent = modalText.textContent.replace(/№ /, `№${departureNumber} `);
                modalVisible('modalDepartureSuccess', true);
                setTimeout(() => modalVisible('modalDepartureSuccess', false), 10000);

								$('#decDeparture').text( totalDeparture );
								$('#decDelivery').text( totalDelivery );
								$('#decCreation').text( creation );
								$('#decInsurance').text( insurance );
								$('#departureSuccess').text( departureNumber );
								$('#departureSuccessTop').text( departureNumber );
								$('#deparuteSuccessZone').css('display', '');
								$('.departure-order').css('display','none');							
								
								$('.departure_cost').css('display', 'table-row');								

							    //Скрываем input	
					            inputSenderVisibleNot();

                orderNotCallback.classList.remove('order-not-callback--hidden');
//Переделал, так как в этом АПИ не возвращаються список доп услуг
								    if( addServicesNew.length>0 ){
									$('.advservices').show();
									for(var i=0; i<addServicesNew.length; i++ ){
									/*	var t = $('[data-ref="'+addservicesName[i].service+'"]').next().next().text();

										if( t.match(/\(.+\)$/) ){
											t = t.replace(/\(/, '</span> / ');
											t = t.replace(/\)/, '');
										} else if( t.match(/ в /) ){
											t = t.replace(/ в /, '</span> / ');
										} else {
											t += "</span>";
										}*/

										var ss = '<tr class="advS"><td class="upper"><span class="dark"><i class="fa fa-check"aria-hidden="true"></i>'+addServicesNew[i].service.description+'</td><td class="dark right">'+addServicesNew[i].cost+' грн</td></tr>';

										$('.advservices tbody').append(ss);
									}
								} else {
									$('.advservices').hide();

								}

								function arraySum(array){
									var sum=0;
									if( array ){
										for(var i = 0; i < array.length; i++){
											sum += array[i].cost;
										}
									}
									return sum;
								}

								var totalServicess = arraySum( msg.data[0].addServices);
								var totalDimensions = msg.data[0].cost - msg.data[0].departureCost - msg.data[0].deliveryCost - totalServicess;
								$('#fromAddress').text($('#sender-address').val());
								$('#fromSender').text($('#sender-person').val());
								$('#fromSenderCompany').text($('#sender-org').val());
								$('#fromPhone').text($('#sender-phone').val());

								//Получатель вывод								
								$('#toRecipient').text($('#recipient-person').val());
								$('#toRecipientCompany').text($('#recipient-org').val());
								$('#toPhone').text($('#recipient-phone').val());

								$('.fromDate').text( $('#datepicker1').val() );
								if( $('#datepicker2').val()=='__.__.____' || $('#datepicker2').val()=='') {
								 	$('#datepicker2').val(msg.data[0].incomingDate);
								}
								$('.toDate').text( $('#datepicker2').val() );
								var from = $('#fromDir').val();
								var to = $('#toDir').val();
								if( from.match(/\s\-\s/)!=-1 ){
									var f = from.split(/\s\-\s/);
									from = f[0];
								}
								
								if( to.match(/\s\-\s/)!=-1 ){
									var t = to.split(/\s\-\s/);
									to = t[0];
								}
								$('.fromCity').text( from );
								$('.toCity').text( to );

								var type = $('.type-block li.selected').data('type');
								
								$('.'+type+'_show').css('display', 'table-row');
								$('#decCost').text( $('[name="declaredCost"]').val() );
								$('#decAva').text( $('[name="seatsAmount"]').val() );
								$('#decVol').text( $('[name="volume"]').val() );
								$('#decWid').text( $('[name="width"]').val() );
								$('#decLen').text( $('[name="length"]').val() );
								$('#decHei').text( $('[name="height"]').val() );
								$('.decWei').text( ( $('[name="totalweight"]').val()>0 )? $('[name="totalweight"]').val() : $('[name="weight"]').val() );

								$('#totalCost').text(total);
								$('.decType').text( $('.type-block li.selected').text() );

								$('#departureNote').text($("textarea[name='sender-textarea']").val());
								if( $("input[name='toDir-type']").val() == '2' ){
									$('#toAddress').empty();
								}
						        $('.declaration-wrapper').slideDown(300);
								//Скрываем input								
								inputSenderVisibleNot();
						    } else {
							    //Добавил вывод ошибки из 1С в заказе выезда 06072022
								var err_text = msg.error.note;
								$('.error-depature').css('display','flex');
								$('.error-depature').text(err_text);
								$('.departure-order').css('display','none');
								$('.sender-submit').css('display','');
								$('.loader').css('display','none');
						    } 
						},
						error: function( data){
						}
					})
				}
			});
		},

		getDeliveryTrack: function() {
      const getHolydays = async (cityRef) => {
        const params = new URLSearchParams();
        params.append('action', 'getHolydays');
        params.append('cityRef', cityRef);

        const API_URL = '/bitrix/templates/sat_main/api.php';
        const response = await fetch(`${API_URL}?${params}`);
        if (!response.ok) return console.error(`Ошибка HTTP: ${response.status}`);
        window.holydays = await response.json();
      }

			var self = this;
			$('.delivery-calc').slideUp(300);
			$('.delivery-submit').slideUp(300);
			$(".track-location").slideUp(300);

			$(document).on("find-track", function(){
				var a = $(this),
				valid = false;
				$('.delivery-submit').slideUp(300);
				$('#toDir-cityref').val('');
				$('#toDir-cityref').val('');
				$('#toDir-cityrspref').val('');
				$('#toDelivery-cityref').val('');
				$('#toDelivery-cityrspref').val('');
				$('#Gruz-cargoType').val('');
				$('#datepicker1').val('__.__.____');
				$('#datepicker2').val('__.__.____');
				$('#fromAddress').val('');

				$(".declaration-wrapper").slideUp(300);

				if($('input[name = "track_number"]').val().length=='9') {
					valid = true;
				}
				else {
					$(".delivery-row").slideUp(300);
					$(".delivery-city").slideUp(300);
					$(".sender-info").slideUp(300);
					$(".parcel-options-info").slideUp(300);
					$('.delivery-hidden').slideUp(300);
					$(".tracking-error").slideDown(300);
					$(".delivery-submit").slideUp(300);
				}

				if(valid) {
					var data = {
						"action": "delivery_tracking",
						"lang" : api_lang,
						"number": $('input[name = "track_number"]').val(),
					}
					$.ajax({
						url: "/bitrix/templates/sat_main/api.php",
						data: data,
						type: "GET",
						dataType : 'html',
						beforeSend:function(){
							a.parents("div").find(".loader").show();
							$('.calculate-section').css({'opacity':'0.6'});
						},
						success: function(msg) {
							msg = JSON.parse(msg);
							$('.calculate-section').css({'opacity':'1'});
							$('.advS').remove();
							if( msg.success === "true" ){
                                getHolydays(msg.data[0].rspTo.cityRef);
								$('.fromDate').text( $('#datepicker1').val(msg.data[0].incomingDate) );

								$('#fromDir-cityref').val(msg.data[0].rspFrom.cityRef);
								$('#fromDir-cityrspref').val(msg.data[0].rspFrom.ref);

								$('#toDir-cityref').val(msg.data[0].rspTo.cityRef);
								$('#toDir-cityrspref').val(msg.data[0].rspTo.ref);


								$('#fromDelivery-cityref').val(msg.data[0].rspTo.cityRef);
								$('#fromDelivery-cityrspref').val(msg.data[0].rspTo.ref);

								$('#Gruz-weight').val(msg.data[0].weight);
								$('#Gruz-width').val(msg.data[0].width);
								$('#Gruz-length').val(msg.data[0].length);
								$('#Gruz-height').val(msg.data[0].height);
								$('#Gruz-seatsAmount').val(msg.data[0].seatsAmount);
								$('#Gruz-volume').val(msg.data[0].volume);
								$('#Gruz-sum').val(msg.data[0].sum);
								$('#Gruz-cargoType').val(msg.data[0].cargoType);
								$('#datepicker2').val(msg.data[0].incomingDate);
								$('#fromAddress').text(msg.data[0].rspTo.address);


								var str = msg.data[0].type;
								var type = str.split('-');
								var fromType = type[0];
								var toType = type[1];

								$('#fromTrack').text(msg.data[0].rspFrom.description);
								$('#fromTrack').data('ref', msg.data[0].rspFrom.ref);
								$('#fromAddressTrack').text(msg.data[0].rspFrom.address);
								$('#fromDateTrack').text(msg.data[0].date);
								$('#fromTypeTrack').text( fromType );

								$('#toTrack').text(msg.data[0].rspTo.description);
								$('#toTrack').data('ref', msg.data[0].rspTo.ref);
								$('#toAddressTrack').text(msg.data[0].rspTo.address);
								$('#toDateTrack').text(msg.data[0].incomingDate);
								$('#toTypeTrack').text( toType );

								$('#statusTrack').text(msg.data[0].currentStatus);
								$('#numberTrack').text(msg.data[0].number);
								$('#costTrack').text(msg.data[0].sum+' грн');
								$('#widthTrack').text(msg.data[0].width+' см');
								$('#depthTrack').text(msg.data[0].length+' см');
								$('#heightTrack').text(msg.data[0].height+' см');
								$('#weightTrack').text(msg.data[0].weight+' кг');

								if(msg.data[0].addServices){
									$('#servicesTrack').empty();
									for(var i=0;i<msg.data[0].addServices.length; i++){
										var ss = '<td><div class="dark upper"><i class="fa fa-check" aria-hidden="true"></i>'+msg.data[0].addServices[i].serviceDescription+'</div></td>';
										$('#servicesTrack').append(ss);
									}
								}


								$(".track-location").slideDown(300);


								self.getDeliveryTown();

								$(".delivery-hidden").slideUp(300);
								$(".tracking-error").slideUp(300);


								$(".delivery-row").slideDown(300);
								$(".delivery-city").slideDown(300);
								$(".sender-info").slideDown(300);
								$(".parcel-options-info").slideDown(300);
								$(".delivery-calc").slideDown(300);
							}
							else{
								$(".delivery-row").slideUp(300);
								$(".delivery-city").slideUp(300);
								$(".sender-info").slideUp(300);
								$(".parcel-options-info").slideUp(300);
								$('.delivery-hidden').slideUp(300);
								$(".tracking-error").slideDown(300);
								$(".delivery-submit").slideUp(300);
								$(".delivery-calc").slideUp(300);
							}
						},
						error: function( data){
						}
					})
				}

			});
		},
		bindDeliveryCalc: function(){
			var self = this;
			$(document).on("submit-to-calc-delivery", function(){
			$('.declaration-wrapper').slideUp(300);
				$('.error').removeClass('error');
				var a = $(this),
				valid = false;

				if( ($('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="") ||
					($('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="") ||
					$('#sender-address').val()=='' ||
					$('#sender-person').val()=="" ||
					$('#sender-phone').val()=="" || ($("#toDir-cityrspref").val())!==($("#fromDelivery-cityrspref").val()) ){
					$('body, html').animate({
						scrollTop: $('.calculate-wrapper').offset().top-50
					}, 500);
					if( $('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="" ){
						$('#toDir').addClass('error');
					}
					if( $('#sender-address').val()=='' ){
						$('#sender-address').addClass('error');
					}
					if( $('#sender-person').val()=='' ){
						$('#sender-person').addClass('error');
					}
					if( $('#sender-phone').val()=='' ){
						$('#sender-phone').addClass('error');
					}
					if ($("#toDir-cityrspref").val()!==$("#fromDelivery-cityrspref").val()) {
						alert('Выбранный населенный пункт не находится в зоне доставки отделения ' + $("#toTrack").text());
						$('#toDir').addClass('error');
					}
				} else {
					valid = true;
								var tracking = {
									'rspSender':	$('#fromDelivery-cityrspref').val(),
									'townRecipient':$('#toDir-cityref').val(),
									'cargoType':	$('#Gruz-cargoType').val(),
									'total':		$("#Gruz-sum").val(),
									'weight':		$('#Gruz-weight').val(),
									'volume':		$('#Gruz-volume').val(),
									'seatsAmount':	$('#Gruz-seatsAmount').val(),
									'length':		$('#Gruz-length').val(),
									'width':		$('#Gruz-width').val(),
									'height':		$('#Gruz-height').val(),
								};
				}
				if(valid){
					var services = [];
					var ss = $('.service:checked');
					$('.service:checked').each(function(i){
						services[i] = {
							"service": $(this).data('ref'),
	                		"count": $(this).closest('.options-row-item').find('.qty-wrap input').val()
						}
					});
					var data = {
						"action": "global_calc",

						"rspSender":		tracking.rspSender,//'3f5c127b-9336-11da-9860-00024407fbce', //$('#fromDir-ref').val(), идентификатор отделения отправления
						"townRecipient":	tracking.townRecipient, //"8d7f5ea4-9436-11dd-98c6-001cc0108cd1", //$('#toDir-cityref').val(), //идентификатор города получения
						"cargoType":		tracking.cargoType,//тип груза
						"seatsAmount":		tracking.seatsAmount,//количество мест
						"weight":			tracking.weight,//вес груза
						"width":			tracking.width,//ширина всех мест отправления
						"length":			tracking.length,//длина всех мест отправления
						"height":			tracking.height,//высота всех мест отправления
						"volume":			tracking.volume,//объем груза
						"departure":		false,
						"delivery":			true,
						"addServices":		services
					}
					if( $("input[name='toDir-type']").val() == '2' ){
						data['deliveryCondition'] = $('#toDir-delivery-type option:contains('+$('#toDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}


					$.ajax({
						url: "/bitrix/templates/sat_main/api.php?lang="+api_lang,
						data: data,
						type: "GET",
						dataType : 'html',
						beforeSend:function(){
							a.parents("div").find(".loader").show();
							$('.calculate-section').css({'opacity':'0.6'});
						},
						success: function(msg) {
							msg = JSON.parse(msg);
							$('.calculate-section').css({'opacity':'1'});
							$('.advS').remove();
							if( msg.success === "true" ){

                document.getElementById('orderNotCallback').classList.remove('order-not-callback--hidden');

								var subtarif = msg.data[0].tarif;

								var creation = msg.data[0].creationCost;
								var insurance = msg.data[0].insuranceCost;
								var departure = msg.data[0].departureCost;
								var delivery = msg.data[0].deliveryCost;

								var total = msg.data[0].cost;
								var transport = total - (creation + insurance + departure + delivery);
								$('#decTrans').text( transport );
								var totalDelivery = msg.data[0].deliveryCost;
								$('#decDelivery').text( totalDelivery );
								$('#decSum').text( $('#Gruz-sum').val() );

								var from = $('#fromDelivery').val();
								var to = $('#toDir').val();
								if( msg.data[0].addServices ){
									$('.advservices').show();
									for(var i=0; i<msg.data[0].addServices.length; i++ ){
										var serv = $('[data-ref="'+msg.data[0].addServices[i].service+'"]');
										serv.attr('data-cost', msg.data[0].addServices[i].cost);
										var t = $('[data-ref="'+msg.data[0].addServices[i].service+'"]').next().next().text();
										if( t.match(/\(.+\)$/) ){
											t = t.replace(/\(/, '</span> / ');
											t = t.replace(/\)/, '');
										} else if( t.match(/ в /) ){
											t = t.replace(/ в /, '</span> / ');
										} else {
											t += "</span>";
										}
										var ss = '<tr class="advS"><td class="upper"><span class="dark"><i class="fa fa-check"aria-hidden="true"></i>'+t+'</td><td class="dark right">'+msg.data[0].addServices[i].cost+' грн</td></tr>';
										total -= msg.data[0].addServices[i].cost;
										$('.advservices tbody').append(ss);

									}
								} else {
									$('.advservices').hide();
								}
								$('.fromType').text( $('#fromDir-delivery-tabs a.active span').text() );
								$('.toType').text( $('#toDir-delivery-tabs a.active span').text() );
								$('#deliverySuccessZone').css('display', '');
								$('.fromDate').text( $('#datepicker1').val() );


								var from = $('#fromDelivery').val();
								var to = $('#toDir').val();
								if( from.match(/\s\-\s/)!=-1 ){
									var f = from.split(/\s\-\s/);
									from = f[0];
								}
								if( to.match(/\s\-\s/)!=-1 ){
									var t = to.split(/\s\-\s/);
									to = t[0];
								}
								$('.fromCity').text( from );
								$('.toCity').text( to );

								$('#departureNote').text( $("textarea[name='sender-textarea']").val());
								$('#decVol').text( $('#Gruz-volume').val() );
								$('.decWei').text( $('#Gruz-weight').val() );
								$('#decDimen').text( $('#Gruz-sum').val() );

								$('#toAddress').text($('#sender-address').val());
								$('#toReceiver').text($('#sender-person').val());
								$('#toPhone').text($('#sender-phone').val());
								$('.fromDate').text( $('#datepicker1').val() );
								$('.toDate').text( $('#datepicker2').val() );

								$('.hidden_dec').css('display', 'none');
								$('.decType').text( subtarif );
								$('.decSubtype').text( subtarif );
								$('#decAva').text( tracking.seatsAmount );
								$('.decWei').text( tracking.weight );
								$('#decLen').text( tracking.length );
								$('#decWid').text( tracking.width );
								$('#decHei').text( tracking.height );
								$('#decVol').text( tracking.volume );
								//(tracking.cargoType !== "Документы")? $('.no_docs').css('display', 'table-row'):'';
								if (tracking.length > 0 && tracking.width > 0 && tracking.height > 0) {
									$('.all_params').css('display', 'table-row');
								} else if ( tracking.volume > 0) {
									$('.only_volume').css('display', 'table-row');
								}


								$('#deliverySuccess').text('');
								$('#deliverySuccessZone').css('display', 'none');

								$(".track-location").slideUp(300);
						        $('.declaration-wrapper').slideDown(300);
								$(".delivery-submit").slideDown(300);

						    } else {
						    }

						},
						error: function( data){
						}
					})
				}
			});
		},

		bindDeliverySend: function(){
			var self = this;
			$(document).on("submit-to-send-delivery", function(){
			$('.declaration-wrapper').slideUp(300);
				$('.error').removeClass('error');
				var a = $(this),
				valid = false;

				if( ($('#fromDir-ref').val()=='' &&  $('#fromDir-cityref').val()=="") ||
					($('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="") ||
					$('#sender-address').val()=='' ||
					$('#sender-person').val()=="" ||
					$('#sender-phone').val()==""  || ($("#toDir-cityrspref").val())!==($("#fromDelivery-cityrspref").val()) ){
					$('body, html').animate({
						scrollTop: $('.calculate-wrapper').offset().top-50
					}, 500);
					if( $('#toDir-ref').val()=='' &&  $('#toDir-cityref').val()=="" ){
						$('#toDir').addClass('error');
					}
					if( $('#sender-address').val()=='' ){
						$('#sender-address').addClass('error');
					}
					if( $('#sender-person').val()=='' ){
						$('#sender-person').addClass('error');
					}
					if( $('#sender-phone').val()=='' ){
						$('#sender-phone').addClass('error');
					}
					if ($("#toDir-cityrspref").val()!==$("#fromDelivery-cityrspref").val()) {
						alert('Выбранный населенный пункт не находится в зоне доставки отделения ' + $("#toTrack").text());
						$('#toDir').addClass('error');
					}
				} else {
					valid = true;
				}

				if(valid){
					var services = [];
					var ss = $('.service:checked');
					$('.service:checked').each(function(i){
						services[i] = {
							"service": $(this).data('ref'),
	                		"count": $(this).closest('.options-row-item').find('.qty-wrap input').val(),
							"cost": parseInt($(this).data('cost'))
						}
					});

          const orderNotCallback = document.getElementById('orderNotCallback')

					var data = {
						"action": "delivery_send",
						"townRecipient": $('#toDir-cityref').val(),
						"orderDate": $('#datepicker2').val(),
						"recipientAddress": $('#sender-address').val(),
						"contactRecipient": $('#sender-person').val(),
						"recipientPhone": $('#sender-phone').val(),
						"documentNumber": $('input[name = "track_number"]').val(),
						"additionalInformation": $("textarea[name='sender-textarea']").val(),
						"seatsAmount":		$('#Gruz-seatsAmount').val(),

            notCallback: orderNotCallback.querySelector('.order-not-callback-checkbox__input').checked,
						"addServices": services
					}
					if( $("input[name='toDir-type']").val() == '2' ){
						data['deliveryCondition'] = $('#toDir-delivery-type option:contains('+$('#toDir-delivery-type-styler .jq-selectbox__select-text').text()+')').attr('value');
					}


					$.ajax({
						url: "/bitrix/templates/sat_main/api.php",
						data: data,
						type: "GET",
						dataType : 'html',
						beforeSend:function(){
							a.parents("div").find(".loader").show();
							$('.calculate-section').css({'opacity':'0.6'});
						},
						success: function(msg) {
							msg = JSON.parse(msg);
							$('.calculate-section').css({'opacity':'1'});
							$('.advS').remove();
							if( msg.success === "true" ){
                orderNotCallback.classList.remove('order-not-callback--hidden');

								$('#decSum').text( $('#Gruz-sum').val() );
								if( msg.data[0].addServices ){
									$('.advservices').show();
									for(var i=0; i<msg.data[0].addServices.length; i++ ){
										var t = $('[data-ref="'+msg.data[0].addServices[i].service+'"]').next().next().text();
										if( t.match(/\(.+\)$/) ){
											t = t.replace(/\(/, '</span> / ');
											t = t.replace(/\)/, '');
										} else if( t.match(/ в /) ){
											t = t.replace(/ в /, '</span> / ');
										} else {
											t += "</span>";
										}
										var ss = '<tr class="advS"><td class="upper"><span class="dark"><i class="fa fa-check"aria-hidden="true"></i>'+t+'</td><td class="dark right">'+msg.data[0].addServices[i].cost+' грн</td></tr>';
										total += msg.data[0].addServices[i].cost;
										$('.advservices tbody').append(ss);
									}
								} else {
									$('.advservices').hide();
								}
								$('.fromType').text( $('#fromDir-delivery-tabs a.active span').text() );
								$('.toType').text( $('#toDir-delivery-tabs a.active span').text() );
								$('.fromDate').text( $('#datepicker1').val() );

								var deliveryNumber = msg.data[0].number;
								$('#deliverySuccess').text( deliveryNumber );
								$('#deliverySuccessZone').css('display', '');

								var from = $('#fromDelivery').val();
								var to = $('#toDir').val();
								if( from.match(/\s\-\s/)!=-1 ){
									var f = from.split(/\s\-\s/);
									from = f[0];
								}
								if( to.match(/\s\-\s/)!=-1 ){
									var t = to.split(/\s\-\s/);
									to = t[0];
								}
								$('.fromCity').text( from );
								$('.toCity').text( to );
								if(from !== to && $('#decTrans').text()>0 ){
									$('#TrasportTo').slideDown(300);
								}
								else{
									$('#TrasportTo').slideUp(300);
								}
								$('#departureNote').text( $("textarea[name='sender-textarea']").val());
								$('#decVol').text( $('#Gruz-volume').val() );
								$('.decWei').text( $('#Gruz-weight').val() );
								$('#decDimen').text( $('#Gruz-sum').val() );

								$('#toAddress').text($('#sender-address').val());
								$('#toReceiver').text($('#sender-person').val());
								$('#toPhone').text($('#sender-phone').val());
								$('.fromDate').text( $('#datepicker1').val() );
								$('.toDate').text( $('#datepicker2').val() );


								$(".track-location").slideUp(300);
						        $('.declaration-wrapper').slideDown(300);
								$(".delivery-submit").slideDown(300);

						    }
							else if( msg.success === "false" ){
								alert(msg.error.text+msg.error.note);
								$('#deliverySuccessZone').css('display', 'none');
							}
							else {
								$('#deliverySuccessZone').css('display', 'none');
						    }

						},
						error: function( data){
						}
					})
				}
			});
		}
	}

	$(function () {
        wnd.Calc = new Calc();
    })
}(window, jQuery);
