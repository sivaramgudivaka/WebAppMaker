(function(){
    angular
        .module("WebAppMakerApp")
        .controller("RegisterController", registerController)
        .controller("LoginController", loginController);

    function registerController(UserService, $rootScope, $location) {
        var vm = this;
        vm.register = register;

        function register(developer) {
            delete developer.password2;
            UserService
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

    function loginController(UserService, $rootScope, $location) {
        var vm = this;
        vm.login = login;

        function login(developer) {
            UserService
                .login(developer)
                .then(
                    function(response) {
                        $rootScope.currentUser = response.data;
                        $location.url("/developer/"+developer.username+"/edit");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();
