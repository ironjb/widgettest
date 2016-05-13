(function () {
    var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate']);
    widgetBuilderApp.controller('WidgetBuilderController', ['$scope', function ($scope) {
            $scope.demo = 'demo';
            var WidgetType = {
                contact: 'contact',
                quote: 'quote',
                rate: 'rate'
            };
            var BootstrapSizing = {
                xs: 'xs',
                sm: 'sm',
                md: 'md',
                lg: 'lg'
            };
            var currentWidgetType = WidgetType.contact;
            var widgets = {
                contact: {
                    prebuiltTemplates: [
                        {
                            name: 'Default Contact Widget',
                            template: {
                                fields: []
                            }
                        }
                    ],
                    allAvailableFields: [
                        { name: 'firstname', isLTRequired: true, isIncluded: true }
                    ]
                },
                quote: {
                    allAvailableFields: []
                },
                rate: {
                    allAvailableFields: []
                }
            };
            var BuilderSetup = function () {
                $scope.currentWidget = angular.copy(widgets[currentWidgetType]);
                $scope.selectedTemplate = $scope.selectedTemplate || $scope.currentWidget.prebuiltTemplates[0];
                window.console && console.log(currentWidgetType, $scope.currentWidget.prebuiltTemplates);
            };
            BuilderSetup();
            $scope.UsePrebuiltTemplate = function (tmp) {
                window.console && console.log('use this template: ', tmp.name);
            };
        }]);
})();
