angular.module('nge.sights.SightsService', [])
.service('SightsService', SightsService);


function SightsService($http, $q, Routes) {
    var categories;

    this.getCategoryById = function (id) {
        return categories ? $q.when(categories[id]) : this.getCategories().then(function (resp) {
            return resp.data[id];
        });
    };

    this.getCategories = function () {
        return $http.get(Routes.categories, {
            // cache: true
        }).then(function (resp) {
            categories = resp.data;
            return resp;
        });
    };
    this.getActivities = function (categoryIds, tags) {
        return $http.get(Routes.activities, {
            params: { cid: categoryIds, limit: 25, offset: 0, tag: tags, created: 0, start: 0, end: 0 },
        });
    };
}

