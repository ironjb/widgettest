var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function () {
    var lth = LoanTekWidgetHelper;
    var ltWidgetServices = angular.module('ltw.services', ['ngSanitize']);
    ltWidgetServices.factory('widgetServices', ['$uibModal', function ($uibModal) {
            var widgetMethods = {
                editForm: function (options) {
                    var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
                    angular.extend(settings, options);
                    var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function ($scope, $uibModalInstance, intanceOptions) {
                            $scope.modForm = angular.copy(intanceOptions.currentForm);
                            $scope.borderType = angular.copy(lth.formBorderType);
                            $scope.formWidthUnits = angular.copy(lth.widthUnit);
                            $scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);
                            $scope.modelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
                            $scope.changeFormWidthUnit = function ($event, unit) {
                                $event.preventDefault();
                                $scope.modForm.formWidthUnit = unit.id;
                            };
                            $scope.borderTypeChange = function () {
                                if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.none.id) {
                                    $scope.isBorderTypeNone = true;
                                }
                                else {
                                    $scope.isBorderTypeNone = false;
                                }
                                if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.panel.id) {
                                    $scope.isBorderTypePanel = true;
                                }
                                else {
                                    $scope.isBorderTypePanel = false;
                                }
                            };
                            $scope.fieldSizeChange = function () {
                                if ($scope.modForm.buildObject.fieldSize === lth.bootstrap.inputSizing.sm.id) {
                                    $scope.fieldSizeClass = 'form-group-sm';
                                    $scope.buttonSizeClass = 'btn-sm';
                                }
                                else if ($scope.modForm.buildObject.fieldSize === lth.bootstrap.inputSizing.lg.id) {
                                    $scope.fieldSizeClass = 'form-group-lg';
                                    $scope.buttonSizeClass = 'btn-lg';
                                }
                                else {
                                    $scope.fieldSizeClass = '';
                                    $scope.buttonSizeClass = '';
                                }
                            };
                            if (lth.isStringNullOrEmpty($scope.modForm.buildObject.fieldSize)) {
                                $scope.modForm.buildObject.fieldSize = lth.bootstrap.inputSizing.getDefault().id;
                            }
                            if (!$scope.modForm.formWidthUnit) {
                                $scope.modForm.formWidthUnit = lth.widthUnit.getDefault().id;
                            }
                            if (!$scope.modForm.buildObject.formBorderType) {
                                $scope.modForm.buildObject.formBorderType = lth.formBorderType.none.id;
                            }
                            $scope.borderTypeChange();
                            $scope.fieldSizeChange();
                            var watchGroups = [
                                'modForm.buildObject.formBorderType',
                                'modForm.buildObject.fieldSize',
                                'modForm.formBg',
                                'modForm.formBorderColor',
                                'modForm.formBorderRadius',
                                'modForm.formTitleColor',
                                'modForm.formTitleBgColor',
                                'modForm.formGroupSpacing',
                                'modForm.formFieldBorderRadius',
                                'modForm.formButtonBorderRadius'
                            ];
                            $scope.$watchGroup(watchGroups, function (newValue, oldValue) {
                                var applyFormStyles = new LoanTekWidget.ApplyFormStyles($scope.modForm, true, '.ltw-preview');
                                var previewStyles = applyFormStyles.getStyles();
                                if (!lth.isNumber($scope.modForm.formBorderRadius)) {
                                }
                                $scope.previewStyles = previewStyles;
                            });
                            $scope.removeFormItem = function (itemName) {
                                switch (itemName) {
                                    case "value":
                                        break;
                                    default:
                                        delete $scope.modForm[itemName];
                                        break;
                                }
                            };
                            $scope.saveClick = function () {
                                var newForm = angular.copy($scope.modForm);
                                newForm.name = 'modified';
                                if (!lth.isNumber(newForm.formBorderRadius) || newForm.formBorderRadius === lth.getDefaultBorderRadius(newForm.buildObject.fieldSize)) {
                                    delete newForm.formBorderRadius;
                                }
                                if (lth.isStringNullOrEmpty(newForm.buildObject.panelTitle)) {
                                    delete newForm.buildObject.panelTitle;
                                    delete newForm.formTitleColor;
                                    delete newForm.formTitleBgColor;
                                }
                                if (!lth.isNumber(newForm.formWidth)) {
                                    delete newForm.formWidth;
                                    delete newForm.formWidthUnit;
                                }
                                if (newForm.formWidthUnit === lth.widthUnit.getDefault().id) {
                                    delete newForm.formWidthUnit;
                                }
                                if (newForm.formGroupSpacing === lth.defaultVerticalSpacing) {
                                    delete newForm.formGroupSpacing;
                                }
                                if (newForm.formFieldBorderRadius === lth.getDefaultBorderRadius(newForm.buildObject.fieldSize)) {
                                    delete newForm.formFieldBorderRadius;
                                }
                                if (newForm.formButtonBorderRadius === lth.getDefaultBorderRadius(newForm.buildObject.fieldSize)) {
                                    delete newForm.formButtonBorderRadius;
                                }
                                if (newForm.buildObject.fieldSize === lth.bootstrap.inputSizing.getDefault().id) {
                                    delete newForm.buildObject.fieldSize;
                                }
                                if (newForm.buildObject.formBorderType === lth.formBorderType.well.id) {
                                }
                                if (!newForm.buildObject.formBorderType || newForm.buildObject.formBorderType === lth.formBorderType.none.id) {
                                    delete newForm.buildObject.formBorderType;
                                    delete newForm.formBg;
                                    delete newForm.formBorderRadius;
                                    delete newForm.formBorderColor;
                                }
                                $uibModalInstance.close(newForm);
                            };
                            $scope.cancelClick = function () {
                                $uibModalInstance.dismiss();
                            };
                        }];
                    var modalInstance = $uibModal.open({
                        templateUrl: 'template/modal/editForm.html',
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
                },
                confirmModal: function (confirmInfo) {
                    window.console && console.log(confirmInfo);
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
                        templateUrl: 'template/widget/confirmModal.html',
                        controller: _thisController,
                        size: settings.confirmSize,
                        backdrop: settings.backdrop,
                        resolve: {
                            confirmOptions: function () { return confirmInfo.confirmOptions; }
                        }
                    });
                    modalInstance.result.then(function () {
                        settings.onConfirm();
                    }, function () {
                        settings.onCancel();
                    });
                }
            };
            return widgetMethods;
        }]);
})();
