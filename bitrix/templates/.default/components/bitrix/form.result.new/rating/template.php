<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<?
$params = array(
	"uk" => array("q1" => "SIMPLE_QUESTION_183", "q1_name" => "form_textarea_1", 
				  "q2" => "SIMPLE_QUESTION_452", "q2_name" => "form_text_2", 
				  "q3" => "SIMPLE_QUESTION_885", "q3_name" => "form_text_5",
				  "q4" => "SIMPLE_QUESTION_392", "q4_name" => "form_text_28"),

	"ru" => array("q1" => "SIMPLE_QUESTION_532", "q1_name" => "form_textarea_3",
				  "q2" => "SIMPLE_QUESTION_399", "q2_name" => "form_text_4",
				  "q3" => "SIMPLE_QUESTION_589", "q3_name" => "form_text_6",
				  "q4" => "SIMPLE_QUESTION_829", "q4_name" => "form_text_27")
);
$lang = getMessage("API_LANG");
$number = isset($_POST['tm']) && !empty($_POST['tm']) ? trim(strip_tags($_POST['tm'])) : '';
$number = isset($_POST['track_number']) && !empty($_POST['track_number']) ? trim(strip_tags($_POST['track_number'])) : $number;
?>
<script>
 $ (function (){
   $("#sender-phone").mask("+38(099)999-99-99");
 });
$(".rate-block").on("click touch", function(){
	var name = '<?=$params[$lang]["q2_name"];?>';
	$("input[name='"+name+"']").val($("input[name='score']").val());
})
</script>


<?=$arResult["FORM_NOTE"]?>
<a name="feedback"></a>
<?if ($arResult["isFormNote"] != "Y") {?>
	<?if ($arResult["isFormTitle"]) {?>
		<h3><?=$arResult["FORM_TITLE"]?></h3>
	<?}?>
	<?=$arResult["FORM_HEADER"]?>
	
	<?if ($arResult["isFormErrors"] == "Y"):?><?=$arResult["FORM_ERRORS_TEXT"];?><?endif;?>
	

                    <textarea placeholder="<?echo $arResult["QUESTIONS"][$params[$lang]["q1"]]["CAPTION"];?>..." name="<?echo $params[$lang]["q1_name"];?>"></textarea>
					<h3><?echo $arResult["QUESTIONS"][$params[$lang]["q4"]]["CAPTION"];?></h3>
					<input type="text" id="sender-phone" class="inputtext" name="<?echo $params[$lang]["q4_name"];?>">
                    <h3><?echo $arResult["QUESTIONS"][$params[$lang]["q2"]]["CAPTION"];?></h3>
                    <div class="rate-block"></div>
<?
                        /**************It is The way to find rate. Add this to your code and remove lins from here***********/
                        //var currentScore = $('.rate-block').raty('score');
                        /*********************************************/
?>
					<input type="text" class="inputtext" name="<?echo $params[$lang]["q2_name"];?>" value="" size="5" style="display:none;">
					<input type="text" class="form_ttn_number" name="<?echo $params[$lang]["q3_name"];?>" value="<?=$number?>" size="10" style="display:none;">
                    <input type="submit" class="submit-button" value="<?=$arResult["arForm"]["BUTTON"]?>" name="web_form_submit">

<?=$arResult["FORM_FOOTER"]?>
<?
} //endif (isFormNote)
?>