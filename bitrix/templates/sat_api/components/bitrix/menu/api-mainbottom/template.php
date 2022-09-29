<?if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<div class="row-map">

<?if (!empty($arResult)):?>
<?
$cnt = count($arResult);
?>
<?
if(!CModule::IncludeModule("iblock")):
	CModule::IncludeModule("iblock");
endif;

$arSectoions = array();
$MethodsSection = CIBlockSection::GetList(array(), array("IBLOCK_ID"=>GetMessage("API_METHODS")));
while($arMethodsSection = $MethodsSection -> GetNext()):
	$arSectoions[$arMethodsSection["ID"]]["LINK"] = $arMethodsSection["SECTION_PAGE_URL"];
	$arSectoions[$arMethodsSection["ID"]]["TEXT"] = $arMethodsSection["NAME"];
endwhile;
?>


<?
$previousLevel = 0;
$i = 1;
foreach($arResult as $itemKey => $arItem):?>

  <?if ($previousLevel && $arItem["DEPTH_LEVEL"] <= $previousLevel):?>
    <?/*if (($arItem["DEPTH_LEVEL"] == 1 && $previousLevel == 1) || ($arItem["DEPTH_LEVEL"] < $previousLevel)):*/?>
    <?if ($arItem["DEPTH_LEVEL"] == 1):?>
      </div><!-- 1 -->
    <?else:?>
      <?=str_repeat("</ul></li>", ($previousLevel - $arItem["DEPTH_LEVEL"]));?>
    <?endif?>
  <?endif?>

  <?if ($arItem["IS_PARENT"]):?>
    <?if ($arItem["DEPTH_LEVEL"] == 1):?>
        <div class="footer-nav-item">
                <div class="nav-title"><?=$arItem["TEXT"]?></div>
                <ul>
	<?elseif($arItem["LINK"] == "/api/methods/"):?>
      <li<?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>><a href="<?=$arItem["LINK"]?>" class="parent"><?=$arItem["TEXT"]?></a>
        <ul>
		<?foreach($arSectoions as $arItem):?>
				<li<?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>><a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a></li>
		<?endforeach;?>
		  </ul>
    <?else:?>
      <li<?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>><a href="<?=$arItem["LINK"]?>" class="parent"><?=$arItem["TEXT"]?></a>
        <ul>
    <?endif?>
  <?else:?>
      <?if ($arItem["DEPTH_LEVEL"] == 1):?>
        <div class="footer-nav-item">
          <div class="nav-title"><?=$arItem["TEXT"]?></div>

      <?else:?>
		<?if($arItem["LINK"] !== $arResult[$itemKey-1]["LINK"]):?>
			  <li<?if ($arItem["SELECTED"]):?> class="item-selected"<?endif?>><a href="<?=$arItem["LINK"]?>"><?=$arItem["TEXT"]?></a></li>
        <?endif?>
      <?endif?>
  <?endif?>

  <?$previousLevel = $arItem["DEPTH_LEVEL"];?>
  
<?$i++;?>

<?endforeach?>

<?if ($previousLevel > 1)://close last item tags?>
  <?=str_repeat("</ul></li>", ($previousLevel-1) );?>
<?endif?>


<?endif?>
</div></div> <!-- 2 -->