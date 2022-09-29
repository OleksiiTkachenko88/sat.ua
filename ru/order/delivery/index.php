<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Доставка до дверей получателя - Транспортная компания “САТ” | ВЫГОДНО! НАДЕЖНО! ВОВРЕМЯ! ☎ 066 830 99 09; 098 830 99 09; 073 830 99 09 (стоимость звонков согласно тарифов вашего оператора)");
$APPLICATION->SetPageProperty("title", "Доставка до дверей получателя | Транспортная компания “САТ”");
$APPLICATION->SetTitle("Заказать доставку по адресу получателя ");

$offices = '[]';

$tmp = file_get_contents("https://catalog.sat.ua/getRsp?language=" . getMessage("API_LANG"));
function remove_utf8_bom($text) {
    $bom = pack('H*','EFBBBF');
    $text = preg_replace("/^$bom/", '', $text);
    return $text;
}
if ($tmp) {
	$tmp = remove_utf8_bom($tmp);
	$tmp2 = json_decode($tmp);
	if ($tmp2->success) {
		$offices = json_encode($tmp2->data);
	}
}
?>
    <script>
        var offices = <?=$offices;?>
    </script>
<?

$departureConditions = '[]';
$departureConditionsOptions = '';
$tmp = file_get_contents("https://catalog.sat.ua/getDepartureConditions?language=" . getMessage("API_LANG"));
if ($tmp) {
	$tmp = remove_utf8_bom($tmp);
	$tmp2 = json_decode($tmp, TRUE);
	if ($tmp2['success']) {
		$departureConditions = json_encode($tmp2['data']);
		foreach ($tmp2['data'] as $k => $v) {
			$departureConditionsOptions .= '<option value="' . $v['ref'] . '">' . $v['description'] . '</option>';
		}
	}
}
//echo $departureConditionsOptions;

//added deliveryCondition;
$deliveryCondition = '[]';
$deliveryConditionsOptions = '';
$tmp = file_get_contents("https://catalog.sat.ua/getDeliveryConditions?language=" . getMessage("API_LANG"));
if ($tmp) {
	$tmp = remove_utf8_bom($tmp);
	$tmp2 = json_decode($tmp, TRUE);
	if ($tmp2['success']) {
		$deliveryCondition = json_encode($tmp2['data']);
		foreach ($tmp2['data'] as $k => $v) {
			$deliveryConditionsOptions .= '<option value="' . $v['ref'] . '">' . $v['description'] . '</option>';
		}
	}
}
// 27062017 - Added attr name/id for inputs, selects
?>
	<script>
		var departureConditions = <?=$departureConditions;?>;
		var deliveryCondition = <?=$deliveryCondition;?>;
	</script>

	<style>
		.calculate-wrapper .section-from{width: 100%;}
		.calculate-wrapper .delivery-row{border-top:none; border-bottom: 1px solid #acacac; }
		.calculate-wrapper .direction-from{float: left; width: 100%; position: relative; background: #ffd64a;}
		.calculate-wrapper .directions-row .direction-item .icon-dir img{max-width:26px; vertical-align: middle;}
		.calculate-wrapper .section-from .sender-info{background:#fff;}
		.calculate-wrapper .section-from .sender-info img,  .calculate-wrapper .section-from .delivery-town img{
		display: inline-block;
		max-height: 24px;
		vertical-align: top;
		margin-top: 6px;
		margin-right: 3px;
		margin-left: -2px;
		}
		.calculate-wrapper .delivery-row .date, .calculate-wrapper .delivery-row .time, .calculate-wrapper .delivery-row .tariff {display:block;}
		.calculate-wrapper .delivery-row .tariff .jq-selectbox__select, .calculate-wrapper .delivery-row .tariff select {width: 195px;}

		.calculate-wrapper .section-from .sender-info{float: left;   width: 100%;    text-align: left;}
		.calculate-wrapper .section-from .sender-info .address,.calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{display: inline-block; width:33%; padding: 7px 0 7px 10px; min-width:244px;}
		.calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"] {
		display: inline-block;
		vertical-align: top;
		height: 36px;
		line-height: 34px;
		background: #fff;
		outline: none !important;
		border: 1px solid #acacac;
		padding: 0px 13px 0 13px;
		box-shadow: none;
		border-radius: 0;
		font-size: 10px;
		color: #404041;
		font-family: "SFUIDisplay", sans-serif;
		-webkit-appearance: none;
		width:calc(100% - 50px);
		}
		.calculate-wrapper .parcel-options-info .rate-wrap{padding: 25px 25px 0 25px; border-top: 1px solid #acacac;}
		.calculate-wrapper .section-from .sender-info .error {
			border: 1px solid #FF6111 !important;
		}
		.calculate-wrapper .directions-row .direction-item{
			height: 64px;
		}
		.calculate-wrapper .directions-row .direction-item .track-search {
			width: 100%;
			display: block;
			-webkit-appearance: none;
			background: #ffd64a;
			height: 100%;
			outline: none !important;
			border: none;
			padding: 11px 58px 9px 58px;
				padding-right: 58px;
				padding-left: 58px;
			box-shadow: none;
			border-radius: 0;
			font-size: 18px;
			color: #1e3e6c;
			font-family: "SFUIDisplayMedium", sans-serif;
			text-align: center;
		}
		.calculate-wrapper .directions-row .direction-item .track-action {
			top: 0;
			bottom: 0;
			right: 0;
			width: 58px;
			position: absolute;
			-webkit-appearance: none;
			padding: 0;
			box-shadow: none;
			border: none;
			outline: none !important;
			background: transparent;
			-webkit-transition: all 0.4s;
			-moz-transition: all 0.4s;
			-o-transition: all 0.4s;
			transition: all 0.4s;
		}
		.calculate-wrapper .directions-row .direction-item .track-action:after {
			content: "\f002";
			top: 0;
			bottom: 0;
			right: 0;
			width: 58px;
			position: absolute;
			display: block;
			font-family: FontAwesome;
			font-size: 24px;
			text-align: center;
			line-height: 63px;
			color: #757575;
			-webkit-transition: all 0.4s;
			-moz-transition: all 0.4s;
			-o-transition: all 0.4s;
			transition: all 0.4s;
		}
		.calculate-wrapper .directions-row .direction-item .track-action:hover:after {
			background: #2766a0;
			color: #ffd64a;
		}

		.calculate-wrapper .section-from .delivery-city{
			width:100%;
			background-color: #fff;
			padding: 7px 0 7px 10px;
		}
		.calculate-wrapper .section-from .delivery-city input[type="text"]{
			display: inline-block;
			vertical-align: top;
			height: 36px;
			line-height: 34px;
			background: #fff;
			outline: none !important;
			border: 1px solid #acacac;
			padding: 0px 13px 0 13px;
			box-shadow: none;
			border-radius: 0;
			font-size: 10px;
			color: #404041;
			font-family: "SFUIDisplay", sans-serif;
			-webkit-appearance: none;
			width: calc(100% - 52px);
			text-transform: uppercase;
		}
		.calculate-wrapper .section-from .delivery-city img{
			display: inline-block;
			max-height: 24px;
			vertical-align: top;
			margin-top: 3px;
			margin-right: 6px;
			margin-left: -2px;
		}
		.calculate-wrapper .delivery-hidden {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(255,255,255,0.6);
			z-index: 1000;
		}
		.calculate-wrapper .directions-row .direction-item{
			z-index:1100;
		}
		.calculate-wrapper .right {
			bottom: 38px;
			transform: none;

			transform-origin: 100% 100%;
			z-index: 2;
			background: none;
			box-shadow: none;
		}
		.track-location {
			border-bottom:1px solid #acacac;
			display:none;
		}







		@media (max-width: 767px){
			.calculate-wrapper .section-from .sender-info img{margin-left: 5px;}
			.calculate-wrapper .directions-row .direction-item{
				height: 58px;
			}
			.calculate-wrapper .directions-row .direction-item .track-search{
			font-size: 16px;
			line-height: 38px;
			padding: 7px 42px 5px 0px;
			}
			.calculate-wrapper .directions-row .direction-item .track-action:after {
			line-height: 57px;
			}
			.calculate-wrapper .section-from .delivery-city img{margin-left:5px;}
			.calculate-wrapper .section-from .delivery-city input[type="text"]{width:calc(100% - 53px);
			}
			.calculate-wrapper .delivery-hidden {
				top:120px;
			}
		}
		@media (max-width: 990px){
			.calculate-wrapper .section-from .sender-info .address,.calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{ width:50%; float:left;}
		}
			.calculate-wrapper .delivery-hidden {
				top:125px;
			}
		@media (max-width: 500px){
			.calculate-wrapper .section-from .sender-info .address, .calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{float:left; width:100%; padding: 7px 0 7px 5px; min-width:244px;}
			.calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"] {width:calc(100% - 45px);}
		}
		@media (min-width: 768px){
			.calculate-wrapper .delivery-row .date, .calculate-wrapper .delivery-row .time, .calculate-wrapper .delivery-row .tariff {width:50%}

		}
		@media (min-width: 991px){
			.calculate-wrapper .section-from .sender-info img{margin-right: 6px;}
			.calculate-wrapper .delivery-row .date, .calculate-wrapper .delivery-row .time, .calculate-wrapper .delivery-row .tariff {width:33%}
		}
		@media (min-width: 1340px){
			.calculate-wrapper .section-from .sender-info img{margin-right: 6px; margin-top: 8px;}
			.calculate-wrapper .section-from .sender-info .address,.calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{padding: 9px 0 9px 15px;}
			.calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"]{
				 height: 40px;
				 line-height: 38px;
				 font-size: 12px;
			}
			.calculate-wrapper .section-from .delivery-city{
				padding: 9px 0 9px 15px;
			}

			.calculate-wrapper .section-from .delivery-city img{
				 height: 40px;
				 line-height: 38px;
				 font-size: 12px;
			}
			.calculate-wrapper .section-from .delivery-city input[type="text"]{
				width:calc(100% - 55px);
				height: 40px;
				line-height: 38px;
				font-size: 12px;
			}
			.calculate-wrapper .directions-row .direction-item{
				height: 72px;
			}
			.calculate-wrapper .directions-row .direction-item .track-search{
				font-size: 22px;
				line-height: 52px;
				padding-left: 66px;
				padding-right: 66px;
			}
			.calculate-wrapper .directions-row .direction-item .track-action:after  {
				width: 66px;
				line-height: 71px;
				font-size: 28px;
			}
			.calculate-wrapper .delivery-hidden {
				top:137px;
			}

		}
		@media (min-width: 1600px){
			.calculate-wrapper .section-from .sender-info img{margin-right: 10px; margin-top: 10px;}
			.calculate-wrapper .section-from .sender-info .address,.calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{padding: 13px 0 13px 20px;}
			.calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"]{
				height: 45px;
				line-height: 43px;
				font-size: 14px;
			}
			.calculate-wrapper .directions-row .direction-item .track-action  {
				width: 90px;

			}
			.calculate-wrapper .section-from .delivery-city{
				padding: 13px 0 13px 20px;
			}

			.calculate-wrapper .section-from .delivery-city input[type="text"]{
				width: calc(100% - 60px);
				height: 45px;
				line-height: 43px;
				font-size: 14px;
			}
			.calculate-wrapper .section-from .delivery-city img{
				margin-right: 10px; margin-top: 10px;
			}
			.calculate-wrapper .directions-row .direction-item{
				height: 92px;
			}
			.calculate-wrapper .directions-row .direction-item .track-search{
				font-size: 28px;
				line-height: 62px;
				padding-left: 90px;
				padding-right: 90px;
			}
			.calculate-wrapper .directions-row .direction-item .track-action:after  {
				width: 90px;
				line-height: 91px;
				font-size: 34px;
			}

		}
		@media screen and (max-width: 360px) {
			.calculate-wrapper .directions-row .direction-item .track-search{
				font-size:12px;
			}
		}
		@media screen and (max-width: 567px) {
			.calculate-wrapper .directions-row .direction-item{
			height: 40px;
			}
			.calculate-wrapper .directions-row .direction-item .track-search{
			font-size: 14px;
			line-height: 28px;
			padding: 7px 42px 5px 0px;
			}
			.calculate-wrapper .directions-row .direction-item .track-action:after {
			line-height: 39px;
			width: 40px;
			font-size: 20px;
			}
			.calculate-wrapper .delivery-hidden {
				top:102px;
			}
		}
	</style>

	<div class="calculate-section">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<div class="tracking-table">
						<div class="calculate-wrapper">
							<div class="border-block" style="border-top:none;border-left:none;border-right:none;border-bottom:1px solid #acacac;padding:0 15px;background:#ffd64a">
								<div class="header"style="border:none;padding:0;background:none;">
									<div class="img-wrap">
										<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon_delivery_top.png" alt="<?echo getMessage("ALT_DELIVERY_LOGO");?>">
									</div>
								<h1 style="color: #404041;"><?$APPLICATION->ShowTitle(false);?></h1>
								</div>
							</div>
							<input type="hidden" name="fromDir-type" value="">
							<input type="hidden" name="toDir-type" value="">
							<input type="hidden" name="fromDir-sender" value="false">




								<!-- Hidden block for sklad or departure -->
												<div class="wrapper-parcel-info"  style="display:none">
													<div class="delivery-item clearfix">
														<ul class="delivery-tabs" id="fromDir-delivery-tabs">
															<li>
																<a class="active hide-time"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-black1.png"
																								 alt=""><span><?=GetMessage("SKLAD");?></span></a>
															</li>
															<li>
																<a class="show-time noactive"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-black2.png"
																						  alt=""><span><?=GetMessage("DOORS");?></span></a>
															</li>
														</ul>
													</div>
												</div>
								<!-- Hidden block for sklad or delivery -->
												<div class="wrapper-parcel-info"  style="display:none">
													<div class="delivery-item clearfix">
														<ul class="delivery-tabs" id="toDir-delivery-tabs">
															<li>
																<a class="noactive hide-time"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-black1.png"
																								 alt=""><span><?=GetMessage("SKLAD");?></span></a>
															</li>
															<li>
																<a class="show-time active"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-black2.png"
																						  alt=""><span><?=GetMessage("DOORS");?></span></a>
															</li>
														</ul>
													</div>
												</div>




							<div class="directions-row">
								<div class="direction-item direction-from">
									<input type="text" placeholder="<?echo getMessage("ENTER_TRACK_NUMBER");?>" class="track-search only_number" name="track_number" value="<?echo $number;?>" autocomplete="off" maxlength="9">
									<button class="track-action find-track-number" type="submit"></button>
								</div>
							</div>
							<div class="delivery-zone">
								<div class="delivery-hidden"></div>
								<div class="section-from">
									<div class="delivery-row wrapper-parcel-info">
										<div class="delivery-item clearfix">

											<div class="track-location">
												<form action="<?=SITE_DIR;?>contacts/departments/list/" method="post" id="dept_search">
													<input type="hidden" name="department-search-id" value="">
												</form>
												<div class="row-table row-main clearfix">
													<div class="td-location">
														<table>
															<tr>
																<td>
																	<div class="title" id="fromTrack"></div>
																</td>
																<td>
																	<div class="right-text small-text"id="fromDateTrack"></div>
																</td>
															</tr>
															<tr>
																<td>
																	<div class="middle-text" id="fromAddressTrack"></div>
																</td>
																<td>
																	<div class="dark right-text middle-text" id="fromTypeTrack"></div>
																</td>
															</tr>
														</table>
													</div>
													<div class="td-status text-center">
														<div class="status-wrap">
															<span id="statusTrack"></span>
														</div>
														<div class="number" id="numberTrack"></div>
														<div class="cost" id="costTrack"> грн</div>
													</div>
													<div class="td-location">
														<table>
															<tr>
																<td>
																	<div class="title" id=toTrack></div>
																</td>
																<td>
																	<div class="right-text small-text" id="toDateTrack"></div>
																</td>
															</tr>
															<tr>
																<td>
																	<div class="middle-text" id="toAddressTrack"></div>
																</td>
																<td>
																	<div class="dark right-text middle-text" id="toTypeTrack"></div>
																</td>
															</tr>
														</table>
													</div>
												</div>
												<div class="row-table row-sub clearfix small-text">
													<div class="td-location">
														<table>
															<tr>
																<td><?echo getMessage("WIDTH");?></td>
																<td>
																	<div class="dark" id="widthTrack"> см</div>
																</td>
																<td></td>
																<td><?echo getMessage("DEPTH");?></td>
																<td>
																	<div class="dark right-text" id="depthTrack"> см</div>
																</td>
															</tr>
															<tr>
																<td><?echo getMessage("HEIGHT");?></td>
																<td>
																	<div class="dark" id="heightTrack"> см</div>
																</td>
																<td></td>
																<td><?echo getMessage("WEIGHT");?></td>
																<td>
																	<div class="dark right-text" id="weightTrack"> кг</div>
																</td>
															</tr>
														</table>
													</div>
													<div class="td-info">
														<table>
															<tr>
																<td colspan="3"><?echo getMessage("ADD_SERVICES");?></td>
															</tr>
															<tr id="servicesTrack">
															</tr>

														</table>
													</div>
												</div>
											</div>

											<div class="time-date-table">
												<div class="tariff" ><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray17.png" alt="">
													<select name="toDir-delivery-type" id="toDir-delivery-type">
														<?=$deliveryConditionsOptions?>
														<!--<option>Стандарт</option>
														<option>Експрес</option>
														<option>Вчасно</option>
														<option>Нічний</option>-->
													</select>
												</div>
												<div class="date" style="display:none;"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray16.png" alt="">
													<input id="datepicker1" class="pick-field" readonly="true" autocomplete="off" type="text"  name="fromDate">
													<input id="datefield1" class="pick-field" type="date" name="date2">
												</div>
												<div class="time fromTime" style="display:none;"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray18.png" alt="">
													<?=GetMessage("FROM_TIME");?>
													<select name="fromTimeStart">
														<!-- Added times from 9 to 19  -->
														<option>09:00</option>
														<option>09:15</option>
														<option>09:30</option>
														<option>09:45</option>
														<option>10:00</option>
														<option>10:15</option>
														<option>10:30</option>
														<option>10:45</option>
														<option>11:00</option>
														<option>11:15</option>
														<option>11:30</option>
														<option>11:45</option>
														<option>12:00</option>
														<option>12:15</option>
														<option>12:30</option>
														<option>12:45</option>
														<option>13:00</option>
														<option>13:15</option>
														<option>13:30</option>
														<option>13:45</option>
														<option>14:00</option>
														<option>14:15</option>
														<option>14:30</option>
														<option>14:45</option>
														<option>15:00</option>
														<option>15:15</option>
														<option>15:30</option>
														<option>15:45</option>
														<option>16:00</option>
														<option>16:15</option>
														<option>16:30</option>
														<option>16:45</option>
														<option>17:00</option>
														<option>17:15</option>
														<option>17:30</option>
														<option>17:45</option>
														<option>18:00</option>
														<option>18:15</option>
														<option>18:30</option>
														<option>18:45</option>
														<option>19:00</option>
													</select>
													<input type="time" step="300" name="fromTimeS">
													<?=GetMessage("TO_TIME");?>
													<select  name="fromTimeEnd">
														<option>09:00</option>
														<option>09:15</option>
														<option>09:30</option>
														<option>09:45</option>
														<option>10:00</option>
														<option>10:15</option>
														<option>10:30</option>
														<option>10:45</option>
														<option>11:00</option>
														<option>11:15</option>
														<option>11:30</option>
														<option>11:45</option>
														<option>12:00</option>
														<option>12:15</option>
														<option>12:30</option>
														<option>12:45</option>
														<option>13:00</option>
														<option>13:15</option>
														<option>13:30</option>
														<option>13:45</option>
														<option>14:00</option>
														<option>14:15</option>
														<option>14:30</option>
														<option>14:45</option>
														<option>15:00</option>
														<option>15:15</option>
														<option>15:30</option>
														<option>15:45</option>
														<option>16:00</option>
														<option>16:15</option>
														<option>16:30</option>
														<option>16:45</option>
														<option>17:00</option>
														<option>17:15</option>
														<option>17:30</option>
														<option>17:45</option>
														<option>18:00</option>
														<option>18:15</option>
														<option>18:30</option>
														<option>18:45</option>
														<option selected>19:00</option>
													</select>
													<input type="time" step="300" name="fromTimeE">
												</div>
											   <div class="date"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray16.png" alt="">
													<input id="datepicker2" type="text" readonly="readonly" class="pick-field"  name="toDate">
													<input id="datefield2"   class="pick-field" type="date"   name="toDate2">
												</div>
												<div class="time toTime"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray18.png" alt="">
												<span><?=GetMessage("FROM_TIME");?></span>
													<select name="toTimeStart">
															<option>09:00</option>
															<option>09:15</option>
															<option>09:30</option>
															<option>09:45</option>
															<option>10:00</option>
															<option>10:15</option>
															<option>10:30</option>
															<option>10:45</option>
															<option>11:00</option>
															<option>11:15</option>
															<option>11:30</option>
															<option>11:45</option>
															<option>12:00</option>
															<option>12:15</option>
															<option>12:30</option>
															<option>12:45</option>
															<option>13:00</option>
															<option>13:15</option>
															<option>13:30</option>
															<option>13:45</option>
															<option>14:00</option>
															<option>14:15</option>
															<option>14:30</option>
															<option>14:45</option>
															<option>15:00</option>
															<option>15:15</option>
															<option>15:30</option>
															<option>15:45</option>
															<option>16:00</option>
															<option>16:15</option>
															<option>16:30</option>
															<option>16:45</option>
															<option>17:00</option>
															<option>17:15</option>
															<option>17:30</option>
															<option>17:45</option>
															<option>18:00</option>
															<option>18:15</option>
															<option>18:30</option>
															<option>18:45</option>
															<option>19:00</option>
													</select>
													<input type="time" step="300" name="toTimeS">
													<span><?=GetMessage("TO_TIME");?></span>
													<select  name="toTimeEnd">
															<option>09:00</option>
															<option>09:15</option>
															<option>09:30</option>
															<option>09:45</option>
															<option>10:00</option>
															<option>10:15</option>
															<option>10:30</option>
															<option>10:45</option>
															<option>11:00</option>
															<option>11:15</option>
															<option>11:30</option>
															<option>11:45</option>
															<option>12:00</option>
															<option>12:15</option>
															<option>12:30</option>
															<option>12:45</option>
															<option>13:00</option>
															<option>13:15</option>
															<option>13:30</option>
															<option>13:45</option>
															<option>14:00</option>
															<option>14:15</option>
															<option>14:30</option>
															<option>14:45</option>
															<option>15:00</option>
															<option>15:15</option>
															<option>15:30</option>
															<option>15:45</option>
															<option>16:00</option>
															<option>16:15</option>
															<option>16:30</option>
															<option>16:45</option>
															<option>17:00</option>
															<option>17:15</option>
															<option>17:30</option>
															<option>17:45</option>
															<option>18:00</option>
															<option>18:15</option>
															<option>18:30</option>
															<option>18:45</option>
															<option selected>19:00</option>
													</select>
												<input type="time" step="300" name="fromTimeE">
												</div>
											</div>
										</div>
									</div>
									<div class="delivery-city direction-item direction-to">

											<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/tocity.png" alt="">

										<input type = "text" id="toDir" class="direction-field active deivery-town"
												placeholder="<?=GetMessage("DELIVERY_CITY");?>">
											<input type="hidden" class="department-id" id="toDir-id" name="toDir-id">
											<input type="hidden" class="department-id" id="toDir-ref" name="toDir-ref">
											<input type="hidden" class="department-id" id="toDir-cityref" name="toDir-cityref">
											<input type="hidden" class="department-id" id="toDir-cityrspref" name="toDir-cityrspref">

											<input type="hidden" class="department-id" id="fromDir-id" name="fromDir-id">
											<input type="hidden" class="department-id" id="fromDir-ref" name="fromDir-ref">
											<input type="hidden" class="department-id" id="fromDir-cityref" name="fromDir-cityref">
											<input type="hidden" class="department-id" id="fromDir-cityrspref" name="fromDir-cityrspref">

											<input type="hidden" class="department-id" id="fromDelivery" name="fromDelivery">
											<input type="hidden" class="department-id" id="fromDelivery-cityref" name="fromDelivery-cityref">
											<input type="hidden" class="department-id" id="fromDelivery-cityrspref" name="fromDelivery-cityrspref">


											<input type="hidden" class="gruz-param" id="Gruz-weight" name="Gruz-weight">
											<input type="hidden" class="gruz-param" id="Gruz-width" name="Gruz-width">
											<input type="hidden" class="gruz-param" id="Gruz-length" name="Gruz-length">
											<input type="hidden" class="gruz-param" id="Gruz-height" name="Gruz-height">
											<input type="hidden" class="gruz-param" id="Gruz-seatsAmount" name="Gruz-seatsAmount">
											<input type="hidden" class="gruz-param" id="Gruz-volume" name="Gruz-volume">
											<input type="hidden" class="gruz-param" id="Gruz-sum" name="Gruz-sum">
											<input type="hidden" class="gruz-cargoType" id="Gruz-cargoType" name="Gruz-cargoType">


									</div>
									<div class="sender-info">
										<div class="address"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-adr.png" alt="">
											<input id="sender-address" class="sender-address" autocomplete="off" type="text"  name="senderAddress"
												placeholder="<?=GetMessage("DELIVERY_ADDRESS");?>">
										</div>
										<div class="person"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-man.png" alt="">
											<input id="sender-person" class="sender-person" autocomplete="off" type="text"  name="senderPerson"
												placeholder="<?=GetMessage("DELIVERY_PERSON");?>">
										</div>
										<div class="phone"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-phone.png" alt="">
											<input id="sender-phone" class="sender-phone" autocomplete="off" type="text"  name="senderPhone"
												placeholder="<?=GetMessage("DELIVERY_PHONE");?>">
										</div>
									</div>
								</div>


								<script>
									var pogruzValue = 14000000000;
									var manValue = 5000000000;
								</script>
								<div class="range-sizes-wrapper" style="display:none;">


									<div class="range_wrap">
										<div class="price-range-details">
											<label><?=GetMessage("LENGTH");?></label>
											<input type="number" placeholder="0" class="slider-range-value"
												   id="length-range-value" name="length" value=""><span>см</span>
										</div>
										<div class="slider-range-row">
											<span>0 см</span>
											<div data-max="500" class="slider-range" id="length-range">
											</div>
											<span>500 см</span>
										</div>
									</div>
									<div class="range_wrap">
										<div class="price-range-details">
											<label><?=GetMessage("WIDTH");?></label>
											<input type="number" placeholder="0" class="slider-range-value" id="width-range-value"
												   value=""  name="width" ><span>см</span>
										</div>
										<div class="slider-range-row">
											<span>0 см</span>
											<div data-max="500" class="slider-range" id="width-range">
											</div>
											<span>500 см</span>
										</div>
									</div>
									<div class="range_wrap">
										<div class="price-range-details">
											<label><?=GetMessage("HEIGHT");?></label>
											<input type="number" placeholder="0" class="slider-range-value"
												   id="height-range-value"  name="height" value=""><span>см</span>
										</div>
										<div class="slider-range-row">
											<span>0 см</span>
											<div data-max="500" class="slider-range" id="height-range">
											</div>
											<span>500 см</span>
										</div>
									</div>
								</div>
 <style>
   body {
    margin: 0; /* Убираем отступы */
   }
   .pidyom {
    margin-left: 1%; /* Отступы слева от элемента */
   }
  </style>
								<div class="pidyom"><strong>Обратите внимание, подъем на этаж тарифицируется отдельно. <a href="https://www.sat.ua/upload/sat_doc/Price_new.pdf">Детали условий доставки по ссылке.</a></strong></div>
								<div class="wrapper-parcel-info clearfix">
									<div class="parcel-main-info clearfix">
										<div class="parcel-options-info">
											<div class="parcel-block-title">
												<?=GetMessage("SERVICES");?>
											</div>
											<!-- Added services div for responce from api -->
											<div class="services-block" style="display:none;">
												<div class="options-info-item">
													<a class="parcel-block-subtitle">
														<?=GetMessage("OTHER_SERVICES");?>
													</a>
													<div class="options-body">
														<div class="options-row-item options-body-item">
															<label>
																<!-- Added class service for  services -->
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_1");?></div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
													</div>
												</div>
												<div class="options-info-item">
													<a class="parcel-block-subtitle">
														<?=GetMessage("SERVICE_2");?>
													</a>
													<div class="options-body">
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_3");?></div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">1500 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">4500 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" value="3" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_4");?></div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">1500 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">4500 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" value="3" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_5");?></div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">1500 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">4500 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" value="3" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_6");?></div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">1500 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">4500 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" value="3" placeholder="0"><span>шт</span>
															</div>
														</div>
													</div>
												</div>
												<div class="options-info-item">
													<a class="parcel-block-subtitle">
														<?=GetMessage("SERVICE_7");?>
													</a>
													<div class="options-body">
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_8");?></div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_9");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_10");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_10_1");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_11");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_12");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_13");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_14");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_15");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_16");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
													</div>
												</div>
												<div class="options-info-item">
													<a class="parcel-block-subtitle">
													   <?=GetMessage("SERVICE_17");?>
													</a>
													<div class="options-body">
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_18");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_19");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
													</div>
												</div>
												<div class="options-info-item">
													<a class="parcel-block-subtitle">
														<?=GetMessage("SERVICE_20");?>
													</a>
													<div class="options-body">
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_21");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
														<div class="options-row-item options-body-item">
															<label>
																<input type="checkbox" class="service" name="services[]" ><span></span>
																<div><?=GetMessage("SERVICE_22");?>
																</div>
															</label>
															<div class="price-total">
																<span class="text"><?=GetMessage("PRICE");?>: </span><span class="value">0 грн.</span>
															</div>

															<div class="price-total">
																<span class="text"><?=GetMessage("TOTAL_PRICE");?>: </span><span
																	class="value">0 грн.</span>
															</div>
															<div class="qty-wrap">
																<input type="text" placeholder="0"><span>шт</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="parcel-options-info">
											<div class="parcel-block-title">
												<?=GetMessage("NOTE");?>
											</div>
											<div class="rate-wrap">
												<textarea placeholder=" <?=GetMessage("ENTER_NOTE");?>" name="sender-textarea" rows="4"></textarea>
											</div>
										</div>
									</div>
								</div>
								<div class="declaration-wrapper clearfix">
									<div class="print-time"></div>
									<div class="declaration clearfix">
										<div class="left-info">
											<div class="barcode">
												<img src="<?=SITE_TEMPLATE_PATH?>/img/barcode.png" alt="">
											</div>
										<!-- Added span with id/class for ajax responce -->
											<table>
												<tr>
													<td rowspan="2" class="top-align center-align">
														<div class="icon-dir">A</div>
														<br><span class="text-dir fromType"><?=GetMessage("DOORS");?></span></td>
													<td class="city fromCity">КИЇВ</td>
												</tr>
												<tr>
													<td><span id="fromAddress"> вул. Терещенківська, 12Б, кв. 18</span></td>
												</tr>
												<tr>
													<td rowspan="3" class="arrow-align center-align"><img class="arrow"
																										  src="<?=SITE_TEMPLATE_PATH?>/img/declaration-arrow.png"
																										  alt=""></td>
													<td class="pt">
														<div class="date fromDate">03.06.2017</div>
													</td>
												</tr>
												<tr>
													<td>
														<div class="upc"></div>
													</td>
												</tr>
												<tr>
													<td class="pb">
														<div class="date toDate">05.06.2017</div>
													</td>
												</tr>
												<tr>
													<td rowspan="2" class="bottom-align center-align"><span class="text-dir toType">Склад</span><br>
														<div class="icon-dir">Б</div>
													</td>
													<td><span id="toPhone">+38(___)__-__-__</span><br><span id="toReceiver">Андрій Іванович Семеренко</span><br><span id="toAddress"> </span> </td>
												</tr>
												<tr>
													<td class="city toCity">МИКОЛАЇВ</td>
												</tr>
											</table>
											<div class="hot-line">
									    <div class="number">066 830 99 09</div>
                                        <div class="number">098 830 99 09</div>
                                        <div class="number">073 830 99 09</div>
												<div class="text"><?=GetMessage("FREE_HOT_LINE");?></div>
											</div>
										</div>
										<div class="right-info">
											<table class="border">
												<tr>
													<td><?=GetMessage("GRUZ_TYPE");?></td>
													<td class="dark upper decType" colspan="4"><?=GetMessage("GRUZ_TYPE_1");?></td>
												</tr>
												<tr class="hidden_dec no_docs">
													<td><?=GetMessage("GRUZ_SUBTYPE");?></td>
													<td class="dark upper decSubtype" colspan="4"> </td>
												</tr>
												<tr>
													<td><?=GetMessage("CALC_COUNT");?></td>
													<td class="dark "><span id="decAva"></span></td>
													<td></td>
													<td><?=GetMessage("WEIGHT");?></td>
													<td class="dark right"><span class="decWei"></span> кг</td>
												</tr>
												<tr class="hidden_dec all_params">
													<td><?=GetMessage("LENGTH");?></td>
													<td class="dark"><span id="decLen"></span> см</td>
													<td></td>
													<td><?=GetMessage("WIDTH");?></td>
													<td class="dark right"><span id="decWid"></span> см</td>
												</tr>
												<tr class="hidden_dec all_params">
													<td><?=GetMessage("HEIGHT");?></td>
													<td class="dark"><span id="decHei"></span> см</td>
													<td></td>
													<td><?=GetMessage("OBJEM");?></td>
													<td class="dark right"><span id="decVol"></span> м<sup>3</sup></td>
												</tr>
												<tr class="hidden_dec only_volume">
													<td><?=GetMessage("OBJEM");?></td>
													<td class="dark"><span id="decVol"></span> см</td>
													<td></td>
													<td></td>
													<td></td>
												</tr>
											</table>
											<table class="border">
												<tr>
													<td><?=GetMessage("TRACKING_COST");?></td>
													<td class="dark right"><span id="decSum"></span> грн</td>
												</tr>
												<tr>
													<td><?=GetMessage("DELIVERY_PRICE");?></td>
													<td class="dark right"><span id="decDelivery"></span> грн</td>
												</tr>
											</table>
											<!-- Added class for ajax result  -->
											<table class="border advservices">
												<tr>
													<td colspan="2" class="pb"><?=GetMessage("ADD_SERVICES");?></td>
												</tr>
											</table>


											<table>
												<tr>
													<td  class="middle-text"><?=GetMessage("NOTE");?></td>
												</tr>
												<tr>
													<td id="departureNote"> </td>
												</tr>
											</table>
											<table id="deliverySuccessZone">
												<tr>
													<td  class="middle-text"><?=GetMessage("DEPARTURE_SUCCESS_LINE_1");?></td>
												</tr>
												<tr>
													<td  class="middle-text"><?=GetMessage("DEPARTURE_SUCCESS_LINE_2");?><span class="middle-text dark" id="deliverySuccess"></span>.</td>
												</tr>
												<tr>
													<td class="middle-text"><?=GetMessage("DEPARTURE_SUCCESS_LINE_3");?></td>
												</tr>
											</table>
										</div>
									</div>
									<ul class="declaration-buttons">
										<li><a id="create_pdf"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-blue1.png" alt=""></a></li>
										<li><a><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-blue2.png" alt=""></a></li>
										<li><a href="javascript:window.print()"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-blue3.png" alt=""></a></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="tracking-error">
							<div class="text-warning">
								<strong><span id="track_error_reason"><?echo isset($track_error['text']) ? $track_error['text'] : getMessage("TRACK_ERROR_NUMBER");?></span></strong><br><br>
								Номер отправления состоит из девяти цифр, например: 123456789. Проверьте свой номер и попробуйте еще раз.
								<br><br>
								Мы всегда готовы помочь. Если у вас возникли какие-либо вопросы о текущем местоположении вашего отправления, вы можете связаться с нами.
							</div>
						</div>


            <div class="order-not-callback order-not-callback--hidden" id="orderNotCallback">
              <label class="order-not-callback-checkbox">
                <input type="checkbox" class="order-not-callback-checkbox__input" />
                <span class="order-not-callback-checkbox__check">

                  <svg class="order-not-callback-checkbox__img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32c8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4C431.6 99.13 439.8 96 448 96C465.1 96 480 109.7 480 128z" />
                  </svg>
                </span>
                <span class="order-not-callback-checkbox__title">
                  <?= GetMessage("ORDER_NOT_CALLBACK_TITLE"); ?>
                </span>
              </label>

              <button class="order-not-callback-help-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm7.67-24h-16c-6.627 0-12-5.373-12-12v-.381c0-70.343 77.44-63.619 77.44-107.408 0-20.016-17.761-40.211-57.44-40.211-29.144 0-44.265 9.649-59.211 28.692-3.908 4.98-11.054 5.995-16.248 2.376l-13.134-9.15c-5.625-3.919-6.86-11.771-2.645-17.177C185.658 133.514 210.842 116 255.67 116c52.32 0 97.44 29.751 97.44 80.211 0 67.414-77.44 63.849-77.44 107.408V304c0 6.627-5.373 12-12 12zM256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8z" />
                </svg>

                <span class="order-not-callback-help-btn__message">
                  <ul class="order-not-callback-help-btn__message-list">
                    <li><?= GetMessage("ORDER_NOT_CALLBACK_MESSAGE_LINE1"); ?></li>
                    <li><?= GetMessage("ORDER_NOT_CALLBACK_MESSAGE_LINE2"); ?></li>
                    <li><?= GetMessage("ORDER_NOT_CALLBACK_MESSAGE_LINE3"); ?></li>
                  </ul>
                </span>
              </button>
            </div>

						<div class="submit-wrapper text-center">
							<div class="loader"></div>
							<input type="submit" class="submit-button delivery-calc" value="<?=GetMessage("COUNT");?>">
							<input type="submit" class="submit-button delivery-submit" style="display:none"  value="<?=GetMessage("DELIVERY_ORDER");?>">
						</div>
					</div>
				</div>
			</div>
		</div>

<script>
  (() => {
    const onSubmit = () => gtag('event', 'delivery', {'event_category': 'klik'});
    const button = document.querySelector('.delivery-calc');
    button.addEventListener('click', onSubmit);
  })();
</script>

<script src="<?=SITE_TEMPLATE_PATH?>/js/date-lib.js?20200712"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/calc_old.js?20220112"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/script_old.js?20201230"></script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
