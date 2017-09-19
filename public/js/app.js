const app = angular.module('voveo', []);

app.controller('mainController', ['$http', function($http){

  this.getPolling = function(address){
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/civicinfo/v2/representatives' + '?key=AIzaSyBeJbFpC9D_pouOsmIW_9NWnwp56HmcORw&address=' + this.address.split(' ').join('%20') + '%20' + this.city.split(' ').join('%20') + '%20' + this.state.split(' ').join('%20')
    }).then(function(response){
      console.log('success');
      console.log(response.data);
    }, function(err){
      console.log('fail');
      console.log(err);
    })
  }
  this.test = function(address){
    console.log(address.split(' ').join('%20'));

  }
 const str = 'this is a string'

 this.join = function(str){
   console.log( str.split(' ').join('%20'));
 }
//this.join(str)
//this.getPolling()
}]);
