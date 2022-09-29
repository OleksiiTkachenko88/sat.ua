<?
$out = 'ok';
$arr = array();
$url = '';
$api_host_2 = 'http://urm.sat.ua/openws/hs/api/v1.0/';

$apiHostV2 = 'https://api.sat.ua/openws/hs/api/v2.0/';

// $api_host_2 = 'http://xyz.sat.ua:8021/postavka/hs/api/v1.0/';
$api_host = 'http://urm.sat.ua/api_proxy/api/proxy/';
$apiHost = 'https://catalog.sat.ua/';


$apiKey = '8c236ec1-6e15-424b-8daf-33913831';

function remove_utf8_bom($text) {
	$bom = pack('H*','EFBBBF');
	$text = preg_replace("/^$bom/", '', $text);
	return $text;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

//запрос от autocomplete jquery-ui
$term = (isset($_GET['term']) && !empty($_GET['term'])) ? trim(strip_tags($_GET['term'])) : '';
$term = mb_convert_encoding($term, 'utf-8', mb_detect_encoding($term));

$rsp = (isset($_GET['rsp']) && !empty($_GET['rsp'])) ? trim(strip_tags($_GET['rsp'])) : '';
$rsp = mb_convert_encoding($rsp, 'utf-8', mb_detect_encoding($rsp));
//


$lang = isset($_GET['lang']) && !empty($_GET['lang']) ? trim(strip_tags($_GET['lang'])) : 'uk';
$lang_local = $_GET['lang']=='ru' && !empty($_GET['lang']) ? '/ru/' :'/ua/';

$perevod = array(
	'uk' => array('price' => 'ціна', 'itogo' => 'загалом'),
	'ru' => array('price' => 'цена', 'itogo' => 'итого')
);

$infoTypeOfCargo = [
  'Документы' => [
    'title' => [
      'uk' => "",
      'ru' => ""
    ],
    'options' => [
      'uk' => "",
      'ru' => ""
    ]
  ],
  'Базовый' => [
    'title' => [
      'uk' => "Розрахунок вартості за тарифом &#34;Базовий&#34; проводиться за:",
      'ru' => "Расчет стоимости по тарифу &#34;Базовый&#34; проводится по:"
    ],
    'options' => [
      'uk' => "Загальною вагою та загальним об'ємом всього вантажу;Габарити ДШВ вказуються за розмірами найбільшого місця.",
      'ru' => "Общему весу и общему объему всего груза;Габариты ДШВ указываются по размеру самого большого места."
    ]
  ],
  'ПаллетаЕвро' => [
    'title' => [
      'uk' => "Розрахунок вартості за тарифом &#34;Палети&#34; здійснюється відповідно до типу палети та максимальної висоти однієї з палет. Різні типи палет необхідно розрахувати окремо.",
      'ru' => "Расчет стоимости по тарифу &#34;Паллеты&#34; осуществляется в соответствии с типом паллеты и максимальной высоты одной из паллет. Различные типы паллет необходимо рассчитать отдельно."
    ],
    'options' => [
      'uk' => "",
      'ru' => ""
    ]
  ],
  'лКолеса10' => [
    'title' => [
      'uk' => "Розрахунок вартості за тарифом &#34;Шини/Диски&#34; здійснюється відповідно до радіусу шин /дисків та їх ваги.",
      'ru' => "Расчет стоимости по тарифу &#34;Шины / Диски&#34; осуществляется в соответствии с радиуса шин / дисков и их веса."
    ],
    'options' => [
      'uk' => "",
      'ru' => ""
    ]
  ],
  'гКолеса15' => [
    'title' => [
      'uk' => "Розрахунок вартості за тарифом &#34;Шини/Диски&#34; здійснюється відповідно до радіусу шин /дисків та їх ваги.",
      'ru' => "Расчет стоимости по тарифу &#34;Шины / Диски&#34; осуществляется в соответствии с радиуса шин / дисков и их веса."
    ],
    'options' => [
      'uk' => "",
      'ru' => ""
    ]
  ]
];

//изменили на апи с кешированием
if ($action != '') {
	switch($action) {
		case 'getTown':
			if ($term && !empty($term)) {
				$url = "{$apiHost}getTowns?" . http_build_query(["searchString" => $term, "language" => $lang]);
				$tmp = file_get_contents($url);
				if($tmp) {
					$tmp = remove_utf8_bom($tmp);
					$tmp2 = json_decode($tmp, TRUE);
					foreach ($tmp2['data'] as $k => $v) {
						$rspList = isset($v['rspList']) && is_array($v['rspList']) ? json_encode($v['rspList']) : '';
						$arr[] = [
              "label"       => $v['description'] . ' - ' . $v['district'] . ' - ' . $v['region'],
              "value"       => $v['description'] . ' - ' . $v['district'] . ' - ' . $v['region'],
              "id"          => $v['ref'],
              "value_short" => $v['description'],
              "rspRef"      => $v['rspRef'],
              'rspList'     => $rspList
            ];
					}
				}
			}
			$out = json_encode($arr);
		break;
		case 'getServices':
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHost}getAdditionalServices?language={$lang}");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$tmp = curl_exec($ch);
			$tmp = remove_utf8_bom($tmp);
			$tmp = json_decode($tmp, TRUE);
			$group = '';
			$out = '';

			function cmp($a, $b) {
				 return strcmp($a["serviceGroup"], $b["serviceGroup"]);
			}

			if( $tmp['data'] ) {
				 usort($tmp['data'], "cmp");
				foreach ($tmp['data'] as $key => $service) {
					if( $group != $service['serviceGroup'] ){
						if( $group!='' ){
							$out .= '</div></div>';
						}
						$out .= '<div class="options-info-item">
							<a class="parcel-block-subtitle">'.$service['serviceGroup'].'</a>
							<div class="options-body">';
						$group = $service['serviceGroup'];
					}
					$fixed=($service['fixedCount']=='1')?"disabled":"";
					$out .= '<div class="options-row-item options-body-item">
								<label>
									<input type="checkbox" class="service" name="services[]" data-ref="'.$service['ref'].'" data-cost=""><span></span>
									<div>'.$service['description'].'</div>
								</label>

							   <div class="price-total">
									<span class="text">' . $perevod[$lang]['price'] . ': </span><span class="value">0 грн.</span>
								</div>

								<div class="price-total">
									<span class="text">' . $perevod[$lang]['itogo'] . ': </span><span
										class="value">0 грн.</span>
								</div>

								<div class="qty-wrap">

							   <input type="text" value="1" placeholder="0" ' .$fixed. '><span>шт</span>
								</div>
							</div>';
				}
				$out .= '</div></div>';
			}
		break;
		case 'getServicesNew':
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHost}getAdditionalServices?language={$lang}");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$out = curl_exec($ch);
		break;
		case 'getCargoDescriptionList':
			$query = http_build_query(["searchString" => $term, "limit" => 10]);
      $ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHost}getCargoDescriptionList?" . $query);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$response = json_decode(curl_exec($ch), TRUE);
      $request = [];

      if ($response['success'] == true) {
        foreach ($response['data'] as $item) {
          $request[] = [
            'label' => $item['description'],
            'id' => $item['ref']
          ];
        }
      }

      $out = json_encode($request);
		break;
		case 'getHolydays':
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHost}workingdays?cityRef={$_GET['cityRef']}");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$out = curl_exec($ch);
		break;
		case 'getSenderServices':
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHost}getAdditionalServices?language={$lang}");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$tmp = curl_exec($ch);
			$tmp = remove_utf8_bom($tmp);
			$tmp = json_decode($tmp, TRUE);
			$group = '';
			$out = '';

			function cmp($a, $b)
			{
				return strcmp($a["serviceGroup"], $b["serviceGroup"]);
			}

			function filter_by_value ($array, $index, $value, $index2, $value2) {
				if( is_array($array) && count($array)>0 ) {
					foreach(array_keys($array) as $key){
						$temp[$key] = $array[$key][$index];
						$temp2[$key] = $array[$key][$index2];
						if ($temp[$key] == $value){
							$newarray[$key] = $array[$key];
						}
						elseif ($temp2[$key] == $value2){
							$newarray[$key] = $array[$key];
						}
					}
				  }
			  return $newarray;
			}

			if( $tmp['data'] ){
				usort($tmp['data'], "cmp");
				$tmp['data'] = filter_by_value($tmp['data'], 'sender', '1', 'serviceGroup', 'Услуги упаковки');

				foreach ($tmp['data'] as $key => $service) {
					if( $group != $service['serviceGroup'] ){
						if( $group!='' ){
							$out .= '</div></div>';
						}
						$out .= '<div class="options-info-item">
							<a class="parcel-block-subtitle">'.$service['serviceGroup'].'</a>
							<div class="options-body">';
						$group = $service['serviceGroup'];
					}
					$fixed=($service['fixedCount']=='1')?"disabled":"";
					$out .= '<div class="options-row-item options-body-item">
								<label>
									<input type="checkbox" class="service" name="services[]" data-ref="'.$service['ref'].'" data-cost=""><span></span>
									<div>'.$service['description'].'</div>
								</label>

							   <div class="price-total">
									<span class="text">' . $perevod[$lang]['price'] . ': </span><span class="value">0 грн.</span>
								</div>

								<div class="price-total">
									<span class="text">' . $perevod[$lang]['itogo'] . ': </span><span
										class="value">0 грн.</span>
								</div>

								<div class="qty-wrap">

							   <input type="text" value="1" placeholder="0" ' .$fixed. '><span>шт</span>
								</div>
							</div>';
				}
				$out .= '</div></div>';
			}
		break;
		case 'getDeliveryServices':
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHost}getAdditionalServices?language={$lang}");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$tmp = curl_exec($ch);
			$tmp = remove_utf8_bom($tmp);
			$tmp = json_decode($tmp, TRUE);
			$group = '';
			$out = '';
			function cmp($a, $b) {
				return strcmp($a["serviceGroup"], $b["serviceGroup"]);
			}
			function filter_by_value ($array, $index, $value, $index2, $value2) {
				if(is_array($array) && count($array)>0) {
					foreach(array_keys($array) as $key) {
						$temp[$key] = $array[$key][$index];
						$temp2[$key] = $array[$key][$index2];
						if (($temp[$key] == $value)&&($temp2[$key] == $value2)) {
							$newarray[$key] = $array[$key];
						}
					}
				}
				return $newarray;
			}
			if( $tmp['data'] ) {
				usort($tmp['data'], "cmp");
				$tmp['data'] = filter_by_value($tmp['data'], 'recipient', '1', 'sender', '0');
				foreach ($tmp['data'] as $key => $service) {
					if( $group != $service['serviceGroup'] ) {
						if( $group!='' ) {
							$out .= '</div></div>';
						}
						$out .= '<div class="options-info-item">
							<a class="parcel-block-subtitle">'.$service['serviceGroup'].'</a>
							<div class="options-body">';
						$group = $service['serviceGroup'];
					}
						$fixed=($service['fixedCount']=='1')?"disabled":"";
						$out .= '<div class="options-row-item options-body-item">
								<label>
									<input type="checkbox" class="service" name="services[]" data-ref="'.$service['ref'].'" data-cost=""><span></span>
									<div>'.$service['description'].'</div>
								</label>
							   <div class="price-total">
									<span class="text">' . $perevod[$lang]['price'] . ': </span><span class="value">0 грн.</span>
								</div>
								<div class="price-total">
									<span class="text">' . $perevod[$lang]['itogo'] . ': </span><span
										class="value">0 грн.</span>
								</div>
								<div class="qty-wrap">
							   <input type="text" value="1" placeholder="0" ' .$fixed. '><span>шт</span>
								</div>
							</div>';
					}
				$out .= '</div></div>';
			}
		break;
		case 'getTypes':
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "main/json/getCargoTypes?language=".$lang );
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$tmp = curl_exec($ch);
			$tmp = remove_utf8_bom($tmp);
			$tmp = json_decode($tmp, TRUE);
			$group = $out = $ptype = '';
			$i = 0;
			if( $tmp['data'] ) {
				foreach ($tmp['data'] as $key => $service) {
					if( $group != $service['type'] ) {
						$group = $service['type'];
						$i++;
					}
					$type[ 'type_'.($i) ][] = array(
						'ref'=>$service['ref'],
						'type' => $service['type'],
						'lowerLimit' => $service['lowerLimit'],
						'upperLimit' => $service['upperLimit'],
						'description'=> $service['description'],
						'length' => $service['length'],
						'width' => $service['width'],
						);
				}
				foreach ($type as $key => $sub) {
					foreach ($sub as $k => $v) {
						if($k==0) {
              $title = $infoTypeOfCargo[$v['ref']]['title'][$lang];
              $options = $infoTypeOfCargo[$v['ref']]['options'][$lang];
							$ptype .= "<option data-info-title=\"{$title}\" data-info-options=\"{$options}\" data-type=\"{$key}\" data-ref=\"{$v['ref']}\" >"
                ."{$v['type']}</option>";
						}
						$min = ( !empty($v['lowerLimit']) ) ? $v['lowerLimit'] : 0;
						$max = ( !empty($v['upperLimit']) ) ? $v['upperLimit'] : 0;
						$length = ( !empty($v['length']) ) ? $v['length']*100 : 0;
						$width = ( !empty($v['width']) ) ? $v['width']*100 : 0;
						$subtype .= '<option class="hidden-fields '.$key.'" hidden-fields data-ref="'.$v['ref'].'" data-min="'.$min.'" data-max="'.$max.'"  data-length="'.$length.'" data-width="'.$width.'">'.$v['description'].'</option>';
					}
				}
			}
			$json = array( 'type' => $ptype, 'subtype'=> $subtype );
			die(json_encode($json));
		break;
		case 'simple_calc':
			$townSender = isset($_GET['simple_calc_from_ref']) && !empty($_GET['simple_calc_from_ref']) ? trim(strip_tags($_GET['simple_calc_from_ref'])) : '';
			$townRecipient = isset($_GET['simple_calc_to_ref']) && !empty($_GET['simple_calc_to_ref']) ? trim(strip_tags($_GET['simple_calc_to_ref'])) : '';
			$weight = isset($_GET['simple_calc_weight']) && !empty($_GET['simple_calc_weight']) ? trim(strip_tags($_GET['simple_calc_weight'])) : '';
			$weight = str_replace(array(' ', ','), array('', '.'), $weight);
			if ($townSender != '' && $townRecipient != '' && $weight != '') {
				//$params = array("townSender" => $townSender, "townRecipient" => $townRecipient, "weight" => $weight, "cargoType" => "Стандарт");
				//Изменить при введении новых тарифов
				$params = array("townSender" => $townSender, "townRecipient" => $townRecipient, "weight" => $weight, "cargoType" => "Базовый");
				$body = json_encode($params);
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $api_host . "calc/json/");
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
				curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
				$tmp = curl_exec($ch);
				$tmp = remove_utf8_bom($tmp);
				$tmp2 = json_decode($tmp, TRUE);
				if ($tmp2['success']) {
					$out = 'ok|' . $tmp2['data']['0']['cost'];
				} else {
					$out = 'error|';
				}
			}
		break;
		case 'global_calc':
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "calc/json/?language=".$lang);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'global_calc_v2':
      $requestData = json_decode(file_get_contents('php://input'), true);

      $body = [
        'addServices'        => $requestData['addServices'],
        'cargoType'          => $requestData['cargoType'],
        'cod'                => false,
        'declaredCost'       => $requestData['declaredCost'],
        'delivery'           => $requestData['delivery'],
        'deliveryCondition'  => $requestData['deliveryCondition'],
        'departure'          => $requestData['departure'],
        'departureCondition' => $requestData['departureCondition'],
        'payerType'          => '00000000-0000-0000-0000-000000000000',
        'paymentMethod'      => 'Cash',
        'recipient'          => '00000000-0000-0000-0000-000000000000',
        'rspRecipient'       => '00000000-0000-0000-0000-000000000000',
        'rspSender'          => '00000000-0000-0000-0000-000000000000',
        'townRecipient'      => $requestData['townRecipient'],
        'townSender'         => $requestData['townSender'],
        'seatsAmount'        => $requestData['seatsAmount'],
        'volume'             => $requestData['volume'],
        'weight'             => $requestData['weight'],
        'width'              => $requestData['width'],
        'height'             => $requestData['height'],
        'length'             => $requestData['length'],
        'sourceComponent'    => 'calculate',
        'description'        => $requestData['description']
      ];

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHostV2}calc/json?showpacking=1&language{$requestData['language']}");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'showpacking':
      $requestData = json_decode(file_get_contents('php://input'), true);

      $body = [
        'height'      => $_GET['height'],
        'length'      => $_GET['length'],
        'volume'      => $_GET['volume'],
        'weight'      => $_GET['weight'],
        'width'       => $_GET['width'],
        'description' => $_GET['description'],
        'language'    => $_GET['language']
      ];

			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHostV2}showpacking");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
      $response = json_decode(curl_exec($ch), TRUE);
      $out = json_encode($response['recomendedServices']);
		break;

		case 'delivery_tracking':
			unset($_GET['action']);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "tracking/json?language=".$lang."&apiKey=" .$apiKey."&number=".$_GET['number']);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, false);
			curl_setopt($ch, CURLOPT_HTTPGET, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'getDeliveryTown':
			unset($_GET['action']);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "{$apiHost}getTowns?ref=".$_GET['toCityRef']."&language=".$lang);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, false);
			curl_setopt($ch, CURLOPT_HTTPGET, true);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'delivery_send':
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "documents/order/delivery/json/save?apiKey=".$apiKey);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'departure_send':
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "documents/order/departure/json/save?apiKey=".$apiKey);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'declaration':
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $api_host . "documents/nng/json/save");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$tmp = curl_exec($ch);
			$tmp = remove_utf8_bom($tmp);
			$tmp2 = json_decode($tmp, TRUE);
			print_r($tmp2);
			if ($tmp2['success']) {
				$out = 'ok|' . $tmp2['data']['0']['cost'];
			} else {
				$out = 'error|';
			}
		break;
		case 'simple_track':
			$number = isset($_GET['simple_track_number']) && !empty($_GET['simple_track_number']) ? trim(strip_tags($_GET['simple_track_number'])) : '';
			$lang = isset($_GET['lang']) && !empty($_GET['lang']) ? trim(strip_tags($_GET['lang'])) : 'uk';
			if ($number != '') {
				$url = $api_host_2 . "tracking/json/?" . http_build_query(array("number" => $number, 'language' => $lang));
				$tmp = file_get_contents($url);
				$tmp = remove_utf8_bom($tmp);
				$tmp2 = json_decode($tmp, TRUE);
				if ($tmp2['success'] && $tmp2['success'] != 'false') {
					$out = '';
					$end = count($tmp2['data'][0]['states']) - 1;
					$state = $tmp2['data'][0]['states'][$end];
					$out .= "<div class='results'><div class='result-item from-to'>
								<div><span>" . $state['rsp'] . "</span></div>
							</div>
							<div class='result-item border-result'>
								<div>" . $state['status'] . " (" . $state['date'] . ")</div>
							</div></div>";
					$out = 'ok|' . $out;
				} else {
					$out = 'error|' . (isset($tmp2['error']['text']) ? $tmp2['error']['text'] : '');
				}
			}
		break;
		case 'getDeliveryTerms':
			$rspSender = isset($_GET['rspSender']) ? $_GET['rspSender'] : '';
			$rspRecipient = isset($_GET['rspRecipient']) ? $_GET['rspRecipient'] : '';
			$date = isset($_GET['date']) ? $_GET['date'] : '';
			$params = [
				"rspSender" => $rspSender,
				"rspRecipient" => $rspRecipient,
				"date" => $date
			];

			if (isset($_GET['delivery'])) $params["delivery"] = $_GET['delivery'];
			$url = $api_host . "main/json/getDeliveryTerms?" . http_build_query($params);

			$tmp = file_get_contents($url);
			$tmp = remove_utf8_bom($tmp);
			$out = $tmp;
		default:
		break;
	}
}
echo $out;
