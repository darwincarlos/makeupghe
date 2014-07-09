'use strict';

var app = angular.module('makeupGhe', ['makeupGhe.services', 'makeupGhe.controllers', 'makeupGhe.directives', 'ui.bootstrap', 'ngTouch', 'ngRoute', 'ngAnimate']);

app.constant('globals', {
    viewUrl: 'views/',
    tempUrl: 'views/templates/',
    jsonData: 'data/data.json',
    resolveData: { data: function (srvData) { return srvData.getData(); } }
});

app.config(function ($routeProvider, $locationProvider, $httpProvider, globals) {
    $routeProvider
        .when('/', {
            templateUrl: globals.viewUrl + 'home.html',
            controller: 'HomeCtrl',
            resolve: globals.resolveData
        })
        .when('/about', {
            templateUrl: globals.viewUrl + 'about.html',
            controller: 'AboutCtrl',
            resolve: globals.resolveData
        })
        .when('/portfolio', {
            templateUrl: globals.viewUrl + 'portfolio.html',
            controller: 'GalleryCtrl',
            resolve: globals.resolveData
        })
        .when('/video', {
            templateUrl: globals.viewUrl + 'portfolio.html',
            controller: 'GalleryCtrl',
            resolve: globals.resolveData
        })
        .when('/contact', {
            templateUrl: globals.viewUrl + 'contact.html',
            controller: 'ContactCtrl',
            resolve: globals.resolveData
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    // $locationProvider.html5Mode(true);

    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.run(['$rootScope', '$route', function ($root, $route) {

    $root.$on('$routeChangeStart', function (e, curr, prev) {
        if (curr.$$route && curr.$$route.resolve) {
            // Show a loading message until promises are not resolved
            $root.loadingView = true;
            console.log('route started');
        }
    });

    $root.$on('$routeChangeSuccess', function (e, curr, prev) { 
        $root.loadingView = false;
        console.log('route succeed');
    });
}]);