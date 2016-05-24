(function () {
    angular
        .module ("WebAppMakerApp")
        .controller ("ShareWebiteController", shareWebiteController)
        .controller ("WebiteListController", webiteListController)
        .controller ("NewWebiteController", newWebiteController)
        .controller ("EditWebiteController", editWebiteController);

    function shareWebiteController
        ($routeParams, WebiteService, $location) {

        var vm = this;
        vm.username = $routeParams.username;
        vm.webiteId = $routeParams.webiteId;
        
        vm.shareWebite = shareWebite;
        vm.unshareWebite = unshareWebite;

        function init() {
            WebiteService
                .findDevelopersSharingWebite(vm.webiteId)
                .then(
                    function(response) {
                        vm.developers = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function unshareWebite(username) {
            WebiteService
                .unshareWebite(vm.webiteId, username)
                .then(
                    function(response) {
                        return WebiteService
                            .findDevelopersSharingWebite(vm.webiteId);
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
                .then(
                    function(response) {
                        vm.developers = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function shareWebite(developer) {
            WebiteService
                .shareWebite(vm.webiteId, developer.username)
                .then(
                    function(response) {
                        return WebiteService
                            .findDevelopersSharingWebite(vm.webiteId);
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
                .then(
                    function(response) {
                        vm.developers = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

    function editWebiteController
        ($routeParams, WebiteService, $location) {

        var vm = this;
        vm.username = $routeParams.username;
        vm.webiteId = $routeParams.webiteId;
        vm.removeWebite = removeWebite;
        vm.updateWebite = updateWebite;

        function init () {
            WebiteService
                .findWebiteById($routeParams.webiteId)
                .then(
                    function(response) {
                        vm.webite = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
        }
        init ();

        function removeWebite(webite) {
            WebiteService
                .removeWebite(webite)
                .then(
                    function(response) {
                        $location.url ("/developer/"+vm.username+"/website");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function updateWebite(webite) {
            WebiteService
                .updateWebite(webite)
                .then(
                    function(response) {
                        $location.url ("/developer/"+vm.username+"/website");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

    function webiteListController (
        $routeParams, WebiteService) {

        var vm = this;
        vm.username = $routeParams.username;

        function init () {
            WebiteService
                .findWebitesForUsername (vm.username)
                .then (
                    function (response) {
                        vm.webites = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
        init ();
    }

    function newWebiteController (
        $routeParams, WebiteService, $location) {

        var vm = this;
        vm.username = $routeParams.username;
        vm.createWebite = createWebite;

        function createWebite (webite) {
            webite.developerUsername = vm.username;
            WebiteService
                .createWebite (webite)
                .then (
                    function (response) {
                        $location.url ("/developer/"+vm.username+"/website");
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
    }
})();