//Определение ОС
function DefineSystemType(){
	let tablet = device.tablet();
	let mobile = device.mobile();
	let android = device.android();
	let ios = device.ios();

	if (!mobile && !tablet) {
		return;
	}
	else
	{
		if(android) {
			return "android";
		}
		else if (ios){
			return "ios";
		}
	}
	return;
}

//Определение страницы, где показывать блок
function PageForMobileAppBlock(systemType){
	let section = $("section");
	let sectionClass = section.attr("class");
	let regex = RegExp("(show-apps-panel)");
	let showBlock = regex.test(sectionClass);

	if(showBlock) {
		return section;
	}
	return;
}

//Отображение блока мобильного приложения 
function ShowMobileAppBlock(systemType) {
	let appImageUrl = "/bitrix/templates/sat_main/img/mobile-app-logo.png";
	let header = $("header");
	let mobileBlockDIV = $('<div>').addClass('mobile-app-block ' + systemType);
	let mobileBlockImage = $('<img src='+appImageUrl+'>').addClass("mobile-app-img");
	let mobileBlockText = $('<span>');
	let mobileBlockLink = $('<a href="" target="_blank" rel="nofollow">Перейти</a>');
	let mobileSpanText, mobileAHref;

	switch(systemType) {
		case 'android':
			mobileSpanText = (api_lang == "ru") ? "Скачайте приложение SAT для Android": "Завантажте додаток SAT для Android";
			mobileAHref = 'https://play.google.com/store/apps/details?id=m.sat.ua.m';
		break;
		case 'ios':
			mobileSpanText = (api_lang == "ru") ? "Скачайте приложение SAT для iOS": "Завантажте додаток SAT для iOS";
			mobileAHref = 'https://apps.apple.com/ua/app/sat-%D0%B3%D1%80%D1%83%D0%B7%D0%BE%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B7%D0%BA%D0%B8/id1491453268';
		break;
	}

	mobileBlockDIV.append(mobileBlockImage);
	mobileBlockDIV.append(mobileBlockText.text(mobileSpanText));
	mobileBlockDIV.append(mobileBlockLink.attr('href', mobileAHref));
	header.prepend(mobileBlockDIV);

	return mobileBlockDIV;
}

//Добавление стилей для блока мобильного приложения
function AddStylesForMobileAppBlock(mainblock) {
	mainblock.css({
		'display': 'flex',
		'position': 'relative',
		'align-items': 'center',
		'padding': '10px',
		'background-color': '#f9f9fb',
		'font-family':'"SFUIDisplayMedium", sans-serif',
		'pointer-events': 'auto',
	});

	mainblock.find('img').css({
		'display':'inline-block',
		'width': '50px',
		'height': '50px',
		'margin-right': '20px',
	});

	mainblock.find('span').css({
		'display':'inline-block',
		'font-size': '15px',
		'line-height': '18px',
		'color': '#404041',
		'margin-right': 'auto',
	});

	mainblock.find('a').css({
		'display':'inline-block',
		'padding': '10px',
		'margin-left': '20px',
		'font-size': '13px',
		'line-height': '15px',
		'border-radius': '5px',
		'text-align': 'center',
		'text-transform': 'uppercase',
		'text-decoration': 'none',
		'background': '#ffd64a',
		'color': '#1e3e6c',
		'cursor': 'pointer',
	});
}


//Изменение отступов секции и выпадающего меню
function ChangeSectionMargin(block, page){
	HideOrShowApplicationMobileBlock(block, page);
	let header = block.parent();
	let mobileBlock = block;
	let mobileNav = $('nav.mobile-nav');
	let section = page;
	let headerH = header.height()- 2;
	section.css('margin-top', headerH);
	mobileNav.css('margin-top', headerH);

	$(window).on('orientationchange resize', function(event) { 
		setTimeout(function(){
			headerH = header.height() - 2;
			section.css('margin-top', headerH);
			mobileNav.css('margin-top', headerH);
		},300);
	});
}

function HideOrShowApplicationMobileBlock(block, page){
	let mobileNav = $('nav.mobile-nav');
	let mobileBlockHeight = block.height();
	let header = block.parent();
	let headerH;
	$(window).on( 'scroll', function(){
		if($(this).scrollTop() > mobileBlockHeight){
			block.hide();
			headerH = header.height() - 2;
			mobileNav.css('margin-top', headerH);
		} else {
			block.show();
			headerH = header.height() - 2;
			mobileNav.css('margin-top', headerH);
		}
	});
}

function StartShowMobileAppBlock(){
	let itsAndroidOrIos = DefineSystemType();
	if(typeof(itsAndroidOrIos) == "string") {
		let pageWithMobileApp = PageForMobileAppBlock(itsAndroidOrIos);
		if(typeof(pageWithMobileApp) == "object") {
			let mobileAppBlock = ShowMobileAppBlock(itsAndroidOrIos);
			AddStylesForMobileAppBlock(mobileAppBlock);
			ChangeSectionMargin(mobileAppBlock, pageWithMobileApp);
		}
	}
};

$(document).ready(function($){
	StartShowMobileAppBlock();
});