var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
var LoanTekWidget;
(function (LoanTekWidget) {
    var WidgetBuilder = (function () {
        function WidgetBuilder($, widgetData) {
            var _thisC = this;
            var lth = LoanTekWidgetHelper;
            var el = lth.CreateElement();
            $('input textarea').placeholder();
            var widgetObj = { allAvailableFields: null, prebuiltForms: null };
            if (widgetData.WidgetType.toLowerCase() === 'quotewidget') {
            }
            else if (widgetData.WidgetType.toLowerCase() === 'ratewidget') {
            }
            else {
                widgetObj.allAvailableFields = lth.contactFieldsArray;
                widgetObj.prebuiltForms = [
                    {
                        name: 'Default Contact Widget',
                        buildObject: {
                            panelTitle: 'Contact Us',
                            fields: [
                                { field: 'clientid' },
                                { field: 'userid' },
                                { field: 'firstname', cols: 2 },
                                { field: 'lastname' },
                                { field: 'email' },
                                { field: 'phone' },
                                { field: 'company' },
                                { field: 'state' },
                                { field: 'comments' },
                                { field: 'paragraph', value: 'This is a paragraph<br />This is a paragraph' },
                                { field: 'captcha' },
                                { field: 'submit' }
                            ]
                        }
                    },
                    {
                        name: 'Small Contact Widget',
                        formWidth: 380,
                        formWidthUnit: 'px',
                        formBg: '#def',
                        formBorderRadius: 0,
                        formBorderColor: '#08f',
                        formTitleColor: '#ddf',
                        formTitleBgColor: '#06d',
                        formGroupSpacing: 4,
                        formFieldBorderRadius: 0,
                        formButtonBorderRadius: 0,
                        buildObject: {
                            formBorderType: 'panel',
                            panelTitle: 'Contact Us',
                            fieldSize: 'sm',
                            fields: [
                                { field: 'clientid' },
                                { field: 'userid' },
                                { field: 'firstname', cols: 12 },
                                { field: 'lastname', cols: 12 },
                                { field: 'email', cols: 12 },
                                { field: 'phone', cols: 12 },
                                { field: 'company', cols: 12 },
                                { field: 'state', cols: 12 },
                                { field: 'comments' },
                                { field: 'captcha' },
                                { field: 'submit' }
                            ]
                        }
                    }
                ];
            }
            var widgetBuilderApp = angular.module('WidgetBuilderApp', ['ui.bootstrap', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates']);
            widgetBuilderApp.controller('WidgetBuilderController', ['$scope', '$timeout', function ($scope, $timeout) {
                    var wwwRoot = window.location.port === '8080' || window.location.port === '58477' ? '' : '//clients.loantek.com';
                    var ltWidgetCSS = [
                        '/css/widget.css'
                    ];
                    var scriptsLocation = '/js/';
                    var widgetScripts = [
                        scriptsLocation + 'lib/jquery-1/jquery.min.js',
                        scriptsLocation + 'lib/jquery/jquery.placeholder.min.js',
                        scriptsLocation + 'common/lt-captcha.js',
                        scriptsLocation + 'common/widget-helpers.js',
                        scriptsLocation + 'widget/widget.js'
                    ];
                    var scriptHelpersCode = "\n\t\t\t\t\t/*window.console && console.log('jquery no conflict', jQuery.fn.jquery, jQuery);*/\n\t\t\t\t\tvar ltjq = ltjq || jQuery.noConflict(true);\n\t\t\t\t\tvar lthlpr = new LoanTekWidget.helpers(ltjq);";
                    var scriptLoader = function () {
                        var loadScripts = new LoanTekWidget.LoadScriptsInSequence(widgetScripts, wwwRoot, function () {
                            var body = $('body')[0];
                            var script = el.script().html(scriptHelpersCode)[0];
                            body.appendChild(script);
                            $scope.UpdateWidgetDisplay();
                        });
                        loadScripts.run();
                    };
                    $scope.WidgetScriptBuild = WidgetScriptBuild;
                    $scope.UsePrebuiltForm = UsePrebuildForm;
                    BuilderInit();
                    function UsePrebuildForm() {
                        $scope.selectedForm = $scope.selectedForm || $scope.widgetObject.prebuiltForms[0];
                        $scope.currentForm = angular.copy($scope.selectedForm);
                        $scope.EditFieldData = {
                            widgetTypeLower: widgetData.WidgetType.toLowerCase(),
                            currentForm: $scope.currentForm,
                            buildScript: $scope.WidgetScriptBuild
                        };
                        $scope.WidgetScriptBuild($scope.currentForm);
                    }
                    function BuilderInit() {
                        $scope.widgetObject = angular.copy(widgetObj);
                        $scope.UsePrebuiltForm();
                    }
                    function WidgetScriptBuild(currentFormObj) {
                        var cfo = angular.copy(currentFormObj);
                        var cbo = angular.copy(cfo.buildObject);
                        var cbod = angular.copy(cfo.buildObject);
                        var wScript = '<style type="text/css">.ltw {display:none;}</style>';
                        var wScriptDisplay = wScript;
                        var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cbo.fields, 'field', 'captcha') >= 0;
                        var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
                        var formStyles = '';
                        cbod.showBuilderTools = true;
                        cbo.postDOMCallback = '#fn{postDOMFunctions}';
                        cbod.postDOMCallback = '#fn{postDOMFunctions}';
                        for (var iCss = 0, lCss = ltWidgetCSS.length; iCss < lCss; iCss++) {
                            var cssHref = ltWidgetCSS[iCss];
                            var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
                            wScript += cssLink;
                            wScriptDisplay += cssLink;
                        }
                        var styleWrap = '\n<style type="text/css">#{styles}\n</style>';
                        formStyles = new LoanTekWidget.ApplyFormStyles(cfo, !hasCaptchaField).getStyles();
                        if (formStyles) {
                            wScript += lth.Interpolate(styleWrap, { styles: formStyles });
                            wScriptDisplay += lth.Interpolate(styleWrap, { styles: formStyles });
                        }
                        var widgetWrapper = '\n<div id="ltWidgetWrapper"></div>';
                        wScript += widgetWrapper;
                        wScriptDisplay += widgetWrapper;
                        for (var iScript = 0, lScript = widgetScripts.length; iScript < lScript; iScript++) {
                            var scriptSrc = widgetScripts[iScript];
                            var scriptLink = lth.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
                            wScript += scriptLink;
                        }
                        var mainScript = '';
                        var mainScriptDisplay = '';
                        mainScript += scriptHelpersCode;
                        var captchaVar = "\n\t\t\t\t\t\tvar ltCap;";
                        if (hasCaptchaField) {
                            mainScript += captchaVar;
                            mainScriptDisplay += captchaVar;
                        }
                        var postDomCode = '/*code ran after DOM created*/', postDomFn = "\n\t\t\t\t\t\tvar pdfun = function () {\n\t\t\t\t\t\t\t#{code}\n\t\t\t\t\t\t};";
                        if (hasCaptchaField) {
                            postDomCode += "\n\t\t\t\t\t\t\tltCap = new LoanTekCaptcha(ltjq);";
                        }
                        mainScript += lth.Interpolate(postDomFn, { code: postDomCode });
                        mainScriptDisplay += lth.Interpolate(postDomFn, { code: postDomCode });
                        var extValid = "\n\t\t\t\t\t\tvar ev = function () {\n\t\t\t\t\t\t\t#{validReturn}\n\t\t\t\t\t\t};";
                        if (hasCaptchaField) {
                            extValid = lth.Interpolate(extValid, { validReturn: 'return ltCap.IsValidEntry();' });
                        }
                        else {
                            extValid = lth.Interpolate(extValid, { validReturn: 'return true;' });
                        }
                        mainScript += extValid;
                        mainScriptDisplay += extValid;
                        var buildObjectWrap = "\n\t\t\t\t\t\tvar ltwbo = #{bow};";
                        var cboString = JSON.stringify(cbo);
                        var cbodString = JSON.stringify(cbod);
                        mainScript += lth.Interpolate(buildObjectWrap, { bow: cboString });
                        mainScriptDisplay += lth.Interpolate(buildObjectWrap, { bow: cbodString });
                        var ltWidgetOptions = {
                            postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
                            externalValidatorFunction: '#fn{externalValidators}',
                            successMessage: 'Yay!!! Successful POST'
                        };
                        var ltWidgetOptionsWrap = "\n\t\t\t\t\t\tvar ltwo = #{cwow};";
                        mainScript += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions) });
                        mainScriptDisplay += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions) });
                        var contactWidget = "\n\t\t\t\t\t\tvar ltwfb = new LoanTekWidget.FormBuild(ltjq, lthlpr, ltwbo, ltwo);";
                        mainScript += contactWidget;
                        mainScriptDisplay += contactWidget;
                        mainScript = lth.Interpolate(mainScript, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);
                        mainScriptDisplay = lth.Interpolate(mainScriptDisplay, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);
                        var mainScriptWrap = "\n\t\t\t\t\t\t<script type=\"text/javascript\">\n\t\t\t\t\t\t(function () {#{m}\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t</script>";
                        mainScript = lth.Interpolate(mainScriptWrap, { m: mainScript });
                        mainScriptDisplay = lth.Interpolate(mainScriptWrap, { m: mainScriptDisplay });
                        wScript += mainScript;
                        wScriptDisplay += mainScriptDisplay;
                        wScript = wScript.replace(/\s+/gm, ' ');
                        $scope.UpdateWidgetDisplay = function () {
                            $timeout(function () {
                                $scope.widgetScript = wScript;
                                $scope.widgetScriptDisplay = wScriptDisplay;
                                lth.ScrollToAnchor('widgetTop');
                                $scope.scriptChangedClass = 't' + new Date().getTime();
                            });
                        };
                        scriptLoader();
                        scriptLoader = function () {
                            $scope.UpdateWidgetDisplay();
                        };
                    }
                }]);
        }
        return WidgetBuilder;
    }());
    LoanTekWidget.WidgetBuilder = WidgetBuilder;
})(LoanTekWidget || (LoanTekWidget = {}));
