(function () {
    var ngApp = angular.module('app', ['ui.bootstrap', 'ngAnimate', 'lt.services', 'ya.nouislider']);
    ngApp.controller('noUiSliderController', ['$scope', 'commonServices', function ($scope, commonServices) {
            $scope.modelOptions = { updateOn: 'default blur', debounce: { default: 1000, blur: 0 } };
            $scope.newScheduleStartTime = commonServices.convertHourMinSecToDateTime('00:00');
            $scope.newScheduleEndTime = commonServices.convertHourMinSecToDateTime('23:45');
            var rangeBottom = commonServices.convertHourMinSecToDateTime('00:00').getTime();
            var rangeTop = commonServices.convertHourMinSecToDateTime('24:00').getTime();
            var startTime = commonServices.convertHourMinSecToDateTime('08:00').getTime();
            var endTime = commonServices.convertHourMinSecToDateTime('16:45').getTime();
            var formatTime = function (value) {
                var dateVal = new Date(value);
                return moment(dateVal).format('LT');
            };
            var toolTipFormatter = {
                to: function (value) {
                    var dateVal = new Date(value);
                    window.console && console.log(moment(dateVal).format('H:mm'));
                    return moment(dateVal).format('H:mm');
                },
                from: function (value) {
                    return value;
                }
            };
            var options01 = {
                start: [startTime, endTime],
                range: { min: rangeBottom, max: rangeTop },
                step: 1000 * 60 * 15,
                margin: 1000 * 60 * 15,
                connect: true
            };
            var noUiSliderEvents = {
                update: function (values, handle, unencoded) {
                    window.console && console.log('update:: values: ', values, ', handle: ', handle, ', unencoded: ', unencoded);
                    var roundTime = Math.round(unencoded[handle]);
                    var updatedTime = formatTime(roundTime);
                    window.console && console.log('updated time: ', updatedTime);
                    $scope.options01.start[handle] = roundTime;
                    if (handle === 0) {
                        $scope.startTimeDisplay = updatedTime;
                    }
                    else {
                        $scope.endTimeDisplay = updatedTime;
                    }
                }
            };
            $scope.options01 = options01;
            $scope.noUiSliderEvents = noUiSliderEvents;
            $scope.AddNewSchedule = function () {
                window.console && console.log('submit: ', $scope.options01.start);
            };
        }]);
})();
