(function() {
    angular
        .module("WebAppMakerApp")
        .controller("MainController", mainController);

    function mainController(SecurityService, $rootScope, $location) {
        var vm = this;

        vm.logout = logout;

        function logout(developer) {
            SecurityService
                .logout(developer)
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();