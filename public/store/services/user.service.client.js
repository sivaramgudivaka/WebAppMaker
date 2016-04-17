(function(){
    angular
        .module("WebAppMakerApp")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            login: login,
            logout: logout,
            register: register
        };
        return api;

        function logout(user) {
            return $http.post("/api/user/logout");
        }

        function login(user) {
            return $http.post("/api/user/login", user);
        }

        function register(user) {
            return $http.post("/api/user/register", user);
        }
    }
})();