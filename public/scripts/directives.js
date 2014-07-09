'use strict';

var dir = angular.module('makeupGhe.directives', []);

dir.directive('myNavigation', function (globals) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: globals.tempUrl + 'navigation.html',
        controller: 'NavCtrl'
    }
});

dir.directive('myCarousel', function (globals) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: globals.tempUrl + 'carousel.html',
        controller: 'CarouselCtrl'
    }
});

dir.directive('myFooter', function (globals) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: globals.tempUrl + 'footer.html',
        controller: 'FooterCtrl'
    }
});

dir.directive('resize', function ($window) {
    return {
        link: function (scope, element) {
            var w = angular.element($window);

            scope.isCollapsed = (element[0].offsetWidth > 749) ? undefined : true;

            w.bind('resize', function () {
                scope.isCollapsed = (element[0].offsetWidth > 749) ? undefined : true;
                scope.navCollapsed = true;
                scope.$apply();
            });
        }
    }
});

// angular ui carousel and ngAnimate bug workaround 
dir.directive('disableNgAnimate', ['$animate', function($animate) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $animate.enabled(false, element);
        }
    };
}]);