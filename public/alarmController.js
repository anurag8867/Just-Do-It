(function () {
    'use strict';

   function alarmController($scope) {
        var reminderTime;

        function formatTimeString(f) {
            return (f < 10) ? "0" + f : f;
        };

        function checkAlarmTime() {
            var dateObj = new Date();
            var currentTime = formatTimeString(dateObj.getHours()) + ":" + formatTimeString(dateObj.getMinutes()) + ":" + formatTimeString(dateObj.getSeconds())
            if (typeof reminderTime != "undefined") {
                if (currentTime == reminderTime) {
                    notify();
                }
            }
        };

        function notify() {
            webNotification.showNotification('IMPORTANT NOTIFICATION', {
                body: 'Have to attend learn and design meeting',
                onClick: function onNotificationClicked() {
                    console.log('Notification clicked.');
                },
                autoClose: 10000 //auto close the notification after 4 seconds (you can manually close it via hide function)
            }, function onShow(error, hide) {
                if (error) {
                    window.alert('Unable to show notification: ' + error.message);
                } else {
                    console.log('Notification Shown.');
                }
            });
            startWatch();
        };

        function startWatch() {
            setInterval(function () {
                checkAlarmTime()
            }, 1000);
        };

        function onload() {
            getTodayDate();
            startWatch();
        };

       function getTodayDate() {
           var dateObj = new Date();
           let todayDate = formatTimeString(dateObj.getDate()) + "/" + formatTimeString(dateObj.getMonth()) + "/" + formatTimeString(dateObj.getFullYear());
           document.getElementById('time').innerHTML = todayDate;
       }

        $scope.setReminder = function () {
            reminderTime = document.getElementById("myTime").value + ":" + "00";
            document.getElementById("myTime").value = "--:--";
            checkAlarmTime();
        };
        onload();
    }

    var app = angular.module('app'),
        requires = [
            '$scope',
            alarmController
        ];
    app.controller('alarmController', requires);
}());



