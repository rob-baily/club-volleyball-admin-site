'use strict';
/* Controllers */
var dataAdminApp = angular.module('mainApp', ['ui.router', 'ngResource', 'angucomplete-alt',
    'spring-data-rest', 'spring-data-rest-crud',
    'mainApp.services', 'mainApp.controllers']);

function StatusListHelper() {
    this.setupValues = function (scope) {
        scope.statusList = [
            "Submitted",
            "Registered",
            "Paid",
            "Waitlist",
            "Accepted",
            "Withdrawn",
            "Cancelled",
            "Denied"
        ];
    }
}

function TeamListHelper(teamRestResource) {
    this.setupValues = function (scope) {
        var teamQuerySettings = {pathAddition : "search/findAllByOrderByTeamNameAsc"};
        teamRestResource.query(function (response) {
            scope.teamList = response;
        }, teamQuerySettings);
    }
}

function TournamententryHelper(statusListHelper, teamListHelperManager, tournamentRestResource) {
    this.setupValues = function (scope, newRecord) {
        scope.setTournamentInfo = function() {
            scope.tournament = null;
            if (scope.tournamententry.tournamentName && scope.tournamentList) {
                scope.tournamentList.forEach(function(nextTournament) {
                    if (nextTournament.name == scope.tournamententry.tournamentName) {
                        // copy info over from the tournament to the entry
                        scope.tournamententry.startDate = nextTournament.startDate;
                        scope.tournamententry.location = nextTournament.location;
                        scope.tournamententry.eventSystem = nextTournament.eventSystem;
                        scope.tournamententry = scope.tournamententry;
                    }
                });
            }
        };

        statusListHelper.setupValues(scope);
        teamListHelperManager.setupValues(scope);
        scope.tournamententry.status = "Submitted";
        var tournamentQuerySettings = {pathAddition : "search/findAllByOrderByNameAsc"};
        tournamentRestResource.query(function (response) {
            scope.tournamentList = response;
            scope.tournamentList.forEach(function(nextTournament) {
                nextTournament.startDate = new Date(nextTournament.startDate);
            });
            scope.setTournamentInfo();
        }, tournamentQuerySettings);
        scope.hasAdminAccess = hasAdminAccess;
        scope.newRecord = newRecord ? true : false;
        if (scope.newRecord) {
            scope.$watch('tournamententry.tournamentName', function() {
                scope.setTournamentInfo();
            });
        }
    }
}

function TournamentHelper(eventSystemRestResource) {
    this.setupValues = function (scope) {
        var eventSystemQuerySettings = {pathAddition : "search/findAllByOrderByNameAsc"};
        eventSystemRestResource.query(function (response) {
            scope.eventSystemList = response;
        }, eventSystemQuerySettings);
    }
}

angular.module("mainApp.services", ['spring-data-rest-crud'])
  .factory('AdminObjectService', function(SpringDataRestObjectService) {
      return SpringDataRestObjectService.getInstance();

}).factory('StatusListHelperManager', function() {
    return new StatusListHelper();

}).factory('UserRestResource', function(SpringDataRestResource) {
    return SpringDataRestResource.getInstance('/api/applicationUsers/');
}).factory('UserStateManager', function(SpringDataRestStateManager) {
    console.log("create UserStateManager");
    return SpringDataRestStateManager.getInstance('user');
}).factory('UserControllerManager', function(SpringDataRestController, UserStateManager, UserRestResource) {
    console.log("create UserControllerManager");
    return SpringDataRestController.getInstance(UserStateManager,UserRestResource);

}).factory('EventSystemRestResource', function(SpringDataRestResource) {
    return SpringDataRestResource.getInstance('/api/eventSystems/');
}).factory('EventSystemStateManager', function(SpringDataRestStateManager) {
    console.log("create EventSystemStateManager");
    return SpringDataRestStateManager.getInstance('eventsystem');
}).factory('EventSystemControllerManager', function(SpringDataRestController, EventSystemStateManager, EventSystemRestResource) {
    console.log("create EventSystemControllerManager");
    return SpringDataRestController.getInstance(EventSystemStateManager,EventSystemRestResource);

}).factory('TeamRestResource', function(SpringDataRestResource) {
    return SpringDataRestResource.getInstance('/api/teams/');
}).factory('TeamStateManager', function(SpringDataRestStateManager) {
    console.log("create TeamStateManager");
    return SpringDataRestStateManager.getInstance('team');
}).factory('TeamControllerManager', function(SpringDataRestController, TeamStateManager, TeamRestResource) {
    console.log("create TeamControllerManager");
    return SpringDataRestController.getInstance(TeamStateManager,TeamRestResource);
}).factory('TeamListHelperManager', function(TeamRestResource) {
    return new TeamListHelper(TeamRestResource);


}).factory('TournamentRestResource', function(SpringDataRestResource) {
    return SpringDataRestResource.getInstance('/api/tournaments/');
}).factory('TournamentStateManager', function(SpringDataRestStateManager) {
    console.log("create TournamentStateManager");
    return SpringDataRestStateManager.getInstance('tournament');
}).factory('TournamentControllerManager', function(SpringDataRestController, TournamentStateManager, TournamentRestResource) {
    console.log("create TournamentControllerManager");
    return SpringDataRestController.getInstance(TournamentStateManager,TournamentRestResource,
        {
            searchPath: 'search/findAllByNameContainsIgnoreCaseOrderByNameAsc',
            searchParameters: { name : "" },
            pageSize: 10
        }
        );
}).factory('TournamentHelperManager', function(EventSystemRestResource) {
    return new TournamentHelper(EventSystemRestResource);

}).factory('TournamentEntryRestResource', function(SpringDataRestResource) {
    return SpringDataRestResource.getInstance('/api/tournamentEntries/');
}).factory('TournamentEntryStateManager', function(SpringDataRestStateManager) {
    console.log("create TournamentEntryStateManager");
    return SpringDataRestStateManager.getInstance('tournamententry');
}).factory('TournamentEntryControllerManager', function(SpringDataRestController, TournamentEntryStateManager, TournamentEntryRestResource) {
    console.log("create TournamentEntryControllerManager");
    return SpringDataRestController.getInstance(TournamentEntryStateManager,TournamentEntryRestResource,
        {
            searchPath: 'search/findTournamentEntries?sort=tournamentName&sort=teamName',
            searchParameters: { status : null, teamName: null, textFilter: "", checkNumber: null },
            pageSize: 15
        }
    );
}).factory('TournamententryHelperManager', function(StatusListHelperManager, TeamListHelperManager, TournamentRestResource) {
    return new TournamententryHelper(StatusListHelperManager, TeamListHelperManager, TournamentRestResource);
});

angular.module('mainApp.controllers', []).controller('AdminListController', function($scope, $state) {
    $scope.operationalList = [
        { name: "Tournaments", view: "tournaments"},
        { name: "Tournament Entries", view: "tournamententrys"},
    ];
    $scope.adminList = [
        { name: "Event Systems", view: "eventsystems"},
        { name: "Teams", view: "teams"},
        { name: "Users", view: "users"}
    ];
    $scope.hasAdminAccess = hasAdminAccess;

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

}).controller('EventsystemListController', function($scope, $state, EventSystemControllerManager) {
    EventSystemControllerManager.controlList($scope, $state);
}).controller('EventsystemEditController', function($scope, $state, $stateParams, EventSystemControllerManager) {
    EventSystemControllerManager.controlEdit($scope, $state, $stateParams);
}).controller('EventsystemAddController', function($scope, $state, EventSystemControllerManager) {
    EventSystemControllerManager.controlAdd($scope, $state);

}).controller('TeamListController', function($scope, $state, TeamControllerManager) {
    TeamControllerManager.controlList($scope, $state);
}).controller('TeamEditController', function($scope, $state, $stateParams, TeamControllerManager) {
    TeamControllerManager.controlEdit($scope, $state, $stateParams);
}).controller('TeamAddController', function($scope, $state, TeamControllerManager) {
    TeamControllerManager.controlAdd($scope, $state);

}).controller('TournamentListController', function($scope, $state, TournamentControllerManager) {
    TournamentControllerManager.controlList($scope, $state);
}).controller('TournamentEditController', function($scope, $state, $stateParams, TournamentControllerManager, TournamentHelperManager) {
    TournamentControllerManager.controlEdit($scope, $state, $stateParams);
    TournamentHelperManager.setupValues($scope);
}).controller('TournamentAddController', function($scope, $state, TournamentControllerManager, TournamentHelperManager) {
    TournamentControllerManager.controlAdd($scope, $state);
    TournamentHelperManager.setupValues($scope);

}).controller('TournamententryListController', function($scope, $state, TournamentEntryStateManager, TournamentEntryControllerManager, StatusListHelperManager, TeamListHelperManager, TournamentRestResource) {
    // load tournaments to show dates
    var tournamentQuerySettings = {pathAddition : "search/findAllByOrderByNameAsc"};
    TournamentRestResource.query(function (response) {
        $scope.tournamentList = response;
    }, tournamentQuerySettings);
    StatusListHelperManager.setupValues($scope);
    TeamListHelperManager.setupValues($scope);
    TournamentEntryControllerManager.controlList($scope, $state);
    $scope.cloneEntry = function (tournamentEntry) {
        var clonedObject = {
            tournamentName : tournamentEntry.tournamentName,
            startDate : tournamentEntry.startDate,
            location : tournamentEntry.location,
            eventSystem : tournamentEntry.eventSystem,
            teamName : tournamentEntry.teamName,
            ageGroup : tournamentEntry.ageGroup,
            priority : tournamentEntry.priority,
            entryFee : tournamentEntry.entryFee,
            comments : tournamentEntry.comments
        };
        $state.go(TournamentEntryStateManager.getAddState(),{cloneObject : clonedObject});
    };
}).controller('TournamententryEditController', function($scope, $state, $stateParams, TournamentEntryControllerManager, TournamententryHelperManager) {
    TournamentEntryControllerManager.controlEdit($scope, $state, $stateParams);
    TournamententryHelperManager.setupValues($scope);
}).controller('TournamententryAddController', function($scope, $state, $stateParams, TournamentEntryControllerManager, TournamententryHelperManager) {
    TournamentEntryControllerManager.controlAdd($scope, $state, $stateParams);
    TournamententryHelperManager.setupValues($scope, true);
});

var $stateProviderRef = null;

angular.module('mainApp').config(function($stateProvider) {
  $stateProvider.state('adminList', {
    templateUrl: 'partials/admin-list.html',
    controller: 'AdminListController'
  });

  $stateProviderRef = $stateProvider;
}).run(function($state, EventSystemStateManager, TeamStateManager, TournamentStateManager, TournamentEntryStateManager, UserStateManager) {
    EventSystemStateManager.setupStates($stateProviderRef);
    TeamStateManager.setupStates($stateProviderRef);
    TournamentStateManager.setupStates($stateProviderRef);
    TournamentEntryStateManager.setupStates($stateProviderRef);
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
