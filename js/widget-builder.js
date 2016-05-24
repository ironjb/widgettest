var LoanTekWidgetHelpers = (function () {
    function LoanTekWidgetHelpers(jquery) {
        this.bootstrap = {
            inputSizing: {
                sm: 'sm',
                lg: 'lg'
            },
            gridSizing: {
                xs: 'xs',
                sm: 'sm',
                md: 'md',
                lg: 'lg'
            }
        };
        this.hSizing = {
            h1: 1,
            h2: 2,
            h3: 3,
            h4: 4,
            h5: 5,
            h6: 6,
            default: 4
        };
        this.widthUnit = {
            px: 'px',
            per: '%'
        };
        this.formBorderType = {
            panel: 'panel',
            well: 'well'
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
        var el = {
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
            },
            p: function () { return $('<p/>'); },
            span: function () { return $('<span/>'); },
            h: function (headNumber) {
                if (headNumber === void 0) { headNumber = 3; }
                return $('<h' + headNumber + '/>');
            },
            form: function () { return $('<form/>').addClass('form-horizontal'); },
            label: function () { return $('<label/>').addClass('control-label col-sm-12'); },
            button: function (type) {
                if (type === void 0) { type = 'button'; }
                return $('<button/>').prop('type', type);
            },
            select: function () { return $('<select/>').addClass('form-control'); },
            option: function () { return $('<option/>'); },
            input: function (type) {
                if (type === void 0) { type = 'text'; }
                return $('<input/>').prop('type', type);
            },
            textarea: function () { return $('<textarea/>').addClass('form-control'); },
            col: function (colNumber, colSize) {
                if (colNumber === void 0) { colNumber = 12; }
                if (colSize === void 0) { colSize = 'sm'; }
                return el.div().addClass('col-' + colSize + '-' + colNumber.toString());
            },
            row: function (rowType) {
                if (rowType === void 0) { rowType = 'row'; }
                return el.div().addClass(rowType);
            },
            formGroup: function (formGroupSize) {
                if (formGroupSize) {
                    return el.row('form-group').addClass('form-group-' + formGroupSize);
                }
                else {
                    return el.row('form-group');
                }
            }
        };
        return el;
    };
    LoanTekWidgetHelpers.prototype.ScrollToAnchor = function (anchorName, scrollSpeed, topOffset) {
        $ = this.$;
        scrollSpeed = scrollSpeed || 200;
        topOffset = topOffset || 50;
        $('html, body').animate({
            scrollTop: ($('a[name=' + anchorName + ']').offset().top) - topOffset
        }, scrollSpeed);
    };
    return LoanTekWidgetHelpers;
}());
(function ($) {
    $('input textarea').placeholder();
    var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate']);
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
    widgetBuilderApp.controller('ContactWidgetBuilderController', ['$scope', function ($scope) {
            var contactWidget = {
                prebuiltTemplates: [
                    {
                        name: 'Default Contact Widget',
                        template: {
                            fields: [
                                { field: 'clientid' },
                                { field: 'userid' },
                                { field: 'title', value: 'Contact Us', nsize: 3 },
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
                        formWidth: 380,
                        formWidthUnit: lth.widthUnit.px,
                        formBg: '#def',
                        formBorderRadius: 0,
                        formBorderColor: '#08f',
                        formTitleColor: '#ddf',
                        formTitleBgColor: '#06d',
                        formGroupSpacing: 4,
                        formFieldBorderRadius: 0,
                        formButtonBorderRadius: 0,
                        template: {
                            formBorderType: lth.formBorderType.panel,
                            panelTitle: 'Contact Us',
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
                                { field: 'captcha' },
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
                    { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { field: 'submit' } },
                    { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { field: 'title ' } },
                    { id: 'p', name: 'Paragraph', allowMultiples: true, fieldTemplate: { field: 'p' } }
                ]
            };
            var WidgetScriptBuild = function (currentTemplate) {
                var ct = angular.copy(currentTemplate);
                var cfo = angular.copy(ct.template);
                var cfod = angular.copy(ct.template);
                var wScript = '<style type="text/css">.ltcw {display:none;}</style>';
                var wScriptDisplay = wScript;
                var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cfo.fields, 'field', 'captcha') >= 0;
                var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
                var formStyles = '';
                cfod.showBuilderTools = true;
                cfo.postDOMCallback = '#fn{postDOMFunctions}';
                cfod.postDOMCallback = '#fn{postDOMFunctions}';
                for (var iCss = 0, lCss = contactWidgetCSS.length; iCss < lCss; iCss++) {
                    var cssHref = contactWidgetCSS[iCss];
                    var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
                    wScript += cssLink;
                    wScriptDisplay += cssLink;
                }
                if (ct.formWidth) {
                    ct.formWidthUnit = ct.formWidthUnit || lth.widthUnit.per;
                    formStyles += '\n.ltcw { width: ' + ct.formWidth + ct.formWidthUnit + '; }';
                }
                if (ct.formBg) {
                    formStyles += '\n.ltcw .lt-widget-border { background-color: ' + ct.formBg + '; }';
                }
                if (!isNaN(ct.formBorderRadius)) {
                    var fbr = ct.formBorderRadius + '';
                    var fbhr = ct.formBorderRadius - 1 < 0 ? '0' : (ct.formBorderRadius - 1) + '';
                    formStyles += '\n.ltcw .lt-widget-border, .ltcw .lt-widget-border .alert { border-radius: ' + fbr + 'px; }';
                    formStyles += '\n.ltcw .lt-widget-border .lt-widget-heading { border-top-right-radius: ' + fbhr + 'px; border-top-left-radius: ' + fbhr + 'px; }';
                }
                if (ct.formBorderColor) {
                    formStyles += '\n.ltcw .lt-widget-border, .ltcw .lt-widget-border .lt-widget-heading { border-color: ' + ct.formBorderColor + '; }';
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
                if (!isNaN(ct.formFieldBorderRadius)) {
                    formStyles += '\n.ltcw .form-group .form-control { border-radius: ' + ct.formFieldBorderRadius + 'px; }';
                }
                if (!isNaN(ct.formButtonBorderRadius)) {
                    formStyles += '\n.ltcw .btn { border-radius: ' + ct.formButtonBorderRadius + 'px; }';
                }
                var styleWrap = '\n<style type="text/css">#{styles}\n</style>';
                if (formStyles) {
                    wScript += lth.Interpolate(styleWrap, { styles: formStyles });
                    wScriptDisplay += lth.Interpolate(styleWrap, { styles: formStyles });
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
                wScript = wScript.replace(/\s+/g, ' ');
                $scope.widgetScript = wScript;
                $scope.widgetScriptDisplay = wScriptDisplay;
            };
            $scope.testFun = function () {
                window.console && console.log('test fun... NOTE: please replace this testFun with a directive or something that will show the editing elements');
            };
            $scope.UsePrebuiltTemplate = function () {
                $scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];
                $scope.currentTemplate = angular.copy($scope.selectedTemplate);
                WidgetScriptBuild($scope.currentTemplate);
                lth.ScrollToAnchor('widgetTop');
                $scope.scriptChangedClass = 't' + new Date().getTime();
            };
            var BuilderInit = function () {
                $scope.currentWidget = angular.copy(contactWidget);
                $scope.UsePrebuiltTemplate();
            };
            BuilderInit();
        }]);
    widgetBuilderApp.directive('ltContactWidgetScript', [function () {
            return {
                restrict: 'AEC',
                scope: {
                    lcws: '=ltContactWidgetScript'
                },
                templateUrl: 'template/contactWidgetScript.html',
                link: function (scope) {
                }
            };
        }]).directive('ltCompileCode', ['$parse', '$compile', function ($parse, $compile) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    scope.$watch(attrs.ltCompileCode, function (value) {
                        window.console && console.log('watching: ', attrs.ltCompileCode);
                        elem.html(value);
                        $compile(elem.contents())(scope);
                    });
                }
            };
        }]).directive('ltWidgetTool', ['$parse', function ($parse) {
            return {
                link: function (scope, elem, attrs) {
                    var thisWigetTool = $parse(attrs.ltWidgetTool);
                    window.console && console.log('widget directive running', attrs.ltWidgetTool, thisWigetTool(scope));
                }
            };
        }]);
    angular.module('lt.templates', []).run(['$templateCache', function ($templateCache) {
            $templateCache.put('template/contactWidgetScript.html', "\n\t\t");
        }]);
})(jQuery);
