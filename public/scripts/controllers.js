/* ======================= Templates Controller ======================= */

// Navigation controller 
app.controller('NavCtrl', function ($scope, $location, $window) {

    $scope.ready = false;
    $scope.$watch('data', function (newResult, oldResult) {
        $scope.ready = newResult !== oldResult;
        if ($scope.ready) {
            $scope.logo = newResult.logo[0];
            $scope.navList = newResult.navList;
        }
    });

    $scope.navCollapsed = true;

    $scope.$on("$locationChangeStart", function (event, next, current) {
        $scope.navCollapsed = true;
        $window.scrollTo(0, 0);
    });

    $scope.isActive = function (viewLocation) {
        $scope.footerSocial = !($location.path() === "/contact");
        return viewLocation === $location.path();
    };

    // open new window or change url route 
    $scope.openView = function (obj, _blank) {

        var link = obj.url;

        if (link === '' || link === undefined) return;
        if (_blank) {
            window.open(link);
        } else {
            $location.path(link).replace();
        }
    };
});

app.controller('CarouselCtrl', function ($scope, $rootScope) {

    $scope.model = $rootScope.data.model[0];
    $scope.slides = $rootScope.data.slides;
    $scope.myInterval = 5000;
});

app.controller('FooterCtrl', function ($scope, $rootScope) {

    $scope.footerMedia = $rootScope.data.footerMedia;
});


/* ======================= Views Controller ======================= */

app.controller('HomeCtrl', function ($scope, $rootScope) {

    $scope.thumbs = $rootScope.data.thumbs;
    $scope.services = $rootScope.data.services;
    
    $scope.addClass = function (viewLocation) {
        if (viewLocation === "/contact") return 'hidden-sm';
    };
});

app.controller('AboutCtrl', function ($scope, $rootScope) {

    $scope.aboutImg = $rootScope.data.aboutImg[0];
});

app.controller('ContactCtrl', function ($scope, $rootScope) {

    $scope.contacts = $rootScope.data.contacts;
});

app.controller('GalleryCtrl', function ($scope, $modal, $location, $window, $rootScope) {

    var activeArray = [];
    var defaultSet = 'bridal';

    $scope.header = $location.path().replace("/", "").toProperCase();
    $scope.images = $rootScope.data.images; // array of portfolio images 
    $scope.videos = $rootScope.data.videos; // array of video thumbnails 
    $scope.tabset = [];

    for (i in $scope.images) $scope.tabset.push(i.toProperCase());

    activeArray = ($location.path() === "/portfolio") ? $scope.images[defaultSet] : $scope.videos;

    // Pagination config 
    $scope.totalItems = activeArray.length;
    $scope.itemsPerPage = 12;
    $scope.currentPage = 1;

    $scope.imageSet = function (set) {

        activeArray = $scope.images[set.toLowerCase()];
        $scope.totalItems = activeArray.length;
        if ($scope.isCollapsed !== undefined) $scope.isCollapsed = true;

        updatePage();
    };

    var updatePage = function () {

        $scope.pageImages = [];
        var beginAtIndex = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var endAtIndex = ($scope.currentPage * $scope.itemsPerPage);

        for (var i = beginAtIndex; i < endAtIndex; i++) {
            $scope.pageImages.push(activeArray[i]);
            if ((activeArray.length - 1) === i) break;
        };
    };

    // next or previous page 
    $scope.pageChanged = function () {
        updatePage();
        $window.scrollTo(0, 0);
    };

    // Modal open method 
    $scope.open = function (index, size) {

        var modalInstance = $modal.open({
            templateUrl: tempUrl + 'modal.html',
            controller: ModalInstanceCtrl,
            size: size,
            resolve: {
                imageIndex: function () {
                    return index;
                },
                scope: function () {
                    return $scope;
                }
            }
        });
    };

    updatePage();
});

var ModalInstanceCtrl = function ($scope, scope, $modalInstance, imageIndex) {

    var imageArray = scope.pageImages;
    $scope.imageUrl = imageArray[imageIndex].image;
    $scope.header = scope.header;

    $scope.prev = function () {
        if (imageIndex === 0) return;
        $scope.imageUrl = imageArray[--imageIndex].image;
    };

    $scope.next = function () {
        if (imageIndex === (imageArray.length - 1)) return;
        $scope.imageUrl = imageArray[++imageIndex].image;
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

// 'jan darwin' to 'Jan Darwin'
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};