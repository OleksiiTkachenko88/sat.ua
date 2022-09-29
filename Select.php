<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Title");
?>
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8" />
   <title>Примеры для плагина jQuery Form Styler</title>
   <link href="http://alending.ru/select/jquery.formstyler.css" rel="stylesheet" />
   <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
   <script src="http://alending.ru/select/jquery.formstyler.js"></script>
   <style>.row{margin-bottom: 15px;}</style>
   <script>
      //   Функцию нашел, урезал вроде работает нормально)
      (function () {
         "use strict";
         jQuery(function () {
            $( '#type' ).change(function () {
               $( '#kind, #category' ).find( 'option:not(:first)' )
                  .remove()
                  .end()   
                  .prop( 'disabled',true );
               var type_id = $( this ).val();
               if (type_id == 0) { return; }
               $.ajax({
                  type: "POST",
                  url: "query.php",
                  dataType: "json",
                  data: "query=getKinds&type_id=" + type_id,
                  error: function () {
                     for ( var i = 0; i < 10; i++ ) {
                        $( '#kind' ).append( '<option value="' + i + '">' + i + ' item</option>' );
                     }
        $( '#kind' ).prop( 'disabled', false );
       setTimeout(function() {  
      $('input, select').trigger('refresh');  
    }, 1)
                  },
                  success: function ( data ) {
                     for ( var i = 0; i < data.length; i++ ) {
                        $( '#kind' ).append( '<option value="' + data[i].kind_id + '">' + data[i].kind + '</option>' );
                     }
                    
                  }
               });
            });
         }); 
      })();
      //
      (function($) {
      $(function() {
         $('select').styler();
      })
      })(jQuery)

      $(document).ready(function() {
        setTimeout(function() {  
          $('input, select').trigger('refresh');  
        }, 1)
      }); 
   </script>
</head>

<body>

<form action="" method="post">
  <div class="row">
     <label for="type">Марка авто:</label>
     <select id="type">
        <option value="0">Выберите из списка</option>
        <option value="1">Tayota</option>
        <option value="2">Volvo</option>
        <option value="3">Opel</option>
     </select>
  </div>

  <div class="row">
     <label for="kind">Модель авто:</label>
     <select id="kind" disabled>
        <option value="0">Выберите из списка</option>
     </select>
  </div>
</form>

</body>
</html><?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>