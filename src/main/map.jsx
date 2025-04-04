import React, { useEffect, useState } from 'react';
import Header from './header';
import L from "leaflet";
import "leaflet-routing-machine";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import '../leaflet.css'
// import { iconPerson } from './marker-icon';
import '../leaflet-routing-machine.css'
import Routing from '../shnups/Routing';
// import { ymaps3Import } from '@yandex/ymaps3-types/import';
// import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, reactify} from './lib/ymaps';


const Map = () => {
  const defaultPosition = [47.21451307425952,38.932418499999955]; // Paris position

  const places =  [{
    position: [47.21451307425952,38.932418499999955],
    id: 0,
    title: "Место №1"
  }]

  const sourceCity = [47.21451307425952,38.932418499999955]

  const destinationCity = [47.26029420167408,38.91335949189099]

  const start = async () => {
    await setTimeout(() => {
      SetRouteFlag(true)
      
    }, 3000
  )}

  useEffect(()=>{
    start()
  }, [])

  const [RouteFlag , SetRouteFlag] = useState(false);
  

  return (
    <div className="Map">
      <Header/>
      <MapContainer
        className='main-map'
      //  style={{height: '700px'}}
        center={defaultPosition}
        zoom={17}
      >
        <Marker
        position={defaultPosition}
        // icon={ iconPerson }
        title={'Сюда'}
        >
      </Marker>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Routing sourceCity={L.latLng(47.21451307425952,38.932418499999955)} destinationCity={L.latLng(47.26029420167408,38.91335949189099)} flag={RouteFlag}/>    
      </MapContainer>

      <div onClick={()=>SetRouteFlag(true)}>click</div>
    </div>
  );
};

export default Map