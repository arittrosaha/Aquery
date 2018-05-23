/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DomNodeCollection {

  constructor(arr){
    this.elements = arr;
  }

  html(str) {
    if (typeof str === 'undefined') {
      return this.elements[0].innerHTML;
    }
    this.elements.forEach( (el) => {
      el.innerHTML = str;
    });
  }

  empty() {
    this.html("");
  }

  append(args) {
    if (args instanceof HTMLElement) {
      for (let i = 0; i < this.elements.length; i++) {
          this.elements[i].innerHTML += args.outerHTML;
      }
    }
    else if (typeof args === "string") {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML += args;
      }
    }
    else {
      for (let i = 0; i < this.elements.length; i++) {
        for (let j=0; j < args.elements.length; j++) {
          this.elements[i].innerHTML += args.elements[j].outerHTML;
        }
      }
    }
  }

  attr(reader, setter){
    if (setter === undefined) {
      return this.elements[0].getAttribute( reader );
    }
    else {
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(reader, setter);
      }
      return this;
    }
  }

  addClass(arg) {
    for (let i = 0; i < this.elements.length; i++) {
      let classes = this.elements[i].getAttribute('class');
      classes += ` ${arg}`;
      this.elements[i].setAttribute('class', classes);
    }
    return this;
  }

  removeClass(arg) {
    for (let i = 0; i < this.elements.length; i++) {
      let classes = this.elements[i].getAttribute('class');
      classes = classes.split(' ');
      classes = classes.filter( (el) => !(el === arg));
      this.elements[i].setAttribute('class', classes);
    }
    return this;
  }

  children() {
    let dom = new DomNodeCollection([]);
    for (let i = 0; i < this.elements.length; i++) {
      let children = this.elements[i].children;
      for (let j = 0; j < children.length; j++) {
        dom.elements.push(children[j]);
      }
    }
    return dom;
  }

  parent() {
    let dom = new DomNodeCollection([]);
    for (var i = 0; i < this.elements.length; i++) {
      dom.elements.push(this.elements[i].parentElement);
    }
    return dom;
  }

  find(arg) {
    let dom = new DomNodeCollection([]);
    for (var i = 0; i < this.elements.length; i++) {
      let collection = this.elements[i].querySelectorAll(arg);
      for (let j=0; j < collection.length; j++){
        dom.elements.push(collection[j]);
      }
    }

    return dom;
  }


  remove() {
    this.elements.forEach( el => el.outerHTML = "");
    this.elements = [];
  }

  on(e, cb) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(e, cb);
      this.elements[i].callback = cb;
    }
  }

  off(e) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].removeEventListener(e, this.elements[i].callback);
    }
  }


}

module.exports = DomNodeCollection;


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ "./lib/dom_node_collection.js");


let $l = function(arg) {
  if (arg instanceof HTMLElement) {
    let argsArray = Array.from(arg);
    return new DomNodeCollection(argsArray);
  } else if (typeof arg === 'function') {
    registerDocReadyCallback(arg);
  } else {
    let nodeList = document.querySelectorAll(arg);
    let nodeArray = Array.from(nodeList);
    return new DomNodeCollection(nodeArray);
  }
};

const docReadyCallbacks = [];
let docReady = false;

const registerDocReadyCallback = (callback) => {
  if (!docReady) {
    docReadyCallbacks.push(callback);
  } else {
    callback();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  docReadyCallbacks.forEach(callback => callback());
});

$l.extend = (baseObj, ...otherObjs) => {
  otherObjs.forEach( obj => {
    if (typeof obj === 'object') {
      for (const key in obj) {
        baseObj[key] = obj[key];
      }
    }
  });
  return baseObj;
};

$l.ajax = (options) => {
  const vanillaRequest = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };

  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET") {
    options.url += `?${QueryString(options.data)}`;
  }

  vanillaRequest.open(options.method, options.url, true);

  vanillaRequest.onload = (e) => {
    if (vanillaRequest.status === 200) {
      options.success(vanillaRequest.response);
    } else {
      options.error(vanillaRequest.response);
    }
  };

  vanillaRequest.send(JSON.stringify(options.data));
};

const QueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

window.$l = $l;


/***/ })

/******/ });
//# sourceMappingURL=Aquery_lite.js.map