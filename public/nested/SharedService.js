(function () {
    'use strict';

    function SharedService() {
        var taskList = [];

        function getTaskInFormat(tasks) {
            let task = {},
                containerTask = [];
            if (tasks && tasks.length) {
                for (var taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
                    task = angular.copy({id : "", name : ""});
                    task.id = tasks[taskIndex]._id;
                    task.name = tasks[taskIndex].name;
                    containerTask.push(task);
                }
            }
            return containerTask;
        }

        this.getAllTask = function () {
            return getTaskInFormat(taskList);
        };

        this.getTaskFromStatus = function (taskStatus) {
            let containerTask = [];
            if (taskList && taskList.length) {
                containerTask = taskList.filter(function (taskFull) {
                    return taskFull.status === taskStatus;
                });
                return getTaskInFormat(containerTask);
            }
            return containerTask;
        };

        this.getTaskFromQuadrant = function (quadrant) {
            let containerTask = [];
            if (taskList && taskList.length) {
                containerTask = taskList.filter(function (taskFull) {
                    return taskFull.quadrant === quadrant && taskFull.status === "inprogress";
                });
                return getTaskInFormat(containerTask);
            }
            return containerTask;
        };

        this.setTaskList = function (tasks) {
            taskList = tasks;
        };
    }

    var app = angular.module('app'),
        requires = [
            SharedService];
    app.service('SharedService', requires);
}());
