#Widget Test



## Installation

Make sure nodejs is installed.

The following NPM packages should be installed globally: http-server, bower, typescript

To view your currently installed global npm packages, use the following:

```bash
npm list -g --depth=0
```

To install the packages, use the following:
```bash
sudo npm install -g http-server bower typescript
```

Now install needed dev dependencies
```bash
npm install
```

If you want to use [legacy bundling](http://stackoverflow.com/a/35227212) instead:
```bash
npm install --legacy-bundling
```



## Typescript

To compile on save changes, use the gulp task:

```bash
npm run ts:watch
```



## Captcha

Javascript

http://www.codeproject.com/Articles/42842/Implementation-of-Captcha-in-Javascript

http://stackoverflow.com/questions/3196335/how-to-create-simple-javascript-jquery-client-side-captcha


Safe Characters for Captcha

https://www.grc.com/ppp.htm


CSS Image Conversion

http://css-image.org/

Canvas

https://gist.github.com/SneakyBrian/5209271



## JavaScript String Interpolation

https://gist.github.com/NaniSore/3191000

https://gist.github.com/search?l=javascript&q=javascript+interpolation&ref=searchresults&utf8=%E2%9C%93



## Compile code for Angular after being dynamically added.

https://docs.angularjs.org/api/ng/service/$compile

http://stackoverflow.com/questions/20297638/call-function-inside-sce-trustashtml-string-in-angular-js


## Copy to clipboard

http://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript



## Angular

[Alternative to Watching](https://www.accelebrate.com/blog/effective-strategies-avoiding-watches-angularjs/)


## How to load JavaScript Dynamically

If you use jQuery to dynamically load other JavaScript resources like this:
```javascript
var script = $('<script />').attr('src', 'myScript.js');
$('body').first().append(script);
```

you get an error something like:

	Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help http://xhr.spec.whatwg.org/

This code example from [unixpapa.com](http://unixpapa.com/js/dyna.html) explains how to deal with this in a better way
```javascript
var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'helper.js';
      head.appendChild(script);
```


## Drag and Drop

http://codef0rmer.github.io/angular-dragdrop/#!/
https://github.com/marceljuenemann/angular-drag-and-drop-lists
http://ngmodules.org/modules/ngDraggable
