(function () {
    angular
        .module ("WebAppMakerApp")
        .factory ("ApplicationService", applicationService);

    function applicationService ($http) {
        var api = {
            createApplication: createApplication,
            findApplicationsForUsername: findApplicationsForUsername,
            findApplicationById: findApplicationById,
            removeApplication: removeApplication,
            shareApplication: shareApplication,
            unshareApplication: unshareApplication,
            findDevelopersSharingApplication: findDevelopersSharingApplication
        };
        return api;

        function findDevelopersSharingApplication(applicationId) {
            return $http.get("/api/share/"+applicationId);
        }

        function unshareApplication(applicationId, username) {
            return $http.delete("/api/share/"+applicationId+"/developer/"+username);
        }

        function shareApplication(applicationId, username) {
            return $http.post("/api/share/"+applicationId+"/developer/"+username);
        }

        function removeApplication(application) {
            return $http.delete ("/api/application/"+application._id);
        }

        function findApplicationById (applicationId) {
            return $http.get ("/api/application/"+applicationId);
        }

        function findApplicationsForUsername (username) {
            return $http.get ("/api/developer/"+username+"/application");
        }

        function  createApplication (application) {
            return $http.post ("/api/developer/"+application.developerUsername+"/application", application);
        }
    }
})();