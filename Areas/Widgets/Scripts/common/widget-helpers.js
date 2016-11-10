var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoanTekWidget;
(function (LoanTekWidget) {
    var helpers = (function () {
        function helpers(jq) {
            this.$ = jq;
            this.hsize = new hSizing();
            this.bootstrap = new bootstrap();
            this.formBorderType = new formBorderType();
            this.formBorderTypeArray = this.ConvertObjectToArray(this.formBorderType);
            this.widthUnit = new widthUnit();
            this.widgetType = new widgetType();
            this.defaultVerticalSpacing = 15;
            this.defaultFormSpecifierClass = 'ltwF';
            this.defaultResultSpecifierClass = 'ltwR';
            this.contactFields = new contactFields();
            this.contactFieldsArray = this.ConvertObjectToArray(this.contactFields);
            this.depositFields = new depositFields();
            this.depositResultFields = new depositResultFields();
            this.depositResultDataFields = new depositResultDataFields();
            this.autoQuoteFields = new autoQuoteFields();
            this.autoQuoteResultFields = new autoQuoteResultFields();
            this.autoQuoteResultDataFields = new autoQuoteResultDataFields();
            this.autoQuoteResultDataFieldsClientFees = new autoQuoteResultDataFieldsClientFees();
            this.mortgageQuoteFields = new mortgageQuoteFields();
            this.mortgageRateFields = new mortgageRateFields();
            this.mortgageRateDataTable = new mortgageRateDataTable();
            this.mortgageRateResultFields = new mortgageRateResultFields();
            this.mortgageRateDataDisplay = new mortgageRateDataDisplay();
            this.postObjects = new postObjects();
            this.ProductTermType = new ProductTermType();
        }
        helpers.prototype.isNumber = function (numCheck) {
            return typeof numCheck === 'number';
        };
        helpers.prototype.isStringNullOrEmpty = function (stringCheck) {
            return stringCheck === '' || typeof stringCheck !== 'string';
        };
        helpers.prototype.padZeros = function (num, size) {
            var s = num + '';
            while (s.length < size) {
                s = '0' + s;
            }
            return s;
        };
        helpers.prototype.getDefaultBorderRadius = function (fieldSize) {
            if (fieldSize === void 0) { fieldSize = ''; }
            var rad = 4;
            if (fieldSize === this.bootstrap.inputSizing.sm.id) {
                rad = 3;
            }
            else if (fieldSize === this.bootstrap.inputSizing.lg.id) {
                rad = 6;
            }
            return rad;
        };
        helpers.prototype.getRandomInt = function (intMax, intMin) {
            var returnNumber = 0;
            var defaultMax = 999999999;
            var maxVal = Number.MAX_VALUE - 1 || Math.pow(2, 53) - 1 || defaultMax;
            intMax = intMax || defaultMax;
            intMin = intMin || 0;
            if (intMax <= 0) {
                intMax = 1;
            }
            if (intMax > maxVal) {
                intMax = maxVal;
            }
            if (intMin < 0) {
                intMin = 0;
            }
            if (intMin >= intMax) {
                intMin = intMax - 1;
            }
            intMax = intMax - intMin;
            returnNumber = Math.floor(Math.random() * (intMax + 1)) + intMin;
            return returnNumber;
        };
        helpers.prototype.getRandomString = function (length, chars) {
            length = length || 16;
            chars = chars || '#A';
            var mask = '';
            if (chars.indexOf('a') > -1)
                mask += 'abcdefghijklmnopqrstuvwxyz';
            if (chars.indexOf('A') > -1)
                mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (chars.indexOf('#') > -1)
                mask += '0123456789';
            if (chars.indexOf('!') > -1)
                mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
            var result = '';
            for (var i = length; i > 0; --i) {
                result += mask[Math.floor(Math.random() * mask.length)];
            }
            return result;
        };
        helpers.prototype.getDateTimeTicks = function (dateTime) {
            dateTime = dateTime || new Date();
            return dateTime.getTime();
        };
        helpers.prototype.getUniqueQualifier = function (prefix, lengthOfTicks, lengthOfRandom) {
            var ticks = this.getDateTimeTicks() + '';
            prefix = prefix || 'LT';
            lengthOfTicks = lengthOfTicks || 2;
            lengthOfTicks = lengthOfTicks === -1 ? ticks.length : lengthOfTicks;
            lengthOfTicks = lengthOfTicks < 1 ? 1 : lengthOfTicks > ticks.length ? ticks.length : lengthOfTicks;
            lengthOfRandom = lengthOfRandom || 4;
            lengthOfRandom = lengthOfRandom < 1 ? 1 : lengthOfRandom;
            return prefix + ticks.substring(ticks.length - lengthOfTicks, ticks.length) + this.getRandomString(lengthOfRandom);
        };
        helpers.prototype.getUniqueValuesFromArray = function (arr, objPath) {
            var uniqueArray = [];
            var object;
            for (var i = 0; i < arr.length; i++) {
                if (objPath) {
                    object = this.getValueOfObjectInPath(arr[i], objPath);
                }
                else {
                    object = arr[i];
                }
                if (uniqueArray.indexOf(object) === -1) {
                    uniqueArray.push(object);
                }
            }
            return uniqueArray;
        };
        helpers.prototype.getValueOfObjectInPath = function (obj, objPath) {
            var objectValue;
            var periodIndex = objPath.indexOf('.');
            if (periodIndex !== -1) {
                return this.getValueOfObjectInPath(obj[objPath.substring(0, periodIndex)], objPath.substring(periodIndex + 1));
            }
            else {
                objectValue = obj[objPath];
            }
            return objectValue;
        };
        helpers.prototype.getFilteredArray = function (arr, value, invert, objArrayPath, filterFunction) {
            var _this = this;
            invert = invert || false;
            filterFunction = filterFunction || function (n, i) {
                var isMatch = false;
                if (objArrayPath) {
                    isMatch = (value === _this.getValueOfObjectInPath(n, objArrayPath));
                }
                else {
                    isMatch = (value === n);
                }
                return isMatch;
            };
            var filteredArray = [];
            filteredArray = this.$.grep(arr, filterFunction, invert);
            return filteredArray;
        };
        helpers.prototype.ConvertObjectToArray = function (theObj) {
            var objArray = [];
            for (var key in theObj) {
                var objVal = theObj[key];
                if (objVal && typeof objVal !== 'function') {
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
                    returnObj[objectKey] = obj;
                }
            }
            return returnObj;
        };
        helpers.prototype.GetIndexOfFirstObjectInArray = function (theArray, theKey, theValue, isCaseInsensitive) {
            try {
                for (var i = 0, l = theArray.length; i < l; i++) {
                    var keyValue = theArray[i][theKey];
                    if (isCaseInsensitive) {
                        keyValue = keyValue.toLowerCase();
                        theValue = theValue.toLowerCase();
                    }
                    if (keyValue === theValue) {
                        return i;
                    }
                }
                return -1;
            }
            catch (er) {
                window.console && console.error('Error in widget-helper method GetIndexOfFirstObjectInArray:\n', er);
                return -1;
            }
        };
        helpers.prototype.RemoveObjectFromArray = function (theArray, theKey, theValue) {
            for (var i = theArray.length - 1; i >= 0; i--) {
                var obj = theArray[i];
                if (obj[theKey] === theValue) {
                    theArray.splice(i, 1);
                }
            }
            return theArray;
        };
        helpers.prototype.SetRequiredFields = function (fields) {
            for (var fieldName in fields) {
                var thisField = fields[fieldName];
                if (thisField.isLTRequired) {
                    thisField.fieldTemplate.required = thisField.isLTRequired;
                }
            }
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
        helpers.prototype.SortObjectArray = function (field, reverse, primer) {
            var key = function (x) {
                return primer ? primer(x[field]) : x[field];
            };
            return function (a, b) {
                var A = key(a), B = key(b);
                return ((A < B) ? -1 : ((A > B) ? 1 : 0)) * [-1, 1][+!!reverse];
            };
        };
        helpers.prototype.FormatNumber = function (n, decimalPlaces, useParentheseForNegative, prefix, suffix) {
            useParentheseForNegative = useParentheseForNegative || false;
            prefix = prefix || '';
            suffix = suffix || '';
            var newNumber;
            var decimalPower;
            var isNeg = false;
            if (n < 0) {
                isNeg = true;
                n = -n;
            }
            if (this.isNumber(decimalPlaces)) {
                decimalPower = Math.pow(10, decimalPlaces);
                n = Math.round(n * decimalPower) / decimalPower;
            }
            var numberParts = n.toString().split('.');
            numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            if (decimalPlaces > 0) {
                numberParts[1] = numberParts[1] || '';
                while (numberParts[1].length < decimalPlaces) {
                    numberParts[1] += '0';
                }
            }
            newNumber = numberParts.join('.');
            newNumber = prefix + newNumber + suffix;
            if (isNeg) {
                newNumber = useParentheseForNegative ? '(' + newNumber + ')' : '-' + newNumber;
            }
            return newNumber;
        };
        helpers.prototype.datatableFormatPercent = function (data, type, row) {
            if (type === 'display') {
                return helpers.prototype.FormatNumber(data, 3, true, null, '%');
            }
            return data;
        };
        helpers.prototype.datatableFormatCurrency = function (data, type, row) {
            if (type === 'display') {
                return helpers.prototype.FormatNumber(data, 2, true, '$');
            }
            return data;
        };
        helpers.prototype.datatableFormatPoints = function (data, type, row) {
            if (type === 'display') {
                return helpers.prototype.FormatNumber(data, 3, true);
            }
            return data;
        };
        helpers.prototype.ExtendWidgetFieldTemplate = function (eItem, templateName) {
            var _this = this;
            var fOption;
            var returnWidgetField;
            if (_this[templateName] && _this[templateName][eItem.field]) {
                fOption = _this[templateName][eItem.field];
                returnWidgetField = _this.$.extend({}, fOption.fieldTemplate, eItem);
            }
            else {
                window.console && console.error('Error in ExtendWidgetFieldTemplate... templateName: ', templateName, 'or field:', eItem.field, 'are not valid!');
                returnWidgetField = eItem;
            }
            return returnWidgetField;
        };
        helpers.prototype.GetSubFieldHelperType = function (fieldName) {
            var fieldHelperName = null;
            try {
                switch (fieldName.toLowerCase()) {
                    case 'depositdatalist':
                        fieldHelperName = 'depositResultDataFields';
                        break;
                    case 'mortgagerateresult':
                        fieldHelperName = 'mortgageRateResultFields';
                        break;
                    case 'mortgageratedatalist':
                        fieldHelperName = 'mortgageRateDataDisplay';
                        break;
                    case 'autoquoteclientfees':
                        fieldHelperName = 'autoQuoteResultDataFieldsClientFees';
                        break;
                    case 'autoquotedatalist':
                        fieldHelperName = 'autoQuoteResultDataFields';
                        break;
                    default:
                        break;
                }
                if (!fieldHelperName) {
                    throw 'Helper Type Not Defined for: ' + fieldName;
                }
            }
            catch (er) {
                window.console && console.error('Error in WidgetHelper method GetSubFieldHelperType:\n - ', er);
            }
            return fieldHelperName;
        };
        helpers.prototype.GetFieldOptionsForWidgetType = function (widgetType, fieldName, objectType) {
            var _this = this;
            var returnFieldOptions = null;
            try {
                if (widgetType.toLowerCase() === 'depositdatalist') {
                    returnFieldOptions = _this.depositResultDataFields[fieldName];
                }
                else if (widgetType.toLowerCase() === 'autoquoteclientfees') {
                    returnFieldOptions = _this.autoQuoteResultDataFieldsClientFees[fieldName];
                }
                else if (widgetType.toLowerCase() === 'autoquotedatalist') {
                    returnFieldOptions = _this.autoQuoteResultDataFields[fieldName];
                }
                else if (widgetType.toLowerCase() === 'mortgagerateresult') {
                    returnFieldOptions = _this.mortgageRateResultFields[fieldName];
                }
                else if (widgetType.toLowerCase() === 'mortgageratedatalist') {
                    returnFieldOptions = _this.mortgageRateDataDisplay[fieldName];
                }
                else if (widgetType.toLowerCase().indexOf('mortgagequote') !== -1) {
                    returnFieldOptions = _this.mortgageQuoteFields[fieldName];
                }
                else if (widgetType.toLowerCase().indexOf('mortgagerate') !== -1) {
                    if (objectType.toLowerCase().indexOf('result') !== -1) {
                        returnFieldOptions = _this.mortgageRateResultFields[fieldName];
                    }
                    else {
                        returnFieldOptions = _this.mortgageRateFields[fieldName];
                    }
                }
                else if (widgetType.toLowerCase().indexOf('deposit') !== -1) {
                    if (objectType.toLowerCase().indexOf('result') !== -1) {
                        returnFieldOptions = _this.depositResultFields[fieldName];
                    }
                    else {
                        returnFieldOptions = _this.depositFields[fieldName];
                    }
                }
                else if (widgetType.toLowerCase().indexOf('autoquote') !== -1) {
                    if (objectType.toLowerCase().indexOf('result') !== -1) {
                        returnFieldOptions = _this.autoQuoteResultFields[fieldName];
                    }
                    else {
                        returnFieldOptions = _this.autoQuoteFields[fieldName];
                    }
                }
                else {
                    returnFieldOptions = _this.contactFields[fieldName];
                }
                if (!returnFieldOptions) {
                    throw 'Can not find anything to return.';
                }
                return returnFieldOptions;
            }
            catch (er) {
                window.console && console.error('Error in WidgetHelper method GetFieldOptionsForWidgetType: ', er, '\n\twidgetType:', widgetType, '\n\tfieldName:', fieldName, '\n\tobjectType:', objectType, '\n\treturnFieldOptions:', returnFieldOptions);
            }
        };
        helpers.prototype.ModifyTextElementsInDOM = function (node, callback) {
            var _this = this;
            var next;
            if (node.nodeType === 1) {
                if (!!(node = node.firstChild)) {
                    do {
                        next = node.nextSibling;
                        _this.ModifyTextElementsInDOM(node, callback);
                    } while (!!(node = next));
                }
            }
            else if (node.nodeType === 3) {
                node.nodeValue = callback(node.nodeValue);
            }
        };
        helpers.prototype.FakeData = function () {
            return {
                deposit: { APY: 1, TotalInterestEarned: 100, AmountPlusInterest: 100, CompoundInterestType: 'Quarterly', BaseRate: 1.7500, FinalRate: 1.7400 },
                mortgagerate: [
                    { InterestRate: 2.375, APR: 2.559, FinalFees: 2100.00, PIP: 1850.58, CalcPrice: 0.750, TermInMonths: 180, ProductTermType: 'F15' },
                    { InterestRate: 2.750, APR: 3.065, FinalFees: 1234.56, PIP: 1143.08, CalcPrice: 1.820, TermInMonths: 360, ProductTermType: 'F30' }
                ],
                autoquote: [
                    { Id: 5, QuoteId: 'Test8bbc9414d14f14b51', APR: 5.781, BaseRate: 6.0000, AdjustedRate: 7.0000, CappedRate: 5.7500, FinalRate: 5.7500, BasePrice: 0.0, AdjustedPrice: 0.0, CappedPrice: 0.0, FinalPrice: 0.0, ClientFeeDollarTotal: 100.0000, ClientFeePercentTotal: 0.0, Adjustments: [{ AdjustmentType: 'Rate', OwnerId: 6, Rules: [], Id: 1, ParentId: 6, TierGroupId: 1, Name: 'Adjustment for middle man', Description: 'add +1.0', Value: 1.0000, MustMatchAllRules: true, Active: true }], Caps: [{ CapType: 'CapRate', OwnerId: 6, Rules: [{ RuleType: 'RateRule', CompareType: 'GreaterThan', Id: 1, ParentId: 1, ParentType: 'Cap', TierGroupId: 1, Name: 'FinalRate', Description: '>5.75', Value: '5.75', Active: true }], Id: 1, ParentId: 6, TierGroupId: 1, Name: 'Cap 5.75', Description: 'Cap Rate at 5.75', Value: 5.7500, MustMatchAllRules: false, Active: true }], ClientFees: [{ FeeType: 'Fee Type', FrequencyType: 'Frequency Type', OwnerId: 6, Rules: [], Id: 1, ParentId: 6, TierGroupId: 1, ClientId: 399, Name: 'Name', Description: 'Description', Value: 100.0000, MustMatchAllRules: true, Active: true, IncludeInApr: true }], TierId: 6, TierGroupId: 1, FinalFeesNotInApr: 50, FinalFeesInApr: 495, MonthlyPayment: 1547.28 }
                ]
            };
        };
        helpers.prototype.AppendDataToDataList = function (fieldList, data, nameOfField) {
            for (var fieldIndex = fieldList.length - 1; fieldIndex >= 0; fieldIndex--) {
                var fieldItem = fieldList[fieldIndex];
                if (fieldItem.field === nameOfField) {
                    fieldItem.fieldData = data;
                }
            }
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
                hr: function () { return $('<hr/>'); },
                a: function () { return $('<a/>'); },
                i: function () { return $('<i/>'); },
                span: function () { return $('<span/>'); },
                ol: function () { return $('<ol/>'); },
                ul: function () { return $('<ul/>'); },
                li: function () { return $('<li/>'); },
                h: function (headNumber) {
                    if (headNumber === void 0) { headNumber = 3; }
                    return $('<h' + headNumber + '/>');
                },
                form: function () { return $('<form/>').addClass('form-horizontal'); },
                label: function (cssClass) {
                    if (cssClass === void 0) { cssClass = 'control-label col-sm-12'; }
                    return $('<label/>').addClass(cssClass);
                },
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
                table: function () { return $('<table/>'); },
                thead: function () { return $('<thead/>'); },
                tbody: function () { return $('<tbody/>'); },
                tr: function () { return $('<tr/>'); },
                th: function () { return $('<th/>'); },
                td: function () { return $('<td/>'); },
                formGroup: function (formGroupSize, useRow) {
                    var returnRow;
                    if (useRow) {
                        returnRow = el.row();
                    }
                    else {
                        returnRow = el.row('form-group');
                    }
                    if (formGroupSize) {
                        returnRow.addClass('form-group-' + formGroupSize);
                    }
                    return returnRow;
                }
            };
            return el;
        };
        helpers.prototype.ScrollToAnchor = function (anchorName, scrollSpeed, topOffset) {
            var $ = this.$;
            scrollSpeed = scrollSpeed || 200;
            topOffset = topOffset || 50;
            $('html, body').animate({
                scrollTop: ($('a[name=' + anchorName + ']').offset().top) - topOffset
            }, scrollSpeed);
        };
        helpers.prototype.US_States = function () {
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
        helpers.prototype.BuildWidgetScript = function (widgetInfo, isBuilderVersion) {
            isBuilderVersion = isBuilderVersion || false;
            var $ = this.$;
            var cfo = $.extend(true, {}, widgetInfo.formObject);
            var cbo = $.extend(true, {}, cfo.buildObject);
            var cro = (cfo.resultObject) ? $.extend(true, {}, cfo.resultObject) : null;
            var wScript = '';
            var hasCaptchaField = this.GetIndexOfFirstObjectInArray(cbo.fields, 'field', 'captcha') !== -1;
            var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
            var unReplaceRegEx = /#un{[^\}]+}/g;
            var uniqueQualifierForm = this.getUniqueQualifier('F');
            var uniqueQualifierResult = this.getUniqueQualifier('R');
            for (var iFld = cbo.fields.length - 1; iFld >= 0; iFld--) {
                var cboField = cbo.fields[iFld];
                delete cboField['$$hashKey'];
                if (cboField.value === null || cboField === '') {
                    delete cboField.value;
                }
            }
            if (isBuilderVersion) {
                cbo.showBuilderTools = isBuilderVersion;
            }
            cbo.postDOMCallback = '#fn{postDOMFunctions}';
            cbo.uniqueQualifier = uniqueQualifierForm;
            if (cro) {
                if (isBuilderVersion) {
                    cro.showBuilderTools = isBuilderVersion;
                }
                cro.uniqueQualifier = uniqueQualifierResult;
            }
            var widgetWrapper = this.Interpolate('\n<div id="ltWidgetWrapper_#{uniqueF}"></div>', { uniqueF: uniqueQualifierForm });
            if (cro) {
                widgetWrapper += this.Interpolate('\n<div id="ltWidgetResultWrapper_#{uniqueR}"></div>', { uniqueR: uniqueQualifierResult });
            }
            wScript += widgetWrapper;
            if (widgetInfo.initialScript) {
                wScript += this.Interpolate(widgetInfo.initialScript, { uniqueNew: uniqueQualifierForm });
            }
            var mainScript = '';
            var captchaOptions = { uniqueQualifier: uniqueQualifierForm };
            var captchaVar = "\n\t\t\t\tvar ltCap#un{unique};\n\t\t\t\tvar ltCapOpts#un{unique} = #{capOp};";
            captchaVar = this.Interpolate(captchaVar, { capOp: JSON.stringify(captchaOptions, null, 2) });
            if (hasCaptchaField) {
                mainScript += captchaVar;
            }
            var postDomCode = '/*code ran after DOM created*/', postDomFn = "\n\t\t\t\tvar pdfun = function () {\n\t\t\t\t\t#{code}\n\t\t\t\t};";
            if (hasCaptchaField) {
                postDomCode += "\n\t\t\t\t\tltCap#un{unique} = new LoanTekCaptcha(ltw_ltjq, ltCapOpts#un{unique});";
            }
            mainScript += this.Interpolate(postDomFn, { code: postDomCode });
            var extValid_Code;
            var extValid = "\n\t\t\t\tvar ev = function () {\n\t\t\t\t\t#{validReturn}\n\t\t\t\t};";
            if (hasCaptchaField && isBuilderVersion) {
                extValid_Code = 'return ltCap#un{unique}.IsValidEntry() && false;';
            }
            else if (hasCaptchaField) {
                extValid_Code = 'return ltCap#un{unique}.IsValidEntry();';
            }
            else if (isBuilderVersion) {
                extValid_Code = 'return false;';
            }
            else {
                extValid_Code = 'return true;';
            }
            mainScript += this.Interpolate(extValid, { validReturn: extValid_Code });
            var buildObjectWrap = "\n\t\t\t\tvar ltwbo#un{unique} = #{bow};";
            var cboString = JSON.stringify(cbo, null, 2);
            mainScript += this.Interpolate(buildObjectWrap, { bow: cboString });
            var ltWidgetOptions = {
                postUrl: widgetInfo.url,
                externalValidatorFunction: '#fn{externalValidators}',
                clientId: widgetInfo.ClientId,
                userId: widgetInfo.UserId,
                uniqueQualifier: uniqueQualifierForm
            };
            if (cbo.showBuilderTools) {
                ltWidgetOptions.showBuilderTools = cbo.showBuilderTools;
            }
            var ltWidgetOptionsWrap = "\n\t\t\t\tvar ltwo#un{unique} = #{cwow};";
            var ltWidgetOptionsWithResultsObject = $.extend(true, {}, ltWidgetOptions);
            if (cro) {
                ltWidgetOptionsWithResultsObject.resultDisplayOptions = cro;
            }
            mainScript += this.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptionsWithResultsObject, null, 2) });
            var widgetBuildForm = "\n\t\t\t\tvar ltwfb#un{unique} = new LoanTekWidget.FormBuild(ltw_ltjq, ltw_lthlpr, ltwbo#un{unique}, ltwo#un{unique});";
            mainScript += widgetBuildForm;
            mainScript = this.Interpolate(mainScript, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);
            var mainScriptWrap = "\n\t\t\t\t<script type=\"text/javascript\">\n\t\t\t\t(function () {#{m}\n\t\t\t\t})();\n\t\t\t\t</script>";
            mainScript = this.Interpolate(mainScriptWrap, { m: mainScript });
            mainScript = this.Interpolate(mainScript, { unique: uniqueQualifierForm }, null, unReplaceRegEx);
            wScript += mainScript;
            wScript = wScript.replace(/\s+/gm, ' ');
            return wScript;
        };
        return helpers;
    }());
    LoanTekWidget.helpers = helpers;
    var hSizing = (function () {
        function hSizing() {
            this.h1 = { id: 1, name: 'Heading 1' };
            this.h2 = { id: 2, name: 'Heading 2' };
            this.h3 = { id: 3, name: 'Heading 3' };
            this.h4 = { id: 4, name: 'Heading 4' };
            this.h5 = { id: 5, name: 'Heading 5' };
            this.h6 = { id: 6, name: 'Heading 6' };
        }
        hSizing.prototype.getDefault = function () {
            return this.h4;
        };
        hSizing.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return hSizing;
    }());
    var inputSizing = (function () {
        function inputSizing() {
            this.sm = { id: 'sm', name: 'Small' };
            this.md = { id: 'md', name: 'Medium' };
            this.lg = { id: 'lg', name: 'Large' };
        }
        inputSizing.prototype.getDefault = function () {
            return this.md;
        };
        return inputSizing;
    }());
    var gridSizing = (function () {
        function gridSizing() {
            this.xs = { id: 'xs', name: 'xs' };
            this.sm = { id: 'sm', name: 'sm' };
            this.md = { id: 'md', name: 'md' };
            this.lg = { id: 'lg', name: 'lg' };
        }
        return gridSizing;
    }());
    var gridColumns = (function () {
        function gridColumns() {
            this.n2 = { id: 2, name: '1/6th' };
            this.n3 = { id: 3, name: '1/4th' };
            this.n4 = { id: 4, name: '1/3rd' };
            this.n6 = { id: 6, name: '1/2' };
            this.n8 = { id: 8, name: '2/3rds' };
            this.n9 = { id: 9, name: '3/4ths' };
            this.n10 = { id: 10, name: '5/6ths' };
            this.n12 = { id: 12, name: 'Full Width' };
        }
        gridColumns.prototype.getDefault = function () {
            return this.n12;
        };
        gridColumns.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return gridColumns;
    }());
    var offsetColumns = (function (_super) {
        __extends(offsetColumns, _super);
        function offsetColumns() {
            _super.call(this);
            this.n12 = { id: 0, name: 'No Offset' };
        }
        return offsetColumns;
    }(gridColumns));
    var bootstrap = (function () {
        function bootstrap() {
            this.inputSizing = new inputSizing();
            this.gridSizing = new gridSizing();
            this.gridColumns = new gridColumns();
            this.offsetColumns = new offsetColumns();
            this.gridColumnsArray = helpers.prototype.ConvertObjectToArray(this.gridColumns);
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
        widthUnit.prototype.getDefault = function () {
            return this.per;
        };
        return widthUnit;
    }());
    var widgetType = (function () {
        function widgetType() {
            this.contact = { id: 'contact', name: 'Contact' };
            this.mortgagequote = { id: 'mortgagequote', name: 'Mortgage Quote' };
            this.mortgagerate = { id: 'mortgagerate', name: 'Mortgage Rate' };
            this.deposit = { id: 'deposit', name: 'Deposit' };
            this.autoquote = { id: 'autoquote', name: 'Auto Quote' };
        }
        return widgetType;
    }());
    var ProductTermType = (function () {
        function ProductTermType() {
            this.NotSet = { name: 'NotSet', value: -1, description: 'Not Set' };
            this.F40 = { name: 'F40', value: 6, description: '40 year Fixed' };
            this.F30 = { name: 'F30', value: 9, description: '30 year Fixed' };
            this.F25 = { name: 'F25', value: 11, description: '25 year Fixed' };
            this.F20 = { name: 'F20', value: 7, description: '20 year Fixed' };
            this.F15 = { name: 'F15', value: 1, description: '15 year Fixed' };
            this.F10 = { name: 'F10', value: 4, description: '10 year Fixed' };
            this.A10_1 = { name: 'A10_1', value: 10, description: '10/1 ARM' };
            this.A7_1 = { name: 'A7_1', value: 8, description: '7/1 ARM' };
            this.A5_1 = { name: 'A5_1', value: 2, description: '5/1 ARM' };
            this.A3_1 = { name: 'A3_1', value: 3, description: '3/1 ARM' };
            this.A2_1 = { name: 'A2_1', value: 5, description: '2/1 ARM' };
            this.A1_1 = { name: 'A1_1', value: 0, description: '1/1 ARM' };
        }
        ProductTermType.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return ProductTermType;
    }());
    var sharedFields = (function () {
        function sharedFields() {
            this.label = { id: 'label', name: 'Label', allowMultiples: true, fieldTemplate: { element: 'label', value: 'label' } };
            this.title = { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { element: 'title', value: 'title' } };
            this.paragraph = { id: 'paragraph', name: 'Paragraph', allowMultiples: true, fieldTemplate: { element: 'p', value: 'paragraph text' } };
            this.hr = { id: 'hr', name: 'Horizontal Line', allowMultiples: true, fieldTemplate: { element: 'hr' } };
            this.captcha = { id: 'captcha', name: 'Captcha', fieldTemplate: { element: 'captcha' } };
            this.submit = { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'button', type: 'submit', id: 'ltwSubmit', cssClass: 'btn-primary', value: 'Submit' } };
            this.nodatamessage = { id: 'nodatamessage', name: 'No Data Message', isLTRequired: true, fieldTemplate: { element: 'div', type: 'nodatamessage', id: 'ltwNoDataMessage', fontSize: 20, value: 'Sorry, no results.' } };
            this.custominput = { id: 'custominput', name: 'Custom Input', allowMultiples: true, fieldTemplate: { element: 'input', type: 'text' } };
            this.customhidden = { id: 'customhidden', name: 'Custom Hidden', allowMultiples: true, fieldTemplate: { element: 'input', type: 'hidden' } };
            this.contactwidget = { id: 'contactwidget', name: 'Contact Widget', fieldTemplate: { element: 'widget', type: 'contactwidget' } };
            this.email = { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { element: 'input', type: 'email', id: 'ltwEmail', placeholder: 'Email', required: true } };
        }
        return sharedFields;
    }());
    var contactFields = (function () {
        function contactFields() {
            var sf = new sharedFields();
            this.captcha = sf.captcha;
            this.submit = sf.submit;
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.custominput = sf.custominput;
            this.customhidden = sf.customhidden;
            this.email = sf.email;
            this.firstname = { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwFirstName', placeholder: 'First Name', required: true } };
            this.lastname = { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwLastName', placeholder: 'Last Name', required: true } };
            this.phone = { id: 'phone', name: 'Phone', fieldTemplate: { element: 'input', type: 'tel', id: 'ltwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}' } };
            this.company = { id: 'company', name: 'Company', fieldTemplate: { element: 'input', type: 'text', id: 'ltwCompany', placeholder: 'Company' } };
            this.state = { id: 'state', name: 'State', fieldTemplate: { element: 'select', type: 'state', id: 'ltwState', placeholder: 'Select a State' } };
            this.comments = { id: 'comments', name: 'Comments', fieldTemplate: { element: 'textarea', id: 'ltwComments', placeholder: 'Comments', rows: 4 } };
            this.successmessage = { id: 'successmessage', name: 'Success Message Upon Submit', fieldTemplate: { element: 'div', type: 'successmessage', id: 'ltwSuccessMessage', fontSize: 20, value: 'Thank you. You will be contacted shortly.' } };
            this.source_d_idhidden = { id: 'source_d_idhidden', groupName: 'source.id', name: 'Source Id [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwSourceId', placeholder: 'Source Id' } };
            this.source_d_namehidden = { id: 'source_d_namehidden', groupName: 'source.name', name: 'Source Name [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwSourceName', placeholder: 'Source Name' } };
            this.notifyuserofnewleadhidden = { id: 'notifyuserofnewleadhidden', groupName: 'notifyuserofnewlead', name: 'Notify User Of New Lead [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwNotifyUserOfNewLead', placeholder: 'Notify User Of New Lead' } };
            this.sendnewleadinitialwelcomemessagehidden = { id: 'sendnewleadinitialwelcomemessagehidden', groupName: 'sendnewleadinitialwelcomemessage', name: 'Send New Lead Initial Welcome Message [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwSendNewLeadInitialWelcomeMessage', placeholder: 'Send New Lead Initial Welcome Message' } };
            helpers.prototype.SetRequiredFields(this);
        }
        return contactFields;
    }());
    var depositFields = (function () {
        function depositFields() {
            var sf = new sharedFields();
            this.depositterm = { id: 'depositterm', name: 'Term [textbox]', groupName: 'depositterm', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwDepositTerm', placeholder: 'Enter # of Months' } };
            this.deposittermdd = { id: 'deposittermdd', name: 'Term [dropdown]', groupName: 'depositterm', isLTRequired: true, fieldTemplate: { element: 'select', type: 'deposittermdd', id: 'ltwDepositTerm', placeholder: 'Select a Term' } };
            this.depositamount = { id: 'depositamount', name: 'Amount [textbox]', groupName: 'depositamount', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwDepositAmount', placeholder: 'Enter Amount' } };
            this.depositamountdd = { id: 'depositamountdd', name: 'Amount [dropdown]', groupName: 'depositamount', isLTRequired: true, fieldTemplate: { element: 'select', type: 'depositamountdd', id: 'ltwDepositAmount', placeholder: 'Select Amount' } };
            this.submit = sf.submit;
            this.captcha = sf.captcha;
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.custominput = sf.custominput;
            this.customhidden = sf.customhidden;
            this.contactwidget = sf.contactwidget;
            helpers.prototype.SetRequiredFields(this);
        }
        depositFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return depositFields;
    }());
    var depositResultFields = (function () {
        function depositResultFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.nodatamessage = sf.nodatamessage;
            this.depositdatalist = { id: 'depositdatalist', name: 'Deposit Results', isLTRequired: true, fieldTemplate: { element: 'repeat', type: 'depositdatalist' } };
            helpers.prototype.SetRequiredFields(this);
        }
        depositResultFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return depositResultFields;
    }());
    var depositResultDataFields = (function () {
        function depositResultDataFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.api = { id: 'api', name: 'API', fieldTemplate: { element: 'div', value: '#{APY}', cssClass: 'form-control-static' } };
            this.totalinterestearned = { id: 'totalinterestearned', name: 'Total Interest Earned', fieldTemplate: { element: 'div', value: '#{TotalInterestEarned}', cssClass: 'form-control-static' } };
            this.amountplusinterest = { id: 'amountplusinterest', name: 'Amount Plus Interest', fieldTemplate: { element: 'div', value: '#{AmountPlusInterest}', cssClass: 'form-control-static' } };
            this.compoundinteresttype = { id: 'compoundinteresttype', name: 'Compound Interest Type', fieldTemplate: { element: 'div', value: '#{CompoundInterestType}', cssClass: 'form-control-static' } };
            this.baserate = { id: 'baserate', name: 'Base Rate', fieldTemplate: { element: 'div', value: '#{BaseRate}', cssClass: 'form-control-static' } };
            this.finalrate = { id: 'finalrate', name: 'Final Rate', fieldTemplate: { element: 'div', value: '#{FinalRate}', cssClass: 'form-control-static' } };
        }
        depositResultDataFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return depositResultDataFields;
    }());
    var autoQuoteFields = (function () {
        function autoQuoteFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.submit = sf.submit;
            this.contactwidget = sf.contactwidget;
            this.fortype = { id: 'fortype', name: 'ForType', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwForType', placeholder: 'Enter ForType' } };
            this.quotingchannel = { id: 'quotingchannel', name: 'Quoting Channel', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwQuotingChannel', placeholder: 'Enter QuotingChannel' } };
            this.amount = { id: 'amount', name: 'Amount', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwAmount', required: true, placeholder: 'Enter Amount' } };
            this.terminmonths = { id: 'terminmonths', groupName: 'terminmonths', name: 'Term In Months', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwTermInMonths', required: true, placeholder: 'Enter # of Months' } };
            this.downpayment = { id: 'downpayment', groupName: 'downpayment', name: 'Down Payment', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwDownPayment', required: true, placeholder: 'Down Payment' } };
            this.zipcode = { id: 'zipcode', groupName: 'zipcode', name: 'Zip Code', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwZipCode', required: true, placeholder: 'Enter Zip Code' } };
            this.creditscore = { id: 'creditscore', groupName: 'creditscore', name: 'Credit Score', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwCreditScore', required: true, placeholder: 'Enter Credit Score' } };
            this.modelyear = { id: 'modelyear', groupName: 'modelyear', name: 'Model Year', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwModelYear', required: true, placeholder: 'Enter Model Year (yyyy)' } };
            this.mileage = { id: 'mileage', groupName: 'mileage', name: 'Mileage', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwMileage', required: true, placeholder: 'Enter Mileage' } };
            this.loanpurposetype = { id: 'loanpurposetype', groupName: 'loanpurposetype', name: 'Loan Purpose', isLTRequired: true, fieldTemplate: { element: 'select', type: 'selectobject', id: 'ltwLoanPurposeType', required: true, placeholder: 'Select Loan Purpose' } };
            this.sellertype = { id: 'sellertype', groupName: 'sellertype', name: 'Seller', isLTRequired: true, fieldTemplate: { element: 'select', type: 'selectobject', id: 'ltwSellerType', required: true, placeholder: 'Seller' } };
            this.neworusedtype = { id: 'neworusedtype', groupName: 'neworusedtype', name: 'New Or Used', isLTRequired: true, fieldTemplate: { element: 'select', type: 'selectobject', id: 'ltwNewOrUsedType', required: true, placeholder: 'New Or Used' } };
            this.isbusinessloan = { id: 'isbusinessloan', groupName: 'isbusinessloan', name: 'Is Business Loan', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwIsBusinessLoan', placeholder: 'Is Business Loan?' } };
            this.ismember = { id: 'ismember', groupName: 'ismember', name: 'Is Member', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwIsMember', placeholder: 'Is Member?' } };
            this.hasgapinsurance = { id: 'hasgapinsurance', groupName: 'hasgapinsurance', name: 'GAP Insurance', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwHasGapInsurance', placeholder: 'GAP Insurance?' } };
            this.terminmonthshidden = { id: 'terminmonthshidden', groupName: 'terminmonths', name: 'Term In Months [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwTermInMonths', placeholder: 'Enter # of Months' } };
            this.downpaymenthidden = { id: 'downpaymenthidden', groupName: 'downpayment', name: 'Down Payment [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwDownPayment', placeholder: 'Down Payment' } };
            this.zipcodehidden = { id: 'zipcodehidden', groupName: 'zipcode', name: 'Zip Code [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwZipCode', placeholder: 'Enter Zip Code' } };
            this.creditscorehidden = { id: 'creditscorehidden', groupName: 'creditscore', name: 'Credit Score [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwCreditScore', placeholder: 'Enter Credit Score' } };
            this.modelyearhidden = { id: 'modelyearhidden', groupName: 'modelyear', name: 'Model Year [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwModelYear', placeholder: 'Enter Model Year (yyyy)' } };
            this.mileagehidden = { id: 'mileagehidden', groupName: 'mileage', name: 'Mileage [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwMileage', placeholder: 'Enter Mileage' } };
            this.loanpurposetypehidden = { id: 'loanpurposetypehidden', groupName: 'loanpurposetype', name: 'Loan Purpose [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwLoanPurposeType', placeholder: 'Select Loan Purpose' } };
            this.sellertypehidden = { id: 'sellertypehidden', groupName: 'sellertype', name: 'Seller [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwSellerType', placeholder: 'Seller' } };
            this.neworusedtypehidden = { id: 'neworusedtypehidden', groupName: 'neworusedtype', name: 'New Or Used [hidden]', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwNewOrUsedType', placeholder: 'New Or Used' } };
            this.isbusinessloanhidden = { id: 'isbusinessloanhidden', groupName: 'isbusinessloan', name: 'Is Business Loan [hidden]', fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwIsBusinessLoan', placeholder: 'Is Business Loan?' } };
            this.ismemberhidden = { id: 'ismemberhidden', groupName: 'ismember', name: 'Is Member [hidden]', fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwIsMember', placeholder: 'Is Member?' } };
            this.hasgapinsurancehidden = { id: 'hasgapinsurancehidden', groupName: 'hasgapinsurance', name: 'GAP Insurance [hidden]', fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwHasGapInsurance', placeholder: 'GAP Insurance?' } };
        }
        autoQuoteFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return autoQuoteFields;
    }());
    var autoQuoteResultFields = (function () {
        function autoQuoteResultFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.nodatamessage = sf.nodatamessage;
            this.contactwidget = sf.contactwidget;
            this.autoquotedatalist = { id: 'autoquotedatalist', name: 'Auto Quote Results', isLTRequired: true, fieldTemplate: { element: 'repeat', type: 'autoquotedatalisttypeXX' } };
        }
        autoQuoteResultFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return autoQuoteResultFields;
    }());
    var autoQuoteResultDataFields = (function () {
        function autoQuoteResultDataFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.quoteid = { id: 'quoteid', name: 'Quote Id', fieldTemplate: { element: 'div', value: '#{QuoteId}', cssClass: 'form-control-static' } };
            this.apr = { id: 'apr', name: 'APR', fieldTemplate: { element: 'div', value: '#{APR}', cssClass: 'form-control-static' } };
            this.finalrate = { id: 'finalrate', name: 'FinalRate', fieldTemplate: { element: 'div', value: '#{FinalRate}', cssClass: 'form-control-static' } };
            this.finalfeesnotinapr = { id: 'finalfeesnotinapr', name: 'Final Fees Not In APR', fieldTemplate: { element: 'div', value: '#{FinalFeesNotInApr}', cssClass: 'form-control-static' } };
            this.finalfeesinapr = { id: 'finalfeesinapr', name: 'Final Fees In APR', fieldTemplate: { element: 'div', value: '#{FinalFeesInApr}', cssClass: 'form-control-static' } };
            this.monthlypayment = { id: 'monthlypayment', name: 'Monthly Payment', fieldTemplate: { element: 'div', value: '#{MonthlyPayment}', cssClass: 'form-control-static' } };
            this.autoquoteclientfees = { id: 'autoquoteclientfees', name: 'Client Fees', fieldTemplate: { element: 'repeat', type: 'autoquotedatalistclientfeesXX' } };
        }
        autoQuoteResultDataFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return autoQuoteResultDataFields;
    }());
    var autoQuoteResultDataFieldsClientFees = (function () {
        function autoQuoteResultDataFieldsClientFees() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.feetype = { id: 'feetype', name: 'Fee Type', fieldTemplate: { element: 'div', value: '#{FeeType}', cssClass: 'form-control-static' } };
            this.frequencytype = { id: 'frequencytype', name: 'Frequency Type', fieldTemplate: { element: 'div', value: '#{FrequencyType}', cssClass: 'form-control-static' } };
            this.name = { id: 'name', name: 'Name', fieldTemplate: { element: 'div', value: '#{Name}', cssClass: 'form-control-static' } };
            this.description = { id: 'description', name: 'Description', fieldTemplate: { element: 'div', value: '#{Description}', cssClass: 'form-control-static' } };
            this.value = { id: 'value', name: 'Value', fieldTemplate: { element: 'div', value: '#{Value}', cssClass: 'form-control-static' } };
        }
        autoQuoteResultDataFieldsClientFees.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return autoQuoteResultDataFieldsClientFees;
    }());
    var mortgageQuoteFields = (function () {
        function mortgageQuoteFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.submit = sf.submit;
            this.loanpurpose = { id: 'loanpurpose', name: 'loanpurpose', fieldTemplate: { element: 'select', type: 'loanpurpose', id: 'ltwLoanPurpose', placeholder: 'Loan Purpose' } };
            this.zipcode = { id: 'zipcode', name: 'zipcode', isLTRequired: true, fieldTemplate: { element: 'input', type: 'number', id: 'ltwZipCode', placeholder: 'Zip Code', required: true } };
            this.purchaseprice = { id: 'purchaseprice', name: 'purchaseprice', fieldTemplate: { element: 'input', type: 'number', id: 'ltwPurchasePrice', placeholder: 'Purchase Price' } };
            this.downpayment = { id: 'downpayment', name: 'downpayment', fieldTemplate: { element: 'input', type: 'number', id: 'ltwDownPayment', placeholder: 'Down Payment' } };
            this.propertyvalue = { id: 'propertyvalue', name: 'propertyvalue', fieldTemplate: { element: 'input', type: 'number', id: 'ltwPropertyValue', placeholder: 'Property Value' } };
            this.balance = { id: 'balance', name: 'balance', fieldTemplate: { element: 'input', type: 'number', id: 'ltwBalance', placeholder: 'Mortgage Balance' } };
            this.cashout = { id: 'cashout', name: 'cashout', fieldTemplate: { element: 'input', type: 'number', id: 'ltwCashout', placeholder: 'Cash Out Amount' } };
            this.creditscore = { id: 'creditscore', name: 'creditscore', fieldTemplate: { element: 'select', type: 'creditscore', id: 'ltwCreditScore', placeholder: 'Credit Score' } };
            this.loanprogram = { id: 'loanprogram', name: 'loanprogram', fieldTemplate: { element: 'dropdown', type: 'loanprogram', id: 'ltwLoanProgram' } };
            this.monthlyincome = { id: 'monthlyincome', name: 'monthlyincome', fieldTemplate: { element: 'input', type: 'number', id: 'ltwMonthlyIncome', placeholder: 'Monthly Income (optional)' } };
            this.monthlydebt = { id: 'monthlydebt', name: 'monthlydebt', fieldTemplate: { element: 'input', type: 'number', id: 'ltwMonthlyDebt', placeholder: 'Monthly Income (optional)' } };
            this.propertytype = { id: 'propertytype', name: 'propertytype', fieldTemplate: { element: 'select', type: 'propertytype', id: 'ltwPropertyType', placeholder: 'Property Type' } };
            this.propertyusage = { id: 'propertyusage', name: 'propertyusage', fieldTemplate: { element: 'select', type: 'propertyusage', id: 'ltwPropertyUsage', placeholder: 'Property Use' } };
            this.vaeligible = { id: 'vaeligible', name: 'vaeligible', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVAEligible', placeholder: 'VA Eligible?' } };
            this.vafirsttimeuse = { id: 'vafirsttimeuse', name: 'vafirsttimeuse', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVAFirstTimeUse', placeholder: 'VA First Time Use?' } };
            this.vadisabled = { id: 'vadisabled', name: 'vadisabled', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVADisabled', placeholder: 'VA Disabled?' } };
            this.vatype = { id: 'vatype', name: 'vatype', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwVAType', placeholder: 'VA Type?' } };
            this.firsttimebuyer = { id: 'firsttimebuyer', name: 'firsttimebuyer', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwFirstTimeBuyer', placeholder: 'First Time Buyer?' } };
            this.foreclosed = { id: 'foreclosed', name: 'foreclosed', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwForeclosed', placeholder: 'Foreclosed?' } };
            this.bankruptcy = { id: 'bankruptcy', name: 'bankruptcy', fieldTemplate: { element: 'input', type: 'checkbox', id: 'ltwBankruptcy', placeholder: 'Bankruptcy?' } };
            this.loanownedby = { id: 'loanownedby', name: 'loanownedby', fieldTemplate: { element: 'select', type: 'loanownedby', id: 'ltwLoanOwnedBy', placeholder: 'Loan Owned By?' } };
            helpers.prototype.SetRequiredFields(this);
        }
        mortgageQuoteFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return mortgageQuoteFields;
    }());
    var mortgageRateFields = (function () {
        function mortgageRateFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.contactwidget = sf.contactwidget;
            this.loantype = { id: 'loantype', name: 'Loan Type', fieldTemplate: { element: 'select', type: 'loantype', id: 'ltwLoanType', placeholder: 'Loan Type' } };
            this.ratetable = { id: 'ratetable', name: 'Rate Table', fieldTemplate: { element: 'datatable', type: 'ratetable', id: 'ltwRateTable' } };
            this.mortgagerateresult = { id: 'mortgagerateresult', name: 'Rate Data Results', fieldTemplate: { element: 'repeat', type: 'ratedisplay', id: 'ltwMortgageRateResultWrapper' } };
            this.creditscore = { id: 'creditscore', name: 'Credit Score', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwCreditScore' } };
            this.loanamount = { id: 'loanamount', name: 'Loan Amount', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwLoanAmount' } };
            this.loanpurpose = { id: 'loanpurpose', name: 'Loan Purpose', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwLoanPurpose' } };
            this.loantovalue = { id: 'loantovalue', name: 'Loan To Value', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwLoanToValue' } };
            this.propertytype = { id: 'propertytype', name: 'Property Type', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwPropertyType' } };
            this.propertyusage = { id: 'propertyusage', name: 'Property Usage', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwPropertyUsage' } };
            this.quotingchannel = { id: 'quotingchannel', name: 'Quoting Channel', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwQuotingChannel' } };
            this.zipcode = { id: 'zipcode', name: 'Zip Code', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwZipCode' } };
            this.vatype = { id: 'vatype', name: 'VA Type', isLTRequired: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwVAType' } };
            helpers.prototype.SetRequiredFields(this);
        }
        mortgageRateFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return mortgageRateFields;
    }());
    var mortgageRateDataTable = (function () {
        function mortgageRateDataTable() {
            this.rate = { id: 'rate', column: { data: 'InterestRate', render: helpers.prototype.datatableFormatPercent, title: 'Rate', className: 'ratetable-rate' } };
            this.apr = { id: 'apr', column: { data: 'APR', render: helpers.prototype.datatableFormatPercent, title: 'APR', className: 'ratetable-apr' } };
            this.loanfees = { id: 'loanfees', column: { data: 'FinalFees', render: helpers.prototype.datatableFormatCurrency, title: 'Loan Fees', className: 'ratetable-loanfees' } };
            this.payment = { id: 'payment', column: { data: 'PIP', render: helpers.prototype.datatableFormatCurrency, title: 'Payment', className: 'ratetable-payment' } };
            this.points = { id: 'points', column: { data: 'CalcPrice', render: helpers.prototype.datatableFormatPoints, title: 'Points', className: 'ratetable-points' } };
        }
        mortgageRateDataTable.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return mortgageRateDataTable;
    }());
    var mortgageRateResultFields = (function () {
        function mortgageRateResultFields() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.mortgageratedatasort = { id: 'mortgageratedatasort', name: 'Rate Sort [Use with Rate List]', fieldTemplate: { element: 'buttondropdown' } };
            this.mortgageratedatalist = { id: 'mortgageratedatalist', name: 'Rate List', fieldTemplate: { element: 'repeat', type: 'mortgageRateDataDisplay' } };
        }
        mortgageRateResultFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return mortgageRateResultFields;
    }());
    var mortgageRateDataDisplay = (function () {
        function mortgageRateDataDisplay() {
            var sf = new sharedFields();
            this.label = sf.label;
            this.title = sf.title;
            this.paragraph = sf.paragraph;
            this.hr = sf.hr;
            this.rate = { id: 'rate', name: 'Rate', fieldTemplate: { element: 'div', value: '#{InterestRate}', cssClass: 'form-control-static' } };
            this.apr = { id: 'apr', name: 'APR', fieldTemplate: { element: 'div', value: '#{APR}', cssClass: 'form-control-static' } };
            this.loanfees = { id: 'loanfees', name: 'Loan Fees', fieldTemplate: { element: 'div', value: '#{FinalFees}', cssClass: 'form-control-static' } };
            this.payment = { id: 'payment', name: 'Payment', fieldTemplate: { element: 'div', value: '#{PIP}', cssClass: 'form-control-static' } };
            this.points = { id: 'points', name: 'Points', fieldTemplate: { element: 'div', value: '#{CalcPrice}', cssClass: 'form-control-static' } };
        }
        mortgageRateDataDisplay.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return mortgageRateDataDisplay;
    }());
    var postObjects = (function () {
        function postObjects() {
        }
        postObjects.prototype.contact = function () {
            return new LoanTekWidget.PostObject_Contact();
        };
        postObjects.prototype.deposit = function () {
            return new LoanTekWidget.PostObject_Deposit();
        };
        postObjects.prototype.autoquote = function () {
            return new LoanTekWidget.PostObject_AutoQuote();
        };
        postObjects.prototype.mortgagerate = function () {
            return new LoanTekWidget.PostObject_MortgageRate();
        };
        return postObjects;
    }());
    var ApplyFormStyles = (function () {
        function ApplyFormStyles(lth, currentBuildObject, excludeCaptchaField, specifier) {
            var _thisC = this;
            specifier = specifier || '.' + lth.defaultFormSpecifierClass;
            _thisC._specifier = specifier;
            _thisC._borderType = currentBuildObject.formBorderType;
            _thisC._lth = lth;
            excludeCaptchaField = excludeCaptchaField || true;
            var returnStyles = '';
            if (currentBuildObject.formWidth) {
                currentBuildObject.formWidthUnit = currentBuildObject.formWidthUnit || lth.widthUnit.getDefault().id;
                returnStyles += '\n.ltw' + specifier + ' { width: ' + currentBuildObject.formWidth + currentBuildObject.formWidthUnit + '; }';
            }
            if (currentBuildObject.formFontColor) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-border { color: ' + currentBuildObject.formFontColor + '; }';
            }
            if (currentBuildObject.formBg) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-border { background-color: ' + currentBuildObject.formBg + '; }';
            }
            if (lth.isNumber(currentBuildObject.formBorderRadius)) {
                returnStyles += _thisC.formBorderRadius(currentBuildObject.formBorderRadius, _thisC._borderType);
            }
            if (currentBuildObject.formBorderColor) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-border, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading { border-color: ' + currentBuildObject.formBorderColor + '; }';
            }
            if (currentBuildObject.formTitleColor) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-heading, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading  { color: ' + currentBuildObject.formTitleColor + '; }';
            }
            if (currentBuildObject.formTitleBgColor) {
                returnStyles += '\n.ltw' + specifier + ' .lt-widget-heading, .ltw' + specifier + ' .lt-widget-border .lt-widget-heading  { background-color: ' + currentBuildObject.formTitleBgColor + '; }';
            }
            if (lth.isNumber(currentBuildObject.formGroupSpacing)) {
                returnStyles += '\n.ltw' + specifier + ' .form-group, .ltw' + specifier + ' .alert { margin-bottom: ' + currentBuildObject.formGroupSpacing + 'px; }';
            }
            if (lth.isNumber(currentBuildObject.formFieldBorderRadius)) {
                var ffbr = currentBuildObject.formFieldBorderRadius + '';
                var ffbhr = currentBuildObject.formFieldBorderRadius - 1 < 0 ? '0' : (currentBuildObject.formFieldBorderRadius - 1) + '';
                returnStyles += '\n.ltw' + specifier + ' .form-group .form-control, .ltw' + specifier + ' .alert { border-radius: ' + ffbr + 'px; }';
                if (!excludeCaptchaField) {
                    returnStyles += '\n.ltw' + specifier + ' .lt-captcha .panel { border-radius: ' + ffbr + 'px; }';
                    returnStyles += '\n.ltw' + specifier + ' .lt-captcha .panel-heading { border-top-right-radius: ' + ffbhr + 'px; border-top-left-radius: ' + ffbhr + 'px; }';
                }
            }
            if (lth.isNumber(currentBuildObject.formButtonBorderRadius)) {
                returnStyles += '\n.ltw' + specifier + ' .btn { border-radius: ' + currentBuildObject.formButtonBorderRadius + 'px; }';
            }
            _thisC._returnStyles = returnStyles;
        }
        ApplyFormStyles.prototype.getStyles = function () {
            return this._returnStyles;
        };
        ApplyFormStyles.prototype.formBorderRadius = function (borderRadius, borderType, specifier) {
            var _thisM = this;
            var lth = _thisM._lth;
            var br = '';
            var fbr = borderRadius + '';
            var fbhr = borderRadius - 1 < 0 ? '0' : (borderRadius - 1) + '';
            specifier = specifier || _thisM._specifier;
            borderType = borderType || _thisM._borderType;
            br += '\n.ltw' + specifier + ' .lt-widget-border { border-radius: ' + fbr + 'px; }';
            if (borderType === lth.formBorderType.panel.id) {
                br += '\n.ltw' + specifier + ' .lt-widget-border .lt-widget-heading { border-top-right-radius: ' + fbhr + 'px; border-top-left-radius: ' + fbhr + 'px; }';
            }
            return br;
        };
        return ApplyFormStyles;
    }());
    LoanTekWidget.ApplyFormStyles = ApplyFormStyles;
})(LoanTekWidget || (LoanTekWidget = {}));
