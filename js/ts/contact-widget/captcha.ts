interface ICaptchaOptions {
	imgId: string;
	inputId: string;
	resetId: string;
	backgroundClasses: string[];
	fontClasses: string[];
	characters: string;
	characterLength: number;
}

class LoanTekCaptcha {

	private _randomCodeString: string;
	private _captchaInput: JQuery;

	constructor(options: ICaptchaOptions) {
		var _thisClass = this;
		var settings: ICaptchaOptions = {
			imgId: 'ltCaptchaImg',
			inputId: 'ltCaptchaInput',
			resetId: 'ltCaptchaReset',
			backgroundClasses: ['captcha01', 'captcha02', 'captcha03'],
			fontClasses: ['font01', 'font02', 'font03', 'font04', 'font05', 'font06', 'font07', 'font08', 'font09', 'font10', 'font11', 'font12', 'font13'],
			characters: '23456789ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
			characterLength: 5
		};
		ltjQuery.extend(settings, options);

		_thisClass._captchaInput = ltjQuery('#' + settings.inputId);

		var charArray = settings.characters.split('');
		// var randomCodeString: string = '';
		// var ltForm = ltjQuery('#LtcwContactWidgetForm');
		var capImg = ltjQuery('#' + settings.imgId);
		// var capInput = ltjQuery('#' + settings.inputId);
		var capReset = ltjQuery('#' + settings.resetId);
		var capSpan = () => { return ltjQuery('<span/>'); };

		SetRandomCaptcha();

		capReset.click(function() {
			SetRandomCaptcha();
		});

		// ltForm.submit((event) => {
		// 	event.preventDefault();
		// 	window.console && console.log('captcha submit');
		// 	window.console && console.log('captcha valid', ValidateEntry());
		// 	return false;
		// });

		function SetRandomCaptcha() {
			var randomChar: string;
			var randomCharIndex: number;
			var randomCodeArray: string[] = [];
			_thisClass._randomCodeString = '';
			// capInput.val('');
			_thisClass.SetCaptchaInputValue('');

			for (var i = 0; i < settings.characterLength; ++i) {
				randomCharIndex = _thisClass.GetRandomIndexNumber(charArray.length);
				randomChar = charArray[randomCharIndex];
				randomCodeArray.push(randomChar);
				_thisClass._randomCodeString += randomChar;
			}
			window.console && console.log(_thisClass._randomCodeString, randomCodeArray);
			SetCaptchaImg(randomCodeArray);
		}

		function SetCaptchaImg (codeArray: string[]) {
			var randomBackgroundIndex: number = _thisClass.GetRandomIndexNumber(settings.backgroundClasses.length);
			var randomFontIndex: number;
			var randomFont: string;
			var imgBgClass = settings.backgroundClasses[randomBackgroundIndex];
			capImg.addClass(imgBgClass);
			capImg.html('');
			for (var i = 0; i < codeArray.length; ++i) {
				randomFontIndex = _thisClass.GetRandomIndexNumber(settings.fontClasses.length);
				randomFont = settings.fontClasses[randomFontIndex];
				// window.console && console.log(GetAscii(codeArray[i]));
				// capImg.append(capSpan().addClass(randomFont).html(' &#' + GetAscii(codeArray[i]) + '; '));
				capImg.append(capSpan().addClass(randomFont).html(' ' + codeArray[i] + ' '));
			}
		}

		// function GetRandomIndexNumber (objLen: number): number {
		// 	// return Math.floor(Math.random() * objLen);
		// 	return _thisClass.GetRandomIndexNumber(objLen);
		// }

		// function GetAscii (c: string) {
		// 	// window.console && console.log(c.charCodeAt(0));
		// 	return c.charCodeAt(0);
		// }

		// function ValidateEntry() {
		// 	var doesEntryMatch = false;
		// 	doesEntryMatch = capInput.val() === _thisClass._randomCodeString;
		// 	return doesEntryMatch;
		// }
	}

	GetCaptchaInputValue(): string {
		// return ltjQuery('#' + this._captchaInputId).val
		return this._captchaInput.val();
	}

	SetCaptchaInputValue(newText) {
		// ltjQuery('#' + this._captchaInputId).val(newText);
		this._captchaInput.val(newText);
	}

	GetRandomIndexNumber(objLen: number): number {
		// window.console && console.log('using get random method', objLen);
		return Math.floor(Math.random() * objLen);
	}

	ValidateEntry(): boolean {
		var doesEntryMatch = false;
		window.console && console.log('rcs', this._randomCodeString.toLowerCase(), 'gciv()', this.GetCaptchaInputValue().toLowerCase());
		// doesEntryMatch = capInput.val() === randomCodeString;
		doesEntryMatch = this._randomCodeString.toLowerCase() === this.GetCaptchaInputValue().toLowerCase();
		return doesEntryMatch;
	}
}
