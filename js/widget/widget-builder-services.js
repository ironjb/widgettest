var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function () {
    var lth = LoanTekWidgetHelper;
    var ltWidgetServices = angular.module('ltw.services', []);
    ltWidgetServices.factory('widgetServices', ['$uibModal', function ($uibModal) {
            var widgetMethods = {
                editForm: function (options) {
                    var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
                    angular.extend(settings, options);
                    var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function ($scope, $uibModalInstance, intanceOptions) {
                            $scope.modForm = angular.copy(intanceOptions.currentForm);
                            $scope.borderTypeArray = angular.copy(lth.formBorderTypeArray);
                            $scope.borderType = angular.copy(lth.formBorderType);
                            $scope.formWidthUnits = angular.copy(lth.widthUnit);
                            $scope.modelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
                            $scope.changeFormWidthUnit = function ($event, unit) {
                                $event.preventDefault();
                                $scope.modForm.formWidthUnit = unit.id;
                                window.console && console.log(unit, $scope.modForm.formWidthUnit);
                            };
                            $scope.borderTypeChange = function () {
                                if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.none.id) {
                                    $scope.showBorderRadius = false;
                                }
                                else {
                                    $scope.showBorderRadius = true;
                                }
                            };
                            if (!$scope.modForm.formWidthUnit) {
                                $scope.modForm.formWidthUnit = lth.defaultFormWidthUnit.id;
                            }
                            if (!$scope.modForm.buildObject.formBorderType) {
                                $scope.modForm.buildObject.formBorderType = lth.formBorderType.none.id;
                            }
                            $scope.borderTypeChange();
                            var watchGroups = [
                                'modForm.buildObject.formBorderType',
                                'modForm.formBorderRadius'
                            ];
                            $scope.$watchGroup(watchGroups, function (newValue, oldValue) {
                                var applyFormStyles = new LoanTekWidget.ApplyFormStyles($scope.modForm, true, '.ltw-preview');
                                var previewStyles = applyFormStyles.getStyles();
                                if (!lth.isNumber($scope.modForm.formBorderRadius)) {
                                    window.console && console.log('border rad is null so needs to apply default border rad', $scope.modForm.formBorderRadius);
                                    previewStyles += applyFormStyles.formBorderRadius(lth.defaultBorderRadius);
                                }
                                $scope.previewStyles = previewStyles;
                            });
                            $scope.saveClick = function () {
                                var newForm = angular.copy($scope.modForm);
                                newForm.name = 'modified';
                                window.console && console.log('newForm.formBorderRadius', newForm.formBorderRadius);
                                if (!lth.isNumber(newForm.formBorderRadius)) {
                                    delete newForm.formBorderRadius;
                                }
                                if (lth.isStringNullOrEmpty(newForm.buildObject.panelTitle)) {
                                    delete newForm.buildObject.panelTitle;
                                    delete newForm.formTitleColor;
                                    delete newForm.formTitleBgColor;
                                }
                                if (!newForm.formWidth) {
                                    delete newForm.formWidth;
                                    delete newForm.formWidthUnit;
                                }
                                if (newForm.formWidthUnit === lth.defaultFormWidthUnit.id) {
                                    delete newForm.formWidthUnit;
                                }
                                if (!newForm.buildObject.formBorderType || newForm.buildObject.formBorderType === lth.formBorderType.none.id) {
                                    delete newForm.buildObject.formBorderType;
                                    delete newForm.formTitleBgColor;
                                    delete newForm.formBorderRadius;
                                }
                                $uibModalInstance.close(newForm);
                            };
                            $scope.cancelClick = function () {
                                $uibModalInstance.dismiss();
                            };
                        }];
                    var modalInstance = $uibModal.open({
                        templateUrl: '/template.html?t=' + new Date().getTime(),
                        controller: modalCtrl,
                        size: settings.modalSize,
                        resolve: {
                            instanceOptions: function () { return settings.instanceOptions; }
                        }
                    });
                    modalInstance.result.then(function (result) {
                        settings.saveForm(result);
                    }, function (error) {
                    });
                }
            };
            return widgetMethods;
        }]);
})();
