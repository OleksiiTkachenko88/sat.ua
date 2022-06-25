$(document).ready(function(){
		
    $('.page__map-container.collapse .btn--more_map').on('click', function(){
        var $more = $(this);
        var $collapse = $more.parents('.page__map-container.collapse');

        if ($collapse.hasClass('in')) {
            $collapse.removeClass('active').collapse('hide');
        } else {
            $collapse.addClass('active').collapse('show');
        }

        return false;
    });

    $('.comment-container .btn--more_map').on('click', function(){
        var $more = $(this);
        var $container = $more.parents('.comment-container');
        var $collapse = $container.find('.collapse');

        if ($collapse.hasClass('in')) {
            $container.removeClass('active');
            $collapse.collapse('hide');
        } else {
            $container.addClass('active');
            $collapse.collapse('show');
        }

        return false;
    });
		
		
	$('.sidenav__link--phone').click(function(){
        
        $('.bx-imopenlines-config-sidebar').addClass('bx-imopenlines-config-sidebar-open');
        
		return false;
	});
	
	if($('.swiper-container--main').length > 0)
	{
		var swiperMain = $('.swiper-container--main')[0].swiper;
		
		$('.panel__container--main').find('a').on('click', function () {
			//var hash	= $(this).attr('href').replace(/#/g, '');
			var	slide_code	= $(this).data('slide-code');
			if(slide_code != '')
			{
				var index 		= $(swiperMain.wrapper[0]).children('div').index($('[data-hash="' + slide_code + '"]'));
				console.log(index);
				
				if(index != -1)
				{
			        swiperMain.slideTo(index);
			        $(this).addClass('active');
        	        return false;
		        }
	        }
	        return true;
	    });
    }

	$(".fancybox").fancybox({
		padding: 0,
	});

    $('a.print').click(function(){
        
    });
    
    
    function printDiv(divName) {
        
  
    }
    
    

})