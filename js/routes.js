angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('login', {
      url: '/page2',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
      .state('menu.lukasBerger', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/lukasBerger.html',
        controller: 'lukasBergerCtrl'
      }
    }
  })

  .state('ich', {
    url: '/page5',
    templateUrl: 'templates/ich.html',
    controller: 'ichCtrl'
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
