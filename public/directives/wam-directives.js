(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamFilter", wamFilter);
    
    function wamFilter() {
        function linker(scope, element, attributes) {
            scope.comparators = [
                {label: '='},
                {label: '>'},
                {label: '>='},
                {label: '<'},
                {label: '<='}
            ];
        }
        return {
            templateUrl: '/directives/templates/wamFilter.html',
            link: linker,
            scope: {
                filters: '=',
                variables: '='
            }
        }
    }
})();