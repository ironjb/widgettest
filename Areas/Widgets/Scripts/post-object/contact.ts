
namespace LoanTekWidget {
	export class PostObject_Contact {
		public FileType: string;
		public Reason: string;
		public Source: {
			Active: boolean;
			Alias: string;
			Id: number;
			SourceType: string;
			Name: string;
			SubName: string;
		};
		public NotifyUserOfNewLead: boolean;
		public SendNewLeadInitialWelcomeMessage: boolean;
		public ClientDefinedIdentifier: string;
		public ClientId: number;
		public UserId: number;
		public Persons: {
			PersonCategoryType: string;
			PersonType: string;
			Addresses: {
				State: string;
			}[];
			ContactMethods: {
				ContactType: string;
				Address?: string;
				Number?: string;
			}[];
			Assets: {
				AssetType: string;
				CompanyName: string;
			}[];
			FirstName: string;
			LastName: string;
		}[];
		public MiscData: {
			Name: string;
			Value: string;
		}[];

		constructor() {
			this.FileType = "SalesLead";
			this.Reason = "FORM_VALUE_Comments";
			this.Source = {
				"Active": true,
				"Alias": "LoanTek.com Widgets",
				"Id": 105,
				"SourceType": "LeadSource",
				"Name": "LoanTek Widgets",
				"SubName": "Contact Widget"
			};
			this.NotifyUserOfNewLead = true;
			this.SendNewLeadInitialWelcomeMessage = true;
			this.ClientDefinedIdentifier = "LTWSJavaScriptTimeStamp";
			this.ClientId = 0;
			this.UserId = 0;
			this.Persons = [{
				"PersonCategoryType": "Person",
				"PersonType": "Primary",
				"Addresses": [{
					"State": "FORM_VALUE_State"
				}],
				"ContactMethods": [{
					"ContactType": "Email",
					"Address": "FORM_VALUE_Email"
				}, {
						"ContactType": "Phone",
						"Number": "FORM_VALUE_Phone"
					}],
				"Assets": [{
					"AssetType": "Job",
					"CompanyName": "FORM_VALUE_Company"
				}],
				"FirstName": "FORM_VALUE_FName",
				"LastName": "FORM_VALUE_LName"
			}];
			this.MiscData = [{
				"Name": "AdditionalInformation",
				"Value": "LEAVE_BLANK_FOR_NOW"
			}];
		}
	}
}
