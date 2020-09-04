angular.module("AngularFrom.controllers", []).run(function ($rootScope) {
    $rootScope.players = {}
    }).
    controller("AddPlayerController", function ($scope, PlayerService,$location,$rootScope) {

        $scope.message = "Enter your details";

        $scope.AddPlayer = function () {
            PlayerService.AddPlayerToDb($scope.player).then((response) => {
                $location.path("/")
            })
        }
    }).
    controller("MainController", function ($scope, PlayerService,$rootScope,$filter) {
        PlayerService.GetPlayerFromDb().then((d) => {
            $rootScope.players = d.data.list;
            $scope.showLoading = false;
        })
        $scope.msg = "kdskd"
        $scope.showLoading = true;
        var orderBy = $filter('orderBy');
        $scope.prevOrderArg = 'name';
        $scope.dirName = '';
        $scope.dirClub = '';    
        $scope.dirCountry = '';
        $scope.OrderEmployee = function (orderValue) {
            var orderDir = 'up'
            if ($scope.prevOrderArg === orderValue) {
                orderValue = "-" + orderValue;
                orderDir = 'down';
            }
            $scope.dirName = '';
            $scope.dirClub = '';
            $scope.dirCountry = '';

            switch (orderValue) {
                case 'name':
                case '-name':
                    $scope.dirName = orderDir
                    break
                case 'club':
                case '-club':
                    $scope.dirClub = orderDir
                    break
                case 'country':
                case '-country':
                    $scope.dirCountry = orderDir
                    break
            }
            $rootScope.players = orderBy($rootScope.players, orderValue);
            $scope.prevOrderArg = orderValue;
        }
        

        $scope.DeletePlayer = function (id,index) {
            $rootScope.players.splice(index, 1);
            PlayerService.DeletePlayer(id);
        }
    }).
    controller("EditPlayerController", function ($scope, $rootScope, PlayerService, $routeParams,$location) {

        $scope.msg = "Update Player Details";

        var id = $routeParams.id;

        PlayerService.GetPlayerById(id).then((d) => {
            console.log(d.data.list);
            $scope.player = d.data.list;
        })
          
        $scope.UpdatePlayer = function () {
            PlayerService.UpdatePlayer($scope.player).then((response) => {
                alert(response.data.status)
                $location.path("/")
            })
        }
    })
    .factory("PlayerService", [ '$http', function ($http) {
        var fac = {};


        fac.AddPlayerToDb = function (player) {
            return $http.post("/Player/AddPlayer", player).then((response) => {
                alert(response.data.status);
            })
        }
        fac.UpdatePlayer = function (player) {
            return $http.post("/Player/UpdatePlayer", player);
        }
        fac.DeletePlayer = function (id) {
            $http.post("/Player/DeletePlayer", id).then((response) => {
                alert(response.data.status);
            })
        }
        fac.GetPlayerFromDb = function () {
            return $http.get("/Player/GetPlayer")
        }
        fac.GetPlayerById = function (id) {
            return $http.get("/Player/GetPlayerById", { params: { id: id } })
        }
        return fac;
    }])