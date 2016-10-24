namespace LoanTekWidget {
	export class PostObject_AutoQuote {
		UserId: number;
		ClientDefinedIdentifier: string;
		PassThroughItems: any[];
		LoanRequest: {
			RequestId?: number;
			Form: {
				ForType?: number | string;
				QuotingChannel?: number | string;
				Amount?: number;
				TermInMonths?: number;
				LoanToValue?: number;
				ZipCode?: string;
				CreditScore?: number;
				LoanPurposeType?: number | string;
				SellerType?: number | string;
				NewOrUsedType?: number | string;
				ModelYear?: number;
				Mileage?: number;
				DebtToIncome?: number;
				IsBusinessLoan?: boolean;
				IsMember?: boolean;
			}
		};
		CustomQuoteResponseJson: any;
		constructor() {
			this.UserId = null;
			this.ClientDefinedIdentifier = 'LTWS_UniqueIdentifier';
			this.PassThroughItems = null;
			this.LoanRequest = {
				Form: {}
			};
			// this.CustomQuoteResponseJson = null;
		}
	}
}