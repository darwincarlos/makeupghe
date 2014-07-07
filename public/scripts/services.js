app.factory('srvData', ['$http', '$q', '$rootScope', '$route', '$templateCache', function ($http, $q, $rootScope, $route, $templateCache) {

    var sd = {
        getData: function () {

            if ($rootScope.data !== undefined) return;

            var d = $q.defer();
            var img = [];
            var url;

            var preloadimages = function (arr) {

                var newimages = [], loadedimages = 0;
                var postaction = function(){};
                var arr = (typeof arr != "object") ? [arr] : arr;

                function imageloadpost () {
                    loadedimages++;
                    if (loadedimages == arr.length){
                        postaction(newimages);
                    }
                }

                for (var i = 0; i < arr.length; i++) {
                    newimages[i] = new Image();
                    newimages[i].src = arr[i];
                    newimages[i].onload = function () {
                        imageloadpost();
                    };
                    newimages[i].onerror = function () {
                        imageloadpost();
                    };
                }

                return { //return blank object with done() method
                    done: function (f) {
                        postaction = f || postaction; //remember user defined callback functions to be called when images load
                    }
                }
            }

            for (var i in $route.routes) {
                // if ($route.routes[i].preload) {
                    if (url = $route.routes[i].templateUrl) {
                        $http.get(url, { cache: $templateCache });
                    }
                // }
            }

            $http.get(jsonData).success(function (data) {

                var eachRecursive = function (obj) {
                    for (var k in obj) {
                        if (typeof obj[k] == "object" && obj[k] !== null) {
                            if (obj[k].image !== undefined) img.push(obj[k].image);
                            eachRecursive(obj[k]);
                        }
                    }
                }
                eachRecursive(data);

                preloadimages(img).done(function (images) {
                    console.log("preload done!");
                    $rootScope.data = data;
                    d.resolve(data);
                });

                /*angular.forEach(data.slides, function (value) {
                    img.push(value.image);
                    // img.push($http.get(value.image));
                });*/

                /*$q.all(img).then(function (result) {
                    $rootScope.data = data[0];
                    d.resolve(data[0]);
                });*/

            });
            return d.promise;
        }
    }
    return sd;
}]);