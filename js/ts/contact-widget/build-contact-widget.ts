interface IFormObject {
	formId: string;
	baseOptions: {
		formSize: string
	},
	fields: IField[];
}

interface IField {
	id: string;
	type: string;
	placeholder?: string;
	required: boolean
}

class LoanTekBuildForm {


	constructor(elementSelector: string, formObj: IFormObject) {
		var el = {
			div: () => { return ltjQuery('div'); },
			form: () => { return ltjQuery('form').addClass('form-horizontal'); },
			button: (btnClass: string = 'default', type: string = 'button') => { return ltjQuery('button').addClass('btn btn-' + btnClass); },
			select: () => { return ltjQuery('select'); },
			option: () => { return ltjQuery('option'); },
			input: (type: string) => {
				return ltjQuery('input');
			},
			textarea: () => { return ltjQuery('textarea'); },
			col: (colNumber: number = 12) => { return el.div().addClass('.col-sm-' + colNumber.toString()); },
			row: (colNumber?: number) => {
				if (colNumber) {
					return el.div().addClass('.row').append(el.col(colNumber));
				} else {
					return el.div().addClass('.row');
				}
			}
		};
		var returnForm = el.form();

		ltjQuery.each(formObj.fields, (i, fieldItem) => {
			var newField;
			switch (fieldItem.type) {
				case 'submit':
					break;
				default:
			}
			returnForm.append(el.div().addClass('form-group').append(newField));
		});

		var returnDiv = el.div().addClass('ltcw container-fluid').append(returnForm);

		ltjQuery(elementSelector).empty().replaceWith(returnDiv);
	}
}