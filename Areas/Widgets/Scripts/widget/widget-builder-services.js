var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
(function () {
    var lth = LoanTekWidgetHelper;
    var ltWidgetServices = angular.module('ltw.services', ['ngSanitize']);
    var ngModelOptions = { updateOn: 'default blur', debounce: { default: 500, blur: 0 } };
    ltWidgetServices.factory('widgetServices', ['$uibModal', function ($uibModal) {
            var widgetMethods = {};
            widgetMethods.editForm = function (options) {
                var settings = { modalSize: 'lg', instanceOptions: null, saveForm: null };
                angular.extend(settings, options);
                var modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function ($scope, $uibModalInstance, instanceOptions) {
                        $scope.modForm = angular.copy(instanceOptions.currentForm);
                        $scope.borderType = angular.copy(lth.formBorderType);
                        $scope.formWidthUnits = angular.copy(lth.widthUnit);
                        $scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);
                        $scope.modelOptions = ngModelOptions;
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
            };
            widgetMethods.editField = function (options) {
                var settings = { modalSize: 'lg' };
                angular.extend(settings, options);
                var modalCtrl;
                var removeFieldItem = function (field, itemName) {
                    switch (itemName) {
                        case "value":
                            break;
                        default:
                            delete field[itemName];
                            break;
                    }
                };
                settings.instanceOptions.fieldOptions = settings.fieldOptions;
                modalCtrl = ['$scope', '$uibModalInstance', 'instanceOptions', function ($scope, $uibModalInstance, instanceOptions) {
                        $scope.modelOptions = ngModelOptions;
                        $scope.modForm = angular.copy(instanceOptions.currentForm);
                        $scope.modField = $scope.modForm.buildObject.fields[instanceOptions.currentFieldIndex];
                        $scope.fieldSizeUnits = angular.copy(lth.bootstrap.inputSizing);
                        var applyFormStyles = new LoanTekWidget.ApplyFormStyles($scope.modForm, true, '.ltw-preview');
                        var previewStyles = applyFormStyles.getStyles();
                        var ft = instanceOptions.fieldOptions.fieldTemplate;
                        var el = ft.element;
                        var ty = ft.type;
                        $scope.fieldOptions = instanceOptions.fieldOptions;
                        $scope.previewStyles = previewStyles;
                        $scope.gridColumnsArray = lth.bootstrap.gridColumns.asArray();
                        $scope.offsetColumnsArray = lth.bootstrap.offsetColumns.asArray();
                        $scope.headingArray = lth.hsize.asArray();
                        if (!$scope.modField.size && $scope.modForm.buildObject.fieldSize) {
                            $scope.modField.size = $scope.modForm.buildObject.fieldSize;
                        }
                        if (!$scope.modField.cols) {
                            $scope.modField.cols = lth.bootstrap.gridColumns.getDefault().id;
                        }
                        if (lth.isStringNullOrEmpty($scope.modField.size)) {
                            $scope.modField.size = lth.bootstrap.inputSizing.getDefault().id;
                        }
                        if (el === 'title' && !lth.isNumber($scope.modField.nsize)) {
                            $scope.modField.nsize = lth.hsize.getDefault().id;
                        }
                        if (!$scope.modField.offsetCols) {
                            $scope.modField.offsetCols = 0;
                        }
                        if (['p', 'title', 'label', 'textarea'].indexOf(el) >= 0 || ['successmessage', 'submit'].indexOf(ty) >= 0) {
                            $scope.valuePlaceholder = $scope.fieldOptions.fieldTemplate.value || '';
                        }
                        $scope.fieldSizeChange = function () {
                            if ($scope.modField.size === lth.bootstrap.inputSizing.sm.id) {
                                $scope.fieldSizeClass = 'input-sm';
                                $scope.buttonSizeClass = 'btn-sm';
                            }
                            else if ($scope.modField.size === lth.bootstrap.inputSizing.lg.id) {
                                $scope.fieldSizeClass = 'input-lg';
                                $scope.buttonSizeClass = 'btn-lg';
                            }
                            else {
                                $scope.fieldSizeClass = 'input-md';
                                $scope.buttonSizeClass = 'btn-md';
                            }
                        };
                        $scope.fieldSizeChange();
                        var watchList = [
                            'modField.fontSize',
                            'modField.color',
                            'modField.backgroundColor',
                            'modField.backgroundColor',
                            'modField.borderColor',
                            'modField.borderRadius',
                            'modField.padding'
                        ];
                        $scope.$watchGroup(watchList, function (newValue) {
                            var newStyle = {};
                            if ($scope.modField.fontSize) {
                                newStyle.fontSize = $scope.modField.fontSize + 'px';
                            }
                            else if (ty === 'successmessage') {
                                newStyle.fontSize = ft.fontSize ? ft.fontSize + 'px' : '20px';
                            }
                            if ($scope.modField.color) {
                                newStyle.color = $scope.modField.color;
                            }
                            if ($scope.modField.backgroundColor) {
                                newStyle.backgroundColor = $scope.modField.backgroundColor;
                            }
                            if ($scope.modField.borderColor) {
                                newStyle.borderColor = $scope.modField.borderColor;
                            }
                            if (lth.isNumber($scope.modField.borderRadius)) {
                                newStyle.borderRadius = $scope.modField.borderRadius + 'px';
                            }
                            if (lth.isNumber($scope.modField.padding)) {
                                newStyle.padding = $scope.modField.padding + 'px';
                            }
                            if ((el === 'p' || el === 'div') && newStyle.borderColor) {
                                newStyle.borderWidth = '1px';
                                newStyle.borderStyle = 'solid';
                            }
                            $scope.fieldStyle = newStyle;
                        });
                        $scope.removeFieldItem = function (itemName) { removeFieldItem($scope.modField, itemName); };
                        $scope.saveClick = function () {
                            if ($scope.modField.cols === lth.bootstrap.gridColumns.getDefault().id) {
                                delete $scope.modField.cols;
                            }
                            if ($scope.modField.size === $scope.modForm.buildObject.fieldSize) {
                                delete $scope.modField.size;
                            }
                            if ($scope.modField.size === lth.bootstrap.inputSizing.getDefault().id && !$scope.modForm.buildObject.fieldSize) {
                                delete $scope.modField.size;
                            }
                            if ($scope.modField.nsize === lth.hsize.getDefault().id) {
                                delete $scope.modField.nsize;
                            }
                            if (lth.isStringNullOrEmpty($scope.modField.placeholder)) {
                                delete $scope.modField.placeholder;
                            }
                            if (lth.isStringNullOrEmpty($scope.modField.value)) {
                                delete $scope.modField.value;
                            }
                            if (!lth.isNumber($scope.modField.fontSize)) {
                                delete $scope.modField.fontSize;
                            }
                            else if (ty === 'successmessage' && ft.fontSize && ft.fontSize === $scope.modField.fontSize) {
                                delete $scope.modField.fontSize;
                            }
                            if (!$scope.modField.offsetCols) {
                                delete $scope.modField.offsetCols;
                            }
                            if ($scope.modField.required === false) {
                                delete $scope.modField.required;
                            }
                            var newForm = angular.copy($scope.modForm);
                            $uibModalInstance.close(newForm);
                        };
                        $scope.cancelClick = function () {
                            $uibModalInstance.dismiss();
                        };
                    }];
                var modalInstance = $uibModal.open({
                    templateUrl: 'template/modal/editField.html',
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
            };
            return widgetMethods;
        }]);
})();
