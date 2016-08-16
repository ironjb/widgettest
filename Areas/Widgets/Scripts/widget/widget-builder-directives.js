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
                    scope.EditWidgetForm = function () {
                        var formEditOptions = {
                            instanceOptions: {
                                currentForm: angular.copy(scope.toolInfo.currentForm),
                                formObjectType: scope.toolInfo.formObjectType
                            },
                            saveForm: function (updatedForm) {
                                scope.toolInfo.setCurrentForm(updatedForm);
                                scope.toolInfo.clearSelectedForm();
                                scope.toolInfo.buildScript(updatedForm);
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
                    var currentObject = scope.toolInfo.channel === 'form' ? 'buildObject' : 'resultObject';
                    scope.currentFieldName = scope.fieldData.currentForm[currentObject].fields[scope.toolInfo.index].field;
                    if (scope.fieldData.widgetTypeLower === 'quotewidget') {
                    }
                    else if (scope.fieldData.widgetTypeLower === 'ratewidget') {
                    }
                    else if (scope.fieldData.widgetTypeLower === 'depositwidget') {
                        if (currentObject === 'resultObject') {
                            scope.currentFieldOptions = lth.depositResultFields[scope.currentFieldName];
                        }
                        else {
                            scope.currentFieldOptions = lth.depositFields[scope.currentFieldName];
                        }
                    }
                    else {
                        scope.currentFieldOptions = lth.contactFields[scope.currentFieldName];
                    }
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
                                currentForm: angular.copy(scope.fieldData.currentForm),
                                currentFieldIndex: scope.toolInfo.index,
                                formObjectType: currentObject
                            },
                            fieldOptions: scope.currentFieldOptions,
                            saveForm: function (updatedForm) {
                                scope.fieldData.setCurrentForm(updatedForm);
                                scope.fieldData.clearSelectedForm();
                                scope.fieldData.buildScript(updatedForm);
                            }
                        };
                        widgetServices.editField(fieldEditOptions);
                    };
                }
            };
        }]);
})();
