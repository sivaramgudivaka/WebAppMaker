angular
    .module("NgDialogApp", ["ngDialog"])
    .controller('MainCtrl', function ($scope, ngDialog) {
        $scope.clickToOpen = function () {
            ngDialog.openConfirm({
                template: 'notifyTimingOutTemplate',
                className: 'ngdialog-theme-default'
            });
        };
    });