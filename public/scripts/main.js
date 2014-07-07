var viewUrl = 'views/';
var tempUrl = 'views/templates/';
var jsonData = 'data/data.json';

var app = angular.module('makeupGhe', ['ui.bootstrap', 'ngTouch', 'ngRoute', 'ngAnimate']);
var resolveData = { data: function (srvData) { return srvData.getData(); } }

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: viewUrl + 'home.html',
            controller: 'HomeCtrl',
            resolve: resolveData
        })
        .when('/about', {
            templateUrl: viewUrl + 'about.html',
            controller: 'AboutCtrl',
            resolve: resolveData
        })
        .when('/portfolio', {
            templateUrl: viewUrl + 'portfolio.html',
            controller: 'GalleryCtrl',
            resolve: resolveData
        })
        .when('/video', {
            templateUrl: viewUrl + 'portfolio.html',
            controller: 'GalleryCtrl',
            resolve: resolveData
        })
        .when('/contact', {
            templateUrl: viewUrl + 'contact.html',
            controller: 'ContactCtrl',
            resolve: resolveData
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