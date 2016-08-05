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
                successMessageWrapperId: 'ltwSuccessMessageWrapper',
                errorAnchor: 'ltwErrorAnchor',
                errorMessageWrapperId: 'ltwErrorMessageWrapper',
                errrorMessageId: 'ltwErrorMessage',
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
            var isSpaceLeftOver = false;
            var isLastField = false;
            var isHidden = false;
            var isLabel;
            var cell = null;
            var fieldsLength = settings.fields.length;
            var nextFieldOffsetCols;
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
            errorRow.append(el.col().append(el.a().prop('name', settings.errorAnchor)).append(el.div().addClass('alert alert-danger').append(errorMsg)));
            var returnForm = el.form().prop('id', settings.formId).append(errorRow);
            function ExtendFieldTemplate(eItem) {
                return $.extend({}, lth.contactFields[eItem.field].fieldTemplate, eItem);
            }
            $.each(settings.fields, function (i, elementItem) {
                if (elementItem.field) {
                    settings.fields[i] = ExtendFieldTemplate(elementItem);
                }
            });
            $.each(settings.fields, function (fieldIndex, elementItem) {
                if (elementItem.offsetCols && !elementItem.cols) {
                    elementItem.cols = COLUMNS_IN_ROW - elementItem.offsetCols;
                }
                isHidden = elementItem.type === 'hidden';
                elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
                elementItem.offsetCols = elementItem.offsetCols ? elementItem.offsetCols : 0;
                elementItem.size = elementItem.size ? elementItem.size : settings.fieldSize;
                isLastField = fieldIndex >= fieldsLength - 1;
                isLabel = elementItem.element === 'label';
                nextIndex = fieldIndex + 1;
                do {
                    isNextHidden = settings.fields[nextIndex] && settings.fields[nextIndex].type === 'hidden';
                    nextFieldOffsetCols = (settings.fields[nextIndex] && settings.fields[nextIndex].offsetCols) ? settings.fields[nextIndex].offsetCols : 0;
                    nextFieldCols = (settings.fields[nextIndex] && settings.fields[nextIndex].cols) ? settings.fields[nextIndex].cols + nextFieldOffsetCols : isNextHidden ? 0 : COLUMNS_IN_ROW;
                    nextIndex++;
                } while (nextFieldCols === 0 && nextIndex <= fieldsLength);
                if (isHidden) {
                    returnForm.append(_thisC.CreateFormElement(elementItem));
                }
                else {
                    if (!row) {
                        columnCount = 0;
                        if (elementItem.cols + elementItem.offsetCols >= COLUMNS_IN_ROW) {
                            row = el.formGroup(elementItem.size);
                            isSingleRow = true;
                        }
                        else {
                            row = el.row();
                            isSingleRow = false;
                        }
                    }
                    columnCount += elementItem.cols + elementItem.offsetCols;
                    if (isSingleRow) {
                        if (isLabel) {
                            if (elementItem.offsetCols > 0) {
                                cell = el.col(elementItem.cols).append(el.row().append(_thisC.CreateFormElement(elementItem)));
                            }
                            else {
                                cell = _thisC.CreateFormElement(elementItem);
                            }
                        }
                        else {
                            cell = el.col(elementItem.cols).append(_thisC.CreateFormElement(elementItem));
                        }
                        if (settings.showBuilderTools) {
                            appendBuilderTools(cell);
                            appendMoveTools(cell);
                        }
                    }
                    else {
                        var innerCell;
                        if (isLabel) {
                            innerCell = _thisC.CreateFormElement(elementItem);
                        }
                        else {
                            innerCell = el.col().append(_thisC.CreateFormElement(elementItem));
                        }
                        if (settings.showBuilderTools) {
                            appendBuilderTools(innerCell);
                            appendMoveTools(innerCell);
                        }
                        cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size).append(innerCell));
                    }
                    if (elementItem.offsetCols > 0) {
                        cell.addClass('col-sm-offset-' + elementItem.offsetCols);
                    }
                    function appendBuilderTools(currentCell) {
                        var passData = { index: fieldIndex };
                        var passString = JSON.stringify(passData);
                        currentCell.addClass('ltw-builder-tools-field').prepend(el.div().addClass('ltw-tool-field-update')
                            .attr('data-lt-field-edit-tool', passString)
                            .attr('data-lt-field-edit-tool-data', 'editFieldData'));
                        if (!isSingleRow) {
                            currentCell.addClass('ltw-builder-tools-multi-cell-row');
                        }
                    }
                    function appendMoveTools(currentCell) {
                        currentCell.prepend(el.div().addClass('move-hover'));
                        currentCell.attr('data-drop', 'true')
                            .attr('data-jqyoui-droppable', lth.Interpolate("{ index: #{pdi}, onDrop: 'onDrop(#{pdi})' }", { pdi: '' + fieldIndex }))
                            .attr('data-jqyoui-options', "{accept: '.field-channel', hoverClass: 'on-drag-hover'}");
                    }
                    isTimeToAddRow = isLastField || columnCount >= COLUMNS_IN_ROW;
                    isSpaceLeftOver = columnCount < COLUMNS_IN_ROW && columnCount + nextFieldCols > COLUMNS_IN_ROW;
                    if (elementItem.type === lth.contactFields.successmessage.id) {
                        var wrapElement = isSingleRow ? row : cell;
                        wrapElement.prop('id', settings.successMessageWrapperId);
                        if (!settings.showBuilderTools) {
                            wrapElement.css({ display: 'none' });
                        }
                    }
                    row.append(cell);
                    if (isSpaceLeftOver) {
                        isTimeToAddRow = true;
                        remainingColSpace = COLUMNS_IN_ROW - columnCount;
                        if (settings.showBuilderTools) {
                            row.append(el.col(remainingColSpace).addClass('hidden-xs')
                                .append(el.formGroup(elementItem.size).append(el.col().append(el.div().addClass('form-control-static bg-infox visible-on-hoverx').html('<!-- cols: ' + remainingColSpace + ' -->'))
                                .attr('data-drop', 'true')
                                .attr('data-jqyoui-droppable', lth.Interpolate("{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, #{space}, #{isPh})' }", { pdi: fieldIndex, space: remainingColSpace, isPh: 'true' }))
                                .attr('data-jqyoui-options', "{accept: '.field-channel', hoverClass: 'on-drag-hover'}")
                                .prepend(el.div().addClass('move-hover')))));
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
                var widgetFunctionality = new ContactFunctionality($, lth, readyOptions);
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
        function ContactFunctionality($, lth, options) {
            var settings = {
                redirectUrl: null,
                postUrl: null,
                successMessage: 'Thank you. You will be contacted shortly.',
                externalValidatorFunction: null,
                userId: null,
                clientId: null,
                AdditionalPostData: null,
                form_id: '#ltWidgetForm',
                form_firstName: '#ltwFirstName',
                form_lastName: '#ltwLastName',
                form_email: '#ltwEmail',
                form_phone: '#ltwPhone',
                form_company: '#ltwCompany',
                form_state: '#ltwState',
                form_comments: '#ltwComments',
                form_submit: '#ltwSubmit',
                form_successMessageWrapper: '#ltwSuccessMessageWrapper',
                form_errorAnchor: 'ltwErrorAnchor',
                form_errorMsgWrapper: '#ltwErrorMessageWrapper',
                form_errorMsg: '#ltwErrorMessage'
            };
            $.extend(settings, options);
            $('input, textarea').placeholder({ customClass: 'placeholder-text' });
            $(function () {
                var widgetData = lth.postObjects.contact;
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
                    widgetData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime();
                    widgetData.ClientId = settings.clientId;
                    widgetData.UserId = settings.userId;
                    widgetData.Reason = $(settings.form_comments).val();
                    widgetData.MiscData[0].Value = '';
                    if (settings.AdditionalPostData) {
                        $.extend(true, widgetData, settings.AdditionalPostData);
                    }
                    var request = $.ajax({
                        url: settings.postUrl,
                        method: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify({ LeadFile: widgetData })
                    });
                    request.done(function (result) {
                        $(settings.form_id).trigger('reset');
                        $(settings.form_submit).prop('disabled', false);
                        if (settings.redirectUrl) {
                            window.location.assign(settings.redirectUrl);
                        }
                        else if (settings.successMessage) {
                            $(settings.form_submit).hide(100);
                            $(settings.form_successMessageWrapper).show(100);
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
                        lth.ScrollToAnchor(settings.form_errorAnchor);
                    });
                });
            });
        }
        return ContactFunctionality;
    }());
    LoanTekWidget.ContactFunctionality = ContactFunctionality;
})(LoanTekWidget || (LoanTekWidget = {}));
