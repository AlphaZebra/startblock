/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  //   primary: (
  //     <svg
  //       viewBox="0 0 100 100"
  //       xmlns="http://www.w3.org/2000/svg"
  //       version="1.1"
  //       fill="#000000"
  //       stroke="#000000"
  //     >
  //       <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  //       <g
  //         id="SVGRepo_tracerCarrier"
  //         stroke-linecap="round"
  //         stroke-linejoin="round"
  //       ></g>
  //       <g id="SVGRepo_iconCarrier">
  //         {" "}
  //         <path
  //           style="fill:#bcd576;"
  //           d="M 45,90 45,50 4,32 16,28 16,24 c 0,0 3,-7 20,-2 l 6,-3 0,-4 c 0,0 7,-6 21,0 l 0,4 8,4 c 0,0 15,-2 14,5 l 11,5 0,39 z"
  //         ></path>{" "}
  //         <path
  //           style="fill:#0693e3;"
  //           d="m 58,34 0,8 c 0,0 -10,6 -21,0 l 0,-8 c 0,0 13,6 21,0 z m 6,-8 0,8 c 0,0 8,7 21,0 l 0,-8 c 0,0 -10,6 -21,0 z m -22,-10 0,8 c 0,0 11,7 21,-1 l 0,-7 c 0,0 -11,6 -21,0 z m -26,8 0,8 c 0,0 11,7 21,-1 l 0,-7 c 0,0 -11,6 -21,0 z M 4,32 4,71 45,90 45,50 z"
  //         ></path>{" "}
  //       </g>
  //     </svg>
  //   ),
  primary: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "68px",
    height: "68px",
    viewBox: "0 0 1024 1024",
    class: "icon",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "#000000"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_bgCarrier",
    "stroke-width": "0"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_tracerCarrier",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
    id: "SVGRepo_iconCarrier"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M379.5 624.5L73 507.8c-12.4-4.7-13.1-21.9-1.1-27.6L937.7 65.8c12.1-5.8 25.1 5.8 20.7 18.4L669 918.1c-3.8 10.9-18 13.7-25.6 5l-258-294.5c-1.6-1.8-3.6-3.3-5.9-4.1z",
    fill: "#a062b7"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M316 600.3l493.2-401.4c3.6-3 8.3 2.2 5 5.5l-422.4 418c-3.5 3.5-3.7 9.1-0.5 12.9l83.5 95.4-135.1 92c-10.1 6.9-23.7-0.3-23.7-12.5V600.3z",
    fill: "#666666"
  })))
});

/***/ }),

/***/ "./src/blocks/shortblock/index.scss":
/*!******************************************!*\
  !*** ./src/blocks/shortblock/index.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/blocks/shortblock/block.json":
/*!******************************************!*\
  !*** ./src/blocks/shortblock/block.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"pz/search-formshortblock","title":"ShortBlock","category":"text","description":"A text block that processes any shortcodes embedded in the text.","version":"1","textdomain":"pz","editorScript":"file:./index.js","attributes":{"content":{"type":"string"},"altContent":{"type":"string"}},"style":"file:./index.css"}');

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/blocks/shortblock/index.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/blocks/shortblock/block.json");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../icons */ "./src/icons.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index.scss */ "./src/blocks/shortblock/index.scss");








(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  icon: _icons__WEBPACK_IMPORTED_MODULE_5__["default"].primary,
  edit: EditComponent,
  save(props) {
    return null;
  }
});
function EditComponent(props) {
  const {
    attributes
  } = props;
  const {
    content,
    altContent
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", blockProps, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Normal shortcode content:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    label: "This paragraph may contain shortcodes:",
    value: content,
    onChange: newVal => props.setAttributes({
      content: newVal
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Alternate version without shortcodes:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
    label: "This paragraph should NOT contain shortcodes:",
    value: altContent,
    onChange: newVal => props.setAttributes({
      altContent: newVal
    })
  }));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map