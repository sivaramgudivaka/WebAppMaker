(function(){
    angular
        .module("WebAppMakerApp")
        .controller("EditStatementController", EditStatementController)
        .controller("ChooseStatementController", ChooseStatementController)
        .controller("EditScriptController", EditScriptController)
        .controller("NewScriptController", NewScriptController)
        .controller("ScriptListController", ScriptListController);

    // controller for the statement editor
    function EditStatementController($routeParams, ScriptService, $location) {
        
        var vm = this;

        // route params
        vm.username    = $routeParams.username;
        vm.websiteId   = $routeParams.websiteId;
        vm.pageId      = $routeParams.pageId;
        vm.widgetId    = $routeParams.widgetId;
        vm.statementId = $routeParams.statementId;

        // event handlers
        vm.updateStatement = updateStatement;
        vm.deleteStatement = deleteStatement;

        // retrieve statement on load
        function init() {
            ScriptService
                .findStatement(vm)
                .then(
                    function(response) {
                        vm.statement = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function deleteStatement() {
            ScriptService
                .deleteStatement(vm)
                .then(
                    function() {
                        $location.url("/developer/"+vm.username+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/script/edit");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function updateStatement() {
            console.log(vm.statement);
            ScriptService
                .updateStatement(vm, vm.statement)
                .then(
                    function() {
                        $location.url("/developer/"+vm.username+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/script/edit");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

    function ChooseStatementController($routeParams, ScriptService, $location) {

        var vm = this;

        // route params
        vm.username      = $routeParams.username;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        vm.selectStatement = selectStatement;

        // handle statement type selection
        function selectStatement(statementType) {
            // notify Web service of new statement
            ScriptService
                .addStatement(vm, statementType)
                .then(
                    function(response) {
                        var statements = response.data.button.script.statements;
                        var lastStatement = statements[statements.length - 1];
                        $location.url("/developer/"+vm.username+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/" + vm.widgetId + "/script/statement/" + lastStatement._id);
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
        vm.websiteId     = $routeParams.websiteId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        // event handlers
        vm.saveScript      = saveScript;

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
                            url += "/website/" + vm.websiteId;
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
        vm.websiteId = $routeParams.websiteId;
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
        vm.websiteId = $routeParams.websiteId;
        vm.pageId        = $routeParams.pageId;
        vm.widgetId      = $routeParams.widgetId;

        function init() {

        }
        init();
    }
})();