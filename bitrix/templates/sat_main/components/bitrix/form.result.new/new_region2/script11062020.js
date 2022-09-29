$(function () {

//	$('input[name="form_text_34"]').inputmask({
//		mask:"*{1,20}[ *{1,20}][ *{1,20}]",
//	});



	$('input[name="form_text_35"]').inputmask({
		mask:"+38(099)999-99-99",
		clearMaskOnLostFocus: false
	});

	$('input[name="form_text_36"]').inputmask({
		mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.a{2,6}][.a{1,2}]",
		clearMaskOnLostFocus: false,
		greedy: false,
		onBeforePaste: function (pastedValue, opts) {
		  pastedValue = pastedValue.toLowerCase();
		  return pastedValue.replace("mailto:", "");
		},
		definitions: {
		  '*': {
			validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
			cardinality: 1,
			casing: "lower"
		  }
		}
	});

	$('input[name="form_text_37"]').inputmask({
		mask:"9{1,3}",
	});

	if(api_lang == "uk") {
		var countries_from = [
			{value: "Україна"},
		];
		var countries_to = [
			{value: "Польща"},
			{value: "Німеччина"},
			{value: "Чехія"},
			{value: "Словаччина"},
			{value: "Франція"},
			{value: "Італія"},
			{value: "Австрія"},
			{value: "Албанія"},
			{value: "Андорра"},
			{value: "Бельгія"},
			{value: "Болгарія"},
			{value: "Великобританія"},
			{value: "Угорщина"},
			{value: "Греція"},
			{value: "Данія"},
			{value: "Ірландія"},
			{value: "Ісландія"},
			{value: "Іспанія"},
			{value: "Латвія"},
			{value: "Литва"},
			{value: "Люксембург"},
			{value: "Македонія"},
			{value: "Нідерланди"},
			{value: "Норвегія"},
			{value: "Португалія"},
			{value: "Румунія"},
			{value: "Сербія"},
			{value: "Словенія"},
			{value: "Фінляндія"},
			{value: "Хорватія"},
			{value: "Чорногорія"},
			{value: "Швейцарія"},
			{value: "Швеція"},
			{value: "Естонія"},
		];

		if($('input[name="form_text_38"]').val("")) {
			$('input[name="form_text_38"]').val("Україна")
		}
		if($('input[name="form_text_39"]').val("")) {
			$('input[name="form_text_39"]').val("Польща")
		}
	} else if(api_lang == "ru"){
		var countries_from = [
			{value: "Украина"},
		];
		var countries_to = [
			{value: "Польша245"},
			{value: "Германия"},
			{value: "Чехия"},
			{value: "Словакия"},
			{value: "Франция"},
			{value: "Италия"},
			{value: "Австрия"},
			{value: "Албания"},
			{value: "Андорра"},
			{value: "Бельгия"},
			{value: "Болгария"},
			{value: "Великобритания"},
			{value: "Венгрия"},
			{value: "Греция"},
			{value: "Дания"},
			{value: "Ирландия"},
			{value: "Исландия"},
			{value: "Испания"},
			{value: "Латвия"},
			{value: "Литва"},
			{value: "Люксембург"},
			{value: "Македония"},
			{value: "Нидерланды"},
			{value: "Норвегия"},
			{value: "Португалия"},
			{value: "Румыния"},
			{value: "Сербия"},
			{value: "Словения"},
			{value: "Финляндия"},
			{value: "Хорватия"},
			{value: "Черногория"},
			{value: "Швейцария"},
			{value: "Швеция"},
			{value: "Эстония"},
		];
		if($('input[name="form_text_38"]').val("")) {
			$('input[name="form_text_38"]').val("Украина")
		}
		if($('input[name="form_text_39"]').val("")) {
			$('input[name="form_text_39"]').val("Польша")
		}
	}


	$('input[name="form_text_38"]').autocomplete({
		minLength: 0,
		source: countries_from,
		classes: {
			"ui-autocomplete": "input-autocomplate"
		},
	}).focus(function () {
		$(this).val('');
		console.log($(this));
    	$(this).autocomplete("search");
	});

	$('input[name="form_text_39"]').autocomplete({
		minLength: 0,
		source: countries_to,
		classes: {
			"ui-autocomplete": "input-autocomplate"
		},
	}).focus(function () {
		$(this).val('');
    	$(this).autocomplete("search");
	});

});