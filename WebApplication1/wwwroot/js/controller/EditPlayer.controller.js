angular.module("AngularFrom.EditPlayerController", []).
    controller("EditPlayerController", function (PlayerService, $routeParams, $location) {
        var vm = this;
        var id = $routeParams.id;

        vm.message = "Update Player Details !!";

        PlayerService.GetPlayerById(id).then((d) => {
            vm.player = d.data;
        })
          
        vm.Operation = function () {
            PlayerService.UpdatePlayer(id ,vm.player).then((response) => {
                alert(response.data)
                $location.path("/")
            })
        }
    })
    