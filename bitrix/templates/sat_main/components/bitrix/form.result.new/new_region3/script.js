// $(function () {

// 	$('input[name="form_text_491"]').inputmask({
// 		mask:"+999999999999",
// 	});


// 	$('input[name="form_text_36"]').inputmask({
// 		mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.a{2,6}][.a{1,2}]",

// 		greedy: false,
// 		onBeforePaste: function (pastedValue, opts) {
// 		  pastedValue = pastedValue.toLowerCase();
// 		  return pastedValue.replace("mailto:", "");
// 		},
// 		definitions: {
// 		  '*': {
// 			validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
// 			cardinality: 1,
// 			casing: "lower"
// 		  }
// 		}
// 	});

// 	$('input[name="form_text_37"]').inputmask({
// 		mask:"9{1,3}",
// 	});
// 	$('input[name="form_text_38"]').autocomplete({
// 		minLength: 0,
// 		source: countries_from,
// 		classes: {
// 			"ui-autocomplete": "input-autocomplate"
// 		},
// 	}).focus(function () {
// 		$(this).val('');
// 		console.log($(this));
//     	$(this).autocomplete("search");
// 	});

// 	$('input[name="form_text_39"]').autocomplete({
// 		minLength: 0,
// 		source: countries_to,
// 		classes: {
// 			"ui-autocomplete": "input-autocomplate"
// 		},
// 	}).focus(function () {
// 		$(this).val('');
//     	$(this).autocomplete("search");
// 	});
// });

window.addEventListener('load', () => {
  const onSubmit = () => fbq('track', 'CompleteRegistration');
  const form = document.querySelector('form[action*="/region/"]');
  if (form) form.addEventListener('submit', onSubmit);
});
