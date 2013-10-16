angular.module('angular-growl').directive('growl', ['$rootScope', function ($rootScope) {
    'use strict';
    return {
      restrict: 'A',
      // template:   '<div class="growl">' +
      //     ' <div class="growl-item alert" ng-repeat="message in messages" ng-class="computeClasses(message)">' +
      //     '   <button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>' +
      //     '            {{ message.text}}' +
      //     ' </div>' +
      //     '</div>',

      // BB Modified template
      template: '<div class="growl">' + '\t<div class="contents alert" ng-repeat="message in messages" ng-class="computeClasses(message)">' + '\t\t<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>' + '<span class="title">{{message.text}}</span>' + '\t</div>' + '</div>',
      // end modification

      replace: true,
      scope: true,
      controller: [
        '$scope',
        '$timeout',
        function ($scope, $timeout) {
          $scope.messages = [];
          
          // BB Modification
          $rootScope.$on('growlMessage', function (event, message) {
            if(message.replace){
              $scope.messages = [message];
            } else{
              $scope.messages.push(message);
            }
            // end modification
            if (message.ttl && message.ttl !== -1) {
              $timeout(function () {
                $scope.deleteMessage(message);
              }, message.ttl);
            }
          });
          $scope.deleteMessage = function (message) {
            var index = $scope.messages.indexOf(message);
            if (index > -1) {
              $scope.messages.splice(index, 1);
            }
          };
          $scope.computeClasses = function (message) {
            return {
              'alert-success': message.isSuccess,
              'alert-error': message.isError,
              'alert-danger': message.isError,
              'alert-info': message.isInfo,
              'alert-warning': message.isWarn
            };
          };
        }
      ]
    };
  }
]);
