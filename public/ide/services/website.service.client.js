(function () {
    angular
        .module ("WebAppMakerApp")
        .factory ("WebsiteService", websiteService);

    function websiteService ($http) {
        var api = {
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            findWebsitesForUsername: findWebsitesForUsername,
            findWebsiteById: findWebsiteById,
            removeWebsite: removeWebsite,
            shareWebsite: shareWebsite,
            unshareWebsite: unshareWebsite,
            findDevelopersSharingWebsite: findDevelopersSharingWebsite
        };
        return api;

        function findDevelopersSharingWebsite(websiteId) {
            return $http.get("/api/share/"+websiteId);
        }

        function unshareWebsite(websiteId, username) {
            return $http.delete("/api/share/"+websiteId+"/developer/"+username);
        }

        function shareWebsite(websiteId, username) {
            return $http.post("/api/share/"+websiteId+"/developer/"+username);
        }

        function updateWebsite(website) {
            return $http.put ("/api/website/"+website._id, website);
        }

        function removeWebsite(website) {
            return $http.delete ("/api/website/"+website._id);
        }

        function findWebsiteById (websiteId) {
            return $http.get ("/api/website/"+websiteId);
        }

        function findWebsitesForUsername (username) {
            return $http.get ("/api/developer/"+username+"/website");
        }

        function  createWebsite (website) {
            return $http.post ("/api/developer/"+website.developerUsername+"/website", website);
        }
    }
})();