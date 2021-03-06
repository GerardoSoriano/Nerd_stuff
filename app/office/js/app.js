angular.module('app', ['ngRoute', 'ngFileUpload'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        var rootPath = 'office/routes/';
        $locationProvider.hashPrefix('');
        $routeProvider.
            when('/', {
                templateUrl: rootPath + 'main.html'
            }).
            when('/finalizar-compra', {
                templateUrl: rootPath + 'finalizar-compra.html'
            }).
            when('/comprar', {
                templateUrl: rootPath + 'comprar.html'
            }).
            when('/cuenta', {
                templateUrl: rootPath + 'cuenta.html'
            }).
            when('/historial', {
                templateUrl: rootPath + 'historial.html'
            }).
            when('/invitados', {
                templateUrl: rootPath + 'invitados.html'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);