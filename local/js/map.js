/*
$(document).ready(function(){function SatMap(){this.googleMarkers=[];this.options={travelMode:google.maps.DirectionsTravelMode.DRIVING,markerIcon:'/local/templates/sat/images/marker_sat.png',clusterIcon:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',scrollwheel:false,navigationControl:false,mapTypeControl:false,scaleControl:false,draggable:true,streetViewControl:false,mapTypeId:google.maps.MapTypeId.ROADMAP,zoom:8,defaultPosition:{lat:50.23,lng:30.34},zoomControlOptions:{position:google.maps.ControlPosition.LEFT_CENTER}}}
SatMap.prototype.Init=function(id,params){let self=this;let bounds=new google.maps.LatLngBounds();const mapContainer=document.getElementById(id);self.mapContainer=mapContainer;self.map=new google.maps.Map(mapContainer,self.options);self.markers=JSON.parse(departmens_json);self.directionsDisplay=new google.maps.DirectionsRenderer;self.directionsService=new google.maps.DirectionsService;if(!mapContainer||typeof departmens_json=="undefined")
return false;if(self.markers.length>0){self.Placemarks(params);}
else{let marker=new google.maps.Marker({position:self.options.defaultPosition,icon:self.options.markerIcon,});self.map.setCenter(marker.getPosition());}
google.maps.event.addListener(self.map,'drag',function(){$('#marker-tooltip').html('');})}
SatMap.prototype.Placemarks=function(params){let self=this;let bounds=new google.maps.LatLngBounds();let tooltip=false;if(typeof params!="undefined"&&params.tooltip==true){tooltip=true;let tooltipDiv=document.createElement('div');tooltipDiv.id="marker-tooltip";this.mapContainer.appendChild(tooltipDiv);}
for(let i in self.markers){let position={lat:parseFloat(self.markers[i]['latitude']),lng:parseFloat(self.markers[i]['longitude'])};let marker=new google.maps.Marker({position:position,map:self.map,title:self.markers[i]['address'],icon:self.options.markerIcon});self.googleMarkers.push(marker);self.markerClick(marker,self.markers[i]);if(tooltip){google.maps.event.addListener(marker,'click',function(){let point=self.FromLatLngToPoint(marker.getPosition());$('#marker-tooltip').html(self.PopupContent(self.markers[i])).css({'left':point.x+35,'top':point.y-65});});google.maps.event.addListener(marker,'mouseout',function(){});}
bounds.extend(marker.getPosition());}
var markerCluster2=new MarkerClusterer(self.map,self.googleMarkers,{imagePath:self.options.clusterIcon,maxZoom:self.options.zoom});self.map.setCenter(bounds.getCenter());}
SatMap.prototype.FromLatLngToPoint=function(latLng){let map=this.map;let topRight=map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());let bottomLeft=map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());let scale=Math.pow(2,map.getZoom());let worldPoint=map.getProjection().fromLatLngToPoint(latLng);return new google.maps.Point((worldPoint.x-bottomLeft.x)*scale,(worldPoint.y-topRight.y)*scale);}
SatMap.prototype.Router=function(coords){let self=this;let map=self.map;let request={origin:new google.maps.LatLng(coords.sender.lat,coords.sender.lng),destination:new google.maps.LatLng(coords.recipient.lat,coords.recipient.lng),travelMode:self.options.travelMode};self.directionsService.route(request,function(response,status){if(status==google.maps.DirectionsStatus.OK){self.directionsDisplay.setDirections(response);self.directionsDisplay.setMap(map);self.directionsDisplay.setOptions({suppressMarkers:true});}});}
SatMap.prototype.PopupContent=function(markerInfo){return str='<div class="tooltip-map page__map-tooltip">'+'<div class="tooltip-map__title">'+markerInfo["description"]+'</div>'+'<div class="tooltip-map__text">'+markerInfo["address"]+'<br>'+markerInfo["phone"]+'</div>'+'<div class="tooltip-map__hr"></div>'+'<div class="tooltip-map__text">'+'<div class="pull-left">GPS</div>'+'<div class="pull-right">'+
markerInfo["latitude"]+'N<br>'+
markerInfo["longitude"]+'E<br>'+'</div>'+'</div>'+'<div class="tooltip-map__hr"></div>'+'<div class="tooltip-map__text-alt">'+'<div class="tooltip-map__arrow"></div>'+'</div>';}
SatMap.prototype.markerClick=function(marker,departmentInfo){marker.addListener('click',function(){let ref=departmentInfo.ref,cityName=departmentInfo.name+", "+departmentInfo.address;calculator.setDepartment(departmentInfo);});}
let SATmap=new SatMap();window.SATmap=SATmap;$('.tr-collapse-toggle').click(function(){const mapBlock=$(this).next().find('.td-map__inner');let id=mapBlock.attr('id');let latitude=mapBlock.attr('latitude');let longitude=mapBlock.attr('longitude');departmens_json=JSON.stringify([{latitude:latitude,longitude:longitude}]);SATmap.Init(id);});if($('#departments_map').length>0)
SATmap.Init('departments_map',{tooltip:true});})
*/
$( document ).ready(function(){

    function SatMap(){
        
        this.googleMarkers = [];
        
        this.options  = {
            travelMode          :  google.maps.DirectionsTravelMode.DRIVING,
            markerIcon          : '/local/templates/sat/images/marker_sat.png',
            clusterIcon         : 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            scrollwheel         : false,
            navigationControl   : false,
            mapTypeControl      : false,
            scaleControl        : false,
            draggable           : true,
            streetViewControl   : false,
            mapTypeId           : google.maps.MapTypeId.ROADMAP,
            zoom                : 8,
            defaultPosition     : {
                lat: 50.23,
                lng: 30.34
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            }
        }
    }
    SatMap.prototype.Init = function(id, params){

        let self                = this;
        let bounds              = new google.maps.LatLngBounds();
        const mapContainer      = document.getElementById(id);
        console.log(departmens_json);
        self.mapContainer       = mapContainer;
        self.map                = new google.maps.Map(mapContainer, self.options);
        self.markers            = JSON.parse(departmens_json);
        self.directionsDisplay  = new google.maps.DirectionsRenderer;
        self.directionsService  = new google.maps.DirectionsService;

        if(!mapContainer || typeof departmens_json == "undefined") 
            return false;

    	if(self.markers.length > 0){
        	self.Placemarks(params);
    	}
    	else{
        	
        	let marker = new google.maps.Marker({
                position    : self.options.defaultPosition,
                icon        : self.options.markerIcon,
            });
            
            self.map.setCenter(marker.getPosition());
        }

/*
        google.maps.event.addListenerOnce(self.map, 'idle', function(){
                $('.gm-style div:eq(0)').addClass('g_map_inner_wrap');
        });
*/
/*
        google.maps.event.addDomListener(window, "resize", function() {
            console.log(111);
            google.maps.event.trigger(self.map, "resize");
            })
        
*/
        google.maps.event.addListener(self.map, 'drag', function() {
            $('#marker-tooltip').html('');
        })
  
    }
    SatMap.prototype.Placemarks = function(params){
        
        let self     = this;
        let bounds   = new google.maps.LatLngBounds();
        let tooltip  = false;

        if(typeof params != "undefined" && params.tooltip == true){
            tooltip = true;
            
            let tooltipDiv = document.createElement('div');
            tooltipDiv.id  = "marker-tooltip";
            this.mapContainer.appendChild(tooltipDiv);
        }

        for(let i in self.markers){

            let position = {
                lat: parseFloat(self.markers[i]['latitude']), 
                lng: parseFloat(self.markers[i]['longitude'])
            };
            
            let marker = new google.maps.Marker({
                position: position,
                map     : self.map,
                title   : self.markers[i]['address'],
                icon    : self.options.markerIcon
            });
            
            self.googleMarkers.push(marker);
            
            self.markerClick(marker, self.markers[i]);
  
            if(tooltip){
         
                google.maps.event.addListener(marker, 'click', function () {                        

                    let point = self.FromLatLngToPoint(marker.getPosition());
                    
                    $('#marker-tooltip').html(self.PopupContent(self.markers[i])).css({
                        'left': point.x+35,
                        'top' : point.y-65
                    });
                    
                });
                
                google.maps.event.addListener(marker, 'mouseout', function () {
//                     $('#marker-tooltip').html('');
                });
            }

           bounds.extend(marker.getPosition());
        }
        
        
        var markerCluster2 = new MarkerClusterer(self.map, self.googleMarkers,{
            imagePath: self.options.clusterIcon,
            maxZoom: self.options.zoom
        });
        
        self.map.setCenter(bounds.getCenter());

    }
    SatMap.prototype.FromLatLngToPoint = function(latLng){
        
        let map        = this.map;
        
        let topRight   = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
        let bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
        let scale      = Math.pow(2, map.getZoom());
        let worldPoint = map.getProjection().fromLatLngToPoint(latLng);
        
        return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    }
    SatMap.prototype.Router = function(coords){
        
        let self = this;
        let map  = self.map;

        let request = {
            origin      : new google.maps.LatLng(coords.sender.lat, coords.sender.lng),
            destination : new google.maps.LatLng(coords.recipient.lat, coords.recipient.lng),
            travelMode  : self.options.travelMode
        };

        self.directionsService.route(request, function(response, status) {
        
            if (status == google.maps.DirectionsStatus.OK) {
                
                self.directionsDisplay.setDirections(response);
                self.directionsDisplay.setMap(map);
                self.directionsDisplay.setOptions( { suppressMarkers: true } );
            }
        });
    }
    SatMap.prototype.PopupContent = function(markerInfo){

        return str ='<div class="tooltip-map page__map-tooltip">'+ 
                            '<div class="tooltip-map__title">'+markerInfo["description"]+'</div>'+
    						'<div class="tooltip-map__text">'+markerInfo["address"]+
    							'<br>'+markerInfo["phone"]+'</div>'+
    						'<div class="tooltip-map__hr"></div>'+
    						'<div class="tooltip-map__text">'+
    							'<div class="pull-left">GPS</div>'+
    							'<div class="pull-right">'+
    							    markerInfo["latitude"]+'N<br>'+
    							    markerInfo["longitude"]+'E<br>'+
    							'</div>'+
    						'</div>'+
    						'<div class="tooltip-map__hr"></div>'+
    						'<div class="tooltip-map__text-alt">'+
    							//'<span class="title-width-1">Будні дні:</span> 09:00-18:00'+
    							//'<span class="title-width-1">Суббота:</span> 09:00-14:00</div>'+
    						'<div class="tooltip-map__arrow"></div>'+
						'</div>';
    }
    SatMap.prototype.markerClick = function(marker, departmentInfo){
        marker.addListener('click', function(){
            
        let ref      = departmentInfo.ref, 
            cityName =  departmentInfo.name + ", " + departmentInfo.address;

            calculator.setDepartment(departmentInfo);//ref,cityName
        });        
    }    

    let SATmap = new SatMap();
    
    window.SATmap = SATmap;

    $('.tr-collapse-toggle').click(function(){
        let mapBlock;
        
        if($(this).next('.tr-collapse').find('.td-map__inner').size() > 0){
            mapBlock = $(this).next('.tr-collapse').find('.td-map__inner');
        }

        if($(this).next('.tr-collapse').next('.tr-collapse').find('.td-map__inner').size() > 0){
            mapBlock = $(this).next('.tr-collapse').next('.tr-collapse').find('.td-map__inner');
        }        
        
        let id          = mapBlock.attr('id');
        let latitude    = mapBlock.attr('latitude');
        let longitude   = mapBlock.attr('longitude');
        let address     = mapBlock.attr('address');
        let description = mapBlock.attr('description');        
        let phone       = mapBlock.attr('phone');
                
        departmens_json = JSON.stringify([{
                latitude    : latitude, 
                longitude   : longitude,
                address     : address,
                description : description,
                phone       : phone
            }
        ]); 

        SATmap.Init(id, {tooltip: true});
    });

    if( $('#departments_map').length > 0 )
        SATmap.Init('departments_map', {tooltip: true});

})

