var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function () {
    var lth = LoanTekWidgetHelper;
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
                scope: {
                    toolInfo: '=ltFormEditTool'
                },
                templateUrl: 'template/widgetFormEditButton.html',
                link: function (scope, elem, attrs) {
                    var currentBuildObj = angular.copy(scope.toolInfo.currentForm[scope.toolInfo.formObjectType]);
                    scope.EditWidgetForm = function () {
                        var formEditOptions = {
                            instanceOptions: {
                                currentBuildObject: currentBuildObj
                            },
                            saveForm: function (updatedBuildObject) {
                                scope.toolInfo.currentForm[scope.toolInfo.formObjectType] = updatedBuildObject;
                                scope.toolInfo.currentForm.name = 'modified';
                                scope.toolInfo.setCurrentForm(scope.toolInfo.currentForm);
                                scope.toolInfo.clearSelectedForm();
                                scope.toolInfo.buildScript(scope.toolInfo.currentForm);
                            }
                        };
                        widgetServices.editForm(formEditOptions);
                    };
                }
            };
        }]);
    widgetDirectives.directive('ltFieldEditTool', ['$timeout', 'commonServices', 'widgetServices', function ($timeout, commonServices, widgetServices) {
            return {
                restrict: 'A',
                scope: {
                    toolInfo: '=ltFieldEditTool',
                    fieldData: '=ltFieldEditToolData'
                },
                templateUrl: 'template/widgetFieldEditButtons.html',
                link: function (scope, elem, attrs) {
                    scope.onDragStartDir = scope.fieldData.onDragStart;
                    scope.toolInfo.channel = scope.toolInfo.channel || 'form';
                    var currentObject;
                    if (scope.toolInfo.channel === 'result') {
                        currentObject = 'resultObject';
                    }
                    else if (scope.toolInfo.channel === 'repeat') {
                        currentObject = 'fieldListOptions';
                    }
                    else {
                        currentObject = 'buildObject';
                    }
                    scope.currentFieldName = scope.fieldData.currentForm[currentObject].fields[scope.toolInfo.index].field;
                    scope.currentFieldOptions = lth.GetFieldOptionsForWidgetType(scope.fieldData.widgetTypeLower, scope.currentFieldName, currentObject);
                    scope.showRemove = false;
                    if (!scope.currentFieldOptions.isLTRequired) {
                        scope.showRemove = true;
                    }
                    scope.RemoveWidgetField = function () {
                        var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
                        confirmInfo.onConfirm = function () {
                            delete scope.fieldData.currentForm[currentObject].fields.splice(scope.toolInfo.index, 1);
                            scope.fieldData.setCurrentForm(angular.copy(scope.fieldData.currentForm));
                            scope.fieldData.clearSelectedForm();
                            scope.fieldData.buildScript(scope.fieldData.currentForm);
                        };
                        confirmInfo.onCancel = function () { };
                        commonServices.confirmModal(confirmInfo);
                    };
                    scope.EditWidgetField = function () {
                        var fieldEditOptions = {
                            instanceOptions: {
                                currentBuildObject: angular.copy(scope.fieldData.currentForm[currentObject]),
                                currentFieldIndex: scope.toolInfo.index,
                                formObjectType: currentObject,
                                fieldOptions: scope.currentFieldOptions
                            },
                            saveForm: function (updatedBuildObject) {
                                scope.fieldData.currentForm[currentObject] = updatedBuildObject;
                                scope.fieldData.setCurrentForm(scope.fieldData.currentForm);
                                scope.fieldData.clearSelectedForm();
                                scope.fieldData.buildScript(scope.fieldData.currentForm);
                            }
                        };
                        if (scope.currentFieldOptions.fieldTemplate.element === 'repeat') {
                            widgetServices.editRepeatField(fieldEditOptions);
                        }
                        else {
                            widgetServices.editField(fieldEditOptions);
                        }
                    };
                }
            };
        }]);
})();
