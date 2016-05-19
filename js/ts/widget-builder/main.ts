/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/jquery.placeholder/jquery.placeholder.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-animate.d.ts" />
/// <reference path="../../../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../common/interfaces-widget.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

(function ($: JQueryStatic) {
	var x = 1;
	$('input textarea').placeholder();
	var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);
	var lth = new LoanTekWidgetHelpers($);
	var el = lth.CreateElement();
	var wwwRoot = window.location.href === 'http://localhost:8080/' ? '' : '//www.loantek.com';
	var contactWidgetCSS: string[] = [
		'/css/widget.css'
	];
	var contactWidgetScripts: string[] = [
		'/js/lib/jquery.min.js'
		, '/js/lib/jquery.placeholder.min.js'
		, '/js/loantek-manual-contact-widget.js'
	];

	widgetBuilderApp.controller('ContactWidgetBuilderController', ['$scope', '$sce', '$timeout', function($scope, $sce, $timeout) {
		var contactWidget: IWidget = {
			prebuiltTemplates: [
				{
					name: 'Default Contact Widget',
					template: {
						// fieldSize: lth.bootstrap.inputSizing.sm,
						fields: [
							{ field: 'clientid' }
							, { field: 'userid' }
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
					formWidth: 200,
					formWidthUnit: lth.widthUnit.px,
					template: {
						fieldSize: lth.bootstrap.inputSizing.sm,
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
							// , { field: 'captcha' }
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
			]
		};

		var WidgetScriptBuild = () => {
			var cfo: IWidgetFormObject = angular.copy($scope.currentFormObject);
			var cfod: IWidgetFormObject = angular.copy($scope.currentFormObject);
			var wScript: string = '<style type="text/css">.ltcw {display:none;}</style>';
			var wScriptDisplay: string = wScript;
			var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cfo.fields, 'field', 'captcha') >= 0;
			var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
			cfod.showBuilderTools = true;
			cfo.postDOMCallback = '#fn{postDOMFunctions}';
			cfod.postDOMCallback = '#fn{postDOMFunctions}';

			// Add CSS files
			for (var iCss = 0, lCss = contactWidgetCSS.length; iCss < lCss; iCss++) {
				var cssHref = contactWidgetCSS[iCss];
				var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
				wScript += cssLink;
				wScriptDisplay += cssLink;
			}

			// Add Widget Wrapper
			var widgetWrapper = '\n<div id="ltWidgetWrapper"></div>';
			wScript += widgetWrapper;
			wScriptDisplay += widgetWrapper;

			// Add scripts
			for (var iScript = 0; iScript < contactWidgetScripts.length; iScript++) {
				var scriptSrc = contactWidgetScripts[iScript];
				var scriptLink = lth.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
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
			mainScript += lth.Interpolate(postDomFn, { code: postDomCode });
			mainScriptDisplay += lth.Interpolate(postDomFn, { code: postDomCode });

			// External Validator
			var extValid = `
	var externalValidators = function () {
		#{validReturn}
	};`;
			if (hasCaptchaField) {
				extValid = lth.Interpolate(extValid, { validReturn: 'return ltCaptcha.IsValidEntry();' });
			} else {
				extValid = lth.Interpolate(extValid, { validReturn: 'return true;' });
			}
			mainScript += extValid;
			mainScriptDisplay += extValid;

			// Add buildObject to mainScript
			var buildObjectWrap = `
	var loanTekManualContactWidgetBuildObject = #{bow};`;
			var cfoString = JSON.stringify(cfo/*, null, 2*/);
			var cfodString = JSON.stringify(cfod/*, null, 2*/);
			mainScript += lth.Interpolate(buildObjectWrap, { bow: cfoString });
			mainScriptDisplay += lth.Interpolate(buildObjectWrap, { bow: cfodString });

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
			mainScript += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions/*, null, 2*/) });
			mainScriptDisplay += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions/*, null, 2*/) });

			// Add Execution of Contact Widget
			var contactWidget = `
	LoanTekManualContactWidget(loanTekManualContactWidgetOptions);`;
			mainScript += contactWidget;
			mainScriptDisplay += contactWidget;

			mainScript = lth.Interpolate(mainScript, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);
			mainScriptDisplay = lth.Interpolate(mainScriptDisplay, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);

			// Wrap Main Script
			var mainScriptWrap = `
<script type="text/javascript">
(function () {#{m}
})();
</script>`;
			mainScript = lth.Interpolate(mainScriptWrap,{m: mainScript});
			mainScriptDisplay = lth.Interpolate(mainScriptWrap, { m: mainScriptDisplay });

			wScript += mainScript;
			wScriptDisplay += mainScriptDisplay;


			// $scope.widgetScript = wScript;
			$scope.widgetScript = wScript.replace(/\s+/g, ' ');
			$scope.widgetScriptDisplay = wScriptDisplay;
			$scope.widgetDisplay = $sce.trustAsHtml($scope.widgetScriptDisplay);
		};

		$scope.UsePrebuiltTemplate = () => {
			$scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];		// selects first template if not selected already
			$scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
			WidgetScriptBuild();
			// $scope.scriptChangedClass = '';
			// window.console && console.log('change class', $scope.scriptChangedClass);
			// $scope.scriptChangedClass = 'example-test';
			// window.console && console.log('change class 2', $scope.scriptChangedClass);
			$timeout(() => {
				$scope.scriptChangedClass = 't' + new Date().getTime();
			});
		};

		var BuilderInit = () => {
			$scope.currentWidget = angular.copy(contactWidget);
			$scope.UsePrebuiltTemplate();
		};
		BuilderInit();
	}]);
	// widgetBuilderApp.directive('ltContactWidgetScript', [function() {
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
	// angular.module('lt.templates', []).run(['$templateCache', function($templateCache) {
	// 	$templateCache.put('template/contactWidgetScript.html', `
	// 	`);
	// }]);
})(jQuery);
