import React, { useEffect, useState } from 'react';
import Header from './header';
import axios from 'axios';


import L from "leaflet";
import "leaflet-routing-machine";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import '../leaflet.css'
// import { iconPerson } from './marker-icon';
import '../leaflet-routing-machine.css'
import Routing from '../shnups/Routing';
import Card from './card';
// import Slider from '../slider';

const Main = () => {

    const [Data , SetData] = useState(
        [{}]
    );

    const [SelectLocationShow , SetSelectLocationShow] = useState(false);
    const [SelectLocation , SetSelectLocation] = useState([]);
    
    const [maxWeight , SetmaxWeight] = useState(0);
    const [minWeight , SetminWeight] = useState(0);

    const [Search , SetSearch] = useState('');

    const [CountColumn , SetCountColumn] = useState(Math.floor(window.innerWidth/240));
    
    // const [ fetchData, SetfetchData] = useState([]);
    
    
    
    const SearchFunc = (text)=>{
        let result = []
        if (text==='') {
            result = Data.map((e,id)=>id)
        } else {
            for (const i in Data) {
                if (Data[i].title.toLowerCase().search(text.toLowerCase())>-1) {
                    result.push(Number(i))
                }
            }
        }
        SetSearch(result)
        console.log(result);
        
    }
    

    useEffect(
        ()=>{

            axios.get('http://95.174.102.106:5000/').then(e=>{
                SetData(e.data)
                
                SetmaxWeight(Math.max(...e.data.map(e=>e.weight)))
                SetminWeight(Math.min(...e.data.map(e=>e.weight)))
                SetSearch(e.data.map((e,id)=>id))
            })
            // [
            //     {title: 'Шкаф', weight: 4.5, sum: 1, location: 'ул. Фрунзе', img: 'photo_1.jpg'},
            //     {title: 'Табурет', weight: 0.9, sum: 5, location: 'ул. Кирова', img: 'photo_2.jpg'},
            //     {title: 'Диван', weight: 7.1, sum: 2, location: 'ул. Тимирязева', img: 'photo_3.jpg'},
            //     {title: 'Стол', weight: 1.11, sum: 2, location: 'ул. Ленина', img: 'photo_4.jpg'},
            //     {title: 'Тумба', weight: 4.47, sum: 1, location: 'ул. Володарского', img: 'photo_5.jpg'},
            //     {title: 'Кресло', weight: 8, sum: 2, location: 'ул. Кирова', img: 'photo_6.jpg'},
            //     {title: 'Комод', weight: 5.7, sum: 3, location: 'ул. Фрунзе', img: 'photo_7.jpg'},
            //     {title: 'Полка', weight: 5.7, sum: 2, location: 'ул. Фрунзе', img: 'photo_8.jpg'},
            //     {title: 'Мука', weight: 4, sum: 2, location: 'ул. Ленина', img: 'photo_9.jpg'},
            //     {title: 'Компьютер', weight: 1.2, sum: 2, location: 'ул. Фрунзе', img: 'photo_10.jpg'},
            // ]
            
            
        }, []
    )
    
    // const minWeight = Math.min(...Data.map(e=>e.weight));
    // const maxWeight = Math.max(...Data.map(e=>e.weight));

    // console.log(minWeight);

    


    const [CheckDelete , SetCheckDelete] = useState(false);
    const [DataDelete , SetDataDelete] = useState(
        {title:'', id: null}
    );

    const [EditFlag , SetEditFlag] = useState(false);

    const [EditData , SetEditData] = useState(
        {title:'', weight: 0, sum: 0, location: '', img: '', id: null}
    );

    const [EditTitle , SetEditTitle] = useState('');
    const [EditWeight , SetEditWeight] = useState('');
    const [EditSum , SetEditSum] = useState('');
    const [EditLocation , SetEditLocation] = useState('');

    const location = {
        'ул. Фрунзе': [47.209517356257635,38.93479207262902],
        'ул. Кирова': [47.25882858660511,38.92057928559243],
        'ул. Темирзяева': [47.237870428135125,38.92654276406507],
        'ул. Дзержинского': [47.23525997856578,38.91693934775898],
        'ул. Ленина': [47.22789567176139,38.909361161253855]
    }
    
    
    
    
    
    
    const check_delete_func = async(id, title)=>{
        await SetDataDelete({title: title, id: id})
        SetCheckDelete(true)
    }

    const deleteFunc = async(id)=>{
            await axios.post('http://95.174.102.106:5000/delete',
                {id: id}
            ).then(e=>console.log(e.data))
            window.location.reload();
            // console.log(id);
            
    }

    const edit_func = async(e)=>{
        console.log(e);
        e.weight = e.weight.toString()
        
        SetEditData(e)
        SetEditFlag(true)
        SetEditTitle(e.title)
        SetEditWeight(e.weight)
        SetEditSum(e.sum)
        SetEditLocation(e.location)
    }

    const save_edit = async()=>{
        await axios.post('http://95.174.102.106:5000/edit',
            {
                id: EditData.id,
                title: EditTitle,
                weight: EditWeight,
                sum: EditSum,
                location: EditLocation,
                img: EditData.img
            }
        )
        window.location.reload();
    }

    // const check_delete_func = async(id, title)=>{
    //     await SetDataDelete({title: title, id: id})
    //     SetCheckDelete(true)
    // }

    // const deleteFunc = async(id)=>{
    //         await axios.post('http://95.174.102.106:5000/delete',
    //             {id: id}
    //         ).then(e=>console.log(e.data))
    //         window.location.reload();
    //         // console.log(id);
            
    // }
    
    return(
        <div className='Main'>
            {
                CheckDelete?
                <div className="window" onClick={()=>SetCheckDelete(false)}>
                    <div className='delete-popup' onClick={e=>e.stopPropagation()}>
                        <p>Вы уверены, что хотите удалить {DataDelete.title}?</p>
                        <div className="buttons">
                            <button onClick={async ()=>{
                                await SetCheckDelete(false)
                                await deleteFunc(DataDelete.id)
                                // window.location.reload();
                            }}>Да</button>
                            <button
                            onClick={e=>{
                                SetCheckDelete(false)                            }}>Нет</button>
                        </div>

                    </div>
                </div>
                :null
            }
            {EditFlag
            ?
            <div className="window" onClick={()=>SetEditFlag(false)}>
                <div className='edit' onClick={e=>e.stopPropagation()}>
                    <div className="item">
                        <label htmlFor="">Изменить название</label>
                        <input value={EditTitle} onChange={e=>SetEditTitle(e.target.value)} type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="">Изменить место хранинения</label>
                        <select name="" id="" onChange={(e)=>SetEditLocation(e.target.value)}>
                            {Object.keys(location).map(e=>
                                <option value={e} selected={e===EditLocation}>{e}</option>
                            )}
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="">Изменить вес</label>
                        <input value={EditWeight} onChange={e=>SetEditWeight(e.target.value)} type="text" />
                    </div>
                    <div className="item">
                        <label htmlFor="">Изменить кол-во</label>
                        <input value={EditSum} onChange={e=>SetEditSum(Number(e.target.value))} type="text" />
                    </div>
                    <button onClick={save_edit} 
                    disabled={EditData.location===EditLocation && EditData.weight===EditWeight && EditData.title===EditTitle && EditData.sum===EditSum}>Сохранить</button>
                    <div className="map">
                <MapContainer
                    className='main-map'
                  //  style={{height: '700px'}}
                    center={[EditData.lat, EditData.lng]}
                    zoom={17}
                  >
                    <Marker
                    position={[EditData.lat, EditData.lng]}
                    // icon={ iconPerson }
                    title={'Сюда'}
                    >
                </Marker>
                    <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Routing sourceCity={L.latLng(EditData.lat, EditData.lng)} destinationCity={L.latLng(location[EditLocation][0],location[EditLocation][1])} flag={EditLocation!==EditData.location}/>
                </MapContainer>
                </div>
                </div>
            </div>
            :
            null
            }
            <Header/>
            <main>
                <div className='search'>
                    <input onChange={e=>SearchFunc(e.target.value)} placeholder="Поиск вещей" />
                </div>
                <div className='filter'>
                    <div className="location">
                        <p>Место хранения</p>
                        {SelectLocationShow?
                        <button onClick={()=>SetSelectLocationShow(false)}>Убрать</button>:
                        <button onClick={()=>SetSelectLocationShow(true)}>Выбрать</button>
                        }
                    </div>
                    <div className='weight'>
                        {/* <Slider min={0} max={100} step={5} value={Value} onChange={SetValue}/> */}
                        <div className='item'>
                            <label htmlFor="minWeight">Мин. вес</label>
                            <input onChange={e=>SetminWeight(Number(e.target.value))} value={minWeight} />
                        </div>
                        <div className='item'>
                            <label htmlFor="maxWeight">Макс. вес</label>
                            <input onChange={e=>SetmaxWeight(Number(e.target.value))} value={maxWeight} />
                        </div>
                    </div>
                    <select name='sort' onChange={e=>{
                        let res = Data.map(ee=>ee)
                        e = e.target.value
                        // console.log(e);
                        
                        switch (e[0]) {
                            case 'a':
                                res.sort((a, b) => {
                                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                                        return 1*Number(e[1]+'1');
                                    }
                                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                                        return -1*Number(e[1]+'1');
                                    }
                                    return 0
                                })
                                break
                            case 'w':
                                res.sort((a,b)=>(a.weight-b.weight)*Number(e[1]+'1'))
                                break
                            case 'c':
                                res.sort((a,b)=>(a.sum-b.sum)*Number(e[1]+'1'))
                                break
                            }
                        SetData(res)
                        // console.log(res);
                        
                    }}>
                        <option disabled>Сортировка по:</option>
                        <option value="a-">по алфавиту</option>
                        <option value="a+">по алфавиту в обрат. поряд.</option>
                        <option value="w-">по весу по убыванию</option>
                        <option value="w+">по весу по возрастанию</option>
                        <option value="c-">по кол-ву по убыванию</option>
                        <option value="c+">по кол-ву по возрастанию</option>
                    </select>
                    {/* <div onClick={()=>{
                        console.log(Array(100));
                        
                    }}>clck</div> */}
                    {SelectLocationShow?
                    <div className='select-location'>
                        {Array.from(new Set(Data.map(e=>e.location))).filter(e=>!SelectLocation.includes(e)).map((e, id)=>
                        <p key={id} onClick={()=>SetSelectLocation([...SelectLocation, e])}>{e}</p>
                        )}
                    </div>
                    :null}
                    <div className='count-column'>
                        <label className="kol-vo_column">
                            Кол-во колонок
                        </label>
                        <input type="text"onChange={e=>SetCountColumn(e.target.value)} value={CountColumn}/>
                    </div>
                </div>
                <hr />
                {SelectLocation.length!==0?
                <div className='selected-location'>
                    <h5>Показываются вещи в местах:</h5>
                    {SelectLocation.map((e, id)=>
                    <div className='item' key={id}>
                        <span>{e}</span>
                        <span className='delete' onClick={()=>SetSelectLocation(SelectLocation.filter(ee=>ee!==e))}>×</span>
                    </div>)}
                </div>
                :null}
                <hr />
                {SelectLocation.length!==0 || 
                maxWeight!==Math.max(...Data.map(e=>e.weight)) ||
                minWeight!==Math.min(...Data.map(e=>e.weight)) ||
                Search.length!==Data.length
                ?
                <button onClick={()=>{
                    SetSelectLocation([]);
                    SetmaxWeight(Math.max(...Data.map(e=>e.weight)));
                    SetminWeight(Math.min(...Data.map(e=>e.weight)));
                    SetSearch(Data.map((e, id)=> id))
                    document.querySelector('.search input').value = ''
                }} className='reset'>
                    Сбросить фильтры
                </button>:
                null}
                <div className='list' style={{gridTemplateColumns: `repeat(${CountColumn}, 1fr)`}}>
                    {Data.filter(
                        (ee, i)=>
                            (SelectLocation.includes(ee.location) || SelectLocation.length===0) && 
                            (ee.weight<=maxWeight && ee.weight >= minWeight) &&
                            (Search.includes(i)))
                            .map((e, id)=>{

                        return(
                            <Card key={id} e={e} edit_func={edit_func} check_delete_func={check_delete_func} ismain={true}/>
                        )        
                    })}
                </div>
            </main>
        </div>
    );
};

export default Main