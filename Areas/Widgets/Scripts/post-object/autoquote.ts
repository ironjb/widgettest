namespace LoanTekWidget {
	export class PostObject_AutoQuote {
		UserId: number;
		ClientDefinedIdentifier: string;
		PassThroughItems: any[];
		LoanRequest: {};
		CustomQuoteResponseJson: any;
		constructor() {
			this.UserId = null;
			this.ClientDefinedIdentifier = 'LTWS_UniqueIdentifier';
			this.PassThroughItems = null;
			this.LoanRequest = {};
			this.CustomQuoteResponseJson = null;
		}
	}
}