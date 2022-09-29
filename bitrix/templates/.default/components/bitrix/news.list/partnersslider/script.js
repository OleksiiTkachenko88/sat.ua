$(document).ready(function(){

$('.partners-slider .header .owl-nav .owl-next').click(function() {
	var owl = $('.partners-slider .owl-carousel');
	owl.trigger('next.owl.carousel', [1000]);
})

$('.partners-slider .header .owl-nav .owl-prev').click(function() {
	var owl = $('.partners-slider .owl-carousel');
	owl.trigger('prev.owl.carousel', [1000]);
})
var windW = $(window).width();
	if ( device.tablet() || (windW > 768 && windW < 1000)) {
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			items:3,
			loop:true,
			margin:10,
			autoplay:true,
			autoplayTimeout:4000,
			autoplaySpeed: 1000,
			autoplayHoverPause:true,
			lazyLoad: true,
			mouseDrag: false,
			touchDrag: false,
			freeDrag: false,
		});
	} else if(device.mobile() || (windW <= 768)){
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			items:2,
			loop:true,
			margin:10,
			autoplay:true,
			autoplayTimeout:4000,
			autoplaySpeed: 1000,
			autoplayHoverPause:true,
			lazyLoad: true,
			mouseDrag: false,
			touchDrag: false,
			freeDrag: false,
		});
	} else {
		var owl = $('.owl-carousel');
		owl.owlCarousel({
			items:4,
			loop:true,
			margin:10,
			autoplay:true,
			autoplayTimeout:4000,
			autoplaySpeed: 1000,
			autoplayHoverPause:true,
			lazyLoad: true,
			mouseDrag: true,
			touchDrag: false,
			freeDrag: false,
		});
	}
});