<?php
$out = 'ok';
$arr = array();
$url = '';
$api_host_2 = 'http://urm.sat.ua/openws/hs/api/v1.0/';
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
//изменили на апи с кешированием
if ($action != '') {
    switch($action) {
        case 'getRsp':
            if ($term && !empty($term)) {
                $url = "{$apiHost}/getRsp?" . http_build_query(array("searchString" => $term, "language" => $lang));
                $tmp = file_get_contents($url);
                if ($tmp) {
                    $tmp = remove_utf8_bom($tmp);
                    $tmp2 = json_decode($tmp, TRUE);
                    if ($tmp2['success']) {
                        foreach ($tmp2['data'] as $k => $v) {
                            $arr[] = array("label" => $v['description'], "value" => $v['description'], "id" => $v['ref']);
                        }
                    }
                }
            }
            $out = json_encode($arr);
            break;
        case 'getTown':
            if ($term && !empty($term)) {

						$url = "{$apiHost}getTowns?" . http_build_query(["searchString" => $term, "language" => $lang]);
							$tmp = file_get_contents($url);
							if($tmp) {
								$tmp = remove_utf8_bom($tmp);
								$tmp2 = json_decode($tmp, TRUE);
								foreach ($tmp2['data'] as $k => $v) {
									$rspList = isset($v['rspList']) && is_array($v['rspList']) ? json_encode($v['rspList']) : '';
									$arr[] = array("label" => $v['description'] . ' - ' . $v['district'] . ' - ' . $v['region'], "value" => $v['description'] . ' - ' . $v['district'] . ' - ' . $v['region'], "id" => $v['ref'], "value_short" => $v['description'], "rspRef" => $v['rspRef'], 'rspList' => $rspList);
									//								}
									//							}
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
                //echo $tmp . '<br>';
                $tmp = remove_utf8_bom($tmp);
                $tmp = json_decode($tmp, TRUE);
                //echo '<pre style="display:none;">'; print_r( $tmp ); echo '</pre>';
                $group = '';
                $out = '';

				function cmp($a, $b)
				{
                     return strcmp($a["serviceGroup"], $b["serviceGroup"]);
                }

                if( $tmp['data'] ){
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

                //die();
            break;
		case 'getSenderServices':
            $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "{$apiHost}getAdditionalServices?language={$lang}");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $tmp = curl_exec($ch);
                //echo $tmp . '<br>';
                $tmp = remove_utf8_bom($tmp);
                $tmp = json_decode($tmp, TRUE);
                //echo '<pre style="display:none;">'; print_r( $tmp ); echo '</pre>';
                $group = '';
                $out = '';

				function cmp($a, $b)
				{
					return strcmp($a["serviceGroup"], $b["serviceGroup"]);
				}

				function filter_by_value ($array, $index, $value, $index2, $value2){
						if(is_array($array) && count($array)>0)
						{
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

                //die();
            break;
		case 'getDeliveryServices':
            $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "{$apiHost}getAdditionalServices?language={$lang}");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $tmp = curl_exec($ch);
                //echo $tmp . '<br>';
                $tmp = remove_utf8_bom($tmp);
                $tmp = json_decode($tmp, TRUE);
                //echo '<pre style="display:none;">'; print_r( $tmp ); echo '</pre>';
                $group = '';
                $out = '';

				function cmp($a, $b)
				{
					return strcmp($a["serviceGroup"], $b["serviceGroup"]);
				}

				function filter_by_value ($array, $index, $value, $index2, $value2){
						if(is_array($array) && count($array)>0)
						{
							foreach(array_keys($array) as $key){
								$temp[$key] = $array[$key][$index];
								$temp2[$key] = $array[$key][$index2];
								if (($temp[$key] == $value)&&($temp2[$key] == $value2)){
									$newarray[$key] = $array[$key];
								}
							}
						  }
					  return $newarray;
					}

                if( $tmp['data'] ){
					usort($tmp['data'], "cmp");
					$tmp['data'] = filter_by_value($tmp['data'], 'recipient', '1', 'sender', '0');

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

                //die();
            break;
        case 'getTypes':
            // $textcyr="Тест на кирилице";
            // $cyr  = array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у',
            // 'ф','х','ц','ч','ш','щ','ъ', 'ы','ь', 'э', 'ю','я',
            // 'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У',
            // 'Ф','Х','Ц','Ч','Ш','Щ','Ъ', 'Ы','Ь', 'Э', 'Ю','Я', ' ' );
            // $lat = array( 'a','b','v','g','d','e','e','zh','z','i','y','k','l','m','n','o','p','r','s','t','u',
            // 'f' ,'h' ,'ts' ,'ch','sh' ,'sht' ,'i', 'y', 'y', 'e' ,'yu' ,'ya','A','B','V','G','D','E','E','Zh',
            // 'Z','I','Y','K','L','M','N','O','P','R','S','T','U',
            // 'F' ,'H' ,'Ts' ,'Ch','Sh' ,'Sht' ,'I' ,'Y' ,'Y', 'E', 'Yu' ,'Ya', '_' );

            // $textcyr = str_replace($cyr, $lat, $textcyr);
            //$trstr = iconv(mb_detect_encoding($service['type']), "ISO-8859-1//TRANSLIT", $service['type'])
            // echo $textcyr;
            $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $api_host . "main/json/getCargoTypes?language=".$lang );
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $tmp = curl_exec($ch);
                //echo $tmp . '<br>';
                $tmp = remove_utf8_bom($tmp);
                $tmp = json_decode($tmp, TRUE);
				//echo '<pre style="display:none;">'; print_r( $tmp ); echo '</pre>';
                $group = $out = $ptype = '';
                $i = 0;
                if( $tmp['data'] ){
                    foreach ($tmp['data'] as $key => $service) {
                        //str_replace($cyr, $lat, $service['type'])
                        if( $group != $service['type'] ){
                            $group = $service['type'];
                            $i++;
                        }
                        $type[ 'type_'.($i) ][] = array(
                            'ref'=>$service['ref'],
                            'type' => $service['type'],
							'lowerLimit' => $service['lowerLimit'],
							'upperLimit' => $service['upperLimit'],
                            'description'=> $service['description']
                            );

                    }
					//print_r($type);
                    foreach ($type as $key => $sub) {
                        // echo $key;
                        // print_r($sub);
                        foreach ($sub as $k => $v) {
                            if($k==0){
                                $ptype .= '<option data-type="'.$key.'" data-ref="'.$v['ref'].'" >'.$v['type'].'</option>';
                            }
                            $min = ( !empty($v['lowerLimit']) ) ? $v['lowerLimit'] : 0;
                            $max = ( !empty($v['upperLimit']) ) ? $v['upperLimit'] : 0;
                            $subtype .= '<option class="hidden-fields '.$key.'" hidden-fields data-ref="'.$v['ref'].'" data-min="'.$min.'" data-max="'.$max.'">'.$v['description'].'</option>';
                        }
                    }
                }

                $json = array( 'type' => $ptype, 'subtype'=> $subtype );

                //echo '<pre style="display:none;">'; print_r( $type ); echo '</pre>';
                die(json_encode($json));
            break;
        case 'simple_calc':
            $townSender = isset($_GET['simple_calc_from_ref']) && !empty($_GET['simple_calc_from_ref']) ? trim(strip_tags($_GET['simple_calc_from_ref'])) : '';
            $townRecipient = isset($_GET['simple_calc_to_ref']) && !empty($_GET['simple_calc_to_ref']) ? trim(strip_tags($_GET['simple_calc_to_ref'])) : '';
            $weight = isset($_GET['simple_calc_weight']) && !empty($_GET['simple_calc_weight']) ? trim(strip_tags($_GET['simple_calc_weight'])) : '';
            $weight = str_replace(array(' ', ','), array('', '.'), $weight);
            if ($townSender != '' && $townRecipient != '' && $weight != '') {
				$params = array("townSender" => $townSender, "townRecipient" => $townRecipient, "weight" => $weight, "cargoType" => "Стандарт");
				$body = json_encode($params);
				//echo $body;
				//$body = '{"townSender":"8d7f5ea4-9436-11dd-98c6-001cc0108cd1","townRecipient":"089bfe07-9326-11da-9860-00024407fbce","weight":"5","cargoType": "Стандарт"}';
				$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $api_host . "calc/json/");
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_POST, true);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
				curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
				$tmp = curl_exec($ch);
				//echo $tmp . '<br>';
				$tmp = remove_utf8_bom($tmp);
				$tmp2 = json_decode($tmp, TRUE);
				//print_r($tmp2);
				if ($tmp2['success']) {
					$out = 'ok|' . $tmp2['data']['0']['cost'];
				} else {
					$out = 'error|';
				}
            }


            break;
        case 'global_calc':
            // print_r($_GET);
            unset($_GET['action']);
				p($body);
                $body = json_encode($_GET);
                //echo $body;
                //$body = '{"townSender":"8d7f5ea4-9436-11dd-98c6-001cc0108cd1","townRecipient":"089bfe07-9326-11da-9860-00024407fbce","weight":"5","cargoType": "Стандарт"}';
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $api_host . "calc/json/");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
                $json = curl_exec($ch);
                //echo $tmp . '<br>';
                $json = remove_utf8_bom($json);
                // $json = json_decode($tmp, TRUE);
                // print_r($json);
                // return $json;
                $out = $json;
                // die();
            // }
            break;
        case 'delivery_tracking':
            unset($_GET['action']);
				//print_r($_GET);
          		$ch = curl_init();
				curl_setopt($ch, CURLOPT_URL, $api_host . "tracking/json?language=".$lang."&apiKey=" .$apiKey."&number=".$_GET['number']);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, false);
                curl_setopt($ch, CURLOPT_HTTPGET, true);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
                $json = curl_exec($ch);
                //echo $tmp . '<br>';
                $json = remove_utf8_bom($json);
                $out = $json;
                //echo '<pre style="display:none;">'; print_r( $tmp ); echo '</pre>';

                // die();
            // }
            break;
        case 'getDeliveryTown':
            unset($_GET['action']);
          		$ch = curl_init();
				        curl_setopt($ch, CURLOPT_URL, "{$apiHost}getTowns?ref={$_GET['toCityRef']}");
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
                curl_setopt($ch, CURLOPT_URL, $api_host . "documents/order/delivery/json/save");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
                $json = curl_exec($ch);
                //echo $tmp . '<br>';
                $json = remove_utf8_bom($json);
                // $json = json_decode($tmp, TRUE);
                // print_r($json);
                // return $json;
                $out = $json;
                // die();
            // }
            break;

        case 'departure_send':
            unset($_GET['action']);
                $body = json_encode($_GET);
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $api_host . "documents/order/departure/json/save");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
                $json = curl_exec($ch);
                //echo $tmp . '<br>';
                $json = remove_utf8_bom($json);
                // $json = json_decode($tmp, TRUE);
                // print_r($json);
                // return $json;
                $out = $json;
                // die();
            // }
            break;
        case 'declaration':
            // print_r($_GET);
            unset($_GET['action']);
                $body = json_encode($_GET);
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $api_host . "documents/nng/json/save");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POST, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
                $tmp = curl_exec($ch);
                //echo $tmp . '<br>';
                $tmp = remove_utf8_bom($tmp);
                $tmp2 = json_decode($tmp, TRUE);
                print_r($tmp2);
                if ($tmp2['success']) {
                    $out = 'ok|' . $tmp2['data']['0']['cost'];
                } else {
                    $out = 'error|';
                }
            // }
            break;
		case 'simple_track':
            $number = isset($_GET['simple_track_number']) && !empty($_GET['simple_track_number']) ? trim(strip_tags($_GET['simple_track_number'])) : '';
			$lang = isset($_GET['lang']) && !empty($_GET['lang']) ? trim(strip_tags($_GET['lang'])) : 'uk';
            if ($number != '') {
				$url = $api_host . "tracking/json/?" . http_build_query(array("number" => $number, 'language' => $lang));
                $tmp = file_get_contents($url);
				$tmp = remove_utf8_bom($tmp);
				$tmp2 = json_decode($tmp, TRUE);
				//$out = $tmp;
				if ($tmp2['success'] && $tmp2['success'] != 'false') {
					$out = '';
					$end = count($tmp2['data'][0]['states']) - 1;
					$state = $tmp2['data'][0]['states'][$end];
					//foreach ($tmp2['data'][0]['states'] as $state) {
					//Grebeniuk 17.07.2017
							//17.07.2017 Grebeniuk
							$out .= "<div class='results'><div class='result-item from-to'>
							<div><span>" . $state['rsp'] . "</span></div>
										</div>
									<div class='result-item border-result'>
											<div>" . $state['status'] . " (" . $state['date'] . ")</div>
										</div></div>";
						//}
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
			$url = $api_host . "main/json/getDeliveryTerms?" . http_build_query(array("rspSender" => $rspSender, "rspRecipient" => $rspRecipient, "date" => $date));
            $tmp = file_get_contents($url);
			$tmp = remove_utf8_bom($tmp);
			$out = $tmp;
        default:
            break;
    }
}
echo $out;
