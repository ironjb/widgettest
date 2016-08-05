/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts" />

// Sets jQuery to unique var and keeps it from conflicting with any other version of jQuery that may be loaded.
var ltjQuery: JQueryStatic = ltjQuery || jQuery.noConflict(true);
