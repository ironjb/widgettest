namespace LoanTekWidget{
	export class PostObject_MortgageRate {
		UserId: number;
		ClientDefinedIdentifier: string;
		PassThroughItems: any[];
		LoanRequest: {
			QuotingChannel: number | string;
			LoanPurpose: number | string;
			ZipCode: string;
			LoanAmount: number;
			LoanToValue: number;
			CreditScore: number;
			PropertyUsage: number | string;
			PropertyType: number | string;
			VAType?: boolean;
		};
		CustomQuoteResponseJson: string;	// JSON string representing only the data fields that you want to be returned
		constructor() {
			this.ClientDefinedIdentifier = 'LTWS_UniqueIdentifier';
			this.LoanRequest = {
				QuotingChannel: null
				, LoanPurpose: null
				, ZipCode: null
				, LoanAmount: null
				, LoanToValue: null
				, CreditScore: null
				, PropertyUsage: null
				, PropertyType: null
			};
			this.CustomQuoteResponseJson = '{ "APR": null, "CalcPrice": null, "FinalFees": null, "InterestRate": null, "PIP": null, "ProductTermType": null, "TermInMonths": null }';
		}
	}
}
