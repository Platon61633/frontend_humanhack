import React, { useEffect, useMemo, useState } from 'react';
import Header from './header';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import '../leaflet.css'
// import { iconPerson } from './marker-icon';
import axios from 'axios';
import Card from './card';


const Map = () => {


  

  const defaultPosition = [47.21451307425952,38.932418499999955]; // Paris position

  const places =  [{
    position: [47.21451307425952,38.932418499999955],
    id: 0,
    title: "Место №1"
  }]

  const [Center , SetCenter] = useState([0,0]);
  

  const [Data , SetData] = useState({});

  const [Lat , SetLat] = useState(0);

  const [Lng , SetLng] = useState(0);
  

    

  

  useEffect(()=>{
    axios.get('http://95.174.102.106:5000/').then((res)=>{
      const data = res.data
      let location = {
        'ул. Фрунзе': [],
        'ул. Кирова': [],
        'ул. Темирзяева': [],
        'ул. Дзержинского': [],
        'ул. Ленина': []
    }
      const streets = [
        'ул. Фрунзе',
        'ул. Кирова',
        'ул. Темирзяева',
        'ул. Дзержинского',
        'ул. Ленина'
      ]
      for (const key in streets) {
        for (let i = 0; i < res.data.length; i++) {

          if (data[i].location==streets[key]) {
            location[streets[key]].push(data[i]);


            
          }
        }
      }
      SetData(location)
      SetCenter([location[streets[0]][0].lat, location[streets[0]][0].lng])
      // console.log(Object.keys(location), '++');
      
    })
  }, [])

  const [ShowCard , SetShowCard] = useState(true);

  const [Loca , SetLoca] = useState([]);
  
  

  const ViewCard = (e)=>{
    console.log(e);
    
    SetShowCard(false)
    SetLoca(e)
  }
  

  return (
    <div className="Map">
      <Header/>
      <main>
        <section>
          <MapContainer
            className='main-map-map'
          //  style={{height: '700px'}}
            center={[47.23841788563882,38.91167179079163]}
            zoom={13}
          >
            {Object.keys(Data).map((e, id) => {
              console.log(Data[e].length!==0?[Data[e][0].lat, Data[e][0].lng]:null);
              if (Data[e].length!==0) {
                return(
                <Marker key={id}
                  position={[Data[e][0].lat, Data[e][0].lng]}
                  eventHandlers={{click: ()=>ViewCard(e)
                  }}
                  // icon={ iconPerson }
                  >
                </Marker>
                );
              }
            })}
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
          {/* <div className="view">
            {Object.keys(Data).map((e, id)=>{
              if (Data[e].length!==0) {
                return(
                  <div onClick={
                    ()=>{
                      SetLat(Data[e][0].lat)
                      SetLng(Data[e][0].lng)
                    }
                  } className="item" key={id}>{e}</div>
                )
              }
            })}
          </div> */}
        </section>
        <section>
          {
            ShowCard?
            <div className='vnimanie'>
              Нажмите на маркер на карте
            </div> 
            :
            <div className='cards'>
              {Data[Loca].map((ee, id)=>
              <Card e={ee} key={id} ismain={false}/>
              // <div key={id}>{ee.title}</div>
            )}
            </div>
            // <p>h</p>
          }
        </section>
      </main>
      {/* <div onClick={()=>console.log(12%5)
      }>click</div> */}
    </div>
  );
};

export default Map