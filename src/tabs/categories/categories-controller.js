angular.module('nge.categories.CategoriesCtrl', [])
.controller('CategoriesCtrl', CategoriesCtrl);

function CategoriesCtrl($scope, CategoriesService, $ionicLoading) {

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i> <br> Loading categories...'
    });

    CategoriesService.getCategories().then(function (resp) {
        console.log(resp);
        $scope.categories = resp.data;
        var categoryIds = resp.data.map(function (c) {
            return c.id;
        });
        $ionicLoading.hide();
    }).finally(function () {

    });
}