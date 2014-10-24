angular.module('templates', []);
angular.module('nge', ['ionic', 'templates', 'nge.sights'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.value('Routes', {
  categories: 'https://api.paris.fr/api/data/1.2/QueFaire/get_categories',
  activities: 'https://api.paris.fr/api/data/1.4/QueFaire/get_activities'
})

.factory('httpInterceptor', httpInterceptorFactory).config(setupInterceptor)

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "tabs.html"
    })

    // Each tab has its own nav history stack:
    .state('tab.sights', {
      url: '/sights',
      views: {
        'tab-sights': {
          templateUrl: 'tabs/sights/sights.html',
          controller: 'SightsCtrl',
          resolve: {
            categories: function (SightsService) {
              SightsService.getCategories();
            }
          }
        }
      }
    })
    .state('tab.sight-detail', {
      url: '/sights/:cid',
      views: {
        'tab-sights': {
          templateUrl: 'tabs/sights/sight-details-tpl.html',
          controller: 'SightDetailsCtrl',
          resolve: {
            // categories: function (SightsService) {
            //   SightsService.getCategories();
            // },
            category: function ($stateParams) {
              return $stateParams.cid;
            }
          }
        }
      }
    });

    // .state('tab.dash', {
    //   url: '/dash',
    //   views: {
    //     'tab-dash': {
    //       templateUrl: 'templates/tab-dash.html',
    //       controller: 'DashCtrl'
    //     }
    //   }
    // })

    // .state('tab.friends', {
    //   url: '/friends',
    //   views: {
    //     'tab-friends': {
    //       templateUrl: 'templates/tab-friends.html',
    //       controller: 'FriendsCtrl'
    //     }
    //   }
    // })
    // .state('tab.friend-detail', {
    //   url: '/friend/:friendId',
    //   views: {
    //     'tab-friends': {
    //       templateUrl: 'templates/friend-detail.html',
    //       controller: 'FriendDetailCtrl'
    //     }
    //   }
    // })

    // .state('tab.account', {
    //   url: '/account',
    //   views: {
    //     'tab-account': {
    //       templateUrl: 'templates/tab-account.html',
    //       controller: 'AccountCtrl'
    //     }
    //   }
    // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/sights');

});

function setupInterceptor($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}

function httpInterceptorFactory($q, $exceptionHandler) {
  return {
    'request': function (config) {
      var regex = 'api.paris.fr';
      if (config.url.indexOf(regex) !== -1) {
        config.params = config.params || {};
        config.params['token'] = 'e35fff77088d3ac868a9d013ba1b37f7e2eb0e21ed4ecdc6422008c5ae2552ed';
      }
      return config || $q.when(config);
    },

    'response': function(response) {
      var regex = 'api.paris.fr';
      if (response.config.url.indexOf(regex) !== -1) {
        response.data = response.data.data;
      }

      return response;
    },
  };
}



angular.module('nge.sights', [
  'nge.sights.SightDetailsCtrl',
  'nge.sights.SightsCtrl',
  'nge.sights.SightsService'
]);

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

