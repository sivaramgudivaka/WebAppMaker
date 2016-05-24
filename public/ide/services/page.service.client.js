(function () {
    angular
        .module ("WebAppMakerApp")
        .factory ("PageService", pageService);

    function pageService ($http) {
        var api = {
            createPage: createPage,
            findPagesForApplication: findPagesForApplication,
            findPage: findPage,
            removePage: removePage,
            updatePage: updatePage,
            sortPage: sortPage
        };
        return api;

        function sortPage(applicationId, startIndex, endIndex) {
            return $http.put("/api/website/"+applicationId+"/page?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function updatePage(applicationId, page) {
            return $http.put("/api/website/"+applicationId+"/page/"+page._id, page);
        }

        function removePage(applicationId, pageId) {
            return $http.delete("/api/website/"+applicationId+"/page/"+pageId);
        }


        function findPage(applicationId, pageId) {
            return $http.get("/api/website/"+applicationId+"/page/"+pageId);
        }

        function findPagesForApplication(applicationId) {
            return $http.get("/api/website/"+applicationId+"/page");
        }

        function createPage(applicationId, page) {
            return $http.post("/api/website/"+applicationId+"/page", page);
        }
    }
})();