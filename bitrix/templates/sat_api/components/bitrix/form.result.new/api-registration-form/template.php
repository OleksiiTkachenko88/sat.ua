<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
					<div class="border-block">
						<div class="registration-block">
							<div class="breadcrumbs">
								<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
									<a itemprop="url" href="<?echo SITE_DIR;?>"> 
										<span itemprop="title"><?=getMessage("API_MAIN_PAGE")?></span> </a>| 
								</span>
								<span itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> 
									<span itemprop="title"><?=getMessage("API_REGISRATION_H1")?></span> 
								</span>
							</div>
							<div class="header">
								<div class="img-wrap">
										<img src="/bitrix/templates/sat_api/img/icons/api-registration-icon.png" alt="">
									</div>
								<h1><?echo GetMessage("API_REGISRATION_H1");?></h1>   <!--$arResult["FORM_TITLE"]-->
							</div>
							<div class="row">

								<div class="col-xs-12">
									<div class="registration-done">
										<div class="content-item">
											<div class="registration-form">
												<div class="send-container">
													<h2><?echo GetMessage("API_REGISTRATION_DONE");?></h2>
												</div>
											</div>
										</div>
									</div>
									<div class="registration-error">
										<div class="content-item">
											<div class="registration-form">
												<div class="send-container">
													<h2>Error</h2>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-sm-6">
									<div class="registration-start">
										<div class="content-item">
											<div class="registration-form">
												<label><?echo GetMessage("API_REGISRATION_Q1");?></label>
												<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_944"]["HTML_CODE"];?>
		
												<label><?echo GetMessage("API_REGISRATION_Q2");?></label>
												<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_693"]["HTML_CODE"];?>
		
												<label><?echo GetMessage("API_REGISRATION_Q3");?></label>
												<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_852"]["HTML_CODE"];?>
		
												<label><?echo GetMessage("API_REGISRATION_Q4");?></label>
												<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_269"]["HTML_CODE"];?>
		
												<label><?echo GetMessage("API_REGISRATION_Q5");?></label>
												<?=$arResult["QUESTIONS"]["SIMPLE_QUESTION_386"]["HTML_CODE"];?>
												<input type="hidden" name="city-ref">
												<p><?echo GetMessage("API_REGISRATION_Q5_DESC");?></p>
		
												<div class="send-container">
													<input class="submit-button registration-submit" type="submit" name="web_form_submit" value="<?=htmlspecialcharsbx(strlen(trim($arResult["arForm"]["BUTTON"])) <= 0 ? GetMessage("FORM_ADD") : GetMessage("API_REGISTRATION_SEND"));?>" />
												</div>
												<?if ($arResult["isFormErrors"] == "Y"):?><?=$arResult["FORM_ERRORS_TEXT"];?><?endif;?> 
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-6">
									<div class="registration-start">
										<div class="content-item">
										<?
										$APPLICATION->IncludeFile($APPLICATION->GetCurDir() . "api_registration_inc.php", Array(), Array(
											"MODE"      => "html",
											"NAME"      => "текста",
											"TEMPLATE"  => "text.php"
											));
										?>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>