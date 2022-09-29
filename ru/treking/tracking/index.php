<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetPageProperty("description", "Отслеживание груза - Транспортная компания “САТ” | ВЫГОДНО! НАДЕЖНО! ВОВРЕМЯ!");
$APPLICATION->SetPageProperty("title", "Отслеживание груза | Транспортная компания “САТ”");
$APPLICATION->SetTitle("Отслеживание груза");
CJSCore::Init(array("popup"));
?>
<style>
	.tracking-error {
		margin-bottom:20px;
	}
</style>
<?

function getInfo ($key, $arr = array()) {
    return (is_array($arr) && isset($arr[$key])) ? $arr[$key] : '';
}
$track = array();
$track_error = array();

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
            $number = isset($_POST['tm']) && !empty($_POST['tm']) ? trim(strip_tags($_POST['tm'])) : '';
            $number = isset($_GET['tm']) && !empty($_GET['tm']) ? trim(strip_tags($_GET['tm'])) : $number;
            $number = isset($_POST['track_number']) && !empty($_POST['track_number']) ? trim(strip_tags($_POST['track_number'])) : $number;
            if ($number != '') {
                $url = $api_host_2 . "tracking/json/?" . http_build_query(array("number" => $number, "apiKey" => "8c236ec1-6e15-424b-8daf-33913831", "language" => getMessage("API_LANG")));
                $tmp = file_get_contents($url);
                $tmp = remove_utf8_bom($tmp);
                $tmp2 = json_decode($tmp, TRUE);
                //print_r($tmp2);
                if ($tmp2['success'] && $tmp2['success'] != 'false' && !empty($tmp2['data'])) {
                    $out = '';
                    $data = isset($tmp2['data'][0]) ? $tmp2['data'][0] : array();
                    if (!empty($data)) {
                        $track['type'] = getInfo('type', $data);
                        $track['number'] = getInfo('number', $data);
                        $track['number_format'] = str_pad(number_format($track['number'], 0, '.', ' '), 11, '0', STR_PAD_LEFT);
						$track['sum'] = (getInfo('sum', $data))?getInfo('sum', $data):"0";
                        $track['status'] = getInfo('currentStatus', $data);
                        $track['weight'] = getInfo('weight', $data);
                        $track['width'] = getInfo('width', $data);
                        $track['length'] = getInfo('length', $data);
                        $track['height'] = getInfo('height', $data);
                        $track['HideSum'] = getInfo('HideSum', $data);

                        $track['volume'] = getInfo('volume', $data);
                        $track['cargoType'] = getInfo('cargoType', $data);
                        $track['seatsAmount'] = getInfo('seatsAmount', $data);

                        $track['from'] = getInfo('description', $data['rspFrom']);
                        $track['from_address'] = getInfo('address', $data['rspFrom']);
                        $track['from_ref'] = getInfo('ref', $data['rspFrom']);
                        $track['from_rsp_num'] = getInfo('number', $data['rspFrom']);
                        $track['from_date'] = getInfo('date', $data);
                        $track['from_type'] = trim(explode('-', $track['type'])[0]);

                        $track['to'] = getInfo('description', $data['rspTo']);
						$track['to_address'] = getInfo('address', $data['rspTo']);
                        $track['to_ref'] = getInfo('ref', $data['rspTo']);
                        $track['to_rsp_num'] = getInfo('number', $data['rspTo']);
                        $track['to_date'] = getInfo('incomingDate', $data);
                        $track['to_type'] = trim(explode('-', $track['type'])[1]);

						if( $track['status']!=="Выдан получателю"):
							if( $track['status']!=="Доставлен получателю"):
								($track['to_type'] == "двери")? $track['to_address'] = GetMessage("DELIVERY_TEXT_2"):$track['to_address'];
							else:
								($track['to_type'] == "двери")? $track['to_address'] = GetMessage("DELIVERY_TEXT_1"):$track['to_address'];
							endif;
						endif;
						$track['payer'] = getInfo('payerName', $data['payData'][0]);
                        $track['payer_sum'] = getInfo('sum', $data['payData'][0]);

                        $track['addServices'] = isset($data['addServices']) ? $data['addServices'] : array();
						/*add 19-11-2018 for UAPay*/
						$track['webTtnId'] = getInfo('ref', $data);
						$track['webLastOrderSum'] = getInfo('orderSum', $data['webPayData']['orderInformation']);
						$track['webLastOrderId'] = getInfo('orderId', $data['webPayData']['orderInformation']);
                        $track['webTtnSum'] = getInfo('ttnSum', $data['webPayData']['orderInformation']);
						/**/
						/*Electrum*/
						$track['codSum'] = getInfo('codSum', $data["codData"]);
						$track['commissionSum'] = getInfo('commissionSum', $data["codData"]);
						/*end Electrum*/
						/*commission uapay privat24*/
						$track['uapayCommission'] = getInfo('uapay', $data["webPayData"]["commission"]);
						$track['privat24Commission'] = getInfo('privat24', $data["webPayData"]["commission"]);
						/**/
                    }
                    $out = 'ok|' . $out;
					unset($track_error);
                } else {
                    $out = 'error|';
                    $track_error = 'error';
                }
            }
?>
<?if (!empty($track)) {?>
<script>
window.track = '1';
$(document).ready(function () {
    $('.tracking-error').slideUp(300);
    $('.tracking-info').slideDown(300);
	$('.additional-information').slideDown(300);
	$(".rate-wrap").show();
})
</script>
<?}?>

<?if (!empty($track_error)) {?>
	<script>
		window.track = '2';
		console.log(window.track);
		$(document).ready(function () {
			$('.tracking-error').slideDown(300);
			$('.tracking-info').slideUp(300);
			$('.additional-information').slideUp(300);
			$(".rate-wrap").hide();
		})
	</script>
<?}?>
	<script>

		/**************Use elements of this code to do the action for tracking field***********/
		$(document).ready(function () {

			
		});
	</script>
<style>
	.tracking-page{
		padding-bottom:40px;
	}
	.track-wrap .input-wrap {
		margin-top:0;
	}
	.department-panel {
		background:#fff;
		overflow: hidden;
		padding: 0;
	}
    .promo {
		padding: 14px 0 0 0;
		font-size:16px;
		display: flex;
		position: relative;
		width: 120% !important;
		left: -50px;
	}
</style>
    <div class="track-wrap">
        <div class="container">
            <div class="row">
				<div class="col-sm-12">
					<div class="department-panel">
						<div class="title-panel">
							<div class="img-wrap">
								<img src="<?=SITE_TEMPLATE_PATH?>/img/icons/icon_tracking_top.png" alt="">
							</div>
							<span><h1><?$APPLICATION->ShowTitle(false);?></h1></span>
						</div>
					</div>
				</div>
                <div class="col-xs-12">
                    <div class="input-wrap">
						<form action="" method="post" id="tn">
							<input type="text" placeholder="<?echo getMessage("ENTER_TRACK_NUMBER");?>" class="track-search only_number" name="track_number" value="<?echo $number;?>" autocomplete="off" maxlength="9">
							<button class="track-action" type="submit"></button></form>
							<form action="<?=SITE_DIR;?>contacts/departments/list/" method="post" id="dept_search">
								<input type="hidden" name="department-search-id" value="">
						</form>
                    </div>
                    <div class="tracking-table  tracking-info">

                        <div class="row-table row-main clearfix">
                            <div class="td-location">
                                <table>
                                    <tr>
                                        <td>
                                            <div class="title" data-ref="<?echo getInfo('from_ref', $track);?>"><?echo getInfo('from', $track);?></div>
                                        </td>
                                        <td>
                                            <div class="right-text small-text"><?echo getInfo('from_date', $track);?></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="middle-text"><?echo getInfo('from_address', $track);?></div>
                                        </td>
                                        <td>
                                            <div class="dark right-text middle-text"><?echo getInfo('from_type', $track);?></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="td-status text-center">
                                <div class="status-wrap">
                                    <span><?echo getInfo('status', $track);?></span>
                                </div>
                                <div class="number"><?echo getInfo('number_format', $track);?></div>


                    <? if ($track["HideSum"] == 'false'): ?>
                      <div class="info-ttn-sum">
                        <?if($track["sum"] == $track["webTtnSum"] && getInfo('webTtnSum', $track)):?>
                            <div class="main-cost">
                              <span><?=GetMessage("TRACK_PAY_SUM");?></span>
                              <div class="sum"><?echo getInfo('webTtnSum', $track);?> грн</div>
                              <div class="promo" style="display:none">
                    				<div class="input-wrap">
									<input type="text" placeholder="Промокод/бонус" class="promo-search only_number" name="inputPromo" value="">
									<button class="track-promo" type="submit" id="promoButton" ></button>									
									</div>
							  </div>
                            </div>
							<img src="https://sat.ua/bitrix/templates/sat_main/img/35.gif" id="loaderIMG" style="display:none"></img>
						    <div class="error-promo">Системна помилка</div> 
                          <?else:?>
                            <div class="main-cost">
                              <span><?=GetMessage("TRACK_TOTAL_SUM");?></span>
                              <div class="sum"><?echo getInfo('sum', $track);?> грн</div>
                              <div class="promo" style="display:none">
                    				<div class="input-wrap">
									<input type="text" placeholder="Промокод/бонус" class="promo-search only_number" name="inputPromo" value="">
									<button class="track-promo" type="submit" id="promoButton" ></button>									
									</div>
							  </div>						  
                            </div>
							<img src="https://sat.ua/bitrix/templates/sat_main/img/35.gif" id="loaderIMG" style="display:none"></img>
						    <div class="error-promo">Системна помилка</div> >
                          <?if(getInfo('webTtnSum', $track)):?>
                            <div class="pay-cost">
                              <span><?=GetMessage("TRACK_PAY_SUM");?></span>
                              <div class="sum"><?echo getInfo('webTtnSum', $track);?> грн</div>
                            </div>
                          <?endif;?>
                        <?endif;?>
                      </div>
                    <?endif;?>


                            </div>
                            <div class="td-location">
                                <table>
                                    <tr>
                                        <td>
                                            <div class="title" data-ref="<?echo getInfo('to_ref', $track);?>"><?echo getInfo('to', $track);?></div>
                                        </td>
                                        <td>
                                          <? if ($track['to_type'] != "двери"): ?>
											                      <div class="right-text small-text to-date-question"style="<?=($track['status']=='Заявлен к отправке')?"visibility:hidden":"";?>" data-description="<?echo getMessage("APPROX_DATE");?>"><?echo getInfo('to_date', $track);?></div>
                                          <?endif;?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="middle-text"><?echo getInfo('to_address', $track);?></div>
                                        </td>
                                        <td>
                                          <div class="dark right-text middle-text"><?= getInfo('to_type', $track);?></div>
                                        </td>
                                    </tr>                                    
                                </table>
                            </div>
                        </div>
						<?if(getInfo('webTtnSum', $track)):?>
						<div class="choice-payment-method">
							<div class="title"><?=GetMessage("PAYMENT_V_TEXT");?></div>
							<div class="payment-list">
								<div class="payment-method">
									<input type="radio" id="privat24" name="payment_method" class="payment-input"/>
									<label for="privat24">
										<div class="img-wrap">
											<img src="<?=SITE_TEMPLATE_PATH?>/img/payment/privat24.png"/>
											<div class="current-payment-method"></div>
										</div>
									</label>
								</div>
								<div class="payment-method">
									<input type="radio" id="uapay" name="payment_method" class="payment-input"/>
									<label for="uapay">
										<div class="img-wrap">
											<img src="<?=SITE_TEMPLATE_PATH?>/img/payment/uapay.png"/>
											<div class="current-payment-method"></div>
										</div>
									</label>
								</div>
                                <div class="payment-method">
									<input type="radio" id="pumb" name="payment_method" class="payment-input"/>
									<label for="pumb">
										<div class="img-wrap">
											<img src="https://www.sat.ua/upload/images/pumb.png"/>
											<div class="current-payment-method"></div>
										</div>
									</label>
								</div>
							</div>
						</div>

						<div class="pay-wrap">
							<div class="pay-text">
								<span><?=GetMessage("PAYMENT_TERMS");?><a class="pay-conditions"><?=GetMessage("PAYMENT_TERMS_A");?></a></span>
							</div>
							<div class="pay-btn-zone">
								<button type="submit" class="pay-button" id="payButton"
									data-webttnnumber="<?=$track['number'];?>"
									data-webttnsum="<?=$track['webTtnSum'];?>"
									data-webttnid="<?=$track['webTtnId'];?>"
									data-webordersum="<?=$track['webLastOrderSum'];?>"
									data-weborderid="<?=$track['webLastOrderId'];?>">
										<div class=text-block><?=GetMessage("PAYMENT_BTN");?></div>
										<div class="commission-block">
											<span class="commission-sum">
												<span id="uapay-sum" style="display:none" class="c-sum"><?echo getInfo('uapayCommission', $track);?></span>
												<span id="privat24-sum" style="display:none" class="c-sum"><?echo getInfo('privat24Commission', $track);?></span>
											<?=GetMessage("PAYMENT_CURRENCY");?>
											</span>
											<span class="commission-text"><?=GetMessage("PAYMENT_COMMISSION");?></span>
										</div>
								</button>
								<div class="lds-ellipsis">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
						</div>
						<?endif;?>
                        <div class="additional-information">
                            <div class="row-table row-sub clearfix small-text">
                                <div class="td-location">
                                    <table>
                                        <!--<tr>
                                            <td><?echo getMessage("PACKAGE");?></td>
                                            <td colspan="4">
                                                <div class="dark upper">Дерев’яний ящик</div>
                                            </td>
                                        </tr>-->
										<tr>
											<td><?echo getMessage("SEATS_AMOUNT");?></td>
											<td>
												<div class="dark"><?echo getInfo('seatsAmount', $track);?></div>
											</td>
										</tr>
                                        <tr>
                                            <td><?echo getMessage("WIDTH");?></td>
                                            <td>
                                                <div class="dark"><?echo getInfo('width', $track);?> см</div>
                                            </td>
                                            <td></td>
                                            <td><?echo getMessage("DEPTH");?></td>
                                            <td>
                                                <div class="dark right-text"><?echo getInfo('length', $track);?> см</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><?echo getMessage("HEIGHT");?></td>
                                            <td>
                                                <div class="dark"><?echo getInfo('height', $track);?> см</div>
                                            </td>
                                            <td></td>
                                            <td><?echo getMessage("WEIGHT");?></td>
                                            <td>
                                                <div class="dark right-text"><?echo getInfo('weight', $track);?> кг</div>
                                            </td>
                                        </tr>
										<tr>
											<td><?echo getMessage("OBJEM");?></td>
											<td>
												<div class="dark" style="white-space: nowrap;"><?echo getInfo('volume', $track);?> м<sup>3</sup></div>
											</td>
										</tr>
                                    </table>
                                </div>
                                <div class="td-info">
                                    <table>
                                        <tr>
                                            <td colspan="3"><?echo getMessage("ADD_SERVICES");?></td>
                                        </tr>
                                        <tr>
                                        <?
                                          $i = 0;

                                          $addServices = $data['addServices'];
                                          usort($addServices, function ($a, $b) {
                                            if ($a['service'] === '2d832f7b-b6b0-11e5-bb36-0017a4770440') return 1;
                                            return 0;
                                          });

                                          foreach ($addServices as $k => $v) {
                                        ?>
                                          <td>
                                            <div class="dark upper">
                                            <i class="fa fa-check" aria-hidden="true"></i>
                                              <? $serviceDescription = $v['serviceDescription'];
                                              if ($v['service'] === '2d832f7b-b6b0-11e5-bb36-0017a4770440') {
                                                $serviceDescription .= $v['state'] ? ' УСТАНОВЛЕН' : ' СНЯТ';
                                              }
                                              ?>

                                            <?= $serviceDescription; ?>
                                            </div>
                                          </td>
                                        <?
                                            if ($i == 2 ) {
                                                ?></tr><tr><?
                                            }
                                            $i++;
                                        }?>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="row-table row-sub clearfix">
								<div class="td-location">
									<div class="title"><?echo getMessage("NOTE");?></div>
									<div class="middle-text">

                  <? if ($track["HideSum"] == 'false'): ?>
                    <?= getInfo('payer_sum', $track);?> грн
                  <?endif;?>

                  <?=getMessage("MAKE_PAYMENT");?> <?echo getInfo('payer', $track);?></div>
									<?if((strlen($track['codSum']) && is_numeric($track['codSum'])) && (strlen($track['commissionSum']) && is_numeric($track['commissionSum']))):
									$codFullSum = $track['codSum'] + $track['commissionSum'];
									$el_text = CComponentEngine::MakePathFromTemplate(getMessage("COD_TEXT"), array("EL_FULL_SUM" => $codFullSum, "EL_COMMISSION_SUM" => $track['commissionSum']));?>
									<div class="middle-text"><?echo $el_text?></div>
									<?endif;?>
								</div>
                                <div class="td-info">
                                    <div class="title"><?echo getMessage("DOCUMENTS");?></div>
                                    <div class="middle-text"><?echo getMessage("DOCUMENTS_TEXT");?></div>
                                </div>
                            </div>

                            <div class="row-table row-sub clearfix">
							<div class="table-states">
								<table>
									<tr>
										<th>
											<div class="title">Дата</div>
										</th>
										<th>
											<div class="title">Статус</div>
										</th>
										<th>
											<div class="title">Город</div>
										</th>
									</tr>

<?

foreach ($data['states'] as $k => $v) {
?>
<tr>
	<td>
		<div class="middle-text"><?echo $v['date']?></div>
	</td>
	<td>
		<div class="middle-text"><?echo $v['status']?></div>
	</td>
	<td>
		<div class="middle-text"><?echo $v['town']?></div>
	</td>
<?}?>
								</table>
							</div>
                            </div>

                        </div>
                        <div class="row-table text-center bottom-row">
                            <a class="button-more hide-button"><span class="text"><?echo getMessage("HIDE");?></span><span
                                    class="arrow"><img
                                    src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black-up.png" alt=""></span></a>
                            <a class="button-more show-button hidden-button"><span
                                    class="text"><?echo getMessage("SHOW_MORE_UF");?></span><span
                                    class="arrow"><img
                                    src="<?=SITE_TEMPLATE_PATH?>/img/icons/arrow-black-down.png" alt=""></span></a>
                        </div>
                    </div>
                    <div class="tracking-error">
                        <div class="text-warning">
                            <strong><span id="track_error_reason">Вы ввели несуществующий номер отправления SAT.</span></strong><br><br>
							Номер отправления SAT состоит из девяти цифр, например: 123456789. Проверьте свой номер и попробуйте еще раз.
							<br><br>
							Мы всегда готовы помочь. Если у вас возникли какие-либо вопросы о текущем местоположении вашего отправления, вы можете связаться с нами.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--    <div class="login-panel">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">

                    <a href="" class="clearfix login-inner"><div>
                        ЗРУЧНИЙ <span>ОСОБИСТИЙ КАБІНЕТ</span> <img class="desctop-icon" src="<?=SITE_TEMPLATE_PATH?>/img/icons/login.png" alt=""> НАДАСТЬ ВАМ
                        УСІ
                        ПЕРЕВАГИ ПОСТІЙНОГО КЛІЄНТА</div> <img class="mobile-icon" src="<?=SITE_TEMPLATE_PATH?>/img/icons/login.png" alt="">
                    </a>

                </div>
            </div>
        </div>
-->    </div>
    <div class="rate-wrap" style="display:none;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
<?$APPLICATION->IncludeComponent(
	"bitrix:form.result.new",
	"rating",
	array(
		"CACHE_TIME" => "3600",
		"CACHE_TYPE" => "A",
		"CHAIN_ITEM_LINK" => "",
		"CHAIN_ITEM_TEXT" => "",
		"EDIT_URL" => "result_edit.php",
		"IGNORE_CUSTOM_TEMPLATE" => "N",
		"LIST_URL" => "/ru/treking/tracking/",
		"SEF_MODE" => "N",
		"SUCCESS_URL" => "",
		"USE_EXTENDED_ERRORS" => "N",
		"WEB_FORM_ID" => "2",
		"COMPONENT_TEMPLATE" => "rating",
		"VARIABLE_ALIASES" => array(
			"WEB_FORM_ID" => "WEB_FORM_ID",
			"RESULT_ID" => "RESULT_ID",
		)
	),
	false
);?>
                </div>
            </div>
        </div>
    </div>
<script src="<?=SITE_TEMPLATE_PATH?>/js/promocode-tracking.js?20220915"></script>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
