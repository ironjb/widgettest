/// <reference path="../../../typings/jquery/jquery.d.ts" />
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
	var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);
	var lth = new LoanTekWidgetHelpers($);
	var el = lth.CreateElement();

	window.console && console.log('dv', el.div());

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
				// { name: ''}
			]
		};

		var DemoPopulate = () => {
			$scope.demo = 'demo';
			var demoElement = el.div();
			demoElement.append(el.style().text('.ltcw {display:none;}'));
			demoElement.append(el.link('/css/widget.css'));
			demoElement.append(el.div().prop('id', 'ltWidgetWrapper'));
			$('#demoHtml').html(demoElement.html());
			// $.getScript('/js/lib/jquery.min.js', (data, textStatus, jqxhr) => {
				// window.console && console.log('jq loaded', data);
				// $.getScript('/js/loantek-manual-contact-widget.js', (data, textStatus, jqxhr) => {
					// window.console && console.log('lmcw loaded', ltjQuery);
					(function() {
						// var ltCaptcha = new LoanTekCaptcha();
						var ltCaptcha;
						var _ltCaptcha = function() {
							ltCaptcha = new LoanTekCaptcha();
						};

						var postDOMFunctions = function() {
							_ltCaptcha();
						};

						var externalValidators = function() {
							// window.console && console.log('external validatorss');
							return ltCaptcha.IsValidEntry() && false;
						};

						// var loanTeckBuildOptions = {
						// };
						var loanTekManualContactWidgetBuildObject = {
							showBuilderTools: true,
							defaultFormSize: 'sm',
							wrapperId: 'ltWidgetWrapper',
							postDOMCallback: postDOMFunctions,
							formId: 'LtcwContactWidgetForm',
							// clientID: 1234, // add as hidden field???
							// userID: 6789, // add as hidden field???
							// fields: [
							// 	{ field: 'clientid', values: 'test1234' },
							// 	// { field: 'firstname', value: 'First' },
							// 	{ field: 'label', cols: 2, value: 'Last Name' },
							// 	{ field: 'lastname', cols: 8, value: 'Last' },
							// 	// { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true, cols: 6, value: 'Last' },
							// 	{ field: 'email', value: 'email@mail.com' },
							// 	{ field: 'phone', value: '208-456-7890' },
							// 	{ field: 'company', value: 'LT' },
							// 	{ field: 'state', value: 'ID' },
							// 	{ field: 'comments', value: 'My Comments' },
							// 	{ field: 'captcha' },
							// 	{ field: 'submit' }
							// ]
							fields: $scope.currentFormObject.fields
						};
						// LoanTekBuildForm(loanTekManualContactWidgetBuildObject, loanTeckBuildOptions);
						var loanTekBuildForm = new LoanTekBuildForm(loanTekManualContactWidgetBuildObject);

						var loanTekManualContactWidgetOptions = {
							// postUrl: 'http://node-cors-server.herokuapp.com/no-cors',
							postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
							// redirectUrl: 'http://www.google.com',
							externalValidatorFunction: externalValidators,
							successMessage: 'Yay!!! Successful POST'
						};
						var loanTekManualContactWidget = new LoanTekManualContactWidget(loanTekManualContactWidgetOptions);
					})();
				// });
			// });
			// demoElement.append(el.script('/js/lib/jquery.min.js'));
			// demoElement.append(el.script('/js/loantek-manual-contact-widget.js'));

			// $scope.demo = $sce.trustAsHtml(demoElement.html());
			// $('#demoHtml').html(demoElement.html());

			if ($scope.currentFormObject) {
				window.console && console.log('has $scope.currentFormObject');
				$scope.demoCode = `
<style type="text/css">.ltcw {display:none;}</style>
<link rel="stylesheet" href="/css/widget.css">
<div id="ltWidgetWrapper">x</div>
<script>window.console && console.log('test');</script>
				`;
				// $scope.demoCode = $scope.demoCode.replace(/[\s+]/g, ' ');
				// $scope.demoCode.replace(/dis/, '_');
// 				$('#demoHtml').html(`
// <style type="text/css">.ltcw {display:none;}</style>
// <link rel="stylesheet" href="/css/widget.css">
// <div id="ltWidgetWrapper">x</div>
// <script>window.console && console.log('test');</script>
// 				`);
			}
		};

		$scope.UsePrebuiltTemplate = () => {
			// // window.console && console.log('use this template: ', tmp.name);
			// window.console && console.log($scope.selectedTemplate);
			// $scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
			$scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];		// selects first template if not selected already
			$scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
			window.console && console.log($scope.currentFormObject);
			// window.console && console.log($scope.currentWidget.prebuiltTemplates);
			DemoPopulate();
		};

		var BuilderInit = () => {
			$scope.currentWidget = angular.copy(contactWidget);
			// $scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];		// selects first template if not selected already
			// $scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
			// window.console && console.log($scope.currentFormObject);
			// // window.console && console.log($scope.currentWidget.prebuiltTemplates);
			// DemoPopulate();
			$scope.UsePrebuiltTemplate();
		};
		BuilderInit();
	}]);
})(jQuery);
