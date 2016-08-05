/// <reference path="../../typings/tsd.d.ts" />

declare namespace CommonNgDirectives {
	interface IOnFileChangeNgScope extends ng.IScope {
		onFileChange?(onChangeFileListObject: IOnChangeFileListObject): void;
	}

	interface IOnChangeFileListObject {
		onChangeFileList?: FileList
	}
}

(function() {
	var ltDirectives = angular.module('lt.directives', []);
	ltDirectives.directive('onFileChange', ['$timeout', function ($timeout) {
		return {
			restrict: 'A',
			scope: {
				'onFileChange': '&'
			},
			link: function (scope: CommonNgDirectives.IOnFileChangeNgScope, elem: JQuery, attrs) {
				elem.bind('change', function () {
					// window.console && console.log('directive changefile');
					scope.$evalAsync(function (scope2: CommonNgDirectives.IOnFileChangeNgScope) {
						var el: HTMLInputElement = <HTMLInputElement>elem[0];
						// window.console && console.log('elem 0: ', el);
						if (el.files) {
							scope2.onFileChange({onChangeFileList: el.files});
						} else if (el.value) {
							window.console && console.log('browser not supported', el.value);
						} else {
							window.console && console.log('no file detected');
						}
					});
				});
			}
		};
	}]);
})();
