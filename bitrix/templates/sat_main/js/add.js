$(function () {
	if(typeof lazyload === "function") {
		lazyload();
	}

	$("input[name='simple_calc_weight']").on("keyup change", function(){
		$("#simple_calc_weight_text").text($(this).val());
	})
	$(document).on("submit", "#simple_calc", function(e){
		e.preventDefault();
		var a = $(this);
		var error = '';
		a.find(".required").each(function(){
			if($(this).val() == ''){
				$(this).addClass("error");
				error = 'Empty field';
			}
		})
		if (error == ''){
			var data2 = $(this).serialize() + '&lang=' + api_lang;
			$.ajax({
				url: "/bitrix/templates/sat_main/api.php",                                   
				data: data2,
				type: "GET",   
				beforeSend:function(){
					a.parents("div").find(".loader").show();
					a.css({'opacity':'0.6'});
					$(".order-form .results-row").stop().slideUp();
				},                   
				success: function(msg) {
					a.parents("div").find(".loader").hide();
					a.css({'opacity':'1'});
					var b = msg.split("|");
					if (b[0] == 'ok') {
						cost = b[1];
						$(".order-form .results-row").stop().slideDown();
					} else {
						cost = b[0];
					}
					$("#simple_calc_result_text").text(cost);
				}
			})
		}
	})

	$(document).on("submit", "#simple_track", function(e){
		e.preventDefault();
		var a = $(this);
		var error = '';
		a.find(".required").each(function(){
			if($(this).val() == ''){
				$(this).addClass("error");
				error = 'Empty field';
			}
		})
		var v = $("input[name='simple_track_number']").val();
		if (v.length != 9) {
			$("input[name='simple_track_number']").addClass("error");
			error = 'Empty field';
		}
		if (error == ''){
			var data2 = $(this).serialize() + '&lang=' + api_lang;
			$.ajax({
				url: "/bitrix/templates/sat_main/api.php",                                   
				data: data2,
				type: "GET",   
				beforeSend:function(){
					a.parents("div").find(".loader").show();
					a.css({'opacity':'0.6'});
					$(".track-form .results-row").stop().slideUp();
				},                   
				success: function(msg) {
					a.parents("div").find(".loader").hide();
					a.css({'opacity':'1'});
					var b = msg.split("|");
					if (b[0] == 'ok') {
						r = b[1];
						$("#simple_track_result").html(r);
						$(".track-form .results-row").stop().slideDown();
					} else {
						alert(b[1]);
					}
				}
			})
		}
	});
	$('input[name=simple_track_number]').on('keypress', function() {
		if(event.keyCode==13)
       {
          $("#simple_track").submit();
          return false;
	   }
	});

	$('.link-more').on('click', function(){
	var text = $(this).parent().find('.info-content');
	var fulltext =  text.find('.full');
		if($(this).hasClass("show-full-text")){
			fulltext.slideDown(300);
		} else if($(this).hasClass("hide-full-text")) {
			fulltext.slideUp(300);
		}
	});

	$("input").on("keyup change",function(e){
		if($(this).hasClass("error")){
			$(this).removeClass("error");
		}
	});
	$("textarea").on("keyup change",function(e){
		if($(this).hasClass("error")){
			$(this).removeClass("error");
		}
	});
	$("input[name='simple_track_number']").on('keyup change', function (e) {
		var v = $("input[name='simple_track_number']").val();
		v = v.replace(/[^0-9_]/ig, '');
		$("input[name='simple_track_number']").val(v);
		$("input[name='tm']").val(v);
	});
	
	$(document).on("click", "a.bx24_chat", function(e) {
		e.preventDefault();
		$('[data-b24-crm-button-widget="openline_livechat"]')[0].click();
	});
	
	$(document).on("click", "a.bx24_form", function(e) {
		e.preventDefault();
		$('[data-b24-crm-button-widget="crmform"]')[0].click();
	});
	
	/*$(document).on("click", "span.bx-imopenlines-config-sidebar-close", function(e) {
		e.preventDefault();
		$('.bx-imopenlines-config-sidebar').removeClass('bx-imopenlines-config-sidebar-open');
	open-sidebar
		});
	
	$(document).on("click", "span.bx-crm-widget-form-config-sidebar-close", function(e) {
		e.preventDefault();
		$('#bx24_form_container_5').removeClass('open-sidebar');
		});
	*/
	$(".only_number").on("keypress", function(e) {
		var keyCode = e.keyCode || e.charCode || e.which;
		keyCode = keyCode * 1;
		if(e.which != 8 ) {
			if (keyCode < 48 || keyCode > 57 && keyCode != 95) {
				e.preventDefault();
			}
		}
	});
	
	$(document).on("submit", "#tm", function(e){
		if (!$(this).hasClass("submitted")) {
			e.preventDefault();
			var v = $("input[name='track_number']").val();
			if (v.length != 9) {
				$("input[name='track_number']").addClass("error");
				error = 'Empty field';
			}
		} else {
			$(this).addClass("submitted");
			$(this).submit();
		}
	})
	
	$(document).on("click", ".td-location .title", function(e){
		var dept = $(this).data("ref");
		if (dept.length > 0) {
			$("input[name='department-search-id']").val(dept);
			$("#dept_search").submit();
		}
	});

	$(document).on("click", "a#short_text_show_link", function(e){
		e.preventDefault();
		$( this ).addClass("hidden");
		if($( this ).parent().prev().hasClass("box-hide")){
			$( this ).parent().prev().removeClass("box-hide");
		}
	});

	$("form[name='SIMPLE_FORM_1']").on("submit", function(){
		$(this).attr("action", $(this).attr("action")+"#feedback");
		$("input[name='form_text_5']").val($("input[name='track_number']").val());
		$("input[name='form_text_27']").val($("#sender-phone").val());
	
	})
	$("form[name='SIMPLE_FORM_2']").on("submit", function(e){
		$(this).attr("action", $(this).attr("action")+"#feedback");
		$("input[name='form_text_6']").val($("input[name='track_number']").val());
		$("input[name='form_text_28']").val($("#sender-phone").val());
	})
})