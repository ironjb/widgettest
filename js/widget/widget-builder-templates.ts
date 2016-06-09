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
					<div class="form-group form-group-sm">
						<label for="ltewBorderType" class="col-sm-2 control-label">Border Type</label>
						<div class="col-sm-6">
							<!-- <select name="ltewBorderType" id="ltewBorderType" class="form-control" data-ng-model="modForm.buildObject.formBorderType" data-ng-options="btype.id as btype.name for btype in borderTypes">
								<option value="">None</option>
							</select> -->
							<div class="btn-group btn-group-sm">
								<label class="btn btn-primary" data-ng-model="modForm.buildObject.formBorderType" uib-btn-radio="btype.id" data-ng-repeat="btype in borderTypes track by btype.id">{{btype.name}}</label>
							</div>
						</div>
						<div class="col-sm-4">{{modForm.buildObject.formBorderType}}</div>
					</div>
					<div class="form-group form-group-sm">
						<label for="ltewBorderWidth" class="col-sm-2 control-label">Border Width</label>
						<div class="col-sm-2">
							<input type="number" class="form-control" id="ltewBorderWidth" name="ltewBorderWidth" />
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

