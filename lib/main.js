const DomNodeCollection = require("./dom_node_collection.js");


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
    success: (response) => {console.log(response)},
    error: (response) => {console.log(response)},
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
