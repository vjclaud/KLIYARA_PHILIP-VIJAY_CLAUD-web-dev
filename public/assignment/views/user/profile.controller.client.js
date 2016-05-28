(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileViewController", ProfileViewController);

    var users = [
        {_id: "123", username: "alice",	password: "alice",	firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",  	password: "bob",  	firstName: "Bob",	lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function ProfileViewController($routeParams) {
        var vm = this;
        var id = $routeParams.id;
        vm.updateUser = updateUser;

        var index = -1;

        for(var i in users){
            if(users[i]._id === id){
                vm.user = users[i];
                index = i;
            }else{
                vm.error = "incorrect username and password";
            }
        }

        function updateUser(newUser) {
            users[index].firstName = newUser.firstName;
            users[index].email = newUser.email;
            users[index].lastName = newUser.lastName;
        }

    }


    
})();