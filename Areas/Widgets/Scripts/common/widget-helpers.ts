/// <reference path="../../../../Scripts/typings/jquery/jquery.d.ts" />

declare namespace LTWidget {
	interface IResultBuildOptions extends IBuildOptions {
		resultWrapperId?: string;
	}

	interface IFieldListOptions extends IBuildOptions {
		//
	}

	interface IBuildOptions {
		formBorderType?: string;
		widgetType?: string;
		widgetChannel?: string;		// 'form' | 'result'
		panelTitle?: string;
		showBuilderTools?: boolean;
		showNoDataMessage?: boolean;
		fields?: IWidgetField[];
		fieldSize?: string;
		fieldHelperType?: string;
		successMessageWrapperId?: string;
		noDataMessageWrapperId?: string;
		uniqueQualifier?: string;

		formWidth?: number;
		formWidthUnit?: string;
		formFontColor?: string;
		formBg?: string;
		formBorderRadius?: number;
		formBorderColor?: string;
		formTitleColor?: string;
		formTitleBgColor?: string;
		formGroupSpacing?: number;
		formFieldBorderRadius?: number;
		formButtonBorderRadius?: number;
	}
}

interface IHelperFormBorderType { panel: IHelperNameId; well: IHelperNameId; none: IHelperNameId }
interface IHelperNameId { id: string; name: string; }
interface IHelperNameNumId { id: number; name: string; }
interface IHelperNameValue { name: string; value: string; }

interface IHelperBootstrap { inputSizing: IHelperBsInputSizing; gridSizing: IHelperBsGridSizing; }
interface IHelperBsInputSizing { sm: string; lg: string; }
interface IHelperBsGridSizing { xs: string; sm: string; md: string; lg: string; }


interface IWidgetFieldOptions {
	id?: string;
	name: string;
	groupName?: string;
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
	style?: string;
	placeholder?: string;
	required?: boolean;
	cols?: number;
	offsetCols?: number;
	rows?: number;
	cssClass?: string;
	value?: string|number;
	size?: string;
	pattern?: string;
	alttext?: string;
	tabindex?: number;
	nsize?: number;
	attrs?: IHelperNameValue[];

	color?: string;
	fontSize?: number;
	backgroundColor?: string;
	borderRadius?: number;
	borderColor?: string;
	padding?: number;
	marginTopBottom?: number;
	align?: string;

	fieldListOptions?: LTWidget.IFieldListOptions;
	fieldData?: any[];
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
	export class helpers {
		public $: JQueryStatic;
		public bootstrap: bootstrap;
		public hsize: hSizing;
		public formBorderType: formBorderType;
		public formBorderTypeArray: IHelperNameId[];
		public widthUnit: widthUnit;
		public widgetType: widgetType;
		public defaultVerticalSpacing: number;
		public defaultFormSpecifierClass: string;
		public defaultResultSpecifierClass: string;
		public contactFields: contactFields;
		public depositFields: depositFields;
		public depositResultFields: depositResultFields;
		public depositResultDataFields: depositResultDataFields;
		public contactFieldsArray: IWidgetFieldOptions[];
		public postObjects: postObjects;

		constructor(jq: JQueryStatic) {
			this.$ = jq;

			this.hsize = new hSizing();
			this.bootstrap = new bootstrap();
			this.formBorderType = new formBorderType();
			this.formBorderTypeArray = this.ConvertObjectToArray<IHelperNameId>(this.formBorderType);
			this.widthUnit = new widthUnit();
			this.widgetType = new widgetType();
			this.defaultVerticalSpacing = 15;
			this.defaultFormSpecifierClass = 'ltwF';
			this.defaultResultSpecifierClass = 'ltwR';
			this.contactFields = new contactFields();
			this.contactFieldsArray = this.ConvertObjectToArray<IWidgetFieldOptions>(this.contactFields);
			this.depositFields = new depositFields();
			this.depositResultFields = new depositResultFields();
			this.depositResultDataFields = new depositResultDataFields();
			this.postObjects = new postObjects();
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
			} else if (fieldSize === this.bootstrap.inputSizing.lg.id) {
				rad = 6;
			}
			return rad;
		}

		getRandomInt(intMax?: number, intMin?: number): number {
			var returnNumber: number = 0;
			var defaultMax = 999999999;
			var maxVal = Number.MAX_VALUE - 1 || Math.pow(2,53) - 1 || defaultMax;
			intMax = intMax || defaultMax;
			intMin = intMin || 0;

			// Max should not be less than or equal to 0
			if (intMax <= 0) { intMax = 1; }

			// Max should not be too high or may cause problems
			if (intMax > maxVal) { intMax = maxVal; }

			// Min should not be less than 0
			if (intMin < 0) { intMin = 0; }

			// Min should be less than Max
			if (intMin >= intMax) { intMin = intMax - 1; }

			intMax = intMax - intMin;

			returnNumber = Math.floor(Math.random() * (intMax + 1)) + intMin;
			return returnNumber;
		}

		getDateTimeTicks(dateTime?: Date): number {
			dateTime = dateTime || new Date();
			return dateTime.getTime();
		}

		getUniqueQualifier(prefix?: string): string {
			prefix = prefix || 'LT';
			var ticks: string = this.getDateTimeTicks() + '';
			return prefix + ticks.substring(ticks.length - 2, ticks.length) + this.getRandomInt(999, 1);
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
					returnObj[objectKey] = obj;
				}
			}
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

		SetRequiredFields(fields) {
			for (var fieldName in fields) {
				var thisField: IWidgetFieldOptions = fields[fieldName];
				if (thisField.isLTRequired) {
					thisField.fieldTemplate.required = thisField.isLTRequired;
				}
			}
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
			fn = fn || function (x) { return x; };
			regex = regex || /#{[^\}]+}/g;
			return text.replace(regex, function (m, p, ft) {
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

		FormatNumber(n: number, decimalPlaces?: number): string {
			var newNumber: string;

			if (this.isNumber(decimalPlaces)) {
				var decimalPower = Math.pow(10, decimalPlaces);
				n = Math.round(n * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
			}

			newNumber = n + '';

			var decimalIndex = newNumber.indexOf('.');
			var integerPart: string = '';
			var decimalPart: string = '';

			// Splits number into part before and after decimal place
			if (decimalIndex !== -1) {
				integerPart = newNumber.substring(0, decimalIndex);
				decimalPart = newNumber.substring(decimalIndex);
			} else {
				integerPart = newNumber;
				decimalPart = '.';
			}

			// Add extra zeros at end
			while (decimalPlaces && decimalPart.length < decimalPlaces + 1) {
				decimalPart += '0';
			}

			// Add commas in number
			var startIndex = 0;
			var commaIndex = (integerPart.length % 3);
			var integerPartArray: string[] = [];

			do {
				if (commaIndex !== 0) {
					integerPartArray.push(integerPart.substring(startIndex, commaIndex));
				}
				startIndex = commaIndex;
				commaIndex += 3
			} while (commaIndex <= integerPart.length)

			if (integerPartArray.length > 0) {
				integerPart =integerPartArray.join(',');
			}

			decimalPart = (decimalPart === '.') ? '' : decimalPart;

			return integerPart + decimalPart;
		}

		ExtendWidgetFieldTemplate(eItem: IWidgetField, templateName: string): IWidgetField {
			var _this = this;
			var fOption: IWidgetFieldOptions;
			var returnWidgetField: IWidgetField;
			if (_this[templateName] && _this[templateName][eItem.field]) {
				fOption = _this[templateName][eItem.field];
				returnWidgetField = _this.$.extend({}, fOption.fieldTemplate, eItem);
			} else {
				window.console && console.error('templateName: ', templateName, 'or field:', eItem.field, 'are not valid!');
				returnWidgetField = eItem;
			}
			return returnWidgetField;
		}

		GetSubFieldHelperType(fieldName: string): string {
			var fieldHelperName: string = null;
			if (fieldName.toLowerCase().indexOf('depositdatalist') !== -1) {
				fieldHelperName = 'depositResultDataFields';
			}
			return fieldHelperName;
		}

		GetFieldOptionsForWidgetType(widgetType: string, fieldName: string, objectType?: string): IWidgetFieldOptions {
			var _this = this;
			var returnFieldOptions: IWidgetFieldOptions = null;
			if (widgetType.toLowerCase().indexOf('depositdatalist') !== -1) {
				returnFieldOptions = _this.depositResultDataFields[fieldName];
			} else if (widgetType.toLowerCase().indexOf('quote') !== -1) {
				// get quote widget fieldOptions
			} else if (widgetType.toLowerCase().indexOf('rate') !== -1) {
				// get rate widget fieldOptions
			} else if (widgetType.toLowerCase().indexOf('deposit') !== -1) {
				if (objectType.toLowerCase().indexOf('result') !== -1) {
					returnFieldOptions = _this.depositResultFields[fieldName];
				} else {
					returnFieldOptions = _this.depositFields[fieldName];
				}
			} else {
				returnFieldOptions = _this.contactFields[fieldName];
			}
			return returnFieldOptions;
		}

		/**
		 * Modifies Text Nodes in DOM
		 * @param {Node}     node		Node/Element to look through for text Nodes/Elements
		 * @param {Function} callback	Function that receives a <u>string</u> to be modified then returns the modified <u>string</u>.
		 * <b>(NOTE: Must return a <u>string</u> value)</b>
		 */
		ModifyTextElementsInDOM(node: Node, callback: Function) {
			var _this = this;
			var next: Node;
			if (node.nodeType === 1) {
				// (Element Node)
				if (node = node.firstChild) {
					do {
						// Recursively call this function on each child node
						next = node.nextSibling;
						_this.ModifyTextElementsInDOM(node, callback);
					} while (node = next);
				}
			} else if (node.nodeType === 3) {
				// (Text Node)
				node.nodeValue = callback(node.nodeValue);
			}
		}

		FakeData() {
			return {
				deposit: { APY: 1, TotalInterestEarned: 100, AmountPlusInterest: 100, CompoundInterestType: 'Quarterly', BaseRate: 1.7500, FinalRate: 1.7400 }
			}
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
				, hr: () => { return $('<hr/>'); }
				, a: () => { return $('<a/>'); }
				, span: () => { return $('<span/>'); }
				, h: (headNumber: number = 3) => { return $('<h' + headNumber + '/>'); }
				, form: () => { return $('<form/>').addClass('form-horizontal'); },
				label: () => { return $('<label/>').addClass('control-label col-sm-12'); },
				button: (type: string = 'button') => { return $('<button/>').prop('type', type); },
				select: () => { return $('<select/>').addClass('form-control'); },
				option: () => { return $('<option/>'); },
				input: (type: string = 'text') => { return $('<input/>').prop('type', type); },
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
	}

	class hSizing {
		public h1: IHelperNameNumId;
		public h2: IHelperNameNumId;
		public h3: IHelperNameNumId;
		public h4: IHelperNameNumId;
		public h5: IHelperNameNumId;
		public h6: IHelperNameNumId;
		constructor() {
			this.h1 = { id: 1, name: 'Heading 1' };
			this.h2 = { id: 2, name: 'Heading 2' };
			this.h3 = { id: 3, name: 'Heading 3' };
			this.h4 = { id: 4, name: 'Heading 4' };
			this.h5 = { id: 5, name: 'Heading 5' };
			this.h6 = { id: 6, name: 'Heading 6' };
		}

		getDefault(): IHelperNameNumId {
			return this.h4;
		}

		asArray(): IHelperNameNumId[] {
			return helpers.prototype.ConvertObjectToArray<IHelperNameNumId>(this);
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
		constructor() {
			this.xs = { id: 'xs', name: 'xs' };
			this.sm = { id: 'sm', name: 'sm' };
			this.md = { id: 'md', name: 'md' };
			this.lg = { id: 'lg', name: 'lg' };
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
			// this.n1 = { id: 1, name: '1/12th' };
			// this.n2 = { id: 2, name: '1/6th' };
			this.n3 = { id: 3, name: '1/4th' };
			this.n4 = { id: 4, name: '1/3rd' };
			// this.n5 = { id: 5, name: '5/12ths' };
			this.n6 = { id: 6, name: '1/2' };
			// this.n7 = { id: 7, name: '7/12ths' };
			this.n8 = { id: 8, name: '2/3rds' };
			this.n9 = { id: 9, name: '3/4ths' };
			// this.n10 = { id: 10, name: '5/6ths' };
			// this.n11 = { id: 11, name: '11/12ths' };
			this.n12 = { id: 12, name: 'Full Width' };
		}

		getDefault(): IHelperNameNumId {
			return this.n12;
		}

		asArray(): IHelperNameNumId[] {
			return helpers.prototype.ConvertObjectToArray<IHelperNameNumId>(this);
		}
	}

	class offsetColumns extends gridColumns {
		constructor() {
			super();
			this.n12 = { id: 0, name: 'No Offset' };
		}
	}

	class bootstrap {
		public inputSizing: inputSizing;
		public gridSizing: gridSizing;
		public gridColumns: gridColumns;
		public offsetColumns: offsetColumns;
		public gridColumnsArray: IHelperNameNumId[];
		constructor() {
			this.inputSizing = new inputSizing;
			this.gridSizing = new gridSizing;
			this.gridColumns = new gridColumns;
			this.offsetColumns = new offsetColumns;
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
		public deposit: IHelperNameId;
		constructor() {
			this.contact = { id: 'contact', name: 'Contact' };
			this.quote = { id: 'quote', name: 'Quote' };
			this.rate = { id: 'rate', name: 'Rate' };
			this.deposit = { id: 'deposit', name: 'Deposit' };
		}
	}

	class sharedFields {
		label: IWidgetFieldOptions;
		title: IWidgetFieldOptions;
		paragraph: IWidgetFieldOptions;
		hr: IWidgetFieldOptions;
		captcha: IWidgetFieldOptions;
		submit: IWidgetFieldOptions;
		nodatamessage: IWidgetFieldOptions;
		custominput: IWidgetFieldOptions;
		customhidden: IWidgetFieldOptions;
		constructor() {
			this.label = { id: 'label', name: 'Label', allowMultiples: true, fieldTemplate: { element: 'label', value: 'label' } };
			this.title = { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { element: 'title', value: 'title' } };
			this.paragraph = { id: 'paragraph', name: 'Paragraph', allowMultiples: true, fieldTemplate: { element: 'p', value: 'paragraph text' } };
			this.hr = { id: 'hr', name: 'Horizontal Line', allowMultiples: true, fieldTemplate: { element: 'hr' } };
			this.captcha = { id: 'captcha', name: 'Captcha', fieldTemplate: { element: 'captcha' } };
			this.submit = { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'button', type: 'submit', id: 'ltwSubmit', cssClass: 'btn-primary', value: 'Submit' } };
			this.nodatamessage = { id: 'nodatamessage', name: 'No Data Message', isLTRequired: true, fieldTemplate: { element: 'div', type: 'nodatamessage', id: 'ltwNoDataMessage', fontSize: 20, value: 'Sorry, no results.' } };
			this.custominput = { id: 'custominput', name: 'Custom Input', allowMultiples: true, fieldTemplate: { element: 'input', type: 'text', cssClass: 'lt-custom-input' } };
			this.customhidden = { id: 'customhidden', name: 'Custom Hidden', allowMultiples: true, fieldTemplate: { element: 'input', type: 'hidden', cssClass: 'lt-custom-input' } };
		}
	}

	class contactFields {
		firstname: IWidgetFieldOptions;
		lastname: IWidgetFieldOptions;
		email: IWidgetFieldOptions;
		phone: IWidgetFieldOptions;
		company: IWidgetFieldOptions;
		state: IWidgetFieldOptions;
		comments: IWidgetFieldOptions;
		captcha: IWidgetFieldOptions;
		submit: IWidgetFieldOptions;
		successmessage: IWidgetFieldOptions;
		label: IWidgetFieldOptions;
		title: IWidgetFieldOptions;
		paragraph: IWidgetFieldOptions;
		hr: IWidgetFieldOptions;
		custominput: IWidgetFieldOptions;
		customhidden: IWidgetFieldOptions;
		constructor() {
			var sf = new sharedFields;
			this.firstname = { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwFirstName', placeholder: 'First Name', required: true } };
			this.lastname = { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwLastName', placeholder: 'Last Name', required: true } };
			this.email = { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { element: 'input', type: 'email', id: 'ltwEmail', placeholder: 'Email', required: true } };
			this.phone = { id: 'phone', name: 'Phone', fieldTemplate: { element: 'input', type: 'tel', id: 'ltwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}' } };
			this.company = { id: 'company', name: 'Company', fieldTemplate: { element: 'input', type: 'text', id: 'ltwCompany', placeholder: 'Company' } };
			this.state = { id: 'state', name: 'State', fieldTemplate: { element: 'select', type: 'state', id: 'ltwState', placeholder: 'Select a State' } };
			this.comments = { id: 'comments', name: 'Comments', fieldTemplate: { element: 'textarea', id: 'ltwComments', placeholder: 'Comments', rows: 4 } };
			this.captcha = sf.captcha;
			this.submit = sf.submit;
			this.successmessage = { id: 'successmessage', name: 'Success Message Upon Submit', fieldTemplate: { element: 'div', type: 'successmessage', id: 'ltwSuccessMessage', fontSize: 20, value: 'Thank you. You will be contacted shortly.' } };
			this.label = sf.label;
			this.title = sf.title;
			this.paragraph = sf.paragraph;
			this.hr = sf.hr;
			this.custominput = sf.custominput;
			this.customhidden = sf.customhidden;

			helpers.prototype.SetRequiredFields(this);
		}
	}

	class depositFields {
		depositterm: IWidgetFieldOptions;
		depositamount: IWidgetFieldOptions;
		deposittermdd: IWidgetFieldOptions;
		depositamountdd: IWidgetFieldOptions;
		submit: IWidgetFieldOptions;
		captcha: IWidgetFieldOptions;
		label: IWidgetFieldOptions;
		title: IWidgetFieldOptions;
		paragraph: IWidgetFieldOptions;
		hr: IWidgetFieldOptions;
		custominput: IWidgetFieldOptions;
		customhidden: IWidgetFieldOptions;
		constructor() {
			var sf = new sharedFields;
			this.depositterm = { id: 'depositterm', name: 'Term [textbox]', groupName: 'depositterm', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwDepositTerm', placeholder: 'Enter # of Months'} };
			this.deposittermdd = { id: 'deposittermdd', name: 'Term [dropdown]', groupName: 'depositterm', isLTRequired: true, fieldTemplate: { element: 'select', type: 'deposittermdd', id: 'ltwDepositTerm', placeholder: 'Select a Term'} };
			this.depositamount = { id: 'depositamount', name: 'Amount [textbox]', groupName: 'depositamount', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwDepositAmount', placeholder: 'Enter Amount' } };
			this.depositamountdd = { id: 'depositamountdd', name: 'Amount [dropdown]', groupName: 'depositamount', isLTRequired: true, fieldTemplate: { element: 'select', type: 'depositamountdd', id: 'ltwDepositAmount', placeholder: 'Select Amount' } };
			this.submit = sf.submit;
			this.captcha = sf.captcha;
			this.label = sf.label;
			this.title = sf.title;
			this.paragraph = sf.paragraph;
			this.hr = sf.hr;
			this.custominput = sf.custominput;
			this.customhidden = sf.customhidden;

			helpers.prototype.SetRequiredFields(this);
		}

		asArray() {
			return helpers.prototype.ConvertObjectToArray<IWidgetFieldOptions>(this);
		}
	}

	class depositResultFields {
		label: IWidgetFieldOptions;
		title: IWidgetFieldOptions;
		paragraph: IWidgetFieldOptions;
		hr: IWidgetFieldOptions;
		nodatamessage: IWidgetFieldOptions;
		depositdatalist: IWidgetFieldOptions;
		constructor() {
			var sf = new sharedFields;
			this.label = sf.label;
			this.title = sf.title;
			this.paragraph = sf.paragraph;
			this.hr = sf.hr;
			this.nodatamessage = sf.nodatamessage;
			this.depositdatalist = { id: 'depositdatalist', name: 'Deposit Results', isLTRequired: true, fieldTemplate: { element: 'repeat', type: 'depositdatalist'} };

			helpers.prototype.SetRequiredFields(this);
		}

		asArray() {
			return helpers.prototype.ConvertObjectToArray<IWidgetFieldOptions>(this);
		}
	}

	class depositResultDataFields {
		label: IWidgetFieldOptions;
		title: IWidgetFieldOptions;
		paragraph: IWidgetFieldOptions;
		hr: IWidgetFieldOptions;
		api: IWidgetFieldOptions;
		totalinterestearned: IWidgetFieldOptions;
		amountplusinterest: IWidgetFieldOptions;
		compoundinteresttype: IWidgetFieldOptions;
		baserate: IWidgetFieldOptions;
		finalrate: IWidgetFieldOptions;
		constructor() {
			var sf = new sharedFields;
			this.label = sf.label;
			this.title = sf.title;
			this.paragraph = sf.paragraph;
			this.hr = sf.hr;
			this.api = { id: 'api', name: 'API', fieldTemplate: { element: 'div', value: '#{APY}', cssClass: 'form-control-static' } };
			this.totalinterestearned = { id: 'totalinterestearned', name: 'Total Interest Earned', fieldTemplate: { element: 'div', value: '#{TotalInterestEarned}', cssClass: 'form-control-static' } };
			this.amountplusinterest = { id: 'amountplusinterest', name: 'Amount Plus Interest', fieldTemplate: { element: 'div', value: '#{AmountPlusInterest}', cssClass: 'form-control-static' } };
			this.compoundinteresttype = { id: 'compoundinteresttype', name: 'Compound Interest Type', fieldTemplate: { element: 'div', value: '#{CompoundInterestType}', cssClass: 'form-control-static' } };
			this.baserate = { id: 'baserate', name: 'Base Rate', fieldTemplate: { element: 'div', value: '#{BaseRate}', cssClass: 'form-control-static' } };
			this.finalrate = { id: 'finalrate', name: 'Final Rate', fieldTemplate: { element: 'div', value: '#{FinalRate}', cssClass: 'form-control-static' } };
		}

		asArray() {
			return helpers.prototype.ConvertObjectToArray<IWidgetFieldOptions>(this);
		}
	}

	class postObjects {
		constructor() {
			//
		}

		contact(): LoanTekWidget.PostObject_Contact {
			return new LoanTekWidget.PostObject_Contact;
		}

		deposit() {
			return new LoanTekWidget.PostObject_Deposit;
		}
	}

	export class ApplyFormStyles {
		private _returnStyles: string;
		private _specifier: string;
		private _borderType: string;
		private _lth: LoanTekWidget.helpers;

		constructor(lth: LoanTekWidget.helpers, currentBuildObject: LTWidget.IBuildOptions, excludeCaptchaField?: boolean, specifier?: string) {
			var _thisC = this;
			specifier = specifier || '.' + lth.defaultFormSpecifierClass;
			_thisC._specifier = specifier;
			_thisC._borderType = currentBuildObject.formBorderType;
			_thisC._lth = lth;
			excludeCaptchaField = excludeCaptchaField || true;
			var returnStyles = '';

			if (currentBuildObject.formWidth) {
				currentBuildObject.formWidthUnit = currentBuildObject.formWidthUnit || lth.widthUnit.getDefault().id;
				returnStyles += '\n.ltw' + specifier + ' { width: ' + currentBuildObject.formWidth + currentBuildObject.formWidthUnit + '; }';
			}

			if (currentBuildObject.formFontColor) {
				returnStyles += '\n.ltw' + specifier + ' .lt-widget-border { color: ' + currentBuildObject.formFontColor + '; }';
			}

			if (currentBuildObject.formBg) {
				returnStyles += '\n.ltw' + specifier + ' .lt-widget-border { background-color: ' + currentBuildObject.formBg + '; }';
			}

			if (lth.isNumber(currentBuildObject.formBorderRadius)) {
				returnStyles += _thisC.formBorderRadius(currentBuildObject.formBorderRadius, _thisC._borderType);
			}

			if (currentBuildObject.formBorderColor) {
				returnStyles += '\n.ltw' + specifier + ' .lt-widget-border, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading { border-color: ' + currentBuildObject.formBorderColor + '; }';
			}

			if (currentBuildObject.formTitleColor) {
				returnStyles += '\n.ltw' + specifier + ' .lt-widget-heading, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading  { color: ' + currentBuildObject.formTitleColor + '; }';
			}

			if (currentBuildObject.formTitleBgColor) {
				returnStyles += '\n.ltw' + specifier + ' .lt-widget-heading, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading  { background-color: ' + currentBuildObject.formTitleBgColor + '; }';
			}

			if (lth.isNumber(currentBuildObject.formGroupSpacing)) {
				returnStyles += '\n.ltw' + specifier + ' .form-group, .ltw' + specifier + ' .alert { margin-bottom: ' + currentBuildObject.formGroupSpacing + 'px; }';
			}

			if (lth.isNumber(currentBuildObject.formFieldBorderRadius)) {
				var ffbr = currentBuildObject.formFieldBorderRadius + '';
				var ffbhr = currentBuildObject.formFieldBorderRadius - 1 < 0 ? '0' : (currentBuildObject.formFieldBorderRadius - 1) + '';
				returnStyles += '\n.ltw' + specifier + ' .form-group .form-control, .ltw' + specifier + ' .alert { border-radius: ' + ffbr + 'px; }';
				if (!excludeCaptchaField) {
					returnStyles += '\n.ltw' + specifier + ' .lt-captcha .panel { border-radius: ' + ffbr + 'px; }';
					returnStyles += '\n.ltw' + specifier + ' .lt-captcha .panel-heading { border-top-right-radius: ' + ffbhr + 'px; border-top-left-radius: ' + ffbhr + 'px; }';
				}
			}

			if (lth.isNumber(currentBuildObject.formButtonBorderRadius)) {
				returnStyles += '\n.ltw' + specifier + ' .btn { border-radius: ' + currentBuildObject.formButtonBorderRadius + 'px; }';
			}
			_thisC._returnStyles = returnStyles;
		}

		getStyles(): string {
			return this._returnStyles;
		}

		formBorderRadius(borderRadius: number, borderType?: string, specifier?: string): string {
			var _thisM = this;
			var lth = _thisM._lth;
			var br = '';
			var fbr = borderRadius + '';
			var fbhr = borderRadius - 1 < 0 ? '0' : (borderRadius - 1) + '';
			specifier = specifier || _thisM._specifier;
			borderType = borderType || _thisM._borderType;
			br += '\n.ltw' + specifier + ' .lt-widget-border { border-radius: ' + fbr + 'px; }';
			if (borderType === lth.formBorderType.panel.id) {
				br += '\n.ltw' + specifier + ' .lt-widget-border .lt-widget-heading { border-top-right-radius: ' + fbhr + 'px; border-top-left-radius: ' + fbhr + 'px; }';
			}
			return br;
		}
	}
}
