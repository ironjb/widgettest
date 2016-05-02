var ltjQuery = jQuery.noConflict(true);
var LoanTekManualContactWidget = (function () {
    function LoanTekManualContactWidget(options) {
        var settings = {
            redirectUrl: null,
            postUrl: '',
            successMessage: null,
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
        window.console && console.log(settings);
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
            ltjQuery(settings.form_id).submit(function (event) {
                event.preventDefault();
                ltjQuery(settings.form_errorMsgWrapper).hide(100);
                ltjQuery(settings.form_submit).prop('disabled', true);
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
                    data: widgetData,
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
                    window.console && console.log('errors', error);
                    ltjQuery(settings.form_submit).prop('disabled', false);
                    ltjQuery(settings.form_errorMsg).html(error);
                    ltjQuery(settings.form_errorMsgWrapper).show(100);
                });
            });
        });
    }
    return LoanTekManualContactWidget;
}());
var LoanTekBuildForm = (function () {
    function LoanTekBuildForm(elementSelector, formObj) {
        var el = {
            div: function () { return ltjQuery('div'); },
            form: function () { return ltjQuery('form').addClass('form-horizontal'); },
            button: function (btnClass, type) {
                if (btnClass === void 0) { btnClass = 'default'; }
                if (type === void 0) { type = 'button'; }
                return ltjQuery('button').addClass('btn btn-' + btnClass);
            },
            select: function () { return ltjQuery('select'); },
            option: function () { return ltjQuery('option'); },
            input: function (type) {
                return ltjQuery('input');
            },
            textarea: function () { return ltjQuery('textarea'); },
            col: function (colNumber) {
                if (colNumber === void 0) { colNumber = 12; }
                return el.div().addClass('.col-sm-' + colNumber.toString());
            },
            row: function (colNumber) {
                if (colNumber) {
                    return el.div().addClass('.row').append(el.col(colNumber));
                }
                else {
                    return el.div().addClass('.row');
                }
            }
        };
        var returnForm = el.form();
        ltjQuery.each(formObj.fields, function (i, fieldItem) {
            var newField;
            switch (fieldItem.type) {
                case 'submit':
                    break;
                default:
            }
            returnForm.append(el.div().addClass('form-group').append(newField));
        });
        var returnDiv = el.div().addClass('ltcw container-fluid').append(returnForm);
        ltjQuery(elementSelector).empty().replaceWith(returnDiv);
    }
    return LoanTekBuildForm;
}());
