var LoanTekWidget;
(function (LoanTekWidget) {
    var PostObject_Contact = (function () {
        function PostObject_Contact() {
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
        return PostObject_Contact;
    }());
    LoanTekWidget.PostObject_Contact = PostObject_Contact;
})(LoanTekWidget || (LoanTekWidget = {}));
