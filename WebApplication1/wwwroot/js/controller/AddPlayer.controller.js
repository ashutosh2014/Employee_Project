angular.module("AngularFrom.AddPlayerController", []).
    controller("AddPlayerController", function (PlayerService, $routeParams, $location) {
        var vm = this;
        
        vm.message = "Add Player Details !!";
       
        vm.Operation = function () {
            PlayerService.AddPlayerToDb(vm.player).then((response) => {
                $location.path("/")
            })
        }
    })

