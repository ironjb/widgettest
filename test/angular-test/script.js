(function () {
	var app = angular.module('myApp', []);
	app.controller('myController', ['$scope', '$http', function($scope, $http) {
		$http({
			method: 'GET'
			, url: 'https://clients-pricing-api.loantek.com/Mortgage/v1.0/MortgageLoan/Mjh4UnJxNmFDeXFlc2pXRlArNU52NzlZUDNLSmg3ZmhBQT090/FullMortgageRequest/Test?UserId=861'
		}).then(function (result) {
			$scope.rateList = result.data.Submissions[0].Quotes;
		}, function (error) {});

		$scope.removeItem = function (item) {
			var indx = $scope.rateList.indexOf(item);
			if (indx !== -1 && window.confirm('You sure you want to delete?')) {
				$scope.rateList.splice(indx, 1);
			}
		};
	}]);
	app.filter('myFilter', function () {
		return function (dataArray, searchTerm) {
			if (!dataArray) { return; }
			else if (!searchTerm) { return dataArray; }
			else {
				var term = searchTerm.toLowerCase();
				return dataArray.filter(function (value) {
					// window.console && console.log('filter.filter', term, value);
					var isInterestRate = value.InterestRate.toString().toLowerCase().indexOf(term) !== -1;
					var isAPR = value.APR.toString().toLowerCase().indexOf(term) !== -1;
					var isQuoteFees = value.QuoteFees.toString().toLowerCase().indexOf(term) !== -1;
					var isPIP = value.PIP.toString().toLowerCase().indexOf(term) !== -1;
					var isCalcPrice = value.CalcPrice.toString().toLowerCase().indexOf(term) !== -1;
					return isInterestRate || isAPR || isQuoteFees || isPIP || isCalcPrice;
				});
			}

		};
	});
})();