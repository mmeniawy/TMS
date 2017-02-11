/// <script src="underscore.js"></script>
(function(){
  'use strict';
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    console.log(navigator.camera);
  }
  

  var currentItem = {};
  var vehicles = [
        { vin:1010101010, color:"red", model:"nissan"},
        { vin:1010202020, color:"black", model:"fiat"},
        { vin:1010203040, color:"black", model:"honda"}            
      ];
      
  var voyages = [
        { eta:'10-02-2016 10:00',origin:'cairo',destination:'iraq'},
        { eta:'11-02-2016 10:00',origin:'cairo2',destination:'iraq2'}
      ];
    
  var loadTrucksList = function(vList){
        $('#vehicles-list').html('');
        $.each(vList,function(index,element){
        var template = $($('#T')[0]).clone();
        $(template).prop('id',element.vin);
        $(template).find('ons-row > ons-col > header > span[tag="vin"]').text(element.vin);
        $(template).find('ons-row > ons-col > header > span[tag="color"]').text(element.color);
        $(template).find('ons-row > ons-col > p[tag="model"]').text(element.model);
        $(template).removeClass('hidden');
        $('#vehicles-list').append(template);
    });
  };
  
  var takePicture = function(){
      navigator.camera.getPicture( cameraSuccess, cameraError, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true,
        saveToPhotoAlbum: true
    });
  };
  
  var cameraSuccess = function(uri){
      alert(uri);
      takePicture();
  };
    var loadVoyages = function(vList){
        
        $('#voyages-list').html('');
        $.each(vList,function(index,element){
        var template = $($('#T1')[0]).clone();
        $(template).prop('id',element.vin);
        $(template).find('ons-row > ons-col > header > span[tag="ETA"]').text(element.eta);
        $(template).find('ons-row > ons-col > p[tag="origin"]').text(element.origin);
        $(template).find('ons-row > ons-col > p[tag="destination"]').text(element.destination);
        $(template).removeClass('hidden');
        $('#voyages-list').append(template);
    });
  };
  
  
  $(document).on('click','#try-login',function(){
        //some login logic in here
        app.navi.pushPage('list.html');  
  });
  
  $(document).on('click','#take-picture',function(){
      takePicture();
  });
  
  $(document).on('click','.item[tag="voyage"]',function(){
     app.navi.pushPage('list-vehicles.html');  
  });
    
  $(document).on('click','.item[tag="vehicle"]:not([tag="no-navigate"])',function(){
    currentItem = {
        title : $('.item-title', this).text(),
        desc : $('.item-desc', this).text(),
        label : $('.item-label', this).text()
    };
    app.navi.pushPage('detail.html');  
  });

  $(document).on('click','.add-note-action-item:not([tag="no-navigate"])',function(){
    app.navi.pushPage('add-damage-report.html');  
  });
  
  $(document).on('click','.add-note-action-item[tag="no-navigate"]',function(){
    alert('vehicle loaded to truck');
    navigator.geolocation.getCurrentPosition(function(position) {
        alert('Latitude: ' + position.coords.latitude          + '\n' +
              'Longitude: ' + position.coords.longitude);
    },function(){alert('failed to load gps');},{timeout:10000});
  });
  $(document).on('click','#btn-save-report',function(){
    alert('report saved');
    app.navi.pushPage('damage-report-photos.html');
    //app.navi.popPage();
  });
  
  $(document).on('pageinit', '#detail-page', function() {
    
    $('.item-title', this).text(currentItem.title);
    $('.item-desc', this).text(currentItem.desc);
    $('.item-label', this).text(currentItem.label);
  });
  
  $(document).on('pageinit', '#add-damage-report', function() {
    
    $('.item-title', this).text(currentItem.title);
    $('.item-desc', this).text(currentItem.desc);
    $('.item-label', this).text(currentItem.label);
  });

  $(document).on('pageinit', '#list-vehicles-page', function() {
    
    loadTrucksList(vehicles);
        
  });
    
  $(document).on('pageinit', '#list-page', function() {
    
    loadVoyages(voyages);
        
  });

  
  $(document).on('input','#filter-vehicles',function(){
      var filter = $('#filter-vehicles').val();
      console.log(vehicles);
      var list = _.filter(vehicles,function(vehicle){
        return vehicle["vin"].toString().indexOf(filter, 0) > -1; 
      }); 
      loadTrucksList(list);
  });

})();

