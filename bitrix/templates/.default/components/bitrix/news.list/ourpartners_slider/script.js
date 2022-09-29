$(document).ready(function(){
	let windW = $(window).width();
	let countSlides = 4;
	if(device.tablet() || (windW > 768 && windW < 1000)) {
		countSlides = 3;
	} else if(device.mobile() || (windW <= 768)){
		countSlides = 2;
	}

	let owl = $('.owl-carousel');

	owl.owlCarousel({
		items:countSlides,
		autoplay:true,
		autoplayTimeout:4000,
		autoplaySpeed: 1000,
		loop:true,		//always true!
		lazyLoad:true,  //always true!
		margin:10,
		onInitialized: function(event){
			let images = document.querySelectorAll("."+$(this._plugins.lazy._loaded).children().children().attr("class"));
			lazyload(images);
		}
	});

	$('.partners-slider .header .owl-nav .owl-next').click(function() {
		owl.trigger('next.owl.carousel', [1000]);
	})

	$('.partners-slider .header .owl-nav .owl-prev').click(function() {
		owl.trigger('prev.owl.carousel', [1000]);
	})


});