const app = angular.module('voveo', []);

app.controller('mainController', ['$http', function($http){

  this.getPolling = function(address, city, state){
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/civicinfo/v2/voterinfo' + '?key==' + address.split('').join('%20') + '%20' + city.split('').join('%20') + '%20' + state +'%20KS&electionId=2000'
    }).then(function(response){
      console.log('success');
      console.log(response.data.pollingLocations[0]);
    }, function(err){
      console.log('fail');
      console.log(err);
    })
  }
 const str = 'this is a string'

 this.join = function(str){
   console.log( str.split(' ').join('%20'));
 }
this.join(str)
//  this.getPolling()
}]);
