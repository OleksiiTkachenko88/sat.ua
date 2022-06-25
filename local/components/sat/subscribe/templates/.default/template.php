<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<div id="flu_cont_fon" class="panel__container panel__container--main panel__container--main--subscribe">
	<div id="flu_cont" class="container-fluid">
		<form  action="" class="panel panel--subscribe form">
			<div class="row">
				<div class="col-xs-12 col-lg-8">
					<? if(isset($arResult['SUCCESS']) && !empty($arResult['SUCCESS'])) { ?>
						<h2 class="form__title-4"><?=$arResult['SUCCESS']?></h2>
					<? } else { ?> 
						<h2 class="form__title-4">
							<?=GetMessage('SUBSCRIBE_TITLE')?>
						</h2>
						
						<? if(isset($arResult['ERRORS'])) { ?>
							<div class="error_text" style="color:red;"><?=implode('<br/>', $arResult['ERRORS'])?><br/></div>
						<? } ?>
												
						<div class="input-group-row">
							<?/*  <input type="text" value="" placeholder="<?=GetMessage('SUBSCRIBE_PLACEHOLDER')?>" class="form-control form-control--alt input-lg">  */?>

							<input type="text" name="email" class="form-control form-control--alt input-lg <?if(array_key_exists('EMAIL', $arResult['ERRORS'])) echo 'error ';?>" 
								<?if(array_key_exists('EMAIL', $arResult['ERRORS'])) {?>
									placeholder="<?=$arResult['ERRORS']['EMAIL']?>"
								<? } else { ?>
									placeholder="<?=GetMessage('SUBSCRIBE_PLACEHOLDER')?> *"
								<? } ?>
									 value="<?=$_REQUEST['email']?>"> 							
							
							<?/*<button type="submit" class="btn btn--accent btn--raised btn--alt btn-lg"><?=GetMessage('SUBSCRIBE_BTN')?></button>*/?>
							<input type="submit" name="subscribe_on_news" class="btn btn--accent btn--raised btn--alt btn-lg" value="<?=GetMessage('SUBSCRIBE_BTN')?>">
						</div>
						<div class="form-hint"><?=GetMessage('SUBSCRIBE_DESCRIPTION')?></div>

					<? } ?>
				</div>
				<div class="col-xs-12 col-lg-4 panel__col-image hidden-md-down">
					<img src="/local/markup/dist/assets/images/subscribe-img.png" alt="" width="298" height="319">
				</div>
			</div>
		</form>
	</div>
</div>
<? /*
<div class="footer__subscribe">
	<div class="menu__title">Подписаться на новости</div>
	<? if(isset($arResult['SUCCESS']) && !empty($arResult['SUCCESS'])) { ?>
		<small><?=$arResult['SUCCESS']?></small>
	<? } else { ?> 
		<form action="">
			<? if(isset($arResult['ERRORS']['ERROR_STRING'])) { ?>
				<small class="error_text"><?=$arResult['ERRORS']['ERROR_STRING']?></small>
			<? } else { ?>
				<small>Подпишитесь и узнавайте о новых релизах, акциях и прочее</small>
			<? } ?>
			<div class="form-group"> 
				<input type="text" name="email" class="form-control <?if(array_key_exists('EMAIL', $arResult['ERRORS'])) echo 'error ';?>" 
					<?if(array_key_exists('EMAIL', $arResult['ERRORS'])) {?>
						placeholder="Ваш e-mail: <?=$arResult['ERRORS']['EMAIL']?>"
					<? } else { ?>
						placeholder="Ваш e-mail *"
					<? } ?>
						 value="<?=$_REQUEST['email']?>"> 
			</div>
			<div class="form-submit">
				<input type="submit" name="subscribe_on_news" class="btn" value="Подписаться">
			</div>
		</form>
	<? } ?>
</div>*/