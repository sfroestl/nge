angular.module('nge.map', [])
.controller('MapCtrl', function ($scope, uiGmapGoogleMapApi) {

    $scope.map = {
        center: {
            latitude: 45,
            longitude: -73
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

    navigator.geolocation.getCurrentPosition(function (position) {
        $scope.$apply(function () {
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;
        });
    });

    navigator.geolocation.watchPosition(function (position) {
        console.log(position);
        $scope.$apply(function () {
            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;

            $scope.current.center.latitude = position.coords.latitude;
            $scope.current.center.longitude = position.coords.longitude;
        });
    });

});