var refNNG = '';
function promoCheck (number) {
  var data = {
    "action": "promocode_check",
    "type": "sorrybonus",
    "number": number
  }

  $.ajax({
    url: "/bitrix/templates/sat_main/api.php",
    data: data,
    type: "GET",
    dataType : 'html',
    beforeSend:function(){
    //  $('.loader').css('display','inline-block');
    //  $('.calculate-section').css({'opacity':'0.6'});
    },
    success: function(msg) {
      msg = JSON.parse(msg);
      if( msg.success === "true" ){
        $('.promo').css('display','flex');   
       // $('.promo').css('opacity','0'); 
       $('.promo').css('transform','translateX(-150%)'); 
        $('.promo').css('animation','ani 1s forwards');

        refNNG = msg.data[0].ref;
      } else {
        $('.promo').css('display','none');
      } 
    }
  });
}

function promoSave (refNNG) {
  var data = {
    "action": "promocode_save",
    "type": "sorrybonus",
    "ref": refNNG,
    "promocode": $("input[name='inputPromo']").val()
  }
//dfb
  $.ajax({
    url: "/bitrix/templates/sat_main/api.php",
    data: data,
    type: "GET",
    dataType : 'html',
    beforeSend:function(){
      $('#loaderIMG').show();
      $('.error-promo').css('display','none');
    //  $('.calculate-section').css({'opacity':'0.6'});
    },
    success: function(msg) {
      msg = JSON.parse(msg);
      $('#loaderIMG').hide();
      if( msg.success === "true" ){
        error_text = 'Промокод застосований';
        $('.error-promo').css('display','flex');
        $('.error-promo').css('color','green');
        $('.error-promo').css('background','white');
        $('.error-promo').css('border','0');
        $('.promo').css({'display': 'none'});         
      } else {
        error_text = msg.error.text;
        $('.error-promo').css('display','flex');
        $('.error-promo').text(error_text);

      } 

    }
  });
}

window.addEventListener('load', () => {

   number = $("input[name='track_number']").val();
   promoCheck (number);

});

    


$(document).ready(function () { 

    $('#promoButton').on('click', function (e) {
      if( $("input[name='inputPromo']").val() != '' ){   
      promoSave (refNNG);
    }	else {
      $('.error-promo').css('display','flex');
      $('.error-promo').text('Заповніть поле');

}
});
    $('#trackButton').on('click', function (e) {
      e.preventDefault();
      var track_number = $("input[name='track_number']").val();
      //track_number = track_number.replace(/\D+/g, "");
      $("input[name='track_number']").val(track_number);
      if (track_number.length == 9) {
        $('.tracking-error').slideUp(300);
        $('.tracking-info').slideUp(300);
        $(this).parents("form").submit();
      } else {
        $("#track_error_reason").html("<?echo getMessage('TRACK_ERROR_NUMBER');?>");
        $('.tracking-info').slideUp(300);
        $('.tracking-error').slideDown(300);
        $(".rate-wrap").hide();
      }
    });
 
    $('.track-search').on('keypress', function (e) {
      if (e.keyCode == 13) {
        $('.track-action').trigger('click');		
      }
    });

}); 