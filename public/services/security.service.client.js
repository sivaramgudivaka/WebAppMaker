(function(){
    angular
        .module("WebAppMakerApp")
        .factory("SecurityService", securityService);

    function securityService($http) {
        var api = {
            login: login
        };
        return api;

        function login(user) {
            return $http.post("/api/login", user);
        }
    }
})();