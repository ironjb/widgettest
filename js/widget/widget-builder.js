var LoanTekWidgetHelperTest = LoanTekWidgetHelperTest || new LoanTekWidgetTest.helpers(jQuery);
var LoanTekWidgetTest;
(function (LoanTekWidgetTest) {
    var WidgetBuilder = (function () {
        function WidgetBuilder($, widgetData) {
            var _thisC = this;
            var lth = LoanTekWidgetHelperTest;
            var ltbh = new LoanTekWidgetTest.BuilderHelpers();
            var el = lth.CreateElement();
            $('input textarea').placeholder();
            var widgetObj = { allFieldsObject: null, allFieldsOptionsArray: null, prebuiltForms: null };
            if (widgetData.modelWidget.WidgetType.toLowerCase() === 'quotewidget') {
            }
            else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'ratewidget') {
            }
            else {
                widgetObj.allFieldsObject = lth.contactFields;
                widgetObj.allFieldsOptionsArray = lth.contactFieldsArray;
                widgetObj.prebuiltForms = [
                    {
                        name: 'Default Contact Widget',
                        buildObject: {
                            panelTitle: 'Contact Us',
                            fields: [
                                { field: 'clientid' },
                                { field: 'userid' },
                                { field: 'label', cols: 4, size: 'sm', value: 'First Name' },
                                { field: 'firstname', cols: 8 },
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
                                { field: 'firstname' },
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
                    }
                ];
            }
            var widgetBuilderApp = angular.module('WidgetBuilderApp', ['ui.bootstrap', 'colorpicker.module', 'ngDragDrop', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates']);
            widgetBuilderApp.controller('WidgetBuilderController', ['$scope', '$timeout', 'widgetServices', function ($scope, $timeout, widgetServices) {
                    var wwwRoot = window.location.port === '8080' || window.location.port === '58477' ? '' : '//clients.loantek.com';
                    var ltWidgetCSS = ['/Content/widget/css'];
                    var widgetScripts = ['/bundles/widget/widget'];
                    if (window.location.port === '8080') {
                        ltWidgetCSS = ['/css/widget.css'];
                        widgetScripts = [
                            '/js/lib/jquery-1/jquery.min.js',
                            '/js/lib/jquery/jquery.placeholder.min.js',
                            '/js/common/lt-captcha.js',
                            '/js/common/widget-helpers.js',
                            '/js/widget/widget.js'
                        ];
                    }
                    if (window.location.port === '58477') {
                        ltWidgetCSS = ['/Areas/Widgets/Content/widget.css', '/Areas/Widgets/Content/lt-captcha.css'];
                        widgetScripts = [
                            '/Scripts/lib/jquery-1/jquery.min.js',
                            '/Scripts/lib/jquery/jquery.placeholder.min.js',
                            '/Areas/Widgets/Scripts/common/lt-captcha.js',
                            '/Areas/Widgets/Scripts/common/widget-helpers.js',
                            '/Areas/Widgets/Scripts/widget/widget.js'
                        ];
                    }
                    var scriptHelpersCode = "\n\t\t\t\t\tvar ltjq = ltjq || jQuery.noConflict(true);\n\t\t\t\t\tvar lthlpr = new LoanTekWidgetTest.helpers(ltjq);";
                    var scriptLoader = function () {
                        var loadScripts = new LoanTekWidgetTest.LoadScriptsInSequence(widgetScripts, wwwRoot, function () {
                            var body = $('body')[0];
                            var script = el.script().html(scriptHelpersCode)[0];
                            body.appendChild(script);
                            $scope.UpdateWidgetDisplay();
                        });
                        loadScripts.run();
                    };
                    $scope.allFieldsObject = angular.copy(widgetObj.allFieldsObject);
                    $scope.allFieldsOptionsArray = angular.copy(widgetObj.allFieldsOptionsArray);
                    $scope.WidgetScriptBuild = WidgetScriptBuild;
                    $scope.SaveWidget = SaveWidget;
                    $scope.DeleteWidget = DeleteWidget;
                    $scope.UsePrebuiltForm = UsePrebuildForm;
                    $scope.ClearSelectedForm = ClearSelectedForm;
                    $scope.SetCurrentForm = SetCurrentForm;
                    $scope.addField = addField;
                    $scope.FilterAvailableFields = FilterAvailableFields;
                    $scope.onDragStart = onDragStart;
                    $scope.onDrop = onDrop;
                    BuilderInit();
                    $scope.$watchGroup(['currentForm', 'currentForm.buildObject.fields.length'], function (newValue) {
                        for (var i = $scope.allFieldsOptionsArray.length - 1; i >= 0; i--) {
                            var field = $scope.allFieldsOptionsArray[i];
                            var cIndex = lth.GetIndexOfFirstObjectInArray($scope.currentForm.buildObject.fields, 'field', field.id);
                            field.isIncluded = !!(cIndex >= 0);
                        }
                    });
                    function SaveWidget() {
                        var saveData = {
                            ID: null,
                            ScriptText: $scope.currentForm
                        };
                        var postData = {
                            httpOptions: { method: 'POST', url: '/Widgets/Builder/Save', data: saveData },
                            onSuccessFunction: function (result) {
                                window.console && console.log('success save result', result);
                            },
                            onErrorFunction: function (error) {
                                window.console && console.log('error save result', error);
                            }
                        };
                        widgetServices.dataProcessingModal([postData]);
                    }
                    function DeleteWidget() {
                    }
                    function onDragStart(event, ui, data) {
                        window.console && console.log('dragStart data', data);
                        $scope.dragData = data;
                    }
                    function onDrop(event, ui, dropIndex, columns, isPlaceholder) {
                        if ($scope.dragData.field) {
                            window.console && console.log('add new field ', $scope.dragData.field, ' to ', dropIndex);
                            var newField = { field: $scope.dragData.field };
                            if (columns) {
                                newField.cols = columns;
                            }
                            $scope.currentForm.buildObject.fields.splice(dropIndex + 1, 0, newField);
                            $scope.ClearSelectedForm();
                            $scope.WidgetScriptBuild($scope.currentForm);
                        }
                        else if (lth.isNumber($scope.dragData.index)) {
                            var previousIndex = $scope.dragData.index;
                            if (previousIndex > dropIndex && isPlaceholder) {
                                dropIndex += 1;
                            }
                            ltbh.arrayMove($scope.currentForm.buildObject.fields, previousIndex, dropIndex);
                            if (columns) {
                                $scope.currentForm.buildObject.fields[dropIndex].cols = columns;
                            }
                            $scope.ClearSelectedForm();
                            $scope.WidgetScriptBuild($scope.currentForm);
                        }
                        else {
                            window.console && console.error('No Data Passed from Draggable!!');
                        }
                    }
                    function FilterAvailableFields(value, index, array) {
                        var isInList = true;
                        isInList = !value.hideFromList && !(!!value.isIncluded && !value.allowMultiples);
                        return isInList;
                    }
                    function addField(fieldId) {
                        var fieldToAdd = { field: $scope.allFieldsObject[fieldId].id };
                        $scope.currentForm.buildObject.fields.push(fieldToAdd);
                        $scope.WidgetScriptBuild($scope.currentForm);
                    }
                    function UsePrebuildForm() {
                        $scope.selectedForm = $scope.selectedForm || $scope.widgetObject.prebuiltForms[0];
                        $scope.currentForm = angular.copy($scope.selectedForm);
                        $scope.WidgetScriptBuild($scope.currentForm);
                    }
                    function BuilderInit() {
                        $scope.widgetObject = angular.copy(widgetObj);
                        $scope.UsePrebuiltForm();
                    }
                    function ClearSelectedForm() {
                        $scope.selectedForm = { name: 'modified' };
                    }
                    function SetCurrentForm(currentForm) {
                        $scope.currentForm = currentForm;
                    }
                    function WidgetScriptBuild(currentFormObj) {
                        $scope.editFieldData = {
                            widgetTypeLower: widgetData.modelWidget.WidgetType.toLowerCase(),
                            currentForm: $scope.currentForm,
                            clearSelectedForm: $scope.ClearSelectedForm,
                            onDragStart: $scope.onDragStart,
                            setCurrentForm: $scope.SetCurrentForm,
                            buildScript: $scope.WidgetScriptBuild
                        };
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
                        formStyles = new LoanTekWidgetTest.ApplyFormStyles(cfo, !hasCaptchaField).getStyles();
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
                            postDomCode += "\n\t\t\t\t\t\t\tltCap = new LoanTekCaptchaTest(ltjq);";
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
                        var contactWidget = "\n\t\t\t\t\t\tvar ltwfb = new LoanTekWidgetTest.FormBuild(ltjq, lthlpr, ltwbo, ltwo);";
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
                                var widgetEncode = encodeURIComponent($scope.widgetScript);
                                $scope.widgetScriptParse = widgetEncode;
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
    LoanTekWidgetTest.WidgetBuilder = WidgetBuilder;
})(LoanTekWidgetTest || (LoanTekWidgetTest = {}));
