!function(wnd, $, undefined){
	var API = function(options) {
        this.Init(options);
    }
	API.prototype = {
        constructor : API,
        defaults : {},
        params : {},
        Init : function(options) {
				this.params = $.extend({}, this.defaults, options);
				this.StartTry();
				this.GetDefaultsParams();
				this.AddParams();
				this.DeleteParams();
				this.AddHeaders();
				this.DeleteHeaders();
				this.SelectParamOrHeader();
				this.GetRequestURL();
				this.SubmitTry();
		},
		GetDefaultsParams: function() {
			var self = this;
			if($("input[parameter-name='format']")) {
				$("input[parameter-name='format']").addClass('has-error');
			}
			if($("input[header-name='Content-Type']")) {
				$("input[header-name='Content-Type']").addClass('has-error');
			}
			$('textarea').autoResize({extraSpace : 0});
			self.arParamsList = {	"format":	   ["xml", "json"],
									"language":	   ["ru", "uk", "en"],
									"Content-Type":["text/xml", "application/json"],
									"Headers-List":["Accept", "Accept-Charset", "Accept-Encoding", "Accept-Language", "Age", "Autorization", 
													"Cache-Control", "Connection", "Content-Disposition", 
													"Content-Encoding", "Content-Length", "Content-Location", 
													"Content-Range", "Content-Type", "Cookie", "Date", "ETag", 
													"Expect", "Expires", "From", "Host", "If-Match",
													"If-Modified-Since", "If-None-Match", "If-Range", 
													"If-Unmodified-Since", "Keep-Alive", "Last-Modified", 
													"Location", "Origin", "Ocp-Apim-Subscription-Key",
													"Ocp-Apim-Trace", "Pragma", "Proxy-Authorization", 
													"Range", "Referer", "Remote-User", "Retry-After", 
													"Server", "Set-Cookie", "Transfer-Encoding", "User-Agent",
													"Vary", "Warning", "WWW-Authenticate", "X-Forwarded-For"] 
								};
			$("input[header-name='Content-Type']").val( self.arParamsList["Content-Type"][0]);
			$("input[header-name='Content-Type']").removeClass('has-error');
			var text = $("div[class='method-information'][type='text/xml']").text();
			$("textarea[id='postContent']").val( text );
		},
		AddParams: function() {
			var self = this;
			$(".panel-body").on("click", "button[id='addParameter']", function(){
				$( this ).before("<div class='row'>" + 
						"<div class='col-md-4'>" + 
							"<input class='control-label' name='parameterName' parameter-name='' placeholder='Наименование' type='text'>" +
						"</div>" +
						"<div class='col-md-4'>" + 
						"<input class='control-form' name='parameterValue' placeholder='Значение' spellcheck='false' autocomplate='off' data-bind='' parameter-name='' type='text'>" +
						"</div>" +
						"<div class='col-md-3'>" +
							"<button id='deleteParameter' class='btn btn-link' type='button' parameter-name='' aria-label='Удалить параметр'><span class='glyphicon glyphicon-minus'></span>Удалить параметр</button>" +
						"</div>" +
						"</div>");
			$("input[class='control-label']").addClass('has-error');
			});

			$(".panel-body").on("keyup", "input[name='parameterName']", function() {
				$( this ).attr("parameter-name", $( this ).val());
				$( this ).parent().parent().find('input[name="parameterValue"]').attr("parameter-name", $( this ).val());

				if( $( this ).val().length > 0 ){
					$( this ).removeClass("has-error");
				} else {
					$( this ).addClass("has-error");
				}
			});
		},
		DeleteParams: function () {
			var self = this;
			$(".panel-body").on("click", "button[id='deleteParameter']", function(){
				$("input[name='parameterValue']").trigger("keyup");
				var parent = $( this ).parent().parent();
				var elem = parent.find("input[name='parameterValue']");
				$( elem).val("");
				$( elem).trigger("keyup");
				$( this ).parent().parent().remove();

			});
		},
		AddHeaders: function () {
			$(".panel-body").on("click", "button[id='addHeader']", function(){
				$( this ).before("<div class='row'>" + 
						"<div class='col-md-4'>" + 
							"<input class='control-label' name='headerName' header-name='' placeholder='Наименование' type='text'>" +
						"</div>" +
						"<div class='col-md-4'>" + 
						"<input class='control-form' name='headerValue' placeholder='Значение' spellcheck='false' autocomplate='off' data-bind='' header-name='' type='text'>" +
						"</div>" +
						"<div class='col-md-3'>" +
							"<button id='deleteHeader' class='btn btn-link' type='button' header-name='' aria-label='Удалить заголовок'><span class='glyphicon glyphicon-minus'></span>Удалить заголовок</button>" +
						"</div>" +
						"</div>");
			$("input[class='control-label']").addClass('has-error');
			});
		},
		DeleteHeaders: function () {
			$(".panel-body").on("click", "button[id='deleteHeader']", function(){
				$( this ).parent().parent().remove();
			});
		},
		SelectParamOrHeader: function () {
			if($("input[name='parameterValue']")) {
				$("input[parameter-name='format']").on("focus", function(){
						$( this ).val("");
				});
				$("input[parameter-name='format']").autocomplete({
					source: this.arParamsList["format"],
					minLength: 0,
					select: function( event, ui ) {
						$( this ).removeClass('has-error');
					},
					close: function( event, ui ) {
						$( this ).trigger("keyup");
					}
				}).focus(function () {
					 $( this ).autocomplete("search");
				});

				$("input[parameter-name='language']").on("focus", function(){
						$( this ).val("");
				});
				$("input[parameter-name='language']").autocomplete({
					source: this.arParamsList["language"],
					minLength: 0,
					select: function( event, ui ) {
					},
					close: function( event, ui ) {
						$( this ).trigger("keyup");
					}
				}).focus(function () {
					 $( this ).autocomplete("search");
				});
			}
			if($("input[name='headerValue']")) {
				$("input[header-name='Content-Type']").on("focus", function(){
						$( this ).val("");
				});
				if($("input[header-name='Content-Type']")) {
					$("input[header-name='Content-Type']").autocomplete({
						source: this.arParamsList["Content-Type"],
						minLength: 0,
						select: function( event, ui ) {
							if( ui.item.value == "text/xml") {
								console.log( ui.item.value );
								var text = $("div[class='method-information'][type='text/xml']").text();
								$("textarea[id='postContent']").val( text );
								$("textarea[id='postContent']").trigger("keyup");
							}
							if( ui.item.value == "application/json") {
								console.log( ui.item.value );
								var text = $("div[class='method-information'][type='application/json']").text();
								$("textarea[id='postContent']").val( text );
								$("textarea[id='postContent']").trigger("keyup");
							}
							$( this ).removeClass('has-error');
						},
						close: function( event, ui ) {
							$( this ).trigger("keyup");
						}
					}).focus(function () {
						$(this).autocomplete("search");
					});
				}
			}
			var headerList = this.arParamsList["Headers-List"];
			$(".panel-body").on("focus", "input[name='headerName']", function () {
				$( this ).autocomplete({
						source: headerList,
						minLength: 0,
						select: function( event, ui ) {
							$( this ).attr("header-name", ui.item.value);
							$( this ).attr("disabled", "true");
							$( this ).parent().parent().find('input[name="headerValue"]').attr("header-name", ui.item.value);
							$( this ).removeClass('has-error');
						}
					}).focus(function () {
						$(this).autocomplete("search");

					});
			});
		},
		FormParams: function() {
			var urlParams = {};

				$("input[name='parameterValue']").each(function(index) { 
					var name = $( this ).attr("parameter-name");
					var value = $( this ).val();
					if(name) {
						urlParams[name] = value;
					}
				});
				return urlParams;
		},
		GetRequestURL: function() {
			var self = this;
			var url = $("span[id='requestUrl']");
			var arrParams = [];
			$(".panel-body").on("keyup", "input[name='parameterValue']", function(){
				$("input[name='parameterValue']").each(function(index){
					var key = $( this ).attr('parameter-name');
					var value = $( this ).val();
					if(key=="format"){
						if(value == "json" || value == "xml") {
							arrParams[index] = value;
						} else {
							arrParams[index] = "{format}";
						}
					} else {
						if(key && value) {
							arrParams[index] = key+"="+encodeURIComponent( value );
						}
						else{
							arrParams[index] = "";
						}
					}
				});
				var format = arrParams[0];
				var arrParamsList = [];  //list without format
				for(var i=1; i<arrParams.length; i++) {
					if(arrParams[i].length>0) {

						arrParamsList[i-1] = arrParams[i];
					}
				}
				var counter = 0;
				var paramsList = [];
				$.each(arrParamsList, function(index){
					if(arrParamsList[index]){
						paramsList[counter] = arrParamsList[index];
						counter++;
					}
				});
				if(paramsList.length>0) {
					var strParams = paramsList.join('&');
					var newRequestURL = RequestURL.replace('{format}', format);
					var result = url.text(newRequestURL+"?"+strParams);
					return result;
				}
				else {
					var newRequestURL = RequestURL.replace('{format}', format);
					var result = url.text(newRequestURL);
					return result;
				}
			});
		},
		StartTry: function() {
			$(".try-start").on("click", function() {
				$(".try-it").slideDown(300);
			});
		},
		SubmitTry: function() {
			var self = this;
			$(".try-submit").on("click", function() {
			var url_api = $("span[id='requestUrl']").text();
			var arHeaders = [];
			$("input[name='headerValue']").each(function(index) {
				if($( this ).val()) {
				var value = $( this ).val();
				var key = $( this ).attr("header-name");
					arHeaders[ index] = key+": "+value;
				}
			});
				if(RequestMethod == "GET") {
					var data = {
						"type": RequestMethod,
						"url": url_api,
						"headers": arHeaders
					};
					console.log( data );
					$.ajax({
						type:'GET',
						url: "/bitrix/templates/sat_api/dev_api.php",
						data: data,
						dataType : 'html',
						timeout:30000,
						beforeSend: function() { 
							$(".try-request").slideUp(300);
							$(".try-submit").css("display", "none");
							$(".loader").css("display","inline-block");
						},
						success: function( msg ) {
							$("span[id='requestText']").text(msg);
							$(".loader").css("display","");
							$(".try-submit").css("display", "inline-block");
							$(".try-request").slideDown(300);
						},
					   error: function() {
							$(".loader").css("display","");
							$(".try-submit").css("display", "inline-block");
							console.log('error-get');
						}
					});
				}
				if(RequestMethod == "POST") {

					var dataText = $("textarea[id='postContent']").val();
					var data = {
						"type": RequestMethod,
						"url": url_api,
						"body": $("textarea[id='postContent']").val(),
						"headers": arHeaders
					};
					$.ajax({
						type:'GET',
						url: "/bitrix/templates/sat_api/dev_api.php",
						data: data,
						dataType : 'html',
						timeout:30000,
						beforeSend: function() { 
							$(".try-request").slideUp(300);
							$(".try-submit").css("display", "none");
							$(".loader").css("display","inline-block");
						},
						success: function( msg ) {
							$("span[id='requestText']").text(msg);
							$(".loader").css("display","");
							$(".try-submit").css("display", "inline-block");
							$(".try-request").slideDown(300);
						},
					   error: function() {
							$(".loader").css("display","");
							$(".try-submit").css("display", "inline-block");
							console.log('error-post');
						}
					});
				}
			});
		}
	}

	$(function () {
        wnd.API = new API();
    })
}(window, jQuery);