var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
var LoanTekWidget;
(function (LoanTekWidget) {
    var WidgetBuilder = (function () {
        function WidgetBuilder($, widgetData) {
            var _thisC = this;
            var lth = LoanTekWidgetHelper;
            var el = lth.CreateElement();
            var wwwRoot = window.location.port === '8080' ? '' : '//www.loantek.com';
            var ltWidgetCSS = [
                '/css/widget.css'
            ];
            var scriptLibLocation = '/js/lib/';
            var widgetScripts = [
                scriptLibLocation + 'jquery.min.js',
                scriptLibLocation + 'jquery.placeholder.min.js',
                '/js/widget/widget.js'
            ];
            $('input textarea').placeholder();
            var widgetBuilderApp = angular.module('WidgetBuilder', ['ui.bootstrap', 'ngAnimate', 'ltw.services', 'ltw.directives', 'ltw.templates']);
            widgetBuilderApp.controller('WidgetBuilderController', ['$scope', function ($scope) {
                    window.console && console.log('widgetData: ', widgetData);
                }]);
        }
        return WidgetBuilder;
    }());
    LoanTekWidget.WidgetBuilder = WidgetBuilder;
})(LoanTekWidget || (LoanTekWidget = {}));
