/// <reference path="../../../../Scripts/typings/tsd.d.ts" />
/// <reference path="../common/widget-helpers.ts" />

declare namespace IWidgetBuilder {
	interface IFieldExtended {
		index: number;
		fieldOptions: IWidgetFieldOptions;
		additionalInfoIndex: number;
	}
}

interface IWidgetModelData {
	scriptsDomain?: string;
	modelUrls?: string[];
	modelWidget?: IWidgetModelDataModelWidget;
	widgetTemplates?: IWidgetModelDataTemplate[];
}

interface IWidgetModelDataModelWidget {
	Id?: number;
	Name?: string;
	WidgetType?: string;
	ClientId?: number;
	UserId?: number;
	OwnerId?: number;
	ScriptText?: string;
	LastModifiedByUserID?: number;
	LastModifiedDate?: string;
	Active?: boolean;
}

interface IWidgetModelDataTemplate {
	WidgetTypeType?: number;
	Id?: number;
	//ID?: number;
	OwnerId?: number;
	WidgetType?: string;
	ScriptText?: string;
	LastModifiedDate?: any;
	LastModifiedByUserID?: number;
	Name?: string;
	Active?: boolean;
}

interface IWidget {
	widgetType?: string;
	allFieldsObject?: Object;
	allFieldsOptionsArray?: IWidgetFieldOptions[];
	allResultFieldsObject?: Object;
	allResultFieldsOptionsArray?: IWidgetFieldOptions[];
	prebuiltForms?: IWidgetFormObject[];
	fieldHelperType?: string;
}

interface IWidgetFormObject {
	name?: string;
	buildObject?: IWidgetFormBuildObject;
	resultObject?: LTWidget.IResultBuildOptions;

	// Part of Repeating form object
	field?: string;
	fieldListOptions?: LTWidget.IFieldListOptions;
}

interface IWidgetOnDragStart {
	(event: Event, ui: JQueryUI.DraggableEventUIParams, data: IWidgetOnDragStartData): void;
}

interface IWidgetOnDragStartData {
	index?: number;
	field?: string;
}

interface IWidgetOnDrop {
	(event: Event, ui: JQueryUI.DroppableEventUIParam, index: number, channel: string, columns?: number, isPlaceholder?: boolean): void;
}

interface IWidgetEditFormInfo {
	formObjectType?: string;
	currentForm?: IWidgetFormObject;
	clearSelectedForm?(): void;
	setCurrentForm?(currentForm: IWidgetFormObject): void;
	buildScript?: IWidgetScriptBuildFunction;
}

interface IWidgetEditFieldData {
	widgetTypeLower?: string;
	currentForm?: IWidgetFormObject;
	clearSelectedForm?(): void;
	onDragStart: IWidgetOnDragStart;
	setCurrentForm?(currentForm: IWidgetFormObject): void;
	buildScript?: IWidgetScriptBuildFunction;
}

interface IWidgetBuilderNgScope extends ng.IScope, IWidget {
	ngModelOptions?: Object;
	currentForm?: IWidgetFormObject;
	currentFormStr?: string;
	SaveWidget?(saveAsNew?: boolean): void;
	RevertWidget?(): void;
	UsePrebuiltForm?(): void;
	UpdateWidgetDisplay?(): void;
	WidgetScriptBuild?: IWidgetScriptBuildFunction;
	UpdateWidget?(): void;
	ClearSelectedForm?(): void;
	SetCurrentForm?(currentForm: IWidgetFormObject): void;
	FilterAvailableFields?(value, index, array): boolean;
	RemoveField?(index: number, formObjectType: string): void;
	addField?(fieldId: string, channel: string): void;
	onDragStart?: IWidgetOnDragStart;
	onDrop?: IWidgetOnDrop;
	FilterHiddenFormFields?(value, index, array): boolean;
	FieldExtended?(field: IWidgetField, formObjectType: string, fieldObjectType: string): IWidgetBuilder.IFieldExtended;
	selectedForm?: IWidgetFormObject;
	passedModelForm?: IWidgetModelDataModelWidget;
	widgetObject?: IWidget;
	widgetScript?: string;
	widgetScriptDisplay?: string;
	widgetScriptParse?: string;
	scriptChangedClass?: string;
	editFormInfo?: IWidgetEditFormInfo;
	editResultInfo?: IWidgetEditFormInfo;
	editFieldData?: IWidgetEditFieldData;
	dragData?: IWidgetOnDragStartData;
	isExistingModel?: boolean;
}

interface IWidgetScriptBuildFunction {
	(widgetFormObject?: IWidgetFormObject): void;
}

var LoanTekWidgetHelper = LoanTekWidgetHelper || new LoanTekWidget.helpers(jQuery);

namespace LoanTekWidget {
	export class WidgetBuilder {

		constructor($: JQueryStatic, widgetData: IWidgetModelData) {
			var _thisC = this;
			var lth: LoanTekWidget.helpers = LoanTekWidgetHelper;
			var ltbh: LoanTekWidget.BuilderHelpers = new LoanTekWidget.BuilderHelpers();
			var el = lth.CreateElement();
			var ngModelOptions = { updateOn: 'default blur', debounce: { default: 1000, blur: 0 } };

			$('input textarea').placeholder();

			var widgetObj: IWidget = { allFieldsObject: null, allFieldsOptionsArray: null, allResultFieldsObject: null, allResultFieldsOptionsArray: null, prebuiltForms: null };

			if (widgetData.modelWidget.WidgetType.toLowerCase() === 'quotewidget') {
				widgetObj.widgetType = lth.widgetType.quote.id;
				// TODO: code for quote widget
			} else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'ratewidget') {
				widgetObj.widgetType = lth.widgetType.rate.id;
				// TODO: code for rate widget
			} else if (widgetData.modelWidget.WidgetType.toLowerCase() === 'depositwidget') {
				widgetObj.fieldHelperType = 'depositFields';
				widgetObj.widgetType = lth.widgetType.deposit.id;
				widgetObj.allFieldsObject = lth.depositFields;
				widgetObj.allFieldsOptionsArray = lth.depositFields.asArray();
				widgetObj.allResultFieldsObject = lth.depositResultFields;
				widgetObj.allResultFieldsOptionsArray = lth.depositResultFields.asArray();
			} else {
				widgetObj.fieldHelperType = 'contactFields';
				widgetObj.widgetType = lth.widgetType.contact.id;
				widgetObj.allFieldsObject = lth.contactFields;
				widgetObj.allFieldsOptionsArray = lth.contactFieldsArray;
			}

			widgetObj.prebuiltForms = [];
			for (var iwt = 0, wtl = widgetData.widgetTemplates.length; iwt < wtl; iwt++) {
				var wTemplate: IWidgetModelDataTemplate = widgetData.widgetTemplates[iwt];
				if (wTemplate.Active) {
					widgetObj.prebuiltForms.push(JSON.parse(wTemplate.ScriptText));
				}
			}

			// Angular App
			var widgetBuilderApp: ng.IModule = angular.module('WidgetBuilderApp', ['ui.bootstrap', 'colorpicker.module', 'ngDragDrop', 'ngAnimate', 'lt.services', 'ltw.services', 'ltw.directives', 'ltw.templates']);

			// Angular Widget Controller
			widgetBuilderApp.controller('WidgetBuilderController', ['$scope', '$timeout', 'commonServices', 'widgetServices', function ($scope: IWidgetBuilderNgScope, $timeout, commonServices: ICommonNgServices, widgetServices: IWidgetNgServices) {
				var wwwRoot = (widgetData.scriptsDomain) ? widgetData.scriptsDomain.replace(/http:\/\/|https:\/\//, '//') : '//client.loantek.com';
				var ltWidgetCSS: string[] = ['/Content/widget/css'];
				var widgetScripts: string[] = ['/bundles/widget/widget'];

				if (window.location.port === '58477' || window.location.port === '8080') {
					ltWidgetCSS = ['/Areas/Widgets/Content/widget.css', '/Areas/Widgets/Content/lt-captcha.css'];
					widgetScripts = [
						'/Scripts/lib/jquery-1/jquery.min.js'
						, '/Scripts/lib/jquery/jquery.placeholder.min.js'
						, '/Areas/Widgets/Scripts/post-object/contact.js'
						, '/Areas/Widgets/Scripts/post-object/deposit.js'
						, '/Areas/Widgets/Scripts/common/lt-captcha.js'
						, '/Areas/Widgets/Scripts/common/widget-helpers.js'
						, '/Areas/Widgets/Scripts/widget/widget.js'
					]
				}

				var scriptHelpersCode = `
					var ltjq = ltjq || jQuery.noConflict(true);
					var lthlpr = new LoanTekWidget.helpers(ltjq);`;

				var scriptLoader = function () {
					var loadScripts = new LoanTekWidget.LoadScriptsInSequence(widgetScripts, wwwRoot, function () {
						var body = $('body')[0];
						var script = el.script().html(scriptHelpersCode)[0];
						body.appendChild(script);
						$scope.UpdateWidgetDisplay();
					});

					loadScripts.run();
				};

				// When editing existing widget script
				if (widgetData.modelWidget.Id && widgetData.modelWidget.ScriptText) {
					$scope.passedModelForm = widgetData.modelWidget;
					$scope.currentForm = JSON.parse(widgetData.modelWidget.ScriptText);
					$scope.isExistingModel = true;
				}

				$scope.ngModelOptions = ngModelOptions;
				$scope.fieldHelperType = angular.copy(widgetObj.fieldHelperType);
				$scope.allFieldsObject = angular.copy(widgetObj.allFieldsObject);
				$scope.allFieldsOptionsArray = angular.copy(widgetObj.allFieldsOptionsArray);
				if (widgetObj.allResultFieldsObject) {
					$scope.allResultFieldsObject = angular.copy(widgetObj.allResultFieldsObject);
					$scope.allResultFieldsOptionsArray = angular.copy(widgetObj.allResultFieldsOptionsArray);
				}

				$scope.WidgetScriptBuild = WidgetScriptBuild;
				$scope.SaveWidget = SaveWidget;
				$scope.RevertWidget = RevertWidget;
				$scope.UsePrebuiltForm = UsePrebuiltForm;
				$scope.ClearSelectedForm = ClearSelectedForm;
				$scope.SetCurrentForm = SetCurrentForm;
				$scope.addField = addField;
				$scope.FilterAvailableFields = FilterAvailableFields;
				$scope.onDragStart = onDragStart;
				$scope.onDrop = onDrop;
				$scope.FilterHiddenFormFields = FilterHiddenFormFields;
				$scope.FieldExtended = FieldExtended;
				$scope.UpdateWidget = UpdateWidget;
				$scope.RemoveField = RemoveField;
				BuilderInit();

				$scope.$watchGroup(['currentForm', 'currentForm.buildObject.fields.length', 'currentForm.resultObject.fields.length'], (newValue) => {
					// Checks Available Fields to see if they have been added to widget
					for (var i = $scope.allFieldsOptionsArray.length - 1; i >= 0; i--) {
						var field = $scope.allFieldsOptionsArray[i];
						var cIndex = lth.GetIndexOfFirstObjectInArray($scope.currentForm.buildObject.fields, 'field', field.id);
						field.isIncluded = !!(cIndex >= 0);
					}

					if ($scope.allResultFieldsOptionsArray){
						for(var j = $scope.allResultFieldsOptionsArray.length -1; j >= 0; j--) {
							var rField = $scope.allResultFieldsOptionsArray[j];
							var rIndex = lth.GetIndexOfFirstObjectInArray($scope.currentForm.resultObject.fields, 'field', rField.id);
							rField.isIncluded = !!(rIndex >= 0);
						}
					}
				});

				function SaveWidget(saveAsNew: boolean) {
					var saveData: IWidgetModelDataModelWidget = angular.copy(widgetData.modelWidget);
					if ($scope.passedModelForm && $scope.passedModelForm.Name && !saveAsNew) {
						$scope.currentForm.name = $scope.passedModelForm.Name;
					}
					$scope.currentFormStr = JSON.stringify($scope.currentForm);
					saveData.ScriptText = $scope.currentFormStr;

					var postData = {
						httpOptions: { method: 'POST', url: '/Widgets/Builder/Save?v=' + new Date().getTime(), data: saveData },
						onSuccessFunction: function (result) {
							if (result.data.DataObject.Id !== widgetData.modelWidget.Id) {
								location.assign('/Widgets/Builder/Index/' + result.data.DataObject.Id);
							}
						},
						onErrorFunction: function (error) {
							window.console && console.error('error save result', error);
						}
					};

					if (saveAsNew || !saveData.Name) {
						postData.httpOptions.url = '/Widgets/Builder/SaveAsNew?v=' + new Date().getTime();
						var promptOptions: CommonNgServices.IModalPromptInfo = { promptOptions: { message: 'Enter a new name for this Widget.', title: 'Name:'}};
						promptOptions.onOk = function (result) {
							saveData.Name = result;
							commonServices.dataProcessingModal([postData]);
						};
						commonServices.promptModal(promptOptions);
					} else {
						commonServices.dataProcessingModal([postData]);
					}
				}

				function RevertWidget() {
					$scope.currentForm = JSON.parse(widgetData.modelWidget.ScriptText);
					$scope.WidgetScriptBuild($scope.currentForm);
					$scope.ClearSelectedForm();
				}

				function onDragStart(event: Event, ui: JQueryUI.DraggableEventUIParams, data: IWidgetOnDragStartData) {
					$scope.dragData = data;
				}

				function onDrop(event: Event, ui: JQueryUI.DroppableEventUIParam, dropIndex: number, channel?: string, columns?: number, isPlaceholder?: boolean) {
					channel = channel || 'form';
					var currentObject = (channel === 'result') ? 'resultObject' : 'buildObject';
					if ($scope.dragData.field) {
						var newField: IWidgetField = { field: $scope.dragData.field };
						if (columns) {
							newField.cols = columns;
						}
						$scope.currentForm[currentObject].fields.splice(dropIndex + 1, 0, newField);
						$scope.ClearSelectedForm();
						$scope.WidgetScriptBuild($scope.currentForm);
					} else if (lth.isNumber($scope.dragData.index)) {
						var previousIndex = $scope.dragData.index;
						if (previousIndex > dropIndex && isPlaceholder) {
							dropIndex += 1;
						}

						ltbh.arrayMove($scope.currentForm[currentObject].fields, previousIndex, dropIndex);

						if (columns) {
							$scope.currentForm[currentObject].fields[dropIndex].cols = columns;
						}

						$scope.ClearSelectedForm();
						$scope.WidgetScriptBuild($scope.currentForm);
					} else {
						window.console && console.error('No Data Passed from Draggable!!');
					}
				}

				function addField(fieldId: string, channel: string) {
					channel = channel || 'form';
					var currentObject: string;
					var fieldToAdd: Object;
					if (channel === 'result') {
						currentObject = 'resultObject';
						fieldToAdd = { field: $scope.allResultFieldsObject[fieldId].id };
					} else {
						currentObject = 'buildObject';
						fieldToAdd = { field: $scope.allFieldsObject[fieldId].id };
					}
					$scope.currentForm[currentObject].fields.push(fieldToAdd);
					$scope.WidgetScriptBuild($scope.currentForm);
				}

				function FilterAvailableFields(field: IWidgetFieldOptions, index: number, fieldArray: IWidgetFieldOptions[]): boolean {
					var isInList = true;
					if (field.groupName) {
						for (var i = fieldArray.length - 1; i >= 0; i--) {
							var iField: IWidgetFieldOptions = fieldArray[i];
							if (field.groupName === iField.groupName && iField.isIncluded) {
								isInList = false;
							}
						}
					} else {
						isInList = !field.hideFromList && !(!!field.isIncluded && !field.allowMultiples);
					}
					return isInList;
				}

				function FilterHiddenFormFields(fieldObj: IWidgetField, index: number, fieldArray: IWidgetField[]): boolean {
					var isHiddenField: boolean = false;
					var fOption: IWidgetFieldOptions = widgetObj.allFieldsObject[fieldObj.field];
					if (fOption.fieldTemplate.element === 'input' && fOption.fieldTemplate.type === 'hidden') {
						isHiddenField = true;
					}
					return isHiddenField;
				}

				function FieldExtended(fieldObj: IWidgetField, formObjectType: string, fieldObjectType: string): IWidgetBuilder.IFieldExtended {
					var fIndex = $scope.currentForm[formObjectType].fields.indexOf(fieldObj);
					var fieldOpts: IWidgetFieldOptions = lth[fieldObjectType][fieldObj.field];
					var customFieldNameIndex: number = null;

					if (fieldOpts.id === 'customhidden') {
						fieldObj.attrs = fieldObj.attrs || [];
						customFieldNameIndex = lth.GetIndexOfFirstObjectInArray(fieldObj.attrs,'name', 'data-lt-additional-info-key');
						if (customFieldNameIndex === -1) {
							fieldObj.attrs.push({ name: 'data-lt-additional-info-key', value: '' });
							customFieldNameIndex = lth.GetIndexOfFirstObjectInArray(fieldObj.attrs,'name', 'data-lt-additional-info-key');
						}
					}
					return { index: fIndex, fieldOptions: fieldOpts, additionalInfoIndex: customFieldNameIndex };
				}

				function RemoveField(index: number, formObjectType: string) {
					// Creates Confirm modal before removing. Removes field on affirmation.
					var confirmRemove: CommonNgServices.IModalConfirmInfo = {
						confirmOptions: {
							title: 'Remove:'
							, headerStyle: 'alert alert-danger'
							, message: 'Are you sure you want to remove?'
						}
						, onConfirm: function() {
							$scope.currentForm[formObjectType].fields.splice(index, 1);
							UpdateWidget();
						}
					};
					commonServices.confirmModal(confirmRemove);
				}

				function UpdateWidget() {
					WidgetScriptBuild($scope.currentForm);
				}

				function UsePrebuiltForm() {
					$scope.selectedForm = $scope.selectedForm || $scope.widgetObject.prebuiltForms[0];		// selects first template if not selected already
					$scope.currentForm = angular.copy($scope.selectedForm);
					$scope.WidgetScriptBuild($scope.currentForm);
				}

				function BuilderInit() {
					$scope.widgetObject = angular.copy(widgetObj);
					if ($scope.currentForm) {
						$scope.WidgetScriptBuild($scope.currentForm);
					} else {
						$scope.UsePrebuiltForm();
					}
				}

				function ClearSelectedForm() {
					$scope.selectedForm = { name: 'modified' };
				}

				function SetCurrentForm(currentForm: IWidgetFormObject) {
					$scope.currentForm = currentForm;
				}

				function WidgetScriptBuild(currentFormObj: IWidgetFormObject) {
					currentFormObj.buildObject.widgetType = widgetObj.widgetType;
					if (currentFormObj.resultObject) {
						currentFormObj.resultObject.widgetType = widgetObj.widgetType;
					}

					$scope.editFieldData = {
						widgetTypeLower: widgetData.modelWidget.WidgetType.toLowerCase()
						, currentForm: $scope.currentForm
						, clearSelectedForm: $scope.ClearSelectedForm
						, onDragStart: $scope.onDragStart
						, setCurrentForm: $scope.SetCurrentForm
						, buildScript: $scope.WidgetScriptBuild
					};

					$scope.editFormInfo = {
						formObjectType: 'buildObject'
						, currentForm: $scope.currentForm
						, clearSelectedForm: $scope.ClearSelectedForm
						, setCurrentForm: $scope.SetCurrentForm
						, buildScript: $scope.WidgetScriptBuild
					};

					$scope.editResultInfo = angular.copy($scope.editFormInfo);
					$scope.editResultInfo.formObjectType = 'resultObject';

					var cfo: IWidgetFormObject = angular.copy(currentFormObj);
					var cbo: IWidgetFormBuildObject = angular.copy(cfo.buildObject);
					var cbod: IWidgetFormBuildObject = angular.copy(cfo.buildObject);
					var cro: LTWidget.IResultBuildOptions = (cfo.resultObject) ? angular.copy(cfo.resultObject) : null;
					var crod: LTWidget.IResultBuildOptions = (cfo.resultObject) ? angular.copy(cfo.resultObject): null;
					var wScript: string = '<style type="text/css">.ltw {display:none;}</style>';
					var wScriptDisplay: string = wScript;
					var hasCaptchaField = lth.GetIndexOfFirstObjectInArray(cbo.fields, 'field', 'captcha') >= 0;
					var fnReplaceRegEx = /"#fn{[^\}]+}"/g;
					var formStyles = '';
					cbod.showBuilderTools = true;
					if (crod) {
						crod.showBuilderTools = true;
					}
					cbo.postDOMCallback = '#fn{postDOMFunctions}';
					cbod.postDOMCallback = '#fn{postDOMFunctions}';

					// Add CSS files
					for (var iCss = 0, lCss = ltWidgetCSS.length; iCss < lCss; iCss++) {
						var cssHref = ltWidgetCSS[iCss];
						var cssLink = lth.Interpolate('\n<link rel="stylesheet" href="#{href}">', { href: wwwRoot + cssHref });
						wScript += cssLink;
						wScriptDisplay += cssLink;
					}

					// Add Widget Wrapper
					var widgetWrapper = '\n<div id="ltWidgetWrapper"></div>';
					if (cro) {
						widgetWrapper += '\n<div id="ltWidgetResultWrapper"></div>';
					}
					wScript += widgetWrapper;
					wScriptDisplay += widgetWrapper;

					// Add scripts
					for (var iScript = 0, lScript = widgetScripts.length; iScript < lScript; iScript++) {
						var scriptSrc = widgetScripts[iScript];
						var scriptLink = lth.Interpolate('\n<script type="text/javascript" src="#{src}"></script>', { src: wwwRoot + scriptSrc });
						wScript += scriptLink;

						// DO NOT ADD to wScriptDisplay, it will cause a "Synchronous XMLHttpRequest..." error
						// Instead, each of these scripts should be added already via the LoadScriptsInSequence function.
					}

					// Build Main Script
					var mainScript = '';
					var mainScriptDisplay = '';

					// Add jQuery and LoanTek Widget Helpers
					mainScript += scriptHelpersCode;

					// Captcha var
					var captchaVar = `
						var ltCap;`;
					if (hasCaptchaField) {
						mainScript += captchaVar;
						mainScriptDisplay += captchaVar;
					}

					// PostDOMFunctions
					var postDomCode = '/*code ran after DOM created*/', postDomFn = `
						var pdfun = function () {
							#{code}
						};`;
					if (hasCaptchaField) {
						postDomCode += `
							ltCap = new LoanTekCaptcha(ltjq);`;
					}
					mainScript += lth.Interpolate(postDomFn, { code: postDomCode });
					mainScriptDisplay += lth.Interpolate(postDomFn, { code: postDomCode });

					// External Validator
					var extValid_mainScript: string, extValid_mainScriptDisplay: string;
					var extValid = `
						var ev = function () {
							#{validReturn}
						};`;
					if (hasCaptchaField) {
						extValid_mainScript = lth.Interpolate(extValid, { validReturn: 'return ltCap.IsValidEntry();' });
						extValid_mainScriptDisplay = lth.Interpolate(extValid, { validReturn: `return ltCap.IsValidEntry() && false;` });
					} else {
						extValid_mainScript = lth.Interpolate(extValid, { validReturn: 'return true;' });
						extValid_mainScriptDisplay = lth.Interpolate(extValid, { validReturn: `return false;` });
					}
					mainScript += extValid_mainScript;
					mainScriptDisplay += extValid_mainScriptDisplay;

					// Add buildObject to mainScript
					var buildObjectWrap = `
						var ltwbo = #{bow};`;
					var cboString = JSON.stringify(cbo/*, null, 2*/);
					var cbodString = JSON.stringify(cbod/*, null, 2*/);
					mainScript += lth.Interpolate(buildObjectWrap, { bow: cboString });
					mainScriptDisplay += lth.Interpolate(buildObjectWrap, { bow: cbodString });

					// Widget Options Object setup
					var ltWidgetOptions: any = {
						// postUrl: 'http://node-cors-server.herokuapp.com/no-cors',
						// postUrl: 'http://node-cors-server.herokuapp.com/simple-cors',
						// postUrl: '/widgets/home/angulartemplates/jsonSuccess',
						// redirectUrl: 'http://www.google.com',
						// successMessage: 'Yay!!! Successful POST',
						postUrl: widgetData.modelUrls[0]
						, externalValidatorFunction: '#fn{externalValidators}'
						, clientId: widgetData.modelWidget.ClientId
						, userId: widgetData.modelWidget.UserId
					};

					// //Test for amending POST data. this functionality may be added in later.
					// if (window.location.port === '58477') {
					// 	ltWidgetOptions.AdditionalPostData = {
					// 		Source: {
					// 			SubName: 'Testing ability to amend POST data'
					// 		}
					// 		, MiscData: [
					// 			{ Name: 'TestMisc_Name', Value: 'TestMisc_Value' }
					// 		]
					// 	};
					// }

					var ltWidgetOptionsWrap = `
						var ltwo = #{cwow};`;
					var ltWidgetOptionsWithResultsObject = angular.copy(ltWidgetOptions);
					var ltWidgetOptionsWithResultsObjDisplay = angular.copy(ltWidgetOptions);
					if (cro) {
						ltWidgetOptionsWithResultsObject.resultDisplayOptions = cro;
					}
					if (crod) {
						ltWidgetOptionsWithResultsObjDisplay.resultDisplayOptions = crod;
					}
					mainScript += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptionsWithResultsObject) });
					mainScriptDisplay += lth.Interpolate(ltWidgetOptionsWrap, { cwow: JSON.stringify(ltWidgetOptionsWithResultsObjDisplay) });

					// Add Execution of Widget
					var widgetBuildForm = `
						var ltwfb = new LoanTekWidget.FormBuild(ltjq, lthlpr, ltwbo, ltwo);`;
					mainScript += widgetBuildForm;
					mainScriptDisplay += widgetBuildForm;

					mainScript = lth.Interpolate(mainScript, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);
					mainScriptDisplay = lth.Interpolate(mainScriptDisplay, { postDOMFunctions: 'pdfun', externalValidators: 'ev' }, null, fnReplaceRegEx);

					// Wrap Main Script
					var mainScriptWrap = `
						<script type="text/javascript">
						(function () {#{m}
						})();
						</script>`;
					mainScript = lth.Interpolate(mainScriptWrap, { m: mainScript });
					mainScriptDisplay = lth.Interpolate(mainScriptWrap, { m: mainScriptDisplay });

					// Add Main Script to rest of code
					wScript += mainScript;
					wScriptDisplay += mainScriptDisplay;
					wScript = wScript.replace(/\s+/gm, ' ');

					// Updates the page display and Script textbox
					$scope.UpdateWidgetDisplay = function () {
						$timeout(function () {
							$scope.widgetScript = wScript;
							$scope.widgetScriptDisplay = wScriptDisplay;

							var widgetEncode = encodeURIComponent($scope.widgetScript);
							$scope.widgetScriptParse = widgetEncode;

							// Scroll to top and indicate change
							// lth.ScrollToAnchor('widgetTop');
							$scope.scriptChangedClass = 't' + new Date().getTime();
						});
					};

					scriptLoader();

					// Redifine 'scriptLoader' after it places needed script tags on page
					scriptLoader = function () {
						$scope.UpdateWidgetDisplay();
					};
				}
			}]);
		}
	}
}
