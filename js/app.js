var hacknightApp = angular.module('hacknightApp', []);

hacknightApp.controller('PageCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get(posts[0]).then(function(response) {

    });
}]);

hacknightApp.directive('previous', [function () {
    return {
        restrict: 'C',
        link: function (scope, iElement, iAttrs) {
            iElement.on('click', function() {
                alert('PREVIOUS');
            });
        }
    };
}]).directive('next', [function () {
    return {
        restrict: 'C',
        link: function (scope, iElement, iAttrs) {
            iElement.on('click', function() {
                alert('NEXT');
            });
        }
    };
}])