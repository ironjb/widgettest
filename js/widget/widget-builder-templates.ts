/// <reference path="../../typings/tsd.d.ts" />

(function() {
	angular.module('ltw.templates', []).run(['$templateCache', function($templateCache) {
		$templateCache.put('template/widgetFormEditButton.html', `
			<button type="button" class="btn btn-default btn-xs btn-tool" data-ng-click="EditWigetForm();"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
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
									<label class="btn btn-primary" data-ng-model="modForm.buildObject.formBorderType" data-ng-change="borderTypeChange();" uib-btn-radio="btype.id" data-ng-repeat="btype in borderTypeArray track by btype.id"><span class="show-on-active-inline-block glyphicon glyphicon-ok"></span> {{btype.name}} </label>
								</div>
							</div>
							<div class="col-sm-2">{{modForm.buildObject.formBorderType}}</div>
						</div>
						<!-- <div class="form-group form-group-sm">
							label.control-label.col-sm-2{Form Width}
							<div class="btn-group btn-group-sm">
								<label class="btn btn-primary"></label>
							</div>
						</div> -->
						<div class="form-group form-group-sm" data-ng-show="showBorderRadius">
							<label for="ltewBorderWidth" class="col-sm-4 control-label">Form Border Radius</label>
							<div class="col-sm-4">
								<input type="number" min="0" data-ng-disabled="!showBorderRadius" class="form-control" id="ltewBorderWidth" name="ltewBorderWidth" data-ng-model="modForm.formBorderRadius" data-ng-model-options="modelOptions" />
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label for="ltewFormTitle" class="col-sm-4 control-label">Form Title</label>
							<div class="col-sm-4"><input type="text" class="form-control" id="ltewFormTitle" name="ltewFormTitle" data-ng-model="modForm.buildObject.panelTitle" /></div>
						</div>
						<!-- .form-group.form-group-sm>label.col-sm-4.control-label[for=ltewSomeInput]{Label}+.col-sm-4>input.form-control#ltewSomeInput[name=ltewSomeInput type=text data-ng-model=modForm.something] -->
					</div>
					<div class="col-sm-4">
						<h4>Preview:</h4>
						<hr />
						<style type="text/css">{{previewStyles}}</style>
						<div class="ltw ltw-preview" style="width:100%;">
							<div class="panel panel-default lt-widget-border" data-ng-show="modForm.buildObject.formBorderType === borderType.panel.id">
								<div class="panel-heading lt-widget-heading" data-ng-show="modForm.buildObject.panelTitle">{{modForm.buildObject.panelTitle}}</div>
								<div class="panel-body">
									panel contents
									(.form-group>.col-sm-12>input.form-control[type=text placeholder="Field"])+(.form-group>.col-sm-12>textarea.form-control[placeholder="Text" rows=1])+(.form-group>.col-sm-12>select.form-control>option{Drop Down})+(.form-group>.col-sm-12>)+(.form-group>.col-sm-12>button.btn.btn-primary[type=button]{Button})
								</div>
							</div>
							<div class="well lt-widget-border" data-ng-show="modForm.buildObject.formBorderType === borderType.well.id">
								<h4 class="lt-widget-heading" data-ng-show="modForm.buildObject.panelTitle">{{modForm.buildObject.panelTitle}}</h4>
								<div>
									well content
								</div>
							</div>
							<div data-ng-show="modForm.buildObject.formBorderType === borderType.none.id">
								<h4 class="lt-widget-heading" data-ng-show="modForm.buildObject.panelTitle">{{modForm.buildObject.panelTitle}}</h4>
								<div>
									none content
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="btn btn-primary" type="submit">Save</button>
				<button class="btn btn-default" data-ng-click="cancelClick();">Cancel</button>
			</div>
		</form>
		`);
	}]);
})();

