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
        function remove(websiteId, username, websitename, pagename, recordId) {
            return $http.delete("/api/database/"+username+"/"+websitename+"/"+pagename+"/"+recordId);
        }

        // client service to retrieve data from database.
        // use page name as collection
        // use input widget names as fields
        function select(username, websitename, pagename) {
            return $http.get("/api/database/"+username+"/"+websitename+"/"+pagename);
        }

        // post database insert command to server. page name is collection, fields contains document 
        function executeCommand(dbCommand, username, websitename, pagename, fields) {
            console.log([dbCommand, pagename, fields]);
            if(dbCommand === "INSERT") {
                    return $http.post("/api/database/"+username+"/"+websitename+"/"+pagename, fields);
            }
        }

    }
})();