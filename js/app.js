var hacknightApp = angular.module('hacknightApp', []);

hacknightApp.controller('PageCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.posts = posts;
    $scope.postsData = [];
    $scope.index = 0;

    var baseUrl = rtrim(window.location.href, '/');

    for(var i = 0, l = $scope.posts.length; i < l; i++) {

        var callback = (function(i) {
            return function(response) {
                $scope.postsData[i] = response.data;
            }
        })(i);

        $http.get(baseUrl + posts[i]).then(callback);
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

function rtrim(str, charlist) {
  //  discuss at: http://phpjs.org/functions/rtrim/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Erkekjetter
  //    input by: rem
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: Onno Marsman
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: rtrim('    Kevin van Zonneveld    ');
  //   returns 1: '    Kevin van Zonneveld'

  charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
    .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
  var re = new RegExp('[' + charlist + ']+$', 'g');
  return (str + '')
    .replace(re, '');
}