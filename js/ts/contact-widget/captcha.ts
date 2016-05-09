interface ICaptchaSettings {
	imgId: string;
	inputId: string;
	resetId: string;
	errorMsgId: string;
	backgroundClasses: string[];
	fontClasses: string[];
	characters: string;
	characterLength: number;
}

class LoanTekCaptcha {

	private _randomCodeString: string;
	private _charArray: string[];
	private _captchaInput: JQuery;
	private _captchaErrorMsg: JQuery;
	private _capImg: JQuery;
	private _capSpan: () => JQuery;

	constructor(options: ICaptchaSettings) {
		var _thisC = this;
		var settings: ICaptchaSettings = {
			imgId: 'ltCaptchaImg',
			inputId: 'ltCaptchaInput',
			resetId: 'ltCaptchaReset',
			errorMsgId: 'ltCaptchaErrorMsg',
			backgroundClasses: ['captcha01', 'captcha02', 'captcha03'],
			fontClasses: ['font01', 'font02', 'font03', 'font04', 'font05', 'font06', 'font07', 'font08', 'font09', 'font10', 'font11', 'font12', 'font13'],
			characters: '23456789ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
			characterLength: 5
		};
		ltjQuery.extend(settings, options);

		_thisC._captchaInput = ltjQuery('#' + settings.inputId);
		_thisC._captchaErrorMsg = ltjQuery('#' + settings.errorMsgId);

		// var charArray = settings.characters.split('');
		_thisC._charArray = settings.characters.split('');
		// var randomCodeString: string = '';
		// var ltForm = ltjQuery('#LtcwContactWidgetForm');
		// var capImg = ltjQuery('#' + settings.imgId);
		_thisC._capImg = ltjQuery('#' + settings.imgId);
		// var capInput = ltjQuery('#' + settings.inputId);
		var capReset = ltjQuery('#' + settings.resetId);
		// var capSpan = () => { return ltjQuery('<span/>'); };
		_thisC._capSpan = () => { return ltjQuery('<span/>'); };

		_thisC.SetRandomCaptcha(settings);

		capReset.click(function() {
			_thisC.SetRandomCaptcha(settings);
		});

		_thisC._captchaInput.blur(function() {
			_thisC.IsValidEntry();
		});

		// ltForm.submit((event) => {
		// 	event.preventDefault();
		// 	window.console && console.log('captcha submit');
		// 	window.console && console.log('captcha valid', IsValidEntry());
		// 	return false;
		// });

		// function SetRandomCaptcha() {
		// 	var randomChar: string;
		// 	var randomCharIndex: number;
		// 	var randomCodeArray: string[] = [];
		// 	_thisC._randomCodeString = '';
		// 	// capInput.val('');
		// 	_thisC.SetCaptchaInputValue('');
		// 	_thisC._captchaErrorMsg.hide();

		// 	for (var i = 0; i < settings.characterLength; ++i) {
		// 		randomCharIndex = _thisC.GetRandomIndexNumber(_thisC._charArray.length);
		// 		randomChar = _thisC._charArray[randomCharIndex];
		// 		randomCodeArray.push(randomChar);
		// 		_thisC._randomCodeString += randomChar;
		// 	}
		// 	window.console && console.log(_thisC._randomCodeString, randomCodeArray);
		// 	_thisC.SetCaptchaImg(settings, randomCodeArray);
		// }

		// function SetCaptchaImg (codeArray: string[]) {
		// 	var randomBackgroundIndex: number = _thisC.GetRandomIndexNumber(settings.backgroundClasses.length);
		// 	var randomFontIndex: number;
		// 	var randomFont: string;
		// 	var imgBgClass = settings.backgroundClasses[randomBackgroundIndex];
		// 	capImg.addClass(imgBgClass);
		// 	capImg.html('');
		// 	for (var i = 0; i < codeArray.length; ++i) {
		// 		randomFontIndex = _thisC.GetRandomIndexNumber(settings.fontClasses.length);
		// 		randomFont = settings.fontClasses[randomFontIndex];
		// 		// window.console && console.log(GetAscii(codeArray[i]));
		// 		// capImg.append(capSpan().addClass(randomFont).html(' &#' + GetAscii(codeArray[i]) + '; '));
		// 		capImg.append(capSpan().addClass(randomFont).html(' ' + codeArray[i] + ' '));
		// 	}
		// }

		// function GetRandomIndexNumber (objLen: number): number {
		// 	// return Math.floor(Math.random() * objLen);
		// 	return _thisC.GetRandomIndexNumber(objLen);
		// }

		// function GetAscii (c: string) {
		// 	// window.console && console.log(c.charCodeAt(0));
		// 	return c.charCodeAt(0);
		// }

		// function IsValidEntry() {
		// 	var doesEntryMatch = false;
		// 	doesEntryMatch = capInput.val() === _thisC._randomCodeString;
		// 	return doesEntryMatch;
		// }
	}

	SetRandomCaptcha(settings: ICaptchaSettings) {
		var _thisM = this;
		var randomChar: string;
		var randomCharIndex: number;
		var randomCodeArray: string[] = [];
		_thisM._randomCodeString = '';
		// capInput.val('');
		_thisM.SetCaptchaInputValue('');
		_thisM._captchaErrorMsg.hide();

		for (var i = 0; i < settings.characterLength; ++i) {
			randomCharIndex = _thisM.GetRandomIndexNumber(_thisM._charArray.length);
			randomChar = _thisM._charArray[randomCharIndex];
			randomCodeArray.push(randomChar);
			_thisM._randomCodeString += randomChar;
		}
		window.console && console.log(_thisM._randomCodeString, randomCodeArray);
		_thisM.SetCaptchaImg(settings, randomCodeArray);
	}


	SetCaptchaImg (settings: ICaptchaSettings, codeArray: string[]) {
		var _thisM = this;
		var randomBackgroundIndex: number = _thisM.GetRandomIndexNumber(settings.backgroundClasses.length);
		var randomFontIndex: number;
		var randomFont: string;
		var imgBgClass = settings.backgroundClasses[randomBackgroundIndex];
		_thisM._capImg.addClass(imgBgClass);
		_thisM._capImg.html('');
		for (var i = 0; i < codeArray.length; ++i) {
			randomFontIndex = _thisM.GetRandomIndexNumber(settings.fontClasses.length);
			randomFont = settings.fontClasses[randomFontIndex];
			// window.console && console.log(GetAscii(codeArray[i]));
			// capImg.append(capSpan().addClass(randomFont).html(' &#' + GetAscii(codeArray[i]) + '; '));
			_thisM._capImg.append(_thisM._capSpan().addClass(randomFont).html(' ' + codeArray[i] + ' '));
		}
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

	IsValidEntry(): boolean {
		var doesEntryMatch = false;
		// // window.console && console.log('rcs', this._randomCodeString.toLowerCase(), 'gciv()', this.GetCaptchaInputValue().toLowerCase().replace(/\s+/g, ''));
		// // doesEntryMatch = capInput.val() === randomCodeString;
		doesEntryMatch = this._randomCodeString.toLowerCase() === this.GetCaptchaInputValue().toLowerCase().replace(/\s+/g, '');
		if (!doesEntryMatch) {
			this._captchaErrorMsg.show();
		} else {
			this._captchaErrorMsg.hide();
		}
		return doesEntryMatch;
		// window.console && console.log('this', this);
		// return this._randomCodeString.toLowerCase() === this.GetCaptchaInputValue().toLowerCase().replace(/\s+/g, '');
	}

	Validate = () => {
		return this.IsValidEntry();
	}
}
