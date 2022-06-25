<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

use Bitrix\Main\Loader,
	Bitrix\Main\ModuleManager,
	Bitrix\Iblock;

global $USER_FIELD_MANAGER;

if (!Loader::includeModule('iblock'))
	return;
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
	"GROUPS" => array(),
	"PARAMETERS" => array(
		"IBLOCK_TYPE" => array(
			"PARENT" => "BASE",
			"NAME" => getMessage("IBLOCK_TYPE_D"),
			"TYPE" => "LIST",
			"VALUES" => $arIBlockType,
			"REFRESH" => "Y",
		),
		"IBLOCK_ID" => array(
			"PARENT" => "BASE",
			"NAME" => getMessage("IBLOCK_ID_D"),
			"TYPE" => "LIST",
			"VALUES" => $arIBlock_LINK,
			"REFRESH" => "Y",
		),
		"MAP_PAGE" => array(
			"PARENT" => "URL_TEMPLATES",
			"NAME" => getMessage("MAP_PAGE_D"),
			"TYPE" => "STRING",
			"DEFAULT" => "",
		),
		"ELEMENT_REF" => array(
			"PARENT" => "BASE",
			"NAME" => getMessage("ELEMENT_REF_D"),
			"TYPE" => "STRING",
			"DEFAULT" => "",
		),
		"ELEMENT_NUMBER" => array(
			"PARENT" => "BASE",
			"NAME" => getMessage("ELEMENT_NUMBER_D"),
			"TYPE" => "STRING",
			"DEFAULT" => "",
		),
		"MAP_ID" => array(
			"PARENT" => "BASE",
			"NAME" => getMessage("MAP_ID_D"),
			"TYPE" => "STRING",
			"DEFAULT" => "map",
		),
	),
);
?>