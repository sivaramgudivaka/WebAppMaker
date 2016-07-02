(function(){
    angular
        .module("WebAppMakerApp")
        .controller("EditStatementController", EditStatementController);

    // controller for the statement editor
    function EditStatementController($routeParams, PageService, ScriptService, WidgetService, StatementService, $location, $scope) {

        var vm = this;

        vm.statementId = $routeParams.statementId;

        vm.statementTypes = [
            {label: 'Numeric'},
            {label: 'String'},
            {label: 'Boolean'},
            {label: 'If'},
            {label: 'Navigation'},
            {label: 'Date'},
            {label: 'Database'}
        ];
        vm.statementType = vm.statementTypes[0];

        vm.filters = [
            {variable1: "var 1", value1: "", comparator: "=", variable2: "var 2", value2: ""},
            {variable1: "var 3", value1: "", comparator: ">", variable2: "var 3", value2: ""},
            {variable1: null, value1: "value 4", comparator: "<", variable2: null, value2: "value 5"}
        ];

        vm.databaseOperations = [
            {label: 'Select'},
            {label: 'Insert'},
            {label: 'Update'},
            {label: 'Delete'}
        ];
        vm.databaseOperation = vm.databaseOperations[0];

        vm.dateOperations = [
            {label: 'Add'},
            {label: 'Subtract'},
            {label: 'Create Date from String'},
            {label: 'Create Date from milliseconds'},
            {label: 'Create Date from selecting in calendar'},
            {label: 'Create Date by providing each parameter'}
        ];

        vm.collections = [
            {label: 'Collection 1'},
            {label: 'Collection 2'},
            {label: 'Collection 3'}
        ];

        vm.variables = [
            {label: 'Var 1'},
            {label: 'Var 2'},
            {label: 'Var 3'}
        ];

        vm.comparators = [
            {label: '='},
            {label: '>'},
            {label: '>='},
            {label: '<'},
            {label: '<='}
        ];

        vm.verboseComparators = [
            {label: 'Equal to'},
            {label: 'Greater than'},
            {label: 'Greater than or equal'},
            {label: 'Less than'},
            {label: 'Less than or equal'}
        ];

        vm.ifThen = [
            {label: 'Go to statement'},
            {label: 'Navigate to page'}
        ];

        // route params
        vm.username    = $routeParams.username;
        vm.developerId = $routeParams.developerId;
        vm.websiteId   = $routeParams.websiteId;
        vm.pageId      = $routeParams.pageId;
        vm.widgetId    = $routeParams.widgetId;
        vm.scriptId    = $routeParams.scriptId;
        vm.statementId = $routeParams.statementId;

        // event handlers
        vm.saveStatement = saveStatement;
        vm.deleteStatement = deleteStatement;

        // retrieve statement on load
        function init() {
            WidgetService
                .findWidgetsForWebsite(vm.websiteId)
                .then(
                    function(response) {
                        vm.widgets = response.data;
                        return PageService
                            .findPagesForWebsite(vm.websiteId);
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
                .then(
                    function(response) {
                        vm.collections = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
            if(vm.statementId === 'new') {
                vm.statement = {};
            } else {
                StatementService
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
            StatementService
                .findAllStatements(vm)
                .then(
                    function(response) {
                        vm.statements = response.data;
                        vm.stmtvariables =[];
                        for(var stmt in vm.statements){
                            var st = vm.statements[stmt];
                            if (st.stringStatement && st.stringStatement.output){
                                vm.stmtvariables.push(st.stringStatement.output)
                            }
                            if (st.booleanStatement && st.booleanStatement.output){
                                vm.stmtvariables.push(st.booleanStatement.output)
                            }
                            if (st.numberStatement && st.numberStatement.output){
                                vm.stmtvariables.push(st.numberStatement.output)
                            }
                            if (st.dateStatement && st.dateStatement.resultVariable){
                                vm.stmtvariables.push(st.dateStatement.resultVariable)
                            }
                            for(var variable in st.variables){
                                vm.stmtvariables.push(st.variables[variable]);
                            }
                        }
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
                        $location.url("/developer/"+vm.developerId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/script");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function saveStatement() {
           // console.log(vm.statement);

            vm.statement.name= vm.statementName;

            // vm.dateStatement.dateOperation = vm.statement.dateStatement.dateOperation.label;

            if (vm.statementType.label === "If")
                vm.statement.ifStatement.comparator = vm.statement.ifStatement.comparator.label;
            
            /*if (vm.statementType.label === "Boolean"){
                if(vm.statement.booleanStatement.input1 === 'NOT'){
                }
            }*/

            StatementService
                .saveStatement(vm, vm.statement)
                .then(
                    function() {
                        $location.url("/developer/"+vm.developerId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/script");
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
        vm.developerId   = $routeParams.developerId;
        vm.websiteId     = $routeParams.websiteId;
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
})();