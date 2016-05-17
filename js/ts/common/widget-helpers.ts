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