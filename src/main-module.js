angular.module('templates', []);
angular.module('nge', [
  'ionic',
  'templates',
  'nge.categories',
  'nge.favorites',
  'nge.map'
  ])

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
    .state('tab.categories', {
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'tabs/categories/categories.html',
          controller: 'CategoriesCtrl',
          resolve: {
            categories: function (CategoriesService) {
              CategoriesService.getCategories();
            }
          }
        }
      }
    })
    .state('tab.category-detail', {
      url: '/categories/:cid',
      views: {
        'tab-categories': {
          templateUrl: 'tabs/categories/category-details-tpl.html',
          controller: 'CategoryDetailsCtrl',
          resolve: {
            // categories: function (categoriesService) {
            //   categoriesService.getCategories();
            // },
            cid: function ($stateParams) {
              return $stateParams.cid;
            }
          }
        }
      }
    })
    .state('tab.favorites', {
      url: '/favorites',
      views: {
        'tab-favorites': {
          templateUrl: 'tabs/favorites/favorites-tpl.html',
          controller: 'FavoritesCtrl'
        }
      }
    })
    .state('tab.maps', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'tabs/map/map-tpl.html',
          controller: 'MapCtrl'
        }
      }
    });

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
  $urlRouterProvider.otherwise('/tab/categories');

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


