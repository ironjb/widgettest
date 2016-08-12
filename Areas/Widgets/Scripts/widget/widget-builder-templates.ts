/// <reference path="../../../../Scripts/typings/tsd.d.ts" />

(function () {
	angular.module('ltw.templates', []).run(['$templateCache', function ($templateCache) {
		$templateCache.put('template/widgetFormEditButton.html', `
			<div class="pull-right">
				<button type="button" class="btn btn-default btn-xs btn-tool" data-ng-click="EditWidgetForm();" title="edit" alt="edit"><span class="glyphicon glyphicon-edit"></span> Edit</button>
			</div>
		`);
		$templateCache.put('template/widgetFieldEditButtons.html', `
			<div class="pull-right">
				<a class="btn btn-default btn-xs btn-tool field-channel" data-jqyoui-draggable="{onStart:'onDragStartDir({index: toolInfo.index})'}" data-jqyoui-options="{revert: 'invalid', helper: 'clone'}" data-drag="true" title="move" alt="move"><span class="glyphicon glyphicon-move"></span></a>
				<button type="button" class="btn btn-default btn-xs btn-tool" data-ng-click="EditWidgetField();" title="edit" alt="edit"><span class="glyphicon glyphicon-edit"></span></button>
				<button type="button" class="btn btn-danger btn-xs btn-tool ng-hide" data-ng-click="RemoveWidgetField();" data-ng-show="showRemove" title="remove" alt="remove"><span class="glyphicon glyphicon-trash"></span></button>
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
							<div class="form-group form-group-sm">
								<label for="ltewFormWidth" class="col-sm-4 control-label">Form Width</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<input type="number" min="0" class="form-control" id="ltewFormWidth" name="ltewFormWidth" data-ng-model="modBuildOptions.formWidth" />
										<div class="input-group-btn" uib-dropdown="">
											<button class="btn btn-primary" type="button" uib-dropdown-toggle="">{{modBuildOptions.formWidthUnit}} <span class="caret"></span></button>
											<ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu="">
												<li></li>
												<li data-ng-repeat="fwunit in formWidthUnits track by fwunit.id"><a href="#" data-ng-click="changeFormWidthUnit($event, fwunit)">{{fwunit.id}} - {{fwunit.name}}</a></li>
											</ul>
										</div>
									</div>
								</div>
								<div class="col-sm-4">
									<div class="btn-group btn-group-sm"><label for="" class="btn btn-primary" data-ng-model="modBuildOptions.formWidthUnit" data-uib-btn-radio="fwunit.id" data-ng-repeat="fwunit in formWidthUnits track by fwunit.id"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{fwunit.name}} </label></div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewBorderType" class="col-sm-4 control-label">Border Type</label>
								<div class="col-sm-6">
									<div class="btn-group btn-group-sm">
										<label class="btn btn-primary" data-ng-model="modBuildOptions.formBorderType" data-ng-change="borderTypeChange();" uib-btn-radio="btype.id" data-ng-repeat="btype in borderType track by btype.id"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{btype.name}} </label>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm ng-hide" data-ng-show="!isBorderTypeNone">
								<label for="ltewFormBgColor" class="col-sm-4 control-label">Background Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modBuildOptions.formBg, borderColor: modBuildOptions.formBg }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormBgColor" name="ltewFormBgColor" data-ng-model="modBuildOptions.formBg" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent-NOT-USED="true" />
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
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modBuildOptions.formBorderColor, borderColor: modBuildOptions.formBorderColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormBorderColor" name="ltewFormBorderColor" data-ng-model="modBuildOptions.formBorderColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent-NOT-USED="true" />
										<span class="input-group-btn"><button class="btn btn-default btn-sm" type="button" data-ng-click="removeFormItem('formBorderColor');"><span class="glyphicon glyphicon-remove"></span></button></span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm ng-hide" data-ng-show="!isBorderTypeNone">
								<label for="ltewBorderWidth" class="col-sm-4 control-label">Form Border Radius</label>
								<div class="col-sm-4">
									<input type="number" min="0" data-ng-disabled="!!isBorderTypeNone" class="form-control" id="ltewBorderWidth" name="ltewBorderWidth" data-ng-model="modBuildOptions.formBorderRadius" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFormTitle" class="col-sm-4 control-label">Form Title</label>
								<div class="col-sm-4"><input type="text" class="form-control" id="ltewFormTitle" name="ltewFormTitle" data-ng-model="modBuildOptions.panelTitle" /></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFormTitleColor" class="col-sm-4 control-label">Title Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modBuildOptions.formTitleColor, borderColor: modBuildOptions.formTitleColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormTitleColor" name="ltewFormTitleColor" data-ng-model="modBuildOptions.formTitleColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent-NOT-USED="true" />
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
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modBuildOptions.formTitleBgColor, borderColor: modBuildOptions.formTitleBgColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFormTitleBgColor" name="ltewFormTitleBgColor" data-ng-model="modBuildOptions.formTitleBgColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent-NOT-USED="true" />
										<span class="input-group-btn"><button class="btn btn-default btn-sm" type="button" data-ng-click="removeFormItem('formTitleBgColor');"><span class="glyphicon glyphicon-remove"></span></button></span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewVerticalSpace" class="col-sm-4 control-label">Verticle Spacing</label>
								<div class="col-sm-4"><input type="number" min="0" class="form-control" id="ltewVerticalSpace" name="ltewVerticalSpace" data-ng-model="modBuildOptions.formGroupSpacing" data-ng-model-options="modelOptions"></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldBorderRadius" class="col-sm-4 control-label">Field Border Radius</label>
								<div class="col-sm-4"><input type="number" class="form-control" id="ltewFieldBorderRadius" name="ltewFieldBorderRadius" min="0" data-ng-model="modBuildOptions.formFieldBorderRadius" data-ng-model-options="modelOptions"></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewBtnBorderRadius" class="col-sm-4 control-label">Button Border Radius</label>
								<div class="col-sm-4"><input type="number" class="form-control" id="ltewBtnBorderRadius" name="ltewBtnBorderRadius" min="0" data-ng-model="modBuildOptions.formButtonBorderRadius" data-ng-model-options="modelOptions"></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldSize" class="col-sm-4 control-label">Field Size</label>
								<div class="col-sm-8">
									<div class="btn-group btn-group-sm">
										<label class="btn btn-primary" data-ng-model="modBuildOptions.fieldSize" data-ng-change="fieldSizeChange();" data-uib-btn-radio="fsize.id" data-ng-repeat="fsize in fieldSizeUnits"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{fsize.name}}</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<h4>Preview:</h4>
							<hr />
							<style type="text/css">{{previewStyles}}</style>
							<div class="ltw ltw-preview" style="width:100%;">
								<div class="panel panel-default lt-widget-border ng-hide" data-ng-show="modBuildOptions.formBorderType === borderType.panel.id">
									<div class="panel-heading lt-widget-heading" data-ng-show="modBuildOptions.panelTitle">{{modBuildOptions.panelTitle}}</div>
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
									</div>
								</div>
								<div class="well lt-widget-border ng-hide" data-ng-show="modBuildOptions.formBorderType === borderType.well.id">
									<h4 class="lt-widget-heading" data-ng-show="modBuildOptions.panelTitle">{{modBuildOptions.panelTitle}}</h4>
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
								<div class="ng-hide" data-ng-show="modBuildOptions.formBorderType === borderType.none.id">
									<h4 class="lt-widget-heading" data-ng-show="modBuildOptions.panelTitle">{{modBuildOptions.panelTitle}}</h4>
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
			<form class="form-horizontal" data-ng-submit="saveClick();" data-ng-init="ft = fieldOptions.fieldTemplate">
				<div class="modal-header alert alert-info">
					<h3 class="modal-title">Edit Widget Field</h3>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col-sm-8">

							<div class="form-group form-group-sm">
								<label for="ltewFieldCols" class="col-sm-4 control-label">Grid Width</label>
								<div class="col-sm-4"><select name="ltewFieldCols" id="ltewFieldCols" class="form-control" data-ng-model="modField.cols" data-ng-options="gridCol.id as gridCol.name for gridCol in ::gridColumnsArray | orderBy: '-id'"></select></div>
							</div>
							<div class="form-group form-group-sm">
								<label for="ltewFieldOffsetCols" class="col-sm-4 control-label">Offset Width</label>
								<div class="col-sm-4"><select name="ltewFieldOffsetCols" id="ltewFieldOffsetCols" class="form-control" data-ng-model="modField.offsetCols" data-ng-options="gridCol.id as gridCol.name for gridCol in ::offsetColumnsArray | orderBy: 'id'"></select></div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="!(['p','title'].indexOf(ft.element) >= 0 || ['successmessage'].indexOf(ft.type) >= 0)">
								<label for="ltewFieldSize" class="col-sm-4 control-label">Field Size</label>
								<div class="col-sm-8">
									<div class="btn-group btn-group-sm">
										<label class="btn btn-primary" data-ng-model="modField.size" data-ng-change="fieldSizeChange();" data-uib-btn-radio="fsize.id" data-ng-repeat="fsize in ::fieldSizeUnits"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{fsize.name}}</label>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="ft.element === 'title'">
								<label for="ltewFieldHeaderSize" class="col-sm-4 control-label">Heading Size</label>
								<div class="col-sm-4"><select name="ltewFieldHeaderSize" id="ltewFieldHeaderSize" class="form-control" data-ng-model="modField.nsize" data-ng-options="hd.id as hd.name for hd in ::headingArray"></select></div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="!(['captcha'].indexOf(ft.element) >= 0)">
								<label for="ltewFieldFontSize" class="col-sm-4 control-label">Font Size</label>
								<div class="col-sm-4">
									<input type="number" min="8" max="32" class="form-control" id="ltewFieldFontSize" name="ltewFieldFontSize" data-ng-model="modField.fontSize" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="!(['captcha'].indexOf(ft.element) >= 0)">
								<label for="ltewFieldFontColor" class="col-sm-4 control-label">Font Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modField.color, borderColor: modField.color }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFieldFontColor" name="ltewFieldFontColor" data-ng-model="modField.color" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent-NOT-USED="true" colorpicker-fixed-position-NOT-USED="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFieldItem('color');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="!(['label','captcha','title'].indexOf(ft.element) >= 0)">
								<label for="ltewFieldBgColor" class="col-sm-4 control-label">Background Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modField.backgroundColor, borderColor: modField.backgroundColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFieldBgColor" name="ltewFieldBgColor" data-ng-model="modField.backgroundColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent-NOT-USED="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFieldItem('backgroundColor');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="!(['label','captcha','title'].indexOf(ft.element) >= 0)">
								<label for="ltewFieldBorderColor" class="col-sm-4 control-label">Border Color</label>
								<div class="col-sm-4">
									<div class="input-group input-group-sm">
										<span class="input-group-addon" data-ng-style="{ backgroundColor: modField.borderColor, borderColor: modField.borderColor }">&nbsp; &nbsp;</span>
										<input type="text" class="form-control" id="ltewFieldBorderColor" name="ltewFieldBorderColor" data-ng-model="modField.borderColor" data-ng-model-options="modelOptions" data-colorpicker data-colorpicker-parent-NOT-USED="true" />
										<span class="input-group-btn">
											<button class="btn btn-default btn-sm" type="button" data-ng-click="removeFieldItem('borderColor');"><span class="glyphicon glyphicon-remove"></span></button>
										</span>
									</div>
								</div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="!(['label','captcha','title'].indexOf(ft.element) >= 0)">
								<label for="ltewFieldBorderRadius" class="col-sm-4 control-label">Border Radius</label>
								<div class="col-sm-4">
									<input type="number" min="0" class="form-control" id="ltewFieldBorderRadius" name="ltewFieldBorderRadius" data-ng-model="modField.borderRadius" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="['p','textarea','title','button'].indexOf(ft.element) >= 0 || ['successmessage'].indexOf(ft.type) >= 0">
								<label for="ltewFieldPadding" class="col-sm-4 control-label">Padding</label>
								<div class="col-sm-4">
									<input type="number" min="0" class="form-control" id="ltewFieldPadding" name="ltewFieldPadding" data-ng-model="modField.padding" data-ng-model-options="modelOptions" />
								</div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="['p'].indexOf(ft.element) >= 0 || ['successmessage'].indexOf(ft.type) >= 0">
								<label for="ltewFieldValueTextArea" class="col-sm-4 control-label">Text</label>
								<div class="col-sm-8"><textarea name="ltewFieldValueTextArea" id="ltewFieldValueTextArea" cols="30" rows="2" class="form-control" data-ng-model="modField.value" data-ng-model-options="modelOptions" placeholder="{{::valuePlaceholder}}"></textarea></div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="['label','title','button'].indexOf(ft.element) >= 0">
								<label for="ltewFieldValue" class="col-sm-4 control-label">Text</label>
								<div class="col-sm-4"><input type="text" class="form-control" id="ltewFieldValue" name="ltewFieldValue" data-ng-model="modField.value" data-ng-model-options="modelOptions" placeholder="{{::valuePlaceholder}}" /></div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="['input','select','textarea'].indexOf(ft.element) >= 0">
								<label for="ltewFieldPlaceholder" class="col-sm-4 control-label">Placeholder Text</label>
								<div class="col-sm-4"><input type="text" class="form-control" id="ltewFieldPlaceholder" name="ltewFieldPlaceholder" data-ng-model="modField.placeholder" data-ng-model-options="modelOptions" /></div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="ft.element === 'textarea'">
								<label for="ltewFieldRows" class="col-sm-4 control-label">Textarea Rows</label>
								<div class="col-sm-4"><input type="number" min="1" max="50" class="form-control" id="ltewFieldRows" name="ltewFieldRows" data-ng-model="modField.rows" data-ng-model-options="modelOptions" /></div>
							</div>
							<div class="form-group form-group-sm" data-ng-show="(['input','select','textarea'].indexOf(ft.element) >= 0) &amp;&amp; !fieldOptions.isLTRequired">
								<label for="ltewFieldRequired" class="col-sm-4 control-label">Require Field</label>
								<div class="col-sm-4">
									<div class="checkbox">
										<label for=""><input type="checkbox" id="ltewFieldRequired" name="ltewFieldRequired" data-ng-model="modField.required" /></label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<h4>Preview:</h4>
							<hr />
							<style type="text/css">{{previewStyles}}</style>
							<div class="ltw ltw-preview" style="width:100%;">
								<div data-ng-show="ft.element === 'input'">
									<div class="form-group">
										<div class="col-sm-12"><input type="text" class="form-control" data-ng-style="fieldStyle" data-ng-class="fieldSizeClass" placeholder="Field Placeholder Text" value="Text Field" /></div>
									</div>
									<div class="form-group">
										<div class="col-sm-12"><input type="text" class="form-control" data-ng-style="fieldStyle" data-ng-class="fieldSizeClass" placeholder="placeholder text doesn't change color" /></div>
									</div>
								</div>
								<div class="form-group" data-ng-show="ft.element === 'select'">
									<div class="col-sm-12">
										<select class="form-control" data-ng-style="fieldStyle", data-ng-class="fieldSizeClass">
											<option value="">{{modField.placeholder}}</option>
										</select>
									</div>
								</div>
								<div data-ng-show="ft.element === 'textarea'">
									<div class="form-group">
										<div class="col-sm-12"><textarea class="form-control" rows="{{modField.rows || 1}}" data-ng-style="fieldStyle" data-ng-class="fieldSizeClass" placeholder="placeholder text doesn't change color">Textarea</textarea></div>
									</div>
									<div class="form-group">
										<div class="col-sm-12"><textarea class="form-control" rows="{{modField.rows || 1}}" data-ng-style="fieldStyle" data-ng-class="fieldSizeClass" placeholder="placeholder text doesn't change color"></textarea></div>
									</div>
								</div>
								<div class="form-group" data-ng-show="ft.element === 'button'">
									<div class="col-sm-12"><button class="btn btn-primary" type="button" data-ng-style="fieldStyle" data-ng-class="buttonSizeClass">{{modField.value || 'Submit'}}</button></div>
								</div>
								<div class="form-group" data-ng-show="ft.element === 'p'">
									<div class="col-sm-12">
										<p data-ng-style="fieldStyle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
									</div>
								</div>
								<div class="form-group" data-ng-show="ft.type === 'successmessage'">
									<div class="col-sm-12">
										<p data-ng-style="fieldStyle">{{modField.value || ft.value || 'Thank you. After submit form text.'}}</p>
									</div>
								</div>
								<div class="form-group" data-ng-show="ft.element === 'label'">
									<label for="" class="control-label col-sm-8" data-ng-style="fieldStyle" data-ng-class="fieldSizeClass">{{modField.value || 'Input Label'}}</label>
									<div class="col-sm-4"><input type="text" class="form-control" data-ng-class="fieldSizeClass" placeholder="&lt;- Label" /></div>
								</div>
								<div class="form-group" data-ng-show="ft.element === 'title'">
									<div class="col-sm-12">
										<h1 data-ng-show="modField.nsize === 1" data-ng-style="fieldStyle">{{modField.value || 'Title'}}</h1>
										<h2 data-ng-show="modField.nsize === 2" data-ng-style="fieldStyle">{{modField.value || 'Title'}}</h2>
										<h3 data-ng-show="modField.nsize === 3" data-ng-style="fieldStyle">{{modField.value || 'Title'}}</h3>
										<h4 data-ng-show="modField.nsize === 4" data-ng-style="fieldStyle">{{modField.value || 'Title'}}</h4>
										<h5 data-ng-show="modField.nsize === 5" data-ng-style="fieldStyle">{{modField.value || 'Title'}}</h5>
										<h6 data-ng-show="modField.nsize === 6" data-ng-style="fieldStyle">{{modField.value || 'Title'}}</h6>
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
	}]);
})();
