<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");
require $_SERVER['DOCUMENT_ROOT'].'/local/php_interface/guzzle/vendor/autoload.php';

use Bitrix\Main\Diag\Debug;

\Bitrix\Main\Loader::IncludeModule('iblock');

global $GuzzleClient;


$GuzzleClient	= new \GuzzleHttp\Client();
$resDepartament	= $GuzzleClient->request('GET', 'https://catalog.sat.ua/etRsp', ['language' => 'ru']);
$stringDep		= $resDepartament->getBody()->getContents();
$stringDep 		= substr($stringDep, 1);

$depertments	= json_decode($stringDep);
//dump($depertments);
//echo 'Last error: '.json_last_error_msg();
//exit();
Debug::startTimeLabel("AddCities");
if($depertments->success == true)
{

    $links = array();

	$department_list	= (array)$depertments->data;

	foreach($department_list as $department)
	{
		$department = (array)$department;



        $urls[] = "https://catalog.sat.ua/getTowns?rsp=".$department["ref"];

        if($i++ > 1)
            break;

	}
}
dump($urls, false);
exit();



use GuzzleHttp\Pool;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

$client = new Client();

$requests = function ($urls) {
    //$uri = 'https://api.sat.ua/v1.0/main/json/';
    //for ($i = 0; $i < $total; $i++)
    foreach($urls as $url)
    {
        yield new Request('GET', $url);
    }
};

$pool = new Pool($client, $requests($urls), [
    'concurrency' => 5,
    'fulfilled' => function ($response, $index) {
        echo 'dddddddddddd';
        $contents   = $response->getBody()->getContents();
        //dump($contents, false);
        // this is delivered each successful response
    },
    'rejected' => function ($reason, $index) {
        echo '22222222222';
        // this is delivered each failed request
    },
]);

// Initiate the transfers and create a promise
$promise = $pool->promise();

// Force the pool of requests to complete.
$promise->wait();





Debug::endTimeLabel("AddCities");
dump(Debug::getTimeLabels()['AddCities']['time'], false);
dump(Debug::getTimeLabels(), false);

function AddCities($department)
{
    echo '!!!!!!!!!!!!!!!!!!!!!!!!!';
//dump($department);
    Debug::startTimeLabel("AddCities".$department['ref']);
    $GuzzleClient	= new \GuzzleHttp\Client();

    $request = new \GuzzleHttp\Psr7\Request('GET', 'https://catalog.sat.ua/getTowns?rsp='.$department["ref"]);
    $promise = $GuzzleClient->sendAsync($request)->then(function ($response) {

        echo 'I completed! ';

        $contents   = $response->getBody()->getContents();
        $contents   = substr($contents, 1);

        $data       = json_decode($contents);
//        dump($data->data[0], false);
        dump("AddCities".$data->data[0]->rspRef, false);
        Debug::endTimeLabel("AddCities".$data->data[0]->rspRef);
        //dump($data, false);
    });
    //$promise->wait();










}
die();
function AddDepartment($iblockID, $department)
{
	$el = new CIBlockElement;

	$arAddFields = Array(
		"IBLOCK_ID"      		=> $iblockID,
		"NAME"          		=> $department['description']
	);

	$proprtiesAdd	= array(
		'ADDRESS' 	=> $department['address'],
		'PHONE' 	=> $department['phone'],
		'REF' 		=> $department['ref'],
		'NUMBER' 	=> $department['number'],
		'CITYREF' 	=> $department['cityRef'],
		'LATITUDE' 	=> $department['latitude'],
		'LONGITUDE' => $department['longitude']
	);

	$arAddFields['PROPERTY_VALUES']	= $proprtiesAdd;

	dump($arAddFields);

	$el = new CIBlockElement;

	$arSelect 	= Array("ID", "NAME");
	$arFilter 	= Array("IBLOCK_ID" => $iblockID, "PROPERTY_REF" => $department['ref']);
	$res 		= CIBlockElement::GetList(Array(), $arFilter, false, Array("nTopCount" => 1), $arSelect);
	if($arFields = $res->GetNext())
	{
		if($new_id = $el->Update($arFields['ID'], $arAddFields))
		{
			return $new_id;
		}
		else
			return 0;
	}
	else
	{
		if($new_id = $el->Add($arAddFields))
		{
			return $new_id;
		}
		else
			return 0;
	}

    return 0;
}
