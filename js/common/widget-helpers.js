var LoanTekWidget;
(function (LoanTekWidget) {
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
    var widgetType = (function () {
        function widgetType() {
            this.contact = { id: 'contact', name: 'Contact' };
            this.quote = { id: 'quote', name: 'Quote' };
            this.rate = { id: 'rate', name: 'Rate' };
        }
        return widgetType;
    }());
    var contactFields = (function () {
        function contactFields() {
            this.clientid = { id: 'clientid', name: 'Client ID', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltcwClientId', value: 'LTWS' } };
            this.userid = { id: 'userid', name: 'User Id', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltcwUserId', value: 'UserID###' } };
            this.firstname = { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltcwFirstName', placeholder: 'First Name', required: true } };
            this.lastname = { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltcwLastName', placeholder: 'Last Name', required: true } };
            this.email = { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { element: 'input', type: 'email', id: 'ltcwEmail', placeholder: 'Email', required: true } };
            this.phone = { id: 'phone', name: 'Phone', fieldTemplate: { element: 'input', type: 'tel', id: 'ltcwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}' } };
            this.company = { id: 'company', name: 'Company', fieldTemplate: { element: 'input', type: 'text', id: 'ltcwCompany', placeholder: 'Company' } };
            this.state = { id: 'state', name: 'State', fieldTemplate: { element: 'select', type: 'state', id: 'ltcwState', placeholder: 'Select a State' } };
            this.comments = { id: 'comments', name: 'Comments', fieldTemplate: { element: 'textarea', id: 'ltcwComments', placeholder: 'Comments', rows: 4 } };
            this.captcha = { id: 'captcha', name: 'Captcha', fieldTemplate: { element: 'captcha' } };
            this.submit = { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'button', type: 'submit', cssClass: 'btn-primary', value: 'Submit' } };
            this.resultmessage = { id: 'resultmessage', name: 'Message Upon Submit', fieldTemplate: { element: 'div', id: 'ltcwResultMessage' } };
            this.label = { id: 'label', name: 'Label', allowMultiples: true, fieldTemplate: { element: 'label' } };
            this.title = { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { element: 'title' } };
            this.paragraph = { id: 'paragraph', name: 'Paragraph', allowMultiples: true, fieldTemplate: { element: 'p' } };
        }
        return contactFields;
    }());
    var helpers = (function () {
        function helpers(jq) {
            this.$ = jq;
            this.hsize = new hSizing;
            this.bootstrap = new bootstrap;
            this.formBorderType = new formBorderType;
            this.formBorderTypeArray = this.ConvertObjectToArray(this.formBorderType);
            this.widthUnit = new widthUnit;
            this.widgetType = new widgetType;
            this.defaultFormWidthUnit = this.widthUnit.per;
            this.defaultBorderRadius = 4;
            this.contactFields = new contactFields;
            this.contactFieldsArray = this.ConvertObjectToArray(this.contactFields);
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
                    returnObj[objectKey] = obj;
                }
            }
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
        return helpers;
    }());
    LoanTekWidget.helpers = helpers;
})(LoanTekWidget || (LoanTekWidget = {}));
