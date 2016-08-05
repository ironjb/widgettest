(function () {
    var widgetHomeApp = angular.module('WidgetHomeApp', ['ui.bootstrap', 'ngAnimate', 'lt.services', 'ltw.services', 'ltw.directives', 'ltw.templates']);
    widgetHomeApp.controller('WidgetHomeController', ['$scope', 'commonServices', 'widgetServices', function ($scope, commonServices, widgetServices) {
            $scope.AddWidget = AddWidget;
            $scope.EditWidget = EditWidget;
            $scope.DeleteWidget = DeleteWidget;
            function AddWidget(id) {
                location.assign('/Widgets/Builder/CreateNew/' + id);
            }
            function EditWidget(id) {
                location.assign('/Widgets/Builder/Index/' + id);
            }
            function DeleteWidget(id) {
                var deleteProcess = {
                    httpOptions: {
                        method: 'POST',
                        url: '/Widgets/Builder/Delete/' + id + '?v=' + new Date().getTime()
                    },
                    onSuccessFunction: function (result) {
                        location.reload();
                    }
                };
                var deleteConfirm = {
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
