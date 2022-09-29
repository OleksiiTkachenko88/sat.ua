<?
// подгружаем все модуль и все его классы
\Bitrix\Main\Loader::includeModule('dev2fun.opengraph');
\Dev2fun\Module\OpenGraph::Show($arResult['ID'],'element');
// где arResult['ID'] - идентификатор элемента
// где element - тип, т.к. мы выводим для элемента, поэтому element

