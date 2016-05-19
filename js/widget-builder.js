var LoanTekWidgetHelpers = (function () {
    function LoanTekWidgetHelpers(jquery) {
        this.bootstrap = {
            gridSizing: {
                xs: 'xs',
                sm: 'sm',
                md: 'md',
                lg: 'lg'
            },
            inputSizing: {
                sm: 'sm',
                lg: 'lg'
            }
        };
        this.widthUnit = {
            px: 'px',
            per: '%'
        };
        this.$ = jquery;
    }
    LoanTekWidgetHelpers.prototype.GetIndexOfFirstObjectInArray = function (theArray, theKey, theValue) {
        for (var i = 0, l = theArray.length; i < l; i++) {
            if (theArray[i][theKey] === theValue) {
                return i;
            }
        }
        return -1;
    };
    LoanTekWidgetHelpers.prototype.Interpolate = function (text, parameters, fn, regex) {
        text = text || '';
        parameters = parameters || {};
        fn = fn || function (x) { return x; };
        regex = regex || /#{[^\}]+}/g;
        return text.replace(regex, function (m, p, ft) {
            var indexOfStart = m.indexOf('{') + 1;
            var spaceFromEnd = m.length - m.indexOf('}');
            var rt = m.substr(indexOfStart);
            rt = rt.substr(0, rt.length - spaceFromEnd);
            if (!parameters[rt]) {
                window.console && console.warn('Interpolate Warning: Parameter not found for ' + m);
                rt = m;
            }
            else {
                rt = parameters[rt].toString() || '';
            }
            return fn(rt);
        });
    };
    LoanTekWidgetHelpers.prototype.CreateElement = function () {
        var $ = this.$;
        return {
            div: function () { return $('<div/>'); },
            script: function (src, type) {
                if (type === void 0) { type = 'text/javascript'; }
                var returnScript = $('<script/>').prop('type', type);
                returnScript = src ? returnScript.prop('src', src) : returnScript;
                return returnScript;
            },
            link: function (href, rel) {
                if (rel === void 0) { rel = 'stylesheet'; }
                var returnLink = $('<link/>').prop('rel', rel);
                returnLink = href ? returnLink.prop('href', href) : returnLink;
                return returnLink;
            },
            style: function (type) {
                if (type === void 0) { type = 'text/css'; }
                var returnStyle = $('<style/>').prop('type', type);
                return returnStyle;
            }
        };
    };
    return LoanTekWidgetHelpers;
}());
(function ($) {
    var x = 1;
    $('input textarea').placeholder();
    var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ngSanitize']);
    var lth = new LoanTekWidgetHelpers($);
    var el = lth.CreateElement();
    var wwwRoot = window.location.href === 'http://localhost:8080/' ? '' : '//www.loantek.com';
    var contactWidgetCSS = [
        '/css/widget.css'
    ];
    var contactWidgetScripts = [
        '/js/lib/jquery.min.js',
        '/js/lib/jquery.placeholder.min.js',
        '/js/loantek-manual-contact-widget.js'
    ];
    widgetBuilderApp.controller('ContactWidgetBuilderController', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
            var contactWidget = {
                prebuiltTemplates: [
                    {
                        name: 'Default Contact Widget',
                        template: {
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
                                { field: 'captcha' },
                                { field: 'submit' }
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
                                { field: 'clientid' },
                                { field: 'userid' },
                                { field: 'firstname', cols: 12 },
                                { field: 'lastname', cols: 12 },
                                { field: 'email', cols: 12 },
                                { field: 'phone', cols: 12 },
                                { field: 'company', cols: 12 },
                                { field: 'state', cols: 12 },
                                { field: 'comments' },
                                { field: 'submit' }
                            ]
                        }
                    }
                ],
                allAvailableFields: [
                    { id: 'clientid', name: 'Client ID', isLTRequired: true, hideFromList: true, fieldTemplate: { field: 'clientid' } },
                    { id: 'userid', name: 'User Id', isLTRequired: true, hideFromList: true, fieldTemplate: { field: 'userid' } },
                    { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { field: 'firstname' } },
                    { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { field: 'lastname' } },
                    { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { field: 'email' } },
                    { id: 'phone', name: 'Phone', fieldTemplate: { field: 'phone' } },
                    { id: 'company', name: 'Company', fieldTemplate: { field: 'company' } },
                    { id: 'state', name: 'State', fieldTemplate: { field: 'state' } },
                    { id: 'comments', name: 'Comments', fieldTemplate: { field: 'comments' } },
                    { id: 'captcha', name: 'Captcha', fieldTemplate: { field: 'captcha' } },
                    { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { field: 'submit' } }
                ]
            };
            var WidgetScriptBuild = function () {
                var cfo = angular.copy($scope.currentFormObject);
                var cfod = angular.copy($scope.currentFormObject);
                var wScript = '<style type="text/css">.ltcw {display:none;}</style>';
                var wScriptDisplay = wScript;
                var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cfo.fields, 'field', 'captcha') >= 0;
                var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
                cfod.showBuilderTools = true;
                cfo.postDOMCallback = '#fn{postDOMFunctions}';
                cfod.postDOMCallback = '#fn{postDOMFunctions}';
                for (var iCss = 0, lCss = contactWidgetCSS.length; iCss < lCss; iCss++) {
                    var cssHref = contactWidgetCSS[iCss];
                    var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
                    wScript += cssLink;
                    wScriptDisplay += cssLink;
                }
                var widgetWrapper = '\n<div id="ltWidgetWrapper"></div>';
                wScript += widgetWrapper;
                wScriptDisplay += widgetWrapper;
                for (var iScript = 0; iScript < contactWidgetScripts.length; iScript++) {
                    var scriptSrc = contactWidgetScripts[iScript];
                    var scriptLink = lth.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
                    wScript += scriptLink;
                }
                var mainScript = '';
                var mainScriptDisplay = '';
                var captchaVar = "\n\tvar ltCaptcha;";
                if (hasCaptchaField) {
                    mainScript += captchaVar;
                    mainScriptDisplay += captchaVar;
                }
                var postDomCode = '/*code ran after DOM created*/', postDomFn = "\n\tvar postDOMFunctions = function () {\n\t\t#{code}\n\t};";
                if (hasCaptchaField) {
                    postDomCode += "\n\t\tltCaptcha = new LoanTekCaptcha();";
                }
                mainScript += lth.Interpolate(postDomFn, { code: postDomCode });
                mainScriptDisplay += lth.Interpolate(postDomFn, { code: postDomCode });
                var extValid = "\n\tvar externalValidators = function () {\n\t\t#{validReturn}\n\t};";
                if (hasCaptchaField) {
                    extValid = lth.Interpolate(extValid, { validReturn: 'return ltCaptcha.IsValidEntry();' });
                }
                else {
                    extValid = lth.Interpolate(extValid, { validReturn: 'return true;' });
                }
                mainScript += extValid;
                mainScriptDisplay += extValid;
                var buildObjectWrap = "\n\tvar loanTekManualContactWidgetBuildObject = #{bow};";
                var cfoString = JSON.stringify(cfo);
                var cfodString = JSON.stringify(cfod);
                mainScript += lth.Interpolate(buildObjectWrap, { bow: cfoString });
                mainScriptDisplay += lth.Interpolate(buildObjectWrap, { bow: cfodString });
                var exBuildForm = "\n\tLoanTekBuildForm(loanTekManualContactWidgetBuildObject);";
                mainScript += exBuildForm;
                mainScriptDisplay += exBuildForm;
                var ltWidgetOptions = {
                    postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
                    externalValidatorFunction: '#fn{externalValidators}',
                    successMessage: 'Yay!!! Successful POST'
                };
                var ltWidgetOptionsWrap = "\n\tvar loanTekManualContactWidgetOptions = #{cwow};";
                mainScript += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions) });
                mainScriptDisplay += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions) });
                var contactWidget = "\n\tLoanTekManualContactWidget(loanTekManualContactWidgetOptions);";
                mainScript += contactWidget;
                mainScriptDisplay += contactWidget;
                mainScript = lth.Interpolate(mainScript, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);
                mainScriptDisplay = lth.Interpolate(mainScriptDisplay, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);
                var mainScriptWrap = "\n<script type=\"text/javascript\">\n(function () {#{m}\n})();\n</script>";
                mainScript = lth.Interpolate(mainScriptWrap, { m: mainScript });
                mainScriptDisplay = lth.Interpolate(mainScriptWrap, { m: mainScriptDisplay });
                wScript += mainScript;
                wScriptDisplay += mainScriptDisplay;
                $scope.widgetScript = wScript.replace(/\s+/g, ' ');
                $scope.widgetScriptDisplay = wScriptDisplay;
                $scope.widgetDisplay = $sce.trustAsHtml($scope.widgetScriptDisplay);
            };
            $scope.UsePrebuiltTemplate = function () {
                $scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];
                $scope.currentFormObject = angular.copy($scope.selectedTemplate.template);
                WidgetScriptBuild();
                $timeout(function () {
                    $scope.scriptChangedClass = 't' + new Date().getTime();
                });
            };
            var BuilderInit = function () {
                $scope.currentWidget = angular.copy(contactWidget);
                $scope.UsePrebuiltTemplate();
            };
            BuilderInit();
        }]);
})(jQuery);
