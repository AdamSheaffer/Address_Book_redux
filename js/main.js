;(function(){
  'use strict';

  angular.module('contactApp', [])
    .controller('contactController', function($http){
      var vm = this;

      $http.get('https://myaddressbook.firebaseio.com/contacts.json')
        .success(function(data) {
          vm.contacts = data;
        })
        .error(function(err){
          console.log(err);
        })

      vm.addContact = function() {
        $http.post('https://myaddressbook.firebaseio.com/contacts.json', vm.newContact)
          .success(function(data){
            vm.contacts[data.name] = vm.newContact;
          })
          .error(function(err){
            console.log(err);
          });
        // vm.contacts.push(vm.newContact);
        //vm.newContact = {};
      };

      vm.removeContact = function(contactId) {
        var url = 'https://myaddressbook.firebaseio.com/contacts/' + contactId + '.json';
        $http.delete(url)
          .success(function(){
            delete vm.contacts[contactId];
          })
          .error(function(err){
            console.log(err);
          });
        // var index = vm.contacts.indexOf(contact);
        // vm.contacts.splice(index, 1);
      };

      vm.groups = {Friends: "Friend", Family: "Family", Work: "Work"}

    })
})()
