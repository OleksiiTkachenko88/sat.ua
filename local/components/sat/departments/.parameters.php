<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

use Bitrix\Main\Loader,
	Bitrix\Main\ModuleManager,
	Bitrix\Iblock;

global $USER_FIELD_MANAGER;

if (!Loader::includeModule('iblock'))
	return;

$catalogIncluded = Loader::includeModule('catalog');

$usePropertyFeatures = Iblock\Model\PropertyFeature::isEnabledFeatures();

$iblockExists = (!empty($arCurrentValues['IBLOCK_ID']) && (int)$arCurrentValues['IBLOCK_ID'] > 0);

$compatibleMode = !(isset($arCurrentValues['COMPATIBLE_MODE']) && $arCurrentValues['COMPATIBLE_MODE'] === 'N');

$arIBlockType = CIBlockParameters::GetIBlockTypes();

$arIBlock_LINK = array();
$iblockFilter = (
	!empty($arCurrentValues['IBLOCK_TYPE'])
	? array('TYPE' => $arCurrentValues['IBLOCK_TYPE'], 'ACTIVE' => 'Y')
	: array('ACTIVE' => 'Y')
);
$rsIblock = CIBlock::GetList(array('SORT' => 'ASC'), $iblockFilter);
while ($arr = $rsIblock->Fetch())
	$arIBlock_LINK[$arr['ID']] = '['.$arr['ID'].'] '.$arr['NAME'];
unset($iblockFilter);


$arComponentParameters = array(
	"GROUPS" => array(
		"SEO_LIST" => array(
			"NAME" => "Настройки SEO для списка",
			"SORT" => 600
		),
		"SEO_TOWN" => array(
			"NAME" => "Настройки SEO для города",
			"SORT" => 600
		),
		"SEO_MAP" => array(
			"NAME" => "Настройки SEO для карты",
			"SORT" => 600
		),
		"SEO_MAP_DETAIL" => array(
			"NAME" => "Настройки SEO для отделения на карте",
			"SORT" => 600
		),
	),
	"PARAMETERS" => array(
		"VARIABLE_ALIASES" => array(
		   "ELEMENT_ID" => array(
				"NAME" => "ID отделения",
			),
		   "SECTION_ID" => array(
				"NAME" => "ID города",
			),
		),
		"SEF_MODE" => Array(
		   "list" => array(
				"NAME" => "Список всех отделений",
				"DEFAULT" => "",
				"VARIABLES" => array(),
		   ),
		   "town" => array(
				"NAME" => "Список отделений города",
				"DEFAULT" => "#SECTION_CODE#/",
				"VARIABLES" => array(
					"SECTION_ID",
					"SECTION_CODE",
					"SECTION_CODE_PATH",
				),
		   ),
		   "map" => array(
				"NAME" => "Карта всех отделений",
				"DEFAULT" => "map/",
				"VARIABLES" => array(),
		   ),
		   "element" => array(
				"NAME" => "Отделение на карте",
				"DEFAULT" => "#SECTION_CODE#/#ELEMENT_CODE#/",
				"VARIABLES" => array(
					"ELEMENT_ID",
					"ELEMENT_CODE",
					"SECTION_ID",
					"SECTION_CODE",
					"SECTION_CODE_PATH",
				),
		   ),
		),
		"IBLOCK_TYPE" => array(
			"PARENT" => "BASE",
			"NAME" => "Тип инфоблока",
			"TYPE" => "LIST",
			"VALUES" => $arIBlockType,
			"REFRESH" => "Y",
		),
		"IBLOCK_ID" => array(
			"PARENT" => "BASE",
			"NAME" => "ID инфоблока",
			"TYPE" => "LIST",
			"VALUES" => $arIBlock_LINK,
			"REFRESH" => "Y",
		),
		"TEXT_IBLOCK_ID" => array(
			"PARENT" => "BASE",
			"NAME" => "ID инфоблока c SEO текстами",
			"TYPE" => "LIST",
			"VALUES" => $arIBlock_LINK,
			"REFRESH" => "Y",
		),
		"LIST_TITLE" => array(
			"PARENT" => "SEO_LIST",
			"NAME" => getMessage("LIST_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_LIST_TITLE" => array(
			"PARENT" => "SEO_LIST",
			"NAME" => getMessage("PAGE_LIST_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_LIST_DESC" => array(
			"PARENT" => "SEO_LIST",
			"NAME" => getMessage("PAGE_LIST_DESC"),
			"DEFAULT" => "",
		),
		"TOWN_TITLE" => array(
			"PARENT" => "SEO_TOWN",
			"NAME" => getMessage("TOWN_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_TOWN_TITLE" => array(
			"PARENT" => "SEO_TOWN",
			"NAME" => getMessage("PAGE_TOWN_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_TOWN_DESC" => array(
			"PARENT" => "SEO_TOWN",
			"NAME" => getMessage("PAGE_TOWN_DESC"),
			"DEFAULT" => "",
		),
		"MAP_TITLE" => array(
			"PARENT" => "SEO_MAP",
			"NAME" => getMessage("MAP_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_MAP_TITLE" => array(
			"PARENT" => "SEO_MAP",
			"NAME" => getMessage("PAGE_MAP_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_MAP_DESC" => array(
			"PARENT" => "SEO_MAP",
			"NAME" => getMessage("PAGE_MAP_DESC"),
			"DEFAULT" => "",
		),
		"ELEMENT_MAP_TITLE" => array(
			"PARENT" => "SEO_MAP_DETAIL",
			"NAME" => getMessage("ELEMENT_MAP_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_ELEMENT_MAP_TITLE" => array(
			"PARENT" => "SEO_MAP_DETAIL",
			"NAME" => getMessage("PAGE_ELEMENT_MAP_TITLE"),
			"DEFAULT" => "",
		),
		"PAGE_ELEMENT_MAP_DESC" => array(
			"PARENT" => "SEO_MAP_DETAIL",
			"NAME" => getMessage("PAGE_ELEMENT_MAP_DESC"),
			"DEFAULT" => "",
		),
		//"AJAX_MODE" => array(),
		"CACHE_TIME"  =>  Array("DEFAULT"=>36000000),
		"SET_TITLE" => array(),
	),
);


CIBlockParameters::Add404Settings($arComponentParameters, $arCurrentValues);
if($arCurrentValues["SEF_MODE"]=="Y")
{
	$arComponentParameters["PARAMETERS"]["VARIABLE_ALIASES"] = array();
	$arComponentParameters["PARAMETERS"]["VARIABLE_ALIASES"]["ELEMENT_ID"] = array(
		"NAME" => "ID отделения",
		"TEMPLATE" => "#ELEMENT_ID#",
	);
	$arComponentParameters["PARAMETERS"]["VARIABLE_ALIASES"]["ELEMENT_CODE"] = array(
		"NAME" => "Символьный код отделения",
		"TEMPLATE" => "#ELEMENT_CODE#",
	);
	$arComponentParameters["PARAMETERS"]["VARIABLE_ALIASES"]["SECTION_ID"] = array(
		"NAME" => "ID города",
		"TEMPLATE" => "#SECTION_ID#",
	);
	$arComponentParameters["PARAMETERS"]["VARIABLE_ALIASES"]["SECTION_CODE"] = array(
		"NAME" => "Символьный код города",
		"TEMPLATE" => "#SECTION_CODE#",
	);
	$arComponentParameters["PARAMETERS"]["VARIABLE_ALIASES"]["SECTION_CODE_PATH"] = array(
		"NAME" => "Путь из символьных кодов раздела",
		"TEMPLATE" => "#SECTION_CODE_PATH#",
	);

}
?>
