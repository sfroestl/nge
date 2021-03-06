angular.module('nge.map', [])
.controller('MapCtrl', function ($scope, uiGmapGoogleMapApi, FavoritesService) {

    $scope.map = {
        center: {
            latitude: 48.8567,
            longitude: 2.3508
        },
        zoom: 15,
        options: {
            zoomControl: false,
            streetViewControl: false,
            panControl: false,
            mapTypeControl: false
        }
    };

    $scope.current = {
        center: {
            latitude: 45,
            longitude: -73
        },
        stroke: {
            color: '#08B21F',
            weight: 2,
            opacity: 1
        },
        radius: 50
    };

    $scope.favorites = FavoritesService.getFavorites().map(function (favorite) {
        return {
            id: favorite.idactivites,
            latitude: favorite.lat,
            longitude: favorite.lon
        };
    });

    navigator.geolocation.getCurrentPosition(function (position) {
        $scope.$apply(function () {
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;
        });
    });

    var watchId = navigator.geolocation.watchPosition(function (position) {
        $scope.$apply(function () {
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;

            $scope.current.center.latitude = position.coords.latitude;
            $scope.current.center.longitude = position.coords.longitude;
        });
    });

    $scope.$on('$destroy', function () {
        navigator.geolocation.clearWatch(watchId);
    });

});