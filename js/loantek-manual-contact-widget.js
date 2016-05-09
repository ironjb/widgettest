var ltjQuery = jQuery.noConflict(true);
var LoanTekManualContactWidget = (function () {
    function LoanTekManualContactWidget(options) {
        var settings = {
            redirectUrl: null,
            postUrl: '',
            successMessage: null,
            externalValidatorFunction: null,
            form_id: '#LtcwContactWidgetForm',
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
                widgetData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime().toString();
                widgetData.Reason = ltjQuery(settings.form_comments).val();
                widgetData.MiscData[0].Value = '';
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
var LoanTekBuildForm = (function () {
    function LoanTekBuildForm(formObj, options) {
        var _this = this;
        this.CreateElement = function () {
            var el = {
                p: function () { return ltjQuery('<p/>'); },
                div: function () { return ltjQuery('<div/>'); },
                form: function () { return ltjQuery('<form/>').addClass('form-horizontal'); },
                button: function (type) {
                    if (type === void 0) { type = 'button'; }
                    return ltjQuery('<button/>').prop('type', type);
                },
                select: function () { return ltjQuery('<select/>').addClass('form-control'); },
                option: function () { return ltjQuery('<option/>'); },
                input: function (type) {
                    if (type === void 0) { type = 'text'; }
                    return ltjQuery('<input/>').prop('type', type);
                },
                textarea: function () { return ltjQuery('<textarea/>').addClass('form-control'); },
                col: function (colNumber) {
                    if (colNumber === void 0) { colNumber = 12; }
                    return el.div().addClass('col-sm-' + colNumber.toString());
                },
                row: function (rowType) {
                    if (rowType === void 0) { rowType = 'row'; }
                    return el.div().addClass(rowType);
                },
                formGroup: function () { return el.row('form-group'); }
            };
            return el;
        };
        this.CreateFormElement = function (elementObj) {
            var _thisM = _this;
            var el = _thisM.CreateElement();
            var returnElement = null;
            switch (elementObj.element) {
                case 'button':
                    returnElement = el.button(elementObj.type ? elementObj.type : 'button');
                    elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
                    elementObj.value = elementObj.value ? elementObj.value : 'OK';
                    returnElement.addClass(elementObj.cssClass).html(elementObj.value);
                    break;
                case 'select':
                    returnElement = el.select();
                    elementObj.placeholder = elementObj.placeholder ? elementObj.placeholder : ' ';
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
                    break;
                case 'input':
                    elementObj.type = elementObj.type ? elementObj.type : 'text';
                    returnElement = el.input(elementObj.type);
                    switch (elementObj.type) {
                        case 'button':
                            elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
                            elementObj.value = elementObj.value ? elementObj.value : 'OK';
                            returnElement.addClass(elementObj.cssClass).val(elementObj.value);
                            break;
                        case 'hidden':
                            returnElement.val(elementObj.value);
                            break;
                        default:
                            returnElement.addClass('form-control');
                            if (elementObj.cssClass) {
                                returnElement.addClass(elementObj.cssClass);
                            }
                            if (elementObj.value) {
                                returnElement.val(elementObj.value);
                            }
                            break;
                    }
                    break;
                default:
                    returnElement = el.div();
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
                if (elementObj.placeholder) {
                    elementObj.placeholder = elementObj.required ? '* ' + elementObj.placeholder : elementObj.placeholder;
                    switch (elementObj.element) {
                        case 'select':
                            returnElement.prepend(el.option().val('').html(elementObj.placeholder).addClass('text-muted'));
                            if (!elementObj.value) {
                                returnElement.val('');
                            }
                            break;
                        default:
                            returnElement.prop('placeholder', elementObj.placeholder);
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
        var settings = {
            wrapperId: 'ltWidgetWrapper',
            formId: 'LtcwContactWidgetForm',
            errorMessageWrapperId: 'ltcwErrorMessageWrapper',
            errrorMessageId: 'ltcwErrorMessage',
            defaultFormSize: null,
            showBuilderTools: false
        };
        ltjQuery.extend(settings, options);
        var el = _thisC.CreateElement();
        var returnForm = el.form().prop('id', settings.formId).append(el.row('row').prop('id', settings.errorMessageWrapperId).css({ display: 'none' }).append(el.col().append(el.div().addClass('alert alert-danger').append(el.p().prop('id', settings.errrorMessageId)))));
        var COLUMNS_IN_ROW = 12;
        var columnCount = 0;
        var row = null;
        var isSingleRow;
        var isTimeToAddRow = false;
        var isLastField = false;
        var isHidden = false;
        var cell = null;
        var fieldsLength = formObj.fields.length;
        var nextFieldCols;
        var nextIndex;
        var remainingColSpace = 0;
        var isNextHidden = false;
        var fieldTemplate;
        var fieldTemplates = {
            clientid: { element: 'input', type: 'hidden', id: 'ltcwClientId', value: 'LTWS' + new Date().getTime().toString() },
            userid: { element: 'input', type: 'hidden', id: 'ltcwUserId', value: 'UserID###' },
            firstname: { element: 'input', type: 'text', id: 'ltcwFirstName', placeholder: 'First Name', required: true, cols: 6 },
            lastname: { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true, cols: 6 },
            email: { element: 'input', type: 'email', id: 'ltcwEmail', placeholder: 'Email', required: true, cols: 6 },
            phone: { element: 'input', type: 'tel', id: 'ltcwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}', cols: 6 },
            company: { element: 'input', type: 'text', id: 'ltcwCompany', placeholder: 'Company', cols: 6 },
            state: { element: 'select', type: 'state', id: 'ltcwState', placeholder: 'Select a State', cols: 6 },
            comments: { element: 'textarea', id: 'ltcwComments', placeholders: 'Comments', rows: 4 },
            submit: { element: 'button', type: 'submit', cssClass: 'btn-primary', value: 'Submit' }
        };
        function ExtendFieldTemplate(eItem) {
            return ltjQuery.extend({}, fieldTemplates[eItem.field], eItem);
        }
        ltjQuery.each(formObj.fields, function (i, elementItem) {
            if (elementItem.field) {
                formObj.fields[i] = ExtendFieldTemplate(elementItem);
                delete formObj.fields[i].field;
                window.console && console.log('elItem', formObj.fields[i]);
            }
        });
        ltjQuery.each(formObj.fields, function (i, elementItem) {
            isHidden = elementItem.type === 'hidden';
            elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
            elementItem.size = elementItem.size ? elementItem.size : settings.defaultFormSize;
            isLastField = i >= fieldsLength - 1;
            nextIndex = i + 1;
            do {
                isNextHidden = formObj.fields[nextIndex] && formObj.fields[nextIndex].type === 'hidden';
                nextFieldCols = (formObj.fields[nextIndex] && formObj.fields[nextIndex].cols) ? formObj.fields[nextIndex].cols : isNextHidden ? 0 : COLUMNS_IN_ROW;
                nextIndex++;
            } while (nextFieldCols === 0 && nextIndex <= fieldsLength);
            if (isHidden) {
                returnForm.append(_thisC.CreateFormElement(elementItem));
            }
            else {
                if (!row) {
                    columnCount = 0;
                    if (elementItem.cols >= COLUMNS_IN_ROW) {
                        row = el.formGroup();
                        isSingleRow = true;
                    }
                    else {
                        row = el.row();
                        isSingleRow = false;
                    }
                }
                columnCount += elementItem.cols;
                if (isSingleRow) {
                    cell = el.col().append(_thisC.CreateFormElement(elementItem));
                }
                else {
                    cell = el.col(elementItem.cols).append(el.formGroup().append(el.col().append(_thisC.CreateFormElement(elementItem))));
                }
                row.append(cell);
                isTimeToAddRow = isLastField || columnCount >= COLUMNS_IN_ROW;
                if (columnCount < COLUMNS_IN_ROW && columnCount + nextFieldCols > COLUMNS_IN_ROW) {
                    isTimeToAddRow = true;
                    remainingColSpace = COLUMNS_IN_ROW - columnCount;
                    if (settings.showBuilderTools) {
                        row.append(el.col(remainingColSpace).addClass('hidden-xs').append(el.formGroup().append(el.col().append(el.div().addClass('form-control-static bg-info visible-on-hover').html('<!-- cols: ' + remainingColSpace + ' -->')))));
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
        ltjQuery('#' + settings.wrapperId).addClass('ltcw container-fluid').empty().append(returnForm);
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
            fontClasses: ['font01', 'font02', 'font03', 'font04', 'font05', 'font06', 'font07', 'font08', 'font09', 'font10', 'font11', 'font12', 'font13'],
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
        window.console && console.log(_thisM._randomCodeString, randomCodeArray);
        _thisM.SetCaptchaImg(settings, randomCodeArray);
    };
    LoanTekCaptcha.prototype.SetCaptchaImg = function (settings, codeArray) {
        var _thisM = this;
        var randomBackgroundIndex = _thisM.GetRandomIndexNumber(settings.backgroundClasses.length);
        var randomFontIndex;
        var randomFont;
        var imgBgClass = settings.backgroundClasses[randomBackgroundIndex];
        _thisM._capImg.addClass(imgBgClass);
        _thisM._capImg.html('');
        for (var i = 0; i < codeArray.length; ++i) {
            randomFontIndex = _thisM.GetRandomIndexNumber(settings.fontClasses.length);
            randomFont = settings.fontClasses[randomFontIndex];
            _thisM._capImg.append(_thisM._capSpan().addClass(randomFont).html(' ' + codeArray[i] + ' '));
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
