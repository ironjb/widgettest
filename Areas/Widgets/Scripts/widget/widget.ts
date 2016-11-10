/// <reference path="../common/references.d.ts" />

declare namespace IWidget {

	interface IFunctionalityOptions {	// Matches IWidgetHelpers.IWidgetOptions, but not exactly the same
		postUrl?: string;
		externalValidatorFunction?: Function;
		userId?: number;
		clientId?: number;

		form_id?: string;
		form_submit?: string;
		form_errorAnchor?: string;
		form_errorMsgWrapper?: string;
		form_errorMsg?: string;
		uniqueQualifier?: string;
		form_email?: string;

		buildOptions?: IWidget.IFormBuildObject;
		resultDisplayOptions?: IWidgetHelpers.IResultBuildOptions;
		showBuilderTools?: boolean;
	}

	interface IDepositFunctionalityOptions extends IFunctionalityOptions {
		form_term?: string;
		form_amount?: string;
		form_noDataMessage?: string;
		AdditionalPostData?: LoanTekWidget.PostObject_Deposit;
	}

	interface IAutoQuoteFunctionalityOptions extends IFunctionalityOptions {
		form_fortype?: string;
		form_quotingchannel?: string;
		form_amount?: string;
		form_terminmonths?: string;
		form_downpayment?: string;
		form_zipcode?: string;
		form_creditscore?: string;
		form_modelyear?: string;
		form_mileage?: string;
		form_loanpurposetype?: string;
		form_sellertype?: string;
		form_neworusedtype?: string;
		form_isbusinessloan?: string;
		form_ismember?: string;
		form_hasgap?: string;

		form_noDataMessage?: string;
		AdditionalPostData?: LoanTekWidget.PostObject_Deposit;
	}

	interface IMortgageQuoteFunctionalityOptions extends IFunctionalityOptions {
		form_loanPurpose?: string;
		form_zipCode?: string;
		form_purchasePrice?: string;
		form_downPayment?: string;
		form_propertyValue?: string;
		form_balance?: string;
		form_cashOut?: string;
		form_creditScore?: string;
		form_loanProgram_30yearfixed?: string;
		form_loanProgram_25yearfixed?: string;
		form_loanProgram_20yearfixed?: string;
		form_loanProgram_15yearfixed?: string;
		form_loanProgram_10yearfixed?: string;
		form_loanProgram_10yeararm?: string;
		form_loanProgram_7yeararm?: string;
		form_loanProgram_5yeararm?: string;
		form_loanProgram_3yeararm?: string;
		form_monthlyIncome?: string;
		form_propertyType?: string;
		form_propertyUsage?: string;
		form_VAEligible?: string;
		form_vAFirstTimeUse?: string;
		form_vADisabled?: string;
		form_vAType?: string;
		form_firstTimeBuyer?: string;
		form_foreclosed?: string;
		form_bankruptcy?: string;
		form_loanOwnedBy?: string;
		form_monthlyDebt?: string;
		// AdditionalPostData?: LoanTekWidget.PostObject_MortgageQuote;
	}

	interface IMortgageRateFunctionalityOptions extends IFunctionalityOptions {
		form_loanType?: string;
		form_rateTable?: string;
		form_rateDataDisplay?: string;
		form_desiredLoanProgram?: string;
		form_desiredInterestRate?: string;

		form_creditScore?: string;
		form_loanAmount?: string;
		form_loanPurpose?: string;
		form_loanToValue?: string;
		form_propertyType?: string;
		form_propertyUsage?: string;
		form_quotingChannel?: string;
		form_vaType?: string;
		form_zipCode?: string;
	}

	interface IFormBuildObject extends IWidgetHelpers.IBuildOptions {
		wrapperId?: string;
		formId?: string;
		errorAnchor?: string;
		errorMessageWrapperId?: string;
		errrorMessageId?: string;
		postDOMCallback?: any;
	}

	interface IContactFunctionalityOptions extends IWidget.IFunctionalityOptions {
		redirectUrl?: string;
		successMessage?: string;
		AdditionalPostData?: LoanTekWidget.PostObject_Contact;

		form_firstName?: string;
		form_lastName?: string;
		form_phone?: string;
		form_company?: string;
		form_state?: string;
		form_comments?: string;
		form_successMessageWrapper?: string;

		form_sourceId?: string;
		form_sourceName?: string;
		form_notifyUserOfNewLead?: string;
		form_sendNewLeadInitialWelcomeMessage?: string;
	}
}

namespace LoanTekWidget {
	export class FormBuild {
		private _lth: LoanTekWidget.helpers;
		private _$: JQueryStatic;
		constructor($: JQueryStatic, lth: LoanTekWidget.helpers, options: IWidget.IFormBuildObject, readyOptions?: IWidget.IFunctionalityOptions) {
			var _thisC = this;
			_thisC._lth = lth;
			_thisC._$ = $;
			var settings: IWidget.IFormBuildObject = {
				wrapperId:						'ltWidgetWrapper'
				, formId:						'ltWidgetForm'
				, widgetType:					lth.widgetType.contact.id
				, successMessageWrapperId:		'ltwSuccessMessageWrapper'
				, errorAnchor:					'ltwErrorAnchor'
				, errorMessageWrapperId:		'ltwErrorMessageWrapper'
				, errrorMessageId:				'ltwErrorMessage'
				, fieldSize:					null
				, formBorderType:				null
				, panelTitle:					null
				, showBuilderTools:				false
				, fields:						null
				, uniqueQualifier:				''
			};
			$.extend(settings, options);

			// Adds qualifier to IDs
			if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
				settings.wrapperId +=					'_' + settings.uniqueQualifier;
				settings.formId +=						'_' + settings.uniqueQualifier;
				settings.successMessageWrapperId +=		'_' + settings.uniqueQualifier;
				settings.errorAnchor +=					'_' + settings.uniqueQualifier;
				settings.errorMessageWrapperId +=		'_' + settings.uniqueQualifier;
				settings.errrorMessageId +=				'_' + settings.uniqueQualifier;
			}

			$(document).click(function () {
				// Loops through each dropdown
				$('.lt-dd-toggle').each(function() {
					// Checks if the parent has class of 'open'
					var hasOpen = $(this).parent().hasClass('open');
					// If dropdown is 'open', then it is closed.
					if (hasOpen) {
						$(this).trigger('click.bs.dropdown');
					}
				});
			});


			var fieldHelperType: string;

			var el = lth.CreateElement();
			var buildTools = new BuildTools(lth);

			var errorRow = el.row('row').prop('id', settings.errorMessageWrapperId);
			var errorMsg = el.p().prop('id', settings.errrorMessageId);

			if (settings.widgetType === lth.widgetType.mortgagequote.id) {
				fieldHelperType = 'mortgageQuoteFields';
			} else if (settings.widgetType === lth.widgetType.mortgagerate.id) {
				fieldHelperType = 'mortgageRateFields';
			} else if (settings.widgetType === lth.widgetType.deposit.id) {
				fieldHelperType = 'depositFields';
			} else if (settings.widgetType === lth.widgetType.autoquote.id) {
				fieldHelperType = 'autoQuoteFields';
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

			var returnForm2 = buildTools.BuildFields(returnForm, settings);
			var returnFormStyles: string = new LoanTekWidget.ApplyFormStyles(lth, settings, false, '.' + lth.defaultFormSpecifierClass + '_' + settings.uniqueQualifier).getStyles();
			if (returnFormStyles) {
				returnForm2.prepend(el.style().html(returnFormStyles));
			}

			var widgetWrapper = $('#' + settings.wrapperId).addClass('ltw ' + lth.defaultFormSpecifierClass + '_' + settings.uniqueQualifier).empty().append(returnForm2);
			if (settings.showBuilderTools) {
				widgetWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'editFormInfo'));
			}

			// Javascript calls after building form
			$('.lt-dd-toggle').dropdown();
			if (typeof settings.postDOMCallback === 'function') {
				settings.postDOMCallback();
			}

			readyOptions.buildOptions = settings;

			// call function to set up stuff after DOM created
			var widgetFunctionality: any;
			if (settings.widgetType === lth.widgetType.mortgagequote.id) {
				widgetFunctionality = new MortgageQuoteFunctionality(lth, readyOptions);
			} else if (settings.widgetType === lth.widgetType.mortgagerate.id) {
				widgetFunctionality = new MortgageRateFunctionality(lth, readyOptions);
			} else if (settings.widgetType === lth.widgetType.deposit.id) {
				widgetFunctionality = new DepositFunctionality(lth, readyOptions)
			} else if (settings.widgetType === lth.widgetType.autoquote.id) {
				widgetFunctionality = new AutoQuoteFunctionality(lth, readyOptions)
			} else {
				widgetFunctionality = new ContactFunctionality($, lth, readyOptions);
			}
		}
	}

	export class ContactFunctionality {

		constructor($: JQueryStatic, lth: LoanTekWidget.helpers, options?: IWidget.IContactFunctionalityOptions) {
			var formEl = lth.contactFields;
			var settings: IWidget.IContactFunctionalityOptions = {
				redirectUrl: null
				, postUrl: null
				, successMessage: 'Thank you. You will be contacted shortly.'
				, externalValidatorFunction: null
				, userId: null
				, clientId: null
				, uniqueQualifier: ''

				// Default form element IDs
				, form_id: '#ltWidgetForm'
				, form_submit: '#ltwSubmit'
				, form_errorAnchor: 'ltwErrorAnchor'
				, form_errorMsgWrapper: '#ltwErrorMessageWrapper'
				, form_errorMsg: '#ltwErrorMessage'

				// Contact fields
				, AdditionalPostData: null
				, form_firstName:	'#' + formEl.firstname.fieldTemplate.id
				, form_lastName:	'#' + formEl.lastname.fieldTemplate.id
				, form_email:		'#' + formEl.email.fieldTemplate.id
				, form_phone:		'#' + formEl.phone.fieldTemplate.id
				, form_company:		'#' + formEl.company.fieldTemplate.id
				, form_state:		'#' + formEl.state.fieldTemplate.id
				, form_comments:	'#' + formEl.comments.fieldTemplate.id
				, form_successMessageWrapper: '#ltwSuccessMessageWrapper'

				, form_sourceId:							'#' + formEl.source_d_idhidden.fieldTemplate.id
				, form_sourceName:							'#' + formEl.source_d_namehidden.fieldTemplate.id
				, form_notifyUserOfNewLead:					'#' + formEl.notifyuserofnewleadhidden.fieldTemplate.id
				, form_sendNewLeadInitialWelcomeMessage:	'#' + formEl.sendnewleadinitialwelcomemessagehidden.fieldTemplate.id
			};
			$.extend(settings, options);
			var customInputClass = '.lt-custom-input';

			if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
				for (var paramName in settings) {
					if (paramName.indexOf('form_') !== -1) {
						settings[paramName] += '_' + settings.uniqueQualifier;
					}
				}
				customInputClass += '_' + settings.uniqueQualifier;
			}

			$('input, textarea').placeholder({ customClass: 'placeholder-text' });

			$(function () {
				var contactPostData = lth.postObjects.contact();

				$(settings.form_submit).prop('disabled', false);

				$(settings.form_id).submit((event) => {
					event.preventDefault();
					$(settings.form_errorMsgWrapper).hide(100);

					if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
						$(settings.form_submit).prop('disabled', false);
						return false;
					}

					if (settings.AdditionalPostData) {
						$.extend(true, contactPostData, settings.AdditionalPostData);
					}

					contactPostData.Persons[0].FirstName = $(settings.form_firstName).val();
					contactPostData.Persons[0].LastName = $(settings.form_lastName).val();
					contactPostData.Persons[0].ContactMethods[0].Address = $(settings.form_email).val();
					contactPostData.Persons[0].ContactMethods[1].Number = $(settings.form_phone).val();
					contactPostData.Persons[0].Assets[0].CompanyName = $(settings.form_company).val();
					contactPostData.Persons[0].Addresses[0].State = $(settings.form_state + ' option:selected').val();
					contactPostData.ClientDefinedIdentifier = 'LTWS' + lth.getRandomString();
					contactPostData.ClientId = settings.clientId;
					contactPostData.UserId = settings.userId;
					contactPostData.Reason = $(settings.form_comments).val();

					contactPostData.Source.Id = $(settings.form_sourceId).val();
					contactPostData.Source.Name = $(settings.form_sourceName).val();
					contactPostData.NotifyUserOfNewLead = $(settings.form_notifyUserOfNewLead).val();
					contactPostData.SendNewLeadInitialWelcomeMessage = $(settings.form_sendNewLeadInitialWelcomeMessage).val();
					contactPostData.MiscData[0].Value = '';

					$(customInputClass).each(function (customIndex: number, elem: Element) {
						var keyName: string = $(this).attr('data-lt-additional-info-key');
						var customDataCurrentIndex = lth.GetIndexOfFirstObjectInArray(contactPostData.MiscData, 'Name', keyName);
						if (customDataCurrentIndex !== -1) {
							contactPostData.MiscData.splice(customDataCurrentIndex,1);
						}
						contactPostData.MiscData.push({ Name: keyName, Value: $(this).val() });
					});

					var request = $.ajax({
						// url: 'http://node-cors-server.herokuapp.com/no-cors'
						// url: 'http://node-cors-server.herokuapp.com/simple-cors'
						url: settings.postUrl
						, method: 'POST'
						, contentType: 'application/json'
						, dataType: 'json'
						, data: JSON.stringify({ LeadFile: contactPostData })
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

		constructor(lth: LoanTekWidget.helpers, options?: IWidget.IDepositFunctionalityOptions) {
			var $ = lth.$;
			var settings: IWidget.IDepositFunctionalityOptions = {
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
				, AdditionalPostData: null
				, form_term: '#ltwDepositTerm'
				, form_amount: '#ltwDepositAmount'
				, form_noDataMessage: '#ltwNoDataMessage'
				, resultDisplayOptions: {
					fieldHelperType: 'depositResultFields'
				}
			};
			$.extend(true, settings, options);
			var customInputClass = '.lt-custom-input';

			if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
				for (var paramName in settings) {
					if (paramName.indexOf('form_') !== -1) {
						settings[paramName] += '_' + settings.uniqueQualifier;
					}
				}
				customInputClass += '_' + settings.uniqueQualifier;
			}

			$('input, textarea').placeholder({ customClass: 'placeholder-text' });

			$(function () {
				var depositPostData: LoanTekWidget.PostObject_Deposit = lth.postObjects.deposit();

				$(settings.form_submit).prop('disabled', false);

				// Show on Create Widget page
				if (settings.resultDisplayOptions.showBuilderTools) {
					var fakeData = [lth.FakeData().deposit];
					lth.AppendDataToDataList(settings.resultDisplayOptions.fields, fakeData, 'depositdatalist');

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

					if (settings.AdditionalPostData) {
						$.extend(true, depositPostData, settings.AdditionalPostData);
					}

					depositPostData.UserId = settings.userId;
					depositPostData.ClientDefinedIdentifier = 'LTWS' + lth.getRandomString();
					// depositPostData.DepositRequest.Form.ForType = 130;
					depositPostData.DepositRequest.Form.TermInMonths = $(settings.form_term).val()*1;
					depositPostData.DepositRequest.Form.Amount = $(settings.form_amount).val()*1;
					if ($(customInputClass).length > 0) {
						depositPostData.DepositRequest.Form.CustomData = [];
					}

					$(customInputClass).each(function (customIndex: number, elem: Element) {
						depositPostData.DepositRequest.Form.CustomData.push({ Name: $(this).attr('data-lt-additional-info-key'), Value: $(this).val() });
					});

					var request = $.ajax({
						// url: 'http://node-cors-server.herokuapp.com/no-cors'
						// url: 'http://node-cors-server.herokuapp.com/simple-cors'
						url: settings.postUrl
						, method: 'POST'
						, contentType: 'application/json'
						, dataType: 'json'
						, data: JSON.stringify(depositPostData)
					});

					request.done((result) => {
						$(settings.form_submit).prop('disabled', false);

						// If multiple 'Sumbissions' or multiple 'Quotes', concats them into resultData[] and does some formatting on data.
						var resultsData = [];
						if (result.Submissions && result.Submissions.length > 0) {
							for (var iSubmission = 0, subLen = result.Submissions.length; iSubmission < subLen; iSubmission++) {
								var submission = result.Submissions[iSubmission];
								if (submission.Quotes && submission.Quotes.length > 0) {
									for (var iQuote = 0, qLen = submission.Quotes.length; iQuote < qLen; iQuote++) {
										var quote = submission.Quotes[iQuote];
										quote.TotalInterestEarned = lth.FormatNumber(quote.TotalInterestEarned, 2);
										quote.AmountPlusInterest = lth.FormatNumber(quote.AmountPlusInterest, 2);
										resultsData.push(quote);
									}
								}
							}
						}

						// If resultData[] is empty, shows 'no data' message
						if (resultsData.length) {
							settings.resultDisplayOptions.showNoDataMessage = false;
						} else {
							settings.resultDisplayOptions.showNoDataMessage = true;
						}

						lth.AppendDataToDataList(settings.resultDisplayOptions.fields, resultsData, 'depositdatalist');

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

	export class AutoQuoteFunctionality {

		constructor(lth: LoanTekWidget.helpers, options?: IWidget.IAutoQuoteFunctionalityOptions) {
			var $ = lth.$;
			var formEl = lth.autoQuoteFields;
			var resultEl = lth.autoQuoteResultFields;
			var settings: IWidget.IAutoQuoteFunctionalityOptions = {
				// IFunctionalityOptions options
				postUrl: null
				, externalValidatorFunction: null
				, userId: null
				, clientId: null
				, form_id: '#ltWidgetForm'
				, form_errorAnchor: 'ltwErrorAnchor'
				, form_errorMsgWrapper: '#ltwErrorMessageWrapper'
				, form_errorMsg: '#ltwErrorMessage'

				// IAutoQuoteFunctionalityOptions options
				, AdditionalPostData: null
				, form_submit: '#' + formEl.submit.fieldTemplate.id
				, form_fortype: '#' + formEl.fortype.fieldTemplate.id
				, form_quotingchannel: '#' + formEl.quotingchannel.fieldTemplate.id
				, form_amount: '#' + formEl.amount.fieldTemplate.id
				, form_terminmonths: '#' + formEl.terminmonths.fieldTemplate.id
				, form_downpayment: '#' + formEl.downpayment.fieldTemplate.id
				, form_zipcode: '#' + formEl.zipcode.fieldTemplate.id
				, form_creditscore: '#' + formEl.creditscore.fieldTemplate.id
				, form_modelyear: '#' + formEl.modelyear.fieldTemplate.id
				, form_mileage: '#' + formEl.mileage.fieldTemplate.id
				, form_loanpurposetype: '#' + formEl.loanpurposetype.fieldTemplate.id
				, form_sellertype: '#' + formEl.sellertype.fieldTemplate.id
				, form_neworusedtype: '#' + formEl.neworusedtype.fieldTemplate.id
				, form_isbusinessloan: '#' + formEl.isbusinessloan.fieldTemplate.id
				, form_ismember: '#' + formEl.ismember.fieldTemplate.id
				, form_hasgap: '#' + formEl.hasgapinsurance.fieldTemplate.id
				, form_noDataMessage: '#' + resultEl.nodatamessage.fieldTemplate.id
				, resultDisplayOptions: {
					fieldHelperType: 'autoQuoteResultFields'
				}
			};
			$.extend(true, settings, options);
			var customInputClass = '.lt-custom-input';

			if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
				for (var paramName in settings) {
					if (paramName.indexOf('form_') !== -1) {
						settings[paramName] += '_' + settings.uniqueQualifier;
					}
				}
				customInputClass += '_' + settings.uniqueQualifier;
			}

			$('input, textarea').placeholder({ customClass: 'placeholder-text' });

			$(function () {
				var autoQuotePostData: LoanTekWidget.PostObject_AutoQuote = lth.postObjects.autoquote();

				$(settings.form_submit).prop('disabled', false);

				// Show in Builder
				if (settings.resultDisplayOptions.showBuilderTools) {
					var fakeData = lth.FakeData().autoquote;
					lth.AppendDataToDataList(settings.resultDisplayOptions.fields, fakeData, 'autoquotedatalist');

					var showAutoQuoteResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
					showAutoQuoteResultBuild.build();
				}

				// Submit form
				$(settings.form_id).submit(function (event) {
					event.preventDefault();
					$(settings.form_errorMsgWrapper).hide(100);
					$(settings.form_submit).prop('disabled', true);

					if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
						$(settings.form_submit).prop('disabled', false);
						return false;
					}

					if (settings.AdditionalPostData) {
						$.extend(true, autoQuotePostData, settings.AdditionalPostData);
					}

					autoQuotePostData.LoanRequest.Form.CustomData = autoQuotePostData.LoanRequest.Form.CustomData || [];

					// Remove GAP if added before
					var gapIndex = lth.GetIndexOfFirstObjectInArray(autoQuotePostData.LoanRequest.Form.CustomData, 'Name', 'GAP');
					if (gapIndex !== -1) {
						autoQuotePostData.LoanRequest.Form.CustomData.splice(gapIndex, 1);
					}

					autoQuotePostData.UserId = settings.userId;
					autoQuotePostData.ClientDefinedIdentifier = 'LTWS' + lth.getRandomString();
					autoQuotePostData.LoanRequest.Form.ForType = $(settings.form_fortype).val();
					autoQuotePostData.LoanRequest.Form.QuotingChannel = $(settings.form_quotingchannel).val();
					autoQuotePostData.LoanRequest.Form.Amount = +$(settings.form_amount).val();
					autoQuotePostData.LoanRequest.Form.TermInMonths = +$(settings.form_terminmonths).val();
					autoQuotePostData.LoanRequest.Form.LoanToValue = ($(settings.form_amount).val() - $(settings.form_downpayment).val()) / $(settings.form_amount).val() * 100;
					autoQuotePostData.LoanRequest.Form.ZipCode = $(settings.form_zipcode).val();
					autoQuotePostData.LoanRequest.Form.CreditScore = +$(settings.form_creditscore).val();
					autoQuotePostData.LoanRequest.Form.ModelYear = +$(settings.form_modelyear).val();
					autoQuotePostData.LoanRequest.Form.Mileage = +$(settings.form_mileage).val();
					autoQuotePostData.LoanRequest.Form.LoanPurposeType = $(settings.form_loanpurposetype).val();
					autoQuotePostData.LoanRequest.Form.SellerType = $(settings.form_sellertype).val();
					autoQuotePostData.LoanRequest.Form.NewOrUsedType = $(settings.form_neworusedtype).val();
					autoQuotePostData.LoanRequest.Form.IsBusinessLoan = $(settings.form_isbusinessloan).val();
					autoQuotePostData.LoanRequest.Form.IsMember = $(settings.form_ismember).val();
					autoQuotePostData.LoanRequest.Form.CustomData.push({ Name: 'GAP', Value: $(settings.form_hasgap).prop('checked') });

					var request = $.ajax({
						url: settings.postUrl
						, method: 'POST'
						, contentType: 'application/json'
						, dataType: 'json'
						, data: JSON.stringify(autoQuotePostData)
					});

					request.then(function (result) {
						$(settings.form_submit).prop('disabled', false);

						var resultsData = [];
						if (result.Submissions && result.Submissions.length > 0) {
							for (var iSubmission = 0, subLen = result.Submissions.length; iSubmission < subLen; iSubmission++) {
								var submission = result.Submissions[iSubmission];
								if (submission.Quotes && submission.Quotes.length > 0) {
									for (var iQuote = 0, qLen = submission.Quotes.length; iQuote < qLen; iQuote++) {
										var quote = submission.Quotes[iQuote];
										quote.APR = lth.FormatNumber(quote.APR, 3);
										quote.FinalRate = lth.FormatNumber(quote.FinalRate, 3);
										quote.FinalFee = lth.FormatNumber(quote.FinalFee, 2);
										quote.MonthlyPayment = lth.FormatNumber(quote.MonthlyPayment, 2);
										resultsData.push(quote);
									}
								}
							}
						}

						if (resultsData.length) {
							settings.resultDisplayOptions.showNoDataMessage = false;
						} else {
							settings.resultDisplayOptions.showNoDataMessage = true;
						}

						lth.AppendDataToDataList(settings.resultDisplayOptions.fields, resultsData, 'autoquotedatalist');

						var autoQuoteResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
						autoQuoteResultBuild.build();
					}, function (error) {
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

	export class MortgageQuoteFunctionality {

		constructor(lth: LoanTekWidget.helpers, options?: IWidget.IMortgageQuoteFunctionalityOptions) {
			var $ = lth.$;
			var settings: IWidget.IMortgageQuoteFunctionalityOptions = {
				// IFunctionalityOptions
				postUrl: null
				, externalValidatorFunction: null
				, userId: null
				, clientId: null
				, form_id: '#ltWidgetForm'
				, form_submit: '#ltwSubmit'
				, form_errorAnchor: 'ltwErrorAnchor'
				, form_errorMsgWrapper: '#ltwErrorMessageWrapper'
				, form_errorMsg: '#ltwErrorMessage'

				// IMortgageQuoteFunctionalityOptions
				, form_loanPurpose: '#ltwMQ_LoanPurpose'
				, form_zipCode: '#ltwMQ_ZipCode'
				, form_purchasePrice: '#ltwMQ_PurchasePrice'
				, form_downPayment: '#ltwMQ_DownPayment'
				, form_propertyValue: '#ltwMQ_PropertyValue'
				, form_balance: '#ltwMQ_Balance'
				, form_cashOut: '#ltwMQ_CashOut'
				, form_creditScore: '#ltwMQ_CreditScore'
				, form_loanProgram_30yearfixed: '#ltwMQ_LoanProgram_30yearfixed'
				, form_loanProgram_25yearfixed: '#ltwMQ_LoanProgram_25yearfixed'
				, form_loanProgram_20yearfixed: '#ltwMQ_LoanProgram_20yearfixed'
				, form_loanProgram_15yearfixed: '#ltwMQ_LoanProgram_15yearfixed'
				, form_loanProgram_10yearfixed: '#ltwMQ_LoanProgram_10yearfixed'
				, form_loanProgram_10yeararm: '#ltwMQ_LoanProgram_10yeararm'
				, form_loanProgram_7yeararm: '#ltwMQ_LoanProgram_7yeararm'
				, form_loanProgram_5yeararm: '#ltwMQ_LoanProgram_5yeararm'
				, form_loanProgram_3yeararm: '#ltwMQ_LoanProgram_3yeararm'
				, form_monthlyIncome: '#ltwMQ_MonthlyIncome'
				, form_propertyType: '#ltwMQ_PropertyType'
				, form_propertyUsage: '#ltwMQ_PropertyUsage'
				, form_VAEligible: '#ltwMQ_VAEligible'
				, form_vAFirstTimeUse: '#ltwMQ_VAFirstTimeUse'
				, form_vADisabled: '#ltwMQ_VADisabled'
				, form_vAType: '#ltwMQ_VAType'
				, form_firstTimeBuyer: '#ltwMQ_FirstTimeBuyer'
				, form_foreclosed: '#ltwMQ_Foreclosed'
				, form_bankruptcy: '#ltwMQ_Bankruptcy'
				, form_loanOwnedBy: '#ltwMQ_LoanOwnedBy'
				, form_monthlyDebt: '#ltwMQ_MonthlyDebt'
			};
			$.extend(true, settings, options);
			$('input, textarea').placeholder({ customClass: 'placeholder-text' });
			var customInputClass = '.lt-custom-input';

			if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
				for (var paramName in settings) {
					if (paramName.indexOf('form_') !== -1) {
						settings[paramName] += '_' + settings.uniqueQualifier;
					}
				}
				customInputClass += '_' + settings.uniqueQualifier;
			}
		}
	}

	export class MortgageRateFunctionality {

		constructor(lth: LoanTekWidget.helpers, options?: IWidget.IMortgageRateFunctionalityOptions) {
			var $ = lth.$;
			var el = lth.CreateElement();
			var formEl = lth.mortgageRateFields;
			var settings: IWidget.IMortgageRateFunctionalityOptions = {
				// IFunctionalityOptions
				postUrl: null
				, externalValidatorFunction: null
				, userId: null
				, clientId: null
				, form_id: '#ltWidgetForm'
				, form_submit: '#ltwSubmit'
				, form_errorAnchor: 'ltwErrorAnchor'
				, form_errorMsgWrapper: '#ltwErrorMessageWrapper'
				, form_errorMsg: '#ltwErrorMessage'
				, form_email: '#ltwEmail'

				// IMortgageRateFunctionalityOptions
				, form_loanType: '#'+formEl.loantype.fieldTemplate.id
				, form_rateTable: '#'+formEl.ratetable.fieldTemplate.id
				, form_rateDataDisplay: '#'+formEl.mortgagerateresult.fieldTemplate.id
				, form_desiredLoanProgram: '#ltwDesiredLoanProgram'
				, form_desiredInterestRate: '#ltwDesiredInterestRate'

				, form_creditScore: '#'+formEl.creditscore.fieldTemplate.id
				, form_loanAmount: '#'+formEl.loanamount.fieldTemplate.id
				, form_loanPurpose: '#'+formEl.loanpurpose.fieldTemplate.id
				, form_loanToValue: '#'+formEl.loantovalue.fieldTemplate.id
				, form_propertyType: '#'+formEl.propertytype.fieldTemplate.id
				, form_propertyUsage: '#'+formEl.propertyusage.fieldTemplate.id
				, form_quotingChannel: '#'+formEl.quotingchannel.fieldTemplate.id
				, form_vaType: '#'+formEl.vatype.fieldTemplate.id
				, form_zipCode: '#'+formEl.zipcode.fieldTemplate.id
			};
			$.extend(true, settings, options);
			$('input, textarea').placeholder({ customClass: 'placeholder-text' });
			var customInputClass = '.lt-custom-input';
			var rateTableIndex: number = lth.GetIndexOfFirstObjectInArray(settings.buildOptions.fields, 'field', 'ratetable');
			var hasRateTable: boolean = rateTableIndex !== -1;

			// Add qualifier to form field ids
			if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
				for (var paramName in settings) {
					if (paramName.indexOf('form_') !== -1) {
						settings[paramName] += '_' + settings.uniqueQualifier;
					}
				}

				customInputClass += '_' + settings.uniqueQualifier;
			}

			$(function () {
				var mortgageRatePostData: LoanTekWidget.PostObject_MortgageRate = lth.postObjects.mortgagerate();

				// Update post data from hidden fields
				mortgageRatePostData.LoanRequest.CreditScore = $(settings.form_creditScore).val()*1; // 750;
				mortgageRatePostData.LoanRequest.LoanAmount = $(settings.form_loanAmount).val()*1; // 300000;
				mortgageRatePostData.LoanRequest.LoanPurpose = $(settings.form_loanPurpose).val(); // 1;
				mortgageRatePostData.LoanRequest.LoanToValue = $(settings.form_loanToValue).val()*1; // 80;
				mortgageRatePostData.LoanRequest.PropertyType = $(settings.form_propertyType).val(); // 1;
				mortgageRatePostData.LoanRequest.PropertyUsage = $(settings.form_propertyUsage).val(); // 1;
				mortgageRatePostData.LoanRequest.QuotingChannel = $(settings.form_quotingChannel).val(); // 3;
				// mortgageRatePostData.LoanRequest.VAType = !!($(settings.form_vaType).val());
				mortgageRatePostData.LoanRequest.ZipCode = $(settings.form_zipCode).val(); // "90808";
				mortgageRatePostData.ClientDefinedIdentifier = 'LTWS' + lth.getRandomString();
				mortgageRatePostData.UserId = settings.userId;
				if ($(settings.form_vaType).val()) {
					mortgageRatePostData.LoanRequest.VAType = $(settings.form_vaType).val();
				}

				// Populate Dropdown & Rate Table
				var populateRateTable = function (rateList: IWidgetHelpers.IRateTable.IMortgageLoanQuote[]) {
					var loanTypes = lth.getUniqueValuesFromArray(rateList, 'ProductTermType');
					var sortColumn = 'InterestRate';
					var sortReverse = true;

					// Sets dropdown for Loan Type
					$(settings.form_loanType).html('');

					for (var iLt = 0, pttl = lth.ProductTermType.asArray().length; iLt < pttl; iLt++) {
						var ptt = lth.ProductTermType.asArray()[iLt];
						if (loanTypes.indexOf(ptt.name) !== -1) {
							$(settings.form_loanType).append(el.option().val(ptt.name).html(ptt.description));
						}
					}

					// Filters the data based on the 'LoanType' value.
					var getFilteredRateTableData = function (): IWidgetHelpers.IRateTable.IMortgageLoanQuote[] {
						var loanTypeValue = $(settings.form_loanType).val();
						var returnFilteredRates: IWidgetHelpers.IRateTable.IMortgageLoanQuote[] = lth.getFilteredArray(rateList, loanTypeValue, false, 'ProductTermType');
						return returnFilteredRates;
					};

					var sortAndFormatRateTableData = function() {
						// Make copy so sorting will not be affected by formatting
						var returnData: IWidgetHelpers.IRateTable.IMortgageLoanQuote[] = $.merge([], getFilteredRateTableData());
						returnData.sort(lth.SortObjectArray(sortColumn, sortReverse));

						// Format
						for (var i = returnData.length - 1; i >= 0; i--) {
							var dataItem = returnData[i];
							dataItem.InterestRate = typeof dataItem.InterestRate === 'number' ? lth.FormatNumber(<number>dataItem.InterestRate,3) : dataItem.InterestRate;
							dataItem.APR = typeof dataItem.APR === 'number' ? lth.FormatNumber(<number>dataItem.APR,3) : dataItem.APR;
							dataItem.FinalFees = typeof dataItem.FinalFees === 'number' ? lth.FormatNumber(<number>dataItem.FinalFees,2,true) : dataItem.FinalFees;
							dataItem.PIP = typeof dataItem.PIP === 'number' ? lth.FormatNumber(<number>dataItem.PIP,2,true) : dataItem.PIP;
							dataItem.CalcPrice = typeof dataItem.CalcPrice === 'number' ? lth.FormatNumber(<number>dataItem.CalcPrice,3,true) : dataItem.CalcPrice;
						}

						return returnData;
					};

					var rateResultDisplay: IWidgetHelpers.IField = null;
					var redrawRateDisplay = function() {
						lth.AppendDataToDataList(rateResultDisplay.fieldListOptions.fields, sortAndFormatRateTableData(), 'mortgageratedatalist');
						var mortgageRateResultBuild = new ResultsBuilder(lth, rateResultDisplay.fieldListOptions);
						mortgageRateResultBuild.build();
						buildSortDropDowns();
					};

					var buildSortDropDowns = function() {
						var mortgageRateDataTableArray: IWidgetHelpers.IDataTable.IColumnInfo[] = lth.mortgageRateDataTable.asArray();
						var sortUl = $('.mortgageratedatasortul');
						for (var iSortInfo = 0; iSortInfo < mortgageRateDataTableArray.length; iSortInfo++) {
							var sortInfo = mortgageRateDataTableArray[iSortInfo];
							var sortInfoClass = 'mortgageratesort_' + sortInfo.column.data;
							var sortLink = el.a().attr({href: '#'}).addClass(sortInfoClass).text(sortInfo.column.title);
							if (sortColumn === sortInfo.column.data) {
								if (sortReverse) {
									sortLink.prepend(el.span().addClass('pull-right fa fa-sort-asc'));
								} else {
									sortLink.prepend(el.span().addClass('pull-right fa fa-sort-desc'));
								}
							} else {
								sortLink.prepend(el.span().addClass('pull-right fa fa-sort'));
							}
							sortLink.data('mortgageratesortcolumn',sortInfo.column.data);
							sortUl.append(el.li().append(sortLink));
							$('.' + sortInfoClass).click(function(event) {
								var sortCol: string = $(this).data()['mortgageratesortcolumn'];
								event.preventDefault();
								if (sortColumn === sortCol) {
									sortReverse = !sortReverse;
								} else {
									sortColumn = sortCol;
									sortReverse = true;
								}
								redrawRateDisplay();
							});
						}
					};

					var rateTableOptions: IWidgetHelpers.IDataTable.IOptions;
					var rateTableInfo: DataTables.Settings;
					var rateTable: DataTables.DataTable;
					if (hasRateTable) {
						// Rate table options
						rateTableOptions = settings.buildOptions.fields[rateTableIndex].dataTableOptions;
						rateTableOptions.exclude = rateTableOptions.exclude || [];

						// Variable for initializing the DataTable
						rateTableInfo = {
							data: getFilteredRateTableData()
							, stripeClasses: ['ratetable-strip1', 'ratetable-strip2']
							, paging: false
							, info: false
							, searching: false
							, columns: []
						};

						// Adds the columns to the DataTable
						for (var colName in lth.mortgageRateDataTable) {
							var col: IWidgetHelpers.IDataTable.IColumnInfo = lth.mortgageRateDataTable[colName];
							if (col.column && rateTableOptions.exclude.indexOf(<string>col.column.data) === -1) {
								rateTableInfo.columns.push(col.column);
							}
						}

						// Initializes DataTable
						rateTable = $(settings.form_rateTable + ' > table').DataTable(rateTableInfo);
						rateTable.order([0, 'asc']).draw();
					}

					// Rate Data Display (alternate to DataTable)
					if (settings.buildOptions && settings.buildOptions.fields) {
						var rateResultDisplayIndex = lth.GetIndexOfFirstObjectInArray(settings.buildOptions.fields,'field', 'mortgagerateresult')
						if (rateResultDisplayIndex !== -1) {
							rateResultDisplay = settings.buildOptions.fields[rateResultDisplayIndex];
							rateResultDisplay.fieldListOptions.widgetType = lth.widgetType.mortgagerate.id;
							rateResultDisplay.fieldListOptions.resultWrapperId = lth.mortgageRateFields.mortgagerateresult.fieldTemplate.id + '_' + settings.uniqueQualifier;
							rateResultDisplay.fieldListOptions.uniqueQualifier = lth.getUniqueQualifier();

							redrawRateDisplay();
						}
					}

					// Updates rate table/list on change of LoanType
					$(settings.form_loanType).change(function() {
						if (rateTable) {
							rateTable.clear().rows.add(getFilteredRateTableData()).draw();
						}

						if (rateResultDisplay) {
							redrawRateDisplay();
						}
					});
				};

				// Get Rate Table Data
				if (settings.showBuilderTools) {
					// Use fake data
					var fakeData = lth.FakeData().mortgagerate;
					populateRateTable(fakeData);
				} else {
					var rateRequest = $.ajax({
						method: 'POST'
						, url: settings.postUrl
						, dataType: 'json'
						, contentType: 'application/json'
						, data: JSON.stringify(mortgageRatePostData)
					}).then(function (result) {
						var rateList: IWidgetHelpers.IRateTable.IMortgageLoanQuote[];
						try {
							rateList = result.Submissions[0].Quotes;
						} catch (er) {
							rateList = [];
						}

						populateRateTable(rateList);
					}, function (error) {
						try {
							window.console && console.error('Error: ', error.responseJSON.Message);
						} catch(er) {
							window.console && console.error('Error getting rates', error);
						}
					});
				}
			});
		}
	}

	export class ResultsBuilder {
		private settings: IWidgetHelpers.IResultBuildOptions;
		private lth: LoanTekWidget.helpers;
		constructor(lth: LoanTekWidget.helpers, options: IWidgetHelpers.IResultBuildOptions) {
			var isUpdatedResultWrapperId = !!(options.resultWrapperId);
			var _settings: IWidgetHelpers.IResultBuildOptions = {
				resultWrapperId: 'ltWidgetResultWrapper'
				, noDataMessageWrapperId: 'ltwNoDataMessageWrapper'
				, widgetChannel: 'result'
				, uniqueQualifier: ''
			};

			lth.$.extend(_settings, options)

			if (_settings.uniqueQualifier && _settings.uniqueQualifier.length > 0) {
				_settings.noDataMessageWrapperId += '_' + _settings.uniqueQualifier;
				if (!isUpdatedResultWrapperId) {
					_settings.resultWrapperId += '_' + _settings.uniqueQualifier;
				}
			}

			this.settings = _settings;
			this.lth = lth;
		}

		build(startIndex?: number, showCount?: number) {
			var _thisM = this;
			var settings = this.settings;
			var lth = this.lth;
			var $ = lth.$;
			var el = lth.CreateElement();
			var resultHelperType: string;
			var buildTools = new BuildTools(lth);

			if (settings.widgetType === _thisM.lth.widgetType.mortgagequote.id) {
				resultHelperType = 'mortgageQuoteResultFields';
			} else if (settings.widgetType === lth.widgetType.mortgagerate.id) {
				resultHelperType = 'mortgageRateResultFields';
			} else if (settings.widgetType === lth.widgetType.deposit.id) {
				resultHelperType = 'depositResultFields';
			} else if (settings.widgetType === lth.widgetType.autoquote.id) {
				resultHelperType = 'autoQuoteResultFields';
			} else {
				resultHelperType = 'contactResultFields';
			}

			settings.fieldHelperType = resultHelperType;

			var resultsForm = el.form();
			var resultsForm2 = buildTools.BuildFields(resultsForm, settings);
			var resultsFormStyles: string = new LoanTekWidget.ApplyFormStyles(lth, settings, true, '.' + lth.defaultResultSpecifierClass + '_' + settings.uniqueQualifier).getStyles();
			if (resultsFormStyles) {
				resultsForm2.prepend(el.style().html(resultsFormStyles));
			}

			var widgetResultWrapper = $('#' + _thisM.settings.resultWrapperId).addClass('ltw ' + _thisM.lth.defaultResultSpecifierClass + '_' + settings.uniqueQualifier).empty().append(resultsForm2);
			if (_thisM.settings.showBuilderTools) {
				widgetResultWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'editResultInfo'));
			}

			// Enables dropdown for results
			$('.lt-dd-toggle').dropdown();
		}
	}


	export class BuildTools{
		private lth: LoanTekWidget.helpers;
		constructor(lth: LoanTekWidget.helpers) {
			this.lth = lth;
		}

		BuildFields(mainWrapper: JQuery, options: IWidgetHelpers.IBuildOptions, data?: any): JQuery {
			var _thisM = this;
			var lth = this.lth;
			var $ = lth.$;
			var settings: IWidgetHelpers.IBuildOptions = {
				fieldHelperType: null
				, fieldSize: null
				, showBuilderTools: false
			};
			$.extend(settings, options);

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
			var fieldTemplate: Object;
			var isAlreadyInProcessOfAddingAdditionalInfoKey: boolean = false;
			var el = lth.CreateElement();
			settings.widgetChannel = settings.widgetChannel || 'form';

			// First transform each template (must be done first because during the main loop it looks forward to the next element sometimes)
			$.each(settings.fields, function (i, elementItem) {
				if (elementItem.field) {
					settings.fields[i] = lth.ExtendWidgetFieldTemplate(elementItem, settings.fieldHelperType);
				}
			});

			$.each(settings.fields, function (fieldIndex, elementItem) {
				var useRowInsteadOfFormGroup = elementItem.field === 'label' ? true : false;

				if (elementItem.id && !lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
					elementItem.id += '_' + settings.uniqueQualifier;
				}
				if (elementItem.offsetCols && !elementItem.cols) {
					elementItem.cols = COLUMNS_IN_ROW - elementItem.offsetCols;
				}

				isHidden = elementItem.type === 'hidden';
				elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
				elementItem.offsetCols = elementItem.offsetCols ? elementItem.offsetCols : 0;
				elementItem.size = elementItem.size ? elementItem.size : settings.fieldSize;
				isLastField = fieldIndex >= fieldsLength - 1;
				isLabel = elementItem.element === 'label';

				if (elementItem.field === 'captcha' && !lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
					elementItem.uniqueQualifier = settings.uniqueQualifier;
				}

				if (elementItem.element === 'repeat') {
					if (elementItem.field === 'autoquoteclientfees') {
						elementItem.fieldData = data['ClientFees'];
					}
				}

				if (elementItem.field === 'customhidden' || elementItem.field === 'custominput') {
					elementItem.cssClass = elementItem.cssClass || '';
					if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
						elementItem.cssClass += ' lt-custom-input_' + settings.uniqueQualifier;
					} else {
						elementItem.cssClass += 'lt-custom-input';
					}
				}

				if (elementItem.field === 'custominput' && settings.showBuilderTools) {
					elementItem.attrs = elementItem.attrs || [];
					var custAdditionalInfoIndex =  lth.GetIndexOfFirstObjectInArray(elementItem.attrs,'name','data-lt-additional-info-key');
					if (!elementItem.attrs[custAdditionalInfoIndex] && !isAlreadyInProcessOfAddingAdditionalInfoKey) {
						isAlreadyInProcessOfAddingAdditionalInfoKey = true;
						var editInfo: string;
						if (settings.widgetChannel === 'result') {
							editInfo = 'editResultInfo';
						} else {
							editInfo = 'editFormInfo';
						}

						// Removes 'data-lt-assign-additional-info-key' if it was added before... Must remove old one before adding again
						lth.RemoveObjectFromArray(elementItem.attrs, 'name', 'data-lt-assign-additional-info-key');

						// Adds 'data-lt-assign-additional-info-key'
						elementItem.attrs.push({ name: 'data-lt-assign-additional-info-key', value: lth.Interpolate(`{ fieldIndex: #{fi}, editInfo: #{eInfo} }`, { fi: fieldIndex+'', eInfo: editInfo }) });
					}
				}

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
					var appendBuilderTools = function (currentCell) {
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
					};

					var appendMoveTools = function (currentCell) {
						currentCell.prepend(el.div().addClass('move-hover'));

						currentCell.attr('data-drop', 'true')
							.attr('data-jqyoui-droppable', lth.Interpolate(`{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, \\'#{channel}\\')' }`, { pdi: '' + fieldIndex, channel: settings.widgetChannel }))
							.attr('data-jqyoui-options', lth.Interpolate(`{accept: '.#{channel}-channel', hoverClass: 'on-drag-hover'}`, { channel: settings.widgetChannel }));
					};

					// Create row
					if (!row) {
						columnCount = 0
						if (elementItem.cols + elementItem.offsetCols >= COLUMNS_IN_ROW) {
							row = el.formGroup(elementItem.size, useRowInsteadOfFormGroup);
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

						cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size, useRowInsteadOfFormGroup).append(innerCell));
					}

					if (elementItem.offsetCols > 0) {
						cell.addClass('col-sm-offset-' + elementItem.offsetCols);
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

					if (lth[settings.fieldHelperType].nodatamessage && elementItem.type === lth[settings.fieldHelperType].nodatamessage.id) {
						var wrapElement: JQuery = isSingleRow ? row : cell;
						wrapElement.prop('id', settings.noDataMessageWrapperId);

						if (!settings.showBuilderTools && !settings.showNoDataMessage) {
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
											.attr('data-jqyoui-options', lth.Interpolate(`{accept: '.#{channel}-channel', hoverClass: 'on-drag-hover'}`, { channel: settings.widgetChannel }))
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
				if (settings.formBorderType === lth.formBorderType.well.id) {
					var wellMain = el.div().addClass('well lt-widget-border');

					if (settings.panelTitle) {
						wellMain.append(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
					}

					mainWrapper = wellMain.append(mainWrapper);
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
				for (var dataName in data) {
					if (typeof data[dataName] === 'number') {
						data[dataName] += '';
					}

					if (data[dataName] === null || data[dataName] === undefined) {
						data[dataName] = ' ';
					}
				}
				mainWrapper.each(function(index, element) {
					lth.ModifyTextElementsInDOM(element, function(nodeValue: string) {
						return lth.Interpolate(nodeValue, data);
					});
				});
			}

			return mainWrapper;
		}

		CreateFormElement(elementObj: IWidgetHelpers.IField) {
			var _thisM = this;
			var lth = this.lth;
			var $ = lth.$;
			var el = lth.CreateElement();
			var returnElement: JQuery = null;
			var checkboxWrapper: JQuery = null;
			var checkboxLabel: JQuery = null;
			var checkboxIcon: JQuery = null;
			var checkboxText: JQuery = null;
			var dropdownBtn: JQuery = null;
			var dropdownBtnUl: JQuery = null;
			switch (elementObj.element) {
				case 'title':
					elementObj.nsize = elementObj.nsize || lth.hsize.getDefault().id;
					returnElement = el.h(elementObj.nsize);
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					returnElement.html(elementObj.value + '');
					break;
				case 'label':
					returnElement = el.label();
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					elementObj.value = elementObj.value || 'label';
					returnElement.html(elementObj.value + '');
					break;
				case 'p':
					elementObj.value = elementObj.value || ' ';
					returnElement = el.p();
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					returnElement.html(elementObj.value + '');
					break;
				case 'hr':
					returnElement = el.hr();
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					break;
				case 'button':
					returnElement = el.button(elementObj.type ? elementObj.type : 'button');
					elementObj.cssClass = elementObj.cssClass ? 'btn btn-default ' + elementObj.cssClass : 'btn btn-default';
					elementObj.value = elementObj.value ? elementObj.value : 'OK';
					returnElement.addClass(elementObj.cssClass).html(elementObj.value + '');
					break;
				case 'select':
					returnElement = el.select();
					elementObj.placeholder = elementObj.placeholder ? elementObj.placeholder : ' ';
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					switch (elementObj.type) {
						case 'selectobject':
							if (elementObj.selectOptions && Array.isArray(elementObj.selectOptions)) {
								$.each(elementObj.selectOptions, function (i, selectOption: IWidgetHelpers.ISelectOption) {
									returnElement.append(el.option().val(selectOption.Value).html(selectOption.Text));
								});
							}
							break;
						case 'state':
							var usStates = lth.US_States();
							$.each(usStates.states, function (i, state) {
								returnElement.append(el.option().val(state.abbreviation).html(state.name));
							});
							break;
						case 'deposittermdd':
							var depositTermsList = [
								{ value: 3, name: '3-month' }
								, { value: 6, name: '6-month' }
								, { value: 9, name: '9-month' }
								, { value: 12, name: '1-year' }
								, { value: 18, name: '1&frac12;-year' }
								, { value: 24, name: '2-year' }
								, { value: 36, name: '3-year' }
								, { value: 48, name: '4-year' }
								, { value: 60, name: '5-year' }
							];
							$.each(depositTermsList, function (i, term) {
								returnElement.append(el.option().val(term.value).html(term.name));
							});
							break;
						case 'depositamountdd':
							var depositAmountList = [
								{ value: 500, name: '$500' }
								, { value: 1000, name: '$1,000' }
								, { value: 2000, name: '$2,000' }
								, { value: 2500, name: '$2,500' }
								, { value: 5000, name: '$5,000' }
								, { value: 10000, name: '$10,000' }
								, { value: 15000, name: '$15,000' }
								, { value: 20000, name: '$20,000' }
								, { value: 25000, name: '$25,000' }
								, { value: 50000, name: '$50,000' }
								, { value: 100000, name: '$100,000' }

							];
							$.each(depositAmountList, function (i, amnt) {
								returnElement.append(el.option().val(amnt.value).html(amnt.name));
							});
							break;
						case 'desiredloanprogram':
							var desiredLoanProgramList = lth.ProductTermType.asArray();
							desiredLoanProgramList.splice(0,1);
							$.each(desiredLoanProgramList, function (i, program) {
								returnElement.append(el.option().val(program.name).html(program.description));
							});
							break;
						case 'desiredinterestrate':
							var desiredInterestRateList = [];
							var intRate = 1;
							while (intRate < 10) {
								desiredInterestRateList.push({ value: lth.FormatNumber(intRate, 3), name: lth.FormatNumber(intRate, 3) + '%' });
								intRate += 0.125;
							}

							$.each(desiredInterestRateList, function (i, program) {
								returnElement.append(el.option().val(program.value).html(program.name));
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
							elementObj.cssClass = elementObj.cssClass ? 'btn btn-default ' + elementObj.cssClass : 'btn btn-default';
							elementObj.value = elementObj.value ? elementObj.value : 'OK';
							returnElement.val(elementObj.value);
							break;
						case 'hidden':
							returnElement.val(elementObj.value);
							break;
						case 'checkbox':
							checkboxWrapper = el.div().addClass('checkbox checkbox-fa');
							checkboxLabel = el.label('');
							checkboxIcon = el.i().addClass('checkbox-i');
							checkboxText = el.span();
							break;
						default:
							returnElement.addClass('form-control');
							if (elementObj.value || lth.isNumber(elementObj.value)) { returnElement.val(elementObj.value); }
							break;
					}
					if (elementObj.type === 'checkbox') {
						if (elementObj.cssClass) { checkboxWrapper.addClass(elementObj.cssClass); }
					} else {
						if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					}
					break;
				case 'captcha':
					var settings = {
						capImg: 'ltCaptchaImg'
						, capInput: 'ltCaptchaInput'
						, capReset: 'ltCaptchaReset'
						, capErMsg: 'ltCaptchaErrorMsg'
					};
					if (elementObj.uniqueQualifier && elementObj.uniqueQualifier.length > 0) {
						settings.capImg += '_' + elementObj.uniqueQualifier;
						settings.capInput += '_' + elementObj.uniqueQualifier;
						settings.capReset += '_' + elementObj.uniqueQualifier;
						settings.capErMsg += '_' + elementObj.uniqueQualifier;
					}

					var captchaInputObj: IWidgetHelpers.IField = { element: 'input', id: settings.capInput, placeholder: 'Enter the characters', required: true };
					var captchaResetBtnObj: IWidgetHelpers.IField = { element: 'button', id: settings.capReset, cssClass: 'btn-info', alttext: 'Reset', tabindex: -1, value: ' ' };
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
										el.div().prop('id', settings.capImg).addClass('captcha-font')
									)
								)
							).append(
								el.row().append(
									el.col(8, 'xs').append(
										captchaInput
									).append(
										el.span().prop('id', settings.capErMsg).addClass('text-danger small').text('The code you entered does not match the one shown in the image.')
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
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					break;
				case 'repeat':
					elementObj.fieldListOptions = elementObj.fieldListOptions || { fields: [] };
					if (elementObj.field === 'depositdatalist') {
						elementObj.fieldListOptions.fieldHelperType = 'depositResultDataFields';
					}
					// if (elementObj.field === 'autoquoteclientfees') {
					// 	// window.console && console.log('is autoquoteclientfees', elementObj);
					// 	elementObj.fieldListOptions.fieldHelperType = 'autoQuoteResultDataFieldsClientFees';
					// 	// window.console && console.log('after is');

					// 	// if (elementObj.fieldListOptions.fields.length === 0) {
					// 	// 	elementObj.fieldListOptions.fields.push({ field: 'paragraph', value: '[edit Client Fees section]' });
					// 	// }
					// }
					if (elementObj.field === 'autoquotedatalist') {
						elementObj.fieldListOptions.fieldHelperType = 'autoQuoteResultDataFields';
					}
					if (elementObj.field === 'autoquoteclientfees') {
						elementObj.fieldListOptions.fieldHelperType = 'autoQuoteResultDataFieldsClientFees';
						if (elementObj.fieldListOptions.fields.length === 0) {
							elementObj.fieldListOptions.fields.push({ field: 'paragraph', value: '[edit Client Fees section]' });
						}
					}
					if (elementObj.field === 'mortgageratedatalist') {
						elementObj.fieldListOptions.fieldHelperType = 'mortgageRateDataDisplay';
						if (elementObj.fieldListOptions.fields.length === 0) {
							elementObj.fieldListOptions.fields.push({ field: 'paragraph', value: '[edit Rate Data section]', backgroundColor: '#f00', color: '#fff' });
						}
					}
					var classQualifier: number = Math.ceil((Math.random()*100000));
					var repeatElementClass = 'ltw-repeat-data' + classQualifier;
					returnElement = el.div().addClass(repeatElementClass);
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					if (elementObj.fieldData) {
						for (var dataIndex = 0, dataLength = elementObj.fieldData.length; dataIndex < dataLength; ++dataIndex) {
							var dataItem = elementObj.fieldData[dataIndex];
							var resultDataRow = el.div().addClass('widget-results-repeat-section');
							resultDataRow = _thisM.BuildFields(resultDataRow, elementObj.fieldListOptions, dataItem);
							returnElement.append(resultDataRow);

							var applyFormStyles: string = new LoanTekWidget.ApplyFormStyles(lth, elementObj.fieldListOptions, false, '.ltw .' + repeatElementClass).getStyles();
							if (applyFormStyles) {
								resultDataRow.prepend(el.style().html(applyFormStyles));
							}
						}
					}
					break;
				case 'widget':
					returnElement = el.div();
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					if (elementObj.widgetInfo) {
						var widgetCode = lth.BuildWidgetScript(elementObj.widgetInfo);
						returnElement.html(widgetCode);
					} else {
						returnElement.html('[please edit to choose widget]');
					}
					break;
				case 'datatable':
					var tableEl: JQuery = el.table().addClass('table table-fa-sort').attr('width', '100%').attr('cellpadding','0').attr('cellspacing', '0');
					if (elementObj.dataTableOptions) {
						if (elementObj.dataTableOptions.isBordered) {
							tableEl.addClass('table-bordered');
						}
						if (elementObj.dataTableOptions.isCondensed) {
							tableEl.addClass('table-condensed');
						}
						if (elementObj.dataTableOptions.isHover) {
							tableEl.addClass('table-hover');
						}
						if (elementObj.dataTableOptions.isStriped) {
							tableEl.addClass('table-striped');
						}
					}
					returnElement = el.div().addClass('table-responsive').append(tableEl);
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					break;
				case 'buttondropdown':
					returnElement = el.div().addClass('dropdown');
					dropdownBtn = el.button().addClass('btn btn-default lt-dd-toggle').attr({ 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' });
					dropdownBtnUl = el.ul().addClass('dropdown-menu ' + elementObj.field + 'ul');
					elementObj.cssClass = elementObj.cssClass ? elementObj.cssClass : '';
					elementObj.value = elementObj.value ? elementObj.value + ' ' : 'Sort ';
					dropdownBtn.addClass(elementObj.cssClass).html(elementObj.value.toString());
					dropdownBtn.append(el.span().addClass('caret'));
					break;
				default:
					elementObj.value = elementObj.value || ' ';
					returnElement = el.div();
					if (elementObj.cssClass) { returnElement.addClass(elementObj.cssClass); }
					returnElement.html(elementObj.value + '');
					break;
			}

			if (returnElement) {
				if (elementObj.id) {
					if (elementObj.uniqueQualifier && elementObj.uniqueQualifier.length > 0) {
						elementObj.id += '_' + elementObj.uniqueQualifier;
					}
					if (checkboxLabel) {
						checkboxLabel.attr('for', elementObj.id);
					}
					returnElement.prop('id', elementObj.id).prop('name', elementObj.id);
				}

				if (elementObj.color) {
					if (checkboxWrapper) {
						checkboxWrapper.css({ color: elementObj.color });
					} else if (dropdownBtn) {
						dropdownBtn.css({ color: elementObj.color });
					} else {
						returnElement.css({ color: elementObj.color });
					}
				}

				if (elementObj.fontSize) {
					if (checkboxWrapper) {
						checkboxWrapper.css({ fontSize: elementObj.fontSize + 'px' });
					} else if (dropdownBtn) {
						dropdownBtn.css({ fontSize: elementObj.fontSize + 'px' });
					} else {
						returnElement.css({ fontSize: elementObj.fontSize + 'px' });
					}
				}

				if (elementObj.backgroundColor) {
					switch (elementObj.element) {
						case 'datatable':
							returnElement.children('table.table').css({ backgroundColor: elementObj.backgroundColor });
							break;
						default:
							if (checkboxWrapper) {
								checkboxWrapper.css({ backgroundColor: elementObj.backgroundColor });
							}  else if (dropdownBtn) {
								dropdownBtn.css({ backgroundColor: elementObj.backgroundColor });
							} else {
								returnElement.css({ backgroundColor: elementObj.backgroundColor });
							}
							break;
					}
				}

				if (lth.isNumber(elementObj.borderRadius)) {
					if (checkboxWrapper) {
						checkboxWrapper.css({ borderRadius: elementObj.borderRadius + 'px' });
					} else if (dropdownBtn) {
						dropdownBtn.css({ borderRadius: elementObj.borderRadius + 'px' });
					} else {
						returnElement.css({ borderRadius: elementObj.borderRadius + 'px' });
					}
				}

				if (elementObj.borderColor) {
					switch (elementObj.element) {
						case 'datatable':
							returnElement.children('table.table').css({ borderColor: elementObj.borderColor });
							break;
						case 'p':
						case 'div':
							returnElement.css({ borderWidth: '1px', borderStyle: 'solid' });
							// break;
						default:
							if (checkboxWrapper) {
								checkboxWrapper.css({ borderWidth: '1px', borderStyle: 'solid', borderColor: elementObj.borderColor });
							} else if (dropdownBtn) {
								dropdownBtn.css({ borderColor: elementObj.borderColor });
							} else {
								returnElement.css({ borderColor: elementObj.borderColor });
							}
							break;
					}
				}

				if (lth.isNumber(elementObj.padding)) {
					if (checkboxWrapper) {
						checkboxWrapper.css({ padding: elementObj.padding + 'px' });
					} else {
						returnElement.css({ padding: elementObj.padding + 'px' });
					}
				}

				if(lth.isNumber(elementObj.marginTopBottom)) {
					if (checkboxWrapper) {
						checkboxWrapper.css({ marginTop: elementObj.marginTopBottom + 'px', marginBottom: elementObj.marginTopBottom + 'px' });
					} else {
						returnElement.css({ marginTop: elementObj.marginTopBottom + 'px', marginBottom: elementObj.marginTopBottom + 'px' });
					}
				}

				if (elementObj.align) {
					if (checkboxWrapper) {
						checkboxWrapper.css({ textAlign: elementObj.align });
					} else {
						returnElement.css({ textAlign: elementObj.align });
					}
				}

				if (elementObj.style) {
					var styleSplit = elementObj.style.trim().split(';');
					for (var iStyle = styleSplit.length - 1; iStyle >= 0; iStyle--) {
						var style = styleSplit[iStyle].trim();
						if (!lth.isStringNullOrEmpty(style)) {
							var styleKey = style.substring(0, style.indexOf(':')).trim();
							var styleValue = style.substring(style.indexOf(':') + 1, style.length).trim();

							if (styleKey && styleValue) {
								if (checkboxWrapper) {
									checkboxWrapper.css(styleKey, styleValue);
								} else if (dropdownBtn) {
									dropdownBtn.css(styleKey, styleValue);
								} else {
									returnElement.css(styleKey, styleValue);
								}
							}
						}
					}
				}

				if (elementObj.required) {
					returnElement.prop('required', true);
				}

				if (elementObj.alttext) {
					if (checkboxWrapper) {
						checkboxWrapper.prop('alt', elementObj.alttext).prop('title', elementObj.alttext);
					} else {
						returnElement.prop('alt', elementObj.alttext).prop('title', elementObj.alttext);
					}
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
							switch (elementObj.type) {
								case 'checkbox':
									checkboxText.html(' ' + elementObj.placeholder);
									break;
								default:
									returnElement.attr('placeholder', elementObj.placeholder);
									break;
							}
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
								case 'checkbox':
									checkboxWrapper.addClass('checkbox-' + elementObj.size);
									break;
								case 'hidden':
									break;
								default:
									returnElement.addClass('input-' + elementObj.size);
									break;
							}
							break;
						case 'buttondropdown':
							dropdownBtn.addClass('btn-' + elementObj.size);
							break;
						default:
							// code...
							break;
					}
				}

				if (elementObj.attrs) {
					for (var iAttrs = elementObj.attrs.length - 1; iAttrs >= 0; iAttrs--) {
						var attr = elementObj.attrs[iAttrs];
						returnElement.attr(attr.name, attr.value);
					}
				}
			}

			if (checkboxWrapper) {
				checkboxLabel.append(returnElement).append(checkboxIcon).append(checkboxText);
				returnElement = checkboxWrapper.append(checkboxLabel);
			}

			if (dropdownBtn) {
				returnElement.append(dropdownBtn).append(dropdownBtnUl);
			}

			return returnElement;
		}
	}
}
