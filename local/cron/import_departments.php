<?
// Константы
/////////////////////////////////////////////////////////////////////////////////////
define("NOT_CHECK_PERMISSIONS", true);
define("NO_KEEP_STATISTIC", true);

define("KEY_API_KEY", "apiKey");
define("API_KEY", "8c236ec1-6e15-424b-8daf-33913831");

define("KEY_LANG", "language");
define("LANG_RU", "ru");
define("LANG_UK", "uk");

define("API_MAIN_URL", "https://catalog.sat.ua/");
define("GET_TOWNS_METHOD", "getTowns");
define("GET_RSP_METHOD", "getRsp");

define("KEY_CONTAINS_RSP", "containsRsp");
define("CONTAINS_RSP", "true");

define("D_IBLOCK_ID", 33);

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function translit($value, $lang = 'rus') {
  $converter = [
    'а' => 'a',
    'б' => 'b',
    'в' => 'v',
    'г' => 'g',
    'д' => 'd',
    'е' => 'e',
    'ё' => 'e',
    'ж' => 'zh',
    'з' => 'z',
    'и' => 'i',
    'й' => 'y',
    'к' => 'k',
    'л' => 'l',
    'м' => 'm',
    'н' => 'n',
    'о' => 'o',
    'п' => 'p',
    'р' => 'r',
    'с' => 's',
    'т' => 't',
    'у' => 'u',
    'ф' => 'f',
    'х' => 'h',
    'ц' => 'ts',
    'ч' => 'ch',
    'ш' => 'sh',
    'щ' => 'shch',
    'ь' => '',
    'ы' => 'y',
    'ъ' => '',
    'э' => 'e',
    'ю' => 'yu',
    'я' => 'ya',
  ];

  $ukr = [
    'г' => 'h',
    'ґ' => 'g',
    'є' => 'ie',
    'и' => 'y',
    'і' => 'i',
    'ї' => 'i',
    'х' => 'kh'
  ];

  if ($lang == 'ukr') $converter = array_merge($converter, $ukr);

  $value = mb_strtolower($value);
  $value = str_replace('ый', 'iy', $value);
  $value = strtr($value, $converter);
  $value = preg_replace('/-+/', '-', $value);
  $value = preg_replace('/[^A-Za-z0-9-]+/', ' ', $value);
  $value = str_replace(' ', '_', trim($value));
  return $value;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
// Чтобы не приходилось на разных хост-площадках прописывать руками $_SERVER["DOCUMENT_ROOT"]
// расчитываем пути к корню сайта. Логика скрипта считает, что скрипт выполняется в каталоге 1-го уровня
/////////////////////////////////////////////////////////////////////////////////////////////////////
$need_auth = false;

$fInfo = pathinfo(__FILE__);

if (!$_SERVER['DOCUMENT_ROOT']) {
  $ar_parts_path = explode('/', $fInfo["dirname"]);
  $path_root = "";
  for ($i = 1; $i < count($ar_parts_path) - 2; $i++) $path_root .= "/".$ar_parts_path[$i];
  $_SERVER["DOCUMENT_ROOT"] = $path_root;
} else {
  $need_auth = true;
}

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Константы файлов логов
/////////////////////////////////////////////////////////////////////////////////////////////////////
define("LOG_FILENAME_SHORT", "{$fInfo['filename']}_" . date('Y-m-d') . '.txt');
define("LOG_FILENAME", "{$fInfo['dirname']}/log/" . LOG_FILENAME_SHORT);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Уровни сообщений логов
//[i] - информация
//[e] - ошибка
//[d] - опасность
//[s] - скрипт отработал успешно
//[u] - скрипт не отработал
/////////////////////////////////////////////////////////////////////////////////////////////////////

global $USER;

// если скрипт запущен через веб-интерфейс проверяем относится ли пользователь к группе администраторов
if (($need_auth) && (!$USER->IsAdmin())) {
  AddMessage2Log("[d] Скрипт запущен неизвестным источником");
  die("Недостаточно прав для выполнения скрипта");
}

// авторизуемся под учётной записью с правами администратора, которую используют задачи cron
$USER->Authorize(1);
if (!CModule::IncludeModule("iblock")) {
  AddMessage2Log("[e] Не могу инициализировать инфоблок iblock");
  die();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////   РАБОТА С ГОРОДАМИ И ОБЛАСТЯМИ КОМПАНИИ, КОМПАНИИ   ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

function getTowns($lang) {
  $params = array(
    'apiKey'   => API_KEY,
    'language' => $lang,
    'limit'    => 100000
  );

  $result = [];
  $url = API_MAIN_URL . 'getTowns?' . http_build_query($params);
  $tmp = file_get_contents($url);
  $tmp = json_decode($tmp,TRUE);
  if(json_last_error() === JSON_ERROR_NONE){
    if($tmp['success']) {

      foreach($tmp['data'] as $value) {
        $result[$value['ref']] = [
          'name'   => $value['description'],
          'region' => $value['region']
        ];
      }

      return $result;
    } else {
      AddMessage2Log("[e] Ошибка при запросе к {$url}\n [u] Скрипт завершил работу");
      die();
    }
  } else {
    AddMessage2Log("[e] Не смог получить корректный результат при запросе к {$url}\n [u] Скрипт завершил свою работу.");
    die();
  }
}

function getRsp($lang) {
  $params = array(
    'apiKey'   => API_KEY,
    'language' => $lang
  );

  $result = [];
  $url = API_MAIN_URL . 'getRsp?' . http_build_query($params);
  $tmp = file_get_contents($url);
  $tmp = json_decode($tmp,TRUE);
  if(json_last_error() === JSON_ERROR_NONE){
    if($tmp['success']) {

      foreach($tmp['data'] as $value) {
        $result[$value['ref']] = [
          'ref'       => $value['ref'],
          'cityRef'   => $value['cityRef'],
          'name'      => $value['description'],
          'address'   => $value['address'],
          'latitude'  => $value['latitude'],
          'longitude' => $value['longitude'],
          'email'     => $value['email'],
          'phone'     => $value['phone'],
          'number'    => $value['number'],
          'schedule'  => $value['schedule']
        ];
      }

      return $result;
    } else {
      AddMessage2Log("[e] Ошибка при запросе к {$url}\n [u] Скрипт завершил работу");
      die();
    }
  } else {
    AddMessage2Log("[e] Не смог получить корректный результат при запросе к {$url}\n [u] Скрипт завершил свою работу.");
    die();
  }
}

// Видаляєм дані з бази по  областях, містах
$dbList = CIBlockSection::GetList([], ['IBLOCK_ID' => D_IBLOCK_ID], true, ['ID']);
while ($result = $dbList->GetNext()) CIBlockSection::Delete($result['ID']);

// Видаляєм дані з бази по відділеннях
$dbList = CIBlockElement::GetList([], ['IBLOCK_ID' => D_IBLOCK_ID], ['ID']);
while ($result = $dbList->GetNext()) CIBlockElement::Delete($result['ID']);

$townsRu = getTowns('ru');
$townsUk = getTowns('uk');

$rspListRu = getRsp('ru');
$rspListUk = getRsp('uk');

// file_put_contents('./local/cron/__LOG__.json', json_encode($townsRu));

$regionsInserting = [];
$townsInserting = [];

foreach ($rspListRu as $ref=>$rspRu) {
  $townRef = $rspRu['cityRef'];
  $townId = $townsInserting[$townRef];
  if (!$townId) {
    $townRu = $townsRu[$townRef];

    if (!$townRu) {
      echo "[e] Ошибка добавления отделения: Нет города {$townRef} для отделения {$rspRu['name']}\n";
      AddMessage2Log("[e] Ошибка добавления отделения: Нет города {$townRef} для отделения {$rspRu['name']}");
      continue;
    }


    $townUk = $townsUk[$townRef];
    $regionRu = $townRu['region'];
    $regionId = $regionsInserting[$regionRu];
    if (!$regionId) {
      $arFields = [
        'CREATED_BY'         => $USER->GetID(),
        'IBLOCK_ID'          => D_IBLOCK_ID,
        'NAME'               => $regionRu,
        'UF_REGION_NAME_RU'  => $regionRu,
        'UF_REGION_NAME_UK'  => $townUk['region'],
        'UF_REGION_NAME_ALL' => "{$regionRu} --- {$townUk['region']}",
        'CODE'               => translit($regionRu)
      ];

      $bs = new CIBlockSection;
      $regionId = $bs->Add($arFields);
      if ($regionId) {
        $regionsInserting[$regionRu] = $regionId;
        echo "[i] Добавлено область: {$regionRu} -> {$regionId}\n";
      } else {
        echo "[e] Ошибка добавления области: {$regionRu} -> {$bs->LAST_ERROR}\n";
        AddMessage2Log("[e] Ошибка добавления области: {$regionRu} -> {$bs->LAST_ERROR}");
        continue;
      }
    }

    $arFields = [
      'CREATED_BY'         => $USER->GetID(),
      'IBLOCK_ID'          => D_IBLOCK_ID,
      'IBLOCK_SECTION_ID'  => $regionId,
      'NAME'               => $townRu['name'],
      'UF_REGION_NAME_RU'  => $townRu['name'],
      'UF_REGION_NAME_UK'  => $townUk['name'],
      'UF_REGION_NAME_ALL' => "{$townRu['name']} --- {$townUk['name']}",
      'UF_CITY_REF'        => $townRef,
      'CODE'               => translit($townRu['name'] . ' ' . $regionRu)
    ];

    $bs = new CIBlockSection;
    $townId = $bs->Add($arFields);
    if ($townId) {
      $townsInserting[$townRef] = $townId;
      echo "[i] Добавлено город: {$arFields['NAME']} -> {$arFields['CODE']} -> {$townId}\n";
    } else {
      echo "[e] Ошибка добавления города: {$arFields['NAME']} -> {$arFields['CODE']} -> {$bs->LAST_ERROR}\n";
      AddMessage2Log("[e] Ошибка добавления города: {$arFields['NAME']} -> {$arFields['CODE']} -> {$bs->LAST_ERROR}");
      continue;
    }
  }

  $rspUk = $rspListUk[$ref];

  $arFields = [
    'CREATED_BY'        => $USER->GetID(),
    'IBLOCK_ID'         => D_IBLOCK_ID,
    'IBLOCK_SECTION_ID' => $townId,
    'ACTIVE'            => 'Y',
    'NAME'              => $rspRu['name'],
    'CODE'              => $ref,
    'PROPERTY_VALUES' => [
      'REF'                => $ref,
      'CITY_REF'           => $rspRu['cityRef'],
      'NUMBER'             => $rspRu['number'],
      'DESCRIPTION_UK'     => $rspUk['name'],
      'ADDRES'             => $rspRu['address'],
      'ADDRES_UK'          => $rspUk['address'],
      'PHONE'              => $rspRu['phone'],
      'EMAIL'              => $rspRu['email'],
      'LATITUDE'           => $rspRu['latitude'],
      'LONGITUDE'          => $rspRu['longitude'],
      'SCHEDULE_MONDAY'    => $rspRu['schedule']['monday'],
      'SCHEDULE_TUESDAY'   => $rspRu['schedule']['tuesday'],
      'SCHEDULE_WEDNESDAY' => $rspRu['schedule']['wednesday'],
      'SCHEDULE_THURSDAY'  => $rspRu['schedule']['thursday'],
      'SCHEDULE_FRIDAY'    => $rspRu['schedule']['friday'],
      'SCHEDULE_SATURDAY'  => $rspRu['schedule']['saturday'],
      'SCHEDULE_SUNDAY'    => $rspRu['schedule']['sunday'],
    ]
  ];

  $bs = new CIBlockElement;
  $res = $bs->Add($arFields);
  if ($res) {
    echo "[i] Добавлено склад: {$rspRu['name']} -> {$res}\n";
  } else {
    echo "[e] Ошибка добавления отделения: {$rspRu['name']} -> {$bs->LAST_ERROR}\n";
    AddMessage2Log("[e] Ошибка добавления отделения: {$rspRu['name']} -> {$bs->LAST_ERROR}");
  }
}
