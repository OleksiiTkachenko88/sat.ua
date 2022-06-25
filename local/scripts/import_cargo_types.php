<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php"); 
require $_SERVER['DOCUMENT_ROOT'].'/local/php_interface/guzzle/vendor/autoload.php';

\Bitrix\Main\Loader::IncludeModule('iblock');

$GuzzleClient	= new \GuzzleHttp\Client();
$res			= $GuzzleClient->request('GET', 'https://api.sat.ua/v1.0/main/json/getCargoTypes');
$string			= $res->getBody()->getContents();
$string 		= substr($string, 1);

$cargoTypes	= json_decode($string);

if($cargoTypes->success == true){
    
    $arCargoTypes = array();

    $cargoTypesList	= (array)$cargoTypes->data;

    foreach($cargoTypesList as $cargoType){
    
        $arCargoTypes[$cargoType->type][] = (array)$cargoType;
    }

    AddCargoTypes(\Sat::getInstance()->IBLOCK[SITE_ID]["CARGO_TYPES"], $arCargoTypes);

}
function AddCargoTypes($iblockID, $arCargoTypes){
    
    $se = new CIBlockSection;
    
    foreach($arCargoTypes as $type=>$subType){
        
        $arTypeFields = Array(
            'ACTIVE'    => 'Y',
            'IBLOCK_ID' => $iblockID,
            'NAME'      => trim($type),
        );
        
        $typeList = CIBlockSection::GetList(Array('SORT'=>'ASC'), $arTypeFields, false);
        
        if($typeResult = $typeList->GetNext()){

            $res = $se->Update($typeResult['ID'], $arTypeFields);

            if(!$res){
                echo 'Ошибка обновления типа груза: '.$res->LAST_ERROR; 
                return false;
            }
            
            AddSubCargoTypes($iblockID, $typeResult['ID'], $subType);
            
        }else{
            
            $res = $se->Add($arTypeFields);
            
            if(!$res){
                echo 'Ошибка добавления типа груза: '.$res->LAST_ERROR; 
                return false;
            }
            AddSubCargoTypes($iblockID, $typeRes, $subType);
        }
    }
}
function AddSubCargoTypes($iblockID, $cargoTypeId, $subType){
    
    $el = new CIBlockElement;

    foreach($subType as $type){
        
        $arTypeFields = Array(
            'ACTIVE'            => 'Y',
            'IBLOCK_ID'         => $iblockID,
            'IBLOCK_SECTION_ID' => $cargoTypeId,
            'NAME'              => $type['description'],
            'PROPERTY_VALUES'   => array(
                'REF'               => $type['ref'],
                'LOWERLIMIT'        => $type['lowerLimit'],
                'UPPERLIMIT'        => $type['upperLimit'],
            )
        );
        
        $arSelect = Array("ID", "NAME");
    	
    	$res = CIBlockElement::GetList(Array(), $arTypeFields, false, Array("nTopCount" => 1), $arSelect);
    	
    	if($arFields = $res->GetNext()){

        	$res = $el->Update($arFields['ID'], $arTypeFields);
        	
        	if(!$res){
                echo 'Ошибка обновления подтипа груза: '.$res->LAST_ERROR; 
                return false;
            }

        }else{
            
            $res = $el->Add($arTypeFields);
            
            if(!$res){
                echo 'Ошибка добавления подтипа груза: '.$res->LAST_ERROR; 
                return false;
            }
        }
    }
}