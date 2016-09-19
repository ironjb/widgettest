var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
var LoanTekWidget;
(function (LoanTekWidget) {
    var WidgetBuilder = (function () {
        function WidgetBuilder($, widgetData) {
            var _thisC = this;
            var lth = LoanTekWidgetHelper;
            var ltbh = new LoanTekWidget.BuilderHelpers();
            var el = lth.CreateElement();
            var ngModelOptions = { updateOn: 'default blur', debounce: { default: 1000, blur: 0 } };
            $('input textarea').placeholder();
            var widgetObj = { allFieldsObject: null, allFieldsOptionsArray: null, allResultFieldsObject: null, allResultFieldsOptionsArray: null, prebuiltForms: null };
            if (widgetData.modelWidget.WidgetType.toLowerCase() === 'quotewidget') {
                widgetObj.widgetType = lth.widgetType.quote.id;
            }
            else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'ratewidget') {
                widgetObj.widgetType = lth.widgetType.rate.id;
            }
            else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'depositwidget') {
                widgetObj.fieldHelperType = 'depositFields';
                widgetObj.widgetType = lth.widgetType.deposit.id;
                widgetObj.allFieldsObject = lth.depositFields;
                widgetObj.allFieldsOptionsArray = lth.depositFields.asArray();
                widgetObj.allResultFieldsObject = lth.depositResultFields;
                widgetObj.allResultFieldsOptionsArray = lth.depositResultFields.asArray();
            }
            else {
                widgetObj.fieldHelperType = 'contactFields';
                widgetObj.widgetType = lth.widgetType.contact.id;
                widgetObj.allFieldsObject = lth.contactFields;
                widgetObj.allFieldsOptionsArray = lth.contactFieldsArray;
            }
            widgetObj.prebuiltForms = [];
            for (var iwt = 0, wtl = widgetData.widgetTemplates.length; iwt < wtl; iwt++) {
                var wTemplate = widgetData.widgetTemplates[iwt];
                if (wTemplate.Active) {
                    widgetObj.prebuiltForms.push(JSON.parse(wTemplate.ScriptText));
                }
            }
            var widgetBuilderApp = angular.module('WidgetBuilderApp', ['ui.bootstrap', 'colorpicker.module', 'ngDragDrop', 'ngAnimate', 'lt.services', 'ltw.services', 'ltw.directives', 'ltw.templates']);
            widgetBuilderApp.controller('WidgetBuilderController', ['$scope', '$timeout', 'commonServices', 'widgetServices', function ($scope, $timeout, commonServices, widgetServices) {
                    var wwwRoot = (widgetData.scriptsDomain) ? widgetData.scriptsDomain.replace(/http:\/\/|https:\/\//, '//') : '//client.loantek.com';
                    var ltWidgetCSS = ['/Content/widget/css'];
                    var widgetScripts = ['/bundles/widget/widget'];
                    if (window.location.port === '58477' || window.location.port === '8080') {
                        ltWidgetCSS = ['/Areas/Widgets/Content/widget.css', '/Areas/Widgets/Content/lt-captcha.css'];
                        widgetScripts = [
                            '/Scripts/lib/jquery-1/jquery.min.js',
                            '/Scripts/lib/jquery/jquery.placeholder.min.js',
                            '/Areas/Widgets/Scripts/post-object/contact.js',
                            '/Areas/Widgets/Scripts/post-object/deposit.js',
                            '/Areas/Widgets/Scripts/common/lt-captcha.js',
                            '/Areas/Widgets/Scripts/common/widget-helpers.js',
                            '/Areas/Widgets/Scripts/widget/widget.js'
                        ];
                    }
                    var scriptHelpersCode = "\n\t\t\t\t\tvar ltjq = ltjq || jQuery.noConflict(true);\n\t\t\t\t\tvar lthlpr = new LoanTekWidget.helpers(ltjq);";
                    var scriptLoader = function () {
                        var loadScripts = new LoanTekWidget.LoadScriptsInSequence(widgetScripts, wwwRoot, function () {
                            var body = $('body')[0];
                            var script = el.script().html(scriptHelpersCode)[0];
                            body.appendChild(script);
                            $scope.UpdateWidgetDisplay();
                        });
                        loadScripts.run();
                    };
                    if (widgetData.modelWidget.Id && widgetData.modelWidget.ScriptText) {
                        $scope.passedModelForm = widgetData.modelWidget;
                        $scope.currentForm = JSON.parse(widgetData.modelWidget.ScriptText);
                        $scope.isExistingModel = true;
                    }
                    $scope.ngModelOptions = ngModelOptions;
                    $scope.fieldHelperType = angular.copy(widgetObj.fieldHelperType);
                    $scope.allFieldsObject = angular.copy(widgetObj.allFieldsObject);
                    $scope.allFieldsOptionsArray = angular.copy(widgetObj.allFieldsOptionsArray);
                    if (widgetObj.allResultFieldsObject) {
                        $scope.allResultFieldsObject = angular.copy(widgetObj.allResultFieldsObject);
                        $scope.allResultFieldsOptionsArray = angular.copy(widgetObj.allResultFieldsOptionsArray);
                    }
                    $scope.WidgetScriptBuild = WidgetScriptBuild;
                    $scope.SaveWidget = SaveWidget;
                    $scope.RevertWidget = RevertWidget;
                    $scope.UsePrebuiltForm = UsePrebuiltForm;
                    $scope.ClearSelectedForm = ClearSelectedForm;
                    $scope.SetCurrentForm = SetCurrentForm;
                    $scope.addField = addField;
                    $scope.FilterAvailableFields = FilterAvailableFields;
                    $scope.onDragStart = onDragStart;
                    $scope.onDrop = onDrop;
                    $scope.FilterHiddenFormFields = FilterHiddenFormFields;
                    $scope.FieldExtended = FieldExtended;
                    $scope.UpdateWidget = UpdateWidget;
                    $scope.RemoveField = RemoveField;
                    BuilderInit();
                    $scope.$watchGroup(['currentForm', 'currentForm.buildObject.fields.length', 'currentForm.resultObject.fields.length'], function (newValue) {
                        for (var i = $scope.allFieldsOptionsArray.length - 1; i >= 0; i--) {
                            var field = $scope.allFieldsOptionsArray[i];
                            var cIndex = lth.GetIndexOfFirstObjectInArray($scope.currentForm.buildObject.fields, 'field', field.id);
                            field.isIncluded = !!(cIndex >= 0);
                        }
                        if ($scope.allResultFieldsOptionsArray) {
                            for (var j = $scope.allResultFieldsOptionsArray.length - 1; j >= 0; j--) {
                                var rField = $scope.allResultFieldsOptionsArray[j];
                                var rIndex = lth.GetIndexOfFirstObjectInArray($scope.currentForm.resultObject.fields, 'field', rField.id);
                                rField.isIncluded = !!(rIndex >= 0);
                            }
                        }
                    });
                    function SaveWidget(saveAsNew) {
                        var saveData = angular.copy(widgetData.modelWidget);
                        if ($scope.passedModelForm && $scope.passedModelForm.Name && !saveAsNew) {
                            $scope.currentForm.name = $scope.passedModelForm.Name;
                        }
                        $scope.currentFormStr = JSON.stringify($scope.currentForm);
                        saveData.ScriptText = $scope.currentFormStr;
                        var postData = {
                            httpOptions: { method: 'POST', url: '/Widgets/Builder/Save?v=' + new Date().getTime(), data: saveData },
                            onSuccessFunction: function (result) {
                                if (result.data.DataObject.Id !== widgetData.modelWidget.Id) {
                                    location.assign('/Widgets/Builder/Index/' + result.data.DataObject.Id);
                                }
                            },
                            onErrorFunction: function (error) {
                                window.console && console.error('error save result', error);
                            }
                        };
                        if (saveAsNew || !saveData.Name) {
                            postData.httpOptions.url = '/Widgets/Builder/SaveAsNew?v=' + new Date().getTime();
                            var promptOptions = { promptOptions: { message: 'Enter a new name for this Widget.', title: 'Name:' } };
                            promptOptions.onOk = function (result) {
                                saveData.Name = result;
                                commonServices.dataProcessingModal([postData]);
                            };
                            commonServices.promptModal(promptOptions);
                        }
                        else {
                            commonServices.dataProcessingModal([postData]);
                        }
                    }
                    function RevertWidget() {
                        $scope.currentForm = JSON.parse(widgetData.modelWidget.ScriptText);
                        $scope.WidgetScriptBuild($scope.currentForm);
                        $scope.ClearSelectedForm();
                    }
                    function onDragStart(event, ui, data) {
                        $scope.dragData = data;
                    }
                    function onDrop(event, ui, dropIndex, channel, columns, isPlaceholder) {
                        channel = channel || 'form';
                        var currentObject = (channel === 'result') ? 'resultObject' : 'buildObject';
                        if ($scope.dragData.field) {
                            var newField = { field: $scope.dragData.field };
                            if (columns) {
                                newField.cols = columns;
                            }
                            $scope.currentForm[currentObject].fields.splice(dropIndex + 1, 0, newField);
                            $scope.ClearSelectedForm();
                            $scope.WidgetScriptBuild($scope.currentForm);
                        }
                        else if (lth.isNumber($scope.dragData.index)) {
                            var previousIndex = $scope.dragData.index;
                            if (previousIndex > dropIndex && isPlaceholder) {
                                dropIndex += 1;
                            }
                            ltbh.arrayMove($scope.currentForm[currentObject].fields, previousIndex, dropIndex);
                            if (columns) {
                                $scope.currentForm[currentObject].fields[dropIndex].cols = columns;
                            }
                            $scope.ClearSelectedForm();
                            $scope.WidgetScriptBuild($scope.currentForm);
                        }
                        else {
                            window.console && console.error('No Data Passed from Draggable!!');
                        }
                    }
                    function addField(fieldId, channel) {
                        channel = channel || 'form';
                        var currentObject;
                        var fieldToAdd;
                        if (channel === 'result') {
                            currentObject = 'resultObject';
                            fieldToAdd = { field: $scope.allResultFieldsObject[fieldId].id };
                        }
                        else {
                            currentObject = 'buildObject';
                            fieldToAdd = { field: $scope.allFieldsObject[fieldId].id };
                        }
                        $scope.currentForm[currentObject].fields.push(fieldToAdd);
                        $scope.WidgetScriptBuild($scope.currentForm);
                    }
                    function FilterAvailableFields(field, index, fieldArray) {
                        var isInList = true;
                        if (field.groupName) {
                            for (var i = fieldArray.length - 1; i >= 0; i--) {
                                var iField = fieldArray[i];
                                if (field.groupName === iField.groupName && iField.isIncluded) {
                                    isInList = false;
                                }
                            }
                        }
                        else {
                            isInList = !field.hideFromList && !(!!field.isIncluded && !field.allowMultiples);
                        }
                        return isInList;
                    }
                    function FilterHiddenFormFields(fieldObj, index, fieldArray) {
                        var isHiddenField = false;
                        var fOption = widgetObj.allFieldsObject[fieldObj.field];
                        if (fOption.fieldTemplate.element === 'input' && fOption.fieldTemplate.type === 'hidden') {
                            isHiddenField = true;
                        }
                        return isHiddenField;
                    }
                    function FieldExtended(fieldObj, formObjectType, fieldObjectType) {
                        var fIndex = $scope.currentForm[formObjectType].fields.indexOf(fieldObj);
                        var fieldOpts = lth[fieldObjectType][fieldObj.field];
                        var customFieldNameIndex = null;
                        if (fieldOpts.id === 'customhidden') {
                            fieldObj.attrs = fieldObj.attrs || [];
                            customFieldNameIndex = lth.GetIndexOfFirstObjectInArray(fieldObj.attrs, 'name', 'data-lt-additional-info-key');
                            if (customFieldNameIndex === -1) {
                                fieldObj.attrs.push({ name: 'data-lt-additional-info-key', value: '' });
                                customFieldNameIndex = lth.GetIndexOfFirstObjectInArray(fieldObj.attrs, 'name', 'data-lt-additional-info-key');
                            }
                        }
                        return { index: fIndex, fieldOptions: fieldOpts, additionalInfoIndex: customFieldNameIndex };
                    }
                    function RemoveField(index, formObjectType) {
                        var confirmRemove = {
                            confirmOptions: {
                                title: 'Remove:',
                                headerStyle: 'alert alert-danger',
                                message: 'Are you sure you want to remove?'
                            },
                            onConfirm: function () {
                                $scope.currentForm[formObjectType].fields.splice(index, 1);
                                UpdateWidget();
                            }
                        };
                        commonServices.confirmModal(confirmRemove);
                    }
                    function UpdateWidget() {
                        WidgetScriptBuild($scope.currentForm);
                    }
                    function UsePrebuiltForm() {
                        $scope.selectedForm = $scope.selectedForm || $scope.widgetObject.prebuiltForms[0];
                        $scope.currentForm = angular.copy($scope.selectedForm);
                        $scope.WidgetScriptBuild($scope.currentForm);
                    }
                    function BuilderInit() {
                        $scope.widgetObject = angular.copy(widgetObj);
                        if ($scope.currentForm) {
                            $scope.WidgetScriptBuild($scope.currentForm);
                        }
                        else {
                            $scope.UsePrebuiltForm();
                        }
                    }
                    function ClearSelectedForm() {
                        $scope.selectedForm = { name: 'modified' };
                    }
                    function SetCurrentForm(currentForm) {
                        $scope.currentForm = currentForm;
                    }
                    function WidgetScriptBuild(currentFormObj) {
                        currentFormObj.buildObject.widgetType = widgetObj.widgetType;
                        if (currentFormObj.resultObject) {
                            currentFormObj.resultObject.widgetType = widgetObj.widgetType;
                        }
                        $scope.editFieldData = {
                            widgetTypeLower: widgetData.modelWidget.WidgetType.toLowerCase(),
                            currentForm: $scope.currentForm,
                            clearSelectedForm: $scope.ClearSelectedForm,
                            onDragStart: $scope.onDragStart,
                            setCurrentForm: $scope.SetCurrentForm,
                            buildScript: $scope.WidgetScriptBuild
                        };
                        $scope.editFormInfo = {
                            formObjectType: 'buildObject',
                            currentForm: $scope.currentForm,
                            clearSelectedForm: $scope.ClearSelectedForm,
                            setCurrentForm: $scope.SetCurrentForm,
                            buildScript: $scope.WidgetScriptBuild
                        };
                        $scope.editResultInfo = angular.copy($scope.editFormInfo);
                        $scope.editResultInfo.formObjectType = 'resultObject';
                        var cfo = angular.copy(currentFormObj);
                        var cbo = angular.copy(cfo.buildObject);
                        var cbod = angular.copy(cfo.buildObject);
                        var cro = (cfo.resultObject) ? angular.copy(cfo.resultObject) : null;
                        var crod = (cfo.resultObject) ? angular.copy(cfo.resultObject) : null;
                        var wScript = '<style type="text/css">.ltw {display:none;}</style>';
                        var wScriptDisplay = wScript;
                        var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cbo.fields, 'field', 'captcha') >= 0;
                        var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
                        var unReplaceRegEx = /#un{[^\}]+}/g;
                        var formStyles = '';
                        var uniqueQualifierForm = lth.getUniqueQualifier('F');
                        var uniqueQualifierResult = lth.getUniqueQualifier('R');
                        cbod.showBuilderTools = true;
                        cbo.postDOMCallback = '#fn{postDOMFunctions}';
                        cbod.postDOMCallback = '#fn{postDOMFunctions}';
                        cbo.uniqueQualifier = uniqueQualifierForm;
                        cbod.uniqueQualifier = uniqueQualifierForm;
                        if (cro) {
                            cro.uniqueQualifier = uniqueQualifierResult;
                        }
                        if (crod) {
                            crod.showBuilderTools = true;
                            crod.uniqueQualifier = uniqueQualifierResult;
                        }
                        for (var iCss = 0, lCss = ltWidgetCSS.length; iCss < lCss; iCss++) {
                            var cssHref = ltWidgetCSS[iCss];
                            var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
                            wScript += cssLink;
                            wScriptDisplay += cssLink;
                        }
                        var widgetWrapper = lth.Interpolate('\n<div id="ltWidgetWrapper_#{uniqueF}"></div>', { uniqueF: uniqueQualifierForm });
                        if (cro) {
                            widgetWrapper += lth.Interpolate('\n<div id="ltWidgetResultWrapper_#{uniqueR}"></div>', { uniqueR: uniqueQualifierResult });
                        }
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
                        var captchaOptions = { uniqueQualifier: uniqueQualifierForm };
                        var captchaVar = "\n\t\t\t\t\t\tvar ltCap#un{unique};\n\t\t\t\t\t\tvar ltCapOpts#un{unique} = #{capOp};";
                        captchaVar = lth.Interpolate(captchaVar, { capOp: JSON.stringify(captchaOptions, null, 2) });
                        if (hasCaptchaField) {
                            mainScript += captchaVar;
                            mainScriptDisplay += captchaVar;
                        }
                        var postDomCode = '/*code ran after DOM created*/', postDomFn = "\n\t\t\t\t\t\tvar pdfun = function () {\n\t\t\t\t\t\t\t#{code}\n\t\t\t\t\t\t};";
                        if (hasCaptchaField) {
                            postDomCode += "\n\t\t\t\t\t\t\tltCap#un{unique} = new LoanTekCaptcha(ltjq, ltCapOpts#un{unique});";
                        }
                        mainScript += lth.Interpolate(postDomFn, { code: postDomCode });
                        mainScriptDisplay += lth.Interpolate(postDomFn, { code: postDomCode });
                        var extValid_mainScript, extValid_mainScriptDisplay;
                        var extValid = "\n\t\t\t\t\t\tvar ev = function () {\n\t\t\t\t\t\t\t#{validReturn}\n\t\t\t\t\t\t};";
                        if (hasCaptchaField) {
                            extValid_mainScript = lth.Interpolate(extValid, { validReturn: 'return ltCap#un{unique}.IsValidEntry();' });
                            extValid_mainScriptDisplay = lth.Interpolate(extValid, { validReturn: 'return ltCap#un{unique}.IsValidEntry() && false;' });
                        }
                        else {
                            extValid_mainScript = lth.Interpolate(extValid, { validReturn: 'return true;' });
                            extValid_mainScriptDisplay = lth.Interpolate(extValid, { validReturn: 'return false;' });
                        }
                        mainScript += extValid_mainScript;
                        mainScriptDisplay += extValid_mainScriptDisplay;
                        var buildObjectWrap = "\n\t\t\t\t\t\tvar ltwbo#un{unique} = #{bow};";
                        var cboString = JSON.stringify(cbo, null, 2);
                        var cbodString = JSON.stringify(cbod, null, 2);
                        mainScript += lth.Interpolate(buildObjectWrap, { bow: cboString });
                        mainScriptDisplay += lth.Interpolate(buildObjectWrap, { bow: cbodString });
                        var ltWidgetOptions = {
                            postUrl: widgetData.modelUrls[0],
                            externalValidatorFunction: '#fn{externalValidators}',
                            clientId: widgetData.modelWidget.ClientId,
                            userId: widgetData.modelWidget.UserId,
                            uniqueQualifier: uniqueQualifierForm
                        };
                        var ltWidgetOptionsWrap = "\n\t\t\t\t\t\tvar ltwo#un{unique} = #{cwow};";
                        var ltWidgetOptionsWithResultsObject = angular.copy(ltWidgetOptions);
                        var ltWidgetOptionsWithResultsObjDisplay = angular.copy(ltWidgetOptions);
                        if (cro) {
                            ltWidgetOptionsWithResultsObject.resultDisplayOptions = cro;
                        }
                        if (crod) {
                            ltWidgetOptionsWithResultsObjDisplay.resultDisplayOptions = crod;
                        }
                        mainScript += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptionsWithResultsObject, null, 2) });
                        mainScriptDisplay += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptionsWithResultsObjDisplay, null, 2) });
                        var widgetBuildForm = "\n\t\t\t\t\t\tvar ltwfb#un{unique} = new LoanTekWidget.FormBuild(ltjq, lthlpr, ltwbo#un{unique}, ltwo#un{unique});";
                        mainScript += widgetBuildForm;
                        mainScriptDisplay += widgetBuildForm;
                        mainScript = lth.Interpolate(mainScript, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);
                        mainScriptDisplay = lth.Interpolate(mainScriptDisplay, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);
                        var mainScriptWrap = "\n\t\t\t\t\t\t<script type=\"text/javascript\">\n\t\t\t\t\t\t(function () {#{m}\n\t\t\t\t\t\t})();\n\t\t\t\t\t\t</script>";
                        mainScript = lth.Interpolate(mainScriptWrap, { m: mainScript });
                        mainScriptDisplay = lth.Interpolate(mainScriptWrap, { m: mainScriptDisplay });
                        mainScript = lth.Interpolate(mainScript, { unique: uniqueQualifierForm }, null, unReplaceRegEx);
                        mainScriptDisplay = lth.Interpolate(mainScriptDisplay, { unique: uniqueQualifierForm }, null, unReplaceRegEx);
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
    LoanTekWidget.WidgetBuilder = WidgetBuilder;
})(LoanTekWidget || (LoanTekWidget = {}));
