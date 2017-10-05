# FontFaceLoader

A small Javascript class to load a font-face from a URL.

In order to support a technical need for loading remote fonts, and knowing when and if those fonts loaded successfully (and why), I wrote this small class.

To use it, simply construct a FontFaceLoader object, passing the URL and intended font-family name:

<pre>
var loader = new FontFaceLoader('http://mycooldomain.com/fonts/specialfont.ttf', 'SpecialFont');
</pre>

and then call load(), which returns a Promise:

<pre>
loader.load().then(
  function() {
    // do whatever is needed now that the font is loaded
  },
  function(error) {
    // handle the error
  }
);
</pre>
