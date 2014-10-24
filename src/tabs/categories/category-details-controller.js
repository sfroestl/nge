// Hack to query just all universes
var universes = [6, 7, 4, 1, 3, 42, 43, 44, 39, 2, 5, 41, 40, 8, 45];

angular.module('nge.categories.CategoryDetailsCtrl', [
    'nge.categories.CategoriesService'
])
.controller('CategoryDetailsCtrl', function ($scope, CategoriesService, $sce, $ionicLoading, cid) {

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i> <br> Loading activities...'
    });

    CategoriesService.getCategoryById(cid)
    .then(function (category) {
        $scope.category = category;
        return category;
    })
    .then(function (category) {

        CategoriesService.getActivities(category.id, universes).then(function (resp) {
            $scope.activities = resp.data;
            $ionicLoading.hide();
        });
    });
});