app.directive('myNavigation', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: tempUrl + 'navigation.html',
        controller: 'NavCtrl'
    }
});

app.directive('myCarousel', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: tempUrl + 'carousel.html',
        controller: 'CarouselCtrl'
    }
});

app.directive('myFooter', function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: tempUrl + 'footer.html',
        controller: 'FooterCtrl'
    }
});

app.directive('resize', function ($window) {
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
app.directive('disableNgAnimate', ['$animate', function($animate) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $animate.enabled(false, element);
        }
    };
}]);