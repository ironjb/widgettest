var LoanTekWidget;
(function (LoanTekWidget) {
    var FormBuild = (function () {
        function FormBuild($, lth, options, readyOptions) {
            var _thisC = this;
            _thisC._lth = lth;
            _thisC._$ = $;
            var settings = {
                wrapperId: 'ltWidgetWrapper',
                formId: 'ltWidgetForm',
                widgetType: lth.widgetType.contact.id,
                errorMessageWrapperId: 'ltcwErrorMessageWrapper',
                errrorMessageId: 'ltcwErrorMessage',
                fieldSize: null,
                formBorderType: null,
                panelTitle: null,
                showBuilderTools: false,
                fields: null,
                resultWrapId: null,
                rFormId: null,
                rFieldSize: null,
                rFormBorderType: null,
                rPanelTitle: null,
                rFields: null
            };
            $.extend(settings, options);
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
            var el = lth.CreateElement();
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
            function ExtendFieldTemplate(eItem) {
                return $.extend({}, lth.contactFields[eItem.field].fieldTemplate, eItem);
            }
            $.each(settings.fields, function (i, elementItem) {
                if (elementItem.field) {
                    settings.fields[i] = ExtendFieldTemplate(elementItem);
                }
            });
            $.each(settings.fields, function (i, elementItem) {
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
                        var passData = { index: i };
                        var passString = JSON.stringify(passData);
                        cell.addClass('ltw-builder-tools-field').prepend(el.div().addClass('ltw-tool-field-update')
                            .attr('data-lt-field-edit-tool', passString)
                            .attr('data-lt-field-edit-tool-data', 'editFieldData'));
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
                if (settings.formBorderType === lth.formBorderType.well.id) {
                    var wellMain = el.div().addClass('well lt-widget-border');
                    if (settings.panelTitle) {
                        wellMain.append(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
                    }
                    returnForm = wellMain.append(returnForm);
                }
                else if (settings.formBorderType === lth.formBorderType.panel.id) {
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
            var widgetWrapper = $('#' + settings.wrapperId).addClass('ltw ' + lth.defaultFormSpecifierClass + ' container-fluid').empty().append(returnForm);
            if (settings.showBuilderTools) {
                widgetWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'ltFormEditTool'));
            }
            if (typeof settings.postDOMCallback === 'function') {
                settings.postDOMCallback();
            }
            if (settings.widgetType === lth.widgetType.quote.id) {
            }
            else if (settings.widgetType === lth.widgetType.rate.id) {
            }
            else {
                var widgetFunctionality = new ContactFunctionality($, readyOptions);
            }
        }
        FormBuild.prototype.CreateFormElement = function (elementObj) {
            var _thisM = this;
            var el = _thisM._lth.CreateElement();
            var returnElement = null;
            switch (elementObj.element) {
                case 'title':
                    elementObj.nsize = elementObj.nsize || _thisM._lth.hsize.getDefault().id;
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
                case 'p':
                    elementObj.value = elementObj.value || ' ';
                    returnElement = el.p();
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
                            var usStates = _thisM._lth.US_States();
                            _thisM._$.each(usStates.states, function (i, state) {
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
                if (elementObj.color) {
                    returnElement.css({ color: elementObj.color });
                }
                if (elementObj.fontSize) {
                    returnElement.css({ fontSize: elementObj.fontSize + 'px' });
                }
                if (elementObj.backgroundColor) {
                    returnElement.css({ backgroundColor: elementObj.backgroundColor });
                }
                if (_thisM._lth.isNumber(elementObj.borderRadius)) {
                    returnElement.css({ borderRadius: elementObj.borderRadius + 'px' });
                }
                if (elementObj.borderColor) {
                    switch (elementObj.element) {
                        case 'p':
                        case 'div':
                            returnElement.css({ borderWidth: '1px', borderStyle: 'solid' });
                            break;
                        default:
                            break;
                    }
                    returnElement.css({ borderColor: elementObj.borderColor });
                }
                if (_thisM._lth.isNumber(elementObj.padding)) {
                    returnElement.css({ padding: elementObj.padding + 'px' });
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
        return FormBuild;
    }());
    LoanTekWidget.FormBuild = FormBuild;
    var ContactFunctionality = (function () {
        function ContactFunctionality($, options) {
            var settings = {
                redirectUrl: null,
                postUrl: '',
                successMessage: null,
                externalValidatorFunction: null,
                form_id: '#ltWidgetForm',
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
            $.extend(settings, options);
            $('input, textarea').placeholder({ customClass: 'placeholder-text' });
            $(function () {
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
                $(settings.form_submit).prop('disabled', false);
                $(settings.form_id).submit(function (event) {
                    event.preventDefault();
                    $(settings.form_errorMsgWrapper).hide(100);
                    $(settings.form_submit).prop('disabled', true);
                    if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
                        $(settings.form_submit).prop('disabled', false);
                        return false;
                    }
                    widgetData.Persons[0].FirstName = $(settings.form_firstName).val();
                    widgetData.Persons[0].LastName = $(settings.form_lastName).val();
                    widgetData.Persons[0].ContactMethods[0].Address = $(settings.form_email).val();
                    widgetData.Persons[0].ContactMethods[1].Number = $(settings.form_phone).val();
                    widgetData.Persons[0].Assets[0].CompanyName = $(settings.form_company).val();
                    widgetData.Persons[0].Addresses[0].State = $(settings.form_state + ' option:selected').val();
                    widgetData.ClientDefinedIdentifier = $(settings.form_clientid).val();
                    widgetData.Reason = $(settings.form_comments).val();
                    widgetData.MiscData[0].Value = '';
                    var request = $.ajax({
                        url: settings.postUrl,
                        method: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(widgetData)
                    });
                    request.done(function (result) {
                        $(settings.form_id).trigger('reset');
                        $(settings.form_submit).prop('disabled', false);
                        if (settings.redirectUrl) {
                            window.location.assign(settings.redirectUrl);
                        }
                        else if (settings.successMessage) {
                            $(settings.form_id).hide(100, function () {
                                $(settings.form_id).remove();
                            });
                            $(settings.successMsgWrapper).show(100);
                            $(settings.successMsg).html(settings.successMessage);
                        }
                    });
                    request.fail(function (error) {
                        $(settings.form_submit).prop('disabled', false);
                        var msg = 'There was an unexpected error. Please try again.';
                        try {
                            var errorObj = (error.responseJSON != null) ? error.responseJSON : JSON.parse(error.responseText);
                            msg = errorObj.Message;
                        }
                        catch (e) {
                            console.error('Error @ request.fail.responseText:' + e);
                        }
                        $(settings.form_errorMsg).html(msg);
                        $(settings.form_errorMsgWrapper).show(100);
                    });
                });
            });
        }
        return ContactFunctionality;
    }());
})(LoanTekWidget || (LoanTekWidget = {}));
