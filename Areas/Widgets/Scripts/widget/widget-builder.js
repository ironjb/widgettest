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
            if (widgetData.modelWidget.WidgetType.toLowerCase() === 'mortgagequotewidget') {
                widgetObj.fieldHelperType = 'mortgageQuoteFields';
                widgetObj.widgetType = lth.widgetType.mortgagequote.id;
            }
            else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'mortgageratewidget') {
                widgetObj.fieldHelperType = 'mortgageRateFields';
                widgetObj.widgetType = lth.widgetType.mortgagerate.id;
                widgetObj.allFieldsObject = lth.mortgageRateFields;
                widgetObj.allFieldsOptionsArray = lth.mortgageRateFields.asArray();
                widgetObj.allResultFieldsObject = lth.mortgageRateResultFields;
                widgetObj.allResultFieldsOptionsArray = lth.mortgageRateResultFields.asArray();
            }
            else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'depositwidget') {
                widgetObj.fieldHelperType = 'depositFields';
                widgetObj.widgetType = lth.widgetType.deposit.id;
                widgetObj.allFieldsObject = lth.depositFields;
                widgetObj.allFieldsOptionsArray = lth.depositFields.asArray();
                widgetObj.allResultFieldsObject = lth.depositResultFields;
                widgetObj.allResultFieldsOptionsArray = lth.depositResultFields.asArray();
            }
            else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'autoquotewidget') {
                widgetObj.fieldHelperType = 'autoQuoteFields';
                widgetObj.widgetType = lth.widgetType.autoquote.id;
                widgetObj.allFieldsObject = lth.autoQuoteFields;
                widgetObj.allFieldsOptionsArray = lth.autoQuoteFields.asArray();
                widgetObj.allResultFieldsObject = lth.autoQuoteResultFields;
                widgetObj.allResultFieldsOptionsArray = lth.autoQuoteResultFields.asArray();
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
                        ltWidgetCSS = ['/Content/font-awesome.min.css', '/Areas/Widgets/Content/widget.css', '/Areas/Widgets/Content/lt-captcha.css'];
                        widgetScripts = [
                            '/Scripts/lib/jquery-1/jquery.min.js',
                            '/Scripts/lib/jquery/jquery.placeholder.min.js',
                            '/Scripts/lib/bootstrap/bootstrap.min.js',
                            '/Scripts/lib/datatables/jquery.dataTables.min.js',
                            '/Scripts/lib/datatables/dataTables.bootstrap.min.js',
                            '/Areas/Widgets/Scripts/post-object/contact.js',
                            '/Areas/Widgets/Scripts/post-object/deposit.js',
                            '/Areas/Widgets/Scripts/post-object/autoquote.js',
                            '/Areas/Widgets/Scripts/post-object/mortgagerate.js',
                            '/Areas/Widgets/Scripts/common/lt-captcha.js',
                            '/Areas/Widgets/Scripts/common/widget-helpers.js',
                            '/Areas/Widgets/Scripts/widget/widget.js'
                        ];
                    }
                    var scriptLoader = function () {
                        var loadScripts = new LoanTekWidget.LoadScriptsInSequence(widgetScripts, wwwRoot, function () {
                            var body = $('body')[0];
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
                        if ($scope.allResultFieldsOptionsArray && $scope.currentForm.resultObject) {
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
                        var uiFieldIndex;
                        var fIndex = $scope.currentForm[formObjectType].fields.indexOf(fieldObj);
                        var fieldOpts = lth[fieldObjectType][fieldObj.field];
                        var customFieldNameIndex = null;
                        var returnFieldExt = { index: fIndex, fieldOptions: fieldOpts, UiFieldType: 'text' };
                        if (widgetData.modelUiFields && Array.isArray(widgetData.modelUiFields)) {
                            var fieldOptId = fieldOpts.groupName ? fieldOpts.groupName : fieldOpts.id;
                            uiFieldIndex = lth.GetIndexOfFirstObjectInArray(widgetData.modelUiFields, 'Name', fieldOptId, true);
                            if (uiFieldIndex !== -1) {
                                returnFieldExt.UiField = angular.copy(widgetData.modelUiFields[uiFieldIndex]);
                                if (returnFieldExt.UiField.FieldType.toLowerCase() === 'select') {
                                    returnFieldExt.UiFieldType = 'select';
                                }
                                else if (returnFieldExt.UiField.FieldType.toLowerCase() === 'checkbox') {
                                    returnFieldExt.UiFieldType = 'checkbox';
                                }
                                else {
                                    if (returnFieldExt.UiField.InputType) {
                                        returnFieldExt.UiFieldType = returnFieldExt.UiField.InputType.toLowerCase();
                                    }
                                }
                            }
                        }
                        if (fieldOpts.id === 'customhidden') {
                            fieldObj.attrs = fieldObj.attrs || [];
                            customFieldNameIndex = lth.GetIndexOfFirstObjectInArray(fieldObj.attrs, 'name', 'data-lt-additional-info-key');
                            if (customFieldNameIndex === -1) {
                                fieldObj.attrs.push({ name: 'data-lt-additional-info-key', value: '' });
                                customFieldNameIndex = lth.GetIndexOfFirstObjectInArray(fieldObj.attrs, 'name', 'data-lt-additional-info-key');
                            }
                            returnFieldExt.additionalInfoIndex = customFieldNameIndex;
                        }
                        if (['quotingchannel', 'fortype'].indexOf(fieldOpts.id) !== -1) {
                            returnFieldExt.UiFieldDisabled = true;
                        }
                        return returnFieldExt;
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
                    function SetDefaultValues(fields, fieldHelperType) {
                        for (var i = fields.length - 1; i >= 0; i--) {
                            var field = fields[i];
                            var fieldExt = lth.ExtendWidgetFieldTemplate(field, fieldHelperType);
                            if (typeof field.value === 'undefined') {
                                if (widgetData.modelUiFields && Array.isArray(widgetData.modelUiFields)) {
                                    var fieldExtId = fieldExt.field.replace(/hidden$/, '').replace(/_d_/g, '.');
                                    var uiFieldIndex = lth.GetIndexOfFirstObjectInArray(widgetData.modelUiFields, 'Name', fieldExtId, true);
                                    if (uiFieldIndex !== -1) {
                                        var currentUiField = angular.copy(widgetData.modelUiFields[uiFieldIndex]);
                                        var currentFieldType = currentUiField.FieldType ? currentUiField.FieldType.toLowerCase() : 'input';
                                        var currentInputType = currentUiField.InputType ? currentUiField.InputType.toLowerCase() : 'text';
                                        if (currentInputType === 'number' && currentUiField.Value && typeof currentUiField.Value !== 'number') {
                                            var UiFieldVal = currentUiField.Value;
                                            var UiFieldValNum = +UiFieldVal.replace(/[^\d/.]/g, '');
                                            if (lth.isNumber(UiFieldValNum)) {
                                                currentUiField.Value = UiFieldValNum;
                                            }
                                        }
                                        if ((currentUiField.Value || lth.isNumber(currentUiField.Value) || typeof currentUiField.Value === 'boolean') && currentFieldType !== 'select') {
                                            field.value = currentUiField.Value;
                                        }
                                        if (currentUiField.DefaultValue || lth.isNumber(currentUiField.DefaultValue) || typeof currentUiField.DefaultValue === 'boolean') {
                                            field.value = currentUiField.DefaultValue;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    function SetSelectOptions(fields, fieldHelperType) {
                        for (var i = fields.length - 1; i >= 0; i--) {
                            var field = fields[i];
                            var fieldExt = lth.ExtendWidgetFieldTemplate(field, fieldHelperType);
                            if (widgetData.modelUiFields && Array.isArray(widgetData.modelUiFields)) {
                                var uiFieldIndex = lth.GetIndexOfFirstObjectInArray(widgetData.modelUiFields, 'Name', fieldExt.field, true);
                                if (uiFieldIndex !== -1) {
                                    var currentUiField = widgetData.modelUiFields[uiFieldIndex];
                                    var currentFieldType = currentUiField.FieldType ? currentUiField.FieldType.toLowerCase() : 'input';
                                    if (currentFieldType === 'select' && Array.isArray(currentUiField.Value)) {
                                        field.selectOptions = currentUiField.Value;
                                    }
                                }
                            }
                        }
                    }
                    function WidgetScriptBuild(currentFormObj) {
                        currentFormObj.buildObject.widgetType = widgetObj.widgetType;
                        SetDefaultValues($scope.currentForm.buildObject.fields, widgetObj.fieldHelperType);
                        if (currentFormObj.resultObject) {
                            currentFormObj.resultObject.widgetType = widgetObj.widgetType;
                        }
                        $scope.editFieldData = {
                            widgetTypeLower: widgetData.modelWidget.WidgetType.toLowerCase(),
                            currentForm: $scope.currentForm,
                            clearSelectedForm: $scope.ClearSelectedForm,
                            onDragStart: $scope.onDragStart,
                            setCurrentForm: $scope.SetCurrentForm,
                            buildScript: $scope.WidgetScriptBuild,
                            uiFields: angular.copy(widgetData.modelUiFields)
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
                        var wScript = '<style type="text/css">.ltw {display:none;}</style>';
                        var wScriptDisplay = wScript;
                        for (var iCss = 0, lCss = ltWidgetCSS.length; iCss < lCss; iCss++) {
                            var cssHref = ltWidgetCSS[iCss];
                            var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
                            wScript += cssLink;
                            wScriptDisplay += cssLink;
                        }
                        var initialScripts = '';
                        var initialScriptsDisplay = '';
                        var scriptHelpersCode = "\n\t\t\t\t\t\t<script type=\"text/javascript\">\n\t\t\t\t\t\t\tvar ltw_ltjq = ltw_ltjq || jQuery.noConflict(true);\n\t\t\t\t\t\t\tvar ltw_lthlpr = new LoanTekWidget.helpers(ltw_ltjq);\n\t\t\t\t\t\t\tltw_ltjq(document).off('.data-api');\n\t\t\t\t\t\t</script>";
                        for (var iScript = 0, lScript = widgetScripts.length; iScript < lScript; iScript++) {
                            var scriptSrc = widgetScripts[iScript];
                            var scriptLink = lth.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
                            initialScripts += scriptLink;
                        }
                        initialScripts += scriptHelpersCode;
                        initialScriptsDisplay += scriptHelpersCode;
                        var currentFormObjCopy = angular.copy(currentFormObj);
                        SetSelectOptions(currentFormObjCopy.buildObject.fields, widgetObj.fieldHelperType);
                        var scriptBuildInfo = {
                            url: widgetData.modelWidget.PostingUrl,
                            ClientId: widgetData.modelWidget.ClientId,
                            UserId: widgetData.modelWidget.UserId,
                            formObject: currentFormObjCopy,
                            initialScript: initialScripts
                        };
                        var scriptBuild = lth.BuildWidgetScript(scriptBuildInfo);
                        scriptBuildInfo.initialScript = initialScriptsDisplay;
                        var scriptBuildDisplay = lth.BuildWidgetScript(scriptBuildInfo, true);
                        wScript += scriptBuild;
                        wScriptDisplay += scriptBuildDisplay;
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
