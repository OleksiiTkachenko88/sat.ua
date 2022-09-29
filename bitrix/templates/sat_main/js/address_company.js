    /*******************Input mask**********************
    $ (function (){
        $("#sender-address").mask("+38(099)999-99-99");
        });

        */
       // place =  $("#fromDir-cityref").val(ui.item.value);
     //  var t = $("#sender-person").value;
      // var t = $("input[name='sender-person']").val();

      t = $("#sender-org-ref").val(ui.item.ref).trigger('change'); 

        $(function () {            
            $("#sender-address").autocomplete({
            source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getAddress&t=' + t,
            minLength: 3,
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (e, ui) {
                $("#sender-address").val(ui.item.value);              
                return false;
            },
            select: function (event, ui) {               
                $("#sender-address").val(ui.item.value);               
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = {value: "", id: "", label: noResultInfo};
                    ui.content.push(noResult);
                }
            }
        });

        $("#sender-org").autocomplete({
            source: '/bitrix/templates/sat_main/api.php?lang=' + api_lang + '&action=getCompany',
            minLength: 8,
            open: function (event, ui) {
                if (device.mobile() || device.tablet()) {
                    $('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
                }
            },
            focus: function (e, ui) {
                $("#sender-org").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {               
                $("#sender-org").val(ui.item.value);
                $("#sender-org-ref").val(ui.item.ref).trigger('change');   
              //  $("#sender-person").val(ui.item.ref).trigger('change');           
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = {value: "", id: "", label: noResultInfo};
                    ui.content.push(noResult);
                }
            }
        });
    });