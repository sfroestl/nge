// Hack to query just all universes
var universes = [6, 7, 4, 1, 3, 42, 43, 44, 39, 2, 5, 41, 40, 8, 45];

angular.module('nge.sights.SightDetailsCtrl', [
    'nge.sights.SightsService'
])
.controller('SightDetailsCtrl', function ($scope, SightsService, $sce, $ionicLoading, cid) {

    SightsService.getCategoryById(cid)
    .then(function (category) {
        $scope.category = category;
        return category;
    })
    .then(function (category) {
        $ionicLoading.show({
          template: '<i class="ion-loading-c"></i> <br> Loading activities...'
        });
        SightsService.getActivities(category.id, universes).then(function (resp) {
            $scope.activities = resp.data;
            $ionicLoading.hide();
        });
    });
});