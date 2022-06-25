<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<div class="departments-table">
	<div class="departments-table-header">
		<?if($arResult["PAGE_ID"] == "list"):?>
		<div class="department-search">
			<div class="search-input ">
				<input type="text">
				<span class="highlight"></span>
				<span class="bar"></span>

				<label class="text-uppercase"><?=GetMessage("HEADER_RSP")?></label>
				<i class="fa fa-search" aria-hidden="true"></i>
				<i class="fa fa-times" aria-hidden="true"></i>
			</div>
		</div>

		<?else:?>
		<div class="department text-uppercase"><?=GetMessage("HEADER_RSP")?></div>
		<?endif;?>
		<div class="address text-uppercase"><?=GetMessage("HEADER_ADDRESS")?></div>
		<div class="contacts text-uppercase"><?=GetMessage("HEADER_CONTACTS")?></div>
	</div>
	<div class="departments-table-body">

	<?if($arResult["DEPARTMENTS_LIST"]):?>
		<div class="panel-group" role="tablist" id="departments-list">
		<?foreach($arResult["DEPARTMENTS_LIST"] as $department):?>
			<?
			$main_description = ($arResult["MAIN_LANG"] == "UK") ? $department["PROPERTY_DESCRIPTION_UK_VALUE"] : $department["NAME"];
			$add_description = ($arResult["MAIN_LANG"] == "UK") ? $department["NAME"] : $department["PROPERTY_DESCRIPTION_UK_VALUE"];
      $main_description .= " ({$department['region']})";
      $address = ($arResult["MAIN_LANG"] == "UK") ? $department["PROPERTY_ADDRES_UK_VALUE"] : $department["PROPERTY_ADDRES_VALUE"];
			?>
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="item-head collapsed" data-toggle="collapse" href="<?echo '#'.$department['PROPERTY_NUMBER_VALUE'];?>" data-parent="#departments-list">
						<div class="department" data-additional-lang="<?=$add_description;?>"><?=$main_description;?></div>
						<div class="address"><?=$address;?></div>
						<div class="align-ie"></div>
						<div class="contacts">066 830 99 09<p>098 830 99 09</p><p>073 830 99 09</p>
						</div>
					</div>
				</div>

				<div id="<?echo $department['PROPERTY_NUMBER_VALUE']?>" class="panel-collapse collapse" role="tabpanel">
					<div class="panel-body">
						<div class="item-body">
							<div class="department">
								<p><a href="<?=$department["DETAIL_URL"] ?>"><?=getMessage('SHOW_ON_MAP')?></a>
                <? if ($department["typeCODTitle"]) { ?>
                  <p>
                    <a
                      style="font-weight: bold;"
                      href="<?=$department["typeCODUrl"] ?>"
                    >
                      <?= $department["typeCODTitle"]; ?>
                    </a>
                  </p>
                <? } ?>
							</div>
							<div class="address">
								<div class="mobile-address"><a href="<?=$department["DETAIL_URL"]?>"><?=$address?></a></div>
								<?if(	$department["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $department["PROPERTY_SCHEDULE_TUESDAY_VALUE"] &&
										$department["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $department["PROPERTY_SCHEDULE_WEDNESDAY_VALUE"] &&
										$department["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $department["PROPERTY_SCHEDULE_THURSDAY_VALUE"] &&
										$department["PROPERTY_SCHEDULE_MONDAY_VALUE"] == $department["PROPERTY_SCHEDULE_FRIDAY_VALUE"]):?>
									<p><?=getMessage('WEEKDAYS').$department["PROPERTY_SCHEDULE_MONDAY_VALUE"];?></p>
									<p><?=getMessage('SATURDAY').$department["PROPERTY_SCHEDULE_SATURDAY_VALUE"];?></p>
								<?else:?>
									<p><?=getMessage('MONDAY').$department["PROPERTY_SCHEDULE_MONDAY_VALUE"];?></p>
									<p><?=getMessage('TUESDAY').$department["PROPERTY_SCHEDULE_TUESDAY_VALUE"];?></p>
									<p><?=getMessage('WEDNESDAY').$department["PROPERTY_SCHEDULE_WEDNESDAY_VALUE"];?></p>
									<p><?=getMessage('THURSDAY').$department["PROPERTY_SCHEDULE_THURSDAY_VALUE"];?></p>
									<p><?=getMessage('FRIDAY').$department["PROPERTY_SCHEDULE_FRIDAY_VALUE"];?></p>
									<p><?=getMessage('SATURDAY').$department["PROPERTY_SCHEDULE_SATURDAY_VALUE"];?></p>
								<?endif;?>
							</div>
							<div class="contcts"><p><a href="mailto:info@sat.ua">info@sat.ua</a></p></div>
						</div>
					</div>
				</div>
			</div>
		<?endforeach;?>
		</div>
	<?endif;?>
	</div>
</div>
