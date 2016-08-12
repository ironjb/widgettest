var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);
var LoanTekWidget;
(function (LoanTekWidget) {
    var BuilderHelpers = (function () {
        function BuilderHelpers() {
        }
        BuilderHelpers.prototype.arrayMove = function (arr, oldIndex, newIndex) {
            while (oldIndex < 0) {
                oldIndex += arr.length;
            }
            while (newIndex < 0) {
                newIndex += arr.length;
            }
            if (newIndex >= arr.length) {
                newIndex = arr.length;
            }
            window.console && console.log('oldIndex', oldIndex, 'newIndex', newIndex);
            arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
            return arr;
        };
        return BuilderHelpers;
    }());
    LoanTekWidget.BuilderHelpers = BuilderHelpers;
    var LoadScriptsInSequence = (function () {
        function LoadScriptsInSequence(scriptSrcArray, scriptRootDirectory, callback) {
            var _thisC = this;
            _thisC._scriptSrcArray = scriptSrcArray || null;
            _thisC._scriptRootDirectory = scriptRootDirectory || '';
            _thisC._callbackFunction = callback || null;
            ;
            _thisC._lth = LoanTekWidgetHelper;
        }
        LoadScriptsInSequence.prototype.addSrc = function (src) {
            this._scriptSrcArray.push(src);
            return this;
        };
        LoadScriptsInSequence.prototype.run = function () {
            var _thisC = this;
            var $ = _thisC._lth.$;
            var el = _thisC._lth.CreateElement();
            var currentIndex = 0;
            var lastIndex = this._scriptSrcArray.length - 1;
            var body = $('body')[0];
            function loadScript(i) {
                var scriptSrc = _thisC._scriptSrcArray[i];
                var script = el.script(_thisC._scriptRootDirectory + scriptSrc)[0];
                script.onload = function () {
                    if (currentIndex < lastIndex) {
                        currentIndex += 1;
                        loadScript(currentIndex);
                    }
                    else {
                        if (_thisC._callbackFunction) {
                            _thisC._callbackFunction();
                        }
                    }
                };
                script.onerror = function (error) {
                    window.console && console.error('error getting script. mission aborted.', error);
                };
                body.appendChild(script);
            }
            loadScript(currentIndex);
        };
        return LoadScriptsInSequence;
    }());
    LoanTekWidget.LoadScriptsInSequence = LoadScriptsInSequence;
})(LoanTekWidget || (LoanTekWidget = {}));
