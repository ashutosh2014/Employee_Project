angular.module("AngularFrom", ["AngularFrom.controllers","ngRoute"])
    .config(["$routeProvider",'$locationProvider' , function ($routeProvider,$locationProvider) {
        $routeProvider.
            when("/", {
                templateUrl: "/Partials/PlayerList.html",
                controller: "MainController"        
            }).when("/AddPlayer", {
                templateUrl: "/Partials/AddPlayer.html",
                controller: "AddPlayerController"
            }).when("/EditPlayer/:id", {
                templateUrl: "/Partials/EditPlayer.html",
                controller: "EditPlayerController"
            }).
            otherwise({ redirectTo: "/" })
    }])