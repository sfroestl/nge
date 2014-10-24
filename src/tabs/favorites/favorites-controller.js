angular.module('nge.favorites.FavoritesCtrl', [
    // 'nge.favorites.FavoritesService'
])
.controller('FavoritesCtrl', function ($scope, FavoritesService) {
    $scope.favorites = FavoritesService.getFavorites();
})

.service('FavoritesService', function () {
    var favorites = [];

    this.addToFavorites = function (activity) {
        favorites.push(activity);
    };

    this.getFavorites = function () {
        return favorites;
    };
});