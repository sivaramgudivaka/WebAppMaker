(function () {
    angular
        .module ("WebAppMakerApp")
        .controller ("ShareApplicationController", shareApplicationController)
        .controller ("ApplicationListController", applicationListController)
        .controller ("NewApplicationController", newApplicationController)
        .controller ("EditApplicationController", editApplicationController);

    function shareApplicationController
        ($routeParams, ApplicationService, $location) {

        var vm = this;
        vm.username = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        
        vm.shareApplication = shareApplication;
        vm.unshareApplication = unshareApplication;

        function init() {
            ApplicationService
                .findDevelopersSharingApplication(vm.applicationId)
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

        function unshareApplication(username) {
            ApplicationService
                .unshareApplication(vm.applicationId, username)
                .then(
                    function(response) {
                        return ApplicationService
                            .findDevelopersSharingApplication(vm.applicationId);
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

        function shareApplication(developer) {
            ApplicationService
                .shareApplication(vm.applicationId, developer.username)
                .then(
                    function(response) {
                        return ApplicationService
                            .findDevelopersSharingApplication(vm.applicationId);
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

    function editApplicationController
        ($routeParams, ApplicationService, $location) {

        var vm = this;
        vm.username = $routeParams.username;
        vm.applicationId = $routeParams.applicationId;
        vm.removeApplication = removeApplication;

        function init () {
            ApplicationService
                .findApplicationById($routeParams.applicationId)
                .then(
                    function(response) {
                        vm.application = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                )
        }
        init ();

        function removeApplication(application) {
            ApplicationService
                .removeApplication(application)
                .then(
                    function(response) {
                        $location.url ("/developer/"+vm.username+"/application");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

    function applicationListController (
        $routeParams, ApplicationService) {

        var vm = this;
        vm.username = $routeParams.username;

        function init () {
            ApplicationService
                .findApplicationsForUsername (vm.username)
                .then (
                    function (response) {
                        vm.applications = response.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
        init ();
    }

    function newApplicationController (
        $routeParams, ApplicationService, $location) {

        var vm = this;
        vm.username = $routeParams.username;
        vm.createApplication = createApplication;

        function createApplication (application) {
            application.developerUsername = vm.username;
            ApplicationService
                .createApplication (application)
                .then (
                    function (response) {
                        $location.url ("/developer/"+vm.username+"/application");
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
    }
})();