<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

class SatSubscribe extends CBitrixComponent
{
    private $RUBRIC_ID;
    
    private $templatePage;

    public function executeComponent()
    {
		\Bitrix\Main\Loader::IncludeModule('iblock');

    	$this->RUBRIC_ID	= 1;
    	
    	if(SITE_ID == 'ua')
	    	$this->RUBRIC_ID	= 2;

		$this->templatePage	= '';
		
		$action	= '';
		if(isset($this->arParams['action']))
			$action	= $this->arParams['action'];
		if(isset($_REQUEST['action']))
			$action	= $_REQUEST['action'];
		
		switch($action)
		{
			default: 
				$this->arResult	= $this->ShowSubscribeForm();
			break;
		}
		
        $this->includeComponentTemplate($this->templatePage);

        return $this->arResult;
    }
    
    function ShowSubscribeForm()
    {
    	$arResult			= array();
    	$arResult['ERRORS']	= array();
    	
    	CModule::IncludeModule('subscribe');

		if(isset($_REQUEST['subscribe_on_news']))
		{
			if(isset($_REQUEST['email']) && !empty($_REQUEST['email']) && check_email($_REQUEST['email']))
				$arResult['FIELDS']['EMAIL']	= $_REQUEST['email'];
			else
				$arResult['ERRORS']['EMAIL']	= 'Укажите корректный E-mail';
				
			if(sizeof($arResult['ERRORS']) <= 0)
			{
				$arFields = Array(
			        //"USER_ID" => ($USER->IsAuthorized()? $USER->GetID():false),
			        "USER_ID" => false,
			        //"FORMAT" => ($FORMAT <> "html"? "text":"html"),
			        "FORMAT" => 'text',
			        "EMAIL" => $arResult['FIELDS']['EMAIL'],
			        "ACTIVE" => "Y",
			        "RUB_ID" => $this->RUBRIC_ID
			    );
			    $subscr = new CSubscription;
			
			    //can add without authorization
			    $ID = $subscr->Add($arFields);
			    if($ID > 0)
			    {
					//CSubscription::Authorize($ID);
					$arResult['SUCCESS'] = 'Вы успешно подписались';
		        }
			    else
			        $arResult['ERRORS']['ERROR_STRING']	= $subscr->LAST_ERROR;
			}	
			
		}

	    /*
$arFilter	= array('IBLOCK_ID' => $this->CITY_IBLOCK_ID, "ACTIVE" => "Y");
		$arSelect	= array('ID', 'IBLOCK_SECTION_ID', 'CODE', 'NAME', 'UF_CITY_PHONE', 'UF_CITY_EMAIL');
		$rsSections = CIBlockSection::GetList(array('left_margin' => 'asc'), $arFilter, false, $arSelect);
		while($arSection = $rsSections->Fetch())
		{
			$regions[$arSection['ID']] = $arSection;
			
			if(!intval($arSection['IBLOCK_SECTION_ID']))
				$countries[$arSection['ID']] = &$regions[$arSection['ID']];
			else
				$regions[$arSection['IBLOCK_SECTION_ID']]['CITIES'][] = &$regions[$arSection['ID']];
		}

		$arResult['COUNTRIES']	= $countries;
*/
		
		return $arResult;    
    }
}