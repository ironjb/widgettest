var LoanTekWidget;
(function (LoanTekWidget) {
    var PostObject_MortgageRate = (function () {
        function PostObject_MortgageRate() {
            this.ClientDefinedIdentifier = 'LTWS_UniqueIdentifier';
            this.LoanRequest = {
                QuotingChannel: null,
                LoanPurpose: null,
                ZipCode: null,
                LoanAmount: null,
                LoanToValue: null,
                CreditScore: null,
                PropertyUsage: null,
                PropertyType: null
            };
            this.CustomQuoteResponseJson = '{ "APR": null, "CalcPrice": null, "FinalFees": null, "InterestRate": null, "PIP": null, "ProductTermType": null, "TermInMonths": null }';
        }
        return PostObject_MortgageRate;
    }());
    LoanTekWidget.PostObject_MortgageRate = PostObject_MortgageRate;
})(LoanTekWidget || (LoanTekWidget = {}));
