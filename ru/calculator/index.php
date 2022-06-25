<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");?>
	<div class="page__block page__block--calc calc__container">
		<div id="cal" class="container-fluid">
    		
<!--
    		<div class="calc-group calc-group--transparent">
							<div class="navbar navbar--calc">
								<div class="navbar__primary-content">
									<i class="icon icon--box-white navbar__icon"></i>
									<input type="text" placeholder="Назвіть вантаж для його легкого розпізнавання вами серед ваших відправлень" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
-->
    		
<!--
			<div class="calc-group calc-group--transparent hidden-xs-up">
				<div class="navbar navbar--calc">
					<div class="navbar__primary-content">
						<i class="icon icon--box-white navbar__icon"></i>
						<input type="text" placeholder="Назвіть вантаж для його легкого розпізнавання вами серед ваших відправлень"
							class="form-control navbar__form-control">
							
					</div>
				</div>
			</div>
-->
			<div class="calc-group">
				<div class="calc-group__toggle"></div>
				<div class="uk-grid uk-grid-width-small-1-1 uk-grid-width-medium-1-1 uk-grid-width-large-1-2 uk-grid-width-xlarge-1-2 calc-group__row">
					<div class="col first">
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--accent">
								<div class="navbar__primary-content">
									<span class="navbar__icon">
										<span class="icon icon--letter-A"></span>
									</span>
									<input type="text" placeholder="Вкажіть пункт відправлення або поставте крапку на карті" class="calc_city_point calc_city_from form-control navbar__form-control">
									
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--accent p-r-0">
								<div class="navbar__primary-content">
									<ul id="sklad" class="navbar__nav place_from">
										<li class="department active">
											<a href="">
												<i class="icon icon--stock-grey"></i> <span>Склад</span>
								            </a>
										</li>
										<li class="door">
											<a href="">
												<i class="icon icon--door-grey"></i> <span>Двери</span>
								            </a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
    							<div class="wrapCalendar">
    								<div class="navbar__primary-content calendar from">
        								<i class="icon icon--date-light-grey navbar__icon data-open" data-open></i>
        								<input type="text" class="form-control navbar__form-control input-date" data-input/>
    								</div>
    							</div>	
								<div class="wrapTimer timeFrom">
    								<input type="text" placeholder="c" class="timer "/>
                                    <input type="text" placeholder="до" class="timer "/>
								</div>
								
								<div class="wrapDepartureConditions">
        							<h7>Дополнительные условия выезда</h7>
                                    <div id="departureConditions"></div>
    							</div>
							</div>
							
						    
							
						</div>
						<div class="calc-group hidden-lg-up">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<div class="navbar__icon">
										<i style="background-image:url('http://placehold.it/60px60px')" class="icon icon--ava"></i>
									</div>
									<input type="text" value="Сергій Іванович Семеренко" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group hidden-lg-up">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--phone-light-grey navbar__icon"></i>
									<input type="text" value="+380 00 000 00 00" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group hidden-lg-up">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--email-light-grey navbar__icon"></i>
									<input type="text" value="mail@ya.ru" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group hidden-lg-up">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--map-light-grey navbar__icon"></i>
									<input type="text" value="ул. Ивана Иванович, 26" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
					</div>
					<div class="col second">
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--accent">
								<div class="navbar__primary-content">
									<span class="navbar__icon">
										<span class="icon icon--letter-B"></span>
									</span>
									<input type="text" placeholder="Вкажіть пункт відправлення або поставте крапку на карті" class="calc_city_point calc_city_to form-control navbar__form-control">
									<input type="hidden" name="city_ref" value="">
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--accent p-l-0">
								<div class="navbar__primary-content">
									<ul id="sklad"  class="navbar__nav place_to">
										<li class="active department">
											<a href="">
												<i class="icon icon--stock-grey"></i> <span>Склад</span>
								            </a>
										</li>
										<li class="door">
											<a href="">
												<i class="icon icon--door-grey"></i> <span>Двери</span>
								            </a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
    							<div class="wrapCalendar">
    								<div class="navbar__primary-content calendar to">
    									<i class="icon icon--date-light-grey navbar__icon" data-open ></i>
        								<input type="text" class="form-control navbar__form-control input-date" data-input />
    								</div>
    							</div>	
								<div class="wrapTimer timeTo">
    								<input type="text" placeholder="c" class="timer "/>
                                    <input type="text" placeholder="до" class="timer "/>
								</div>
								<div class="wrapDeliveryConditions">
        							<h7>Дополнительные условия доставки</h7>
                                    <div id="deliveryConditions"></div>
    							</div>
							</div>
						</div>
						<div class="calc-group hidden-lg-up">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<div class="navbar__icon">
										<i style="background-image:url('http://placehold.it/60px60px')" class="icon icon--ava"></i>
									</div>
									<input type="text" value="Юри Іванович Семеренко" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group hidden-lg-up">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--phone-light-grey navbar__icon"></i>
									<input type="text" value="+380 00 000 00 00" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group hidden-lg-up">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--email-light-grey navbar__icon"></i>
									<input type="text" value="mail3@ya.ru" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="calc-group">
				<h3 class="calc-group__title">Вкажіть тип та габарити вантажу</h3>
				<div class="calc-group__content">
					<div class="uk-form uk-form-horizontal">
						<div class="uk-grid calc_zoom uk-grid-width-small-1-1 uk-grid-width-medium-1-1 uk-grid-width-large-1-2 uk-grid-width-xlarge-1-2">
							<div id="part1" class="uk-form uk-form-horizontal">
								<div class="uk-form-row">
									<label for="" class="uk-form-label">Тип груза</label>
									<div class="uk-form-controls">
										<div data-uk-form-select="" class="uk-button uk-form-select">
											<span></span>
											
											<select id="cargoTypes"></select>
											
										</div>
									</div>
								</div>
								<div class="uk-form-row">
									<label for="" class="uk-form-label">Подтип груза</label>
									<div class="uk-form-controls">
										<div data-uk-form-select="" class="uk-button uk-form-select">
											<span></span>
	
											<select id="cargoTypesSub"></select>
											
										</div>
									</div>
								</div>
								<div class="uk-form-row">
									<label for="" class="uk-form-label">Количество</label>
									<div class="uk-form-controls">
										<input type="text" value="0" class="uk-form-width-small text-xs-center">
									</div>
								</div>

								<div class="uk-form-row">
									<label for="" class="uk-form-label">Вес</label>
									<div class="uk-form-controls">
										<input type="text" value="0" name="weight" class="uk-form-width-small text-xs-center">
										<span class="uk-form-suffix">кг</span>
									</div>
								</div>
								
								<div class="uk-form-row">
									<label for="" class="uk-form-label">Объем</label>
									<div class="uk-form-controls">
										<input type="text" value="0" name="volumeGeneral" class="uk-form-width-small text-xs-center">
										<span class="uk-form-suffix">м
											<sup>3</sup>
										</span>
									</div>
								</div>
								<div class="uk-form-row">
									<label for="" class="uk-form-label">Декларированная стоимость</label>
									<div class="uk-form-controls">
										<input type="text" value="0" name="declaredCost" class="uk-form-width-small text-xs-center">
										<span class="uk-form-suffix">руб.</span>
									</div>
								</div>
							</div>
							
							<div id="part2" class="uk-form uk-form-horizontal uk-form-horizontal--half">
								<div class="uk-form-calc-dimensions__container">
									<div class="uk-form-calc-dimensions__image-container">
										<div class="hint-block text-xs-center">Визуализация метричных параметров вашего груза</div>
										<div class="uk-form-calc-dimensions__image-wrapper">
											<section class="cube__container">
												<div class="truck_ani">
																<img src="/local/markup/dist/assets/images/svg/truck_ani.svg" alt="truck_ani">
															</div>
												<div id="cube" class="cube">
													<figure class="front"></figure>
													<figure class="back"></figure>
													<figure class="right"></figure>
													<figure class="left"></figure>
													<figure class="top"></figure>
													<figure class="bottom"></figure>
												</div>
											</section>
										</div>
									</div>
									<div class="uk-form-row">
										<label for="" class="uk-form-label">Длина</label>
										<div class="uk-form-controls">
											<input id="cube_input_length" type="text" name="length" value="0" class="uk-form-width-small text-xs-center">
											<span class="uk-form-suffix">м</span>
										</div>
									</div>
									<div class="polzunok bootstrap-slider-container bootstrap-slider-container--right">
										<span class="uk-form-prefix">0 м</span>
										<div id="cube_slider_length" data-provide="slider" data-slider-min="0" data-slider-max="2" data-slider-step="0.001"
											data-slider-value="0" data-slider-tooltip="hide" class="slider"></div>
										<span class="uk-form-suffix">2 м</span>
									</div>
									<div class="uk-form-row">
										<label for="" class="uk-form-label">Ширина</label>
										<div class="uk-form-controls">
											<input id="cube_input_width" type="text" name="width" value="0" class="uk-form-width-small text-xs-center">
											<span class="uk-form-suffix">м</span>
										</div>
									</div>
									<div class="polzunok bootstrap-slider-container bootstrap-slider-container--right">
										<span class="uk-form-prefix">0 м</span>
										<div id="cube_slider_width" data-provide="slider" data-slider-min="0" data-slider-max="2" data-slider-step="0.001"
											data-slider-value="0" data-slider-tooltip="hide" class="slider"></div>
										<span class="uk-form-suffix">2 м</span>
									</div>
									<div class="uk-form-row">
										<label for="" class="uk-form-label">Высота</label>
										<div class="uk-form-controls">
											<input id="cube_input_height" type="text" name="height" value="0" class="uk-form-width-small text-xs-center">
											<span class="uk-form-suffix">м</span>
										</div>
									</div>
									<div class="polzunok bootstrap-slider-container bootstrap-slider-container--right">
										<span class="uk-form-prefix">0 м</span>
										<div id="cube_slider_height" data-provide="slider" data-slider-min="0" data-slider-max="2" data-slider-step="0.001"
											data-slider-value="0" data-slider-tooltip="hide" class="slider"></div>
										<span class="uk-form-suffix">2 м</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="calc-group">
    			<h3 class="calc-group__title">Услуги</h3>
    			<div id="services"></div>
    			<?/*<div class="calc-group__content p-y-0">
        			<div data-uk-accordion="{collapse: false}" class="uk-accordion uk-accordion--calc">
            			<h3 class="uk-accordion-title">Дополнительные услуги</h3>
            			<div class="uk-accordion-content" id="additionalServices">
            			</div>
            			<h3 class="uk-accordion-title">Дополнительные условия выезда</h3>
            			<div class="uk-accordion-content" id="departureConditions">
            			</div>
            			<h3 class="uk-accordion-title">Дополнительные условия доставки</h3>
            			<div class="uk-accordion-content" id="deliveryConditions">
            			</div>
        			</div>
    			</div>*/?>
			</div>
			<div class="calc__footer text-xs-center">
				<div class="uk-form-row">
					<label for="" class="uk-form-label"></label>
					<div class="uk-form-controls">
						<a href="" class="btn btn--more btn--higher btn--blue" id="calculate">Рассчитать</a>
					</div>
				</div>
			</div>

						<div class="declaration__container" id="check">
							<div class="declaration__blank">
								<div class="declaration__arr-id"></div>
								<div class="uk-grid uk-grid-divider declaration__grid">
									<div class="declaration__section-left uk-width-small-1-1 uk-width-medium-1-1 uk-width-large-4-10 uk-width-xlarge-4-10">
										<div class="declaration__block declaration__block--from">
											<div class="declaration__block-header">
												<div class="icon icon--letter-A town"></div>
												<span class="city_from"></span>
												<span class="declaration__block-header-pointer point_from">Двері</span>
											</div>
											<div class="declaration__item address"></div>
											<div class="declaration__item description"></div>
											<div class="declaration__item date">
												<div class="declaration__item-content declaration__item-content--left">
													<i class="icon icon--date-light-grey-sm"></i><span></span></div>
											</div>
										</div>
										<div class="declaration__item number">
											<span class="declaration__number" ></span>
										</div>
										<div class="declaration__block declaration__block--to">
											<div class="declaration__block-header">
												<div class="icon icon--letter-B"></div>
												<span class="city_to"></span>
												<span class="declaration__block-header-pointer point_to">Склад</span>
											</div>
											<div class="declaration__item description"></div>
											<div class="declaration__item address"></div>
											<div class="declaration__item date">
												<div class="declaration__item-content declaration__item-content--left">
													<i class="icon icon--date-light-grey-sm"></i><span></span></div>
											</div>
										</div>
									</div>
									<div class="declaration__section-right uk-width-small-1-1 uk-width-medium-1-1 uk-width-large-6-10 uk-width-xlarge-6-10">
										<div class="declaration__item">
											<strong class="declaration__item-title declaration__item-title--width-1">Тип груза</strong>
											<span class="declaration__item-content declaration__item-content--left">
												<span id="cargoType" class="text-uppercase">Корреспонденция</span>
											</span>
										</div>
										<?/*<div class="declaration__item">
											<strong class="declaration__item-title declaration__item-title--width-1">Пакування</strong>
											<span class="declaration__item-content declaration__item-content--left">
												<span class="text-uppercase">Деревянный ящик</span>
											</span>
										</div>*/?>
										<div class="uk-grid uk-grid-width-small-1-2 uk-grid-width-medium-1-2 uk-grid-width-large-1-2 uk-grid-width-xlarge-1-2">
											<div class="col">
												<div class="declaration__item">
													<strong class="declaration__item-title declaration__item-title--width-1">Ширина</strong>
													<span id="width" class="declaration__item-content">5 м</span>
												</div>
												<div class="declaration__item">
													<strong class="declaration__item-title declaration__item-title--width-1">Висота</strong>
													<span id="height" class="declaration__item-content">7 м</span>
												</div>
											</div>
											<div class="col">
												<div class="declaration__item">
													<strong class="declaration__item-title declaration__item-title--width-1">Глибина</strong>
													<span  id="length" class="declaration__item-content">2 м</span>
												</div>
												<div class="declaration__item">
													<strong class="declaration__item-title declaration__item-title--width-1">Вага</strong>
													<span id="weight" class="declaration__item-content">300 кг</span>
												</div>
											</div>
										</div>
										<?/*<div class="declaration__hr"></div>
										<div class="declaration__item">
											<strong class="declaration__item-title">Вартість за габарити</strong>
											<span class="declaration__item-content">
												<span class="pull-right">1 200 грн</span>
											</span>
										</div>*/?>
										<div class="declaration__hr"></div>
										<strong class="declaration__item-title">Дополнительные услуги</strong>
										<table class="declaration__table" id="declaration_table">
											<tr>
												<td class="td-icon">
													<i class="fa fa-check"></i>
												</td>
												<td class="td-title">Дополнительная услуга
													<span class="text-muted">/ <span id="addServices"></span></span>
												</td>
												<td class="td-price" id="addServicesCost"></td>
											</tr>
											<tr>
												<td class="td-icon">
													<i class="fa fa-check"></i>
												</td>
												<td class="td-title">Условие доставки
													<span class="text-muted">/ <span id="deliveryCondition"></span></span>
												</td>
												<td class="td-price" id="deliveryCost"></td>
											</tr>
											<tr>
												<td class="td-icon">
													<i class="fa fa-check"></i>
												</td>
												<td class="td-title">Условие выезда
													<span class="text-muted">/ <span id="departureCondition"></span></span>
												</td>
												<td class="td-price" id="departureCost"></td>
											</tr>
										</table>
										<div class="declaration__hr"></div>
										<div class="declaration__item">
											<strong class="declaration__item-title">Декларированная стоимость</strong>
											<span id="declaredCost" class="declaration__item-content price"></span>
										</div>
										<div class="declaration__item declaration__item--footer">
											<strong class="declaration__item-title">Стоимость</strong>
											<span id="cost" class="declaration__item-content total-price"></span>
										</div>
									</div>
								</div>
								<div class="declaration__section-footer">
									<div class="barcode"></div>
									<span class="phone">0 800 502 25 25</span>
									<span class="phone-hint">Безкоштовна гаряча лінія</span>
								</div>
							</div>
							<div class="declaration__footer">
								<span class="declaration__footer-title">
									<span class="text-accent">Ваша заявка</span> <!-- італійський різний фурнітур --></span>
								<span class="declaration__footer-actions">
									<a href="" class="download icon icon--download-blue"></a>
									<a href="" class="email icon icon--email-blue"></a>
									<a href="" class="print icon icon--print-blue"></a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="user_order_fields">
    			<div class="calc-group hidden-md-down">
				<div class="uk-grid uk-grid-width-small-1-1 uk-grid-width-medium-1-1 uk-grid-width-large-1-2 uk-grid-width-xlarge-1-2 calc-group__row">
					<div class="col first" id="sender">
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<div class="navbar__icon">
										<i style="background-image:url('http://placehold.it/60px60px')" class="icon icon--ava"></i>
									</div>
									<input type="text" name="description" value="" placeholder="ФИО" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--phone-light-grey navbar__icon"></i>
									<input type="text" name="phone" value="" placeholder="+380 00 000 00 00" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--email-light-grey navbar__icon"></i>
									<input type="text" name="email" value="" placeholder="mail@ya.ru" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--map-light-grey navbar__icon"></i>
									<input type="text" name="address" value="" placeholder="ул. Ивана Иванович, 26" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
					</div>
					<div class="col second" id="recipient">
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<div class="navbar__icon">
										<i style="background-image:url('http://placehold.it/60px60px')" class="icon icon--ava"></i>
									</div>
									<input type="text" name="description" value="" placeholder="ФИО" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--phone-light-grey navbar__icon"></i>
									<input type="text" name="phone" value="" placeholder="+380 00 000 00 00" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--email-light-grey navbar__icon"></i>
									<input type="text" name="email" value="" placeholder="mail@ya.ru" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
						<div class="calc-group">
							<div class="navbar navbar--calc navbar--white">
								<div class="navbar__primary-content">
									<i class="icon icon--map-light-grey navbar__icon"></i>
									<input type="text" name="address" value="" placeholder="ул. Ивана Иванович, 26" class="form-control navbar__form-control">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    
    			<div class="calc-group">
    				<h3 class="calc-group__title">Примечание</h3>
    				<div class="calc-group__content">
    					<div class="hint-block text-uppercase m-t-0">Вкажіть додаткові побажання та інформацію стосовно відправки та отримання вашого надсилання</div>
    					<textarea name=""
    						cols="30" rows="10" class="form-control form-control--alt"></textarea>
    				</div>
    			</div>
    
        		<div class="calc__footer text-xs-center">
        			<a href="" class="btn btn--more btn--higher btn--blue" id="order">Оформить
        				<i class="icon icon--plus-accent"></i>
        			</a>
        		</div>
			</div>
		</div>
	</div>
		
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>