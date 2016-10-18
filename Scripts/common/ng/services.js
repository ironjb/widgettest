(function () {
    var ltServices = angular.module('lt.services', ['ngSanitize']);
    var ngModelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
    ltServices.factory('commonServices', ['$uibModal', function ($uibModal) {
            var commonMethods = {};
            commonMethods.weekDays = [
                { id: 0, short: 'Su', name: 'Sunday' },
                { id: 1, short: 'Mo', name: 'Monday' },
                { id: 2, short: 'Tu', name: 'Tuesday' },
                { id: 3, short: 'We', name: 'Wednesday' },
                { id: 4, short: 'Th', name: 'Thursday' },
                { id: 5, short: 'Fr', name: 'Friday' },
                { id: 6, short: 'Sa', name: 'Saturday' }
            ];
            commonMethods.urlQualifier = Math.floor((Math.random() * 999999999) + 1);
            commonMethods.padZeros = function (num, size) {
                var s = num + '';
                while (s.length < size) {
                    s = '0' + s;
                }
                return s;
            };
            commonMethods.getObjectLength = function (obj) {
                var count = 0;
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        count++;
                    }
                }
                return count;
            };
            commonMethods.convertHourMinSecToDateTime = function (time, date) {
                if (date === void 0) { date = 'January 1, 1970'; }
                var cDate = new Date(date + ' ' + time);
                return cDate;
            };
            commonMethods.getDayOfWeekObject = function (weekNumber) {
                return commonMethods.weekDays[weekNumber];
            };
            commonMethods.scrollToAnchor = function (anchorName, scrollSpeed, scrollDelay, topOffset) {
                scrollSpeed = scrollSpeed || 200;
                scrollDelay = scrollDelay || 0;
                topOffset = topOffset || 75;
                var anchorElement = angular.element('a[name=' + anchorName + ']');
                if (anchorElement.offset()) {
                    angular.element('html, body').delay(scrollDelay).animate({
                        scrollTop: (anchorElement.offset().top) - topOffset
                    }, scrollSpeed);
                }
                else {
                    window.console && console.error('Can not find anchor element by name of ' + anchorName);
                }
            };
            commonMethods.isInvalidField = function (form, fieldName, validatorType) {
                validatorType = validatorType || 'required';
                var isInvalid = false;
                var field = form[fieldName];
                var isErrorPresentForType = field ? field.$error[validatorType] : false;
                if (form.$submitted || (field && field.$touched)) {
                    isInvalid = isErrorPresentForType || false;
                }
                return isInvalid;
            };
            commonMethods.spinnerModal = function (options) {
                var settings = {
                    animation: true,
                    template: null,
                    windowTemplateUrl: 'template/modal-template/empty.html',
                    templateUrl: 'template/modal/fa-spinner.html',
                    backdrop: 'static',
                    keyboard: false,
                    size: 'sm',
                    modalCloseDelay: 200
                };
                angular.extend(settings, options);
                var modalInstance = $uibModal.open({
                    animation: settings.animation,
                    template: settings.template,
                    windowTemplateUrl: settings.windowTemplateUrl,
                    templateUrl: settings.templateUrl,
                    backdrop: settings.backdrop,
                    keyboard: settings.keyboard,
                    size: settings.size
                });
                this.close = function () {
                    setTimeout(function () {
                        modalInstance.close();
                    }, settings.modalCloseDelay);
                };
            };
            commonMethods.dataProcessingModal = function (optionsArray, staticOptions) {
                if (!$.isArray(optionsArray)) {
                    optionsArray = [optionsArray];
                }
                var settings = { modalCloseDelay: 200 };
                angular.extend(settings, staticOptions);
                var _thisController = ['$scope', '$uibModalInstance', '$http', '$timeout', 'httpOptionsArray', function ($scope, $uibModalInstance, $http, $timeout, httpOptionsArray) {
                        var index = 0;
                        var arrLength = httpOptionsArray.length;
                        var httpProcess = function (index) {
                            var proccessSettings = { processingMessage: 'Processing' };
                            angular.extend(proccessSettings, httpOptionsArray[index]);
                            $scope.processingMessage = proccessSettings.processingMessage;
                            $http(proccessSettings.httpOptions).then(function (result) {
                                proccessSettings.onSuccessFunction && proccessSettings.onSuccessFunction(result);
                                index++;
                                if (index < arrLength) {
                                    httpProcess(index);
                                }
                                else {
                                    $timeout(function () {
                                        settings.finalFunction && settings.finalFunction();
                                        $uibModalInstance.close(result);
                                    }, settings.modalCloseDelay);
                                }
                            }, function (error) {
                                $timeout(function () {
                                    proccessSettings.onErrorFunction && proccessSettings.onErrorFunction(error);
                                    $uibModalInstance.dismiss(error);
                                }, settings.modalCloseDelay);
                            });
                        };
                        httpProcess(index);
                    }];
                var modalInstance = $uibModal.open({
                    animation: true,
                    windowTemplateUrl: 'template/modal-template/empty.html',
                    templateUrl: 'template/modal/process-spinner.html',
                    controller: _thisController,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'sm',
                    resolve: {
                        httpOptionsArray: function () { return optionsArray; }
                    }
                });
            };
            commonMethods.okModal = function (okInfo) {
                var okInfoDefaults = { okModelSize: 'sm' };
                var okInfoSettings = angular.extend(okInfoDefaults, okInfo);
                var _thisController = ['$scope', '$uibModalInstance', 'okOptions', function ($scope, $uibModalInstance, okOptions) {
                        var okOptdefaults = {
                            okMessage: '_',
                            okTitle: 'Notice:',
                            okStyle: 'alert alert-warning',
                            okButtonText: 'Ok'
                        };
                        $scope.settings = angular.extend(okOptdefaults, okOptions);
                        $scope.okClick = function () {
                            $uibModalInstance.close();
                        };
                    }];
                var modelInstance = $uibModal.open({
                    templateUrl: 'template/modal/ok.html',
                    controller: _thisController,
                    size: okInfoSettings.okModelSize,
                    resolve: {
                        okOptions: function () { return okInfo.okOptions; }
                    }
                });
                modelInstance.result.then(function (result) {
                    okInfo.onOk && okInfo.onOk();
                }, function (error) {
                    okInfo.onOk && okInfo.onOk();
                });
            };
            commonMethods.confirmModal = function (confirmInfo) {
                var settings = { confirmSize: 'sm', backdrop: true, onConfirm: null, onCancel: null };
                angular.extend(settings, confirmInfo);
                var _thisController = ['$scope', '$uibModalInstance', 'confirmOptions', function ($scope, $uibModalInstance, confirmOptions) {
                        var confirmOptDefaults = { message: '', title: 'Confirm:', headerStyle: 'alert alert-warning', okBtnText: 'OK', cancelBtnText: 'Cancel' };
                        $scope.mdlSettings = angular.extend(confirmOptDefaults, confirmOptions);
                        $scope.okClick = function () {
                            $uibModalInstance.close();
                        };
                        $scope.cancelClick = function () {
                            $uibModalInstance.dismiss();
                        };
                    }];
                var modalInstance = $uibModal.open({
                    templateUrl: 'template/modal/confirm.html',
                    controller: _thisController,
                    size: settings.confirmSize,
                    backdrop: settings.backdrop,
                    resolve: {
                        confirmOptions: function () { return confirmInfo.confirmOptions; }
                    }
                });
                modalInstance.result.then(function () {
                    settings.onConfirm && settings.onConfirm();
                }, function () {
                    settings.onCancel && settings.onCancel();
                });
            };
            commonMethods.promptModal = function (promptInfo) {
                var settings = { promptSize: 'sm', backdrop: true, onOk: null, onCancel: null };
                angular.extend(settings, promptInfo);
                var _thisController = ['$scope', '$uibModalInstance', 'promptOptions', function ($scope, $uibModalInstance, promptOptions) {
                        var confirmOptDefaults = {
                            message: '',
                            title: 'Confirm:',
                            headerStyle: 'alert alert-info',
                            okBtnText: 'OK',
                            cancelBtnText: 'Cancel',
                            promptTextRequired: true,
                            validateMessage: 'Required!'
                        };
                        $scope.modelOptions = ngModelOptions;
                        $scope.mdlSettings = angular.extend(confirmOptDefaults, promptOptions);
                        $scope.okClick = function (form) {
                            form.promptText.$setDirty();
                            if (form.$valid) {
                                $uibModalInstance.close($scope.promptText);
                            }
                        };
                        $scope.cancelClick = function () {
                            $uibModalInstance.dismiss();
                        };
                    }];
                var modalInstance = $uibModal.open({
                    templateUrl: 'template/modal/prompt.html',
                    controller: _thisController,
                    size: settings.promptSize,
                    backdrop: settings.backdrop,
                    resolve: {
                        promptOptions: function () { return promptInfo.promptOptions; }
                    }
                });
                modalInstance.result.then(function (result) {
                    settings.onOk && settings.onOk(result);
                }, function () {
                    settings.onCancel && settings.onCancel();
                });
            };
            return commonMethods;
        }]);
    ltServices.run(['$templateCache', function ($templateCache) {
            $templateCache.put('template/modal-template/empty.html', "\n\t\t\t<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal vertical-center\" modal-animation-class=\"fade\"\n\t\t\t\tng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n\t\t\t\t<div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\"><div class=\"modal-content-empty\" ng-transclude></div></div>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/confirm.html', "\n\t\t\t<div class=\"modal-header modal-header-alert\" data-ng-class=\"mdlSettings.headerStyle\">\n\t\t\t\t<h4 class=\"modal-title\">{{mdlSettings.title}}</h4>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div data-ng-bind-html=\"mdlSettings.message\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-primary\" data-ng-click=\"okClick();\" autofocus=\"autofocus\">{{mdlSettings.okBtnText}}</button>\n\t\t\t\t<button class=\"btn btn-default\" data-ng-click=\"cancelClick();\">{{mdlSettings.cancelBtnText}}</button>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/prompt.html', "\n\t\t\t<form name=\"promptModalForm\" id=\"promptModalForm\" class=\"form-horizontal\" data-ng-submit=\"okClick(promptModalForm);\" novalidate=\"novalidate\">\n\t\t\t\t<div class=\"modal-header modal-header-alert\" data-ng-class=\"mdlSettings.headerStyle\">\n\t\t\t\t\t<h4 class=\"modal-title\">{{mdlSettings.title}}</h4>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t<div data-ng-bind-html=\"mdlSettings.message\"></div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t<input type=\"text\" name=\"promptText\" id=\"promptText\" class=\"form-control\" data-ng-model=\"promptText\" data-ng-required=\"mdlSettings.promptTextRequired\" data-ng-model-options=\"modelOptions\" autofocus=\"autofocus\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"text-danger\" data-ng-show=\"promptModalForm.promptText.$error.required &amp;&amp; promptModalForm.promptText.$dirty\" data-ng-bind-html=\"mdlSettings.validateMessage\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t<button class=\"btn btn-primary\" type=\"submit\">{{mdlSettings.okBtnText}}</button>\n\t\t\t\t\t<button class=\"btn btn-default\" data-ng-click=\"cancelClick();\">{{mdlSettings.cancelBtnText}}</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t");
            $templateCache.put('template/modal/ok.html', "\n\t\t\t<div class=\"modal-header modal-header-alert\" data-ng-class=\"settings.okStyle\">\n\t\t\t\t<h4 class=\"modal-title\">{{settings.okTitle}}</h4>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div data-ng-bind-html=\"settings.okMessage\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-primary\" id=\"okModalButton\" data-ng-click=\"okClick();\" autofocus><span class=\"glyphicon glyphicon-ok\"></span> <span data-ng-bind=\"settings.okButtonText\"></span></button>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/process-spinner.html', "\n\t\t\t<div class=\"modal-processing text-center\">\n\t\t\t\t<h3><img src=\"/Content/images/spinner.gif\" alt=\"\" /> {{processingMessage}}</h3>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/fa-spinner.html', "\n\t\t\t<div class=\"text-center spinner-color\">\n\t\t\t\t<i class=\"fa fa-circle-o-notch fa-5x fa-spin\"></i>\n\t\t\t</div>\n\t\t");
        }]);
})();
