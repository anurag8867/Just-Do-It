(function () {
    'use strict';

    function CommonService($http) {

        var URL = 'http://localhost:3000/',
            TASK = 'task',
            OPEN = "open",
            quadrant = {
                U_I: 1,
                U_NI: 3,
                NU_I: 2,
                NU_NI: 4
            };

        function addTask(taskObject) {
            return $http.post(URL + TASK, taskObject);
        }

        function getAllTask() {
            return $http.get(URL + TASK)
        }

        function updateTaskQuadrant(taskId, quadrant) {
            let dataToUpdate = {
                "quadrant": quadrant,
                "status": "inprogress"
            };

            return $http.put(URL + TASK + "?searchBy=ObjectId&searchParam=" + taskId, dataToUpdate);
        }

        function updateTaskStatus(taskId, status) {
            let dataToUpdate = {
                "status": status
            };

            return $http.put(URL + TASK + "?searchBy=ObjectId&searchParam=" + taskId, dataToUpdate);
        }

        function deleteTask(taskId) {
            return $http.delete(URL + TASK + "?searchBy=ObjectId&searchParam=" + taskId);
        }

        return {
            addTask: addTask,
            getAllTask: getAllTask,
            updateTaskStatus: updateTaskStatus,
            updateTaskQuadrant: updateTaskQuadrant,
            deleteTask: deleteTask
        };
    }

    var app = angular.module('app'),
        requires = [
            '$http',
            CommonService
        ];
    app.factory('CommonService', requires);
}());
