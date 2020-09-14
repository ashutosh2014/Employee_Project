angular.module("AngularFrom.AddPlayerController", []).
    controller("AddPlayerController", function (PlayerService, $routeParams, $location) {
        var vm = this;
        var location = $location.path().split("/")[1]
        var id = $routeParams.id;
        console.log(id)
        vm.message = getOperationValue(location) + " Player Details !!";

        switch (location) {
            case "EditPlayer": PlayerService.GetPlayerById(id).then((d) => {
                console.log(d.data);
                vm.player = d.data;
            })

        }
        vm.Operation = function () {
            getOperation(location, vm.player, $routeParams.id).then((response) => {
                $location.path("/")
            })
        }
        function getOperationValue(path) {
            switch (path) {
                case "AddPlayer": return "Add";
                case "EditPlayer": return "Update"
                default: return "";
            }
        }
        function getOperation(path,player,id) {
            switch (path) {
                case "AddPlayer": return PlayerService.AddPlayerToDb(player)
                case "EditPlayer": return PlayerService.UpdatePlayer(id,player)
                default: return "";
            }
        }
    })

