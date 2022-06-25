<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<div class="page__col-section-wrapper">
	<div class="page__col-section">
		<article class="article">
			<header class="article__header">
				<figure class="article__img-container">
				<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arResult["DETAIL_PICTURE"])):?>
            		<img
            			class="article__img"
            			border="0"
            			src="<?=$arResult["DETAIL_PICTURE"]["SRC"]?>"
            			width="<?=$arResult["DETAIL_PICTURE"]["WIDTH"]?>"
            			height="<?=$arResult["DETAIL_PICTURE"]["HEIGHT"]?>"
            			alt="<?=$arResult["DETAIL_PICTURE"]["ALT"]?>"
            			title="<?=$arResult["DETAIL_PICTURE"]["TITLE"]?>"
            			/>
            	<?else:?>
            		<img src="http://placehold.it/980x555" alt="" width="980" height="555" class="article__img">		
            	<?endif?>
				</figure>
				<?if($arParams["DISPLAY_DATE"]!="N" && $arResult["DISPLAY_ACTIVE_FROM"]):?>
                	<time class="article__header-date"><?=$arResult["DISPLAY_ACTIVE_FROM"]?></time>
            	<?endif;?>
				<h3 class="article__header-title"><?=$arResult["NAME"]?></h3>
			</header>
			<div class="article__body">
				<?if(strlen($arResult["DETAIL_TEXT"])>0):?>
            		<?echo $arResult["DETAIL_TEXT"];?>
            	<?else:?>
            		<?echo $arResult["PREVIEW_TEXT"];?>
            	<?endif?>
			</div>
		</article>
		<div class="comment-container active">
									<div class="comment-container-button-top text-xs-center">
										<span class="btn btn--more btn--more--alt">
											<span class="btn__text">Розгорнути коментарі</span>
											<span class="btn__text">Згорнути коментарі</span>
											<i class="icon icon--arrow-down-grey"></i>
										</span>
									</div>
									<div class="comment-container-item collapse in">
										<div class="comment-item">
											<img src="http://placehold.it/65x65" alt="" width="65" height="65" class="comment-item__ava">
											<div class="comment-item__header">
												<div class="comment-item__header-title">Сергій Іванович Семеренко</div>
												<div class="comment-item__header-date">28.09.2016</div>
											</div>
											<div class="comment-item__body">Наша сила в единстве! Мы обязаны выполнять свой долг, который заключается в оказании всевозможной поддержки, как
												материальной, так и моральной. Мы всегда должны помнить, что находясь там, на востоке, бойцы защищают в первую
												очередь нас с вами, отстаивая интересы Украины и борясь за независимость.</div>
										</div>
										<div class="comment-item">
											<img src="http://placehold.it/65x65" alt="" width="65" height="65" class="comment-item__ava">
											<div class="comment-item__header">
												<div class="comment-item__header-title">Сергій Іванович Семеренко</div>
												<div class="comment-item__header-date">28.09.2016</div>
											</div>
											<div class="comment-item__body">Наша сила в единстве! Мы обязаны выполнять свой долг, который заключается в оказании всевозможной поддержки, как
												материальной, так и моральной. Мы всегда должны помнить, что находясь там, на востоке, бойцы защищают в первую
												очередь нас с вами, отстаивая интересы Украины и борясь за независимость.</div>
										</div>
										<div class="comment-item">
											<img src="http://placehold.it/65x65" alt="" width="65" height="65" class="comment-item__ava">
											<div class="comment-item__header">
												<div class="comment-item__header-title">Сергій Іванович Семеренко</div>
												<div class="comment-item__header-date">28.09.2016</div>
											</div>
											<div class="comment-item__body">Наша сила в единстве! Мы обязаны выполнять свой долг, который заключается в оказании всевозможной поддержки, как
												материальной, так и моральной. Мы всегда должны помнить, что находясь там, на востоке, бойцы защищают в первую
												очередь нас с вами, отстаивая интересы Украины и борясь за независимость. </div>
										</div>
										<div class="comment-item">
											<img src="http://placehold.it/65x65" alt="" width="65" height="65" class="comment-item__ava">
											<div class="comment-item__header">
												<div class="comment-item__header-title">Сергій Іванович Семеренко</div>
												<div class="comment-item__header-date">28.09.2016</div>
											</div>
											<div class="comment-item__body">Наша сила в единстве! Мы обязаны выполнять свой долг, который заключается в оказании всевозможной поддержки, как
												материальной, так и моральной. Мы всегда должны помнить, что находясь там, на востоке, бойцы защищают в первую
												очередь нас с вами, отстаивая интересы Украины и борясь за независимость. </div>
										</div>
										<div class="comment-item">
											<img src="http://placehold.it/65x65" alt="" width="65" height="65" class="comment-item__ava">
											<div class="comment-item__header">
												<div class="comment-item__header-title">Сергій Іванович Семеренко</div>
												<div class="comment-item__header-date">28.09.2016</div>
											</div>
											<div class="comment-item__body">Наша сила в единстве! Мы обязаны выполнять свой долг, который заключается в оказании всевозможной поддержки, как
												материальной, так и моральной. Мы всегда должны помнить, что находясь там, на востоке, бойцы защищают в первую
												очередь нас с вами, отстаивая интересы Украины и борясь за независимость. </div>
										</div>
									</div>
									
									<div id="collapseComment" class="collapse in">
										<h3 class="form__title-2 form__title-alt m-y-0">Додайте ваш коммент</h3>
										<div class="comment-item">
											<img src="http://placehold.it/65x65" alt="" width="65" height="65" class="comment-item__ava">
											<div class="input_name">
												<form id="name" method="post">
													<input type="text" name="first_name" id="first" value='' placeholder="Введiть им'я">	
												</form>
										</div>
										</div>
										
										<div class="form-group">
											<textarea id="foo" name="foo" cols="94" rows="4" class="form-control form-control--alt"></textarea>
										</div>
										<script>
								$(document).ready(function(){
									var textArea = $('#foo');
									var maxRows = textArea.attr('rows');
									var maxChars = textArea.attr('cols');
									textArea.keypress(function(e){
										var text = textArea.val();
										var lines = text.split('\n');
										if (e.keyCode == 13){
											return lines.length < maxRows;
										}
										else{ //Should check for backspace/del/etc.
											var caret = textArea.get(0).selectionStart;
											console.log(caret);
											
											var line = 0;
											var charCount = 0;
											$.each(lines, function(i,e){
												charCount += e.length;
												if (caret <= charCount){
													line = i;
													return false;
												}
												//\n count for 1 char;
												charCount += 1;
											});
												   
											var theLine = lines[line];
											return theLine.length < maxChars;
										}
									});
									
								});
							</script>
										<div class="captcha"><img src="<?=MARKUP?>/images/kapt.png" alt=""></div>
									</div>
									<div class="comment-container-button-bottom text-xs-right">
										<a href="#collapseComment" data-toggle="collapse" class="btn btn--outline btn--accent btn--alt">Коментувати</a>
									</div>
									<!--<div id="comment" class="comment-container-button-bottom text-xs-right">
										<a href="#collapseComment" data-toggle="collapse" class="btn btn--outline btn--accent btn--alt">Коментувати</a>
									</div>-->
								</div>
	</div>
</div>