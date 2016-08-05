var LoanTekPapaParseTest;
(function (LoanTekPapaParseTest) {
    var $ = jQuery;
    var fileInputElement = $('#csvFile')[0];
    $('#csvFile').val('');
    $('#parseResults').val('');
    $('#parseTest').submit(function (event) {
        event.preventDefault();
        var fileList = fileInputElement.files;
        for (var i = fileList.length - 1; i >= 0; i--) {
            var file = fileList[i];
            window.console && console.log(file.name);
            Papa.parse(file, {
                header: true,
                complete: function (results, file) {
                    window.console && console.log('results: ', results);
                    $('#parseResults').val(JSON.stringify(results.data, null, '\t'));
                }
            });
        }
    });
})(LoanTekPapaParseTest || (LoanTekPapaParseTest = {}));
