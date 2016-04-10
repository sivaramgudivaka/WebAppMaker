(function(){
    angular
        .module("WebAppMakerApp")
        .controller("NewScriptController", NewScriptController)
        .controller("ScriptListController", ScriptListController);

    function NewScriptController($routeParams, ScriptService) {

        var vm = this;

        // route params
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        // event handlers
        vm.createScript  = createScript;

        function init() {

        }
        init();
        
        function createScript(script) {
            ScriptService
                .createScript(vm, script);
        }
    }

    function ScriptListController($routeParams) {

        var vm = this;

        // route params
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        function init() {

        }
        init();
    }
})();