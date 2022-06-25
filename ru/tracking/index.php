<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");?>
<div class="page__block page__block--tracking">
	<div class="container-fluid">
		<div id="page_block" class="page__block-group">
			
			<input id="tracking" type="text" value="" placeholder="Введіть номер вашого відправлення" class="form-control form-control--accent page__block-input">
            
            <a href="" class="" id="search_tracking">
				<i class="icon icon-search"></i>
			</a>


			<div class="card card--order">
				<div class="card__turn"></div>
				<div class="card__section-row">
					<div class="card__section card__section--left">
						<div class="card__primary-content">
							<div class="card__item">
								<a href="" class="card__item-title">
									<i class="icon card__icon card__icon--marker"></i><span id="rspFrom">Київ</span>
								</a>
								<?//<div class="card__item-text">вул. Терещенківська, 12Б</div>?>
							</div>
						</div>
						<div class="card__secondary-content">
							<div class="card__secondary-info" id="date">03.03.2016</div>
							<div class="card__secondary-text"><span id="typeFrom">Двері</span></div>
						</div>
					</div>
					<div class="card__section card__section--center">
						<div class="card__primary-content">
							<div class="card__status">
								<span id="currentStatus">В дорозі</span>
							</div>
							<div class="card__number" id="number">002 301 207 FZM</div>
							<div class="card__price" ><span id="sum">47 325</span> грн</div>
						</div>
					</div>
					<div class="card__section card__section--right">
						<div class="card__primary-content">
							<div class="card__item">
								<a href="" class="card__item-title">
									<i class="icon card__icon card__icon--marker"></i><span id="rspTo">Миколаїв</span>
								</a>
								<?//<div class="card__item-text">вул. Будівельників, 24/7</div>?>
							</div>
						</div>
						<div class="card__secondary-content">
							<div class="card__secondary-info" id="incomingDate">03.03.2016</div>
							<a href="" class="card__secondary-text">
								<i class="icon card__icon card__icon--marker"></i><span id="typeTo">Склад №23</span></a>
						</div>
					</div>
				</div>
			</div>
			<?/*<div class="cabinet-link cabinet-link--alt">Отримай додаткову інформацію та відслідковуй замовлення в
				<a href="" target="_blank">особистому кабінеті</a>
				<i class="icon icon--entry-accent-59-52"></i>
			</div>*/?>
		</div>
		<form class="form form--recall">
			<div class="form__container">
				<div class="form-group">
					<h3 class="form__title-2 form__title-alt m-b-0">Додайте ваш відгук, або побажання</h3>
					<textarea name="" cols="30" rows="10" class="form-control form-control--alt"></textarea>
				</div>
				<div class="form-group">
					<h3 class="form__title-2 form__title-alt">Оцініть відправку</h3>
					<div id="rating" class="rating-stars rating-stars--hoverable form__rating-stars"></div>
				</div>
				<div class="form-group form-group--footer">
					<button type="submit" class="btn btn--accent btn--raised btn--alt btn-lg">Оцініть</button>
				</div>
			</div>
		</form>
	</div>
</div>
				
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>