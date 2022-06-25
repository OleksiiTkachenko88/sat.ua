<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Title");
?><p>С полученным после регистрации ключем API доступ будет возможен как в тестовом, так и в рабочем режиме. 
				В процессе разработки Вы можете использовать следующий URL-адрес API: <b>https://urm.sat.ua/study/hs/api/v1.0/</b></p>
<p>Для переключения на рабочий режим необходимо перенастроить в Вашем приложении обращение на URL: <b>https://urm.sat.ua/openws/hs/api/v1.0/</b></p><?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>