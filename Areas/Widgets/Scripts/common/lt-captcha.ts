/// <reference path="../../../../Scripts/typings/jquery/jquery.d.ts" />
interface ICaptchaSettings {
	imgId?: string;
	inputId?: string;
	resetId?: string;
	errorMsgId?: string;
	backgroundClasses?: string[];
	fontClasses?: string[];
	characters?: string;
	characterLength?: number;
	uniqueQualifier?: string;
}

class LoanTekCaptcha {

	private _randomCodeString: string;
	private _charArray: string[];
	private _captchaInput: JQuery;
	private _captchaErrorMsg: JQuery;
	private _capImg: JQuery;
	private _capSpan: () => JQuery;

	constructor(cjq: JQueryStatic, options?: ICaptchaSettings) {
		var _thisC = this;
		var settings: ICaptchaSettings = {
			imgId: 'ltCaptchaImg'
			, inputId: 'ltCaptchaInput'
			, resetId: 'ltCaptchaReset'
			, errorMsgId: 'ltCaptchaErrorMsg'
			, backgroundClasses: ['captcha01', 'captcha02', 'captcha03']
			// , fontClasses: ['font01', 'font02', 'font03', 'font04', 'font05', 'font06', 'font07', 'font08', 'font09', 'font10', 'font11', 'font12', 'font13']
			, fontClasses: ['alpha-sans', 'alpha-arial', 'alpha-comic-sans', 'alpha-consolas', 'alpha-courier', 'alpha-georgia', 'alpha-impact', 'alpha-palatino', 'alpha-trebuchet']
			, characters: '23456789ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
			, characterLength: 5
			, uniqueQualifier: ''
		};
		cjq.extend(settings, options);

		if (settings.uniqueQualifier && settings.uniqueQualifier.length > 0) {
			settings.imgId += '_' + settings.uniqueQualifier;
			settings.inputId += '_' + settings.uniqueQualifier;
			settings.resetId += '_' + settings.uniqueQualifier;
			settings.errorMsgId += '_' + settings.uniqueQualifier;
		}

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

	SetRandomCaptcha(settings: ICaptchaSettings) {
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

	SetCaptchaImg(settings: ICaptchaSettings, codeArray: string[]) {
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
