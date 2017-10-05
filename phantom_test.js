var page = require('webpage').create();

page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log(msg, lineNum, sourceId);
};

page.injectJs('lib/promise.js');
page.injectJs('dist/FontFaceLoader.umd.js');

page.evaluate(function() {
  try {
  var loader = new FontFaceLoader('http://basken.com/FontFaceLoader/fonts/Pink kangaroo.ttf', 'PinkKangaroo');
    loader.load().then(
      function() {
        console.log('font loaded');
      },
      function(error) {
        console.log(error);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//phantom.exit();
