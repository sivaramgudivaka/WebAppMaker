(function () {
    angular
        .module ("WebAppMakerApp")
        .controller ("RegisterController", registerController)
        .controller ("LoginController", loginController)
        .controller ("DeveloperListController", developerListController)
        .controller ("NewDeveloperController", newDeveloperController)
        .controller ("EditDeveloperController", editDeveloperController);

    function developerListController (DeveloperService) {
        var vm = this;

        function init () {
            DeveloperService
                .findAllDevelopers ()
                .then(
                    function (developers) {
                        vm.developers = developers.data;
                    },
                    function (err) {
                        vm.error = err;
                    }
                )
        }
        init ();
    }

    function newDeveloperController (
        DeveloperService, $location
    ) {
        var vm = this;
        vm.createDeveloper = createDeveloper;

        function createDeveloper (developer) {
            DeveloperService
                .createDeveloper (developer)
                .then (
                    function (developer) {
                        vm.developer = developer;
                        $location.url ("/developer");
                    },
                    function (error) {
                        vm.error = error;
                    }
                )
        }
    }

    function editDeveloperController (
        $routeParams, DeveloperService, $location, $rootScope) {
        
        var username = $rootScope.currentUser.username;

        var vm = this;
        vm.updateDeveloper = updateDeveloper;
        vm.deleteDeveloper = deleteDeveloper;

        function init () {
            DeveloperService
                .findDeveloperByUsername(username)
                .then (
                    function (response) {
                        vm.developer = response.data;
                    },
                    function (error) {
                        vm.error = error;
                    }
                );
        }
        init();

        function deleteDeveloper (developer) {
            DeveloperService
                .deleteDeveloper(developer)
                .then (
                    function (response) {
                        $location.url("/developer/" + username + "/edit");
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

        function updateDeveloper (developer) {
            DeveloperService
                .updateDeveloper(developer)
                .then (
                    function (response) {
                        $location.url("/developer/" + username + "/edit");
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }
    }

    function registerController(SecurityService, $rootScope, $location) {
        var vm = this;
        vm.register = register;

        function register(developer) {
            if(!developer || !developer.username || !developer.password || !developer.password2)
                return;
            delete developer.password2;
            SecurityService
                .register(developer)
                .then(
                    function(response) {
                        if(response.data) {
                            $rootScope.currentUser = response.data;
                            $location.url("/developer/"+developer.username+"/edit");
                        }
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }

    function loginController(SecurityService, $rootScope, $location) {
        var vm = this;
        vm.login = login;

        function login(developer) {
            SecurityService
                .login(developer)
                .then(
                    function(response) {
                        var developer = response.data;
                        $rootScope.currentUser = developer;
                        $location.url("/developer/"+developer._id);
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();