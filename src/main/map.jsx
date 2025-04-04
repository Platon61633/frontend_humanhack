import React from 'react';
import Header from './header';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// import { ymaps3Import } from '@yandex/ymaps3-types/import';
// import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, reactify} from './lib/ymaps';

const Map = () => {

    const position = [51.505, -0.09]

    return(
        <div className='Map'>
          <Header/>
          <MapContainer center={position} zoom={13} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
    );
};

export default Map