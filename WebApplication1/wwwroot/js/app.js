angular.module("AngularFrom", [
    "AngularFrom.EditPlayerController",
    "AngularFrom.PlayerController",
    "AngularFrom.AddPlayerController",
    "ngRoute",
    "AngularFrom.PlayerService",
    "AngularFrom.PlayerFilter",
    'angularUtils.directives.dirPagination'
    ])
    .config(["$routeProvider",'$locationProvider' , function ($routeProvider,$locationProvider) {
        $routeProvider.
            when("/", {
                templateUrl: "/Partials/PlayerList.html",
                controller: "PlayerController" ,
                controllerAs: "PlayerCtrl"
            }).when("/EditPlayer/:id", {
                templateUrl: "/Partials/AddPlayer.html",
                controller: "EditPlayerController",
                controllerAs: "AddPlayerCtrl"
            }).when("/AddPlayer", {
                templateUrl: "/Partials/AddPlayer.html",
                controller: "AddPlayerController",
                controllerAs: "AddPlayerCtrl"
            }).
            otherwise({ redirectTo: "/" })
    }])