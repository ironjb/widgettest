/// <reference path="../common/interfaces-widget.d.ts" />

class LoanTekBuildForm {

	constructor(/*formObj: IWidgetFormObject, */options: IWidgetFormObject) {
		var _thisC = this;
		var settings: IWidgetFormObject = {
			wrapperId: 'ltWidgetWrapper'
			, formId: 'LtcwContactWidgetForm'
			, errorMessageWrapperId: 'ltcwErrorMessageWrapper'
			, errrorMessageId: 'ltcwErrorMessage'
			, defaultFormSize: null
			, showBuilderTools: false
			, fields: null
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
		var isLabel: boolean;
		var cell = null;
		var fieldsLength = settings.fields.length;
		var nextFieldCols: number;
		var nextIndex: number;
		var remainingColSpace: number = 0;
		var isNextHidden: boolean = false;
		var fieldTemplate: Object;

		var fieldTemplates = {
			clientid: { element: 'input', type: 'hidden', id: 'ltcwClientId', value: function() { return 'LTWS' + new Date().getTime().toString() } },
			userid: { element: 'input', type: 'hidden', id: 'ltcwUserId', value: 'UserID###' },
			firstname: { element: 'input', type: 'text', id: 'ltcwFirstName', placeholder: 'First Name', required: true, cols: 6 },
			lastname: { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true, cols: 6 },
			email: { element: 'input', type: 'email', id: 'ltcwEmail', placeholder: 'Email', required: true, cols: 6 },
			phone: { element: 'input', type: 'tel', id: 'ltcwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}', cols: 6 },
			company: { element: 'input', type: 'text', id: 'ltcwCompany', placeholder: 'Company', cols: 6 },
			state: { element: 'select', type: 'state', id: 'ltcwState', placeholder: 'Select a State', cols: 6 },
			comments: { element: 'textarea', id: 'ltcwComments', placeholder: 'Comments', rows: 4 },
			submit: { element: 'button', type: 'submit', cssClass: 'btn-primary', value: 'Submit' },
			label: { element: 'label', cols: 6 },
			captcha: { element: 'captcha', cssClass: 'lt-captcha' }
		};

		function ExtendFieldTemplate(eItem: IWidgetField): IWidgetField {
			return ltjQuery.extend({}, fieldTemplates[eItem.field], eItem);
		}

		// First transform each template
		ltjQuery.each(settings.fields, (i, elementItem) => {
			if (elementItem.field) {
				settings.fields[i] = ExtendFieldTemplate(elementItem);
				delete settings.fields[i].field;
				// window.console && console.log('elItem', settings.fields[i]);
			}
		});

		ltjQuery.each(settings.fields, (i, elementItem) => {
			isHidden = elementItem.type === 'hidden';
			elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
			elementItem.size = elementItem.size ? elementItem.size : settings.defaultFormSize;
			isLastField = i >= fieldsLength - 1;
			isLabel = elementItem.element === 'label';

			nextIndex = i + 1;
			do {
				// nextFieldCols needs to ignore hidden fields.  instead it should check the next item in the array
				isNextHidden = settings.fields[nextIndex] && settings.fields[nextIndex].type === 'hidden';
				nextFieldCols = (settings.fields[nextIndex] && settings.fields[nextIndex].cols) ? settings.fields[nextIndex].cols : isNextHidden ? 0 : COLUMNS_IN_ROW;
				nextIndex++;
			} while (nextFieldCols === 0 && nextIndex <= fieldsLength)

			if (isHidden) {
				returnForm.append(_thisC.CreateFormElement(elementItem));
			} else {
				// Create row
				if (!row) {
					columnCount = 0
					if (elementItem.cols >= COLUMNS_IN_ROW) {
						row = el.formGroup(elementItem.size);
						isSingleRow = true;
					} else {
						row = el.row();
						isSingleRow = false;
					}
				}

				columnCount += elementItem.cols;

				// Create Cell
				if (isSingleRow) {
					// window.console && console.log(elementItem.element, isLabel);
					if (isLabel) {
						cell = _thisC.CreateFormElement(elementItem);
					} else {
						cell = el.col().append(_thisC.CreateFormElement(elementItem));
					}
				} else {
					// window.console && console.log(elementItem.element, isLabel);
					if (isLabel) {
						cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(_thisC.CreateFormElement(elementItem)));
					} else {
						cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(el.col().append(_thisC.CreateFormElement(elementItem))));
					}
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
								el.formGroup(elementItem.size).append(
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

		if (typeof settings.postDOMCallback === 'function') {
			settings.postDOMCallback();
		}
	}

	// Needs to be instance variable since it is used during the constructor
	CreateElement = () => {
		var el = {
			p: () => { return ltjQuery('<p/>'); },
			span: () => { return ltjQuery('<span/>'); },
			div: () => { return ltjQuery('<div/>'); },
			form: () => { return ltjQuery('<form/>').addClass('form-horizontal'); },
			label: () => { return ltjQuery('<label/>').addClass('control-label col-sm-12'); },
			button: (type: string = 'button') => { return ltjQuery('<button/>').prop('type', type); },
			select: () => { return ltjQuery('<select/>').addClass('form-control'); },
			option: () => { return ltjQuery('<option/>'); },
			input: (type: string = 'text') => {
				return ltjQuery('<input/>').prop('type', type);
			},
			textarea: () => { return ltjQuery('<textarea/>').addClass('form-control'); },
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

	CreateFormElement = (elementObj: IWidgetField) => {
		var _thisM = this;
		var el = _thisM.CreateElement();
		var returnElement = null;
		switch (elementObj.element) {
			case 'label':
				// window.console && console.log(elementObj.element);
				returnElement = el.label();
				if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
				elementObj.value = elementObj.value || 'label';
				returnElement.html(elementObj.value);
				break;
			case 'button':
				returnElement = el.button(elementObj.type ? elementObj.type : 'button');
				elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
				elementObj.value = elementObj.value ? elementObj.value : 'OK';
				returnElement.addClass(elementObj.cssClass).html(elementObj.value);
				break;
			case 'select':
				returnElement = el.select();
				elementObj.placeholder = elementObj.placeholder ? elementObj.placeholder : ' ';
				if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
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
				if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
				break;
			case 'input':
				elementObj.type = elementObj.type ? elementObj.type : 'text';
				returnElement = el.input(elementObj.type);
				switch (elementObj.type) {
					case 'button':
						elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
						elementObj.value = elementObj.value ? elementObj.value : 'OK';
						returnElement.val(elementObj.value);
						break;
					case 'hidden':
						returnElement.val(elementObj.value);
						break;
					default:
						returnElement.addClass('form-control');
						if (elementObj.value) { returnElement.val(elementObj.value); }
						break;
				}
				if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
				break;
			case 'captcha':
				var captchaInputObj: IWidgetField = { element: 'input', id: 'ltCaptchaInput', placeholder: 'Enter the characters', required: true };
				var captchaResetBtnObj: IWidgetField = { element: 'button', id: 'ltCaptchaReset', cssClass: 'btn-info', alttext: 'Reset', tabindex: -1, value: ' ' };
				if (elementObj.size) {
					captchaInputObj.size = elementObj.size;
					captchaResetBtnObj.size = elementObj.size;
				}
				var captchaInput = _thisM.CreateFormElement(captchaInputObj);
				var captchaResetBtn = _thisM.CreateFormElement(captchaResetBtnObj);

				returnElement = el.div().addClass('lt-captcha').append(
					el.div().addClass('panel panel-info').append(
						el.div().addClass('panel-heading').text('Security Check')
					).append(
						el.div().addClass('panel-body').append(
							el.formGroup().append(
								el.col().append(
									el.div().prop('id', 'ltCaptchaImg').addClass('captcha-font')
								)
							)
						).append(
							el.row().append(
								el.col(8, 'xs').append(
									captchaInput
								).append(
									el.span().prop('id', 'ltCaptchaErrorMsg').addClass('text-danger small').text('The code you entered does not match the one shown in the image.')
								)
							).append(
								el.col(4, 'xs').addClass('text-right').append(
									captchaResetBtn.html('&nbsp;').append(
										el.span().addClass('glyphicon glyphicon-refresh')
									).append('&nbsp;')
								)
							)
						)
					)
				);
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

			if (elementObj.alttext) {
				returnElement.prop('alt', elementObj.alttext).prop('title', elementObj.alttext);
			}

			if (elementObj.tabindex) {
				returnElement.prop('tabindex', elementObj.tabindex);
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
