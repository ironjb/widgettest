var ltjQuery = ltjQuery || jQuery.noConflict(true);
var LoanTekWidgetHelpers;
(function (LoanTekWidgetHelpers) {
    var hSizing = (function () {
        function hSizing() {
            this.h1 = { id: 1, name: 'h1' };
            this.h2 = { id: 2, name: 'h2' };
            this.h3 = { id: 3, name: 'h3' };
            this.h4 = { id: 4, name: 'h4' };
            this.h5 = { id: 5, name: 'h5' };
            this.h6 = { id: 6, name: 'h6' };
            this.default = this.h4;
        }
        return hSizing;
    }());
    var inputSizing = (function () {
        function inputSizing() {
            this.default = { id: 'default', name: 'Default' };
            this.sm = { id: 'sm', name: 'Small' };
            this.lg = { id: 'lg', name: 'Large' };
        }
        return inputSizing;
    }());
    var gridSizing = (function () {
        function gridSizing() {
            this.xs = { id: 'xs', name: 'xs' };
            this.sm = { id: 'sm', name: 'sm' };
            this.md = { id: 'md', name: 'md' };
            this.lg = { id: 'lg', name: 'lg' };
            this.default = this.md;
        }
        return gridSizing;
    }());
    var bootstrap = (function () {
        function bootstrap() {
            this.inputSizing = new inputSizing;
            this.gridSizing = new gridSizing;
        }
        return bootstrap;
    }());
    var formBorderType = (function () {
        function formBorderType() {
            this.panel = { id: 'panel', name: 'Panel' };
            this.well = { id: 'well', name: 'Well' };
            this.none = { id: 'none', name: 'None' };
        }
        return formBorderType;
    }());
    var widthUnit = (function () {
        function widthUnit() {
            this.px = { id: 'px', name: 'Pixels' };
            this.per = { id: '%', name: 'Percent' };
        }
        return widthUnit;
    }());
    var helpers = (function () {
        function helpers(jq) {
            this.$ = jq;
            this.hsize = new hSizing;
            this.bootstrap = new bootstrap;
            this.formBorderType = new formBorderType;
            this.formBorderTypeArray = this.ConvertObjectToArray(this.formBorderType);
            this.widthUnit = new widthUnit;
        }
        helpers.prototype.isNumber = function (numCheck) {
            return typeof numCheck === 'number';
        };
        helpers.prototype.isStringNullOrEmpty = function (stringCheck) {
            return stringCheck === '' || typeof stringCheck !== 'string';
        };
        helpers.prototype.ConvertObjectToArray = function (theObj) {
            var objArray = [];
            for (var key in theObj) {
                var objVal = theObj[key];
                if (objVal) {
                    objArray.push(objVal);
                }
            }
            return objArray;
        };
        helpers.prototype.ConvertArrayToObject = function (theArray, theKey) {
            theKey = theKey || 'id';
            var returnObj = {};
            for (var i = 0, l = theArray.length; i < l; i++) {
                var obj = theArray[i];
                var objectKey = obj[theKey];
                if (objectKey) {
                    window.console && console.log('objectKey', objectKey);
                    returnObj[objectKey] = obj;
                }
            }
            window.console && console.log('returnObj', returnObj);
            return returnObj;
        };
        helpers.prototype.GetIndexOfFirstObjectInArray = function (theArray, theKey, theValue) {
            for (var i = 0, l = theArray.length; i < l; i++) {
                if (theArray[i][theKey] === theValue) {
                    return i;
                }
            }
            return -1;
        };
        helpers.prototype.Interpolate = function (text, parameters, fn, regex) {
            text = text || '';
            parameters = parameters || {};
            fn = fn || function (x) { return x; };
            regex = regex || /#{[^\}]+}/g;
            return text.replace(regex, function (m, p, ft) {
                var indexOfStart = m.indexOf('{') + 1;
                var spaceFromEnd = m.length - m.indexOf('}');
                var rt = m.substr(indexOfStart);
                rt = rt.substr(0, rt.length - spaceFromEnd);
                if (!parameters[rt]) {
                    window.console && console.warn('Interpolate Warning: Parameter not found for ' + m);
                    rt = m;
                }
                else {
                    rt = parameters[rt].toString() || '';
                }
                return fn(rt);
            });
        };
        helpers.prototype.CreateElement = function () {
            var $ = this.$;
            var el = {
                div: function () { return $('<div/>'); },
                script: function (src, type) {
                    if (type === void 0) { type = 'text/javascript'; }
                    var returnScript = $('<script/>').prop('type', type);
                    returnScript = src ? returnScript.prop('src', src) : returnScript;
                    return returnScript;
                },
                link: function (href, rel) {
                    if (rel === void 0) { rel = 'stylesheet'; }
                    var returnLink = $('<link/>').prop('rel', rel);
                    returnLink = href ? returnLink.prop('href', href) : returnLink;
                    return returnLink;
                },
                style: function (type) {
                    if (type === void 0) { type = 'text/css'; }
                    var returnStyle = $('<style/>').prop('type', type);
                    return returnStyle;
                },
                p: function () { return $('<p/>'); },
                span: function () { return $('<span/>'); },
                h: function (headNumber) {
                    if (headNumber === void 0) { headNumber = 3; }
                    return $('<h' + headNumber + '/>');
                },
                form: function () { return $('<form/>').addClass('form-horizontal'); },
                label: function () { return $('<label/>').addClass('control-label col-sm-12'); },
                button: function (type) {
                    if (type === void 0) { type = 'button'; }
                    return $('<button/>').prop('type', type);
                },
                select: function () { return $('<select/>').addClass('form-control'); },
                option: function () { return $('<option/>'); },
                input: function (type) {
                    if (type === void 0) { type = 'text'; }
                    return $('<input/>').prop('type', type);
                },
                textarea: function () { return $('<textarea/>').addClass('form-control'); },
                col: function (colNumber, colSize) {
                    if (colNumber === void 0) { colNumber = 12; }
                    if (colSize === void 0) { colSize = 'sm'; }
                    return el.div().addClass('col-' + colSize + '-' + colNumber.toString());
                },
                row: function (rowType) {
                    if (rowType === void 0) { rowType = 'row'; }
                    return el.div().addClass(rowType);
                },
                formGroup: function (formGroupSize) {
                    if (formGroupSize) {
                        return el.row('form-group').addClass('form-group-' + formGroupSize);
                    }
                    else {
                        return el.row('form-group');
                    }
                }
            };
            return el;
        };
        helpers.prototype.ScrollToAnchor = function (anchorName, scrollSpeed, topOffset) {
            $ = this.$;
            scrollSpeed = scrollSpeed || 200;
            topOffset = topOffset || 50;
            $('html, body').animate({
                scrollTop: ($('a[name=' + anchorName + ']').offset().top) - topOffset
            }, scrollSpeed);
        };
        return helpers;
    }());
    LoanTekWidgetHelpers.helpers = helpers;
})(LoanTekWidgetHelpers || (LoanTekWidgetHelpers = {}));
var LoanTekBuildForm = (function () {
    function LoanTekBuildForm(options) {
        var _this = this;
        this.CreateFormElement = function (elementObj) {
            var _thisM = _this;
            var el = _thisM.ltm.CreateElement();
            var returnElement = null;
            switch (elementObj.element) {
                case 'title':
                    elementObj.nsize = elementObj.nsize || _thisM.ltm.hsize.default.id;
                    returnElement = el.h(elementObj.nsize);
                    returnElement.html(elementObj.value);
                    break;
                case 'label':
                    returnElement = el.label();
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    elementObj.value = elementObj.value || 'label';
                    returnElement.html(elementObj.value);
                    break;
                case 'button':
                    returnElement = el.button(elementObj.type ? elementObj.type : 'button');
                    elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
                    elementObj.value = elementObj.value ? elementObj.value : 'OK';
                    returnElement.addClass(elementObj.cssClass).html(elementObj.value);
                    break;
                case 'select':
                    returnElement = el.select();
                    elementObj.placeholder = elementObj.placeholder ? elementObj.placeholder : ' ';
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    switch (elementObj.type) {
                        case "state":
                            var usStates = _thisM.US_States();
                            ltjQuery.each(usStates.states, function (i, state) {
                                returnElement.append(el.option().val(state.abbreviation).html(state.name));
                            });
                            break;
                        default:
                            break;
                    }
                    if (elementObj.value) {
                        returnElement.val(elementObj.value);
                    }
                    break;
                case 'textarea':
                    returnElement = el.textarea();
                    if (elementObj.rows) {
                        returnElement.prop('rows', elementObj.rows);
                    }
                    if (elementObj.value) {
                        returnElement.val(elementObj.value);
                    }
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    break;
                case 'input':
                    elementObj.type = elementObj.type ? elementObj.type : 'text';
                    returnElement = el.input(elementObj.type);
                    switch (elementObj.type) {
                        case 'button':
                            elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
                            elementObj.value = elementObj.value ? elementObj.value : 'OK';
                            returnElement.val(elementObj.value);
                            break;
                        case 'hidden':
                            returnElement.val(elementObj.value);
                            break;
                        default:
                            returnElement.addClass('form-control');
                            if (elementObj.value) {
                                returnElement.val(elementObj.value);
                            }
                            break;
                    }
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    break;
                case 'captcha':
                    var captchaInputObj = { element: 'input', id: 'ltCaptchaInput', placeholder: 'Enter the characters', required: true };
                    var captchaResetBtnObj = { element: 'button', id: 'ltCaptchaReset', cssClass: 'btn-info', alttext: 'Reset', tabindex: -1, value: ' ' };
                    if (elementObj.size) {
                        captchaInputObj.size = elementObj.size;
                        captchaResetBtnObj.size = elementObj.size;
                    }
                    var captchaInput = _thisM.CreateFormElement(captchaInputObj);
                    var captchaResetBtn = _thisM.CreateFormElement(captchaResetBtnObj);
                    returnElement = el.div().addClass('lt-captcha').append(el.div().addClass('panel panel-info').append(el.div().addClass('panel-heading').text('Security Check')).append(el.div().addClass('panel-body').append(el.formGroup().append(el.col().append(el.div().prop('id', 'ltCaptchaImg').addClass('captcha-font')))).append(el.row().append(el.col(8, 'xs').append(captchaInput).append(el.span().prop('id', 'ltCaptchaErrorMsg').addClass('text-danger small').text('The code you entered does not match the one shown in the image.'))).append(el.col(4, 'xs').addClass('text-right').append(captchaResetBtn.html('&nbsp;').append(el.span().addClass('glyphicon glyphicon-refresh')).append('&nbsp;'))))));
                    break;
                default:
                    elementObj.value = elementObj.value || ' ';
                    returnElement = el.div();
                    returnElement.html(elementObj.value);
                    break;
            }
            if (returnElement) {
                if (elementObj.id) {
                    returnElement.prop('id', elementObj.id).prop('name', elementObj.id);
                }
                if (elementObj.style) {
                    returnElement.css(elementObj.style);
                }
                if (elementObj.required) {
                    returnElement.prop('required', true);
                }
                if (elementObj.alttext) {
                    returnElement.prop('alt', elementObj.alttext).prop('title', elementObj.alttext);
                }
                if (elementObj.tabindex) {
                    returnElement.prop('tabindex', elementObj.tabindex);
                }
                if (elementObj.placeholder) {
                    elementObj.placeholder = elementObj.required ? '* ' + elementObj.placeholder : elementObj.placeholder;
                    switch (elementObj.element) {
                        case 'select':
                            returnElement.prepend(el.option().val('').html(elementObj.placeholder).addClass('placeholder-text'));
                            if (!elementObj.value) {
                                returnElement.val('');
                            }
                            break;
                        default:
                            returnElement.attr('placeholder', elementObj.placeholder);
                            break;
                    }
                }
                if (elementObj.pattern) {
                    returnElement.prop('pattern', elementObj.pattern);
                }
                if (elementObj.size) {
                    switch (elementObj.element) {
                        case 'textarea':
                        case 'select':
                            returnElement.addClass('input-' + elementObj.size);
                            break;
                        case 'button':
                            returnElement.addClass('btn-' + elementObj.size);
                            break;
                        case 'input':
                            switch (elementObj.type) {
                                case 'button':
                                    returnElement.addClass('btn-' + elementObj.size);
                                    break;
                                case 'hidden':
                                    break;
                                default:
                                    returnElement.addClass('input-' + elementObj.size);
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            return returnElement;
        };
        this.US_States = function () {
            var s = {
                country: 'USA',
                states: [
                    { abbreviation: 'AL', name: 'Alabama' },
                    { abbreviation: 'AK', name: 'Alaska' },
                    { abbreviation: 'AZ', name: 'Arizona' },
                    { abbreviation: 'AR', name: 'Arkansas' },
                    { abbreviation: 'CA', name: 'California' },
                    { abbreviation: 'CO', name: 'Colorado' },
                    { abbreviation: 'CT', name: 'Connecticut' },
                    { abbreviation: 'DE', name: 'Delaware' },
                    { abbreviation: 'DC', name: 'District Of Columbia' },
                    { abbreviation: 'FL', name: 'Florida' },
                    { abbreviation: 'GA', name: 'Georgia' },
                    { abbreviation: 'HI', name: 'Hawaii' },
                    { abbreviation: 'ID', name: 'Idaho' },
                    { abbreviation: 'IL', name: 'Illinois' },
                    { abbreviation: 'IN', name: 'Indiana' },
                    { abbreviation: 'IA', name: 'Iowa' },
                    { abbreviation: 'KS', name: 'Kansas' },
                    { abbreviation: 'KY', name: 'Kentucky' },
                    { abbreviation: 'LA', name: 'Louisiana' },
                    { abbreviation: 'ME', name: 'Maine' },
                    { abbreviation: 'MD', name: 'Maryland' },
                    { abbreviation: 'MA', name: 'Massachusetts' },
                    { abbreviation: 'MI', name: 'Michigan' },
                    { abbreviation: 'MN', name: 'Minnesota' },
                    { abbreviation: 'MS', name: 'Mississippi' },
                    { abbreviation: 'MO', name: 'Missouri' },
                    { abbreviation: 'MT', name: 'Montana' },
                    { abbreviation: 'NE', name: 'Nebraska' },
                    { abbreviation: 'NV', name: 'Nevada' },
                    { abbreviation: 'NH', name: 'New Hampshire' },
                    { abbreviation: 'NJ', name: 'New Jersey' },
                    { abbreviation: 'NM', name: 'New Mexico' },
                    { abbreviation: 'NY', name: 'New York' },
                    { abbreviation: 'NC', name: 'North Carolina' },
                    { abbreviation: 'ND', name: 'North Dakota' },
                    { abbreviation: 'OH', name: 'Ohio' },
                    { abbreviation: 'OK', name: 'Oklahoma' },
                    { abbreviation: 'OR', name: 'Oregon' },
                    { abbreviation: 'PA', name: 'Pennsylvania' },
                    { abbreviation: 'RI', name: 'Rhode Island' },
                    { abbreviation: 'SC', name: 'South Carolina' },
                    { abbreviation: 'SD', name: 'South Dakota' },
                    { abbreviation: 'TN', name: 'Tennessee' },
                    { abbreviation: 'TX', name: 'Texas' },
                    { abbreviation: 'UT', name: 'Utah' },
                    { abbreviation: 'VT', name: 'Vermont' },
                    { abbreviation: 'VA', name: 'Virginia' },
                    { abbreviation: 'WA', name: 'Washington' },
                    { abbreviation: 'WV', name: 'West Virginia' },
                    { abbreviation: 'WI', name: 'Wisconsin' },
                    { abbreviation: 'WY', name: 'Wyoming' }
                ]
            };
            return s;
        };
        var _thisC = this;
        _thisC.ltm = new LoanTekWidgetHelpers.helpers(ltjQuery);
        var settings = {
            wrapperId: 'ltWidgetWrapper',
            formId: 'LtcwContactWidgetForm',
            errorMessageWrapperId: 'ltcwErrorMessageWrapper',
            errrorMessageId: 'ltcwErrorMessage',
            fieldSize: null,
            formBorderType: null,
            panelTitle: null,
            showBuilderTools: false,
            fields: null
        };
        ltjQuery.extend(settings, options);
        var COLUMNS_IN_ROW = 12;
        var columnCount = 0;
        var row = null;
        var isSingleRow;
        var isTimeToAddRow = false;
        var isLastField = false;
        var isHidden = false;
        var isLabel;
        var cell = null;
        var fieldsLength = settings.fields.length;
        var nextFieldCols;
        var nextIndex;
        var remainingColSpace = 0;
        var isNextHidden = false;
        var fieldTemplate;
        var el = _thisC.ltm.CreateElement();
        var errorRow = el.row('row').prop('id', settings.errorMessageWrapperId);
        var errorMsg = el.p().prop('id', settings.errrorMessageId);
        if (!settings.showBuilderTools) {
            errorRow.css({ display: 'none' });
        }
        else {
            errorMsg.text('Error Message');
        }
        errorRow.append(el.col().append(el.div().addClass('alert alert-danger').append(errorMsg)));
        var returnForm = el.form().prop('id', settings.formId).append(errorRow);
        var fieldTemplates = {
            clientid: { element: 'input', type: 'hidden', id: 'ltcwClientId', value: function () { return 'LTWS' + new Date().getTime().toString(); } },
            userid: { element: 'input', type: 'hidden', id: 'ltcwUserId', value: 'UserID###' },
            firstname: { element: 'input', type: 'text', id: 'ltcwFirstName', placeholder: 'First Name', required: true, cols: 6 },
            lastname: { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true, cols: 6 },
            email: { element: 'input', type: 'email', id: 'ltcwEmail', placeholder: 'Email', required: true, cols: 6 },
            phone: { element: 'input', type: 'tel', id: 'ltcwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}', cols: 6 },
            company: { element: 'input', type: 'text', id: 'ltcwCompany', placeholder: 'Company', cols: 6 },
            state: { element: 'select', type: 'state', id: 'ltcwState', placeholder: 'Select a State', cols: 6 },
            comments: { element: 'textarea', id: 'ltcwComments', placeholder: 'Comments', rows: 4 },
            submit: { element: 'button', type: 'submit', cssClass: 'btn-primary', value: 'Submit' },
            title: { element: 'title' },
            label: { element: 'label', cols: 6 },
            paragraph: { element: 'div' },
            captcha: { element: 'captcha' }
        };
        function ExtendFieldTemplate(eItem) {
            return ltjQuery.extend({}, fieldTemplates[eItem.field], eItem);
        }
        ltjQuery.each(settings.fields, function (i, elementItem) {
            if (elementItem.field) {
                settings.fields[i] = ExtendFieldTemplate(elementItem);
            }
        });
        ltjQuery.each(settings.fields, function (i, elementItem) {
            isHidden = elementItem.type === 'hidden';
            elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
            elementItem.size = elementItem.size ? elementItem.size : settings.fieldSize;
            isLastField = i >= fieldsLength - 1;
            isLabel = elementItem.element === 'label';
            nextIndex = i + 1;
            do {
                isNextHidden = settings.fields[nextIndex] && settings.fields[nextIndex].type === 'hidden';
                nextFieldCols = (settings.fields[nextIndex] && settings.fields[nextIndex].cols) ? settings.fields[nextIndex].cols : isNextHidden ? 0 : COLUMNS_IN_ROW;
                nextIndex++;
            } while (nextFieldCols === 0 && nextIndex <= fieldsLength);
            if (isHidden) {
                returnForm.append(_thisC.CreateFormElement(elementItem));
            }
            else {
                if (!row) {
                    columnCount = 0;
                    if (elementItem.cols >= COLUMNS_IN_ROW) {
                        row = el.formGroup(elementItem.size);
                        isSingleRow = true;
                    }
                    else {
                        row = el.row();
                        isSingleRow = false;
                    }
                }
                columnCount += elementItem.cols;
                if (isSingleRow) {
                    if (isLabel) {
                        cell = _thisC.CreateFormElement(elementItem);
                    }
                    else {
                        cell = el.col().append(_thisC.CreateFormElement(elementItem));
                    }
                }
                else {
                    if (isLabel) {
                        cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(_thisC.CreateFormElement(elementItem)));
                    }
                    else {
                        cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(el.col().append(_thisC.CreateFormElement(elementItem))));
                    }
                }
                if (settings.showBuilderTools) {
                    cell.attr('data-ng-click', 'testFun();');
                }
                row.append(cell);
                isTimeToAddRow = isLastField || columnCount >= COLUMNS_IN_ROW;
                if (columnCount < COLUMNS_IN_ROW && columnCount + nextFieldCols > COLUMNS_IN_ROW) {
                    isTimeToAddRow = true;
                    remainingColSpace = COLUMNS_IN_ROW - columnCount;
                    if (settings.showBuilderTools) {
                        row.append(el.col(remainingColSpace).addClass('hidden-xs').append(el.formGroup(elementItem.size).append(el.col().append(el.div().addClass('form-control-static bg-info visible-on-hover').html('<!-- cols: ' + remainingColSpace + ' -->')))));
                    }
                }
                else {
                    remainingColSpace = 0;
                }
                if (isTimeToAddRow) {
                    returnForm.append(row);
                    row = null;
                    columnCount = 0;
                }
            }
        });
        if (settings.formBorderType) {
            if (settings.formBorderType === _thisC.ltm.formBorderType.well.id) {
                var wellMain = el.div().addClass('well lt-widget-border');
                if (settings.panelTitle) {
                    wellMain.append(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
                }
                returnForm = wellMain.append(returnForm);
            }
            else if (settings.formBorderType === _thisC.ltm.formBorderType.panel.id) {
                var panelMain, panelHeading, panelBody;
                panelMain = el.div().addClass('panel panel-default lt-widget-border');
                panelBody = el.div().addClass('panel-body').append(returnForm);
                if (settings.panelTitle) {
                    panelHeading = el.div().addClass('panel-heading lt-widget-heading').html(settings.panelTitle);
                }
                if (panelHeading) {
                    panelMain.append(panelHeading);
                }
                panelMain.append(panelBody);
                returnForm = panelMain;
            }
        }
        else if (settings.panelTitle) {
            returnForm.prepend(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
        }
        var widgetWrapper = ltjQuery('#' + settings.wrapperId).addClass('ltw container-fluid').empty().append(returnForm);
        if (settings.showBuilderTools) {
            widgetWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'ltFormEditTool'));
        }
        if (typeof settings.postDOMCallback === 'function') {
            settings.postDOMCallback();
        }
    }
    return LoanTekBuildForm;
}());
var LoanTekCaptcha = (function () {
    function LoanTekCaptcha(options) {
        var _this = this;
        this.Validate = function () {
            return _this.IsValidEntry();
        };
        var _thisC = this;
        var settings = {
            imgId: 'ltCaptchaImg',
            inputId: 'ltCaptchaInput',
            resetId: 'ltCaptchaReset',
            errorMsgId: 'ltCaptchaErrorMsg',
            backgroundClasses: ['captcha01', 'captcha02', 'captcha03'],
            fontClasses: ['alpha-sans', 'alpha-arial', 'alpha-comic-sans', 'alpha-consolas', 'alpha-courier', 'alpha-georgia', 'alpha-impact', 'alpha-palatino', 'alpha-trebuchet'],
            characters: '23456789ABCDEFGHJKLMNPRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
            characterLength: 5
        };
        ltjQuery.extend(settings, options);
        _thisC._captchaInput = ltjQuery('#' + settings.inputId);
        _thisC._captchaErrorMsg = ltjQuery('#' + settings.errorMsgId);
        _thisC._charArray = settings.characters.split('');
        _thisC._capImg = ltjQuery('#' + settings.imgId);
        var capReset = ltjQuery('#' + settings.resetId);
        _thisC._capSpan = function () { return ltjQuery('<span/>'); };
        _thisC.SetRandomCaptcha(settings);
        capReset.click(function () {
            _thisC.SetRandomCaptcha(settings);
        });
        _thisC._captchaInput.blur(function () {
            _thisC.IsValidEntry();
        });
    }
    LoanTekCaptcha.prototype.SetRandomCaptcha = function (settings) {
        var _thisM = this;
        var randomChar;
        var randomCharIndex;
        var randomCodeArray = [];
        _thisM._randomCodeString = '';
        _thisM.SetCaptchaInputValue('');
        _thisM._captchaErrorMsg.hide();
        for (var i = 0; i < settings.characterLength; ++i) {
            randomCharIndex = _thisM.GetRandomIndexNumber(_thisM._charArray.length);
            randomChar = _thisM._charArray[randomCharIndex];
            randomCodeArray.push(randomChar);
            _thisM._randomCodeString += randomChar;
        }
        _thisM.SetCaptchaImg(settings, randomCodeArray);
    };
    LoanTekCaptcha.prototype.SetCaptchaImg = function (settings, codeArray) {
        var _thisM = this;
        var randomBackgroundIndex = _thisM.GetRandomIndexNumber(settings.backgroundClasses.length);
        var randomFontIndex;
        var randomFont;
        var imgBgClass = settings.backgroundClasses[randomBackgroundIndex];
        var aPos = _thisM.GetAlphaPositions();
        _thisM._capImg.removeClass(function () { return settings.backgroundClasses.join(' '); });
        _thisM._capImg.addClass(imgBgClass);
        _thisM._capImg.html('');
        for (var i = 0; i < codeArray.length; ++i) {
            var c = codeArray[i];
            var pos = aPos['alpha_position_' + c].x + 'px ' + aPos['alpha_position_' + c].y + 'px';
            randomFontIndex = _thisM.GetRandomIndexNumber(settings.fontClasses.length);
            randomFont = settings.fontClasses[randomFontIndex];
            _thisM._capImg.append(_thisM._capSpan().addClass('captcha-alpha ' + randomFont).css({ backgroundPosition: pos }));
        }
    };
    LoanTekCaptcha.prototype.GetCaptchaInputValue = function () {
        return this._captchaInput.val();
    };
    LoanTekCaptcha.prototype.SetCaptchaInputValue = function (newText) {
        this._captchaInput.val(newText);
    };
    LoanTekCaptcha.prototype.GetRandomIndexNumber = function (objLen) {
        return Math.floor(Math.random() * objLen);
    };
    LoanTekCaptcha.prototype.GetAlphaPositions = function () {
        return {
            alpha_position_A: { x: 0, y: 0 },
            alpha_position_B: { x: 0, y: -50 },
            alpha_position_C: { x: 0, y: -100 },
            alpha_position_D: { x: 0, y: -150 },
            alpha_position_E: { x: 0, y: -200 },
            alpha_position_F: { x: 0, y: -250 },
            alpha_position_G: { x: 0, y: -300 },
            alpha_position_H: { x: 0, y: -350 },
            alpha_position_I: { x: 0, y: -400 },
            alpha_position_J: { x: 0, y: -450 },
            alpha_position_K: { x: 0, y: -500 },
            alpha_position_L: { x: 0, y: -550 },
            alpha_position_M: { x: 0, y: -600 },
            alpha_position_N: { x: 0, y: -650 },
            alpha_position_O: { x: 0, y: -700 },
            alpha_position_P: { x: 0, y: -750 },
            alpha_position_Q: { x: 0, y: -800 },
            alpha_position_R: { x: 0, y: -850 },
            alpha_position_S: { x: 0, y: -900 },
            alpha_position_T: { x: 0, y: -950 },
            alpha_position_U: { x: 0, y: -1000 },
            alpha_position_V: { x: 0, y: -1050 },
            alpha_position_W: { x: 0, y: -1100 },
            alpha_position_X: { x: 0, y: -1150 },
            alpha_position_Y: { x: 0, y: -1200 },
            alpha_position_Z: { x: 0, y: -1250 },
            alpha_position_a: { x: -50, y: 0 },
            alpha_position_b: { x: -50, y: -50 },
            alpha_position_c: { x: -50, y: -100 },
            alpha_position_d: { x: -50, y: -150 },
            alpha_position_e: { x: -50, y: -200 },
            alpha_position_f: { x: -50, y: -250 },
            alpha_position_g: { x: -50, y: -300 },
            alpha_position_h: { x: -50, y: -350 },
            alpha_position_i: { x: -50, y: -400 },
            alpha_position_j: { x: -50, y: -450 },
            alpha_position_k: { x: -50, y: -500 },
            alpha_position_l: { x: -50, y: -550 },
            alpha_position_m: { x: -50, y: -600 },
            alpha_position_n: { x: -50, y: -650 },
            alpha_position_o: { x: -50, y: -700 },
            alpha_position_p: { x: -50, y: -750 },
            alpha_position_q: { x: -50, y: -800 },
            alpha_position_r: { x: -50, y: -850 },
            alpha_position_s: { x: -50, y: -900 },
            alpha_position_t: { x: -50, y: -950 },
            alpha_position_u: { x: -50, y: -1000 },
            alpha_position_v: { x: -50, y: -1050 },
            alpha_position_w: { x: -50, y: -1100 },
            alpha_position_x: { x: -50, y: -1150 },
            alpha_position_y: { x: -50, y: -1200 },
            alpha_position_z: { x: -50, y: -1250 },
            alpha_position_0: { x: -100, y: 0 },
            alpha_position_1: { x: -100, y: -50 },
            alpha_position_2: { x: -100, y: -100 },
            alpha_position_3: { x: -100, y: -150 },
            alpha_position_4: { x: -100, y: -200 },
            alpha_position_5: { x: -100, y: -250 },
            alpha_position_6: { x: -100, y: -300 },
            alpha_position_7: { x: -100, y: -350 },
            alpha_position_8: { x: -100, y: -400 },
            alpha_position_9: { x: -100, y: -450 }
        };
    };
    LoanTekCaptcha.prototype.IsValidEntry = function () {
        var doesEntryMatch = false;
        doesEntryMatch = this._randomCodeString.toLowerCase() === this.GetCaptchaInputValue().toLowerCase().replace(/\s+/g, '');
        if (!doesEntryMatch) {
            this._captchaErrorMsg.show();
        }
        else {
            this._captchaErrorMsg.hide();
        }
        return doesEntryMatch;
    };
    return LoanTekCaptcha;
}());
var LoanTekManualContactWidget = (function () {
    function LoanTekManualContactWidget(options) {
        var settings = {
            redirectUrl: null,
            postUrl: '',
            successMessage: null,
            externalValidatorFunction: null,
            form_id: '#LtcwContactWidgetForm',
            form_clientid: '#ltcwClientId',
            form_userid: '#ltcwUserId',
            form_firstName: '#ltcwFirstName',
            form_lastName: '#ltcwLastName',
            form_email: '#ltcwEmail',
            form_phone: '#ltcwPhone',
            form_company: '#ltcwCompany',
            form_state: '#ltcwState',
            form_comments: '#ltcwComments',
            form_submit: '#ltcwSubmit',
            form_errorMsgWrapper: '#ltcwErrorMessageWrapper',
            form_errorMsg: '#ltcwErrorMessage',
            successMsgWrapper: '#ltcwSuccessMessageWrapper',
            successMsg: '#ltcwSuccessMessage'
        };
        ltjQuery.extend(settings, options);
        ltjQuery('input, textarea').placeholder({ customClass: 'placeholder-text' });
        ltjQuery(function () {
            var widgetData = {
                "FileType": "SalesLead",
                "Reason": "FORM_VALUE_Comments",
                "Source": {
                    "Active": true,
                    "Alias": "LoanTek.com",
                    "Id": 44,
                    "SourceType": "LeadSource",
                    "Name": "LoanTek.com",
                    "SubName": "Contact-Us-Form"
                },
                "NotifyUserOfNewLead": true,
                "SendNewLeadInitialWelcomeMessage": true,
                "ClientDefinedIdentifier": "LTWSJavaScriptTimeStamp",
                "ClientId": 399,
                "Persons": [{
                        "PersonCategoryType": "Person",
                        "PersonType": "Primary",
                        "Addresses": [{
                                "State": "FORM_VALUE_State"
                            }],
                        "ContactMethods": [{
                                "ContactType": "Email",
                                "Address": "FORM_VALUE_Email"
                            }, {
                                "ContactType": "Phone",
                                "Number": "FORM_VALUE_Phone"
                            }],
                        "Assets": [{
                                "AssetType": "Job",
                                "CompanyName": "FORM_VALUE_Company"
                            }],
                        "FirstName": "FORM_VALUE_FName",
                        "LastName": "FORM_VALUE_LName"
                    }],
                "MiscData": [{
                        "Name": "AdditionalInformation",
                        "Value": "LEAVE_BLANK_FOR_NOW"
                    }]
            };
            ltjQuery(settings.form_submit).prop('disabled', false);
            ltjQuery(settings.form_id).submit(function (event) {
                event.preventDefault();
                ltjQuery(settings.form_errorMsgWrapper).hide(100);
                ltjQuery(settings.form_submit).prop('disabled', true);
                if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
                    ltjQuery(settings.form_submit).prop('disabled', false);
                    return false;
                }
                widgetData.Persons[0].FirstName = ltjQuery(settings.form_firstName).val();
                widgetData.Persons[0].LastName = ltjQuery(settings.form_lastName).val();
                widgetData.Persons[0].ContactMethods[0].Address = ltjQuery(settings.form_email).val();
                widgetData.Persons[0].ContactMethods[1].Number = ltjQuery(settings.form_phone).val();
                widgetData.Persons[0].Assets[0].CompanyName = ltjQuery(settings.form_company).val();
                widgetData.Persons[0].Addresses[0].State = ltjQuery(settings.form_state + ' option:selected').val();
                widgetData.ClientDefinedIdentifier = ltjQuery(settings.form_clientid).val();
                widgetData.Reason = ltjQuery(settings.form_comments).val();
                widgetData.MiscData[0].Value = '';
                window.console && console.log('widgetData', widgetData);
                var request = ltjQuery.ajax({
                    url: settings.postUrl,
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(widgetData),
                    dataType: 'json'
                });
                request.done(function (result) {
                    ltjQuery(settings.form_id).trigger('reset');
                    ltjQuery(settings.form_submit).prop('disabled', false);
                    if (settings.redirectUrl) {
                        window.location.assign(settings.redirectUrl);
                    }
                    else if (settings.successMessage) {
                        ltjQuery(settings.form_id).hide(100, function () {
                            ltjQuery(settings.form_id).remove();
                        });
                        ltjQuery(settings.successMsgWrapper).show(100);
                        ltjQuery(settings.successMsg).html(settings.successMessage);
                    }
                });
                request.fail(function (error) {
                    ltjQuery(settings.form_submit).prop('disabled', false);
                    var msg = 'There was an unexpected error. Please try again.';
                    try {
                        var errorObj = (error.responseJSON != null) ? error.responseJSON : JSON.parse(error.responseText);
                        msg = errorObj.Message;
                    }
                    catch (e) {
                        console.error('Error @ request.fail.responseText:' + e);
                    }
                    ltjQuery(settings.form_errorMsg).html(msg);
                    ltjQuery(settings.form_errorMsgWrapper).show(100);
                });
            });
        });
    }
    return LoanTekManualContactWidget;
}());
