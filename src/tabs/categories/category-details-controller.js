// Hack to query just all universes
var universes = [6, 7, 4, 1, 3, 42, 43, 44, 39, 2, 5, 41, 40, 8, 45];

angular.module('nge.categories.CategoryDetailsCtrl', [
    'nge.categories.CategoriesService',
    'nge.favorites.FavoritesCtrl'
])
.controller('CategoryDetailsCtrl', function ($scope, CategoriesService, FavoritesService, $sce, $ionicModal, $ionicLoading, cid) {

    var modalScope = $scope.$new();
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: modalScope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

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

    $scope.showActivityDetails = function (activity) {
        // activity.description = $sce.trustAsHtml(activity.description);
        modalScope.activity = activity;
        modalScope.addToFavorite = function () {
            FavoritesService.addToFavorites(activity);
            $scope.closeModal();
        };
        modalScope.closeModal = $scope.closeModal;
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
});