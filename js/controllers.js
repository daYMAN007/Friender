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

.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$location','$ionicPopup','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $http, $location,$ionicPopup,$state) {
    $scope.Login = function() {
    $state.go('menu.kontakt');

      if (!empty( $scope.Benutzername)&&!empty($scope.Passwort)) { //überprüfe ob alle Felder ausgefühlt sind

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
            case "0": //user existiert nicht
              var alertPopup = $ionicPopup.alert({
                title: 'Fehler',
                template: 'Dieser Nutzername existiert nicht!'
              });


              break;
            case "1": // Login erfolgreich
              //weiterleitung zur ich page

              break;
            case "2": // Passwort falsch
            var alertPopup = $ionicPopup.alert({
              title: 'Fehler',
              template: 'Das eingegeben Passwort ist Falsch!'
            });
              break;
            default: //server error
            var alertPopup = $ionicPopup.alert({
              title: 'Fehler',
              template: 'Der Server ist nicht erreichbar!'
            });
          }
        }).error(function(error) { //server error oder keine internet verbindung
          var alertPopup = $ionicPopup.alert({
            title: 'Fehler',
            template: 'Der Server ist nicht erreichbar!'
          });
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

.controller('registrierenCtrl', ['$scope', '$stateParams','$http', '$location','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams,$http,$location,$ionicPopup) {
    $scope.Registrieren = function() {
      if (!empty($scope.Benutzername)&&!empty($scope.Vorname)&&!empty($scope.Nachname)&&!empty($scope.Telefonnummer)&&!empty($scope.Passwort)&&!empty($scope.PasswortWiederholung)) { //überprüfe ob alle Felder ausgefühlt sind
        if($scope.Passwort===$scope.PasswortWiederholung)
        {

        var formData = {
          'action': 'Registrieren',
          'Benutzername': $scope.Benutzername,
          'BenPasswort': $scope.Passwort,
          'BenTelefonnummer' : $scope.Telefonnummer,
          'BenVorname'  : $scope.Vorname,
          'BenNachname' : $scope.Nachname,
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
          //error messages : 0 Benutzer erfolgreich erstellt
          //                 1 Fehler bei der Übertragung

          switch (res) {
            case "0": //Benutzer erfolgreich erstellt
              var alertPopup = $ionicPopup.alert({
                title: 'Erstellt',
                template: 'Der Nutzer wurde erstellt!'
                //todo: weiterleitung zur ich page

              });
              break;
            case "1": // Fehler bei der Übertragung
            var alertPopup = $ionicPopup.alert({
              title: 'Fehler',
              template: 'Die Übermittelten Daten sind fehlerhaft!'

            });
              break;
            default: //server error
            var alertPopup = $ionicPopup.alert({
              title: 'Fehler',
              template: 'Der Server ist nicht erreichbar!'
            });
          }
        }).error(function(error) { //server error oder keine internet verbindung
          var alertPopup = $ionicPopup.alert({
            title: 'Fehler',
            template: 'Der Server ist nicht erreichbar!'
          });
        });
      }
      else{ //ungleiche Passwörter
        var alertPopup = $ionicPopup.alert({
          title: 'Fehler',
          template: 'Die Passwörter stimmen nicht überein!'
        });
      }
}

      else { //password und nutzername müssen ausgefühlt werden
        var alertPopup = $ionicPopup.alert({
          title: 'Fehler',
          template: 'Alle Felder müssen ausgefüllt sein!'
        });

      }
    }

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
