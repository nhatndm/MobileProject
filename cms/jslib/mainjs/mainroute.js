var mainroute = angular.module("mainroute",[]);

mainroute.config(function($stateProvider, $urlRouterProvider, $locationProvider){

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url: '/',
            templateUrl: 'dashboard.html'
        })
        .state('user',{
            url: '/user',
            templateUrl: 'user.html'
        })
        .state('table',{
            url: '/table',
            templateUrl: 'table.html'
        })
        .state('typography',{
            url: '/typography',
            templateUrl: 'typography.html'
        })
        .state('icons',{
            url: '/icons',
            templateUrl: 'icons.html'
        })
        .state('notifications',{
            url: '/notifications',
            templateUrl: 'notifications.html'
        })
        .state('login',{
            url: '/login',
            templateUrl: 'login.html'
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
        });
    $locationProvider.hashPrefix('!');
});

