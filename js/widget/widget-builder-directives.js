var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function () {
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
    widgetDirectives.directive('ltFieldEditTool', ['widgetServices', function (widgetServices) {
            return {
                restrict: 'A',
                scope: {
                    toolInfo: '=ltFieldEditTool',
                    currentForm: '=ltEditToolCurrentForm',
                    buildScript: '=ltEditToolBuildScript'
                },
                templateUrl: 'template/widgetFieldEditButtons.html',
                link: function (scope, elem, attrs) {
                    scope.RemoveWidgetField = function () {
                        var confirmInfo = { confirmOptions: { message: 'Are you sure you want to delete?' }, onConfirm: null, onCancel: null };
                        confirmInfo.onConfirm = function () {
                            delete scope.currentForm.buildObject.fields.splice(scope.toolInfo.index, 1);
                            scope.buildScript(scope.currentForm);
                        };
                        confirmInfo.onCancel = function () { };
                        widgetServices.confirmModal(confirmInfo);
                    };
                    scope.EditWidgetField = function () {
                    };
                }
            };
        }]);
})();
