const app = angular.module('voveo', []);

app.controller('mainController', ['$http', function($http){

  this.getPolling = function(){
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/civicinfo/v2/elections' + '?key=AIzaSyBeJbFpC9D_pouOsmIW_9NWnwp56HmcORw' 
    }).then(function(response){
      console.log('success');
      console.log(response);
    }, function(err){
      console.log('fail');
      console.log(err);
    })
  }

  this.getPolling()
}]);
