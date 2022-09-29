$(function (){
$('.registration-done, .registration-error').css("display", "none");

	$('input[name="form_text_31"]').mask("+38(099)999-99-99");
	$('input[type="text"]').each(function(){
		$( this ).attr("autocomplete", "nope");
	});
	$('input[name="form_text_33"]').autocomplete({
		minLength: 3,
		source: '/bitrix/templates/sat_api/dev_api.php?type=getTowns',
		select: function( event, ui ) {
			$("input[name='city-ref']").val( ui.item.id );
			$('input[name="form_text_33"]').removeClass('has-error');
		} 
	});

	$(".registration-submit").on("click", function(e){
		e.preventDefault();
		var self = this;
		if($("input[name='city-ref']").val() && $('input[name="form_text_33"]').val()){
			var data = {
				"type": "registration",
				"registration_form_name": $('input[name="form_text_29"]').val(),
				"registration_form_email": $('input[name="form_email_30"]').val(),
				"registration_form_phone": $('input[name="form_text_31"]').val(),
				"registration_form_contact": $('input[name="form_text_32"]').val(),
				"registration_form_cityuser": $('input[name="form_text_33"]').val(),
				"registration_form_city": $("input[name='city-ref']").val(),
			};

			$.ajax({
				type:'GET',
				url: "/bitrix/templates/sat_api/dev_api.php",
				data: data,
				dataType : 'html',
				beforeSend: function() {
					$('.registration-start').fadeOut();
				},
				success: function( msg ) {
					if(msg) {
					msg = JSON.parse(msg);
						if(msg.success && msg.data.code !== 'error') {
								console.log("msg.success = true" + " ("+msg.success+")");
								$("form[name='SIMPLE_FORM_4']").trigger('submit');
						$('.registration-done').fadeIn();
						} else {
							console.log(msg.data.description);
							$('.registration-error h2').html(msg.data.description);
							$('.registration-start').fadeIn();
							$('.registration-error').fadeIn();
						}
					console.log( msg );
					} else {
						console.log("msg empty");
						$('.registration-done ,registration-error').fadeOut();
					$('.registration-start').fadeIn();

					}
				},
			   error: function( msg) {
				}
			});
		} else {
			$('input[name="form_text_33"]').addClass('has-error');
		}
	});
});