// Polyfill for querySelectorAll for pretty much all older versions of IE
// http://www.codecouch.com/2012/05/adding-document-queryselectorall-support-to-ie-7/
(function () {
	if (!document.querySelectorAll) {
		// had to wrap in if statement because it was causing IE11 to break.
		(function() {
			var d: any = document, s = d.createStyleSheet();
			d.querySelectorAll = function(r, c, i, j, a) {
				a=d.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
				for (i=r.length; i--;) {
					s.addRule(r[i], 'k:v');
					for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
					s.removeRule(0);
				}
				return c;
			};
		})();
	}
	if (!document.querySelector) {
		document.querySelector = function (selectors) {
			var elements = document.querySelectorAll(selectors);
			return (elements.length) ? elements[0] : null;
		};
	}
})();
