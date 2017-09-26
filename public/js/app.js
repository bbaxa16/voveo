const app = angular.module('voveo', []);

  // const apiKey = process.env.API_KEY; for some reason this is throwing an error


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
  this.toggleHelp = function() {
    this.helpModal = !this.helpModal;
  }
  this.getReps = function(address){
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/civicinfo/v2/representatives' + '?key=AIzaSyBeJbFpC9D_pouOsmIW_9NWnwp56HmcORw&address=' + this.address.split(' ').join('%20') + '%20' + this.city.split(' ').join('%20') + '%20' + this.state.split(' ').join('%20')
    }).then(function(response){
      console.log('success');
      controller.officials = response.data.officials
      controller.offices = response.data.offices
      controller.city = response.data.normalizedInput.city;
      controller.state = response.data.normalizedInput.state;
      controller.zip = response.data.normalizedInput.zip;
      controller.newdata(1);
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
      if(response.data.message === 'Unauthorized'){
        console.log(response);
        this.error = 'username or password was incorrect'
        this.unauthorized = true;
      }
      else {
        this.user = response.data.user;
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('logged', JSON.stringify(true));
        this.checkLogin();
        this.loginForm = false;
        this.registerForm = false;
        this.unauthorized = false;
      }
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
  this.printshit = function() {
    console.log('OH SHIII');
    console.log(this.ish);
  }
  this.checkLogin();
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
