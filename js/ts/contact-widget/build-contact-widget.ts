interface IFormObject {
	formId: string;
	baseOptions: {
		formSize: string
	},
	fields: IField[];
}

interface IField {
	element: string;
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
		var startRow = null;
		var colCount = 0;

		ltjQuery.each(formObj.fields, (i, elementItem) => {
			window.console && console.log(i, elementItem);
			if (!startRow) {
				startRow = el.row()
			}
			var newElement;
			// switch (elementItem.element) {
			// 	case 'button':
			// 		newElement = el.row(12).append(el.button());
			// 		break;
			// 	default:
			// }
			returnForm.append(newElement);
		});

		var returnDiv = el.div().addClass('ltcw container-fluid').append(returnForm);

		ltjQuery(elementSelector).empty().replaceWith(returnDiv);

		function CreateFormElement(elementObj) {
			var returnElement = null;
			// switch (elementObj.element) {
			// 	case 'button':
			// 		// code...
			// 		break;
			// 	case
			// 	default:
			// 		// code...
			// 		break;
			// }
		}
	}
}