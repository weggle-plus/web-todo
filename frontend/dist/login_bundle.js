/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/api.ts":
/*!************************!*\
  !*** ./src/api/api.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ErrorData: () => (/* binding */ ErrorData),\n/* harmony export */   HttpStatus: () => (/* binding */ HttpStatus),\n/* harmony export */   fetchData: () => (/* binding */ fetchData)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst BASE_URL = 'http://localhost:3000';\nvar HttpStatus;\n(function (HttpStatus) {\n    HttpStatus[HttpStatus[\"OK\"] = 200] = \"OK\";\n    HttpStatus[HttpStatus[\"CREATED\"] = 201] = \"CREATED\";\n    HttpStatus[HttpStatus[\"NO_CONTENT\"] = 204] = \"NO_CONTENT\";\n    HttpStatus[HttpStatus[\"BAD_REQUEST\"] = 400] = \"BAD_REQUEST\";\n    HttpStatus[HttpStatus[\"UNAUTHORIZED\"] = 401] = \"UNAUTHORIZED\";\n    HttpStatus[HttpStatus[\"FORBIDDEN\"] = 403] = \"FORBIDDEN\";\n    HttpStatus[HttpStatus[\"NOT_FOUND\"] = 404] = \"NOT_FOUND\";\n    HttpStatus[HttpStatus[\"CONFLICT\"] = 409] = \"CONFLICT\";\n    HttpStatus[HttpStatus[\"INTERNAL_SERVER_ERROR\"] = 500] = \"INTERNAL_SERVER_ERROR\";\n})(HttpStatus || (HttpStatus = {}));\nclass ErrorData {\n    constructor(status, message) {\n        this.status = status;\n        this.message = message;\n    }\n}\nfunction fetchData(url, options) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const response = yield fetch(`${BASE_URL}/${url}`, options);\n            if (!response.ok) {\n                //const errorBody = await response.json();\n                console.log(response);\n                //const error = new ErrorData(errorBody.status, errorBody.message);\n                throw response.status;\n            }\n            if (response.status === HttpStatus.NO_CONTENT) {\n                return undefined;\n            }\n            return yield response.json();\n        }\n        catch (error) {\n            console.error(`Fetch error: ${error}`);\n            throw (error);\n        }\n    });\n}\n\n\n//# sourceURL=webpack://frontend/./src/api/api.ts?");

/***/ }),

/***/ "./src/scripts/login.ts":
/*!******************************!*\
  !*** ./src/scripts/login.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/api */ \"./src/api/api.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst idInput = document.querySelector('#login-input-id');\nconst pwInput = document.querySelector('#login-input-pw');\nconst span = document.querySelector('span');\n[idInput, pwInput].forEach((input) => {\n    input.addEventListener(\"keydown\", (event) => {\n        if (event.key === 'Enter') {\n            if (idInput.value && pwInput.value) {\n                requestLogin(idInput.value, pwInput.value);\n            }\n        }\n    });\n});\n// 로그인\nconst loginButton = document.querySelector('#login-button');\nloginButton.addEventListener(\"click\", () => {\n    if (idInput.value && pwInput.value) {\n        requestLogin(idInput.value, pwInput.value);\n    }\n});\nidInput.addEventListener('focus', () => {\n    idInput.classList.remove('error');\n    pwInput.classList.remove('error');\n    span.style.display = 'none';\n});\npwInput.addEventListener('focus', () => {\n    pwInput.classList.remove('error');\n    idInput.classList.remove('error');\n    span.style.display = 'none';\n});\nfunction requestLogin(id, password) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const request = { username: id, password: password };\n        try {\n            const response = yield (0,_api_api__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`users/login`, {\n                method: 'POST',\n                headers: {\n                    'Content-Type': 'application/json'\n                },\n                body: JSON.stringify(request)\n            });\n            if (response) {\n                alert(`${response.username}님 환영합니다!`);\n                localStorage.setItem('token', response.token);\n                window.location.href = './index.html';\n            }\n        }\n        catch (statusCode) {\n            if (statusCode === _api_api__WEBPACK_IMPORTED_MODULE_0__.HttpStatus.UNAUTHORIZED) {\n                span.style.display = 'flex';\n                idInput.classList.add('error');\n                pwInput.classList.add('error');\n            }\n            else\n                alert(`unhandled error ${statusCode}`);\n        }\n    });\n}\n\n\n//# sourceURL=webpack://frontend/./src/scripts/login.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/login.ts");
/******/ 	
/******/ })()
;