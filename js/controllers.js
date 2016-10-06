angular.module('app.controllers', [])

.controller('konktaktCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $cordovaGeolocation,$ionicSideMenuDelegate) {
  var options = {timeout: 10000, enableHighAccuracy: true};
    $ionicSideMenuDelegate.canDragContent(false)
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
//47.567109, 9.362960
  var latLngOwn = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //todo: reaktivieren von Cordinaten
        $latLong=getCords() //ajax request für kordianten von server
    var latLngKontakt = new google.maps.LatLng(47.554873, 8.902931);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

  var marker = new google.maps.Marker({ // anderi farb   icon: 'brown_markerA.png'
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: 'img/rsz_blackMarker.png',
  });
  var marker2 = new google.maps.Marker({ // anderi farb   icon: 'brown_markerA.png'
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng2,

  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Meine position!"
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
  google.maps.event.addListener(marker2, 'click', function () {
      infoWindow.open($scope.map, marker2);
  });
});
   }, function(error){
     console.log(error);
   });
  }


])

.controller('ichCtrl', ['$scope', '$stateParams','$cordovaGeolocation', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
//47.567109, 9.362960
//  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); todo: put real shit in again
    var latLng = new google.maps.LatLng(47.567109,9.362960);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

  var marker = new google.maps.Marker({ // anderi farb   icon: 'brown_markerA.png'
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Meine position!"
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });

});
   }, function(error){
     console.log("Could not get location");
   });
  }
])

.controller('loginCtrl', ['$scope', '$stateParams', '$http', '$location', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $cordovaGeolocation,$ionicSideMenuDelegate) {
  var options = {timeout: 10000, enableHighAccuracy: true};
    $ionicSideMenuDelegate.canDragContent(false)
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
//47.567109, 9.362960
  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); //todo: reaktivieren von Cordinaten
    var latLng2 = new google.maps.LatLng(47.554873, 8.902931);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

  var marker = new google.maps.Marker({ // anderi farb   icon: 'brown_markerA.png'
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: 'img/rsz_blackMarker.png',
  });
  var marker2 = new google.maps.Marker({ // anderi farb   icon: 'brown_markerA.png'
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng2,

  });

  var infoWindow = new google.maps.InfoWindow({
      content: "Meine position!"
  });

  google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open($scope.map, marker);
  });
  google.maps.event.addListener(marker2, 'click', function () {
      infoWindow.open($scope.map, marker2);
  });
});
   }, function(error){
     console.log(error);
   });
  }

])

.controller('registrierenCtrl', ['$scope', '$stateParams', '$http', '$location', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $http, $location, $ionicPopup) {
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


                });
                //weiterleitung zur ich page
                $state.go('menu.ich');
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

.controller('menuCtrl', ['$scope', '$stateParams', '$http', '$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams, $http, $state) {
    angular.element(document).ready(function () {

      var formData = {
        'action': 'DatenAuslesen',
        //toodo Benutzer  Id
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
        $scope.Users=res;
      });
    });
    $scope.Kontakt = function(user) {
      console.log(user);
      $state.go('menu.kontakt');
    }
    $scope.FensterSchliessen = function(){
      ionic.Platform.exitApp(); //todo needs testing
    }

  }


])

.controller('einstellungenCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
  // You can include any angular dependencies as parameters for this function
  // TIP: Access Route Parameters for your page via $stateParams.parameterName
  function($scope, $stateParams) {


  }
])
