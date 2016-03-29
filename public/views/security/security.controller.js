(function(){
    angular
        .module("WebAppMakerApp")
        .controller("LoginController", loginController);

    function loginController(SecurityService) {
        var vm = this;
        vm.login = login;

        function login(developer) {
            SecurityService
                .login(developer)
                .then(
                    function(response) {

                    },
                    function(err) {

                    }
                );
        }
    }
})();
