interface IWidgets {
	contact?: IWidget;
	quote?: IWidget;
	rate?: IWidget;
}

interface IWidgetAvailableField {
	id?: string;
	name: string;
	isLTRequired?: boolean;
	isIncluded?: boolean;
	allowMultiples?: boolean;
	hideFromList?: boolean;
	fieldTemplate?: IWidgetField;
}

interface IWidgetPrebuiltTemplate {
	name: string;
	formWidth?: number;
	formWidthUnit?: string;
	formGroupSpacing?: number;
	formFieldBorderRadius?: number;
	formButtonBorderRadius?: number;
	template?: IWidgetFormObject;
}

interface IWidget {
	allAvailableFields: IWidgetAvailableField[];
	prebuiltTemplates?: IWidgetPrebuiltTemplate[];
}

interface IWidgetFormObject {
	wrapperId?: string;
	formId?: string;
	errorMessageWrapperId?: string;
	errrorMessageId?: string;
	showBuilderTools?: boolean;
	postDOMCallback?: any;

	fieldSize?: string;
	formBorderType?: string;
	panelTitle?: string;
	fields: IWidgetField[];
}

interface IWidgetField {
	field?: string;
	element?: string;
	id?: string;
	type?: string;
	style?: Object;
	placeholder?: string;
	required?: boolean;
	cols?: number;
	rows?: number;
	cssClass?: string;
	value?: string;
	size?: string;
	pattern?: string;
	alttext?: string;
	tabindex?: number;
}

// interface IWidgetBuildOptions {
// 	wrapperId?: string;
// 	formId?: string;
// 	errorMessageWrapperId?: string;
// 	errrorMessageId?: string;
// 	defaultFormSize?: string;
// 	showBuilderTools?: boolean;
// 	postDOMCallback?: Function;
// }

interface IState {
	abbreviation: string;
	name: string;
}

interface IStates {
	country: string;
	states: IState[];
}