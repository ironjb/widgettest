namespace LoanTekWidget {
	export class PostObject_Deposit {
		UserId: number;
		ReturnFailedRequirementRules: boolean;
		ClientDefinedIdentifier: string;
		PassThroughItems: any;
		DepositRequest: {
			RequestId: number;
			Form: {
				ForType: number;
				QuotingChannelType: number;
				Amount: number;
				TermInMonths: number;
				CustomData?: { Name: string; Value: string; }[];
				CustomFields?: any[];
			}
		};
		CustomQuoteResponseJson: any;
		constructor() {
			this.UserId = null;
			this.ReturnFailedRequirementRules = false;
			this.ClientDefinedIdentifier = 'LTWSJavaScriptTimeStamp';
			this.PassThroughItems = null;
			this.DepositRequest = {
				RequestId: null,
				Form: {
					ForType: 130,	// 130 or 'DepositCd'
					QuotingChannelType: 3,	// 3 or 'Loantek'
					Amount: null,
					TermInMonths: null
				}
			};
			this.CustomQuoteResponseJson = null;
		}
	}
}
