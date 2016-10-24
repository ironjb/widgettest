var LoanTekWidget;
(function (LoanTekWidget) {
    var PostObject_AutoQuote = (function () {
        function PostObject_AutoQuote() {
            this.UserId = null;
            this.ClientDefinedIdentifier = 'LTWS_UniqueIdentifier';
            this.PassThroughItems = null;
            this.LoanRequest = {
                Form: {}
            };
        }
        return PostObject_AutoQuote;
    }());
    LoanTekWidget.PostObject_AutoQuote = PostObject_AutoQuote;
})(LoanTekWidget || (LoanTekWidget = {}));
