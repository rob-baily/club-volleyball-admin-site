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

}).factory('TeamRestResource', function(SpringDataRestResource) {
    return SpringDataRestResource.getInstance('/api/teams/');
}).factory('TeamStateManager', function(SpringDataRestStateManager) {
    console.log("create TeamStateManager");
    return SpringDataRestStateManager.getInstance('team');
}).factory('TeamControllerManager', function(SpringDataRestController, TeamStateManager, TeamRestResource) {
    console.log("create TeamControllerManager");
    return SpringDataRestController.getInstance(TeamStateManager,TeamRestResource);

}).factory('TournamentRestResource', function(SpringDataRestResource) {
    return SpringDataRestResource.getInstance('/api/tournaments/');
}).factory('TournamentStateManager', function(SpringDataRestStateManager) {
    console.log("create TournamentStateManager");
    return SpringDataRestStateManager.getInstance('tournament');
}).factory('TournamentControllerManager', function(SpringDataRestController, TournamentStateManager, TournamentRestResource) {
    console.log("create TournamentControllerManager");
    return SpringDataRestController.getInstance(TournamentStateManager,TournamentRestResource);

});

angular.module('mainApp.controllers', []).controller('AdminListController', function($scope, $state) {
  $scope.adminList = [
      { name: "Teams", view: "teams"},
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

}).controller('TeamListController', function($scope, $state, TeamControllerManager) {
    TeamControllerManager.controlList($scope, $state);
}).controller('TeamEditController', function($scope, $state, $stateParams, TeamControllerManager) {
    TeamControllerManager.controlEdit($scope, $state, $stateParams);
}).controller('TeamAddController', function($scope, $state, TeamControllerManager) {
    TeamControllerManager.controlAdd($scope, $state);

}).controller('TournamentListController', function($scope, $state, TournamentControllerManager) {
    TournamentControllerManager.controlList($scope, $state);
}).controller('TournamentEditController', function($scope, $state, $stateParams, TournamentControllerManager) {
    TournamentControllerManager.controlEdit($scope, $state, $stateParams);
}).controller('TournamentAddController', function($scope, $state, TournamentControllerManager) {
    TournamentControllerManager.controlAdd($scope, $state);

});

var $stateProviderRef = null;

angular.module('mainApp').config(function($stateProvider) {
  $stateProvider.state('adminList', {
    templateUrl: 'partials/admin-list.html',
    controller: 'AdminListController'
  });

  $stateProviderRef = $stateProvider;
}).run(function($state, TeamStateManager, TournamentStateManager, UserStateManager) {
    TeamStateManager.setupStates($stateProviderRef);
    TournamentStateManager.setupStates($stateProviderRef);
    UserStateManager.setupStates($stateProviderRef);
  $state.go('adminList'); //make a transition to users state when app starts
});

var userApp = angular.module('userApp', ['ui.router', 'ngResource', 'angucomplete-alt',
    'spring-data-rest', 'spring-data-rest-crud',
    'mainApp.services', 'mainApp.controllers']);

angular.module('userApp').config(function($stateProvider) {
    $stateProviderRef = $stateProvider;
//}).run(function($state, UserStateManager) {
//    UserStateManager.setupStates($stateProviderRef);
//    $state.go('users'); //make a transition to list state when app starts
});
