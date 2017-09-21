const app = angular.module('voveo', []);

app.controller('mainController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/';
  this.loginForm = false;
  this.registerForm = false;
  this.toggleRegister = function() {
    this.registerForm = !this.registerForm;
    this.loginForm = false;
  }
  this.toggleLogin = function() {
    this.loginForm = !this.loginForm;
    this.registerForm = false;
  }
  this.getReps = function(address){
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/civicinfo/v2/representatives' + '?key=AIzaSyBeJbFpC9D_pouOsmIW_9NWnwp56HmcORw&address=' + this.address.split(' ').join('%20') + '%20' + this.city.split(' ').join('%20') + '%20' + this.state.split(' ').join('%20')
    }).then(function(response){
      console.log('success');
      controller.officials = response.data.officials
      console.log(controller.officials);
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
      //controller.checkLogin();
    }.bind(this))
  }
  this.login = function(userPass){
    $http({
      method: 'POST',
      url: this.url + '/users/login',
      data: { user: { username: userPass.username, password: userPass.password }},
    }).then(function(response){
      console.log(response);
      this.user = response.data.user;
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('logged', JSON.stringify(true));
      this.checkLogin();
      this.loginForm = false;
      this.registerForm = false;
    }.bind(this));
  }
  this.logout = function() {
    localStorage.clear('token');
    location.reload();
  }
  this.checkLogin = function() {
    if (localStorage.logged === "true"){
      controller.logged = true;
    }
    else {
      controller.logged = false;
    }
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
  this.checkLogin();
}]);
