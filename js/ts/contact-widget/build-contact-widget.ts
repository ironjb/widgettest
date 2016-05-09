interface IFormObject {
	fields: IField[];
}

interface IField {
	field?: string;
	element?: string;
	id?: string;
	type?: string;
	style?: Object;
	placeholder?: string;
	required?: boolean,
	cols?: number,
	rows?: number,
	cssClass?: string,
	value?: string,
	size?: string,
	pattern?: string
}

interface IOptions {
	wrapperId?: string
	formId?: string;
	errorMessageWrapperId?: string;
	errrorMessageId?: string;
	defaultFormSize?: string;
	showBuilderTools?: boolean;
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

	constructor(formObj: IFormObject, options: IOptions) {
		var _thisC = this;
		var settings: IOptions = {
			wrapperId: 'ltWidgetWrapper',
			formId: 'LtcwContactWidgetForm',
			errorMessageWrapperId: 'ltcwErrorMessageWrapper',
			errrorMessageId: 'ltcwErrorMessage',
			defaultFormSize: null,
			showBuilderTools: false
		};
		ltjQuery.extend(settings, options);
		var el = _thisC.CreateElement();

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
		var isHidden: boolean = false;
		var cell = null;
		var fieldsLength = formObj.fields.length;
		var nextFieldCols: number;
		var nextIndex: number;
		var remainingColSpace: number = 0;
		var isNextHidden: boolean = false;
		var fieldTemplate: Object;

		var fieldTemplates = {
			clientid: { element: 'input', type: 'hidden', id: 'ltcwClientId', value: 'LTWS' + new Date().getTime().toString() },
			userid: { element: 'input', type: 'hidden', id: 'ltcwUserId', value: 'UserID###' },
			firstname: { element: 'input', type: 'text', id: 'ltcwFirstName', placeholder: 'First Name', required: true, cols: 6 },
			lastname: { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true, cols: 6 },
			email: { element: 'input', type: 'email', id: 'ltcwEmail', placeholder: 'Email', required: true, cols: 6 },
			phone: { element: 'input', type: 'tel', id: 'ltcwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}', cols: 6 },
			company: { element: 'input', type: 'text', id: 'ltcwCompany', placeholder: 'Company', cols: 6 },
			state: { element: 'select', type: 'state', id: 'ltcwState', placeholder: 'Select a State', cols: 6 },
			comments: { element: 'textarea', id: 'ltcwComments', placeholders: 'Comments', rows: 4 },
			submit: { element: 'button', type: 'submit', cssClass: 'btn-primary', value: 'Submit' }
		};

		function ExtendFieldTemplate(eItem: IField): IField {
			return ltjQuery.extend({}, fieldTemplates[eItem.field], eItem);
		}

		// First transform each template
		ltjQuery.each(formObj.fields, (i, elementItem) => {
			if (elementItem.field) {
				formObj.fields[i] = ExtendFieldTemplate(elementItem);
				delete formObj.fields[i].field;
				window.console && console.log('elItem', formObj.fields[i]);
			}
		});

		ltjQuery.each(formObj.fields, (i, elementItem) => {
			isHidden = elementItem.type === 'hidden';
			elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
			elementItem.size = elementItem.size ? elementItem.size : settings.defaultFormSize;
			isLastField = i >= fieldsLength - 1;

			nextIndex = i + 1;
			do {
				// nextFieldCols needs to ignore hidden fields.  instead it should check the next item in the array
				isNextHidden = formObj.fields[nextIndex] && formObj.fields[nextIndex].type === 'hidden';
				nextFieldCols = (formObj.fields[nextIndex] && formObj.fields[nextIndex].cols) ? formObj.fields[nextIndex].cols : isNextHidden ? 0 : COLUMNS_IN_ROW;
				nextIndex++;
			} while (nextFieldCols === 0 && nextIndex <= fieldsLength)

			if (isHidden) {
				returnForm.append(_thisC.CreateFormElement(elementItem));
			} else {
				// Create row
				if (!row) {
					columnCount = 0
					if (elementItem.cols >= COLUMNS_IN_ROW) {
						row = el.formGroup();
						isSingleRow = true;
					} else {
						row = el.row();
						isSingleRow = false;
					}
				}

				columnCount += elementItem.cols;

				// Create Cell
				if (isSingleRow) {
					cell = el.col().append(_thisC.CreateFormElement(elementItem));
				} else {
					cell = el.col(elementItem.cols).append(el.formGroup().append(el.col().append(_thisC.CreateFormElement(elementItem))));
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
									el.col().append(
										el.div().addClass('form-control-static bg-info visible-on-hover').html('<!-- cols: ' + remainingColSpace + ' -->')
									)
								)
							)
						);
					}

				} else {
					remainingColSpace = 0;
				}

				if (isTimeToAddRow) {
					returnForm.append(row);
					row = null;
					columnCount = 0;
				}
			}
		});

		ltjQuery('#' + settings.wrapperId).addClass('ltcw container-fluid').empty().append(returnForm);
	}

	// Needs to be instance variable since it is used during the constructor
	CreateElement = () => {
		var el = {
			p: () => { return ltjQuery('<p/>'); },
			div: () => { return ltjQuery('<div/>'); },
			form: () => { return ltjQuery('<form/>').addClass('form-horizontal'); },
			button: (type: string = 'button') => { return ltjQuery('<button/>').prop('type', type); },
			select: () => { return ltjQuery('<select/>').addClass('form-control'); },
			option: () => { return ltjQuery('<option/>'); },
			input: (type: string = 'text') => {
				return ltjQuery('<input/>').prop('type', type);
			},
			textarea: () => { return ltjQuery('<textarea/>').addClass('form-control'); },
			col: (colNumber: number = 12) => { return el.div().addClass('col-sm-' + colNumber.toString()); },
			row: (rowType: string = 'row') => { return el.div().addClass(rowType); },
			formGroup: () => { return el.row('form-group'); }
		};
		return el;
	}

	CreateFormElement = (elementObj: IField) => {
		var _thisM = this;
		var el = _thisM.CreateElement();
		var returnElement = null;
		switch (elementObj.element) {
			case 'button':
				returnElement = el.button(elementObj.type ? elementObj.type : 'button');
				elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
				elementObj.value = elementObj.value ? elementObj.value : 'OK';
				returnElement.addClass(elementObj.cssClass).html(elementObj.value);
				break;
			case 'select':
				returnElement = el.select();
				elementObj.placeholder = elementObj.placeholder ? elementObj.placeholder : ' ';
				// if (elementObj.placeholder) { returnElement.append(el.option().val('').html(elementObj.placeholder)); }
				switch (elementObj.type) {
					case "state":
						var usStates = _thisM.US_States();
						ltjQuery.each(usStates.states, function(i, state) {
							returnElement.append(el.option().val(state.abbreviation).html(state.name));
						});
						break;

					default:
						// code...
						break;
				}
				if (elementObj.value) { returnElement.val(elementObj.value); }
				break;
			case 'textarea':
				returnElement = el.textarea();
				if (elementObj.rows) { returnElement.prop('rows', elementObj.rows); }
				if (elementObj.value) { returnElement.val(elementObj.value); }
				break;
			case 'input':
				elementObj.type = elementObj.type ? elementObj.type : 'text';
				returnElement = el.input(elementObj.type);
				switch (elementObj.type) {
					case 'button':
						elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
						elementObj.value = elementObj.value ? elementObj.value : 'OK';
						returnElement.addClass(elementObj.cssClass).val(elementObj.value);
						break;
					case 'hidden':
						returnElement.val(elementObj.value);
\						break;
					default:
						returnElement.addClass('form-control');
						if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
						if (elementObj.value) { returnElement.val(elementObj.value); }
						break;
				}
				break;
			default:
				returnElement = el.div();
				break;
		}

		if (returnElement) {
			if (elementObj.id) {
				returnElement.prop('id', elementObj.id).prop('name', elementObj.id);
			}

			if (elementObj.style) {
				returnElement.css(elementObj.style);
			}

			if (elementObj.required) {
				returnElement.prop('required', true);
			}

			if (elementObj.placeholder) {
				elementObj.placeholder = elementObj.required ? '* ' + elementObj.placeholder : elementObj.placeholder;
				switch (elementObj.element) {
					case 'select':
						// if (elementObj.value) {
						// 	returnElement.prepend(el.option().val('').html(elementObj.placeholder).addClass('text-muted'));
						// } else {
						// 	returnElement.prepend(el.option().val('').html(elementObj.placeholder).prop('selected', true).addClass('text-muted'));
						// }
						returnElement.prepend(el.option().val('').html(elementObj.placeholder).addClass('text-muted'));
						if (!elementObj.value) { returnElement.val(''); }
						break;
					default:
						returnElement.prop('placeholder', elementObj.placeholder);
						break;
				}
			}

			if (elementObj.pattern) {
				returnElement.prop('pattern', elementObj.pattern);
			}

			if (elementObj.size) {
				switch (elementObj.element) {
					case 'textarea':
					case 'select':
						returnElement.addClass('input-' + elementObj.size);
						break;
					case 'button':
						returnElement.addClass('btn-' + elementObj.size);
						break;
					case 'input':
						switch (elementObj.type) {
							case 'button':
								returnElement.addClass('btn-' + elementObj.size);
								break;
							case 'hidden':
								break;
							default:
								returnElement.addClass('input-' + elementObj.size);
								break;
						}
						break;
					default:
						// code...
						break;
				}
			}
		}

		return returnElement;
	}

	US_States = (): IStates => {
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
