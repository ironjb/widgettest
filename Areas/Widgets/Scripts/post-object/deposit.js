var LoanTekWidget;
(function (LoanTekWidget) {
    var PostObject_Deposit = (function () {
        function PostObject_Deposit() {
            this.UserId = null;
            this.ReturnFailedRequirementRules = false;
            this.ClientDefinedIdentifier = 'LTWSJavaScriptTimeStamp';
            this.PassThroughItems = null;
            this.DepositRequest = {
                RequestId: null,
                ForType: null,
                QuotingChannelType: 0,
                Amount: null,
                TermInMonths: null,
                CustomData: null,
                CustomFields: null
            };
            this.CustomQuoteResponseJson = null;
        }
        return PostObject_Deposit;
    }());
    LoanTekWidget.PostObject_Deposit = PostObject_Deposit;
})(LoanTekWidget || (LoanTekWidget = {}));
