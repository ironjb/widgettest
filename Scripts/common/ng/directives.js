(function () {
    var ltDirectives = angular.module('lt.directives', []);
    ltDirectives.directive('onFileChange', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                scope: {
                    'onFileChange': '&'
                },
                link: function (scope, elem, attrs) {
                    elem.bind('change', function () {
                        scope.$evalAsync(function (scope2) {
                            var el = elem[0];
                            if (el.files) {
                                scope2.onFileChange({ onChangeFileList: el.files });
                            }
                            else if (el.value) {
                                window.console && console.log('browser not supported', el.value);
                            }
                            else {
                                window.console && console.log('no file detected');
                            }
                        });
                    });
                }
            };
        }]);
})();
