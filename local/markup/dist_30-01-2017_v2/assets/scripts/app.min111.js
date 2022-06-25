/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "314ccd8c20dde67ed503"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _swiper = __webpack_require__(4);
	
	var _swiper2 = _interopRequireDefault(_swiper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(79);
	__webpack_require__(83);
	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	
	(0, _jquery2.default)(function () {
	    (0, _jquery2.default)(".nano").nanoScroller();
	
	    var swiperMain = (0, _swiper2.default)('.swiper-container--main', {
	        paginationClickable: true,
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        spaceBetween: 0,
	        loop: true
	    });
	
	    if ((0, _jquery2.default)('.swiper-container--main').length) {
	        swiperMain.on('onSlideChangeStart', function (swiper) {
	            (0, _jquery2.default)('.js-swiper-main-navigation a').removeClass('active').eq(swiper.activeIndex).addClass('active');
	        });
	
	        (0, _jquery2.default)('.js-swiper-main-navigation').find('a').on('click', function () {
	            var index = (0, _jquery2.default)(this).data('slide');
	
	            swiperMain.slideTo(index);
	            return false;
	        });
	    }
	
	    var swiperPanelPartner = (0, _swiper2.default)('.panel--partner .panel__swiper-container', {
	        paginationClickable: true,
	        spaceBetween: 20,
	        loop: true
	    });
	
	    (0, _jquery2.default)('.panel--partner .panel__prev').on('click', function () {
	        swiperPanelPartner.slidePrev();
	    });
	
	    (0, _jquery2.default)('.panel--partner .panel__next').on('click', function () {
	        swiperPanelPartner.slideNext();
	    });
	
	    (0, _jquery2.default)('.table--department').each(function () {
	        var $table = (0, _jquery2.default)(this);
	        var $toggles = $table.find('.tr-collapse-toggle');
	
	        $toggles.on('click', function () {
	            var $toggle = (0, _jquery2.default)(this);
	            var $collapseInner = $toggle.find('.collapse');
	            var $collapseNext = $toggle.nextUntil('.tr-collapse-toggle').find('.collapse');
	
	            $collapseNext.eq(0).on('hidden.bs.collapse', function () {
	                $toggle.removeClass('tr-active uk-overlay-active');
	            });
	
	            $table.find('.collapse').not($collapseInner).not($collapseNext).collapse('hide');
	
	            if ($toggle.hasClass('tr-active')) {
	                $collapseInner.collapse('hide');
	                $collapseNext.collapse('hide');
	            } else {
	                $toggle.addClass('tr-active uk-overlay-active');
	                $collapseInner.collapse('show');
	                $collapseNext.collapse('show');
	            }
	        });
	    });
	
	    (0, _jquery2.default)('.page__col-side-toggle-icon').on('click', function () {
	        var $parent = (0, _jquery2.default)(this).parents('.page__col-side:first');
	        var $body = (0, _jquery2.default)('body');
	
	        if ($parent.hasClass('is-visible')) {
	            $parent.removeClass('is-visible');
	            $body.removeClass('page-offcanvas');
	        } else {
	            $parent.addClass('is-visible');
	            $body.addClass('page-offcanvas');
	        }
	    });
	
	    (0, _jquery2.default)('.page__col-side-tint').on('click', function () {
	        (0, _jquery2.default)(this).siblings('.page__col-side').removeClass('is-visible');
	    });
	
	    (0, _jquery2.default)('.page__navbar-header .js-toggle-search').on('click', function () {
	        var navbar = (0, _jquery2.default)(this).parents('.page__navbar-header');
	        var navbarSearch = navbar.next('.page__navbar-header--search');
	        navbarSearch.find('.js-close').one('click', function () {
	            navbarSearch.removeClass('is-expand');
	            return false;
	        });
	        navbarSearch.toggleClass('is-expand');
			(0, _jquery2.default)("#search").focus();
	        return false;
	    });
		(0, _jquery2.default)(document).on("click",function(event){
			if(event["target"]["id"]!="search"){
				(0, _jquery2.default)('.js-close').trigger("click");
			}			
		});
	    (0, _jquery2.default)(function () {
	        var $window = (0, _jquery2.default)(window);
	        var $document = (0, _jquery2.default)(document);
	        var $pageHeader = (0, _jquery2.default)('.page__header');
	        var documentScrollLeft = 0;
	
	        $window.scroll(function (e) {
	            documentScrollLeft = $document.scrollLeft();
	
	            if ($pageHeader.css('position') == 'fixed') {
					// Блок калькулятора
					//(0, _jquery2.default)('.mini_calc').css("top","44px");
					(0, _jquery2.default)('.mini_calc').addClass("is-active");
	                $pageHeader.css({
	                    left: -documentScrollLeft + 'px'
	                });
	                $window.one('resize', function (e) {
	                    $window.trigger('scroll');
	                });
	            } else {
					// Блок калькулятора
					//(0, _jquery2.default)('.mini_calc').css("top","83px");
					(0, _jquery2.default)('.mini_calc').removeClass("is-active");
	                $pageHeader.css({
	                    left: ''
	                });
	            }
	        }).trigger('scroll');
	    });
	
	    (0, _jquery2.default)(function () {
	
	        if ((0, _jquery2.default)('#cube_slider_length').length == 0) {
	            return;
	        }
	
	        var cubeLengthChange = function cubeLengthChange(e) {
	            (0, _jquery2.default)('#cube_input_length').val(length.getValue());
	        };
	
	        var cubeWidthChange = function cubeWidthChange(e) {
	            (0, _jquery2.default)('#cube_input_width').val(width.getValue());
	        };
	
	        var cubeHeightChange = function cubeHeightChange(e) {
	            (0, _jquery2.default)('#cube_input_height').val(height.getValue());
	        };
	
	        var cubeScaleUpdate = function cubeScaleUpdate() {
	
	            var scaleX = width.getValue() * 100 / ((0, _jquery2.default)('#cube_slider_width').data('slider-max') - (0, _jquery2.default)('#cube_slider_width').data('slider-min')) / 100;
	            var scaleY = height.getValue() * 100 / ((0, _jquery2.default)('#cube_slider_height').data('slider-max') - (0, _jquery2.default)('#cube_slider_height').data('slider-min')) / 100;
	            var scaleZ = length.getValue() * 100 / ((0, _jquery2.default)('#cube_slider_length').data('slider-max') - (0, _jquery2.default)('#cube_slider_length').data('slider-min')) / 100;
	            // var translateX = -(1 - scaleX) * 100 + '%';
	            // var translateY = (1 - scaleY) * 100 + '%';
	            // var translateZ = (1 - scaleZ) * 100 + '%';
	
	            (0, _jquery2.default)('#cube').css('transform', 'scale3d(' + scaleX + ',' + scaleY + ',' + scaleZ + ')');
	            // $('#cube').css('transform', 'scale3d('+ scaleX +','+ scaleY +','+ scaleZ +') translate3d(' + translateX + ',' + translateY + ',' + translateZ + ')');
	        };
	
	        var length = (0, _jquery2.default)('#cube_slider_length').slider().on('slide', cubeLengthChange).on('slide', cubeScaleUpdate).on('change', cubeLengthChange).on('change', cubeScaleUpdate).data('slider');
	
	        var width = (0, _jquery2.default)('#cube_slider_width').slider().on('slide', cubeWidthChange).on('slide', cubeScaleUpdate).on('change', cubeWidthChange).on('change', cubeScaleUpdate).data('slider');
	
	        var height = (0, _jquery2.default)('#cube_slider_height').slider().on('slide', cubeHeightChange).on('slide', cubeScaleUpdate).on('change', cubeHeightChange).on('change', cubeScaleUpdate).data('slider');
	
	        (0, _jquery2.default)('#cube_input_length').on('change', function () {
	            var parsed = parseInputValue((0, _jquery2.default)('#cube_slider_length').data('slide-min'), (0, _jquery2.default)('#cube_slider_length').data('slide-max'), (0, _jquery2.default)(this).val(), (0, _jquery2.default)('#cube_slider_length').data('slide-value'));
	
	            length.setValue(parsed);
	            (0, _jquery2.default)('#cube_slider_length').trigger('change');
	        });
	
	        (0, _jquery2.default)('#cube_input_width').on('change', function () {
	            var parsed = parseInputValue((0, _jquery2.default)('#cube_slider_width').data('slide-min'), (0, _jquery2.default)('#cube_slider_width').data('slide-max'), (0, _jquery2.default)(this).val(), (0, _jquery2.default)('#cube_slider_width').data('slide-value'));
	
	            width.setValue(parsed);
	            (0, _jquery2.default)('#cube_slider_width').trigger('change');
	        });
	
	        (0, _jquery2.default)('#cube_input_height').on('change', function () {
	            var parsed = parseInputValue((0, _jquery2.default)('#cube_slider_height').data('slide-min'), (0, _jquery2.default)('#cube_slider_height').data('slide-max'), (0, _jquery2.default)(this).val(), (0, _jquery2.default)('#cube_slider_height').data('slide-value'));
	
	            height.setValue(parsed);
	            (0, _jquery2.default)('#cube_slider_height').trigger('change');
	        });
	
	        (0, _jquery2.default)('#cube_input_height').trigger('change');
	
	        function parseInputValue(min, max, value, defaultValue) {
	            var parsed = parseFloat(value);
	
	            if (parsed >= max) {
	                parsed = max;
	            } else if (parsed <= min) {
	                parsed = min;
	            }
	
	            return parsed;
	        }
	    });
	
	    (0, _jquery2.default)('.page__map-container.collapse .btn--more').on('click', function () {
	        var $more = (0, _jquery2.default)(this);
	        var $collapse = $more.parents('.page__map-container.collapse');
	
	        if ($collapse.hasClass('in')) {
	            $collapse.removeClass('active').collapse('hide');
	        } else {
	            $collapse.addClass('active').collapse('show');
	        }
	
	        return false;
	    });
	
	    (0, _jquery2.default)('.comment-container .btn--more').on('click', function () {
	        var $more = (0, _jquery2.default)(this);
	        var $container = $more.parents('.comment-container');
	        var $collapse = $container.find('.collapse');
	
	        if ($collapse.hasClass('in')) {
	            $container.removeClass('active');
	            $collapse.collapse('hide');
	        } else {
	            $container.addClass('active');
	            $collapse.collapse('show');
	        }
	
	        return false;
	    });
	
	    (0, _jquery2.default)('#mobile_menu').on('show.uk.offcanvas', function (event) {
	        (0, _jquery2.default)('.page__header').addClass('page__header_moved');
	    }).on('click', function (event) {
	        if ((0, _jquery2.default)(event.target).closest(".uk-offcanvas-bar").length > 0) {} else {
	            (0, _jquery2.default)('.page__header').removeClass('page__header_moved');
	        }
	    });
	
	    // search
	
	    (0, _jquery2.default)('#search').easyAutocomplete({
	        url: "assets/data/search.json",
	        getValue: "name",
	        list: {
	            maxNumberOfElements: 10,
	            match: {
	                enabled: true
	            }
	        },
	        highlightPhrase: false
	    });
	
	    var timer;
	    (0, _jquery2.default)('.page__header').on('inactive.uk.sticky', function () {
	        var $self = (0, _jquery2.default)(this);
	
	        clearTimeout(timer);
	
	        $self.addClass('animated');
	        timer = setTimeout(function () {
	            $self.removeClass('animated');
	        }, 190);
	    });
	
	    // rating
	
	    (0, _jquery2.default)('#rating').raty({
	        half: false,
	        score: 2,
	        starOff: 'fa fa-star-o fa_accent',
	        starOn: 'fa fa-star fa_accent'
	        // starHalf : 'fa fa-star-half-o fa_accent'
	    });
	
	    // sidebar
	
	    var offset = 900;
	    var duration = 200;
	
	    (0, _jquery2.default)(window).on('scroll', function () {
	        if ((0, _jquery2.default)(this).scrollTop() > offset) {
	            (0, _jquery2.default)('#sidenav').find('.sidenav__link.is-fade').show();
	        } else {
	            (0, _jquery2.default)('#sidenav').find('.sidenav__link.is-fade').hide();
	        }
	    }).trigger('scroll');
	
	    // scroller
	
	    new Swiper('.js-swiper-container-scrollable', {
	        scrollbar: '.swiper-scrollbar',
	        direction: 'vertical',
	        slidesPerView: 'auto',
	        mousewheelControl: true,
	        freeMode: true
	    });
	
	    // autoResize textarea
	
	    (0, _jquery2.default)('textarea.form-control--alt').autoResize();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["$"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["jQuery"] = __webpack_require__(3);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */
	
	(function( global, factory ) {
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];
	
	var document = window.document;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var support = {};
	
	
	
	var
		version = "2.2.4",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},
	
		isPlainObject: function( obj ) {
			var key;
	
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}
	
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}
	
			return key === undefined || hasOwn.call( obj, key );
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
	
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
	
					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval
	
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
		rescape = /'|\\/g,
	
		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");
	
		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},
	
			"disabled": function( elem ) {
				return elem.disabled === true;
			},
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
	
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
	
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add( function() {
	
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}
	
			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	} );
	
	
	// The deferred used on DOM ready
	var readyList;
	
	jQuery.fn.ready = function( fn ) {
	
		// Add the callback
		jQuery.ready.promise().done( fn );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
	
			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );
	
	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {
	
			readyList = jQuery.Deferred();
	
			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );
	
			} else {
	
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};
	
	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		register: function( owner, initial ) {
			var value = initial || {};
	
			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;
	
			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {
	
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key === undefined ) {
				this.register( owner );
	
			} else {
	
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
	
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
	
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
	
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
	
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
	
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data, camelKey;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||
	
						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );
	
					if ( data !== undefined ) {
						return data;
					}
	
					camelKey = jQuery.camelCase( key );
	
					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {
	
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );
	
					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );
	
					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHidden = function( elem, el ) {
	
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([\w:-]+)/ );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	
		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
	
		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,
	
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	
	
	var iframe,
		elemdisplay = {
	
			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};
	
	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	
			display = jQuery.css( elem[ 0 ], "display" );
	
		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();
	
		return display;
	}
	
	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];
	
		if ( !display ) {
			display = actualDisplay( nodeName, doc );
	
			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
	
				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );
	
				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;
	
				// Support: IE
				doc.write();
				doc.close();
	
				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return display;
	}
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	var documentElement = document.documentElement;
	
	
	
	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =
	
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
		}
	
		jQuery.extend( support, {
			pixelPosition: function() {
	
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
	
				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
	
				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {
	
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );
	
				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
	
					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );
	
				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );
	
				documentElement.removeChild( container );
				div.removeChild( marginDiv );
	
				return ret;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;
	
		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}
	
		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
	
			// If we already have the right measurement, avoid augmentation
			4 :
	
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
	
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
	
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
	
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}
	
				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );
	
				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}
	
		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}
	
		return elements;
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					style[ name ] = value;
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
	
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );
	
			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;
	
			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
	
			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}
	
		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}
	
			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;
	
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
	
		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		window.clearInterval( timerId );
	
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
	
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
	
						// Handle most common string cases
						ret.replace( rreturn, "" ) :
	
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// The jqXHR state
				state = 0,
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
	
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
	
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}
	
			if ( this[ 0 ] ) {
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );
	
	
	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {
	
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
	
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};
	
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	// Keep a copy of the old load method
	var _load = jQuery.fn.load;
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}
	
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;
	
			if ( !doc ) {
				return;
			}
	
			docElem = doc.documentElement;
	
			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}
	
			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	return jQuery;
	}));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _typeof2=__webpack_require__(5);var _typeof3=_interopRequireDefault(_typeof2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
	 * Swiper 3.3.1
	 * Most modern mobile touch slider and framework with hardware accelerated transitions
	 * 
	 * http://www.idangero.us/swiper/
	 * 
	 * Copyright 2016, Vladimir Kharlampidi
	 * The iDangero.us
	 * http://www.idangero.us/
	 * 
	 * Licensed under MIT
	 * 
	 * Released on: February 7, 2016
	 */(function(){'use strict';var $;/*===========================
	    Swiper
	    ===========================*/var Swiper=function Swiper(container,params){if(!(this instanceof Swiper))return new Swiper(container,params);var defaults={direction:'horizontal',touchEventsTarget:'container',initialSlide:0,speed:300,// autoplay
	autoplay:false,autoplayDisableOnInteraction:true,autoplayStopOnLast:false,// To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
	iOSEdgeSwipeDetection:false,iOSEdgeSwipeThreshold:20,// Free mode
	freeMode:false,freeModeMomentum:true,freeModeMomentumRatio:1,freeModeMomentumBounce:true,freeModeMomentumBounceRatio:1,freeModeSticky:false,freeModeMinimumVelocity:0.02,// Autoheight
	autoHeight:false,// Set wrapper width
	setWrapperSize:false,// Virtual Translate
	virtualTranslate:false,// Effects
	effect:'slide',// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
	coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:true},flip:{slideShadows:true,limitRotation:true},cube:{slideShadows:true,shadow:true,shadowOffset:20,shadowScale:0.94},fade:{crossFade:false},// Parallax
	parallax:false,// Scrollbar
	scrollbar:null,scrollbarHide:true,scrollbarDraggable:false,scrollbarSnapOnRelease:false,// Keyboard Mousewheel
	keyboardControl:false,mousewheelControl:false,mousewheelReleaseOnEdges:false,mousewheelInvert:false,mousewheelForceToAxis:false,mousewheelSensitivity:1,// Hash Navigation
	hashnav:false,// Breakpoints
	breakpoints:undefined,// Slides grid
	spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:'column',slidesPerGroup:1,centeredSlides:false,slidesOffsetBefore:0,// in px
	slidesOffsetAfter:0,// in px
	// Round length
	roundLengths:false,// Touches
	touchRatio:1,touchAngle:45,simulateTouch:true,shortSwipes:true,longSwipes:true,longSwipesRatio:0.5,longSwipesMs:300,followFinger:true,onlyExternal:false,threshold:0,touchMoveStopPropagation:true,// Unique Navigation Elements
	uniqueNavElements:true,// Pagination
	pagination:null,paginationElement:'span',paginationClickable:false,paginationHide:false,paginationBulletRender:null,paginationProgressRender:null,paginationFractionRender:null,paginationCustomRender:null,paginationType:'bullets',// 'bullets' or 'progress' or 'fraction' or 'custom'
	// Resistance
	resistance:true,resistanceRatio:0.85,// Next/prev buttons
	nextButton:null,prevButton:null,// Progress
	watchSlidesProgress:false,watchSlidesVisibility:false,// Cursor
	grabCursor:false,// Clicks
	preventClicks:true,preventClicksPropagation:true,slideToClickedSlide:false,// Lazy Loading
	lazyLoading:false,lazyLoadingInPrevNext:false,lazyLoadingInPrevNextAmount:1,lazyLoadingOnTransitionStart:false,// Images
	preloadImages:true,updateOnImagesReady:true,// loop
	loop:false,loopAdditionalSlides:0,loopedSlides:null,// Control
	control:undefined,controlInverse:false,controlBy:'slide',//or 'container'
	// Swiping/no swiping
	allowSwipeToPrev:true,allowSwipeToNext:true,swipeHandler:null,//'.swipe-handler',
	noSwiping:true,noSwipingClass:'swiper-no-swiping',// NS
	slideClass:'swiper-slide',slideActiveClass:'swiper-slide-active',slideVisibleClass:'swiper-slide-visible',slideDuplicateClass:'swiper-slide-duplicate',slideNextClass:'swiper-slide-next',slidePrevClass:'swiper-slide-prev',wrapperClass:'swiper-wrapper',bulletClass:'swiper-pagination-bullet',bulletActiveClass:'swiper-pagination-bullet-active',buttonDisabledClass:'swiper-button-disabled',paginationCurrentClass:'swiper-pagination-current',paginationTotalClass:'swiper-pagination-total',paginationHiddenClass:'swiper-pagination-hidden',paginationProgressbarClass:'swiper-pagination-progressbar',// Observer
	observer:false,observeParents:false,// Accessibility
	a11y:false,prevSlideMessage:'Previous slide',nextSlideMessage:'Next slide',firstSlideMessage:'This is the first slide',lastSlideMessage:'This is the last slide',paginationBulletMessage:'Go to slide {{index}}',// Callbacks
	runCallbacksOnInit:true/*
	            Callbacks:
	            onInit: function (swiper)
	            onDestroy: function (swiper)
	            onClick: function (swiper, e)
	            onTap: function (swiper, e)
	            onDoubleTap: function (swiper, e)
	            onSliderMove: function (swiper, e)
	            onSlideChangeStart: function (swiper)
	            onSlideChangeEnd: function (swiper)
	            onTransitionStart: function (swiper)
	            onTransitionEnd: function (swiper)
	            onImagesReady: function (swiper)
	            onProgress: function (swiper, progress)
	            onTouchStart: function (swiper, e)
	            onTouchMove: function (swiper, e)
	            onTouchMoveOpposite: function (swiper, e)
	            onTouchEnd: function (swiper, e)
	            onReachBeginning: function (swiper)
	            onReachEnd: function (swiper)
	            onSetTransition: function (swiper, duration)
	            onSetTranslate: function (swiper, translate)
	            onAutoplayStart: function (swiper)
	            onAutoplayStop: function (swiper),
	            onLazyImageLoad: function (swiper, slide, image)
	            onLazyImageReady: function (swiper, slide, image)
	            */};var initialVirtualTranslate=params&&params.virtualTranslate;params=params||{};var originalParams={};for(var param in params){if((0,_typeof3.default)(params[param])==='object'&&params[param]!==null&&!(params[param].nodeType||params[param]===window||params[param]===document||typeof Dom7!=='undefined'&&params[param]instanceof Dom7||typeof jQuery!=='undefined'&&params[param]instanceof jQuery)){originalParams[param]={};for(var deepParam in params[param]){originalParams[param][deepParam]=params[param][deepParam];}}else{originalParams[param]=params[param];}}for(var def in defaults){if(typeof params[def]==='undefined'){params[def]=defaults[def];}else if((0,_typeof3.default)(params[def])==='object'){for(var deepDef in defaults[def]){if(typeof params[def][deepDef]==='undefined'){params[def][deepDef]=defaults[def][deepDef];}}}}// Swiper
	var s=this;// Params
	s.params=params;s.originalParams=originalParams;// Classname
	s.classNames=[];/*=========================
	          Dom Library and plugins
	          ===========================*/if(typeof $!=='undefined'&&typeof Dom7!=='undefined'){$=Dom7;}if(typeof $==='undefined'){if(typeof Dom7==='undefined'){$=window.Dom7||window.Zepto||window.jQuery;}else{$=Dom7;}if(!$)return;}// Export it to Swiper instance
	s.$=$;/*=========================
	          Breakpoints
	          ===========================*/s.currentBreakpoint=undefined;s.getActiveBreakpoint=function(){//Get breakpoint for window width
	if(!s.params.breakpoints)return false;var breakpoint=false;var points=[],point;for(point in s.params.breakpoints){if(s.params.breakpoints.hasOwnProperty(point)){points.push(point);}}points.sort(function(a,b){return parseInt(a,10)>parseInt(b,10);});for(var i=0;i<points.length;i++){point=points[i];if(point>=window.innerWidth&&!breakpoint){breakpoint=point;}}return breakpoint||'max';};s.setBreakpoint=function(){//Set breakpoint for window width and update parameters
	var breakpoint=s.getActiveBreakpoint();if(breakpoint&&s.currentBreakpoint!==breakpoint){var breakPointsParams=breakpoint in s.params.breakpoints?s.params.breakpoints[breakpoint]:s.originalParams;var needsReLoop=s.params.loop&&breakPointsParams.slidesPerView!==s.params.slidesPerView;for(var param in breakPointsParams){s.params[param]=breakPointsParams[param];}s.currentBreakpoint=breakpoint;if(needsReLoop&&s.destroyLoop){s.reLoop(true);}}};// Set breakpoint on load
	if(s.params.breakpoints){s.setBreakpoint();}/*=========================
	          Preparation - Define Container, Wrapper and Pagination
	          ===========================*/s.container=$(container);if(s.container.length===0)return;if(s.container.length>1){var swipers=[];s.container.each(function(){var container=this;swipers.push(new Swiper(this,params));});return swipers;}// Save instance in container HTML Element and in data
	s.container[0].swiper=s;s.container.data('swiper',s);s.classNames.push('swiper-container-'+s.params.direction);if(s.params.freeMode){s.classNames.push('swiper-container-free-mode');}if(!s.support.flexbox){s.classNames.push('swiper-container-no-flexbox');s.params.slidesPerColumn=1;}if(s.params.autoHeight){s.classNames.push('swiper-container-autoheight');}// Enable slides progress when required
	if(s.params.parallax||s.params.watchSlidesVisibility){s.params.watchSlidesProgress=true;}// Coverflow / 3D
	if(['cube','coverflow','flip'].indexOf(s.params.effect)>=0){if(s.support.transforms3d){s.params.watchSlidesProgress=true;s.classNames.push('swiper-container-3d');}else{s.params.effect='slide';}}if(s.params.effect!=='slide'){s.classNames.push('swiper-container-'+s.params.effect);}if(s.params.effect==='cube'){s.params.resistanceRatio=0;s.params.slidesPerView=1;s.params.slidesPerColumn=1;s.params.slidesPerGroup=1;s.params.centeredSlides=false;s.params.spaceBetween=0;s.params.virtualTranslate=true;s.params.setWrapperSize=false;}if(s.params.effect==='fade'||s.params.effect==='flip'){s.params.slidesPerView=1;s.params.slidesPerColumn=1;s.params.slidesPerGroup=1;s.params.watchSlidesProgress=true;s.params.spaceBetween=0;s.params.setWrapperSize=false;if(typeof initialVirtualTranslate==='undefined'){s.params.virtualTranslate=true;}}// Grab Cursor
	if(s.params.grabCursor&&s.support.touch){s.params.grabCursor=false;}// Wrapper
	s.wrapper=s.container.children('.'+s.params.wrapperClass);// Pagination
	if(s.params.pagination){s.paginationContainer=$(s.params.pagination);if(s.params.uniqueNavElements&&typeof s.params.pagination==='string'&&s.paginationContainer.length>1&&s.container.find(s.params.pagination).length===1){s.paginationContainer=s.container.find(s.params.pagination);}if(s.params.paginationType==='bullets'&&s.params.paginationClickable){s.paginationContainer.addClass('swiper-pagination-clickable');}else{s.params.paginationClickable=false;}s.paginationContainer.addClass('swiper-pagination-'+s.params.paginationType);}// Next/Prev Buttons
	if(s.params.nextButton||s.params.prevButton){if(s.params.nextButton){s.nextButton=$(s.params.nextButton);if(s.params.uniqueNavElements&&typeof s.params.nextButton==='string'&&s.nextButton.length>1&&s.container.find(s.params.nextButton).length===1){s.nextButton=s.container.find(s.params.nextButton);}}if(s.params.prevButton){s.prevButton=$(s.params.prevButton);if(s.params.uniqueNavElements&&typeof s.params.prevButton==='string'&&s.prevButton.length>1&&s.container.find(s.params.prevButton).length===1){s.prevButton=s.container.find(s.params.prevButton);}}}// Is Horizontal
	s.isHorizontal=function(){return s.params.direction==='horizontal';};// s.isH = isH;
	// RTL
	s.rtl=s.isHorizontal()&&(s.container[0].dir.toLowerCase()==='rtl'||s.container.css('direction')==='rtl');if(s.rtl){s.classNames.push('swiper-container-rtl');}// Wrong RTL support
	if(s.rtl){s.wrongRTL=s.wrapper.css('display')==='-webkit-box';}// Columns
	if(s.params.slidesPerColumn>1){s.classNames.push('swiper-container-multirow');}// Check for Android
	if(s.device.android){s.classNames.push('swiper-container-android');}// Add classes
	s.container.addClass(s.classNames.join(' '));// Translate
	s.translate=0;// Progress
	s.progress=0;// Velocity
	s.velocity=0;/*=========================
	          Locks, unlocks
	          ===========================*/s.lockSwipeToNext=function(){s.params.allowSwipeToNext=false;};s.lockSwipeToPrev=function(){s.params.allowSwipeToPrev=false;};s.lockSwipes=function(){s.params.allowSwipeToNext=s.params.allowSwipeToPrev=false;};s.unlockSwipeToNext=function(){s.params.allowSwipeToNext=true;};s.unlockSwipeToPrev=function(){s.params.allowSwipeToPrev=true;};s.unlockSwipes=function(){s.params.allowSwipeToNext=s.params.allowSwipeToPrev=true;};/*=========================
	          Round helper
	          ===========================*/function round(a){return Math.floor(a);}/*=========================
	          Set grab cursor
	          ===========================*/if(s.params.grabCursor){s.container[0].style.cursor='move';s.container[0].style.cursor='-webkit-grab';s.container[0].style.cursor='-moz-grab';s.container[0].style.cursor='grab';}/*=========================
	          Update on Images Ready
	          ===========================*/s.imagesToLoad=[];s.imagesLoaded=0;s.loadImage=function(imgElement,src,srcset,checkForComplete,callback){var image;function onReady(){if(callback)callback();}if(!imgElement.complete||!checkForComplete){if(src){image=new window.Image();image.onload=onReady;image.onerror=onReady;if(srcset){image.srcset=srcset;}if(src){image.src=src;}}else{onReady();}}else{//image already loaded...
	onReady();}};s.preloadImages=function(){s.imagesToLoad=s.container.find('img');function _onReady(){if(typeof s==='undefined'||s===null)return;if(s.imagesLoaded!==undefined)s.imagesLoaded++;if(s.imagesLoaded===s.imagesToLoad.length){if(s.params.updateOnImagesReady)s.update();s.emit('onImagesReady',s);}}for(var i=0;i<s.imagesToLoad.length;i++){s.loadImage(s.imagesToLoad[i],s.imagesToLoad[i].currentSrc||s.imagesToLoad[i].getAttribute('src'),s.imagesToLoad[i].srcset||s.imagesToLoad[i].getAttribute('srcset'),true,_onReady);}};/*=========================
	          Autoplay
	          ===========================*/s.autoplayTimeoutId=undefined;s.autoplaying=false;s.autoplayPaused=false;function autoplay(){s.autoplayTimeoutId=setTimeout(function(){if(s.params.loop){s.fixLoop();s._slideNext();s.emit('onAutoplay',s);}else{if(!s.isEnd){s._slideNext();s.emit('onAutoplay',s);}else{if(!params.autoplayStopOnLast){s._slideTo(0);s.emit('onAutoplay',s);}else{s.stopAutoplay();}}}},s.params.autoplay);}s.startAutoplay=function(){if(typeof s.autoplayTimeoutId!=='undefined')return false;if(!s.params.autoplay)return false;if(s.autoplaying)return false;s.autoplaying=true;s.emit('onAutoplayStart',s);autoplay();};s.stopAutoplay=function(internal){if(!s.autoplayTimeoutId)return;if(s.autoplayTimeoutId)clearTimeout(s.autoplayTimeoutId);s.autoplaying=false;s.autoplayTimeoutId=undefined;s.emit('onAutoplayStop',s);};s.pauseAutoplay=function(speed){if(s.autoplayPaused)return;if(s.autoplayTimeoutId)clearTimeout(s.autoplayTimeoutId);s.autoplayPaused=true;if(speed===0){s.autoplayPaused=false;autoplay();}else{s.wrapper.transitionEnd(function(){if(!s)return;s.autoplayPaused=false;if(!s.autoplaying){s.stopAutoplay();}else{autoplay();}});}};/*=========================
	          Min/Max Translate
	          ===========================*/s.minTranslate=function(){return-s.snapGrid[0];};s.maxTranslate=function(){return-s.snapGrid[s.snapGrid.length-1];};/*=========================
	          Slider/slides sizes
	          ===========================*/s.updateAutoHeight=function(){// Update Height
	var slide=s.slides.eq(s.activeIndex)[0];if(typeof slide!=='undefined'){var newHeight=slide.offsetHeight;if(newHeight)s.wrapper.css('height',newHeight+'px');}};s.updateContainerSize=function(){var width,height;if(typeof s.params.width!=='undefined'){width=s.params.width;}else{width=s.container[0].clientWidth;}if(typeof s.params.height!=='undefined'){height=s.params.height;}else{height=s.container[0].clientHeight;}if(width===0&&s.isHorizontal()||height===0&&!s.isHorizontal()){return;}//Subtract paddings
	width=width-parseInt(s.container.css('padding-left'),10)-parseInt(s.container.css('padding-right'),10);height=height-parseInt(s.container.css('padding-top'),10)-parseInt(s.container.css('padding-bottom'),10);// Store values
	s.width=width;s.height=height;s.size=s.isHorizontal()?s.width:s.height;};s.updateSlidesSize=function(){s.slides=s.wrapper.children('.'+s.params.slideClass);s.snapGrid=[];s.slidesGrid=[];s.slidesSizesGrid=[];var spaceBetween=s.params.spaceBetween,slidePosition=-s.params.slidesOffsetBefore,i,prevSlideSize=0,index=0;if(typeof s.size==='undefined')return;if(typeof spaceBetween==='string'&&spaceBetween.indexOf('%')>=0){spaceBetween=parseFloat(spaceBetween.replace('%',''))/100*s.size;}s.virtualSize=-spaceBetween;// reset margins
	if(s.rtl)s.slides.css({marginLeft:'',marginTop:''});else s.slides.css({marginRight:'',marginBottom:''});var slidesNumberEvenToRows;if(s.params.slidesPerColumn>1){if(Math.floor(s.slides.length/s.params.slidesPerColumn)===s.slides.length/s.params.slidesPerColumn){slidesNumberEvenToRows=s.slides.length;}else{slidesNumberEvenToRows=Math.ceil(s.slides.length/s.params.slidesPerColumn)*s.params.slidesPerColumn;}if(s.params.slidesPerView!=='auto'&&s.params.slidesPerColumnFill==='row'){slidesNumberEvenToRows=Math.max(slidesNumberEvenToRows,s.params.slidesPerView*s.params.slidesPerColumn);}}// Calc slides
	var slideSize;var slidesPerColumn=s.params.slidesPerColumn;var slidesPerRow=slidesNumberEvenToRows/slidesPerColumn;var numFullColumns=slidesPerRow-(s.params.slidesPerColumn*slidesPerRow-s.slides.length);for(i=0;i<s.slides.length;i++){slideSize=0;var slide=s.slides.eq(i);if(s.params.slidesPerColumn>1){// Set slides order
	var newSlideOrderIndex;var column,row;if(s.params.slidesPerColumnFill==='column'){column=Math.floor(i/slidesPerColumn);row=i-column*slidesPerColumn;if(column>numFullColumns||column===numFullColumns&&row===slidesPerColumn-1){if(++row>=slidesPerColumn){row=0;column++;}}newSlideOrderIndex=column+row*slidesNumberEvenToRows/slidesPerColumn;slide.css({'-webkit-box-ordinal-group':newSlideOrderIndex,'-moz-box-ordinal-group':newSlideOrderIndex,'-ms-flex-order':newSlideOrderIndex,'-webkit-order':newSlideOrderIndex,'order':newSlideOrderIndex});}else{row=Math.floor(i/slidesPerRow);column=i-row*slidesPerRow;}slide.css({'margin-top':row!==0&&s.params.spaceBetween&&s.params.spaceBetween+'px'}).attr('data-swiper-column',column).attr('data-swiper-row',row);}if(slide.css('display')==='none')continue;if(s.params.slidesPerView==='auto'){slideSize=s.isHorizontal()?slide.outerWidth(true):slide.outerHeight(true);if(s.params.roundLengths)slideSize=round(slideSize);}else{slideSize=(s.size-(s.params.slidesPerView-1)*spaceBetween)/s.params.slidesPerView;if(s.params.roundLengths)slideSize=round(slideSize);if(s.isHorizontal()){s.slides[i].style.width=slideSize+'px';}else{s.slides[i].style.height=slideSize+'px';}}s.slides[i].swiperSlideSize=slideSize;s.slidesSizesGrid.push(slideSize);if(s.params.centeredSlides){slidePosition=slidePosition+slideSize/2+prevSlideSize/2+spaceBetween;if(i===0)slidePosition=slidePosition-s.size/2-spaceBetween;if(Math.abs(slidePosition)<1/1000)slidePosition=0;if(index%s.params.slidesPerGroup===0)s.snapGrid.push(slidePosition);s.slidesGrid.push(slidePosition);}else{if(index%s.params.slidesPerGroup===0)s.snapGrid.push(slidePosition);s.slidesGrid.push(slidePosition);slidePosition=slidePosition+slideSize+spaceBetween;}s.virtualSize+=slideSize+spaceBetween;prevSlideSize=slideSize;index++;}s.virtualSize=Math.max(s.virtualSize,s.size)+s.params.slidesOffsetAfter;var newSlidesGrid;if(s.rtl&&s.wrongRTL&&(s.params.effect==='slide'||s.params.effect==='coverflow')){s.wrapper.css({width:s.virtualSize+s.params.spaceBetween+'px'});}if(!s.support.flexbox||s.params.setWrapperSize){if(s.isHorizontal())s.wrapper.css({width:s.virtualSize+s.params.spaceBetween+'px'});else s.wrapper.css({height:s.virtualSize+s.params.spaceBetween+'px'});}if(s.params.slidesPerColumn>1){s.virtualSize=(slideSize+s.params.spaceBetween)*slidesNumberEvenToRows;s.virtualSize=Math.ceil(s.virtualSize/s.params.slidesPerColumn)-s.params.spaceBetween;s.wrapper.css({width:s.virtualSize+s.params.spaceBetween+'px'});if(s.params.centeredSlides){newSlidesGrid=[];for(i=0;i<s.snapGrid.length;i++){if(s.snapGrid[i]<s.virtualSize+s.snapGrid[0])newSlidesGrid.push(s.snapGrid[i]);}s.snapGrid=newSlidesGrid;}}// Remove last grid elements depending on width
	if(!s.params.centeredSlides){newSlidesGrid=[];for(i=0;i<s.snapGrid.length;i++){if(s.snapGrid[i]<=s.virtualSize-s.size){newSlidesGrid.push(s.snapGrid[i]);}}s.snapGrid=newSlidesGrid;if(Math.floor(s.virtualSize-s.size)-Math.floor(s.snapGrid[s.snapGrid.length-1])>1){s.snapGrid.push(s.virtualSize-s.size);}}if(s.snapGrid.length===0)s.snapGrid=[0];if(s.params.spaceBetween!==0){if(s.isHorizontal()){if(s.rtl)s.slides.css({marginLeft:spaceBetween+'px'});else s.slides.css({marginRight:spaceBetween+'px'});}else s.slides.css({marginBottom:spaceBetween+'px'});}if(s.params.watchSlidesProgress){s.updateSlidesOffset();}};s.updateSlidesOffset=function(){for(var i=0;i<s.slides.length;i++){s.slides[i].swiperSlideOffset=s.isHorizontal()?s.slides[i].offsetLeft:s.slides[i].offsetTop;}};/*=========================
	          Slider/slides progress
	          ===========================*/s.updateSlidesProgress=function(translate){if(typeof translate==='undefined'){translate=s.translate||0;}if(s.slides.length===0)return;if(typeof s.slides[0].swiperSlideOffset==='undefined')s.updateSlidesOffset();var offsetCenter=-translate;if(s.rtl)offsetCenter=translate;// Visible Slides
	s.slides.removeClass(s.params.slideVisibleClass);for(var i=0;i<s.slides.length;i++){var slide=s.slides[i];var slideProgress=(offsetCenter-slide.swiperSlideOffset)/(slide.swiperSlideSize+s.params.spaceBetween);if(s.params.watchSlidesVisibility){var slideBefore=-(offsetCenter-slide.swiperSlideOffset);var slideAfter=slideBefore+s.slidesSizesGrid[i];var isVisible=slideBefore>=0&&slideBefore<s.size||slideAfter>0&&slideAfter<=s.size||slideBefore<=0&&slideAfter>=s.size;if(isVisible){s.slides.eq(i).addClass(s.params.slideVisibleClass);}}slide.progress=s.rtl?-slideProgress:slideProgress;}};s.updateProgress=function(translate){if(typeof translate==='undefined'){translate=s.translate||0;}var translatesDiff=s.maxTranslate()-s.minTranslate();var wasBeginning=s.isBeginning;var wasEnd=s.isEnd;if(translatesDiff===0){s.progress=0;s.isBeginning=s.isEnd=true;}else{s.progress=(translate-s.minTranslate())/translatesDiff;s.isBeginning=s.progress<=0;s.isEnd=s.progress>=1;}if(s.isBeginning&&!wasBeginning)s.emit('onReachBeginning',s);if(s.isEnd&&!wasEnd)s.emit('onReachEnd',s);if(s.params.watchSlidesProgress)s.updateSlidesProgress(translate);s.emit('onProgress',s,s.progress);};s.updateActiveIndex=function(){var translate=s.rtl?s.translate:-s.translate;var newActiveIndex,i,snapIndex;for(i=0;i<s.slidesGrid.length;i++){if(typeof s.slidesGrid[i+1]!=='undefined'){if(translate>=s.slidesGrid[i]&&translate<s.slidesGrid[i+1]-(s.slidesGrid[i+1]-s.slidesGrid[i])/2){newActiveIndex=i;}else if(translate>=s.slidesGrid[i]&&translate<s.slidesGrid[i+1]){newActiveIndex=i+1;}}else{if(translate>=s.slidesGrid[i]){newActiveIndex=i;}}}// Normalize slideIndex
	if(newActiveIndex<0||typeof newActiveIndex==='undefined')newActiveIndex=0;// for (i = 0; i < s.slidesGrid.length; i++) {
	// if (- translate >= s.slidesGrid[i]) {
	// newActiveIndex = i;
	// }
	// }
	snapIndex=Math.floor(newActiveIndex/s.params.slidesPerGroup);if(snapIndex>=s.snapGrid.length)snapIndex=s.snapGrid.length-1;if(newActiveIndex===s.activeIndex){return;}s.snapIndex=snapIndex;s.previousIndex=s.activeIndex;s.activeIndex=newActiveIndex;s.updateClasses();};/*=========================
	          Classes
	          ===========================*/s.updateClasses=function(){s.slides.removeClass(s.params.slideActiveClass+' '+s.params.slideNextClass+' '+s.params.slidePrevClass);var activeSlide=s.slides.eq(s.activeIndex);// Active classes
	activeSlide.addClass(s.params.slideActiveClass);// Next Slide
	var nextSlide=activeSlide.next('.'+s.params.slideClass).addClass(s.params.slideNextClass);if(s.params.loop&&nextSlide.length===0){s.slides.eq(0).addClass(s.params.slideNextClass);}// Prev Slide
	var prevSlide=activeSlide.prev('.'+s.params.slideClass).addClass(s.params.slidePrevClass);if(s.params.loop&&prevSlide.length===0){s.slides.eq(-1).addClass(s.params.slidePrevClass);}// Pagination
	if(s.paginationContainer&&s.paginationContainer.length>0){// Current/Total
	var current,total=s.params.loop?Math.ceil((s.slides.length-s.loopedSlides*2)/s.params.slidesPerGroup):s.snapGrid.length;if(s.params.loop){current=Math.ceil((s.activeIndex-s.loopedSlides)/s.params.slidesPerGroup);if(current>s.slides.length-1-s.loopedSlides*2){current=current-(s.slides.length-s.loopedSlides*2);}if(current>total-1)current=current-total;if(current<0&&s.params.paginationType!=='bullets')current=total+current;}else{if(typeof s.snapIndex!=='undefined'){current=s.snapIndex;}else{current=s.activeIndex||0;}}// Types
	if(s.params.paginationType==='bullets'&&s.bullets&&s.bullets.length>0){s.bullets.removeClass(s.params.bulletActiveClass);if(s.paginationContainer.length>1){s.bullets.each(function(){if($(this).index()===current)$(this).addClass(s.params.bulletActiveClass);});}else{s.bullets.eq(current).addClass(s.params.bulletActiveClass);}}if(s.params.paginationType==='fraction'){s.paginationContainer.find('.'+s.params.paginationCurrentClass).text(current+1);s.paginationContainer.find('.'+s.params.paginationTotalClass).text(total);}if(s.params.paginationType==='progress'){var scale=(current+1)/total,scaleX=scale,scaleY=1;if(!s.isHorizontal()){scaleY=scale;scaleX=1;}s.paginationContainer.find('.'+s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX('+scaleX+') scaleY('+scaleY+')').transition(s.params.speed);}if(s.params.paginationType==='custom'&&s.params.paginationCustomRender){s.paginationContainer.html(s.params.paginationCustomRender(s,current+1,total));s.emit('onPaginationRendered',s,s.paginationContainer[0]);}}// Next/active buttons
	if(!s.params.loop){if(s.params.prevButton&&s.prevButton&&s.prevButton.length>0){if(s.isBeginning){s.prevButton.addClass(s.params.buttonDisabledClass);if(s.params.a11y&&s.a11y)s.a11y.disable(s.prevButton);}else{s.prevButton.removeClass(s.params.buttonDisabledClass);if(s.params.a11y&&s.a11y)s.a11y.enable(s.prevButton);}}if(s.params.nextButton&&s.nextButton&&s.nextButton.length>0){if(s.isEnd){s.nextButton.addClass(s.params.buttonDisabledClass);if(s.params.a11y&&s.a11y)s.a11y.disable(s.nextButton);}else{s.nextButton.removeClass(s.params.buttonDisabledClass);if(s.params.a11y&&s.a11y)s.a11y.enable(s.nextButton);}}}};/*=========================
	          Pagination
	          ===========================*/s.updatePagination=function(){if(!s.params.pagination)return;if(s.paginationContainer&&s.paginationContainer.length>0){var paginationHTML='';if(s.params.paginationType==='bullets'){var numberOfBullets=s.params.loop?Math.ceil((s.slides.length-s.loopedSlides*2)/s.params.slidesPerGroup):s.snapGrid.length;for(var i=0;i<numberOfBullets;i++){if(s.params.paginationBulletRender){paginationHTML+=s.params.paginationBulletRender(i,s.params.bulletClass);}else{paginationHTML+='<'+s.params.paginationElement+' class="'+s.params.bulletClass+'"></'+s.params.paginationElement+'>';}}s.paginationContainer.html(paginationHTML);s.bullets=s.paginationContainer.find('.'+s.params.bulletClass);if(s.params.paginationClickable&&s.params.a11y&&s.a11y){s.a11y.initPagination();}}if(s.params.paginationType==='fraction'){if(s.params.paginationFractionRender){paginationHTML=s.params.paginationFractionRender(s,s.params.paginationCurrentClass,s.params.paginationTotalClass);}else{paginationHTML='<span class="'+s.params.paginationCurrentClass+'"></span>'+' / '+'<span class="'+s.params.paginationTotalClass+'"></span>';}s.paginationContainer.html(paginationHTML);}if(s.params.paginationType==='progress'){if(s.params.paginationProgressRender){paginationHTML=s.params.paginationProgressRender(s,s.params.paginationProgressbarClass);}else{paginationHTML='<span class="'+s.params.paginationProgressbarClass+'"></span>';}s.paginationContainer.html(paginationHTML);}if(s.params.paginationType!=='custom'){s.emit('onPaginationRendered',s,s.paginationContainer[0]);}}};/*=========================
	          Common update method
	          ===========================*/s.update=function(updateTranslate){s.updateContainerSize();s.updateSlidesSize();s.updateProgress();s.updatePagination();s.updateClasses();if(s.params.scrollbar&&s.scrollbar){s.scrollbar.set();}function forceSetTranslate(){newTranslate=Math.min(Math.max(s.translate,s.maxTranslate()),s.minTranslate());s.setWrapperTranslate(newTranslate);s.updateActiveIndex();s.updateClasses();}if(updateTranslate){var translated,newTranslate;if(s.controller&&s.controller.spline){s.controller.spline=undefined;}if(s.params.freeMode){forceSetTranslate();if(s.params.autoHeight){s.updateAutoHeight();}}else{if((s.params.slidesPerView==='auto'||s.params.slidesPerView>1)&&s.isEnd&&!s.params.centeredSlides){translated=s.slideTo(s.slides.length-1,0,false,true);}else{translated=s.slideTo(s.activeIndex,0,false,true);}if(!translated){forceSetTranslate();}}}else if(s.params.autoHeight){s.updateAutoHeight();}};/*=========================
	          Resize Handler
	          ===========================*/s.onResize=function(forceUpdatePagination){//Breakpoints
	if(s.params.breakpoints){s.setBreakpoint();}// Disable locks on resize
	var allowSwipeToPrev=s.params.allowSwipeToPrev;var allowSwipeToNext=s.params.allowSwipeToNext;s.params.allowSwipeToPrev=s.params.allowSwipeToNext=true;s.updateContainerSize();s.updateSlidesSize();if(s.params.slidesPerView==='auto'||s.params.freeMode||forceUpdatePagination)s.updatePagination();if(s.params.scrollbar&&s.scrollbar){s.scrollbar.set();}if(s.controller&&s.controller.spline){s.controller.spline=undefined;}var slideChangedBySlideTo=false;if(s.params.freeMode){var newTranslate=Math.min(Math.max(s.translate,s.maxTranslate()),s.minTranslate());s.setWrapperTranslate(newTranslate);s.updateActiveIndex();s.updateClasses();if(s.params.autoHeight){s.updateAutoHeight();}}else{s.updateClasses();if((s.params.slidesPerView==='auto'||s.params.slidesPerView>1)&&s.isEnd&&!s.params.centeredSlides){slideChangedBySlideTo=s.slideTo(s.slides.length-1,0,false,true);}else{slideChangedBySlideTo=s.slideTo(s.activeIndex,0,false,true);}}if(s.params.lazyLoading&&!slideChangedBySlideTo&&s.lazy){s.lazy.load();}// Return locks after resize
	s.params.allowSwipeToPrev=allowSwipeToPrev;s.params.allowSwipeToNext=allowSwipeToNext;};/*=========================
	          Events
	          ===========================*///Define Touch Events
	var desktopEvents=['mousedown','mousemove','mouseup'];if(window.navigator.pointerEnabled)desktopEvents=['pointerdown','pointermove','pointerup'];else if(window.navigator.msPointerEnabled)desktopEvents=['MSPointerDown','MSPointerMove','MSPointerUp'];s.touchEvents={start:s.support.touch||!s.params.simulateTouch?'touchstart':desktopEvents[0],move:s.support.touch||!s.params.simulateTouch?'touchmove':desktopEvents[1],end:s.support.touch||!s.params.simulateTouch?'touchend':desktopEvents[2]};// WP8 Touch Events Fix
	if(window.navigator.pointerEnabled||window.navigator.msPointerEnabled){(s.params.touchEventsTarget==='container'?s.container:s.wrapper).addClass('swiper-wp8-'+s.params.direction);}// Attach/detach events
	s.initEvents=function(detach){var actionDom=detach?'off':'on';var action=detach?'removeEventListener':'addEventListener';var touchEventsTarget=s.params.touchEventsTarget==='container'?s.container[0]:s.wrapper[0];var target=s.support.touch?touchEventsTarget:document;var moveCapture=s.params.nested?true:false;//Touch Events
	if(s.browser.ie){touchEventsTarget[action](s.touchEvents.start,s.onTouchStart,false);target[action](s.touchEvents.move,s.onTouchMove,moveCapture);target[action](s.touchEvents.end,s.onTouchEnd,false);}else{if(s.support.touch){touchEventsTarget[action](s.touchEvents.start,s.onTouchStart,false);touchEventsTarget[action](s.touchEvents.move,s.onTouchMove,moveCapture);touchEventsTarget[action](s.touchEvents.end,s.onTouchEnd,false);}if(params.simulateTouch&&!s.device.ios&&!s.device.android){touchEventsTarget[action]('mousedown',s.onTouchStart,false);document[action]('mousemove',s.onTouchMove,moveCapture);document[action]('mouseup',s.onTouchEnd,false);}}window[action]('resize',s.onResize);// Next, Prev, Index
	if(s.params.nextButton&&s.nextButton&&s.nextButton.length>0){s.nextButton[actionDom]('click',s.onClickNext);if(s.params.a11y&&s.a11y)s.nextButton[actionDom]('keydown',s.a11y.onEnterKey);}if(s.params.prevButton&&s.prevButton&&s.prevButton.length>0){s.prevButton[actionDom]('click',s.onClickPrev);if(s.params.a11y&&s.a11y)s.prevButton[actionDom]('keydown',s.a11y.onEnterKey);}if(s.params.pagination&&s.params.paginationClickable){s.paginationContainer[actionDom]('click','.'+s.params.bulletClass,s.onClickIndex);if(s.params.a11y&&s.a11y)s.paginationContainer[actionDom]('keydown','.'+s.params.bulletClass,s.a11y.onEnterKey);}// Prevent Links Clicks
	if(s.params.preventClicks||s.params.preventClicksPropagation)touchEventsTarget[action]('click',s.preventClicks,true);};s.attachEvents=function(){s.initEvents();};s.detachEvents=function(){s.initEvents(true);};/*=========================
	          Handle Clicks
	          ===========================*/// Prevent Clicks
	s.allowClick=true;s.preventClicks=function(e){if(!s.allowClick){if(s.params.preventClicks)e.preventDefault();if(s.params.preventClicksPropagation&&s.animating){e.stopPropagation();e.stopImmediatePropagation();}}};// Clicks
	s.onClickNext=function(e){e.preventDefault();if(s.isEnd&&!s.params.loop)return;s.slideNext();};s.onClickPrev=function(e){e.preventDefault();if(s.isBeginning&&!s.params.loop)return;s.slidePrev();};s.onClickIndex=function(e){e.preventDefault();var index=$(this).index()*s.params.slidesPerGroup;if(s.params.loop)index=index+s.loopedSlides;s.slideTo(index);};/*=========================
	          Handle Touches
	          ===========================*/function findElementInEvent(e,selector){var el=$(e.target);if(!el.is(selector)){if(typeof selector==='string'){el=el.parents(selector);}else if(selector.nodeType){var found;el.parents().each(function(index,_el){if(_el===selector)found=selector;});if(!found)return undefined;else return selector;}}if(el.length===0){return undefined;}return el[0];}s.updateClickedSlide=function(e){var slide=findElementInEvent(e,'.'+s.params.slideClass);var slideFound=false;if(slide){for(var i=0;i<s.slides.length;i++){if(s.slides[i]===slide)slideFound=true;}}if(slide&&slideFound){s.clickedSlide=slide;s.clickedIndex=$(slide).index();}else{s.clickedSlide=undefined;s.clickedIndex=undefined;return;}if(s.params.slideToClickedSlide&&s.clickedIndex!==undefined&&s.clickedIndex!==s.activeIndex){var slideToIndex=s.clickedIndex,realIndex,duplicatedSlides;if(s.params.loop){if(s.animating)return;realIndex=$(s.clickedSlide).attr('data-swiper-slide-index');if(s.params.centeredSlides){if(slideToIndex<s.loopedSlides-s.params.slidesPerView/2||slideToIndex>s.slides.length-s.loopedSlides+s.params.slidesPerView/2){s.fixLoop();slideToIndex=s.wrapper.children('.'+s.params.slideClass+'[data-swiper-slide-index="'+realIndex+'"]:not(.swiper-slide-duplicate)').eq(0).index();setTimeout(function(){s.slideTo(slideToIndex);},0);}else{s.slideTo(slideToIndex);}}else{if(slideToIndex>s.slides.length-s.params.slidesPerView){s.fixLoop();slideToIndex=s.wrapper.children('.'+s.params.slideClass+'[data-swiper-slide-index="'+realIndex+'"]:not(.swiper-slide-duplicate)').eq(0).index();setTimeout(function(){s.slideTo(slideToIndex);},0);}else{s.slideTo(slideToIndex);}}}else{s.slideTo(slideToIndex);}}};var isTouched,isMoved,allowTouchCallbacks,touchStartTime,isScrolling,currentTranslate,startTranslate,allowThresholdMove,// Form elements to match
	formElements='input, select, textarea, button',// Last click time
	lastClickTime=Date.now(),clickTimeout,//Velocities
	velocities=[],allowMomentumBounce;// Animating Flag
	s.animating=false;// Touches information
	s.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};// Touch handlers
	var isTouchEvent,startMoving;s.onTouchStart=function(e){if(e.originalEvent)e=e.originalEvent;isTouchEvent=e.type==='touchstart';if(!isTouchEvent&&'which'in e&&e.which===3)return;if(s.params.noSwiping&&findElementInEvent(e,'.'+s.params.noSwipingClass)){s.allowClick=true;return;}if(s.params.swipeHandler){if(!findElementInEvent(e,s.params.swipeHandler))return;}var startX=s.touches.currentX=e.type==='touchstart'?e.targetTouches[0].pageX:e.pageX;var startY=s.touches.currentY=e.type==='touchstart'?e.targetTouches[0].pageY:e.pageY;// Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
	if(s.device.ios&&s.params.iOSEdgeSwipeDetection&&startX<=s.params.iOSEdgeSwipeThreshold){return;}isTouched=true;isMoved=false;allowTouchCallbacks=true;isScrolling=undefined;startMoving=undefined;s.touches.startX=startX;s.touches.startY=startY;touchStartTime=Date.now();s.allowClick=true;s.updateContainerSize();s.swipeDirection=undefined;if(s.params.threshold>0)allowThresholdMove=false;if(e.type!=='touchstart'){var preventDefault=true;if($(e.target).is(formElements))preventDefault=false;if(document.activeElement&&$(document.activeElement).is(formElements)){document.activeElement.blur();}if(preventDefault){e.preventDefault();}}s.emit('onTouchStart',s,e);};s.onTouchMove=function(e){if(e.originalEvent)e=e.originalEvent;if(isTouchEvent&&e.type==='mousemove')return;if(e.preventedByNestedSwiper){s.touches.startX=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;s.touches.startY=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;return;}if(s.params.onlyExternal){// isMoved = true;
	s.allowClick=false;if(isTouched){s.touches.startX=s.touches.currentX=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;s.touches.startY=s.touches.currentY=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;touchStartTime=Date.now();}return;}if(isTouchEvent&&document.activeElement){if(e.target===document.activeElement&&$(e.target).is(formElements)){isMoved=true;s.allowClick=false;return;}}if(allowTouchCallbacks){s.emit('onTouchMove',s,e);}if(e.targetTouches&&e.targetTouches.length>1)return;s.touches.currentX=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;s.touches.currentY=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;if(typeof isScrolling==='undefined'){var touchAngle=Math.atan2(Math.abs(s.touches.currentY-s.touches.startY),Math.abs(s.touches.currentX-s.touches.startX))*180/Math.PI;isScrolling=s.isHorizontal()?touchAngle>s.params.touchAngle:90-touchAngle>s.params.touchAngle;}if(isScrolling){s.emit('onTouchMoveOpposite',s,e);}if(typeof startMoving==='undefined'&&s.browser.ieTouch){if(s.touches.currentX!==s.touches.startX||s.touches.currentY!==s.touches.startY){startMoving=true;}}if(!isTouched)return;if(isScrolling){isTouched=false;return;}if(!startMoving&&s.browser.ieTouch){return;}s.allowClick=false;s.emit('onSliderMove',s,e);e.preventDefault();if(s.params.touchMoveStopPropagation&&!s.params.nested){e.stopPropagation();}if(!isMoved){if(params.loop){s.fixLoop();}startTranslate=s.getWrapperTranslate();s.setWrapperTransition(0);if(s.animating){s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');}if(s.params.autoplay&&s.autoplaying){if(s.params.autoplayDisableOnInteraction){s.stopAutoplay();}else{s.pauseAutoplay();}}allowMomentumBounce=false;//Grab Cursor
	if(s.params.grabCursor){s.container[0].style.cursor='move';s.container[0].style.cursor='-webkit-grabbing';s.container[0].style.cursor='-moz-grabbin';s.container[0].style.cursor='grabbing';}}isMoved=true;var diff=s.touches.diff=s.isHorizontal()?s.touches.currentX-s.touches.startX:s.touches.currentY-s.touches.startY;diff=diff*s.params.touchRatio;if(s.rtl)diff=-diff;s.swipeDirection=diff>0?'prev':'next';currentTranslate=diff+startTranslate;var disableParentSwiper=true;if(diff>0&&currentTranslate>s.minTranslate()){disableParentSwiper=false;if(s.params.resistance)currentTranslate=s.minTranslate()-1+Math.pow(-s.minTranslate()+startTranslate+diff,s.params.resistanceRatio);}else if(diff<0&&currentTranslate<s.maxTranslate()){disableParentSwiper=false;if(s.params.resistance)currentTranslate=s.maxTranslate()+1-Math.pow(s.maxTranslate()-startTranslate-diff,s.params.resistanceRatio);}if(disableParentSwiper){e.preventedByNestedSwiper=true;}// Directions locks
	if(!s.params.allowSwipeToNext&&s.swipeDirection==='next'&&currentTranslate<startTranslate){currentTranslate=startTranslate;}if(!s.params.allowSwipeToPrev&&s.swipeDirection==='prev'&&currentTranslate>startTranslate){currentTranslate=startTranslate;}if(!s.params.followFinger)return;// Threshold
	if(s.params.threshold>0){if(Math.abs(diff)>s.params.threshold||allowThresholdMove){if(!allowThresholdMove){allowThresholdMove=true;s.touches.startX=s.touches.currentX;s.touches.startY=s.touches.currentY;currentTranslate=startTranslate;s.touches.diff=s.isHorizontal()?s.touches.currentX-s.touches.startX:s.touches.currentY-s.touches.startY;return;}}else{currentTranslate=startTranslate;return;}}// Update active index in free mode
	if(s.params.freeMode||s.params.watchSlidesProgress){s.updateActiveIndex();}if(s.params.freeMode){//Velocity
	if(velocities.length===0){velocities.push({position:s.touches[s.isHorizontal()?'startX':'startY'],time:touchStartTime});}velocities.push({position:s.touches[s.isHorizontal()?'currentX':'currentY'],time:new window.Date().getTime()});}// Update progress
	s.updateProgress(currentTranslate);// Update translate
	s.setWrapperTranslate(currentTranslate);};s.onTouchEnd=function(e){if(e.originalEvent)e=e.originalEvent;if(allowTouchCallbacks){s.emit('onTouchEnd',s,e);}allowTouchCallbacks=false;if(!isTouched)return;//Return Grab Cursor
	if(s.params.grabCursor&&isMoved&&isTouched){s.container[0].style.cursor='move';s.container[0].style.cursor='-webkit-grab';s.container[0].style.cursor='-moz-grab';s.container[0].style.cursor='grab';}// Time diff
	var touchEndTime=Date.now();var timeDiff=touchEndTime-touchStartTime;// Tap, doubleTap, Click
	if(s.allowClick){s.updateClickedSlide(e);s.emit('onTap',s,e);if(timeDiff<300&&touchEndTime-lastClickTime>300){if(clickTimeout)clearTimeout(clickTimeout);clickTimeout=setTimeout(function(){if(!s)return;if(s.params.paginationHide&&s.paginationContainer.length>0&&!$(e.target).hasClass(s.params.bulletClass)){s.paginationContainer.toggleClass(s.params.paginationHiddenClass);}s.emit('onClick',s,e);},300);}if(timeDiff<300&&touchEndTime-lastClickTime<300){if(clickTimeout)clearTimeout(clickTimeout);s.emit('onDoubleTap',s,e);}}lastClickTime=Date.now();setTimeout(function(){if(s)s.allowClick=true;},0);if(!isTouched||!isMoved||!s.swipeDirection||s.touches.diff===0||currentTranslate===startTranslate){isTouched=isMoved=false;return;}isTouched=isMoved=false;var currentPos;if(s.params.followFinger){currentPos=s.rtl?s.translate:-s.translate;}else{currentPos=-currentTranslate;}if(s.params.freeMode){if(currentPos<-s.minTranslate()){s.slideTo(s.activeIndex);return;}else if(currentPos>-s.maxTranslate()){if(s.slides.length<s.snapGrid.length){s.slideTo(s.snapGrid.length-1);}else{s.slideTo(s.slides.length-1);}return;}if(s.params.freeModeMomentum){if(velocities.length>1){var lastMoveEvent=velocities.pop(),velocityEvent=velocities.pop();var distance=lastMoveEvent.position-velocityEvent.position;var time=lastMoveEvent.time-velocityEvent.time;s.velocity=distance/time;s.velocity=s.velocity/2;if(Math.abs(s.velocity)<s.params.freeModeMinimumVelocity){s.velocity=0;}// this implies that the user stopped moving a finger then released.
	// There would be no events with distance zero, so the last event is stale.
	if(time>150||new window.Date().getTime()-lastMoveEvent.time>300){s.velocity=0;}}else{s.velocity=0;}velocities.length=0;var momentumDuration=1000*s.params.freeModeMomentumRatio;var momentumDistance=s.velocity*momentumDuration;var newPosition=s.translate+momentumDistance;if(s.rtl)newPosition=-newPosition;var doBounce=false;var afterBouncePosition;var bounceAmount=Math.abs(s.velocity)*20*s.params.freeModeMomentumBounceRatio;if(newPosition<s.maxTranslate()){if(s.params.freeModeMomentumBounce){if(newPosition+s.maxTranslate()<-bounceAmount){newPosition=s.maxTranslate()-bounceAmount;}afterBouncePosition=s.maxTranslate();doBounce=true;allowMomentumBounce=true;}else{newPosition=s.maxTranslate();}}else if(newPosition>s.minTranslate()){if(s.params.freeModeMomentumBounce){if(newPosition-s.minTranslate()>bounceAmount){newPosition=s.minTranslate()+bounceAmount;}afterBouncePosition=s.minTranslate();doBounce=true;allowMomentumBounce=true;}else{newPosition=s.minTranslate();}}else if(s.params.freeModeSticky){var j=0,nextSlide;for(j=0;j<s.snapGrid.length;j+=1){if(s.snapGrid[j]>-newPosition){nextSlide=j;break;}}if(Math.abs(s.snapGrid[nextSlide]-newPosition)<Math.abs(s.snapGrid[nextSlide-1]-newPosition)||s.swipeDirection==='next'){newPosition=s.snapGrid[nextSlide];}else{newPosition=s.snapGrid[nextSlide-1];}if(!s.rtl)newPosition=-newPosition;}//Fix duration
	if(s.velocity!==0){if(s.rtl){momentumDuration=Math.abs((-newPosition-s.translate)/s.velocity);}else{momentumDuration=Math.abs((newPosition-s.translate)/s.velocity);}}else if(s.params.freeModeSticky){s.slideReset();return;}if(s.params.freeModeMomentumBounce&&doBounce){s.updateProgress(afterBouncePosition);s.setWrapperTransition(momentumDuration);s.setWrapperTranslate(newPosition);s.onTransitionStart();s.animating=true;s.wrapper.transitionEnd(function(){if(!s||!allowMomentumBounce)return;s.emit('onMomentumBounce',s);s.setWrapperTransition(s.params.speed);s.setWrapperTranslate(afterBouncePosition);s.wrapper.transitionEnd(function(){if(!s)return;s.onTransitionEnd();});});}else if(s.velocity){s.updateProgress(newPosition);s.setWrapperTransition(momentumDuration);s.setWrapperTranslate(newPosition);s.onTransitionStart();if(!s.animating){s.animating=true;s.wrapper.transitionEnd(function(){if(!s)return;s.onTransitionEnd();});}}else{s.updateProgress(newPosition);}s.updateActiveIndex();}if(!s.params.freeModeMomentum||timeDiff>=s.params.longSwipesMs){s.updateProgress();s.updateActiveIndex();}return;}// Find current slide
	var i,stopIndex=0,groupSize=s.slidesSizesGrid[0];for(i=0;i<s.slidesGrid.length;i+=s.params.slidesPerGroup){if(typeof s.slidesGrid[i+s.params.slidesPerGroup]!=='undefined'){if(currentPos>=s.slidesGrid[i]&&currentPos<s.slidesGrid[i+s.params.slidesPerGroup]){stopIndex=i;groupSize=s.slidesGrid[i+s.params.slidesPerGroup]-s.slidesGrid[i];}}else{if(currentPos>=s.slidesGrid[i]){stopIndex=i;groupSize=s.slidesGrid[s.slidesGrid.length-1]-s.slidesGrid[s.slidesGrid.length-2];}}}// Find current slide size
	var ratio=(currentPos-s.slidesGrid[stopIndex])/groupSize;if(timeDiff>s.params.longSwipesMs){// Long touches
	if(!s.params.longSwipes){s.slideTo(s.activeIndex);return;}if(s.swipeDirection==='next'){if(ratio>=s.params.longSwipesRatio)s.slideTo(stopIndex+s.params.slidesPerGroup);else s.slideTo(stopIndex);}if(s.swipeDirection==='prev'){if(ratio>1-s.params.longSwipesRatio)s.slideTo(stopIndex+s.params.slidesPerGroup);else s.slideTo(stopIndex);}}else{// Short swipes
	if(!s.params.shortSwipes){s.slideTo(s.activeIndex);return;}if(s.swipeDirection==='next'){s.slideTo(stopIndex+s.params.slidesPerGroup);}if(s.swipeDirection==='prev'){s.slideTo(stopIndex);}}};/*=========================
	          Transitions
	          ===========================*/s._slideTo=function(slideIndex,speed){return s.slideTo(slideIndex,speed,true,true);};s.slideTo=function(slideIndex,speed,runCallbacks,internal){if(typeof runCallbacks==='undefined')runCallbacks=true;if(typeof slideIndex==='undefined')slideIndex=0;if(slideIndex<0)slideIndex=0;s.snapIndex=Math.floor(slideIndex/s.params.slidesPerGroup);if(s.snapIndex>=s.snapGrid.length)s.snapIndex=s.snapGrid.length-1;var translate=-s.snapGrid[s.snapIndex];// Stop autoplay
	if(s.params.autoplay&&s.autoplaying){if(internal||!s.params.autoplayDisableOnInteraction){s.pauseAutoplay(speed);}else{s.stopAutoplay();}}// Update progress
	s.updateProgress(translate);// Normalize slideIndex
	for(var i=0;i<s.slidesGrid.length;i++){if(-Math.floor(translate*100)>=Math.floor(s.slidesGrid[i]*100)){slideIndex=i;}}// Directions locks
	if(!s.params.allowSwipeToNext&&translate<s.translate&&translate<s.minTranslate()){return false;}if(!s.params.allowSwipeToPrev&&translate>s.translate&&translate>s.maxTranslate()){if((s.activeIndex||0)!==slideIndex)return false;}// Update Index
	if(typeof speed==='undefined')speed=s.params.speed;s.previousIndex=s.activeIndex||0;s.activeIndex=slideIndex;if(s.rtl&&-translate===s.translate||!s.rtl&&translate===s.translate){// Update Height
	if(s.params.autoHeight){s.updateAutoHeight();}s.updateClasses();if(s.params.effect!=='slide'){s.setWrapperTranslate(translate);}return false;}s.updateClasses();s.onTransitionStart(runCallbacks);if(speed===0){s.setWrapperTranslate(translate);s.setWrapperTransition(0);s.onTransitionEnd(runCallbacks);}else{s.setWrapperTranslate(translate);s.setWrapperTransition(speed);if(!s.animating){s.animating=true;s.wrapper.transitionEnd(function(){if(!s)return;s.onTransitionEnd(runCallbacks);});}}return true;};s.onTransitionStart=function(runCallbacks){if(typeof runCallbacks==='undefined')runCallbacks=true;if(s.params.autoHeight){s.updateAutoHeight();}if(s.lazy)s.lazy.onTransitionStart();if(runCallbacks){s.emit('onTransitionStart',s);if(s.activeIndex!==s.previousIndex){s.emit('onSlideChangeStart',s);if(s.activeIndex>s.previousIndex){s.emit('onSlideNextStart',s);}else{s.emit('onSlidePrevStart',s);}}}};s.onTransitionEnd=function(runCallbacks){s.animating=false;s.setWrapperTransition(0);if(typeof runCallbacks==='undefined')runCallbacks=true;if(s.lazy)s.lazy.onTransitionEnd();if(runCallbacks){s.emit('onTransitionEnd',s);if(s.activeIndex!==s.previousIndex){s.emit('onSlideChangeEnd',s);if(s.activeIndex>s.previousIndex){s.emit('onSlideNextEnd',s);}else{s.emit('onSlidePrevEnd',s);}}}if(s.params.hashnav&&s.hashnav){s.hashnav.setHash();}};s.slideNext=function(runCallbacks,speed,internal){if(s.params.loop){if(s.animating)return false;s.fixLoop();var clientLeft=s.container[0].clientLeft;return s.slideTo(s.activeIndex+s.params.slidesPerGroup,speed,runCallbacks,internal);}else return s.slideTo(s.activeIndex+s.params.slidesPerGroup,speed,runCallbacks,internal);};s._slideNext=function(speed){return s.slideNext(true,speed,true);};s.slidePrev=function(runCallbacks,speed,internal){if(s.params.loop){if(s.animating)return false;s.fixLoop();var clientLeft=s.container[0].clientLeft;return s.slideTo(s.activeIndex-1,speed,runCallbacks,internal);}else return s.slideTo(s.activeIndex-1,speed,runCallbacks,internal);};s._slidePrev=function(speed){return s.slidePrev(true,speed,true);};s.slideReset=function(runCallbacks,speed,internal){return s.slideTo(s.activeIndex,speed,runCallbacks);};/*=========================
	          Translate/transition helpers
	          ===========================*/s.setWrapperTransition=function(duration,byController){s.wrapper.transition(duration);if(s.params.effect!=='slide'&&s.effects[s.params.effect]){s.effects[s.params.effect].setTransition(duration);}if(s.params.parallax&&s.parallax){s.parallax.setTransition(duration);}if(s.params.scrollbar&&s.scrollbar){s.scrollbar.setTransition(duration);}if(s.params.control&&s.controller){s.controller.setTransition(duration,byController);}s.emit('onSetTransition',s,duration);};s.setWrapperTranslate=function(translate,updateActiveIndex,byController){var x=0,y=0,z=0;if(s.isHorizontal()){x=s.rtl?-translate:translate;}else{y=translate;}if(s.params.roundLengths){x=round(x);y=round(y);}if(!s.params.virtualTranslate){if(s.support.transforms3d)s.wrapper.transform('translate3d('+x+'px, '+y+'px, '+z+'px)');else s.wrapper.transform('translate('+x+'px, '+y+'px)');}s.translate=s.isHorizontal()?x:y;// Check if we need to update progress
	var progress;var translatesDiff=s.maxTranslate()-s.minTranslate();if(translatesDiff===0){progress=0;}else{progress=(translate-s.minTranslate())/translatesDiff;}if(progress!==s.progress){s.updateProgress(translate);}if(updateActiveIndex)s.updateActiveIndex();if(s.params.effect!=='slide'&&s.effects[s.params.effect]){s.effects[s.params.effect].setTranslate(s.translate);}if(s.params.parallax&&s.parallax){s.parallax.setTranslate(s.translate);}if(s.params.scrollbar&&s.scrollbar){s.scrollbar.setTranslate(s.translate);}if(s.params.control&&s.controller){s.controller.setTranslate(s.translate,byController);}s.emit('onSetTranslate',s,s.translate);};s.getTranslate=function(el,axis){var matrix,curTransform,curStyle,transformMatrix;// automatic axis detection
	if(typeof axis==='undefined'){axis='x';}if(s.params.virtualTranslate){return s.rtl?-s.translate:s.translate;}curStyle=window.getComputedStyle(el,null);if(window.WebKitCSSMatrix){curTransform=curStyle.transform||curStyle.webkitTransform;if(curTransform.split(',').length>6){curTransform=curTransform.split(', ').map(function(a){return a.replace(',','.');}).join(', ');}// Some old versions of Webkit choke when 'none' is passed; pass
	// empty string instead in this case
	transformMatrix=new window.WebKitCSSMatrix(curTransform==='none'?'':curTransform);}else{transformMatrix=curStyle.MozTransform||curStyle.OTransform||curStyle.MsTransform||curStyle.msTransform||curStyle.transform||curStyle.getPropertyValue('transform').replace('translate(','matrix(1, 0, 0, 1,');matrix=transformMatrix.toString().split(',');}if(axis==='x'){//Latest Chrome and webkits Fix
	if(window.WebKitCSSMatrix)curTransform=transformMatrix.m41;//Crazy IE10 Matrix
	else if(matrix.length===16)curTransform=parseFloat(matrix[12]);//Normal Browsers
	else curTransform=parseFloat(matrix[4]);}if(axis==='y'){//Latest Chrome and webkits Fix
	if(window.WebKitCSSMatrix)curTransform=transformMatrix.m42;//Crazy IE10 Matrix
	else if(matrix.length===16)curTransform=parseFloat(matrix[13]);//Normal Browsers
	else curTransform=parseFloat(matrix[5]);}if(s.rtl&&curTransform)curTransform=-curTransform;return curTransform||0;};s.getWrapperTranslate=function(axis){if(typeof axis==='undefined'){axis=s.isHorizontal()?'x':'y';}return s.getTranslate(s.wrapper[0],axis);};/*=========================
	          Observer
	          ===========================*/s.observers=[];function initObserver(target,options){options=options||{};// create an observer instance
	var ObserverFunc=window.MutationObserver||window.WebkitMutationObserver;var observer=new ObserverFunc(function(mutations){mutations.forEach(function(mutation){s.onResize(true);s.emit('onObserverUpdate',s,mutation);});});observer.observe(target,{attributes:typeof options.attributes==='undefined'?true:options.attributes,childList:typeof options.childList==='undefined'?true:options.childList,characterData:typeof options.characterData==='undefined'?true:options.characterData});s.observers.push(observer);}s.initObservers=function(){if(s.params.observeParents){var containerParents=s.container.parents();for(var i=0;i<containerParents.length;i++){initObserver(containerParents[i]);}}// Observe container
	initObserver(s.container[0],{childList:false});// Observe wrapper
	initObserver(s.wrapper[0],{attributes:false});};s.disconnectObservers=function(){for(var i=0;i<s.observers.length;i++){s.observers[i].disconnect();}s.observers=[];};/*=========================
	          Loop
	          ===========================*/// Create looped slides
	s.createLoop=function(){// Remove duplicated slides
	s.wrapper.children('.'+s.params.slideClass+'.'+s.params.slideDuplicateClass).remove();var slides=s.wrapper.children('.'+s.params.slideClass);if(s.params.slidesPerView==='auto'&&!s.params.loopedSlides)s.params.loopedSlides=slides.length;s.loopedSlides=parseInt(s.params.loopedSlides||s.params.slidesPerView,10);s.loopedSlides=s.loopedSlides+s.params.loopAdditionalSlides;if(s.loopedSlides>slides.length){s.loopedSlides=slides.length;}var prependSlides=[],appendSlides=[],i;slides.each(function(index,el){var slide=$(this);if(index<s.loopedSlides)appendSlides.push(el);if(index<slides.length&&index>=slides.length-s.loopedSlides)prependSlides.push(el);slide.attr('data-swiper-slide-index',index);});for(i=0;i<appendSlides.length;i++){s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));}for(i=prependSlides.length-1;i>=0;i--){s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));}};s.destroyLoop=function(){s.wrapper.children('.'+s.params.slideClass+'.'+s.params.slideDuplicateClass).remove();s.slides.removeAttr('data-swiper-slide-index');};s.reLoop=function(updatePosition){var oldIndex=s.activeIndex-s.loopedSlides;s.destroyLoop();s.createLoop();s.updateSlidesSize();if(updatePosition){s.slideTo(oldIndex+s.loopedSlides,0,false);}};s.fixLoop=function(){var newIndex;//Fix For Negative Oversliding
	if(s.activeIndex<s.loopedSlides){newIndex=s.slides.length-s.loopedSlides*3+s.activeIndex;newIndex=newIndex+s.loopedSlides;s.slideTo(newIndex,0,false,true);}//Fix For Positive Oversliding
	else if(s.params.slidesPerView==='auto'&&s.activeIndex>=s.loopedSlides*2||s.activeIndex>s.slides.length-s.params.slidesPerView*2){newIndex=-s.slides.length+s.activeIndex+s.loopedSlides;newIndex=newIndex+s.loopedSlides;s.slideTo(newIndex,0,false,true);}};/*=========================
	          Append/Prepend/Remove Slides
	          ===========================*/s.appendSlide=function(slides){if(s.params.loop){s.destroyLoop();}if((typeof slides==='undefined'?'undefined':(0,_typeof3.default)(slides))==='object'&&slides.length){for(var i=0;i<slides.length;i++){if(slides[i])s.wrapper.append(slides[i]);}}else{s.wrapper.append(slides);}if(s.params.loop){s.createLoop();}if(!(s.params.observer&&s.support.observer)){s.update(true);}};s.prependSlide=function(slides){if(s.params.loop){s.destroyLoop();}var newActiveIndex=s.activeIndex+1;if((typeof slides==='undefined'?'undefined':(0,_typeof3.default)(slides))==='object'&&slides.length){for(var i=0;i<slides.length;i++){if(slides[i])s.wrapper.prepend(slides[i]);}newActiveIndex=s.activeIndex+slides.length;}else{s.wrapper.prepend(slides);}if(s.params.loop){s.createLoop();}if(!(s.params.observer&&s.support.observer)){s.update(true);}s.slideTo(newActiveIndex,0,false);};s.removeSlide=function(slidesIndexes){if(s.params.loop){s.destroyLoop();s.slides=s.wrapper.children('.'+s.params.slideClass);}var newActiveIndex=s.activeIndex,indexToRemove;if((typeof slidesIndexes==='undefined'?'undefined':(0,_typeof3.default)(slidesIndexes))==='object'&&slidesIndexes.length){for(var i=0;i<slidesIndexes.length;i++){indexToRemove=slidesIndexes[i];if(s.slides[indexToRemove])s.slides.eq(indexToRemove).remove();if(indexToRemove<newActiveIndex)newActiveIndex--;}newActiveIndex=Math.max(newActiveIndex,0);}else{indexToRemove=slidesIndexes;if(s.slides[indexToRemove])s.slides.eq(indexToRemove).remove();if(indexToRemove<newActiveIndex)newActiveIndex--;newActiveIndex=Math.max(newActiveIndex,0);}if(s.params.loop){s.createLoop();}if(!(s.params.observer&&s.support.observer)){s.update(true);}if(s.params.loop){s.slideTo(newActiveIndex+s.loopedSlides,0,false);}else{s.slideTo(newActiveIndex,0,false);}};s.removeAllSlides=function(){var slidesIndexes=[];for(var i=0;i<s.slides.length;i++){slidesIndexes.push(i);}s.removeSlide(slidesIndexes);};/*=========================
	          Effects
	          ===========================*/s.effects={fade:{setTranslate:function setTranslate(){for(var i=0;i<s.slides.length;i++){var slide=s.slides.eq(i);var offset=slide[0].swiperSlideOffset;var tx=-offset;if(!s.params.virtualTranslate)tx=tx-s.translate;var ty=0;if(!s.isHorizontal()){ty=tx;tx=0;}var slideOpacity=s.params.fade.crossFade?Math.max(1-Math.abs(slide[0].progress),0):1+Math.min(Math.max(slide[0].progress,-1),0);slide.css({opacity:slideOpacity}).transform('translate3d('+tx+'px, '+ty+'px, 0px)');}},setTransition:function setTransition(duration){s.slides.transition(duration);if(s.params.virtualTranslate&&duration!==0){var eventTriggered=false;s.slides.transitionEnd(function(){if(eventTriggered)return;if(!s)return;eventTriggered=true;s.animating=false;var triggerEvents=['webkitTransitionEnd','transitionend','oTransitionEnd','MSTransitionEnd','msTransitionEnd'];for(var i=0;i<triggerEvents.length;i++){s.wrapper.trigger(triggerEvents[i]);}});}}},flip:{setTranslate:function setTranslate(){for(var i=0;i<s.slides.length;i++){var slide=s.slides.eq(i);var progress=slide[0].progress;if(s.params.flip.limitRotation){progress=Math.max(Math.min(slide[0].progress,1),-1);}var offset=slide[0].swiperSlideOffset;var rotate=-180*progress,rotateY=rotate,rotateX=0,tx=-offset,ty=0;if(!s.isHorizontal()){ty=tx;tx=0;rotateX=-rotateY;rotateY=0;}else if(s.rtl){rotateY=-rotateY;}slide[0].style.zIndex=-Math.abs(Math.round(progress))+s.slides.length;if(s.params.flip.slideShadows){//Set shadows
	var shadowBefore=s.isHorizontal()?slide.find('.swiper-slide-shadow-left'):slide.find('.swiper-slide-shadow-top');var shadowAfter=s.isHorizontal()?slide.find('.swiper-slide-shadow-right'):slide.find('.swiper-slide-shadow-bottom');if(shadowBefore.length===0){shadowBefore=$('<div class="swiper-slide-shadow-'+(s.isHorizontal()?'left':'top')+'"></div>');slide.append(shadowBefore);}if(shadowAfter.length===0){shadowAfter=$('<div class="swiper-slide-shadow-'+(s.isHorizontal()?'right':'bottom')+'"></div>');slide.append(shadowAfter);}if(shadowBefore.length)shadowBefore[0].style.opacity=Math.max(-progress,0);if(shadowAfter.length)shadowAfter[0].style.opacity=Math.max(progress,0);}slide.transform('translate3d('+tx+'px, '+ty+'px, 0px) rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');}},setTransition:function setTransition(duration){s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);if(s.params.virtualTranslate&&duration!==0){var eventTriggered=false;s.slides.eq(s.activeIndex).transitionEnd(function(){if(eventTriggered)return;if(!s)return;if(!$(this).hasClass(s.params.slideActiveClass))return;eventTriggered=true;s.animating=false;var triggerEvents=['webkitTransitionEnd','transitionend','oTransitionEnd','MSTransitionEnd','msTransitionEnd'];for(var i=0;i<triggerEvents.length;i++){s.wrapper.trigger(triggerEvents[i]);}});}}},cube:{setTranslate:function setTranslate(){var wrapperRotate=0,cubeShadow;if(s.params.cube.shadow){if(s.isHorizontal()){cubeShadow=s.wrapper.find('.swiper-cube-shadow');if(cubeShadow.length===0){cubeShadow=$('<div class="swiper-cube-shadow"></div>');s.wrapper.append(cubeShadow);}cubeShadow.css({height:s.width+'px'});}else{cubeShadow=s.container.find('.swiper-cube-shadow');if(cubeShadow.length===0){cubeShadow=$('<div class="swiper-cube-shadow"></div>');s.container.append(cubeShadow);}}}for(var i=0;i<s.slides.length;i++){var slide=s.slides.eq(i);var slideAngle=i*90;var round=Math.floor(slideAngle/360);if(s.rtl){slideAngle=-slideAngle;round=Math.floor(-slideAngle/360);}var progress=Math.max(Math.min(slide[0].progress,1),-1);var tx=0,ty=0,tz=0;if(i%4===0){tx=-round*4*s.size;tz=0;}else if((i-1)%4===0){tx=0;tz=-round*4*s.size;}else if((i-2)%4===0){tx=s.size+round*4*s.size;tz=s.size;}else if((i-3)%4===0){tx=-s.size;tz=3*s.size+s.size*4*round;}if(s.rtl){tx=-tx;}if(!s.isHorizontal()){ty=tx;tx=0;}var transform='rotateX('+(s.isHorizontal()?0:-slideAngle)+'deg) rotateY('+(s.isHorizontal()?slideAngle:0)+'deg) translate3d('+tx+'px, '+ty+'px, '+tz+'px)';if(progress<=1&&progress>-1){wrapperRotate=i*90+progress*90;if(s.rtl)wrapperRotate=-i*90-progress*90;}slide.transform(transform);if(s.params.cube.slideShadows){//Set shadows
	var shadowBefore=s.isHorizontal()?slide.find('.swiper-slide-shadow-left'):slide.find('.swiper-slide-shadow-top');var shadowAfter=s.isHorizontal()?slide.find('.swiper-slide-shadow-right'):slide.find('.swiper-slide-shadow-bottom');if(shadowBefore.length===0){shadowBefore=$('<div class="swiper-slide-shadow-'+(s.isHorizontal()?'left':'top')+'"></div>');slide.append(shadowBefore);}if(shadowAfter.length===0){shadowAfter=$('<div class="swiper-slide-shadow-'+(s.isHorizontal()?'right':'bottom')+'"></div>');slide.append(shadowAfter);}if(shadowBefore.length)shadowBefore[0].style.opacity=Math.max(-progress,0);if(shadowAfter.length)shadowAfter[0].style.opacity=Math.max(progress,0);}}s.wrapper.css({'-webkit-transform-origin':'50% 50% -'+s.size/2+'px','-moz-transform-origin':'50% 50% -'+s.size/2+'px','-ms-transform-origin':'50% 50% -'+s.size/2+'px','transform-origin':'50% 50% -'+s.size/2+'px'});if(s.params.cube.shadow){if(s.isHorizontal()){cubeShadow.transform('translate3d(0px, '+(s.width/2+s.params.cube.shadowOffset)+'px, '+-s.width/2+'px) rotateX(90deg) rotateZ(0deg) scale('+s.params.cube.shadowScale+')');}else{var shadowAngle=Math.abs(wrapperRotate)-Math.floor(Math.abs(wrapperRotate)/90)*90;var multiplier=1.5-(Math.sin(shadowAngle*2*Math.PI/360)/2+Math.cos(shadowAngle*2*Math.PI/360)/2);var scale1=s.params.cube.shadowScale,scale2=s.params.cube.shadowScale/multiplier,offset=s.params.cube.shadowOffset;cubeShadow.transform('scale3d('+scale1+', 1, '+scale2+') translate3d(0px, '+(s.height/2+offset)+'px, '+-s.height/2/scale2+'px) rotateX(-90deg)');}}var zFactor=s.isSafari||s.isUiWebView?-s.size/2:0;s.wrapper.transform('translate3d(0px,0,'+zFactor+'px) rotateX('+(s.isHorizontal()?0:wrapperRotate)+'deg) rotateY('+(s.isHorizontal()?-wrapperRotate:0)+'deg)');},setTransition:function setTransition(duration){s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);if(s.params.cube.shadow&&!s.isHorizontal()){s.container.find('.swiper-cube-shadow').transition(duration);}}},coverflow:{setTranslate:function setTranslate(){var transform=s.translate;var center=s.isHorizontal()?-transform+s.width/2:-transform+s.height/2;var rotate=s.isHorizontal()?s.params.coverflow.rotate:-s.params.coverflow.rotate;var translate=s.params.coverflow.depth;//Each slide offset from center
	for(var i=0,length=s.slides.length;i<length;i++){var slide=s.slides.eq(i);var slideSize=s.slidesSizesGrid[i];var slideOffset=slide[0].swiperSlideOffset;var offsetMultiplier=(center-slideOffset-slideSize/2)/slideSize*s.params.coverflow.modifier;var rotateY=s.isHorizontal()?rotate*offsetMultiplier:0;var rotateX=s.isHorizontal()?0:rotate*offsetMultiplier;// var rotateZ = 0
	var translateZ=-translate*Math.abs(offsetMultiplier);var translateY=s.isHorizontal()?0:s.params.coverflow.stretch*offsetMultiplier;var translateX=s.isHorizontal()?s.params.coverflow.stretch*offsetMultiplier:0;//Fix for ultra small values
	if(Math.abs(translateX)<0.001)translateX=0;if(Math.abs(translateY)<0.001)translateY=0;if(Math.abs(translateZ)<0.001)translateZ=0;if(Math.abs(rotateY)<0.001)rotateY=0;if(Math.abs(rotateX)<0.001)rotateX=0;var slideTransform='translate3d('+translateX+'px,'+translateY+'px,'+translateZ+'px)  rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';slide.transform(slideTransform);slide[0].style.zIndex=-Math.abs(Math.round(offsetMultiplier))+1;if(s.params.coverflow.slideShadows){//Set shadows
	var shadowBefore=s.isHorizontal()?slide.find('.swiper-slide-shadow-left'):slide.find('.swiper-slide-shadow-top');var shadowAfter=s.isHorizontal()?slide.find('.swiper-slide-shadow-right'):slide.find('.swiper-slide-shadow-bottom');if(shadowBefore.length===0){shadowBefore=$('<div class="swiper-slide-shadow-'+(s.isHorizontal()?'left':'top')+'"></div>');slide.append(shadowBefore);}if(shadowAfter.length===0){shadowAfter=$('<div class="swiper-slide-shadow-'+(s.isHorizontal()?'right':'bottom')+'"></div>');slide.append(shadowAfter);}if(shadowBefore.length)shadowBefore[0].style.opacity=offsetMultiplier>0?offsetMultiplier:0;if(shadowAfter.length)shadowAfter[0].style.opacity=-offsetMultiplier>0?-offsetMultiplier:0;}}//Set correct perspective for IE10
	if(s.browser.ie){var ws=s.wrapper[0].style;ws.perspectiveOrigin=center+'px 50%';}},setTransition:function setTransition(duration){s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);}}};/*=========================
	          Images Lazy Loading
	          ===========================*/s.lazy={initialImageLoaded:false,loadImageInSlide:function loadImageInSlide(index,loadInDuplicate){if(typeof index==='undefined')return;if(typeof loadInDuplicate==='undefined')loadInDuplicate=true;if(s.slides.length===0)return;var slide=s.slides.eq(index);var img=slide.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');if(slide.hasClass('swiper-lazy')&&!slide.hasClass('swiper-lazy-loaded')&&!slide.hasClass('swiper-lazy-loading')){img=img.add(slide[0]);}if(img.length===0)return;img.each(function(){var _img=$(this);_img.addClass('swiper-lazy-loading');var background=_img.attr('data-background');var src=_img.attr('data-src'),srcset=_img.attr('data-srcset');s.loadImage(_img[0],src||background,srcset,false,function(){if(background){_img.css('background-image','url("'+background+'")');_img.removeAttr('data-background');}else{if(srcset){_img.attr('srcset',srcset);_img.removeAttr('data-srcset');}if(src){_img.attr('src',src);_img.removeAttr('data-src');}}_img.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading');slide.find('.swiper-lazy-preloader, .preloader').remove();if(s.params.loop&&loadInDuplicate){var slideOriginalIndex=slide.attr('data-swiper-slide-index');if(slide.hasClass(s.params.slideDuplicateClass)){var originalSlide=s.wrapper.children('[data-swiper-slide-index="'+slideOriginalIndex+'"]:not(.'+s.params.slideDuplicateClass+')');s.lazy.loadImageInSlide(originalSlide.index(),false);}else{var duplicatedSlide=s.wrapper.children('.'+s.params.slideDuplicateClass+'[data-swiper-slide-index="'+slideOriginalIndex+'"]');s.lazy.loadImageInSlide(duplicatedSlide.index(),false);}}s.emit('onLazyImageReady',s,slide[0],_img[0]);});s.emit('onLazyImageLoad',s,slide[0],_img[0]);});},load:function load(){var i;if(s.params.watchSlidesVisibility){s.wrapper.children('.'+s.params.slideVisibleClass).each(function(){s.lazy.loadImageInSlide($(this).index());});}else{if(s.params.slidesPerView>1){for(i=s.activeIndex;i<s.activeIndex+s.params.slidesPerView;i++){if(s.slides[i])s.lazy.loadImageInSlide(i);}}else{s.lazy.loadImageInSlide(s.activeIndex);}}if(s.params.lazyLoadingInPrevNext){if(s.params.slidesPerView>1||s.params.lazyLoadingInPrevNextAmount&&s.params.lazyLoadingInPrevNextAmount>1){var amount=s.params.lazyLoadingInPrevNextAmount;var spv=s.params.slidesPerView;var maxIndex=Math.min(s.activeIndex+spv+Math.max(amount,spv),s.slides.length);var minIndex=Math.max(s.activeIndex-Math.max(spv,amount),0);// Next Slides
	for(i=s.activeIndex+s.params.slidesPerView;i<maxIndex;i++){if(s.slides[i])s.lazy.loadImageInSlide(i);}// Prev Slides
	for(i=minIndex;i<s.activeIndex;i++){if(s.slides[i])s.lazy.loadImageInSlide(i);}}else{var nextSlide=s.wrapper.children('.'+s.params.slideNextClass);if(nextSlide.length>0)s.lazy.loadImageInSlide(nextSlide.index());var prevSlide=s.wrapper.children('.'+s.params.slidePrevClass);if(prevSlide.length>0)s.lazy.loadImageInSlide(prevSlide.index());}}},onTransitionStart:function onTransitionStart(){if(s.params.lazyLoading){if(s.params.lazyLoadingOnTransitionStart||!s.params.lazyLoadingOnTransitionStart&&!s.lazy.initialImageLoaded){s.lazy.load();}}},onTransitionEnd:function onTransitionEnd(){if(s.params.lazyLoading&&!s.params.lazyLoadingOnTransitionStart){s.lazy.load();}}};/*=========================
	          Scrollbar
	          ===========================*/s.scrollbar={isTouched:false,setDragPosition:function setDragPosition(e){var sb=s.scrollbar;var x=0,y=0;var translate;var pointerPosition=s.isHorizontal()?e.type==='touchstart'||e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX||e.clientX:e.type==='touchstart'||e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY||e.clientY;var position=pointerPosition-sb.track.offset()[s.isHorizontal()?'left':'top']-sb.dragSize/2;var positionMin=-s.minTranslate()*sb.moveDivider;var positionMax=-s.maxTranslate()*sb.moveDivider;if(position<positionMin){position=positionMin;}else if(position>positionMax){position=positionMax;}position=-position/sb.moveDivider;s.updateProgress(position);s.setWrapperTranslate(position,true);},dragStart:function dragStart(e){var sb=s.scrollbar;sb.isTouched=true;e.preventDefault();e.stopPropagation();sb.setDragPosition(e);clearTimeout(sb.dragTimeout);sb.track.transition(0);if(s.params.scrollbarHide){sb.track.css('opacity',1);}s.wrapper.transition(100);sb.drag.transition(100);s.emit('onScrollbarDragStart',s);},dragMove:function dragMove(e){var sb=s.scrollbar;if(!sb.isTouched)return;if(e.preventDefault)e.preventDefault();else e.returnValue=false;sb.setDragPosition(e);s.wrapper.transition(0);sb.track.transition(0);sb.drag.transition(0);s.emit('onScrollbarDragMove',s);},dragEnd:function dragEnd(e){var sb=s.scrollbar;if(!sb.isTouched)return;sb.isTouched=false;if(s.params.scrollbarHide){clearTimeout(sb.dragTimeout);sb.dragTimeout=setTimeout(function(){sb.track.css('opacity',0);sb.track.transition(400);},1000);}s.emit('onScrollbarDragEnd',s);if(s.params.scrollbarSnapOnRelease){s.slideReset();}},enableDraggable:function enableDraggable(){var sb=s.scrollbar;var target=s.support.touch?sb.track:document;$(sb.track).on(s.touchEvents.start,sb.dragStart);$(target).on(s.touchEvents.move,sb.dragMove);$(target).on(s.touchEvents.end,sb.dragEnd);},disableDraggable:function disableDraggable(){var sb=s.scrollbar;var target=s.support.touch?sb.track:document;$(sb.track).off(s.touchEvents.start,sb.dragStart);$(target).off(s.touchEvents.move,sb.dragMove);$(target).off(s.touchEvents.end,sb.dragEnd);},set:function set(){if(!s.params.scrollbar)return;var sb=s.scrollbar;sb.track=$(s.params.scrollbar);if(s.params.uniqueNavElements&&typeof s.params.scrollbar==='string'&&sb.track.length>1&&s.container.find(s.params.scrollbar).length===1){sb.track=s.container.find(s.params.scrollbar);}sb.drag=sb.track.find('.swiper-scrollbar-drag');if(sb.drag.length===0){sb.drag=$('<div class="swiper-scrollbar-drag"></div>');sb.track.append(sb.drag);}sb.drag[0].style.width='';sb.drag[0].style.height='';sb.trackSize=s.isHorizontal()?sb.track[0].offsetWidth:sb.track[0].offsetHeight;sb.divider=s.size/s.virtualSize;sb.moveDivider=sb.divider*(sb.trackSize/s.size);sb.dragSize=sb.trackSize*sb.divider;if(s.isHorizontal()){sb.drag[0].style.width=sb.dragSize+'px';}else{sb.drag[0].style.height=sb.dragSize+'px';}if(sb.divider>=1){sb.track[0].style.display='none';}else{sb.track[0].style.display='';}if(s.params.scrollbarHide){sb.track[0].style.opacity=0;}},setTranslate:function setTranslate(){if(!s.params.scrollbar)return;var diff;var sb=s.scrollbar;var translate=s.translate||0;var newPos;var newSize=sb.dragSize;newPos=(sb.trackSize-sb.dragSize)*s.progress;if(s.rtl&&s.isHorizontal()){newPos=-newPos;if(newPos>0){newSize=sb.dragSize-newPos;newPos=0;}else if(-newPos+sb.dragSize>sb.trackSize){newSize=sb.trackSize+newPos;}}else{if(newPos<0){newSize=sb.dragSize+newPos;newPos=0;}else if(newPos+sb.dragSize>sb.trackSize){newSize=sb.trackSize-newPos;}}if(s.isHorizontal()){if(s.support.transforms3d){sb.drag.transform('translate3d('+newPos+'px, 0, 0)');}else{sb.drag.transform('translateX('+newPos+'px)');}sb.drag[0].style.width=newSize+'px';}else{if(s.support.transforms3d){sb.drag.transform('translate3d(0px, '+newPos+'px, 0)');}else{sb.drag.transform('translateY('+newPos+'px)');}sb.drag[0].style.height=newSize+'px';}if(s.params.scrollbarHide){clearTimeout(sb.timeout);sb.track[0].style.opacity=1;sb.timeout=setTimeout(function(){sb.track[0].style.opacity=0;sb.track.transition(400);},1000);}},setTransition:function setTransition(duration){if(!s.params.scrollbar)return;s.scrollbar.drag.transition(duration);}};/*=========================
	          Controller
	          ===========================*/s.controller={LinearSpline:function LinearSpline(x,y){this.x=x;this.y=y;this.lastIndex=x.length-1;// Given an x value (x2), return the expected y2 value:
	// (x1,y1) is the known point before given value,
	// (x3,y3) is the known point after given value.
	var i1,i3;var l=this.x.length;this.interpolate=function(x2){if(!x2)return 0;// Get the indexes of x1 and x3 (the array indexes before and after given x2):
	i3=binarySearch(this.x,x2);i1=i3-1;// We have our indexes i1 & i3, so we can calculate already:
	// y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
	return(x2-this.x[i1])*(this.y[i3]-this.y[i1])/(this.x[i3]-this.x[i1])+this.y[i1];};var binarySearch=function(){var maxIndex,minIndex,guess;return function(array,val){minIndex=-1;maxIndex=array.length;while(maxIndex-minIndex>1){if(array[guess=maxIndex+minIndex>>1]<=val){minIndex=guess;}else{maxIndex=guess;}}return maxIndex;};}();},//xxx: for now i will just save one spline function to to
	getInterpolateFunction:function getInterpolateFunction(c){if(!s.controller.spline)s.controller.spline=s.params.loop?new s.controller.LinearSpline(s.slidesGrid,c.slidesGrid):new s.controller.LinearSpline(s.snapGrid,c.snapGrid);},setTranslate:function setTranslate(translate,byController){var controlled=s.params.control;var multiplier,controlledTranslate;function setControlledTranslate(c){// this will create an Interpolate function based on the snapGrids
	// x is the Grid of the scrolled scroller and y will be the controlled scroller
	// it makes sense to create this only once and recall it for the interpolation
	// the function does a lot of value caching for performance
	translate=c.rtl&&c.params.direction==='horizontal'?-s.translate:s.translate;if(s.params.controlBy==='slide'){s.controller.getInterpolateFunction(c);// i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
	// but it did not work out
	controlledTranslate=-s.controller.spline.interpolate(-translate);}if(!controlledTranslate||s.params.controlBy==='container'){multiplier=(c.maxTranslate()-c.minTranslate())/(s.maxTranslate()-s.minTranslate());controlledTranslate=(translate-s.minTranslate())*multiplier+c.minTranslate();}if(s.params.controlInverse){controlledTranslate=c.maxTranslate()-controlledTranslate;}c.updateProgress(controlledTranslate);c.setWrapperTranslate(controlledTranslate,false,s);c.updateActiveIndex();}if(s.isArray(controlled)){for(var i=0;i<controlled.length;i++){if(controlled[i]!==byController&&controlled[i]instanceof Swiper){setControlledTranslate(controlled[i]);}}}else if(controlled instanceof Swiper&&byController!==controlled){setControlledTranslate(controlled);}},setTransition:function setTransition(duration,byController){var controlled=s.params.control;var i;function setControlledTransition(c){c.setWrapperTransition(duration,s);if(duration!==0){c.onTransitionStart();c.wrapper.transitionEnd(function(){if(!controlled)return;if(c.params.loop&&s.params.controlBy==='slide'){c.fixLoop();}c.onTransitionEnd();});}}if(s.isArray(controlled)){for(i=0;i<controlled.length;i++){if(controlled[i]!==byController&&controlled[i]instanceof Swiper){setControlledTransition(controlled[i]);}}}else if(controlled instanceof Swiper&&byController!==controlled){setControlledTransition(controlled);}}};/*=========================
	          Hash Navigation
	          ===========================*/s.hashnav={init:function init(){if(!s.params.hashnav)return;s.hashnav.initialized=true;var hash=document.location.hash.replace('#','');if(!hash)return;var speed=0;for(var i=0,length=s.slides.length;i<length;i++){var slide=s.slides.eq(i);var slideHash=slide.attr('data-hash');if(slideHash===hash&&!slide.hasClass(s.params.slideDuplicateClass)){var index=slide.index();s.slideTo(index,speed,s.params.runCallbacksOnInit,true);}}},setHash:function setHash(){if(!s.hashnav.initialized||!s.params.hashnav)return;document.location.hash=s.slides.eq(s.activeIndex).attr('data-hash')||'';}};/*=========================
	          Keyboard Control
	          ===========================*/function handleKeyboard(e){if(e.originalEvent)e=e.originalEvent;//jquery fix
	var kc=e.keyCode||e.charCode;// Directions locks
	if(!s.params.allowSwipeToNext&&(s.isHorizontal()&&kc===39||!s.isHorizontal()&&kc===40)){return false;}if(!s.params.allowSwipeToPrev&&(s.isHorizontal()&&kc===37||!s.isHorizontal()&&kc===38)){return false;}if(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey){return;}if(document.activeElement&&document.activeElement.nodeName&&(document.activeElement.nodeName.toLowerCase()==='input'||document.activeElement.nodeName.toLowerCase()==='textarea')){return;}if(kc===37||kc===39||kc===38||kc===40){var inView=false;//Check that swiper should be inside of visible area of window
	if(s.container.parents('.swiper-slide').length>0&&s.container.parents('.swiper-slide-active').length===0){return;}var windowScroll={left:window.pageXOffset,top:window.pageYOffset};var windowWidth=window.innerWidth;var windowHeight=window.innerHeight;var swiperOffset=s.container.offset();if(s.rtl)swiperOffset.left=swiperOffset.left-s.container[0].scrollLeft;var swiperCoord=[[swiperOffset.left,swiperOffset.top],[swiperOffset.left+s.width,swiperOffset.top],[swiperOffset.left,swiperOffset.top+s.height],[swiperOffset.left+s.width,swiperOffset.top+s.height]];for(var i=0;i<swiperCoord.length;i++){var point=swiperCoord[i];if(point[0]>=windowScroll.left&&point[0]<=windowScroll.left+windowWidth&&point[1]>=windowScroll.top&&point[1]<=windowScroll.top+windowHeight){inView=true;}}if(!inView)return;}if(s.isHorizontal()){if(kc===37||kc===39){if(e.preventDefault)e.preventDefault();else e.returnValue=false;}if(kc===39&&!s.rtl||kc===37&&s.rtl)s.slideNext();if(kc===37&&!s.rtl||kc===39&&s.rtl)s.slidePrev();}else{if(kc===38||kc===40){if(e.preventDefault)e.preventDefault();else e.returnValue=false;}if(kc===40)s.slideNext();if(kc===38)s.slidePrev();}}s.disableKeyboardControl=function(){s.params.keyboardControl=false;$(document).off('keydown',handleKeyboard);};s.enableKeyboardControl=function(){s.params.keyboardControl=true;$(document).on('keydown',handleKeyboard);};/*=========================
	          Mousewheel Control
	          ===========================*/s.mousewheel={event:false,lastScrollTime:new window.Date().getTime()};if(s.params.mousewheelControl){try{new window.WheelEvent('wheel');s.mousewheel.event='wheel';}catch(e){if(window.WheelEvent||s.container[0]&&'wheel'in s.container[0]){s.mousewheel.event='wheel';}}if(!s.mousewheel.event&&window.WheelEvent){}if(!s.mousewheel.event&&document.onmousewheel!==undefined){s.mousewheel.event='mousewheel';}if(!s.mousewheel.event){s.mousewheel.event='DOMMouseScroll';}}function handleMousewheel(e){if(e.originalEvent)e=e.originalEvent;//jquery fix
	var we=s.mousewheel.event;var delta=0;var rtlFactor=s.rtl?-1:1;//WebKits
	if(we==='mousewheel'){if(s.params.mousewheelForceToAxis){if(s.isHorizontal()){if(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY))delta=e.wheelDeltaX*rtlFactor;else return;}else{if(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX))delta=e.wheelDeltaY;else return;}}else{delta=Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)?-e.wheelDeltaX*rtlFactor:-e.wheelDeltaY;}}//Old FireFox
	else if(we==='DOMMouseScroll')delta=-e.detail;//New FireFox
	else if(we==='wheel'){if(s.params.mousewheelForceToAxis){if(s.isHorizontal()){if(Math.abs(e.deltaX)>Math.abs(e.deltaY))delta=-e.deltaX*rtlFactor;else return;}else{if(Math.abs(e.deltaY)>Math.abs(e.deltaX))delta=-e.deltaY;else return;}}else{delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX*rtlFactor:-e.deltaY;}}if(delta===0)return;if(s.params.mousewheelInvert)delta=-delta;if(!s.params.freeMode){if(new window.Date().getTime()-s.mousewheel.lastScrollTime>60){if(delta<0){if((!s.isEnd||s.params.loop)&&!s.animating)s.slideNext();else if(s.params.mousewheelReleaseOnEdges)return true;}else{if((!s.isBeginning||s.params.loop)&&!s.animating)s.slidePrev();else if(s.params.mousewheelReleaseOnEdges)return true;}}s.mousewheel.lastScrollTime=new window.Date().getTime();}else{//Freemode or scrollContainer:
	var position=s.getWrapperTranslate()+delta*s.params.mousewheelSensitivity;var wasBeginning=s.isBeginning,wasEnd=s.isEnd;if(position>=s.minTranslate())position=s.minTranslate();if(position<=s.maxTranslate())position=s.maxTranslate();s.setWrapperTransition(0);s.setWrapperTranslate(position);s.updateProgress();s.updateActiveIndex();if(!wasBeginning&&s.isBeginning||!wasEnd&&s.isEnd){s.updateClasses();}if(s.params.freeModeSticky){clearTimeout(s.mousewheel.timeout);s.mousewheel.timeout=setTimeout(function(){s.slideReset();},300);}else{if(s.params.lazyLoading&&s.lazy){s.lazy.load();}}// Return page scroll on edge positions
	if(position===0||position===s.maxTranslate())return;}if(s.params.autoplay)s.stopAutoplay();if(e.preventDefault)e.preventDefault();else e.returnValue=false;return false;}s.disableMousewheelControl=function(){if(!s.mousewheel.event)return false;s.container.off(s.mousewheel.event,handleMousewheel);return true;};s.enableMousewheelControl=function(){if(!s.mousewheel.event)return false;s.container.on(s.mousewheel.event,handleMousewheel);return true;};/*=========================
	          Parallax
	          ===========================*/function setParallaxTransform(el,progress){el=$(el);var p,pX,pY;var rtlFactor=s.rtl?-1:1;p=el.attr('data-swiper-parallax')||'0';pX=el.attr('data-swiper-parallax-x');pY=el.attr('data-swiper-parallax-y');if(pX||pY){pX=pX||'0';pY=pY||'0';}else{if(s.isHorizontal()){pX=p;pY='0';}else{pY=p;pX='0';}}if(pX.indexOf('%')>=0){pX=parseInt(pX,10)*progress*rtlFactor+'%';}else{pX=pX*progress*rtlFactor+'px';}if(pY.indexOf('%')>=0){pY=parseInt(pY,10)*progress+'%';}else{pY=pY*progress+'px';}el.transform('translate3d('+pX+', '+pY+',0px)');}s.parallax={setTranslate:function setTranslate(){s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){setParallaxTransform(this,s.progress);});s.slides.each(function(){var slide=$(this);slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){var progress=Math.min(Math.max(slide[0].progress,-1),1);setParallaxTransform(this,progress);});});},setTransition:function setTransition(duration){if(typeof duration==='undefined')duration=s.params.speed;s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){var el=$(this);var parallaxDuration=parseInt(el.attr('data-swiper-parallax-duration'),10)||duration;if(duration===0)parallaxDuration=0;el.transition(parallaxDuration);});}};/*=========================
	          Plugins API. Collect all and init all plugins
	          ===========================*/s._plugins=[];for(var plugin in s.plugins){var p=s.plugins[plugin](s,s.params[plugin]);if(p)s._plugins.push(p);}// Method to call all plugins event/method
	s.callPlugins=function(eventName){for(var i=0;i<s._plugins.length;i++){if(eventName in s._plugins[i]){s._plugins[i][eventName](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);}}};/*=========================
	          Events/Callbacks/Plugins Emitter
	          ===========================*/function normalizeEventName(eventName){if(eventName.indexOf('on')!==0){if(eventName[0]!==eventName[0].toUpperCase()){eventName='on'+eventName[0].toUpperCase()+eventName.substring(1);}else{eventName='on'+eventName;}}return eventName;}s.emitterEventListeners={};s.emit=function(eventName){// Trigger callbacks
	if(s.params[eventName]){s.params[eventName](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);}var i;// Trigger events
	if(s.emitterEventListeners[eventName]){for(i=0;i<s.emitterEventListeners[eventName].length;i++){s.emitterEventListeners[eventName][i](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);}}// Trigger plugins
	if(s.callPlugins)s.callPlugins(eventName,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);};s.on=function(eventName,handler){eventName=normalizeEventName(eventName);if(!s.emitterEventListeners[eventName])s.emitterEventListeners[eventName]=[];s.emitterEventListeners[eventName].push(handler);return s;};s.off=function(eventName,handler){var i;eventName=normalizeEventName(eventName);if(typeof handler==='undefined'){// Remove all handlers for such event
	s.emitterEventListeners[eventName]=[];return s;}if(!s.emitterEventListeners[eventName]||s.emitterEventListeners[eventName].length===0)return;for(i=0;i<s.emitterEventListeners[eventName].length;i++){if(s.emitterEventListeners[eventName][i]===handler)s.emitterEventListeners[eventName].splice(i,1);}return s;};s.once=function(eventName,handler){eventName=normalizeEventName(eventName);var _handler=function _handler(){handler(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);s.off(eventName,_handler);};s.on(eventName,_handler);return s;};// Accessibility tools
	s.a11y={makeFocusable:function makeFocusable($el){$el.attr('tabIndex','0');return $el;},addRole:function addRole($el,role){$el.attr('role',role);return $el;},addLabel:function addLabel($el,label){$el.attr('aria-label',label);return $el;},disable:function disable($el){$el.attr('aria-disabled',true);return $el;},enable:function enable($el){$el.attr('aria-disabled',false);return $el;},onEnterKey:function onEnterKey(event){if(event.keyCode!==13)return;if($(event.target).is(s.params.nextButton)){s.onClickNext(event);if(s.isEnd){s.a11y.notify(s.params.lastSlideMessage);}else{s.a11y.notify(s.params.nextSlideMessage);}}else if($(event.target).is(s.params.prevButton)){s.onClickPrev(event);if(s.isBeginning){s.a11y.notify(s.params.firstSlideMessage);}else{s.a11y.notify(s.params.prevSlideMessage);}}if($(event.target).is('.'+s.params.bulletClass)){$(event.target)[0].click();}},liveRegion:$('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function notify(message){var notification=s.a11y.liveRegion;if(notification.length===0)return;notification.html('');notification.html(message);},init:function init(){// Setup accessibility
	if(s.params.nextButton&&s.nextButton&&s.nextButton.length>0){s.a11y.makeFocusable(s.nextButton);s.a11y.addRole(s.nextButton,'button');s.a11y.addLabel(s.nextButton,s.params.nextSlideMessage);}if(s.params.prevButton&&s.prevButton&&s.prevButton.length>0){s.a11y.makeFocusable(s.prevButton);s.a11y.addRole(s.prevButton,'button');s.a11y.addLabel(s.prevButton,s.params.prevSlideMessage);}$(s.container).append(s.a11y.liveRegion);},initPagination:function initPagination(){if(s.params.pagination&&s.params.paginationClickable&&s.bullets&&s.bullets.length){s.bullets.each(function(){var bullet=$(this);s.a11y.makeFocusable(bullet);s.a11y.addRole(bullet,'button');s.a11y.addLabel(bullet,s.params.paginationBulletMessage.replace(/{{index}}/,bullet.index()+1));});}},destroy:function destroy(){if(s.a11y.liveRegion&&s.a11y.liveRegion.length>0)s.a11y.liveRegion.remove();}};/*=========================
	          Init/Destroy
	          ===========================*/s.init=function(){if(s.params.loop)s.createLoop();s.updateContainerSize();s.updateSlidesSize();s.updatePagination();if(s.params.scrollbar&&s.scrollbar){s.scrollbar.set();if(s.params.scrollbarDraggable){s.scrollbar.enableDraggable();}}if(s.params.effect!=='slide'&&s.effects[s.params.effect]){if(!s.params.loop)s.updateProgress();s.effects[s.params.effect].setTranslate();}if(s.params.loop){s.slideTo(s.params.initialSlide+s.loopedSlides,0,s.params.runCallbacksOnInit);}else{s.slideTo(s.params.initialSlide,0,s.params.runCallbacksOnInit);if(s.params.initialSlide===0){if(s.parallax&&s.params.parallax)s.parallax.setTranslate();if(s.lazy&&s.params.lazyLoading){s.lazy.load();s.lazy.initialImageLoaded=true;}}}s.attachEvents();if(s.params.observer&&s.support.observer){s.initObservers();}if(s.params.preloadImages&&!s.params.lazyLoading){s.preloadImages();}if(s.params.autoplay){s.startAutoplay();}if(s.params.keyboardControl){if(s.enableKeyboardControl)s.enableKeyboardControl();}if(s.params.mousewheelControl){if(s.enableMousewheelControl)s.enableMousewheelControl();}if(s.params.hashnav){if(s.hashnav)s.hashnav.init();}if(s.params.a11y&&s.a11y)s.a11y.init();s.emit('onInit',s);};// Cleanup dynamic styles
	s.cleanupStyles=function(){// Container
	s.container.removeClass(s.classNames.join(' ')).removeAttr('style');// Wrapper
	s.wrapper.removeAttr('style');// Slides
	if(s.slides&&s.slides.length){s.slides.removeClass([s.params.slideVisibleClass,s.params.slideActiveClass,s.params.slideNextClass,s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row');}// Pagination/Bullets
	if(s.paginationContainer&&s.paginationContainer.length){s.paginationContainer.removeClass(s.params.paginationHiddenClass);}if(s.bullets&&s.bullets.length){s.bullets.removeClass(s.params.bulletActiveClass);}// Buttons
	if(s.params.prevButton)$(s.params.prevButton).removeClass(s.params.buttonDisabledClass);if(s.params.nextButton)$(s.params.nextButton).removeClass(s.params.buttonDisabledClass);// Scrollbar
	if(s.params.scrollbar&&s.scrollbar){if(s.scrollbar.track&&s.scrollbar.track.length)s.scrollbar.track.removeAttr('style');if(s.scrollbar.drag&&s.scrollbar.drag.length)s.scrollbar.drag.removeAttr('style');}};// Destroy
	s.destroy=function(deleteInstance,cleanupStyles){// Detach evebts
	s.detachEvents();// Stop autoplay
	s.stopAutoplay();// Disable draggable
	if(s.params.scrollbar&&s.scrollbar){if(s.params.scrollbarDraggable){s.scrollbar.disableDraggable();}}// Destroy loop
	if(s.params.loop){s.destroyLoop();}// Cleanup styles
	if(cleanupStyles){s.cleanupStyles();}// Disconnect observer
	s.disconnectObservers();// Disable keyboard/mousewheel
	if(s.params.keyboardControl){if(s.disableKeyboardControl)s.disableKeyboardControl();}if(s.params.mousewheelControl){if(s.disableMousewheelControl)s.disableMousewheelControl();}// Disable a11y
	if(s.params.a11y&&s.a11y)s.a11y.destroy();// Destroy callback
	s.emit('onDestroy');// Delete instance
	if(deleteInstance!==false)s=null;};s.init();// Return swiper instance
	return s;};/*==================================================
	        Prototype
	    ====================================================*/Swiper.prototype={isSafari:function(){var ua=navigator.userAgent.toLowerCase();return ua.indexOf('safari')>=0&&ua.indexOf('chrome')<0&&ua.indexOf('android')<0;}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function isArray(arr){return Object.prototype.toString.apply(arr)==='[object Array]';},/*==================================================
	        Browser
	        ====================================================*/browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},/*==================================================
	        Devices
	        ====================================================*/device:function(){var ua=navigator.userAgent;var android=ua.match(/(Android);?[\s\/]+([\d.]+)?/);var ipad=ua.match(/(iPad).*OS\s([\d_]+)/);var ipod=ua.match(/(iPod)(.*OS\s([\d_]+))?/);var iphone=!ipad&&ua.match(/(iPhone\sOS)\s([\d_]+)/);return{ios:ipad||iphone||ipod,android:android};}(),/*==================================================
	        Feature Detection
	        ====================================================*/support:{touch:window.Modernizr&&Modernizr.touch===true||function(){return!!('ontouchstart'in window||window.DocumentTouch&&document instanceof DocumentTouch);}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===true||function(){var div=document.createElement('div').style;return'webkitPerspective'in div||'MozPerspective'in div||'OPerspective'in div||'MsPerspective'in div||'perspective'in div;}(),flexbox:function(){var div=document.createElement('div').style;var styles='alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');for(var i=0;i<styles.length;i++){if(styles[i]in div)return true;}}(),observer:function(){return'MutationObserver'in window||'WebkitMutationObserver'in window;}()},/*==================================================
	        Plugins
	        ====================================================*/plugins:{}};/*===========================
	    Dom7 Library
	    ===========================*/var Dom7=function(){var Dom7=function Dom7(arr){var _this=this,i=0;// Create array-like object
	for(i=0;i<arr.length;i++){_this[i]=arr[i];}_this.length=arr.length;// Return collection with methods
	return this;};var $=function $(selector,context){var arr=[],i=0;if(selector&&!context){if(selector instanceof Dom7){return selector;}}if(selector){// String
	if(typeof selector==='string'){var els,tempParent,html=selector.trim();if(html.indexOf('<')>=0&&html.indexOf('>')>=0){var toCreate='div';if(html.indexOf('<li')===0)toCreate='ul';if(html.indexOf('<tr')===0)toCreate='tbody';if(html.indexOf('<td')===0||html.indexOf('<th')===0)toCreate='tr';if(html.indexOf('<tbody')===0)toCreate='table';if(html.indexOf('<option')===0)toCreate='select';tempParent=document.createElement(toCreate);tempParent.innerHTML=selector;for(i=0;i<tempParent.childNodes.length;i++){arr.push(tempParent.childNodes[i]);}}else{if(!context&&selector[0]==='#'&&!selector.match(/[ .<>:~]/)){// Pure ID selector
	els=[document.getElementById(selector.split('#')[1])];}else{// Other selectors
	els=(context||document).querySelectorAll(selector);}for(i=0;i<els.length;i++){if(els[i])arr.push(els[i]);}}}// Node/element
	else if(selector.nodeType||selector===window||selector===document){arr.push(selector);}//Array of elements or instance of Dom
	else if(selector.length>0&&selector[0].nodeType){for(i=0;i<selector.length;i++){arr.push(selector[i]);}}}return new Dom7(arr);};Dom7.prototype={// Classes and attriutes
	addClass:function addClass(className){if(typeof className==='undefined'){return this;}var classes=className.split(' ');for(var i=0;i<classes.length;i++){for(var j=0;j<this.length;j++){this[j].classList.add(classes[i]);}}return this;},removeClass:function removeClass(className){var classes=className.split(' ');for(var i=0;i<classes.length;i++){for(var j=0;j<this.length;j++){this[j].classList.remove(classes[i]);}}return this;},hasClass:function hasClass(className){if(!this[0])return false;else return this[0].classList.contains(className);},toggleClass:function toggleClass(className){var classes=className.split(' ');for(var i=0;i<classes.length;i++){for(var j=0;j<this.length;j++){this[j].classList.toggle(classes[i]);}}return this;},attr:function attr(attrs,value){if(arguments.length===1&&typeof attrs==='string'){// Get attr
	if(this[0])return this[0].getAttribute(attrs);else return undefined;}else{// Set attrs
	for(var i=0;i<this.length;i++){if(arguments.length===2){// String
	this[i].setAttribute(attrs,value);}else{// Object
	for(var attrName in attrs){this[i][attrName]=attrs[attrName];this[i].setAttribute(attrName,attrs[attrName]);}}}return this;}},removeAttr:function removeAttr(attr){for(var i=0;i<this.length;i++){this[i].removeAttribute(attr);}return this;},data:function data(key,value){if(typeof value==='undefined'){// Get value
	if(this[0]){var dataKey=this[0].getAttribute('data-'+key);if(dataKey)return dataKey;else if(this[0].dom7ElementDataStorage&&key in this[0].dom7ElementDataStorage)return this[0].dom7ElementDataStorage[key];else return undefined;}else return undefined;}else{// Set value
	for(var i=0;i<this.length;i++){var el=this[i];if(!el.dom7ElementDataStorage)el.dom7ElementDataStorage={};el.dom7ElementDataStorage[key]=value;}return this;}},// Transforms
	transform:function transform(_transform){for(var i=0;i<this.length;i++){var elStyle=this[i].style;elStyle.webkitTransform=elStyle.MsTransform=elStyle.msTransform=elStyle.MozTransform=elStyle.OTransform=elStyle.transform=_transform;}return this;},transition:function transition(duration){if(typeof duration!=='string'){duration=duration+'ms';}for(var i=0;i<this.length;i++){var elStyle=this[i].style;elStyle.webkitTransitionDuration=elStyle.MsTransitionDuration=elStyle.msTransitionDuration=elStyle.MozTransitionDuration=elStyle.OTransitionDuration=elStyle.transitionDuration=duration;}return this;},//Events
	on:function on(eventName,targetSelector,listener,capture){function handleLiveEvent(e){var target=e.target;if($(target).is(targetSelector))listener.call(target,e);else{var parents=$(target).parents();for(var k=0;k<parents.length;k++){if($(parents[k]).is(targetSelector))listener.call(parents[k],e);}}}var events=eventName.split(' ');var i,j;for(i=0;i<this.length;i++){if(typeof targetSelector==='function'||targetSelector===false){// Usual events
	if(typeof targetSelector==='function'){listener=arguments[1];capture=arguments[2]||false;}for(j=0;j<events.length;j++){this[i].addEventListener(events[j],listener,capture);}}else{//Live events
	for(j=0;j<events.length;j++){if(!this[i].dom7LiveListeners)this[i].dom7LiveListeners=[];this[i].dom7LiveListeners.push({listener:listener,liveListener:handleLiveEvent});this[i].addEventListener(events[j],handleLiveEvent,capture);}}}return this;},off:function off(eventName,targetSelector,listener,capture){var events=eventName.split(' ');for(var i=0;i<events.length;i++){for(var j=0;j<this.length;j++){if(typeof targetSelector==='function'||targetSelector===false){// Usual events
	if(typeof targetSelector==='function'){listener=arguments[1];capture=arguments[2]||false;}this[j].removeEventListener(events[i],listener,capture);}else{// Live event
	if(this[j].dom7LiveListeners){for(var k=0;k<this[j].dom7LiveListeners.length;k++){if(this[j].dom7LiveListeners[k].listener===listener){this[j].removeEventListener(events[i],this[j].dom7LiveListeners[k].liveListener,capture);}}}}}}return this;},once:function once(eventName,targetSelector,listener,capture){var dom=this;if(typeof targetSelector==='function'){targetSelector=false;listener=arguments[1];capture=arguments[2];}function proxy(e){listener(e);dom.off(eventName,targetSelector,proxy,capture);}dom.on(eventName,targetSelector,proxy,capture);},trigger:function trigger(eventName,eventData){for(var i=0;i<this.length;i++){var evt;try{evt=new window.CustomEvent(eventName,{detail:eventData,bubbles:true,cancelable:true});}catch(e){evt=document.createEvent('Event');evt.initEvent(eventName,true,true);evt.detail=eventData;}this[i].dispatchEvent(evt);}return this;},transitionEnd:function transitionEnd(callback){var events=['webkitTransitionEnd','transitionend','oTransitionEnd','MSTransitionEnd','msTransitionEnd'],i,j,dom=this;function fireCallBack(e){/*jshint validthis:true */if(e.target!==this)return;callback.call(this,e);for(i=0;i<events.length;i++){dom.off(events[i],fireCallBack);}}if(callback){for(i=0;i<events.length;i++){dom.on(events[i],fireCallBack);}}return this;},// Sizing/Styles
	width:function width(){if(this[0]===window){return window.innerWidth;}else{if(this.length>0){return parseFloat(this.css('width'));}else{return null;}}},outerWidth:function outerWidth(includeMargins){if(this.length>0){if(includeMargins)return this[0].offsetWidth+parseFloat(this.css('margin-right'))+parseFloat(this.css('margin-left'));else return this[0].offsetWidth;}else return null;},height:function height(){if(this[0]===window){return window.innerHeight;}else{if(this.length>0){return parseFloat(this.css('height'));}else{return null;}}},outerHeight:function outerHeight(includeMargins){if(this.length>0){if(includeMargins)return this[0].offsetHeight+parseFloat(this.css('margin-top'))+parseFloat(this.css('margin-bottom'));else return this[0].offsetHeight;}else return null;},offset:function offset(){if(this.length>0){var el=this[0];var box=el.getBoundingClientRect();var body=document.body;var clientTop=el.clientTop||body.clientTop||0;var clientLeft=el.clientLeft||body.clientLeft||0;var scrollTop=window.pageYOffset||el.scrollTop;var scrollLeft=window.pageXOffset||el.scrollLeft;return{top:box.top+scrollTop-clientTop,left:box.left+scrollLeft-clientLeft};}else{return null;}},css:function css(props,value){var i;if(arguments.length===1){if(typeof props==='string'){if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(props);}else{for(i=0;i<this.length;i++){for(var prop in props){this[i].style[prop]=props[prop];}}return this;}}if(arguments.length===2&&typeof props==='string'){for(i=0;i<this.length;i++){this[i].style[props]=value;}return this;}return this;},//Dom manipulation
	each:function each(callback){for(var i=0;i<this.length;i++){callback.call(this[i],i,this[i]);}return this;},html:function html(_html){if(typeof _html==='undefined'){return this[0]?this[0].innerHTML:undefined;}else{for(var i=0;i<this.length;i++){this[i].innerHTML=_html;}return this;}},text:function text(_text){if(typeof _text==='undefined'){if(this[0]){return this[0].textContent.trim();}else return null;}else{for(var i=0;i<this.length;i++){this[i].textContent=_text;}return this;}},is:function is(selector){if(!this[0])return false;var compareWith,i;if(typeof selector==='string'){var el=this[0];if(el===document)return selector===document;if(el===window)return selector===window;if(el.matches)return el.matches(selector);else if(el.webkitMatchesSelector)return el.webkitMatchesSelector(selector);else if(el.mozMatchesSelector)return el.mozMatchesSelector(selector);else if(el.msMatchesSelector)return el.msMatchesSelector(selector);else{compareWith=$(selector);for(i=0;i<compareWith.length;i++){if(compareWith[i]===this[0])return true;}return false;}}else if(selector===document)return this[0]===document;else if(selector===window)return this[0]===window;else{if(selector.nodeType||selector instanceof Dom7){compareWith=selector.nodeType?[selector]:selector;for(i=0;i<compareWith.length;i++){if(compareWith[i]===this[0])return true;}return false;}return false;}},index:function index(){if(this[0]){var child=this[0];var i=0;while((child=child.previousSibling)!==null){if(child.nodeType===1)i++;}return i;}else return undefined;},eq:function eq(index){if(typeof index==='undefined')return this;var length=this.length;var returnIndex;if(index>length-1){return new Dom7([]);}if(index<0){returnIndex=length+index;if(returnIndex<0)return new Dom7([]);else return new Dom7([this[returnIndex]]);}return new Dom7([this[index]]);},append:function append(newChild){var i,j;for(i=0;i<this.length;i++){if(typeof newChild==='string'){var tempDiv=document.createElement('div');tempDiv.innerHTML=newChild;while(tempDiv.firstChild){this[i].appendChild(tempDiv.firstChild);}}else if(newChild instanceof Dom7){for(j=0;j<newChild.length;j++){this[i].appendChild(newChild[j]);}}else{this[i].appendChild(newChild);}}return this;},prepend:function prepend(newChild){var i,j;for(i=0;i<this.length;i++){if(typeof newChild==='string'){var tempDiv=document.createElement('div');tempDiv.innerHTML=newChild;for(j=tempDiv.childNodes.length-1;j>=0;j--){this[i].insertBefore(tempDiv.childNodes[j],this[i].childNodes[0]);}// this[i].insertAdjacentHTML('afterbegin', newChild);
	}else if(newChild instanceof Dom7){for(j=0;j<newChild.length;j++){this[i].insertBefore(newChild[j],this[i].childNodes[0]);}}else{this[i].insertBefore(newChild,this[i].childNodes[0]);}}return this;},insertBefore:function insertBefore(selector){var before=$(selector);for(var i=0;i<this.length;i++){if(before.length===1){before[0].parentNode.insertBefore(this[i],before[0]);}else if(before.length>1){for(var j=0;j<before.length;j++){before[j].parentNode.insertBefore(this[i].cloneNode(true),before[j]);}}}},insertAfter:function insertAfter(selector){var after=$(selector);for(var i=0;i<this.length;i++){if(after.length===1){after[0].parentNode.insertBefore(this[i],after[0].nextSibling);}else if(after.length>1){for(var j=0;j<after.length;j++){after[j].parentNode.insertBefore(this[i].cloneNode(true),after[j].nextSibling);}}}},next:function next(selector){if(this.length>0){if(selector){if(this[0].nextElementSibling&&$(this[0].nextElementSibling).is(selector))return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);}else{if(this[0].nextElementSibling)return new Dom7([this[0].nextElementSibling]);else return new Dom7([]);}}else return new Dom7([]);},nextAll:function nextAll(selector){var nextEls=[];var el=this[0];if(!el)return new Dom7([]);while(el.nextElementSibling){var next=el.nextElementSibling;if(selector){if($(next).is(selector))nextEls.push(next);}else nextEls.push(next);el=next;}return new Dom7(nextEls);},prev:function prev(selector){if(this.length>0){if(selector){if(this[0].previousElementSibling&&$(this[0].previousElementSibling).is(selector))return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);}else{if(this[0].previousElementSibling)return new Dom7([this[0].previousElementSibling]);else return new Dom7([]);}}else return new Dom7([]);},prevAll:function prevAll(selector){var prevEls=[];var el=this[0];if(!el)return new Dom7([]);while(el.previousElementSibling){var prev=el.previousElementSibling;if(selector){if($(prev).is(selector))prevEls.push(prev);}else prevEls.push(prev);el=prev;}return new Dom7(prevEls);},parent:function parent(selector){var parents=[];for(var i=0;i<this.length;i++){if(selector){if($(this[i].parentNode).is(selector))parents.push(this[i].parentNode);}else{parents.push(this[i].parentNode);}}return $($.unique(parents));},parents:function parents(selector){var parents=[];for(var i=0;i<this.length;i++){var parent=this[i].parentNode;while(parent){if(selector){if($(parent).is(selector))parents.push(parent);}else{parents.push(parent);}parent=parent.parentNode;}}return $($.unique(parents));},find:function find(selector){var foundElements=[];for(var i=0;i<this.length;i++){var found=this[i].querySelectorAll(selector);for(var j=0;j<found.length;j++){foundElements.push(found[j]);}}return new Dom7(foundElements);},children:function children(selector){var children=[];for(var i=0;i<this.length;i++){var childNodes=this[i].childNodes;for(var j=0;j<childNodes.length;j++){if(!selector){if(childNodes[j].nodeType===1)children.push(childNodes[j]);}else{if(childNodes[j].nodeType===1&&$(childNodes[j]).is(selector))children.push(childNodes[j]);}}}return new Dom7($.unique(children));},remove:function remove(){for(var i=0;i<this.length;i++){if(this[i].parentNode)this[i].parentNode.removeChild(this[i]);}return this;},add:function add(){var dom=this;var i,j;for(i=0;i<arguments.length;i++){var toAdd=$(arguments[i]);for(j=0;j<toAdd.length;j++){dom[dom.length]=toAdd[j];dom.length++;}}return dom;}};$.fn=Dom7.prototype;$.unique=function(arr){var unique=[];for(var i=0;i<arr.length;i++){if(unique.indexOf(arr[i])===-1)unique.push(arr[i]);}return unique;};return $;}();/*===========================
	     Get Dom libraries
	     ===========================*/var swiperDomPlugins=['jQuery','Zepto','Dom7'];for(var i=0;i<swiperDomPlugins.length;i++){if(window[swiperDomPlugins[i]]){addLibraryPlugin(window[swiperDomPlugins[i]]);}}// Required DOM Plugins
	var domLib;if(typeof Dom7==='undefined'){domLib=window.Dom7||window.Zepto||window.jQuery;}else{domLib=Dom7;}/*===========================
	    Add .swiper plugin from Dom libraries
	    ===========================*/function addLibraryPlugin(lib){lib.fn.swiper=function(params){var firstInstance;lib(this).each(function(){var s=new Swiper(this,params);if(!firstInstance)firstInstance=s;});return firstInstance;};}if(domLib){if(!('transitionEnd'in domLib.fn)){domLib.fn.transitionEnd=function(callback){var events=['webkitTransitionEnd','transitionend','oTransitionEnd','MSTransitionEnd','msTransitionEnd'],i,j,dom=this;function fireCallBack(e){/*jshint validthis:true */if(e.target!==this)return;callback.call(this,e);for(i=0;i<events.length;i++){dom.off(events[i],fireCallBack);}}if(callback){for(i=0;i<events.length;i++){dom.on(events[i],fireCallBack);}}return this;};}if(!('transform'in domLib.fn)){domLib.fn.transform=function(transform){for(var i=0;i<this.length;i++){var elStyle=this[i].style;elStyle.webkitTransform=elStyle.MsTransform=elStyle.msTransform=elStyle.MozTransform=elStyle.OTransform=elStyle.transform=transform;}return this;};}if(!('transition'in domLib.fn)){domLib.fn.transition=function(duration){if(typeof duration!=='string'){duration=duration+'ms';}for(var i=0;i<this.length;i++){var elStyle=this[i].style;elStyle.webkitTransitionDuration=elStyle.MsTransitionDuration=elStyle.msTransitionDuration=elStyle.MozTransitionDuration=elStyle.OTransitionDuration=elStyle.transitionDuration=duration;}return this;};}}window.Swiper=Swiper;})();/*===========================
	Swiper AMD Export
	===========================*/if(true){module.exports=window.Swiper;}else if(typeof define==='function'&&define.amd){define([],function(){'use strict';return window.Swiper;});}//# sourceMappingURL=maps/swiper.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(6);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(57);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	__webpack_require__(52);
	module.exports = __webpack_require__(56).f('iterator');

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(9)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(12)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , defined   = __webpack_require__(11);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(13)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(19)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(31)
	  , $iterCreate    = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(50)
	  , ITERATOR       = __webpack_require__(49)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(15)
	  , core      = __webpack_require__(16)
	  , ctx       = __webpack_require__(17)
	  , hide      = __webpack_require__(19)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 15 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 16 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(20)
	  , createDesc = __webpack_require__(28);
	module.exports = __webpack_require__(24) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(21)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(27)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(24) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(24) && !__webpack_require__(25)(function(){
	  return Object.defineProperty(__webpack_require__(26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(25)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(22)
	  , document = __webpack_require__(15).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(22);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(33)
	  , descriptor     = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(48)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(19)(IteratorPrototype, __webpack_require__(49)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(21)
	  , dPs         = __webpack_require__(34)
	  , enumBugKeys = __webpack_require__(46)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(26)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(47).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(20)
	  , anObject = __webpack_require__(21)
	  , getKeys  = __webpack_require__(35);
	
	module.exports = __webpack_require__(24) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(46);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(37)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(11);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(10)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(10)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(44)('keys')
	  , uid    = __webpack_require__(45);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(15)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15).document && document.documentElement;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(20).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(49)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(44)('wks')
	  , uid        = __webpack_require__(45)
	  , Symbol     = __webpack_require__(15).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(11);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	var global        = __webpack_require__(15)
	  , hide          = __webpack_require__(19)
	  , Iterators     = __webpack_require__(31)
	  , TO_STRING_TAG = __webpack_require__(49)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(54)
	  , step             = __webpack_require__(55)
	  , Iterators        = __webpack_require__(31)
	  , toIObject        = __webpack_require__(37);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(12)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(49);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	__webpack_require__(70);
	__webpack_require__(71);
	__webpack_require__(72);
	module.exports = __webpack_require__(16).Symbol;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(15)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(24)
	  , $export        = __webpack_require__(14)
	  , redefine       = __webpack_require__(29)
	  , META           = __webpack_require__(60).KEY
	  , $fails         = __webpack_require__(25)
	  , shared         = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(48)
	  , uid            = __webpack_require__(45)
	  , wks            = __webpack_require__(49)
	  , wksExt         = __webpack_require__(56)
	  , wksDefine      = __webpack_require__(61)
	  , keyOf          = __webpack_require__(62)
	  , enumKeys       = __webpack_require__(63)
	  , isArray        = __webpack_require__(66)
	  , anObject       = __webpack_require__(21)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(27)
	  , createDesc     = __webpack_require__(28)
	  , _create        = __webpack_require__(33)
	  , gOPNExt        = __webpack_require__(67)
	  , $GOPD          = __webpack_require__(69)
	  , $DP            = __webpack_require__(20)
	  , $keys          = __webpack_require__(35)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(68).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(65).f  = $propertyIsEnumerable;
	  __webpack_require__(64).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(13)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(19)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(45)('meta')
	  , isObject = __webpack_require__(22)
	  , has      = __webpack_require__(30)
	  , setDesc  = __webpack_require__(20).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(25)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(15)
	  , core           = __webpack_require__(16)
	  , LIBRARY        = __webpack_require__(13)
	  , wksExt         = __webpack_require__(56)
	  , defineProperty = __webpack_require__(20).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(35)
	  , toIObject = __webpack_require__(37);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(35)
	  , gOPS    = __webpack_require__(64)
	  , pIE     = __webpack_require__(65);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 65 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37)
	  , gOPN      = __webpack_require__(68).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(36)
	  , hiddenKeys = __webpack_require__(46).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(65)
	  , createDesc     = __webpack_require__(28)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(27)
	  , has            = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(23)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(24) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 70 */
/***/ function(module, exports) {



/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61)('asyncIterator');

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61)('observable');

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod);
	    global.util = mod.exports;
	  }
	})(undefined, function (exports, module) {
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): util.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	
	  'use strict';
	
	  var Util = function ($) {
	
	    /**
	     * ------------------------------------------------------------------------
	     * Private TransitionEnd Helpers
	     * ------------------------------------------------------------------------
	     */
	
	    var transition = false;
	
	    var TransitionEndEvent = {
	      WebkitTransition: 'webkitTransitionEnd',
	      MozTransition: 'transitionend',
	      OTransition: 'oTransitionEnd otransitionend',
	      transition: 'transitionend'
	    };
	
	    // shoutout AngusCroll (https://goo.gl/pxwQGp)
	    function toType(obj) {
	      return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	    }
	
	    function isElement(obj) {
	      return (obj[0] || obj).nodeType;
	    }
	
	    function getSpecialTransitionEndEvent() {
	      return {
	        bindType: transition.end,
	        delegateType: transition.end,
	        handle: function handle(event) {
	          if ($(event.target).is(this)) {
	            return event.handleObj.handler.apply(this, arguments);
	          }
	        }
	      };
	    }
	
	    function transitionEndTest() {
	      if (window.QUnit) {
	        return false;
	      }
	
	      var el = document.createElement('bootstrap');
	
	      for (var _name in TransitionEndEvent) {
	        if (el.style[_name] !== undefined) {
	          return { end: TransitionEndEvent[_name] };
	        }
	      }
	
	      return false;
	    }
	
	    function transitionEndEmulator(duration) {
	      var _this = this;
	
	      var called = false;
	
	      $(this).one(Util.TRANSITION_END, function () {
	        called = true;
	      });
	
	      setTimeout(function () {
	        if (!called) {
	          Util.triggerTransitionEnd(_this);
	        }
	      }, duration);
	
	      return this;
	    }
	
	    function setTransitionEndSupport() {
	      transition = transitionEndTest();
	
	      $.fn.emulateTransitionEnd = transitionEndEmulator;
	
	      if (Util.supportsTransitionEnd()) {
	        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
	      }
	    }
	
	    /**
	     * --------------------------------------------------------------------------
	     * Public Util Api
	     * --------------------------------------------------------------------------
	     */
	
	    var Util = {
	
	      TRANSITION_END: 'bsTransitionEnd',
	
	      getUID: function getUID(prefix) {
	        do {
	          prefix += ~~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
	        } while (document.getElementById(prefix));
	        return prefix;
	      },
	
	      getSelectorFromElement: function getSelectorFromElement(element) {
	        var selector = element.getAttribute('data-target');
	
	        if (!selector) {
	          selector = element.getAttribute('href') || '';
	          selector = /^#[a-z]/i.test(selector) ? selector : null;
	        }
	
	        return selector;
	      },
	
	      reflow: function reflow(element) {
	        new Function('bs', 'return bs')(element.offsetHeight);
	      },
	
	      triggerTransitionEnd: function triggerTransitionEnd(element) {
	        $(element).trigger(transition.end);
	      },
	
	      supportsTransitionEnd: function supportsTransitionEnd() {
	        return Boolean(transition);
	      },
	
	      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
	        for (var property in configTypes) {
	          if (configTypes.hasOwnProperty(property)) {
	            var expectedTypes = configTypes[property];
	            var value = config[property];
	            var valueType = undefined;
	
	            if (value && isElement(value)) {
	              valueType = 'element';
	            } else {
	              valueType = toType(value);
	            }
	
	            if (!new RegExp(expectedTypes).test(valueType)) {
	              throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
	            }
	          }
	        }
	      }
	    };
	
	    setTransitionEndSupport();
	
	    return Util;
	  }(jQuery);
	
	  module.exports = Util;
	});

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! =======================================================
	                      VERSION  9.3.0              
	========================================================= */
	"use strict";
	
	var _keys = __webpack_require__(75);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _iterator = __webpack_require__(6);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _typeof3 = __webpack_require__(5);
	
	var _typeof4 = _interopRequireDefault(_typeof3);
	
	var _symbol = __webpack_require__(57);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _typeof = typeof _symbol2.default === "function" && (0, _typeof4.default)(_iterator2.default) === "symbol" ? function (obj) {
		return typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
	} : function (obj) {
		return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : (0, _typeof4.default)(obj);
	};
	
	/*! =========================================================
	 * bootstrap-slider.js
	 *
	 * Maintainers:
	 *		Kyle Kemp
	 *			- Twitter: @seiyria
	 *			- Github:  seiyria
	 *		Rohit Kalkur
	 *			- Twitter: @Rovolutionary
	 *			- Github:  rovolution
	 *
	 * =========================================================
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * ========================================================= */
	
	/**
	 * Bridget makes jQuery widgets
	 * v1.0.1
	 * MIT license
	 */
	var windowIsDefined = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";
	
	(function (factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
			var jQuery;
			try {
				jQuery = require("jquery");
			} catch (err) {
				jQuery = null;
			}
			module.exports = factory(jQuery);
		} else if (window) {
			window.Slider = factory(window.jQuery);
		}
	})(function ($) {
		// Constants
		var NAMESPACE_MAIN = 'slider';
		var NAMESPACE_ALTERNATE = 'bootstrapSlider';
	
		// Polyfill console methods
		if (windowIsDefined && !window.console) {
			window.console = {};
		}
		if (windowIsDefined && !window.console.log) {
			window.console.log = function () {};
		}
		if (windowIsDefined && !window.console.warn) {
			window.console.warn = function () {};
		}
	
		// Reference to Slider constructor
		var Slider;
	
		(function ($) {
	
			'use strict';
	
			// -------------------------- utils -------------------------- //
	
			var slice = Array.prototype.slice;
	
			function noop() {}
	
			// -------------------------- definition -------------------------- //
	
			function defineBridget($) {
	
				// bail if no jQuery
				if (!$) {
					return;
				}
	
				// -------------------------- addOptionMethod -------------------------- //
	
				/**
	    * adds option method -> $().plugin('option', {...})
	    * @param {Function} PluginClass - constructor class
	    */
				function addOptionMethod(PluginClass) {
					// don't overwrite original option method
					if (PluginClass.prototype.option) {
						return;
					}
	
					// option setter
					PluginClass.prototype.option = function (opts) {
						// bail out if not an object
						if (!$.isPlainObject(opts)) {
							return;
						}
						this.options = $.extend(true, this.options, opts);
					};
				}
	
				// -------------------------- plugin bridge -------------------------- //
	
				// helper function for logging errors
				// $.error breaks jQuery chaining
				var logError = typeof console === 'undefined' ? noop : function (message) {
					console.error(message);
				};
	
				/**
	    * jQuery plugin bridge, access methods like $elem.plugin('method')
	    * @param {String} namespace - plugin name
	    * @param {Function} PluginClass - constructor class
	    */
				function bridge(namespace, PluginClass) {
					// add to jQuery fn namespace
					$.fn[namespace] = function (options) {
						if (typeof options === 'string') {
							// call plugin method when first argument is a string
							// get arguments for method
							var args = slice.call(arguments, 1);
	
							for (var i = 0, len = this.length; i < len; i++) {
								var elem = this[i];
								var instance = $.data(elem, namespace);
								if (!instance) {
									logError("cannot call methods on " + namespace + " prior to initialization; " + "attempted to call '" + options + "'");
									continue;
								}
								if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
									logError("no such method '" + options + "' for " + namespace + " instance");
									continue;
								}
	
								// trigger method with arguments
								var returnValue = instance[options].apply(instance, args);
	
								// break look and return first value if provided
								if (returnValue !== undefined && returnValue !== instance) {
									return returnValue;
								}
							}
							// return this if no return value
							return this;
						} else {
							var objects = this.map(function () {
								var instance = $.data(this, namespace);
								if (instance) {
									// apply options & init
									instance.option(options);
									instance._init();
								} else {
									// initialize new instance
									instance = new PluginClass(this, options);
									$.data(this, namespace, instance);
								}
								return $(this);
							});
	
							if (!objects || objects.length > 1) {
								return objects;
							} else {
								return objects[0];
							}
						}
					};
				}
	
				// -------------------------- bridget -------------------------- //
	
				/**
	    * converts a Prototypical class into a proper jQuery plugin
	    *   the class must have a ._init method
	    * @param {String} namespace - plugin name, used in $().pluginName
	    * @param {Function} PluginClass - constructor class
	    */
				$.bridget = function (namespace, PluginClass) {
					addOptionMethod(PluginClass);
					bridge(namespace, PluginClass);
				};
	
				return $.bridget;
			}
	
			// get jquery from browser global
			defineBridget($);
		})($);
	
		/*************************************************
	 			BOOTSTRAP-SLIDER SOURCE CODE
	 	**************************************************/
	
		(function ($) {
	
			var ErrorMsgs = {
				formatInvalidInputErrorMsg: function formatInvalidInputErrorMsg(input) {
					return "Invalid input value '" + input + "' passed in";
				},
				callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
			};
	
			var SliderScale = {
				linear: {
					toValue: function toValue(percentage) {
						var rawValue = percentage / 100 * (this.options.max - this.options.min);
						var shouldAdjustWithBase = true;
						if (this.options.ticks_positions.length > 0) {
							var minv,
							    maxv,
							    minp,
							    maxp = 0;
							for (var i = 1; i < this.options.ticks_positions.length; i++) {
								if (percentage <= this.options.ticks_positions[i]) {
									minv = this.options.ticks[i - 1];
									minp = this.options.ticks_positions[i - 1];
									maxv = this.options.ticks[i];
									maxp = this.options.ticks_positions[i];
	
									break;
								}
							}
							var partialPercentage = (percentage - minp) / (maxp - minp);
							rawValue = minv + partialPercentage * (maxv - minv);
							shouldAdjustWithBase = false;
						}
	
						var adjustment = shouldAdjustWithBase ? this.options.min : 0;
						var value = adjustment + Math.round(rawValue / this.options.step) * this.options.step;
						if (value < this.options.min) {
							return this.options.min;
						} else if (value > this.options.max) {
							return this.options.max;
						} else {
							return value;
						}
					},
					toPercentage: function toPercentage(value) {
						if (this.options.max === this.options.min) {
							return 0;
						}
	
						if (this.options.ticks_positions.length > 0) {
							var minv,
							    maxv,
							    minp,
							    maxp = 0;
							for (var i = 0; i < this.options.ticks.length; i++) {
								if (value <= this.options.ticks[i]) {
									minv = i > 0 ? this.options.ticks[i - 1] : 0;
									minp = i > 0 ? this.options.ticks_positions[i - 1] : 0;
									maxv = this.options.ticks[i];
									maxp = this.options.ticks_positions[i];
	
									break;
								}
							}
							if (i > 0) {
								var partialPercentage = (value - minv) / (maxv - minv);
								return minp + partialPercentage * (maxp - minp);
							}
						}
	
						return 100 * (value - this.options.min) / (this.options.max - this.options.min);
					}
				},
	
				logarithmic: {
					/* Based on http://stackoverflow.com/questions/846221/logarithmic-slider */
					toValue: function toValue(percentage) {
						var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
						var max = Math.log(this.options.max);
						var value = Math.exp(min + (max - min) * percentage / 100);
						value = this.options.min + Math.round((value - this.options.min) / this.options.step) * this.options.step;
						/* Rounding to the nearest step could exceed the min or
	      * max, so clip to those values. */
						if (value < this.options.min) {
							return this.options.min;
						} else if (value > this.options.max) {
							return this.options.max;
						} else {
							return value;
						}
					},
					toPercentage: function toPercentage(value) {
						if (this.options.max === this.options.min) {
							return 0;
						} else {
							var max = Math.log(this.options.max);
							var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
							var v = value === 0 ? 0 : Math.log(value);
							return 100 * (v - min) / (max - min);
						}
					}
				}
			};
	
			/*************************************************
	  						CONSTRUCTOR
	  	**************************************************/
			Slider = function Slider(element, options) {
				createNewSlider.call(this, element, options);
				return this;
			};
	
			function createNewSlider(element, options) {
	
				/*
	   	The internal state object is used to store data about the current 'state' of slider.
	   	This includes values such as the `value`, `enabled`, etc...
	   */
				this._state = {
					value: null,
					enabled: null,
					offset: null,
					size: null,
					percentage: null,
					inDrag: false,
					over: false
				};
	
				// The objects used to store the reference to the tick methods if ticks_tooltip is on
				this.ticksCallbackMap = {};
				this.handleCallbackMap = {};
	
				if (typeof element === "string") {
					this.element = document.querySelector(element);
				} else if (element instanceof HTMLElement) {
					this.element = element;
				}
	
				/*************************************************
	   					Process Options
	   	**************************************************/
				options = options ? options : {};
				var optionTypes = (0, _keys2.default)(this.defaultOptions);
	
				for (var i = 0; i < optionTypes.length; i++) {
					var optName = optionTypes[i];
	
					// First check if an option was passed in via the constructor
					var val = options[optName];
					// If no data attrib, then check data atrributes
					val = typeof val !== 'undefined' ? val : getDataAttrib(this.element, optName);
					// Finally, if nothing was specified, use the defaults
					val = val !== null ? val : this.defaultOptions[optName];
	
					// Set all options on the instance of the Slider
					if (!this.options) {
						this.options = {};
					}
					this.options[optName] = val;
				}
	
				/*
	   	Validate `tooltip_position` against 'orientation`
	   	- if `tooltip_position` is incompatible with orientation, swith it to a default compatible with specified `orientation`
	   		-- default for "vertical" -> "right"
	   		-- default for "horizontal" -> "left"
	   */
				if (this.options.orientation === "vertical" && (this.options.tooltip_position === "top" || this.options.tooltip_position === "bottom")) {
	
					this.options.tooltip_position = "right";
				} else if (this.options.orientation === "horizontal" && (this.options.tooltip_position === "left" || this.options.tooltip_position === "right")) {
	
					this.options.tooltip_position = "top";
				}
	
				function getDataAttrib(element, optName) {
					var dataName = "data-slider-" + optName.replace(/_/g, '-');
					var dataValString = element.getAttribute(dataName);
	
					try {
						return JSON.parse(dataValString);
					} catch (err) {
						return dataValString;
					}
				}
	
				/*************************************************
	   					Create Markup
	   	**************************************************/
	
				var origWidth = this.element.style.width;
				var updateSlider = false;
				var parent = this.element.parentNode;
				var sliderTrackSelection;
				var sliderTrackLow, sliderTrackHigh;
				var sliderMinHandle;
				var sliderMaxHandle;
	
				if (this.sliderElem) {
					updateSlider = true;
				} else {
					/* Create elements needed for slider */
					this.sliderElem = document.createElement("div");
					this.sliderElem.className = "slider";
	
					/* Create slider track elements */
					var sliderTrack = document.createElement("div");
					sliderTrack.className = "slider-track";
	
					sliderTrackLow = document.createElement("div");
					sliderTrackLow.className = "slider-track-low";
	
					sliderTrackSelection = document.createElement("div");
					sliderTrackSelection.className = "slider-selection";
	
					sliderTrackHigh = document.createElement("div");
					sliderTrackHigh.className = "slider-track-high";
	
					sliderMinHandle = document.createElement("div");
					sliderMinHandle.className = "slider-handle min-slider-handle";
					sliderMinHandle.setAttribute('role', 'slider');
					sliderMinHandle.setAttribute('aria-valuemin', this.options.min);
					sliderMinHandle.setAttribute('aria-valuemax', this.options.max);
	
					sliderMaxHandle = document.createElement("div");
					sliderMaxHandle.className = "slider-handle max-slider-handle";
					sliderMaxHandle.setAttribute('role', 'slider');
					sliderMaxHandle.setAttribute('aria-valuemin', this.options.min);
					sliderMaxHandle.setAttribute('aria-valuemax', this.options.max);
	
					sliderTrack.appendChild(sliderTrackLow);
					sliderTrack.appendChild(sliderTrackSelection);
					sliderTrack.appendChild(sliderTrackHigh);
	
					/* Create highlight range elements */
					this.rangeHighlightElements = [];
					if (Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
						for (var j = 0; j < this.options.rangeHighlights.length; j++) {
	
							var rangeHighlightElement = document.createElement("div");
							rangeHighlightElement.className = "slider-rangeHighlight slider-selection";
	
							this.rangeHighlightElements.push(rangeHighlightElement);
							sliderTrack.appendChild(rangeHighlightElement);
						}
					}
	
					/* Add aria-labelledby to handle's */
					var isLabelledbyArray = Array.isArray(this.options.labelledby);
					if (isLabelledbyArray && this.options.labelledby[0]) {
						sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby[0]);
					}
					if (isLabelledbyArray && this.options.labelledby[1]) {
						sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby[1]);
					}
					if (!isLabelledbyArray && this.options.labelledby) {
						sliderMinHandle.setAttribute('aria-labelledby', this.options.labelledby);
						sliderMaxHandle.setAttribute('aria-labelledby', this.options.labelledby);
					}
	
					/* Create ticks */
					this.ticks = [];
					if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
						this.ticksContainer = document.createElement('div');
						this.ticksContainer.className = 'slider-tick-container';
	
						for (i = 0; i < this.options.ticks.length; i++) {
							var tick = document.createElement('div');
							tick.className = 'slider-tick';
							if (this.options.ticks_tooltip) {
								var tickListenerReference = this._addTickListener();
								var enterCallback = tickListenerReference.addMouseEnter(this, tick, i);
								var leaveCallback = tickListenerReference.addMouseLeave(this, tick);
	
								this.ticksCallbackMap[i] = {
									mouseEnter: enterCallback,
									mouseLeave: leaveCallback
								};
							}
							this.ticks.push(tick);
							this.ticksContainer.appendChild(tick);
						}
	
						sliderTrackSelection.className += " tick-slider-selection";
					}
	
					this.tickLabels = [];
					if (Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0) {
						this.tickLabelContainer = document.createElement('div');
						this.tickLabelContainer.className = 'slider-tick-label-container';
	
						for (i = 0; i < this.options.ticks_labels.length; i++) {
							var label = document.createElement('div');
							var noTickPositionsSpecified = this.options.ticks_positions.length === 0;
							var tickLabelsIndex = this.options.reversed && noTickPositionsSpecified ? this.options.ticks_labels.length - (i + 1) : i;
							label.className = 'slider-tick-label';
							label.innerHTML = this.options.ticks_labels[tickLabelsIndex];
	
							this.tickLabels.push(label);
							this.tickLabelContainer.appendChild(label);
						}
					}
	
					var createAndAppendTooltipSubElements = function createAndAppendTooltipSubElements(tooltipElem) {
						var arrow = document.createElement("div");
						arrow.className = "tooltip-arrow";
	
						var inner = document.createElement("div");
						inner.className = "tooltip-inner";
	
						tooltipElem.appendChild(arrow);
						tooltipElem.appendChild(inner);
					};
	
					/* Create tooltip elements */
					var sliderTooltip = document.createElement("div");
					sliderTooltip.className = "tooltip tooltip-main";
					sliderTooltip.setAttribute('role', 'presentation');
					createAndAppendTooltipSubElements(sliderTooltip);
	
					var sliderTooltipMin = document.createElement("div");
					sliderTooltipMin.className = "tooltip tooltip-min";
					sliderTooltipMin.setAttribute('role', 'presentation');
					createAndAppendTooltipSubElements(sliderTooltipMin);
	
					var sliderTooltipMax = document.createElement("div");
					sliderTooltipMax.className = "tooltip tooltip-max";
					sliderTooltipMax.setAttribute('role', 'presentation');
					createAndAppendTooltipSubElements(sliderTooltipMax);
	
					/* Append components to sliderElem */
					this.sliderElem.appendChild(sliderTrack);
					this.sliderElem.appendChild(sliderTooltip);
					this.sliderElem.appendChild(sliderTooltipMin);
					this.sliderElem.appendChild(sliderTooltipMax);
	
					if (this.tickLabelContainer) {
						this.sliderElem.appendChild(this.tickLabelContainer);
					}
					if (this.ticksContainer) {
						this.sliderElem.appendChild(this.ticksContainer);
					}
	
					this.sliderElem.appendChild(sliderMinHandle);
					this.sliderElem.appendChild(sliderMaxHandle);
	
					/* Append slider element to parent container, right before the original <input> element */
					parent.insertBefore(this.sliderElem, this.element);
	
					/* Hide original <input> element */
					this.element.style.display = "none";
				}
				/* If JQuery exists, cache JQ references */
				if ($) {
					this.$element = $(this.element);
					this.$sliderElem = $(this.sliderElem);
				}
	
				/*************************************************
	   						Setup
	   	**************************************************/
				this.eventToCallbackMap = {};
				this.sliderElem.id = this.options.id;
	
				this.touchCapable = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
	
				this.touchX = 0;
				this.touchY = 0;
	
				this.tooltip = this.sliderElem.querySelector('.tooltip-main');
				this.tooltipInner = this.tooltip.querySelector('.tooltip-inner');
	
				this.tooltip_min = this.sliderElem.querySelector('.tooltip-min');
				this.tooltipInner_min = this.tooltip_min.querySelector('.tooltip-inner');
	
				this.tooltip_max = this.sliderElem.querySelector('.tooltip-max');
				this.tooltipInner_max = this.tooltip_max.querySelector('.tooltip-inner');
	
				if (SliderScale[this.options.scale]) {
					this.options.scale = SliderScale[this.options.scale];
				}
	
				if (updateSlider === true) {
					// Reset classes
					this._removeClass(this.sliderElem, 'slider-horizontal');
					this._removeClass(this.sliderElem, 'slider-vertical');
					this._removeClass(this.tooltip, 'hide');
					this._removeClass(this.tooltip_min, 'hide');
					this._removeClass(this.tooltip_max, 'hide');
	
					// Undo existing inline styles for track
					["left", "top", "width", "height"].forEach(function (prop) {
						this._removeProperty(this.trackLow, prop);
						this._removeProperty(this.trackSelection, prop);
						this._removeProperty(this.trackHigh, prop);
					}, this);
	
					// Undo inline styles on handles
					[this.handle1, this.handle2].forEach(function (handle) {
						this._removeProperty(handle, 'left');
						this._removeProperty(handle, 'top');
					}, this);
	
					// Undo inline styles and classes on tooltips
					[this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function (tooltip) {
						this._removeProperty(tooltip, 'left');
						this._removeProperty(tooltip, 'top');
						this._removeProperty(tooltip, 'margin-left');
						this._removeProperty(tooltip, 'margin-top');
	
						this._removeClass(tooltip, 'right');
						this._removeClass(tooltip, 'top');
					}, this);
				}
	
				if (this.options.orientation === 'vertical') {
					this._addClass(this.sliderElem, 'slider-vertical');
					this.stylePos = 'top';
					this.mousePos = 'pageY';
					this.sizePos = 'offsetHeight';
				} else {
					this._addClass(this.sliderElem, 'slider-horizontal');
					this.sliderElem.style.width = origWidth;
					this.options.orientation = 'horizontal';
					this.stylePos = 'left';
					this.mousePos = 'pageX';
					this.sizePos = 'offsetWidth';
				}
				this._setTooltipPosition();
				/* In case ticks are specified, overwrite the min and max bounds */
				if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
					this.options.max = Math.max.apply(Math, this.options.ticks);
					this.options.min = Math.min.apply(Math, this.options.ticks);
				}
	
				if (Array.isArray(this.options.value)) {
					this.options.range = true;
					this._state.value = this.options.value;
				} else if (this.options.range) {
					// User wants a range, but value is not an array
					this._state.value = [this.options.value, this.options.max];
				} else {
					this._state.value = this.options.value;
				}
	
				this.trackLow = sliderTrackLow || this.trackLow;
				this.trackSelection = sliderTrackSelection || this.trackSelection;
				this.trackHigh = sliderTrackHigh || this.trackHigh;
	
				if (this.options.selection === 'none') {
					this._addClass(this.trackLow, 'hide');
					this._addClass(this.trackSelection, 'hide');
					this._addClass(this.trackHigh, 'hide');
				}
	
				this.handle1 = sliderMinHandle || this.handle1;
				this.handle2 = sliderMaxHandle || this.handle2;
	
				if (updateSlider === true) {
					// Reset classes
					this._removeClass(this.handle1, 'round triangle');
					this._removeClass(this.handle2, 'round triangle hide');
	
					for (i = 0; i < this.ticks.length; i++) {
						this._removeClass(this.ticks[i], 'round triangle hide');
					}
				}
	
				var availableHandleModifiers = ['round', 'triangle', 'custom'];
				var isValidHandleType = availableHandleModifiers.indexOf(this.options.handle) !== -1;
				if (isValidHandleType) {
					this._addClass(this.handle1, this.options.handle);
					this._addClass(this.handle2, this.options.handle);
	
					for (i = 0; i < this.ticks.length; i++) {
						this._addClass(this.ticks[i], this.options.handle);
					}
				}
	
				this._state.offset = this._offset(this.sliderElem);
				this._state.size = this.sliderElem[this.sizePos];
				this.setValue(this._state.value);
	
				/******************************************
	   				Bind Event Listeners
	   	******************************************/
	
				// Bind keyboard handlers
				this.handle1Keydown = this._keydown.bind(this, 0);
				this.handle1.addEventListener("keydown", this.handle1Keydown, false);
	
				this.handle2Keydown = this._keydown.bind(this, 1);
				this.handle2.addEventListener("keydown", this.handle2Keydown, false);
	
				this.mousedown = this._mousedown.bind(this);
				this.touchstart = this._touchstart.bind(this);
				this.touchmove = this._touchmove.bind(this);
	
				if (this.touchCapable) {
					// Bind touch handlers
					this.sliderElem.addEventListener("touchstart", this.touchstart, false);
					this.sliderElem.addEventListener("touchmove", this.touchmove, false);
				}
				this.sliderElem.addEventListener("mousedown", this.mousedown, false);
	
				// Bind window handlers
				this.resize = this._resize.bind(this);
				window.addEventListener("resize", this.resize, false);
	
				// Bind tooltip-related handlers
				if (this.options.tooltip === 'hide') {
					this._addClass(this.tooltip, 'hide');
					this._addClass(this.tooltip_min, 'hide');
					this._addClass(this.tooltip_max, 'hide');
				} else if (this.options.tooltip === 'always') {
					this._showTooltip();
					this._alwaysShowTooltip = true;
				} else {
					this.showTooltip = this._showTooltip.bind(this);
					this.hideTooltip = this._hideTooltip.bind(this);
	
					if (this.options.ticks_tooltip) {
						var callbackHandle = this._addTickListener();
						//create handle1 listeners and store references in map
						var mouseEnter = callbackHandle.addMouseEnter(this, this.handle1);
						var mouseLeave = callbackHandle.addMouseLeave(this, this.handle1);
						this.handleCallbackMap.handle1 = {
							mouseEnter: mouseEnter,
							mouseLeave: mouseLeave
						};
						//create handle2 listeners and store references in map
						mouseEnter = callbackHandle.addMouseEnter(this, this.handle2);
						mouseLeave = callbackHandle.addMouseLeave(this, this.handle2);
						this.handleCallbackMap.handle2 = {
							mouseEnter: mouseEnter,
							mouseLeave: mouseLeave
						};
					} else {
						this.sliderElem.addEventListener("mouseenter", this.showTooltip, false);
						this.sliderElem.addEventListener("mouseleave", this.hideTooltip, false);
					}
	
					this.handle1.addEventListener("focus", this.showTooltip, false);
					this.handle1.addEventListener("blur", this.hideTooltip, false);
	
					this.handle2.addEventListener("focus", this.showTooltip, false);
					this.handle2.addEventListener("blur", this.hideTooltip, false);
				}
	
				if (this.options.enabled) {
					this.enable();
				} else {
					this.disable();
				}
			}
	
			/*************************************************
	  				INSTANCE PROPERTIES/METHODS
	  	- Any methods bound to the prototype are considered
	  part of the plugin's `public` interface
	  	**************************************************/
			Slider.prototype = {
				_init: function _init() {}, // NOTE: Must exist to support bridget
	
				constructor: Slider,
	
				defaultOptions: {
					id: "",
					min: 0,
					max: 10,
					step: 1,
					precision: 0,
					orientation: 'horizontal',
					value: 5,
					range: false,
					selection: 'before',
					tooltip: 'show',
					tooltip_split: false,
					handle: 'round',
					reversed: false,
					enabled: true,
					formatter: function formatter(val) {
						if (Array.isArray(val)) {
							return val[0] + " : " + val[1];
						} else {
							return val;
						}
					},
					natural_arrow_keys: false,
					ticks: [],
					ticks_positions: [],
					ticks_labels: [],
					ticks_snap_bounds: 0,
					ticks_tooltip: false,
					scale: 'linear',
					focus: false,
					tooltip_position: null,
					labelledby: null,
					rangeHighlights: []
				},
	
				getElement: function getElement() {
					return this.sliderElem;
				},
	
				getValue: function getValue() {
					if (this.options.range) {
						return this._state.value;
					} else {
						return this._state.value[0];
					}
				},
	
				setValue: function setValue(val, triggerSlideEvent, triggerChangeEvent) {
					if (!val) {
						val = 0;
					}
					var oldValue = this.getValue();
					this._state.value = this._validateInputValue(val);
					var applyPrecision = this._applyPrecision.bind(this);
	
					if (this.options.range) {
						this._state.value[0] = applyPrecision(this._state.value[0]);
						this._state.value[1] = applyPrecision(this._state.value[1]);
	
						this._state.value[0] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[0]));
						this._state.value[1] = Math.max(this.options.min, Math.min(this.options.max, this._state.value[1]));
					} else {
						this._state.value = applyPrecision(this._state.value);
						this._state.value = [Math.max(this.options.min, Math.min(this.options.max, this._state.value))];
						this._addClass(this.handle2, 'hide');
						if (this.options.selection === 'after') {
							this._state.value[1] = this.options.max;
						} else {
							this._state.value[1] = this.options.min;
						}
					}
	
					if (this.options.max > this.options.min) {
						this._state.percentage = [this._toPercentage(this._state.value[0]), this._toPercentage(this._state.value[1]), this.options.step * 100 / (this.options.max - this.options.min)];
					} else {
						this._state.percentage = [0, 0, 100];
					}
	
					this._layout();
					var newValue = this.options.range ? this._state.value : this._state.value[0];
	
					this._setDataVal(newValue);
					if (triggerSlideEvent === true) {
						this._trigger('slide', newValue);
					}
					if (oldValue !== newValue && triggerChangeEvent === true) {
						this._trigger('change', {
							oldValue: oldValue,
							newValue: newValue
						});
					}
	
					return this;
				},
	
				destroy: function destroy() {
					// Remove event handlers on slider elements
					this._removeSliderEventHandlers();
	
					// Remove the slider from the DOM
					this.sliderElem.parentNode.removeChild(this.sliderElem);
					/* Show original <input> element */
					this.element.style.display = "";
	
					// Clear out custom event bindings
					this._cleanUpEventCallbacksMap();
	
					// Remove data values
					this.element.removeAttribute("data");
	
					// Remove JQuery handlers/data
					if ($) {
						this._unbindJQueryEventHandlers();
						this.$element.removeData('slider');
					}
				},
	
				disable: function disable() {
					this._state.enabled = false;
					this.handle1.removeAttribute("tabindex");
					this.handle2.removeAttribute("tabindex");
					this._addClass(this.sliderElem, 'slider-disabled');
					this._trigger('slideDisabled');
	
					return this;
				},
	
				enable: function enable() {
					this._state.enabled = true;
					this.handle1.setAttribute("tabindex", 0);
					this.handle2.setAttribute("tabindex", 0);
					this._removeClass(this.sliderElem, 'slider-disabled');
					this._trigger('slideEnabled');
	
					return this;
				},
	
				toggle: function toggle() {
					if (this._state.enabled) {
						this.disable();
					} else {
						this.enable();
					}
					return this;
				},
	
				isEnabled: function isEnabled() {
					return this._state.enabled;
				},
	
				on: function on(evt, callback) {
					this._bindNonQueryEventHandler(evt, callback);
					return this;
				},
	
				off: function off(evt, callback) {
					if ($) {
						this.$element.off(evt, callback);
						this.$sliderElem.off(evt, callback);
					} else {
						this._unbindNonQueryEventHandler(evt, callback);
					}
				},
	
				getAttribute: function getAttribute(attribute) {
					if (attribute) {
						return this.options[attribute];
					} else {
						return this.options;
					}
				},
	
				setAttribute: function setAttribute(attribute, value) {
					this.options[attribute] = value;
					return this;
				},
	
				refresh: function refresh() {
					this._removeSliderEventHandlers();
					createNewSlider.call(this, this.element, this.options);
					if ($) {
						// Bind new instance of slider to the element
						$.data(this.element, 'slider', this);
					}
					return this;
				},
	
				relayout: function relayout() {
					this._resize();
					this._layout();
					return this;
				},
	
				/******************************+
	   				HELPERS
	   	- Any method that is not part of the public interface.
	   - Place it underneath this comment block and write its signature like so:
	   		_fnName : function() {...}
	   	********************************/
				_removeSliderEventHandlers: function _removeSliderEventHandlers() {
					// Remove keydown event listeners
					this.handle1.removeEventListener("keydown", this.handle1Keydown, false);
					this.handle2.removeEventListener("keydown", this.handle2Keydown, false);
	
					//remove the listeners from the ticks and handles if they had their own listeners
					if (this.options.ticks_tooltip) {
						var ticks = this.ticksContainer.getElementsByClassName('slider-tick');
						for (var i = 0; i < ticks.length; i++) {
							ticks[i].removeEventListener('mouseenter', this.ticksCallbackMap[i].mouseEnter, false);
							ticks[i].removeEventListener('mouseleave', this.ticksCallbackMap[i].mouseLeave, false);
						}
						this.handle1.removeEventListener('mouseenter', this.handleCallbackMap.handle1.mouseEnter, false);
						this.handle2.removeEventListener('mouseenter', this.handleCallbackMap.handle2.mouseEnter, false);
						this.handle1.removeEventListener('mouseleave', this.handleCallbackMap.handle1.mouseLeave, false);
						this.handle2.removeEventListener('mouseleave', this.handleCallbackMap.handle2.mouseLeave, false);
					}
	
					this.handleCallbackMap = null;
					this.ticksCallbackMap = null;
	
					if (this.showTooltip) {
						this.handle1.removeEventListener("focus", this.showTooltip, false);
						this.handle2.removeEventListener("focus", this.showTooltip, false);
					}
					if (this.hideTooltip) {
						this.handle1.removeEventListener("blur", this.hideTooltip, false);
						this.handle2.removeEventListener("blur", this.hideTooltip, false);
					}
	
					// Remove event listeners from sliderElem
					if (this.showTooltip) {
						this.sliderElem.removeEventListener("mouseenter", this.showTooltip, false);
					}
					if (this.hideTooltip) {
						this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, false);
					}
					this.sliderElem.removeEventListener("touchstart", this.touchstart, false);
					this.sliderElem.removeEventListener("touchmove", this.touchmove, false);
					this.sliderElem.removeEventListener("mousedown", this.mousedown, false);
	
					// Remove window event listener
					window.removeEventListener("resize", this.resize, false);
				},
				_bindNonQueryEventHandler: function _bindNonQueryEventHandler(evt, callback) {
					if (this.eventToCallbackMap[evt] === undefined) {
						this.eventToCallbackMap[evt] = [];
					}
					this.eventToCallbackMap[evt].push(callback);
				},
				_unbindNonQueryEventHandler: function _unbindNonQueryEventHandler(evt, callback) {
					var callbacks = this.eventToCallbackMap[evt];
					if (callbacks !== undefined) {
						for (var i = 0; i < callbacks.length; i++) {
							if (callbacks[i] === callback) {
								callbacks.splice(i, 1);
								break;
							}
						}
					}
				},
				_cleanUpEventCallbacksMap: function _cleanUpEventCallbacksMap() {
					var eventNames = (0, _keys2.default)(this.eventToCallbackMap);
					for (var i = 0; i < eventNames.length; i++) {
						var eventName = eventNames[i];
						this.eventToCallbackMap[eventName] = null;
					}
				},
				_showTooltip: function _showTooltip() {
					if (this.options.tooltip_split === false) {
						this._addClass(this.tooltip, 'in');
						this.tooltip_min.style.display = 'none';
						this.tooltip_max.style.display = 'none';
					} else {
						this._addClass(this.tooltip_min, 'in');
						this._addClass(this.tooltip_max, 'in');
						this.tooltip.style.display = 'none';
					}
					this._state.over = true;
				},
				_hideTooltip: function _hideTooltip() {
					if (this._state.inDrag === false && this.alwaysShowTooltip !== true) {
						this._removeClass(this.tooltip, 'in');
						this._removeClass(this.tooltip_min, 'in');
						this._removeClass(this.tooltip_max, 'in');
					}
					this._state.over = false;
				},
				_setToolTipOnMouseOver: function _setToolTipOnMouseOver(tempState) {
					var formattedTooltipVal = this.options.formatter(!tempState ? this._state.value[0] : tempState.value[0]);
					var positionPercentages = !tempState ? getPositionPercentages(this._state, this.options.reversed) : getPositionPercentages(tempState, this.options.reversed);
					this._setText(this.tooltipInner, formattedTooltipVal);
	
					this.tooltip.style[this.stylePos] = positionPercentages[0] + '%';
					if (this.options.orientation === 'vertical') {
						this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
					} else {
						this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
					}
	
					function getPositionPercentages(state, reversed) {
						if (reversed) {
							return [100 - state.percentage[0], this.options.range ? 100 - state.percentage[1] : state.percentage[1]];
						}
						return [state.percentage[0], state.percentage[1]];
					}
				},
				_addTickListener: function _addTickListener() {
					return {
						addMouseEnter: function addMouseEnter(reference, tick, index) {
							var enter = function enter() {
								var tempState = reference._state;
								var idString = index >= 0 ? index : this.attributes['aria-valuenow'].value;
								var hoverIndex = parseInt(idString, 10);
								tempState.value[0] = hoverIndex;
								tempState.percentage[0] = reference.options.ticks_positions[hoverIndex];
								reference._setToolTipOnMouseOver(tempState);
								reference._showTooltip();
							};
							tick.addEventListener("mouseenter", enter, false);
							return enter;
						},
						addMouseLeave: function addMouseLeave(reference, tick) {
							var leave = function leave() {
								reference._hideTooltip();
							};
							tick.addEventListener("mouseleave", leave, false);
							return leave;
						}
					};
				},
				_layout: function _layout() {
					var positionPercentages;
	
					if (this.options.reversed) {
						positionPercentages = [100 - this._state.percentage[0], this.options.range ? 100 - this._state.percentage[1] : this._state.percentage[1]];
					} else {
						positionPercentages = [this._state.percentage[0], this._state.percentage[1]];
					}
	
					this.handle1.style[this.stylePos] = positionPercentages[0] + '%';
					this.handle1.setAttribute('aria-valuenow', this._state.value[0]);
	
					this.handle2.style[this.stylePos] = positionPercentages[1] + '%';
					this.handle2.setAttribute('aria-valuenow', this._state.value[1]);
	
					/* Position highlight range elements */
					if (this.rangeHighlightElements.length > 0 && Array.isArray(this.options.rangeHighlights) && this.options.rangeHighlights.length > 0) {
						for (var _i = 0; _i < this.options.rangeHighlights.length; _i++) {
							var startPercent = this._toPercentage(this.options.rangeHighlights[_i].start);
							var endPercent = this._toPercentage(this.options.rangeHighlights[_i].end);
	
							if (this.options.reversed) {
								var sp = 100 - endPercent;
								endPercent = 100 - startPercent;
								startPercent = sp;
							}
	
							var currentRange = this._createHighlightRange(startPercent, endPercent);
	
							if (currentRange) {
								if (this.options.orientation === 'vertical') {
									this.rangeHighlightElements[_i].style.top = currentRange.start + "%";
									this.rangeHighlightElements[_i].style.height = currentRange.size + "%";
								} else {
									this.rangeHighlightElements[_i].style.left = currentRange.start + "%";
									this.rangeHighlightElements[_i].style.width = currentRange.size + "%";
								}
							} else {
								this.rangeHighlightElements[_i].style.display = "none";
							}
						}
					}
	
					/* Position ticks and labels */
					if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
	
						var styleSize = this.options.orientation === 'vertical' ? 'height' : 'width';
						var styleMargin = this.options.orientation === 'vertical' ? 'marginTop' : 'marginLeft';
						var labelSize = this._state.size / (this.options.ticks.length - 1);
	
						if (this.tickLabelContainer) {
							var extraMargin = 0;
							if (this.options.ticks_positions.length === 0) {
								if (this.options.orientation !== 'vertical') {
									this.tickLabelContainer.style[styleMargin] = -labelSize / 2 + 'px';
								}
	
								extraMargin = this.tickLabelContainer.offsetHeight;
							} else {
								/* Chidren are position absolute, calculate height by finding the max offsetHeight of a child */
								for (i = 0; i < this.tickLabelContainer.childNodes.length; i++) {
									if (this.tickLabelContainer.childNodes[i].offsetHeight > extraMargin) {
										extraMargin = this.tickLabelContainer.childNodes[i].offsetHeight;
									}
								}
							}
							if (this.options.orientation === 'horizontal') {
								this.sliderElem.style.marginBottom = extraMargin + 'px';
							}
						}
						for (var i = 0; i < this.options.ticks.length; i++) {
	
							var percentage = this.options.ticks_positions[i] || this._toPercentage(this.options.ticks[i]);
	
							if (this.options.reversed) {
								percentage = 100 - percentage;
							}
	
							this.ticks[i].style[this.stylePos] = percentage + '%';
	
							/* Set class labels to denote whether ticks are in the selection */
							this._removeClass(this.ticks[i], 'in-selection');
							if (!this.options.range) {
								if (this.options.selection === 'after' && percentage >= positionPercentages[0]) {
									this._addClass(this.ticks[i], 'in-selection');
								} else if (this.options.selection === 'before' && percentage <= positionPercentages[0]) {
									this._addClass(this.ticks[i], 'in-selection');
								}
							} else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
								this._addClass(this.ticks[i], 'in-selection');
							}
	
							if (this.tickLabels[i]) {
								this.tickLabels[i].style[styleSize] = labelSize + 'px';
	
								if (this.options.orientation !== 'vertical' && this.options.ticks_positions[i] !== undefined) {
									this.tickLabels[i].style.position = 'absolute';
									this.tickLabels[i].style[this.stylePos] = percentage + '%';
									this.tickLabels[i].style[styleMargin] = -labelSize / 2 + 'px';
								} else if (this.options.orientation === 'vertical') {
									this.tickLabels[i].style['marginLeft'] = this.sliderElem.offsetWidth + 'px';
									this.tickLabelContainer.style['marginTop'] = this.sliderElem.offsetWidth / 2 * -1 + 'px';
								}
							}
						}
					}
	
					var formattedTooltipVal;
	
					if (this.options.range) {
						formattedTooltipVal = this.options.formatter(this._state.value);
						this._setText(this.tooltipInner, formattedTooltipVal);
						this.tooltip.style[this.stylePos] = (positionPercentages[1] + positionPercentages[0]) / 2 + '%';
	
						if (this.options.orientation === 'vertical') {
							this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
						} else {
							this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
						}
	
						if (this.options.orientation === 'vertical') {
							this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
						} else {
							this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
						}
	
						var innerTooltipMinText = this.options.formatter(this._state.value[0]);
						this._setText(this.tooltipInner_min, innerTooltipMinText);
	
						var innerTooltipMaxText = this.options.formatter(this._state.value[1]);
						this._setText(this.tooltipInner_max, innerTooltipMaxText);
	
						this.tooltip_min.style[this.stylePos] = positionPercentages[0] + '%';
	
						if (this.options.orientation === 'vertical') {
							this._css(this.tooltip_min, 'margin-top', -this.tooltip_min.offsetHeight / 2 + 'px');
						} else {
							this._css(this.tooltip_min, 'margin-left', -this.tooltip_min.offsetWidth / 2 + 'px');
						}
	
						this.tooltip_max.style[this.stylePos] = positionPercentages[1] + '%';
	
						if (this.options.orientation === 'vertical') {
							this._css(this.tooltip_max, 'margin-top', -this.tooltip_max.offsetHeight / 2 + 'px');
						} else {
							this._css(this.tooltip_max, 'margin-left', -this.tooltip_max.offsetWidth / 2 + 'px');
						}
					} else {
						formattedTooltipVal = this.options.formatter(this._state.value[0]);
						this._setText(this.tooltipInner, formattedTooltipVal);
	
						this.tooltip.style[this.stylePos] = positionPercentages[0] + '%';
						if (this.options.orientation === 'vertical') {
							this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
						} else {
							this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
						}
					}
	
					if (this.options.orientation === 'vertical') {
						this.trackLow.style.top = '0';
						this.trackLow.style.height = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
	
						this.trackSelection.style.top = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
						this.trackSelection.style.height = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
	
						this.trackHigh.style.bottom = '0';
						this.trackHigh.style.height = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
					} else {
						this.trackLow.style.left = '0';
						this.trackLow.style.width = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
	
						this.trackSelection.style.left = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
						this.trackSelection.style.width = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
	
						this.trackHigh.style.right = '0';
						this.trackHigh.style.width = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
	
						var offset_min = this.tooltip_min.getBoundingClientRect();
						var offset_max = this.tooltip_max.getBoundingClientRect();
	
						if (this.options.tooltip_position === 'bottom') {
							if (offset_min.right > offset_max.left) {
								this._removeClass(this.tooltip_max, 'bottom');
								this._addClass(this.tooltip_max, 'top');
								this.tooltip_max.style.top = '';
								this.tooltip_max.style.bottom = 22 + 'px';
							} else {
								this._removeClass(this.tooltip_max, 'top');
								this._addClass(this.tooltip_max, 'bottom');
								this.tooltip_max.style.top = this.tooltip_min.style.top;
								this.tooltip_max.style.bottom = '';
							}
						} else {
							if (offset_min.right > offset_max.left) {
								this._removeClass(this.tooltip_max, 'top');
								this._addClass(this.tooltip_max, 'bottom');
								this.tooltip_max.style.top = 18 + 'px';
							} else {
								this._removeClass(this.tooltip_max, 'bottom');
								this._addClass(this.tooltip_max, 'top');
								this.tooltip_max.style.top = this.tooltip_min.style.top;
							}
						}
					}
				},
				_createHighlightRange: function _createHighlightRange(start, end) {
					if (this._isHighlightRange(start, end)) {
						if (start > end) {
							return { 'start': end, 'size': start - end };
						}
						return { 'start': start, 'size': end - start };
					}
					return null;
				},
				_isHighlightRange: function _isHighlightRange(start, end) {
					if (0 <= start && start <= 100 && 0 <= end && end <= 100) {
						return true;
					} else {
						return false;
					}
				},
				_resize: function _resize(ev) {
					/*jshint unused:false*/
					this._state.offset = this._offset(this.sliderElem);
					this._state.size = this.sliderElem[this.sizePos];
					this._layout();
				},
				_removeProperty: function _removeProperty(element, prop) {
					if (element.style.removeProperty) {
						element.style.removeProperty(prop);
					} else {
						element.style.removeAttribute(prop);
					}
				},
				_mousedown: function _mousedown(ev) {
					if (!this._state.enabled) {
						return false;
					}
	
					this._state.offset = this._offset(this.sliderElem);
					this._state.size = this.sliderElem[this.sizePos];
	
					var percentage = this._getPercentage(ev);
	
					if (this.options.range) {
						var diff1 = Math.abs(this._state.percentage[0] - percentage);
						var diff2 = Math.abs(this._state.percentage[1] - percentage);
						this._state.dragged = diff1 < diff2 ? 0 : 1;
						this._adjustPercentageForRangeSliders(percentage);
					} else {
						this._state.dragged = 0;
					}
	
					this._state.percentage[this._state.dragged] = percentage;
					this._layout();
	
					if (this.touchCapable) {
						document.removeEventListener("touchmove", this.mousemove, false);
						document.removeEventListener("touchend", this.mouseup, false);
					}
	
					if (this.mousemove) {
						document.removeEventListener("mousemove", this.mousemove, false);
					}
					if (this.mouseup) {
						document.removeEventListener("mouseup", this.mouseup, false);
					}
	
					this.mousemove = this._mousemove.bind(this);
					this.mouseup = this._mouseup.bind(this);
	
					if (this.touchCapable) {
						// Touch: Bind touch events:
						document.addEventListener("touchmove", this.mousemove, false);
						document.addEventListener("touchend", this.mouseup, false);
					}
					// Bind mouse events:
					document.addEventListener("mousemove", this.mousemove, false);
					document.addEventListener("mouseup", this.mouseup, false);
	
					this._state.inDrag = true;
					var newValue = this._calculateValue();
	
					this._trigger('slideStart', newValue);
	
					this._setDataVal(newValue);
					this.setValue(newValue, false, true);
	
					this._pauseEvent(ev);
	
					if (this.options.focus) {
						this._triggerFocusOnHandle(this._state.dragged);
					}
	
					return true;
				},
				_touchstart: function _touchstart(ev) {
					if (ev.changedTouches === undefined) {
						this._mousedown(ev);
						return;
					}
	
					var touch = ev.changedTouches[0];
					this.touchX = touch.pageX;
					this.touchY = touch.pageY;
				},
				_triggerFocusOnHandle: function _triggerFocusOnHandle(handleIdx) {
					if (handleIdx === 0) {
						this.handle1.focus();
					}
					if (handleIdx === 1) {
						this.handle2.focus();
					}
				},
				_keydown: function _keydown(handleIdx, ev) {
					if (!this._state.enabled) {
						return false;
					}
	
					var dir;
					switch (ev.keyCode) {
						case 37: // left
						case 40:
							// down
							dir = -1;
							break;
						case 39: // right
						case 38:
							// up
							dir = 1;
							break;
					}
					if (!dir) {
						return;
					}
	
					// use natural arrow keys instead of from min to max
					if (this.options.natural_arrow_keys) {
						var ifVerticalAndNotReversed = this.options.orientation === 'vertical' && !this.options.reversed;
						var ifHorizontalAndReversed = this.options.orientation === 'horizontal' && this.options.reversed;
	
						if (ifVerticalAndNotReversed || ifHorizontalAndReversed) {
							dir = -dir;
						}
					}
	
					var val = this._state.value[handleIdx] + dir * this.options.step;
					if (this.options.range) {
						val = [!handleIdx ? val : this._state.value[0], handleIdx ? val : this._state.value[1]];
					}
	
					this._trigger('slideStart', val);
					this._setDataVal(val);
					this.setValue(val, true, true);
	
					this._setDataVal(val);
					this._trigger('slideStop', val);
					this._layout();
	
					this._pauseEvent(ev);
	
					return false;
				},
				_pauseEvent: function _pauseEvent(ev) {
					if (ev.stopPropagation) {
						ev.stopPropagation();
					}
					if (ev.preventDefault) {
						ev.preventDefault();
					}
					ev.cancelBubble = true;
					ev.returnValue = false;
				},
				_mousemove: function _mousemove(ev) {
					if (!this._state.enabled) {
						return false;
					}
	
					var percentage = this._getPercentage(ev);
					this._adjustPercentageForRangeSliders(percentage);
					this._state.percentage[this._state.dragged] = percentage;
					this._layout();
	
					var val = this._calculateValue(true);
					this.setValue(val, true, true);
	
					return false;
				},
				_touchmove: function _touchmove(ev) {
					if (ev.changedTouches === undefined) {
						return;
					}
	
					var touch = ev.changedTouches[0];
	
					var xDiff = touch.pageX - this.touchX;
					var yDiff = touch.pageY - this.touchY;
	
					if (!this._state.inDrag) {
						// Vertical Slider
						if (this.options.orientation === 'vertical' && xDiff <= 5 && xDiff >= -5 && (yDiff >= 15 || yDiff <= -15)) {
							this._mousedown(ev);
						}
						// Horizontal slider.
						else if (yDiff <= 5 && yDiff >= -5 && (xDiff >= 15 || xDiff <= -15)) {
								this._mousedown(ev);
							}
					}
				},
				_adjustPercentageForRangeSliders: function _adjustPercentageForRangeSliders(percentage) {
					if (this.options.range) {
						var precision = this._getNumDigitsAfterDecimalPlace(percentage);
						precision = precision ? precision - 1 : 0;
						var percentageWithAdjustedPrecision = this._applyToFixedAndParseFloat(percentage, precision);
						if (this._state.dragged === 0 && this._applyToFixedAndParseFloat(this._state.percentage[1], precision) < percentageWithAdjustedPrecision) {
							this._state.percentage[0] = this._state.percentage[1];
							this._state.dragged = 1;
						} else if (this._state.dragged === 1 && this._applyToFixedAndParseFloat(this._state.percentage[0], precision) > percentageWithAdjustedPrecision) {
							this._state.percentage[1] = this._state.percentage[0];
							this._state.dragged = 0;
						}
					}
				},
				_mouseup: function _mouseup() {
					if (!this._state.enabled) {
						return false;
					}
					if (this.touchCapable) {
						// Touch: Unbind touch event handlers:
						document.removeEventListener("touchmove", this.mousemove, false);
						document.removeEventListener("touchend", this.mouseup, false);
					}
					// Unbind mouse event handlers:
					document.removeEventListener("mousemove", this.mousemove, false);
					document.removeEventListener("mouseup", this.mouseup, false);
	
					this._state.inDrag = false;
					if (this._state.over === false) {
						this._hideTooltip();
					}
					var val = this._calculateValue(true);
	
					this._layout();
					this._setDataVal(val);
					this._trigger('slideStop', val);
	
					return false;
				},
				_calculateValue: function _calculateValue(snapToClosestTick) {
					var val;
					if (this.options.range) {
						val = [this.options.min, this.options.max];
						if (this._state.percentage[0] !== 0) {
							val[0] = this._toValue(this._state.percentage[0]);
							val[0] = this._applyPrecision(val[0]);
						}
						if (this._state.percentage[1] !== 100) {
							val[1] = this._toValue(this._state.percentage[1]);
							val[1] = this._applyPrecision(val[1]);
						}
					} else {
						val = this._toValue(this._state.percentage[0]);
						val = parseFloat(val);
						val = this._applyPrecision(val);
					}
	
					if (snapToClosestTick) {
						var min = [val, Infinity];
						for (var i = 0; i < this.options.ticks.length; i++) {
							var diff = Math.abs(this.options.ticks[i] - val);
							if (diff <= min[1]) {
								min = [this.options.ticks[i], diff];
							}
						}
						if (min[1] <= this.options.ticks_snap_bounds) {
							return min[0];
						}
					}
	
					return val;
				},
				_applyPrecision: function _applyPrecision(val) {
					var precision = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
					return this._applyToFixedAndParseFloat(val, precision);
				},
				_getNumDigitsAfterDecimalPlace: function _getNumDigitsAfterDecimalPlace(num) {
					var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
					if (!match) {
						return 0;
					}
					return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
				},
				_applyToFixedAndParseFloat: function _applyToFixedAndParseFloat(num, toFixedInput) {
					var truncatedNum = num.toFixed(toFixedInput);
					return parseFloat(truncatedNum);
				},
				/*
	   	Credits to Mike Samuel for the following method!
	   	Source: http://stackoverflow.com/questions/10454518/javascript-how-to-retrieve-the-number-of-decimals-of-a-string-number
	   */
				_getPercentage: function _getPercentage(ev) {
					if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
						ev = ev.touches[0];
					}
	
					var eventPosition = ev[this.mousePos];
					var sliderOffset = this._state.offset[this.stylePos];
					var distanceToSlide = eventPosition - sliderOffset;
					// Calculate what percent of the length the slider handle has slid
					var percentage = distanceToSlide / this._state.size * 100;
					percentage = Math.round(percentage / this._state.percentage[2]) * this._state.percentage[2];
					if (this.options.reversed) {
						percentage = 100 - percentage;
					}
	
					// Make sure the percent is within the bounds of the slider.
					// 0% corresponds to the 'min' value of the slide
					// 100% corresponds to the 'max' value of the slide
					return Math.max(0, Math.min(100, percentage));
				},
				_validateInputValue: function _validateInputValue(val) {
					if (typeof val === 'number') {
						return val;
					} else if (Array.isArray(val)) {
						this._validateArray(val);
						return val;
					} else {
						throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(val));
					}
				},
				_validateArray: function _validateArray(val) {
					for (var i = 0; i < val.length; i++) {
						var input = val[i];
						if (typeof input !== 'number') {
							throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(input));
						}
					}
				},
				_setDataVal: function _setDataVal(val) {
					this.element.setAttribute('data-value', val);
					this.element.setAttribute('value', val);
					this.element.value = val;
				},
				_trigger: function _trigger(evt, val) {
					val = val || val === 0 ? val : undefined;
	
					var callbackFnArray = this.eventToCallbackMap[evt];
					if (callbackFnArray && callbackFnArray.length) {
						for (var i = 0; i < callbackFnArray.length; i++) {
							var callbackFn = callbackFnArray[i];
							callbackFn(val);
						}
					}
	
					/* If JQuery exists, trigger JQuery events */
					if ($) {
						this._triggerJQueryEvent(evt, val);
					}
				},
				_triggerJQueryEvent: function _triggerJQueryEvent(evt, val) {
					var eventData = {
						type: evt,
						value: val
					};
					this.$element.trigger(eventData);
					this.$sliderElem.trigger(eventData);
				},
				_unbindJQueryEventHandlers: function _unbindJQueryEventHandlers() {
					this.$element.off();
					this.$sliderElem.off();
				},
				_setText: function _setText(element, text) {
					if (typeof element.textContent !== "undefined") {
						element.textContent = text;
					} else if (typeof element.innerText !== "undefined") {
						element.innerText = text;
					}
				},
				_removeClass: function _removeClass(element, classString) {
					var classes = classString.split(" ");
					var newClasses = element.className;
	
					for (var i = 0; i < classes.length; i++) {
						var classTag = classes[i];
						var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
						newClasses = newClasses.replace(regex, " ");
					}
	
					element.className = newClasses.trim();
				},
				_addClass: function _addClass(element, classString) {
					var classes = classString.split(" ");
					var newClasses = element.className;
	
					for (var i = 0; i < classes.length; i++) {
						var classTag = classes[i];
						var regex = new RegExp("(?:\\s|^)" + classTag + "(?:\\s|$)");
						var ifClassExists = regex.test(newClasses);
	
						if (!ifClassExists) {
							newClasses += " " + classTag;
						}
					}
	
					element.className = newClasses.trim();
				},
				_offsetLeft: function _offsetLeft(obj) {
					return obj.getBoundingClientRect().left;
				},
				_offsetTop: function _offsetTop(obj) {
					var offsetTop = obj.offsetTop;
					while ((obj = obj.offsetParent) && !isNaN(obj.offsetTop)) {
						offsetTop += obj.offsetTop;
						if (obj.tagName !== 'BODY') {
							offsetTop -= obj.scrollTop;
						}
					}
					return offsetTop;
				},
				_offset: function _offset(obj) {
					return {
						left: this._offsetLeft(obj),
						top: this._offsetTop(obj)
					};
				},
				_css: function _css(elementRef, styleName, value) {
					if ($) {
						$.style(elementRef, styleName, value);
					} else {
						var style = styleName.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function (all, letter) {
							return letter.toUpperCase();
						});
						elementRef.style[style] = value;
					}
				},
				_toValue: function _toValue(percentage) {
					return this.options.scale.toValue.apply(this, [percentage]);
				},
				_toPercentage: function _toPercentage(value) {
					return this.options.scale.toPercentage.apply(this, [value]);
				},
				_setTooltipPosition: function _setTooltipPosition() {
					var tooltips = [this.tooltip, this.tooltip_min, this.tooltip_max];
					if (this.options.orientation === 'vertical') {
						var tooltipPos = this.options.tooltip_position || 'right';
						var oppositeSide = tooltipPos === 'left' ? 'right' : 'left';
						tooltips.forEach(function (tooltip) {
							this._addClass(tooltip, tooltipPos);
							tooltip.style[oppositeSide] = '100%';
						}.bind(this));
					} else if (this.options.tooltip_position === 'bottom') {
						tooltips.forEach(function (tooltip) {
							this._addClass(tooltip, 'bottom');
							tooltip.style.top = 22 + 'px';
						}.bind(this));
					} else {
						tooltips.forEach(function (tooltip) {
							this._addClass(tooltip, 'top');
							tooltip.style.top = -this.tooltip.outerHeight - 14 + 'px';
						}.bind(this));
					}
				}
			};
	
			/*********************************
	  		Attach to global namespace
	  	*********************************/
			if ($) {
				(function () {
					var autoRegisterNamespace = void 0;
	
					if (!$.fn.slider) {
						$.bridget(NAMESPACE_MAIN, Slider);
						autoRegisterNamespace = NAMESPACE_MAIN;
					} else {
						if (windowIsDefined) {
							window.console.warn("bootstrap-slider.js - WARNING: $.fn.slider namespace is already bound. Use the $.fn.bootstrapSlider namespace instead.");
						}
						autoRegisterNamespace = NAMESPACE_ALTERNATE;
					}
					$.bridget(NAMESPACE_ALTERNATE, Slider);
	
					// Auto-Register data-provide="slider" Elements
					$(function () {
						$("input[data-provide=slider]")[autoRegisterNamespace]();
					});
				})();
			}
		})($);
	
		return Slider;
	});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(77);
	module.exports = __webpack_require__(16).Object.keys;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(51)
	  , $keys    = __webpack_require__(35);
	
	__webpack_require__(78)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(14)
	  , core    = __webpack_require__(16)
	  , fails   = __webpack_require__(25);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof2 = __webpack_require__(5);
	
	var _typeof3 = _interopRequireDefault2(_typeof2);
	
	var _defineProperty = __webpack_require__(80);
	
	var _defineProperty2 = _interopRequireDefault2(_defineProperty);
	
	function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module, __webpack_require__(73)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module, require('../util/util'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod, global.Util);
	    global.collapse = mod.exports;
	  }
	})(undefined, function (exports, module, _util) {
	  'use strict';
	
	  var _createClass = function () {
	    function defineProperties(target, props) {
	      for (var i = 0; i < props.length; i++) {
	        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;(0, _defineProperty2.default)(target, descriptor.key, descriptor);
	      }
	    }return function (Constructor, protoProps, staticProps) {
	      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	  }();
	
	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { 'default': obj };
	  }
	
	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError('Cannot call a class as a function');
	    }
	  }
	
	  var _Util = _interopRequireDefault(_util);
	
	  /**
	   * --------------------------------------------------------------------------
	   * Bootstrap (v4.0.0-alpha.2): collapse.js
	   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	   * --------------------------------------------------------------------------
	   */
	
	  var Collapse = function ($) {
	
	    /**
	     * ------------------------------------------------------------------------
	     * Constants
	     * ------------------------------------------------------------------------
	     */
	
	    var NAME = 'collapse';
	    var VERSION = '4.0.0-alpha';
	    var DATA_KEY = 'bs.collapse';
	    var EVENT_KEY = '.' + DATA_KEY;
	    var DATA_API_KEY = '.data-api';
	    var JQUERY_NO_CONFLICT = $.fn[NAME];
	    var TRANSITION_DURATION = 600;
	
	    var Default = {
	      toggle: true,
	      parent: ''
	    };
	
	    var DefaultType = {
	      toggle: 'boolean',
	      parent: 'string'
	    };
	
	    var Event = {
	      SHOW: 'show' + EVENT_KEY,
	      SHOWN: 'shown' + EVENT_KEY,
	      HIDE: 'hide' + EVENT_KEY,
	      HIDDEN: 'hidden' + EVENT_KEY,
	      CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	    };
	
	    var ClassName = {
	      IN: 'in',
	      COLLAPSE: 'collapse',
	      COLLAPSING: 'collapsing',
	      COLLAPSED: 'collapsed'
	    };
	
	    var Dimension = {
	      WIDTH: 'width',
	      HEIGHT: 'height'
	    };
	
	    var Selector = {
	      ACTIVES: '.panel > .in, .panel > .collapsing',
	      DATA_TOGGLE: '[data-toggle="collapse"]'
	    };
	
	    /**
	     * ------------------------------------------------------------------------
	     * Class Definition
	     * ------------------------------------------------------------------------
	     */
	
	    var Collapse = function () {
	      function Collapse(element, config) {
	        _classCallCheck(this, Collapse);
	
	        this._isTransitioning = false;
	        this._element = element;
	        this._config = this._getConfig(config);
	        this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
	
	        this._parent = this._config.parent ? this._getParent() : null;
	
	        if (!this._config.parent) {
	          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
	        }
	
	        if (this._config.toggle) {
	          this.toggle();
	        }
	      }
	
	      /**
	       * ------------------------------------------------------------------------
	       * Data Api implementation
	       * ------------------------------------------------------------------------
	       */
	
	      // getters
	
	      _createClass(Collapse, [{
	        key: 'toggle',
	
	        // public
	
	        value: function toggle() {
	          if ($(this._element).hasClass(ClassName.IN)) {
	            this.hide();
	          } else {
	            this.show();
	          }
	        }
	      }, {
	        key: 'show',
	        value: function show() {
	          var _this = this;
	
	          if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
	            return;
	          }
	
	          var actives = undefined;
	          var activesData = undefined;
	
	          if (this._parent) {
	            actives = $.makeArray($(Selector.ACTIVES));
	            if (!actives.length) {
	              actives = null;
	            }
	          }
	
	          if (actives) {
	            activesData = $(actives).data(DATA_KEY);
	            if (activesData && activesData._isTransitioning) {
	              return;
	            }
	          }
	
	          var startEvent = $.Event(Event.SHOW);
	          $(this._element).trigger(startEvent);
	          if (startEvent.isDefaultPrevented()) {
	            return;
	          }
	
	          if (actives) {
	            Collapse._jQueryInterface.call($(actives), 'hide');
	            if (!activesData) {
	              $(actives).data(DATA_KEY, null);
	            }
	          }
	
	          var dimension = this._getDimension();
	
	          $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
	
	          this._element.style[dimension] = 0;
	          this._element.setAttribute('aria-expanded', true);
	
	          if (this._triggerArray.length) {
	            $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
	          }
	
	          this.setTransitioning(true);
	
	          var complete = function complete() {
	            $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);
	
	            _this._element.style[dimension] = '';
	
	            _this.setTransitioning(false);
	
	            $(_this._element).trigger(Event.SHOWN);
	          };
	
	          if (!_Util['default'].supportsTransitionEnd()) {
	            complete();
	            return;
	          }
	
	          var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	          var scrollSize = 'scroll' + capitalizedDimension;
	
	          $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
	
	          this._element.style[dimension] = this._element[scrollSize] + 'px';
	        }
	      }, {
	        key: 'hide',
	        value: function hide() {
	          var _this2 = this;
	
	          if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
	            return;
	          }
	
	          var startEvent = $.Event(Event.HIDE);
	          $(this._element).trigger(startEvent);
	          if (startEvent.isDefaultPrevented()) {
	            return;
	          }
	
	          var dimension = this._getDimension();
	          var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';
	
	          this._element.style[dimension] = this._element[offsetDimension] + 'px';
	
	          _Util['default'].reflow(this._element);
	
	          $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);
	
	          this._element.setAttribute('aria-expanded', false);
	
	          if (this._triggerArray.length) {
	            $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
	          }
	
	          this.setTransitioning(true);
	
	          var complete = function complete() {
	            _this2.setTransitioning(false);
	            $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
	          };
	
	          this._element.style[dimension] = 0;
	
	          if (!_Util['default'].supportsTransitionEnd()) {
	            complete();
	            return;
	          }
	
	          $(this._element).one(_Util['default'].TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
	        }
	      }, {
	        key: 'setTransitioning',
	        value: function setTransitioning(isTransitioning) {
	          this._isTransitioning = isTransitioning;
	        }
	      }, {
	        key: 'dispose',
	        value: function dispose() {
	          $.removeData(this._element, DATA_KEY);
	
	          this._config = null;
	          this._parent = null;
	          this._element = null;
	          this._triggerArray = null;
	          this._isTransitioning = null;
	        }
	
	        // private
	
	      }, {
	        key: '_getConfig',
	        value: function _getConfig(config) {
	          config = $.extend({}, Default, config);
	          config.toggle = Boolean(config.toggle); // coerce string values
	          _Util['default'].typeCheckConfig(NAME, config, DefaultType);
	          return config;
	        }
	      }, {
	        key: '_getDimension',
	        value: function _getDimension() {
	          var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
	          return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
	        }
	      }, {
	        key: '_getParent',
	        value: function _getParent() {
	          var _this3 = this;
	
	          var parent = $(this._config.parent)[0];
	          var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
	
	          $(parent).find(selector).each(function (i, element) {
	            _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
	          });
	
	          return parent;
	        }
	      }, {
	        key: '_addAriaAndCollapsedClass',
	        value: function _addAriaAndCollapsedClass(element, triggerArray) {
	          if (element) {
	            var isOpen = $(element).hasClass(ClassName.IN);
	            element.setAttribute('aria-expanded', isOpen);
	
	            if (triggerArray.length) {
	              $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
	            }
	          }
	        }
	
	        // static
	
	      }], [{
	        key: '_getTargetFromElement',
	        value: function _getTargetFromElement(element) {
	          var selector = _Util['default'].getSelectorFromElement(element);
	          return selector ? $(selector)[0] : null;
	        }
	      }, {
	        key: '_jQueryInterface',
	        value: function _jQueryInterface(config) {
	          return this.each(function () {
	            var $this = $(this);
	            var data = $this.data(DATA_KEY);
	            var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : (0, _typeof3.default)(config)) === 'object' && config);
	
	            if (!data && _config.toggle && /show|hide/.test(config)) {
	              _config.toggle = false;
	            }
	
	            if (!data) {
	              data = new Collapse(this, _config);
	              $this.data(DATA_KEY, data);
	            }
	
	            if (typeof config === 'string') {
	              if (data[config] === undefined) {
	                throw new Error('No method named "' + config + '"');
	              }
	              data[config]();
	            }
	          });
	        }
	      }, {
	        key: 'VERSION',
	        get: function get() {
	          return VERSION;
	        }
	      }, {
	        key: 'Default',
	        get: function get() {
	          return Default;
	        }
	      }]);
	
	      return Collapse;
	    }();
	
	    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
	      event.preventDefault();
	
	      var target = Collapse._getTargetFromElement(this);
	      var data = $(target).data(DATA_KEY);
	      var config = data ? 'toggle' : $(this).data();
	
	      Collapse._jQueryInterface.call($(target), config);
	    });
	
	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */
	
	    $.fn[NAME] = Collapse._jQueryInterface;
	    $.fn[NAME].Constructor = Collapse;
	    $.fn[NAME].noConflict = function () {
	      $.fn[NAME] = JQUERY_NO_CONFLICT;
	      return Collapse._jQueryInterface;
	    };
	
	    return Collapse;
	  }(jQuery);
	
	  module.exports = Collapse;
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	var $Object = __webpack_require__(16).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(24), 'Object', {defineProperty: __webpack_require__(20).f});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _keys = __webpack_require__(75);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _create = __webpack_require__(84);
	
	var _create2 = _interopRequireDefault(_create);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (core) {
	
	    if (true) {
	        // AMD
	
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	
	            var uikit = window.UIkit || core(window, window.jQuery, window.document);
	
	            uikit.load = function (res, req, onload, config) {
	
	                var resources = res.split(','),
	                    load = [],
	                    i,
	                    base = (config.config && config.config.uikit && config.config.uikit.base ? config.config.uikit.base : "").replace(/\/+$/g, "");
	
	                if (!base) {
	                    throw new Error("Please define base path to UIkit in the requirejs config.");
	                }
	
	                for (i = 0; i < resources.length; i += 1) {
	                    var resource = resources[i].replace(/\./g, '/');
	                    load.push(base + '/components/' + resource);
	                }
	
	                req(load, function () {
	                    onload(uikit);
	                });
	            };
	
	            return uikit;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	
	    if (!window.jQuery) {
	        throw new Error("UIkit requires jQuery");
	    }
	
	    if (window && window.jQuery) {
	        core(window, window.jQuery, window.document);
	    }
	})(function (global, $, doc) {
	
	    "use strict";
	
	    var UI = {},
	        _UI = global.UIkit ? (0, _create2.default)(global.UIkit) : undefined;
	
	    UI.version = '2.25.0';
	
	    UI.noConflict = function () {
	        // restore UIkit version
	        if (_UI) {
	            global.UIkit = _UI;
	            $.UIkit = _UI;
	            $.fn.uk = _UI.fn;
	        }
	
	        return UI;
	    };
	
	    UI.prefix = function (str) {
	        return str;
	    };
	
	    // cache jQuery
	    UI.$ = $;
	
	    UI.$doc = UI.$(document);
	    UI.$win = UI.$(window);
	    UI.$html = UI.$('html');
	
	    UI.support = {};
	    UI.support.transition = function () {
	
	        var transitionEnd = function () {
	
	            var element = doc.body || doc.documentElement,
	                transEndEventNames = {
	                WebkitTransition: 'webkitTransitionEnd',
	                MozTransition: 'transitionend',
	                OTransition: 'oTransitionEnd otransitionend',
	                transition: 'transitionend'
	            },
	                name;
	
	            for (name in transEndEventNames) {
	                if (element.style[name] !== undefined) return transEndEventNames[name];
	            }
	        }();
	
	        return transitionEnd && { end: transitionEnd };
	    }();
	
	    UI.support.animation = function () {
	
	        var animationEnd = function () {
	
	            var element = doc.body || doc.documentElement,
	                animEndEventNames = {
	                WebkitAnimation: 'webkitAnimationEnd',
	                MozAnimation: 'animationend',
	                OAnimation: 'oAnimationEnd oanimationend',
	                animation: 'animationend'
	            },
	                name;
	
	            for (name in animEndEventNames) {
	                if (element.style[name] !== undefined) return animEndEventNames[name];
	            }
	        }();
	
	        return animationEnd && { end: animationEnd };
	    }();
	
	    // requestAnimationFrame polyfill
	    //https://github.com/darius/requestAnimationFrame
	    (function () {
	
	        Date.now = Date.now || function () {
	            return new Date().getTime();
	        };
	
	        var vendors = ['webkit', 'moz'];
	        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
	            var vp = vendors[i];
	            window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
	            window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
	        }
	        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
	        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
	            var lastTime = 0;
	            window.requestAnimationFrame = function (callback) {
	                var now = Date.now();
	                var nextTime = Math.max(lastTime + 16, now);
	                return setTimeout(function () {
	                    callback(lastTime = nextTime);
	                }, nextTime - now);
	            };
	            window.cancelAnimationFrame = clearTimeout;
	        }
	    })();
	
	    UI.support.touch = 'ontouchstart' in document || global.DocumentTouch && document instanceof global.DocumentTouch || global.navigator.msPointerEnabled && global.navigator.msMaxTouchPoints > 0 || //IE 10
	    global.navigator.pointerEnabled && global.navigator.maxTouchPoints > 0 || //IE >=11
	    false;
	
	    UI.support.mutationobserver = global.MutationObserver || global.WebKitMutationObserver || null;
	
	    UI.Utils = {};
	
	    UI.Utils.isFullscreen = function () {
	        return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || false;
	    };
	
	    UI.Utils.str2json = function (str, notevil) {
	        try {
	            if (notevil) {
	                return JSON.parse(str
	                // wrap keys without quote with valid double quote
	                .replace(/([\$\w]+)\s*:/g, function (_, $1) {
	                    return '"' + $1 + '":';
	                })
	                // replacing single quote wrapped ones to double quote
	                .replace(/'([^']+)'/g, function (_, $1) {
	                    return '"' + $1 + '"';
	                }));
	            } else {
	                return new Function("", "var json = " + str + "; return JSON.parse(JSON.stringify(json));")();
	            }
	        } catch (e) {
	            return false;
	        }
	    };
	
	    UI.Utils.debounce = function (func, wait, immediate) {
	        var timeout;
	        return function () {
	            var context = this,
	                args = arguments;
	            var later = function later() {
	                timeout = null;
	                if (!immediate) func.apply(context, args);
	            };
	            var callNow = immediate && !timeout;
	            clearTimeout(timeout);
	            timeout = setTimeout(later, wait);
	            if (callNow) func.apply(context, args);
	        };
	    };
	
	    UI.Utils.removeCssRules = function (selectorRegEx) {
	        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;
	
	        if (!selectorRegEx) return;
	
	        setTimeout(function () {
	            try {
	                _ref = document.styleSheets;
	                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	                    stylesheet = _ref[_i];
	                    idxs = [];
	                    stylesheet.cssRules = stylesheet.cssRules;
	                    for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
	                        if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
	                            idxs.unshift(idx);
	                        }
	                    }
	                    for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
	                        stylesheet.deleteRule(idxs[_k]);
	                    }
	                }
	            } catch (_error) {}
	        }, 0);
	    };
	
	    UI.Utils.isInView = function (element, options) {
	
	        var $element = $(element);
	
	        if (!$element.is(':visible')) {
	            return false;
	        }
	
	        var window_left = UI.$win.scrollLeft(),
	            window_top = UI.$win.scrollTop(),
	            offset = $element.offset(),
	            left = offset.left,
	            top = offset.top;
	
	        options = $.extend({ topoffset: 0, leftoffset: 0 }, options);
	
	        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + UI.$win.height() && left + $element.width() >= window_left && left - options.leftoffset <= window_left + UI.$win.width()) {
	            return true;
	        } else {
	            return false;
	        }
	    };
	
	    UI.Utils.checkDisplay = function (context, initanimation) {
	
	        var elements = UI.$('[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]', context || document),
	            animated;
	
	        if (context && !elements.length) {
	            elements = $(context);
	        }
	
	        elements.trigger('display.uk.check');
	
	        // fix firefox / IE animations
	        if (initanimation) {
	
	            if (typeof initanimation != 'string') {
	                initanimation = '[class*="uk-animation-"]';
	            }
	
	            elements.find(initanimation).each(function () {
	
	                var ele = UI.$(this),
	                    cls = ele.attr('class'),
	                    anim = cls.match(/uk\-animation\-(.+)/);
	
	                ele.removeClass(anim[0]).width();
	
	                ele.addClass(anim[0]);
	            });
	        }
	
	        return elements;
	    };
	
	    UI.Utils.options = function (string) {
	
	        if ($.type(string) != 'string') return string;
	
	        if (string.indexOf(':') != -1 && string.trim().substr(-1) != '}') {
	            string = '{' + string + '}';
	        }
	
	        var start = string ? string.indexOf("{") : -1,
	            options = {};
	
	        if (start != -1) {
	            try {
	                options = UI.Utils.str2json(string.substr(start));
	            } catch (e) {}
	        }
	
	        return options;
	    };
	
	    UI.Utils.animate = function (element, cls) {
	
	        var d = $.Deferred();
	
	        element = UI.$(element);
	
	        element.css('display', 'none').addClass(cls).one(UI.support.animation.end, function () {
	            element.removeClass(cls);
	            d.resolve();
	        });
	
	        element.css('display', '');
	
	        return d.promise();
	    };
	
	    UI.Utils.uid = function (prefix) {
	        return (prefix || 'id') + new Date().getTime() + "RAND" + Math.ceil(Math.random() * 100000);
	    };
	
	    UI.Utils.template = function (str, data) {
	
	        var tokens = str.replace(/\n/g, '\\n').replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),
	            i = 0,
	            toc,
	            cmd,
	            prop,
	            val,
	            fn,
	            output = [],
	            openblocks = 0;
	
	        while (i < tokens.length) {
	
	            toc = tokens[i];
	
	            if (toc.match(/\{\{\s*(.+?)\s*\}\}/)) {
	                i = i + 1;
	                toc = tokens[i];
	                cmd = toc[0];
	                prop = toc.substring(toc.match(/^(\^|\#|\!|\~|\:)/) ? 1 : 0);
	
	                switch (cmd) {
	                    case '~':
	                        output.push("for(var $i=0;$i<" + prop + ".length;$i++) { var $item = " + prop + "[$i];");
	                        openblocks++;
	                        break;
	                    case ':':
	                        output.push("for(var $key in " + prop + ") { var $val = " + prop + "[$key];");
	                        openblocks++;
	                        break;
	                    case '#':
	                        output.push("if(" + prop + ") {");
	                        openblocks++;
	                        break;
	                    case '^':
	                        output.push("if(!" + prop + ") {");
	                        openblocks++;
	                        break;
	                    case '/':
	                        output.push("}");
	                        openblocks--;
	                        break;
	                    case '!':
	                        output.push("__ret.push(" + prop + ");");
	                        break;
	                    default:
	                        output.push("__ret.push(escape(" + prop + "));");
	                        break;
	                }
	            } else {
	                output.push("__ret.push('" + toc.replace(/\'/g, "\\'") + "');");
	            }
	            i = i + 1;
	        }
	
	        fn = new Function('$data', ['var __ret = [];', 'try {', 'with($data){', !openblocks ? output.join('') : '__ret = ["Not all blocks are closed correctly."]', '};', '}catch(e){__ret = [e.message];}', 'return __ret.join("").replace(/\\n\\n/g, "\\n");', "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n"));
	
	        return data ? fn(data) : fn;
	    };
	
	    UI.Utils.events = {};
	    UI.Utils.events.click = UI.support.touch ? 'tap' : 'click';
	
	    global.UIkit = UI;
	
	    // deprecated
	
	    UI.fn = function (command, options) {
	
	        var args = arguments,
	            cmd = command.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),
	            component = cmd[1],
	            method = cmd[2];
	
	        if (!UI[component]) {
	            $.error("UIkit component [" + component + "] does not exist.");
	            return this;
	        }
	
	        return this.each(function () {
	            var $this = $(this),
	                data = $this.data(component);
	            if (!data) $this.data(component, data = UI[component](this, method ? undefined : options));
	            if (method) data[method].apply(data, Array.prototype.slice.call(args, 1));
	        });
	    };
	
	    $.UIkit = UI;
	    $.fn.uk = UI.fn;
	
	    UI.langdirection = UI.$html.attr("dir") == "rtl" ? "right" : "left";
	
	    UI.components = {};
	
	    UI.component = function (name, def) {
	
	        var fn = function fn(element, options) {
	
	            var $this = this;
	
	            this.UIkit = UI;
	            this.element = element ? UI.$(element) : null;
	            this.options = $.extend(true, {}, this.defaults, options);
	            this.plugins = {};
	
	            if (this.element) {
	                this.element.data(name, this);
	            }
	
	            this.init();
	
	            (this.options.plugins.length ? this.options.plugins : (0, _keys2.default)(fn.plugins)).forEach(function (plugin) {
	
	                if (fn.plugins[plugin].init) {
	                    fn.plugins[plugin].init($this);
	                    $this.plugins[plugin] = true;
	                }
	            });
	
	            this.trigger('init.uk.component', [name, this]);
	
	            return this;
	        };
	
	        fn.plugins = {};
	
	        $.extend(true, fn.prototype, {
	
	            defaults: { plugins: [] },
	
	            boot: function boot() {},
	            init: function init() {},
	
	            on: function on(a1, a2, a3) {
	                return UI.$(this.element || this).on(a1, a2, a3);
	            },
	
	            one: function one(a1, a2, a3) {
	                return UI.$(this.element || this).one(a1, a2, a3);
	            },
	
	            off: function off(evt) {
	                return UI.$(this.element || this).off(evt);
	            },
	
	            trigger: function trigger(evt, params) {
	                return UI.$(this.element || this).trigger(evt, params);
	            },
	
	            find: function find(selector) {
	                return UI.$(this.element ? this.element : []).find(selector);
	            },
	
	            proxy: function proxy(obj, methods) {
	
	                var $this = this;
	
	                methods.split(' ').forEach(function (method) {
	                    if (!$this[method]) $this[method] = function () {
	                        return obj[method].apply(obj, arguments);
	                    };
	                });
	            },
	
	            mixin: function mixin(obj, methods) {
	
	                var $this = this;
	
	                methods.split(' ').forEach(function (method) {
	                    if (!$this[method]) $this[method] = obj[method].bind($this);
	                });
	            },
	
	            option: function option() {
	
	                if (arguments.length == 1) {
	                    return this.options[arguments[0]] || undefined;
	                } else if (arguments.length == 2) {
	                    this.options[arguments[0]] = arguments[1];
	                }
	            }
	
	        }, def);
	
	        this.components[name] = fn;
	
	        this[name] = function () {
	
	            var element, options;
	
	            if (arguments.length) {
	
	                switch (arguments.length) {
	                    case 1:
	
	                        if (typeof arguments[0] === "string" || arguments[0].nodeType || arguments[0] instanceof jQuery) {
	                            element = $(arguments[0]);
	                        } else {
	                            options = arguments[0];
	                        }
	
	                        break;
	                    case 2:
	
	                        element = $(arguments[0]);
	                        options = arguments[1];
	                        break;
	                }
	            }
	
	            if (element && element.data(name)) {
	                return element.data(name);
	            }
	
	            return new UI.components[name](element, options);
	        };
	
	        if (UI.domready) {
	            UI.component.boot(name);
	        }
	
	        return fn;
	    };
	
	    UI.plugin = function (component, name, def) {
	        this.components[component].plugins[name] = def;
	    };
	
	    UI.component.boot = function (name) {
	
	        if (UI.components[name].prototype && UI.components[name].prototype.boot && !UI.components[name].booted) {
	            UI.components[name].prototype.boot.apply(UI, []);
	            UI.components[name].booted = true;
	        }
	    };
	
	    UI.component.bootComponents = function () {
	
	        for (var component in UI.components) {
	            UI.component.boot(component);
	        }
	    };
	
	    // DOM mutation save ready helper function
	
	    UI.domObservers = [];
	    UI.domready = false;
	
	    UI.ready = function (fn) {
	
	        UI.domObservers.push(fn);
	
	        if (UI.domready) {
	            fn(document);
	        }
	    };
	
	    UI.on = function (a1, a2, a3) {
	
	        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
	            a2.apply(UI.$doc);
	        }
	
	        return UI.$doc.on(a1, a2, a3);
	    };
	
	    UI.one = function (a1, a2, a3) {
	
	        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
	            a2.apply(UI.$doc);
	            return UI.$doc;
	        }
	
	        return UI.$doc.one(a1, a2, a3);
	    };
	
	    UI.trigger = function (evt, params) {
	        return UI.$doc.trigger(evt, params);
	    };
	
	    UI.domObserve = function (selector, fn) {
	
	        if (!UI.support.mutationobserver) return;
	
	        fn = fn || function () {};
	
	        UI.$(selector).each(function () {
	
	            var element = this,
	                $element = UI.$(element);
	
	            if ($element.data('observer')) {
	                return;
	            }
	
	            try {
	
	                var observer = new UI.support.mutationobserver(UI.Utils.debounce(function (mutations) {
	                    fn.apply(element, []);
	                    $element.trigger('changed.uk.dom');
	                }, 50));
	
	                // pass in the target node, as well as the observer options
	                observer.observe(element, { childList: true, subtree: true });
	
	                $element.data('observer', observer);
	            } catch (e) {}
	        });
	    };
	
	    UI.init = function (root) {
	
	        root = root || document;
	
	        UI.domObservers.forEach(function (fn) {
	            fn(root);
	        });
	    };
	
	    UI.on('domready.uk.dom', function () {
	
	        UI.init();
	
	        if (UI.domready) UI.Utils.checkDisplay();
	    });
	
	    document.addEventListener('DOMContentLoaded', function () {
	
	        var domReady = function domReady() {
	
	            UI.$body = UI.$('body');
	
	            UI.ready(function (context) {
	                UI.domObserve('[data-uk-observe]');
	            });
	
	            UI.on('changed.uk.dom', function (e) {
	                UI.init(e.target);
	                UI.Utils.checkDisplay(e.target);
	            });
	
	            UI.trigger('beforeready.uk.dom');
	
	            UI.component.bootComponents();
	
	            // custom scroll observer
	            requestAnimationFrame(function () {
	
	                var memory = { dir: { x: 0, y: 0 }, x: window.pageXOffset, y: window.pageYOffset };
	
	                var fn = function fn() {
	                    // reading this (window.page[X|Y]Offset) causes a full page recalc of the layout in Chrome,
	                    // so we only want to do this once
	                    var wpxo = window.pageXOffset;
	                    var wpyo = window.pageYOffset;
	
	                    // Did the scroll position change since the last time we were here?
	                    if (memory.x != wpxo || memory.y != wpyo) {
	
	                        // Set the direction of the scroll and store the new position
	                        if (wpxo != memory.x) {
	                            memory.dir.x = wpxo > memory.x ? 1 : -1;
	                        } else {
	                            memory.dir.x = 0;
	                        }
	                        if (wpyo != memory.y) {
	                            memory.dir.y = wpyo > memory.y ? 1 : -1;
	                        } else {
	                            memory.dir.y = 0;
	                        }
	
	                        memory.x = wpxo;
	                        memory.y = wpyo;
	
	                        // Trigger the scroll event, this could probably be sent using memory.clone() but this is
	                        // more explicit and easier to see exactly what is being sent in the event.
	                        UI.$doc.trigger('scrolling.uk.document', [{
	                            "dir": { "x": memory.dir.x, "y": memory.dir.y }, "x": wpxo, "y": wpyo
	                        }]);
	                    }
	
	                    requestAnimationFrame(fn);
	                };
	
	                if (UI.support.touch) {
	                    UI.$html.on('touchmove touchend MSPointerMove MSPointerUp pointermove pointerup', fn);
	                }
	
	                if (memory.x || memory.y) fn();
	
	                return fn;
	            }());
	
	            // run component init functions on dom
	            UI.trigger('domready.uk.dom');
	
	            if (UI.support.touch) {
	
	                // remove css hover rules for touch devices
	                // UI.Utils.removeCssRules(/\.uk-(?!navbar).*:hover/);
	
	                // viewport unit fix for uk-height-viewport - should be fixed in iOS 8
	                if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
	
	                    UI.$win.on('load orientationchange resize', UI.Utils.debounce(function () {
	
	                        var fn = function fn() {
	                            $('.uk-height-viewport').css('height', window.innerHeight);
	                            return fn;
	                        };
	
	                        return fn();
	                    }(), 100));
	                }
	            }
	
	            UI.trigger('afterready.uk.dom');
	
	            // mark that domready is left behind
	            UI.domready = true;
	        };
	
	        if (document.readyState == 'complete' || document.readyState == 'interactive') {
	            setTimeout(domReady);
	        }
	
	        return domReady;
	    }());
	
	    // add touch identifier class
	    UI.$html.addClass(UI.support.touch ? "uk-touch" : "uk-notouch");
	
	    // add uk-hover class on tap to support overlays on touch devices
	    if (UI.support.touch) {
	
	        var hoverset = false,
	            exclude,
	            hovercls = 'uk-hover',
	            selector = '.uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover';
	
	        UI.$html.on('mouseenter touchstart MSPointerDown pointerdown', selector, function () {
	
	            if (hoverset) $('.' + hovercls).removeClass(hovercls);
	
	            hoverset = $(this).addClass(hovercls);
	        }).on('mouseleave touchend MSPointerUp pointerup', function (e) {
	
	            exclude = $(e.target).parents(selector);
	
	            if (hoverset) {
	                hoverset.not(exclude).removeClass(hovercls);
	            }
	        });
	    }
	
	    return UI;
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	var $Object = __webpack_require__(16).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(14)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(33)});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof2 = __webpack_require__(5);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (UI) {
	
	    "use strict";
	
	    var active = false,
	        activeCount = 0,
	        $html = UI.$html,
	        body;
	
	    UI.component('modal', {
	
	        defaults: {
	            keyboard: true,
	            bgclose: true,
	            minScrollHeight: 150,
	            center: false,
	            modal: true
	        },
	
	        scrollable: false,
	        transition: false,
	        hasTransitioned: true,
	
	        init: function init() {
	
	            if (!body) body = UI.$('body');
	
	            if (!this.element.length) return;
	
	            var $this = this;
	
	            this.paddingdir = "padding-" + (UI.langdirection == 'left' ? "right" : "left");
	            this.dialog = this.find(".uk-modal-dialog");
	
	            this.active = false;
	
	            // Update ARIA
	            this.element.attr('aria-hidden', this.element.hasClass("uk-open"));
	
	            this.on("click", ".uk-modal-close", function (e) {
	                e.preventDefault();
	                $this.hide();
	            }).on("click", function (e) {
	
	                var target = UI.$(e.target);
	
	                if (target[0] == $this.element[0] && $this.options.bgclose) {
	                    $this.hide();
	                }
	            });
	        },
	
	        toggle: function toggle() {
	            return this[this.isActive() ? "hide" : "show"]();
	        },
	
	        show: function show() {
	
	            if (!this.element.length) return;
	
	            var $this = this;
	
	            if (this.isActive()) return;
	
	            if (this.options.modal && active) {
	                active.hide(true);
	            }
	
	            this.element.removeClass("uk-open").show();
	            this.resize();
	
	            if (this.options.modal) {
	                active = this;
	            }
	
	            this.active = true;
	
	            activeCount++;
	
	            if (UI.support.transition) {
	                this.hasTransitioned = false;
	                this.element.one(UI.support.transition.end, function () {
	                    $this.hasTransitioned = true;
	                }).addClass("uk-open");
	            } else {
	                this.element.addClass("uk-open");
	            }
	
	            $html.addClass("uk-modal-page").height(); // force browser engine redraw
	
	            // Update ARIA
	            this.element.attr('aria-hidden', 'false');
	
	            this.element.trigger("show.uk.modal");
	
	            UI.Utils.checkDisplay(this.dialog, true);
	
	            return this;
	        },
	
	        hide: function hide(force) {
	
	            if (!force && UI.support.transition && this.hasTransitioned) {
	
	                var $this = this;
	
	                this.one(UI.support.transition.end, function () {
	                    $this._hide();
	                }).removeClass("uk-open");
	            } else {
	
	                this._hide();
	            }
	
	            return this;
	        },
	
	        resize: function resize() {
	
	            var bodywidth = body.width();
	
	            this.scrollbarwidth = window.innerWidth - bodywidth;
	
	            body.css(this.paddingdir, this.scrollbarwidth);
	
	            this.element.css('overflow-y', this.scrollbarwidth ? 'scroll' : 'auto');
	
	            if (!this.updateScrollable() && this.options.center) {
	
	                var dh = this.dialog.outerHeight(),
	                    pad = parseInt(this.dialog.css('margin-top'), 10) + parseInt(this.dialog.css('margin-bottom'), 10);
	
	                if (dh + pad < window.innerHeight) {
	                    this.dialog.css({ 'top': window.innerHeight / 2 - dh / 2 - pad });
	                } else {
	                    this.dialog.css({ 'top': '' });
	                }
	            }
	        },
	
	        updateScrollable: function updateScrollable() {
	
	            // has scrollable?
	            var scrollable = this.dialog.find('.uk-overflow-container:visible:first');
	
	            if (scrollable.length) {
	
	                scrollable.css('height', 0);
	
	                var offset = Math.abs(parseInt(this.dialog.css('margin-top'), 10)),
	                    dh = this.dialog.outerHeight(),
	                    wh = window.innerHeight,
	                    h = wh - 2 * (offset < 20 ? 20 : offset) - dh;
	
	                scrollable.css({
	                    'max-height': h < this.options.minScrollHeight ? '' : h,
	                    'height': ''
	                });
	
	                return true;
	            }
	
	            return false;
	        },
	
	        _hide: function _hide() {
	
	            this.active = false;
	            if (activeCount > 0) activeCount--;else activeCount = 0;
	
	            this.element.hide().removeClass('uk-open');
	
	            // Update ARIA
	            this.element.attr('aria-hidden', 'true');
	
	            if (!activeCount) {
	                $html.removeClass('uk-modal-page');
	                body.css(this.paddingdir, "");
	            }
	
	            if (active === this) active = false;
	
	            this.trigger('hide.uk.modal');
	        },
	
	        isActive: function isActive() {
	            return this.active;
	        }
	
	    });
	
	    UI.component('modalTrigger', {
	
	        boot: function boot() {
	
	            // init code
	            UI.$html.on("click.modal.uikit", "[data-uk-modal]", function (e) {
	
	                var ele = UI.$(this);
	
	                if (ele.is("a")) {
	                    e.preventDefault();
	                }
	
	                if (!ele.data("modalTrigger")) {
	                    var modal = UI.modalTrigger(ele, UI.Utils.options(ele.attr("data-uk-modal")));
	                    modal.show();
	                }
	            });
	
	            // close modal on esc button
	            UI.$html.on('keydown.modal.uikit', function (e) {
	
	                if (active && e.keyCode === 27 && active.options.keyboard) {
	                    // ESC
	                    e.preventDefault();
	                    active.hide();
	                }
	            });
	
	            UI.$win.on("resize orientationchange", UI.Utils.debounce(function () {
	                if (active) active.resize();
	            }, 150));
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            this.options = UI.$.extend({
	                "target": $this.element.is("a") ? $this.element.attr("href") : false
	            }, this.options);
	
	            this.modal = UI.modal(this.options.target, this.options);
	
	            this.on("click", function (e) {
	                e.preventDefault();
	                $this.show();
	            });
	
	            //methods
	            this.proxy(this.modal, "show hide isActive");
	        }
	    });
	
	    UI.modal.dialog = function (content, options) {
	
	        var modal = UI.modal(UI.$(UI.modal.dialog.template).appendTo("body"), options);
	
	        modal.on("hide.uk.modal", function () {
	            if (modal.persist) {
	                modal.persist.appendTo(modal.persist.data("modalPersistParent"));
	                modal.persist = false;
	            }
	            modal.element.remove();
	        });
	
	        setContent(content, modal);
	
	        return modal;
	    };
	
	    UI.modal.dialog.template = '<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>';
	
	    UI.modal.alert = function (content, options) {
	
	        options = UI.$.extend(true, { bgclose: false, keyboard: false, modal: false, labels: UI.modal.labels }, options);
	
	        var modal = UI.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(content) + '</div>', '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">' + options.labels.Ok + '</button></div>'].join(""), options);
	
	        modal.on('show.uk.modal', function () {
	            setTimeout(function () {
	                modal.element.find('button:first').focus();
	            }, 50);
	        });
	
	        return modal.show();
	    };
	
	    UI.modal.confirm = function (content, onconfirm, oncancel) {
	
	        var options = arguments.length > 1 && arguments[arguments.length - 1] ? arguments[arguments.length - 1] : {};
	
	        onconfirm = UI.$.isFunction(onconfirm) ? onconfirm : function () {};
	        oncancel = UI.$.isFunction(oncancel) ? oncancel : function () {};
	        options = UI.$.extend(true, { bgclose: false, keyboard: false, modal: false, labels: UI.modal.labels }, UI.$.isFunction(options) ? {} : options);
	
	        var modal = UI.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(content) + '</div>', '<div class="uk-modal-footer uk-text-right"><button class="uk-button js-modal-confirm-cancel">' + options.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-confirm">' + options.labels.Ok + '</button></div>'].join(""), options);
	
	        modal.element.find(".js-modal-confirm, .js-modal-confirm-cancel").on("click", function () {
	            UI.$(this).is('.js-modal-confirm') ? onconfirm() : oncancel();
	            modal.hide();
	        });
	
	        modal.on('show.uk.modal', function () {
	            setTimeout(function () {
	                modal.element.find('.js-modal-confirm').focus();
	            }, 50);
	        });
	
	        return modal.show();
	    };
	
	    UI.modal.prompt = function (text, value, onsubmit, options) {
	
	        onsubmit = UI.$.isFunction(onsubmit) ? onsubmit : function (value) {};
	        options = UI.$.extend(true, { bgclose: false, keyboard: false, modal: false, labels: UI.modal.labels }, options);
	
	        var modal = UI.modal.dialog([text ? '<div class="uk-modal-content uk-form">' + String(text) + '</div>' : '', '<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>', '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-modal-close">' + options.labels.Cancel + '</button> <button class="uk-button uk-button-primary js-modal-ok">' + options.labels.Ok + '</button></div>'].join(""), options),
	            input = modal.element.find("input[type='text']").val(value || '').on('keyup', function (e) {
	            if (e.keyCode == 13) {
	                modal.element.find(".js-modal-ok").trigger('click');
	            }
	        });
	
	        modal.element.find(".js-modal-ok").on("click", function () {
	            if (onsubmit(input.val()) !== false) {
	                modal.hide();
	            }
	        });
	
	        modal.on('show.uk.modal', function () {
	            setTimeout(function () {
	                input.focus();
	            }, 50);
	        });
	
	        return modal.show();
	    };
	
	    UI.modal.blockUI = function (content, options) {
	
	        var modal = UI.modal.dialog(['<div class="uk-margin uk-modal-content">' + String(content || '<div class="uk-text-center">...</div>') + '</div>'].join(""), UI.$.extend({ bgclose: false, keyboard: false, modal: false }, options));
	
	        modal.content = modal.element.find('.uk-modal-content:first');
	
	        return modal.show();
	    };
	
	    UI.modal.labels = {
	        'Ok': 'Ok',
	        'Cancel': 'Cancel'
	    };
	
	    // helper functions
	    function setContent(content, modal) {
	
	        if (!modal) return;
	
	        if ((typeof content === 'undefined' ? 'undefined' : (0, _typeof3.default)(content)) === 'object') {
	
	            // convert DOM object to a jQuery object
	            content = content instanceof jQuery ? content : UI.$(content);
	
	            if (content.parent().length) {
	                modal.persist = content;
	                modal.persist.data("modalPersistParent", content.parent());
	            }
	        } else if (typeof content === 'string' || typeof content === 'number') {
	            // just insert the data as innerHTML
	            content = UI.$('<div></div>').html(content);
	        } else {
	            // unsupported data type!
	            content = UI.$('<div></div>').html('UIkit.modal Error: Unsupported data type: ' + (typeof content === 'undefined' ? 'undefined' : (0, _typeof3.default)(content)));
	        }
	
	        content.appendTo(modal.element.find('.uk-modal-dialog'));
	
	        return modal;
	    }
	})(UIkit);

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof2 = __webpack_require__(5);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (UI) {
	
	    "use strict";
	
	    var Animations;
	
	    UI.component('switcher', {
	
	        defaults: {
	            connect: false,
	            toggle: ">*",
	            active: 0,
	            animation: false,
	            duration: 200,
	            swiping: true
	        },
	
	        animating: false,
	
	        boot: function boot() {
	
	            // init code
	            UI.ready(function (context) {
	
	                UI.$("[data-uk-switcher]", context).each(function () {
	                    var switcher = UI.$(this);
	
	                    if (!switcher.data("switcher")) {
	                        var obj = UI.switcher(switcher, UI.Utils.options(switcher.attr("data-uk-switcher")));
	                    }
	                });
	            });
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            this.on("click.uk.switcher", this.options.toggle, function (e) {
	                e.preventDefault();
	                $this.show(this);
	            });
	
	            if (this.options.connect) {
	
	                this.connect = UI.$(this.options.connect);
	
	                this.connect.find(".uk-active").removeClass(".uk-active");
	
	                // delegate switch commands within container content
	                if (this.connect.length) {
	
	                    // Init ARIA for connect
	                    this.connect.children().attr('aria-hidden', 'true');
	
	                    this.connect.on("click", '[data-uk-switcher-item]', function (e) {
	
	                        e.preventDefault();
	
	                        var item = UI.$(this).attr('data-uk-switcher-item');
	
	                        if ($this.index == item) return;
	
	                        switch (item) {
	                            case 'next':
	                            case 'previous':
	                                $this.show($this.index + (item == 'next' ? 1 : -1));
	                                break;
	                            default:
	                                $this.show(parseInt(item, 10));
	                        }
	                    });
	
	                    if (this.options.swiping) {
	
	                        this.connect.on('swipeRight swipeLeft', function (e) {
	                            e.preventDefault();
	                            if (!window.getSelection().toString()) {
	                                $this.show($this.index + (e.type == 'swipeLeft' ? 1 : -1));
	                            }
	                        });
	                    }
	                }
	
	                var toggles = this.find(this.options.toggle),
	                    active = toggles.filter(".uk-active");
	
	                if (active.length) {
	                    this.show(active, false);
	                } else {
	
	                    if (this.options.active === false) return;
	
	                    active = toggles.eq(this.options.active);
	                    this.show(active.length ? active : toggles.eq(0), false);
	                }
	
	                // Init ARIA for toggles
	                toggles.not(active).attr('aria-expanded', 'false');
	                active.attr('aria-expanded', 'true');
	
	                this.on('changed.uk.dom', function () {
	                    $this.connect = UI.$($this.options.connect);
	                });
	            }
	        },
	
	        show: function show(tab, animate) {
	
	            if (this.animating) {
	                return;
	            }
	
	            if (isNaN(tab)) {
	                tab = UI.$(tab);
	            } else {
	
	                var toggles = this.find(this.options.toggle);
	
	                tab = tab < 0 ? toggles.length - 1 : tab;
	                tab = toggles.eq(toggles[tab] ? tab : 0);
	            }
	
	            var $this = this,
	                toggles = this.find(this.options.toggle),
	                active = UI.$(tab),
	                animation = Animations[this.options.animation] || function (current, next) {
	
	                if (!$this.options.animation) {
	                    return Animations.none.apply($this);
	                }
	
	                var anim = $this.options.animation.split(',');
	
	                if (anim.length == 1) {
	                    anim[1] = anim[0];
	                }
	
	                anim[0] = anim[0].trim();
	                anim[1] = anim[1].trim();
	
	                return coreAnimation.apply($this, [anim, current, next]);
	            };
	
	            if (animate === false || !UI.support.animation) {
	                animation = Animations.none;
	            }
	
	            if (active.hasClass("uk-disabled")) return;
	
	            // Update ARIA for Toggles
	            toggles.attr('aria-expanded', 'false');
	            active.attr('aria-expanded', 'true');
	
	            toggles.filter(".uk-active").removeClass("uk-active");
	            active.addClass("uk-active");
	
	            if (this.options.connect && this.connect.length) {
	
	                this.index = this.find(this.options.toggle).index(active);
	
	                if (this.index == -1) {
	                    this.index = 0;
	                }
	
	                this.connect.each(function () {
	
	                    var container = UI.$(this),
	                        children = UI.$(container.children()),
	                        current = UI.$(children.filter('.uk-active')),
	                        next = UI.$(children.eq($this.index));
	
	                    $this.animating = true;
	
	                    animation.apply($this, [current, next]).then(function () {
	
	                        current.removeClass("uk-active");
	                        next.addClass("uk-active");
	
	                        // Update ARIA for connect
	                        current.attr('aria-hidden', 'true');
	                        next.attr('aria-hidden', 'false');
	
	                        UI.Utils.checkDisplay(next, true);
	
	                        $this.animating = false;
	                    });
	                });
	            }
	
	            this.trigger("show.uk.switcher", [active]);
	        }
	    });
	
	    Animations = {
	
	        'none': function none() {
	            var d = UI.$.Deferred();
	            d.resolve();
	            return d.promise();
	        },
	
	        'fade': function fade(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-fade', current, next]);
	        },
	
	        'slide-bottom': function slideBottom(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-bottom', current, next]);
	        },
	
	        'slide-top': function slideTop(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-top', current, next]);
	        },
	
	        'slide-vertical': function slideVertical(current, next, dir) {
	
	            var anim = ['uk-animation-slide-top', 'uk-animation-slide-bottom'];
	
	            if (current && current.index() > next.index()) {
	                anim.reverse();
	            }
	
	            return coreAnimation.apply(this, [anim, current, next]);
	        },
	
	        'slide-left': function slideLeft(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-left', current, next]);
	        },
	
	        'slide-right': function slideRight(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-right', current, next]);
	        },
	
	        'slide-horizontal': function slideHorizontal(current, next, dir) {
	
	            var anim = ['uk-animation-slide-right', 'uk-animation-slide-left'];
	
	            if (current && current.index() > next.index()) {
	                anim.reverse();
	            }
	
	            return coreAnimation.apply(this, [anim, current, next]);
	        },
	
	        'scale': function scale(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-scale-up', current, next]);
	        }
	    };
	
	    UI.switcher.animations = Animations;
	
	    // helpers
	
	    function coreAnimation(cls, current, next) {
	
	        var d = UI.$.Deferred(),
	            clsIn = cls,
	            clsOut = cls,
	            release;
	
	        if (next[0] === current[0]) {
	            d.resolve();
	            return d.promise();
	        }
	
	        if ((typeof cls === "undefined" ? "undefined" : (0, _typeof3.default)(cls)) == 'object') {
	            clsIn = cls[0];
	            clsOut = cls[1] || cls[0];
	        }
	
	        UI.$body.css('overflow-x', 'hidden'); // fix scroll jumping in iOS
	
	        release = function release() {
	
	            if (current) current.hide().removeClass('uk-active ' + clsOut + ' uk-animation-reverse');
	
	            next.addClass(clsIn).one(UI.support.animation.end, function () {
	
	                next.removeClass('' + clsIn + '').css({ opacity: '', display: '' });
	
	                d.resolve();
	
	                UI.$body.css('overflow-x', '');
	
	                if (current) current.css({ opacity: '', display: '' });
	            }.bind(this)).show();
	        };
	
	        next.css('animation-duration', this.options.duration + 'ms');
	
	        if (current && current.length) {
	
	            current.css('animation-duration', this.options.duration + 'ms');
	
	            current.css('display', 'none').addClass(clsOut + ' uk-animation-reverse').one(UI.support.animation.end, function () {
	                release();
	            }.bind(this)).css('display', '');
	        } else {
	            next.addClass('uk-active');
	            release();
	        }
	
	        return d.promise();
	    }
	})(UIkit);

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (UI) {
	
	    "use strict";
	
	    var toggles = [];
	
	    UI.component('toggle', {
	
	        defaults: {
	            target: false,
	            cls: 'uk-hidden',
	            animation: false,
	            duration: 200
	        },
	
	        boot: function boot() {
	
	            // init code
	            UI.ready(function (context) {
	
	                UI.$("[data-uk-toggle]", context).each(function () {
	                    var ele = UI.$(this);
	
	                    if (!ele.data("toggle")) {
	                        var obj = UI.toggle(ele, UI.Utils.options(ele.attr("data-uk-toggle")));
	                    }
	                });
	
	                setTimeout(function () {
	
	                    toggles.forEach(function (toggle) {
	                        toggle.getToggles();
	                    });
	                }, 0);
	            });
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            this.aria = this.options.cls.indexOf('uk-hidden') !== -1;
	
	            this.getToggles();
	
	            this.on("click", function (e) {
	                if ($this.element.is('a[href="#"]')) e.preventDefault();
	                $this.toggle();
	            });
	
	            toggles.push(this);
	        },
	
	        toggle: function toggle() {
	
	            if (!this.totoggle.length) return;
	
	            if (this.options.animation && UI.support.animation) {
	
	                var $this = this,
	                    animations = this.options.animation.split(',');
	
	                if (animations.length == 1) {
	                    animations[1] = animations[0];
	                }
	
	                animations[0] = animations[0].trim();
	                animations[1] = animations[1].trim();
	
	                this.totoggle.css('animation-duration', this.options.duration + 'ms');
	
	                this.totoggle.each(function () {
	
	                    var ele = UI.$(this);
	
	                    if (ele.hasClass($this.options.cls)) {
	
	                        ele.toggleClass($this.options.cls);
	
	                        UI.Utils.animate(ele, animations[0]).then(function () {
	                            ele.css('animation-duration', '');
	                            UI.Utils.checkDisplay(ele);
	                        });
	                    } else {
	
	                        UI.Utils.animate(this, animations[1] + ' uk-animation-reverse').then(function () {
	                            ele.toggleClass($this.options.cls).css('animation-duration', '');
	                            UI.Utils.checkDisplay(ele);
	                        });
	                    }
	                });
	            } else {
	                this.totoggle.toggleClass(this.options.cls);
	                UI.Utils.checkDisplay(this.totoggle);
	            }
	
	            this.updateAria();
	        },
	
	        getToggles: function getToggles() {
	            this.totoggle = this.options.target ? UI.$(this.options.target) : [];
	            this.updateAria();
	        },
	
	        updateAria: function updateAria() {
	            if (this.aria && this.totoggle.length) {
	                this.totoggle.each(function () {
	                    UI.$(this).attr('aria-hidden', UI.$(this).hasClass('uk-hidden'));
	                });
	            }
	        }
	    });
	})(UIkit);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	var _typeof2 = __webpack_require__(5);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (addon) {
	
	    var component;
	
	    if (window.UIkit) {
	        component = addon(UIkit);
	    }
	
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(91)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return component || addon(UIkit);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	})(function (UI) {
	
	    "use strict";
	
	    var $win = UI.$win,
	        $doc = UI.$doc,
	        sticked = [],
	        direction = 1;
	
	    UI.component('sticky', {
	
	        defaults: {
	            top: 0,
	            bottom: 0,
	            animation: '',
	            clsinit: 'uk-sticky-init',
	            clsactive: 'uk-active',
	            clsinactive: '',
	            getWidthFrom: '',
	            showup: false,
	            boundary: false,
	            media: false,
	            target: false,
	            disabled: false
	        },
	
	        boot: function boot() {
	
	            // should be more efficient than using $win.scroll(checkscrollposition):
	            UI.$doc.on('scrolling.uk.document', function (e, data) {
	                if (!data || !data.dir) return;
	                direction = data.dir.y;
	                checkscrollposition();
	            });
	
	            UI.$win.on('resize orientationchange', UI.Utils.debounce(function () {
	
	                if (!sticked.length) return;
	
	                for (var i = 0; i < sticked.length; i++) {
	                    sticked[i].reset(true);
	                    //sticked[i].self.computeWrapper();
	                }
	
	                checkscrollposition();
	            }, 100));
	
	            // init code
	            UI.ready(function (context) {
	
	                setTimeout(function () {
	
	                    UI.$("[data-uk-sticky]", context).each(function () {
	
	                        var $ele = UI.$(this);
	
	                        if (!$ele.data("sticky")) {
	                            UI.sticky($ele, UI.Utils.options($ele.attr('data-uk-sticky')));
	                        }
	                    });
	
	                    checkscrollposition();
	                }, 0);
	            });
	        },
	
	        init: function init() {
	
	            var boundary = this.options.boundary,
	                boundtoparent;
	
	            this.wrapper = this.element.wrap('<div class="uk-sticky-placeholder"></div>').parent();
	            this.computeWrapper();
	            this.element.css('margin', 0);
	
	            if (boundary) {
	
	                if (boundary === true || boundary[0] === '!') {
	
	                    boundary = boundary === true ? this.wrapper.parent() : this.wrapper.closest(boundary.substr(1));
	                    boundtoparent = true;
	                } else if (typeof boundary === "string") {
	                    boundary = UI.$(boundary);
	                }
	            }
	
	            this.sticky = {
	                self: this,
	                options: this.options,
	                element: this.element,
	                currentTop: null,
	                wrapper: this.wrapper,
	                init: false,
	                getWidthFrom: UI.$(this.options.getWidthFrom || this.wrapper),
	                boundary: boundary,
	                boundtoparent: boundtoparent,
	                top: 0,
	                calcTop: function calcTop() {
	
	                    var top = this.options.top;
	
	                    // dynamic top parameter
	                    if (this.options.top && typeof this.options.top == 'string') {
	
	                        // e.g. 50vh
	                        if (this.options.top.match(/^(-|)(\d+)vh$/)) {
	                            top = window.innerHeight * parseInt(this.options.top, 10) / 100;
	                            // e.g. #elementId, or .class-1,class-2,.class-3 (first found is used)
	                        } else {
	
	                            var topElement = UI.$(this.options.top).first();
	
	                            if (topElement.length && topElement.is(':visible')) {
	                                top = -1 * (topElement.offset().top + topElement.outerHeight() - this.wrapper.offset().top);
	                            }
	                        }
	                    }
	
	                    this.top = top;
	                },
	
	                reset: function reset(force) {
	
	                    this.calcTop();
	
	                    var finalize = function () {
	                        this.element.css({ "position": "", "top": "", "width": "", "left": "", "margin": "0" });
	                        this.element.removeClass([this.options.animation, 'uk-animation-reverse', this.options.clsactive].join(' '));
	                        this.element.addClass(this.options.clsinactive);
	                        this.element.trigger('inactive.uk.sticky');
	
	                        this.currentTop = null;
	                        this.animate = false;
	                    }.bind(this);
	
	                    if (!force && this.options.animation && UI.support.animation && !UI.Utils.isInView(this.wrapper)) {
	
	                        this.animate = true;
	
	                        this.element.removeClass(this.options.animation).one(UI.support.animation.end, function () {
	                            finalize();
	                        }).width(); // force redraw
	
	                        this.element.addClass(this.options.animation + ' ' + 'uk-animation-reverse');
	                    } else {
	                        finalize();
	                    }
	                },
	
	                check: function check() {
	
	                    if (this.options.disabled) {
	                        return false;
	                    }
	
	                    if (this.options.media) {
	
	                        switch ((0, _typeof3.default)(this.options.media)) {
	                            case 'number':
	                                if (window.innerWidth < this.options.media) {
	                                    return false;
	                                }
	                                break;
	                            case 'string':
	                                if (window.matchMedia && !window.matchMedia(this.options.media).matches) {
	                                    return false;
	                                }
	                                break;
	                        }
	                    }
	
	                    var scrollTop = $win.scrollTop(),
	                        documentHeight = $doc.height(),
	                        dwh = documentHeight - window.innerHeight,
	                        extra = scrollTop > dwh ? dwh - scrollTop : 0,
	                        elementTop = this.wrapper.offset().top,
	                        etse = elementTop - this.top - extra,
	                        active = scrollTop >= etse;
	
	                    if (active && this.options.showup) {
	
	                        // set inactiv if scrolling down
	                        if (direction == 1) {
	                            active = false;
	                        }
	
	                        // set inactive when wrapper is still in view
	                        if (direction == -1 && !this.element.hasClass(this.options.clsactive) && UI.Utils.isInView(this.wrapper)) {
	                            active = false;
	                        }
	                    }
	
	                    return active;
	                }
	            };
	
	            this.sticky.calcTop();
	
	            sticked.push(this.sticky);
	        },
	
	        update: function update() {
	            checkscrollposition(this.sticky);
	        },
	
	        enable: function enable() {
	            this.options.disabled = false;
	            this.update();
	        },
	
	        disable: function disable(force) {
	            this.options.disabled = true;
	            this.sticky.reset(force);
	        },
	
	        computeWrapper: function computeWrapper() {
	
	            this.wrapper.css({
	                'height': ['absolute', 'fixed'].indexOf(this.element.css('position')) == -1 ? this.element.outerHeight() : '',
	                'float': this.element.css('float') != 'none' ? this.element.css('float') : '',
	                'margin': this.element.css('margin')
	            });
	
	            if (this.element.css('position') == 'fixed') {
	                this.element.css({
	                    width: this.sticky.getWidthFrom.length ? this.sticky.getWidthFrom.width() : this.element.width()
	                });
	            }
	        }
	    });
	
	    function checkscrollposition(direction) {
	
	        var stickies = arguments.length ? arguments : sticked;
	
	        if (!stickies.length || $win.scrollTop() < 0) return;
	
	        var scrollTop = $win.scrollTop(),
	            documentHeight = $doc.height(),
	            windowHeight = $win.height(),
	            dwh = documentHeight - windowHeight,
	            extra = scrollTop > dwh ? dwh - scrollTop : 0,
	            newTop,
	            containerBottom,
	            stickyHeight,
	            sticky;
	
	        for (var i = 0; i < stickies.length; i++) {
	
	            sticky = stickies[i];
	
	            if (!sticky.element.is(":visible") || sticky.animate) {
	                continue;
	            }
	
	            if (!sticky.check()) {
	
	                if (sticky.currentTop !== null) {
	                    sticky.reset();
	                }
	            } else {
	
	                if (sticky.top < 0) {
	                    newTop = 0;
	                } else {
	                    stickyHeight = sticky.element.outerHeight();
	                    newTop = documentHeight - stickyHeight - sticky.top - sticky.options.bottom - scrollTop - extra;
	                    newTop = newTop < 0 ? newTop + sticky.top : sticky.top;
	                }
	
	                if (sticky.boundary && sticky.boundary.length) {
	
	                    var bTop = sticky.boundary.offset().top;
	
	                    if (sticky.boundtoparent) {
	                        containerBottom = documentHeight - (bTop + sticky.boundary.outerHeight()) + parseInt(sticky.boundary.css('padding-bottom'));
	                    } else {
	                        containerBottom = documentHeight - bTop - parseInt(sticky.boundary.css('margin-top'));
	                    }
	
	                    newTop = scrollTop + stickyHeight > documentHeight - containerBottom - (sticky.top < 0 ? 0 : sticky.top) ? documentHeight - containerBottom - (scrollTop + stickyHeight) : newTop;
	                }
	
	                if (sticky.currentTop != newTop) {
	
	                    sticky.element.css({
	                        position: "fixed",
	                        top: newTop,
	                        width: sticky.getWidthFrom.length ? sticky.getWidthFrom.width() : sticky.element.width()
	                    });
	
	                    if (!sticky.init) {
	
	                        sticky.element.addClass(sticky.options.clsinit);
	
	                        if (location.hash && scrollTop > 0 && sticky.options.target) {
	
	                            var $target = UI.$(location.hash);
	
	                            if ($target.length) {
	
	                                setTimeout(function ($target, sticky) {
	
	                                    return function () {
	
	                                        sticky.element.width(); // force redraw
	
	                                        var offset = $target.offset(),
	                                            maxoffset = offset.top + $target.outerHeight(),
	                                            stickyOffset = sticky.element.offset(),
	                                            stickyHeight = sticky.element.outerHeight(),
	                                            stickyMaxOffset = stickyOffset.top + stickyHeight;
	
	                                        if (stickyOffset.top < maxoffset && offset.top < stickyMaxOffset) {
	                                            scrollTop = offset.top - stickyHeight - sticky.options.target;
	                                            window.scrollTo(0, scrollTop);
	                                        }
	                                    };
	                                }($target, sticky), 0);
	                            }
	                        }
	                    }
	
	                    sticky.element.addClass(sticky.options.clsactive).removeClass(sticky.options.clsinactive);
	                    sticky.element.trigger('active.uk.sticky');
	                    sticky.element.css('margin', '');
	
	                    if (sticky.options.animation && sticky.init && !UI.Utils.isInView(sticky.wrapper)) {
	                        sticky.element.addClass(sticky.options.animation);
	                    }
	
	                    sticky.currentTop = newTop;
	                }
	            }
	
	            sticky.init = true;
	        }
	    }
	
	    return UI.sticky;
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! UIkit 2.27.2 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function(core) {
	
	    if (true) { // AMD
	
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	
	            var uikit = window.UIkit || core(window, window.jQuery, window.document);
	
	            uikit.load = function(res, req, onload, config) {
	
	                var resources = res.split(','), load = [], i, base = (config.config && config.config.uikit && config.config.uikit.base ? config.config.uikit.base : '').replace(/\/+$/g, '');
	
	                if (!base) {
	                    throw new Error('Please define base path to UIkit in the requirejs config.');
	                }
	
	                for (i = 0; i < resources.length; i += 1) {
	                    var resource = resources[i].replace(/\./g, '/');
	                    load.push(base+'/components/'+resource);
	                }
	
	                req(load, function() {
	                    onload(uikit);
	                });
	            };
	
	            return uikit;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	
	    if (!window.jQuery) {
	        throw new Error('UIkit requires jQuery');
	    }
	
	    if (window && window.jQuery) {
	        core(window, window.jQuery, window.document);
	    }
	
	
	})(function(global, $, doc) {
	
	    "use strict";
	
	    var UI = {}, _UI = global.UIkit ? Object.create(global.UIkit) : undefined;
	
	    UI.version = '2.27.2';
	
	    UI.noConflict = function() {
	        // restore UIkit version
	        if (_UI) {
	            global.UIkit = _UI;
	            $.UIkit      = _UI;
	            $.fn.uk      = _UI.fn;
	        }
	
	        return UI;
	    };
	
	    UI.prefix = function(str) {
	        return str;
	    };
	
	    // cache jQuery
	    UI.$ = $;
	
	    UI.$doc  = UI.$(document);
	    UI.$win  = UI.$(window);
	    UI.$html = UI.$('html');
	
	    UI.support = {};
	    UI.support.transition = (function() {
	
	        var transitionEnd = (function() {
	
	            var element = doc.body || doc.documentElement,
	                transEndEventNames = {
	                    WebkitTransition : 'webkitTransitionEnd',
	                    MozTransition    : 'transitionend',
	                    OTransition      : 'oTransitionEnd otransitionend',
	                    transition       : 'transitionend'
	                }, name;
	
	            for (name in transEndEventNames) {
	                if (element.style[name] !== undefined) return transEndEventNames[name];
	            }
	        }());
	
	        return transitionEnd && { end: transitionEnd };
	    })();
	
	    UI.support.animation = (function() {
	
	        var animationEnd = (function() {
	
	            var element = doc.body || doc.documentElement,
	                animEndEventNames = {
	                    WebkitAnimation : 'webkitAnimationEnd',
	                    MozAnimation    : 'animationend',
	                    OAnimation      : 'oAnimationEnd oanimationend',
	                    animation       : 'animationend'
	                }, name;
	
	            for (name in animEndEventNames) {
	                if (element.style[name] !== undefined) return animEndEventNames[name];
	            }
	        }());
	
	        return animationEnd && { end: animationEnd };
	    })();
	
	    // requestAnimationFrame polyfill
	    //https://github.com/darius/requestAnimationFrame
	    (function() {
	
	        Date.now = Date.now || function() { return new Date().getTime(); };
	
	        var vendors = ['webkit', 'moz'];
	        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
	            var vp = vendors[i];
	            window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
	            window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
	                                       || window[vp+'CancelRequestAnimationFrame']);
	        }
	        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
	            || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
	            var lastTime = 0;
	            window.requestAnimationFrame = function(callback) {
	                var now = Date.now();
	                var nextTime = Math.max(lastTime + 16, now);
	                return setTimeout(function() { callback(lastTime = nextTime); },
	                                  nextTime - now);
	            };
	            window.cancelAnimationFrame = clearTimeout;
	        }
	    }());
	
	    UI.support.touch = (
	        ('ontouchstart' in document) ||
	        (global.DocumentTouch && document instanceof global.DocumentTouch)  ||
	        (global.navigator.msPointerEnabled && global.navigator.msMaxTouchPoints > 0) || //IE 10
	        (global.navigator.pointerEnabled && global.navigator.maxTouchPoints > 0) || //IE >=11
	        false
	    );
	
	    UI.support.mutationobserver = (global.MutationObserver || global.WebKitMutationObserver || null);
	
	    UI.Utils = {};
	
	    UI.Utils.isFullscreen = function() {
	        return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || false;
	    };
	
	    UI.Utils.str2json = function(str, notevil) {
	        try {
	            if (notevil) {
	                return JSON.parse(str
	                    // wrap keys without quote with valid double quote
	                    .replace(/([\$\w]+)\s*:/g, function(_, $1){return '"'+$1+'":';})
	                    // replacing single quote wrapped ones to double quote
	                    .replace(/'([^']+)'/g, function(_, $1){return '"'+$1+'"';})
	                );
	            } else {
	                return (new Function('', 'var json = ' + str + '; return JSON.parse(JSON.stringify(json));'))();
	            }
	        } catch(e) { return false; }
	    };
	
	    UI.Utils.debounce = function(func, wait, immediate) {
	        var timeout;
	        return function() {
	            var context = this, args = arguments;
	            var later = function() {
	                timeout = null;
	                if (!immediate) func.apply(context, args);
	            };
	            var callNow = immediate && !timeout;
	            clearTimeout(timeout);
	            timeout = setTimeout(later, wait);
	            if (callNow) func.apply(context, args);
	        };
	    };
	
	    UI.Utils.throttle = function (func, limit) {
	        var wait = false;
	        return function () {
	            if (!wait) {
	                func.call();
	                wait = true;
	                setTimeout(function () {
	                    wait = false;
	                }, limit);
	            }
	        }
	    };
	
	    UI.Utils.removeCssRules = function(selectorRegEx) {
	        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;
	
	        if(!selectorRegEx) return;
	
	        setTimeout(function(){
	            try {
	              _ref = document.styleSheets;
	              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	                stylesheet = _ref[_i];
	                idxs = [];
	                stylesheet.cssRules = stylesheet.cssRules;
	                for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
	                  if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
	                    idxs.unshift(idx);
	                  }
	                }
	                for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
	                  stylesheet.deleteRule(idxs[_k]);
	                }
	              }
	            } catch (_error) {}
	        }, 0);
	    };
	
	    UI.Utils.isInView = function(element, options) {
	
	        var $element = $(element);
	
	        if (!$element.is(':visible')) {
	            return false;
	        }
	
	        var window_left = UI.$win.scrollLeft(), window_top = UI.$win.scrollTop(), offset = $element.offset(), left = offset.left, top = offset.top;
	
	        options = $.extend({topoffset:0, leftoffset:0}, options);
	
	        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + UI.$win.height() &&
	            left + $element.width() >= window_left && left - options.leftoffset <= window_left + UI.$win.width()) {
	          return true;
	        } else {
	          return false;
	        }
	    };
	
	    UI.Utils.checkDisplay = function(context, initanimation) {
	
	        var elements = UI.$('[data-uk-margin], [data-uk-grid-match], [data-uk-grid-margin], [data-uk-check-display]', context || document), animated;
	
	        if (context && !elements.length) {
	            elements = $(context);
	        }
	
	        elements.trigger('display.uk.check');
	
	        // fix firefox / IE animations
	        if (initanimation) {
	
	            if (typeof(initanimation)!='string') {
	                initanimation = '[class*="uk-animation-"]';
	            }
	
	            elements.find(initanimation).each(function(){
	
	                var ele  = UI.$(this),
	                    cls  = ele.attr('class'),
	                    anim = cls.match(/uk-animation-(.+)/);
	
	                ele.removeClass(anim[0]).width();
	
	                ele.addClass(anim[0]);
	            });
	        }
	
	        return elements;
	    };
	
	    UI.Utils.options = function(string) {
	
	        if ($.type(string)!='string') return string;
	
	        if (string.indexOf(':') != -1 && string.trim().substr(-1) != '}') {
	            string = '{'+string+'}';
	        }
	
	        var start = (string ? string.indexOf("{") : -1), options = {};
	
	        if (start != -1) {
	            try {
	                options = UI.Utils.str2json(string.substr(start));
	            } catch (e) {}
	        }
	
	        return options;
	    };
	
	    UI.Utils.animate = function(element, cls) {
	
	        var d = $.Deferred();
	
	        element = UI.$(element);
	
	        element.css('display', 'none').addClass(cls).one(UI.support.animation.end, function() {
	            element.removeClass(cls);
	            d.resolve();
	        });
	
	        element.css('display', '');
	
	        return d.promise();
	    };
	
	    UI.Utils.uid = function(prefix) {
	        return (prefix || 'id') + (new Date().getTime())+"RAND"+(Math.ceil(Math.random() * 100000));
	    };
	
	    UI.Utils.template = function(str, data) {
	
	        var tokens = str.replace(/\n/g, '\\n').replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g),
	            i=0, toc, cmd, prop, val, fn, output = [], openblocks = 0;
	
	        while(i < tokens.length) {
	
	            toc = tokens[i];
	
	            if(toc.match(/\{\{\s*(.+?)\s*\}\}/)) {
	                i = i + 1;
	                toc  = tokens[i];
	                cmd  = toc[0];
	                prop = toc.substring(toc.match(/^(\^|\#|\!|\~|\:)/) ? 1:0);
	
	                switch(cmd) {
	                    case '~':
	                        output.push('for(var $i=0;$i<'+prop+'.length;$i++) { var $item = '+prop+'[$i];');
	                        openblocks++;
	                        break;
	                    case ':':
	                        output.push('for(var $key in '+prop+') { var $val = '+prop+'[$key];');
	                        openblocks++;
	                        break;
	                    case '#':
	                        output.push('if('+prop+') {');
	                        openblocks++;
	                        break;
	                    case '^':
	                        output.push('if(!'+prop+') {');
	                        openblocks++;
	                        break;
	                    case '/':
	                        output.push('}');
	                        openblocks--;
	                        break;
	                    case '!':
	                        output.push('__ret.push('+prop+');');
	                        break;
	                    default:
	                        output.push('__ret.push(escape('+prop+'));');
	                        break;
	                }
	            } else {
	                output.push("__ret.push('"+toc.replace(/\'/g, "\\'")+"');");
	            }
	            i = i + 1;
	        }
	
	        fn  = new Function('$data', [
	            'var __ret = [];',
	            'try {',
	            'with($data){', (!openblocks ? output.join('') : '__ret = ["Not all blocks are closed correctly."]'), '};',
	            '}catch(e){__ret = [e.message];}',
	            'return __ret.join("").replace(/\\n\\n/g, "\\n");',
	            "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"
	        ].join("\n"));
	
	        return data ? fn(data) : fn;
	    };
	
	    UI.Utils.focus = function(element, extra) {
	
	        element = $(element);
	
	        if (!element.length) {
	            return element;
	        }
	
	        var autofocus = element.find('[autofocus]:first'), tabidx;
	
	        if (autofocus.length) {
	            return autofocus.focus();
	        }
	
	        autofocus = element.find(':input'+(extra && (','+extra) || '')).first();
	
	        if (autofocus.length) {
	            return autofocus.focus();
	        }
	
	        if (!element.attr('tabindex')) {
	            tabidx = 1000;
	            element.attr('tabindex', tabidx);
	        }
	
	        element[0].focus();
	
	        if (tabidx) {
	            element.attr('tabindex', '');
	        }
	
	        return element;
	    }
	
	    UI.Utils.events       = {};
	    UI.Utils.events.click = UI.support.touch ? 'tap' : 'click';
	
	    global.UIkit = UI;
	
	    // deprecated
	
	    UI.fn = function(command, options) {
	
	        var args = arguments, cmd = command.match(/^([a-z\-]+)(?:\.([a-z]+))?/i), component = cmd[1], method = cmd[2];
	
	        if (!UI[component]) {
	            $.error('UIkit component [' + component + '] does not exist.');
	            return this;
	        }
	
	        return this.each(function() {
	            var $this = $(this), data = $this.data(component);
	            if (!data) $this.data(component, (data = UI[component](this, method ? undefined : options)));
	            if (method) data[method].apply(data, Array.prototype.slice.call(args, 1));
	        });
	    };
	
	    $.UIkit          = UI;
	    $.fn.uk          = UI.fn;
	
	    UI.langdirection = UI.$html.attr("dir") == "rtl" ? "right" : "left";
	
	    UI.components    = {};
	
	    UI.component = function(name, def) {
	
	        var fn = function(element, options) {
	
	            var $this = this;
	
	            this.UIkit   = UI;
	            this.element = element ? UI.$(element) : null;
	            this.options = $.extend(true, {}, this.defaults, options);
	            this.plugins = {};
	
	            if (this.element) {
	                this.element.data(name, this);
	            }
	
	            this.init();
	
	            (this.options.plugins.length ? this.options.plugins : Object.keys(fn.plugins)).forEach(function(plugin) {
	
	                if (fn.plugins[plugin].init) {
	                    fn.plugins[plugin].init($this);
	                    $this.plugins[plugin] = true;
	                }
	
	            });
	
	            this.trigger('init.uk.component', [name, this]);
	
	            return this;
	        };
	
	        fn.plugins = {};
	
	        $.extend(true, fn.prototype, {
	
	            defaults : {plugins: []},
	
	            boot: function(){},
	            init: function(){},
	
	            on: function(a1,a2,a3){
	                return UI.$(this.element || this).on(a1,a2,a3);
	            },
	
	            one: function(a1,a2,a3){
	                return UI.$(this.element || this).one(a1,a2,a3);
	            },
	
	            off: function(evt){
	                return UI.$(this.element || this).off(evt);
	            },
	
	            trigger: function(evt, params) {
	                return UI.$(this.element || this).trigger(evt, params);
	            },
	
	            find: function(selector) {
	                return UI.$(this.element ? this.element: []).find(selector);
	            },
	
	            proxy: function(obj, methods) {
	
	                var $this = this;
	
	                methods.split(' ').forEach(function(method) {
	                    if (!$this[method]) $this[method] = function() { return obj[method].apply(obj, arguments); };
	                });
	            },
	
	            mixin: function(obj, methods) {
	
	                var $this = this;
	
	                methods.split(' ').forEach(function(method) {
	                    if (!$this[method]) $this[method] = obj[method].bind($this);
	                });
	            },
	
	            option: function() {
	
	                if (arguments.length == 1) {
	                    return this.options[arguments[0]] || undefined;
	                } else if (arguments.length == 2) {
	                    this.options[arguments[0]] = arguments[1];
	                }
	            }
	
	        }, def);
	
	        this.components[name] = fn;
	
	        this[name] = function() {
	
	            var element, options;
	
	            if (arguments.length) {
	
	                switch(arguments.length) {
	                    case 1:
	
	                        if (typeof arguments[0] === 'string' || arguments[0].nodeType || arguments[0] instanceof jQuery) {
	                            element = $(arguments[0]);
	                        } else {
	                            options = arguments[0];
	                        }
	
	                        break;
	                    case 2:
	
	                        element = $(arguments[0]);
	                        options = arguments[1];
	                        break;
	                }
	            }
	
	            if (element && element.data(name)) {
	                return element.data(name);
	            }
	
	            return (new UI.components[name](element, options));
	        };
	
	        if (UI.domready) {
	            UI.component.boot(name);
	        }
	
	        return fn;
	    };
	
	    UI.plugin = function(component, name, def) {
	        this.components[component].plugins[name] = def;
	    };
	
	    UI.component.boot = function(name) {
	
	        if (UI.components[name].prototype && UI.components[name].prototype.boot && !UI.components[name].booted) {
	            UI.components[name].prototype.boot.apply(UI, []);
	            UI.components[name].booted = true;
	        }
	    };
	
	    UI.component.bootComponents = function() {
	
	        for (var component in UI.components) {
	            UI.component.boot(component);
	        }
	    };
	
	
	    // DOM mutation save ready helper function
	
	    UI.domObservers = [];
	    UI.domready     = false;
	
	    UI.ready = function(fn) {
	
	        UI.domObservers.push(fn);
	
	        if (UI.domready) {
	            fn(document);
	        }
	    };
	
	    UI.on = function(a1,a2,a3){
	
	        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
	            a2.apply(UI.$doc);
	        }
	
	        return UI.$doc.on(a1,a2,a3);
	    };
	
	    UI.one = function(a1,a2,a3){
	
	        if (a1 && a1.indexOf('ready.uk.dom') > -1 && UI.domready) {
	            a2.apply(UI.$doc);
	            return UI.$doc;
	        }
	
	        return UI.$doc.one(a1,a2,a3);
	    };
	
	    UI.trigger = function(evt, params) {
	        return UI.$doc.trigger(evt, params);
	    };
	
	    UI.domObserve = function(selector, fn) {
	
	        if(!UI.support.mutationobserver) return;
	
	        fn = fn || function() {};
	
	        UI.$(selector).each(function() {
	
	            var element  = this,
	                $element = UI.$(element);
	
	            if ($element.data('observer')) {
	                return;
	            }
	
	            try {
	
	                var observer = new UI.support.mutationobserver(UI.Utils.debounce(function(mutations) {
	                    fn.apply(element, [$element]);
	                    $element.trigger('changed.uk.dom');
	                }, 50), {childList: true, subtree: true});
	
	                // pass in the target node, as well as the observer options
	                observer.observe(element, { childList: true, subtree: true });
	
	                $element.data('observer', observer);
	
	            } catch(e) {}
	        });
	    };
	
	    UI.init = function(root) {
	
	        root = root || document;
	
	        UI.domObservers.forEach(function(fn){
	            fn(root);
	        });
	    };
	
	    UI.on('domready.uk.dom', function(){
	
	        UI.init();
	
	        if (UI.domready) UI.Utils.checkDisplay();
	    });
	
	    document.addEventListener('DOMContentLoaded', function(){
	
	        var domReady = function() {
	
	            UI.$body = UI.$('body');
	
	            UI.trigger('beforeready.uk.dom');
	
	            UI.component.bootComponents();
	
	            // custom scroll observer
	            var rafToken = requestAnimationFrame((function(){
	
	                var memory = {dir: {x:0, y:0}, x: window.pageXOffset, y:window.pageYOffset};
	
	                var fn = function(){
	                    // reading this (window.page[X|Y]Offset) causes a full page recalc of the layout in Chrome,
	                    // so we only want to do this once
	                    var wpxo = window.pageXOffset;
	                    var wpyo = window.pageYOffset;
	
	                    // Did the scroll position change since the last time we were here?
	                    if (memory.x != wpxo || memory.y != wpyo) {
	
	                        // Set the direction of the scroll and store the new position
	                        if (wpxo != memory.x) {memory.dir.x = wpxo > memory.x ? 1:-1; } else { memory.dir.x = 0; }
	                        if (wpyo != memory.y) {memory.dir.y = wpyo > memory.y ? 1:-1; } else { memory.dir.y = 0; }
	
	                        memory.x = wpxo;
	                        memory.y = wpyo;
	
	                        // Trigger the scroll event, this could probably be sent using memory.clone() but this is
	                        // more explicit and easier to see exactly what is being sent in the event.
	                        UI.$doc.trigger('scrolling.uk.document', [{
	                            dir: {x: memory.dir.x, y: memory.dir.y}, x: wpxo, y: wpyo
	                        }]);
	                    }
	
	                    cancelAnimationFrame(rafToken);
	                    rafToken = requestAnimationFrame(fn);
	                };
	
	                if (UI.support.touch) {
	                    UI.$html.on('touchmove touchend MSPointerMove MSPointerUp pointermove pointerup', fn);
	                }
	
	                if (memory.x || memory.y) fn();
	
	                return fn;
	
	            })());
	
	            // run component init functions on dom
	            UI.trigger('domready.uk.dom');
	
	            if (UI.support.touch) {
	
	                // remove css hover rules for touch devices
	                // UI.Utils.removeCssRules(/\.uk-(?!navbar).*:hover/);
	
	                // viewport unit fix for uk-height-viewport - should be fixed in iOS 8
	                if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
	
	                    UI.$win.on('load orientationchange resize', UI.Utils.debounce((function(){
	
	                        var fn = function() {
	                            $('.uk-height-viewport').css('height', window.innerHeight);
	                            return fn;
	                        };
	
	                        return fn();
	
	                    })(), 100));
	                }
	            }
	
	            UI.trigger('afterready.uk.dom');
	
	            // mark that domready is left behind
	            UI.domready = true;
	
	            // auto init js components
	            if (UI.support.mutationobserver) {
	
	                var initFn = UI.Utils.debounce(function(){
	                    requestAnimationFrame(function(){ UI.init(document.body);});
	                }, 10);
	
	                (new UI.support.mutationobserver(function(mutations) {
	
	                    var init = false;
	
	                    mutations.every(function(mutation){
	
	                        if (mutation.type != 'childList') return true;
	
	                        for (var i = 0, node; i < mutation.addedNodes.length; ++i) {
	
	                            node = mutation.addedNodes[i];
	
	                            if (node.outerHTML && node.outerHTML.indexOf('data-uk-') !== -1) {
	                                return (init = true) && false;
	                            }
	                        }
	                        return true;
	                    });
	
	                    if (init) initFn();
	
	                })).observe(document.body, {childList: true, subtree: true});
	            }
	        };
	
	        if (document.readyState == 'complete' || document.readyState == 'interactive') {
	            setTimeout(domReady);
	        }
	
	        return domReady;
	
	    }());
	
	    // add touch identifier class
	    UI.$html.addClass(UI.support.touch ? 'uk-touch' : 'uk-notouch');
	
	    // add uk-hover class on tap to support overlays on touch devices
	    if (UI.support.touch) {
	
	        var hoverset = false,
	            exclude,
	            hovercls = 'uk-hover',
	            selector = '.uk-overlay, .uk-overlay-hover, .uk-overlay-toggle, .uk-animation-hover, .uk-has-hover';
	
	        UI.$html.on('mouseenter touchstart MSPointerDown pointerdown', selector, function() {
	
	            if (hoverset) $('.'+hovercls).removeClass(hovercls);
	
	            hoverset = $(this).addClass(hovercls);
	
	        }).on('mouseleave touchend MSPointerUp pointerup', function(e) {
	
	            exclude = $(e.target).parents(selector);
	
	            if (hoverset) {
	                hoverset.not(exclude).removeClass(hovercls);
	            }
	        });
	    }
	
	    return UI;
	});
	
	//  Based on Zeptos touch.js
	//  https://raw.github.com/madrobby/zepto/master/src/touch.js
	//  Zepto.js may be freely distributed under the MIT license.
	
	;(function($){
	
	  if ($.fn.swipeLeft) {
	    return;
	  }
	
	
	  var touch = {}, touchTimeout, tapTimeout, swipeTimeout, longTapTimeout, longTapDelay = 750, gesture;
	
	  function swipeDirection(x1, x2, y1, y2) {
	    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
	  }
	
	  function longTap() {
	    longTapTimeout = null;
	    if (touch.last) {
	      if ( touch.el !== undefined ) touch.el.trigger('longTap');
	      touch = {};
	    }
	  }
	
	  function cancelLongTap() {
	    if (longTapTimeout) clearTimeout(longTapTimeout);
	    longTapTimeout = null;
	  }
	
	  function cancelAll() {
	    if (touchTimeout)   clearTimeout(touchTimeout);
	    if (tapTimeout)     clearTimeout(tapTimeout);
	    if (swipeTimeout)   clearTimeout(swipeTimeout);
	    if (longTapTimeout) clearTimeout(longTapTimeout);
	    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
	    touch = {};
	  }
	
	  function isPrimaryTouch(event){
	    return event.pointerType == event.MSPOINTER_TYPE_TOUCH && event.isPrimary;
	  }
	
	  $(function(){
	    var now, delta, deltaX = 0, deltaY = 0, firstTouch;
	
	    if ('MSGesture' in window) {
	      gesture = new MSGesture();
	      gesture.target = document.body;
	    }
	
	    $(document)
	      .on('MSGestureEnd gestureend', function(e){
	
	        var swipeDirectionFromVelocity = e.originalEvent.velocityX > 1 ? 'Right' : e.originalEvent.velocityX < -1 ? 'Left' : e.originalEvent.velocityY > 1 ? 'Down' : e.originalEvent.velocityY < -1 ? 'Up' : null;
	
	        if (swipeDirectionFromVelocity && touch.el !== undefined) {
	          touch.el.trigger('swipe');
	          touch.el.trigger('swipe'+ swipeDirectionFromVelocity);
	        }
	      })
	      // MSPointerDown: for IE10
	      // pointerdown: for IE11
	      .on('touchstart MSPointerDown pointerdown', function(e){
	
	        if(e.type == 'MSPointerDown' && !isPrimaryTouch(e.originalEvent)) return;
	
	        firstTouch = (e.type == 'MSPointerDown' || e.type == 'pointerdown') ? e : e.originalEvent.touches[0];
	
	        now      = Date.now();
	        delta    = now - (touch.last || now);
	        touch.el = $('tagName' in firstTouch.target ? firstTouch.target : firstTouch.target.parentNode);
	
	        if(touchTimeout) clearTimeout(touchTimeout);
	
	        touch.x1 = firstTouch.pageX;
	        touch.y1 = firstTouch.pageY;
	
	        if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
	
	        touch.last = now;
	        longTapTimeout = setTimeout(longTap, longTapDelay);
	
	        // adds the current touch contact for IE gesture recognition
	        if (e.originalEvent && e.originalEvent.pointerId && gesture && ( e.type == 'MSPointerDown' || e.type == 'pointerdown' || e.type == 'touchstart' ) ) {
	          gesture.addPointer(e.originalEvent.pointerId);
	        }
	
	      })
	      // MSPointerMove: for IE10
	      // pointermove: for IE11
	      .on('touchmove MSPointerMove pointermove', function(e){
	
	        if (e.type == 'MSPointerMove' && !isPrimaryTouch(e.originalEvent)) return;
	
	        firstTouch = (e.type == 'MSPointerMove' || e.type == 'pointermove') ? e : e.originalEvent.touches[0];
	
	        cancelLongTap();
	        touch.x2 = firstTouch.pageX;
	        touch.y2 = firstTouch.pageY;
	
	        deltaX += Math.abs(touch.x1 - touch.x2);
	        deltaY += Math.abs(touch.y1 - touch.y2);
	      })
	      // MSPointerUp: for IE10
	      // pointerup: for IE11
	      .on('touchend MSPointerUp pointerup', function(e){
	
	        if (e.type == 'MSPointerUp' && !isPrimaryTouch(e.originalEvent)) return;
	
	        cancelLongTap();
	
	        // swipe
	        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) || (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)){
	
	          swipeTimeout = setTimeout(function() {
	            if ( touch.el !== undefined ) {
	              touch.el.trigger('swipe');
	              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
	            }
	            touch = {};
	          }, 0);
	
	        // normal tap
	        } else if ('last' in touch) {
	
	          // don't fire tap when delta position changed by more than 30 pixels,
	          // for instance when moving to a point and back to origin
	          if (isNaN(deltaX) || (deltaX < 30 && deltaY < 30)) {
	            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
	            // ('tap' fires before 'scroll')
	            tapTimeout = setTimeout(function() {
	
	              // trigger universal 'tap' with the option to cancelTouch()
	              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
	              var event = $.Event('tap');
	              event.cancelTouch = cancelAll;
	              if ( touch.el !== undefined ) touch.el.trigger(event);
	
	              // trigger double tap immediately
	              if (touch.isDoubleTap) {
	                if ( touch.el !== undefined ) touch.el.trigger('doubleTap');
	                touch = {};
	              }
	
	              // trigger single tap after 250ms of inactivity
	              else {
	                touchTimeout = setTimeout(function(){
	                  touchTimeout = null;
	                  if ( touch.el !== undefined ) touch.el.trigger('singleTap');
	                  touch = {};
	                }, 250);
	              }
	            }, 0);
	          } else {
	            touch = {};
	          }
	          deltaX = deltaY = 0;
	        }
	      })
	      // when the browser window loses focus,
	      // for example when a modal dialog is shown,
	      // cancel all ongoing events
	      .on('touchcancel MSPointerCancel pointercancel', cancelAll);
	
	    // scrolling the window indicates intention of the user
	    // to scroll, not tap or swipe, so cancel all ongoing events
	    $(window).on('scroll', cancelAll);
	  });
	
	  ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
	    $.fn[eventName] = function(callback){ return $(this).on(eventName, callback); };
	  });
	})(jQuery);
	
	(function(UI) {
	
	    "use strict";
	
	    var stacks = [];
	
	    UI.component('stackMargin', {
	
	        defaults: {
	            cls: 'uk-margin-small-top',
	            rowfirst: false,
	            observe: false
	        },
	
	        boot: function() {
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-margin]', context).each(function() {
	
	                    var ele = UI.$(this);
	
	                    if (!ele.data('stackMargin')) {
	                        UI.stackMargin(ele, UI.Utils.options(ele.attr('data-uk-margin')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            UI.$win.on('resize orientationchange', (function() {
	
	                var fn = function() {
	                    $this.process();
	                };
	
	                UI.$(function() {
	                    fn();
	                    UI.$win.on('load', fn);
	                });
	
	                return UI.Utils.debounce(fn, 20);
	            })());
	
	            this.on('display.uk.check', function(e) {
	                if (this.element.is(':visible')) this.process();
	            }.bind(this));
	
	            if (this.options.observe) {
	
	                UI.domObserve(this.element, function(e) {
	                    if ($this.element.is(':visible')) $this.process();
	                });
	            }
	
	            stacks.push(this);
	        },
	
	        process: function() {
	
	            var $this = this, columns = this.element.children();
	
	            UI.Utils.stackMargin(columns, this.options);
	
	            if (!this.options.rowfirst || !columns.length) {
	                return this;
	            }
	
	            // Mark first column elements
	            var group = {}, minleft = false;
	
	            columns.removeClass(this.options.rowfirst).each(function(offset, $ele){
	
	                $ele = UI.$(this);
	
	                if (this.style.display != 'none') {
	                    offset = $ele.offset().left;
	                    ((group[offset] = group[offset] || []) && group[offset]).push(this);
	                    minleft = minleft === false ? offset : Math.min(minleft, offset);
	                }
	            });
	
	            UI.$(group[minleft]).addClass(this.options.rowfirst);
	
	            return this;
	        }
	
	    });
	
	
	    // responsive element e.g. iframes
	
	    (function(){
	
	        var elements = [], check = function(ele) {
	
	            if (!ele.is(':visible')) return;
	
	            var width  = ele.parent().width(),
	                iwidth = ele.data('width'),
	                ratio  = (width / iwidth),
	                height = Math.floor(ratio * ele.data('height'));
	
	            ele.css({height: (width < iwidth) ? height : ele.data('height')});
	        };
	
	        UI.component('responsiveElement', {
	
	            defaults: {},
	
	            boot: function() {
	
	                // init code
	                UI.ready(function(context) {
	
	                    UI.$('iframe.uk-responsive-width, [data-uk-responsive]', context).each(function() {
	
	                        var ele = UI.$(this), obj;
	
	                        if (!ele.data('responsiveElement')) {
	                            obj = UI.responsiveElement(ele, {});
	                        }
	                    });
	                });
	            },
	
	            init: function() {
	
	                var ele = this.element;
	
	                if (ele.attr('width') && ele.attr('height')) {
	
	                    ele.data({
	                        width : ele.attr('width'),
	                        height: ele.attr('height')
	                    }).on('display.uk.check', function(){
	                        check(ele);
	                    });
	
	                    check(ele);
	
	                    elements.push(ele);
	                }
	            }
	        });
	
	        UI.$win.on('resize load', UI.Utils.debounce(function(){
	
	            elements.forEach(function(ele){
	                check(ele);
	            });
	
	        }, 15));
	
	    })();
	
	
	    // helper
	
	    UI.Utils.stackMargin = function(elements, options) {
	
	        options = UI.$.extend({
	            cls: 'uk-margin-small-top'
	        }, options);
	
	        elements = UI.$(elements).removeClass(options.cls);
	
	        var min = false;
	
	        elements.each(function(offset, height, pos, $ele){
	
	            $ele   = UI.$(this);
	
	            if ($ele.css('display') != 'none') {
	
	                offset = $ele.offset();
	                height = $ele.outerHeight();
	                pos    = offset.top + height;
	
	                $ele.data({
	                    ukMarginPos: pos,
	                    ukMarginTop: offset.top
	                });
	
	                if (min === false || (offset.top < min.top) ) {
	
	                    min = {
	                        top  : offset.top,
	                        left : offset.left,
	                        pos  : pos
	                    };
	                }
	            }
	
	        }).each(function($ele) {
	
	            $ele   = UI.$(this);
	
	            if ($ele.css('display') != 'none' && $ele.data('ukMarginTop') > min.top && $ele.data('ukMarginPos') > min.pos) {
	                $ele.addClass(options.cls);
	            }
	        });
	    };
	
	    UI.Utils.matchHeights = function(elements, options) {
	
	        elements = UI.$(elements).css('min-height', '');
	        options  = UI.$.extend({ row : true }, options);
	
	        var matchHeights = function(group){
	
	            if (group.length < 2) return;
	
	            var max = 0;
	
	            group.each(function() {
	                max = Math.max(max, UI.$(this).outerHeight());
	            }).each(function() {
	
	                var element = UI.$(this),
	                    height  = max - (element.css('box-sizing') == 'border-box' ? 0 : (element.outerHeight() - element.height()));
	
	                element.css('min-height', height + 'px');
	            });
	        };
	
	        if (options.row) {
	
	            elements.first().width(); // force redraw
	
	            setTimeout(function(){
	
	                var lastoffset = false, group = [];
	
	                elements.each(function() {
	
	                    var ele = UI.$(this), offset = ele.offset().top;
	
	                    if (offset != lastoffset && group.length) {
	
	                        matchHeights(UI.$(group));
	                        group  = [];
	                        offset = ele.offset().top;
	                    }
	
	                    group.push(ele);
	                    lastoffset = offset;
	                });
	
	                if (group.length) {
	                    matchHeights(UI.$(group));
	                }
	
	            }, 0);
	
	        } else {
	            matchHeights(elements);
	        }
	    };
	
	    (function(cacheSvgs){
	
	        UI.Utils.inlineSvg = function(selector, root) {
	
	            var images = UI.$(selector || 'img[src$=".svg"]', root || document).each(function(){
	
	                var img = UI.$(this),
	                    src = img.attr('src');
	
	                if (!cacheSvgs[src]) {
	
	                    var d = UI.$.Deferred();
	
	                    UI.$.get(src, {nc: Math.random()}, function(data){
	                        d.resolve(UI.$(data).find('svg'));
	                    });
	
	                    cacheSvgs[src] = d.promise();
	                }
	
	                cacheSvgs[src].then(function(svg) {
	
	                    var $svg = UI.$(svg).clone();
	
	                    if (img.attr('id')) $svg.attr('id', img.attr('id'));
	                    if (img.attr('class')) $svg.attr('class', img.attr('class'));
	                    if (img.attr('style')) $svg.attr('style', img.attr('style'));
	
	                    if (img.attr('width')) {
	                        $svg.attr('width', img.attr('width'));
	                        if (!img.attr('height'))  $svg.removeAttr('height');
	                    }
	
	                    if (img.attr('height')){
	                        $svg.attr('height', img.attr('height'));
	                        if (!img.attr('width')) $svg.removeAttr('width');
	                    }
	
	                    img.replaceWith($svg);
	                });
	            });
	        };
	
	        // init code
	        UI.ready(function(context) {
	            UI.Utils.inlineSvg('[data-uk-svg]', context);
	        });
	
	    })({});
	
	    UI.Utils.getCssVar = function(name) {
	
	        /* usage in css:  .var-name:before { content:"xyz" } */
	
	        var val, doc = document.documentElement, element = doc.appendChild(document.createElement('div'));
	
	        element.classList.add('var-'+name);
	
	        try {
	            val = JSON.parse(val = getComputedStyle(element, ':before').content.replace(/^["'](.*)["']$/, '$1'));
	        } catch (e) {
	            val = undefined;
	        }
	
	        doc.removeChild(element);
	
	        return val;
	    }
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    UI.component('smoothScroll', {
	
	        boot: function() {
	
	            // init code
	            UI.$html.on('click.smooth-scroll.uikit', '[data-uk-smooth-scroll]', function(e) {
	                var ele = UI.$(this);
	
	                if (!ele.data('smoothScroll')) {
	                    var obj = UI.smoothScroll(ele, UI.Utils.options(ele.attr('data-uk-smooth-scroll')));
	                    ele.trigger('click');
	                }
	
	                return false;
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.on('click', function(e) {
	                e.preventDefault();
	                scrollToElement(UI.$(this.hash).length ? UI.$(this.hash) : UI.$('body'), $this.options);
	            });
	        }
	    });
	
	    function scrollToElement(ele, options) {
	
	        options = UI.$.extend({
	            duration: 1000,
	            transition: 'easeOutExpo',
	            offset: 0,
	            complete: function(){}
	        }, options);
	
	        // get / set parameters
	        var target    = ele.offset().top - options.offset,
	            docheight = UI.$doc.height(),
	            winheight = window.innerHeight;
	
	        if ((target + winheight) > docheight) {
	            target = docheight - winheight;
	        }
	
	        // animate to target, fire callback when done
	        UI.$('html,body').stop().animate({scrollTop: target}, options.duration, options.transition).promise().done(options.complete);
	    }
	
	    UI.Utils.scrollToElement = scrollToElement;
	
	    if (!UI.$.easing.easeOutExpo) {
	        UI.$.easing.easeOutExpo = function(x, t, b, c, d) { return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b; };
	    }
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    var $win           = UI.$win,
	        $doc           = UI.$doc,
	        scrollspies    = [],
	        checkScrollSpy = function() {
	            for(var i=0; i < scrollspies.length; i++) {
	                window.requestAnimationFrame.apply(window, [scrollspies[i].check]);
	            }
	        };
	
	    UI.component('scrollspy', {
	
	        defaults: {
	            target     : false,
	            cls        : 'uk-scrollspy-inview',
	            initcls    : 'uk-scrollspy-init-inview',
	            topoffset  : 0,
	            leftoffset : 0,
	            repeat     : false,
	            delay      : 0
	        },
	
	        boot: function() {
	
	            // listen to scroll and resize
	            $doc.on('scrolling.uk.document', checkScrollSpy);
	            $win.on('load resize orientationchange', UI.Utils.debounce(checkScrollSpy, 50));
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-scrollspy]', context).each(function() {
	
	                    var element = UI.$(this);
	
	                    if (!element.data('scrollspy')) {
	                        var obj = UI.scrollspy(element, UI.Utils.options(element.attr('data-uk-scrollspy')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var $this = this, inviewstate, initinview, togglecls = this.options.cls.split(/,/), fn = function(){
	
	                var elements     = $this.options.target ? $this.element.find($this.options.target) : $this.element,
	                    delayIdx     = elements.length === 1 ? 1 : 0,
	                    toggleclsIdx = 0;
	
	                elements.each(function(idx){
	
	                    var element     = UI.$(this),
	                        inviewstate = element.data('inviewstate'),
	                        inview      = UI.Utils.isInView(element, $this.options),
	                        toggle      = element.data('ukScrollspyCls') || togglecls[toggleclsIdx].trim();
	
	                    if (inview && !inviewstate && !element.data('scrollspy-idle')) {
	
	                        if (!initinview) {
	                            element.addClass($this.options.initcls);
	                            $this.offset = element.offset();
	                            initinview = true;
	
	                            element.trigger('init.uk.scrollspy');
	                        }
	
	                        element.data('scrollspy-idle', setTimeout(function(){
	
	                            element.addClass('uk-scrollspy-inview').toggleClass(toggle).width();
	                            element.trigger('inview.uk.scrollspy');
	
	                            element.data('scrollspy-idle', false);
	                            element.data('inviewstate', true);
	
	                        }, $this.options.delay * delayIdx));
	
	                        delayIdx++;
	                    }
	
	                    if (!inview && inviewstate && $this.options.repeat) {
	
	                        if (element.data('scrollspy-idle')) {
	                            clearTimeout(element.data('scrollspy-idle'));
	                            element.data('scrollspy-idle', false);
	                        }
	
	                        element.removeClass('uk-scrollspy-inview').toggleClass(toggle);
	                        element.data('inviewstate', false);
	
	                        element.trigger('outview.uk.scrollspy');
	                    }
	
	                    toggleclsIdx = togglecls[toggleclsIdx + 1] ? (toggleclsIdx + 1) : 0;
	
	                });
	            };
	
	            fn();
	
	            this.check = fn;
	
	            scrollspies.push(this);
	        }
	    });
	
	
	    var scrollspynavs = [],
	        checkScrollSpyNavs = function() {
	            for(var i=0; i < scrollspynavs.length; i++) {
	                window.requestAnimationFrame.apply(window, [scrollspynavs[i].check]);
	            }
	        };
	
	    UI.component('scrollspynav', {
	
	        defaults: {
	            cls          : 'uk-active',
	            closest      : false,
	            topoffset    : 0,
	            leftoffset   : 0,
	            smoothscroll : false
	        },
	
	        boot: function() {
	
	            // listen to scroll and resize
	            $doc.on('scrolling.uk.document', checkScrollSpyNavs);
	            $win.on('resize orientationchange', UI.Utils.debounce(checkScrollSpyNavs, 50));
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-scrollspy-nav]', context).each(function() {
	
	                    var element = UI.$(this);
	
	                    if (!element.data('scrollspynav')) {
	                        var obj = UI.scrollspynav(element, UI.Utils.options(element.attr('data-uk-scrollspy-nav')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var ids     = [],
	                links   = this.find("a[href^='#']").each(function(){ if(this.getAttribute('href').trim()!=='#') ids.push(this.getAttribute('href')); }),
	                targets = UI.$(ids.join(",")),
	
	                clsActive  = this.options.cls,
	                clsClosest = this.options.closest || this.options.closest;
	
	            var $this = this, inviews, fn = function(){
	
	                inviews = [];
	
	                for (var i=0 ; i < targets.length ; i++) {
	                    if (UI.Utils.isInView(targets.eq(i), $this.options)) {
	                        inviews.push(targets.eq(i));
	                    }
	                }
	
	                if (inviews.length) {
	
	                    var navitems,
	                        scrollTop = $win.scrollTop(),
	                        target = (function(){
	                            for(var i=0; i< inviews.length;i++){
	                                if (inviews[i].offset().top - $this.options.topoffset >= scrollTop){
	                                    return inviews[i];
	                                }
	                            }
	                        })();
	
	                    if (!target) return;
	
	                    if ($this.options.closest) {
	                        links.blur().closest(clsClosest).removeClass(clsActive);
	                        navitems = links.filter("a[href='#"+target.attr('id')+"']").closest(clsClosest).addClass(clsActive);
	                    } else {
	                        navitems = links.removeClass(clsActive).filter("a[href='#"+target.attr("id")+"']").addClass(clsActive);
	                    }
	
	                    $this.element.trigger('inview.uk.scrollspynav', [target, navitems]);
	                }
	            };
	
	            if (this.options.smoothscroll && UI.smoothScroll) {
	                links.each(function(){
	                    UI.smoothScroll(this, $this.options.smoothscroll);
	                });
	            }
	
	            fn();
	
	            this.element.data('scrollspynav', this);
	
	            this.check = fn;
	            scrollspynavs.push(this);
	
	        }
	    });
	
	})(UIkit);
	
	(function(UI){
	
	    "use strict";
	
	    var toggles = [];
	
	    UI.component('toggle', {
	
	        defaults: {
	            target    : false,
	            cls       : 'uk-hidden',
	            animation : false,
	            duration  : 200
	        },
	
	        boot: function(){
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-toggle]', context).each(function() {
	                    var ele = UI.$(this);
	
	                    if (!ele.data('toggle')) {
	                        var obj = UI.toggle(ele, UI.Utils.options(ele.attr('data-uk-toggle')));
	                    }
	                });
	
	                setTimeout(function(){
	
	                    toggles.forEach(function(toggle){
	                        toggle.getToggles();
	                    });
	
	                }, 0);
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.aria = (this.options.cls.indexOf('uk-hidden') !== -1);
	
	            this.on('click', function(e) {
	
	                if ($this.element.is('a[href="#"]')) {
	                    e.preventDefault();
	                }
	
	                $this.toggle();
	            });
	
	            toggles.push(this);
	        },
	
	        toggle: function() {
	
	            this.getToggles();
	
	            if(!this.totoggle.length) return;
	
	            if (this.options.animation && UI.support.animation) {
	
	                var $this = this, animations = this.options.animation.split(',');
	
	                if (animations.length == 1) {
	                    animations[1] = animations[0];
	                }
	
	                animations[0] = animations[0].trim();
	                animations[1] = animations[1].trim();
	
	                this.totoggle.css('animation-duration', this.options.duration+'ms');
	
	                this.totoggle.each(function(){
	
	                    var ele = UI.$(this);
	
	                    if (ele.hasClass($this.options.cls)) {
	
	                        ele.toggleClass($this.options.cls);
	
	                        UI.Utils.animate(ele, animations[0]).then(function(){
	                            ele.css('animation-duration', '');
	                            UI.Utils.checkDisplay(ele);
	                        });
	
	                    } else {
	
	                        UI.Utils.animate(this, animations[1]+' uk-animation-reverse').then(function(){
	                            ele.toggleClass($this.options.cls).css('animation-duration', '');
	                            UI.Utils.checkDisplay(ele);
	                        });
	
	                    }
	
	                });
	
	            } else {
	                this.totoggle.toggleClass(this.options.cls);
	                UI.Utils.checkDisplay(this.totoggle);
	            }
	
	            this.updateAria();
	
	        },
	
	        getToggles: function() {
	            this.totoggle = this.options.target ? UI.$(this.options.target):[];
	            this.updateAria();
	        },
	
	        updateAria: function() {
	            if (this.aria && this.totoggle.length) {
	                this.totoggle.not('[aria-hidden]').each(function(){
	                    UI.$(this).attr('aria-hidden', UI.$(this).hasClass('uk-hidden'));
	                });
	            }
	        }
	    });
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    UI.component('alert', {
	
	        defaults: {
	            fade: true,
	            duration: 200,
	            trigger: '.uk-alert-close'
	        },
	
	        boot: function() {
	
	            // init code
	            UI.$html.on('click.alert.uikit', '[data-uk-alert]', function(e) {
	
	                var ele = UI.$(this);
	
	                if (!ele.data('alert')) {
	
	                    var alert = UI.alert(ele, UI.Utils.options(ele.attr('data-uk-alert')));
	
	                    if (UI.$(e.target).is(alert.options.trigger)) {
	                        e.preventDefault();
	                        alert.close();
	                    }
	                }
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.on('click', this.options.trigger, function(e) {
	                e.preventDefault();
	                $this.close();
	            });
	        },
	
	        close: function() {
	
	            var element       = this.trigger('close.uk.alert'),
	                removeElement = function () {
	                    this.trigger('closed.uk.alert').remove();
	                }.bind(this);
	
	            if (this.options.fade) {
	                element.css('overflow', 'hidden').css("max-height", element.height()).animate({
	                    height         : 0,
	                    opacity        : 0,
	                    paddingTop    : 0,
	                    paddingBottom : 0,
	                    marginTop     : 0,
	                    marginBottom  : 0
	                }, this.options.duration, removeElement);
	            } else {
	                removeElement();
	            }
	        }
	
	    });
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    UI.component('buttonRadio', {
	
	        defaults: {
	            activeClass: 'uk-active',
	            target: '.uk-button'
	        },
	
	        boot: function() {
	
	            // init code
	            UI.$html.on('click.buttonradio.uikit', '[data-uk-button-radio]', function(e) {
	
	                var ele = UI.$(this);
	
	                if (!ele.data('buttonRadio')) {
	
	                    var obj    = UI.buttonRadio(ele, UI.Utils.options(ele.attr('data-uk-button-radio'))),
	                        target = UI.$(e.target);
	
	                    if (target.is(obj.options.target)) {
	                        target.trigger('click');
	                    }
	                }
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            // Init ARIA
	            this.find($this.options.target).attr('aria-checked', 'false').filter('.' + $this.options.activeClass).attr('aria-checked', 'true');
	
	            this.on('click', this.options.target, function(e) {
	
	                var ele = UI.$(this);
	
	                if (ele.is('a[href="#"]')) e.preventDefault();
	
	                $this.find($this.options.target).not(ele).removeClass($this.options.activeClass).blur();
	                ele.addClass($this.options.activeClass);
	
	                // Update ARIA
	                $this.find($this.options.target).not(ele).attr('aria-checked', 'false');
	                ele.attr('aria-checked', 'true');
	
	                $this.trigger('change.uk.button', [ele]);
	            });
	
	        },
	
	        getSelected: function() {
	            return this.find('.' + this.options.activeClass);
	        }
	    });
	
	    UI.component('buttonCheckbox', {
	
	        defaults: {
	            activeClass: 'uk-active',
	            target: '.uk-button'
	        },
	
	        boot: function() {
	
	            UI.$html.on('click.buttoncheckbox.uikit', '[data-uk-button-checkbox]', function(e) {
	                var ele = UI.$(this);
	
	                if (!ele.data('buttonCheckbox')) {
	
	                    var obj    = UI.buttonCheckbox(ele, UI.Utils.options(ele.attr('data-uk-button-checkbox'))),
	                        target = UI.$(e.target);
	
	                    if (target.is(obj.options.target)) {
	                        target.trigger('click');
	                    }
	                }
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            // Init ARIA
	            this.find($this.options.target).attr('aria-checked', 'false').filter('.' + $this.options.activeClass).attr('aria-checked', 'true');
	
	            this.on('click', this.options.target, function(e) {
	                var ele = UI.$(this);
	
	                if (ele.is('a[href="#"]')) e.preventDefault();
	
	                ele.toggleClass($this.options.activeClass).blur();
	
	                // Update ARIA
	                ele.attr('aria-checked', ele.hasClass($this.options.activeClass));
	
	                $this.trigger('change.uk.button', [ele]);
	            });
	
	        },
	
	        getSelected: function() {
	            return this.find('.' + this.options.activeClass);
	        }
	    });
	
	
	    UI.component('button', {
	
	        defaults: {},
	
	        boot: function() {
	
	            UI.$html.on('click.button.uikit', '[data-uk-button]', function(e) {
	                var ele = UI.$(this);
	
	                if (!ele.data('button')) {
	
	                    var obj = UI.button(ele, UI.Utils.options(ele.attr('data-uk-button')));
	                    ele.trigger('click');
	                }
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            // Init ARIA
	            this.element.attr('aria-pressed', this.element.hasClass("uk-active"));
	
	            this.on('click', function(e) {
	
	                if ($this.element.is('a[href="#"]')) e.preventDefault();
	
	                $this.toggle();
	                $this.trigger('change.uk.button', [$this.element.blur().hasClass('uk-active')]);
	            });
	
	        },
	
	        toggle: function() {
	            this.element.toggleClass('uk-active');
	
	            // Update ARIA
	            this.element.attr('aria-pressed', this.element.hasClass('uk-active'));
	        }
	    });
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    var active = false, hoverIdle, flips = {
	        x: {
	            'bottom-left'   : 'bottom-right',
	            'bottom-right'  : 'bottom-left',
	            'bottom-center' : 'bottom-center',
	            'top-left'      : 'top-right',
	            'top-right'     : 'top-left',
	            'top-center'    : 'top-center',
	            'left-top'      : 'right-top',
	            'left-bottom'   : 'right-bottom',
	            'left-center'   : 'right-center',
	            'right-top'     : 'left-top',
	            'right-bottom'  : 'left-bottom',
	            'right-center'  : 'left-center'
	        },
	        y: {
	            'bottom-left'   : 'top-left',
	            'bottom-right'  : 'top-right',
	            'bottom-center' : 'top-center',
	            'top-left'      : 'bottom-left',
	            'top-right'     : 'bottom-right',
	            'top-center'    : 'bottom-center',
	            'left-top'      : 'left-bottom',
	            'left-bottom'   : 'left-top',
	            'left-center'   : 'left-center',
	            'right-top'     : 'right-bottom',
	            'right-bottom'  : 'right-top',
	            'right-center'  : 'right-center'
	        },
	        xy: {
	            'bottom-left'   : 'top-right',
	            'bottom-right'  : 'top-left',
	            'bottom-center' : 'top-center',
	            'top-left'      : 'bottom-right',
	            'top-right'     : 'bottom-left',
	            'top-center'    : 'bottom-center',
	            'left-top'      : 'right-bottom',
	            'left-bottom'   : 'right-top',
	            'left-center'   : 'right-center',
	            'right-top'     : 'left-bottom',
	            'right-bottom'  : 'left-top',
	            'right-center'  : 'left-center'
	        }
	    };
	
	    UI.component('dropdown', {
	
	        defaults: {
	           mode            : 'hover',
	           pos             : 'bottom-left',
	           offset          : 0,
	           remaintime      : 800,
	           justify         : false,
	           boundary        : UI.$win,
	           delay           : 0,
	           dropdownSelector: '.uk-dropdown,.uk-dropdown-blank',
	           hoverDelayIdle  : 250,
	           preventflip     : false
	        },
	
	        remainIdle: false,
	
	        boot: function() {
	
	            var triggerevent = UI.support.touch ? 'click' : 'mouseenter';
	
	            // init code
	            UI.$html.on(triggerevent+'.dropdown.uikit focus pointerdown', '[data-uk-dropdown]', function(e) {
	
	                var ele = UI.$(this);
	
	                if (!ele.data('dropdown')) {
	
	                    var dropdown = UI.dropdown(ele, UI.Utils.options(ele.attr('data-uk-dropdown')));
	
	                    if (e.type=='click' || (e.type=='mouseenter' && dropdown.options.mode=='hover')) {
	                        dropdown.element.trigger(triggerevent);
	                    }
	
	                    if (dropdown.dropdown.length) {
	                        e.preventDefault();
	                    }
	                }
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.dropdown     = this.find(this.options.dropdownSelector);
	            this.offsetParent = this.dropdown.parents().filter(function() {
	                return UI.$.inArray(UI.$(this).css('position'), ['relative', 'fixed', 'absolute']) !== -1;
	            }).slice(0,1);
	
	            if (!this.offsetParent.length) {
	                this.offsetParent = this.element;
	            }
	
	            this.centered  = this.dropdown.hasClass('uk-dropdown-center');
	            this.justified = this.options.justify ? UI.$(this.options.justify) : false;
	
	            this.boundary  = UI.$(this.options.boundary);
	
	            if (!this.boundary.length) {
	                this.boundary = UI.$win;
	            }
	
	            // legacy DEPRECATED!
	            if (this.dropdown.hasClass('uk-dropdown-up')) {
	                this.options.pos = 'top-left';
	            }
	            if (this.dropdown.hasClass('uk-dropdown-flip')) {
	                this.options.pos = this.options.pos.replace('left','right');
	            }
	            if (this.dropdown.hasClass('uk-dropdown-center')) {
	                this.options.pos = this.options.pos.replace(/(left|right)/,'center');
	            }
	            //-- end legacy
	
	            // Init ARIA
	            this.element.attr('aria-haspopup', 'true');
	            this.element.attr('aria-expanded', this.element.hasClass('uk-open'));
	            this.dropdown.attr('aria-hidden', 'true');
	
	            if (this.options.mode == 'click' || UI.support.touch) {
	
	                this.on('click.uk.dropdown', function(e) {
	
	                    var $target = UI.$(e.target);
	
	                    if (!$target.parents($this.options.dropdownSelector).length) {
	
	                        if ($target.is("a[href='#']") || $target.parent().is("a[href='#']") || ($this.dropdown.length && !$this.dropdown.is(':visible')) ){
	                            e.preventDefault();
	                        }
	
	                        $target.blur();
	                    }
	
	                    if (!$this.element.hasClass('uk-open')) {
	
	                        $this.show();
	
	                    } else {
	
	                        if (!$this.dropdown.find(e.target).length || $target.is('.uk-dropdown-close') || $target.parents('.uk-dropdown-close').length) {
	                            $this.hide();
	                        }
	                    }
	                });
	
	            } else {
	
	                this.on('mouseenter', function(e) {
	
	                    $this.trigger('pointerenter.uk.dropdown', [$this]);
	
	                    if ($this.remainIdle) {
	                        clearTimeout($this.remainIdle);
	                    }
	
	                    if (hoverIdle) {
	                        clearTimeout(hoverIdle);
	                    }
	
	                    if (active && active == $this) {
	                        return;
	                    }
	
	                    // pseudo manuAim
	                    if (active && active != $this) {
	
	                        hoverIdle = setTimeout(function() {
	                            hoverIdle = setTimeout($this.show.bind($this), $this.options.delay);
	                        }, $this.options.hoverDelayIdle);
	
	                    } else {
	
	                        hoverIdle = setTimeout($this.show.bind($this), $this.options.delay);
	                    }
	
	                }).on('mouseleave', function() {
	
	                    if (hoverIdle) {
	                        clearTimeout(hoverIdle);
	                    }
	
	                    $this.remainIdle = setTimeout(function() {
	                        if (active && active == $this) $this.hide();
	                    }, $this.options.remaintime);
	
	                    $this.trigger('pointerleave.uk.dropdown', [$this]);
	
	                }).on('click', function(e){
	
	                    var $target = UI.$(e.target);
	
	                    if ($this.remainIdle) {
	                        clearTimeout($this.remainIdle);
	                    }
	
	                    if (active && active == $this) {
	                        if (!$this.dropdown.find(e.target).length || $target.is('.uk-dropdown-close') || $target.parents('.uk-dropdown-close').length) {
	                            $this.hide();
	                        }
	                        return;
	                    }
	
	                    if ($target.is("a[href='#']") || $target.parent().is("a[href='#']")){
	                        e.preventDefault();
	                    }
	
	                    $this.show();
	                });
	            }
	        },
	
	        show: function(){
	
	            UI.$html.off('click.outer.dropdown');
	
	            if (active && active != this) {
	                active.hide(true);
	            }
	
	            if (hoverIdle) {
	                clearTimeout(hoverIdle);
	            }
	
	            this.trigger('beforeshow.uk.dropdown', [this]);
	
	            this.checkDimensions();
	            this.element.addClass('uk-open');
	
	            // Update ARIA
	            this.element.attr('aria-expanded', 'true');
	            this.dropdown.attr('aria-hidden', 'false');
	
	            this.trigger('show.uk.dropdown', [this]);
	
	            UI.Utils.checkDisplay(this.dropdown, true);
	            UI.Utils.focus(this.dropdown);
	            active = this;
	
	            this.registerOuterClick();
	        },
	
	        hide: function(force) {
	
	            this.trigger('beforehide.uk.dropdown', [this, force]);
	
	            this.element.removeClass('uk-open');
	
	            if (this.remainIdle) {
	                clearTimeout(this.remainIdle);
	            }
	
	            this.remainIdle = false;
	
	            // Update ARIA
	            this.element.attr('aria-expanded', 'false');
	            this.dropdown.attr('aria-hidden', 'true');
	
	            this.trigger('hide.uk.dropdown', [this, force]);
	
	            if (active == this) active = false;
	        },
	
	        registerOuterClick: function(){
	
	            var $this = this;
	
	            UI.$html.off('click.outer.dropdown');
	
	            setTimeout(function() {
	
	                UI.$html.on('click.outer.dropdown', function(e) {
	
	                    if (hoverIdle) {
	                        clearTimeout(hoverIdle);
	                    }
	
	                    var $target = UI.$(e.target);
	
	                    if (active == $this && !$this.element.find(e.target).length) {
	                        $this.hide(true);
	                        UI.$html.off('click.outer.dropdown');
	                    }
	                });
	            }, 10);
	        },
	
	        checkDimensions: function() {
	
	            if (!this.dropdown.length) return;
	
	            // reset
	            this.dropdown.removeClass('uk-dropdown-top uk-dropdown-bottom uk-dropdown-left uk-dropdown-right uk-dropdown-stack uk-dropdown-autoflip').css({
	                topLeft :'',
	                left :'',
	                marginLeft :'',
	                marginRight :''
	            });
	
	            if (this.justified && this.justified.length) {
	                this.dropdown.css('min-width', '');
	            }
	
	            var $this          = this,
	                pos            = UI.$.extend({}, this.offsetParent.offset(), {width: this.offsetParent[0].offsetWidth, height: this.offsetParent[0].offsetHeight}),
	                posoffset      = this.options.offset,
	                dropdown       = this.dropdown,
	                offset         = dropdown.show().offset() || {left: 0, top: 0},
	                width          = dropdown.outerWidth(),
	                height         = dropdown.outerHeight(),
	                boundarywidth  = this.boundary.width(),
	                boundaryoffset = this.boundary[0] !== window && this.boundary.offset() ? this.boundary.offset(): {top:0, left:0},
	                dpos           = this.options.pos;
	
	            var variants =  {
	                    'bottom-left'   : {top: 0 + pos.height + posoffset, left: 0},
	                    'bottom-right'  : {top: 0 + pos.height + posoffset, left: 0 + pos.width - width},
	                    'bottom-center' : {top: 0 + pos.height + posoffset, left: 0 + pos.width / 2 - width / 2},
	                    'top-left'      : {top: 0 - height - posoffset, left: 0},
	                    'top-right'     : {top: 0 - height - posoffset, left: 0 + pos.width - width},
	                    'top-center'    : {top: 0 - height - posoffset, left: 0 + pos.width / 2 - width / 2},
	                    'left-top'      : {top: 0, left: 0 - width - posoffset},
	                    'left-bottom'   : {top: 0 + pos.height - height, left: 0 - width - posoffset},
	                    'left-center'   : {top: 0 + pos.height / 2 - height / 2, left: 0 - width - posoffset},
	                    'right-top'     : {top: 0, left: 0 + pos.width + posoffset},
	                    'right-bottom'  : {top: 0 + pos.height - height, left: 0 + pos.width + posoffset},
	                    'right-center'  : {top: 0 + pos.height / 2 - height / 2, left: 0 + pos.width + posoffset}
	                },
	                css = {},
	                pp;
	
	            pp = dpos.split('-');
	            css = variants[dpos] ? variants[dpos] : variants['bottom-left'];
	
	            // justify dropdown
	            if (this.justified && this.justified.length) {
	                justify(dropdown.css({left:0}), this.justified, boundarywidth);
	            } else {
	
	                if (this.options.preventflip !== true) {
	
	                    var fdpos;
	
	                    switch(this.checkBoundary(pos.left + css.left, pos.top + css.top, width, height, boundarywidth)) {
	                        case "x":
	                            if(this.options.preventflip !=='x') fdpos = flips['x'][dpos] || 'right-top';
	                            break;
	                        case "y":
	                            if(this.options.preventflip !=='y') fdpos = flips['y'][dpos] || 'top-left';
	                            break;
	                        case "xy":
	                            if(!this.options.preventflip) fdpos = flips['xy'][dpos] || 'right-bottom';
	                            break;
	                    }
	
	                    if (fdpos) {
	
	                        pp  = fdpos.split('-');
	                        css = variants[fdpos] ? variants[fdpos] : variants['bottom-left'];
	                        dropdown.addClass('uk-dropdown-autoflip');
	
	                        // check flipped
	                        if (this.checkBoundary(pos.left + css.left, pos.top + css.top, width, height, boundarywidth)) {
	                            pp  = dpos.split('-');
	                            css = variants[dpos] ? variants[dpos] : variants['bottom-left'];
	                        }
	                    }
	                }
	            }
	
	            if (width > boundarywidth) {
	                dropdown.addClass('uk-dropdown-stack');
	                this.trigger('stack.uk.dropdown', [this]);
	            }
	
	            dropdown.css(css).css('display', '').addClass('uk-dropdown-'+pp[0]);
	        },
	
	        checkBoundary: function(left, top, width, height, boundarywidth) {
	
	            var axis = "";
	
	            if (left < 0 || ((left - UI.$win.scrollLeft())+width) > boundarywidth) {
	               axis += "x";
	            }
	
	            if ((top - UI.$win.scrollTop()) < 0 || ((top - UI.$win.scrollTop())+height) > window.innerHeight) {
	               axis += "y";
	            }
	
	            return axis;
	        }
	    });
	
	
	    UI.component('dropdownOverlay', {
	
	        defaults: {
	           justify : false,
	           cls     : '',
	           duration: 200
	        },
	
	        boot: function() {
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-dropdown-overlay]', context).each(function() {
	                    var ele = UI.$(this);
	
	                    if (!ele.data('dropdownOverlay')) {
	                        UI.dropdownOverlay(ele, UI.Utils.options(ele.attr('data-uk-dropdown-overlay')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.justified = this.options.justify ? UI.$(this.options.justify) : false;
	            this.overlay   = this.element.find('uk-dropdown-overlay');
	
	            if (!this.overlay.length) {
	                this.overlay = UI.$('<div class="uk-dropdown-overlay"></div>').appendTo(this.element);
	            }
	
	            this.overlay.addClass(this.options.cls);
	
	            this.on({
	
	                'beforeshow.uk.dropdown': function(e, dropdown) {
	                    $this.dropdown = dropdown;
	
	                    if ($this.justified && $this.justified.length) {
	                        justify($this.overlay.css({display:'block', marginLeft:'', marginRight:''}), $this.justified, $this.justified.outerWidth());
	                    }
	                },
	
	                'show.uk.dropdown': function(e, dropdown) {
	
	                    var h = $this.dropdown.dropdown.outerHeight(true);
	
	                    $this.dropdown.element.removeClass('uk-open');
	
	                    $this.overlay.stop().css('display', 'block').animate({height: h}, $this.options.duration, function() {
	
	                       $this.dropdown.dropdown.css('visibility', '');
	                       $this.dropdown.element.addClass('uk-open');
	
	                       UI.Utils.checkDisplay($this.dropdown.dropdown, true);
	                    });
	
	                    $this.pointerleave = false;
	                },
	
	                'hide.uk.dropdown': function() {
	                    $this.overlay.stop().animate({height: 0}, $this.options.duration);
	                },
	
	                'pointerenter.uk.dropdown': function(e, dropdown) {
	                    clearTimeout($this.remainIdle);
	                },
	
	                'pointerleave.uk.dropdown': function(e, dropdown) {
	                    $this.pointerleave = true;
	                }
	            });
	
	
	            this.overlay.on({
	
	                'mouseenter': function() {
	                    if ($this.remainIdle) {
	                        clearTimeout($this.dropdown.remainIdle);
	                        clearTimeout($this.remainIdle);
	                    }
	                },
	
	                'mouseleave': function(){
	
	                    if ($this.pointerleave && active) {
	
	                        $this.remainIdle = setTimeout(function() {
	                           if(active) active.hide();
	                        }, active.options.remaintime);
	                    }
	                }
	            })
	        }
	
	    });
	
	
	    function justify(ele, justifyTo, boundarywidth, offset) {
	
	        ele           = UI.$(ele);
	        justifyTo     = UI.$(justifyTo);
	        boundarywidth = boundarywidth || window.innerWidth;
	        offset        = offset || ele.offset();
	
	        if (justifyTo.length) {
	
	            var jwidth = justifyTo.outerWidth();
	
	            ele.css('min-width', jwidth);
	
	            if (UI.langdirection == 'right') {
	
	                var right1   = boundarywidth - (justifyTo.offset().left + jwidth),
	                    right2   = boundarywidth - (ele.offset().left + ele.outerWidth());
	
	                ele.css('margin-right', right1 - right2);
	
	            } else {
	                ele.css('margin-left', justifyTo.offset().left - offset.left);
	            }
	        }
	    }
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    var grids = [];
	
	    UI.component('gridMatchHeight', {
	
	        defaults: {
	            target        : false,
	            row           : true,
	            ignorestacked : false,
	            observe       : false
	        },
	
	        boot: function() {
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-grid-match]', context).each(function() {
	                    var grid = UI.$(this), obj;
	
	                    if (!grid.data('gridMatchHeight')) {
	                        obj = UI.gridMatchHeight(grid, UI.Utils.options(grid.attr('data-uk-grid-match')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.columns  = this.element.children();
	            this.elements = this.options.target ? this.find(this.options.target) : this.columns;
	
	            if (!this.columns.length) return;
	
	            UI.$win.on('load resize orientationchange', (function() {
	
	                var fn = function() {
	                    if ($this.element.is(':visible')) $this.match();
	                };
	
	                UI.$(function() { fn(); });
	
	                return UI.Utils.debounce(fn, 50);
	            })());
	
	            if (this.options.observe) {
	
	                UI.domObserve(this.element, function(e) {
	                    if ($this.element.is(':visible')) $this.match();
	                });
	            }
	
	            this.on('display.uk.check', function(e) {
	                if(this.element.is(':visible')) this.match();
	            }.bind(this));
	
	            grids.push(this);
	        },
	
	        match: function() {
	
	            var firstvisible = this.columns.filter(':visible:first');
	
	            if (!firstvisible.length) return;
	
	            var stacked = Math.ceil(100 * parseFloat(firstvisible.css('width')) / parseFloat(firstvisible.parent().css('width'))) >= 100;
	
	            if (stacked && !this.options.ignorestacked) {
	                this.revert();
	            } else {
	                UI.Utils.matchHeights(this.elements, this.options);
	            }
	
	            return this;
	        },
	
	        revert: function() {
	            this.elements.css('min-height', '');
	            return this;
	        }
	    });
	
	    UI.component('gridMargin', {
	
	        defaults: {
	            cls      : 'uk-grid-margin',
	            rowfirst : 'uk-row-first'
	        },
	
	        boot: function() {
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-grid-margin]', context).each(function() {
	                    var grid = UI.$(this), obj;
	
	                    if (!grid.data('gridMargin')) {
	                        obj = UI.gridMargin(grid, UI.Utils.options(grid.attr('data-uk-grid-margin')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var stackMargin = UI.stackMargin(this.element, this.options);
	        }
	    });
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    var active = false, activeCount = 0, $html = UI.$html, body;
	
	    UI.$win.on('resize orientationchange', UI.Utils.debounce(function(){
	        UI.$('.uk-modal.uk-open').each(function(){
	            return UI.$(this).data('modal') && UI.$(this).data('modal').resize();
	        });
	    }, 150));
	
	    UI.component('modal', {
	
	        defaults: {
	            keyboard: true,
	            bgclose: true,
	            minScrollHeight: 150,
	            center: false,
	            modal: true
	        },
	
	        scrollable: false,
	        transition: false,
	        hasTransitioned: true,
	
	        init: function() {
	
	            if (!body) body = UI.$('body');
	
	            if (!this.element.length) return;
	
	            var $this = this;
	
	            this.paddingdir = 'padding-' + (UI.langdirection == 'left' ? 'right':'left');
	            this.dialog     = this.find('.uk-modal-dialog');
	
	            this.active     = false;
	
	            // Update ARIA
	            this.element.attr('aria-hidden', this.element.hasClass('uk-open'));
	
	            this.on('click', '.uk-modal-close', function(e) {
	                e.preventDefault();
	                $this.hide();
	            }).on('click', function(e) {
	
	                var target = UI.$(e.target);
	
	                if (target[0] == $this.element[0] && $this.options.bgclose) {
	                    $this.hide();
	                }
	            });
	
	            UI.domObserve(this.element, function(e) { $this.resize(); });
	        },
	
	        toggle: function() {
	            return this[this.isActive() ? 'hide' : 'show']();
	        },
	
	        show: function() {
	
	            if (!this.element.length) return;
	
	            var $this = this;
	
	            if (this.isActive()) return;
	
	            if (this.options.modal && active) {
	                active.hide(true);
	            }
	
	            this.element.removeClass('uk-open').show();
	            this.resize(true);
	
	            if (this.options.modal) {
	                active = this;
	            }
	
	            this.active = true;
	
	            activeCount++;
	
	            if (UI.support.transition) {
	                this.hasTransitioned = false;
	                this.element.one(UI.support.transition.end, function(){
	                    $this.hasTransitioned = true;
	                    UI.Utils.focus($this.dialog, 'a[href]');
	                }).addClass('uk-open');
	            } else {
	                this.element.addClass('uk-open');
	                UI.Utils.focus(this.dialog, 'a[href]');
	            }
	
	            $html.addClass('uk-modal-page').height(); // force browser engine redraw
	
	            // Update ARIA
	            this.element.attr('aria-hidden', 'false');
	
	            this.element.trigger('show.uk.modal');
	
	            UI.Utils.checkDisplay(this.dialog, true);
	
	            return this;
	        },
	
	        hide: function(force) {
	
	            if (!force && UI.support.transition && this.hasTransitioned) {
	
	                var $this = this;
	
	                this.one(UI.support.transition.end, function() {
	                    $this._hide();
	                }).removeClass('uk-open');
	
	            } else {
	
	                this._hide();
	            }
	
	            return this;
	        },
	
	        resize: function(force) {
	
	            if (!this.isActive() && !force) return;
	
	            var bodywidth  = body.width();
	
	            this.scrollbarwidth = window.innerWidth - bodywidth;
	
	            body.css(this.paddingdir, this.scrollbarwidth);
	
	            this.element.css('overflow-y', this.scrollbarwidth ? 'scroll' : 'auto');
	
	            if (!this.updateScrollable() && this.options.center) {
	
	                var dh  = this.dialog.outerHeight(),
	                pad = parseInt(this.dialog.css('margin-top'), 10) + parseInt(this.dialog.css('margin-bottom'), 10);
	
	                if ((dh + pad) < window.innerHeight) {
	                    this.dialog.css({top: (window.innerHeight/2 - dh/2) - pad });
	                } else {
	                    this.dialog.css({top: ''});
	                }
	            }
	        },
	
	        updateScrollable: function() {
	
	            // has scrollable?
	            var scrollable = this.dialog.find('.uk-overflow-container:visible:first');
	
	            if (scrollable.length) {
	
	                scrollable.css('height', 0);
	
	                var offset = Math.abs(parseInt(this.dialog.css('margin-top'), 10)),
	                dh     = this.dialog.outerHeight(),
	                wh     = window.innerHeight,
	                h      = wh - 2*(offset < 20 ? 20:offset) - dh;
	
	                scrollable.css({
	                    maxHeight: (h < this.options.minScrollHeight ? '':h),
	                    height:''
	                });
	
	                return true;
	            }
	
	            return false;
	        },
	
	        _hide: function() {
	
	            this.active = false;
	            if (activeCount > 0) activeCount--;
	            else activeCount = 0;
	
	            this.element.hide().removeClass('uk-open');
	
	            // Update ARIA
	            this.element.attr('aria-hidden', 'true');
	
	            if (!activeCount) {
	                $html.removeClass('uk-modal-page');
	                body.css(this.paddingdir, "");
	            }
	
	            if (active===this) active = false;
	
	            this.trigger('hide.uk.modal');
	        },
	
	        isActive: function() {
	            return this.element.hasClass('uk-open');
	        }
	
	    });
	
	    UI.component('modalTrigger', {
	
	        boot: function() {
	
	            // init code
	            UI.$html.on('click.modal.uikit', '[data-uk-modal]', function(e) {
	
	                var ele = UI.$(this);
	
	                if (ele.is('a')) {
	                    e.preventDefault();
	                }
	
	                if (!ele.data('modalTrigger')) {
	                    var modal = UI.modalTrigger(ele, UI.Utils.options(ele.attr('data-uk-modal')));
	                    modal.show();
	                }
	
	            });
	
	            // close modal on esc button
	            UI.$html.on('keydown.modal.uikit', function (e) {
	
	                if (active && e.keyCode === 27 && active.options.keyboard) { // ESC
	                    e.preventDefault();
	                    active.hide();
	                }
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.options = UI.$.extend({
	                target: $this.element.is('a') ? $this.element.attr('href') : false
	            }, this.options);
	
	            this.modal = UI.modal(this.options.target, this.options);
	
	            this.on("click", function(e) {
	                e.preventDefault();
	                $this.show();
	            });
	
	            //methods
	            this.proxy(this.modal, 'show hide isActive');
	        }
	    });
	
	    UI.modal.dialog = function(content, options) {
	
	        var modal = UI.modal(UI.$(UI.modal.dialog.template).appendTo('body'), options);
	
	        modal.on('hide.uk.modal', function(){
	            if (modal.persist) {
	                modal.persist.appendTo(modal.persist.data('modalPersistParent'));
	                modal.persist = false;
	            }
	            modal.element.remove();
	        });
	
	        setContent(content, modal);
	
	        return modal;
	    };
	
	    UI.modal.dialog.template = '<div class="uk-modal"><div class="uk-modal-dialog" style="min-height:0;"></div></div>';
	
	    UI.modal.alert = function(content, options) {
	
	        options = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, options);
	
	        var modal = UI.modal.dialog(([
	            '<div class="uk-margin uk-modal-content">'+String(content)+'</div>',
	            '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-button-primary uk-modal-close">'+options.labels.Ok+'</button></div>'
	        ]).join(""), options);
	
	        modal.on('show.uk.modal', function(){
	            setTimeout(function(){
	                modal.element.find('button:first').focus();
	            }, 50);
	        });
	
	        return modal.show();
	    };
	
	    UI.modal.confirm = function(content, onconfirm, oncancel) {
	
	        var options = arguments.length > 1 && arguments[arguments.length-1] ? arguments[arguments.length-1] : {};
	
	        onconfirm = UI.$.isFunction(onconfirm) ? onconfirm : function(){};
	        oncancel  = UI.$.isFunction(oncancel) ? oncancel : function(){};
	        options   = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, UI.$.isFunction(options) ? {}:options);
	
	        var modal = UI.modal.dialog(([
	            '<div class="uk-margin uk-modal-content">'+String(content)+'</div>',
	            '<div class="uk-modal-footer uk-text-right"><button class="uk-button js-modal-confirm-cancel">'+options.labels.Cancel+'</button> <button class="uk-button uk-button-primary js-modal-confirm">'+options.labels.Ok+'</button></div>'
	        ]).join(""), options);
	
	        modal.element.find(".js-modal-confirm, .js-modal-confirm-cancel").on("click", function(){
	            UI.$(this).is('.js-modal-confirm') ? onconfirm() : oncancel();
	            modal.hide();
	        });
	
	        modal.on('show.uk.modal', function(){
	            setTimeout(function(){
	                modal.element.find('.js-modal-confirm').focus();
	            }, 50);
	        });
	
	        return modal.show();
	    };
	
	    UI.modal.prompt = function(text, value, onsubmit, options) {
	
	        onsubmit = UI.$.isFunction(onsubmit) ? onsubmit : function(value){};
	        options  = UI.$.extend(true, {bgclose:false, keyboard:false, modal:false, labels:UI.modal.labels}, options);
	
	        var modal = UI.modal.dialog(([
	            text ? '<div class="uk-modal-content uk-form">'+String(text)+'</div>':'',
	            '<div class="uk-margin-small-top uk-modal-content uk-form"><p><input type="text" class="uk-width-1-1"></p></div>',
	            '<div class="uk-modal-footer uk-text-right"><button class="uk-button uk-modal-close">'+options.labels.Cancel+'</button> <button class="uk-button uk-button-primary js-modal-ok">'+options.labels.Ok+'</button></div>'
	        ]).join(""), options),
	
	        input = modal.element.find("input[type='text']").val(value || '').on('keyup', function(e){
	            if (e.keyCode == 13) {
	                modal.element.find('.js-modal-ok').trigger('click');
	            }
	        });
	
	        modal.element.find('.js-modal-ok').on('click', function(){
	            if (onsubmit(input.val())!==false){
	                modal.hide();
	            }
	        });
	
	        return modal.show();
	    };
	
	    UI.modal.blockUI = function(content, options) {
	
	        var modal = UI.modal.dialog(([
	            '<div class="uk-margin uk-modal-content">'+String(content || '<div class="uk-text-center">...</div>')+'</div>'
	        ]).join(""), UI.$.extend({bgclose:false, keyboard:false, modal:false}, options));
	
	        modal.content = modal.element.find('.uk-modal-content:first');
	
	        return modal.show();
	    };
	
	    UI.modal.labels = {
	        Ok: 'Ok',
	        Cancel: 'Cancel'
	    };
	
	    // helper functions
	    function setContent(content, modal){
	
	        if(!modal) return;
	
	        if (typeof content === 'object') {
	
	            // convert DOM object to a jQuery object
	            content = content instanceof jQuery ? content : UI.$(content);
	
	            if(content.parent().length) {
	                modal.persist = content;
	                modal.persist.data('modalPersistParent', content.parent());
	            }
	        }else if (typeof content === 'string' || typeof content === 'number') {
	                // just insert the data as innerHTML
	                content = UI.$('<div></div>').html(content);
	        }else {
	                // unsupported data type!
	                content = UI.$('<div></div>').html('UIkit.modal Error: Unsupported data type: ' + typeof content);
	        }
	
	        content.appendTo(modal.element.find('.uk-modal-dialog'));
	
	        return modal;
	    }
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    UI.component('nav', {
	
	        defaults: {
	            toggle: '>li.uk-parent > a[href="#"]',
	            lists: '>li.uk-parent > ul',
	            multiple: false
	        },
	
	        boot: function() {
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-nav]', context).each(function() {
	                    var nav = UI.$(this);
	
	                    if (!nav.data('nav')) {
	                        var obj = UI.nav(nav, UI.Utils.options(nav.attr('data-uk-nav')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.on('click.uk.nav', this.options.toggle, function(e) {
	                e.preventDefault();
	                var ele = UI.$(this);
	                $this.open(ele.parent()[0] == $this.element[0] ? ele : ele.parent("li"));
	            });
	
	            this.update();
	
	            UI.domObserve(this.element, function(e) {
	                if ($this.element.find($this.options.lists).not('[role]').length) {
	                    $this.update();
	                }
	            });
	        },
	
	        update: function() {
	
	            var $this = this;
	
	            this.find(this.options.lists).each(function() {
	
	                var $ele   = UI.$(this).attr('role', 'menu'),
	                    parent = $ele.closest('li'),
	                    active = parent.hasClass("uk-active");
	
	                if (!parent.data('list-container')) {
	                    $ele.wrap('<div style="overflow:hidden;height:0;position:relative;"></div>');
	                    parent.data('list-container', $ele.parent()[active ? 'removeClass':'addClass']('uk-hidden'));
	                }
	
	                // Init ARIA
	                parent.attr('aria-expanded', parent.hasClass("uk-open"));
	
	                if (active) $this.open(parent, true);
	            });
	        },
	
	        open: function(li, noanimation) {
	
	            var $this = this, element = this.element, $li = UI.$(li), $container = $li.data('list-container');
	
	            if (!this.options.multiple) {
	
	                element.children('.uk-open').not(li).each(function() {
	
	                    var ele = UI.$(this);
	
	                    if (ele.data('list-container')) {
	                        ele.data('list-container').stop().animate({height: 0}, function() {
	                            UI.$(this).parent().removeClass('uk-open').end().addClass('uk-hidden');
	                        });
	                    }
	                });
	            }
	
	            $li.toggleClass('uk-open');
	
	            // Update ARIA
	            $li.attr('aria-expanded', $li.hasClass('uk-open'));
	
	            if ($container) {
	
	                if ($li.hasClass('uk-open')) {
	                    $container.removeClass('uk-hidden');
	                }
	
	                if (noanimation) {
	
	                    $container.stop().height($li.hasClass('uk-open') ? 'auto' : 0);
	
	                    if (!$li.hasClass('uk-open')) {
	                        $container.addClass('uk-hidden');
	                    }
	
	                    this.trigger('display.uk.check');
	
	                } else {
	
	                    $container.stop().animate({
	                        height: ($li.hasClass('uk-open') ? getHeight($container.find('ul:first')) : 0)
	                    }, function() {
	
	                        if (!$li.hasClass('uk-open')) {
	                            $container.addClass('uk-hidden');
	                        } else {
	                            $container.css('height', '');
	                        }
	
	                        $this.trigger('display.uk.check');
	                    });
	                }
	            }
	        }
	    });
	
	
	    // helper
	
	    function getHeight(ele) {
	
	        var $ele = UI.$(ele), height = 'auto';
	
	        if ($ele.is(':visible')) {
	            height = $ele.outerHeight();
	        } else {
	
	            var tmp = {
	                position: $ele.css('position'),
	                visibility: $ele.css('visibility'),
	                display: $ele.css('display')
	            };
	
	            height = $ele.css({position: 'absolute', visibility: 'hidden', display: 'block'}).outerHeight();
	
	            $ele.css(tmp); // reset element
	        }
	
	        return height;
	    }
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    var scrollpos = {x: window.scrollX, y: window.scrollY},
	        $win      = UI.$win,
	        $doc      = UI.$doc,
	        $html     = UI.$html,
	        Offcanvas = {
	
	        show: function(element, options) {
	
	            element = UI.$(element);
	
	            if (!element.length) return;
	
	            options = UI.$.extend({mode: 'push'}, options);
	
	            var $body     = UI.$('body'),
	                bar       = element.find('.uk-offcanvas-bar:first'),
	                rtl       = (UI.langdirection == 'right'),
	                flip      = bar.hasClass('uk-offcanvas-bar-flip') ? -1:1,
	                dir       = flip * (rtl ? -1 : 1),
	
	                scrollbarwidth =  window.innerWidth - $body.width();
	
	            scrollpos = {x: window.pageXOffset, y: window.pageYOffset};
	
	            bar.attr('mode', options.mode);
	            element.addClass('uk-active');
	
	            $body.css({width: window.innerWidth - scrollbarwidth, height: window.innerHeight}).addClass('uk-offcanvas-page');
	
	            if (options.mode == 'push' || options.mode == 'reveal') {
	                $body.css((rtl ? 'margin-right' : 'margin-left'), (rtl ? -1 : 1) * (bar.outerWidth() * dir));
	            }
	
	            if (options.mode == 'reveal') {
	                bar.css('clip', 'rect(0, '+bar.outerWidth()+'px, 100vh, 0)');
	            }
	
	            $html.css('margin-top', scrollpos.y * -1).width(); // .width() - force redraw
	
	
	            bar.addClass('uk-offcanvas-bar-show');
	
	            this._initElement(element);
	
	            bar.trigger('show.uk.offcanvas', [element, bar]);
	
	            // Update ARIA
	            element.attr('aria-hidden', 'false');
	        },
	
	        hide: function(force) {
	
	            var $body = UI.$('body'),
	                panel = UI.$('.uk-offcanvas.uk-active'),
	                rtl   = (UI.langdirection == 'right'),
	                bar   = panel.find('.uk-offcanvas-bar:first'),
	                finalize = function() {
	                    $body.removeClass('uk-offcanvas-page').css({width: '', height: '', marginLeft: '', marginRight: ''});
	                    panel.removeClass('uk-active');
	
	                    bar.removeClass('uk-offcanvas-bar-show');
	                    $html.css('margin-top', '');
	                    window.scrollTo(scrollpos.x, scrollpos.y);
	                    bar.trigger('hide.uk.offcanvas', [panel, bar]);
	
	                    // Update ARIA
	                    panel.attr('aria-hidden', 'true');
	                };
	
	            if (!panel.length) return;
	            if (bar.attr('mode') == 'none') force = true;
	
	            if (UI.support.transition && !force) {
	
	                $body.one(UI.support.transition.end, function() {
	                    finalize();
	                }).css((rtl ? 'margin-right' : 'margin-left'), '');
	
	                if (bar.attr('mode') == 'reveal') {
	                    bar.css('clip', '');
	                }
	
	                setTimeout(function(){
	                    bar.removeClass('uk-offcanvas-bar-show');
	                }, 0);
	
	            } else {
	                finalize();
	            }
	        },
	
	        _initElement: function(element) {
	
	            if (element.data('OffcanvasInit')) return;
	
	            element.on('click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas', function(e) {
	
	                var target = UI.$(e.target);
	
	                if (!e.type.match(/swipe/)) {
	
	                    if (!target.hasClass('uk-offcanvas-close')) {
	                        if (target.hasClass('uk-offcanvas-bar')) return;
	                        if (target.parents('.uk-offcanvas-bar:first').length) return;
	                    }
	                }
	
	                e.stopImmediatePropagation();
	                Offcanvas.hide();
	            });
	
	            element.on('click', 'a[href*="#"]', function(e){
	
	                var link = UI.$(this),
	                    href = link.attr('href');
	
	                if (href == '#') {
	                    return;
	                }
	
	                UI.$doc.one('hide.uk.offcanvas', function() {
	
	                    var target;
	
	                    try {
	                        target = UI.$(link[0].hash);
	                    } catch (e){
	                        target = '';
	                    }
	
	                    if (!target.length) {
	                        target = UI.$('[name="'+link[0].hash.replace('#','')+'"]');
	                    }
	
	                    if (target.length && UI.Utils.scrollToElement) {
	                        UI.Utils.scrollToElement(target, UI.Utils.options(link.attr('data-uk-smooth-scroll') || '{}'));
	                    } else {
	                        window.location.href = href;
	                    }
	                });
	
	                Offcanvas.hide();
	            });
	
	            element.data('OffcanvasInit', true);
	        }
	    };
	
	    UI.component('offcanvasTrigger', {
	
	        boot: function() {
	
	            // init code
	            $html.on('click.offcanvas.uikit', '[data-uk-offcanvas]', function(e) {
	
	                e.preventDefault();
	
	                var ele = UI.$(this);
	
	                if (!ele.data('offcanvasTrigger')) {
	                    var obj = UI.offcanvasTrigger(ele, UI.Utils.options(ele.attr('data-uk-offcanvas')));
	                    ele.trigger("click");
	                }
	            });
	
	            $html.on('keydown.uk.offcanvas', function(e) {
	
	                if (e.keyCode === 27) { // ESC
	                    Offcanvas.hide();
	                }
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.options = UI.$.extend({
	                target: $this.element.is('a') ? $this.element.attr('href') : false,
	                mode: 'push'
	            }, this.options);
	
	            this.on('click', function(e) {
	                e.preventDefault();
	                Offcanvas.show($this.options.target, $this.options);
	            });
	        }
	    });
	
	    UI.offcanvas = Offcanvas;
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    var Animations;
	
	    UI.component('switcher', {
	
	        defaults: {
	            connect   : false,
	            toggle    : '>*',
	            active    : 0,
	            animation : false,
	            duration  : 200,
	            swiping   : true
	        },
	
	        animating: false,
	
	        boot: function() {
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-switcher]', context).each(function() {
	                    var switcher = UI.$(this);
	
	                    if (!switcher.data('switcher')) {
	                        var obj = UI.switcher(switcher, UI.Utils.options(switcher.attr('data-uk-switcher')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.on('click.uk.switcher', this.options.toggle, function(e) {
	                e.preventDefault();
	                $this.show(this);
	            });
	
	            if (!this.options.connect) {
	                return;
	            }
	
	            this.connect = UI.$(this.options.connect);
	
	            if (!this.connect.length) {
	                return;
	            }
	
	            this.connect.on('click.uk.switcher', '[data-uk-switcher-item]', function(e) {
	
	                e.preventDefault();
	
	                var item = UI.$(this).attr('data-uk-switcher-item');
	
	                if ($this.index == item) return;
	
	                switch(item) {
	                    case 'next':
	                    case 'previous':
	                        $this.show($this.index + (item=='next' ? 1:-1));
	                        break;
	                    default:
	                        $this.show(parseInt(item, 10));
	                }
	            });
	
	            if (this.options.swiping) {
	
	                this.connect.on('swipeRight swipeLeft', function(e) {
	                    e.preventDefault();
	                    if (!window.getSelection().toString()) {
	                        $this.show($this.index + (e.type == 'swipeLeft' ? 1 : -1));
	                    }
	                });
	            }
	
	            this.update();
	        },
	
	        update: function() {
	
	            this.connect.children().removeClass('uk-active').attr('aria-hidden', 'true');
	
	            var toggles = this.find(this.options.toggle),
	                active  = toggles.filter('.uk-active');
	
	            if (active.length) {
	                this.show(active, false);
	            } else {
	
	                if (this.options.active===false) return;
	
	                active = toggles.eq(this.options.active);
	                this.show(active.length ? active : toggles.eq(0), false);
	            }
	
	            // Init ARIA for toggles
	            toggles.not(active).attr('aria-expanded', 'false');
	            active.attr('aria-expanded', 'true');
	        },
	
	        show: function(tab, animate) {
	
	            if (this.animating) {
	                return;
	            }
	
	            var toggles = this.find(this.options.toggle);
	
	            if (isNaN(tab)) {
	                tab = UI.$(tab);
	            } else {
	                tab = tab < 0 ? toggles.length-1 : tab;
	                tab = toggles.eq(toggles[tab] ? tab : 0);
	            }
	
	            var $this     = this,
	                active    = UI.$(tab),
	                animation = Animations[this.options.animation] || function(current, next) {
	
	                    if (!$this.options.animation) {
	                        return Animations.none.apply($this);
	                    }
	
	                    var anim = $this.options.animation.split(',');
	
	                    if (anim.length == 1) {
	                        anim[1] = anim[0];
	                    }
	
	                    anim[0] = anim[0].trim();
	                    anim[1] = anim[1].trim();
	
	                    return coreAnimation.apply($this, [anim, current, next]);
	                };
	
	            if (animate===false || !UI.support.animation) {
	                animation = Animations.none;
	            }
	
	            if (active.hasClass("uk-disabled")) return;
	
	            // Update ARIA for Toggles
	            toggles.attr('aria-expanded', 'false');
	            active.attr('aria-expanded', 'true');
	
	            toggles.filter(".uk-active").removeClass("uk-active");
	            active.addClass("uk-active");
	
	            if (this.options.connect && this.connect.length) {
	
	                this.index = this.find(this.options.toggle).index(active);
	
	                if (this.index == -1 ) {
	                    this.index = 0;
	                }
	
	                this.connect.each(function() {
	
	                    var container = UI.$(this),
	                        children  = UI.$(container.children()),
	                        current   = UI.$(children.filter('.uk-active')),
	                        next      = UI.$(children.eq($this.index));
	
	                        $this.animating = true;
	
	                        animation.apply($this, [current, next]).then(function(){
	
	                            current.removeClass("uk-active");
	                            next.addClass("uk-active");
	
	                            // Update ARIA for connect
	                            current.attr('aria-hidden', 'true');
	                            next.attr('aria-hidden', 'false');
	
	                            UI.Utils.checkDisplay(next, true);
	
	                            $this.animating = false;
	
	                        });
	                });
	            }
	
	            this.trigger("show.uk.switcher", [active]);
	        }
	    });
	
	    Animations = {
	
	        'none': function() {
	            var d = UI.$.Deferred();
	            d.resolve();
	            return d.promise();
	        },
	
	        'fade': function(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-fade', current, next]);
	        },
	
	        'slide-bottom': function(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-bottom', current, next]);
	        },
	
	        'slide-top': function(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-top', current, next]);
	        },
	
	        'slide-vertical': function(current, next, dir) {
	
	            var anim = ['uk-animation-slide-top', 'uk-animation-slide-bottom'];
	
	            if (current && current.index() > next.index()) {
	                anim.reverse();
	            }
	
	            return coreAnimation.apply(this, [anim, current, next]);
	        },
	
	        'slide-left': function(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-left', current, next]);
	        },
	
	        'slide-right': function(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-slide-right', current, next]);
	        },
	
	        'slide-horizontal': function(current, next, dir) {
	
	            var anim = ['uk-animation-slide-right', 'uk-animation-slide-left'];
	
	            if (current && current.index() > next.index()) {
	                anim.reverse();
	            }
	
	            return coreAnimation.apply(this, [anim, current, next]);
	        },
	
	        'scale': function(current, next) {
	            return coreAnimation.apply(this, ['uk-animation-scale-up', current, next]);
	        }
	    };
	
	    UI.switcher.animations = Animations;
	
	
	    // helpers
	
	    function coreAnimation(cls, current, next) {
	
	        var d = UI.$.Deferred(), clsIn = cls, clsOut = cls, release;
	
	        if (next[0]===current[0]) {
	            d.resolve();
	            return d.promise();
	        }
	
	        if (typeof(cls) == 'object') {
	            clsIn  = cls[0];
	            clsOut = cls[1] || cls[0];
	        }
	
	        UI.$body.css('overflow-x', 'hidden'); // fix scroll jumping in iOS
	
	        release = function() {
	
	            if (current) current.hide().removeClass('uk-active '+clsOut+' uk-animation-reverse');
	
	            next.addClass(clsIn).one(UI.support.animation.end, function() {
	
	                setTimeout(function () {
	                    next.removeClass(''+clsIn+'').css({opacity:'', display:''});
	                }, 0);
	
	                d.resolve();
	
	                UI.$body.css('overflow-x', '');
	
	                if (current) current.css({opacity:'', display:''});
	
	            }.bind(this)).show();
	        };
	
	        next.css('animation-duration', this.options.duration+'ms');
	
	        if (current && current.length) {
	
	            current.css('animation-duration', this.options.duration+'ms');
	
	            current.css('display', 'none').addClass(clsOut+' uk-animation-reverse').one(UI.support.animation.end, function() {
	                release();
	            }.bind(this)).css('display', '');
	
	        } else {
	            next.addClass('uk-active');
	            release();
	        }
	
	        return d.promise();
	    }
	
	})(UIkit);
	
	(function(UI) {
	
	    "use strict";
	
	    UI.component('tab', {
	
	        defaults: {
	            target    : '>li:not(.uk-tab-responsive, .uk-disabled)',
	            connect   : false,
	            active    : 0,
	            animation : false,
	            duration  : 200,
	            swiping   : true
	        },
	
	        boot: function() {
	
	            // init code
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-tab]', context).each(function() {
	
	                    var tab = UI.$(this);
	
	                    if (!tab.data('tab')) {
	                        var obj = UI.tab(tab, UI.Utils.options(tab.attr('data-uk-tab')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            var $this = this;
	
	            this.current = false;
	
	            this.on('click.uk.tab', this.options.target, function(e) {
	
	                e.preventDefault();
	
	                if ($this.switcher && $this.switcher.animating) {
	                    return;
	                }
	
	                var current = $this.find($this.options.target).not(this);
	
	                current.removeClass('uk-active').blur();
	
	                $this.trigger('change.uk.tab', [UI.$(this).addClass('uk-active'), $this.current]);
	
	                $this.current = UI.$(this);
	
	                // Update ARIA
	                if (!$this.options.connect) {
	                    current.attr('aria-expanded', 'false');
	                    UI.$(this).attr('aria-expanded', 'true');
	                }
	            });
	
	            if (this.options.connect) {
	                this.connect = UI.$(this.options.connect);
	            }
	
	            // init responsive tab
	            this.responsivetab = UI.$('<li class="uk-tab-responsive uk-active"><a></a></li>').append('<div class="uk-dropdown uk-dropdown-small"><ul class="uk-nav uk-nav-dropdown"></ul><div>');
	
	            this.responsivetab.dropdown = this.responsivetab.find('.uk-dropdown');
	            this.responsivetab.lst      = this.responsivetab.dropdown.find('ul');
	            this.responsivetab.caption  = this.responsivetab.find('a:first');
	
	            if (this.element.hasClass('uk-tab-bottom')) this.responsivetab.dropdown.addClass('uk-dropdown-up');
	
	            // handle click
	            this.responsivetab.lst.on('click.uk.tab', 'a', function(e) {
	
	                e.preventDefault();
	                e.stopPropagation();
	
	                var link = UI.$(this);
	
	                $this.element.children('li:not(.uk-tab-responsive)').eq(link.data('index')).trigger('click');
	            });
	
	            this.on('show.uk.switcher change.uk.tab', function(e, tab) {
	                $this.responsivetab.caption.html(tab.text());
	            });
	
	            this.element.append(this.responsivetab);
	
	            // init UIkit components
	            if (this.options.connect) {
	                
	                this.switcher = UI.switcher(this.element, {
	                    toggle    : '>li:not(.uk-tab-responsive)',
	                    connect   : this.options.connect,
	                    active    : this.options.active,
	                    animation : this.options.animation,
	                    duration  : this.options.duration,
	                    swiping   : this.options.swiping
	                });
	            }
	
	            UI.dropdown(this.responsivetab, {mode: 'click', preventflip: 'y'});
	
	            // init
	            $this.trigger('change.uk.tab', [this.element.find(this.options.target).not('.uk-tab-responsive').filter('.uk-active')]);
	
	            this.check();
	
	            UI.$win.on('resize orientationchange', UI.Utils.debounce(function(){
	                if ($this.element.is(':visible'))  $this.check();
	            }, 100));
	
	            this.on('display.uk.check', function(){
	                if ($this.element.is(':visible'))  $this.check();
	            });
	        },
	
	        check: function() {
	
	            var children = this.element.children('li:not(.uk-tab-responsive)').removeClass('uk-hidden');
	
	            if (!children.length) {
	                this.responsivetab.addClass('uk-hidden');
	                return;
	            }
	
	            var top          = (children.eq(0).offset().top + Math.ceil(children.eq(0).height()/2)),
	                doresponsive = false,
	                item, link, clone;
	
	            this.responsivetab.lst.empty();
	
	            children.each(function(){
	
	                if (UI.$(this).offset().top > top) {
	                    doresponsive = true;
	                }
	            });
	
	            if (doresponsive) {
	
	                for (var i = 0; i < children.length; i++) {
	
	                    item  = UI.$(children.eq(i));
	                    link  = item.find('a');
	
	                    if (item.css('float') != 'none' && !item.attr('uk-dropdown')) {
	
	                        if (!item.hasClass('uk-disabled')) {
	
	                            clone = UI.$(item[0].outerHTML);
	                            clone.find('a').data('index', i);
	
	                            this.responsivetab.lst.append(clone);
	                        }
	
	                        item.addClass('uk-hidden');
	                    }
	                }
	            }
	
	            this.responsivetab[this.responsivetab.lst.children('li').length ? 'removeClass':'addClass']('uk-hidden');
	        }
	    });
	
	})(UIkit);
	
	(function(UI){
	
	    "use strict";
	
	    UI.component('cover', {
	
	        defaults: {
	            automute : true
	        },
	
	        boot: function() {
	
	            // auto init
	            UI.ready(function(context) {
	
	                UI.$('[data-uk-cover]', context).each(function(){
	
	                    var ele = UI.$(this);
	
	                    if(!ele.data('cover')) {
	                        var plugin = UI.cover(ele, UI.Utils.options(ele.attr('data-uk-cover')));
	                    }
	                });
	            });
	        },
	
	        init: function() {
	
	            this.parent = this.element.parent();
	
	            UI.$win.on('load resize orientationchange', UI.Utils.debounce(function(){
	                this.check();
	            }.bind(this), 100));
	
	            this.on('display.uk.check', function(e) {
	                if (this.element.is(':visible')) this.check();
	            }.bind(this));
	
	            this.check();
	
	            if (this.element.is('iframe') && this.options.automute) {
	
	                var src = this.element.attr('src');
	
	                this.element.attr('src', '').on('load', function(){
	                    this.contentWindow.postMessage('{ "event": "command", "func": "mute", "method":"setVolume", "value":0}', '*');
	                }).attr('src', [src, (src.indexOf('?') > -1 ? '&':'?'), 'enablejsapi=1&api=1'].join(''));
	            }
	        },
	
	        check: function() {
	
	            this.element.css({ width  : '', height : '' });
	
	            this.dimension = {w: this.element.width(), h: this.element.height()};
	
	            if (this.element.attr('width') && !isNaN(this.element.attr('width'))) {
	                this.dimension.w = this.element.attr('width');
	            }
	
	            if (this.element.attr('height') && !isNaN(this.element.attr('height'))) {
	                this.dimension.h = this.element.attr('height');
	            }
	
	            this.ratio = this.dimension.w / this.dimension.h;
	
	            var w = this.parent.width(), h = this.parent.height(), width, height;
	
	            // if element height < parent height (gap underneath)
	            if ((w / this.ratio) < h) {
	
	                width  = Math.ceil(h * this.ratio);
	                height = h;
	
	            // element width < parent width (gap to right)
	            } else {
	
	                width  = w;
	                height = Math.ceil(w / this.ratio);
	            }
	
	            this.element.css({ width  : width, height : height });
	        }
	    });
	
	})(UIkit);


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (addon) {
	
	    var component;
	
	    if (window.UIkit) {
	        component = addon(UIkit);
	    }
	
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(91)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return component || addon(UIkit);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	})(function (UI) {
	
	    "use strict";
	
	    UI.component('formSelect', {
	
	        defaults: {
	            'target': '>span:first',
	            'activeClass': 'uk-active'
	        },
	
	        boot: function boot() {
	            // init code
	            UI.ready(function (context) {
	
	                UI.$("[data-uk-form-select]", context).each(function () {
	
	                    var ele = UI.$(this);
	
	                    if (!ele.data("formSelect")) {
	                        UI.formSelect(ele, UI.Utils.options(ele.attr("data-uk-form-select")));
	                    }
	                });
	            });
	        },
	
	        init: function init() {
	            var $this = this;
	
	            this.target = this.find(this.options.target);
	            this.select = this.find('select');
	
	            // init + on change event
	            this.select.on("change", function () {
	
	                var select = $this.select[0],
	                    fn = function fn() {
	
	                    try {
	                        $this.target.text(select.options[select.selectedIndex].text);
	                    } catch (e) {}
	
	                    $this.element[$this.select.val() ? 'addClass' : 'removeClass']($this.options.activeClass);
	
	                    return fn;
	                };
	
	                return fn();
	            }());
	
	            this.element.data("formSelect", this);
	        }
	    });
	
	    return UI.formSelect;
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (addon) {
	    var component;
	
	    if (window.UIkit) {
	        component = addon(UIkit);
	    }
	
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(91)], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return component || addon(UIkit);
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	})(function (UI) {
	
	    "use strict";
	
	    UI.component('accordion', {
	
	        defaults: {
	            showfirst: true,
	            collapse: true,
	            animate: true,
	            easing: 'swing',
	            duration: 300,
	            toggle: '.uk-accordion-title',
	            containers: '.uk-accordion-content',
	            clsactive: 'uk-active'
	        },
	
	        boot: function boot() {
	
	            // init code
	            UI.ready(function (context) {
	
	                setTimeout(function () {
	
	                    UI.$("[data-uk-accordion]", context).each(function () {
	
	                        var ele = UI.$(this);
	
	                        if (!ele.data("accordion")) {
	                            UI.accordion(ele, UI.Utils.options(ele.attr('data-uk-accordion')));
	                        }
	                    });
	                }, 0);
	            });
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            this.element.on('click.uk.accordion', this.options.toggle, function (e) {
	
	                e.preventDefault();
	
	                $this.toggleItem(UI.$(this).data('wrapper'), $this.options.animate, $this.options.collapse);
	            });
	
	            this.update();
	
	            if (this.options.showfirst) {
	                this.toggleItem(this.toggle.eq(0).data('wrapper'), false, false);
	            }
	        },
	
	        toggleItem: function toggleItem(wrapper, animated, collapse) {
	
	            var $this = this;
	
	            wrapper.data('toggle').toggleClass(this.options.clsactive);
	            wrapper.data('content').toggleClass(this.options.clsactive);
	
	            var active = wrapper.data('toggle').hasClass(this.options.clsactive);
	
	            if (collapse) {
	                this.toggle.not(wrapper.data('toggle')).removeClass(this.options.clsactive);
	                this.content.not(wrapper.data('content')).removeClass(this.options.clsactive).parent().stop().css('overflow', 'hidden').animate({ height: 0 }, { easing: this.options.easing, duration: animated ? this.options.duration : 0 }).attr('aria-expanded', 'false');
	            }
	
	            wrapper.stop().css('overflow', 'hidden');
	
	            if (animated) {
	
	                wrapper.animate({ height: active ? getHeight(wrapper.data('content')) : 0 }, { easing: this.options.easing, duration: this.options.duration, complete: function complete() {
	
	                        if (active) {
	                            wrapper.css({ 'overflow': '', 'height': 'auto' });
	                            UI.Utils.checkDisplay(wrapper.data('content'));
	                        }
	
	                        $this.trigger('display.uk.check');
	                    } });
	            } else {
	
	                wrapper.height(active ? 'auto' : 0);
	
	                if (active) {
	                    wrapper.css({ 'overflow': '' });
	                    UI.Utils.checkDisplay(wrapper.data('content'));
	                }
	
	                this.trigger('display.uk.check');
	            }
	
	            // Update ARIA
	            wrapper.attr('aria-expanded', active);
	
	            this.element.trigger('toggle.uk.accordion', [active, wrapper.data('toggle'), wrapper.data('content')]);
	        },
	
	        update: function update() {
	
	            var $this = this,
	                $content,
	                $wrapper,
	                $toggle;
	
	            this.toggle = this.find(this.options.toggle);
	            this.content = this.find(this.options.containers);
	
	            this.content.each(function (index) {
	
	                $content = UI.$(this);
	
	                if ($content.parent().data('wrapper')) {
	                    $wrapper = $content.parent();
	                } else {
	                    $wrapper = UI.$(this).wrap('<div data-wrapper="true" style="overflow:hidden;height:0;position:relative;"></div>').parent();
	
	                    // Init ARIA
	                    $wrapper.attr('aria-expanded', 'false');
	                }
	
	                $toggle = $this.toggle.eq(index);
	
	                $wrapper.data('toggle', $toggle);
	                $wrapper.data('content', $content);
	                $toggle.data('wrapper', $wrapper);
	                $content.data('wrapper', $wrapper);
	            });
	
	            this.element.trigger('update.uk.accordion', [this]);
	        }
	
	    });
	
	    // helper
	
	    function getHeight(ele) {
	
	        var $ele = UI.$(ele),
	            height = "auto";
	
	        if ($ele.is(":visible")) {
	            height = $ele.outerHeight();
	        } else {
	
	            var tmp = {
	                position: $ele.css("position"),
	                visibility: $ele.css("visibility"),
	                display: $ele.css("display")
	            };
	
	            height = $ele.css({ position: 'absolute', visibility: 'hidden', display: 'block' }).outerHeight();
	
	            $ele.css(tmp); // reset element
	        }
	
	        return height;
	    }
	
	    return UI.accordion;
	});

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (UI) {
	
	    "use strict";
	
	    UI.component('buttonRadio', {
	
	        defaults: {
	            "activeClass": 'uk-active',
	            "target": ".uk-button"
	        },
	
	        boot: function boot() {
	
	            // init code
	            UI.$html.on("click.buttonradio.uikit", "[data-uk-button-radio]", function (e) {
	
	                var ele = UI.$(this);
	
	                if (!ele.data("buttonRadio")) {
	
	                    var obj = UI.buttonRadio(ele, UI.Utils.options(ele.attr("data-uk-button-radio"))),
	                        target = UI.$(e.target);
	
	                    if (target.is(obj.options.target)) {
	                        target.trigger("click");
	                    }
	                }
	            });
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            // Init ARIA
	            this.find($this.options.target).attr('aria-checked', 'false').filter('.' + $this.options.activeClass).attr('aria-checked', 'true');
	
	            this.on("click", this.options.target, function (e) {
	
	                var ele = UI.$(this);
	
	                if (ele.is('a[href="#"]')) e.preventDefault();
	
	                $this.find($this.options.target).not(ele).removeClass($this.options.activeClass).blur();
	                ele.addClass($this.options.activeClass);
	
	                // Update ARIA
	                $this.find($this.options.target).not(ele).attr('aria-checked', 'false');
	                ele.attr('aria-checked', 'true');
	
	                $this.trigger("change.uk.button", [ele]);
	            });
	        },
	
	        getSelected: function getSelected() {
	            return this.find('.' + this.options.activeClass);
	        }
	    });
	
	    UI.component('buttonCheckbox', {
	
	        defaults: {
	            "activeClass": 'uk-active',
	            "target": ".uk-button"
	        },
	
	        boot: function boot() {
	
	            UI.$html.on("click.buttoncheckbox.uikit", "[data-uk-button-checkbox]", function (e) {
	                var ele = UI.$(this);
	
	                if (!ele.data("buttonCheckbox")) {
	
	                    var obj = UI.buttonCheckbox(ele, UI.Utils.options(ele.attr("data-uk-button-checkbox"))),
	                        target = UI.$(e.target);
	
	                    if (target.is(obj.options.target)) {
	                        target.trigger("click");
	                    }
	                }
	            });
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            // Init ARIA
	            this.find($this.options.target).attr('aria-checked', 'false').filter('.' + $this.options.activeClass).attr('aria-checked', 'true');
	
	            this.on("click", this.options.target, function (e) {
	                var ele = UI.$(this);
	
	                if (ele.is('a[href="#"]')) e.preventDefault();
	
	                ele.toggleClass($this.options.activeClass).blur();
	
	                // Update ARIA
	                ele.attr('aria-checked', ele.hasClass($this.options.activeClass));
	
	                $this.trigger("change.uk.button", [ele]);
	            });
	        },
	
	        getSelected: function getSelected() {
	            return this.find('.' + this.options.activeClass);
	        }
	    });
	
	    UI.component('button', {
	
	        defaults: {},
	
	        boot: function boot() {
	
	            UI.$html.on("click.button.uikit", "[data-uk-button]", function (e) {
	                var ele = UI.$(this);
	
	                if (!ele.data("button")) {
	
	                    var obj = UI.button(ele, UI.Utils.options(ele.attr("data-uk-button")));
	                    ele.trigger("click");
	                }
	            });
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            // Init ARIA
	            this.element.attr('aria-pressed', this.element.hasClass("uk-active"));
	
	            this.on("click", function (e) {
	
	                if ($this.element.is('a[href="#"]')) e.preventDefault();
	
	                $this.toggle();
	                $this.trigger("change.uk.button", [$this.element.blur().hasClass("uk-active")]);
	            });
	        },
	
	        toggle: function toggle() {
	            this.element.toggleClass("uk-active");
	
	            // Update ARIA
	            this.element.attr('aria-pressed', this.element.hasClass("uk-active"));
	        }
	    });
	})(UIkit);

/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";
	
	/*! UIkit 2.25.0 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
	(function (UI) {
	
	    "use strict";
	
	    var scrollpos = { x: window.scrollX, y: window.scrollY },
	        $win = UI.$win,
	        $doc = UI.$doc,
	        $html = UI.$html,
	        Offcanvas = {
	
	        show: function show(element) {
	
	            element = UI.$(element);
	
	            if (!element.length) return;
	
	            var $body = UI.$('body'),
	                bar = element.find(".uk-offcanvas-bar:first"),
	                rtl = UI.langdirection == "right",
	                flip = bar.hasClass("uk-offcanvas-bar-flip") ? -1 : 1,
	                dir = flip * (rtl ? -1 : 1),
	                scrollbarwidth = window.innerWidth - $body.width();
	
	            scrollpos = { x: window.pageXOffset, y: window.pageYOffset };
	
	            element.addClass("uk-active");
	
	            $body.css({ "width": window.innerWidth - scrollbarwidth, "height": window.innerHeight }).addClass("uk-offcanvas-page");
	            $body.css(rtl ? "margin-right" : "margin-left", (rtl ? -1 : 1) * (bar.outerWidth() * dir)).width(); // .width() - force redraw
	
	            $html.css('margin-top', scrollpos.y * -1);
	
	            bar.addClass("uk-offcanvas-bar-show");
	
	            this._initElement(element);
	
	            bar.trigger('show.uk.offcanvas', [element, bar]);
	
	            // Update ARIA
	            element.attr('aria-hidden', 'false');
	        },
	
	        hide: function hide(force) {
	
	            var $body = UI.$('body'),
	                panel = UI.$(".uk-offcanvas.uk-active"),
	                rtl = UI.langdirection == "right",
	                bar = panel.find(".uk-offcanvas-bar:first"),
	                finalize = function finalize() {
	                $body.removeClass("uk-offcanvas-page").css({ "width": "", "height": "", "margin-left": "", "margin-right": "" });
	                panel.removeClass("uk-active");
	
	                bar.removeClass("uk-offcanvas-bar-show");
	                $html.css('margin-top', '');
	                window.scrollTo(scrollpos.x, scrollpos.y);
	                bar.trigger('hide.uk.offcanvas', [panel, bar]);
	
	                // Update ARIA
	                panel.attr('aria-hidden', 'true');
	            };
	
	            if (!panel.length) return;
	
	            if (UI.support.transition && !force) {
	
	                $body.one(UI.support.transition.end, function () {
	                    finalize();
	                }).css(rtl ? "margin-right" : "margin-left", "");
	
	                setTimeout(function () {
	                    bar.removeClass("uk-offcanvas-bar-show");
	                }, 0);
	            } else {
	                finalize();
	            }
	        },
	
	        _initElement: function _initElement(element) {
	
	            if (element.data("OffcanvasInit")) return;
	
	            element.on("click.uk.offcanvas swipeRight.uk.offcanvas swipeLeft.uk.offcanvas", function (e) {
	
	                var target = UI.$(e.target);
	
	                if (!e.type.match(/swipe/)) {
	
	                    if (!target.hasClass("uk-offcanvas-close")) {
	                        if (target.hasClass("uk-offcanvas-bar")) return;
	                        if (target.parents(".uk-offcanvas-bar:first").length) return;
	                    }
	                }
	
	                e.stopImmediatePropagation();
	                Offcanvas.hide();
	            });
	
	            element.on("click", "a[href*='#']", function (e) {
	
	                var link = UI.$(this),
	                    href = link.attr("href");
	
	                if (href == "#") {
	                    return;
	                }
	
	                UI.$doc.one('hide.uk.offcanvas', function () {
	
	                    var target;
	
	                    try {
	                        target = UI.$(link[0].hash);
	                    } catch (e) {
	                        target = '';
	                    }
	
	                    if (!target.length) {
	                        target = UI.$('[name="' + link[0].hash.replace('#', '') + '"]');
	                    }
	
	                    if (target.length && UI.Utils.scrollToElement) {
	                        UI.Utils.scrollToElement(target, UI.Utils.options(link.attr('data-uk-smooth-scroll') || '{}'));
	                    } else {
	                        window.location.href = href;
	                    }
	                });
	
	                Offcanvas.hide();
	            });
	
	            element.data("OffcanvasInit", true);
	        }
	    };
	
	    UI.component('offcanvasTrigger', {
	
	        boot: function boot() {
	
	            // init code
	            $html.on("click.offcanvas.uikit", "[data-uk-offcanvas]", function (e) {
	
	                e.preventDefault();
	
	                var ele = UI.$(this);
	
	                if (!ele.data("offcanvasTrigger")) {
	                    var obj = UI.offcanvasTrigger(ele, UI.Utils.options(ele.attr("data-uk-offcanvas")));
	                    ele.trigger("click");
	                }
	            });
	
	            $html.on('keydown.uk.offcanvas', function (e) {
	
	                if (e.keyCode === 27) {
	                    // ESC
	                    Offcanvas.hide();
	                }
	            });
	        },
	
	        init: function init() {
	
	            var $this = this;
	
	            this.options = UI.$.extend({
	                "target": $this.element.is("a") ? $this.element.attr("href") : false
	            }, this.options);
	
	            this.on("click", function (e) {
	                e.preventDefault();
	                Offcanvas.show($this.options.target);
	            });
	        }
	    });
	
	    UI.offcanvas = Offcanvas;
	})(UIkit);

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof2 = __webpack_require__(5);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	 * easy-autocomplete
	 * jQuery plugin for autocompletion
	 * 
	 * @author Łukasz Pawełczak (http://github.com/pawelczak)
	 * @version 1.3.5
	 * Copyright  License: 
	 */
	
	/*
	 * EasyAutocomplete - Configuration 
	 */
	var EasyAutocomplete = function (scope) {
	
		scope.Configuration = function Configuration(options) {
			var defaults = {
				data: "list-required",
				url: "list-required",
				dataType: "json",
	
				listLocation: function listLocation(data) {
					return data;
				},
	
				xmlElementName: "",
	
				getValue: function getValue(element) {
					return element;
				},
	
				autocompleteOff: true,
	
				placeholder: false,
	
				ajaxCallback: function ajaxCallback() {},
	
				matchResponseProperty: false,
	
				list: {
					sort: {
						enabled: false,
						method: function method(a, b) {
							a = defaults.getValue(a);
							b = defaults.getValue(b);
							if (a < b) {
								return -1;
							}
							if (a > b) {
								return 1;
							}
							return 0;
						}
					},
	
					maxNumberOfElements: 6,
	
					hideOnEmptyPhrase: true,
	
					match: {
						enabled: false,
						caseSensitive: false,
						method: function method(element, phrase) {
	
							if (element.search(phrase) > -1) {
								return true;
							} else {
								return false;
							}
						}
					},
	
					showAnimation: {
						type: "normal", //normal|slide|fade
						time: 400,
						callback: function callback() {}
					},
	
					hideAnimation: {
						type: "normal",
						time: 400,
						callback: function callback() {}
					},
	
					/* Events */
					onClickEvent: function onClickEvent() {},
					onSelectItemEvent: function onSelectItemEvent() {},
					onLoadEvent: function onLoadEvent() {},
					onChooseEvent: function onChooseEvent() {},
					onKeyEnterEvent: function onKeyEnterEvent() {},
					onMouseOverEvent: function onMouseOverEvent() {},
					onMouseOutEvent: function onMouseOutEvent() {},
					onShowListEvent: function onShowListEvent() {},
					onHideListEvent: function onHideListEvent() {}
				},
	
				highlightPhrase: true,
	
				theme: "",
	
				cssClasses: "",
	
				minCharNumber: 0,
	
				requestDelay: 0,
	
				adjustWidth: true,
	
				ajaxSettings: {},
	
				preparePostData: function preparePostData(data, inputPhrase) {
					return data;
				},
	
				loggerEnabled: true,
	
				template: "",
	
				categoriesAssigned: false,
	
				categories: [{
					maxNumberOfElements: 4
				}]
	
			};
	
			var externalObjects = ["ajaxSettings", "template"];
	
			this.get = function (propertyName) {
				return defaults[propertyName];
			};
	
			this.equals = function (name, value) {
				if (isAssigned(name)) {
					if (defaults[name] === value) {
						return true;
					}
				}
	
				return false;
			};
	
			this.checkDataUrlProperties = function () {
				if (defaults.url === "list-required" && defaults.data === "list-required") {
					return false;
				}
				return true;
			};
			this.checkRequiredProperties = function () {
				for (var propertyName in defaults) {
					if (defaults[propertyName] === "required") {
						logger.error("Option " + propertyName + " must be defined");
						return false;
					}
				}
				return true;
			};
	
			this.printPropertiesThatDoesntExist = function (consol, optionsToCheck) {
				printPropertiesThatDoesntExist(consol, optionsToCheck);
			};
	
			prepareDefaults();
	
			mergeOptions();
	
			if (defaults.loggerEnabled === true) {
				printPropertiesThatDoesntExist(console, options);
			}
	
			addAjaxSettings();
	
			processAfterMerge();
			function prepareDefaults() {
	
				if (options.dataType === "xml") {
	
					if (!options.getValue) {
	
						options.getValue = function (element) {
							return $(element).text();
						};
					}
	
					if (!options.list) {
	
						options.list = {};
					}
	
					if (!options.list.sort) {
						options.list.sort = {};
					}
	
					options.list.sort.method = function (a, b) {
						a = options.getValue(a);
						b = options.getValue(b);
						if (a < b) {
							return -1;
						}
						if (a > b) {
							return 1;
						}
						return 0;
					};
	
					if (!options.list.match) {
						options.list.match = {};
					}
	
					options.list.match.method = function (element, phrase) {
	
						if (element.search(phrase) > -1) {
							return true;
						} else {
							return false;
						}
					};
				}
				if (options.categories !== undefined && options.categories instanceof Array) {
	
					var categories = [];
	
					for (var i = 0, length = options.categories.length; i < length; i += 1) {
	
						var category = options.categories[i];
	
						for (var property in defaults.categories[0]) {
	
							if (category[property] === undefined) {
								category[property] = defaults.categories[0][property];
							}
						}
	
						categories.push(category);
					}
	
					options.categories = categories;
				}
			}
	
			function mergeOptions() {
	
				defaults = mergeObjects(defaults, options);
	
				function mergeObjects(source, target) {
					var mergedObject = source || {};
	
					for (var propertyName in source) {
						if (target[propertyName] !== undefined && target[propertyName] !== null) {
	
							if ((0, _typeof3.default)(target[propertyName]) !== "object" || target[propertyName] instanceof Array) {
								mergedObject[propertyName] = target[propertyName];
							} else {
								mergeObjects(source[propertyName], target[propertyName]);
							}
						}
					}
	
					/* If data is an object */
					if (target.data !== undefined && target.data !== null && (0, _typeof3.default)(target.data) === "object") {
						mergedObject.data = target.data;
					}
	
					return mergedObject;
				}
			}
	
			function processAfterMerge() {
	
				if (defaults.url !== "list-required" && typeof defaults.url !== "function") {
					var defaultUrl = defaults.url;
					defaults.url = function () {
						return defaultUrl;
					};
				}
	
				if (defaults.ajaxSettings.url !== undefined && typeof defaults.ajaxSettings.url !== "function") {
					var defaultUrl = defaults.ajaxSettings.url;
					defaults.ajaxSettings.url = function () {
						return defaultUrl;
					};
				}
	
				if (typeof defaults.listLocation === "string") {
					var defaultlistLocation = defaults.listLocation;
	
					if (defaults.dataType.toUpperCase() === "XML") {
						defaults.listLocation = function (data) {
							return $(data).find(defaultlistLocation);
						};
					} else {
						defaults.listLocation = function (data) {
							return data[defaultlistLocation];
						};
					}
				}
	
				if (typeof defaults.getValue === "string") {
					var defaultsGetValue = defaults.getValue;
					defaults.getValue = function (element) {
						return element[defaultsGetValue];
					};
				}
	
				if (options.categories !== undefined) {
					defaults.categoriesAssigned = true;
				}
			}
	
			function addAjaxSettings() {
	
				if (options.ajaxSettings !== undefined && (0, _typeof3.default)(options.ajaxSettings) === "object") {
					defaults.ajaxSettings = options.ajaxSettings;
				} else {
					defaults.ajaxSettings = {};
				}
			}
	
			function isAssigned(name) {
				if (defaults[name] !== undefined && defaults[name] !== null) {
					return true;
				} else {
					return false;
				}
			}
			function printPropertiesThatDoesntExist(consol, optionsToCheck) {
	
				checkPropertiesIfExist(defaults, optionsToCheck);
	
				function checkPropertiesIfExist(source, target) {
					for (var property in target) {
						if (source[property] === undefined) {
							consol.log("Property '" + property + "' does not exist in EasyAutocomplete options API.");
						}
	
						if ((0, _typeof3.default)(source[property]) === "object" && $.inArray(property, externalObjects) === -1) {
							checkPropertiesIfExist(source[property], target[property]);
						}
					}
				}
			}
		};
	
		return scope;
	}(EasyAutocomplete || {});
	
	/*
	 * EasyAutocomplete - Logger 
	 */
	var EasyAutocomplete = function (scope) {
	
		scope.Logger = function Logger() {
	
			this.error = function (message) {
				console.log("ERROR: " + message);
			};
	
			this.warning = function (message) {
				console.log("WARNING: " + message);
			};
		};
	
		return scope;
	}(EasyAutocomplete || {});
	
	/*
	 * EasyAutocomplete - Constans
	 */
	var EasyAutocomplete = function (scope) {
	
		scope.Constans = function Constans() {
			var constants = {
				CONTAINER_CLASS: "easy-autocomplete-container",
				CONTAINER_ID: "eac-container-",
	
				WRAPPER_CSS_CLASS: "easy-autocomplete"
			};
	
			this.getValue = function (propertyName) {
				return constants[propertyName];
			};
		};
	
		return scope;
	}(EasyAutocomplete || {});
	
	/*
	 * EasyAutocomplete - ListBuilderService 
	 *
	 * @author Łukasz Pawełczak 
	 *
	 */
	var EasyAutocomplete = function (scope) {
	
		scope.ListBuilderService = function ListBuilderService(configuration, proccessResponseData) {
	
			this.init = function (data) {
				var listBuilder = [],
				    builder = {};
	
				builder.data = configuration.get("listLocation")(data);
				builder.getValue = configuration.get("getValue");
				builder.maxListSize = configuration.get("list").maxNumberOfElements;
	
				listBuilder.push(builder);
	
				return listBuilder;
			};
	
			this.updateCategories = function (listBuilder, data) {
	
				if (configuration.get("categoriesAssigned")) {
	
					listBuilder = [];
	
					for (var i = 0; i < configuration.get("categories").length; i += 1) {
	
						var builder = convertToListBuilder(configuration.get("categories")[i], data);
	
						listBuilder.push(builder);
					}
				}
	
				return listBuilder;
			};
	
			this.convertXml = function (listBuilder) {
				if (configuration.get("dataType").toUpperCase() === "XML") {
	
					for (var i = 0; i < listBuilder.length; i += 1) {
						listBuilder[i].data = convertXmlToList(listBuilder[i]);
					}
				}
	
				return listBuilder;
			};
	
			this.processData = function (listBuilder, inputPhrase) {
	
				for (var i = 0, length = listBuilder.length; i < length; i += 1) {
					listBuilder[i].data = proccessResponseData(configuration, listBuilder[i], inputPhrase);
				}
	
				return listBuilder;
			};
	
			this.checkIfDataExists = function (listBuilders) {
	
				for (var i = 0, length = listBuilders.length; i < length; i += 1) {
	
					if (listBuilders[i].data !== undefined && listBuilders[i].data instanceof Array) {
						if (listBuilders[i].data.length > 0) {
							return true;
						}
					}
				}
	
				return false;
			};
	
			function convertToListBuilder(category, data) {
	
				var builder = {};
	
				if (configuration.get("dataType").toUpperCase() === "XML") {
	
					builder = convertXmlToListBuilder();
				} else {
	
					builder = convertDataToListBuilder();
				}
	
				if (category.header !== undefined) {
					builder.header = category.header;
				}
	
				if (category.maxNumberOfElements !== undefined) {
					builder.maxNumberOfElements = category.maxNumberOfElements;
				}
	
				if (configuration.get("list").maxNumberOfElements !== undefined) {
	
					builder.maxListSize = configuration.get("list").maxNumberOfElements;
				}
	
				if (category.getValue !== undefined) {
	
					if (typeof category.getValue === "string") {
						var defaultsGetValue = category.getValue;
						builder.getValue = function (element) {
							return element[defaultsGetValue];
						};
					} else if (typeof category.getValue === "function") {
						builder.getValue = category.getValue;
					}
				} else {
					builder.getValue = configuration.get("getValue");
				}
	
				return builder;
	
				function convertXmlToListBuilder() {
	
					var builder = {},
					    listLocation;
	
					if (category.xmlElementName !== undefined) {
						builder.xmlElementName = category.xmlElementName;
					}
	
					if (category.listLocation !== undefined) {
	
						listLocation = category.listLocation;
					} else if (configuration.get("listLocation") !== undefined) {
	
						listLocation = configuration.get("listLocation");
					}
	
					if (listLocation !== undefined) {
						if (typeof listLocation === "string") {
							builder.data = $(data).find(listLocation);
						} else if (typeof listLocation === "function") {
	
							builder.data = listLocation(data);
						}
					} else {
	
						builder.data = data;
					}
	
					return builder;
				}
	
				function convertDataToListBuilder() {
	
					var builder = {};
	
					if (category.listLocation !== undefined) {
	
						if (typeof category.listLocation === "string") {
							builder.data = data[category.listLocation];
						} else if (typeof category.listLocation === "function") {
							builder.data = category.listLocation(data);
						}
					} else {
						builder.data = data;
					}
	
					return builder;
				}
			}
	
			function convertXmlToList(builder) {
				var simpleList = [];
	
				if (builder.xmlElementName === undefined) {
					builder.xmlElementName = configuration.get("xmlElementName");
				}
	
				$(builder.data).find(builder.xmlElementName).each(function () {
					simpleList.push(this);
				});
	
				return simpleList;
			}
		};
	
		return scope;
	}(EasyAutocomplete || {});
	
	/*
	 * EasyAutocomplete - Data proccess module
	 *
	 * Process list to display:
	 * - sort 
	 * - decrease number to specific number
	 * - show only matching list
	 *
	 */
	var EasyAutocomplete = function (scope) {
	
		scope.proccess = function proccessData(config, listBuilder, phrase) {
	
			scope.proccess.match = match;
	
			var list = listBuilder.data,
			    inputPhrase = phrase; //TODO REFACTOR
	
			list = findMatch(list, inputPhrase);
			list = reduceElementsInList(list);
			list = sort(list);
	
			return list;
	
			function findMatch(list, phrase) {
				var preparedList = [],
				    value = "";
	
				if (config.get("list").match.enabled) {
	
					for (var i = 0, length = list.length; i < length; i += 1) {
	
						value = config.get("getValue")(list[i]);
	
						if (match(value, phrase)) {
							preparedList.push(list[i]);
						}
					}
				} else {
					preparedList = list;
				}
	
				return preparedList;
			}
	
			function match(value, phrase) {
	
				if (!config.get("list").match.caseSensitive) {
	
					if (typeof value === "string") {
						value = value.toLowerCase();
					}
	
					phrase = phrase.toLowerCase();
				}
				if (config.get("list").match.method(value, phrase)) {
					return true;
				} else {
					return false;
				}
			}
	
			function reduceElementsInList(list) {
				if (listBuilder.maxNumberOfElements !== undefined && list.length > listBuilder.maxNumberOfElements) {
					list = list.slice(0, listBuilder.maxNumberOfElements);
				}
	
				return list;
			}
	
			function sort(list) {
				if (config.get("list").sort.enabled) {
					list.sort(config.get("list").sort.method);
				}
	
				return list;
			}
		};
	
		return scope;
	}(EasyAutocomplete || {});
	
	/*
	 * EasyAutocomplete - Template 
	 *
	 * 
	 *
	 */
	var EasyAutocomplete = function (scope) {
	
		scope.Template = function Template(options) {
	
			var genericTemplates = {
				basic: {
					type: "basic",
					method: function method(element) {
						return element;
					},
					cssClass: ""
				},
				description: {
					type: "description",
					fields: {
						description: "description"
					},
					method: function method(element) {
						return element + " - description";
					},
					cssClass: "eac-description"
				},
				iconLeft: {
					type: "iconLeft",
					fields: {
						icon: ""
					},
					method: function method(element) {
						return element;
					},
					cssClass: "eac-icon-left"
				},
				iconRight: {
					type: "iconRight",
					fields: {
						iconSrc: ""
					},
					method: function method(element) {
						return element;
					},
					cssClass: "eac-icon-right"
				},
				links: {
					type: "links",
					fields: {
						link: ""
					},
					method: function method(element) {
						return element;
					},
					cssClass: ""
				},
				custom: {
					type: "custom",
					method: function method() {},
					cssClass: ""
				}
			},
	
	
			/*
	   * Converts method with {{text}} to function
	   */
			convertTemplateToMethod = function convertTemplateToMethod(template) {
	
				var _fields = template.fields,
				    buildMethod;
	
				if (template.type === "description") {
	
					buildMethod = genericTemplates.description.method;
	
					if (typeof _fields.description === "string") {
						buildMethod = function buildMethod(elementValue, element) {
							return elementValue + " - <span>" + element[_fields.description] + "</span>";
						};
					} else if (typeof _fields.description === "function") {
						buildMethod = function buildMethod(elementValue, element) {
							return elementValue + " - <span>" + _fields.description(element) + "</span>";
						};
					}
	
					return buildMethod;
				}
	
				if (template.type === "iconRight") {
	
					if (typeof _fields.iconSrc === "string") {
						buildMethod = function buildMethod(elementValue, element) {
							return elementValue + "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />";
						};
					} else if (typeof _fields.iconSrc === "function") {
						buildMethod = function buildMethod(elementValue, element) {
							return elementValue + "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />";
						};
					}
	
					return buildMethod;
				}
	
				if (template.type === "iconLeft") {
	
					if (typeof _fields.iconSrc === "string") {
						buildMethod = function buildMethod(elementValue, element) {
							return "<img class='eac-icon' src='" + element[_fields.iconSrc] + "' />" + elementValue;
						};
					} else if (typeof _fields.iconSrc === "function") {
						buildMethod = function buildMethod(elementValue, element) {
							return "<img class='eac-icon' src='" + _fields.iconSrc(element) + "' />" + elementValue;
						};
					}
	
					return buildMethod;
				}
	
				if (template.type === "links") {
	
					if (typeof _fields.link === "string") {
						buildMethod = function buildMethod(elementValue, element) {
							return "<a href='" + element[_fields.link] + "' >" + elementValue + "</a>";
						};
					} else if (typeof _fields.link === "function") {
						buildMethod = function buildMethod(elementValue, element) {
							return "<a href='" + _fields.link(element) + "' >" + elementValue + "</a>";
						};
					}
	
					return buildMethod;
				}
	
				if (template.type === "custom") {
	
					return template.method;
				}
	
				return genericTemplates.basic.method;
			},
			    prepareBuildMethod = function prepareBuildMethod(options) {
				if (!options || !options.type) {
	
					return genericTemplates.basic.method;
				}
	
				if (options.type && genericTemplates[options.type]) {
	
					return convertTemplateToMethod(options);
				} else {
	
					return genericTemplates.basic.method;
				}
			},
			    templateClass = function templateClass(options) {
				var emptyStringFunction = function emptyStringFunction() {
					return "";
				};
	
				if (!options || !options.type) {
	
					return emptyStringFunction;
				}
	
				if (options.type && genericTemplates[options.type]) {
					return function () {
						var _cssClass = genericTemplates[options.type].cssClass;
						return function () {
							return _cssClass;
						};
					}();
				} else {
					return emptyStringFunction;
				}
			};
	
			this.getTemplateClass = templateClass(options);
	
			this.build = prepareBuildMethod(options);
		};
	
		return scope;
	}(EasyAutocomplete || {});
	
	/*
	 * EasyAutocomplete - jQuery plugin for autocompletion
	 *
	 */
	var EasyAutocomplete = function (scope) {
	
		scope.main = function Core($input, options) {
	
			var module = {
				name: "EasyAutocomplete",
				shortcut: "eac"
			};
	
			var consts = new scope.Constans(),
			    config = new scope.Configuration(options),
			    logger = new scope.Logger(),
			    template = new scope.Template(options.template),
			    listBuilderService = new scope.ListBuilderService(config, scope.proccess),
			    checkParam = config.equals,
			    $field = $input,
			    $container = "",
			    elementsList = [],
			    selectedElement = -1,
			    requestDelayTimeoutId;
	
			scope.consts = consts;
	
			this.getConstants = function () {
				return consts;
			};
	
			this.getConfiguration = function () {
				return config;
			};
	
			this.getContainer = function () {
				return $container;
			};
	
			this.getSelectedItemIndex = function () {
				return selectedElement;
			};
	
			this.getItems = function () {
				return elementsList;
			};
	
			this.getItemData = function (index) {
	
				if (elementsList.length < index || elementsList[index] === undefined) {
					return -1;
				} else {
					return elementsList[index];
				}
			};
	
			this.getSelectedItemData = function () {
				return this.getItemData(selectedElement);
			};
	
			this.build = function () {
				prepareField();
			};
	
			this.init = function () {
				init();
			};
			function init() {
	
				if ($field.length === 0) {
					logger.error("Input field doesn't exist.");
					return;
				}
	
				if (!config.checkDataUrlProperties()) {
					logger.error("One of options variables 'data' or 'url' must be defined.");
					return;
				}
	
				if (!config.checkRequiredProperties()) {
					logger.error("Will not work without mentioned properties.");
					return;
				}
	
				prepareField();
				bindEvents();
			}
			function prepareField() {
	
				if ($field.parent().hasClass(consts.getValue("WRAPPER_CSS_CLASS"))) {
					removeContainer();
					removeWrapper();
				}
	
				createWrapper();
				createContainer();
	
				$container = $("#" + getContainerId());
				if (config.get("placeholder")) {
					$field.attr("placeholder", config.get("placeholder"));
				}
	
				function createWrapper() {
					var $wrapper = $("<div>"),
					    classes = consts.getValue("WRAPPER_CSS_CLASS");
	
					if (config.get("theme") && config.get("theme") !== "") {
						classes += " eac-" + config.get("theme");
					}
	
					if (config.get("cssClasses") && config.get("cssClasses") !== "") {
						classes += " " + config.get("cssClasses");
					}
	
					if (template.getTemplateClass() !== "") {
						classes += " " + template.getTemplateClass();
					}
	
					$wrapper.addClass(classes);
					$field.wrap($wrapper);
	
					if (config.get("adjustWidth") === true) {
						adjustWrapperWidth();
					}
				}
	
				function adjustWrapperWidth() {
					var fieldWidth = $field.outerWidth();
	
					$field.parent().css("width", fieldWidth);
				}
	
				function removeWrapper() {
					$field.unwrap();
				}
	
				function createContainer() {
					var $elements_container = $("<div>").addClass(consts.getValue("CONTAINER_CLASS"));
	
					$elements_container.attr("id", getContainerId()).prepend($("<ul>"));
	
					(function () {
	
						$elements_container
						/* List show animation */
						.on("show.eac", function () {
	
							switch (config.get("list").showAnimation.type) {
	
								case "slide":
									var animationTime = config.get("list").showAnimation.time,
									    callback = config.get("list").showAnimation.callback;
	
									$elements_container.find("ul").slideDown(animationTime, callback);
									break;
	
								case "fade":
									var animationTime = config.get("list").showAnimation.time,
									    callback = config.get("list").showAnimation.callback;
	
									$elements_container.find("ul").fadeIn(animationTime), callback;
									break;
	
								default:
									$elements_container.find("ul").show();
									break;
							}
	
							config.get("list").onShowListEvent();
						})
						/* List hide animation */
						.on("hide.eac", function () {
	
							switch (config.get("list").hideAnimation.type) {
	
								case "slide":
									var animationTime = config.get("list").hideAnimation.time,
									    callback = config.get("list").hideAnimation.callback;
	
									$elements_container.find("ul").slideUp(animationTime, callback);
									break;
	
								case "fade":
									var animationTime = config.get("list").hideAnimation.time,
									    callback = config.get("list").hideAnimation.callback;
	
									$elements_container.find("ul").fadeOut(animationTime, callback);
									break;
	
								default:
									$elements_container.find("ul").hide();
									break;
							}
	
							config.get("list").onHideListEvent();
						}).on("selectElement.eac", function () {
							$elements_container.find("ul li").removeClass("selected");
							$elements_container.find("ul li").eq(selectedElement).addClass("selected");
	
							config.get("list").onSelectItemEvent();
						}).on("loadElements.eac", function (event, listBuilders, phrase) {
	
							var $item = "",
							    $listContainer = $elements_container.find("ul");
	
							$listContainer.empty().detach();
	
							elementsList = [];
							var counter = 0;
							for (var builderIndex = 0, listBuildersLength = listBuilders.length; builderIndex < listBuildersLength; builderIndex += 1) {
	
								var listData = listBuilders[builderIndex].data;
	
								if (listData.length === 0) {
									continue;
								}
	
								if (listBuilders[builderIndex].header !== undefined && listBuilders[builderIndex].header.length > 0) {
									$listContainer.append("<div class='eac-category' >" + listBuilders[builderIndex].header + "</div>");
								}
	
								for (var i = 0, listDataLength = listData.length; i < listDataLength && counter < listBuilders[builderIndex].maxListSize; i += 1) {
									$item = $("<li><div class='eac-item'></div></li>");
	
									(function () {
										var j = i,
										    itemCounter = counter,
										    elementsValue = listBuilders[builderIndex].getValue(listData[j]);
	
										$item.find(" > div").on("click", function () {
	
											$field.val(elementsValue).trigger("change");
	
											selectedElement = itemCounter;
											selectElement(itemCounter);
	
											config.get("list").onClickEvent();
											config.get("list").onChooseEvent();
										}).mouseover(function () {
	
											selectedElement = itemCounter;
											selectElement(itemCounter);
	
											config.get("list").onMouseOverEvent();
										}).mouseout(function () {
											config.get("list").onMouseOutEvent();
										}).html(template.build(highlight(elementsValue, phrase), listData[j]));
									})();
	
									$listContainer.append($item);
									elementsList.push(listData[i]);
									counter += 1;
								}
							}
	
							$elements_container.append($listContainer);
	
							config.get("list").onLoadEvent();
						});
					})();
	
					$field.after($elements_container);
				}
	
				function removeContainer() {
					$field.next("." + consts.getValue("CONTAINER_CLASS")).remove();
				}
	
				function highlight(string, phrase) {
	
					if (config.get("highlightPhrase") && phrase !== "") {
						return highlightPhrase(string, phrase);
					} else {
						return string;
					}
				}
	
				function escapeRegExp(str) {
					return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
				}
	
				function highlightPhrase(string, phrase) {
					var escapedPhrase = escapeRegExp(phrase);
					return (string + "").replace(new RegExp("(" + escapedPhrase + ")", "gi"), "<b>$1</b>");
				}
			}
			function getContainerId() {
	
				var elementId = $field.attr("id");
	
				elementId = consts.getValue("CONTAINER_ID") + elementId;
	
				return elementId;
			}
			function bindEvents() {
	
				bindAllEvents();
	
				function bindAllEvents() {
					if (checkParam("autocompleteOff", true)) {
						removeAutocomplete();
					}
	
					bindFocusOut();
					bindKeyup();
					bindKeydown();
					bindKeypress();
					bindFocus();
					bindBlur();
				}
	
				function bindFocusOut() {
					$field.focusout(function () {
	
						var fieldValue = $field.val(),
						    phrase;
	
						if (!config.get("list").match.caseSensitive) {
							fieldValue = fieldValue.toLowerCase();
						}
	
						for (var i = 0, length = elementsList.length; i < length; i += 1) {
	
							phrase = config.get("getValue")(elementsList[i]);
							if (!config.get("list").match.caseSensitive) {
								phrase = phrase.toLowerCase();
							}
	
							if (phrase === fieldValue) {
								selectedElement = i;
								selectElement(selectedElement);
								return;
							}
						}
					});
				}
	
				function bindKeyup() {
					$field.off("keyup").keyup(function (event) {
	
						switch (event.keyCode) {
	
							case 27:
	
								hideContainer();
								loseFieldFocus();
								break;
	
							case 38:
	
								event.preventDefault();
	
								if (elementsList.length > 0 && selectedElement > 0) {
	
									selectedElement -= 1;
	
									$field.val(config.get("getValue")(elementsList[selectedElement]));
	
									selectElement(selectedElement);
								}
								break;
	
							case 40:
	
								event.preventDefault();
	
								if (elementsList.length > 0 && selectedElement < elementsList.length - 1) {
	
									selectedElement += 1;
	
									$field.val(config.get("getValue")(elementsList[selectedElement]));
	
									selectElement(selectedElement);
								}
	
								break;
	
							default:
	
								if (event.keyCode > 40 || event.keyCode === 8) {
	
									var inputPhrase = $field.val();
	
									if (!(config.get("list").hideOnEmptyPhrase === true && event.keyCode === 8 && inputPhrase === "")) {
	
										if (config.get("requestDelay") > 0) {
											if (requestDelayTimeoutId !== undefined) {
												clearTimeout(requestDelayTimeoutId);
											}
	
											requestDelayTimeoutId = setTimeout(function () {
												loadData(inputPhrase);
											}, config.get("requestDelay"));
										} else {
											loadData(inputPhrase);
										}
									} else {
										hideContainer();
									}
								}
	
								break;
						}
	
						function loadData(inputPhrase) {
	
							if (inputPhrase.length < config.get("minCharNumber")) {
								return;
							}
	
							if (config.get("data") !== "list-required") {
	
								var data = config.get("data");
	
								var listBuilders = listBuilderService.init(data);
	
								listBuilders = listBuilderService.updateCategories(listBuilders, data);
	
								listBuilders = listBuilderService.processData(listBuilders, inputPhrase);
	
								loadElements(listBuilders, inputPhrase);
	
								if ($field.parent().find("li").length > 0) {
									showContainer();
								} else {
									hideContainer();
								}
							}
	
							var settings = createAjaxSettings();
	
							if (settings.url === undefined || settings.url === "") {
								settings.url = config.get("url");
							}
	
							if (settings.dataType === undefined || settings.dataType === "") {
								settings.dataType = config.get("dataType");
							}
	
							if (settings.url !== undefined && settings.url !== "list-required") {
	
								settings.url = settings.url(inputPhrase);
	
								settings.data = config.get("preparePostData")(settings.data, inputPhrase);
	
								$.ajax(settings).done(function (data) {
	
									var listBuilders = listBuilderService.init(data);
	
									listBuilders = listBuilderService.updateCategories(listBuilders, data);
	
									listBuilders = listBuilderService.convertXml(listBuilders);
									if (checkInputPhraseMatchResponse(inputPhrase, data)) {
	
										listBuilders = listBuilderService.processData(listBuilders, inputPhrase);
	
										loadElements(listBuilders, inputPhrase);
									}
	
									if (listBuilderService.checkIfDataExists(listBuilders) && $field.parent().find("li").length > 0) {
										showContainer();
									} else {
										hideContainer();
									}
	
									config.get("ajaxCallback")();
								}).fail(function () {
									logger.warning("Fail to load response data");
								}).always(function () {});
							}
	
							function createAjaxSettings() {
	
								var settings = {},
								    ajaxSettings = config.get("ajaxSettings") || {};
	
								for (var set in ajaxSettings) {
									settings[set] = ajaxSettings[set];
								}
	
								return settings;
							}
	
							function checkInputPhraseMatchResponse(inputPhrase, data) {
	
								if (config.get("matchResponseProperty") !== false) {
									if (typeof config.get("matchResponseProperty") === "string") {
										return data[config.get("matchResponseProperty")] === inputPhrase;
									}
	
									if (typeof config.get("matchResponseProperty") === "function") {
										return config.get("matchResponseProperty")(data) === inputPhrase;
									}
	
									return true;
								} else {
									return true;
								}
							}
						}
					});
				}
	
				function bindKeydown() {
					$field.on("keydown", function (evt) {
						evt = evt || window.event;
						var keyCode = evt.keyCode;
						if (keyCode === 38) {
							suppressKeypress = true;
							return false;
						}
					}).keydown(function (event) {
	
						if (event.keyCode === 13 && selectedElement > -1) {
	
							$field.val(config.get("getValue")(elementsList[selectedElement]));
	
							config.get("list").onKeyEnterEvent();
							config.get("list").onChooseEvent();
	
							selectedElement = -1;
							hideContainer();
	
							event.preventDefault();
						}
					});
				}
	
				function bindKeypress() {
					$field.off("keypress");
				}
	
				function bindFocus() {
					$field.focus(function () {
	
						if ($field.val() !== "" && elementsList.length > 0) {
	
							selectedElement = -1;
							showContainer();
						}
					});
				}
	
				function bindBlur() {
					$field.blur(function () {
						setTimeout(function () {
	
							selectedElement = -1;
							hideContainer();
						}, 250);
					});
				}
	
				function removeAutocomplete() {
					$field.attr("autocomplete", "off");
				}
			}
	
			function showContainer() {
				$container.trigger("show.eac");
			}
	
			function hideContainer() {
				$container.trigger("hide.eac");
			}
	
			function selectElement(index) {
	
				$container.trigger("selectElement.eac", index);
			}
	
			function loadElements(list, phrase) {
				$container.trigger("loadElements.eac", [list, phrase]);
			}
	
			function loseFieldFocus() {
				$field.trigger("blur");
			}
		};
		scope.eacHandles = [];
	
		scope.getHandle = function (id) {
			return scope.eacHandles[id];
		};
	
		scope.inputHasId = function (input) {
	
			if ($(input).attr("id") !== undefined && $(input).attr("id").length > 0) {
				return true;
			} else {
				return false;
			}
		};
	
		scope.assignRandomId = function (input) {
	
			var fieldId = "";
	
			do {
				fieldId = "eac-" + Math.floor(Math.random() * 10000);
			} while ($("#" + fieldId).length !== 0);
	
			elementId = scope.consts.getValue("CONTAINER_ID") + fieldId;
	
			$(input).attr("id", fieldId);
		};
	
		scope.setHandle = function (handle, id) {
			scope.eacHandles[id] = handle;
		};
	
		return scope;
	}(EasyAutocomplete || {});
	
	(function ($) {
	
		$.fn.easyAutocomplete = function (options) {
	
			return this.each(function () {
				var $this = $(this),
				    eacHandle = new EasyAutocomplete.main($this, options);
	
				if (!EasyAutocomplete.inputHasId($this)) {
					EasyAutocomplete.assignRandomId($this);
				}
	
				eacHandle.init();
	
				EasyAutocomplete.setHandle(eacHandle, $this.attr("id"));
			});
		};
	
		$.fn.getSelectedItemIndex = function () {
	
			var inputId = $(this).attr("id");
	
			if (inputId !== undefined) {
				return EasyAutocomplete.getHandle(inputId).getSelectedItemIndex();
			}
	
			return -1;
		};
	
		$.fn.getItems = function () {
	
			var inputId = $(this).attr("id");
	
			if (inputId !== undefined) {
				return EasyAutocomplete.getHandle(inputId).getItems();
			}
	
			return -1;
		};
	
		$.fn.getItemData = function (index) {
	
			var inputId = $(this).attr("id");
	
			if (inputId !== undefined && index > -1) {
				return EasyAutocomplete.getHandle(inputId).getItemData(index);
			}
	
			return -1;
		};
	
		$.fn.getSelectedItemData = function () {
	
			var inputId = $(this).attr("id");
	
			if (inputId !== undefined) {
				return EasyAutocomplete.getHandle(inputId).getSelectedItemData();
			}
	
			return -1;
		};
	})(jQuery);

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof2 = __webpack_require__(5);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*! nanoScrollerJS - v0.8.7 - 2015
	* http://jamesflorentino.github.com/nanoScrollerJS/
	* Copyright (c) 2015 James Florentino; Licensed MIT */
	(function (factory) {
	  if (true) {
	    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
	      return factory($, window, document);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object') {
	    return module.exports = factory(require('jquery'), window, document);
	  } else {
	    return factory(jQuery, window, document);
	  }
	})(function ($, window, document) {
	  "use strict";
	
	  var BROWSER_IS_IE7, BROWSER_SCROLLBAR_WIDTH, DOMSCROLL, DOWN, DRAG, ENTER, KEYDOWN, KEYUP, MOUSEDOWN, MOUSEENTER, MOUSEMOVE, MOUSEUP, MOUSEWHEEL, NanoScroll, PANEDOWN, RESIZE, SCROLL, SCROLLBAR, TOUCHMOVE, UP, WHEEL, cAF, defaults, getBrowserScrollbarWidth, hasTransform, isFFWithBuggyScrollbar, rAF, transform, _elementStyle, _prefixStyle, _vendor;
	  defaults = {
	
	    /**
	      a classname for the pane element.
	      @property paneClass
	      @type String
	      @default 'nano-pane'
	     */
	    paneClass: 'nano-pane',
	
	    /**
	      a classname for the slider element.
	      @property sliderClass
	      @type String
	      @default 'nano-slider'
	     */
	    sliderClass: 'nano-slider',
	
	    /**
	      a classname for the content element.
	      @property contentClass
	      @type String
	      @default 'nano-content'
	     */
	    contentClass: 'nano-content',
	
	    /**
	      a classname for enabled mode
	      @property enabledClass
	      @type String
	      @default 'has-scrollbar'
	     */
	    enabledClass: 'has-scrollbar',
	
	    /**
	      a classname for flashed mode
	      @property flashedClass
	      @type String
	      @default 'flashed'
	     */
	    flashedClass: 'flashed',
	
	    /**
	      a classname for active mode
	      @property activeClass
	      @type String
	      @default 'active'
	     */
	    activeClass: 'active',
	
	    /**
	      a setting to enable native scrolling in iOS devices.
	      @property iOSNativeScrolling
	      @type Boolean
	      @default false
	     */
	    iOSNativeScrolling: false,
	
	    /**
	      a setting to prevent the rest of the page being
	      scrolled when user scrolls the `.content` element.
	      @property preventPageScrolling
	      @type Boolean
	      @default false
	     */
	    preventPageScrolling: false,
	
	    /**
	      a setting to disable binding to the resize event.
	      @property disableResize
	      @type Boolean
	      @default false
	     */
	    disableResize: false,
	
	    /**
	      a setting to make the scrollbar always visible.
	      @property alwaysVisible
	      @type Boolean
	      @default false
	     */
	    alwaysVisible: false,
	
	    /**
	      a default timeout for the `flash()` method.
	      @property flashDelay
	      @type Number
	      @default 1500
	     */
	    flashDelay: 1500,
	
	    /**
	      a minimum height for the `.slider` element.
	      @property sliderMinHeight
	      @type Number
	      @default 20
	     */
	    sliderMinHeight: 20,
	
	    /**
	      a maximum height for the `.slider` element.
	      @property sliderMaxHeight
	      @type Number
	      @default null
	     */
	    sliderMaxHeight: null,
	
	    /**
	      an alternate document context.
	      @property documentContext
	      @type Document
	      @default null
	     */
	    documentContext: null,
	
	    /**
	      an alternate window context.
	      @property windowContext
	      @type Window
	      @default null
	     */
	    windowContext: null
	  };
	
	  /**
	    @property SCROLLBAR
	    @type String
	    @static
	    @final
	    @private
	   */
	  SCROLLBAR = 'scrollbar';
	
	  /**
	    @property SCROLL
	    @type String
	    @static
	    @final
	    @private
	   */
	  SCROLL = 'scroll';
	
	  /**
	    @property MOUSEDOWN
	    @type String
	    @final
	    @private
	   */
	  MOUSEDOWN = 'mousedown';
	
	  /**
	    @property MOUSEENTER
	    @type String
	    @final
	    @private
	   */
	  MOUSEENTER = 'mouseenter';
	
	  /**
	    @property MOUSEMOVE
	    @type String
	    @static
	    @final
	    @private
	   */
	  MOUSEMOVE = 'mousemove';
	
	  /**
	    @property MOUSEWHEEL
	    @type String
	    @final
	    @private
	   */
	  MOUSEWHEEL = 'mousewheel';
	
	  /**
	    @property MOUSEUP
	    @type String
	    @static
	    @final
	    @private
	   */
	  MOUSEUP = 'mouseup';
	
	  /**
	    @property RESIZE
	    @type String
	    @final
	    @private
	   */
	  RESIZE = 'resize';
	
	  /**
	    @property DRAG
	    @type String
	    @static
	    @final
	    @private
	   */
	  DRAG = 'drag';
	
	  /**
	    @property ENTER
	    @type String
	    @static
	    @final
	    @private
	   */
	  ENTER = 'enter';
	
	  /**
	    @property UP
	    @type String
	    @static
	    @final
	    @private
	   */
	  UP = 'up';
	
	  /**
	    @property PANEDOWN
	    @type String
	    @static
	    @final
	    @private
	   */
	  PANEDOWN = 'panedown';
	
	  /**
	    @property DOMSCROLL
	    @type String
	    @static
	    @final
	    @private
	   */
	  DOMSCROLL = 'DOMMouseScroll';
	
	  /**
	    @property DOWN
	    @type String
	    @static
	    @final
	    @private
	   */
	  DOWN = 'down';
	
	  /**
	    @property WHEEL
	    @type String
	    @static
	    @final
	    @private
	   */
	  WHEEL = 'wheel';
	
	  /**
	    @property KEYDOWN
	    @type String
	    @static
	    @final
	    @private
	   */
	  KEYDOWN = 'keydown';
	
	  /**
	    @property KEYUP
	    @type String
	    @static
	    @final
	    @private
	   */
	  KEYUP = 'keyup';
	
	  /**
	    @property TOUCHMOVE
	    @type String
	    @static
	    @final
	    @private
	   */
	  TOUCHMOVE = 'touchmove';
	
	  /**
	    @property BROWSER_IS_IE7
	    @type Boolean
	    @static
	    @final
	    @private
	   */
	  BROWSER_IS_IE7 = window.navigator.appName === 'Microsoft Internet Explorer' && /msie 7./i.test(window.navigator.appVersion) && window.ActiveXObject;
	
	  /**
	    @property BROWSER_SCROLLBAR_WIDTH
	    @type Number
	    @static
	    @default null
	    @private
	   */
	  BROWSER_SCROLLBAR_WIDTH = null;
	  rAF = window.requestAnimationFrame;
	  cAF = window.cancelAnimationFrame;
	  _elementStyle = document.createElement('div').style;
	  _vendor = function () {
	    var i, transform, vendor, vendors, _i, _len;
	    vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
	    for (i = _i = 0, _len = vendors.length; _i < _len; i = ++_i) {
	      vendor = vendors[i];
	      transform = vendors[i] + 'ransform';
	      if (transform in _elementStyle) {
	        return vendors[i].substr(0, vendors[i].length - 1);
	      }
	    }
	    return false;
	  }();
	  _prefixStyle = function _prefixStyle(style) {
	    if (_vendor === false) {
	      return false;
	    }
	    if (_vendor === '') {
	      return style;
	    }
	    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	  };
	  transform = _prefixStyle('transform');
	  hasTransform = transform !== false;
	
	  /**
	    Returns browser's native scrollbar width
	    @method getBrowserScrollbarWidth
	    @return {Number} the scrollbar width in pixels
	    @static
	    @private
	   */
	  getBrowserScrollbarWidth = function getBrowserScrollbarWidth() {
	    var outer, outerStyle, scrollbarWidth;
	    outer = document.createElement('div');
	    outerStyle = outer.style;
	    outerStyle.position = 'absolute';
	    outerStyle.width = '100px';
	    outerStyle.height = '100px';
	    outerStyle.overflow = SCROLL;
	    outerStyle.top = '-9999px';
	    document.body.appendChild(outer);
	    scrollbarWidth = outer.offsetWidth - outer.clientWidth;
	    document.body.removeChild(outer);
	    return scrollbarWidth;
	  };
	  isFFWithBuggyScrollbar = function isFFWithBuggyScrollbar() {
	    var isOSXFF, ua, version;
	    ua = window.navigator.userAgent;
	    isOSXFF = /(?=.+Mac OS X)(?=.+Firefox)/.test(ua);
	    if (!isOSXFF) {
	      return false;
	    }
	    version = /Firefox\/\d{2}\./.exec(ua);
	    if (version) {
	      version = version[0].replace(/\D+/g, '');
	    }
	    return isOSXFF && +version > 23;
	  };
	
	  /**
	    @class NanoScroll
	    @param element {HTMLElement|Node} the main element
	    @param options {Object} nanoScroller's options
	    @constructor
	   */
	  NanoScroll = function () {
	    function NanoScroll(el, options) {
	      this.el = el;
	      this.options = options;
	      BROWSER_SCROLLBAR_WIDTH || (BROWSER_SCROLLBAR_WIDTH = getBrowserScrollbarWidth());
	      this.$el = $(this.el);
	      this.doc = $(this.options.documentContext || document);
	      this.win = $(this.options.windowContext || window);
	      this.body = this.doc.find('body');
	      this.$content = this.$el.children("." + this.options.contentClass);
	      this.$content.attr('tabindex', this.options.tabIndex || 0);
	      this.content = this.$content[0];
	      this.previousPosition = 0;
	      if (this.options.iOSNativeScrolling && this.el.style.WebkitOverflowScrolling != null) {
	        this.nativeScrolling();
	      } else {
	        this.generate();
	      }
	      this.createEvents();
	      this.addEvents();
	      this.reset();
	    }
	
	    /**
	      Prevents the rest of the page being scrolled
	      when user scrolls the `.nano-content` element.
	      @method preventScrolling
	      @param event {Event}
	      @param direction {String} Scroll direction (up or down)
	      @private
	     */
	
	    NanoScroll.prototype.preventScrolling = function (e, direction) {
	      if (!this.isActive) {
	        return;
	      }
	      if (e.type === DOMSCROLL) {
	        if (direction === DOWN && e.originalEvent.detail > 0 || direction === UP && e.originalEvent.detail < 0) {
	          e.preventDefault();
	        }
	      } else if (e.type === MOUSEWHEEL) {
	        if (!e.originalEvent || !e.originalEvent.wheelDelta) {
	          return;
	        }
	        if (direction === DOWN && e.originalEvent.wheelDelta < 0 || direction === UP && e.originalEvent.wheelDelta > 0) {
	          e.preventDefault();
	        }
	      }
	    };
	
	    /**
	      Enable iOS native scrolling
	      @method nativeScrolling
	      @private
	     */
	
	    NanoScroll.prototype.nativeScrolling = function () {
	      this.$content.css({
	        WebkitOverflowScrolling: 'touch'
	      });
	      this.iOSNativeScrolling = true;
	      this.isActive = true;
	    };
	
	    /**
	      Updates those nanoScroller properties that
	      are related to current scrollbar position.
	      @method updateScrollValues
	      @private
	     */
	
	    NanoScroll.prototype.updateScrollValues = function () {
	      var content, direction;
	      content = this.content;
	      this.maxScrollTop = content.scrollHeight - content.clientHeight;
	      this.prevScrollTop = this.contentScrollTop || 0;
	      this.contentScrollTop = content.scrollTop;
	      direction = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same";
	      this.previousPosition = this.contentScrollTop;
	      if (direction !== "same") {
	        this.$el.trigger('update', {
	          position: this.contentScrollTop,
	          maximum: this.maxScrollTop,
	          direction: direction
	        });
	      }
	      if (!this.iOSNativeScrolling) {
	        this.maxSliderTop = this.paneHeight - this.sliderHeight;
	        this.sliderTop = this.maxScrollTop === 0 ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop;
	      }
	    };
	
	    /**
	      Updates CSS styles for current scroll position.
	      Uses CSS 2d transfroms and `window.requestAnimationFrame` if available.
	      @method setOnScrollStyles
	      @private
	     */
	
	    NanoScroll.prototype.setOnScrollStyles = function () {
	      var cssValue;
	      if (hasTransform) {
	        cssValue = {};
	        cssValue[transform] = "translate(0, " + this.sliderTop + "px)";
	      } else {
	        cssValue = {
	          top: this.sliderTop
	        };
	      }
	      if (rAF) {
	        if (cAF && this.scrollRAF) {
	          cAF(this.scrollRAF);
	        }
	        this.scrollRAF = rAF(function (_this) {
	          return function () {
	            _this.scrollRAF = null;
	            return _this.slider.css(cssValue);
	          };
	        }(this));
	      } else {
	        this.slider.css(cssValue);
	      }
	    };
	
	    /**
	      Creates event related methods
	      @method createEvents
	      @private
	     */
	
	    NanoScroll.prototype.createEvents = function () {
	      this.events = {
	        down: function (_this) {
	          return function (e) {
	            _this.isBeingDragged = true;
	            _this.offsetY = e.pageY - _this.slider.offset().top;
	            if (!_this.slider.is(e.target)) {
	              _this.offsetY = 0;
	            }
	            _this.pane.addClass(_this.options.activeClass);
	            _this.doc.bind(MOUSEMOVE, _this.events[DRAG]).bind(MOUSEUP, _this.events[UP]);
	            _this.body.bind(MOUSEENTER, _this.events[ENTER]);
	            return false;
	          };
	        }(this),
	        drag: function (_this) {
	          return function (e) {
	            _this.sliderY = e.pageY - _this.$el.offset().top - _this.paneTop - (_this.offsetY || _this.sliderHeight * 0.5);
	            _this.scroll();
	            if (_this.contentScrollTop >= _this.maxScrollTop && _this.prevScrollTop !== _this.maxScrollTop) {
	              _this.$el.trigger('scrollend');
	            } else if (_this.contentScrollTop === 0 && _this.prevScrollTop !== 0) {
	              _this.$el.trigger('scrolltop');
	            }
	            return false;
	          };
	        }(this),
	        up: function (_this) {
	          return function (e) {
	            _this.isBeingDragged = false;
	            _this.pane.removeClass(_this.options.activeClass);
	            _this.doc.unbind(MOUSEMOVE, _this.events[DRAG]).unbind(MOUSEUP, _this.events[UP]);
	            _this.body.unbind(MOUSEENTER, _this.events[ENTER]);
	            return false;
	          };
	        }(this),
	        resize: function (_this) {
	          return function (e) {
	            _this.reset();
	          };
	        }(this),
	        panedown: function (_this) {
	          return function (e) {
	            _this.sliderY = (e.offsetY || e.originalEvent.layerY) - _this.sliderHeight * 0.5;
	            _this.scroll();
	            _this.events.down(e);
	            return false;
	          };
	        }(this),
	        scroll: function (_this) {
	          return function (e) {
	            _this.updateScrollValues();
	            if (_this.isBeingDragged) {
	              return;
	            }
	            if (!_this.iOSNativeScrolling) {
	              _this.sliderY = _this.sliderTop;
	              _this.setOnScrollStyles();
	            }
	            if (e == null) {
	              return;
	            }
	            if (_this.contentScrollTop >= _this.maxScrollTop) {
	              if (_this.options.preventPageScrolling) {
	                _this.preventScrolling(e, DOWN);
	              }
	              if (_this.prevScrollTop !== _this.maxScrollTop) {
	                _this.$el.trigger('scrollend');
	              }
	            } else if (_this.contentScrollTop === 0) {
	              if (_this.options.preventPageScrolling) {
	                _this.preventScrolling(e, UP);
	              }
	              if (_this.prevScrollTop !== 0) {
	                _this.$el.trigger('scrolltop');
	              }
	            }
	          };
	        }(this),
	        wheel: function (_this) {
	          return function (e) {
	            var delta;
	            if (e == null) {
	              return;
	            }
	            delta = e.delta || e.wheelDelta || e.originalEvent && e.originalEvent.wheelDelta || -e.detail || e.originalEvent && -e.originalEvent.detail;
	            if (delta) {
	              _this.sliderY += -delta / 3;
	            }
	            _this.scroll();
	            return false;
	          };
	        }(this),
	        enter: function (_this) {
	          return function (e) {
	            var _ref;
	            if (!_this.isBeingDragged) {
	              return;
	            }
	            if ((e.buttons || e.which) !== 1) {
	              return (_ref = _this.events)[UP].apply(_ref, arguments);
	            }
	          };
	        }(this)
	      };
	    };
	
	    /**
	      Adds event listeners with jQuery.
	      @method addEvents
	      @private
	     */
	
	    NanoScroll.prototype.addEvents = function () {
	      var events;
	      this.removeEvents();
	      events = this.events;
	      if (!this.options.disableResize) {
	        this.win.bind(RESIZE, events[RESIZE]);
	      }
	      if (!this.iOSNativeScrolling) {
	        this.slider.bind(MOUSEDOWN, events[DOWN]);
	        this.pane.bind(MOUSEDOWN, events[PANEDOWN]).bind("" + MOUSEWHEEL + " " + DOMSCROLL, events[WHEEL]);
	      }
	      this.$content.bind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
	    };
	
	    /**
	      Removes event listeners with jQuery.
	      @method removeEvents
	      @private
	     */
	
	    NanoScroll.prototype.removeEvents = function () {
	      var events;
	      events = this.events;
	      this.win.unbind(RESIZE, events[RESIZE]);
	      if (!this.iOSNativeScrolling) {
	        this.slider.unbind();
	        this.pane.unbind();
	      }
	      this.$content.unbind("" + SCROLL + " " + MOUSEWHEEL + " " + DOMSCROLL + " " + TOUCHMOVE, events[SCROLL]);
	    };
	
	    /**
	      Generates nanoScroller's scrollbar and elements for it.
	      @method generate
	      @chainable
	      @private
	     */
	
	    NanoScroll.prototype.generate = function () {
	      var contentClass, cssRule, currentPadding, options, pane, paneClass, sliderClass;
	      options = this.options;
	      paneClass = options.paneClass, sliderClass = options.sliderClass, contentClass = options.contentClass;
	      if (!(pane = this.$el.children("." + paneClass)).length && !pane.children("." + sliderClass).length) {
	        this.$el.append("<div class=\"" + paneClass + "\"><div class=\"" + sliderClass + "\" /></div>");
	      }
	      this.pane = this.$el.children("." + paneClass);
	      this.slider = this.pane.find("." + sliderClass);
	      if (BROWSER_SCROLLBAR_WIDTH === 0 && isFFWithBuggyScrollbar()) {
	        currentPadding = window.getComputedStyle(this.content, null).getPropertyValue('padding-right').replace(/[^0-9.]+/g, '');
	        cssRule = {
	          right: -14,
	          paddingRight: +currentPadding + 14
	        };
	      } else if (BROWSER_SCROLLBAR_WIDTH) {
	        cssRule = {
	          right: -BROWSER_SCROLLBAR_WIDTH
	        };
	        this.$el.addClass(options.enabledClass);
	      }
	      if (cssRule != null) {
	        this.$content.css(cssRule);
	      }
	      return this;
	    };
	
	    /**
	      @method restore
	      @private
	     */
	
	    NanoScroll.prototype.restore = function () {
	      this.stopped = false;
	      if (!this.iOSNativeScrolling) {
	        this.pane.show();
	      }
	      this.addEvents();
	    };
	
	    /**
	      Resets nanoScroller's scrollbar.
	      @method reset
	      @chainable
	      @example
	          $(".nano").nanoScroller();
	     */
	
	    NanoScroll.prototype.reset = function () {
	      var content, contentHeight, contentPosition, contentStyle, contentStyleOverflowY, paneBottom, paneHeight, paneOuterHeight, paneTop, parentMaxHeight, right, sliderHeight;
	      if (this.iOSNativeScrolling) {
	        this.contentHeight = this.content.scrollHeight;
	        return;
	      }
	      if (!this.$el.find("." + this.options.paneClass).length) {
	        this.generate().stop();
	      }
	      if (this.stopped) {
	        this.restore();
	      }
	      content = this.content;
	      contentStyle = content.style;
	      contentStyleOverflowY = contentStyle.overflowY;
	      if (BROWSER_IS_IE7) {
	        this.$content.css({
	          height: this.$content.height()
	        });
	      }
	      contentHeight = content.scrollHeight + BROWSER_SCROLLBAR_WIDTH;
	      parentMaxHeight = parseInt(this.$el.css("max-height"), 10);
	      if (parentMaxHeight > 0) {
	        this.$el.height("");
	        this.$el.height(content.scrollHeight > parentMaxHeight ? parentMaxHeight : content.scrollHeight);
	      }
	      paneHeight = this.pane.outerHeight(false);
	      paneTop = parseInt(this.pane.css('top'), 10);
	      paneBottom = parseInt(this.pane.css('bottom'), 10);
	      paneOuterHeight = paneHeight + paneTop + paneBottom;
	      sliderHeight = Math.round(paneOuterHeight / contentHeight * paneHeight);
	      if (sliderHeight < this.options.sliderMinHeight) {
	        sliderHeight = this.options.sliderMinHeight;
	      } else if (this.options.sliderMaxHeight != null && sliderHeight > this.options.sliderMaxHeight) {
	        sliderHeight = this.options.sliderMaxHeight;
	      }
	      if (contentStyleOverflowY === SCROLL && contentStyle.overflowX !== SCROLL) {
	        sliderHeight += BROWSER_SCROLLBAR_WIDTH;
	      }
	      this.maxSliderTop = paneOuterHeight - sliderHeight;
	      this.contentHeight = contentHeight;
	      this.paneHeight = paneHeight;
	      this.paneOuterHeight = paneOuterHeight;
	      this.sliderHeight = sliderHeight;
	      this.paneTop = paneTop;
	      this.slider.height(sliderHeight);
	      this.events.scroll();
	      this.pane.show();
	      this.isActive = true;
	      if (content.scrollHeight === content.clientHeight || this.pane.outerHeight(true) >= content.scrollHeight && contentStyleOverflowY !== SCROLL) {
	        this.pane.hide();
	        this.isActive = false;
	      } else if (this.el.clientHeight === content.scrollHeight && contentStyleOverflowY === SCROLL) {
	        this.slider.hide();
	      } else {
	        this.slider.show();
	      }
	      this.pane.css({
	        opacity: this.options.alwaysVisible ? 1 : '',
	        visibility: this.options.alwaysVisible ? 'visible' : ''
	      });
	      contentPosition = this.$content.css('position');
	      if (contentPosition === 'static' || contentPosition === 'relative') {
	        right = parseInt(this.$content.css('right'), 10);
	        if (right) {
	          this.$content.css({
	            right: '',
	            marginRight: right
	          });
	        }
	      }
	      return this;
	    };
	
	    /**
	      @method scroll
	      @private
	      @example
	          $(".nano").nanoScroller({ scroll: 'top' });
	     */
	
	    NanoScroll.prototype.scroll = function () {
	      if (!this.isActive) {
	        return;
	      }
	      this.sliderY = Math.max(0, this.sliderY);
	      this.sliderY = Math.min(this.maxSliderTop, this.sliderY);
	      this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop);
	      if (!this.iOSNativeScrolling) {
	        this.updateScrollValues();
	        this.setOnScrollStyles();
	      }
	      return this;
	    };
	
	    /**
	      Scroll at the bottom with an offset value
	      @method scrollBottom
	      @param offsetY {Number}
	      @chainable
	      @example
	          $(".nano").nanoScroller({ scrollBottom: value });
	     */
	
	    NanoScroll.prototype.scrollBottom = function (offsetY) {
	      if (!this.isActive) {
	        return;
	      }
	      this.$content.scrollTop(this.contentHeight - this.$content.height() - offsetY).trigger(MOUSEWHEEL);
	      this.stop().restore();
	      return this;
	    };
	
	    /**
	      Scroll at the top with an offset value
	      @method scrollTop
	      @param offsetY {Number}
	      @chainable
	      @example
	          $(".nano").nanoScroller({ scrollTop: value });
	     */
	
	    NanoScroll.prototype.scrollTop = function (offsetY) {
	      if (!this.isActive) {
	        return;
	      }
	      this.$content.scrollTop(+offsetY).trigger(MOUSEWHEEL);
	      this.stop().restore();
	      return this;
	    };
	
	    /**
	      Scroll to an element
	      @method scrollTo
	      @param node {Node} A node to scroll to.
	      @chainable
	      @example
	          $(".nano").nanoScroller({ scrollTo: $('#a_node') });
	     */
	
	    NanoScroll.prototype.scrollTo = function (node) {
	      if (!this.isActive) {
	        return;
	      }
	      this.scrollTop(this.$el.find(node).get(0).offsetTop);
	      return this;
	    };
	
	    /**
	      To stop the operation.
	      This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.
	      @method stop
	      @chainable
	      @example
	          $(".nano").nanoScroller({ stop: true });
	     */
	
	    NanoScroll.prototype.stop = function () {
	      if (cAF && this.scrollRAF) {
	        cAF(this.scrollRAF);
	        this.scrollRAF = null;
	      }
	      this.stopped = true;
	      this.removeEvents();
	      if (!this.iOSNativeScrolling) {
	        this.pane.hide();
	      }
	      return this;
	    };
	
	    /**
	      Destroys nanoScroller and restores browser's native scrollbar.
	      @method destroy
	      @chainable
	      @example
	          $(".nano").nanoScroller({ destroy: true });
	     */
	
	    NanoScroll.prototype.destroy = function () {
	      if (!this.stopped) {
	        this.stop();
	      }
	      if (!this.iOSNativeScrolling && this.pane.length) {
	        this.pane.remove();
	      }
	      if (BROWSER_IS_IE7) {
	        this.$content.height('');
	      }
	      this.$content.removeAttr('tabindex');
	      if (this.$el.hasClass(this.options.enabledClass)) {
	        this.$el.removeClass(this.options.enabledClass);
	        this.$content.css({
	          right: ''
	        });
	      }
	      return this;
	    };
	
	    /**
	      To flash the scrollbar gadget for an amount of time defined in plugin settings (defaults to 1,5s).
	      Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.
	      @method flash
	      @chainable
	      @example
	          $(".nano").nanoScroller({ flash: true });
	     */
	
	    NanoScroll.prototype.flash = function () {
	      if (this.iOSNativeScrolling) {
	        return;
	      }
	      if (!this.isActive) {
	        return;
	      }
	      this.reset();
	      this.pane.addClass(this.options.flashedClass);
	      setTimeout(function (_this) {
	        return function () {
	          _this.pane.removeClass(_this.options.flashedClass);
	        };
	      }(this), this.options.flashDelay);
	      return this;
	    };
	
	    return NanoScroll;
	  }();
	  $.fn.nanoScroller = function (settings) {
	    return this.each(function () {
	      var options, scrollbar;
	      if (!(scrollbar = this.nanoscroller)) {
	        options = $.extend({}, defaults, settings);
	        this.nanoscroller = scrollbar = new NanoScroll(this, options);
	      }
	      if (settings && (typeof settings === 'undefined' ? 'undefined' : (0, _typeof3.default)(settings)) === "object") {
	        $.extend(scrollbar.options, settings);
	        if (settings.scrollBottom != null) {
	          return scrollbar.scrollBottom(settings.scrollBottom);
	        }
	        if (settings.scrollTop != null) {
	          return scrollbar.scrollTop(settings.scrollTop);
	        }
	        if (settings.scrollTo) {
	          return scrollbar.scrollTo(settings.scrollTo);
	        }
	        if (settings.scroll === 'bottom') {
	          return scrollbar.scrollBottom(0);
	        }
	        if (settings.scroll === 'top') {
	          return scrollbar.scrollTop(0);
	        }
	        if (settings.scroll && settings.scroll instanceof $) {
	          return scrollbar.scrollTo(settings.scroll);
	        }
	        if (settings.stop) {
	          return scrollbar.stop();
	        }
	        if (settings.destroy) {
	          return scrollbar.destroy();
	        }
	        if (settings.flash) {
	          return scrollbar.flash();
	        }
	      }
	      return scrollbar.reset();
	    });
	  };
	  $.fn.nanoScroller.Constructor = NanoScroll;
	});
	
	//# sourceMappingURL=jquery.nanoscroller.js.map

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof2 = __webpack_require__(5);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*!
	 * jQuery Raty FA - A Star Rating Plugin with Font Awesome
	 *
	 * Licensed under The MIT License
	 *
	 * @author  : Jacob Overgaard
	 * @doc     : http://jacob87.github.io/raty-fa/
	 * @version : 0.1.1
	 *
	 */
	
	;(function ($) {
	
	  var methods = {
	    init: function init(settings) {
	      return this.each(function () {
	        methods.destroy.call(this);
	
	        this.opt = $.extend(true, {}, $.fn.raty.defaults, settings);
	
	        var that = $(this),
	            inits = ['number', 'readOnly', 'score', 'scoreName'];
	
	        methods._callback.call(this, inits);
	
	        if (this.opt.precision) {
	          methods._adjustPrecision.call(this);
	        }
	
	        this.opt.number = methods._between(this.opt.number, 0, this.opt.numberMax);
	
	        this.stars = methods._createStars.call(this);
	        this.score = methods._createScore.call(this);
	
	        methods._apply.call(this, this.opt.score);
	
	        if (this.opt.cancel) {
	          this.cancel = methods._createCancel.call(this);
	        }
	
	        if (this.opt.width) {
	          that.css('width', this.opt.width);
	        }
	
	        if (this.opt.readOnly) {
	          methods._lock.call(this);
	        } else {
	          that.css('cursor', 'pointer');
	          methods._binds.call(this);
	        }
	
	        methods._target.call(this, this.opt.score);
	
	        that.data({ 'settings': this.opt, 'raty': true });
	      });
	    }, _adjustPrecision: function _adjustPrecision() {
	      this.opt.targetType = 'score';
	      this.opt.half = true;
	    }, _apply: function _apply(score) {
	      if (typeof score !== 'undefined' && score >= 0) {
	        score = methods._between(score, 0, this.opt.number);
	        this.score.val(score);
	      }
	
	      methods._fill.call(this, score);
	
	      if (score) {
	        methods._roundStars.call(this, score);
	      }
	    }, _between: function _between(value, min, max) {
	      return Math.min(Math.max(parseFloat(value), min), max);
	    }, _binds: function _binds() {
	      if (this.cancel) {
	        methods._bindCancel.call(this);
	      }
	
	      methods._bindClick.call(this);
	      methods._bindOut.call(this);
	      methods._bindOver.call(this);
	    }, _bindCancel: function _bindCancel() {
	      methods._bindClickCancel.call(this);
	      methods._bindOutCancel.call(this);
	      methods._bindOverCancel.call(this);
	    }, _bindClick: function _bindClick() {
	      var self = this,
	          that = $(self);
	
	      self.stars.on('click.raty', function (evt) {
	        self.score.val(self.opt.half || self.opt.precision ? that.data('score') : $(this).data('score'));
	
	        if (self.opt.click) {
	          self.opt.click.call(self, parseFloat(self.score.val()), evt);
	        }
	      });
	    }, _bindClickCancel: function _bindClickCancel() {
	      var self = this;
	
	      self.cancel.on('click.raty', function (evt) {
	        self.score.removeAttr('value');
	
	        if (self.opt.click) {
	          self.opt.click.call(self, null, evt);
	        }
	      });
	    }, _bindOut: function _bindOut() {
	      var self = this;
	
	      $(this).on('mouseleave.raty', function (evt) {
	        var score = parseFloat(self.score.val()) || undefined;
	
	        methods._apply.call(self, score);
	        methods._target.call(self, score, evt);
	
	        if (self.opt.mouseout) {
	          self.opt.mouseout.call(self, score, evt);
	        }
	      });
	    }, _bindOutCancel: function _bindOutCancel() {
	      var self = this;
	
	      self.cancel.on('mouseleave.raty', function (evt) {
	        $(this).attr('class', self.opt.cancelOff);
	
	        if (self.opt.mouseout) {
	          self.opt.mouseout.call(self, self.score.val() || null, evt);
	        }
	      });
	    }, _bindOverCancel: function _bindOverCancel() {
	      var self = this;
	
	      self.cancel.on('mouseover.raty', function (evt) {
	        $(this).attr('class', self.opt.cancelOn);
	
	        self.stars.attr('class', self.opt.starOff);
	
	        methods._target.call(self, null, evt);
	
	        if (self.opt.mouseover) {
	          self.opt.mouseover.call(self, null);
	        }
	      });
	    }, _bindOver: function _bindOver() {
	      var self = this,
	          that = $(self),
	          action = self.opt.half ? 'mousemove.raty' : 'mouseover.raty';
	
	      self.stars.on(action, function (evt) {
	        var score = parseInt($(this).data('score'), 10);
	
	        if (self.opt.half) {
	          var position = parseFloat((evt.pageX - $(this).offset().left) / (self.opt.size ? self.opt.size : parseInt(that.css('font-size')))),
	              plus = position > .5 ? 1 : .5;
	
	          score = score - 1 + plus;
	
	          methods._fill.call(self, score);
	
	          if (self.opt.precision) {
	            score = score - plus + position;
	          }
	
	          methods._roundStars.call(self, score);
	
	          that.data('score', score);
	        } else {
	          methods._fill.call(self, score);
	        }
	
	        methods._target.call(self, score, evt);
	
	        if (self.opt.mouseover) {
	          self.opt.mouseover.call(self, score, evt);
	        }
	      });
	    }, _callback: function _callback(options) {
	      for (var i in options) {
	        if (typeof this.opt[options[i]] === 'function') {
	          this.opt[options[i]] = this.opt[options[i]].call(this);
	        }
	      }
	    }, _createCancel: function _createCancel() {
	      var that = $(this),
	          icon = this.opt.cancelOff,
	          cancel = $('<i />', { 'class': icon, title: this.opt.cancelHint });
	
	      if (this.opt.cancelPlace == 'left') {
	        that.prepend('&#160;').prepend(cancel);
	      } else {
	        that.append('&#160;').append(cancel);
	      }
	
	      return cancel;
	    }, _createScore: function _createScore() {
	      return $('<input />', { type: 'hidden', name: this.opt.scoreName }).appendTo(this);
	    }, _createStars: function _createStars() {
	      var that = $(this);
	
	      for (var i = 1; i <= this.opt.number; i++) {
	        var title = methods._getHint.call(this, i),
	            icon = this.opt.score && this.opt.score >= i ? 'starOn' : 'starOff';
	
	        icon = this.opt[icon];
	
	        $('<i />', { 'class': icon, title: title, 'data-score': i }).appendTo(this);
	
	        if (this.opt.space) {
	          that.append(i < this.opt.number ? '&#160;' : '');
	        }
	      }
	
	      return that.children('i');
	    }, _error: function _error(message) {
	      $(this).html(message);
	
	      $.error(message);
	    }, _fill: function _fill(score) {
	      var self = this,
	          hash = 0;
	
	      for (var i = 1; i <= self.stars.length; i++) {
	        var star = self.stars.eq(i - 1),
	            select = self.opt.single ? i == score : i <= score;
	
	        if (self.opt.iconRange && self.opt.iconRange.length > hash) {
	          var irange = self.opt.iconRange[hash],
	              on = irange.on || self.opt.starOn,
	              off = irange.off || self.opt.starOff,
	              icon = select ? on : off;
	
	          if (i <= irange.range) {
	            star.attr('class', icon);
	          }
	
	          if (i == irange.range) {
	            hash++;
	          }
	        } else {
	          var icon = select ? 'starOn' : 'starOff';
	
	          star.attr('class', this.opt[icon]);
	        }
	      }
	    }, _getHint: function _getHint(score) {
	      var hint = this.opt.hints[score - 1];
	      return hint === '' ? '' : hint || score;
	    }, _lock: function _lock() {
	      var score = parseInt(this.score.val(), 10),
	          // TODO: 3.1 >> [['1'], ['2'], ['3', '.1', '.2']]
	      hint = score ? methods._getHint.call(this, score) : this.opt.noRatedMsg;
	
	      $(this).data('readonly', true).css('cursor', '').attr('title', hint);
	
	      this.score.attr('readonly', 'readonly');
	      this.stars.attr('title', hint);
	
	      if (this.cancel) {
	        this.cancel.hide();
	      }
	    }, _roundStars: function _roundStars(score) {
	      var rest = (score - Math.floor(score)).toFixed(2);
	
	      if (rest > this.opt.round.down) {
	        var icon = 'starOn'; // Up:   [x.76 .. x.99]
	
	        if (this.opt.halfShow && rest < this.opt.round.up) {
	          // Half: [x.26 .. x.75]
	          icon = 'starHalf';
	        } else if (rest < this.opt.round.full) {
	          // Down: [x.00 .. x.5]
	          icon = 'starOff';
	        }
	
	        this.stars.eq(Math.ceil(score) - 1).attr('class', this.opt[icon]);
	      } // Full down: [x.00 .. x.25]
	    }, _target: function _target(score, evt) {
	      if (this.opt.target) {
	        var target = $(this.opt.target);
	
	        if (target.length === 0) {
	          methods._error.call(this, 'Target selector invalid or missing!');
	        }
	
	        if (this.opt.targetFormat.indexOf('{score}') < 0) {
	          methods._error.call(this, 'Template "{score}" missing!');
	        }
	
	        var mouseover = evt && evt.type == 'mouseover';
	
	        if (score === undefined) {
	          score = this.opt.targetText;
	        } else if (score === null) {
	          score = mouseover ? this.opt.cancelHint : this.opt.targetText;
	        } else {
	          if (this.opt.targetType == 'hint') {
	            score = methods._getHint.call(this, Math.ceil(score));
	          } else if (this.opt.precision) {
	            score = parseFloat(score).toFixed(1);
	          }
	
	          if (!mouseover && !this.opt.targetKeep) {
	            score = this.opt.targetText;
	          }
	        }
	
	        if (score) {
	          score = this.opt.targetFormat.toString().replace('{score}', score);
	        }
	
	        if (target.is(':input')) {
	          target.val(score);
	        } else {
	          target.html(score);
	        }
	      }
	    }, _unlock: function _unlock() {
	      $(this).data('readonly', false).css('cursor', 'pointer').removeAttr('title');
	
	      this.score.removeAttr('readonly', 'readonly');
	
	      for (var i = 0; i < this.opt.number; i++) {
	        this.stars.eq(i).attr('title', methods._getHint.call(this, i + 1));
	      }
	
	      if (this.cancel) {
	        this.cancel.css('display', '');
	      }
	    }, cancel: function cancel(click) {
	      return this.each(function () {
	        if ($(this).data('readonly') !== true) {
	          methods[click ? 'click' : 'score'].call(this, null);
	          this.score.removeAttr('value');
	        }
	      });
	    }, click: function click(score) {
	      return $(this).each(function () {
	        if ($(this).data('readonly') !== true) {
	          methods._apply.call(this, score);
	
	          if (!this.opt.click) {
	            methods._error.call(this, 'You must add the "click: function(score, evt) { }" callback.');
	          }
	
	          this.opt.click.call(this, score, $.Event('click'));
	
	          methods._target.call(this, score);
	        }
	      });
	    }, destroy: function destroy() {
	      return $(this).each(function () {
	        var that = $(this),
	            raw = that.data('raw');
	
	        if (raw) {
	          that.off('.raty').empty().css({ cursor: raw.style.cursor, width: raw.style.width }).removeData('readonly');
	        } else {
	          that.data('raw', that.clone()[0]);
	        }
	      });
	    }, getScore: function getScore() {
	      var score = [],
	          value;
	
	      $(this).each(function () {
	        value = this.score.val();
	
	        score.push(value ? parseFloat(value) : undefined);
	      });
	
	      return score.length > 1 ? score : score[0];
	    }, readOnly: function readOnly(readonly) {
	      return this.each(function () {
	        var that = $(this);
	
	        if (that.data('readonly') !== readonly) {
	          if (readonly) {
	            that.off('.raty').children('i').off('.raty');
	
	            methods._lock.call(this);
	          } else {
	            methods._binds.call(this);
	            methods._unlock.call(this);
	          }
	
	          that.data('readonly', readonly);
	        }
	      });
	    }, reload: function reload() {
	      return methods.set.call(this, {});
	    }, score: function score() {
	      return arguments.length ? methods.setScore.apply(this, arguments) : methods.getScore.call(this);
	    }, set: function set(settings) {
	      return this.each(function () {
	        var that = $(this),
	            actual = that.data('settings'),
	            news = $.extend({}, actual, settings);
	
	        that.raty(news);
	      });
	    }, setScore: function setScore(score) {
	      return $(this).each(function () {
	        if ($(this).data('readonly') !== true) {
	          methods._apply.call(this, score);
	          methods._target.call(this, score);
	        }
	      });
	    }
	  };
	
	  $.fn.raty = function (method) {
	    if (methods[method]) {
	      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    } else if ((typeof method === 'undefined' ? 'undefined' : (0, _typeof3.default)(method)) === 'object' || !method) {
	      return methods.init.apply(this, arguments);
	    } else {
	      $.error('Method ' + method + ' does not exist!');
	    }
	  };
	
	  $.fn.raty.defaults = {
	    cancel: false,
	    cancelHint: 'Cancel this rating!',
	    cancelOff: 'fa fa-fw fa-minus-square',
	    cancelOn: 'fa fa-fw fa-check-square',
	    cancelPlace: 'left',
	    click: undefined,
	    half: false,
	    halfShow: true,
	    hints: ['bad', 'poor', 'regular', 'good', 'gorgeous'],
	    iconRange: undefined,
	    mouseout: undefined,
	    mouseover: undefined,
	    noRatedMsg: 'Not rated yet!',
	    number: 5,
	    numberMax: 20,
	    precision: false,
	    readOnly: false,
	    round: { down: .25, full: .6, up: .76 },
	    score: undefined,
	    scoreName: 'score',
	    single: false,
	    size: null,
	    space: true,
	    starHalf: 'fa fa-fw fa-star-half-o',
	    starOff: 'fa fa-fw fa-star-o',
	    starOn: 'fa fa-fw fa-star',
	    target: undefined,
	    targetFormat: '{score}',
	    targetKeep: false,
	    targetText: '',
	    targetType: 'hint',
	    width: false
	  };
	})(jQuery);

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	 * jQuery autoResize (textarea auto-resizer)
	 * @copyright James Padolsey http://james.padolsey.com
	 * @version 1.04
	 */
	
	(function (a) {
	  a.fn.autoResize = function (j) {
	    var b = a.extend({ onResize: function onResize() {}, animate: true, animateDuration: 150, animateCallback: function animateCallback() {}, extraSpace: 20, limit: 1000 }, j);this.filter('textarea').each(function () {
	      var c = a(this).css({ resize: 'none', 'overflow-y': 'hidden' }),
	          k = c.height(),
	          f = function () {
	        var l = ['height', 'width', 'lineHeight', 'textDecoration', 'letterSpacing'],
	            h = {};a.each(l, function (d, e) {
	          h[e] = c.css(e);
	        });return c.clone().removeAttr('id').removeAttr('name').css({ position: 'absolute', top: 0, left: -9999 }).css(h).attr('tabIndex', '-1').insertBefore(c);
	      }(),
	          i = null,
	          g = function g() {
	        f.height(0).val(a(this).val()).scrollTop(10000);var d = Math.max(f.scrollTop(), k) + b.extraSpace,
	            e = a(this).add(f);if (i === d) {
	          return;
	        }i = d;if (d >= b.limit) {
	          a(this).css('overflow-y', '');return;
	        }b.onResize.call(this);b.animate && c.css('display') === 'block' ? e.stop().animate({ height: d }, b.animateDuration, b.animateCallback) : e.height(d);
	      };c.unbind('.dynSiz').bind('keyup.dynSiz', g).bind('keydown.dynSiz', g).bind('change.dynSiz', g);
	    });return this;
	  };
	})(jQuery);

/***/ }
/******/ ]);
//# sourceMappingURL=app.min.js.map
/*
$("document").ready(function(){
	$('body').on("click",function(){
		$('.js-close').trigger("click");
	});
});*/