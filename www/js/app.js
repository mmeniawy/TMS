/// <script src="underscore.js"></script>
(function(){
  'use strict';

  var currentItem = {};
  var vehicles = [
        { vin:1010101010, color:"red", model:"nissan"},
        { vin:1010202020, color:"black", model:"fiat"},
        { vin:1010203040, color:"black", model:"honda"}
            
      ];
    
  var loadTrucksList = function(vList){
        $('ons-list').html('');
        $.each(vList,function(index,element){
        var template = $($('#T')[0]).clone();
        $(template).prop('id',element.vin);
        $(template).find('ons-row > ons-col > header > span[tag="vin"]').text(element.vin);
        $(template).find('ons-row > ons-col > header > span[tag="color"]').text(element.color);
        $(template).find('ons-row > ons-col > p[tag="model"]').text(element.model);
        $(template).removeClass('hidden');
        $('ons-list').append(template);
    });
  };
  
  
  
  $(document).on('click','.item:not([tag="no-navigate"])',function(){
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
    app.navi.popPage();
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

  $(document).on('pageinit', '#list-page', function() {
    
    loadTrucksList(vehicles);
        
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

