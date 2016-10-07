/// <reference path="../../../../Scripts/typings/jquery/jquery.d.ts" />

declare namespace IWidgetHelpers {
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
		fields?: IField[];
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

	interface IFormObject {
		name?: string;
		buildObject?: IWidget.IFormBuildObject;
		resultObject?: IResultBuildOptions;

		// Part of Repeating form object
		field?: string;
		fieldListOptions?: IFieldListOptions;
	}

	interface IWidgetOptions {
		postUrl?: string;
		externalValidatorFunction?: string;
		clientId?: number;
		userId?: number;
		uniqueQualifier?: string;
		resultDisplayOptions?: IResultBuildOptions;
	}

	interface IWidgetInfo {
		url?: string;
		ClientId?: number;
		UserId?: number;
		formObject: IFormObject;
		// scripts?: string[];
		// wwwRoot?: string;
		initialScript?: string;
		// uniqueQualifier?: string;
	}

	namespace IHelper {
		interface IFormBorderType { panel: INameId; well: INameId; none: INameId }
		interface INameId { id: string; name: string; }
		interface INameNumId { id: number; name: string; }
		interface INameValue { name: string; value: string; }

		interface IBootstrap { inputSizing: IBsInputSizing; gridSizing: IBsGridSizing; }
		interface IBsInputSizing { sm: string; lg: string; }
		interface IBsGridSizing { xs: string; sm: string; md: string; lg: string; }
	}

	interface IFieldOptions {
		id?: string;
		name: string;
		groupName?: string;
		isLTRequired?: boolean;
		isIncluded?: boolean;
		allowMultiples?: boolean;
		hideFromList?: boolean;
		fieldTemplate?: IField;
	}

	namespace IFieldOptionsExt {
		interface IRateTable extends IFieldOptions {
			fieldTemplate?: IFieldExt.IRateTable;
		}
	}

	interface IField {
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
		attrs?: IHelper.INameValue[];
		uniqueQualifier?: string;

		color?: string;
		fontSize?: number;
		backgroundColor?: string;
		borderRadius?: number;
		borderColor?: string;
		padding?: number;
		marginTopBottom?: number;
		align?: string;

		fieldListOptions?: IFieldListOptions;
		fieldData?: any[];

		widgetInfo?: IWidgetInfo;
		dataTableOptions?: IDataTableOptions;
	}

	interface IDataTableOptions {
		isStriped?: boolean;
		isBordered?: boolean;
		isHover?: boolean;
		isCondensed?: boolean;
	}

	namespace IFieldExt {
		interface IRateTable extends IField {
			ratetableConfig?: IRateTable.IConfig;
		}
	}

	namespace IDataTable {
		namespace IColumn {
			interface IConfig {
				data: number | string;
				render: number | string | Object | IRenderFunction;
				visible: boolean;
				title: string;
			}

			interface IRenderFunction {
				(data: any, type?: string, row?: any, meta?: Object): string;
			}
		}
	}

	namespace IRateTable {
		interface IConfig {
			rateColumn: IDataTable.IColumn.IConfig;
			// aprColumn:
		}

		interface IMortgageLoanQuote {
			InterestRate?: number;
			APR?: number;
			FinalFees?: number;
			PIP?: number;
			CalcPrice?: number;
			ProductTermType?: string;
		}
	}

	// interface IWidgetRateTableConfig {
	// 	colRate: IWidgetRateTableColumnConfig;
	// }

	// interface IWidgetRateTableColumnConfig {
	// 	data: string | number;
	// 	render: number | string | Object | Function;
	// }

	interface IProductTermType {
		name: string;
		value: number;
		description: string;
	}

	interface IState {
		abbreviation: string;
		name: string;
	}

	interface IStates {
		country: string;
		states: IState[];
	}
}

// interface IHelperFormBorderType { panel: IHelperNameId; well: IHelperNameId; none: IHelperNameId }
// interface IHelperNameId { id: string; name: string; }
// interface IHelperNameNumId { id: number; name: string; }
// interface IHelperNameValue { name: string; value: string; }

// interface IHelperBootstrap { inputSizing: IHelperBsInputSizing; gridSizing: IHelperBsGridSizing; }
// interface IHelperBsInputSizing { sm: string; lg: string; }
// interface IHelperBsGridSizing { xs: string; sm: string; md: string; lg: string; }


// interface IWidgetFieldOptions {
// 	id?: string;
// 	name: string;
// 	groupName?: string;
// 	isLTRequired?: boolean;
// 	isIncluded?: boolean;
// 	allowMultiples?: boolean;
// 	hideFromList?: boolean;
// 	fieldTemplate?: IWidgetField;
// }

// interface IWidgetFieldOptions_RateTable extends IWidgetFieldOptions {
// 	fieldTemplate?: IWidgetField_RateTable;
// }

// interface IWidgetField {
// 	field?: string;
// 	element?: string;
// 	id?: string;
// 	type?: string;
// 	style?: string;
// 	placeholder?: string;
// 	required?: boolean;
// 	cols?: number;
// 	offsetCols?: number;
// 	rows?: number;
// 	cssClass?: string;
// 	value?: string|number;
// 	size?: string;
// 	pattern?: string;
// 	alttext?: string;
// 	tabindex?: number;
// 	nsize?: number;
// 	attrs?: IHelperNameValue[];
// 	uniqueQualifier?: string;

// 	color?: string;
// 	fontSize?: number;
// 	backgroundColor?: string;
// 	borderRadius?: number;
// 	borderColor?: string;
// 	padding?: number;
// 	marginTopBottom?: number;
// 	align?: string;

// 	fieldListOptions?: IWidget.IFieldListOptions;
// 	fieldData?: any[];

// 	widgetInfo?: IWidget.IWidgetInfo;
// }

// interface IWidgetField_RateTable extends IWidgetField {
// 	ratetableConfig?: IWidgetRateTableConfig;
// }

// interface IWidgetRateTableConfig {
// 	colRate: IWidgetRateTableColumnConfig;
// }

// interface IWidgetRateTableColumnConfig {
// 	data: string | number;
// 	render: number | string | Object | Function;
// }

// interface IState {
// 	abbreviation: string;
// 	name: string;
// }

// interface IStates {
// 	country: string;
// 	states: IState[];
// }

namespace LoanTekWidget {
	export class helpers {
		public $: JQueryStatic;
		public bootstrap: bootstrap;
		public hsize: hSizing;
		public formBorderType: formBorderType;
		public formBorderTypeArray: IWidgetHelpers.IHelper.INameId[];
		public widthUnit: widthUnit;
		public widgetType: widgetType;
		public defaultVerticalSpacing: number;
		public defaultFormSpecifierClass: string;
		public defaultResultSpecifierClass: string;
		public contactFields: contactFields;
		public depositFields: depositFields;
		public depositResultFields: depositResultFields;
		public depositResultDataFields: depositResultDataFields;
		public contactFieldsArray: IWidgetHelpers.IFieldOptions[];
		public mortgageQuoteFields: mortgageQuoteFields;
		public mortgageRateFields: mortgageRateFields;
		public postObjects: postObjects;
		public ProductTermType: ProductTermType;

		constructor(jq: JQueryStatic) {
			this.$ = jq;

			this.hsize = new hSizing();
			this.bootstrap = new bootstrap();
			this.formBorderType = new formBorderType();
			this.formBorderTypeArray = this.ConvertObjectToArray<IWidgetHelpers.IHelper.INameId>(this.formBorderType);
			this.widthUnit = new widthUnit();
			this.widgetType = new widgetType();
			this.defaultVerticalSpacing = 15;
			this.defaultFormSpecifierClass = 'ltwF';
			this.defaultResultSpecifierClass = 'ltwR';
			this.contactFields = new contactFields();
			this.contactFieldsArray = this.ConvertObjectToArray<IWidgetHelpers.IFieldOptions>(this.contactFields);
			this.depositFields = new depositFields();
			this.depositResultFields = new depositResultFields();
			this.depositResultDataFields = new depositResultDataFields();
			this.mortgageQuoteFields = new mortgageQuoteFields();
			this.mortgageRateFields = new mortgageRateFields();
			this.postObjects = new postObjects();
			this.ProductTermType = new ProductTermType();
		}

		isNumber(numCheck: any): boolean {
			return typeof numCheck === 'number';
		}

		isStringNullOrEmpty(stringCheck: string): boolean {
			return stringCheck === '' || typeof stringCheck !== 'string';
		}

		padZeros(num: number, size: number): string {
			var s = num + '';
			while (s.length < size) {
				s = '0' + s;
			}
			return s;
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

		getUniqueValuesFromArray(arr: any[], objPath?: string): any[] {
			var uniqueArray: any[] = [];
			var object: any;
			for (var i = 0; i < arr.length; i++) {
				if (objPath) {
					object = this.getValueOfObjectInPath(arr[i], objPath);
				} else {
					object = arr[i];
				}

				if (uniqueArray.indexOf(object) === -1) {
					// window.console && console.log('push to arr');
					uniqueArray.push(object);
				}
			}

			// window.console && console.log('uniqArr', uniqueArray);
			return uniqueArray;
		}

		getValueOfObjectInPath(obj: Object, objPath: string): any {
			var objectValue: any;
			var periodIndex = objPath.indexOf('.');

			// window.console && console.log('path', objPath);
			if (periodIndex !== -1) {
				// window.console && console.log('newObj', objPath.substring(0, periodIndex));
				// window.console && console.log('newPath', objPath.substring(periodIndex + 1));
				// window.console && console.log('obj', obj);
				return this.getValueOfObjectInPath(obj[objPath.substring(0, periodIndex)], objPath.substring(periodIndex + 1));
			} else {
				objectValue = obj[objPath];
			}

			return objectValue;
		}

		/**
		 * Filters Array
		 * @param  {any[]}							arr					Array to be filtered
		 * @param  {any}							value				The value to match
		 * @param  {boolean}						invert				Inverse of matching array
		 * @param  {string}							objArrayPath		If array is array of objects, it will match value based on object dot(.) path
		 * @param  {(any, number) => boolean}		filterFunction		Replace the function to filter the array
		 * @return {any[]}												Return filtered array
		 */
		getFilteredArray(arr: any[], value: any, invert?: boolean, objArrayPath?: string, filterFunction?: (elementOfArray: any, indexInArray: number) => boolean): any[] {
			var _this = this;
			invert = invert || false;
			filterFunction = filterFunction || function (n: any, i: number) {
				var isMatch = false;
				if (objArrayPath) {
					isMatch = (value === _this.getValueOfObjectInPath(n, objArrayPath));
				} else {
					isMatch = (value === n);
				}
				return isMatch;
			};
			var filteredArray: any[] = [];

			filteredArray = this.$.grep(arr, filterFunction, invert);

			return filteredArray;
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

		RemoveObjectFromArray(theArray: Object[], theKey: string, theValue: string): Object[] {
			for (var i = theArray.length - 1; i >= 0; i--) {
				var obj = theArray[i];
				if (obj[theKey] === theValue) {
					theArray.splice(i, 1);
				}
			}
			return theArray;
		}

		SetRequiredFields(fields) {
			for (var fieldName in fields) {
				var thisField: IWidgetHelpers.IFieldOptions = fields[fieldName];
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

		FormatNumber(n: number, decimalPlaces?: number, useParentheseForNegative?: boolean, prefix?: string, suffix?: string): string {
			useParentheseForNegative = useParentheseForNegative || false;
			prefix = prefix || '';
			suffix = suffix || '';
			var newNumber: string;
			var decimalPower: number;
			var isNeg: boolean = false;

			if (n < 0) {
				isNeg = true;
				n = -n;
			}

			if (this.isNumber(decimalPlaces)) {
				decimalPower = Math.pow(10, decimalPlaces);
				n = Math.round(n * decimalPower) / decimalPower;
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

			newNumber = prefix + integerPart + decimalPart + suffix;

			if (isNeg) {
				if (useParentheseForNegative) {
					newNumber = '(' + newNumber + ')';
				} else {
					newNumber = '-' + newNumber;
				}
			}

			return newNumber;
		}

		ExtendWidgetFieldTemplate(eItem: IWidgetHelpers.IField, templateName: string): IWidgetHelpers.IField {
			var _this = this;
			var fOption: IWidgetHelpers.IFieldOptions;
			var returnWidgetField: IWidgetHelpers.IField;
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

		GetFieldOptionsForWidgetType(widgetType: string, fieldName: string, objectType?: string): IWidgetHelpers.IFieldOptions {
			var _this = this;
			var returnFieldOptions: IWidgetHelpers.IFieldOptions = null;
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
				, form: () => { return $('<form/>').addClass('form-horizontal'); }
				, label: () => { return $('<label/>').addClass('control-label col-sm-12'); }
				, button: (type: string = 'button') => { return $('<button/>').prop('type', type); }
				, select: () => { return $('<select/>').addClass('form-control'); }
				, option: () => { return $('<option/>'); }
				, input: (type: string = 'text') => { return $('<input/>').prop('type', type); }
				, textarea: () => { return $('<textarea/>').addClass('form-control'); }
				, col: (colNumber: number = 12, colSize: string = 'sm') => { return el.div().addClass('col-' + colSize + '-' + colNumber.toString()); }
				, row: (rowType: string = 'row') => { return el.div().addClass(rowType); }
				, table: () => { return $('<table/>'); }
				, thead: () => { return $('<thead/>'); }
				, tbody: () => { return $('<tbody/>'); }
				, tr: () => { return $('<tr/>'); }
				, th: () => { return $('<th/>'); }
				, td: () => { return $('<td/>'); }
				, formGroup: (formGroupSize?: string) => {
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
			var $ = this.$;
			scrollSpeed = scrollSpeed || 200;
			topOffset = topOffset || 50;
			$('html, body').animate({
				scrollTop: ($('a[name=' + anchorName + ']').offset().top) - topOffset
			}, scrollSpeed);
		}

		US_States(): IWidgetHelpers.IStates {
			var s: IWidgetHelpers.IStates = {
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

		BuildWidgetScript(widgetInfo: IWidgetHelpers.IWidgetInfo, isBuilderVersion?: boolean): string {
			isBuilderVersion = isBuilderVersion || false;
			var $ = this.$;
			// var scriptHelpersCode = `
			// 	var ltjq = ltjq || jQuery.noConflict(true);
			// 	var lthlpr = new LoanTekWidget.helpers(ltjq);`;
			var cfo: IWidgetHelpers.IFormObject = $.extend(true, {}, widgetInfo.formObject);
			var cbo: IWidget.IFormBuildObject = $.extend(true, {}, cfo.buildObject);
			var cro: IWidgetHelpers.IResultBuildOptions = (cfo.resultObject) ? $.extend(true, {}, cfo.resultObject) : null;
			var wScript: string = '';
			var hasCaptchaField = this.GetIndexOfFirstObjectInArray(cbo.fields, 'field', 'captcha') >= 0;
			var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
			var unReplaceRegEx = /#un{[^\}]+}/g;
			// var formStyles = '';
			var uniqueQualifierForm = this.getUniqueQualifier('F');
			var uniqueQualifierResult = this.getUniqueQualifier('R');

			if (isBuilderVersion) {
				cbo.showBuilderTools = isBuilderVersion;
			}
			cbo.postDOMCallback = '#fn{postDOMFunctions}';

			cbo.uniqueQualifier = uniqueQualifierForm;

			if (cro) {
				if (isBuilderVersion) {
					cro.showBuilderTools = isBuilderVersion;
				}
				cro.uniqueQualifier = uniqueQualifierResult;
			}

			// Add Widget Wrapper
			var widgetWrapper = this.Interpolate('\n<div id="ltWidgetWrapper_#{uniqueF}"></div>', { uniqueF: uniqueQualifierForm });
			if (cro) {
				widgetWrapper += this.Interpolate('\n<div id="ltWidgetResultWrapper_#{uniqueR}"></div>', { uniqueR: uniqueQualifierResult });
			}
			wScript += widgetWrapper;

			// // Add scripts
			// if (widgetInfo.scripts && widgetInfo.scripts.length) {
			// 	for (var iScript = 0, lScript = widgetInfo.scripts.length; iScript < lScript; iScript++) {
			// 		var scriptSrc = widgetInfo.scripts[iScript];
			// 		var scriptLink = this.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: widgetInfo.wwwRoot + scriptSrc });
			// 		wScript += scriptLink;
			// 	}
			// }

			// Add initial scripts
			if (widgetInfo.initialScript) {
				wScript += this.Interpolate(widgetInfo.initialScript, { uniqueNew: uniqueQualifierForm });
			}

			// Build Main Script
			var mainScript = '';

			// // Add jQuery and LoanTek Widget Helpers
			// if (!isBuilderVersion) {
			// 	mainScript += scriptHelpersCode;
			// }

			// Captcha vars
			var captchaOptions: ICaptchaSettings = { uniqueQualifier: uniqueQualifierForm };
			var captchaVar = `
				var ltCap#un{unique};
				var ltCapOpts#un{unique} = #{capOp};`;
			captchaVar = this.Interpolate(captchaVar, { capOp: JSON.stringify(captchaOptions, null, 2) });
			if (hasCaptchaField) {
				mainScript += captchaVar;
			}

			// PostDOMFunctions
			var postDomCode = '/*code ran after DOM created*/', postDomFn = `
				var pdfun = function () {
					#{code}
				};`;
			if (hasCaptchaField) {
				postDomCode += `
					ltCap#un{unique} = new LoanTekCaptcha(ltw_ltjq, ltCapOpts#un{unique});`;
			}
			mainScript += this.Interpolate(postDomFn, { code: postDomCode });

			// External Validator
			var extValid_Code: string;
			var extValid = `
				var ev = function () {
					#{validReturn}
				};`;
			if (hasCaptchaField && isBuilderVersion) {
				extValid_Code = 'return ltCap#un{unique}.IsValidEntry() && false;';
			} else if (hasCaptchaField) {
				extValid_Code = 'return ltCap#un{unique}.IsValidEntry();';
			} else if (isBuilderVersion) {
				extValid_Code = 'return false;';
			} else {
				extValid_Code = 'return true;';
			}
			mainScript += this.Interpolate(extValid, { validReturn: extValid_Code });

			// Add buildObject to mainScript
			var buildObjectWrap = `
				var ltwbo#un{unique} = #{bow};`;
			var cboString = JSON.stringify(cbo, null, 2);
			mainScript += this.Interpolate(buildObjectWrap, { bow: cboString });

			// Widget Options Object setup
			var ltWidgetOptions: IWidgetHelpers.IWidgetOptions = {
				// postUrl: 'http://node-cors-server.herokuapp.com/no-cors',
				// postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
				postUrl: widgetInfo.url
				, externalValidatorFunction: '#fn{externalValidators}'
				, clientId: widgetInfo.ClientId
				, userId: widgetInfo.UserId
				, uniqueQualifier: uniqueQualifierForm
			};
			var ltWidgetOptionsWrap = `
				var ltwo#un{unique} = #{cwow};`;
			var ltWidgetOptionsWithResultsObject = $.extend(true, {}, ltWidgetOptions);
			if (cro) {
				ltWidgetOptionsWithResultsObject.resultDisplayOptions = cro;
			}
			mainScript += this.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptionsWithResultsObject, null, 2) });

			// Add Execution of Widget
			var widgetBuildForm = `
				var ltwfb#un{unique} = new LoanTekWidget.FormBuild(ltw_ltjq, ltw_lthlpr, ltwbo#un{unique}, ltwo#un{unique});`;
			mainScript += widgetBuildForm;

			// Replace function placeholders
			mainScript = this.Interpolate(mainScript, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);

			// Wrap Main Script
			var mainScriptWrap = `
				<script type="text/javascript">
				(function () {#{m}
				})();
				</script>`;
			mainScript = this.Interpolate(mainScriptWrap, { m: mainScript });

			// Replace with unique qualifier
			mainScript = this.Interpolate(mainScript, { unique: uniqueQualifierForm }, null, unReplaceRegEx);

			// Add Main Script to rest of code
			wScript += mainScript;
			wScript = wScript.replace(/\s+/gm, ' ');

			return wScript;
		}
	}

	class hSizing {
		public h1: IWidgetHelpers.IHelper.INameNumId;
		public h2: IWidgetHelpers.IHelper.INameNumId;
		public h3: IWidgetHelpers.IHelper.INameNumId;
		public h4: IWidgetHelpers.IHelper.INameNumId;
		public h5: IWidgetHelpers.IHelper.INameNumId;
		public h6: IWidgetHelpers.IHelper.INameNumId;
		constructor() {
			this.h1 = { id: 1, name: 'Heading 1' };
			this.h2 = { id: 2, name: 'Heading 2' };
			this.h3 = { id: 3, name: 'Heading 3' };
			this.h4 = { id: 4, name: 'Heading 4' };
			this.h5 = { id: 5, name: 'Heading 5' };
			this.h6 = { id: 6, name: 'Heading 6' };
		}

		getDefault(): IWidgetHelpers.IHelper.INameNumId {
			return this.h4;
		}

		asArray(): IWidgetHelpers.IHelper.INameNumId[] {
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IHelper.INameNumId>(this);
		}
	}

	class inputSizing {
		public sm: IWidgetHelpers.IHelper.INameId;
		public md: IWidgetHelpers.IHelper.INameId;
		public lg: IWidgetHelpers.IHelper.INameId;
		constructor() {
			this.sm = { id: 'sm', name: 'Small' };
			this.md = { id: 'md', name: 'Medium' }
			this.lg = { id: 'lg', name: 'Large' };
		}

		getDefault(): IWidgetHelpers.IHelper.INameId {
			return this.md;
		}
	}

	class gridSizing {
		public xs: IWidgetHelpers.IHelper.INameId;
		public sm: IWidgetHelpers.IHelper.INameId;
		public md: IWidgetHelpers.IHelper.INameId;
		public lg: IWidgetHelpers.IHelper.INameId;
		constructor() {
			this.xs = { id: 'xs', name: 'xs' };
			this.sm = { id: 'sm', name: 'sm' };
			this.md = { id: 'md', name: 'md' };
			this.lg = { id: 'lg', name: 'lg' };
		}

		// getDefault(): IWidgetHelpers.IHelper.INameId {
		// 	return this.md;
		// }
	}

	class gridColumns {
		public n1: IWidgetHelpers.IHelper.INameNumId;
		public n2: IWidgetHelpers.IHelper.INameNumId;
		public n3: IWidgetHelpers.IHelper.INameNumId;
		public n4: IWidgetHelpers.IHelper.INameNumId;
		public n5: IWidgetHelpers.IHelper.INameNumId;
		public n6: IWidgetHelpers.IHelper.INameNumId;
		public n7: IWidgetHelpers.IHelper.INameNumId;
		public n8: IWidgetHelpers.IHelper.INameNumId;
		public n9: IWidgetHelpers.IHelper.INameNumId;
		public n10: IWidgetHelpers.IHelper.INameNumId;
		public n11: IWidgetHelpers.IHelper.INameNumId;
		public n12: IWidgetHelpers.IHelper.INameNumId;
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

		getDefault(): IWidgetHelpers.IHelper.INameNumId {
			return this.n12;
		}

		asArray(): IWidgetHelpers.IHelper.INameNumId[] {
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IHelper.INameNumId>(this);
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
		public gridColumnsArray: IWidgetHelpers.IHelper.INameNumId[];
		constructor() {
			this.inputSizing = new inputSizing;
			this.gridSizing = new gridSizing;
			this.gridColumns = new gridColumns;
			this.offsetColumns = new offsetColumns;
			this.gridColumnsArray = helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IHelper.INameNumId>(this.gridColumns);
		}
	}

	class formBorderType {
		public panel: IWidgetHelpers.IHelper.INameId;
		public well: IWidgetHelpers.IHelper.INameId;
		public none: IWidgetHelpers.IHelper.INameId;
		constructor() {
			this.panel = { id: 'panel', name: 'Panel' };
			this.well = { id: 'well', name: 'Well' };
			this.none = { id: 'none', name: 'None' };
		}
	}

	class widthUnit {
		px: IWidgetHelpers.IHelper.INameId;
		per: IWidgetHelpers.IHelper.INameId;
		constructor() {
			this.px = { id: 'px', name: 'Pixels' };
			this.per = { id: '%', name: 'Percent' };
		}

		getDefault(): IWidgetHelpers.IHelper.INameId {
			return this.per;
		}
	}

	class widgetType {
		public contact: IWidgetHelpers.IHelper.INameId;
		public mortgagequote: IWidgetHelpers.IHelper.INameId;
		public mortgagerate: IWidgetHelpers.IHelper.INameId;
		public deposit: IWidgetHelpers.IHelper.INameId;
		constructor() {
			this.contact = { id: 'contact', name: 'Contact' };
			this.mortgagequote = { id: 'mortgagequote', name: 'Mortgage Quote' };
			this.mortgagerate = { id: 'mortgagerate', name: 'Mortgage Rate' };
			this.deposit = { id: 'deposit', name: 'Deposit' };
		}
	}

	class ProductTermType {
		NotSet: IWidgetHelpers.IProductTermType;
		F40: IWidgetHelpers.IProductTermType;
		F30: IWidgetHelpers.IProductTermType;
		F25: IWidgetHelpers.IProductTermType;
		F20: IWidgetHelpers.IProductTermType;
		F15: IWidgetHelpers.IProductTermType;
		F10: IWidgetHelpers.IProductTermType;
		A10_1: IWidgetHelpers.IProductTermType;
		A7_1: IWidgetHelpers.IProductTermType;
		A5_1: IWidgetHelpers.IProductTermType;
		A3_1: IWidgetHelpers.IProductTermType;
		A2_1: IWidgetHelpers.IProductTermType;
		A1_1: IWidgetHelpers.IProductTermType;
		constructor() {
			this.NotSet = { name: 'NotSet', value: -1, description: 'Not Set'};
			this.F40 = { name: 'F40', value: 6, description: '40 year Fixed'};
			this.F30 = { name: 'F30', value: 9, description: '30 year Fixed'};
			this.F25 = { name: 'F25', value: 11, description: '25 year Fixed'};
			this.F20 = { name: 'F20', value: 7, description: '20 year Fixed'};
			this.F15 = { name: 'F15', value: 1, description: '15 year Fixed'};
			this.F10 = { name: 'F10', value: 4, description: '10 year Fixed'};
			this.A10_1 = { name: 'A10_1', value: 10, description: '10/1 ARM'};
			this.A7_1 = { name: 'A7_1', value: 8, description: '7/1 ARM'};
			this.A5_1 = { name: 'A5_1', value: 2, description: '5/1 ARM'};
			this.A3_1 = { name: 'A3_1', value: 3, description: '3/1 ARM'};
			this.A2_1 = { name: 'A2_1', value: 5, description: '2/1 ARM'};
			this.A1_1 = { name: 'A1_1', value: 0, description: '1/1 ARM'};
		}

		asArray(): IWidgetHelpers.IProductTermType[] {
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IProductTermType>(this);
		}
	}

	class sharedFields {
		label: IWidgetHelpers.IFieldOptions;
		title: IWidgetHelpers.IFieldOptions;
		paragraph: IWidgetHelpers.IFieldOptions;
		hr: IWidgetHelpers.IFieldOptions;
		captcha: IWidgetHelpers.IFieldOptions;
		submit: IWidgetHelpers.IFieldOptions;
		nodatamessage: IWidgetHelpers.IFieldOptions;
		custominput: IWidgetHelpers.IFieldOptions;
		customhidden: IWidgetHelpers.IFieldOptions;
		contactwidget: IWidgetHelpers.IFieldOptions;
		email: IWidgetHelpers.IFieldOptions;
		constructor() {
			this.label = { id: 'label', name: 'Label', allowMultiples: true, fieldTemplate: { element: 'label', value: 'label' } };
			this.title = { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { element: 'title', value: 'title' } };
			this.paragraph = { id: 'paragraph', name: 'Paragraph', allowMultiples: true, fieldTemplate: { element: 'p', value: 'paragraph text' } };
			this.hr = { id: 'hr', name: 'Horizontal Line', allowMultiples: true, fieldTemplate: { element: 'hr' } };
			this.captcha = { id: 'captcha', name: 'Captcha', fieldTemplate: { element: 'captcha' } };
			this.submit = { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'button', type: 'submit', id: 'ltwSubmit', cssClass: 'btn-primary', value: 'Submit' } };
			this.nodatamessage = { id: 'nodatamessage', name: 'No Data Message', isLTRequired: true, fieldTemplate: { element: 'div', type: 'nodatamessage', id: 'ltwNoDataMessage', fontSize: 20, value: 'Sorry, no results.' } };
			this.custominput = { id: 'custominput', name: 'Custom Input', allowMultiples: true, fieldTemplate: { element: 'input', type: 'text'/*, cssClass: 'lt-custom-input'*/ } };
			this.customhidden = { id: 'customhidden', name: 'Custom Hidden', allowMultiples: true, fieldTemplate: { element: 'input', type: 'hidden'/*, cssClass: 'lt-custom-input'*/ } };
			this.contactwidget = { id: 'contactwidget', name: 'Contact Widget', fieldTemplate: { element: 'widget', type: 'contactwidget' } };
			this.email = { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { element: 'input', type: 'email', id: 'ltwEmail', placeholder: 'Email', required: true } };
		}
	}

	class contactFields {
		firstname: IWidgetHelpers.IFieldOptions;
		lastname: IWidgetHelpers.IFieldOptions;
		email: IWidgetHelpers.IFieldOptions;
		phone: IWidgetHelpers.IFieldOptions;
		company: IWidgetHelpers.IFieldOptions;
		state: IWidgetHelpers.IFieldOptions;
		comments: IWidgetHelpers.IFieldOptions;
		captcha: IWidgetHelpers.IFieldOptions;
		submit: IWidgetHelpers.IFieldOptions;
		successmessage: IWidgetHelpers.IFieldOptions;
		label: IWidgetHelpers.IFieldOptions;
		title: IWidgetHelpers.IFieldOptions;
		paragraph: IWidgetHelpers.IFieldOptions;
		hr: IWidgetHelpers.IFieldOptions;
		custominput: IWidgetHelpers.IFieldOptions;
		customhidden: IWidgetHelpers.IFieldOptions;
		constructor() {
			var sf = new sharedFields;
			this.firstname = { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwFirstName', placeholder: 'First Name', required: true } };
			this.lastname = { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwLastName', placeholder: 'Last Name', required: true } };
			// this.email = { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { element: 'input', type: 'email', id: 'ltwEmail', placeholder: 'Email', required: true } };
			this.phone = { id: 'phone', name: 'Phone', fieldTemplate: { element: 'input', type: 'tel', id: 'ltwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}' } };
			this.company = { id: 'company', name: 'Company', fieldTemplate: { element: 'input', type: 'text', id: 'ltwCompany', placeholder: 'Company' } };
			this.state = { id: 'state', name: 'State', fieldTemplate: { element: 'select', type: 'state', id: 'ltwState', placeholder: 'Select a State' } };
			this.comments = { id: 'comments', name: 'Comments', fieldTemplate: { element: 'textarea', id: 'ltwComments', placeholder: 'Comments', rows: 4 } };
			this.successmessage = { id: 'successmessage', name: 'Success Message Upon Submit', fieldTemplate: { element: 'div', type: 'successmessage', id: 'ltwSuccessMessage', fontSize: 20, value: 'Thank you. You will be contacted shortly.' } };
			this.captcha = sf.captcha;
			this.submit = sf.submit;
			this.label = sf.label;
			this.title = sf.title;
			this.paragraph = sf.paragraph;
			this.hr = sf.hr;
			this.custominput = sf.custominput;
			this.customhidden = sf.customhidden;
			this.email = sf.email;

			helpers.prototype.SetRequiredFields(this);
		}
	}

	class depositFields {
		depositterm: IWidgetHelpers.IFieldOptions;
		depositamount: IWidgetHelpers.IFieldOptions;
		deposittermdd: IWidgetHelpers.IFieldOptions;
		depositamountdd: IWidgetHelpers.IFieldOptions;
		submit: IWidgetHelpers.IFieldOptions;
		captcha: IWidgetHelpers.IFieldOptions;
		label: IWidgetHelpers.IFieldOptions;
		title: IWidgetHelpers.IFieldOptions;
		paragraph: IWidgetHelpers.IFieldOptions;
		hr: IWidgetHelpers.IFieldOptions;
		custominput: IWidgetHelpers.IFieldOptions;
		customhidden: IWidgetHelpers.IFieldOptions;
		contactwidget: IWidgetHelpers.IFieldOptions;
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
			this.contactwidget = sf.contactwidget;

			helpers.prototype.SetRequiredFields(this);
		}

		asArray() {
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IFieldOptions>(this);
		}
	}

	class depositResultFields {
		label: IWidgetHelpers.IFieldOptions;
		title: IWidgetHelpers.IFieldOptions;
		paragraph: IWidgetHelpers.IFieldOptions;
		hr: IWidgetHelpers.IFieldOptions;
		nodatamessage: IWidgetHelpers.IFieldOptions;
		depositdatalist: IWidgetHelpers.IFieldOptions;
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
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IFieldOptions>(this);
		}
	}

	class depositResultDataFields {
		label: IWidgetHelpers.IFieldOptions;
		title: IWidgetHelpers.IFieldOptions;
		paragraph: IWidgetHelpers.IFieldOptions;
		hr: IWidgetHelpers.IFieldOptions;
		api: IWidgetHelpers.IFieldOptions;
		totalinterestearned: IWidgetHelpers.IFieldOptions;
		amountplusinterest: IWidgetHelpers.IFieldOptions;
		compoundinteresttype: IWidgetHelpers.IFieldOptions;
		baserate: IWidgetHelpers.IFieldOptions;
		finalrate: IWidgetHelpers.IFieldOptions;
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
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IFieldOptions>(this);
		}
	}

	class mortgageQuoteFields {
		label: IWidgetHelpers.IFieldOptions;
		title: IWidgetHelpers.IFieldOptions;
		paragraph: IWidgetHelpers.IFieldOptions;
		hr: IWidgetHelpers.IFieldOptions;
		submit: IWidgetHelpers.IFieldOptions;

		loanpurpose: IWidgetHelpers.IFieldOptions;
		zipcode: IWidgetHelpers.IFieldOptions;
		purchaseprice: IWidgetHelpers.IFieldOptions;
		downpayment: IWidgetHelpers.IFieldOptions;
		propertyvalue: IWidgetHelpers.IFieldOptions;
		balance: IWidgetHelpers.IFieldOptions;
		cashout: IWidgetHelpers.IFieldOptions;
		creditscore: IWidgetHelpers.IFieldOptions;
		loanprogram: IWidgetHelpers.IFieldOptions;
		monthlyincome: IWidgetHelpers.IFieldOptions;
		monthlydebt: IWidgetHelpers.IFieldOptions;
		propertytype: IWidgetHelpers.IFieldOptions;
		propertyusage: IWidgetHelpers.IFieldOptions;
		vaeligible: IWidgetHelpers.IFieldOptions;
		vafirsttimeuse: IWidgetHelpers.IFieldOptions;
		vadisabled: IWidgetHelpers.IFieldOptions;
		vatype: IWidgetHelpers.IFieldOptions;
		firsttimebuyer: IWidgetHelpers.IFieldOptions;
		foreclosed: IWidgetHelpers.IFieldOptions;
		bankruptcy: IWidgetHelpers.IFieldOptions;
		loanownedby: IWidgetHelpers.IFieldOptions;
		constructor() {
			var sf = new sharedFields;
			this.label = sf.label;
			this.title = sf.title;
			this.paragraph = sf.paragraph;
			this.hr = sf.hr;
			this.submit = sf.submit;

			this.loanpurpose = { id: 'loanpurpose', name: 'loanpurpose', fieldTemplate: { element: 'select', type: 'loanpurpose', id: 'ltwLoanPurpose', placeholder: 'Loan Purpose' } };
			this.zipcode = { id: 'zipcode', name: 'zipcode', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwZipCode', placeholder: 'Zip Code', required: true } };
			this.purchaseprice = { id: 'purchaseprice', name: 'purchaseprice', fieldTemplate: { element: 'input', type: 'number', id: 'ltwPurchasePrice', placeholder: 'Purchase Price' } };
			this.downpayment = { id: 'downpayment', name: 'downpayment', fieldTemplate: { element: 'input', type: 'number', id: 'ltwDownPayment', placeholder: 'Down Payment' } };
			this.propertyvalue = { id: 'propertyvalue', name: 'propertyvalue', fieldTemplate: { element: 'input', type: 'number', id: 'ltwPropertyValue', placeholder: 'Property Value' } };
			this.balance = { id: 'balance', name: 'balance', fieldTemplate: { element: 'input', type: 'number', id: 'ltwBalance', placeholder: 'Mortgage Balance' } };
			this.cashout = { id: 'cashout', name: 'cashout', fieldTemplate: { element: 'input', type: 'number', id: 'ltwCashout', placeholder: 'Cash Out Amount' } };
			this.creditscore = { id: 'creditscore', name: 'creditscore', fieldTemplate: { element: 'select', type: 'creditscore', id: 'ltwCreditScore', placeholder: 'Credit Score' } };
			this.loanprogram = { id: 'loanprogram', name: 'loanprogram', fieldTemplate: { element: 'dropdown', type: 'loanprogram', id: 'ltwLoanProgram' } };
			this.monthlyincome = { id: 'monthlyincome', name: 'monthlyincome', fieldTemplate: { element: 'input', type: 'number', id: 'ltwMonthlyIncome', placeholder: 'Monthly Income (optional)' } };
			this.monthlydebt = { id: 'monthlydebt', name: 'monthlydebt', fieldTemplate: { element: 'input', type: 'number', id: 'ltwMonthlyDebt', placeholder: 'Monthly Income (optional)' } };
			this.propertytype = { id: 'propertytype', name: 'propertytype', fieldTemplate: { element: 'select', type: 'propertytype', id: 'ltwPropertyType', placeholder: 'Property Type' } };
			this.propertyusage = { id: 'propertyusage', name: 'propertyusage', fieldTemplate: { element: 'select', type: 'propertyusage', id: 'ltwPropertyUsage', placeholder: 'Property Use' } };
			this.vaeligible = { id: 'vaeligible', name: 'vaeligible', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVAEligible', placeholder: 'VA Eligible?' } };
			this.vafirsttimeuse = { id: 'vafirsttimeuse', name: 'vafirsttimeuse', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVAFirstTimeUse', placeholder: 'VA First Time Use?' } };
			this.vadisabled = { id: 'vadisabled', name: 'vadisabled', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVADisabled', placeholder: 'VA Disabled?' } };
			this.vatype = { id: 'vatype', name: 'vatype', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVAType', placeholder: 'VA Type?' } };
			this.firsttimebuyer = { id: 'firsttimebuyer', name: 'firsttimebuyer', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwFirstTimeBuyer', placeholder: 'First Time Buyer?' } };
			this.foreclosed = { id: 'foreclosed', name: 'foreclosed', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwForeclosed', placeholder: 'Foreclosed?' } };
			this.bankruptcy = { id: 'bankruptcy', name: 'bankruptcy', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwBankruptcy', placeholder: 'Bankruptcy?' } };
			this.loanownedby = { id: 'loanownedby', name: 'loanownedby', fieldTemplate: { element: 'select', type: 'loanownedby', id: 'ltwLoanOwnedBy', placeholder: 'Loan Owned By?' } };

			helpers.prototype.SetRequiredFields(this);
		}

		asArray() {
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IFieldOptions>(this);
		}
	}

	class mortgageRateFields {
		label: IWidgetHelpers.IFieldOptions;
		title: IWidgetHelpers.IFieldOptions;
		paragraph: IWidgetHelpers.IFieldOptions;
		hr: IWidgetHelpers.IFieldOptions;
		email: IWidgetHelpers.IFieldOptions;
		submit: IWidgetHelpers.IFieldOptions;

		loantype: IWidgetHelpers.IFieldOptions;
		ratetable: IWidgetHelpers.IFieldOptions;
		desiredloanprogram: IWidgetHelpers.IFieldOptions;
		desiredinterestrate: IWidgetHelpers.IFieldOptions;

		constructor() {
			var sf = new sharedFields;
			this.label = sf.label;
			this.title = sf.title;
			this.paragraph = sf.paragraph;
			this.hr = sf.hr;
			this.email = sf.email;
			this.submit = sf.submit;

			this.loantype = { id: 'loantype', name: 'loantype', fieldTemplate: { element: 'select', type: 'loantype', id: 'ltwLoanType', placeholder: 'Loan Type' } };
			this.ratetable = { id: 'ratetable', name: 'ratetable', fieldTemplate: { element: 'datatable', type: 'ratetable', id: 'ltwRateTable' } };
			this.desiredloanprogram = { id: 'desiredloanprogram', name: 'desiredloanprogram', fieldTemplate: { element: 'select', type: 'desiredloanprogram', id: 'ltwDesiredLoanProgram', placeholder: 'Desired Loan Type' } };
			this.desiredinterestrate = { id: 'desiredinterestrate', name: 'desiredinterestrate', fieldTemplate: { element: 'select', type: 'desiredinterestrate', id: 'ltwDesiredInterestRate', placeholder: 'Desired Interest Rate' } };

			helpers.prototype.SetRequiredFields(this);
		}

		asArray() {
			return helpers.prototype.ConvertObjectToArray<IWidgetHelpers.IFieldOptions>(this);
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

		constructor(lth: LoanTekWidget.helpers, currentBuildObject: IWidgetHelpers.IBuildOptions, excludeCaptchaField?: boolean, specifier?: string) {
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
