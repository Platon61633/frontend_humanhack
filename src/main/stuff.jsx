import React, { useEffect, useState } from 'react';
import Header from './header';
import axios from 'axios';
import edit from '../img/edit.svg';
import trash from '../img/trash.svg';
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
                <div className="window">
                    <div className='delete-popup'>
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
            {

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
                            <div className='item-main' key={id}>
                                <img src={`https://img-items.vercel.app/${e.img}`} alt=""/>
                                <div className="title">{e.title}</div>
                                <div className="weight">Вес: {e.weight} кг</div>
                                <div className="sum">Кол-во: {e.sum}</div>
                                <div className="location">Место хран.: {e.location}</div>
                                <hr style={{margin: '10px 0'}}/>
                                <div className="option">
                                    <img src={edit} alt="" height={40}/>
                                    <img src={trash} onClick={()=>check_delete_func(e.id, e.title)
                                    } alt="" height={40} />
                                </div>
                                

                            </div>
                        )        
                    })}
                </div>
            </main>
        </div>
    );
};

export default Main