angular.module('nge.sights.SightsCtrl', [])
.controller('SightsCtrl', SightsCtrl);

function SightsCtrl($scope, SightsService) {

    SightsService.getCategories().then(function (resp) {
        $scope.sights = resp.data;
        var categoryIds = resp.data.map(function (c) {
            return c.id;
        });
    });
}