angular.module("AngularFrom.PlayerService", [])
    .factory("PlayerService", [ '$http', function ($http) {
        var fac = {};


        fac.AddPlayerToDb = function (player) {
            return $http.post("/api/APIPlayer", player).then((response) => {
                alert(response.data);
            })
        }
        fac.UpdatePlayer = function (id, player) {
            return $http.put("/api/APIPlayer/" +id , player);
        }
        fac.DeletePlayer = function (id) {
            $http.delete("/api/APIPlayer/" + id).then((response) => {
                alert(response.data);
            })
        }
        fac.GetPlayerFromDb = function () {
            return $http.get("/api/APIPlayer")
        }
        fac.GetPlayerById = function (id) {
            return $http.get("/api/APIPlayer/" + id)
        }
        fac.GetPlayerBySearch = function (searchValue,searchField) {
            return $http.post("/api/APIPlayer/search", { searchValue: searchValue, searchField: searchField})
        }
        return fac;
    }])