<?
$out = 'ok';
$arr = array();
$url = '';

//$api_host_2 = 'http://urm.sat.ua/openws/hs/api/v1.0/'; //Прод

//$apiHostV2 = 'https://api.sat.ua/openws/hs/api/v2.0/'; //Прод11

//$api_host = 'http://urm.sat.ua/api_proxy/api/proxy/'; //Прода

$apiHost = 'https://catalog.sat.ua/';

$api_host = 'https://xyz.sat.ua/postavka/hs/api/v1.0/';
$api_host_2 = 'https://xyz.sat.ua/postavka/hs/api/v1.0/';

$apiHostV2 = 'https://xyz.sat.ua/postavka/hs/api/v2.0/';

$apiKey = '8c236ec1-6e15-424b-8daf-33913831';
//$apiKeyV2 = '8a8573f5-0161-4fc6-b204-2aea61e85cae'; //Прод
$apiKeyV2 = '13ccf48f-ebd4-420a-b16e-b3c172ef5c7c';
//$accountref = 'c77dc471-027a-11ed-9425-00505601031c'; //Прод Сдел чтоб контакты добавлялись в определеннный БА
$accountref = '3912825f-460c-11ec-a6da-005056b14548';

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
      'ru' => "Общим весом и общим объемом всего груза;Габариты ДШВ указываются по размерам самого места."
    ]
  ],
  'ПаллетаЕвро' => [
    'title' => [
      'uk' => "Розрахунок вартості за тарифом  &#34;Палети&#34; здійснюється відповідно до підтипу палети та максимальної висоти однієї з палет. Різні підтипи палет та вагові діапазони необхідно розраховувати окремо. Ознайомитись із ваговими діапазонами тарифу можна за посиланням",
      'ru' => "Розрахунок вартості за тарифом  &#34;Палети&#34; здійснюється відповідно до підтипу палети та максимальної висоти однієї з палет. Різні підтипи палет та вагові діапазони необхідно розраховувати окремо. Ознайомитись із ваговими діапазонами тарифу можна за посиланням"
    ],
    'options' => [
      'uk' => "",
      'ru' => ""
    ]
  ],
  'Полупалета' => [
    'title' => [
      'uk' => "!!!Розрахунок вартості за тарифом &#34;Палети&#34; здійснюється відповідно до типу палети та максимальної висоти однієї з палет. Різні типи палет необхідно розрахувати окремо.",
      'ru' => "!!!!Расчет стоимости по тарифу &#34;Паллеты&#34; осуществляется в соответствии с типом паллеты и максимальной высоты одной из паллет. Различные типы паллет необходимо рассчитать отдельно."
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

		case 'getAddress':
			{
				$out = '';	
				$arr = array();	
				$url = "https://lc.sat.ua/lc/hs/geoapi/sat/autocomplete?" . http_build_query(["input" => $term, "place" => "{$_GET['place']}"]);
				$tmp = file_get_contents($url);
				if($tmp) {
					$tmp = remove_utf8_bom($tmp);
					$tmp2 = json_decode($tmp, TRUE);
					foreach ($tmp2 as $k => $v) {						
						$arr[] = [
							"label"       => $v['Представление'],
							"value"       => $v['Представление'],
							"value_short" => $v['Представление'],
            ];
					}
				}
			}
			$out = json_encode($arr);
		break;
			
		case 'getPerson':
			{
			   $url = "{$apiHostV2}catalogs/Counterparty/json/getbyphoneofindividual?searchstring={$term}&app=website&phoneNumber={$_GET['phone']}";
			   $tmp = file_get_contents($url);
			   $arr = array();	
			   if($tmp) {
				   $tmp = remove_utf8_bom($tmp);
				   $tmp2 = json_decode($tmp, TRUE);				   						
					$arr[] = [
		  "label"       => $tmp2['data']['description'],
		  "value"       => $tmp2['data']['description'],
		  "ref"         => $tmp2['data']['ref'],
		];
				
				  
			   }
		   }
		   $out = json_encode($arr);
	    break;

		case 'getCompany':
			 {
				$url = "{$apiHostV2}catalogs/getlistgogp/json?limit=10&offset=0&searchstring={$term}&app=cabinet&apikey={$apiKeyV2}&accountref={$accountref}";
				$tmp = file_get_contents($url);
				if($tmp) {
					$tmp = remove_utf8_bom($tmp);
					$tmp2 = json_decode($tmp, TRUE);
					foreach ($tmp2['data'] as $k => $v) {						
						$arr[] = [
              "label"       => $v['description'],
              "value"       => $v['description'],
              "value_short" => $v['description'],
			  "ref"         => $v['ref'],
			  "counterpartyType"         => $v['counterpartyType'],
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
			//Для отправки писем из чат бота
		case 'getEmailFromBot':
			// несколько получателей
			$to = 'a0672188171@gmail.com, om.tkachenko@sat.ua'; // обратите внимание на запятую

			// тема письма
			$subject = 'тема письма';

			// текст письма
			$message = '
			<html>
			<head>
			<title>Birthday Reminders for August</title>
			</head>
			<body>
			<p>Here are the birthdays upcoming in August!</p>
			<table>
				<tr>
				<th>Person</th><th>Day</th><th>Month</th><th>Year</th>
				</tr>
				<tr>
				<td>Johny</td><td>10th</td><td>August</td><td>1970</td>
				</tr>
				<tr>
				<td>Sally</td><td>17th</td><td>August</td><td>1973</td>
				</tr>
			</table>
			</body>
			</html>
			';

			// Для отправки HTML-письма должен быть установлен заголовок Content-type
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

			// Дополнительные заголовки
			$headers[] = 'To: Mary <mary@example.com>, Kelly <kelly@example.com>';
			$headers[] = 'From: Birthday Reminder <no_reply_C>';

			// Отправляем
			mail($to, $subject, $message, implode("\r\n", $headers));
			$out = 'Email Send!';
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
						'ref'         =>$service['ref'],
						'type'        => $service['type'],
						'lowerLimit'  => $service['lowerLimit'],
						'upperLimit'  => $service['upperLimit'],
						'description' => $service['description'],
						'length'      => $service['length'],
						'width'       => $service['width'],
						'maxHeight'      => $service['maxHeight']
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
                        $maxHeight = ( !empty($v['maxHeight']) ) ? $v['maxHeight'] : 0;
						$subtype .= "
              <option
                class=\"hidden-fields {$key}\"
                hidden-fields
                data-ref=\"{$v['ref']}\"
                data-min=\"{$min}\"
                data-max=\"{$max}\"
                data-length=\"{$length}\"
                data-width=\"{$width}\"
                data-max-height=\"{$maxHeight}\"
              >{$v['description']}</option>";
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
			curl_setopt($ch, CURLOPT_URL, $apiHostV2 . "calc/json/?language=".$lang);
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
		case 'departure_send': //Переделал на АПИ 2.0
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiHostV2 . "documents/order/departure/json/save?app=website&language=uk&apiKey=".$apiKeyV2);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'create_GOGP_FIZ': //на АПИ 2.0 для физика ГОГП
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiHostV2 . "catalogs/savegogp/json?app=cabinet&apiKey={$apiKeyV2}&accountref={$accountref}");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'promocode_check': //Сорри бонус проверка
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiHostV2 . "documents/promocode/json/checknng?app=website&language=uk&apiKey=".$apiKey);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
			curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
			$json = curl_exec($ch);
			$json = remove_utf8_bom($json);
			$out = $json;
		break;
		case 'promocode_save': //Сорри бонус приминение
			unset($_GET['action']);
			$body = json_encode($_GET);
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $apiHostV2 . "documents/promocode/json/save?app=website&language=uk&apiKey=".$apiKey);
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
