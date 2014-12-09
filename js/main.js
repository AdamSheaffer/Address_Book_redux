;(function(){
  'use strict';

  angular.module('contactApp', [])
    .controller('contactController', function($http){
      var vm = this;
      // vm.contacts = [
      //   {name: 'Adam Sheaffer', email: 'adam.e.sheaffer@gmail.com', phone: '123-456-7890', group: 'Friend', img: "https://avatars1.githubusercontent.com/u/9039241?v=3&s=460"},
      //   {name: 'John Doe', email: 'jDoe@gmail.com', phone: '123-456-7890', group: 'Family', img: "http://www.johndoe.pro/img/John_Doe.jpg"}
      // ];

      $http.get('https://myaddressbook.firebaseio.com/.json')
        .success(function(data) {
          vm.contacts = data;
        })
        .error(function(err){
          console.log(err);
        })

      vm.addContact = function() {
        vm.contacts.push(vm.newContact);
        vm.newContact = {};
      };

      vm.removeContact = function(contact) {
        var index = vm.contacts.indexOf(contact);
        vm.contacts.splice(index, 1);
      };

      vm.groups = {Friends: "Friend", Family: "Family", Work: "Work"}

    })
})()
