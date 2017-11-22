/**
 * Last updated on 11/22/2017.
 * Contains Angular module to do Spring Data Rest operations in Angular UI.
 */

'use strict';

/* Factories */
angular.module("spring-data-rest-crud", ["spring-data-rest"])
    .provider("SpringDataRestResource", [ function() {

        this.$get = ["$http", "SpringDataRestAdapter", "$log", function($http, SpringDataRestAdapter, $log) {
            var SpringDataRestResource = function(hateoasUrl) {
                $log.debug( "SpringDataRestResource constructor: " + hateoasUrl);
                this.hateoasUrl = hateoasUrl;
            };

            SpringDataRestResource.getInstance = function(hateoasUrl) {
                $log.debug( "SpringDataRestResource.getInstance for " + hateoasUrl);
                return new SpringDataRestResource(hateoasUrl);
            };

            function SpringDataRestResourceObject(resourceObject) {
                $log.debug( "new resourceObject");
                if (resourceObject._resources) {
                    resourceObject.objectResources = resourceObject._resources("self", {}, {
                        update: {
                            method: 'PUT'
                        }
                    });
                    resourceObject.save = function(callback) {
                        resourceObject.objectResources.update(resourceObject, function() {
                            callback && callback(resourceObject);
                        });
                    };

                    resourceObject.remove = function(callback) {
                        resourceObject.objectResources.remove(function() {
                            callback && callback(resourceObject);
                        });
                    };
                } else {
                    resourceObject.save = function(callback) {
                        resourceObject.resources.save(resourceObject, function(resourceObject, headers) {
                            var deferred = $http.get(headers().location);
                            return SpringDataRestAdapter.process(deferred).then(function(newResourceObject) {
                                callback && callback(new SpringDataRestResourceObject(newResourceObject));
                            });
                        });
                    };
                }

                return resourceObject;
            }

            SpringDataRestResource.prototype = {
                load: function(resourceObjectLink, callback) {
                    $log.debug("SpringDataRestResource.load()");
                    var resourceHolder = this;
                    return SpringDataRestAdapter.process($http.get(resourceObjectLink)).then(function (data) {
                        $log.debug("SpringDataRestResource got load stuff");
                        resourceHolder.objectResources = data._resources("self");
                        callback && callback(new SpringDataRestResourceObject(data));
                    });
                },

                /*
                 * querySettings can be an object with these settings:
                 * - pathAddition : an additional path to be added on to the base URL
                 * - parameters : an object with parameters to be passed to the $http.get call
                 */
                query: function(callback, querySettings) {
                    $log.debug("SpringDataRestResource.query()");
                    $log.debug(querySettings);
                    var resourceHolder = this;
                    // check to see if we need to modify the path for this query
                    var queryURL = this.hateoasUrl;
                    var parameters = {};
                    if (querySettings) {
                        if (querySettings.pathAddition) {
                            queryURL += querySettings.pathAddition;
                        }
                        if (querySettings.parameters) {
                            parameters = querySettings.parameters;
                        }
                    }
                    // if we have not loaded resources then get them here, the search could be different URL that
                    // does not work for saving new objects
                    if (!this.resources) {
                        SpringDataRestAdapter.process($http.get(this.hateoasUrl)).then(function(data) {
                            resourceHolder.resources = data._resources("self");
                        });
                    }
                    return SpringDataRestAdapter.process($http.get(queryURL, {params:parameters})).then(function(data) {
                        $log.debug("got stuff");
                        resourceHolder.page = null; // reset paging when we do a query
                        if (data.page) {
                            // save the page info to the resource holder
                            $log.debug("saving paging data");
                            resourceHolder.page = data.page;
                            $log.debug(resourceHolder.page);
                        }
                        callback && callback(data._embeddedItems.map(function(resourceObject) {
                            //$log.debug(resourceObject);
                            return new SpringDataRestResourceObject(resourceObject);
                        }));
                    });
                },

                newObject: function() {
                    $log.debug("newObject for: " + this.hateoasUrl);
                    // initialize a new object with resources we already have from a query
                    return new SpringDataRestResourceObject({resources : this.resources});
                }
            };

            return SpringDataRestResource;
        }]
    }]);

/**
 * A state manger which sets up the various states based on the passed in name.
 * If the passed in value is 'item' then it will generate the following states:
 * - { templateUrl: 'partials/items.html', controller: 'ItemListController' }
 * - { templateUrl: 'partials/item-edit.html', controller: 'ItemEditController', params: { objectLink: {value : "" } }
 * - { templateUrl: 'partials/-edit.html', controller: 'ItemAddController' }
 */
angular.module("spring-data-rest-crud")
    .provider("SpringDataRestStateManager", [ function() {

        this.$get = ["$log", function($log) {
            var SpringDataRestStateManager = function(objectTypeId) {
                $log.debug( "SpringDataRestStateManager constructor");
                this.objectTypeId = objectTypeId;
                this.objectTypeIdUpper = objectTypeId.charAt(0).toUpperCase() + objectTypeId.slice(1);
            };

            SpringDataRestStateManager.getInstance = function(objectTypeId) {
                $log.debug( "SpringDataRestStateManager get instance");
                return new SpringDataRestStateManager(objectTypeId);
            };

            SpringDataRestStateManager.prototype = {
                getEditState : function() {
                    return this.objectTypeId;
                },

                getListState : function() {
                    return this.objectTypeId  + "s";
                },

                setupStates : function(stateProvider) {
                    $log.debug("setting up states for " + this.objectTypeId);
                    stateProvider.state(this.getListState(), { // state for showing all objects
                        templateUrl: 'partials/' + this.getListState() + '.html',
                        controller: this.objectTypeIdUpper + 'ListController'
                    }).state('edit' + this.objectTypeIdUpper, { //state for editing object
                        templateUrl: 'partials/' + this.objectTypeId + '-edit.html',
                        controller: this.objectTypeIdUpper + 'EditController',
                        params: {  // make sure these can be passed through
                            useLastObject: false,
                            objectLink: {value : "" },
                            dateProperties: [],
                            oldName: ''
                        }
                    }).state('add' + this.objectTypeIdUpper, { //state for adding object
                        templateUrl: 'partials/' + this.objectTypeId + '-edit.html',
                        controller: this.objectTypeIdUpper + 'AddController',
                    });

                }
            };

            return SpringDataRestStateManager;
        }]
    }]);

angular.module("spring-data-rest-crud")
    .provider("SpringDataRestObjectService", [ function() {
        this.$get = ["$log", function($log) {

            var SpringDataRestObjectService = function() {
                $log.debug( "SpringDataRestObjectService constructor");
                this.currentObject = null;
            };

            SpringDataRestObjectService.getInstance = function() {
                return new SpringDataRestObjectService();
            };

            SpringDataRestObjectService.prototype = {
                getCurrentObject : function() {
                    return this.currentObject;
                },
                setCurrentObject : function(objectValue) {
                    this.currentObject = objectValue;
                }
            };
            return SpringDataRestObjectService;
        }]
    }]);

angular.module("spring-data-rest-crud")
    .provider("SpringDataRestController", [ function() {

        this.$get = ["$log", function($log) {
            var SpringDataRestController = function(stateManager, dataRestResource, searchConfiguration) {
                $log.debug( "SpringDataRestController constructor");
                this.stateManager = stateManager;
                this.dataRestResource = dataRestResource;
                this.searchConfiguration = searchConfiguration;
            };

            // searchConfiguration can have:
            // - searchPath : appended to the REST query URL to do searches
            // - searchParameters : will be used as initial search parameters
            // - pageSize : number of items per page
            SpringDataRestController.getInstance = function(stateManager, dataRestResource, searchConfiguration) {
                $log.debug( "SpringDataRestController get instance");
                return new SpringDataRestController(stateManager, dataRestResource, searchConfiguration);
            };

            SpringDataRestController.prototype = {
                setObjectService : function(objectService) {
                    this.objectService = objectService;
                    return this;
                },

                searchChanged : function(newValue, oldValue, $scope) {
                    if (oldValue != newValue) {
                        $log.debug("search value changed");
                        $log.debug($scope.searchParameters);
                        // check to see if we just the page value to blank
                        if (newValue.page == null && oldValue.page != null ) {
                            $log.debug("skipping search based on page values");
                            return;
                        }
                        if (newValue.page == oldValue.page) {
                            // if the page value is the same then reset it as it means other criteria was updated
                            // we will want to restart paging
                            $scope.controller.searchParameters.page = null;
                        }
                        $scope.controller.doQuery($scope);
                    }
                },

                doQuery : function($scope) {
                    $log.debug("running query for list state");
                    var controller = this;
                    this.dataRestResource.query(function (response) {
                        $log.debug("SpringDataRestController response");
                        $scope[controller.stateManager.getListState()] = response ? response : [];
                        $log.debug($scope[controller.stateManager.getListState()]);
                        $scope.page = controller.dataRestResource.page; // get the paging info
                    }, this.querySettings);
                },

                controlList : function($scope, $state) {
                    var controller = this;
                    this.querySettings = {};
                    this.searchParameters = {}; // set up the object for search parameters, may have some initial
                    if (this.searchConfiguration) {
                        if (this.searchConfiguration.searchPath) {
                            this.querySettings.pathAddition = this.searchConfiguration.searchPath;
                        }
                        if (this.searchConfiguration.searchParameters) {
                            this.searchParameters = this.searchConfiguration.searchParameters;
                        }
                        if (this.searchConfiguration.pageSize) {
                            this.searchParameters.size = this.searchConfiguration.pageSize;
                        }
                    }
                    this.querySettings.parameters = this.searchParameters;
                    $scope.controller = controller; // record ourselves in the scope
                    $scope.searchParameters = controller.searchParameters;
                    $scope.$watch("searchParameters", this.searchChanged, true); // watch for search changes
                    this.doQuery($scope);
                    $scope.deleteObject = function(resourceObject) { // Delete an object
                        if (confirm('Really delete this?')) {
                            resourceObject.remove(function() {
                                $state.go(controller.stateManager.getListState(),{},{reload : true}); // on success go back to home i.e. list state.
                            });
                        }
                    };
                },

                controlEdit : function($scope, $state, $stateParams) {
                    var controller = this;
                    $scope.updateObject = function() { // Update the edited object.
                        $scope[controller.stateManager.objectTypeId].save(function() {
                            $state.go(controller.stateManager.getListState()); // on success go back to home i.e. list state.
                        });
                    };

                    // determine if we are loading an object or using an existing one
                    if ($stateParams.useLastObject) {
                        $log.debug("edit existing object");
                        $scope[this.stateManager.objectTypeId] = this.objectService.getCurrentObject();
                        $log.debug($scope);
                    } else {
                        this.dataRestResource.load($stateParams.objectLink, function(response) {
                            $log.debug("edit response: " + controller.stateManager.objectTypeId);
                            if ($stateParams.dateProperties) {
                                $stateParams.dateProperties.forEach(
                                    function (dateProperty) {
                                        response[dateProperty] = new Date(response[dateProperty]);
                                    }
                                );
                            }
                            $scope[controller.stateManager.objectTypeId] = response;
                            // store the current object if we are using that service
                            if (controller.objectService) {
                                controller.objectService.setCurrentObject(response);
                            }
                            $log.debug($scope[controller.stateManager.objectTypeId]);
                        });
                        $scope[this.stateManager.objectTypeId] = {};
                    }
                },

                controlAdd : function($scope, $state) {
                    var controller = this;
                    $scope.updateObject = function() { //Update the newly added object.
                        $scope[controller.stateManager.objectTypeId].save(function() {
                            $state.go(controller.stateManager.getListState()); // on success go back to home i.e. users state.
                        });
                    };

                    $scope[this.stateManager.objectTypeId] = this.dataRestResource.newObject();
                    // store the current object if we are using that service
                    if (this.objectService) {
                        this.objectService.setCurrentObject($scope[this.stateManager.objectTypeId]);
                    }
                    $log.debug($scope[this.stateManager.objectTypeId]);
                }
            };

            return SpringDataRestController;
        }]
    }]);

angular.module("spring-data-rest-crud")
    .filter('pagingFilter', function () {
        return function (input, currentPage, totalPages, range) {
            currentPage = parseInt(currentPage);
            totalPages = parseInt(totalPages);
            range = parseInt(range);

            var minPage = (currentPage - range < 0) ? 0 : currentPage - range;
            var maxPage = (currentPage + range > totalPages) ? totalPages : currentPage + range;

            for(var i=minPage; i<maxPage; i++) {
                input.push(i);
            }

            return input;
        };
    });