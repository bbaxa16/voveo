const app = angular.module('voveo', []);

  // const apiKey = process.env.API_KEY; for some reason this is throwing an error


app.controller('mainController', ['$http', function($http){
  const controller = this;

  this.url = 'http://voveo-api.herokuapp.com';
  this.registerForm = false;
  this.repz = false;
  this.toggleRegister = function() {
    this.registerForm = !this.registerForm;
    this.loginForm = false;
  }
  this.toggleHelp = function() {
    this.helpModal = !this.helpModal;
  }
  this.getReps = function(address){
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/civicinfo/v2/representatives' + '?key=AIzaSyBeJbFpC9D_pouOsmIW_9NWnwp56HmcORw&address=' + this.address.split(' ').join('%20') + '%20' + this.city.split(' ').join('%20') + '%20' + this.state.split(' ').join('%20')
    }).then(function(response){
      console.log('success');
      console.log(response.data);
      controller.officials = response.data.officials
      controller.offices = response.data.offices
      controller.city = response.data.normalizedInput.city;
      controller.state = response.data.normalizedInput.state;
      controller.zip = response.data.normalizedInput.zip;
      //uncomment this function when you're ready to save data again.
      controller.newdata(1);
      controller.repz = true;
    }, function(err){
      console.log('fail');
      console.log(err);
    })
  }
  this.register = function(register) {
    $http({
      method: 'POST',
      url: this.url + '/users',
      data: { user: {
        username: register.username,
        password: register.password
      }},
    }).then(function(response){
      console.log(response);
      this.loginForm = false;
      this.registerForm = false;
    }.bind(this))
  }

  this.getUsers = function(){
    $http({
      url: this.url + '/users',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }
    }).then(function(response){
      if(response.data.status == 401){
      this.error = 'Unauthorized';
      } else {
      this.users = response.data.username
      console.log(response);
      }
    }.bind(this));
  }
  this.newdata = function(user_id) {
$http({
  url: this.url + '/users/' + user_id + '/data',
  method: 'POST',
  data: {
    city: this.city,
    state: this.state,
    zip: this.zip }
}).then(function(response){
  console.log('this is creating a new data thing');
  console.log(response);
})
}

  // this.memberinfo = function(){
  //   $http({
  //     method: 'GET',
  //     url: 'https://api.propublica.org/congress/v1/members/K000388.json',
  //     headers: { Authorization: 'X-API-Key: Zxmr4dlKyl8vLvBWZEPXLtEKDBeEc0UpZWUXtFkN' }
  //   }).then(function(response){
  //     console.log(response);
  //   })
  // }
  // this.memberinfo()
}]);
