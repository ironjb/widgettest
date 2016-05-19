/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="interfaces-widget.d.ts" />

class LoanTekWidgetHelpers {
	private $: JQueryStatic;

	constructor(jquery: JQueryStatic) {
		this.$ = jquery;
	}

	bootstrap = {
		gridSizing: {
			xs: 'xs'
			, sm: 'sm'
			, md: 'md'
			, lg: 'lg'
		},
		inputSizing: {
			sm: 'sm'
			, lg: 'lg'
		}
	};

	widthUnit = {
		px: 'px'
		, per: '%'
	};

	GetIndexOfFirstObjectInArray (theArray, theKey, theValue): number {
		for (var i = 0, l = theArray.length; i < l; i++) {
			if (theArray[i][theKey] === theValue) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * Performs string interpolation similar to the style of Ruby
	 * @param  {string}   text       String to interpolate
	 * @param  {Object}   parameters Parameters passed in that will placed in the string
	 * @param  {Function} fn         Optional: function that performs additional modifications
	 * @param  {RegExp}   regex      Optional: new RegEx to use
	 * @return {string}              Return of updated string
	 */
	Interpolate(text: string, parameters: Object, fn?: Function, regex?: RegExp): string {
		text = text || '';
		parameters = parameters || {};
		fn = fn || function(x) { return x; };
		regex = regex || /#{[^\}]+}/g;
		return text.replace(regex, function(m, p, ft) {
			// window.console && console.log(m);
			var indexOfStart = m.indexOf('{') + 1;
			var spaceFromEnd = m.length - m.indexOf('}');
			// window.console && console.log(spaceFromEnd);
			// window.console && console.log(indexOfStart);
			var rt = m.substr(indexOfStart);
			rt = rt.substr(0, rt.length - spaceFromEnd);
			// window.console && console.log(rt);
			if (!parameters[rt]) {
				window.console && console.warn('Interpolate Warning: Parameter not found for ' + m);
				rt = m;
				// window.console && console.log('m', m, 'p', p, 'ft', ft, 'end error rt');
			} else {
				rt = parameters[rt].toString() || '';
			}
			return fn(rt);
		});
	}

	CreateElement() {
		var $ = this.$;
		return {
			div: () => { return $('<div/>'); }
			, script: (src?: string, type: string = 'text/javascript') => {
				var returnScript = $('<script/>').prop('type', type);
				returnScript = src ? returnScript.prop('src', src) : returnScript;
				return returnScript;
			}
			, link: (href?: string, rel: string = 'stylesheet') => {
				var returnLink = $('<link/>').prop('rel', rel);
				returnLink = href ? returnLink.prop('href', href) : returnLink;
				return returnLink;
			}
			, style: (type: string = 'text/css') => {
				var returnStyle = $('<style/>').prop('type', type);
				return returnStyle;
			}
		};
	}

	// ContactFields(): IWidgetAvailableField[] {
	// 	var contactFields: IWidgetAvailableField[] = [
	// 		{ id: 'ltcwClientId', name: 'Client ID', isLTRequired: true, fieldTemplate: {}  }
	// 	];
	// 	return contactFields;
	// }
}