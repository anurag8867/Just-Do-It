(function () {
    'use strict';

    function NestedListsDemoController($scope, CommonService, SharedService) {

        var status = {
            OPEN: "open",
            DONE: "done"
        };

        $scope.models = {
            selected: null,
            templates: [
                {type: "item", id: 2}
            ],
            dropzones: {
                "A": [
                    {
                        "type": "container",
                        "id": 1,
                        "columns": [
                            {
                                "type": "item",
                                "id": "1"
                            },
                            {
                                "type": "item",
                                "id": "2"
                            }
                        ]
                    },
                    {
                        "type": "container",
                        "id": 2,
                        "columns": [
                            {
                                "type": "item",
                                "id": "3"
                            },
                            {
                                "type": "item",
                                "id": "4"
                            }
                        ]
                    },
                    {
                        "type": "container",
                        "id": 3,
                        "columns": [
                            {
                                "type": "item",
                                "id": "5"
                            },
                            {
                                "type": "item",
                                "id": "6"
                            }
                        ]
                    },
                    {
                        "type": "container",
                        "id": 4,
                        "columns": [
                            {
                                "type": "item",
                                "id": "7"
                            },
                            {
                                "type": "item",
                                "id": "8"
                            }
                        ]
                    }
                ]
            }
        };

        $scope.models.tasksOpen = [];
        $scope.models.tasksDone = [];

        // $scope.$watch('models.dropzones', function(model) {
        //     $scope.modelAsJson = angular.toJson(model, true);
        // }, true);

        function onLoad() {
            CommonService.getAllTask().then(function (data) {
                SharedService.setTaskList(data.data.data);
                $scope.models.tasksOpen = SharedService.getTaskFromStatus(status.OPEN);
                $scope.models.tasksDone = SharedService.getTaskFromStatus(status.DONE);
                $scope.models.dropzones.A[0].columns = SharedService.getTaskFromQuadrant("1");
                $scope.models.dropzones.A[1].columns = SharedService.getTaskFromQuadrant("2");
                $scope.models.dropzones.A[2].columns = SharedService.getTaskFromQuadrant("3");
                $scope.models.dropzones.A[3].columns = SharedService.getTaskFromQuadrant("4");
            }, function () {
                alert("fail");
            });
        }

        $scope.addTask = function () {
            let task = {
                name: $scope.taskTitle,
                desc: $scope.taskTitle,
                status: "open",
                quadrant: "",
            };
            CommonService.addTask(task).then(function (data) {
                alert("Task Added");
                $scope.taskTitle = "";
                onLoad();

            }, function (data, status, headers, config) {
                alert("Task was not added");
                $scope.taskTitle = "";
            });
        };

        $scope.onDrop = function (container, event) {
            var quad = container.id.toString();
            CommonService.updateTaskQuadrant(event.id, quad);
            onLoad();
        };

        $scope.onDropTrash = function (item) {
            var confirmResponse = confirm("Are you sure you want to delete the task ?");
            if (confirmResponse) {
                CommonService.deleteTask(item.id);
            }
            onLoad();
        };

        $scope.onDropDone = function (item) {
            CommonService.updateTaskStatus(item.id, "done");
            onLoad();
        };

        onLoad();
    }

    var app = angular.module('app'),
        requires = [
            '$scope',
            'CommonService',
            'SharedService',
            NestedListsDemoController
        ];
    app.controller('NestedListsDemoController', requires);
}());



