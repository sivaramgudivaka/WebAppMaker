(function(){
    angular
        .module("WebAppMakerApp")
        .controller("LoginController", loginController);

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
