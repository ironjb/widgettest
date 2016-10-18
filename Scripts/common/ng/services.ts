/// <reference path="../../typings/tsd.d.ts" />

interface ICommonNgServices {
	weekDays?: CommonNgServices.IWeekDayObject[];
	urlQualifier?: number;
	padZeros?(num: number, size: number): string;
	getObjectLength?(obj: Object): number;
	convertHourMinSecToDateTime?(time: string): Date;
	getDayOfWeekObject?(weekDayNumber: number): CommonNgServices.IWeekDayObject;
	scrollToAnchor?(anchorName: string, scrollSpeed?: number, scrollDelay?: number, topOffset?: number): void;
	isInvalidField?: CommonNgServices.IsInvalidField;
	spinnerModal?: CommonNgServices.ISpinnerModal;
	dataProcessingModal?: CommonNgServices.IModalDataProcessing;
	okModal?(okInfo: CommonNgServices.IOkInfo): void;
	confirmModal?(confirmInfo: CommonNgServices.IModalConfirmInfo): void;
	promptModal?(promptInfo: CommonNgServices.IModalPromptInfo): void;
}

declare namespace CommonNgServices {
	interface IWeekDayObject {
		id: number;
		short: string;
		name: string;
	}

	/////
	// Interfaces for isValidField
	/////
	interface IsInvalidField {
		(form: ng.IFormController, fieldName: string, validatorType?: string): boolean;
	}

	/////
	// Interfaces for Spinner Modal
	/////
	interface ISpinnerModal {
		(options?: ISpinnerModalOptions): void;
		close?(): void;
	}

	interface ISpinnerModalOptions extends ng.ui.bootstrap.IModalSettings {
		// animation?: boolean;
		// template?: string;
		// windowTemplateUrl?: string;
		// templateUrl?: string;
		// backdrop?: boolean | string;
		// keyboard?: boolean;
		// size?: string;
		modalCloseDelay?: number;
	}

	/////
	// Interfaces for Data Processing Modal
	/////
	interface IModalDataProcessing {
		(optionsArray: CommonNgServices.IModalDataProcessing_Options[], staticOptions?: CommonNgServices.IModalDataProcessing_StaticOptions): void;
	}
	interface IModalDataProcessing_Options {
		processingMessage?: string;
		httpOptions?: ng.IRequestConfig;
		onSuccessFunction?(result): void;
		onErrorFunction?(error): void;
	}

	interface IModalDataProcessing_StaticOptions {
		modalCloseDelay?: number;
		finalFunction?(): void;
	}

	//////
	// Interfaces for okModal
	//////
	interface IOkInfo {
		okOptions?: IOkInfo_OkOptions;
		okModelSize?: string;
		onOk?(): void;
	}

	interface IOkModalInstanceNgScope {
		settings: IOkInfo_OkOptions;
		okClick?(): void;
	}

	interface IOkInfo_OkOptions {
		okMessage?: string;
		okTitle?: string;
		okStyle?: string;
		okButtonText?: string;
	}

	/////
	// Interfaces for Confirm Modal
	/////
	interface IModalConfirmInfo {
		confirmSize?: string;
		backdrop?: boolean | string;
		confirmOptions?: IModalConfirmInfo_ConfirmOptions;
		onConfirm?(): void;
		onCancel?(): void;
	}

	interface IModalConfirmInfo_ModalInstanceNgScope extends ng.IScope {
		mdlSettings?: IModalConfirmInfo_ConfirmOptions;
		okClick?(): void;
		cancelClick?(): void;
	}

	interface IModalConfirmInfo_ConfirmOptions {
		message?: string;
		title?: string;
		headerStyle?: string;
		okBtnText?: string;
		cancelBtnText?: string;
	}

	/////
	// Interfaces for Prompt Modal
	/////
	interface IModalPromptInfo {
		promptSize?: string;
		backdrop?: boolean | string;
		onOk?(result): void;
		onCancel?(): void;
		promptOptions?: IModalPromptInfo_ModalInstanceOptions;
	}

	interface IModalPromptInfo_ModalInstanceNgScope extends ng.IScope {
		mdlSettings?: IModalPromptInfo_ModalInstanceOptions;
		promptText?: string;
		modelOptions?: Object;
		okClick?(form): void;
		cancelClick?():void;
	}

	interface IModalPromptInfo_ModalInstanceOptions {
		message?: string;
		title?: string;
		headerStyle?: string;
		okBtnText?: string;
		cancelBtnText?: string;
		promptTextRequired?: boolean;
		validateMessage?: string;
	}

}

(function () {
	var ltServices = angular.module('lt.services', ['ngSanitize']);
	var ngModelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
	ltServices.factory('commonServices', ['$uibModal', ($uibModal) => {
		var commonMethods: ICommonNgServices = {};
		commonMethods.weekDays = [
			{ id: 0, short: 'Su', name: 'Sunday' }
			, { id: 1, short: 'Mo', name: 'Monday' }
			, { id: 2, short: 'Tu', name: 'Tuesday' }
			, { id: 3, short: 'We', name: 'Wednesday' }
			, { id: 4, short: 'Th', name: 'Thursday' }
			, { id: 5, short: 'Fr', name: 'Friday' }
			, { id: 6, short: 'Sa', name: 'Saturday' }
		];
		commonMethods.urlQualifier = Math.floor((Math.random() * 999999999) + 1);
		commonMethods.padZeros = function (num: number, size: number) {
			var s = num + '';
			while (s.length < size) {
				s = '0' + s;
			}
			return s;
		};
		commonMethods.getObjectLength = function (obj: Object) {
			var count = 0;
			for (var i in obj) {
				if(obj.hasOwnProperty(i)) {
					count++;
				}
			}
			return count;
		}

		/**
		 * Converts a time string into Date object
		 * @param {string} time Should pass in string with format like '00:00:00' or 'HH:mm:ss'
		 */
		commonMethods.convertHourMinSecToDateTime = function (time: string, date: string = 'January 1, 1970') {
			var cDate: Date = new Date(date + ' ' + time);
			return cDate;
		};
		commonMethods.getDayOfWeekObject = function (weekNumber: number) {
			return commonMethods.weekDays[weekNumber];
		};
		commonMethods.scrollToAnchor = function (anchorName: string, scrollSpeed?: number, scrollDelay?: number, topOffset?: number) {
			scrollSpeed = scrollSpeed || 200;
			scrollDelay = scrollDelay || 0;
			topOffset = topOffset || 75;
			var anchorElement = angular.element('a[name=' + anchorName + ']');
			if (anchorElement.offset()) {
				angular.element('html, body').delay(scrollDelay).animate({
					scrollTop: (anchorElement.offset().top) - topOffset
				}, scrollSpeed);
			} else {
				window.console && console.error('Can not find anchor element by name of ' + anchorName);
			}
		};
		commonMethods.isInvalidField = function (form: ng.IFormController, fieldName: string, validatorType?: string) {
			// window.console && console.log('form', form);
			validatorType = validatorType || 'required';
			var isInvalid: boolean = false;
			var field: ng.INgModelController = form[fieldName];
			var isErrorPresentForType: boolean = field ? field.$error[validatorType]: false;
			// window.console && console.log('field.$error', field.$error);
			if (form.$submitted || (field && field.$touched)) {
				isInvalid = isErrorPresentForType || false;
			}
			return isInvalid;
		};
		commonMethods.spinnerModal = function (options?: CommonNgServices.ISpinnerModalOptions) {
			// var _thisController = ['$scope', '$uibModalInstance', 'httpOptionsArray', function ($scope, $uibModalInstance, iOptions) {
			// 	//
			// }];
			var settings: CommonNgServices.ISpinnerModalOptions = {
				animation: true
				, template: null
				, windowTemplateUrl: 'template/modal-template/empty.html'
				, templateUrl: 'template/modal/fa-spinner.html'
				, backdrop: 'static'
				, keyboard: false
				, size: 'sm'
				, modalCloseDelay: 200
			};
			angular.extend(settings, options);

			var modalInstance = $uibModal.open({
				animation: settings.animation
				, template: settings.template
				, windowTemplateUrl: settings.windowTemplateUrl
				, templateUrl: settings.templateUrl
				// , controller: _thisController
				, backdrop: settings.backdrop
				, keyboard: settings.keyboard
				, size: settings.size
				// , resolve: {
				// 	iOptions: function () { return options; }
				// }
			});

			this.close = function() {
				setTimeout(function () {
					modalInstance.close();
				}, settings.modalCloseDelay)
			};
		};
		/**
		 * Displays spinner in modal screen while data is processed
		 *
		 * @param  {array of objects} optionsArray		// An array of objects. See below for example of object
			{
				httpOptions: {
					// This object should contain what you wish to pass to the angular $http() service.
				},
				onSuccessFunction:  function (result) {
					// Optional: code you wish to perform after success of the $http() service.
				},
				onErrorFunction: function (error) {
					// Optional: code you wish to perform after error of the $http() service.
				}
			}
		 * @param  {object} staticOptions				// [Optional] Object that contains final instructions after all data processing. See below
			{
				modalCloseDelay: 200		// number of milliseconds to delay modal close
				finalFunction: function() {
					// [Optional] code you wish to perform after ALL the $http() services have been completed successfully.
				}
			}
		 * @return {none}								// no return type
		 */
		commonMethods.dataProcessingModal = function (optionsArray: CommonNgServices.IModalDataProcessing_Options[], staticOptions: CommonNgServices.IModalDataProcessing_StaticOptions) {
			if (!$.isArray(optionsArray)) {
				optionsArray = [optionsArray];
			}
			var settings: CommonNgServices.IModalDataProcessing_StaticOptions = { modalCloseDelay: 200 };
			angular.extend(settings, staticOptions);

			var _thisController = ['$scope', '$uibModalInstance', '$http', '$timeout', 'httpOptionsArray', function ($scope, $uibModalInstance, $http: ng.IHttpService, $timeout, httpOptionsArray: CommonNgServices.IModalDataProcessing_Options[]) {
				var index = 0;
				var arrLength = httpOptionsArray.length;

				var httpProcess = function (index) {
					var proccessSettings: CommonNgServices.IModalDataProcessing_Options = { processingMessage: 'Processing'};
					angular.extend(proccessSettings, httpOptionsArray[index]);

					$scope.processingMessage = proccessSettings.processingMessage;

					$http(proccessSettings.httpOptions).then(function (result) {
						//Calls success function if it exists
						proccessSettings.onSuccessFunction && proccessSettings.onSuccessFunction(result);

						//Calls this function again if current index is less than the array length
						index++;
						if (index < arrLength) {
							httpProcess(index);
						} else {
							//closes modal after final loop
							$timeout(function () {
								//Calls a final function after closing
								settings.finalFunction && settings.finalFunction();

								$uibModalInstance.close(result);
							}, settings.modalCloseDelay);
						}
					}, function (error) {
						$timeout(function () {
							proccessSettings.onErrorFunction && proccessSettings.onErrorFunction(error);
							$uibModalInstance.dismiss(error);
						}, settings.modalCloseDelay);
					});
				};
				httpProcess(index);
			}];
			var modalInstance = $uibModal.open({
				animation: true,
				windowTemplateUrl: 'template/modal-template/empty.html',
				templateUrl: 'template/modal/process-spinner.html',
				controller: _thisController,
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					httpOptionsArray: function () { return optionsArray; }
				}
			});
		};
		/**
		 * Displays an information window with only an OK button
		 *
		 * @param  {object} okInfo						// Pass object to control the modal
		 {
			okOptions: {
				okTitle: ''								// [text only allowed], default: $rootScope.strings.heading_ok_modal_title
				, okMessage: ''							// [text or html allowed], default: '_'
				, okStyle: 'alert alert-warning'		// options: ['alert alert-success' | 'alert alert-info' | 'alert alert-warning' | 'alert alert-danger'], default 'alert alert-warning'
				, okButtonText: 'OK'					// [text only], default: $rootScope.strings.button_ok
			},
			onOk: function() {
				// code to perform on close of okModal
			}
		 }
		 * @return {none}							// no return type
		 */
		commonMethods.okModal = function (okInfo: CommonNgServices.IOkInfo) {
			var okInfoDefaults: CommonNgServices.IOkInfo = { okModelSize: 'sm' };
			var okInfoSettings = angular.extend(okInfoDefaults, okInfo);

			var _thisController = ['$scope', '$uibModalInstance', 'okOptions', function ($scope: CommonNgServices.IOkModalInstanceNgScope, $uibModalInstance, okOptions: CommonNgServices.IOkInfo_OkOptions) {
				var okOptdefaults: CommonNgServices.IOkInfo_OkOptions = {
					okMessage: '_'
					, okTitle: 'Notice:'
					, okStyle: 'alert alert-warning'
					, okButtonText: 'Ok'
				};
				$scope.settings = angular.extend(okOptdefaults, okOptions);

				$scope.okClick = function () {
					$uibModalInstance.close();
				};
			}];
			var modelInstance = $uibModal.open({
				templateUrl: 'template/modal/ok.html',
				controller: _thisController,
				size: okInfoSettings.okModelSize,
				resolve: {
					okOptions: function () { return okInfo.okOptions; }
				}
			});
			modelInstance.result.then(function (result) {
				okInfo.onOk && okInfo.onOk();
			}, function (error) {
				okInfo.onOk && okInfo.onOk();
			});
		};
		/**
		 * Confirm Modal: Based off the Angular UI Bootstrap modal (http://angular-ui.github.io/bootstrap/#/modal)
		 * Allows the creation of a popup modal to make a confirmation similar to window.confirm()
		 * @param  {object} confirmInfo [the following object is an example of what can be passed for confirmInfo]
		 	{
				confirmSize: 'sm',									// options: ['sm' | 'md' | 'lg'], default: 'sm'
				backdrop: true,										// options: [true | false | 'static'], default: true		('static' - backdrop is present but modal window is not closed when clicking outside of the modal window)
				confirmOptions: {
					message: '',									// [text or html allowed], default: ''
					title: 'Confirm:',								// [text only allowed], default: 'Conform:'
					headerStyle: 'alert alert-warning',				// options: ['alert alert-success' | 'alert alert-info' | 'alert alert-warning' | 'alert alert-danger'], default 'alert alert-warning'
					okBtnText: 'OK',								// [text only], default: 'OK'
					cancelBtnText: 'Cancel'							// [text only], default: 'Cancel'
				},
				onConfirm: function () {
					// code to perform on Confirm
				},
				onCancel: function () {
					// code to perform on Cancel
				}
			}
		 *
		 * @return {none}             no return type
		 */
		commonMethods.confirmModal = function (confirmInfo: CommonNgServices.IModalConfirmInfo) {
			// window.console && console.log(confirmInfo);
			var settings: CommonNgServices.IModalConfirmInfo = { confirmSize: 'sm', backdrop: true, onConfirm: null, onCancel: null };
			angular.extend(settings, confirmInfo);

			var _thisController = ['$scope', '$uibModalInstance', 'confirmOptions', function ($scope: CommonNgServices.IModalConfirmInfo_ModalInstanceNgScope, $uibModalInstance, confirmOptions: CommonNgServices.IModalConfirmInfo_ConfirmOptions) {
				var confirmOptDefaults = { message: '', title: 'Confirm:', headerStyle: 'alert alert-warning', okBtnText: 'OK', cancelBtnText: 'Cancel' };
				$scope.mdlSettings = angular.extend(confirmOptDefaults, confirmOptions)
				$scope.okClick = function () {
					$uibModalInstance.close();
				};
				$scope.cancelClick = function () {
					$uibModalInstance.dismiss();
				};
			}];
			var modalInstance = $uibModal.open({
				templateUrl: 'template/modal/confirm.html',
				controller: _thisController,
				size: settings.confirmSize,
				backdrop: settings.backdrop,
				resolve: {
					confirmOptions: function () { return confirmInfo.confirmOptions }
				}
			});

			modalInstance.result.then(function () {
				settings.onConfirm && settings.onConfirm();
			}, function () {
				settings.onCancel && settings.onCancel();
			});
		};

		/**
		 * Prompt Modal: Based off the Angular UI Bootstrap modal (http://angular-ui.github.io/bootstrap/#/modal)
		 * Allows the creation of a popup modal to make a prompt similar to window.prompt()
		 * @param  {object} promptInfo [the following object is an example of what can be passed for promptInfo]
		 	{
				promptSize: 'sm',									// options: ['sm' | 'md' | 'lg'], default: 'sm'
				backdrop: true,										// options: [true | false | 'static'], default: true		('static' - backdrop is present but modal window is not closed when clicking outside of the modal window)
				promptOptions: {
					message: '',									// [text or html allowed], default: ''
					title: 'Confirm:',								// [text only allowed], default: 'Conform:'
					headerStyle: 'alert alert-warning',				// options: ['alert alert-success' | 'alert alert-info' | 'alert alert-warning' | 'alert alert-danger'], default 'alert alert-warning'
					okBtnText: 'OK',								// [text only], default: 'OK'
					cancelBtnText: 'Cancel'							// [text only], default: 'Cancel'
				},
				onOk: function () {
					// code to perform on Confirm
				},
				onCancel: function () {
					// code to perform on Cancel
				}
			}
		 *
		 * @return {none}             no return type
		 */
		commonMethods.promptModal = function (promptInfo: CommonNgServices.IModalPromptInfo) {
			var settings: CommonNgServices.IModalPromptInfo = { promptSize: 'sm', backdrop: true, onOk: null, onCancel: null };
			angular.extend(settings, promptInfo);

			var _thisController = ['$scope', '$uibModalInstance', 'promptOptions', function ($scope: CommonNgServices.IModalPromptInfo_ModalInstanceNgScope, $uibModalInstance, promptOptions: CommonNgServices.IModalPromptInfo_ModalInstanceOptions) {
				var confirmOptDefaults: CommonNgServices.IModalPromptInfo_ModalInstanceOptions = {
					message: ''
					, title: 'Confirm:'
					, headerStyle: 'alert alert-info'
					, okBtnText: 'OK'
					, cancelBtnText: 'Cancel'
					, promptTextRequired: true
					, validateMessage: 'Required!'
				};
				$scope.modelOptions = ngModelOptions;
				$scope.mdlSettings = angular.extend(confirmOptDefaults, promptOptions)
				$scope.okClick = function (form) {
					form.promptText.$setDirty();
					if (form.$valid) {
						$uibModalInstance.close($scope.promptText);
					}
				};
				$scope.cancelClick = function () {
					$uibModalInstance.dismiss();
				};
			}];
			var modalInstance = $uibModal.open({
				// templateUrl: '/Widgets/Home/AngularTemplates/modalPrompt?t=' + new Date().getTime()
				templateUrl: 'template/modal/prompt.html'
				, controller: _thisController
				, size: settings.promptSize
				, backdrop: settings.backdrop
				, resolve: {
					promptOptions: function () { return promptInfo.promptOptions }
				}
			});

			modalInstance.result.then(function (result) {
				settings.onOk && settings.onOk(result);
			}, function () {
				settings.onCancel && settings.onCancel();
			});
		};
		return commonMethods;
	}]);
	ltServices.run(['$templateCache', function ($templateCache) {
		$templateCache.put('template/modal-template/empty.html', `
			<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal vertical-center" modal-animation-class="fade"
				ng-class="{in: animate}" ng-style="{'z-index': 1050 + index*10, display: 'block'}" ng-click="close($event)">
				<div class="modal-dialog" ng-class="size ? 'modal-' + size : ''"><div class="modal-content-empty" ng-transclude></div></div>
			</div>
		`);
		$templateCache.put('template/modal/confirm.html', `
			<div class="modal-header modal-header-alert" data-ng-class="mdlSettings.headerStyle">
				<h4 class="modal-title">{{mdlSettings.title}}</h4>
			</div>
			<div class="modal-body">
				<div data-ng-bind-html="mdlSettings.message"></div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" data-ng-click="okClick();" autofocus="autofocus">{{mdlSettings.okBtnText}}</button>
				<button class="btn btn-default" data-ng-click="cancelClick();">{{mdlSettings.cancelBtnText}}</button>
			</div>
		`);
		$templateCache.put('template/modal/prompt.html', `
			<form name="promptModalForm" id="promptModalForm" class="form-horizontal" data-ng-submit="okClick(promptModalForm);" novalidate="novalidate">
				<div class="modal-header modal-header-alert" data-ng-class="mdlSettings.headerStyle">
					<h4 class="modal-title">{{mdlSettings.title}}</h4>
				</div>
				<div class="modal-body">
					<div data-ng-bind-html="mdlSettings.message"></div>
					<div class="row">
						<div class="col-sm-12">
							<input type="text" name="promptText" id="promptText" class="form-control" data-ng-model="promptText" data-ng-required="mdlSettings.promptTextRequired" data-ng-model-options="modelOptions" autofocus="autofocus" />
						</div>
					</div>
					<div class="text-danger" data-ng-show="promptModalForm.promptText.$error.required &amp;&amp; promptModalForm.promptText.$dirty" data-ng-bind-html="mdlSettings.validateMessage"></div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-primary" type="submit">{{mdlSettings.okBtnText}}</button>
					<button class="btn btn-default" data-ng-click="cancelClick();">{{mdlSettings.cancelBtnText}}</button>
				</div>
			</form>
		`);
		$templateCache.put('template/modal/ok.html', `
			<div class="modal-header modal-header-alert" data-ng-class="settings.okStyle">
				<h4 class="modal-title">{{settings.okTitle}}</h4>
			</div>
			<div class="modal-body">
				<div data-ng-bind-html="settings.okMessage"></div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" id="okModalButton" data-ng-click="okClick();" autofocus><span class="glyphicon glyphicon-ok"></span> <span data-ng-bind="settings.okButtonText"></span></button>
			</div>
		`);
		$templateCache.put('template/modal/process-spinner.html', `
			<div class="modal-processing text-center">
				<h3><img src="/Content/images/spinner.gif" alt="" /> {{processingMessage}}</h3>
			</div>
		`);
		$templateCache.put('template/modal/fa-spinner.html', `
			<div class="text-center spinner-color">
				<i class="fa fa-circle-o-notch fa-5x fa-spin"></i>
			</div>
		`);
	}]);
})();