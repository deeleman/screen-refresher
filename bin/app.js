'use strict';

var ng = angular || {};

(function(angular) {
    angular.module('screenRefresher', ['ngSanitize'])
    .factory('screenFactory', ['$http', '$q', function($http, $q) {
        var dfd = $q.defer();
        var augmentUrls = function (urls) {
            return urls.map(function(item, index) {
                return { url: item, active: (index === 0) };
            });
        };
        $http.get('config/settings.json')
            .success(function(data) { 
                dfd.resolve({
                    screens: augmentUrls(data.urls),
                    timeout: data.timeout || 10000
                });
            }).error(function(data) { 
                dfd.reject(data);
            });
        return dfd.promise;
    }])
    .controller('screenController', ['$scope', '$sce', '$interval', 'screenFactory', function($scope, $sce, $interval, screenFactory) {
        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };
        screenFactory.then(function(screenRefresher) {
            $scope.screens = screenRefresher.screens;
            if($scope.screens.length > 1) {
                var activeIndex = 0;
                $interval(function() {
                    $scope.screens[activeIndex].active = false;
                    activeIndex = ++activeIndex === $scope.screens.length ? 0 : activeIndex;
                    $scope.screens[activeIndex].active = true;
                }, screenRefresher.timeout);
            }
        });
    }]);
}(ng));