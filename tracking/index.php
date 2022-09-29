<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");?>
				<div class="page__block page__block--calc calc__container">
					<div class="container-fluid">
						<div class="calc-group calc-group--transparent">
							<div class="navbar navbar--calc">
								<div class="navbar__primary-content">
									<i class="icon icon--box-white navbar__icon"></i>
									<input type="text" placeholder="Назвіть вантаж для його легкого розпізнавання вами серед ваших відправлень"
										class="form-control navbar__form-control">
								</div>
							</div>
						</div>
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
												<input type="text" placeholder="Вкажіть пункт відправлення або поставте крапку на карті" class="form-control navbar__form-control">
											</div>
										</div>
									</div>
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--accent p-r-0">
											<div class="navbar__primary-content">
												<ul class="navbar__nav">
													<li>
														<a href="">
															<i class="icon icon--stock-grey"></i> Склад</a>
													</li>
													<li class="active">
														<a href="">
															<i class="icon icon--door-grey"></i> Двері</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--white">
											<div class="navbar__primary-content">
												<i class="icon icon--date-light-grey navbar__icon"></i>
												<input type="text" value="15 березня 2016 з 12 : 45 до 12 : 45" class="form-control navbar__form-control input-date">
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
												<input type="text" placeholder="Вкажіть пункт відправлення або поставте крапку на карті" class="form-control navbar__form-control">
											</div>
										</div>
									</div>
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--accent p-l-0">
											<div class="navbar__primary-content">
												<ul class="navbar__nav">
													<li class="active">
														<a href="">
															<i class="icon icon--stock-grey"></i> Склад</a>
													</li>
													<li>
														<a href="">
															<i class="icon icon--door-grey"></i> Двері</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--white">
											<div class="navbar__primary-content">
												<i class="icon icon--date-light-grey navbar__icon"></i>
												<input type="text" value="15 березня 2016" class="form-control navbar__form-control input-date">
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
									<div class="uk-grid uk-grid-width-small-1-1 uk-grid-width-medium-1-1 uk-grid-width-large-1-2 uk-grid-width-xlarge-1-2">
										<div class="uk-form uk-form-horizontal">
											<div class="uk-form-row">
												<label for="" class="uk-form-label">Тип вантажу</label>
												<div class="uk-form-controls">
													<div data-uk-form-select="" class="uk-button uk-form-select">
														<span></span>
														<select>
															<option value="">...</option>
															<option value="" selected="">Легкови</option>
														</select>
													</div>
												</div>
											</div>
											<div class="uk-form-row">
												<label for="" class="uk-form-label">Кількість шин</label>
												<div class="uk-form-controls">
													<input type="text" value="4" class="uk-form-width-small text-xs-center">
												</div>
											</div>
											<div class="uk-form-row">
												<label for="" class="uk-form-label">Розмір</label>
												<div class="uk-form-controls">
													<div data-uk-form-select="" class="uk-button uk-form-select">
														<span></span>
														<select>
															<option value="">...</option>
															<option value="" selected="">R10-R14</option>
														</select>
													</div>
												</div>
											</div>
											<div class="uk-form-row">
												<label for="" class="uk-form-label">Вага</label>
												<div class="uk-form-controls">
													<input type="text" value="380" class="uk-form-width-small text-xs-center">
													<span class="uk-form-suffix">кг</span>
												</div>
											</div>
											<div class="uk-form-row">
												<label for="" class="uk-form-label">Об’єм</label>
												<div class="uk-form-controls">
													<input type="text" value="2,91" class="uk-form-width-small text-xs-center">
													<span class="uk-form-suffix">м
														<sup>3</sup>
													</span>
												</div>
											</div>
											<div class="uk-form-row">
												<label for="" class="uk-form-label">Декларована вартість</label>
												<div class="uk-form-controls">
													<input type="text" value="1590" class="uk-form-width-small text-xs-center">
													<span class="uk-form-suffix">грн</span>
												</div>
											</div>
										</div>
										<div class="uk-form uk-form-horizontal uk-form-horizontal--half">
											<div class="uk-form-calc-dimensions__container">
												<div class="uk-form-calc-dimensions__image-container">
													<div class="hint-block text-xs-center">Візуалізація метричних параметрів вашого вантажу</div>
													<div class="uk-form-calc-dimensions__image-wrapper">
														<section class="cube__container">
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
													<label for="" class="uk-form-label">Довжина</label>
													<div class="uk-form-controls">
														<input id="cube_input_length" type="text" name="length" value="1" class="uk-form-width-small text-xs-center">
														<span class="uk-form-suffix">м</span>
													</div>
												</div>
												<div class="bootstrap-slider-container bootstrap-slider-container--right">
													<span class="uk-form-prefix">0 м</span>
													<div id="cube_slider_length" data-provide="slider" data-slider-min="0" data-slider-max="2" data-slider-step="0.001"
														data-slider-value="1" data-slider-tooltip="hide" class="slider"></div>
													<span class="uk-form-suffix">2 м</span>
												</div>
												<div class="uk-form-row">
													<label for="" class="uk-form-label">Ширина</label>
													<div class="uk-form-controls">
														<input id="cube_input_width" type="text" name="width" value="1" class="uk-form-width-small text-xs-center">
														<span class="uk-form-suffix">м</span>
													</div>
												</div>
												<div class="bootstrap-slider-container bootstrap-slider-container--right">
													<span class="uk-form-prefix">0 м</span>
													<div id="cube_slider_width" data-provide="slider" data-slider-min="0" data-slider-max="2" data-slider-step="0.001"
														data-slider-value="1" data-slider-tooltip="hide" class="slider"></div>
													<span class="uk-form-suffix">2 м</span>
												</div>
												<div class="uk-form-row">
													<label for="" class="uk-form-label">Висота</label>
													<div class="uk-form-controls">
														<input id="cube_input_height" type="text" name="width" value="1" class="uk-form-width-small text-xs-center">
														<span class="uk-form-suffix">м</span>
													</div>
												</div>
												<div class="bootstrap-slider-container bootstrap-slider-container--right">
													<span class="uk-form-prefix">0 м</span>
													<div id="cube_slider_height" data-provide="slider" data-slider-min="0" data-slider-max="2" data-slider-step="0.001"
														data-slider-value="1" data-slider-tooltip="hide" class="slider"></div>
													<span class="uk-form-suffix">2 м</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="calc-group">
							<h3 class="calc-group__title">Оберіть додаткові послуги</h3>
							<div class="calc-group__content p-y-0">
								<div data-uk-accordion="{collapse: false}" class="uk-accordion uk-accordion--calc">
									<h3 class="uk-accordion-title">Послуги виїзду</h3>
									<div class="uk-accordion-content">1</div>
									<h3 class="uk-accordion-title">Послуги видачі</h3>
									<div class="uk-accordion-content">2</div>
									<h3 class="uk-accordion-title">Послуги пакування</h3>
									<div class="uk-accordion-content">
										<div class="uk-form">
											<div class="uk-grid uk-grid-width-small-1-1 uk-grid-width-medium-1-1 uk-grid-width-large-1-3 uk-grid-width-xlarge-1-3">
												<div class="col">
													<div class="uk-form-row">
														<label class="uk-form-checkbox">
															<input type="checkbox" checked value="">
															<span class="uk-form-checkbox__text">Упаковка в гофроящик</span>
														</label>
													</div>
													<div class="uk-form-row">
														<label class="uk-form-checkbox">
															<input type="checkbox" checked value="">
															<span class="uk-form-checkbox__text">Стрейчування</span>
														</label>
													</div>
												</div>
												<div class="col">
													<div class="uk-form-row">
														<label class="uk-form-checkbox">
															<input type="checkbox" checked value="">
															<span class="uk-form-checkbox__text">Палетування</span>
														</label>
													</div>
													<div class="uk-form-row">
														<label class="uk-form-checkbox">
															<input type="checkbox" disabled value="">
															<span class="uk-form-checkbox__text">Упаковка документів</span>
														</label>
													</div>
												</div>
												<div class="col">
													<div class="uk-form-row">
														<label class="uk-form-checkbox">
															<input type="checkbox" value="">
															<span class="uk-form-checkbox__text">Стягування стяжкою</span>
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<h3 class="uk-accordion-title">Зворотня доставка</h3>
									<div class="uk-accordion-content">
										<div class="uk-form">
											<div class="uk-grid uk-grid-width-small-1-1 uk-grid-width-medium-1-1 uk-grid-width-large-1-3 uk-grid-width-xlarge-1-3">
												<div class="col">
													<div class="uk-form-row">
														<div class="uk-form-controls">
															<label class="uk-form-checkbox">
																<input type="checkbox" checked value="">
																<span class="uk-form-checkbox__text">Піддон</span>
															</label>
															<input type="text" value="3" class="uk-form-width-mini text-xs-center">
															<span class="uk-form-suffix">шт.</span>
														</div>
													</div>
												</div>
												<div class="col">
													<div class="uk-form-row">
														<label class="uk-form-checkbox">
															<input type="checkbox" value="">
															<span class="uk-form-checkbox__text">Документи</span>
														</label>
													</div>
												</div>
												<div class="col">
													<div class="uk-form-row">
														<label class="uk-form-checkbox">
															<input type="checkbox" checked value="">
															<span class="uk-form-checkbox__text">Наложенний платіж</span>
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="declaration__container">
										<div class="declaration__blank">
											<div class="declaration__arr-id"></div>
											<div class="uk-grid uk-grid-divider declaration__grid">
												<div class="declaration__section-left uk-width-small-1-1 uk-width-medium-1-1 uk-width-large-4-10 uk-width-xlarge-4-10">
													<div class="declaration__block declaration__block--from">
														<div class="declaration__block-header">
															<div class="icon icon--letter-A"></div>Київ
															<span class="declaration__block-header-pointer">Двері</span>
														</div>
														<div class="declaration__item address">вул. Терещенскивскай, 12Б</div>
														<div class="declaration__item name">Сергей Иванович Семеренко</div>
														<div class="declaration__item date">
															<div class="declaration__item-content declaration__item-content--left">
																<i class="icon icon--date-light-grey-sm"></i>03.03.2016</div>
														</div>
													</div>
													<div class="declaration__item number">
														<span class="declaration__number">002 301 207 FZM</span>
													</div>
													<div class="declaration__block declaration__block--to">
														<div class="declaration__block-header">
															<div class="icon icon--letter-B"></div>Одеса
															<span class="declaration__block-header-pointer">Склад</span>
														</div>
														<div class="declaration__item name">Сергей Иванович Семеренко</div>
														<div class="declaration__item address">вул. Терещенскивскай, 12Б</div>
														<div class="declaration__item date">
															<div class="declaration__item-content declaration__item-content--left">
																<i class="icon icon--date-light-grey-sm"></i>03.03.2016</div>
														</div>
													</div>
												</div>
												<div class="declaration__section-right uk-width-small-1-1 uk-width-medium-1-1 uk-width-large-6-10 uk-width-xlarge-6-10">
													<div class="declaration__item">
														<strong class="declaration__item-title declaration__item-title--width-1">Тип вантажу</strong>
														<span class="declaration__item-content declaration__item-content--left">
															<span class="text-uppercase">Корреспонденция</span>
														</span>
													</div>
													<div class="declaration__item">
														<strong class="declaration__item-title declaration__item-title--width-1">Пакування</strong>
														<span class="declaration__item-content declaration__item-content--left">
															<span class="text-uppercase">Деревянный ящик</span>
														</span>
													</div>
													<div class="uk-grid uk-grid-width-small-1-2 uk-grid-width-medium-1-2 uk-grid-width-large-1-2 uk-grid-width-xlarge-1-2">
														<div class="col">
															<div class="declaration__item">
																<strong class="declaration__item-title declaration__item-title--width-1">Ширина</strong>
																<span class="declaration__item-content">5 м</span>
															</div>
															<div class="declaration__item">
																<strong class="declaration__item-title declaration__item-title--width-1">Висота</strong>
																<span class="declaration__item-content">7 м</span>
															</div>
														</div>
														<div class="col">
															<div class="declaration__item">
																<strong class="declaration__item-title declaration__item-title--width-1">Глибина</strong>
																<span class="declaration__item-content">2 м</span>
															</div>
															<div class="declaration__item">
																<strong class="declaration__item-title declaration__item-title--width-1">Вага</strong>
																<span class="declaration__item-content">300 кг</span>
															</div>
														</div>
													</div>
													<div class="declaration__hr"></div>
													<div class="declaration__item">
														<strong class="declaration__item-title">Вартість за габарити</strong>
														<span class="declaration__item-content">
															<span class="pull-right">1 200 грн</span>
														</span>
													</div>
													<div class="declaration__hr"></div>
													<strong class="declaration__item-title">Додаткові послуги</strong>
													<table class="declaration__table">
														<tr>
															<td class="td-icon">
																<i class="fa fa-check"></i>
															</td>
															<td class="td-title">Пакування
																<span class="text-muted">/ ящик</span>
															</td>
															<td class="td-price">200 грн</td>
														</tr>
														<tr>
															<td class="td-icon">
																<i class="fa fa-check"></i>
															</td>
															<td class="td-title">Підйом на поверх
																<span class="text-muted">/ ліфт</span>
															</td>
															<td class="td-price">20 грн</td>
														</tr>
														<tr>
															<td class="td-icon">
																<i class="fa fa-check"></i>
															</td>
															<td class="td-title">Зберігання на складі
																<span class="text-muted">/ 24 дні</span>
															</td>
															<td class="td-price">760 грн</td>
														</tr>
													</table>
													<div class="declaration__hr"></div>
													<div class="declaration__item">
														<strong class="declaration__item-title">Декларована вартість</strong>
														<span class="declaration__item-content price">50 000 грн</span>
													</div>
													<div class="declaration__item declaration__item--footer">
														<strong class="declaration__item-title">Вартість</strong>
														<span class="declaration__item-content total-price">47 435 грн</span>
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
												<span class="text-accent">Ваша заявка</span> італійський різний фурнітур</span>
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
						<div class="calc-group hidden-md-down">
							<div class="uk-grid uk-grid-width-small-1-1 uk-grid-width-medium-1-1 uk-grid-width-large-1-2 uk-grid-width-xlarge-1-2 calc-group__row">
								<div class="col first">
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--white">
											<div class="navbar__primary-content">
												<div class="navbar__icon">
													<i style="background-image:url('http://placehold.it/60px60px')" class="icon icon--ava"></i>
												</div>
												<input type="text" value="Сергій Іванович Семеренко" class="form-control navbar__form-control">
											</div>
										</div>
									</div>
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--white">
											<div class="navbar__primary-content">
												<i class="icon icon--phone-light-grey navbar__icon"></i>
												<input type="text" value="+380 00 000 00 00" class="form-control navbar__form-control">
											</div>
										</div>
									</div>
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--white">
											<div class="navbar__primary-content">
												<i class="icon icon--email-light-grey navbar__icon"></i>
												<input type="text" value="mail@ya.ru" class="form-control navbar__form-control">
											</div>
										</div>
									</div>
									<div class="calc-group">
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
										<div class="navbar navbar--calc navbar--white">
											<div class="navbar__primary-content">
												<div class="navbar__icon">
													<i style="background-image:url('http://placehold.it/60px60px')" class="icon icon--ava"></i>
												</div>
												<input type="text" value="Юри Іванович Семеренко" class="form-control navbar__form-control">
											</div>
										</div>
									</div>
									<div class="calc-group">
										<div class="navbar navbar--calc navbar--white">
											<div class="navbar__primary-content">
												<i class="icon icon--phone-light-grey navbar__icon"></i>
												<input type="text" value="+380 00 000 00 00" class="form-control navbar__form-control">
											</div>
										</div>
									</div>
									<div class="calc-group">
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
							<h3 class="calc-group__title">Додати примітку</h3>
							<div class="calc-group__content">
								<div class="hint-block text-uppercase m-t-0">Вкажіть додаткові побажання та інформацію стосовно відправки та отримання вашого надсилання</div>
								<textarea name=""
									cols="30" rows="10" class="form-control form-control--alt"></textarea>
							</div>
						</div>
					</div>
					<div class="calc__footer text-xs-center">
						<a href="" class="btn btn--more btn--higher btn--blue">Додати вантаж
							<i class="icon icon--plus-accent"></i>
						</a>
					</div>
				</div>
				
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>