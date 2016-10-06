var globuser=""; //globale variable für das weitergeben von Menu zu kontakt
var curUserid="";
var curBenutzername="";
var curPasswort="";


function empty(variabel) //func die Überprüft ob das angebene feld Leer oder undefined ist
{

return (typeof  variabel ===  'undefined' ||variabel === '' )
}


document.addEventListener('deviceready', onDeviceReady, false); //cp von https://www.npmjs.com/package/cordova-plugin-mauron85-background-geolocation //background updaten von gps cordianten

function onDeviceReady () {

    /**
    * This callback will be executed every time a geolocation is recorded in the background.
    */
    var callbackFn = function(location) {
        console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);

         //todo ajax call

           var formData = {
             'action': 'SaveGeoData',
             'Benutzername': curBenutzername,
             'BenPasswort':  curPasswort,
             'BenLongitude': location.longitude,
             'BenLatitude': location.latitude,

           }
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
             method: 'POST',
             url: api,
             data: postData,
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             }

         });


      
        backgroundGeolocation.finish();
    };

    var failureFn = function(error) {
        console.log('BackgroundGeolocation error');
    };

    // BackgroundGeolocation is highly configurable. See platform specific configuration options
    backgroundGeolocation.configure(callbackFn, failureFn, {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        interval: 60000
    });

    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    backgroundGeolocation.start();

    // If you wish to turn OFF background-tracking, call the #stop method.
    // backgroundGeolocation.stop();
}
