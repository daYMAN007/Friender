angular.module('app.controllers', [])

.controller('konktaktCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }
])

.controller('ichCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }
])

.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$location','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $http, $location,$ionicPopup) {
    $scope.Login = function() {
      if ((typeof  $scope.Benutzername !==  'undefined' && typeof  $scope.Passwort !== 'undefined')&&($scope.Benutzername !== '' && $scope.Passwort !== '')) { //überprüfe ob alle Felder ausgefühlt sind

        var formData = {
          'action': 'Login',
          'Benutzername': $scope.Benutzername,
          'BenPasswort': $scope.Passwort
        }
        var postData = 'myData=' + JSON.stringify(formData);
        console.log(postData);
        $http({
          method: 'POST',
          url: 'http://localhost/FrienderServer/api.php',
          data: postData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }

        }).success(function(res) {
          console.log(res);
          //error messages : 0 user existiert nicht
          //                 1 Login erfolgreich
          //                 2 Passwort falsch

          switch (res) {
            case 0: //user existiert nicht
              var alertPopup = $ionicPopup.alert({
                title: 'Fehler',
                template: 'Dieser Nutzername existiert nicht!'
              });


              break;
            case 1: // Login erfolgreich
              //weiterleitung zur ich page

              break;
            case 2: // Passwort falsch

              break;
            default: //server error
          }
        }).error(function(error) { //server error oder keine internet verbindung
          console.log(error);
        });
      } else { //password und nutzername müssen ausgefühlt werden
        var alertPopup = $ionicPopup.alert({
          title: 'Fehler',
          template: 'Alle Felder müssen ausgefüllt sein!'
        });

      }
    }
  }
])

.controller('registrierenCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }
])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }
])

.controller('einstellungenCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }
])
