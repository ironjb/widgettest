var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
var LoanTekWidget;
(function (LoanTekWidget) {
    var ApplyFormStyles = (function () {
        function ApplyFormStyles(currentFormObject, excludeCaptchaField, specifier) {
            var _thisC = this;
            var lth = LoanTekWidgetHelper;
            specifier = specifier || '';
            _thisC._specifier = specifier;
            _thisC._borderType = currentFormObject.buildObject.formBorderType;
            excludeCaptchaField = excludeCaptchaField || true;
            var returnStyles = '';
            if (currentFormObject.formWidth) {
                currentFormObject.formWidthUnit = currentFormObject.formWidthUnit || lth.defaultFormWidthUnit.id;
                returnStyles += '\n' + specifier + '.ltw  { width: ' + currentFormObject.formWidth + currentFormObject.formWidthUnit + '; }';
            }
            if (currentFormObject.formBg) {
                returnStyles += '\n' + specifier + '.ltw  .lt-widget-border { background-color: ' + currentFormObject.formBg + '; }';
            }
            if (lth.isNumber(currentFormObject.formBorderRadius)) {
                returnStyles += _thisC.formBorderRadius(currentFormObject.formBorderRadius, _thisC._borderType);
            }
            if (currentFormObject.formBorderColor) {
                returnStyles += '\n' + specifier + '.ltw  .lt-widget-border, ' + specifier + '.ltw  .lt-widget-border .lt-widget-heading { border-color: ' + currentFormObject.formBorderColor + '; }';
            }
            if (currentFormObject.formTitleColor) {
                returnStyles += '\n' + specifier + '.ltw  .lt-widget-heading, ' + specifier + '.ltw  .lt-widget-border .lt-widget-heading  { color: ' + currentFormObject.formTitleColor + '; }';
            }
            if (currentFormObject.formTitleBgColor) {
                returnStyles += '\n' + specifier + '.ltw  .lt-widget-heading, ' + specifier + '.ltw  .lt-widget-border .lt-widget-heading  { background-color: ' + currentFormObject.formTitleBgColor + '; }';
            }
            if (lth.isNumber(currentFormObject.formGroupSpacing)) {
                returnStyles += '\n' + specifier + '.ltw  .form-group, ' + specifier + '.ltw  .alert { margin-bottom: ' + currentFormObject.formGroupSpacing + 'px; }';
            }
            if (lth.isNumber(currentFormObject.formFieldBorderRadius)) {
                var ffbr = currentFormObject.formFieldBorderRadius + '';
                var ffbhr = currentFormObject.formFieldBorderRadius - 1 < 0 ? '0' : (currentFormObject.formFieldBorderRadius - 1) + '';
                returnStyles += '\n' + specifier + '.ltw  .form-group .form-control, ' + specifier + '.ltw  .alert { border-radius: ' + ffbr + 'px; }';
                if (!excludeCaptchaField) {
                    returnStyles += '\n' + specifier + '.ltw  .lt-captcha .panel { border-radius: ' + ffbr + 'px; }';
                    returnStyles += '\n' + specifier + '.ltw  .lt-captcha .panel-heading { border-top-right-radius: ' + ffbhr + 'px; border-top-left-radius: ' + ffbhr + 'px; }';
                }
            }
            if (lth.isNumber(currentFormObject.formButtonBorderRadius)) {
                returnStyles += '\n' + specifier + '.ltw  .btn { border-radius: ' + currentFormObject.formButtonBorderRadius + 'px; }';
            }
            _thisC._returnStyles = returnStyles;
        }
        ApplyFormStyles.prototype.getStyles = function () {
            return this._returnStyles;
        };
        ApplyFormStyles.prototype.formBorderRadius = function (borderRadius, borderType, specifier) {
            var _thisM = this;
            var lth = LoanTekWidgetHelper;
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
    LoanTekWidget.ApplyFormStyles = ApplyFormStyles;
})(LoanTekWidget || (LoanTekWidget = {}));
