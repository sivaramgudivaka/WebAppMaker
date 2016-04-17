(function () {
    angular
        .module ("WebAppMakerApp")
        .config (Configure);

    function Configure ($routeProvider) {
        $routeProvider
            // authentication routes
            .when ("/", {
                templateUrl: "views/developers/security/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when ("/register", {
                templateUrl: "views/developers/security/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            // developer routes
            .when ("/developer", {
                templateUrl: "views/developers/developer/developer-list.view.html",
                controller: "DeveloperListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/new", {
                templateUrl: "views/developers/developer/developer-new.view.html",
                controller: "NewDeveloperController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/edit", {
                templateUrl: "views/developers/developer/developer-edit.view.html",
                controller: "EditDeveloperController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/profile", {
                templateUrl: "views/developers/developer/developer-edit.view.html",
                controller: "EditDeveloperController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            // application routes
            .when ("/developer/:username/application", {
                templateUrl: "views/developers/application/application-list.view.html",
                controller: "ApplicationListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/new", {
                templateUrl: "views/developers/application/application-new.view.html",
                controller: "NewApplicationController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/edit/:applicationId", {
                templateUrl: "views/developers/application/application-edit.view.html",
                controller: "EditApplicationController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/edit", {
                templateUrl: "views/developers/application/application-edit.view.html",
                controller: "EditApplicationController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/share", {
                templateUrl: "views/developers/application/application-share.view.html",
                controller: "ShareApplicationController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            // page routes
            .when ("/developer/:username/application/:applicationId/page", {
                templateUrl: "views/developers/page/page-list.view.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/new", {
                templateUrl: "views/developers/page/page-new.view.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/edit", {
                templateUrl: "views/developers/page/page-edit.view.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            // widget routes
            .when ("/developer/:username/application/:applicationId/page/:pageId/widget", {
                templateUrl: "views/developers/widget/widget-list.view.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/run", {
                templateUrl: "views/developers/page/page-run.view.html",
                controller: "PageRunController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/preview", {
                templateUrl: "views/developers/widget/page-preview.view.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/choose-widget", {
                templateUrl: "views/developers/widget/widget-choose.view.html",
                controller: "ChooseWidgetController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/widget/:widgetId/edit", {
                templateUrl: "views/developers/widget/widget-edit.view.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            })

            // script routes
            .when ("/developer/:username/application/:applicationId/page/:pageId/widget/:widgetId/script", {
                templateUrl: "views/developers/script/script-list.view.html",
                controller: "ScriptListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/widget/:widgetId/script/new", {
                templateUrl: "views/developers/script/script-new.view.html",
                controller: "NewScriptController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/widget/:widgetId/script/edit", {
                templateUrl: "views/developers/script/script-edit.view.html",
                controller: "EditScriptController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/application/:applicationId/page/:pageId/widget/:widgetId/script/choose", {
                templateUrl: "views/developers/script/statement-choose.view.html",
                controller: "ChooseStatementController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            // navigate to statement editor when you click on th cog
            .when ("/developer/:username/application/:applicationId/page/:pageId/widget/:widgetId/script/statement/:statementId", {
                templateUrl: "views/developers/script/statement-edit.view.html",
                controller: "EditStatementController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .otherwise ({
                redirectTo: "/"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.error = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };
})();