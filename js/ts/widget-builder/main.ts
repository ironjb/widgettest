/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/jquery.placeholder/jquery.placeholder.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-animate.d.ts" />
/// <reference path="../../../typings/angularjs/angular-sanitize.d.ts" />
/// <reference path="../common/interfaces-widget.d.ts" />
/// <reference path="../common/jquery-noconflict.ts" />
/// <reference path="../contact-widget/loantek-manual-contact-widget.ts" />
/// <reference path="../contact-widget/build-form.ts" />
/// <reference path="../contact-widget/captcha.ts" />

// // 'use strict';
// $('#testClick').click(() => {
// 	$('#testStuff').html(`
// <style>.ltcw{display:none}</style> <link rel="stylesheet" href="/css/widget.css"> <div id="ltWidgetWrapper"></div> <script src="/js/lib/jquery.min.js"></script> <script src="/js/loantek-manual-contact-widget.js"></script> <script>var ltCaptcha,_ltCaptcha=function(){ltCaptcha=new LoanTekCaptcha},postDOMFunctions=function(){_ltCaptcha()},externalValidators=function(){return ltCaptcha.IsValidEntry()},loanTeckBuildOptions={defaultFormSize:"sm",wrapperId:"ltWidgetWrapper",postDOMCallback:postDOMFunctions,formId:"LtcwContactWidgetForm"},loanTekManualContactWidgetBuildObject={fields:[{field:"clientid",values:"test1234"},{field:"firstname",value:"First"},{field:"lastname",value:"Last"},{field:"email",value:"email@mail.com"},{field:"phone",value:"208-456-7890"},{field:"company",value:"LT"},{field:"state",value:"ID"},{field:"comments",value:"My Comments"},{field:"captcha"},{field:"submit"}]};LoanTekBuildForm(loanTekManualContactWidgetBuildObject,loanTeckBuildOptions);var loanTekManualContactWidgetOptions={postUrl:"http://node-cors-server.herokuapp.com/simple-cors",externalValidatorFunction:externalValidators,successMessage:"Yay!!! Successful POST"};LoanTekManualContactWidget(loanTekManualContactWidgetOptions)</script>

// 	`);
// });

(function ($: JQueryStatic) {
	$('input textarea').placeholder();
	var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);
	var lth = new LoanTekWidgetHelpers($);
	var el = lth.CreateElement();
	// window.console && console.log(window.location.href);
	var wwwRoot = window.location.href === 'http://localhost:8080/' ? '' : '//www.loantek.com';
	var contactWidgetCSS: string[] = [
		'/css/widget.css'
	];
	var contactWidgetScripts: string[] = [
		'/js/lib/jquery.min.js'
		, '/js/lib/jquery.placeholder.min.js'
		, '/js/loantek-manual-contact-widget.js'
	];

	widgetBuilderApp.controller('ContactWidgetBuilderController', ['$scope', '$sce', function($scope, $sce) {
		// $scope.demo = 'demo';
		// var WidgetType = {
		// 	contact: 'contact',
		// 	quote: 'quote',
		// 	rate: 'rate'
		// }

		// var bootstrap = {
		// 	gridSizing: {
		// 		xs: 'xs'
		// 		, sm: 'sm'
		// 		, md: 'md'
		// 		, lg: 'lg'
		// 	},
		// 	inputSizing: {
		// 		sm: 'sm'
		// 		, lg: 'lg'
		// 	}
		// };

		// var ws = {
		// 	widthUnit: {
		// 		px: 'px'
		// 		, per: '%'
		// 	}
		// };

		// var currentWidgetType = WidgetType.contact;

		var contactWidget: IWidget = {
			prebuiltTemplates: [
				{
					name: 'Default Contact Widget',
					template: {
						// fieldSize: bootstrap.inputSizing.sm,
						fields: [
							{ field: 'clientid' }
							, { field: 'userid' }
							, { field: 'firstname' }
							, { field: 'lastname' }
							, { field: 'email' }
							, { field: 'phone' }
							, { field: 'company' }
							, { field: 'state' }
							, { field: 'comments' }
							, { field: 'captcha' }
							, { field: 'submit' }
						]
					}
				},
				{
					name: 'Small Contact Widget',
					template: {
						fieldSize: lth.bootstrap.inputSizing.sm,
						formWidth: 200,
						formWidthUnit: lth.widthUnit.px,
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
				// { name: ''}
			]
		};

		var WidgetScriptBuild = () => {
			// $scope.widgetDisplay = 'demo';
			var cfo: IWidgetFormObject = $scope.currentFormObject;
			var wScript: string = '<style type="text/css">.ltcw {display:none;}</style>';
			var wScriptDisplay: string = wScript;
			var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cfo.fields, 'field', 'captcha') >= 0;
			window.console && console.log('hasCaptcha', hasCaptchaField);

			// Add CSS files
			for (var iCss = 0, lCss = contactWidgetCSS.length; iCss < lCss; iCss++) {
				var cssHref = contactWidgetCSS[iCss];
				var cssLink = '\n<link rel="stylesheet" href="' + wwwRoot + cssHref + '">';
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
				var scriptLink = '\n<script type="text/javascript" src="' + wwwRoot + scriptSrc + '"></script>';
				wScript += scriptLink;
				// DO NOT ADD for wScriptDisplay, it will cause a "Synchronous XMLHttpRequest..." error
				// Instead, each of these scripts should be added already to the builder page.
			}

			// Start Main Script
			var mainSCript_start = `
<script type="text/javascript">
(function () {`;
			wScript += mainSCript_start;
			wScriptDisplay += mainSCript_start;

			// Captcha var
			var captchaVar = `
	var ltCaptcha;`;
			if (hasCaptchaField) {
				wScript += captchaVar;
				wScriptDisplay += captchaVar;
			}

			// PostDOMFunctions
			var postDOM = `
	var postDOMFunctions = function () {`;
			if (hasCaptchaField) {
				postDOM += `
		ltCaptcha = new LoanTekCaptcha();`;
			}
			postDOM += `
	};`;
			wScript += postDOM;
			wScriptDisplay += postDOM;

			// External Validator
			var extValid = `
	var externalValidators = function () {
		return ltCaptcha.IsValidEntry();
	};`;
			if (hasCaptchaField) {
				wScript += extValid;
				wScriptDisplay += extValid;
			}

			// Build Object
			var buildObject = '', buildObjectWithTools = '';

			buildObjectWithTools += `
		showBuilderTools: true,`;

			if (cfo.defaultFormSize) {
				buildObject += `
		defaultFormSize: '` + cfo.defaultFormSize + `'`;
			}

			// Wrap buildObject
			var buildObject_start = `
	var loanTekManualContactWidgetBuildObject = {`;
			var buildObject_end = `
	};`;
			buildObject = buildObject_start + buildObject + buildObject_end;
			buildObjectWithTools = buildObject_start + buildObjectWithTools + buildObject_end;

			// Add buildObject to wScript
			wScript += buildObject;
			wScriptDisplay += buildObjectWithTools;


			// End Main Script
			var mainScript_end = `
})();
</script>`;
			wScript += mainScript_end;
			wScriptDisplay += mainScript_end;


			$scope.widgetScript = wScript;
			$scope.widgetScriptDisplay = wScriptDisplay;
			// $scope.widgetScript = wScript.replace(/\s+/g, ' ');
			$scope.widgetDisplay = $sce.trustAsHtml($scope.widgetScriptDisplay);







			// var demoElement = el.div();
			// demoElement.append(el.style().text('.ltcw {display:none;}'));
			// demoElement.append(el.link('/css/widget.css'));
			// demoElement.append(el.div().prop('id', 'ltWidgetWrapper'));
			// $('#demoHtml').html(demoElement.html());
			// $scope.widgetDisplay = $sce.trustAsHtml(demoElement.html());


			// var testScript = function() {
			// 	console.log('test');
			// };

			// $scope.widgetScript = testScript.toString();
			// // $scope.widgetScript = $scope.widgetScript.replace(/[\s+]/g, ' ');
			// $scope.widgetScript = $scope.widgetScript.replace(/\s+/g, ' ');

			// $.getScript('/js/lib/jquery.min.js', (data, textStatus, jqxhr) => {
				// window.console && console.log('jq loaded', data);
				// $.getScript('/js/loantek-manual-contact-widget.js', (data, textStatus, jqxhr) => {
					// window.console && console.log('lmcw loaded', ltjQuery);
					// (function() {
					// 	// var ltCaptcha = new LoanTekCaptcha();
					// 	var ltCaptcha;
					// 	// var _ltCaptcha = function() {
					// 	// 	ltCaptcha = new LoanTekCaptcha();
					// 	// };

					// 	var postDOMFunctions = function() {
					// 		// _ltCaptcha();
					// 		ltCaptcha = new LoanTekCaptcha();
					// 	};

					// 	var externalValidators = function() {
					// 		// window.console && console.log('external validatorss');
					// 		return ltCaptcha.IsValidEntry() && false;
					// 	};

					// 	// var loanTeckBuildOptions = {
					// 	// };
					// 	var loanTekManualContactWidgetBuildObject = {
					// 		showBuilderTools: true,
					// 		defaultFormSize: 'sm',
					// 		wrapperId: 'ltWidgetWrapper',
					// 		postDOMCallback: postDOMFunctions,
					// 		formId: 'LtcwContactWidgetForm',
					// 		// clientID: 1234, // add as hidden field???
					// 		// userID: 6789, // add as hidden field???
					// 		// fields: [
					// 		// 	{ field: 'clientid', values: 'test1234' },
					// 		// 	// { field: 'firstname', value: 'First' },
					// 		// 	{ field: 'label', cols: 2, value: 'Last Name' },
					// 		// 	{ field: 'lastname', cols: 8, value: 'Last' },
					// 		// 	// { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true, cols: 6, value: 'Last' },
					// 		// 	{ field: 'email', value: 'email@mail.com' },
					// 		// 	{ field: 'phone', value: '208-456-7890' },
					// 		// 	{ field: 'company', value: 'LT' },
					// 		// 	{ field: 'state', value: 'ID' },
					// 		// 	{ field: 'comments', value: 'My Comments' },
					// 		// 	{ field: 'captcha' },
					// 		// 	{ field: 'submit' }
					// 		// ]
					// 		fields: $scope.currentFormObject.fields
					// 	};
					// 	// LoanTekBuildForm(loanTekManualContactWidgetBuildObject, loanTeckBuildOptions);
					// 	var loanTekBuildForm = new LoanTekBuildForm(loanTekManualContactWidgetBuildObject);

					// 	var loanTekManualContactWidgetOptions = {
					// 		// postUrl: 'http://node-cors-server.herokuapp.com/no-cors',
					// 		postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
					// 		// redirectUrl: 'http://www.google.com',
					// 		externalValidatorFunction: externalValidators,
					// 		successMessage: 'Yay!!! Successful POST'
					// 	};
					// 	var loanTekManualContactWidget = new LoanTekManualContactWidget(loanTekManualContactWidgetOptions);
					// })();
				// });
			// });
			// demoElement.append(el.script('/js/lib/jquery.min.js'));
			// demoElement.append(el.script('/js/loantek-manual-contact-widget.js'));

			// $scope.widgetDisplay = $sce.trustAsHtml(demoElement.html());
			// $('#demoHtml').html(demoElement.html());

// 			if ($scope.currentFormObject) {
// 				window.console && console.log('has $scope.currentFormObject');
// 				$scope.widgetScript = `
// <style type="text/css">.ltcw {display:none;}</style>
// <link rel="stylesheet" href="/css/widget.css">
// <div id="ltWidgetWrapper">x</div>
// <script>window.console && console.log('test');</script>
// 				`;
// 				// $scope.widgetScript = $scope.widgetScript.replace(/[\s+]/g, ' ');
// 				// $scope.widgetScript.replace(/dis/, '_');
// // 				$('#demoHtml').html(`
// // <style type="text/css">.ltcw {display:none;}</style>
// // <link rel="stylesheet" href="/css/widget.css">
// // <div id="ltWidgetWrapper">x</div>
// // <script>window.console && console.log('test');</script>
// // 				`);
// 			}
		};

		$scope.UsePrebuiltTemplate = () => {
			// // window.console && console.log('use this template: ', tmp.name);
			// window.console && console.log($scope.selectedTemplate);
			// $scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
			$scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];		// selects first template if not selected already
			$scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
			window.console && console.log($scope.currentFormObject);
			// window.console && console.log($scope.currentWidget.prebuiltTemplates);
			WidgetScriptBuild();
		};

		var BuilderInit = () => {
			$scope.currentWidget = angular.copy(contactWidget);
			// $scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];		// selects first template if not selected already
			// $scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
			// window.console && console.log($scope.currentFormObject);
			// // window.console && console.log($scope.currentWidget.prebuiltTemplates);
			// WidgetScriptBuild();
			$scope.UsePrebuiltTemplate();
		};
		BuilderInit();
	}]);
})(jQuery);
