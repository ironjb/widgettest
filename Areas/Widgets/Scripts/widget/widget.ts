/// <reference path="../common/widget-helpers.ts" />

declare namespace LTWidget {

	interface IFunctionalityOptions {
		postUrl?: string;
		externalValidatorFunction?: Function;
		userId?: number;
		clientId?: number;

		form_id?: string;
		form_submit?: string;
		form_errorAnchor?: string;
		form_errorMsgWrapper?: string;
		form_errorMsg?: string;

		resultDisplayOptions?: IResultBuildOptions;
	}

	interface IDepositFunctionalityOptions extends IFunctionalityOptions {
		form_term?: string;
		form_amount?: string;
	}
}

interface IWidgetFormBuildObject extends LTWidget.IBuildOptions {
	wrapperId?: string;
	formId?: string;
	// widgetType?: string;
	// successMessageWrapperId?: string;
	errorAnchor?: string;
	errorMessageWrapperId?: string;
	errrorMessageId?: string;
	// showBuilderTools?: boolean;
	postDOMCallback?: any;

	// fieldSize?: string;
	// formBorderType?: string;
	// panelTitle?: string;
	// fields: IWidgetField[];

	// resultWrapperId?: string;
	// resultFieldSize?: string;
	// resultBorderType?: string;
	// resultPanelTitle?: string;
	// resultFields?: IWidgetField[];
}

interface IWidgetContactFunctionalityOptions {
	redirectUrl?: string;
	postUrl?: string;
	successMessage?: string;
	externalValidatorFunction?: Function;
	userId?: number;
	clientId?: number;
	AdditionalPostData?: LoanTekWidget.PostObject_Contact;

	form_id?: string;
	form_firstName?: string;
	form_lastName?: string;
	form_email?: string;
	form_phone?: string;
	form_company?: string;
	form_state?: string;
	form_comments?: string;
	form_submit?: string;
	form_successMessageWrapper?: string;
	form_errorAnchor?: string;
	form_errorMsgWrapper?: string;
	form_errorMsg?: string;
}

namespace LoanTekWidget {
	export class FormBuild {
		private _lth: LoanTekWidget.helpers;
		private _$: JQueryStatic;
		constructor($: JQueryStatic, lth: LoanTekWidget.helpers, options: IWidgetFormBuildObject, readyOptions?: any) {
			var _thisC = this;
			_thisC._lth = lth;
			_thisC._$ = $;
			var settings: IWidgetFormBuildObject = {
				wrapperId: 'ltWidgetWrapper'
				, formId: 'ltWidgetForm'
				, widgetType: lth.widgetType.contact.id
				, successMessageWrapperId: 'ltwSuccessMessageWrapper'
				, errorAnchor: 'ltwErrorAnchor'
				, errorMessageWrapperId: 'ltwErrorMessageWrapper'
				, errrorMessageId: 'ltwErrorMessage'
				, fieldSize: null
				, formBorderType: null
				, panelTitle: null
				, showBuilderTools: false
				, fields: null

				// , resultWrapperId: 'ltWidgetResultWrapper'
				// , resultFieldSize: null
				// , resultBorderType: null
				// , resultPanelTitle: null
				// , resultFields: null
			};
			$.extend(settings, options);
			// window.console && console.log('settings.widgetType', settings.widgetType);

			// const COLUMNS_IN_ROW: number = 12;
			// var columnCount: number = 0;
			// var row: JQuery = null;
			// var isSingleRow: boolean;
			// var isTimeToAddRow: boolean = false;
			// var isSpaceLeftOver: boolean = false;
			// var isLastField: boolean = false;
			// var isHidden: boolean = false;
			// var isLabel: boolean;
			// var cell: JQuery = null;
			// var fieldsLength: number = settings.fields.length;
			// var nextFieldOffsetCols: number;
			// var nextFieldCols: number;
			// var nextIndex: number;
			// var remainingColSpace: number = 0;
			// var isNextHidden: boolean = false;
			var fieldHelperType: string;
			// var fieldTemplate: Object;

			var el = lth.CreateElement();
			var buildTools = new BuildTools(lth);
			// var formEl = new FormElement(lth);

			var errorRow = el.row('row').prop('id', settings.errorMessageWrapperId);
			var errorMsg = el.p().prop('id', settings.errrorMessageId);

			if (settings.widgetType === lth.widgetType.quote.id) {
				fieldHelperType = 'quoteFields';
			} else if (settings.widgetType === lth.widgetType.rate.id) {
				fieldHelperType = 'rateFields';
			} else if (settings.widgetType === lth.widgetType.deposit.id) {
				fieldHelperType = 'depositFields';
			} else {
				fieldHelperType = 'contactFields';
			}

			settings.fieldHelperType = fieldHelperType;

			if (!settings.showBuilderTools) {
				errorRow.css({ display: 'none' });
			} else {
				errorMsg.text('Error Message');
			}

			errorRow.append(
				el.col().append(
					el.a().prop('name', settings.errorAnchor)
				).append(
					el.div().addClass('alert alert-danger').append(errorMsg)
				)
			);

			var returnForm = el.form().prop('id', settings.formId).append(errorRow);

			// function ExtendFieldTemplate(eItem: IWidgetField): IWidgetField {
			// 	// return $.extend({}, fieldTemplates[eItem.field], eItem);
			// 	// window.console && console.log('lth fieldhelper', fieldHelperType, lth['depositFields']);
			// 	return $.extend({}, lth[fieldHelperType][eItem.field].fieldTemplate, eItem);
			// }

			/*// First transform each template (must be done first because during the main loop it looks forward to the next element sometimes)
			$.each(settings.fields, (i, elementItem) => {
				if (elementItem.field) {
					// settings.fields[i] = ExtendFieldTemplate(elementItem);
					settings.fields[i] = lth.ExtendWidgetFieldTemplate(elementItem, fieldHelperType);
				}
			});

			$.each(settings.fields, (fieldIndex, elementItem) => {
				if (elementItem.offsetCols && !elementItem.cols) {
					elementItem.cols = COLUMNS_IN_ROW - elementItem.offsetCols;
				}

				isHidden = elementItem.type === 'hidden';
				elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
				elementItem.offsetCols = elementItem.offsetCols ? elementItem.offsetCols : 0;
				elementItem.size = elementItem.size ? elementItem.size : settings.fieldSize;
				isLastField = fieldIndex >= fieldsLength - 1;
				isLabel = elementItem.element === 'label';

				nextIndex = fieldIndex + 1;
				do {
					// nextFieldCols needs to ignore hidden fields.  instead it should check the next item in the array
					isNextHidden = settings.fields[nextIndex] && settings.fields[nextIndex].type === 'hidden';
					nextFieldOffsetCols = (settings.fields[nextIndex] && settings.fields[nextIndex].offsetCols) ? settings.fields[nextIndex].offsetCols : 0;
					nextFieldCols = (settings.fields[nextIndex] && settings.fields[nextIndex].cols) ? settings.fields[nextIndex].cols + nextFieldOffsetCols : isNextHidden ? 0 : COLUMNS_IN_ROW;
					nextIndex++;
				} while (nextFieldCols === 0 && nextIndex <= fieldsLength)

				if (isHidden) {
					returnForm.append(buildTools.CreateFormElement(elementItem));
				} else {
					// Create row
					if (!row) {
						columnCount = 0
						if (elementItem.cols + elementItem.offsetCols >= COLUMNS_IN_ROW) {
							row = el.formGroup(elementItem.size);
							isSingleRow = true;
						} else {
							row = el.row();
							isSingleRow = false;
						}
					}

					columnCount += elementItem.cols + elementItem.offsetCols;

					// Create Cell
					if (isSingleRow) {
						if (isLabel) {
							if (elementItem.offsetCols > 0) {
							cell = el.col(elementItem.cols).append(el.row().append(buildTools.CreateFormElement(elementItem)));
							} else {
							cell = buildTools.CreateFormElement(elementItem);
							}
						} else {
							cell = el.col(elementItem.cols).append(buildTools.CreateFormElement(elementItem));
						}

						if (settings.showBuilderTools) {
							appendBuilderTools(cell);
							appendMoveTools(cell);
						}
					} else {
						var innerCell: JQuery;
						if (isLabel) {
							innerCell = buildTools.CreateFormElement(elementItem);
						} else {
							innerCell = el.col().append(buildTools.CreateFormElement(elementItem));
						}

						if (settings.showBuilderTools) {
							appendBuilderTools(innerCell);
							appendMoveTools(innerCell);
						}

						cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(innerCell));
					}

					if (elementItem.offsetCols > 0) {
						cell.addClass('col-sm-offset-' + elementItem.offsetCols);
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

						currentCell.attr('data-drop', 'true')
							.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi})' }`, { pdi: '' + fieldIndex }))
							.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover'}`);
					}

					isTimeToAddRow = isLastField || columnCount >= COLUMNS_IN_ROW;
					isSpaceLeftOver = columnCount < COLUMNS_IN_ROW && columnCount + nextFieldCols > COLUMNS_IN_ROW;

					// if (settings.showBuilderTools && !isTimeToAddRow && !isSpaceLeftOver) {
					// 	cell.append(
					// 		el.div().addClass('move-between-cells')
					// 		.attr('data-drop', 'true')
					// 		.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, #{space}, #{isPh})' }`, { pdi: fieldIndex, space: 'null', isPh: 'true' }))
					// 		.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover', activeClass: 'on-drag-active'}`)
					// 		// .prepend(el.div().addClass('move-hover'))
					// 	);
					// }

					if (elementItem.type === lth.contactFields.successmessage.id) {
						var wrapElement: JQuery = isSingleRow ? row : cell;
						wrapElement.prop('id', settings.successMessageWrapperId);

						if (!settings.showBuilderTools) {
							wrapElement.css({display: 'none'});
						}
					}

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
											.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, #{space}, #{isPh})' }`, { pdi: '' + fieldIndex, space: remainingColSpace, isPh: 'true' }))
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

						// if (settings.showBuilderTools) {
						// 	returnForm.append(
						// 		el.div()
						// 		.addClass('move-between-rows-wrapper')
						// 		.attr('data-drop', 'true')
						// 		.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, #{space}, #{isPh})' }`, { pdi: fieldIndex, space: 'null', isPh: 'true' }))
						// 		.attr('data-jqyoui-options', `{accept: '.field-channel', hoverClass: 'on-drag-hover'}`)
						// 		.append(
						// 			el.div().addClass('move-between-rows')
						// 		)
						// 	);
						// }

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
				} else if (settings.formBorderType === lth.formBorderType.panel.id) {
					var panelMain, panelHeading, panelBody;
					panelMain = el.div().addClass('panel panel-default lt-widget-border');
					panelBody = el.div().addClass('panel-body').append(returnForm);

					if (settings.panelTitle) {
						panelHeading = el.div().addClass('panel-heading lt-widget-heading').html(settings.panelTitle);
					}

					if (panelHeading) {
						panelMain.append(panelHeading);
					}

					panelMain.append(panelBody);

					returnForm = panelMain;
				}

			} else if (settings.panelTitle) {
				returnForm.prepend(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
			}*/
			var returnForm2 = buildTools.BuildFields(returnForm, settings);
			var returnFormStyles: string = new LoanTekWidget.ApplyFormStyles(lth, settings, false, '.' + lth.defaultFormSpecifierClass).getStyles();
			returnForm2.prepend(el.style().html(returnFormStyles));

			var widgetWrapper = $('#' + settings.wrapperId).addClass('ltw ' + lth.defaultFormSpecifierClass).empty().append(returnForm2);
			if (settings.showBuilderTools) {
				widgetWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'buildObject'));
			}

			if (typeof settings.postDOMCallback === 'function') {
				settings.postDOMCallback();
			}

			// call function to set up stuff after DOM created
			var widgetFunctionality: any;
			if (settings.widgetType === lth.widgetType.quote.id) {
				//
			} else if (settings.widgetType === lth.widgetType.rate.id) {
				//
			} else if (settings.widgetType === lth.widgetType.deposit.id) {
				widgetFunctionality = new DepositFunctionality(lth, readyOptions)
			} else {
				widgetFunctionality = new ContactFunctionality($, lth, readyOptions);
			}
		}
	}

	export class ContactFunctionality {

		constructor($: JQueryStatic, lth: LoanTekWidget.helpers, options?: IWidgetContactFunctionalityOptions) {
			var settings: IWidgetContactFunctionalityOptions = {
				redirectUrl: null,
				postUrl: null,
				// postUrl: 'https://api.loantek.com/Leads.Clients/SalesLeadRequest/Add/[authToken]',
				// postUrl: '/widgets/home/angulartemplates/jsonSuccess',
				successMessage: 'Thank you. You will be contacted shortly.',
				externalValidatorFunction: null,
				userId: null,
				clientId: null,
				AdditionalPostData: null,

				// Default form element IDs
				form_id: '#ltWidgetForm',
				form_firstName: '#ltwFirstName',
				form_lastName: '#ltwLastName',
				form_email: '#ltwEmail',
				form_phone: '#ltwPhone',
				form_company: '#ltwCompany',
				form_state: '#ltwState',
				form_comments: '#ltwComments',
				form_submit: '#ltwSubmit',
				form_successMessageWrapper: '#ltwSuccessMessageWrapper',
				form_errorAnchor: 'ltwErrorAnchor',
				form_errorMsgWrapper: '#ltwErrorMessageWrapper',
				form_errorMsg: '#ltwErrorMessage',
			};
			$.extend(settings, options);

			$('input, textarea').placeholder({ customClass: 'placeholder-text' });

			$(function () {

				var contactPostData = lth.postObjects.contact();

				$(settings.form_submit).prop('disabled', false);

				$(settings.form_id).submit((event) => {
					event.preventDefault();
					$(settings.form_errorMsgWrapper).hide(100);
					$(settings.form_submit).prop('disabled', true);

					if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
						$(settings.form_submit).prop('disabled', false);
						return false;
					}

					contactPostData.Persons[0].FirstName = $(settings.form_firstName).val();
					contactPostData.Persons[0].LastName = $(settings.form_lastName).val();
					contactPostData.Persons[0].ContactMethods[0].Address = $(settings.form_email).val();
					contactPostData.Persons[0].ContactMethods[1].Number = $(settings.form_phone).val();
					contactPostData.Persons[0].Assets[0].CompanyName = $(settings.form_company).val();
					contactPostData.Persons[0].Addresses[0].State = $(settings.form_state + ' option:selected').val();
					contactPostData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime();
					contactPostData.ClientId = settings.clientId;
					contactPostData.UserId = settings.userId;
					contactPostData.Reason = $(settings.form_comments).val();
					contactPostData.MiscData[0].Value = '';

					if (settings.AdditionalPostData) {
						$.extend(true, contactPostData, settings.AdditionalPostData);
					}

					var request = $.ajax({
						// url: 'http://node-cors-server.herokuapp.com/no-cors'
						// url: 'http://node-cors-server.herokuapp.com/simple-cors'
						url: settings.postUrl
						, method: 'POST'
						, contentType: 'application/json'
						, dataType: 'json'
						// , data: JSON.stringify(contactPostData)
						, data: JSON.stringify({ LeadFile: contactPostData })
						// , data: { LeadFile: contactPostData }
					});

					request.done((result) => {
						// Clear all fields
						$(settings.form_id).trigger('reset');
						$(settings.form_submit).prop('disabled', false);

						if (settings.redirectUrl) {
							window.location.assign(settings.redirectUrl);
						} else if (settings.successMessage) {
							$(settings.form_submit).hide(100);
							$(settings.form_successMessageWrapper).show(100);
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
						lth.ScrollToAnchor(settings.form_errorAnchor);
					});
				});
			});
		}
	}

	export class DepositFunctionality {

		constructor(lth: LoanTekWidget.helpers, options?: LTWidget.IDepositFunctionalityOptions) {
			var $ = lth.$;
			var settings: LTWidget.IDepositFunctionalityOptions = {
				// IFunctionalityOptions options
				postUrl: null
				, externalValidatorFunction: null
				, userId: null
				, clientId: null
				, form_id: '#ltWidgetForm'
				, form_submit: '#ltwSubmit'
				, form_errorAnchor: 'ltwErrorAnchor'
				, form_errorMsgWrapper: '#ltwErrorMessageWrapper'
				, form_errorMsg: '#ltwErrorMessage'

				// IDepositFunctionalityOptions options
				, form_term: '#ltwDepositTerm'
				, form_amount: '#ltwDepositAmount'
				, resultDisplayOptions: {
					fieldHelperType: 'depositResultFields'
				}
			};
			$.extend(true, settings, options);
			$('input, textarea').placeholder({ customClass: 'placeholder-text' });
			// window.console && console.log('depositfnctionality settings: ', settings);

			$(function () {
				// var depositPostData: any = lth.postObjects.deposit();
				var depositPostData: any = {};
				$(settings.form_submit).prop('disabled', false);

				var appendDataToDataList = function (fieldList: IWidgetField[], data: any) {
					// window.console && console.log('fieldList', fieldList);
					for (var flIndex = fieldList.length - 1; flIndex >= 0; flIndex--) {
						// window.console && console.log('flIndex', flIndex);
						var fieldItem = fieldList[flIndex];
						if (fieldItem.field === 'depositdatalist') {
							fieldItem.fieldData = data;
						}
					}
				}

				// Show on Create Widget page
				if (settings.resultDisplayOptions.showBuilderTools) {
					// window.console && console.log('DepoistFunlity showBldrTools', settings.resultDisplayOptions.showBuilderTools);
					var fakeData = [{ APY: 1, TotalInterestEarned: 100, AmountPlusInterest: 100 }];
					appendDataToDataList(settings.resultDisplayOptions.fields, fakeData);
					// window.console && console.log('settings.resultDisplayOptions', settings.resultDisplayOptions);
					var showDepositResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
					showDepositResultBuild.build();
				}

				$(settings.form_id).submit(function (event) {
					event.preventDefault();
					$(settings.form_errorMsgWrapper).hide(100);
					$(settings.form_submit).prop('disabled', true);

					if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
						$(settings.form_submit).prop('disabled', false);
						return false;
					}

					depositPostData.ForType = 'DepositCd';
					depositPostData.TermInMonths = $(settings.form_term).val();
					depositPostData.Amount = $(settings.form_amount).val();

					var request = $.ajax({
						// url: 'http://node-cors-server.herokuapp.com/no-cors'
						// url: 'http://node-cors-server.herokuapp.com/simple-cors'
						url: settings.postUrl
						// , method: 'POST'
						, method: 'GET'
						, contentType: 'application/json'
						, dataType: 'json'
						// , data: JSON.stringify(contactPostData)
						, data: depositPostData
						// , data: { LeadFile: contactPostData }
					});

					request.done((result) => {
						// Clear all fields
						// $(settings.form_id).trigger('reset');

						$(settings.form_submit).prop('disabled', false);
						// window.console && console.log('request successful: ', result, settings.resultDisplayOptions);

						// for (var flIndex = settings.resultDisplayOptions.fields.length - 1; flIndex >= 0; flIndex--) {
						// 	var fieldItem = settings.resultDisplayOptions.fields[flIndex];
						// 	if (fieldItem.field === 'depositdatalist') {
						// 		fieldItem.fieldData = result;
						// 	}
						// 	// window.console && console.log('fieldItem', fieldItem);
						// }
						appendDataToDataList(settings.resultDisplayOptions.fields, result);
						// var depositResultBuild = new ResultsBuilder(lth, result, settings.resultDisplayOptions);
						var depositResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
						depositResultBuild.build();
					});

					request.fail((error) => {
						$(settings.form_submit).prop('disabled', false);
						var msg = 'There was an unexpected error. Please try again.';

						try {
							var errorObj = (error.responseJSON != null) ? error.responseJSON : JSON.parse(error.responseText);
							msg = errorObj.Message;
						} catch (e) {
							window.console && console.error('Error @ request.fail.responseText:' + e);
						}

						$(settings.form_errorMsg).html(msg);
						$(settings.form_errorMsgWrapper).show(100);
						lth.ScrollToAnchor(settings.form_errorAnchor);
					});
				});
			});
		}
	}

	export class ResultsBuilder {
		private settings: LTWidget.IResultBuildOptions;
		// private data: any;
		private lth: LoanTekWidget.helpers;
		// constructor(lth: LoanTekWidget.helpers, data: any, options: LTWidget.IResultBuildOptions) {
		constructor(lth: LoanTekWidget.helpers, options: LTWidget.IResultBuildOptions) {
			var _settings: LTWidget.IResultBuildOptions = {
				resultWrapperId: 'ltWidgetResultWrapper'
				, widgetChannel: 'result'
				// , resultFields: null
			};

			lth.$.extend(_settings, options)

			this.settings = _settings;
			// this.data = data;
			this.lth = lth;
		}

		build(startIndex?: number, showCount?: number) {
			var _thisM = this;
			var settings = this.settings;
			// var data = this.data;
			var lth = this.lth;
			var $ = lth.$;
			var el = lth.CreateElement();
			var resultHelperType: string;
			var buildTools = new BuildTools(lth);

			if (settings.widgetType === _thisM.lth.widgetType.quote.id) {
				resultHelperType = 'quoteResultFields';
			} else if (settings.widgetType === lth.widgetType.rate.id) {
				resultHelperType = 'rateResultFields';
			} else if (settings.widgetType === lth.widgetType.deposit.id) {
				resultHelperType = 'depositResultFields';
			} else {
				resultHelperType = 'contactResultFields';
			}

			settings.fieldHelperType = resultHelperType;

			var resultsForm = el.form();
			// window.console && console.log('ResultsBuilder build() settings', settings);
			var resultsForm2 = buildTools.BuildFields(resultsForm, settings);
			var resultsFormStyles: string = new LoanTekWidget.ApplyFormStyles(lth, settings, true, '.' + lth.defaultResultSpecifierClass).getStyles();
			resultsForm2.prepend(el.style().html(resultsFormStyles));

			var widgetResultWrapper = $('#' + _thisM.settings.resultWrapperId).addClass('ltw ' + _thisM.lth.defaultResultSpecifierClass).empty().append(resultsForm2);
			if (_thisM.settings.showBuilderTools) {
				widgetResultWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'resultObject'));
			}
		}
	}


	export class BuildTools{
		private lth: LoanTekWidget.helpers;
		constructor(lth: LoanTekWidget.helpers) {
			this.lth = lth;
		}

		BuildFields(mainWrapper: JQuery, options: LTWidget.IBuildOptions, data?: any): JQuery {
			var _thisM = this;
			var lth = this.lth;
			var $ = lth.$;
			var settings: LTWidget.IBuildOptions = {
				fieldHelperType: null
				, fieldSize: null
				, showBuilderTools: false
			};

			$.extend(settings, options);
			window.console && console.log('BuildFields settings', settings);
			const COLUMNS_IN_ROW: number = 12;
			var columnCount: number = 0;
			var row: JQuery = null;
			var isSingleRow: boolean;
			var isTimeToAddRow: boolean = false;
			var isSpaceLeftOver: boolean = false;
			var isLastField: boolean = false;
			var isHidden: boolean = false;
			var isLabel: boolean;
			var cell: JQuery = null;
			var fieldsLength: number = settings.fields.length;
			var nextFieldOffsetCols: number;
			var nextFieldCols: number;
			var nextIndex: number;
			var remainingColSpace: number = 0;
			var isNextHidden: boolean = false;
			// var fieldHelperType: string;
			var fieldTemplate: Object;

			var el = lth.CreateElement();
			// var formEl = new FormElement(lth);
			// window.console && console.log('mainWrapper', mainWrapper);

			settings.widgetChannel = settings.widgetChannel || 'form';

			// First transform each template (must be done first because during the main loop it looks forward to the next element sometimes)
			$.each(settings.fields, (i, elementItem) => {
				if (elementItem.field) {
					// settings.fields[i] = ExtendFieldTemplate(elementItem);
					// window.console && console.log('settings.fieldHelperType', settings.fieldHelperType);
					settings.fields[i] = lth.ExtendWidgetFieldTemplate(elementItem, settings.fieldHelperType);
				}
			});

			$.each(settings.fields, (fieldIndex, elementItem) => {
				// window.console && console.log('elementItem', elementItem);
				if (elementItem.offsetCols && !elementItem.cols) {
					elementItem.cols = COLUMNS_IN_ROW - elementItem.offsetCols;
				}

				isHidden = elementItem.type === 'hidden';
				elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
				elementItem.offsetCols = elementItem.offsetCols ? elementItem.offsetCols : 0;
				elementItem.size = elementItem.size ? elementItem.size : settings.fieldSize;
				isLastField = fieldIndex >= fieldsLength - 1;
				isLabel = elementItem.element === 'label';

				nextIndex = fieldIndex + 1;
				do {
					// nextFieldCols needs to ignore hidden fields.  instead it should check the next item in the array
					isNextHidden = settings.fields[nextIndex] && settings.fields[nextIndex].type === 'hidden';
					nextFieldOffsetCols = (settings.fields[nextIndex] && settings.fields[nextIndex].offsetCols) ? settings.fields[nextIndex].offsetCols : 0;
					nextFieldCols = (settings.fields[nextIndex] && settings.fields[nextIndex].cols) ? settings.fields[nextIndex].cols + nextFieldOffsetCols : isNextHidden ? 0 : COLUMNS_IN_ROW;
					nextIndex++;
				} while (nextFieldCols === 0 && nextIndex <= fieldsLength)

				if (isHidden) {
					mainWrapper.append(_thisM.CreateFormElement(elementItem));
				} else {
					// Create row
					if (!row) {
						columnCount = 0
						if (elementItem.cols + elementItem.offsetCols >= COLUMNS_IN_ROW) {
							row = el.formGroup(elementItem.size);
							isSingleRow = true;
						} else {
							row = el.row();
							isSingleRow = false;
						}
					}

					columnCount += elementItem.cols + elementItem.offsetCols;

					// Create Cell
					if (isSingleRow) {
						if (isLabel) {
							if (elementItem.offsetCols > 0) {
							cell = el.col(elementItem.cols).append(el.row().append(_thisM.CreateFormElement(elementItem)));
							} else {
							cell = _thisM.CreateFormElement(elementItem);
							}
						} else {
							cell = el.col(elementItem.cols).append(_thisM.CreateFormElement(elementItem));
						}

						if (settings.showBuilderTools) {
							appendBuilderTools(cell);
							appendMoveTools(cell);
						}
					} else {
						var innerCell: JQuery;
						if (isLabel) {
							innerCell = _thisM.CreateFormElement(elementItem);
						} else {
							innerCell = el.col().append(_thisM.CreateFormElement(elementItem));
						}

						if (settings.showBuilderTools) {
							appendBuilderTools(innerCell);
							appendMoveTools(innerCell);
						}

						cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(innerCell));
					}

					if (elementItem.offsetCols > 0) {
						cell.addClass('col-sm-offset-' + elementItem.offsetCols);
					}

					function appendBuilderTools(currentCell) {
						var passData = { index: fieldIndex, channel: settings.widgetChannel };
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

						currentCell.attr('data-drop', 'true')
							.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, \\'#{channel}\\')' }`, { pdi: '' + fieldIndex, channel: settings.widgetChannel }))
							.attr('data-jqyoui-options', lth.Interpolate(`{accept: '.#{channel}-channel', hoverClass: 'on-drag-hover'}`, { channel: settings.widgetChannel }));
					}

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

					if (lth[settings.fieldHelperType].successmessage && elementItem.type === lth[settings.fieldHelperType].successmessage.id) {
						var wrapElement: JQuery = isSingleRow ? row : cell;
						wrapElement.prop('id', settings.successMessageWrapperId);

						if (!settings.showBuilderTools) {
							wrapElement.css({display: 'none'});
						}
					}

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
											.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, \\'#{channel}\\', #{space}, #{isPh})' }`, { pdi: '' + fieldIndex, channel: settings.widgetChannel, space: remainingColSpace, isPh: 'true' }))
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
						mainWrapper.append(row);

						/*if (settings.showBuilderTools) {
							mainWrapper.append(
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
				// window.console && console.log('settings.formBorderType', settings.formBorderType, mainWrapper);
				if (settings.formBorderType === lth.formBorderType.well.id) {
					// window.console && console.log('in well');
					var wellMain = el.div().addClass('well lt-widget-border');

					if (settings.panelTitle) {
						wellMain.append(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
					}

					mainWrapper = wellMain.append(mainWrapper);
					// window.console && console.log('mainWrapper, well: ', mainWrapper);
				} else if (settings.formBorderType === lth.formBorderType.panel.id) {
					var panelMain, panelHeading, panelBody;
					panelMain = el.div().addClass('panel panel-default lt-widget-border');
					panelBody = el.div().addClass('panel-body').append(mainWrapper);

					if (settings.panelTitle) {
						panelHeading = el.div().addClass('panel-heading lt-widget-heading').html(settings.panelTitle);
					}

					if (panelHeading) {
						panelMain.append(panelHeading);
					}

					panelMain.append(panelBody);

					mainWrapper = panelMain;
				}

			} else if (settings.panelTitle) {
				mainWrapper.prepend(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
			}
			// Replaces placeholder text in DOM with data
			if (data) {
				mainWrapper.each(function(index, element) {
					lth.ModifyTextElementsInDOM(element, function(nodeValue: string) {
						return lth.Interpolate(nodeValue, data);
					});
				});
			}

			return mainWrapper;
		}

		CreateFormElement(elementObj: IWidgetField) {
			var _thisM = this;
			var lth = this.lth;
			var $ = lth.$;
			var el = lth.CreateElement();
			var returnElement: JQuery = null;
			switch (elementObj.element) {
				case 'title':
					elementObj.nsize = elementObj.nsize || lth.hsize.getDefault().id;
					returnElement = el.h(elementObj.nsize);
					returnElement.html(elementObj.value);
					break;
				case 'label':
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
					switch (elementObj.type) {
						case 'state':
							var usStates = lth.US_States();
							$.each(usStates.states, function (i, state) {
								returnElement.append(el.option().val(state.abbreviation).html(state.name));
							});
							break;
						case 'depositterm':
							var depositTermsList = [
								{ value: 3, name: '3-month' }
								, { value: 6, name: '6-month' }
								, { value: 12, name: '1-year' }
								, { value: 24, name: '2-year' }
							];
							$.each(depositTermsList, function (i, term) {
								returnElement.append(el.option().val(term.value).html(term.name));
							});
							break;
						case 'depositamount':
							var depositAmountList = [
								{ value: 4999, name: '&lt; 5000' }
								, { value: 9999, name: '$5,000 - $9,999' }
								, { value: 14999, name: '$10,000 - 14,999' }
								, { value: 24999, name: '$15,000 - 24,999' }
								, { value: 49999, name: '$25,000 - 49,999' }
							];
							$.each(depositAmountList, function (i, amnt) {
								returnElement.append(el.option().val(amnt.value).html(amnt.name));
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
				case 'repeat':
					// window.console && console.log('case repeat: elementObj', elementObj);
					if (elementObj.type === 'depositdatalist') {
						elementObj.fieldListOptions.fieldHelperType = 'depositResultDataFields';
					}
					returnElement = el.div();
					for (var dataIndex = 0, dataLength = elementObj.fieldData.length; dataIndex < dataLength; ++dataIndex) {
						var dataItem = elementObj.fieldData[dataIndex];
						var resultDataRow = el.div().addClass('widget-results-repeat-section');
						resultDataRow = _thisM.BuildFields(resultDataRow, elementObj.fieldListOptions, dataItem);
						returnElement.append(resultDataRow);
					}
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

				if (lth.isNumber(elementObj.borderRadius)) {
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

				if (lth.isNumber(elementObj.padding)) {
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
}
