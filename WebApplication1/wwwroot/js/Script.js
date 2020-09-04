//Create the module
var myApp = angular.module("myModule", []);

myApp.filter("gender", function () {
    return (gender) => {
        switch (gender) {
            case 1: return "Male"
            case 2: return "Female"
            case 3: return "Transgender"
        }
    }
})

// Creating the controller and registering with the module all done in one line.
myApp.controller("myController", function ($scope) {

    var employee = {
        firstName: "Ashu",
        lastName: "Agarwal",
        gender: "Male",
        flag : "/img/flag.png"
    };


    $scope.empolyees = [
        { firstName: "Ashu", lastName: "Agarwal", gender: 1 ,flag: "/img/flag.png" },
        { firstName: "dsadad", lastName: "Agarwal", gender: 2, flag: "/img/flag.png" },
        { firstName: "kjdnasd", lastName: "Agarwal", gender: 3, flag: "/img/flag.png" },
        { firstName: "Ashu=dsdda", lastName: "Agarwal", gender: 1, flag: "/img/flag.png" }

    ];

    $scope.change = function(emp) {
        emp.gender = emp.gender == "Male" ? "Female" : "Male";
    } 

    $scope.employee = employee;
    
    $scope.message = "AngularJS Tutorial";
});
