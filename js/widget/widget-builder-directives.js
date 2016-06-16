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
                templateUrl: 'template/widgetFormEditButton.html',
                link: function (scope, elem, attrs) {
                    scope.EditWidgetForm = function () {
                        var formEditOptions = {
                            instanceOptions: {
                                currentForm: angular.copy(scope.currentForm)
                            },
                            saveForm: function (updatedForm) {
                                scope.currentForm = updatedForm;
                                scope.selectedForm = {};
                                scope.WidgetScriptBuild(scope.currentForm);
                            }
                        };
                        widgetServices.editForm(formEditOptions);
                    };
                }
            };
        }]);
    widgetDirectives.directive('ltFieldEditTool', ['$timeout', 'widgetServices', function ($timeout, widgetServices) {
            return {
                restrict: 'A',
                scope: {
                    toolInfo: '=ltFieldEditTool',
                    fieldData: '=ltFieldEditToolData'
                },
                templateUrl: 'template/widgetFieldEditButtons.html',
                link: function (scope, elem, attrs) {
                    scope.currentFieldName = scope.fieldData.currentForm.buildObject.fields[scope.toolInfo.index].field;
                    if (scope.fieldData.widgetTypeLower === 'quotewidget') {
                    }
                    else if (scope.fieldData.widgetTypeLower === 'ratewidget') {
                    }
                    else {
                        scope.currentAvailableField = lth.contactFields[scope.currentFieldName];
                    }
                    scope.showRemove = false;
                    if (!scope.currentAvailableField.isLTRequired) {
                        scope.showRemove = true;
                    }
                    scope.RemoveWidgetField = function () {
                        var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
                        confirmInfo.onConfirm = function () {
                            delete scope.fieldData.currentForm.buildObject.fields.splice(scope.toolInfo.index, 1);
                            scope.fieldData.clearSelectedForm();
                            scope.fieldData.buildScript(scope.fieldData.currentForm);
                        };
                        confirmInfo.onCancel = function () { };
                        widgetServices.confirmModal(confirmInfo);
                    };
                    scope.EditWidgetField = function () {
                        var fieldEditOptions = {
                            instanceOptions: {
                                currentForm: angular.copy(scope.fieldData.currentForm),
                                currentFieldIndex: scope.toolInfo.index
                            },
                            saveForm: function (updatedForm) {
                                scope.fieldData.setCurrentForm(updatedForm);
                                scope.fieldData.clearSelectedForm();
                                scope.fieldData.buildScript(updatedForm);
                            }
                        };
                        var el = scope.currentAvailableField.fieldTemplate.element;
                        var ty = scope.currentAvailableField.fieldTemplate.type;
                        window.console && console.log('el', el, 'ty', ty);
                        if (el === 'input') {
                            if (ty === 'button') {
                                fieldEditOptions.fieldType = 'input_button';
                            }
                            else {
                                fieldEditOptions.fieldType = 'input_text';
                            }
                        }
                        else {
                        }
                        window.console && console.log(fieldEditOptions.fieldType);
                        widgetServices.editField(fieldEditOptions);
                    };
                }
            };
        }]);
})();
