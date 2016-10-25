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
                uniqueQualifier: ''
            };
            $.extend(settings, options);
            if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                settings.wrapperId += '_' + settings.uniqueQualifier;
                settings.formId += '_' + settings.uniqueQualifier;
                settings.successMessageWrapperId += '_' + settings.uniqueQualifier;
                settings.errorAnchor += '_' + settings.uniqueQualifier;
                settings.errorMessageWrapperId += '_' + settings.uniqueQualifier;
                settings.errrorMessageId += '_' + settings.uniqueQualifier;
            }
            var fieldHelperType;
            var el = lth.CreateElement();
            var buildTools = new BuildTools(lth);
            var errorRow = el.row('row').prop('id', settings.errorMessageWrapperId);
            var errorMsg = el.p().prop('id', settings.errrorMessageId);
            if (settings.widgetType === lth.widgetType.mortgagequote.id) {
                fieldHelperType = 'mortgageQuoteFields';
            }
            else if (settings.widgetType === lth.widgetType.mortgagerate.id) {
                fieldHelperType = 'mortgageRateFields';
            }
            else if (settings.widgetType === lth.widgetType.deposit.id) {
                fieldHelperType = 'depositFields';
            }
            else if (settings.widgetType === lth.widgetType.autoquote.id) {
                fieldHelperType = 'autoQuoteFields';
            }
            else {
                fieldHelperType = 'contactFields';
            }
            settings.fieldHelperType = fieldHelperType;
            if (!settings.showBuilderTools) {
                errorRow.css({ display: 'none' });
            }
            else {
                errorMsg.text('Error Message');
            }
            errorRow.append(el.col().append(el.a().prop('name', settings.errorAnchor)).append(el.div().addClass('alert alert-danger').append(errorMsg)));
            var returnForm = el.form().prop('id', settings.formId).append(errorRow);
            var returnForm2 = buildTools.BuildFields(returnForm, settings);
            var returnFormStyles = new LoanTekWidget.ApplyFormStyles(lth, settings, false, '.' + lth.defaultFormSpecifierClass + '_' + settings.uniqueQualifier).getStyles();
            if (returnFormStyles) {
                returnForm2.prepend(el.style().html(returnFormStyles));
            }
            var widgetWrapper = $('#' + settings.wrapperId).addClass('ltw ' + lth.defaultFormSpecifierClass + '_' + settings.uniqueQualifier).empty().append(returnForm2);
            if (settings.showBuilderTools) {
                widgetWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'editFormInfo'));
            }
            if (typeof settings.postDOMCallback === 'function') {
                settings.postDOMCallback();
            }
            var widgetFunctionality;
            if (settings.widgetType === lth.widgetType.mortgagequote.id) {
                widgetFunctionality = new MortgageQuoteFunctionality(lth, readyOptions);
            }
            else if (settings.widgetType === lth.widgetType.mortgagerate.id) {
                widgetFunctionality = new MortgageRateFunctionality(lth, readyOptions);
            }
            else if (settings.widgetType === lth.widgetType.deposit.id) {
                widgetFunctionality = new DepositFunctionality(lth, readyOptions);
            }
            else if (settings.widgetType === lth.widgetType.autoquote.id) {
                widgetFunctionality = new AutoQuoteFunctionality(lth, readyOptions);
            }
            else {
                widgetFunctionality = new ContactFunctionality($, lth, readyOptions);
            }
        }
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
                uniqueQualifier: '',
                form_id: '#ltWidgetForm',
                form_submit: '#ltwSubmit',
                form_errorAnchor: 'ltwErrorAnchor',
                form_errorMsgWrapper: '#ltwErrorMessageWrapper',
                form_errorMsg: '#ltwErrorMessage',
                AdditionalPostData: null,
                form_firstName: '#ltwFirstName',
                form_lastName: '#ltwLastName',
                form_email: '#ltwEmail',
                form_phone: '#ltwPhone',
                form_company: '#ltwCompany',
                form_state: '#ltwState',
                form_comments: '#ltwComments',
                form_successMessageWrapper: '#ltwSuccessMessageWrapper'
            };
            $.extend(settings, options);
            var customInputClass = '.lt-custom-input';
            if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                for (var paramName in settings) {
                    if (paramName.indexOf('form_') !== -1) {
                        settings[paramName] += '_' + settings.uniqueQualifier;
                    }
                }
                customInputClass += '_' + settings.uniqueQualifier;
            }
            $('input, textarea').placeholder({ customClass: 'placeholder-text' });
            $(function () {
                var contactPostData = lth.postObjects.contact();
                $(settings.form_submit).prop('disabled', false);
                $(settings.form_id).submit(function (event) {
                    event.preventDefault();
                    $(settings.form_errorMsgWrapper).hide(100);
                    $(settings.form_submit).prop('disabled', true);
                    if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
                        $(settings.form_submit).prop('disabled', false);
                        return false;
                    }
                    if (settings.AdditionalPostData) {
                        $.extend(true, contactPostData, settings.AdditionalPostData);
                    }
                    contactPostData.Persons[0].FirstName = $(settings.form_firstName).val();
                    contactPostData.Persons[0].LastName = $(settings.form_lastName).val();
                    contactPostData.Persons[0].ContactMethods[0].Address = $(settings.form_email).val();
                    contactPostData.Persons[0].ContactMethods[1].Number = $(settings.form_phone).val();
                    contactPostData.Persons[0].Assets[0].CompanyName = $(settings.form_company).val();
                    contactPostData.Persons[0].Addresses[0].State = $(settings.form_state + ' option:selected').val();
                    contactPostData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime();
                    contactPostData.ClientId = settings.clientId;
                    contactPostData.UserId = settings.userId;
                    contactPostData.Reason = $(settings.form_comments).val();
                    contactPostData.MiscData[0].Value = '';
                    $(customInputClass).each(function (customIndex, elem) {
                        contactPostData.MiscData.push({ Name: $(this).attr('data-lt-additional-info-key'), Value: $(this).val() });
                    });
                    var request = $.ajax({
                        url: settings.postUrl,
                        method: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify({ LeadFile: contactPostData })
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
    var DepositFunctionality = (function () {
        function DepositFunctionality(lth, options) {
            var $ = lth.$;
            var settings = {
                postUrl: null,
                externalValidatorFunction: null,
                userId: null,
                clientId: null,
                form_id: '#ltWidgetForm',
                form_submit: '#ltwSubmit',
                form_errorAnchor: 'ltwErrorAnchor',
                form_errorMsgWrapper: '#ltwErrorMessageWrapper',
                form_errorMsg: '#ltwErrorMessage',
                AdditionalPostData: null,
                form_term: '#ltwDepositTerm',
                form_amount: '#ltwDepositAmount',
                form_noDataMessage: '#ltwNoDataMessage',
                resultDisplayOptions: {
                    fieldHelperType: 'depositResultFields'
                }
            };
            $.extend(true, settings, options);
            var customInputClass = '.lt-custom-input';
            if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                for (var paramName in settings) {
                    if (paramName.indexOf('form_') !== -1) {
                        settings[paramName] += '_' + settings.uniqueQualifier;
                    }
                }
                customInputClass += '_' + settings.uniqueQualifier;
            }
            $('input, textarea').placeholder({ customClass: 'placeholder-text' });
            $(function () {
                var depositPostData = lth.postObjects.deposit();
                $(settings.form_submit).prop('disabled', false);
                var appendDataToDataList = function (fieldList, data) {
                    for (var flIndex = fieldList.length - 1; flIndex >= 0; flIndex--) {
                        var fieldItem = fieldList[flIndex];
                        if (fieldItem.field === 'depositdatalist') {
                            fieldItem.fieldData = data;
                        }
                    }
                };
                if (settings.resultDisplayOptions.showBuilderTools) {
                    var fakeData = [lth.FakeData().deposit];
                    appendDataToDataList(settings.resultDisplayOptions.fields, fakeData);
                    var showDepositResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
                    showDepositResultBuild.build();
                }
                $(settings.form_id).submit(function (event) {
                    event.preventDefault();
                    $(settings.form_errorMsgWrapper).hide(100);
                    $(settings.form_submit).prop('disabled', true);
                    if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
                        $(settings.form_submit).prop('disabled', false);
                        return false;
                    }
                    if (settings.AdditionalPostData) {
                        $.extend(true, depositPostData, settings.AdditionalPostData);
                    }
                    depositPostData.UserId = settings.userId;
                    depositPostData.ClientDefinedIdentifier = 'LTWS' + new Date().getTime();
                    depositPostData.DepositRequest.ForType = 130;
                    depositPostData.DepositRequest.TermInMonths = $(settings.form_term).val() * 1;
                    depositPostData.DepositRequest.Amount = $(settings.form_amount).val() * 1;
                    if ($(customInputClass).length > 0) {
                        depositPostData.DepositRequest.CustomData = [];
                    }
                    $(customInputClass).each(function (customIndex, elem) {
                        depositPostData.DepositRequest.CustomData.push({ Name: $(this).attr('data-lt-additional-info-key'), Value: $(this).val() });
                    });
                    var request = $.ajax({
                        url: settings.postUrl,
                        method: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(depositPostData)
                    });
                    request.done(function (result) {
                        $(settings.form_submit).prop('disabled', false);
                        var resultsData = [];
                        if (result.Submissions && result.Submissions.length > 0) {
                            for (var iSubmission = 0, subLen = result.Submissions.length; iSubmission < subLen; iSubmission++) {
                                var submission = result.Submissions[iSubmission];
                                if (submission.Quotes && submission.Quotes.length > 0) {
                                    for (var iQuote = 0, qLen = submission.Quotes.length; iQuote < qLen; iQuote++) {
                                        var quote = submission.Quotes[iQuote];
                                        quote.TotalInterestEarned = lth.FormatNumber(quote.TotalInterestEarned, 2);
                                        quote.AmountPlusInterest = lth.FormatNumber(quote.AmountPlusInterest, 2);
                                        resultsData.push(quote);
                                    }
                                }
                            }
                        }
                        if (resultsData.length) {
                            settings.resultDisplayOptions.showNoDataMessage = false;
                        }
                        else {
                            settings.resultDisplayOptions.showNoDataMessage = true;
                        }
                        appendDataToDataList(settings.resultDisplayOptions.fields, resultsData);
                        var depositResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
                        depositResultBuild.build();
                    });
                    request.fail(function (error) {
                        $(settings.form_submit).prop('disabled', false);
                        var msg = 'There was an unexpected error. Please try again.';
                        try {
                            var errorObj = (error.responseJSON != null) ? error.responseJSON : JSON.parse(error.responseText);
                            msg = errorObj.Message;
                        }
                        catch (e) {
                            window.console && console.error('Error @ request.fail.responseText:' + e);
                        }
                        $(settings.form_errorMsg).html(msg);
                        $(settings.form_errorMsgWrapper).show(100);
                        lth.ScrollToAnchor(settings.form_errorAnchor);
                    });
                });
            });
        }
        return DepositFunctionality;
    }());
    LoanTekWidget.DepositFunctionality = DepositFunctionality;
    var AutoQuoteFunctionality = (function () {
        function AutoQuoteFunctionality(lth, options) {
            var $ = lth.$;
            var formEl = lth.autoQuoteFields;
            var resultEl = lth.autoQuoteResultFields;
            var settings = {
                postUrl: null,
                externalValidatorFunction: null,
                userId: null,
                clientId: null,
                form_id: '#ltWidgetForm',
                form_errorAnchor: 'ltwErrorAnchor',
                form_errorMsgWrapper: '#ltwErrorMessageWrapper',
                form_errorMsg: '#ltwErrorMessage',
                AdditionalPostData: null,
                form_submit: '#' + formEl.submit.fieldTemplate.id,
                form_fortype: '#' + formEl.fortype.fieldTemplate.id,
                form_quotingchannel: '#' + formEl.quotingchannel.fieldTemplate.id,
                form_amount: '#' + formEl.amount.fieldTemplate.id,
                form_terminmonths: '#' + formEl.terminmonths.fieldTemplate.id,
                form_downpayment: '#' + formEl.downpayment.fieldTemplate.id,
                form_zipcode: '#' + formEl.zipcode.fieldTemplate.id,
                form_creditscore: '#' + formEl.creditscore.fieldTemplate.id,
                form_modelyear: '#' + formEl.modelyear.fieldTemplate.id,
                form_mileage: '#' + formEl.mileage.fieldTemplate.id,
                form_loanpurposetype: '#' + formEl.loanpurposetype.fieldTemplate.id,
                form_sellertype: '#' + formEl.sellertype.fieldTemplate.id,
                form_neworusedtype: '#' + formEl.neworusedtype.fieldTemplate.id,
                form_isbusinessloan: '#' + formEl.isbusinessloan.fieldTemplate.id,
                form_ismember: '#' + formEl.ismember.fieldTemplate.id,
                form_noDataMessage: '#' + resultEl.nodatamessage.fieldTemplate.id,
                resultDisplayOptions: {
                    fieldHelperType: 'autoQuoteResultFields'
                }
            };
            $.extend(true, settings, options);
            var customInputClass = '.lt-custom-input';
            if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                for (var paramName in settings) {
                    if (paramName.indexOf('form_') !== -1) {
                        settings[paramName] += '_' + settings.uniqueQualifier;
                    }
                }
                customInputClass += '_' + settings.uniqueQualifier;
            }
            $('input, textarea').placeholder({ customClass: 'placeholder-text' });
            $(function () {
                var autoQuotePostData = lth.postObjects.autoquote();
                $(settings.form_submit).prop('disabled', false);
                if (settings.resultDisplayOptions.showBuilderTools) {
                    var fakeData = lth.FakeData().autoquote;
                    lth.AppendDataToDataList(settings.resultDisplayOptions.fields, fakeData, 'autoquotedatalist');
                    var showAutoQuoteResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
                    showAutoQuoteResultBuild.build();
                }
                $(settings.form_id).submit(function (event) {
                    event.preventDefault();
                    $(settings.form_errorMsgWrapper).hide(100);
                    $(settings.form_submit).prop('disabled', true);
                    if (typeof settings.externalValidatorFunction === 'function' && !settings.externalValidatorFunction()) {
                        $(settings.form_submit).prop('disabled', false);
                        return false;
                    }
                    if (settings.AdditionalPostData) {
                        $.extend(true, autoQuotePostData, settings.AdditionalPostData);
                    }
                    autoQuotePostData.UserId = settings.userId;
                    autoQuotePostData.ClientDefinedIdentifier = 'LTWS' + lth.getRandomString();
                    autoQuotePostData.LoanRequest.Form.ForType = $(settings.form_fortype).val();
                    autoQuotePostData.LoanRequest.Form.QuotingChannel = $(settings.form_quotingchannel).val();
                    autoQuotePostData.LoanRequest.Form.Amount = +$(settings.form_amount).val();
                    autoQuotePostData.LoanRequest.Form.TermInMonths = +$(settings.form_terminmonths).val();
                    autoQuotePostData.LoanRequest.Form.LoanToValue = $(settings.form_amount).val() - $(settings.form_downpayment).val();
                    autoQuotePostData.LoanRequest.Form.ZipCode = $(settings.form_zipcode).val();
                    autoQuotePostData.LoanRequest.Form.CreditScore = +$(settings.form_creditscore).val();
                    autoQuotePostData.LoanRequest.Form.ModelYear = +$(settings.form_modelyear).val();
                    autoQuotePostData.LoanRequest.Form.Mileage = +$(settings.form_mileage).val();
                    autoQuotePostData.LoanRequest.Form.LoanPurposeType = $(settings.form_loanpurposetype).val();
                    autoQuotePostData.LoanRequest.Form.SellerType = $(settings.form_sellertype).val();
                    autoQuotePostData.LoanRequest.Form.NewOrUsedType = $(settings.form_neworusedtype).val();
                    autoQuotePostData.LoanRequest.Form.IsBusinessLoan = $(settings.form_isbusinessloan).val();
                    autoQuotePostData.LoanRequest.Form.IsMember = $(settings.form_ismember).val();
                    var request = $.ajax({
                        url: settings.postUrl,
                        method: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        data: JSON.stringify(autoQuotePostData)
                    });
                    request.then(function (result) {
                        $(settings.form_submit).prop('disabled', false);
                        var resultsData = [];
                        if (result.Submissions && result.Submissions.length > 0) {
                            for (var iSubmission = 0, subLen = result.Submissions.length; iSubmission < subLen; iSubmission++) {
                                var submission = result.Submissions[iSubmission];
                                if (submission.Quotes && submission.Quotes.length > 0) {
                                    for (var iQuote = 0, qLen = submission.Quotes.length; iQuote < qLen; iQuote++) {
                                        var quote = submission.Quotes[iQuote];
                                        quote.APR = lth.FormatNumber(quote.APR, 3);
                                        quote.FinalRate = lth.FormatNumber(quote.FinalRate, 3);
                                        quote.FinalFee = lth.FormatNumber(quote.FinalFee, 2);
                                        quote.MonthlyPayment = lth.FormatNumber(quote.MonthlyPayment, 2);
                                        resultsData.push(quote);
                                    }
                                }
                            }
                        }
                        if (resultsData.length) {
                            settings.resultDisplayOptions.showNoDataMessage = false;
                        }
                        else {
                            settings.resultDisplayOptions.showNoDataMessage = true;
                        }
                        lth.AppendDataToDataList(settings.resultDisplayOptions.fields, resultsData, 'autoquotedatalist');
                        var autoQuoteResultBuild = new ResultsBuilder(lth, settings.resultDisplayOptions);
                        autoQuoteResultBuild.build();
                    }, function (error) {
                        $(settings.form_submit).prop('disabled', false);
                        var msg = 'There was an unexpected error. Please try again.';
                        try {
                            var errorObj = (error.responseJSON != null) ? error.responseJSON : JSON.parse(error.responseText);
                            msg = errorObj.Message;
                        }
                        catch (e) {
                            window.console && console.error('Error @ request.fail.responseText:' + e);
                        }
                        $(settings.form_errorMsg).html(msg);
                        $(settings.form_errorMsgWrapper).show(100);
                        lth.ScrollToAnchor(settings.form_errorAnchor);
                    });
                });
            });
        }
        return AutoQuoteFunctionality;
    }());
    LoanTekWidget.AutoQuoteFunctionality = AutoQuoteFunctionality;
    var MortgageQuoteFunctionality = (function () {
        function MortgageQuoteFunctionality(lth, options) {
            var $ = lth.$;
            var settings = {
                postUrl: null,
                externalValidatorFunction: null,
                userId: null,
                clientId: null,
                form_id: '#ltWidgetForm',
                form_submit: '#ltwSubmit',
                form_errorAnchor: 'ltwErrorAnchor',
                form_errorMsgWrapper: '#ltwErrorMessageWrapper',
                form_errorMsg: '#ltwErrorMessage',
                form_loanPurpose: '#ltwMQ_LoanPurpose',
                form_zipCode: '#ltwMQ_ZipCode',
                form_purchasePrice: '#ltwMQ_PurchasePrice',
                form_downPayment: '#ltwMQ_DownPayment',
                form_propertyValue: '#ltwMQ_PropertyValue',
                form_balance: '#ltwMQ_Balance',
                form_cashOut: '#ltwMQ_CashOut',
                form_creditScore: '#ltwMQ_CreditScore',
                form_loanProgram_30yearfixed: '#ltwMQ_LoanProgram_30yearfixed',
                form_loanProgram_25yearfixed: '#ltwMQ_LoanProgram_25yearfixed',
                form_loanProgram_20yearfixed: '#ltwMQ_LoanProgram_20yearfixed',
                form_loanProgram_15yearfixed: '#ltwMQ_LoanProgram_15yearfixed',
                form_loanProgram_10yearfixed: '#ltwMQ_LoanProgram_10yearfixed',
                form_loanProgram_10yeararm: '#ltwMQ_LoanProgram_10yeararm',
                form_loanProgram_7yeararm: '#ltwMQ_LoanProgram_7yeararm',
                form_loanProgram_5yeararm: '#ltwMQ_LoanProgram_5yeararm',
                form_loanProgram_3yeararm: '#ltwMQ_LoanProgram_3yeararm',
                form_monthlyIncome: '#ltwMQ_MonthlyIncome',
                form_propertyType: '#ltwMQ_PropertyType',
                form_propertyUsage: '#ltwMQ_PropertyUsage',
                form_VAEligible: '#ltwMQ_VAEligible',
                form_vAFirstTimeUse: '#ltwMQ_VAFirstTimeUse',
                form_vADisabled: '#ltwMQ_VADisabled',
                form_vAType: '#ltwMQ_VAType',
                form_firstTimeBuyer: '#ltwMQ_FirstTimeBuyer',
                form_foreclosed: '#ltwMQ_Foreclosed',
                form_bankruptcy: '#ltwMQ_Bankruptcy',
                form_loanOwnedBy: '#ltwMQ_LoanOwnedBy',
                form_monthlyDebt: '#ltwMQ_MonthlyDebt'
            };
            $.extend(true, settings, options);
            $('input, textarea').placeholder({ customClass: 'placeholder-text' });
            var customInputClass = '.lt-custom-input';
            if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                for (var paramName in settings) {
                    if (paramName.indexOf('form_') !== -1) {
                        settings[paramName] += '_' + settings.uniqueQualifier;
                    }
                }
                customInputClass += '_' + settings.uniqueQualifier;
            }
        }
        return MortgageQuoteFunctionality;
    }());
    LoanTekWidget.MortgageQuoteFunctionality = MortgageQuoteFunctionality;
    var MortgageRateFunctionality = (function () {
        function MortgageRateFunctionality(lth, options) {
            var $ = lth.$;
            var el = lth.CreateElement();
            var formEl = lth.mortgageRateFields;
            var settings = {
                postUrl: null,
                externalValidatorFunction: null,
                userId: null,
                clientId: null,
                form_id: '#ltWidgetForm',
                form_submit: '#ltwSubmit',
                form_errorAnchor: 'ltwErrorAnchor',
                form_errorMsgWrapper: '#ltwErrorMessageWrapper',
                form_errorMsg: '#ltwErrorMessage',
                form_email: '#ltwEmail',
                form_loanType: '#' + formEl.loantype.fieldTemplate.id,
                form_rateTable: '#' + formEl.ratetable.fieldTemplate.id,
                form_desiredLoanProgram: '#ltwDesiredLoanProgram',
                form_desiredInterestRate: '#ltwDesiredInterestRate',
                form_creditScore: '#' + formEl.creditscore.fieldTemplate.id,
                form_loanAmount: '#' + formEl.loanamount.fieldTemplate.id,
                form_loanPurpose: '#' + formEl.loanpurpose.fieldTemplate.id,
                form_loanToValue: '#' + formEl.loantovalue.fieldTemplate.id,
                form_propertyType: '#' + formEl.propertytype.fieldTemplate.id,
                form_propertyUsage: '#' + formEl.propertyusage.fieldTemplate.id,
                form_quotingChannel: '#' + formEl.quotingchannel.fieldTemplate.id,
                form_vaType: '#' + formEl.vatype.fieldTemplate.id,
                form_zipCode: '#' + formEl.zipcode.fieldTemplate.id
            };
            $.extend(true, settings, options);
            $('input, textarea').placeholder({ customClass: 'placeholder-text' });
            var customInputClass = '.lt-custom-input';
            if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                for (var paramName in settings) {
                    if (paramName.indexOf('form_') !== -1) {
                        settings[paramName] += '_' + settings.uniqueQualifier;
                    }
                }
                customInputClass += '_' + settings.uniqueQualifier;
            }
            $(function () {
                var mortgageRatePostData = lth.postObjects.mortgagerate();
                mortgageRatePostData.LoanRequest.CreditScore = $(settings.form_creditScore).val() * 1;
                mortgageRatePostData.LoanRequest.LoanAmount = $(settings.form_loanAmount).val() * 1;
                mortgageRatePostData.LoanRequest.LoanPurpose = $(settings.form_loanPurpose).val();
                mortgageRatePostData.LoanRequest.LoanToValue = $(settings.form_loanToValue).val() * 1;
                mortgageRatePostData.LoanRequest.PropertyType = $(settings.form_propertyType).val();
                mortgageRatePostData.LoanRequest.PropertyUsage = $(settings.form_propertyUsage).val();
                mortgageRatePostData.LoanRequest.QuotingChannel = $(settings.form_quotingChannel).val();
                mortgageRatePostData.LoanRequest.ZipCode = $(settings.form_zipCode).val();
                mortgageRatePostData.ClientDefinedIdentifier = 'LTWS' + lth.getRandomString();
                mortgageRatePostData.UserId = settings.userId;
                if ($(settings.form_vaType).val()) {
                    mortgageRatePostData.LoanRequest.VAType = $(settings.form_vaType).val();
                }
                var populateRateTable = function (rateList) {
                    var loanTypes = lth.getUniqueValuesFromArray(rateList, 'ProductTermType');
                    $(settings.form_loanType).html('');
                    for (var iLt = 0, pttl = lth.ProductTermType.asArray().length; iLt < pttl; iLt++) {
                        var ptt = lth.ProductTermType.asArray()[iLt];
                        if (loanTypes.indexOf(ptt.name) !== -1) {
                            $(settings.form_loanType).append(el.option().val(ptt.name).html(ptt.description));
                        }
                    }
                    var getFilteredRateTableData = function () {
                        var loanTypeValue = $(settings.form_loanType).val();
                        var returnFilteredRates = lth.getFilteredArray(rateList, loanTypeValue, false, 'ProductTermType');
                        return returnFilteredRates;
                    };
                    var rateTableInfo = {
                        data: getFilteredRateTableData(),
                        stripeClasses: ['ratetable-strip1', 'ratetable-strip2'],
                        paging: false,
                        info: false,
                        searching: false,
                        columns: []
                    };
                    for (var colName in lth.mortgageRateDataTable) {
                        var col = lth.mortgageRateDataTable[colName];
                        if (col.column) {
                            rateTableInfo.columns.push(col.column);
                        }
                    }
                    var rateTable = $(settings.form_rateTable + ' > table').DataTable(rateTableInfo);
                    rateTable.order([0, 'asc']).draw();
                    $(settings.form_loanType).change(function () {
                        var updatedRateList = getFilteredRateTableData();
                        rateTable.clear().rows.add(updatedRateList).draw();
                    });
                };
                if (settings.showBuilderTools) {
                    var fakeData = lth.FakeData().mortgagerate;
                    populateRateTable(fakeData);
                }
                else {
                    var rateRequest = $.ajax({
                        method: 'POST',
                        url: settings.postUrl,
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(mortgageRatePostData)
                    }).then(function (result) {
                        var rateList;
                        try {
                            rateList = result.Submissions[0].Quotes;
                        }
                        catch (er) {
                            rateList = [];
                        }
                        populateRateTable(rateList);
                    }, function (error) {
                        try {
                            window.console && console.error('Error: ', error.responseJSON.Message);
                        }
                        catch (er) {
                            window.console && console.error('Error getting rates', error);
                        }
                    });
                }
            });
        }
        return MortgageRateFunctionality;
    }());
    LoanTekWidget.MortgageRateFunctionality = MortgageRateFunctionality;
    var ResultsBuilder = (function () {
        function ResultsBuilder(lth, options) {
            var _settings = {
                resultWrapperId: 'ltWidgetResultWrapper',
                noDataMessageWrapperId: 'ltwNoDataMessageWrapper',
                widgetChannel: 'result',
                uniqueQualifier: ''
            };
            lth.$.extend(_settings, options);
            if (_settings.uniqueQualifier && _settings.uniqueQualifier.length > 0) {
                _settings.resultWrapperId += '_' + _settings.uniqueQualifier;
                _settings.noDataMessageWrapperId += '_' + _settings.uniqueQualifier;
            }
            this.settings = _settings;
            this.lth = lth;
        }
        ResultsBuilder.prototype.build = function (startIndex, showCount) {
            var _thisM = this;
            var settings = this.settings;
            var lth = this.lth;
            var $ = lth.$;
            var el = lth.CreateElement();
            var resultHelperType;
            var buildTools = new BuildTools(lth);
            if (settings.widgetType === _thisM.lth.widgetType.mortgagequote.id) {
                resultHelperType = 'mortgageQuoteResultFields';
            }
            else if (settings.widgetType === lth.widgetType.mortgagerate.id) {
                resultHelperType = 'rateResultFields';
            }
            else if (settings.widgetType === lth.widgetType.deposit.id) {
                resultHelperType = 'depositResultFields';
            }
            else if (settings.widgetType === lth.widgetType.autoquote.id) {
                resultHelperType = 'autoQuoteResultFields';
            }
            else {
                resultHelperType = 'contactResultFields';
            }
            settings.fieldHelperType = resultHelperType;
            var resultsForm = el.form();
            var resultsForm2 = buildTools.BuildFields(resultsForm, settings);
            var resultsFormStyles = new LoanTekWidget.ApplyFormStyles(lth, settings, true, '.' + lth.defaultResultSpecifierClass + '_' + settings.uniqueQualifier).getStyles();
            if (resultsFormStyles) {
                resultsForm2.prepend(el.style().html(resultsFormStyles));
            }
            var widgetResultWrapper = $('#' + _thisM.settings.resultWrapperId).addClass('ltw ' + _thisM.lth.defaultResultSpecifierClass + '_' + settings.uniqueQualifier).empty().append(resultsForm2);
            if (_thisM.settings.showBuilderTools) {
                widgetResultWrapper.addClass('ltw-builder-tools').prepend(el.div().addClass('ltw-tool-form-update').attr('data-lt-form-edit-tool', 'editResultInfo'));
            }
        };
        return ResultsBuilder;
    }());
    LoanTekWidget.ResultsBuilder = ResultsBuilder;
    var BuildTools = (function () {
        function BuildTools(lth) {
            this.lth = lth;
        }
        BuildTools.prototype.BuildFields = function (mainWrapper, options, data) {
            var _thisM = this;
            var lth = this.lth;
            var $ = lth.$;
            var settings = {
                fieldHelperType: null,
                fieldSize: null,
                showBuilderTools: false
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
            var isAlreadyInProcessOfAddingAdditionalInfoKey = false;
            var el = lth.CreateElement();
            settings.widgetChannel = settings.widgetChannel || 'form';
            $.each(settings.fields, function (i, elementItem) {
                if (elementItem.field) {
                    settings.fields[i] = lth.ExtendWidgetFieldTemplate(elementItem, settings.fieldHelperType);
                }
            });
            $.each(settings.fields, function (fieldIndex, elementItem) {
                var useRowInsteadOfFormGroup = elementItem.field === 'label' ? true : false;
                if (elementItem.id && !lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                    elementItem.id += '_' + settings.uniqueQualifier;
                }
                if (elementItem.offsetCols && !elementItem.cols) {
                    elementItem.cols = COLUMNS_IN_ROW - elementItem.offsetCols;
                }
                isHidden = elementItem.type === 'hidden';
                elementItem.cols = elementItem.cols ? elementItem.cols : COLUMNS_IN_ROW;
                elementItem.offsetCols = elementItem.offsetCols ? elementItem.offsetCols : 0;
                elementItem.size = elementItem.size ? elementItem.size : settings.fieldSize;
                isLastField = fieldIndex >= fieldsLength - 1;
                isLabel = elementItem.element === 'label';
                if (elementItem.field === 'captcha' && !lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                    elementItem.uniqueQualifier = settings.uniqueQualifier;
                }
                if (elementItem.element === 'repeat') {
                    if (elementItem.field === 'autoquoteclientfees') {
                        elementItem.fieldData = data['ClientFees'];
                    }
                }
                if (elementItem.field === 'customhidden' || elementItem.field === 'custominput') {
                    elementItem.cssClass = elementItem.cssClass || '';
                    if (!lth.isStringNullOrEmpty(settings.uniqueQualifier)) {
                        elementItem.cssClass += ' lt-custom-input_' + settings.uniqueQualifier;
                    }
                    else {
                        elementItem.cssClass += 'lt-custom-input';
                    }
                }
                if (elementItem.field === 'custominput' && settings.showBuilderTools) {
                    elementItem.attrs = elementItem.attrs || [];
                    var custAdditionalInfoIndex = lth.GetIndexOfFirstObjectInArray(elementItem.attrs, 'name', 'data-lt-additional-info-key');
                    if (!elementItem.attrs[custAdditionalInfoIndex] && !isAlreadyInProcessOfAddingAdditionalInfoKey) {
                        isAlreadyInProcessOfAddingAdditionalInfoKey = true;
                        var editInfo;
                        if (settings.widgetChannel === 'result') {
                            editInfo = 'editResultInfo';
                        }
                        else {
                            editInfo = 'editFormInfo';
                        }
                        lth.RemoveObjectFromArray(elementItem.attrs, 'name', 'data-lt-assign-additional-info-key');
                        elementItem.attrs.push({ name: 'data-lt-assign-additional-info-key', value: lth.Interpolate("{ fieldIndex: #{fi}, editInfo: #{eInfo} }", { fi: fieldIndex + '', eInfo: editInfo }) });
                    }
                }
                nextIndex = fieldIndex + 1;
                do {
                    isNextHidden = settings.fields[nextIndex] && settings.fields[nextIndex].type === 'hidden';
                    nextFieldOffsetCols = (settings.fields[nextIndex] && settings.fields[nextIndex].offsetCols) ? settings.fields[nextIndex].offsetCols : 0;
                    nextFieldCols = (settings.fields[nextIndex] && settings.fields[nextIndex].cols) ? settings.fields[nextIndex].cols + nextFieldOffsetCols : isNextHidden ? 0 : COLUMNS_IN_ROW;
                    nextIndex++;
                } while (nextFieldCols === 0 && nextIndex <= fieldsLength);
                if (isHidden) {
                    mainWrapper.append(_thisM.CreateFormElement(elementItem));
                }
                else {
                    if (!row) {
                        columnCount = 0;
                        if (elementItem.cols + elementItem.offsetCols >= COLUMNS_IN_ROW) {
                            row = el.formGroup(elementItem.size, useRowInsteadOfFormGroup);
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
                                cell = el.col(elementItem.cols).append(el.row().append(_thisM.CreateFormElement(elementItem)));
                            }
                            else {
                                cell = _thisM.CreateFormElement(elementItem);
                            }
                        }
                        else {
                            cell = el.col(elementItem.cols).append(_thisM.CreateFormElement(elementItem));
                        }
                        if (settings.showBuilderTools) {
                            appendBuilderTools(cell);
                            appendMoveTools(cell);
                        }
                    }
                    else {
                        var innerCell;
                        if (isLabel) {
                            innerCell = _thisM.CreateFormElement(elementItem);
                        }
                        else {
                            innerCell = el.col().append(_thisM.CreateFormElement(elementItem));
                        }
                        if (settings.showBuilderTools) {
                            appendBuilderTools(innerCell);
                            appendMoveTools(innerCell);
                        }
                        cell = el.col(elementItem.cols).append(el.formGroup(elementItem.size, useRowInsteadOfFormGroup).append(innerCell));
                    }
                    if (elementItem.offsetCols > 0) {
                        cell.addClass('col-sm-offset-' + elementItem.offsetCols);
                    }
                    function appendBuilderTools(currentCell) {
                        var passData = { index: fieldIndex, channel: settings.widgetChannel };
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
                            .attr('data-jqyoui-droppable', lth.Interpolate("{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, \\'#{channel}\\')' }", { pdi: '' + fieldIndex, channel: settings.widgetChannel }))
                            .attr('data-jqyoui-options', lth.Interpolate("{accept: '.#{channel}-channel', hoverClass: 'on-drag-hover'}", { channel: settings.widgetChannel }));
                    }
                    isTimeToAddRow = isLastField || columnCount >= COLUMNS_IN_ROW;
                    isSpaceLeftOver = columnCount < COLUMNS_IN_ROW && columnCount + nextFieldCols > COLUMNS_IN_ROW;
                    if (lth[settings.fieldHelperType].successmessage && elementItem.type === lth[settings.fieldHelperType].successmessage.id) {
                        var wrapElement = isSingleRow ? row : cell;
                        wrapElement.prop('id', settings.successMessageWrapperId);
                        if (!settings.showBuilderTools) {
                            wrapElement.css({ display: 'none' });
                        }
                    }
                    if (lth[settings.fieldHelperType].nodatamessage && elementItem.type === lth[settings.fieldHelperType].nodatamessage.id) {
                        var wrapElement = isSingleRow ? row : cell;
                        wrapElement.prop('id', settings.noDataMessageWrapperId);
                        if (!settings.showBuilderTools && !settings.showNoDataMessage) {
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
                                .attr('data-jqyoui-droppable', lth.Interpolate("{ index: #{pdi}, onDrop: 'onDrop(#{pdi}, \\'#{channel}\\', #{space}, #{isPh})' }", { pdi: '' + fieldIndex, channel: settings.widgetChannel, space: remainingColSpace, isPh: 'true' }))
                                .attr('data-jqyoui-options', lth.Interpolate("{accept: '.#{channel}-channel', hoverClass: 'on-drag-hover'}", { channel: settings.widgetChannel }))
                                .prepend(el.div().addClass('move-hover')))));
                        }
                    }
                    else {
                        remainingColSpace = 0;
                    }
                    if (isTimeToAddRow) {
                        mainWrapper.append(row);
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
                    mainWrapper = wellMain.append(mainWrapper);
                }
                else if (settings.formBorderType === lth.formBorderType.panel.id) {
                    var panelMain, panelHeading, panelBody;
                    panelMain = el.div().addClass('panel panel-default lt-widget-border');
                    panelBody = el.div().addClass('panel-body').append(mainWrapper);
                    if (settings.panelTitle) {
                        panelHeading = el.div().addClass('panel-heading lt-widget-heading').html(settings.panelTitle);
                    }
                    if (panelHeading) {
                        panelMain.append(panelHeading);
                    }
                    panelMain.append(panelBody);
                    mainWrapper = panelMain;
                }
            }
            else if (settings.panelTitle) {
                mainWrapper.prepend(el.h(4).addClass('lt-widget-heading').html(settings.panelTitle));
            }
            if (data) {
                for (var dataName in data) {
                    if (typeof data[dataName] === 'number') {
                        data[dataName] += '';
                    }
                    if (data[dataName] === null || data[dataName] === undefined) {
                        data[dataName] = ' ';
                    }
                }
                mainWrapper.each(function (index, element) {
                    lth.ModifyTextElementsInDOM(element, function (nodeValue) {
                        return lth.Interpolate(nodeValue, data);
                    });
                });
            }
            return mainWrapper;
        };
        BuildTools.prototype.CreateFormElement = function (elementObj) {
            var _thisM = this;
            var lth = this.lth;
            var $ = lth.$;
            var el = lth.CreateElement();
            var returnElement = null;
            var checkboxWrapper = null;
            var checkboxLabel = null;
            var checkboxIcon = null;
            var checkboxText = null;
            switch (elementObj.element) {
                case 'title':
                    elementObj.nsize = elementObj.nsize || lth.hsize.getDefault().id;
                    returnElement = el.h(elementObj.nsize);
                    returnElement.html(elementObj.value + '');
                    break;
                case 'label':
                    returnElement = el.label();
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    elementObj.value = elementObj.value || 'label';
                    returnElement.html(elementObj.value + '');
                    break;
                case 'p':
                    elementObj.value = elementObj.value || ' ';
                    returnElement = el.p();
                    returnElement.html(elementObj.value + '');
                    break;
                case 'hr':
                    returnElement = el.hr();
                    break;
                case 'button':
                    returnElement = el.button(elementObj.type ? elementObj.type : 'button');
                    elementObj.cssClass = elementObj.cssClass ? 'btn ' + elementObj.cssClass : 'btn btn-default';
                    elementObj.value = elementObj.value ? elementObj.value : 'OK';
                    returnElement.addClass(elementObj.cssClass).html(elementObj.value + '');
                    break;
                case 'select':
                    returnElement = el.select();
                    elementObj.placeholder = elementObj.placeholder ? elementObj.placeholder : ' ';
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    switch (elementObj.type) {
                        case 'selectobject':
                            if (elementObj.selectOptions && Array.isArray(elementObj.selectOptions)) {
                                $.each(elementObj.selectOptions, function (i, selectOption) {
                                    returnElement.append(el.option().val(selectOption.Value).html(selectOption.Text));
                                });
                            }
                            break;
                        case 'state':
                            var usStates = lth.US_States();
                            $.each(usStates.states, function (i, state) {
                                returnElement.append(el.option().val(state.abbreviation).html(state.name));
                            });
                            break;
                        case 'deposittermdd':
                            var depositTermsList = [
                                { value: 3, name: '3-month' },
                                { value: 6, name: '6-month' },
                                { value: 9, name: '9-month' },
                                { value: 12, name: '1-year' },
                                { value: 18, name: '1&frac12;-year' },
                                { value: 24, name: '2-year' },
                                { value: 36, name: '3-year' },
                                { value: 48, name: '4-year' },
                                { value: 60, name: '5-year' }
                            ];
                            $.each(depositTermsList, function (i, term) {
                                returnElement.append(el.option().val(term.value).html(term.name));
                            });
                            break;
                        case 'depositamountdd':
                            var depositAmountList = [
                                { value: 500, name: '$500' },
                                { value: 1000, name: '$1,000' },
                                { value: 2000, name: '$2,000' },
                                { value: 2500, name: '$2,500' },
                                { value: 5000, name: '$5,000' },
                                { value: 10000, name: '$10,000' },
                                { value: 15000, name: '$15,000' },
                                { value: 20000, name: '$20,000' },
                                { value: 25000, name: '$25,000' },
                                { value: 50000, name: '$50,000' },
                                { value: 100000, name: '$100,000' }
                            ];
                            $.each(depositAmountList, function (i, amnt) {
                                returnElement.append(el.option().val(amnt.value).html(amnt.name));
                            });
                            break;
                        case 'desiredloanprogram':
                            var desiredLoanProgramList = lth.ProductTermType.asArray();
                            desiredLoanProgramList.splice(0, 1);
                            $.each(desiredLoanProgramList, function (i, program) {
                                returnElement.append(el.option().val(program.name).html(program.description));
                            });
                            break;
                        case 'desiredinterestrate':
                            var desiredInterestRateList = [];
                            var intRate = 1;
                            while (intRate < 10) {
                                desiredInterestRateList.push({ value: lth.FormatNumber(intRate, 3), name: lth.FormatNumber(intRate, 3) + '%' });
                                intRate += 0.125;
                            }
                            $.each(desiredInterestRateList, function (i, program) {
                                returnElement.append(el.option().val(program.value).html(program.name));
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
                        case 'checkbox':
                            checkboxWrapper = el.div().addClass('checkbox checkbox-fa');
                            checkboxLabel = el.label('');
                            checkboxIcon = el.i().addClass('checkbox-i');
                            checkboxText = el.span();
                            break;
                        default:
                            returnElement.addClass('form-control');
                            if (elementObj.value || lth.isNumber(elementObj.value)) {
                                returnElement.val(elementObj.value);
                            }
                            break;
                    }
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    break;
                case 'captcha':
                    var settings = {
                        capImg: 'ltCaptchaImg',
                        capInput: 'ltCaptchaInput',
                        capReset: 'ltCaptchaReset',
                        capErMsg: 'ltCaptchaErrorMsg'
                    };
                    if (elementObj.uniqueQualifier && elementObj.uniqueQualifier.length > 0) {
                        settings.capImg += '_' + elementObj.uniqueQualifier;
                        settings.capInput += '_' + elementObj.uniqueQualifier;
                        settings.capReset += '_' + elementObj.uniqueQualifier;
                        settings.capErMsg += '_' + elementObj.uniqueQualifier;
                    }
                    var captchaInputObj = { element: 'input', id: settings.capInput, placeholder: 'Enter the characters', required: true };
                    var captchaResetBtnObj = { element: 'button', id: settings.capReset, cssClass: 'btn-info', alttext: 'Reset', tabindex: -1, value: ' ' };
                    if (elementObj.size) {
                        captchaInputObj.size = elementObj.size;
                        captchaResetBtnObj.size = elementObj.size;
                    }
                    var captchaInput = _thisM.CreateFormElement(captchaInputObj);
                    var captchaResetBtn = _thisM.CreateFormElement(captchaResetBtnObj);
                    returnElement = el.div().addClass('lt-captcha').append(el.div().addClass('panel panel-info').append(el.div().addClass('panel-heading').text('Security Check')).append(el.div().addClass('panel-body').append(el.formGroup().append(el.col().append(el.div().prop('id', settings.capImg).addClass('captcha-font')))).append(el.row().append(el.col(8, 'xs').append(captchaInput).append(el.span().prop('id', settings.capErMsg).addClass('text-danger small').text('The code you entered does not match the one shown in the image.'))).append(el.col(4, 'xs').addClass('text-right').append(captchaResetBtn.html('&nbsp;').append(el.span().addClass('glyphicon glyphicon-refresh')).append('&nbsp;'))))));
                    break;
                case 'repeat':
                    elementObj.fieldListOptions = elementObj.fieldListOptions || { fields: [] };
                    if (elementObj.field === 'depositdatalist') {
                        elementObj.fieldListOptions.fieldHelperType = 'depositResultDataFields';
                    }
                    if (elementObj.field === 'autoquotedatalist') {
                        elementObj.fieldListOptions.fieldHelperType = 'autoQuoteResultDataFields';
                    }
                    if (elementObj.field === 'autoquoteclientfees') {
                        elementObj.fieldListOptions.fieldHelperType = 'autoQuoteResultDataFieldsClientFees';
                    }
                    var classQualifier = Math.ceil((Math.random() * 100000));
                    var repeatElementClass = 'ltw-repeat-data' + classQualifier;
                    returnElement = el.div().addClass(repeatElementClass);
                    if (elementObj.fieldData) {
                        for (var dataIndex = 0, dataLength = elementObj.fieldData.length; dataIndex < dataLength; ++dataIndex) {
                            var dataItem = elementObj.fieldData[dataIndex];
                            var resultDataRow = el.div().addClass('widget-results-repeat-section');
                            resultDataRow = _thisM.BuildFields(resultDataRow, elementObj.fieldListOptions, dataItem);
                            returnElement.append(resultDataRow);
                            var applyFormStyles = new LoanTekWidget.ApplyFormStyles(lth, elementObj.fieldListOptions, false, '.ltw .' + repeatElementClass).getStyles();
                            if (applyFormStyles) {
                                resultDataRow.prepend(el.style().html(applyFormStyles));
                            }
                        }
                    }
                    break;
                case 'widget':
                    returnElement = el.div();
                    if (elementObj.widgetInfo) {
                        var widgetCode = lth.BuildWidgetScript(elementObj.widgetInfo);
                        returnElement.html(widgetCode);
                    }
                    else {
                        returnElement.html('[please edit to choose widget]');
                    }
                    break;
                case 'datatable':
                    var tableEl = el.table().addClass('table table-fa-sort').attr('width', '100%').attr('cellpadding', '0').attr('cellspacing', '0');
                    if (elementObj.dataTableOptions) {
                        if (elementObj.dataTableOptions.isBordered) {
                            tableEl.addClass('table-bordered');
                        }
                        if (elementObj.dataTableOptions.isCondensed) {
                            tableEl.addClass('table-condensed');
                        }
                        if (elementObj.dataTableOptions.isHover) {
                            tableEl.addClass('table-hover');
                        }
                        if (elementObj.dataTableOptions.isStriped) {
                            tableEl.addClass('table-striped');
                        }
                    }
                    returnElement = el.div().addClass('table-responsive').append(tableEl);
                    break;
                default:
                    elementObj.value = elementObj.value || ' ';
                    returnElement = el.div();
                    if (elementObj.cssClass) {
                        returnElement.addClass(elementObj.cssClass);
                    }
                    returnElement.html(elementObj.value + '');
                    break;
            }
            if (returnElement) {
                if (elementObj.id) {
                    if (elementObj.uniqueQualifier && elementObj.uniqueQualifier.length > 0) {
                        elementObj.id += '_' + elementObj.uniqueQualifier;
                    }
                    if (checkboxLabel) {
                        checkboxLabel.attr('for', elementObj.id);
                    }
                    returnElement.prop('id', elementObj.id).prop('name', elementObj.id);
                }
                if (elementObj.color) {
                    if (checkboxWrapper) {
                        checkboxWrapper.css({ color: elementObj.color });
                    }
                    else {
                        returnElement.css({ color: elementObj.color });
                    }
                }
                if (elementObj.fontSize) {
                    if (checkboxWrapper) {
                        checkboxWrapper.css({ fontSize: elementObj.fontSize + 'px' });
                    }
                    else {
                        returnElement.css({ fontSize: elementObj.fontSize + 'px' });
                    }
                }
                if (elementObj.backgroundColor) {
                    switch (elementObj.element) {
                        case 'datatable':
                            returnElement.children('table.table').css({ backgroundColor: elementObj.backgroundColor });
                            break;
                        default:
                            if (checkboxWrapper) {
                                checkboxWrapper.css({ backgroundColor: elementObj.backgroundColor });
                            }
                            else {
                                returnElement.css({ backgroundColor: elementObj.backgroundColor });
                            }
                            break;
                    }
                }
                if (lth.isNumber(elementObj.borderRadius)) {
                    if (checkboxWrapper) {
                        checkboxWrapper.css({ borderRadius: elementObj.borderRadius + 'px' });
                    }
                    else {
                        returnElement.css({ borderRadius: elementObj.borderRadius + 'px' });
                    }
                }
                if (elementObj.borderColor) {
                    switch (elementObj.element) {
                        case 'datatable':
                            returnElement.children('table.table').css({ borderColor: elementObj.borderColor });
                            break;
                        case 'p':
                        case 'div':
                            returnElement.css({ borderWidth: '1px', borderStyle: 'solid' });
                        default:
                            if (checkboxWrapper) {
                                checkboxWrapper.css({ borderColor: elementObj.borderColor });
                            }
                            else {
                                returnElement.css({ borderColor: elementObj.borderColor });
                            }
                            break;
                    }
                }
                if (lth.isNumber(elementObj.padding)) {
                    if (checkboxWrapper) {
                        checkboxWrapper.css({ padding: elementObj.padding + 'px' });
                    }
                    else {
                        returnElement.css({ padding: elementObj.padding + 'px' });
                    }
                }
                if (lth.isNumber(elementObj.marginTopBottom)) {
                    if (checkboxWrapper) {
                        checkboxWrapper.css({ marginTop: elementObj.marginTopBottom + 'px', marginBottom: elementObj.marginTopBottom + 'px' });
                    }
                    else {
                        returnElement.css({ marginTop: elementObj.marginTopBottom + 'px', marginBottom: elementObj.marginTopBottom + 'px' });
                    }
                }
                if (elementObj.align) {
                    if (checkboxWrapper) {
                        checkboxWrapper.css({ textAlign: elementObj.align });
                    }
                    else {
                        returnElement.css({ textAlign: elementObj.align });
                    }
                }
                if (elementObj.style) {
                    var styleSplit = elementObj.style.trim().split(';');
                    for (var iStyle = styleSplit.length - 1; iStyle >= 0; iStyle--) {
                        var style = styleSplit[iStyle].trim();
                        if (!lth.isStringNullOrEmpty(style)) {
                            var styleKey = style.substring(0, style.indexOf(':')).trim();
                            var styleValue = style.substring(style.indexOf(':') + 1, style.length).trim();
                            if (styleKey && styleValue) {
                                if (checkboxWrapper) {
                                    checkboxWrapper.css(styleKey, styleValue);
                                }
                                else {
                                    returnElement.css(styleKey, styleValue);
                                }
                            }
                        }
                    }
                }
                if (elementObj.required) {
                    returnElement.prop('required', true);
                }
                if (elementObj.alttext) {
                    if (checkboxWrapper) {
                        checkboxWrapper.prop('alt', elementObj.alttext).prop('title', elementObj.alttext);
                    }
                    else {
                        returnElement.prop('alt', elementObj.alttext).prop('title', elementObj.alttext);
                    }
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
                            switch (elementObj.type) {
                                case 'checkbox':
                                    checkboxText.html(' ' + elementObj.placeholder);
                                    break;
                                default:
                                    returnElement.attr('placeholder', elementObj.placeholder);
                                    break;
                            }
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
                                case 'checkbox':
                                    checkboxWrapper.addClass('checkbox-' + elementObj.size);
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
                if (elementObj.attrs) {
                    for (var iAttrs = elementObj.attrs.length - 1; iAttrs >= 0; iAttrs--) {
                        var attr = elementObj.attrs[iAttrs];
                        returnElement.attr(attr.name, attr.value);
                    }
                }
            }
            if (checkboxWrapper) {
                checkboxLabel.append(returnElement);
                checkboxLabel.append(checkboxIcon);
                checkboxLabel.append(checkboxText);
                checkboxWrapper.append(checkboxLabel);
                returnElement = checkboxWrapper;
            }
            return returnElement;
        };
        return BuildTools;
    }());
    LoanTekWidget.BuildTools = BuildTools;
})(LoanTekWidget || (LoanTekWidget = {}));
