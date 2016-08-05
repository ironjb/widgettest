/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/papaparse/papaparse.d.ts" />

namespace LoanTekPapaParseTest {
	var $ = jQuery;
	var fileInputElement: any = $('#csvFile')[0];

	// Clears on refresh
	$('#csvFile').val('');
	$('#parseResults').val('');

	// Parse on Submit
	$('#parseTest').submit(function (event) {
		event.preventDefault();
		var fileList: FileList = fileInputElement.files;
		// window.console && console.log(typeof fileList, fileList);
		for (var i = fileList.length - 1; i >= 0; i--) {
			let file: File = fileList[i];
			window.console && console.log(file.name);
			Papa.parse(file, {
				header: true
				// , skipEmptyLines: true
				, complete: function (results, file) {
					window.console && console.log('results: ', results);
					$('#parseResults').val(JSON.stringify(results.data, null, '\t'))
				}
			});
		}
	});
}