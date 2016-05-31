/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="interfaces-widget.d.ts" />

namespace LoanTekWidgetHelpers {
	interface IHelperFormBorderType { panel: IHelperNameId; well: IHelperNameId; none: IHelperNameId }
	interface IHelperNameId { id: string; name: string; }
	interface IHelperNameNumId { id: number; name: string; }

	interface IHelperBootstrap { inputSizing: IHelperBsInputSizing; gridSizing: IHelperBsGridSizing; }
	interface IHelperBsInputSizing { sm: string; lg: string; }
	interface IHelperBsGridSizing { xs: string; sm: string; md: string; lg: string; }

	class hSizing {
		public h1: IHelperNameNumId;
		public h2: IHelperNameNumId;
		public h3: IHelperNameNumId;
		public h4: IHelperNameNumId;
		public h5: IHelperNameNumId;
		public h6: IHelperNameNumId;
		public default: IHelperNameNumId;
		constructor() {
			this.h1 = { id: 1, name: 'h1' };
			this.h2 = { id: 2, name: 'h2' };
			this.h3 = { id: 3, name: 'h3' };
			this.h4 = { id: 4, name: 'h4' };
			this.h5 = { id: 5, name: 'h5' };
			this.h6 = { id: 6, name: 'h6' };
			this.default = this.h4;
		}
	}

	class inputSizing {
		public sm: IHelperNameId;
		public lg: IHelperNameId;
		constructor() {
			this.sm = { id: 'sm', name: 'Small' };
			this.lg = { id: 'lg', name: 'Large' };
		}
	}

	class gridSizing {
		public xs: IHelperNameId;
		public sm: IHelperNameId;
		public md: IHelperNameId;
		public lg: IHelperNameId;
		public default: IHelperNameId;
		constructor() {
			this.xs = { id: 'xs', name: 'xs' };
			this.sm = { id: 'sm', name: 'sm' };
			this.md = { id: 'md', name: 'md' };
			this.lg = { id: 'lg', name: 'lg' };
			this.default = this.md;
		}
	}

	class bootstrap {
		public inputSizing: inputSizing;
		public gridSizing: gridSizing;
		constructor() {
			this.inputSizing = new inputSizing;
			this.gridSizing = new gridSizing;
		}
	}

	class formBorderType {
		public panel: IHelperNameId;
		public well: IHelperNameId;
		public none: IHelperNameId;
		constructor() {
			this.panel = { id: 'panel', name: 'Panel' };
			this.well = { id: 'well', name: 'Well' };
			this.none = { id: 'none', name: 'None' };
		}
	}

	class widthUnit {
		px: IHelperNameId;
		per: IHelperNameId;
		constructor() {
			this.px = { id: 'px', name: 'Pixels' };
			this.per = { id: '%', name: 'Percent' };
		}
	}

	// export class properties {
	// 	public bootstrap: bootstrap;
	// 	public hsize: hSizing;
	// 	public formBorderType: formBorderType;
	// 	public formBorderTypeArray: IHelperNameId[];
	// 	public widthUnit: widthUnit;
	// 	constructor() {
	// 		// var mthd = methods.prototype.ConvertObjectToArray<IHelperNameId>();
	// 		this.hsize = new hSizing;
	// 		this.bootstrap = new bootstrap;
	// 		this.formBorderType = new formBorderType;
	// 		this.formBorderTypeArray = methods.prototype.ConvertObjectToArray<IHelperNameId>(this.formBorderType);
	// 		this.widthUnit = new widthUnit;
	// 	}
	// }

	export class helpers {
		private $: JQueryStatic;
		public bootstrap: bootstrap;
		public hsize: hSizing;
		public formBorderType: formBorderType;
		public formBorderTypeArray: IHelperNameId[];
		public widthUnit: widthUnit;

		constructor(jq: JQueryStatic) {
			this.$ = jq;

			this.hsize = new hSizing;
			this.bootstrap = new bootstrap;
			this.formBorderType = new formBorderType;
			this.formBorderTypeArray = this.ConvertObjectToArray<IHelperNameId>(this.formBorderType);
			this.widthUnit = new widthUnit;
		}

		// bootstrap: IHelperBootstrap = {
		// 	inputSizing: {
		// 		sm: 'sm'
		// 		, lg: 'lg'
		// 	}
		// 	, gridSizing: {
		// 		xs: 'xs'
		// 		, sm: 'sm'
		// 		, md: 'md'
		// 		, lg: 'lg'
		// 	}
		// };

		// hSizing = {
		// 	h1: { id: 1, name: 'h1' }
		// 	, h2: { id: 2, name: 'h2' }
		// 	, h3: { id: 3, name: 'h3' }
		// 	, h4: { id: 4, name: 'h4' }
		// 	, h5: { id: 5, name: 'h5' }
		// 	, h6: { id: 6, name: 'h6' }
		// 	, default: this.hSizing.h3
		// };

		// let hSize: AbsHSizing;
		// hSize = new AbsHSizing();

		// hSizing = {
		// 	h1: 1
		// 	, h2: 2
		// 	, h3: 3
		// 	, h4: 4
		// 	, h5: 5
		// 	, h6: 6
		// 	, default: 4
		// };

		// widthUnit = {
		// 	px: 'px'
		// 	, per: '%'
		// };

		// formBorderTypeArray: IHelperNameId[] = [
		// 	{ id: 'panel', name: 'Panel' }
		// 	, { id: 'well', name: 'Well' }
		// ];

		// formBorderType = this.ConvertArrayToObject<IHelperFormBorderType>(this.formBorderTypeArray);

		// formBorderType = {
		// 	panel: 'panel'
		// 	, well: 'well'
		// };

		// formBorderType: IHelperFormBorderType = {
		// 	panel: { id: 'panel', name: 'Panel' }
		// 	, well: { id: 'well', name: 'Well' }
		// 	, none: { id: 'none', name: 'None'}
		// };

		// formBorderTypeArray = this.ConvertObjectToArray<IHelperNameId>(this.formBorderType);

		ConvertObjectToArray<T> (theObj: Object): T[] {
			var objArray = [];
			for (var key in theObj) {
				var objVal = theObj[key];
				// window.console && console.log(key, objVal);
				if (objVal) {
					objArray.push(objVal);
				}
			}
			return objArray;
		}

		ConvertArrayToObject<T> (theArray: Object[], theKey?: string): T {
			theKey = theKey || 'id';
			var returnObj = <T>{};
			for (var i = 0, l = theArray.length; i < l; i++) {
				var obj = theArray[i];
				var objectKey = obj[theKey];
				if (objectKey) {
					window.console && console.log('objectKey', objectKey);
					returnObj[objectKey] = obj;
				}
			}
			window.console && console.log('returnObj', returnObj);
			return returnObj;
		}

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
			var el = {
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
				, p: () => { return $('<p/>'); }
				, span: () => { return $('<span/>'); }
				, h: (headNumber: number = 3) => { return $('<h' + headNumber + '/>'); }
				// div: () => { return $('<div/>'); },
				, form: () => { return $('<form/>').addClass('form-horizontal'); },
				label: () => { return $('<label/>').addClass('control-label col-sm-12'); },
				button: (type: string = 'button') => { return $('<button/>').prop('type', type); },
				select: () => { return $('<select/>').addClass('form-control'); },
				option: () => { return $('<option/>'); },
				input: (type: string = 'text') => {
					return $('<input/>').prop('type', type);
				},
				textarea: () => { return $('<textarea/>').addClass('form-control'); },
				col: (colNumber: number = 12, colSize: string = 'sm') => { return el.div().addClass('col-' + colSize + '-' + colNumber.toString()); },
				row: (rowType: string = 'row') => { return el.div().addClass(rowType); },
				formGroup: (formGroupSize?: string) => {
					if (formGroupSize) {
						return el.row('form-group').addClass('form-group-' + formGroupSize);
					} else {
						return el.row('form-group');
					}
				}
			};
			return el;
		}

		ScrollToAnchor(anchorName: string, scrollSpeed?: number, topOffset?: number) {
			$ = this.$;
			scrollSpeed = scrollSpeed || 200;
			topOffset = topOffset || 50;
			$('html, body').animate({
				scrollTop: ($('a[name=' + anchorName + ']').offset().top) - topOffset
			}, scrollSpeed);
		}

		// ContactFields(): IWidgetAvailableField[] {
		// 	var contactFields: IWidgetAvailableField[] = [
		// 		{ id: 'ltcwClientId', name: 'Client ID', isLTRequired: true, fieldTemplate: {}  }
		// 	];
		// 	return contactFields;
		// }
	}
}