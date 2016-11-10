/// <reference path="../../../../Scripts/typings/tsd.d.ts" />
/// <reference path="../../../../Scripts/common/ng/services.ts" />
/// <reference path="../../../../Scripts/common/ng/directives.ts" />
/// <reference path="../widget/widget-builder-services.ts" />

declare namespace IWidgetHome {
	interface INgScope extends ng.IScope {
		AddWidget?(id: string): void;
		EditWidget?(id: number): void;
		DeleteWidget?(id: number): void;
	}
}

(function () {
	// Angular App
	var widgetHomeApp = angular.module('WidgetHomeApp', ['ui.bootstrap', 'ngAnimate', 'lt.services', 'ltw.services', 'ltw.directives', 'ltw.templates']);

	// Angular Home Controller
	widgetHomeApp.controller('WidgetHomeController', ['$scope', 'commonServices', 'widgetServices', function ($scope: IWidgetHome.INgScope, commonServices: ICommonNgServices, widgetServices: IWidgetServices.INgServices) {
		$scope.AddWidget = AddWidget;
		$scope.EditWidget = EditWidget;
		$scope.DeleteWidget = DeleteWidget;

		function AddWidget (id: string) {
			location.assign('/Widgets/Builder/CreateNew/' + id);
		}

		function EditWidget (id: number) {
			location.assign('/Widgets/Builder/Index/' + id);
		}

		function DeleteWidget (id: number) {
			var deleteProcess: CommonNgServices.IModalDataProcessing_Options = {
				httpOptions: {
					method: 'POST',
					url: '/Widgets/Builder/Delete/' + id + '?v=' + new Date().getTime()
				},
				onSuccessFunction: function (result) {
					location.reload();
				}
			};
			var deleteConfirm: CommonNgServices.IModalConfirmInfo = {
				confirmOptions: {
					title: 'Delete Widget:',
					headerStyle: 'alert alert-danger',
					okBtnText: 'Delete',
					message: 'Are you sure you want to delete this widget? This cannot be undone!'
				}
			};
			deleteConfirm.onConfirm = function () {
				commonServices.dataProcessingModal([deleteProcess]);
			};

			commonServices.confirmModal(deleteConfirm);
		}
	}]);


})();
