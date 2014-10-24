angular.module('nge.favorites', [
])
.controller('FavoritesCtrl', function ($scope, FavoritesService) {
    $scope.favorites = FavoritesService.getFavorites();

    $scope.removeFromFavorites = function (activity, $index) {
        activity.isFavorite = false;
        FavoritesService.removeFromFavorites(activity);
    };
})

.service('FavoritesService', function () {
    var localStorage = window.localStorage || {};
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    this.addToFavorites = function (activity) {
        favorites.push(activity);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    this.getFavorites = function () {
        return favorites;
    };

    this.removeFromFavorites = function (activity) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].idactivites === activity.idactivites) {
                favorites.splice(i, 1);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                break;
            }
        }
    };
});