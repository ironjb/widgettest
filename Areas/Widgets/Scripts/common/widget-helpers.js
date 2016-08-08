var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoanTekWidget;
(function (LoanTekWidget) {
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
            this.n3 = { id: 3, name: '1/4th' };
            this.n4 = { id: 4, name: '1/3rd' };
            this.n6 = { id: 6, name: '1/2' };
            this.n8 = { id: 8, name: '2/3rds' };
            this.n9 = { id: 9, name: '3/4ths' };
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
            this.inputSizing = new inputSizing;
            this.gridSizing = new gridSizing;
            this.gridColumns = new gridColumns;
            this.offsetColumns = new offsetColumns;
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
            this.quote = { id: 'quote', name: 'Quote' };
            this.rate = { id: 'rate', name: 'Rate' };
            this.deposit = { id: 'deposit', name: 'Deposit' };
        }
        return widgetType;
    }());
    var contactFields = (function () {
        function contactFields() {
            this.clientid = { id: 'clientid', name: 'Client ID', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwClientId', value: 'ClientId###' } };
            this.userid = { id: 'userid', name: 'User Id', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'input', type: 'hidden', id: 'ltwUserId', value: 'UserId###' } };
            this.firstname = { id: 'firstname', name: 'First Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwFirstName', placeholder: 'First Name', required: true } };
            this.lastname = { id: 'lastname', name: 'Last Name', isLTRequired: true, fieldTemplate: { element: 'input', type: 'text', id: 'ltwLastName', placeholder: 'Last Name', required: true } };
            this.email = { id: 'email', name: 'Email', isLTRequired: true, fieldTemplate: { element: 'input', type: 'email', id: 'ltwEmail', placeholder: 'Email', required: true } };
            this.phone = { id: 'phone', name: 'Phone', fieldTemplate: { element: 'input', type: 'tel', id: 'ltwPhone', placeholder: 'Phone Number', pattern: '[\\d\\s()-]{7,14}' } };
            this.company = { id: 'company', name: 'Company', fieldTemplate: { element: 'input', type: 'text', id: 'ltwCompany', placeholder: 'Company' } };
            this.state = { id: 'state', name: 'State', fieldTemplate: { element: 'select', type: 'state', id: 'ltwState', placeholder: 'Select a State' } };
            this.comments = { id: 'comments', name: 'Comments', fieldTemplate: { element: 'textarea', id: 'ltwComments', placeholder: 'Comments', rows: 4 } };
            this.captcha = { id: 'captcha', name: 'Captcha', fieldTemplate: { element: 'captcha' } };
            this.submit = { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'button', type: 'submit', id: 'ltwSubmit', cssClass: 'btn-primary', value: 'Submit' } };
            this.successmessage = { id: 'successmessage', name: 'Success Message Upon Submit', fieldTemplate: { element: 'div', type: 'successmessage', id: 'ltwSuccessMessage', fontSize: 20, value: 'Thank you. You will be contacted shortly.' } };
            this.label = { id: 'label', name: 'Label', allowMultiples: true, fieldTemplate: { element: 'label', value: 'label' } };
            this.title = { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { element: 'title', value: 'title' } };
            this.paragraph = { id: 'paragraph', name: 'Paragraph', allowMultiples: true, fieldTemplate: { element: 'p', value: 'paragraph text' } };
            for (var fieldName in this) {
                var contactField = this[fieldName];
                if (contactField.isLTRequired) {
                    contactField.fieldTemplate.required = contactField.isLTRequired;
                }
            }
        }
        return contactFields;
    }());
    var depositFields = (function () {
        function depositFields() {
            this.depositterm = { id: 'depositterm', name: 'Term', isLTRequired: true, fieldTemplate: { element: 'select', type: 'depositterm', id: 'ltwDepositTerm', placeholder: 'Select a Term' } };
            this.depositamount = { id: 'depositamount', name: 'Amount', isLTRequired: true, fieldTemplate: { element: 'select', type: 'depositamount', id: 'ltwDepositAmount', placeholder: 'Select Amount' } };
            this.submit = { id: 'submit', name: 'Submit', isLTRequired: true, hideFromList: true, fieldTemplate: { element: 'button', type: 'submit', id: 'ltwSubmit', cssClass: 'btn-primary', value: 'Submit' } };
            this.captcha = { id: 'captcha', name: 'Captcha', fieldTemplate: { element: 'captcha' } };
            this.label = { id: 'label', name: 'Label', allowMultiples: true, fieldTemplate: { element: 'label', value: 'label' } };
            this.title = { id: 'title', name: 'Title', allowMultiples: true, fieldTemplate: { element: 'title', value: 'title' } };
            this.paragraph = { id: 'paragraph', name: 'Paragraph', allowMultiples: true, fieldTemplate: { element: 'p', value: 'paragraph text' } };
            for (var fieldName in this) {
                var depositField = this[fieldName];
                if (depositField.isLTRequired) {
                    depositField.fieldTemplate.required = depositField.isLTRequired;
                }
            }
        }
        depositFields.prototype.asArray = function () {
            return helpers.prototype.ConvertObjectToArray(this);
        };
        return depositFields;
    }());
    var postObjects = (function () {
        function postObjects() {
        }
        postObjects.prototype.contact = function () {
            return new LoanTekWidget.PostObject_Contact;
        };
        postObjects.prototype.deposit = function () {
            return {};
        };
        return postObjects;
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
            this.defaultVerticalSpacing = 15;
            this.defaultFormSpecifierClass = 'ltwF';
            this.defaultResultSpecifierClass = 'ltwR';
            this.contactFields = new contactFields;
            this.contactFieldsArray = this.ConvertObjectToArray(this.contactFields);
            this.depositFields = new depositFields;
            this.postObjects = new postObjects;
        }
        helpers.prototype.isNumber = function (numCheck) {
            return typeof numCheck === 'number';
        };
        helpers.prototype.isStringNullOrEmpty = function (stringCheck) {
            return stringCheck === '' || typeof stringCheck !== 'string';
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
                a: function () { return $('<a/>'); },
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
