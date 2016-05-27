/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/jquery.placeholder/jquery.placeholder.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-animate.d.ts" />
/// <reference path="../../../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../common/interfaces-widget.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

(function ($: JQueryStatic) {
	$('input textarea').placeholder();
	var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates'/*, 'ngSanitize'*/]/*, function($compileProvider) {
		// configure new 'compile' directive by passing a directive
		// factory function. The factory function injects the '$compile'
		$compileProvider.directive('compile', function($compile) {
			// directive factory creates a link function
			return function(scope, element, attrs) {
				scope.$watch(
					function(scope) {
						// watch the 'compile' expression for changes
						return scope.$eval(attrs.compile);
					},
					function(value) {
						// when the 'compile' expression changes
						// assign it into the current DOM
						element.html(value);

						// compile the new DOM and link it to the current
						// scope.
						// NOTE: we only compile .childNodes so that
						// we don't get into infinite loop compiling ourselves
						$compile(element.contents())(scope);
					}
				);
			};
		});
	}*/);
	var ltm = new LoanTekWidgetHelpers.methods($);
	var ltp = new LoanTekWidgetHelpers.properties();
	window.console && console.log('ltp', ltp.hsize.h1.id);
	var el = ltm.CreateElement();
	var wwwRoot = window.location.port === '8080' ? '' : '//www.loantek.com';
	var contactWidgetCSS: string[] = [
		'/css/widget.css'
	];
	var contactWidgetScripts: string[] = [
		'/js/lib/jquery.min.js'
		, '/js/lib/jquery.placeholder.min.js'
		, '/js/loantek-manual-contact-widget.js'
	];

	widgetBuilderApp.controller('ContactWidgetBuilderController', ['$scope'/*, 'widgetServices', '$sce', '$timeout'*/, function($scope/*, widgetServices, $sce, $timeout*/) {
		// $scope.myInfo = 'me';
		// $scope.ltFormEditTool = {
		// 	currentForm: $scope.currentForm
		// 	, WidgetScriptBuild: WidgetScriptBuild
		// };
		var contactWidget: IWidget = {
			prebuiltForms: [
				{
					name: 'Default Contact Widget',
					// formFieldBorderRadius: 12,
					template: {
						// fieldSize: ltm.bootstrap.inputSizing.sm,
						panelTitle: 'Contact Us',
						fields: [
							{ field: 'clientid' }
							, { field: 'userid' }
							// , { field: 'title', value: 'Contact Us', nsize: 5 }
							, { field: 'firstname', cols: 2 }
							, { field: 'lastname' }
							, { field: 'email' }
							, { field: 'phone' }
							, { field: 'company' }
							, { field: 'state' }
							, { field: 'comments' }
							// , { element: 'input', type: 'file' }
							, { field: 'captcha' }
							, { field: 'submit' }
						]
					}
				},
				{
					name: 'Small Contact Widget',
					formWidth: 380,
					formWidthUnit: ltp.widthUnit.px.id,
					formBg: '#def',
					formBorderRadius: 0,
					formBorderColor: '#08f',
					formTitleColor: '#ddf',
					formTitleBgColor: '#06d',
					formGroupSpacing: 4,
					formFieldBorderRadius: 0,
					formButtonBorderRadius: 0,
					template: {
						// formBorderType: ltm.formBorderType.well.id,
						formBorderType: ltp.formBorderType.panel.id,
						panelTitle: 'Contact Us',
						fieldSize: ltp.bootstrap.inputSizing.sm.id,
						fields: [
							{ field: 'clientid' }
							, { field: 'userid' }
							, { field: 'firstname', cols: 12 }
							, { field: 'lastname', cols: 12 }
							, { field: 'email', cols: 12 }
							, { field: 'phone', cols: 12 }
							, { field: 'company', cols: 12 }
							, { field: 'state', cols: 12 }
							, { field: 'comments' }
							, { field: 'captcha' }
							, { field: 'submit' }
						]
					}
				}
			],
			allAvailableFields: [
				{ id: 'clientid', name: 'Client ID', isLTRequired: true, hideFromList: true, fieldTemplate: { field: 'clientid' } }
				, { id: 'userid', name: 'User Id', isLTRequired: true, hideFromList: true, fieldTemplate: { field: 'userid' } }
				, { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { field: 'firstname' } }
				, { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { field: 'lastname' } }
				, { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { field: 'email' } }
				, { id: 'phone', name: 'Phone', fieldTemplate: { field: 'phone' } }
				, { id: 'company', name: 'Company', fieldTemplate: { field: 'company' } }
				, { id: 'state', name: 'State', fieldTemplate: { field: 'state' } }
				, { id: 'comments', name: 'Comments', fieldTemplate: { field: 'comments' } }
				, { id: 'captcha', name: 'Captcha', fieldTemplate: { field: 'captcha' } }
				, { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { field: 'submit' } }
				, { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { field: 'title ' } }
				, { id: 'p', name: 'Paragraph', allowMultiples: true, fieldTemplate: { field: 'p' } }
			]
		};

		var WidgetScriptBuild = (currentFormObj: IWidgetObject) => {
			// $scope.currentForm = currentFormObj;
			var ct: IWidgetObject = angular.copy(currentFormObj);
			var cfo: IWidgetFormObject = angular.copy(ct.template);
			var cfod: IWidgetFormObject = angular.copy(ct.template);
			var wScript: string = '<style type="text/css">.ltcw {display:none;}</style>';
			var wScriptDisplay: string = wScript;
			var hasCaptchaField = ltm.GetIndexOfFirstObjectInArray(cfo.fields, 'field', 'captcha') >= 0;
			var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
			var formStyles = '';
			cfod.showBuilderTools = true;
			cfo.postDOMCallback = '#fn{postDOMFunctions}';
			cfod.postDOMCallback = '#fn{postDOMFunctions}';

			// Add CSS files
			for (var iCss = 0, lCss = contactWidgetCSS.length; iCss < lCss; iCss++) {
				var cssHref = contactWidgetCSS[iCss];
				var cssLink = ltm.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
				wScript += cssLink;
				wScriptDisplay += cssLink;
			}

			if (ct.formWidth) {
				ct.formWidthUnit = ct.formWidthUnit || ltp.widthUnit.per.id;
				formStyles += '\n.ltcw { width: ' + ct.formWidth + ct.formWidthUnit + '; }';
			}

			if (ct.formBg) {
				formStyles += '\n.ltcw .lt-widget-border { background-color: ' + ct.formBg + '; }';
			}

			// window.console && console.log('ltm formBorder type 2', ltm.formBorderType2);

			if (!isNaN(ct.formBorderRadius)) {
				var fbr = ct.formBorderRadius + '';
				var fbhr = ct.formBorderRadius - 1 < 0 ? '0' : (ct.formBorderRadius - 1) + '';
				formStyles += '\n.ltcw .lt-widget-border { border-radius: ' + fbr + 'px; }';
				if (ct.template.formBorderType === ltp.formBorderType.panel.id) {
					formStyles += '\n.ltcw .lt-widget-border .lt-widget-heading { border-top-right-radius: ' + fbhr + 'px; border-top-left-radius: ' + fbhr + 'px; }';
				}
			}

			if (ct.formBorderColor) {
				// if (ct.template.formBorderType === ltm.formBorderType.panel.id) {
				formStyles += '\n.ltcw .lt-widget-border, .ltcw .lt-widget-border .lt-widget-heading { border-color: ' + ct.formBorderColor + '; }';
				// } else if (ct.template.formBorderType === ltm.formBorderType.well.id) {
				// 	formStyles += '\n.ltcw .lt-widget-border { border-color: ' + ct.formBorderColor + '}';
				// }
			}

			if (ct.formTitleColor) {
				formStyles += '\n.ltcw .lt-widget-heading, .ltcw .lt-widget-border .lt-widget-heading  { color: ' + ct.formTitleColor + '; }';
			}

			if (ct.formTitleBgColor) {
				formStyles += '\n.ltcw .lt-widget-heading, .ltcw .lt-widget-border .lt-widget-heading  { background-color: ' + ct.formTitleBgColor + '; }';
			}

			if (!isNaN(ct.formGroupSpacing)) {
				formStyles += '\n.ltcw .form-group, .ltcw .alert { margin-bottom: ' + ct.formGroupSpacing + 'px; }';
			}

			// window.console && console.log(ct.formFieldBorderRadius);
			if (!isNaN(ct.formFieldBorderRadius)) {
				var ffbr = ct.formFieldBorderRadius + '';
				var ffbhr = ct.formFieldBorderRadius - 1 < 0 ? '0' : (ct.formFieldBorderRadius - 1) + '';
				formStyles += '\n.ltcw .form-group .form-control, .ltcw .alert { border-radius: ' + ffbr + 'px; }';
				if (hasCaptchaField) {
					formStyles += '\n.ltcw .lt-captcha .panel { border-radius: ' + ffbr + 'px; }';
					formStyles += '\n.ltcw .lt-captcha .panel-heading { border-top-right-radius: ' + ffbhr + 'px; border-top-left-radius: ' + ffbhr + 'px; }';
				}
			}

			if (!isNaN(ct.formButtonBorderRadius)) {
				formStyles += '\n.ltcw .btn { border-radius: ' + ct.formButtonBorderRadius + 'px; }';
			}

			var styleWrap = '\n<style type="text/css">#{styles}\n</style>';
			if (formStyles) {
				wScript += ltm.Interpolate(styleWrap, { styles: formStyles });
				wScriptDisplay += ltm.Interpolate(styleWrap, { styles: formStyles });
			}

			// Add Widget Wrapper
			var widgetWrapper = '\n<div id="ltWidgetWrapper"></div>';
			wScript += widgetWrapper;
			wScriptDisplay += widgetWrapper;

			// Add scripts
			for (var iScript = 0; iScript < contactWidgetScripts.length; iScript++) {
				var scriptSrc = contactWidgetScripts[iScript];
				var scriptLink = ltm.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
				wScript += scriptLink;
				// DO NOT ADD for wScriptDisplay, it will cause a "Synchronous XMLHttpRequest..." error
				// Instead, each of these scripts should be added already to the builder page.
			}

			// Build Main Script
			var mainScript = '';
			var mainScriptDisplay = '';

			// Captcha var
			var captchaVar = `
				var ltCaptcha;`;
			if (hasCaptchaField) {
				mainScript += captchaVar;
				mainScriptDisplay += captchaVar;
			}

			// PostDOMFunctions
			var postDomCode = '/*code ran after DOM created*/', postDomFn = `
			var postDOMFunctions = function () {
				#{code}
			};`;
			if (hasCaptchaField) {
				postDomCode += `
					ltCaptcha = new LoanTekCaptcha();`;
			}
			mainScript += ltm.Interpolate(postDomFn, { code: postDomCode });
			mainScriptDisplay += ltm.Interpolate(postDomFn, { code: postDomCode });

			// External Validator
			var extValid = `
			var externalValidators = function () {
				#{validReturn}
			};`;
			if (hasCaptchaField) {
				extValid = ltm.Interpolate(extValid, { validReturn: 'return ltCaptcha.IsValidEntry();' });
			} else {
				extValid = ltm.Interpolate(extValid, { validReturn: 'return true;' });
			}
			mainScript += extValid;
			mainScriptDisplay += extValid;

			// Add buildObject to mainScript
			var buildObjectWrap = `
			var loanTekManualContactWidgetBuildObject = #{bow};`;
			var cfoString = JSON.stringify(cfo/*, null, 2*/);
			var cfodString = JSON.stringify(cfod/*, null, 2*/);
			mainScript += ltm.Interpolate(buildObjectWrap, { bow: cfoString });
			mainScriptDisplay += ltm.Interpolate(buildObjectWrap, { bow: cfodString });

			// Add Execution of LoanTekBuildForm
			var exBuildForm = `
			LoanTekBuildForm(loanTekManualContactWidgetBuildObject);`;

			mainScript += exBuildForm;
			mainScriptDisplay += exBuildForm;

			// Widget Options Object setup
			var ltWidgetOptions = {
				// postUrl: 'http://node-cors-server.herokuapp.com/no-cors',
				postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
				// redirectUrl: 'http://www.google.com',
				externalValidatorFunction: '#fn{externalValidators}',
				successMessage: 'Yay!!! Successful POST'
			};

			var ltWidgetOptionsWrap = `
			var loanTekManualContactWidgetOptions = #{cwow};`;
			mainScript += ltm.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions/*, null, 2*/) });
			mainScriptDisplay += ltm.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions/*, null, 2*/) });

			// Add Execution of Contact Widget
			var contactWidget = `
			LoanTekManualContactWidget(loanTekManualContactWidgetOptions);`;
			mainScript += contactWidget;
			mainScriptDisplay += contactWidget;

			mainScript = ltm.Interpolate(mainScript, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);
			mainScriptDisplay = ltm.Interpolate(mainScriptDisplay, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);

			// Wrap Main Script
			var mainScriptWrap = `
			<script type="text/javascript">
			(function () {#{m}
			})();
			</script>`;
			mainScript = ltm.Interpolate(mainScriptWrap, { m: mainScript });
			mainScriptDisplay = ltm.Interpolate(mainScriptWrap, { m: mainScriptDisplay });

			wScript += mainScript;
			wScriptDisplay += mainScriptDisplay;

			wScript = wScript.replace(/\s+/gm, ' ');
			$scope.widgetScript = wScript;
			$scope.widgetScriptDisplay = wScriptDisplay;
			// $scope.widgetDisplay = $sce.trustAsHtml($scope.widgetScriptDisplay);
			// window.console && console.log('typeof $scope.widgetScriptDisplay', typeof $scope.widgetScriptDisplay);
			// window.console && console.log('typeof $scope.widgetDisplay', typeof $scope.widgetDisplay);
			// $('#demoHtml').html($scope.widgetScriptDisplay);

			ltm.ScrollToAnchor('widgetTop');
			// $scope.scriptChangedClass = '';
			// window.console && console.log('change class', $scope.scriptChangedClass);
			// $scope.scriptChangedClass = 'example-test';
			// window.console && console.log('change class 2', $scope.scriptChangedClass);
			// $timeout(() => {
			$scope.scriptChangedClass = 't' + new Date().getTime();
			// });
		};

		$scope.RunWidgetScriptBuild = (currentForm) => {
			WidgetScriptBuild(currentForm);
		};

		$scope.UsePrebuiltForm = () => {
			$scope.selectedForm = $scope.selectedForm || $scope.currentWidget.prebuiltForms[0];		// selects first template if not selected already
			$scope.currentForm = angular.copy($scope.selectedForm);
			window.console && console.log($scope.selectedForm);
			// $scope.currentFormObject = angular.copy($scope.selectedForm.template);
			WidgetScriptBuild($scope.currentForm);
		};

		var BuilderInit = () => {
			$scope.currentWidget = angular.copy(contactWidget);
			$scope.UsePrebuiltForm();
		};
		BuilderInit();
	}]);

	//////////////
	// Services //
	//////////////
	var ltWidgetServices = angular.module('ltw.services', []);
	ltWidgetServices.factory('widgetServices', ['$uibModal', ($uibModal) => {
		var widgetMethods = {
			editForm: (/*currentForm: IWidgetObject, */options) => {
				// window.console && console.log('service editForm currentForm: ', currentForm);
				var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
				angular.extend(settings, options);
				window.console && console.log('settings', settings);

				var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', ($scope, $uibModalInstance, intanceOptions) => {

					$scope.modForm = angular.copy(intanceOptions.currentForm);
					$scope.borderTypes = angular.copy(ltp.formBorderTypeArray);
					// window.console && console.log('$scope.borderTypes', $scope.borderTypes);
					// $scope.borderTypes.push({ id: '', name: 'None' });
					if (!$scope.modForm.template.formBorderType) {
						$scope.modForm.template.formBorderType = ltp.formBorderType.none.id;
					}

					$scope.saveClick = () => {
						var newForm: IWidgetObject = angular.copy($scope.modForm);
						newForm.name = 'modified';
						// ltm.hn.h2

						if (!newForm.template.formBorderType || newForm.template.formBorderType === ltp.formBorderType.none.id) {
							delete newForm.template.formBorderType;
							delete newForm.formTitleBgColor;
						}
						// intanceOptions.saveForm(newForm);
						// cWidget = angular.copy($scope.modForm);
						// $scope.WidgetScriptBuild(cWidget);
						$uibModalInstance.close(newForm);
					};

					$scope.cancelClick = () => {
						$uibModalInstance.dismiss();
					};
				}];

				var modalInstance = $uibModal.open({
					// templateUrl: 'template/modal/editForm.html'
					templateUrl: '/template.html?t=' + new Date().getTime()
					, controller: modalCtrl
					, size: settings.modalSize
					, resolve: {
						instanceOptions: () => { return settings.instanceOptions }
					}
				});

				modalInstance.result.then((result) => {
					window.console && console.log('modal save result', result);
					settings.saveForm(result);
				}, (error) => {
					window.console && console.log('modal close');
				});
			}
		};
		return widgetMethods;
	}]);

	////////////////
	// Directives //
	////////////////
	var widgetDirectives = angular.module('ltw.directives', []);
	// widgetDirectives.directive('ltContactWidgetScript', [function() {
	// 	return {
	// 		restrict: 'AEC',
	// 		// replace: true,
	// 		scope: {
	// 			lcws: '=ltContactWidgetScript'
	// 		},
	// 		templateUrl: 'template/contactWidgetScript.html',
	// 		link: (scope) => {
	// 			// window.console && console.log('scope', scope);
	// 			// window.console && console.log('scope ltContactWidgetScript', scope.lcws);
	// 		}
	// 	};
	// }]);
	widgetDirectives.directive('ltCompileCode', [/*'$parse', */'$compile', function(/*$parse, */$compile) {
		return {
			restrict: 'A'
			// , require: 'ngBindHtml'
			, link: (scope, elem, attrs) => {
				// window.console && console.log('attrs.ngBindHtml', typeof attrs.ngBindHtml);
				// var thisNgBindHtml = $parse(attrs.ngBindHtml);

				// scope.$watch(thisNgBindHtml, function () {
				// 	window.console && console.log('watch triggered');
				// });
				scope.$watch(attrs.ltCompileCode/*function(scope) {
					window.console && console.log('watching');
					window.console && console.log('attrs.ltCompileCode', attrs.ltCompileCode);
					return scope.$eval();
				}*/, function(value) {
						// window.console && console.log(value);
						// window.console && console.log('watching: ', attrs.ltCompileCode);
						elem.html(value);
						$compile(elem.contents())(scope);
					});
			}
		};
	}]);
	widgetDirectives.directive('ltFormEditTool', ['widgetServices', function(widgetServices) {
		return {
			restrict: 'A'
			, templateUrl: 'template/widgetFormEditButton.html'
			// , scope: {
			// 	ltFormEditTool: '=ltFormEditTool'
			// }
			, link: (scope, elem, attrs) => {
				scope.EditWigetForm = () => {
					// window.console && console.log('code to edit form', scope.currentForm);
					var formEditOptions = {
						instanceOptions: {
							currentForm: angular.copy(scope.currentForm)
						}
						, saveForm: (updatedForm) => {
							window.console && console.log('saveForm');
							scope.currentForm = updatedForm;
							scope.selectedForm = {};
							scope.RunWidgetScriptBuild(scope.currentForm);
						}
					};
					widgetServices.editForm(formEditOptions);
					// window.console && console.log('scope.currentForm', scope.currentForm);
					// scope.currentForm.formWidth = 50;
					// scope.WidgetScriptBuild(scope.currentForm);
					// window.console && console.log('scope.currentForm', scope.currentForm);
				};
			}
		};
	}]);
	// widgetDirectives.directive('ltWidgetTool', ['$parse', function($parse) {
	// 	return {
	// 		link: (scope, elem, attrs) => {
	// 			var thisWigetTool = $parse(attrs.ltWidgetTool);
	// 			window.console && console.log('widget directive running', attrs.ltWidgetTool, thisWigetTool(scope));
	// 		}
	// 	};
	// }]);
	angular.module('ltw.templates', []).run(['$templateCache', function($templateCache) {
		$templateCache.put('template/widgetFormEditButton.html', `
			<button type="button" class="btn btn-default btn-xs btn-tool" data-ng-click="EditWigetForm();"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
		`);
		$templateCache.put('template/modal/editForm.html', `
		<form class="form-horizontal" data-ng-submit="saveClick();">
			<div class="modal-header alert alert-info">
				<h3 class="modal-title">Edit Widget Form</h3>
			</div>
			<div class="modal-body">
				<div class="form-group form-group-sm">
					<label for="ltewBorderType" class="col-sm-2 control-label">Border Type</label>
					<div class="col-sm-6">
						<!-- <select name="ltewBorderType" id="ltewBorderType" class="form-control" data-ng-model="modForm.template.formBorderType" data-ng-options="btype.id as btype.name for btype in borderTypes">
							<option value="">None</option>
						</select> -->
						<div class="btn-group btn-group-sm">
							<label class="btn btn-primary" data-ng-model="modForm.template.formBorderType" uib-btn-radio="btype.id" data-ng-repeat="btype in borderTypes track by btype.id">{{btype.name}}</label>
						</div>
					</div>
					<div class="col-sm-4">{{modForm.template.formBorderType}}</div>
				</div>
				<div class="form-group form-group-sm">
					<label for="ltewBorderWidth" class="col-sm-2 control-label">Border Width</label>
					<div class="col-sm-2">
						<input type="number" class="form-control" id="ltewBorderWidth" name="ltewBorderWidth" />
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" type="submit">Save</button>
				<button class="btn btn-default" data-ng-click="cancelClick();">Cancel</button>
			</div>
		</form>
		`);
	}]);
})(jQuery);
