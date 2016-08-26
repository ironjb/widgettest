namespace LoanTekWidget {
	export class PostObject_Deposit {
		UserId: number;
		ReturnFailedRequirementRules: boolean;
		ClientDefinedIdentifier: string;
		PassThroughItems: any;
		DepositRequest: {
			RequestId: number;
			ForType: number;
			QuotingChannelType: number;
			Amount: number;
			TermInMonths: number;
			CustomData: any;
		};
		CustomQuoteResponseJson: any;
		constructor() {
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
				CustomData: null
			};
			this.CustomQuoteResponseJson = null;
		}
	}
}