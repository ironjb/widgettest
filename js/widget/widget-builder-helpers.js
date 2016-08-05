var LoanTekWidgetHelperTest = LoanTekWidgetHelperTest || new LoanTekWidgetTest.helpers(jQuery);
var LoanTekWidgetTest;
(function (LoanTekWidgetTest) {
    var BuilderHelpers = (function () {
        function BuilderHelpers() {
        }
        BuilderHelpers.prototype.arrayMove = function (arr, oldIndex, newIndex) {
            while (oldIndex < 0) {
                oldIndex += arr.length;
            }
            while (newIndex < 0) {
                newIndex += arr.length;
            }
            if (newIndex >= arr.length) {
                newIndex = arr.length;
            }
            window.console && console.log('oldIndex', oldIndex, 'newIndex', newIndex);
            arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
            return arr;
        };
        return BuilderHelpers;
    }());
    LoanTekWidgetTest.BuilderHelpers = BuilderHelpers;
    var LoadScriptsInSequence = (function () {
        function LoadScriptsInSequence(scriptSrcArray, scriptRootDirectory, callback) {
            var _thisC = this;
            _thisC._scriptSrcArray = scriptSrcArray || null;
            _thisC._scriptRootDirectory = scriptRootDirectory || '';
            _thisC._callbackFunction = callback || null;
            ;
            _thisC._lth = LoanTekWidgetHelperTest;
        }
        LoadScriptsInSequence.prototype.addSrc = function (src) {
            this._scriptSrcArray.push(src);
            return this;
        };
        LoadScriptsInSequence.prototype.run = function () {
            var _thisC = this;
            var $ = _thisC._lth.$;
            var el = _thisC._lth.CreateElement();
            var currentIndex = 0;
            var lastIndex = this._scriptSrcArray.length - 1;
            var body = $('body')[0];
            function loadScript(i) {
                var scriptSrc = _thisC._scriptSrcArray[i];
                var script = el.script(_thisC._scriptRootDirectory + scriptSrc)[0];
                script.onload = function () {
                    if (currentIndex < lastIndex) {
                        currentIndex += 1;
                        loadScript(currentIndex);
                    }
                    else {
                        if (_thisC._callbackFunction) {
                            _thisC._callbackFunction();
                        }
                    }
                };
                script.onerror = function (error) {
                    window.console && console.error('error getting script. mission aborted.', error);
                };
                body.appendChild(script);
            }
            loadScript(currentIndex);
        };
        return LoadScriptsInSequence;
    }());
    LoanTekWidgetTest.LoadScriptsInSequence = LoadScriptsInSequence;
    var ApplyFormStyles = (function () {
        function ApplyFormStyles(currentFormObject, excludeCaptchaField, specifier) {
            var _thisC = this;
            var lth = LoanTekWidgetHelperTest;
            specifier = specifier || '.' + lth.defaultFormSpecifierClass;
            _thisC._specifier = specifier;
            _thisC._borderType = currentFormObject.buildObject.formBorderType;
            excludeCaptchaField = excludeCaptchaField || true;
            var returnStyles = '';
            if (currentFormObject.formWidth) {
                currentFormObject.formWidthUnit = currentFormObject.formWidthUnit || lth.widthUnit.getDefault().id;
                returnStyles += '\n.ltw' + specifier + ' { width: ' + currentFormObject.formWidth + currentFormObject.formWidthUnit + '; }';
            }
            if (currentFormObject.formBg) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-border { background-color: ' + currentFormObject.formBg + '; }';
            }
            if (lth.isNumber(currentFormObject.formBorderRadius)) {
                returnStyles += _thisC.formBorderRadius(currentFormObject.formBorderRadius, _thisC._borderType);
            }
            if (currentFormObject.formBorderColor) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-border, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading { border-color: ' + currentFormObject.formBorderColor + '; }';
            }
            if (currentFormObject.formTitleColor) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-heading, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading  { color: ' + currentFormObject.formTitleColor + '; }';
            }
            if (currentFormObject.formTitleBgColor) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-heading, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading  { background-color: ' + currentFormObject.formTitleBgColor + '; }';
            }
            if (lth.isNumber(currentFormObject.formGroupSpacing)) {
                returnStyles += '\n.ltw' + specifier + ' .form-group, .ltw' + specifier + ' .alert { margin-bottom: ' + currentFormObject.formGroupSpacing + 'px; }';
            }
            if (lth.isNumber(currentFormObject.formFieldBorderRadius)) {
                var ffbr = currentFormObject.formFieldBorderRadius + '';
                var ffbhr = currentFormObject.formFieldBorderRadius - 1 < 0 ? '0' : (currentFormObject.formFieldBorderRadius - 1) + '';
                returnStyles += '\n.ltw' + specifier + ' .form-group .form-control, .ltw' + specifier + ' .alert { border-radius: ' + ffbr + 'px; }';
                if (!excludeCaptchaField) {
                    returnStyles += '\n.ltw' + specifier + ' .lt-captcha .panel { border-radius: ' + ffbr + 'px; }';
                    returnStyles += '\n.ltw' + specifier + ' .lt-captcha .panel-heading { border-top-right-radius: ' + ffbhr + 'px; border-top-left-radius: ' + ffbhr + 'px; }';
                }
            }
            if (lth.isNumber(currentFormObject.formButtonBorderRadius)) {
                returnStyles += '\n.ltw' + specifier + ' .btn { border-radius: ' + currentFormObject.formButtonBorderRadius + 'px; }';
            }
            _thisC._returnStyles = returnStyles;
        }
        ApplyFormStyles.prototype.getStyles = function () {
            return this._returnStyles;
        };
        ApplyFormStyles.prototype.formBorderRadius = function (borderRadius, borderType, specifier) {
            var _thisM = this;
            var lth = LoanTekWidgetHelperTest;
            var br = '';
            var fbr = borderRadius + '';
            var fbhr = borderRadius - 1 < 0 ? '0' : (borderRadius - 1) + '';
            specifier = specifier || _thisM._specifier;
            borderType = borderType || _thisM._borderType;
            br += '\n' + specifier + '.ltw  .lt-widget-border { border-radius: ' + fbr + 'px; }';
            if (borderType === lth.formBorderType.panel.id) {
                br += '\n' + specifier + '.ltw  .lt-widget-border .lt-widget-heading { border-top-right-radius: ' + fbhr + 'px; border-top-left-radius: ' + fbhr + 'px; }';
            }
            return br;
        };
        return ApplyFormStyles;
    }());
    LoanTekWidgetTest.ApplyFormStyles = ApplyFormStyles;
})(LoanTekWidgetTest || (LoanTekWidgetTest = {}));
