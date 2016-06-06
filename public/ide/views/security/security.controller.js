(function(){
    angular
        .module("WebAppMakerApp")
        .controller("RegisterController", registerController)
        .controller("LoginController", loginController);

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
