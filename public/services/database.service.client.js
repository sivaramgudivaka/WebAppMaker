(function(){
    angular
        .module("WebAppMakerApp")
        .factory("DatabaseService", databaseService);

    function databaseService($http) {

        var api = {
            executeCommand: executeCommand
        };
        return api;

        // post database insert command to server. page name is collection, fields contains document 
        function executeCommand(dbCommand, page, fields) {
            console.log([dbCommand, page, fields]);
            if(dbCommand === "INSERT") {
                    return $http.post("/api/database/"+page.name, fields);
            }
        }

    }
})();