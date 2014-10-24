angular.module('nge.categories.CategoriesService', [])
.service('CategoriesService', CategoriesService);


function CategoriesService($http, $q, Routes) {
    var categories;
    var activitiesCache = {};

    this.getCategoryById = function (id) {
        var defered = $q.defer();
        if (!categories) {
            this.getCategories().then(function (resp) {
                defered.resolve(findById(id, resp.data));
            });
        } else {
            defered.resolve(findById(id, categories));
        }
        return defered.promise;
    };

    this.getCategories = function () {
        return $http.get(Routes.categories, {
            cache: true
        }).then(function (resp) {
            categories = resp.data;
            return resp;
        });
    };

    this.getActivities = function (category, tags) {
        return activitiesCache[category.id] ? $q.when(activitiesCache[category.id]) : $http.get(Routes.activities, {
            params: { cid: category.id, limit: 25, offset: 0, tag: tags, created: 0, start: 0, end: 0 }
        }).then(function (resp) {
            activitiesCache[category.id] = resp.data;
            return resp.data;
        });
    };

    this.clearActivities = function (category) {
        activitiesCache[category.id] = null;
    };

    function findById (id, list) {
        var compId = parseInt(id, 10);
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === compId) {
                return list[i];
            }
        }
    }
}

