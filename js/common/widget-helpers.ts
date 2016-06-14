/// <reference path="../../typings/jquery/jquery.d.ts" />

interface IHelperFormBorderType { panel: IHelperNameId; well: IHelperNameId; none: IHelperNameId }
interface IHelperNameId { id: string; name: string; }
interface IHelperNameNumId { id: number; name: string; }

interface IHelperBootstrap { inputSizing: IHelperBsInputSizing; gridSizing: IHelperBsGridSizing; }
interface IHelperBsInputSizing { sm: string; lg: string; }
interface IHelperBsGridSizing { xs: string; sm: string; md: string; lg: string; }


interface IWidgetAvailableField {
	id?: string;
	name: string;
	isLTRequired?: boolean;
	isIncluded?: boolean;
	allowMultiples?: boolean;
	hideFromList?: boolean;
	fieldTemplate?: IWidgetField;
}

interface IWidgetField {
	field?: string;
	element?: string;
	id?: string;
	type?: string;
	style?: Object;
	placeholder?: string;
	required?: boolean;
	cols?: number;
	rows?: number;
	cssClass?: string;
	value?: string;
	size?: string;
	pattern?: string;
	alttext?: string;
	tabindex?: number;
	nsize?: number;
}

interface IState {
	abbreviation: string;
	name: string;
}

interface IStates {
	country: string;
	states: IState[];
}

namespace LoanTekWidget {
	class hSizing {
		public h1: IHelperNameNumId;
		public h2: IHelperNameNumId;
		public h3: IHelperNameNumId;
		public h4: IHelperNameNumId;
		public h5: IHelperNameNumId;
		public h6: IHelperNameNumId;
		// public default: IHelperNameNumId;
		constructor() {
			this.h1 = { id: 1, name: 'h1' };
			this.h2 = { id: 2, name: 'h2' };
			this.h3 = { id: 3, name: 'h3' };
			this.h4 = { id: 4, name: 'h4' };
			this.h5 = { id: 5, name: 'h5' };
			this.h6 = { id: 6, name: 'h6' };
			// this.default = this.h4;
		}

		getDefault(): IHelperNameNumId {
			return this.h4;
		}
	}

	class inputSizing {
		public sm: IHelperNameId;
		public md: IHelperNameId;
		public lg: IHelperNameId;
		constructor() {
			this.sm = { id: 'sm', name: 'Small' };
			this.md = { id: 'md', name: 'Medium' }
			this.lg = { id: 'lg', name: 'Large' };
		}

		getDefault(): IHelperNameId {
			return this.md;
		}
	}

	class gridSizing {
		public xs: IHelperNameId;
		public sm: IHelperNameId;
		public md: IHelperNameId;
		public lg: IHelperNameId;
		// public default: IHelperNameId;
		constructor() {
			this.xs = { id: 'xs', name: 'xs' };
			this.sm = { id: 'sm', name: 'sm' };
			this.md = { id: 'md', name: 'md' };
			this.lg = { id: 'lg', name: 'lg' };
			// this.default = this.md;
		}

		// getDefault(): IHelperNameId {
		// 	return this.md;
		// }
	}

	class gridColumns {
		public n1: IHelperNameNumId;
		public n2: IHelperNameNumId;
		public n3: IHelperNameNumId;
		public n4: IHelperNameNumId;
		public n5: IHelperNameNumId;
		public n6: IHelperNameNumId;
		public n7: IHelperNameNumId;
		public n8: IHelperNameNumId;
		public n9: IHelperNameNumId;
		public n10: IHelperNameNumId;
		public n11: IHelperNameNumId;
		public n12: IHelperNameNumId;
		constructor() {
			this.n1 = { id: 1, name: '1/12th' }
			this.n2 = { id: 2, name: '1/6th' }
			this.n3 = { id: 3, name: '1/4th' }
			this.n4 = { id: 4, name: '1/3rd' }
			this.n5 = { id: 5, name: '5/12ths' }
			this.n6 = { id: 6, name: '1/2' }
			this.n7 = { id: 7, name: '7/12ths' }
			this.n8 = { id: 8, name: '2/3rds' }
			this.n9 = { id: 9, name: '3/4ths' }
			this.n10 = { id: 10, name: '5/6ths' }
			this.n11 = { id: 11, name: '11/12ths' }
			this.n12 = { id: 12, name: 'full' }
		}

		// getDefault(): IHelperNameNumId {
		// 	return this.n12;
		// }

		// asArray(): IHelperNameNumId[] {
		// 	return helpers.prototype.ConvertObjectToArray<IHelperNameNumId>(this);
		// }
	}

	class bootstrap {
		public inputSizing: inputSizing;
		public gridSizing: gridSizing;
		public gridColumns: gridColumns;
		public gridColumnsArray: IHelperNameNumId[];
		constructor() {
			this.inputSizing = new inputSizing;
			this.gridSizing = new gridSizing;
			this.gridColumns = new gridColumns;
			this.gridColumnsArray = helpers.prototype.ConvertObjectToArray<IHelperNameNumId>(this.gridColumns);
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

		getDefault(): IHelperNameId {
			return this.per;
		}
	}

	class widgetType {
		public contact: IHelperNameId;
		public quote: IHelperNameId;
		public rate: IHelperNameId;
		constructor() {
			this.contact = { id: 'contact', name: 'Contact' };
			this.quote = { id: 'quote', name: 'Quote' };
			this.rate = { id: 'rate', name: 'Rate' };
		}
	}

	class contactFields {
		clientid: IWidgetAvailableField;
		userid: IWidgetAvailableField;
		firstname: IWidgetAvailableField;
		lastname: IWidgetAvailableField;
		email: IWidgetAvailableField;
		phone: IWidgetAvailableField;
		company: IWidgetAvailableField;
		state: IWidgetAvailableField;
		comments: IWidgetAvailableField;
		captcha: IWidgetAvailableField;
		submit: IWidgetAvailableField;
		resultmessage: IWidgetAvailableField;
		label: IWidgetAvailableField;
		title: IWidgetAvailableField;
		paragraph: IWidgetAvailableField;
		constructor() {
			this.clientid = { id: 'clientid', name: 'Client ID', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltcwClientId', value: 'LTWS' } };
			this.userid = { id: 'userid', name: 'User Id', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltcwUserId', value: 'UserID###' } };
			this.firstname = { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltcwFirstName', placeholder: 'First Name', required: true } };
			this.lastname = { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true } };
			this.email = { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { element: 'input', type: 'email', id: 'ltcwEmail', placeholder: 'Email', required: true } };
			this.phone = { id: 'phone', name: 'Phone', fieldTemplate: { element: 'input', type: 'tel', id: 'ltcwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}' } };
			this.company = { id: 'company', name: 'Company', fieldTemplate: { element: 'input', type: 'text', id: 'ltcwCompany', placeholder: 'Company' } };
			this.state = { id: 'state', name: 'State', fieldTemplate: { element: 'select', type: 'state', id: 'ltcwState', placeholder: 'Select a State' } };
			this.comments = { id: 'comments', name: 'Comments', fieldTemplate: { element: 'textarea', id: 'ltcwComments', placeholder: 'Comments', rows: 4 } };
			this.captcha = { id: 'captcha', name: 'Captcha', fieldTemplate: { element: 'captcha' } };
			this.submit = { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'button', type: 'submit', cssClass: 'btn-primary', value: 'Submit' } };
			this.resultmessage = { id: 'resultmessage', name: 'Message Upon Submit', fieldTemplate: { element: 'div', id: 'ltcwResultMessage' } };
			this.label = { id: 'label', name: 'Label', allowMultiples: true, fieldTemplate: { element: 'label' } };
			this.title = { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { element: 'title' } };
			this.paragraph = { id: 'paragraph', name: 'Paragraph', allowMultiples: true, fieldTemplate: { element: 'p' } };
		}
	}

	export class helpers {
		public $: JQueryStatic;
		public bootstrap: bootstrap;
		public hsize: hSizing;
		public formBorderType: formBorderType;
		public formBorderTypeArray: IHelperNameId[];
		public widthUnit: widthUnit;
		public widgetType: widgetType;
		// public defaultFormWidthUnit: IHelperNameId;
		// public defaultBorderRadius: number;
		public defaultVerticalSpacing: number;
		public defaultFormSpecifierClass: string;
		public defaultResultSpecifierClass: string;
		public contactFields: contactFields;
		public contactFieldsArray: IWidgetAvailableField[];

		constructor(jq: JQueryStatic) {
			// window.console && console.log('helper constructed');
			this.$ = jq;

			this.hsize = new hSizing;
			this.bootstrap = new bootstrap;
			this.formBorderType = new formBorderType;
			this.formBorderTypeArray = this.ConvertObjectToArray<IHelperNameId>(this.formBorderType);
			this.widthUnit = new widthUnit;
			this.widgetType = new widgetType;
			// this.defaultFormWidthUnit = this.widthUnit.per;
			// this.defaultBorderRadius = 4;
			this.defaultVerticalSpacing = 15;
			this.defaultFormSpecifierClass = 'ltwF';
			this.defaultResultSpecifierClass = 'ltwR';
			this.contactFields = new contactFields;
			this.contactFieldsArray = this.ConvertObjectToArray<IWidgetAvailableField>(this.contactFields);
		}

		isNumber(numCheck: any): boolean {
			return typeof numCheck === 'number';
		}

		isStringNullOrEmpty(stringCheck: string): boolean {
			return stringCheck === '' || typeof stringCheck !== 'string';
		}

		getDefaultBorderRadius(fieldSize: string = ''): number {
			var rad = 4;
			if (fieldSize === this.bootstrap.inputSizing.sm.id) {
				rad = 3;
			} else if ( fieldSize === this.bootstrap.inputSizing.lg.id) {
				rad = 6;
			}
			return rad;
		}

		ConvertObjectToArray<T>(theObj: Object): T[] {
			var objArray = [];
			for (var key in theObj) {
				var objVal = theObj[key];
				if (objVal && typeof objVal !== 'function') {
					objArray.push(objVal);
				}
			}
			return objArray;
		}

		ConvertArrayToObject<T>(theArray: Object[], theKey?: string): T {
			theKey = theKey || 'id';
			var returnObj = <T>{};
			for (var i = 0, l = theArray.length; i < l; i++) {
				var obj = theArray[i];
				var objectKey = obj[theKey];
				if (objectKey) {
					// window.console && console.log('objectKey', objectKey);
					returnObj[objectKey] = obj;
				}
			}
			// window.console && console.log('returnObj', returnObj);
			return returnObj;
		}

		GetIndexOfFirstObjectInArray(theArray, theKey, theValue): number {
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
				var indexOfStart = m.indexOf('{') + 1;
				var spaceFromEnd = m.length - m.indexOf('}');
				var rt = m.substr(indexOfStart);
				rt = rt.substr(0, rt.length - spaceFromEnd);
				if (!parameters[rt]) {
					window.console && console.warn('Interpolate Warning: Parameter not found for ' + m);
					rt = m;
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

		US_States(): IStates {
			var s: IStates = {
				country: 'USA',
				states: [
					{ abbreviation: 'AL', name: 'Alabama' },
					{ abbreviation: 'AK', name: 'Alaska' },
					{ abbreviation: 'AZ', name: 'Arizona' },
					{ abbreviation: 'AR', name: 'Arkansas' },
					{ abbreviation: 'CA', name: 'California' },
					{ abbreviation: 'CO', name: 'Colorado' },
					{ abbreviation: 'CT', name: 'Connecticut' },
					{ abbreviation: 'DE', name: 'Delaware' },
					{ abbreviation: 'DC', name: 'District Of Columbia' },
					{ abbreviation: 'FL', name: 'Florida' },
					{ abbreviation: 'GA', name: 'Georgia' },
					{ abbreviation: 'HI', name: 'Hawaii' },
					{ abbreviation: 'ID', name: 'Idaho' },
					{ abbreviation: 'IL', name: 'Illinois' },
					{ abbreviation: 'IN', name: 'Indiana' },
					{ abbreviation: 'IA', name: 'Iowa' },
					{ abbreviation: 'KS', name: 'Kansas' },
					{ abbreviation: 'KY', name: 'Kentucky' },
					{ abbreviation: 'LA', name: 'Louisiana' },
					{ abbreviation: 'ME', name: 'Maine' },
					{ abbreviation: 'MD', name: 'Maryland' },
					{ abbreviation: 'MA', name: 'Massachusetts' },
					{ abbreviation: 'MI', name: 'Michigan' },
					{ abbreviation: 'MN', name: 'Minnesota' },
					{ abbreviation: 'MS', name: 'Mississippi' },
					{ abbreviation: 'MO', name: 'Missouri' },
					{ abbreviation: 'MT', name: 'Montana' },
					{ abbreviation: 'NE', name: 'Nebraska' },
					{ abbreviation: 'NV', name: 'Nevada' },
					{ abbreviation: 'NH', name: 'New Hampshire' },
					{ abbreviation: 'NJ', name: 'New Jersey' },
					{ abbreviation: 'NM', name: 'New Mexico' },
					{ abbreviation: 'NY', name: 'New York' },
					{ abbreviation: 'NC', name: 'North Carolina' },
					{ abbreviation: 'ND', name: 'North Dakota' },
					{ abbreviation: 'OH', name: 'Ohio' },
					{ abbreviation: 'OK', name: 'Oklahoma' },
					{ abbreviation: 'OR', name: 'Oregon' },
					{ abbreviation: 'PA', name: 'Pennsylvania' },
					{ abbreviation: 'RI', name: 'Rhode Island' },
					{ abbreviation: 'SC', name: 'South Carolina' },
					{ abbreviation: 'SD', name: 'South Dakota' },
					{ abbreviation: 'TN', name: 'Tennessee' },
					{ abbreviation: 'TX', name: 'Texas' },
					{ abbreviation: 'UT', name: 'Utah' },
					{ abbreviation: 'VT', name: 'Vermont' },
					{ abbreviation: 'VA', name: 'Virginia' },
					{ abbreviation: 'WA', name: 'Washington' },
					{ abbreviation: 'WV', name: 'West Virginia' },
					{ abbreviation: 'WI', name: 'Wisconsin' },
					{ abbreviation: 'WY', name: 'Wyoming' }
				]
			};
			return s;
		}

		// ContactFields(): IWidgetAvailableField[] {
		// 	var contactFields: IWidgetAvailableField[] = [
		// 		{ id: 'ltcwClientId', name: 'Client ID', isLTRequired: true, fieldTemplate: {}  }
		// 	];
		// 	return contactFields;
		// }
	}
}
