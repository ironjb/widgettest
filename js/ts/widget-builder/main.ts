/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-animate.d.ts" />
/// <reference path="../common/interfaces-widget.d.ts" />

// // 'use strict';
// $('#testClick').click(() => {
// 	$('#testStuff').html(`
// <style>.ltcw{display:none}</style> <link rel="stylesheet" href="/css/widget.css"> <div id="ltWidgetWrapper"></div> <script src="/js/lib/jquery.min.js"></script> <script src="/js/loantek-manual-contact-widget.js"></script> <script>var ltCaptcha,_ltCaptcha=function(){ltCaptcha=new LoanTekCaptcha},postDOMFunctions=function(){_ltCaptcha()},externalValidators=function(){return ltCaptcha.IsValidEntry()},loanTeckBuildOptions={defaultFormSize:"sm",wrapperId:"ltWidgetWrapper",postDOMCallback:postDOMFunctions,formId:"LtcwContactWidgetForm"},loanTekManualContactWidgetBuildObject={fields:[{field:"clientid",values:"test1234"},{field:"firstname",value:"First"},{field:"lastname",value:"Last"},{field:"email",value:"email@mail.com"},{field:"phone",value:"208-456-7890"},{field:"company",value:"LT"},{field:"state",value:"ID"},{field:"comments",value:"My Comments"},{field:"captcha"},{field:"submit"}]};LoanTekBuildForm(loanTekManualContactWidgetBuildObject,loanTeckBuildOptions);var loanTekManualContactWidgetOptions={postUrl:"http://node-cors-server.herokuapp.com/simple-cors",externalValidatorFunction:externalValidators,successMessage:"Yay!!! Successful POST"};LoanTekManualContactWidget(loanTekManualContactWidgetOptions)</script>

// 	`);
// });

(function () {
	var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate']);

	widgetBuilderApp.controller('WidgetBuilderController', ['$scope', function($scope) {
		$scope.demo = 'demo';
		enum WidgetType {
			contact,
			quote,
			rate
		}

		var BootstrapSizing = {
			xs: 'xs',
			sm: 'sm',
			md: 'md',
			lg: 'lg'
		};

		var currentWidgetType = WidgetType.contact;

		var widgets: IWidgets = {
			contact: {
				prebuiltTemplates: [
					{
						name: 'Default Contact Widget',
						template: {
							fieldSize: BootstrapSizing.sm,
							fields: []
						}
					}
				]
			},
			quote: {},
			rate: {}
		};

		$scope.currentWidget = widgets[currentWidgetType];
	}]);
})();
