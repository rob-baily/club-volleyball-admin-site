'use strict';
/* Controllers */
var dataAdminApp = angular.module('mainApp', ['ui.router', 'ngResource', 'angucomplete-alt',
    'spring-data-rest', 'spring-data-rest-crud',
    'mainApp.services', 'mainApp.controllers']);

angular.module("mainApp.services", ['spring-data-rest-crud'])
  .factory('AdminObjectService', function(SpringDataRestObjectService) {
      return SpringDataRestObjectService.getInstance();
}).factory('UserRestResource', function(SpringDataRestResource) {
  return SpringDataRestResource.getInstance('/api/applicationUsers/');
}).factory('UserStateManager', function(SpringDataRestStateManager) {
  console.log("create UserStateManager");
  return SpringDataRestStateManager.getInstance('user');
}).factory('UserControllerManager', function(SpringDataRestController, UserStateManager, UserRestResource) {
  console.log("create UserControllerManager");
  return SpringDataRestController.getInstance(UserStateManager,UserRestResource);

});

angular.module('mainApp.controllers', []).controller('AdminListController', function($scope, $state) {
  $scope.adminList = [
      { name: "Tournaments", view: "tournaments"},
      { name: "Users", view: "users"}
  ];

  $scope.goToPage = function(pageView) {
    console.log("go to page");
    $state.go(pageView);
  }

}).controller('UserListController', function($scope, $state, UserControllerManager) {
  UserControllerManager.controlList($scope, $state);
}).controller('UserEditController', function($scope, $state, $stateParams, UserControllerManager) {
  UserControllerManager.controlEdit($scope, $state, $stateParams);
}).controller('UserAddController', function($scope, $state, UserControllerManager) {
  UserControllerManager.controlAdd($scope, $state);
});

var $stateProviderRef = null;

angular.module('mainApp').config(function($stateProvider) {
  $stateProvider.state('adminList', {
    templateUrl: 'partials/admin-list.html',
    controller: 'AdminListController'
  });

  $stateProviderRef = $stateProvider;
}).run(function($state, UserStateManager) {
  UserStateManager.setupStates($stateProviderRef);
  $state.go('adminList'); //make a transition to users state when app starts
});

var userApp = angular.module('userApp', ['ui.router', 'ngResource', 'angucomplete-alt',
    'spring-data-rest', 'spring-data-rest-crud',
    'mainApp.services', 'mainApp.controllers']);

angular.module('userApp').config(function($stateProvider) {
    $stateProviderRef = $stateProvider;
}).run(function($state, UserStateManager) {
    UserStateManager.setupStates($stateProviderRef);
    $state.go('users'); //make a transition to list state when app starts
});
