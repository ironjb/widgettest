/// <reference path="../../../../Scripts/typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
namespace LoanTekWidget {
	export class BuilderHelpers {

		constructor() {
			// code...
		}

		arrayMove(arr: any[], oldIndex: number, newIndex: number): any[] {
			while (oldIndex < 0) {
				oldIndex += arr.length;
			}
			while (newIndex < 0) {
				newIndex += arr.length;
			}
			if (newIndex >= arr.length) {
				newIndex = arr.length;
			}

			arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
			return arr;
		}
	}
	export class LoadScriptsInSequence {
		private _scriptSrcArray: string[];
		private _scriptRootDirectory: string;
		private _callbackFunction: Function;
		private _lth: LoanTekWidget.helpers;
		constructor(scriptSrcArray: string[], scriptRootDirectory?: string, callback?: Function) {
			var _thisC = this;
			_thisC._scriptSrcArray = scriptSrcArray || null;
			_thisC._scriptRootDirectory = scriptRootDirectory || '';
			_thisC._callbackFunction = callback || null;;

			_thisC._lth = LoanTekWidgetHelper;
		}

		addSrc(src: string) {
			this._scriptSrcArray.push(src);
			return this;
		}

		run() {
			var _thisC = this;
			var $ = _thisC._lth.$;
			var el = _thisC._lth.CreateElement();

			var currentIndex = 0;
			var lastIndex = this._scriptSrcArray.length - 1;
			var body = $('body')[0];

			function loadScript(i: number) {
				var scriptSrc = _thisC._scriptSrcArray[i];
				var script = el.script(_thisC._scriptRootDirectory + scriptSrc)[0];
				script.onload = function () {
					if (currentIndex < lastIndex) {
						currentIndex += 1;
						loadScript(currentIndex);
					} else {
						if (_thisC._callbackFunction) {
							_thisC._callbackFunction();
						}
					}
				};
				script.onerror = function (error) {
					window.console && console.error('error getting script. mission aborted.', error);
				};
				body.appendChild(script);
			}
			loadScript(currentIndex);
		}
	}
}
