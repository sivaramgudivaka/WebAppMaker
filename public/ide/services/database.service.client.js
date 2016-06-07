(function(){
    angular
        .module("WebAppMakerApp")
        .factory("DatabaseService", databaseService);

    function databaseService($http) {

        var api = {
            executeCommand: executeCommand,
            select: select,
            delete: remove
        };
        return api;

        // send delete request to database Web service
        function remove(websiteId, pageName, recordId) {
            return $http.delete("/api/database/"+pageName+"/"+recordId);
        }

        // client service to retrieve data from database.
        // use page name as collection
        // use input widget names as fields
        function select(pageName) {
            return $http.get("/api/database/"+pageName);
        }

        // post database insert command to server. page name is collection, fields contains document 
        function executeCommand(dbCommand, pageName, fields) {
            console.log([dbCommand, pageName, fields]);
            if(dbCommand === "INSERT") {
                    return $http.post("/api/database/"+pageName, fields);
            }
        }

    }
})();