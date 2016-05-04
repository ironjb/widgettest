interface IFormObject {
	fields: IField[];
}

interface IField {
	element: string;
	id?: string;
	type?: string;
	placeholder?: string;
	required?: boolean,
	cols?: number
}

interface IState {
	abbreviation: string;
	name: string;
}

interface IStates {
	country: string;
	states: IState[];
}

class LoanTekBuildForm {

	constructor(formObj: IFormObject, options) {

		var settings = {
			wrapperId: 'ltWidgetWrapper',
			formId: 'LtcwContactWidgetForm',
			errorMessageWrapperId: 'ltcwErrorMessageWrapper',
			errrorMessageId: 'ltcwErrorMessage',
			showBuilderTools: false
		};
		ltjQuery.extend(settings, options);
		var el = CreateElement();

		var returnForm = el.form().prop('id', settings.formId).append(
			el.row('row').prop('id', settings.errorMessageWrapperId).css({ display: 'none'}).append(
				el.col().append(
					el.div().addClass('alert alert-danger').append(
						el.p().prop('id', settings.errrorMessageId)
					)
				)
			)
		);
		const COLUMNS_IN_ROW: number = 12;
		var columnCount: number = 0;
		var row = null;
		var isSingleRow: boolean;
		var isTimeToAddRow: boolean = false;
		var isLastField: boolean = false;
		var cell = null;
		var fieldsLength = formObj.fields.length;
		var nextFieldCols: number;
		var remainingColSpace: number = 0;

		ltjQuery.each(formObj.fields, (i, elementItem) => {
			elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
			// window.console && console.log(i, elementItem);
			isLastField = i >= fieldsLength - 1;
			nextFieldCols = (formObj.fields[i + 1] && formObj.fields[i + 1].cols) ? formObj.fields[i + 1].cols : COLUMNS_IN_ROW;
			// window.console && console.log(i, isLastField);

			// Create row
			if (!row) {
				// window.console && console.log('no row... created', elementItem);
				columnCount = 0
				if (elementItem.cols >= COLUMNS_IN_ROW) {
					// window.console && console.log('row was set to full... created form-group row');
					row = el.formGroup();
					isSingleRow = true;
				} else {
					// window.console && console.log('not full row... created regular row');
					row = el.row();
					isSingleRow = false;
				}
			}

			columnCount += elementItem.cols;

			// Create Cell
			if (isSingleRow) {
				cell = el.col().append(CreateFormElement(elementItem));
			} else {
				cell = el.col(elementItem.cols).append(el.formGroup().append(el.col().append(CreateFormElement(elementItem))));
			}

			row.append(cell);

			isTimeToAddRow = isLastField || columnCount >= COLUMNS_IN_ROW;

			if (columnCount < COLUMNS_IN_ROW && columnCount + nextFieldCols > COLUMNS_IN_ROW) {
				isTimeToAddRow = true;
				remainingColSpace = COLUMNS_IN_ROW - columnCount;

				// On Hover... show leftover space
				if (settings.showBuilderTools) {
					row.append(
						el.col(remainingColSpace).addClass('hidden-xs').append(
							el.formGroup().append(
								el.col().addClass('visible-contents-on-hover').append(
									el.div().addClass('form-control-static bg-info').html(/*'cols: ' + remainingColSpace*/'')
								)
							)
						)
					);
					// row.append(el.div().css({'position': 'absolute', 'bottom': '0px', 'background-color': '#DDD'}));
				}

			} else {
				remainingColSpace = 0;
			}

			if (isTimeToAddRow) {
				returnForm.append(row);
				row = null;
				columnCount = 0;
			}
		});

		// var returnDiv = el().div().addClass('ltcw container-fluid').append(returnForm);

		ltjQuery('#' + settings.wrapperId).addClass('ltcw container-fluid').empty().append(returnForm);

		function CreateElement() {
			var el = {
				p: () => { return ltjQuery('<p/>'); },
				div: () => { return ltjQuery('<div/>'); },
				form: () => { return ltjQuery('<form/>').addClass('form-horizontal'); },
				button: (btnClass: string = 'default', type: string = 'button') => { return ltjQuery('<button/>').addClass('btn btn-' + btnClass); },
				select: () => { return ltjQuery('<select/>').addClass('form-control'); },
				option: () => { return ltjQuery('<option/>'); },
				input: (type: string = 'text', cssClass: string = 'form-control') => {
					return ltjQuery('<input/>').prop('type', type).addClass(cssClass);
				},
				textarea: () => { return ltjQuery('<textarea/>'); },
				col: (colNumber: number = 12) => { return el.div().addClass('col-sm-' + colNumber.toString()); },
				row: (rowType: string = 'row') => { return el.div().addClass(rowType); },
				formGroup: () => { return el.row('form-group'); }
			};
			return el;
		}

		function CreateFormElement(elementObj: IField) {
			var el = CreateElement();
			var returnElement = null;
			switch (elementObj.element) {
				case 'button':
					// code...
					break;
				case 'select':
					returnElement = el.select();
					if (elementObj.id) { returnElement.prop('id', elementObj.id); }
					switch (elementObj.type) {
						case "state":
							var usStates = US_States();
							ltjQuery.each(usStates.states, function (i, state) {
								// body...
							});
							break;

						default:
							// code...
							break;
					}
				default:
					// code...
					break;
			}

			// window.console && console.log('returnElement', returnElement);
			return el.input().val(elementObj.element + ' ' + elementObj.id);
			// return returnElement;
		}

		function US_States(): IStates {
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
}