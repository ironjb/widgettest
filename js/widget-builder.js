(function () {
    var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate']);
    widgetBuilderApp.controller('WidgetBuilderController', ['$scope', function ($scope) {
            $scope.demo = 'demo';
            var WidgetType;
            (function (WidgetType) {
                WidgetType[WidgetType["contact"] = 0] = "contact";
                WidgetType[WidgetType["quote"] = 1] = "quote";
                WidgetType[WidgetType["rate"] = 2] = "rate";
            })(WidgetType || (WidgetType = {}));
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
                                fieldSize: BootstrapSizing.sm,
                                fields: []
                            }
                        }
                    ]
                },
                quote: {},
                rate: {}
            };
            $scope.currentWidget = widgets[currentWidgetType];
        }]);
})();
