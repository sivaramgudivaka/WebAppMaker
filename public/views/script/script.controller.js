(function(){
    angular
        .module("WebAppMakerApp")
        .controller("ScriptListController", ScriptListController);

    function ScriptListController($routeParams) {

        var vm = this;

        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        function init() {

        }
        init();
    }
})();