(function(){
    angular
        .module("WebAppMakerApp")
        .controller("ChooseStatementController", ChooseStatementController)
        .controller("EditScriptController", EditScriptController)
        .controller("NewScriptController", NewScriptController)
        .controller("ScriptListController", ScriptListController);

    function ChooseStatementController($routeParams, ScriptService) {

        var vm = this;

        // route params
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        vm.selectStatement = selectStatement;

        // handle statement type selection
        function selectStatement(statementType) {
            // notify Web service of new statement
            ScriptService
                .addStatement(vm, statementType)
                .then(
                    function() {
                        $location.url("/developer/"+vm.username+"/application/"+vm.applicationId+"/page/"+vm.pageId+"/widget/" + newWidget._id + "/edit");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

    }

    function EditScriptController($routeParams, ScriptService, $location) {

        var vm = this;

        // route params
        vm.username      = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        // event handlers
        vm.saveScript  = saveScript;

        function init() {
            ScriptService
                .findScript(vm)
                .then(
                    function(response) {
                        vm.script = response.data
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function saveScript(script) {
            ScriptService
                .saveScript(vm, script)
                .then(
                    function(){
                        var url  = "/developer/" + vm.username;
                            url += "/application/" + vm.applicationId;
                            url += "/page/" + vm.pageId;
                            url += "/widget/" + vm.widgetId;
                            url += "/edit";
                        $location.url(url);
                    },
                    function(err){
                        vm.error = err;
                    }
                );
        }
    }

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