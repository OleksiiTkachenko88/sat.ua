var panel_id, list;
var cityList = [];

function ResizeDepartments(){
	if(window.matchMedia('(max-width: 767px)').matches){
		setTimeout(function() {
			var regionBody = $(".region-table");
			var departmentsBody = $(".departments-table");
					if(departmentsBody.height() <= regionBody.height()) {
					$(".region-table-body").css("maxHeight", $(".departments-table-body").height()+"px");
					$(".region-table").addClass("box-hide");
				} else if(departmentsBody.height() > regionBody.height()){
					$(".region-table-body").css("maxHeight","");
					$(".region-table").removeClass("box-hide");
				}
		}, 500);
	} 
}

function ResizeDepartmentsOnLoad(){
	if(window.matchMedia('(max-width: 767px)').matches){
			var regionBody = $(".region-table");
			var departmentsBody = $(".departments-table");
					if(departmentsBody.height() <= regionBody.height()) {
					$(".region-table-body").css("maxHeight", $(".departments-table-body").height()+"px");
					$(".region-table").addClass("box-hide");
					if($(".region-head.active").length) {
						var offset = $(".region-head.collapsed").first().position().top;
						$('.region-table-body').scrollTop($(".city-item.active").position().top - offset);
					}
				} else if(departmentsBody.height() > regionBody.height()){
					$(".region-table-body").css("maxHeight","");
					$(".region-table").removeClass("box-hide");
				}
	} else {
		$(".region-table-body").css("maxHeight","");
	}
}

function GetCitiesList() {
			var n = 0;
			$.each(list, function(index, element){
				var elementList = $(element).find(".city-item");
				$.each(elementList, function(i, el){
					cityList[n] = $(el);
					n++;
				})
			});
}

$(function() {
	ResizeDepartmentsOnLoad();
	$(".search-input input").val("");

	$(window).resize(function(){
		ResizeDepartmentsOnLoad();
	});

	$('.search-input input').blur(function() {
		if ($(this).val()) {
			$(this).find('~ label, ~ i:nth-of-type(n+1)').addClass('not-empty');
		} else {
			$(this).find('~ label, ~ i:nth-of-type(n+1)').removeClass('not-empty');
		}
	});

	$('.search-input input ~ i:nth-of-type(2)').click(function() {
		var input = $(this).parent().find('input');
		input.val('');
		input.find('~ label, ~ i:nth-of-type(n+1)').removeClass('not-empty');
		if (panel_id == "departments-list") {
			$(list).parent().parent().fadeIn(300);
		}
		if(panel_id == "region-list") {
			$(".search-input input").trigger("input");
			ResizeDepartmentsOnLoad();
		}
	});

	$(".search-input input").on('click', function(e) {
		var self = $( this );
		panel_id = self.parent().parent().parent().next().find(">:first-child").attr('id');
		if (panel_id == "departments-list") {
			list = $("[data-parent=#"+panel_id+"]");
		} else if (panel_id == "region-list") {
			list = $("[data-parent=#"+panel_id+"]").parent().parent();
		}
		return panel_id, list;
	});

	$(".search-input input").on('propertychange input', function(e) {
		var self = $( this );
		var search_text = $( this ).val().toUpperCase();
		if(panel_id == "departments-list") {
			$.each(list, function(index, element){
				var text = $(element).find('>:first-child').text().toUpperCase();
				var text_add = $(element).find('>:first-child').data("additional-lang").toUpperCase();
				if (text.indexOf(search_text) !== -1 || text_add.indexOf(search_text) !== -1) {
					$(element).parent().parent().fadeIn(300);
				} else {
					$(element).parent().parent().fadeOut(300);
				}
			});
			ResizeDepartments();
		}
		if(panel_id == "region-list"){
			if(cityList.length){
				if(search_text.length >= 3) {
					$.each(cityList, function(i,el){
						var mainText = el.text().toUpperCase();
						var aditionalText = el.data("additional-lang").toUpperCase();
						var panel = el.parent().parent().parent().parent();
						if(mainText.indexOf(search_text) !== -1 || aditionalText.indexOf(search_text) !== -1) {
							el.removeClass("hidden");
							el.addClass("show");
						} else {
							el.removeClass("show");
							el.addClass("hidden");
						}

						if(panel.find(".city-item.show").length > 0) {
							panel.show();
							panel.children().last().not("active").addClass("in");
							panel.children().first().children().not("active").removeClass("collapsed");
						} else {
							panel.hide();
						}
					});
				} else {
					$("#region-list .panel").show();
					$("#region-list .panel").find(".panel-collapse.collapse").not("active").removeClass("in");
					$("#region-list .panel").find(".region-head").not("active").addClass("collapsed");
					$("#region-list .panel").find(".panel-collapse.collapse.active").addClass("in");
					$("#region-list .panel").find(".region-head.active").not("active").removeClass("collapsed");
					$(".city-item").removeClass("hidden").removeClass("show");
				}
			} else {
				GetCitiesList();
			}
		}
	});

	$(".region-show-btn").on("click", function(){
		var btnA =  $(this);
		var blockA = $(this).parent().parent().parent();
		if(btnA.hasClass("active") && blockA.hasClass("active")){
			btnA.removeClass("active");
			blockA.removeClass("active");
		}
		else if(!btnA.hasClass("active") && !blockA.hasClass("active")){
			btnA.addClass("active");
			blockA.addClass("active");
		}
	});
});