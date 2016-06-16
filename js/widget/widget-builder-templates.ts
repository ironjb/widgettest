/// <reference path="../../typings/tsd.d.ts" />

(function() {
	angular.module('ltw.templates', []).run(['$templateCache', function($templateCache) {
		$templateCache.put('template/widgetFormEditButton.html', `
			<button type="button" class="btn btn-default btn-xs btn-tool edit-tool-right" data-ng-click="EditWidgetForm();"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
		`);
		$templateCache.put('template/widgetFieldEditButtons.html', `
			<button type="button" class="btn btn-danger btn-xs btn-tool edit-tool-right ng-hide" data-ng-click="RemoveWidgetField();" data-ng-show="showRemove"><span class="glyphicon glyphicon-trash"></span></button>
			<button type="button" class="btn btn-default btn-xs btn-tool edit-tool-right" data-ng-click="EditWidgetField();"><span class="glyphicon glyphicon-pencil"></span></button>
		`);
		$templateCache.put('template/widget/confirmModal.html',`
			<div class="modal-header" data-ng-class="mdlSettings.headerStyle">
				<h3 class="modal-title">{{mdlSettings.title}}</h3>
			</div>
			<div class="modal-body">
				<div data-ng-bind-html="mdlSettings.message"></div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" data-ng-click="okClick();" autofocus="autofocus">{{mdlSettings.okBtnText}}</button>
				<button class="btn btn-default" data-ng-click="cancelClick();">{{mdlSettings.cancelBtnText}}</button>
			</div>
		`);
		$templateCache.put('template/modal/editForm.html', `
			<form class="form-horizontal" data-ng-submit="saveClick();">
				<div class="modal-header alert alert-info">
					<h3 class="modal-title">Edit Widget Form</h3>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-sm-8">
							<!-- .form-group.form-group-sm>label.col-sm-2.control-label[for=ltewFormWidth]{Form Width}+.col-sm-2>input.form-control#ltewFormWidth[type=number name=ltewFormWidth data-ng-model=modForm.formWidth] -->
							<div class="form-group form-group-sm">
								<label for="ltewFormWidth" class="col-sm-4 control-label">Form Width</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<input type="number" min="0" class="form-control" id="ltewFormWidth" name="ltewFormWidth" data-ng-model="modForm.formWidth" />
										<div class="input-group-btn" uib-dropdown="">
											<button class="btn btn-primary" type="button" uib-dropdown-toggle="">{{modForm.formWidthUnit}} <span class="caret"></span></button>
											<ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu="">
												<li></li>
												<li data-ng-repeat="fwunit in formWidthUnits track by fwunit.id"><a href="#" data-ng-click="changeFormWidthUnit($event, fwunit)">{{fwunit.id}} - {{fwunit.name}}</a></li>
											</ul>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="btn-group btn-group-sm"><label for="" class="btn btn-primary" data-ng-model="modForm.formWidthUnit" data-uib-btn-radio="fwunit.id" data-ng-repeat="fwunit in formWidthUnits track by fwunit.id"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{fwunit.name}} </label></div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewBorderType" class="col-sm-4 control-label">Border Type</label>
								<div class="col-sm-6">
									<!-- <select name="ltewBorderType" id="ltewBorderType" class="form-control" data-ng-model="modForm.buildObject.formBorderType" data-ng-options="btype.id as btype.name for btype in borderTypeArray">
										<option value="">None</option>
									</select> -->
									<div class="btn-group btn-group-sm">
										<label class="btn btn-primary" data-ng-model="modForm.buildObject.formBorderType" data-ng-change="borderTypeChange();" uib-btn-radio="btype.id" data-ng-repeat="btype in borderType track by btype.id"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{btype.name}} </label>
									</div>
								</div>
								<!-- <div class="col-sm-2">{{modForm.buildObject.formBorderType}}</div> -->
							</div>
							<div class="form-group form-group-sm ng-hide" data-ng-show="!isBorderTypeNone">
								<label for="ltewFormBgColor" class="col-sm-4 control-label">Background Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modForm.formBg, borderColor: modForm.formBg }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormBgColor" name="ltewFormBgColor" data-ng-model="modForm.formBg" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFormItem('formBg');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm ng-hide" data-ng-show="!isBorderTypeNone">
								<label for="ltewFormBorderColor" class="col-sm-4 control-label">Form Border Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modForm.formBorderColor, borderColor: modForm.formBorderColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormBorderColor" name="ltewFormBorderColor" data-ng-model="modForm.formBorderColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent="true" />
										<span class="input-group-btn"><button class="btn btn-default btn-sm" type="button" data-ng-click="removeFormItem('formBorderColor');"><span class="glyphicon glyphicon-remove"></span></button></span>
										<!-- <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span> -->
									</div>
								</div>
								<!-- <div class="col-sm-4"><button class="btn btn-primary btn-sm" type="button">Default</button></div> -->
							</div>
							<!-- <div class="form-group form-group-sm">
								label.control-label.col-sm-2{Form Width}
								<div class="btn-group btn-group-sm">
									<label class="btn btn-primary"></label>
								</div>
							</div> -->
							<div class="form-group form-group-sm ng-hide" data-ng-show="!isBorderTypeNone">
								<label for="ltewBorderWidth" class="col-sm-4 control-label">Form Border Radius</label>
								<div class="col-sm-4">
									<input type="number" min="0" data-ng-disabled="!!isBorderTypeNone" class="form-control" id="ltewBorderWidth" name="ltewBorderWidth" data-ng-model="modForm.formBorderRadius" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFormTitle" class="col-sm-4 control-label">Form Title</label>
								<div class="col-sm-4"><input type="text" class="form-control" id="ltewFormTitle" name="ltewFormTitle" data-ng-model="modForm.buildObject.panelTitle" /></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFormTitleColor" class="col-sm-4 control-label">Title Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modForm.formTitleColor, borderColor: modForm.formTitleColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormTitleColor" name="ltewFormTitleColor" data-ng-model="modForm.formTitleColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFormItem('formTitleColor');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFormTitleBgColor" class="col-sm-4 control-label">Title Background Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modForm.formTitleBgColor, borderColor: modForm.formTitleBgColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormTitleBgColor" name="ltewFormTitleBgColor" data-ng-model="modForm.formTitleBgColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent="true" />
										<span class="input-group-btn"><button class="btn btn-default btn-sm" type="button" data-ng-click="removeFormItem('formTitleBgColor');"><span class="glyphicon glyphicon-remove"></span></button></span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewVerticalSpace" class="col-sm-4 control-label">Verticle Spacing</label>
								<div class="col-sm-4"><input type="number" min="0" class="form-control" id="ltewVerticalSpace" name="ltewVerticalSpace" data-ng-model="modForm.formGroupSpacing" data-ng-model-options="modelOptions"></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldBorderRadius" class="col-sm-4 control-label">Field Border Radius</label>
								<div class="col-sm-4"><input type="number" class="form-control" id="ltewFieldBorderRadius" name="ltewFieldBorderRadius" min="0" data-ng-model="modForm.formFieldBorderRadius" data-ng-model-options="modelOptions"></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewBtnBorderRadius" class="col-sm-4 control-label">Button Border Radius</label>
								<div class="col-sm-4"><input type="number" class="form-control" id="ltewBtnBorderRadius" name="ltewBtnBorderRadius" min="0" data-ng-model="modForm.formButtonBorderRadius" data-ng-model-options="modelOptions"></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldSize" class="col-sm-4 control-label">Field Size</label>
								<div class="col-sm-8">
									<div class="btn-group btn-group-sm">
										<label class="btn btn-primary" data-ng-model="modForm.buildObject.fieldSize" data-ng-change="fieldSizeChange();" data-uib-btn-radio="fsize.id" data-ng-repeat="fsize in fieldSizeUnits"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{fsize.name}}</label>
									</div>
								</div>
							</div>
							<!-- .form-group.form-group-sm>label.col-sm-4.control-label[for=ltewSomeInput]{Label}+.col-sm-4>input.form-control#ltewSomeInput[name=ltewSomeInput type=text data-ng-model=modForm.something data-ng-model-options=modelOptions] -->
						</div>
						<div class="col-sm-4">
							<h4>Preview:</h4>
							<hr />
							<style type="text/css">{{previewStyles}}</style>
							<div class="ltw ltw-preview" style="width:100%;">
								<div class="panel panel-default lt-widget-border ng-hide" data-ng-show="modForm.buildObject.formBorderType === borderType.panel.id">
									<div class="panel-heading lt-widget-heading" data-ng-show="modForm.buildObject.panelTitle">{{modForm.buildObject.panelTitle}}</div>
									<div class="panel-body">

										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><input type="text" class="form-control" placeholder="Field"></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><textarea name="" id="" cols="30" rows="1" class="form-control" placeholder="Text"></textarea></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><select name="" id="" class="form-control">
													<option value="">Drop Down</option>
												</select></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12">
												<p>paragraph text</p>
											</div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><button class="btn btn-primary" data-ng-class="buttonSizeClass" type="button">Button</button></div>
										</div>
										<!-- (.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>input.form-control[type=text placeholder="Field"])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>textarea.form-control[placeholder="Text" rows=1])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>select.form-control>option{Drop Down})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>p{paragraph text})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>button.btn.btn-primary[type=button data-ng-class=buttonSizeClass]{Button}) -->
									</div>
								</div>
								<div class="well lt-widget-border ng-hide" data-ng-show="modForm.buildObject.formBorderType === borderType.well.id">
									<h4 class="lt-widget-heading" data-ng-show="modForm.buildObject.panelTitle">{{modForm.buildObject.panelTitle}}</h4>
									<div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><input type="text" class="form-control" placeholder="Field"></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><textarea name="" id="" cols="30" rows="1" class="form-control" placeholder="Text"></textarea></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><select name="" id="" class="form-control">
													<option value="">Drop Down</option>
												</select></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12">
												<p>paragraph text</p>
											</div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><button class="btn btn-primary" data-ng-class="buttonSizeClass" type="button">Button</button></div>
										</div>
									</div>
								</div>
								<div class="ng-hide" data-ng-show="modForm.buildObject.formBorderType === borderType.none.id">
									<h4 class="lt-widget-heading" data-ng-show="modForm.buildObject.panelTitle">{{modForm.buildObject.panelTitle}}</h4>
									<div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><input type="text" class="form-control" placeholder="Field"></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><textarea name="" id="" cols="30" rows="1" class="form-control" placeholder="Text"></textarea></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><select name="" id="" class="form-control">
													<option value="">Drop Down</option>
												</select></div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12">
												<p>paragraph text</p>
											</div>
										</div>
										<div class="form-group" data-ng-class="fieldSizeClass">
											<div class="col-sm-12"><button class="btn btn-primary" data-ng-class="buttonSizeClass" type="button">Button</button></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-sm btn-primary" type="submit">Save</button>
					<button class="btn btn-sm btn-default" data-ng-click="cancelClick();">Cancel</button>
				</div>
			</form>
		`);
		$templateCache.put('template/modal/editField.html', `
			<form class="form-horizontal" data-ng-submit="saveClick();">
				<div class="modal-header alert alert-info">
					<h3 class="modal-title">Edit Widget Field</h3>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-sm-8">
							<!-- .form-group.form-group-sm>label.col-sm-2.control-label[for=ltewFieldWidth]{Form Width}+.col-sm-2>input.form-control#ltewFieldWidth[type=number name=ltewFieldWidth data-ng-model=modForm.formWidth] -->
							<div class="form-group form-group-sm">
								<label for="ltewFieldFontSize" class="col-sm-4 control-label">Font Size</label>
								<div class="col-sm-4">
									<input type="number" min="8" max="32" class="form-control" id="ltewFieldFontSize" name="ltewFieldFontSize" data-ng-model="modField.fontSize" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldFontColor" class="col-sm-4 control-label">Font Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modField.color, borderColor: modField.color }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFieldFontColor" name="ltewFieldFontColor" data-ng-model="modField.color" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFieldItem('color');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldBgColor" class="col-sm-4 control-label">Background Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modField.backgroundColor, borderColor: modField.backgroundColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFieldBgColor" name="ltewFieldBgColor" data-ng-model="modField.backgroundColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFieldItem('backgroundColor');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldBorderColor" class="col-sm-4 control-label">Border Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modField.borderColor, borderColor: modField.borderColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFieldBorderColor" name="ltewFieldBorderColor" data-ng-model="modField.borderColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFieldItem('borderColor');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldBorderRadius" class="col-sm-4 control-label">Border Radius</label>
								<div class="col-sm-4">
									<input type="number" min="0" class="form-control" id="ltewFieldBorderRadius" name="ltewFieldBorderRadius" data-ng-model="modField.borderRadius" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldPadding" class="col-sm-4 control-label">Padding</label>
								<div class="col-sm-4">
									<input type="number" min="0" class="form-control" id="ltewFieldPadding" name="ltewFieldPadding" data-ng-model="modField.padding" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldSize" class="col-sm-4 control-label">Field Size</label>
								<div class="col-sm-8">
									<div class="btn-group btn-group-sm">
										<label class="btn btn-primary" data-ng-model="modField.size" data-ng-change="fieldSizeChange();" data-uib-btn-radio="fsize.id" data-ng-repeat="fsize in fieldSizeUnits"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{fsize.name}}</label>
									</div>
								</div>
							</div>
							<!-- .form-group.form-group-sm>label.col-sm-4.control-label[for=ltewSomeInput]{Label}+.col-sm-4>input.form-control#ltewSomeInput[name=ltewSomeInput type=text data-ng-model=modForm.something data-ng-model-options=modelOptions] -->
						</div>
						<div class="col-sm-4">
							<h4>Preview:</h4>
							<hr />
							<!-- <style type="text/css">{{previewStyles}}</style> -->
							<div class="ltw ltw-preview" style="width:100%;">
								<div class="form-group">
									<div class="col-sm-12"><input type="text" class="form-control" data-ng-style="fieldStyle" placeholder="Field Placeholder Text" value="Field Text" /></div>
								</div>
								<div class="form-group">
									<div class="col-sm-12"><input type="text" class="form-control" data-ng-style="fieldStyle" placeholder="placeholder text doesn't change color" /></div>
								</div>
								<!-- (.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>input.form-control[type=text placeholder="Field"])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>textarea.form-control[placeholder="Text" rows=1])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>select.form-control>option{Drop Down})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>p{paragraph text})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>button.btn.btn-primary[type=button data-ng-class=buttonSizeClass]{Button}) -->
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button class="btn btn-sm btn-primary" type="submit">Save</button>
					<button class="btn btn-sm btn-default" data-ng-click="cancelClick();">Cancel</button>
				</div>
			</form>
		`);
	}]);
})();
