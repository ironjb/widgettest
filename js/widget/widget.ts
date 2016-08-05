/// <reference path="../common/widget-helpers.ts" />

declare namespace IW {
	interface IWidgetFormBuildObject {
		wrapperId?: string;
		formId?: string;
		widgetType?: string;
		errorMessageWrapperId?: string;
		errrorMessageId?: string;
		showBuilderTools?: boolean;
		postDOMCallback?: any;

		fieldSize?: string;
		formBorderType?: string;
		panelTitle?: string;
		fields: IWidgetField[];

		resultWrapId?: string;
		rFormId?: string;
		rFieldSize?: string;
		rFormBorderType?: string;
		rPanelTitle?: string;
		rFields?: IWidgetField[];
	}

	// Contact Widget Interfaces
	interface IContactWidgetData {
		FileType: string;
		Reason: string;
		Source: {
			Active: boolean;
			Alias: string;
			Id: number;
			SourceType: string;
			Name: string;
			SubName: string;
		};
		NotifyUserOfNewLead: boolean;
		SendNewLeadInitialWelcomeMessage: boolean;
		ClientDefinedIdentifier: string;
		ClientId: number;
		Persons: {
			PersonCategoryType: string;
			PersonType: string;
			Addresses: {
				State: string;
			}[];
			ContactMethods: {
				ContactType: string;
				Address?: string;
				Number?: string;
			}[];
			Assets: {
				AssetType: string;
				CompanyName: string;
			}[];
			FirstName: string;
			LastName: string;
		}[];
		MiscData: {
			Name: string;
			Value: string;
		}[];
	}

	// interface IContactWidgetSource {
	// 	Active: boolean;
	// 	Alias: string;
	// 	Id: number;
	// 	SourceType: string;
	// 	Name: string;
	// 	SubName: string;
	// }

	// interface IContactWidgetPersonAddress {
	// 	State: string;
	// }

	// interface IContactWidgetContactMethod {
	// 	ContactType: string;
	// 	Address?: string;
	// 	Number?: string;
	// }

	// interface IContactWidgetAsset {
	// 	AssetType: string;
	// 	CompanyName: string;
	// }

	// interface IContactWidgetPerson {
	// 	PersonCategoryType: string;
	// 	PersonType: string;
	// 	Addresses: IContactWidgetPersonAddress[];
	// 	ContactMethods: IContactWidgetContactMethod[];
	// 	Assets: IContactWidgetAsset[];
	// 	FirstName: string;
	// 	LastName: string;
	// }

	// interface IContactWidgetMiscData {
	// 	Name: string;
	// 	Value: string;
	// }
}

namespace LoanTekWidgetTest {
	export class FormBuild {
		private _lth: LoanTekWidgetTest.helpers;
		private _$: JQueryStatic;
		constructor($: JQueryStatic, lth: LoanTekWidgetTest.helpers, options: IW.IWidgetFormBuildObject, readyOptions?: any) {
			var _thisC = this;
			_thisC._lth = lth;
			_thisC._$ = $;
			var settings: IW.IWidgetFormBuildObject = {
				wrapperId: 'ltWidgetWrapper'
				, formId: 'ltWidgetForm'
				, widgetType: lth.widgetType.contact.id
				, errorMessageWrapperId: 'ltcwErrorMessageWrapper'
				, errrorMessageId: 'ltcwErrorMessage'
				, fieldSize: null
				, formBorderType: null
				, panelTitle: null
				, showBuilderTools: false
				, fields: null
				, resultWrapId: null
				, rFormId: null
				, rFieldSize: null
				, rFormBorderType: null
				, rPanelTitle: null
				, rFields: null
			};
			$.extend(settings, options);

			const COLUMNS_IN_ROW: number = 12;
			var columnCount: number = 0;
			var row = null;
			var isSingleRow: boolean;
			var isTimeToAddRow: boolean = false;
			var isSpaceLeftOver: boolean = false;
			var isLastField: boolean = false;
			var isHidden: boolean = false;
			var isLabel: boolean;
			var cell: JQuery = null;
			var fieldsLength = settings.fields.length;
			var nextFieldCols: number;
			var nextIndex: number;
			var remainingColSpace: number = 0;
			var isNextHidden: boolean = false;
			var fieldTemplate: Object;

			var el = lth.CreateElement();

			var errorRow = el.row('row').prop('id', settings.errorMessageWrapperId);
			var errorMsg = el.p().prop('id', settings.errrorMessageId);

			if (!settings.showBuilderTools) {
				errorRow.css({ display: 'none' });
			} else {
				errorMsg.text('Error Message');
			}

			errorRow.append(
				el.col().append(
					el.div().addClass('alert alert-danger').append(errorMsg)
				)
			);

			var returnForm = el.form().prop('id', settings.formId).append(errorRow);

			// var fieldTemplates = {
			// 	clientid: { element: 'input', type: 'hidden', id: 'ltcwClientId', value: function() { return 'LTWS' + new Date().getTime().toString() } },
			// 	userid: { element: 'input', type: 'hidden', id: 'ltcwUserId', value: 'UserID###' },
			// 	firstname: { element: 'input', type: 'text', id: 'ltcwFirstName', placeholder: 'First Name', required: true },
			// 	lastname: { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true },
			// 	email: { element: 'input', type: 'email', id: 'ltcwEmail', placeholder: 'Email', required: true },
			// 	phone: { element: 'input', type: 'tel', id: 'ltcwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}' },
			// 	company: { element: 'input', type: 'text', id: 'ltcwCompany', placeholder: 'Company' },
			// 	state: { element: 'select', type: 'state', id: 'ltcwState', placeholder: 'Select a State' },
			// 	comments: { element: 'textarea', id: 'ltcwComments', placeholder: 'Comments', rows: 4 },
			// 	submit: { element: 'button', type: 'submit', cssClass: 'btn-primary', value: 'Submit' },
			// 	title: { element: 'title' },
			// 	label: { element: 'label' },
			// 	paragraph: { element: 'div' },
			// 	resultmessage: { element: 'div', id: 'ltcwResultMessage' },
			// 	captcha: { element: 'captcha' }
			// };

			function ExtendFieldTemplate(eItem: IWidgetField): IWidgetField {
				// return $.extend({}, fieldTemplates[eItem.field], eItem);
				return $.extend({}, lth.contactFields[eItem.field].fieldTemplate, eItem);
			}

			// First transform each template (must be done first because during the main loop it looks forward to the next element sometimes)
			$.each(settings.fields, (i, elementItem) => {
				if (elementItem.field) {
					settings.fields[i] = ExtendFieldTemplate(elementItem);
					// delete settings.fields[i].field;
					// window.console && console.log('elItem', settings.fields[i]);
				}
			});

			$.each(settings.fields, (fieldIndex, elementItem) => {
				isHidden = elementItem.type === 'hidden';
				elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
				elementItem.size = elementItem.size ? elementItem.size : settings.fieldSize;
				isLastField = fieldIndex >= fieldsLength - 1;
				isLabel = elementItem.element === 'label';

				nextIndex = fieldIndex + 1;
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
						if (isLabel) {
							cell = _thisC.CreateFormElement(elementItem);
						} else {
							cell = el.col().append(_thisC.CreateFormElement(elementItem));
						}

						if (settings.showBuilderTools) {
							appendBuilderTools(cell);
							appendMoveTools(cell);
						}
					} else {
						var innerCell: JQuery;
						if (isLabel) {
							innerCell = _thisC.CreateFormElement(elementItem);
						} else {
							innerCell = el.col().append(_thisC.CreateFormElement(elementItem));
						}

						// window.console && console.log(innerCell);

						if (settings.showBuilderTools) {
							appendBuilderTools(innerCell);
							appendMoveTools(innerCell);
						}
						// window.console && console.log(innerCell);

						cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(innerCell));
					}

					function appendBuilderTools(currentCell) {
						var passData = { index: fieldIndex };
						var passString = JSON.stringify(passData);
						currentCell.addClass('ltw-builder-tools-field').prepend(
							el.div().addClass('ltw-tool-field-update')
								.attr('data-lt-field-edit-tool', passString)
								.attr('data-lt-field-edit-tool-data', 'editFieldData')
						);

						if (!isSingleRow) {
							currentCell.addClass('ltw-builder-tools-multi-cell-row');
						}
					}

					function appendMoveTools(currentCell) {
						currentCell.prepend(el.div().addClass('move-hover'));

						currentCell.attr('data-drop','true')
							.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi})' }`, { pdi: fieldIndex }))
							.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover'}`);
					}

					// if (settings.showBuilderTools) {
					// 	// cell.append(el.div().html('Edit helper ' + elementItem.element));
					// 	// cell.attr('data-lt-widget-tool', `{ field: '` + elementItem.field + `' }`);
					// 	// cell.attr('data-ng-click', 'testFun();');
					// 	var passData = { index: fieldIndex/*, element: elementItem.element, type: elementItem.type*/ };
					// 	var passString = JSON.stringify(passData);
					// 	// window.console && console.log('passData', passData, passString);
					// 	cell.addClass('ltw-builder-tools-field').prepend(
					// 		el.div().addClass('ltw-tool-field-update')
					// 			.attr('data-lt-field-edit-tool', passString)
					// 			.attr('data-lt-field-edit-tool-data', 'editFieldData')
					// 			// .attr('data-ui-draggable', 'true')
					// 			// .attr('data-lt-edit-tool-current-form', 'currentForm')
					// 			// .attr('data-lt-edit-tool-build-script', 'WidgetScriptBuild')
					// 			// .prepend(
					// 			// 	el.div().addClass('drag-handle btn btn-default btn-xs').attr('style','').text('+')
					// 			// )
					// 			// .append(
					// 			// 	el.div().addClass('btn btn-default btn-xs btn-tool edit-tool-rights drag-handle')
					// 			// 	// .attr('data-ui-draggable', 'true')
					// 			// 	// .attr('data-drag', passData.index)
					// 			// 	// .attr('data-drag-channel', 'fieldschannel')
					// 			// 	.append(
					// 			// 		el.span().addClass('glyphicon glyphicon-move drag-handle')
					// 			// 	)
					// 			// )
					// 			// .append(
					// 			// el.div().addClass('btn btn-default btn-xs btn-tool field-channel')
					// 			// 	.attr('data-drag', 'true')
					// 			// 	.attr('data-jqyoui-draggable', lth.Interpolate(`{onStart:'onDragStart(#{dragIndex})'}`,{ dragIndex: passData.index}))
					// 			// 	.attr('data-jqyoui-options', `{revert: 'invalid', helper: 'clone'}`)
					// 			// 	.append(
					// 			// 		el.span().addClass('glyphicon glyphicon-move drag-handle')
					// 			// 	)
					// 			// )
					// 	);

					// 	if (!isSingleRow) {
					// 		cell.addClass('ltw-builder-tools-multi-cell-row');
					// 	}

					// 	// cell.attr('data-ui-draggable', 'true');//.attr('data-drag-handle-Class','drag-handle'); //attr('data-ui-on-Drop', 'onDrop($event,$data);')
					// 	// // cell.attr('data-drag', '{ passData: ' + JSON.stringify(passData) + '}');
					// 	// cell.attr('data-drag', passData.index);
					// 	// cell.attr('data-drag-handle-class', 'drag-handle');
					// 	// cell.attr('data-drag-channel', 'fieldschannel');

					// 	// cell.attr('data-ui-on-drop', 'onDrop('+ passData.index + ', $data);');
					// 	// cell.attr('data-drop-channel', 'fieldschannel');
					// 	// cell.attr('data-drop-validate', 'onDropValidation(' + passData.index + ', $data);');

					// 	cell.prepend(el.div().addClass('move-hover'));

					// 	cell.attr('data-drop','true')
					// 		.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi})' }`, { pdi: fieldIndex }))
					// 		.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover'}`);
					// }

					isTimeToAddRow = isLastField || columnCount >= COLUMNS_IN_ROW;
					isSpaceLeftOver = columnCount < COLUMNS_IN_ROW && columnCount + nextFieldCols > COLUMNS_IN_ROW;

					/*if (settings.showBuilderTools && !isTimeToAddRow && !isSpaceLeftOver) {
						cell.append(
							el.div().addClass('move-between-cells')
							.attr('data-drop', 'true')
							.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, #{space}, #{isPh})' }`, { pdi: fieldIndex, space: 'null', isPh: 'true' }))
							.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover', activeClass: 'on-drag-active'}`)
							// .prepend(el.div().addClass('move-hover'))
						);
					}*/

					row.append(cell);

					if (isSpaceLeftOver) {
						isTimeToAddRow = true;
						remainingColSpace = COLUMNS_IN_ROW - columnCount;

						// On move hover... show leftover space
						if (settings.showBuilderTools) {
							row.append(
								el.col(remainingColSpace).addClass('hidden-xs')
								.append(
									el.formGroup(elementItem.size).append(
										el.col().append(
											el.div().addClass('form-control-static bg-infox visible-on-hoverx').html('<!-- cols: ' + remainingColSpace + ' -->')
										)
										.attr('data-drop', 'true')
										.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, #{space}, #{isPh})' }`, { pdi: fieldIndex, space: remainingColSpace, isPh: 'true' }))
										.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover'}`)
										.prepend(el.div().addClass('move-hover'))
									)
								)
							);
						}

					} else {
						remainingColSpace = 0;
					}

					if (isTimeToAddRow) {
						returnForm.append(row);

						/*if (settings.showBuilderTools) {
							returnForm.append(
								el.div()
								.addClass('move-between-rows-wrapper')
								.attr('data-drop', 'true')
								.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, #{space}, #{isPh})' }`, { pdi: fieldIndex, space: 'null', isPh: 'true' }))
								.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover'}`)
								.append(
									el.div().addClass('move-between-rows')
								)
							);
						}*/

						row = null;
						columnCount = 0;
					}
				}
			});

			if (settings.formBorderType) {
				if (settings.formBorderType === lth.formBorderType.well.id) {
					var wellMain = el.div().addClass('well lt-widget-border');

					if (settings.panelTitle) {
						wellMain.append(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
					}

					returnForm = wellMain.append(returnForm);
					// returnForm = el.div().addClass('well').append(el.h(4).html(settings.panelTitle)).append(returnForm);
				} else if (settings.formBorderType === lth.formBorderType.panel.id) {
					var panelMain, panelHeading, panelBody;
					panelMain = el.div().addClass('panel panel-default lt-widget-border');
					panelBody = el.div().addClass('panel-body').append(returnForm);

					if (settings.panelTitle) {
						panelHeading = el.div().addClass('panel-heading lt-widget-heading').html(settings.panelTitle);
						// panelHeading = el.div().addClass('panel-heading').append(el.h(4).addClass('panel-title').html(settings.panelTitle));
					}

					if (panelHeading) {
						panelMain.append(panelHeading);
					}

					panelMain.append(panelBody);

					returnForm = panelMain;
					// returnForm = el.div().addClass('panel panel-default').append(returnForm);
				}

			} else if (settings.panelTitle) {
				returnForm.prepend(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
			}

			var widgetWrapper = $('#' + settings.wrapperId).addClass('ltw ' + lth.defaultFormSpecifierClass + ' container-fluid').empty().append(returnForm);
			if (settings.showBuilderTools) {
				widgetWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'ltFormEditTool'));
			}

			if (typeof settings.postDOMCallback === 'function') {
				settings.postDOMCallback();
			}

			// call function to set up stuff after DOM created
			if (settings.widgetType === lth.widgetType.quote.id) {

			} else if (settings.widgetType === lth.widgetType.rate.id) {

			} else {
				var widgetFunctionality = new ContactFunctionality($, readyOptions);
			}
		}

		CreateFormElement (elementObj: IWidgetField) {
			var _thisM = this;
			var el = _thisM._lth.CreateElement();
			var returnElement: JQuery = null;
			switch (elementObj.element) {
				case 'title':
					elementObj.nsize = elementObj.nsize || _thisM._lth.hsize.getDefault().id;
					returnElement = el.h(elementObj.nsize);
					returnElement.html(elementObj.value);
					break;
				case 'label':
					// window.console && console.log(elementObj.element);
					returnElement = el.label();
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					elementObj.value = elementObj.value || 'label';
					returnElement.html(elementObj.value);
					break;
				case 'p':
					elementObj.value = elementObj.value || ' ';
					returnElement = el.p();
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
							var usStates = _thisM._lth.US_States();
							_thisM._$.each(usStates.states, function(i, state) {
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
					elementObj.value = elementObj.value || ' ';
					returnElement = el.div();
					returnElement.html(elementObj.value);
					break;
			}

			if (returnElement) {
				if (elementObj.id) {
					returnElement.prop('id', elementObj.id).prop('name', elementObj.id);
				}

				if (elementObj.color) {
					returnElement.css({ color: elementObj.color });
				}

				if (elementObj.fontSize) {
					returnElement.css({ fontSize: elementObj.fontSize + 'px' });
				}

				if (elementObj.backgroundColor) {
					returnElement.css({ backgroundColor: elementObj.backgroundColor });
				}

				if (_thisM._lth.isNumber(elementObj.borderRadius)) {
					returnElement.css({ borderRadius: elementObj.borderRadius + 'px' });
				}

				if (elementObj.borderColor) {
					switch (elementObj.element) {
						case 'p':
						case 'div':
							returnElement.css({ borderWidth: '1px', borderStyle: 'solid' });
							break;
						default:
							break;
					}
					returnElement.css({ borderColor: elementObj.borderColor });
				}

				if (_thisM._lth.isNumber(elementObj.padding)) {
					returnElement.css({ padding: elementObj.padding + 'px' });
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
							returnElement.prepend(el.option().val('').html(elementObj.placeholder).addClass('placeholder-text'));
							if (!elementObj.value) { returnElement.val(''); }
							break;
						default:
							returnElement.attr('placeholder', elementObj.placeholder);
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
	}

	class ContactFunctionality {

		constructor($: JQueryStatic, options?: any) {
			var settings = {
				redirectUrl: null,
				postUrl: '',
				successMessage: null,
				externalValidatorFunction: null,

				// Default form element IDs
				form_id: '#ltWidgetForm',
				form_clientid: '#ltcwClientId',
				form_userid: '#ltcwUserId',
				form_firstName: '#ltcwFirstName',
				form_lastName: '#ltcwLastName',
				form_email: '#ltcwEmail',
				form_phone: '#ltcwPhone',
				form_company: '#ltcwCompany',
				form_state: '#ltcwState',
				form_comments: '#ltcwComments',
				form_submit: '#ltcwSubmit',
				form_errorMsgWrapper: '#ltcwErrorMessageWrapper',
				form_errorMsg: '#ltcwErrorMessage',
				successMsgWrapper: '#ltcwSuccessMessageWrapper',
				successMsg: '#ltcwSuccessMessage'
			};
			$.extend(settings, options);

			$('input, textarea').placeholder({ customClass: 'placeholder-text' });

			$(() => {

				var widgetData: IW.IContactWidgetData = {
					"FileType": "SalesLead",
					"Reason": "FORM_VALUE_Comments",
					"Source": {
						"Active": true,
						"Alias": "LoanTek.com",
						"Id": 44,
						"SourceType": "LeadSource",
						"Name": "LoanTek.com",
						"SubName": "Contact-Us-Form"
					},
					"NotifyUserOfNewLead": true,
					"SendNewLeadInitialWelcomeMessage": true,
					"ClientDefinedIdentifier": "LTWSJavaScriptTimeStamp",
					"ClientId": 399,
					"Persons": [{
						"PersonCategoryType": "Person",
						"PersonType": "Primary",
						"Addresses": [{
							"State": "FORM_VALUE_State"
						}],
						"ContactMethods": [{
							"ContactType": "Email",
							"Address": "FORM_VALUE_Email"
						}, {
								"ContactType": "Phone",
								"Number": "FORM_VALUE_Phone"
							}],
						"Assets": [{
							"AssetType": "Job",
							"CompanyName": "FORM_VALUE_Company"
						}],
						"FirstName": "FORM_VALUE_FName",
						"LastName": "FORM_VALUE_LName"
					}],
					"MiscData": [{
						"Name": "AdditionalInformation",
						"Value": "LEAVE_BLANK_FOR_NOW"
					}]
				};

				$(settings.form_submit).prop('disabled', false);

				$(settings.form_id).submit((event) => {
					event.preventDefault();
					$(settings.form_errorMsgWrapper).hide(100);
					$(settings.form_submit).prop('disabled', true);

					if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
						$(settings.form_submit).prop('disabled', false);
						return false;
					}

					widgetData.Persons[0].FirstName = $(settings.form_firstName).val();
					widgetData.Persons[0].LastName = $(settings.form_lastName).val();
					widgetData.Persons[0].ContactMethods[0].Address = $(settings.form_email).val();
					widgetData.Persons[0].ContactMethods[1].Number = $(settings.form_phone).val();
					widgetData.Persons[0].Assets[0].CompanyName = $(settings.form_company).val();
					widgetData.Persons[0].Addresses[0].State = $(settings.form_state + ' option:selected').val();
					// widgetData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime().toString();
					widgetData.ClientDefinedIdentifier = $(settings.form_clientid).val();
					widgetData.Reason = $(settings.form_comments).val();
					widgetData.MiscData[0].Value = '';

					// window.console && console.log('widgetData', widgetData);

					var request = $.ajax({
						// url: 'http://node-cors-server.herokuapp.com/no-cors',
						// url: 'http://node-cors-server.herokuapp.com/simple-cors',
						url: settings.postUrl
						, method: 'POST'
						, contentType: 'application/json'
						, dataType: 'json'
						, data: JSON.stringify(widgetData)
					});

					request.done((result) => {
						// Clear all fields
						$(settings.form_id).trigger('reset');
						$(settings.form_submit).prop('disabled', false);

						if (settings.redirectUrl) {
							window.location.assign(settings.redirectUrl);
						} else if (settings.successMessage) {
							$(settings.form_id).hide(100, () => {
								$(settings.form_id).remove();
							});
							$(settings.successMsgWrapper).show(100);
							$(settings.successMsg).html(settings.successMessage);
						}
					});

					request.fail((error) => {
						$(settings.form_submit).prop('disabled', false);
						var msg = 'There was an unexpected error. Please try again.';

						try {
							var errorObj = (error.responseJSON != null) ? error.responseJSON : JSON.parse(error.responseText);
							msg = errorObj.Message;
						} catch (e) {
							console.error('Error @ request.fail.responseText:' + e);
						}

						$(settings.form_errorMsg).html(msg);
						$(settings.form_errorMsgWrapper).show(100);
					});
				});
			});
		}
	}
}
