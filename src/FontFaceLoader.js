class FontFaceLoader {

  constructor(url, name) {
    this.url = url;
    this.name = name;
    this.alreadyLoaded = false;
  };

  load() {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.addEventListener("readystatechange", function(event) {
        if (event.target.readyState === XMLHttpRequest.DONE) {
          if (event.target.status === 200) {
            var reader = new window.FileReader();
            reader.onloadend = function() {
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
  };

  fontFaceExists() {
    return (document.head.querySelector('style[fontfaceloadername="' + this.name + '"]') !== null);
  };

};

export default FontFaceLoader;
