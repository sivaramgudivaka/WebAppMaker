(function () {
    angular
        .module ("WebAppMakerApp")
        .config (Configure);

    function Configure ($routeProvider) {
        $routeProvider
            // authentication routes
            .when ("/", {
                templateUrl: "views/security/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when ("/register", {
                templateUrl: "views/security/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            // developer routes
            .when ("/developer", {
                templateUrl: "views/developer/developer-list.view.html",
                controller: "DeveloperListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/new", {
                templateUrl: "views/developer/developer-new.view.html",
                controller: "NewDeveloperController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/edit", {
                templateUrl: "views/developer/developer-edit.view.html",
                controller: "EditDeveloperController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/profile", {
                templateUrl: "views/developer/developer-edit.view.html",
                controller: "EditDeveloperController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            // website routes
            .when ("/developer/:username/website", {
                templateUrl: "views/website/website-list.view.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/new", {
                templateUrl: "views/website/website-new.view.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/edit/:websiteId", {
                templateUrl: "views/website/website-edit.view.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/edit", {
                templateUrl: "views/website/website-edit.view.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/share", {
                templateUrl: "views/website/website-share.view.html",
                controller: "ShareWebsiteController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            // page routes
            .when ("/developer/:username/website/:websiteId/page", {
                templateUrl: "views/page/page-list.view.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/new", {
                templateUrl: "views/page/page-new.view.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/edit", {
                templateUrl: "views/page/page-edit.view.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })

            // widget routes
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget", {
                templateUrl: "views/widget/widget-list.view.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/run", {
                templateUrl: "views/page/page-run.view.html",
                controller: "PageRunController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/preview", {
                templateUrl: "views/widget/page-preview.view.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/choose-widget", {
                templateUrl: "views/widget/widget-choose.view.html",
                controller: "ChooseWidgetController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget/:widgetId/edit", {
                templateUrl: "views/widget/widget-edit.view.html",
                controller: "WidgetEditController",
                controllerAs: "model"
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget/:widgetId/flickr", {
                templateUrl: "views/widget/flickr/widget-image-search.view.client.html",
                controller: "FlickrSearchController",
                controllerAs: "model"
            })
            .when ("/widget/:widgetId/flickr", {
                templateUrl: "views/widget/flickr/widget-image-search.view.client.html",
                controller: "FlickrSearchController",
                controllerAs: "model"
            })

            // script routes
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget/:widgetId/script", {
                templateUrl: "views/script/script-list.view.html",
                controller: "ScriptListController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget/:widgetId/script/new", {
                templateUrl: "views/script/script-new.view.html",
                controller: "NewScriptController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget/:widgetId/script/edit", {
                templateUrl: "views/script/script-edit.view.html",
                controller: "EditScriptController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget/:widgetId/script/choose", {
                templateUrl: "views/script/statement-choose.view.html",
                controller: "ChooseStatementController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            // navigate to statement editor when you click on th cog
            .when ("/developer/:username/website/:websiteId/page/:pageId/widget/:widgetId/script/statement/:statementId", {
                templateUrl: "views/script/statement-edit.view.html",
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