// Hack to query just all universes
var universes = [6, 7, 4, 1, 3, 42, 43, 44, 39, 2, 5, 41, 40, 8, 45];

angular.module('nge.categories.CategoryDetailsCtrl', [
    'nge.categories.CategoriesService',
    'nge.favorites'
])
.controller('CategoryDetailsCtrl', function ($scope, CategoriesService, FavoritesService, $sce, $ionicModal, $ionicLoading, cid) {

    var modalScope = $scope.$new();
    $ionicModal.fromTemplateUrl('tabs/categories/modal.html', {
        scope: modalScope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

    $ionicLoading.show({
      template: '<i class="ion-loading-c"></i> <br> Loading activities...'
    });

    fetchActivities(cid);

    $scope.doRefresh = function () {
        CategoriesService.clearActivities($scope.category);
        fetchActivities(cid);
    };

    $scope.showActivityDetails = function (activity) {
        modalScope.activity = activity;
        modalScope.addToFavorite = function () {
            activity.isFavorite = true;
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
        $ionicLoading.hide();
    });

    function fetchActivities (cid) {
        CategoriesService.getCategoryById(cid)
        .then(function (category) {
            $scope.category = category;
            return category;
        })
        .then(function (category) {
            CategoriesService.getActivities(category, universes).then(function (data) {
                $scope.activities = data;
            }).finally(function () {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    }
});

