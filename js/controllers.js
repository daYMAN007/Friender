angular.module('app.controllers', [])

.controller('konktaktCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $cordovaGeolocation, $ionicSideMenuDelegate) {
    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
      //47.567109, 9.362960
      $scope.user = globuser;




      var latLngOwn = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //todo: reaktivieren von Cordinaten

      var latLngKontakt = new google.maps.LatLng(globuser.BenLongitude, globuser.BenLatitude);

      var mapOptions = {
        center: latLngKontakt,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map2"), mapOptions);

      google.maps.event.addListenerOnce($scope.map, 'idle', function() {
        var markerOwn = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLngOwn,
          icon: 'img/rsz_blackMarker.png',
        });
        var markerKontakt = new google.maps.Marker({ // anderi farb   icon: 'brown_markerA.png'
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLngKontakt,
        });

        var infoWindowKontakt = new google.maps.InfoWindow({
          content: $scope.user.BenVorname + " " + $scope.user.BenNachname
        });
        var infoWindowMeinePos = new google.maps.InfoWindow({
          content: "Meine Position!"
        });

        google.maps.event.addListener(markerOwn, 'click', function() {
          infoWindowMeinePos.open($scope.map, markerOwn);
        });
        google.maps.event.addListener(markerKontakt, 'click', function() {
          infoWindowKontakt.open($scope.map, markerKontakt);
        });
      });
    }, function(error) {
      console.log(error);
    });
  }


])

.controller('ichCtrl', ['$scope', '$stateParams', '$cordovaGeolocation', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $cordovaGeolocation, $ionicSideMenuDelegate) {
    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    backgroundGeolocation.start();
    
    var options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    $ionicSideMenuDelegate.canDragContent(false)
    $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
      //47.567109, 9.362960




      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //  var latLng = new google.maps.LatLng(47.567109,9.362960);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      google.maps.event.addListenerOnce($scope.map, 'idle', function() {

        var marker = new google.maps.Marker({ // anderi farb   icon: 'brown_markerA.png'
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Meine Position!"
        });

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.open($scope.map, marker);
        });

      });
    }, function(error) {
      console.log("Could not get location");
    });
  }
])

.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$location', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $http, $location, $ionicPopup, $state) {

    $scope.Login = function() {


      if (!empty($scope.Benutzername) && !empty($scope.Passwort)) { //überprüfe ob alle Felder ausgefühlt sind

        var formData = {
          'action': 'Login',
          'Benutzername': $scope.Benutzername,
          'BenPasswort': $scope.Passwort
        }
        var postData = 'myData=' + JSON.stringify(formData);
        console.log(postData);
        $http({
          method: 'POST',
          url: api,
          data: postData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }

        }).success(function(res) {
          console.log(res);
          //error messages : 0 user existiert nicht
          //                 1 Login erfolgreich
          //                 2 Passwort falsch
          number = res.split(";")[0];
          switch (number) {
            case "0": //user existiert nicht
              var alertPopup = $ionicPopup.alert({
                title: 'Fehler',
                template: 'Dieser Nutzername existiert nicht!'
              });


              break;
            case "1": // Login erfolgreich
              //weiterleitung zur ich page
              curBenutzername=$scope.Benutzername;
              curPasswort=$scope.Passwort;
              curUserid=res.split(";")[1];
              console.log(curUserid);
                  $state.go('menu.ich');

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

.controller('registrierenCtrl', ['$scope', '$stateParams', '$http', '$location', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $http, $location, $ionicPopup,$state) {
    $scope.Registrieren = function() {
      if (!empty($scope.Benutzername) && !empty($scope.Vorname) && !empty($scope.Nachname) && !empty($scope.Telefonnummer) && !empty($scope.Passwort) && !empty($scope.PasswortWiederholung)) { //überprüfe ob alle Felder ausgefühlt sind
        if ($scope.Passwort === $scope.PasswortWiederholung) {

          var formData = {
            'action': 'Registrieren',
            'Benutzername': $scope.Benutzername,
            'BenPasswort': $scope.Passwort,
            'BenTelefonnummer': $scope.Telefonnummer,
            'BenVorname': $scope.Vorname,
            'BenNachname': $scope.Nachname,
          }
          var postData = 'myData=' + JSON.stringify(formData);
          console.log(postData);
          $http({
            method: 'POST',
            url: api,
            data: postData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }

          }).success(function(res) {
            console.log(res);
            //error messages : 0 Benutzer erfolgreich erstellt
            //                 1 Fehler bei der Übertragung
            number = res.split(";")[0];
            switch (number) {
              case "0": //Benutzer erfolgreich erstellt
                var alertPopup = $ionicPopup.alert({
                  title: 'Erstellt',
                  template: 'Der Nutzer wurde erstellt!'


                });
                //speicherung von variabeln
                curBenutzername=$scope.Benutzername;
                curPasswort=$scope.Passwort;
                curUserid=res.split(";")[1];
                console.log(curUserid);
                //weiterleitung zur ich page
                $state.go('menu.ich');
                break;
              case "1":
              var alertPopup = $ionicPopup.alert({
                title: 'Fehler',
                template: 'Nutzername bereits vergeben!'

              });
              break;
              case "2": // Fehler bei der Übertragung
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
        } else { //ungleiche Passwörter
          var alertPopup = $ionicPopup.alert({
            title: 'Fehler',
            template: 'Die Passwörter stimmen nicht überein!'
          });
        }
      } else { //password und nutzername müssen ausgefühlt werden
        var alertPopup = $ionicPopup.alert({
          title: 'Fehler',
          template: 'Alle Felder müssen ausgefüllt sein!'
        });

      }
    }

  }
])

.controller('menuCtrl', ['$scope', '$stateParams', '$http', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $http, $state) {
    angular.element(document).ready(function() {
      // $scope.Users = [{ //test daten wenn kein server verfügbar
      //   "BenutzerId": "1001",
      //   "BenVorname": "fsdfsf",
      //   "BenNachname": "sfsfdsf",
      //   "BenTelefonnummer": "sdfsdfs",
      //   "BenLongitude": null,
      //   "BenLatitude": null,
      //   "BenGeoTime": null
      // }, {
      //   "BenutzerId": "1002",
      //   "BenVorname": "Mohamed",
      //   "BenNachname": "Ali",
      //   "BenTelefonnummer": "ME NO PHONE ME POOR",
      //   "BenLongitude": "29.691545",
      //   "BenLatitude": "-9.738001",
      //   "BenGeoTime": "2016-10-06 14:59:46"
      // }, {
      //   "BenutzerId": "1003",
      //   "BenVorname": "dsfsf",
      //   "BenNachname": "sdfsfsf",
      //   "BenTelefonnummer": "sdfs",
      //   "BenLongitude": "-9.738043",
      //   "BenLatitude": "29.692345",
      //   "BenGeoTime": "2016-10-27 15:00:00"
      // }];

      var formData = {
        'action': 'DatenAuslesen',
        //todo Benutzer  Id
      }
      var postData = 'myData=' + JSON.stringify(formData);
      console.log(postData);
      $http({
        method: 'POST',
        url: api,
        data: postData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

      }).success(function(res) {
        $scope.Users = res;
      });

    });

    $scope.Kontakt = function(user) {
      globuser = user;
      $state.go('menu.kontakt');
    }

    $scope.FensterSchliessen = function() {
      ionic.Platform.exitApp(); //todo needs testing
    }
    $scope.ZuDenEinstellungen = function() {
      $state.go('menu.einstellungen');
    }
    $scope.ZurueckZuIch = function() {
      $state.go('menu.ich');
    }

  }


])

.controller('einstellungenCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {



  }
])
