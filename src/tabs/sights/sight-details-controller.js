angular.module('nge.sights.SightDetailsCtrl', [
    'nge.sights.SightsService'
])
.controller('SightDetailsCtrl', function ($scope, SightsService, $sce, category) {
    SightsService.getCategoryById(category).then(function (category) {
        $scope.category = category;
        return category;
    }).then(function (category) {
        SightsService.getActivities(category.id, [2,3,43,39,44]).then(function (resp) {
            $scope.activities = resp.data;
        });
    });
});