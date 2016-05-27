var LoanTekWidgetHelpers;
(function (LoanTekWidgetHelpers) {
    var hSizing = (function () {
        function hSizing() {
            this.h1 = { id: 1, name: 'h1' };
            this.h2 = { id: 2, name: 'h2' };
            this.h3 = { id: 3, name: 'h3' };
            this.h4 = { id: 4, name: 'h4' };
            this.h5 = { id: 5, name: 'h5' };
            this.h6 = { id: 6, name: 'h6' };
            this.default = this.h4;
        }
        return hSizing;
    }());
    var inputSizing = (function () {
        function inputSizing() {
            this.sm = { id: 'sm', name: 'Small' };
            this.lg = { id: 'lg', name: 'Large' };
        }
        return inputSizing;
    }());
    var gridSizing = (function () {
        function gridSizing() {
            this.xs = { id: 'xs', name: 'xs' };
            this.sm = { id: 'sm', name: 'sm' };
            this.md = { id: 'md', name: 'md' };
            this.lg = { id: 'lg', name: 'lg' };
            this.default = this.md;
        }
        return gridSizing;
    }());
    var bootstrap = (function () {
        function bootstrap() {
            this.inputSizing = new inputSizing;
            this.gridSizing = new gridSizing;
        }
        return bootstrap;
    }());
    var formBorderType = (function () {
        function formBorderType() {
            this.panel = { id: 'panel', name: 'Panel' };
            this.well = { id: 'well', name: 'Well' };
            this.none = { id: 'none', name: 'None' };
        }
        return formBorderType;
    }());
    var widthUnit = (function () {
        function widthUnit() {
            this.px = { id: 'px', name: 'Pixels' };
            this.per = { id: '%', name: 'Percent' };
        }
        return widthUnit;
    }());
    var properties = (function () {
        function properties() {
            this.hsize = new hSizing;
            this.bootstrap = new bootstrap;
            this.formBorderType = new formBorderType;
            this.formBorderTypeArray = methods.prototype.ConvertObjectToArray(this.formBorderType);
            this.widthUnit = new widthUnit;
        }
        return properties;
    }());
    LoanTekWidgetHelpers.properties = properties;
    var methods = (function () {
        function methods(jq) {
            this.$ = jq;
        }
        methods.prototype.ConvertObjectToArray = function (theObj) {
            var objArray = [];
            for (var key in theObj) {
                var objVal = theObj[key];
                if (objVal) {
                    objArray.push(objVal);
                }
            }
            return objArray;
        };
        methods.prototype.ConvertArrayToObject = function (theArray, theKey) {
            theKey = theKey || 'id';
            var returnObj = {};
            for (var i = 0, l = theArray.length; i < l; i++) {
                var obj = theArray[i];
                var objectKey = obj[theKey];
                if (objectKey) {
                    window.console && console.log('objectKey', objectKey);
                    returnObj[objectKey] = obj;
                }
            }
            window.console && console.log('returnObj', returnObj);
            return returnObj;
        };
        methods.prototype.GetIndexOfFirstObjectInArray = function (theArray, theKey, theValue) {
            for (var i = 0, l = theArray.length; i < l; i++) {
                if (theArray[i][theKey] === theValue) {
                    return i;
                }
            }
            return -1;
        };
        methods.prototype.Interpolate = function (text, parameters, fn, regex) {
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
        methods.prototype.CreateElement = function () {
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
        methods.prototype.ScrollToAnchor = function (anchorName, scrollSpeed, topOffset) {
            $ = this.$;
            scrollSpeed = scrollSpeed || 200;
            topOffset = topOffset || 50;
            $('html, body').animate({
                scrollTop: ($('a[name=' + anchorName + ']').offset().top) - topOffset
            }, scrollSpeed);
        };
        return methods;
    }());
    LoanTekWidgetHelpers.methods = methods;
})(LoanTekWidgetHelpers || (LoanTekWidgetHelpers = {}));
(function ($) {
    $('input textarea').placeholder();
    var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates']);
    var ltm = new LoanTekWidgetHelpers.methods($);
    var ltp = new LoanTekWidgetHelpers.properties();
    window.console && console.log('ltp', ltp.hsize.h1.id);
    var el = ltm.CreateElement();
    var wwwRoot = window.location.port === '8080' ? '' : '//www.loantek.com';
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
                prebuiltForms: [
                    {
                        name: 'Default Contact Widget',
                        template: {
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
                                { field: 'captcha' },
                                { field: 'submit' }
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
                            formBorderType: ltp.formBorderType.panel.id,
                            panelTitle: 'Contact Us',
                            fieldSize: ltp.bootstrap.inputSizing.sm.id,
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
            var WidgetScriptBuild = function (currentFormObj) {
                var ct = angular.copy(currentFormObj);
                var cfo = angular.copy(ct.template);
                var cfod = angular.copy(ct.template);
                var wScript = '<style type="text/css">.ltcw {display:none;}</style>';
                var wScriptDisplay = wScript;
                var hasCaptchaField = ltm.GetIndexOfFirstObjectInArray(cfo.fields, 'field', 'captcha') >= 0;
                var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
                var formStyles = '';
                cfod.showBuilderTools = true;
                cfo.postDOMCallback = '#fn{postDOMFunctions}';
                cfod.postDOMCallback = '#fn{postDOMFunctions}';
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
                if (!isNaN(ct.formBorderRadius)) {
                    var fbr = ct.formBorderRadius + '';
                    var fbhr = ct.formBorderRadius - 1 < 0 ? '0' : (ct.formBorderRadius - 1) + '';
                    formStyles += '\n.ltcw .lt-widget-border { border-radius: ' + fbr + 'px; }';
                    if (ct.template.formBorderType === ltp.formBorderType.panel.id) {
                        formStyles += '\n.ltcw .lt-widget-border .lt-widget-heading { border-top-right-radius: ' + fbhr + 'px; border-top-left-radius: ' + fbhr + 'px; }';
                    }
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
                var widgetWrapper = '\n<div id="ltWidgetWrapper"></div>';
                wScript += widgetWrapper;
                wScriptDisplay += widgetWrapper;
                for (var iScript = 0; iScript < contactWidgetScripts.length; iScript++) {
                    var scriptSrc = contactWidgetScripts[iScript];
                    var scriptLink = ltm.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
                    wScript += scriptLink;
                }
                var mainScript = '';
                var mainScriptDisplay = '';
                var captchaVar = "\n\t\t\t\tvar ltCaptcha;";
                if (hasCaptchaField) {
                    mainScript += captchaVar;
                    mainScriptDisplay += captchaVar;
                }
                var postDomCode = '/*code ran after DOM created*/', postDomFn = "\n\t\t\tvar postDOMFunctions = function () {\n\t\t\t\t#{code}\n\t\t\t};";
                if (hasCaptchaField) {
                    postDomCode += "\n\t\t\t\t\tltCaptcha = new LoanTekCaptcha();";
                }
                mainScript += ltm.Interpolate(postDomFn, { code: postDomCode });
                mainScriptDisplay += ltm.Interpolate(postDomFn, { code: postDomCode });
                var extValid = "\n\t\t\tvar externalValidators = function () {\n\t\t\t\t#{validReturn}\n\t\t\t};";
                if (hasCaptchaField) {
                    extValid = ltm.Interpolate(extValid, { validReturn: 'return ltCaptcha.IsValidEntry();' });
                }
                else {
                    extValid = ltm.Interpolate(extValid, { validReturn: 'return true;' });
                }
                mainScript += extValid;
                mainScriptDisplay += extValid;
                var buildObjectWrap = "\n\t\t\tvar loanTekManualContactWidgetBuildObject = #{bow};";
                var cfoString = JSON.stringify(cfo);
                var cfodString = JSON.stringify(cfod);
                mainScript += ltm.Interpolate(buildObjectWrap, { bow: cfoString });
                mainScriptDisplay += ltm.Interpolate(buildObjectWrap, { bow: cfodString });
                var exBuildForm = "\n\t\t\tLoanTekBuildForm(loanTekManualContactWidgetBuildObject);";
                mainScript += exBuildForm;
                mainScriptDisplay += exBuildForm;
                var ltWidgetOptions = {
                    postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
                    externalValidatorFunction: '#fn{externalValidators}',
                    successMessage: 'Yay!!! Successful POST'
                };
                var ltWidgetOptionsWrap = "\n\t\t\tvar loanTekManualContactWidgetOptions = #{cwow};";
                mainScript += ltm.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions) });
                mainScriptDisplay += ltm.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptions) });
                var contactWidget = "\n\t\t\tLoanTekManualContactWidget(loanTekManualContactWidgetOptions);";
                mainScript += contactWidget;
                mainScriptDisplay += contactWidget;
                mainScript = ltm.Interpolate(mainScript, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);
                mainScriptDisplay = ltm.Interpolate(mainScriptDisplay, { postDOMFunctions: 'postDOMFunctions', externalValidators: 'externalValidators' }, null, fnReplaceRegEx);
                var mainScriptWrap = "\n\t\t\t<script type=\"text/javascript\">\n\t\t\t(function () {#{m}\n\t\t\t})();\n\t\t\t</script>";
                mainScript = ltm.Interpolate(mainScriptWrap, { m: mainScript });
                mainScriptDisplay = ltm.Interpolate(mainScriptWrap, { m: mainScriptDisplay });
                wScript += mainScript;
                wScriptDisplay += mainScriptDisplay;
                wScript = wScript.replace(/\s+/gm, ' ');
                $scope.widgetScript = wScript;
                $scope.widgetScriptDisplay = wScriptDisplay;
                ltm.ScrollToAnchor('widgetTop');
                $scope.scriptChangedClass = 't' + new Date().getTime();
            };
            $scope.RunWidgetScriptBuild = function (currentForm) {
                WidgetScriptBuild(currentForm);
            };
            $scope.UsePrebuiltForm = function () {
                $scope.selectedForm = $scope.selectedForm || $scope.currentWidget.prebuiltForms[0];
                $scope.currentForm = angular.copy($scope.selectedForm);
                window.console && console.log($scope.selectedForm);
                WidgetScriptBuild($scope.currentForm);
            };
            var BuilderInit = function () {
                $scope.currentWidget = angular.copy(contactWidget);
                $scope.UsePrebuiltForm();
            };
            BuilderInit();
        }]);
    var ltWidgetServices = angular.module('ltw.services', []);
    ltWidgetServices.factory('widgetServices', ['$uibModal', function ($uibModal) {
            var widgetMethods = {
                editForm: function (options) {
                    var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
                    angular.extend(settings, options);
                    window.console && console.log('settings', settings);
                    var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function ($scope, $uibModalInstance, intanceOptions) {
                            $scope.modForm = angular.copy(intanceOptions.currentForm);
                            $scope.borderTypes = angular.copy(ltp.formBorderTypeArray);
                            if (!$scope.modForm.template.formBorderType) {
                                $scope.modForm.template.formBorderType = ltp.formBorderType.none.id;
                            }
                            $scope.saveClick = function () {
                                var newForm = angular.copy($scope.modForm);
                                newForm.name = 'modified';
                                if (!newForm.template.formBorderType || newForm.template.formBorderType === ltp.formBorderType.none.id) {
                                    delete newForm.template.formBorderType;
                                    delete newForm.formTitleBgColor;
                                }
                                $uibModalInstance.close(newForm);
                            };
                            $scope.cancelClick = function () {
                                $uibModalInstance.dismiss();
                            };
                        }];
                    var modalInstance = $uibModal.open({
                        templateUrl: '/template.html?t=' + new Date().getTime(),
                        controller: modalCtrl,
                        size: settings.modalSize,
                        resolve: {
                            instanceOptions: function () { return settings.instanceOptions; }
                        }
                    });
                    modalInstance.result.then(function (result) {
                        window.console && console.log('modal save result', result);
                        settings.saveForm(result);
                    }, function (error) {
                        window.console && console.log('modal close');
                    });
                }
            };
            return widgetMethods;
        }]);
    var widgetDirectives = angular.module('ltw.directives', []);
    widgetDirectives.directive('ltCompileCode', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                link: function (scope, elem, attrs) {
                    scope.$watch(attrs.ltCompileCode, function (value) {
                        elem.html(value);
                        $compile(elem.contents())(scope);
                    });
                }
            };
        }]);
    widgetDirectives.directive('ltFormEditTool', ['widgetServices', function (widgetServices) {
            return {
                restrict: 'A',
                templateUrl: 'template/widgetFormEditButton.html',
                link: function (scope, elem, attrs) {
                    scope.EditWigetForm = function () {
                        var formEditOptions = {
                            instanceOptions: {
                                currentForm: angular.copy(scope.currentForm)
                            },
                            saveForm: function (updatedForm) {
                                window.console && console.log('saveForm');
                                scope.currentForm = updatedForm;
                                scope.selectedForm = {};
                                scope.RunWidgetScriptBuild(scope.currentForm);
                            }
                        };
                        widgetServices.editForm(formEditOptions);
                    };
                }
            };
        }]);
    angular.module('ltw.templates', []).run(['$templateCache', function ($templateCache) {
            $templateCache.put('template/widgetFormEditButton.html', "\n\t\t\t<button type=\"button\" class=\"btn btn-default btn-xs btn-tool\" data-ng-click=\"EditWigetForm();\"><span class=\"glyphicon glyphicon-pencil\"></span> Edit</button>\n\t\t");
            $templateCache.put('template/modal/editForm.html', "\n\t\t<form class=\"form-horizontal\" data-ng-submit=\"saveClick();\">\n\t\t\t<div class=\"modal-header alert alert-info\">\n\t\t\t\t<h3 class=\"modal-title\">Edit Widget Form</h3>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t<label for=\"ltewBorderType\" class=\"col-sm-2 control-label\">Border Type</label>\n\t\t\t\t\t<div class=\"col-sm-6\">\n\t\t\t\t\t\t<!-- <select name=\"ltewBorderType\" id=\"ltewBorderType\" class=\"form-control\" data-ng-model=\"modForm.template.formBorderType\" data-ng-options=\"btype.id as btype.name for btype in borderTypes\">\n\t\t\t\t\t\t\t<option value=\"\">None</option>\n\t\t\t\t\t\t</select> -->\n\t\t\t\t\t\t<div class=\"btn-group btn-group-sm\">\n\t\t\t\t\t\t\t<label class=\"btn btn-primary\" data-ng-model=\"modForm.template.formBorderType\" uib-btn-radio=\"btype.id\" data-ng-repeat=\"btype in borderTypes track by btype.id\">{{btype.name}}</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-sm-4\">{{modForm.template.formBorderType}}</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t<label for=\"ltewBorderWidth\" class=\"col-sm-2 control-label\">Border Width</label>\n\t\t\t\t\t<div class=\"col-sm-2\">\n\t\t\t\t\t\t<input type=\"number\" class=\"form-control\" id=\"ltewBorderWidth\" name=\"ltewBorderWidth\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-primary\" type=\"submit\">Save</button>\n\t\t\t\t<button class=\"btn btn-default\" data-ng-click=\"cancelClick();\">Cancel</button>\n\t\t\t</div>\n\t\t</form>\n\t\t");
        }]);
})(jQuery);
