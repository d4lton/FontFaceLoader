(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FontFaceLoader = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var FontFaceLoader = function () {
  function FontFaceLoader(url, name) {
    classCallCheck(this, FontFaceLoader);

    this.url = url;
    this.name = name;
    this.alreadyLoaded = false;
  }

  createClass(FontFaceLoader, [{
    key: "load",
    value: function load() {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.addEventListener("readystatechange", function (event) {
          if (event.target.readyState === XMLHttpRequest.DONE) {
            if (event.target.status === 200) {
              var reader = new window.FileReader();
              reader.onloadend = function () {
                if (!this.fontFaceExists()) {
                  var style = document.createElement('style');
                  style.setAttribute('FontFaceLoaderName', this.name);
                  style.appendChild(document.createTextNode('@font-face {font-family: "' + this.name + '"; src: url(' + reader.result + ');}'));
                  document.head.appendChild(style);
                } else {
                  this.alreadyLoaded = true;
                }
                resolve(this);
              }.bind(this);
              reader.readAsDataURL(event.target.response);
            } else {
              reject('Unable to load font from ' + this.url + ', ' + event.target.status + ': ' + event.target.statusText);
            }
          }
        }.bind(this), false);
        xhr.open("GET", this.url);
        if (this.fontFaceExists()) {
          this.alreadyLoaded = true;
          resolve(this);
        } else {
          xhr.send();
        }
      }.bind(this));
    }
  }, {
    key: "fontFaceExists",
    value: function fontFaceExists() {
      return document.head.querySelector('style[fontfaceloadername="' + this.name + '"]') !== null;
    }
  }]);
  return FontFaceLoader;
}();

return FontFaceLoader;

})));
//# sourceMappingURL=FontFaceLoader.umd.js.map
