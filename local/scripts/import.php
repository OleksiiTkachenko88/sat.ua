<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php"); 

$string = '
{
"success": "true",
"data": [
{
"description": "Апостолово",
"address": "вул. Каманіна, 1В",
"phone": "0 800 30 99 09, (067) 217 07 31",
"ref": "59829fbb-9bca-11e4-8d33-0017a4770440",
"number": "067",
"cityRef": "c6f6e926-9313-11da-9860-00024407fbce",
"latitude": 47.6489,
"longitude": 33.6969,
"schedule": {
"monday": "09:00-18:00",
"tuesday": "09:00-18:00",
"wednesday": "09:00-18:00",
"thursday": "09:00-18:00",
"friday": "09:00-18:00",
"saturday": "09:00-14:00",
"sunday": "-"
}
}
]
}';

dump(json_decode($string));

