;(function(){
  'use strict';

  angular.module('contactApp', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/table.html',
        controller: 'contactController',
        controllerAs: 'contactCtrl'
      })
      .when('/new', {
        templateUrl: 'views/form.html',
        controller: 'contactController',
        controllerAs: 'contactCtrl'
      })
      .when('/:id', {
        templateUrl: 'views/details.html',
        controller: 'detailsController',
        controllerAs: 'detailsCtrl'
      })
      .otherwise({redirectTo: '/'});
      })

    .controller('detailsController', function($http, $routeParams) {
      debugger
      var vm = this;
      var id = $routeParams.id;
      var url = 'https://myaddressbook.firebaseio.com/contacts/' + id + '.json';
      $http.get(url)
        .success(function(data){
          vm.contact = data;
        })
        .error(function(err){
          console.log(err);
        })
    })

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
            vm.newContact = {};
          })
          .error(function(err){
            console.log(err);
          });
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
