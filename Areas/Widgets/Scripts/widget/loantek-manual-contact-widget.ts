/// <reference path="../../../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../../Scripts/typings/jquery.placeholder/jquery.placeholder.d.ts" />

/**
 * LoanTek Manual Contact Widget
 */

var ltjQuery: JQueryStatic = jQuery.noConflict(true);
namespace LoanTekContactWidget {
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

	interface ICaptchaSettingsContact {
		imgId: string;
		inputId: string;
		resetId: string;
		errorMsgId: string;
		backgroundClasses: string[];
		fontClasses: string[];
		characters: string;
		characterLength: number;
	}

	export class LoanTekManualContactWidget {

		constructor(options) {
			var settings = {
				redirectUrl: null,
				postUrl: 'https://api.loantek.com/Leads.Clients/SalesLeadRequest/Add/N05KN3YraUFwZ0Y5bWhKYjZEVGhIbWdVMVBVVVdMcllRUFlBNll4ZXNMY3MyQlZ5eHNrbHRBQT01',
				successMessage: null,
				externalValidatorFunction: null,
				AdditionalPostData: null,

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

			// ltjQuery('input, textarea').placeholder({ customClass: 'placeholder-text' });

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
					widgetData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime();
					widgetData.Reason = ltjQuery(settings.form_comments).val();
					widgetData.MiscData[0].Value = '';
					if (settings.AdditionalPostData) {
						ltjQuery.extend(true, widgetData, settings.AdditionalPostData);
					}
					// window.console && console.log('widgetData', widgetData);

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
						window.console && console.log('result', result);
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

	export class LoanTekCaptcha {

		private _randomCodeString: string;
		private _charArray: string[];
		private _captchaInput: JQuery;
		private _captchaErrorMsg: JQuery;
		private _capImg: JQuery;
		private _capSpan: () => JQuery;

		constructor(cjq: JQueryStatic, options?: ICaptchaSettingsContact) {
			var _thisC = this;
			var settings: ICaptchaSettingsContact = {
				imgId: 'ltCaptchaImg',
				inputId: 'ltCaptchaInput',
				resetId: 'ltCaptchaReset',
				errorMsgId: 'ltCaptchaErrorMsg',
				backgroundClasses: ['captcha01', 'captcha02', 'captcha03'],
				// fontClasses: ['font01', 'font02', 'font03', 'font04', 'font05', 'font06', 'font07', 'font08', 'font09', 'font10', 'font11', 'font12', 'font13'],
				fontClasses: ['alpha-sans', 'alpha-arial', 'alpha-comic-sans', 'alpha-consolas', 'alpha-courier', 'alpha-georgia', 'alpha-impact', 'alpha-palatino', 'alpha-trebuchet'],
				characters: '23456789ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
				characterLength: 5
			};
			cjq.extend(settings, options);

			_thisC._captchaInput = cjq('#' + settings.inputId);
			_thisC._captchaErrorMsg = cjq('#' + settings.errorMsgId);

			_thisC._charArray = settings.characters.split('');
			_thisC._capImg = cjq('#' + settings.imgId);
			var capReset = cjq('#' + settings.resetId);
			_thisC._capSpan = () => { return cjq('<span/>'); };

			_thisC.SetRandomCaptcha(settings);

			capReset.click(function () {
				_thisC.SetRandomCaptcha(settings);
			});

			_thisC._captchaInput.blur(function () {
				_thisC.IsValidEntry();
			});
		}

		SetRandomCaptcha(settings: ICaptchaSettingsContact) {
			var _thisM = this;
			var randomChar: string;
			var randomCharIndex: number;
			var randomCodeArray: string[] = [];
			_thisM._randomCodeString = '';
			_thisM.SetCaptchaInputValue('');
			_thisM._captchaErrorMsg.hide();

			for (var i = 0; i < settings.characterLength; ++i) {
				randomCharIndex = _thisM.GetRandomIndexNumber(_thisM._charArray.length);
				randomChar = _thisM._charArray[randomCharIndex];
				randomCodeArray.push(randomChar);
				_thisM._randomCodeString += randomChar;
			}
			_thisM.SetCaptchaImg(settings, randomCodeArray);
		}

		SetCaptchaImg(settings: ICaptchaSettingsContact, codeArray: string[]) {
			var _thisM = this;
			var randomBackgroundIndex: number = _thisM.GetRandomIndexNumber(settings.backgroundClasses.length);
			var randomFontIndex: number;
			var randomFont: string;
			var imgBgClass = settings.backgroundClasses[randomBackgroundIndex];
			var aPos = _thisM.GetAlphaPositions();
			_thisM._capImg.removeClass(function () { return settings.backgroundClasses.join(' '); });
			_thisM._capImg.addClass(imgBgClass);
			_thisM._capImg.html('');
			for (var i = 0; i < codeArray.length; ++i) {
				var c = codeArray[i];
				var pos: string = aPos['alpha_position_' + c].x + 'px ' + aPos['alpha_position_' + c].y + 'px';
				randomFontIndex = _thisM.GetRandomIndexNumber(settings.fontClasses.length);
				randomFont = settings.fontClasses[randomFontIndex];
				_thisM._capImg.append(_thisM._capSpan().addClass('captcha-alpha ' + randomFont).css({ backgroundPosition: pos }));
			}
		}

		GetCaptchaInputValue(): string {
			return this._captchaInput.val();
		}

		SetCaptchaInputValue(newText) {
			this._captchaInput.val(newText);
		}

		GetRandomIndexNumber(objLen: number): number {
			return Math.floor(Math.random() * objLen);
		}

		GetAlphaPositions(): Object {
			return {
				alpha_position_A: { x: 0, y: 0 },
				alpha_position_B: { x: 0, y: -50 },
				alpha_position_C: { x: 0, y: -100 },
				alpha_position_D: { x: 0, y: -150 },
				alpha_position_E: { x: 0, y: -200 },
				alpha_position_F: { x: 0, y: -250 },
				alpha_position_G: { x: 0, y: -300 },
				alpha_position_H: { x: 0, y: -350 },
				alpha_position_I: { x: 0, y: -400 },
				alpha_position_J: { x: 0, y: -450 },
				alpha_position_K: { x: 0, y: -500 },
				alpha_position_L: { x: 0, y: -550 },
				alpha_position_M: { x: 0, y: -600 },
				alpha_position_N: { x: 0, y: -650 },
				alpha_position_O: { x: 0, y: -700 },
				alpha_position_P: { x: 0, y: -750 },
				alpha_position_Q: { x: 0, y: -800 },
				alpha_position_R: { x: 0, y: -850 },
				alpha_position_S: { x: 0, y: -900 },
				alpha_position_T: { x: 0, y: -950 },
				alpha_position_U: { x: 0, y: -1000 },
				alpha_position_V: { x: 0, y: -1050 },
				alpha_position_W: { x: 0, y: -1100 },
				alpha_position_X: { x: 0, y: -1150 },
				alpha_position_Y: { x: 0, y: -1200 },
				alpha_position_Z: { x: 0, y: -1250 },
				alpha_position_a: { x: -50, y: 0 },
				alpha_position_b: { x: -50, y: -50 },
				alpha_position_c: { x: -50, y: -100 },
				alpha_position_d: { x: -50, y: -150 },
				alpha_position_e: { x: -50, y: -200 },
				alpha_position_f: { x: -50, y: -250 },
				alpha_position_g: { x: -50, y: -300 },
				alpha_position_h: { x: -50, y: -350 },
				alpha_position_i: { x: -50, y: -400 },
				alpha_position_j: { x: -50, y: -450 },
				alpha_position_k: { x: -50, y: -500 },
				alpha_position_l: { x: -50, y: -550 },
				alpha_position_m: { x: -50, y: -600 },
				alpha_position_n: { x: -50, y: -650 },
				alpha_position_o: { x: -50, y: -700 },
				alpha_position_p: { x: -50, y: -750 },
				alpha_position_q: { x: -50, y: -800 },
				alpha_position_r: { x: -50, y: -850 },
				alpha_position_s: { x: -50, y: -900 },
				alpha_position_t: { x: -50, y: -950 },
				alpha_position_u: { x: -50, y: -1000 },
				alpha_position_v: { x: -50, y: -1050 },
				alpha_position_w: { x: -50, y: -1100 },
				alpha_position_x: { x: -50, y: -1150 },
				alpha_position_y: { x: -50, y: -1200 },
				alpha_position_z: { x: -50, y: -1250 },
				alpha_position_0: { x: -100, y: 0 },
				alpha_position_1: { x: -100, y: -50 },
				alpha_position_2: { x: -100, y: -100 },
				alpha_position_3: { x: -100, y: -150 },
				alpha_position_4: { x: -100, y: -200 },
				alpha_position_5: { x: -100, y: -250 },
				alpha_position_6: { x: -100, y: -300 },
				alpha_position_7: { x: -100, y: -350 },
				alpha_position_8: { x: -100, y: -400 },
				alpha_position_9: { x: -100, y: -450 }
			};
		}

		IsValidEntry(): boolean {
			var doesEntryMatch = false;
			doesEntryMatch = this._randomCodeString.toLowerCase() === this.GetCaptchaInputValue().toLowerCase().replace(/\s+/g, '');
			if (!doesEntryMatch) {
				this._captchaErrorMsg.show();
			} else {
				this._captchaErrorMsg.hide();
			}
			return doesEntryMatch;
		}

		Validate = () => {
			return this.IsValidEntry();
		}
	}
}
