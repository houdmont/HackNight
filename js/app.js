var hacknightApp = angular.module('hacknightApp', []);

hacknightApp.controller('PageCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.posts = posts;
    $scope.postsData = [];
    $scope.index = 0;

    for(var i = 0, l = $scope.posts.length; i < l; i++) {

        var callback = (function(i) {
            return function(response) {
                $scope.postsData[i] = response.data;
            }
        })(i);

        $http.get(posts[i]).then(callback);
    }
}]);

hacknightApp.directive('previous', [function () {
    return {
        restrict: 'C',
        link: function (scope, iElement, iAttrs) {
            iElement.on('click', function() {
                var index = scope.index - 1;

                if (index < 0) {
                    index = scope.posts.length - 1;
                }

                var html = scope.postsData[index];

                $('#main').html(html);

                scope.index = index;
            });
        }
    };
}]).directive('next', [function () {
    return {
        restrict: 'C',
        link: function (scope, iElement, iAttrs) {
            iElement.on('click', function() {
                var index = scope.index + 1;

                if (index >= scope.posts.length) {
                    index = 0;
                }

                var html = scope.postsData[index];

                $('#main').html(html);

                scope.index = index;
            });
        }
    };
}]);