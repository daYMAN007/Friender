angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.konktakt', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/konktakt.html',
        controller: 'konktaktCtrl'
      }
    }
  })

  .state('ich', {
    url: '/page5',
    templateUrl: 'templates/ich.html',
    controller: 'ichCtrl'
  })

  .state('login', {
    url: '/page2',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('registrieren', {
    url: '/page3',
    templateUrl: 'templates/registrieren.html',
    controller: 'registrierenCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('einstellungen', {
    url: '/page4',
    templateUrl: 'templates/einstellungen.html',
    controller: 'einstellungenCtrl'
  })

$urlRouterProvider.otherwise('/page2')

  

});