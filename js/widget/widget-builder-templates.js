(function () {
    angular.module('ltw.templates', []).run(['$templateCache', function ($templateCache) {
            $templateCache.put('template/modal-template/empty.html', "\n\t\t\t<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal vertical-center\" modal-animation-class=\"fade\"\n\t\t\t\tng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n\t\t\t\t<div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\"><div class=\"modal-content-empty\" ng-transclude></div></div>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/widgetFormEditButton.html', "\n\t\t\t<div class=\"pull-right\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-xs btn-tool\" data-ng-click=\"EditWidgetForm();\"><span class=\"glyphicon glyphicon-pencil\"></span> Edit</button>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/widgetFieldEditButtons.html', "\n\t\t\t<div class=\"pull-right\">\n\t\t\t\t<a class=\"btn btn-default btn-xs btn-tool field-channel\" data-jqyoui-draggable=\"{onStart:'onDragStartDir({index: toolInfo.index})'}\" data-jqyoui-options=\"{revert: 'invalid', helper: 'clone'}\" data-drag=\"true\"><span class=\"glyphicon glyphicon-move\"></span></a>\n\t\t\t\t<button type=\"button\" class=\"btn btn-default btn-xs btn-tool\" data-ng-click=\"EditWidgetField();\"><span class=\"glyphicon glyphicon-pencil\"></span></button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-danger btn-xs btn-tool ng-hide\" data-ng-click=\"RemoveWidgetField();\" data-ng-show=\"showRemove\"><span class=\"glyphicon glyphicon-trash\"></span></button>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/confirm.html', "\n\t\t\t<div class=\"modal-header\" data-ng-class=\"mdlSettings.headerStyle\">\n\t\t\t\t<h3 class=\"modal-title\">{{mdlSettings.title}}</h3>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div data-ng-bind-html=\"mdlSettings.message\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-primary\" data-ng-click=\"okClick();\" autofocus=\"autofocus\">{{mdlSettings.okBtnText}}</button>\n\t\t\t\t<button class=\"btn btn-default\" data-ng-click=\"cancelClick();\">{{mdlSettings.cancelBtnText}}</button>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/ok.html', "\n\t\t\t<div class=\"modal-header\" data-ng-class=\"settings.okStyle\">\n\t\t\t\t<h3 class=\"modal-title\">{{settings.okTitle}}</h3>\n\t\t\t</div>\n\t\t\t<div class=\"modal-body\">\n\t\t\t\t<div data-ng-bind-html=\"settings.okMessage\"></div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-footer\">\n\t\t\t\t<button class=\"btn btn-primary\" id=\"okModalButton\" data-ng-click=\"okClick();\" autofocus><span class=\"glyphicon glyphicon-ok\"></span> <span data-ng-bind=\"settings.okButtonText\"></span></button>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/spinner.html', "\n\t\t\t<div class=\"modal-processing text-center\">\n\t\t\t\t<h3><img src=\"/Content/images/spinner.gif\" alt=\"\" /> Processing</h3>\n\t\t\t</div>\n\t\t");
            $templateCache.put('template/modal/editForm.html', "\n\t\t\t<form class=\"form-horizontal\" data-ng-submit=\"saveClick();\">\n\t\t\t\t<div class=\"modal-header alert alert-info\">\n\t\t\t\t\t<h3 class=\"modal-title\">Edit Widget Form</h3>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<!-- .form-group.form-group-sm>label.col-sm-2.control-label[for=ltewFormWidth]{Form Width}+.col-sm-2>input.form-control#ltewFormWidth[type=number name=ltewFormWidth data-ng-model=modForm.formWidth] -->\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFormWidth\" class=\"col-sm-4 control-label\">Form Width</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" class=\"form-control\" id=\"ltewFormWidth\" name=\"ltewFormWidth\" data-ng-model=\"modForm.formWidth\" />\n\t\t\t\t\t\t\t\t\t\t<div class=\"input-group-btn\" uib-dropdown=\"\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-primary\" type=\"button\" uib-dropdown-toggle=\"\">{{modForm.formWidthUnit}} <span class=\"caret\"></span></button>\n\t\t\t\t\t\t\t\t\t\t\t<ul class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu=\"\">\n\t\t\t\t\t\t\t\t\t\t\t\t<li></li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li data-ng-repeat=\"fwunit in formWidthUnits track by fwunit.id\"><a href=\"#\" data-ng-click=\"changeFormWidthUnit($event, fwunit)\">{{fwunit.id}} - {{fwunit.name}}</a></li>\n\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"btn-group btn-group-sm\"><label for=\"\" class=\"btn btn-primary\" data-ng-model=\"modForm.formWidthUnit\" data-uib-btn-radio=\"fwunit.id\" data-ng-repeat=\"fwunit in formWidthUnits track by fwunit.id\"><span class=\"show-on-active-inline-block glyphicon glyphicon-ok\"></span> {{fwunit.name}} </label></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewBorderType\" class=\"col-sm-4 control-label\">Border Type</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-6\">\n\t\t\t\t\t\t\t\t\t<!-- <select name=\"ltewBorderType\" id=\"ltewBorderType\" class=\"form-control\" data-ng-model=\"modForm.buildObject.formBorderType\" data-ng-options=\"btype.id as btype.name for btype in borderTypeArray\">\n\t\t\t\t\t\t\t\t\t\t<option value=\"\">None</option>\n\t\t\t\t\t\t\t\t\t</select> -->\n\t\t\t\t\t\t\t\t\t<div class=\"btn-group btn-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label class=\"btn btn-primary\" data-ng-model=\"modForm.buildObject.formBorderType\" data-ng-change=\"borderTypeChange();\" uib-btn-radio=\"btype.id\" data-ng-repeat=\"btype in borderType track by btype.id\"><span class=\"show-on-active-inline-block glyphicon glyphicon-ok\"></span> {{btype.name}} </label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<!-- <div class=\"col-sm-2\">{{modForm.buildObject.formBorderType}}</div> -->\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm ng-hide\" data-ng-show=\"!isBorderTypeNone\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFormBgColor\" class=\"col-sm-4 control-label\">Background Color</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\" data-ng-style=\"{ backgroundColor: modForm.formBg, borderColor: modForm.formBg }\">&nbsp; &nbsp;</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"ltewFormBgColor\" name=\"ltewFormBgColor\" data-ng-model=\"modForm.formBg\" data-ng-model-options=\"modelOptions\" data-colorpicker data-colorpicker-parent-NOT-USED=\"true\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default btn-sm\" type=\"button\" data-ng-click=\"removeFormItem('formBg');\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm ng-hide\" data-ng-show=\"!isBorderTypeNone\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFormBorderColor\" class=\"col-sm-4 control-label\">Form Border Color</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\" data-ng-style=\"{ backgroundColor: modForm.formBorderColor, borderColor: modForm.formBorderColor }\">&nbsp; &nbsp;</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"ltewFormBorderColor\" name=\"ltewFormBorderColor\" data-ng-model=\"modForm.formBorderColor\" data-ng-model-options=\"modelOptions\" data-colorpicker data-colorpicker-parent-NOT-USED=\"true\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-btn\"><button class=\"btn btn-default btn-sm\" type=\"button\" data-ng-click=\"removeFormItem('formBorderColor');\"><span class=\"glyphicon glyphicon-remove\"></span></button></span>\n\t\t\t\t\t\t\t\t\t\t<!-- <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-remove\"></span></span> -->\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<!-- <div class=\"col-sm-4\"><button class=\"btn btn-primary btn-sm\" type=\"button\">Default</button></div> -->\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- <div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\tlabel.control-label.col-sm-2{Form Width}\n\t\t\t\t\t\t\t\t<div class=\"btn-group btn-group-sm\">\n\t\t\t\t\t\t\t\t\t<label class=\"btn btn-primary\"></label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div> -->\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm ng-hide\" data-ng-show=\"!isBorderTypeNone\">\n\t\t\t\t\t\t\t\t<label for=\"ltewBorderWidth\" class=\"col-sm-4 control-label\">Form Border Radius</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" data-ng-disabled=\"!!isBorderTypeNone\" class=\"form-control\" id=\"ltewBorderWidth\" name=\"ltewBorderWidth\" data-ng-model=\"modForm.formBorderRadius\" data-ng-model-options=\"modelOptions\" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFormTitle\" class=\"col-sm-4 control-label\">Form Title</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"text\" class=\"form-control\" id=\"ltewFormTitle\" name=\"ltewFormTitle\" data-ng-model=\"modForm.buildObject.panelTitle\" /></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFormTitleColor\" class=\"col-sm-4 control-label\">Title Color</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\" data-ng-style=\"{ backgroundColor: modForm.formTitleColor, borderColor: modForm.formTitleColor }\">&nbsp; &nbsp;</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"ltewFormTitleColor\" name=\"ltewFormTitleColor\" data-ng-model=\"modForm.formTitleColor\" data-ng-model-options=\"modelOptions\" data-colorpicker data-colorpicker-parent-NOT-USED=\"true\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default btn-sm\" type=\"button\" data-ng-click=\"removeFormItem('formTitleColor');\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFormTitleBgColor\" class=\"col-sm-4 control-label\">Title Background Color</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\" data-ng-style=\"{ backgroundColor: modForm.formTitleBgColor, borderColor: modForm.formTitleBgColor }\">&nbsp; &nbsp;</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"ltewFormTitleBgColor\" name=\"ltewFormTitleBgColor\" data-ng-model=\"modForm.formTitleBgColor\" data-ng-model-options=\"modelOptions\" data-colorpicker data-colorpicker-parent-NOT-USED=\"true\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-btn\"><button class=\"btn btn-default btn-sm\" type=\"button\" data-ng-click=\"removeFormItem('formTitleBgColor');\"><span class=\"glyphicon glyphicon-remove\"></span></button></span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewVerticalSpace\" class=\"col-sm-4 control-label\">Verticle Spacing</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"number\" min=\"0\" class=\"form-control\" id=\"ltewVerticalSpace\" name=\"ltewVerticalSpace\" data-ng-model=\"modForm.formGroupSpacing\" data-ng-model-options=\"modelOptions\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldBorderRadius\" class=\"col-sm-4 control-label\">Field Border Radius</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"number\" class=\"form-control\" id=\"ltewFieldBorderRadius\" name=\"ltewFieldBorderRadius\" min=\"0\" data-ng-model=\"modForm.formFieldBorderRadius\" data-ng-model-options=\"modelOptions\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewBtnBorderRadius\" class=\"col-sm-4 control-label\">Button Border Radius</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"number\" class=\"form-control\" id=\"ltewBtnBorderRadius\" name=\"ltewBtnBorderRadius\" min=\"0\" data-ng-model=\"modForm.formButtonBorderRadius\" data-ng-model-options=\"modelOptions\"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldSize\" class=\"col-sm-4 control-label\">Field Size</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t\t<div class=\"btn-group btn-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label class=\"btn btn-primary\" data-ng-model=\"modForm.buildObject.fieldSize\" data-ng-change=\"fieldSizeChange();\" data-uib-btn-radio=\"fsize.id\" data-ng-repeat=\"fsize in fieldSizeUnits\"><span class=\"show-on-active-inline-block glyphicon glyphicon-ok\"></span> {{fsize.name}}</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- .form-group.form-group-sm>label.col-sm-4.control-label[for=ltewSomeInput]{Label}+.col-sm-4>input.form-control#ltewSomeInput[name=ltewSomeInput type=text data-ng-model=modForm.something data-ng-model-options=modelOptions] -->\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t<h4>Preview:</h4>\n\t\t\t\t\t\t\t<hr />\n\t\t\t\t\t\t\t<style type=\"text/css\">{{previewStyles}}</style>\n\t\t\t\t\t\t\t<div class=\"ltw ltw-preview\" style=\"width:100%;\">\n\t\t\t\t\t\t\t\t<div class=\"panel panel-default lt-widget-border ng-hide\" data-ng-show=\"modForm.buildObject.formBorderType === borderType.panel.id\">\n\t\t\t\t\t\t\t\t\t<div class=\"panel-heading lt-widget-heading\" data-ng-show=\"modForm.buildObject.panelTitle\">{{modForm.buildObject.panelTitle}}</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><input type=\"text\" class=\"form-control\" placeholder=\"Field\"></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><textarea name=\"\" id=\"\" cols=\"30\" rows=\"1\" class=\"form-control\" placeholder=\"Text\"></textarea></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><select name=\"\" id=\"\" class=\"form-control\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\">Drop Down</option>\n\t\t\t\t\t\t\t\t\t\t\t\t</select></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t<p>paragraph text</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><button class=\"btn btn-primary\" data-ng-class=\"buttonSizeClass\" type=\"button\">Button</button></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<!-- (.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>input.form-control[type=text placeholder=\"Field\"])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>textarea.form-control[placeholder=\"Text\" rows=1])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>select.form-control>option{Drop Down})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>p{paragraph text})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>button.btn.btn-primary[type=button data-ng-class=buttonSizeClass]{Button}) -->\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"well lt-widget-border ng-hide\" data-ng-show=\"modForm.buildObject.formBorderType === borderType.well.id\">\n\t\t\t\t\t\t\t\t\t<h4 class=\"lt-widget-heading\" data-ng-show=\"modForm.buildObject.panelTitle\">{{modForm.buildObject.panelTitle}}</h4>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><input type=\"text\" class=\"form-control\" placeholder=\"Field\"></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><textarea name=\"\" id=\"\" cols=\"30\" rows=\"1\" class=\"form-control\" placeholder=\"Text\"></textarea></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><select name=\"\" id=\"\" class=\"form-control\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\">Drop Down</option>\n\t\t\t\t\t\t\t\t\t\t\t\t</select></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t<p>paragraph text</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><button class=\"btn btn-primary\" data-ng-class=\"buttonSizeClass\" type=\"button\">Button</button></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"ng-hide\" data-ng-show=\"modForm.buildObject.formBorderType === borderType.none.id\">\n\t\t\t\t\t\t\t\t\t<h4 class=\"lt-widget-heading\" data-ng-show=\"modForm.buildObject.panelTitle\">{{modForm.buildObject.panelTitle}}</h4>\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><input type=\"text\" class=\"form-control\" placeholder=\"Field\"></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><textarea name=\"\" id=\"\" cols=\"30\" rows=\"1\" class=\"form-control\" placeholder=\"Text\"></textarea></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><select name=\"\" id=\"\" class=\"form-control\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\">Drop Down</option>\n\t\t\t\t\t\t\t\t\t\t\t\t</select></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t\t\t<p>paragraph text</p>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><button class=\"btn btn-primary\" data-ng-class=\"buttonSizeClass\" type=\"button\">Button</button></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t<button class=\"btn btn-sm btn-primary\" type=\"submit\">Save</button>\n\t\t\t\t\t<button class=\"btn btn-sm btn-default\" data-ng-click=\"cancelClick();\">Cancel</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t");
            $templateCache.put('template/modal/editField.html', "\n\t\t\t<form class=\"form-horizontal\" data-ng-submit=\"saveClick();\" data-ng-init=\"ft = fieldOptions.fieldTemplate\">\n\t\t\t\t<div class=\"modal-header alert alert-info\">\n\t\t\t\t\t<h3 class=\"modal-title\">Edit Widget Field</h3>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t<!-- .form-group.form-group-sm>label.col-sm-2.control-label[for=ltewFieldWidth]{Form Width}+.col-sm-2>input.form-control#ltewFieldWidth[type=number name=ltewFieldWidth data-ng-model=modField.formWidth] -->\n\t\t\t\t\t\t\t<!-- <pre style=\"white-space: pre-wrap;\">{{fieldOptions}}</pre>\n\t\t\t\t\t\t\t<pre style=\"white-space: pre-wrap;\">['textarea'].indexOf(ft.element) &gt;= 0</pre> -->\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldCols\" class=\"col-sm-4 control-label\">Grid Width</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><select name=\"ltewFieldCols\" id=\"ltewFieldCols\" class=\"form-control\" data-ng-model=\"modField.cols\" data-ng-options=\"gridCol.id as gridCol.name for gridCol in ::gridColumnsArray | orderBy: '-id'\"></select></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"!(['p','title'].indexOf(ft.element) >= 0)\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldSize\" class=\"col-sm-4 control-label\">Field Size</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\">\n\t\t\t\t\t\t\t\t\t<div class=\"btn-group btn-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<label class=\"btn btn-primary\" data-ng-model=\"modField.size\" data-ng-change=\"fieldSizeChange();\" data-uib-btn-radio=\"fsize.id\" data-ng-repeat=\"fsize in ::fieldSizeUnits\"><span class=\"show-on-active-inline-block glyphicon glyphicon-ok\"></span> {{fsize.name}}</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"ft.element === 'title'\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldHeaderSize\" class=\"col-sm-4 control-label\">Heading Size</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><select name=\"ltewFieldHeaderSize\" id=\"ltewFieldHeaderSize\" class=\"form-control\" data-ng-model=\"modField.nsize\" data-ng-options=\"hd.id as hd.name for hd in ::headingArray\"></select></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"!(['captcha'].indexOf(ft.element) >= 0)\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldFontSize\" class=\"col-sm-4 control-label\">Font Size</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"8\" max=\"32\" class=\"form-control\" id=\"ltewFieldFontSize\" name=\"ltewFieldFontSize\" data-ng-model=\"modField.fontSize\" data-ng-model-options=\"modelOptions\" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"!(['captcha'].indexOf(ft.element) >= 0)\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldFontColor\" class=\"col-sm-4 control-label\">Font Color</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\" data-ng-style=\"{ backgroundColor: modField.color, borderColor: modField.color }\">&nbsp; &nbsp;</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"ltewFieldFontColor\" name=\"ltewFieldFontColor\" data-ng-model=\"modField.color\" data-ng-model-options=\"modelOptions\" data-colorpicker data-colorpicker-parent-NOT-USED=\"true\" colorpicker-fixed-position-NOT-USED=\"true\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default btn-sm\" type=\"button\" data-ng-click=\"removeFieldItem('color');\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"!(['label','captcha','title'].indexOf(ft.element) >= 0)\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldBgColor\" class=\"col-sm-4 control-label\">Background Color</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\" data-ng-style=\"{ backgroundColor: modField.backgroundColor, borderColor: modField.backgroundColor }\">&nbsp; &nbsp;</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"ltewFieldBgColor\" name=\"ltewFieldBgColor\" data-ng-model=\"modField.backgroundColor\" data-ng-model-options=\"modelOptions\" data-colorpicker data-colorpicker-parent-NOT-USED=\"true\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default btn-sm\" type=\"button\" data-ng-click=\"removeFieldItem('backgroundColor');\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"!(['label','captcha','title'].indexOf(ft.element) >= 0)\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldBorderColor\" class=\"col-sm-4 control-label\">Border Color</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"input-group input-group-sm\">\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-addon\" data-ng-style=\"{ backgroundColor: modField.borderColor, borderColor: modField.borderColor }\">&nbsp; &nbsp;</span>\n\t\t\t\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"ltewFieldBorderColor\" name=\"ltewFieldBorderColor\" data-ng-model=\"modField.borderColor\" data-ng-model-options=\"modelOptions\" data-colorpicker data-colorpicker-parent-NOT-USED=\"true\" />\n\t\t\t\t\t\t\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-default btn-sm\" type=\"button\" data-ng-click=\"removeFieldItem('borderColor');\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n\t\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"!(['label','captcha','title'].indexOf(ft.element) >= 0)\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldBorderRadius\" class=\"col-sm-4 control-label\">Border Radius</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" class=\"form-control\" id=\"ltewFieldBorderRadius\" name=\"ltewFieldBorderRadius\" data-ng-model=\"modField.borderRadius\" data-ng-model-options=\"modelOptions\" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"['p','textarea','title','button'].indexOf(ft.element) >= 0\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldPadding\" class=\"col-sm-4 control-label\">Padding</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<input type=\"number\" min=\"0\" class=\"form-control\" id=\"ltewFieldPadding\" name=\"ltewFieldPadding\" data-ng-model=\"modField.padding\" data-ng-model-options=\"modelOptions\" />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"ft.element === 'p'\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldValueTextArea\" class=\"col-sm-4 control-label\">Text</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-8\"><textarea name=\"ltewFieldValueTextArea\" id=\"ltewFieldValueTextArea\" cols=\"30\" rows=\"2\" class=\"form-control\" data-ng-model=\"modField.value\" data-ng-model-options=\"modelOptions\"></textarea></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"['label','title','button'].indexOf(ft.element) >= 0\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldValue\" class=\"col-sm-4 control-label\">Text</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"text\" class=\"form-control\" id=\"ltewFieldValue\" name=\"ltewFieldValue\" data-ng-model=\"modField.value\" data-ng-model-options=\"modelOptions\" /></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"['input','select','textarea'].indexOf(ft.element) >= 0\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldPlaceholder\" class=\"col-sm-4 control-label\">Placeholder Text</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"text\" class=\"form-control\" id=\"ltewFieldPlaceholder\" name=\"ltewFieldPlaceholder\" data-ng-model=\"modField.placeholder\" data-ng-model-options=\"modelOptions\" /></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"ft.element === 'textarea'\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldRows\" class=\"col-sm-4 control-label\">Textarea Rows</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"number\" min=\"1\" max=\"50\" class=\"form-control\" id=\"ltewFieldRows\" name=\"ltewFieldRows\" data-ng-model=\"modField.rows\" data-ng-model-options=\"modelOptions\" /></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"form-group form-group-sm\" data-ng-show=\"['input','select','textarea'].indexOf(ft.element) >= 0\">\n\t\t\t\t\t\t\t\t<label for=\"ltewFieldRequired\" class=\"col-sm-4 control-label\">Require Field</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t\t\t<div class=\"checkbox\">\n\t\t\t\t\t\t\t\t\t\t<label for=\"\"><input type=\"checkbox\" id=\"ltewFieldRequired\" name=\"ltewFieldRequired\" data-ng-model=\"modField.required\" /></label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- .form-group.form-group-sm>label.col-sm-4.control-label[for=ltewSomeInput]{Label}+.col-sm-4>input.form-control#ltewSomeInput[name=ltewSomeInput data-ng-model=modField.something data-ng-model-options=modelOptions] -->\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-sm-4\">\n\t\t\t\t\t\t\t<h4>Preview:</h4>\n\t\t\t\t\t\t\t<hr />\n\t\t\t\t\t\t\t<style type=\"text/css\">{{previewStyles}}</style>\n\t\t\t\t\t\t\t<div class=\"ltw ltw-preview\" style=\"width:100%;\">\n\t\t\t\t\t\t\t\t<div data-ng-show=\"ft.element === 'input'\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><input type=\"text\" class=\"form-control\" data-ng-style=\"fieldStyle\" data-ng-class=\"fieldSizeClass\" placeholder=\"Field Placeholder Text\" value=\"Text Field\" /></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><input type=\"text\" class=\"form-control\" data-ng-style=\"fieldStyle\" data-ng-class=\"fieldSizeClass\" placeholder=\"placeholder text doesn't change color\" /></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-show=\"ft.element === 'select'\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t<select class=\"form-control\" data-ng-style=\"fieldStyle\", data-ng-class=\"fieldSizeClass\">\n\t\t\t\t\t\t\t\t\t\t\t<option value=\"\">{{modField.placeholder}}</option>\n\t\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div data-ng-show=\"ft.element === 'textarea'\">\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><textarea class=\"form-control\" rows=\"{{modField.rows || 1}}\" data-ng-style=\"fieldStyle\" data-ng-class=\"fieldSizeClass\" placeholder=\"placeholder text doesn't change color\">Textarea</textarea></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><textarea class=\"form-control\" rows=\"{{modField.rows || 1}}\" data-ng-style=\"fieldStyle\" data-ng-class=\"fieldSizeClass\" placeholder=\"placeholder text doesn't change color\"></textarea></div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-show=\"ft.element === 'button'\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\"><button class=\"btn btn-primary\" type=\"button\" data-ng-style=\"fieldStyle\" data-ng-class=\"buttonSizeClass\">{{modField.value || 'Submit'}}</button></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-show=\"ft.element === 'p'\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t<p data-ng-style=\"fieldStyle\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-show=\"ft.element === 'label'\">\n\t\t\t\t\t\t\t\t\t<label for=\"\" class=\"control-label col-sm-8\" data-ng-style=\"fieldStyle\" data-ng-class=\"fieldSizeClass\">{{modField.value || 'Input Label'}}</label>\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-4\"><input type=\"text\" class=\"form-control\" data-ng-class=\"fieldSizeClass\" placeholder=\"&lt;- Label\" /></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"form-group\" data-ng-show=\"ft.element === 'title'\">\n\t\t\t\t\t\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t\t\t\t\t\t<h1 data-ng-show=\"modField.nsize === 1\" data-ng-style=\"fieldStyle\">{{modField.value || 'Title'}}</h1>\n\t\t\t\t\t\t\t\t\t\t<h2 data-ng-show=\"modField.nsize === 2\" data-ng-style=\"fieldStyle\">{{modField.value || 'Title'}}</h2>\n\t\t\t\t\t\t\t\t\t\t<h3 data-ng-show=\"modField.nsize === 3\" data-ng-style=\"fieldStyle\">{{modField.value || 'Title'}}</h3>\n\t\t\t\t\t\t\t\t\t\t<h4 data-ng-show=\"modField.nsize === 4\" data-ng-style=\"fieldStyle\">{{modField.value || 'Title'}}</h4>\n\t\t\t\t\t\t\t\t\t\t<h5 data-ng-show=\"modField.nsize === 5\" data-ng-style=\"fieldStyle\">{{modField.value || 'Title'}}</h5>\n\t\t\t\t\t\t\t\t\t\t<h6 data-ng-show=\"modField.nsize === 6\" data-ng-style=\"fieldStyle\">{{modField.value || 'Title'}}</h6>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<!-- (.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>input.form-control[type=text placeholder=\"Field\"])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>textarea.form-control[placeholder=\"Text\" rows=1])+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>select.form-control>option{Drop Down})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>p{paragraph text})+(.form-group[data-ng-class=fieldSizeClass]>.col-sm-12>button.btn.btn-primary[type=button data-ng-class=buttonSizeClass]{Button}) -->\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t<button class=\"btn btn-sm btn-primary\" type=\"submit\">Save</button>\n\t\t\t\t\t<button class=\"btn btn-sm btn-default\" data-ng-click=\"cancelClick();\">Cancel</button>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t");
        }]);
})();
