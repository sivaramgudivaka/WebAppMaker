(function(){
    angular
        .module("WebAppMakerApp")
        .factory("DatabaseService", databaseService);

    function databaseService($http) {

        var api = {
            executeCommand: executeCommand,
            select: select
        };
        return api;

        // client service to retrieve data from database.
        // use page name as collection
        // use input widget names as fields
        function select(pageName) {
            return $http.get("/api/database/"+pageName);
        }

        // post database insert command to server. page name is collection, fields contains document 
        function executeCommand(dbCommand, page, fields) {
            console.log([dbCommand, page, fields]);
            if(dbCommand === "INSERT") {
                    return $http.post("/api/database/"+page.name, fields);
            }
        }

    }
})();