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
                            $scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);
                            $scope.modelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
                            $scope.changeFormWidthUnit = function ($event, unit) {
                                $event.preventDefault();
                                $scope.modForm.formWidthUnit = unit.id;
                            };
                            $scope.borderTypeChange = function () {
                                if ($scope.modForm.buildObject.formBorderType === lth.formBorderType.none.id) {
                                    $scope.showBorderRadius = false;
                                }
                                else {
                                    $scope.showBorderRadius = true;
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
                                'modForm.formBorderRadius',
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
