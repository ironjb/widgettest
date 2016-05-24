/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/jquery.placeholder/jquery.placeholder.d.ts" />
/// <reference path="../common/jquery-noconflict.ts" />
/// <reference path="build-form.ts" />
/// <reference path="captcha.ts" />

/**
 * LoanTek Manual Contact Widget
 */

interface ISource {
	Active: boolean;
	Alias: string;
	Id: number;
	SourceType: string;
	Name: string;
	SubName: string;
}

interface IPersonAddress {
	State: string;
}

interface IContactMethod {
	ContactType: string;
	Address?: string;
	Number?: string;
}

interface IAsset {
	AssetType: string;
	CompanyName: string;
}

interface IPerson {
	PersonCategoryType: string;
	PersonType: string;
	Addresses: IPersonAddress[];
	ContactMethods: IContactMethod[];
	Assets: IAsset[];
	FirstName: string;
	LastName: string;
}

interface IMiscData {
	Name: string;
	Value: string;
}

interface IWidgetData {
	FileType: string;
	Reason: string;
	Source: ISource;
	NotifyUserOfNewLead: boolean;
	SendNewLeadInitialWelcomeMessage: boolean;
	ClientDefinedIdentifier: string;
	ClientId: number;
	Persons: IPerson[];
	MiscData: IMiscData[];
}

class LoanTekManualContactWidget {

	constructor(options) {
		var settings = {
			redirectUrl: null,
			postUrl: '',
			successMessage: null,
			externalValidatorFunction: null,

			// Default form element IDs
			form_id: '#LtcwContactWidgetForm',
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
		ltjQuery.extend(settings, options);

		ltjQuery('input, textarea').placeholder({ customClass: 'placeholder-text' });

		ltjQuery(() => {

			var widgetData: IWidgetData = {
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

			ltjQuery(settings.form_submit).prop('disabled', false);

			ltjQuery(settings.form_id).submit((event) => {
				event.preventDefault();
				ltjQuery(settings.form_errorMsgWrapper).hide(100);
				ltjQuery(settings.form_submit).prop('disabled', true);

				if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
					ltjQuery(settings.form_submit).prop('disabled', false);
					return false;
				}

				widgetData.Persons[0].FirstName = ltjQuery(settings.form_firstName).val();
				widgetData.Persons[0].LastName = ltjQuery(settings.form_lastName).val();
				widgetData.Persons[0].ContactMethods[0].Address = ltjQuery(settings.form_email).val();
				widgetData.Persons[0].ContactMethods[1].Number = ltjQuery(settings.form_phone).val();
				widgetData.Persons[0].Assets[0].CompanyName = ltjQuery(settings.form_company).val();
				widgetData.Persons[0].Addresses[0].State = ltjQuery(settings.form_state + ' option:selected').val();
				// widgetData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime().toString();
				widgetData.ClientDefinedIdentifier = ltjQuery(settings.form_clientid).val();
				widgetData.Reason = ltjQuery(settings.form_comments).val();
				widgetData.MiscData[0].Value = '';

				window.console && console.log('widgetData', widgetData);

				var request = ltjQuery.ajax({
					// url: 'http://node-cors-server.herokuapp.com/no-cors',
					// url: 'http://node-cors-server.herokuapp.com/simple-cors',
					url: settings.postUrl,
					method: 'POST',
					contentType: 'application/json',
					data: JSON.stringify(widgetData),
					dataType: 'json'
				});

				request.done((result) => {
					// Clear all fields
					ltjQuery(settings.form_id).trigger('reset');
					ltjQuery(settings.form_submit).prop('disabled', false);

					if (settings.redirectUrl) {
						window.location.assign(settings.redirectUrl);
					} else if (settings.successMessage) {
						ltjQuery(settings.form_id).hide(100, () => {
							ltjQuery(settings.form_id).remove();
						});
						ltjQuery(settings.successMsgWrapper).show(100);
						ltjQuery(settings.successMsg).html(settings.successMessage);
					}
				});

				request.fail((error) => {
					ltjQuery(settings.form_submit).prop('disabled', false);
					var msg = 'There was an unexpected error. Please try again.';

					try {
						var errorObj = (error.responseJSON != null) ? error.responseJSON : JSON.parse(error.responseText);
						msg = errorObj.Message;
					} catch (e) {
						console.error('Error @ request.fail.responseText:' + e);
					}

					ltjQuery(settings.form_errorMsg).html(msg);
					ltjQuery(settings.form_errorMsgWrapper).show(100);
				});
			});
		});
	}
}
