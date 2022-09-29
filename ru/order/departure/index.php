<?
  require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
  $APPLICATION->SetPageProperty("description", "Выезд за грузом к отправителю - Транспортная компания “САТ” | ВЫГОДНО! НАДЕЖНО! ВОВРЕМЯ!");
  $APPLICATION->SetPageProperty("title", "Выезд за грузом к отправителю | Транспортная компания “САТ”");
  $APPLICATION->SetTitle("Заказать выезд за грузом к отправителю");

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

        .calculate-wrapper .delivery-row .phone .jq-selectbox__select{border:1px solid #fff;min-width:85px;padding:0 16px 0 6px}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__trigger{right:6px}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__trigger:after{font-size:16px;color:#757575}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown li{max-width: calc(100% + 50px);padding:0 6px}
        .calculate-wrapper .delivery-row .phone select{max-width:100% ;text-indent:0.01px;padding-right:20px !important;background-image:url("../img/icons/arrow_select.png");background-position:right 8px center;background-repeat:no-repeat}
        .calculate-wrapper .delivery-row .phone .jq-selectbox{vertical-align:top}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__select{max-width: calc(100% + 150px); display:block;line-height:34px;height:36px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;font-size:16px;color:#404041;background:#fff;outline:none;border:1px solid #acacac;padding:0px 22px 0 13px;font-family:"SFUIDisplay", sans-serif;cursor:pointer;overflow:hidden}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__select .jq-selectbox__select-text{width:100% !important}
        .calculate-wrapper .delivery-row .phone .jqselect.opened .jq-selectbox__select{border:1px solid #acacac}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__trigger{position:absolute;top:0px;height:34px;right:10px;line-height:34px}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__trigger:after{content:"\f107";font-family:FontAwesome;font-size:20px;line-height:34px;display:inline-block;color:#404041}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown{max-width:calc(100% + 100px)!important;border:1px solid #acacac;border-top:none;background:#fff;overflow:hidden;margin-top:-1px}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown ul{max-height:125px}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown li{line-height:25px;font-size:16px;color:#404041;min-width:48px;padding:0 13px;font-family:"SFUIDisplay", sans-serif;display:block;cursor:pointer;-webkit-transition:all 0.3s;-moz-transition:all 0.3s;-o-transition:all 0.3s;transition:all 0.3s}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown li:hover{background:#ffd64a}
        .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown li.selected{background:#ffd64a}

		.calculate-wrapper .section-from{float: left; width: 100%;  position: relative; z-index: 1;}
		.calculate-wrapper .direction-from, .calculate-wrapper .direction-to{float: left; width: 50%; position: relative; background: #ffd64a; border-bottom:1px solid #ACACAC}
		.calculate-wrapper .directions-row .direction-item .icon-dir img{max-width:26px; vertical-align: middle;}
		.calculate-wrapper .section-from .sender-info{background:#fff;}
		.calculate-wrapper .section-from .sender-info img{
		display: inline-block;
		max-height: 24px;
        max-width: 24px;
		vertical-align: top;
		margin-top: 6px;
		margin-right: 3px;
		margin-left: -2px;
		}
		.calculate-wrapper .delivery-row .date, .calculate-wrapper .delivery-row .time, .calculate-wrapper .delivery-row .tariff {display:block;}
		.calculate-wrapper .delivery-row .payment .jq-selectbox__select, .calculate-wrapper .delivery-row .tariff select {width: 195px;}
        

		.calculate-wrapper .section-from .sender-info{float: left;   width: 100%;    text-align: left;}
        .calculate-wrapper .section-from .sender-info .address, .calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{display: inline-flex; width:33%; padding: 7px 0 7px 10px; min-width:244px;}
		.calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"]{
		display: inline-block;
		vertical-align: top;
		height: 36px;
		line-height: 34px;
		background: #fff;
		outline: none !important;
		border: 1px solid #acacac;
		padding: 0px 13px 0 13px;
		box-shadow: none;
		border-radius: 0px;
		font-size: 16px;
		color: #404041;
		font-family: "SFUIDisplay", sans-serif;
		-webkit-appearance: none;
		width:calc(100% - 50px);
		}
        

		.calculate-wrapper .parcel-options-info .rate-wrap{padding: 25px 25px 0 25px; border-top: 1px solid #acacac;}
		.calculate-wrapper .section-from .sender-info .error {
			border: 1.5px solid #FF6111 !important;
		}
        #cargoDescriptionList {
            min-width: 100%;
        }

		@media (max-width: 767px){
            .calculate-wrapper .direction-from, .calculate-wrapper .direction-to{float: left; width: 100%;}
			.calculate-wrapper .section-from .sender-info img{margin-left: 5px;}
            .calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"] {
                width:calc(100% - 45px);
                font-size: 16px;
                
            }
            
            .calculate-wrapper .directions-row .direction-item .direction-field{width:90%;font-size:16px}  
            .calculate-wrapper .wrapper-parcel-info input[type="text"],.calculate-wrapper .wrapper-parcel-info input[type="number"],.calculate-wrapper .wrapper-parcel-info input[type="date"],.calculate-wrapper .wrapper-parcel-info input[type="time"],.calculate-wrapper .wrapper-parcel-info select{font-size:16px}
            
            
            .pidyom {
                  padding: 0 0 20px 0;
            }

            .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown,
            .calculate-wrapper .delivery-row .phone .jq-selectbox__select {
                width: calc(100% + 1em);
            }
		}
		@media (max-width: 990px){
			.calculate-wrapper .section-from .sender-info .address,.calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{ width:50%; float:left;}

            
        }
		@media (max-width: 600px){
			.calculate-wrapper .section-from .sender-info .address, .calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone, .calculate-wrapper .delivery-row  select  {float:left; width:100%; padding: 7px 0 7px 5px; min-width:244px;}
		    .calculate-wrapper .directions-row .direction-item .direction-field {width:100%;font-size:16px} 
            .pidyom {
                  padding: 0 0 35px 0;
            }
           
        }	
        @media (max-width: 733px){			
		    .calculate-wrapper .directions-row .direction-item .direction-field{width:100%;font-size:16px} 
            .amountInfo { 
                  width: 50%;
           }
        }
		@media (min-width: 768px){
			.calculate-wrapper .delivery-row .date, .calculate-wrapper .delivery-row .time, .calculate-wrapper .delivery-row .tariff {width:50%}
            
            .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown,
            .calculate-wrapper .delivery-row .phone .jq-selectbox__select {
                min-width: calc(100% + 45px); 
            }
		}
       	@media (min-width: 991px){
			.calculate-wrapper .section-from .sender-info img{margin-right: 6px;}
			.calculate-wrapper .delivery-row .date, .calculate-wrapper .delivery-row .time, .calculate-wrapper .delivery-row .tariff {width:33%}
            
            .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown,
            .calculate-wrapper .delivery-row .phone .jq-selectbox__select {
                min-width: 100%; 
            }

        }
		@media (min-width: 1341px){
			.calculate-wrapper .section-from .sender-info img{margin-right: 6px; margin-top: 8px;}
			.calculate-wrapper .section-from .sender-info .address,.calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{padding: 9px 0 9px 15px;}
			.calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"] {
   			 height: 40px;
   			 line-height: 38px;
			 font-size: 16px;
            }  

            
            .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown,             
            .calculate-wrapper .delivery-row .phone .jq-selectbox__select {
                min-width: calc(100% + 70px); 
            }

		}
		@media (min-width: 1600px){
			.calculate-wrapper .section-from .sender-info img{margin-right: 10px; margin-top: 10px;}
			.calculate-wrapper .section-from .sender-info .address,.calculate-wrapper .section-from .sender-info .person, .calculate-wrapper .section-from .sender-info .phone{padding: 13px 0 13px 20px;}
			.calculate-wrapper .delivery-row .phone .jq-selectbox__select, .calculate-wrapper .section-from .sender-info .address input[type="text"], .calculate-wrapper .section-from .sender-info  .person input[type="text"], .calculate-wrapper .section-from .sender-info .phone input[type="text"]{
			height: 45px;
   			line-height: 43px;
			font-size: 16px;
			}

            .calculate-wrapper .delivery-row .phone .jq-selectbox__dropdown,
            .calculate-wrapper .delivery-row .phone .jq-selectbox__select {
                min-width: calc(100% + 154px);
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
										<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon_departure_top.png" alt="<?echo getMessage("ALT_DEPARTURE_LOGO");?>">
									</div>
								<h1 style="color: #404041;"><?$APPLICATION->ShowTitle(false);?></h1>
								</div>
							</div>
							<input type="hidden" name="fromDir-type" value="">
							<input type="hidden" name="toDir-type" value="">
							<input type="hidden" name="fromDir-sender" value="true">

                            <div class="section-from">
                                <div class="directions-row">
                                    <div class="direction-item direction-from">
                                        <div class="icon-dir">А</div>
                                        <input type="text" id="fromDir" class="direction-field active"
                                               placeholder="<?=GetMessage("ENTER_FROM_PUNKT");?>">
                                        <input type="hidden" class="department-id" id="fromDir-id" name="fromDir-id">
                                        <input type="hidden" class="department-id" id="fromDir-ref" name="fromDir-ref">
                                        <input type="hidden" class="department-id" id="fromDir-cityref" name="fromDir-cityref">
                                        <input type="hidden" class="department-id" id="fromDir-cityref2" name="fromDir-cityref2">
                                        <input type="hidden" class="department-id" id="fromDir-cityrspref" name="fromDir-cityrspref">


				<!-- Hidden block for sklad or departure -->
                                <div class="delivery-row wrapper-parcel-info"  style="display:none">
                                    <div class="delivery-item clearfix">
										<ul class="delivery-tabs" id="fromDir-delivery-tabs">
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



                                    </div>
									<div class="direction-item direction-to">
                                        <div class="icon-dir">B</div>
                                        <input type="text" id="toDir" class="direction-field"
                                               placeholder="<?=GetMessage("ENTER_TO_PUNKT");?>" >
                                        <input type="hidden" class="department-id" id="toDir-id" name="toDir-id">
                                        <input type="hidden" class="department-id" id="toDir-ref" name="toDir-ref">
                                        <input type="hidden" class="department-id" id="toDir-cityref" name="toDir-cityref">
                                        <input type="hidden" class="department-id" id="toDir-cityrspref" name="toDir-cityrspref">


				<!-- Hidden block for sklad or delivery -->
                                <div class="delivery-row wrapper-parcel-info"  style="display:none">
                                    <div class="delivery-item clearfix">
										<ul class="delivery-tabs" id="toDir-delivery-tabs">
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
								</div>                                    </div>
                                </div>                                
                                <div class="delivery-row wrapper-parcel-info">
                                    <div class="delivery-item clearfix">
                                        <div class="time-date-table">
											<div class="tariff" ><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray17.png" alt="">
                                                <select name="fromDir-delivery-type" id="fromDir-delivery-type">
													<?=$departureConditionsOptions?>
                                                    <!--<option>Стандарт</option>
                                                    <option>Експрес</option>
                                                    <option>Вчасно</option>
                                                    <option>Нічний</option>-->
                                                </select>
                                            </div>
                                            <div class="date"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray16.png" alt="">
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
										    <div class="date" style="display:none"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray16.png" alt="">
                                                <input id="datepicker2" type="text" readonly="readonly" class="pick-field"  name="toDate">
                                                <input id="datefield2" class="pick-field" type="date"   name="toDate2">
                                            </div>
											   <div class="time toTime" style="display:none;"><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray18.png" alt="">
                                                <span><?=GetMessage("FROM_TIME");?></span>
                                                <select name="toTimeStart">
                                                    <option>09:00</option>
												</select>
												<input type="time" step="300" name="toTimeS">
                                                <span><?=GetMessage("TO_TIME");?></span>
                                                <select  name="toTimeEnd">
                                                    <option>09:00</option>
												</select>
												</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="wrapper-parcel-info clearfix">
                                    <div class="parcel-main-info clearfix">
                                        <div class="parcel-block-title">
                                        <?=GetMessage("ENTER_GRUZ_TYPE");?>
                                        </div>
                                        <div class="main-info-item">
                                            <div class="main-info-row">
                                                <label><?=GetMessage("TARIFF");?></label>
                                                <div class="field-wrap type-block">
                                                <!-- Added  class for block and select id for ajax results -->
                                                <select name="type" id="type">
                                                    <option data-type="corr" ><?=GetMessage("GRUZ_TYPE_1");?></option>
                                                    <option data-type="load" ><?=GetMessage("GRUZ_TYPE_2");?></option>
                                                    <option data-type="send" ><?=GetMessage("GRUZ_TYPE_3");?></option>
                                                    <option data-type="tire" ><?=GetMessage("GRUZ_TYPE_4");?></option>
                                                    <option data-type="cargo" ><?=GetMessage("GRUZ_TYPE_5");?></option>
                                                </select>
                                                </div>
                                        </div>
                                        <div class="main-info-row " style="display:none">
                                            <label id="labelSub"><?=GetMessage("GRUZ_SUBTYPE");?></label>
                                            <div class="field-wrap  subtype-block">
                                                <!-- Added class for block and select id for  ajax results -->
                                                <select  name="subType" id="subtype">
                                                    <option><?=GetMessage("GRUZ_TYPE_1");?></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="main-info-row gruzType type_auto"> 
                                            <label><?=GetMessage("GRUZ_TYPE_AUTO");?></label>
                                            <div class="field-wrap type_auto">
                                                <!-- Added  class for block and select id for ajax results -->
                                                <select name="type_auto" id="type_auto">
                                                    <option data-type="standard" ><?=GetMessage("GRUZ_TYPE_AUTO_1");?></option>
                                                    <option data-type="top" ><?=GetMessage("GRUZ_TYPE_AUTO_2");?></option>
                                                    <option data-type="side" ><?=GetMessage("GRUZ_TYPE_AUTO_3");?></option>
                                                    <option data-type="hydro" ><?=GetMessage("GRUZ_TYPE_AUTO_4");?></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="main-info-row gruzType" style="display:none"> 
                                            <label><?= GetMessage("GRUZ_TYPE"); ?></label>
                                                <div class="field-wrap type-block">
                                                <input id="cargoDescriptionList" type="text"/>
                                                <input type="hidden" class="department-id" id="cargoDescriptionList-ref" name="cargoDescriptionListRef">  
                                                </div>
                                        </div>                                       
                                        <!-- changed type input to number for auto validate-->
                                        <div class="main-info-row">
                                            <label><?=GetMessage("SEATS_AMOUNT");?></label>
                                            <div class="field-wrap">
                                                <input type="number" placeholder="0" name="seatsAmount" step="1"><span><?=GetMessage("ITEMS_SHORT");?></span>
                                            </div>
                                        </div>
                                        <div class="main-info-row">
                                            <label><?=GetMessage("WEIGHT");?></label>
                                            <div class="field-wrap">
                                                <input type="number" placeholder="0" name="weight"><span><?=GetMessage("KG");?></span>
                                            </div>
                                        </div>
                                        <div class="main-info-row">
                                            <label><?=GetMessage("TOTAL_WEIGHT");?></label>
                                            <div class="field-wrap">
                                                <input type="number" placeholder="0" name="totalweight"><span><?=GetMessage("KG");?></span>
                                            </div>
                                        </div>
                                        <div class="main-info-row">
                                            <label><?=GetMessage("OBJEM");?></label>
                                            <div class="field-wrap">
												<input type="text" min="0" step="0.001" name="volume" id="volume" onkeyup="this.value=this.value.replace(/[^0-9.]/ig,'')"><span>м<sup>3</sup></span>
                                            </div>
                                        </div>
                                        <div class="main-info-row">
                                            <label><?=GetMessage("DECLARED_COST");?></label>
                                            <div class="field-wrap">
                                                <input type="number" placeholder="500" min="500" name="declaredCost" id="declaredCost"  value="500"><span>грн</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Added gruz-info class for condition type of send -->
                                    <div class="main-info-item gruz-info">
                                        <!-- Added hidden gruz info block -->
                                        <div class="hidden-gruz" style="display:none;"></div>
                                        <div class="visual-sizes-wrapper">
                                            <div class="title"><?=GetMessage("VISUALIZATION");?>
                                            </div>
                                            <div class="shape-container">
                                                <div class="visual-img">
                                                    <img class="visible-image" src="<?=SITE_TEMPLATE_PATH?>/img/man.png" data-vol="1" alt="">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/pogruz.png" data-vol="2" alt="">
                                                    <img src="<?=SITE_TEMPLATE_PATH?>/img/truck_ani.png" data-vol="3" alt="">
                                                </div>
                                                <div class="axis-y">
                                                    <div><?=GetMessage("HEIGHT");?></div>
                                                </div>
                                                <div class="axis-x">
                                                    <div><?=GetMessage("LENGTH");?></div>
                                                </div>
                                                <div class="axis-z">
                                                    <div><?=GetMessage("WIDTH");?></div>
                                                </div>
                                                <div id="shape">
                                                    <div class="side back"></div>
                                                    <div class="side left"></div>
                                                    <div class="side right"></div>
                                                    <div class="side top"></div>
                                                    <div class="side bottom"></div>
                                                    <div class="side front"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <script>
                                            var pogruzValue = 14000000000;
                                            var manValue = 5000000000;
                                        </script>
                                        <div class="range-sizes-wrapper">
                                            <div class="range_wrap">
                                                <div class="price-range-details">
                                                    <label><?=GetMessage("LENGTH");?></label>
                                                    <input type="number" placeholder="0" class="slider-range-value"
                                                           id="length-range-value" name="length" value=""><span>см</span>
                                                </div>
                                                <div class="slider-range-row">
                                                    <span>0 см</span>
                                                    <div data-max="760" class="slider-range" id="length-range">
                                                    </div>
                                                    <span>760 см</span>
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
                                        
                                    </div>                                   
                                </div>
 <style>
   body {
    margin: 0; /* Убираем отступы */
   }
   .pidyom {
    margin-left: 1%; /* Отступы слева от элемента */
   }
   .amountInfo { 
    float:right;
    padding-right: 15px; 
    
   }
  </style>
								<div class="pidyom"><span class="amountInfo"><strong>*Якщо у одній накладній декілька місць, необхідно вказати габарити найбільшого з них</strong></span><strong><a href="https://www.sat.ua/upload/sat_doc/Price_20220717.pdf" target="_blank">Деталі умов виїзду за посиланням.</a></strong>
                                </div>
                                <div class="parcel-options-info" style="display:none">
                                    <div class="parcel-block-title">
                                        <?=GetMessage("SERVICES");?>
                                    </div>
                                    <!-- Added services div for responce from api -->
                                    <div class="services-block" style="display:none;"><!-- Скрыл услуги -->
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
											<td><span id="fromAddress"> вул. Терещенківська, 12Б, кв. 18</span><br><span id="fromSenderCompany"></span><br><span id="fromSender">Андрій Іванович Семеренко</span><br><span id="fromPhone">+38(___)__-__-__</span></td>
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
                                            <td><span id="toAddress"></span><br><span id="toRecipientCompany"></span><br><span id="toRecipient"></span><br><span id="toPhone"></span></td>
                                        </tr>
                                        <tr>
                                            <td class="city toCity">МИКОЛАЇВ</td>
                                        </tr>
                                    </table>
                                    <div class="hot-line">
                                    </div>
                                </div>
                                <div class="right-info">
                                                                  <table class="border">
                                        <tr>                                        
                                            <td><?=GetMessage("GRUZ_TYPE");?></td>
                                            <td class="dark upper decType" colspan="4"><?=GetMessage("GRUZ_TYPE_1");?></td>
                                        </tr>
                                        <tr class="hidden_dec type_2_show type_3_show type_4_show type_5_show">
                                            <td><?=GetMessage("GRUZ_SUBTYPE");?></td>
                                            <td class="dark upper decSubtype" colspan="4"><?=GetMessage("GRUZ_SUBTYPE");?></td>
                                        </tr>
                                        <!-- Hide for sometime <tr>
                                            <td>Пакування</td>
                                            <td class="dark upper" colspan="4">дерев’яний ящик</td>
                                        </tr> -->
                                        <tr class="hidden_dec type_2_show">
                                            <td><?=GetMessage("WIDTH");?></td>
                                            <td class="dark"><span id="decWid"></span> см</td>
                                            <td></td>
                                            <td><?=GetMessage("LENGTH");?></td>
                                            <td class="dark right"><span id="decLen"></span> см</td>
                                        </tr>
                                        <tr class="hidden_dec type_5_show type_4_show">
                                            <td><?=GetMessage("CALC_COUNT");?></td>
                                            <td class="dark "><span id="decAva"></span></td>
                                            <td></td>
                                            <td><?=GetMessage("WEIGHT");?></td>
                                            <td class="dark right"><span class="decWei"></span> кг</td>
                                        </tr>
                                        <tr  class="hidden_dec type_1_show type_3_show">
                                            <td><?=GetMessage("OBJEM");?></td>
                                            <td class="dark"><span id="decVol"></span> м<sup>3</sup></td>
                                            <td></td>
                                            <td><?=GetMessage("WEIGHT");?></td>
                                            <td class="dark right"><span class="decWei"></span> кг</td>
                                        </tr>
                                        <tr class="hidden_dec type_2_show">
                                            <td><?=GetMessage("HEIGHT");?></td>
                                            <td class="dark"><span id="decHei"></span> см</td>
                                            <td></td>
                                            <td><?=GetMessage("WEIGHT");?></td>
                                            <td class="dark right"><span class="decWei"></span> кг</td>
                                        </tr>                                        
                                        <tr>
                                            <td><?=GetMessage("DECLARED_COST");?></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td class="middle-text dark right"><span id="decCost"></span> грн</td>
                                        </tr>
                                    </table>
                                    <table class="border">
                                        <tr>
                                            <td><?=GetMessage("GABARIT_PRICE");?></td>
                                            <td class="dark right"><span id="decDimen"></span> грн</td>
										</tr>
										<tr class="hidden_dec departure_cost">
                                            <td><?=GetMessage("DEPARTURE_PRICE");?></td>
                                            <td class="dark right"><span id="decDeparture"></span> грн</td>
										</tr>
										<tr class="hidden_dec delivery_cost">
                                            <td><?=GetMessage("DELIVERY_PRICE");?></td>
                                            <td class="dark right"><span id="decDelivery"></span> грн</td>
                                        </tr>
                                        <tr class="hidden_dec departure_cost">
                                            <td><?=GetMessage("CREATION_PRICE");?></td>
                                            <td class="dark right"><span id="decCreation"></span> грн</td>
                                        </tr>
                                        <tr class="hidden_dec departure_cost">
                                            <td><?=GetMessage("INSURANCE_PRICE");?></td>
                                            <td class="dark right"><span id="decInsurance"></span> грн</td>
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
                                            <td class="big-text"><?=GetMessage("COST");?></td>
                                            <td class="big-text dark right"><span id="totalCost"></span> грн</td>
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
									<table id="deparuteSuccessZone">
                                        <tr>
											<td  class="middle-text"><?=GetMessage("DEPARTURE_SUCCESS_LINE_1");?></td>
                                        </tr>
                                        <tr>
											<td  class="middle-text"><?=GetMessage("DEPARTURE_SUCCESS_LINE_2");?><span class="middle-text dark" id="departureSuccess"></span>.</td>
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
                        <div class="calculate-wrapper">                        
                        <div class="section-from">
                        <div class="sender-info">                        
                        <div class="delivery-row" style="display:none"> 
                        <h2 style="color: #404041; padding: 8px 0px 8px 9px;">Данные отправителя</h2>
                                            <div class="phone" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-phone.png" alt="">
                                                <input id="sender-phone" class="sender-phone" autocomplete="off" type="text"  name="senderPhone"
													placeholder="<?=GetMessage("DEPARTURE_PHONE");?>">
                                            </div>  
                                            <div class="phone" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray15.png" alt="">
                                                <input id="sender-org" class="sender-phone" autocomplete="on" type="text"  name="senderOrg" onkeyup="this.value=this.value.replace(/[^0-9.]/ig,'')"
													placeholder="<?=GetMessage("DEPARTURE_ORG");?>">
                                                    <input type="hidden" class="department-id" id="sender-org-ref" name="senderOrgRef">
                                                    <input type="hidden" class="department-id" id="counterpartyType" name="counterpartyType">                                                                                                 
                                             </div>
                                            <div class="person" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-man.png" alt="">
                                                <input id="sender-person" class="sender-person" autocomplete="off" type="text"  name="senderPerson"
													placeholder="<?=GetMessage("DEPARTURE_PERSON");?>">
                                            </div>
                                            <div class="address" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-adr.png" alt="">
                                            <input type="text" id="sender-address" class="direction-field active" name="sender-address"
                                               placeholder="<?=GetMessage("DEPARTURE_ADDRESS");?>" >                                                                                   
                                            </div>									                                                                                                                      
					     <!--   Платник --> 
                         <h2 style="color: #404041; padding: 8px 0px 8px 9px;">Плательщик</h2> 
                            <div class="phone" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray17.png" alt="кпкфупукпфпфпфук">
                                                <select name="paymentMethod" id="paymentMethod">                                               
                                                    <option>💶Отправитель за наличные</option>
                                                    <option>🧾Отправитель Безналичный</option>
                                                    <option>💶Получатель за наличные</option>
                                                    <option>🧾Получатель Безналичный</option>
                                                </select>
                                             </div>    
                         <!--   Отримувач -->
                        <h2 style="color: #404041; padding: 8px 0px 8px 9px;">Данные получателя</h2> 
                        <div class="phone" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-phone.png" alt="">
                                                <input id="recipient-phone" class="sender-phone" autocomplete="off" type="text"  name="recipientPhone"
													placeholder="<?=GetMessage("DEPARTURE_RECIPIENT_PHONE");?>">
                                            </div>  
                                            <div class="phone" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon-gray15.png" alt="">
                                                <input id="recipient-org" class="sender-phone" autocomplete="on" type="text"  name="recipientOrg" onkeyup="this.value=this.value.replace(/[^0-9.]/ig,'')"
													placeholder="<?=GetMessage("DEPARTURE_RECIPIENT_ORG");?>">
                                                    <input type="hidden" class="department-id" id="recipient-org-ref" name="recipientOrgRef">
                                                    <input type="hidden" class="department-id" id="counterpartyTypeRecipient" name="counterpartyTypeRecipient">                                                                                                 
                                             </div>
                                            <div class="person" style=""><img src="<?=SITE_TEMPLATE_PATH?>/img/icons/sender-man.png" alt="">
                                                <input id="recipient-person" class="sender-person" autocomplete="off" type="text"  name="recipientPerson"
													placeholder="<?=GetMessage("DEPARTURE_RECIPIENT_PERSON");?>">
                            </div>                                                    
                        </div>
                    </div>
                    </div>
                    </div>                      
                             <div class="submit-wrapper text-center">
                            <div class="order-not-callback order-not-callback--hidden" id="orderNotCallback">
                          <label class="order-not-callback-checkbox">
                            <input type="checkbox" class="order-not-callback-checkbox__input" id="NotCallbackId" />
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
                        <div class="error-depature">Системна помилка</div> 
                            <input type="submit" class="submit-button departure-order" style="display:none"  value="<?=GetMessage("DEPARTURE_ORDER");?>">
                            <input type="submit" class="submit-button sender-submit"  value="<?=GetMessage("COUNT");?>">
                            <div class="loader" style="display:none"></div>  </div> 
                   
                </div>
            </div>
        </div>
    </div>


<script>
  (() => {
    const onSubmit = () => gtag('event', 'departure', {'event_category': 'klik'});
    const button = document.querySelector('.sender-submit');
    button.addEventListener('click', onSubmit);
  })();
</script>

<? require("../calculation/modalDepartureSuccess.php"); ?>

<script src="<?=SITE_TEMPLATE_PATH?>/js/date-lib.js?20220912"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/calc_old.js?20220912"></script>
<script src="<?=SITE_TEMPLATE_PATH?>/js/script_old.js?20220912"></script>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
