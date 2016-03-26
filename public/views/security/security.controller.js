(function(){
    angular
        .module("WebAppMakerApp")
        .controller("LoginController", loginController);

    function loginController(SecurityService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            SecurityService
                .login(username, password)
                .then(
                    function(developer) {

                    },
                    function(err) {

                    }
                );
        }
    }
})();
