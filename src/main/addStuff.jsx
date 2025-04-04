import React, { useState } from 'react';
import Header from './header';
import axios from 'axios';

const AddStuff = () => {

    const [Title , SetTitle] = useState();
    const [Weight , SetWeight] = useState();
    const [Sum , SetSum] = useState();
    const [Location , SetLocation] = useState();

    
    
    
    const sendData = () => {
        console.log({title: Title,
            weight: Weight,
            sum: Sum,
            location: Location});
        
        axios.post('http://95.174.102.106:5000/add',
            {
                title: Title,
                weight: Weight,
                sum: Sum,
                location: Location,
                img: 'photo_8.jpg'
            }
        ).then(e=>console.log(e.data))
    }

    return(
        <div className='AddStuff'>
            <Header/>
            <main>
                <h1>Добавление товара</h1>
                <div className="item">
                    <label htmlFor="title">Название</label>
                    <input type="text" onChange={e=>SetTitle(e.target.value)} name='title'/>
                </div>
                <div className="item">
                    <label htmlFor="weight">Вес</label>
                    <input type="text" onChange={e=>SetWeight(e.target.value)} placeholder='в килограммах' name='weight'/>
                </div>
                <div className="item">
                    <label htmlFor="sum">Количество</label>
                    <input type="text" onChange={e=>SetSum(e.target.value)} name='sum'/>
                </div>
                <div className="item">
                    <label htmlFor="location">Место хранения

                    </label>
                    <select name='location' onChange={e=>SetLocation(e.target.value)}>
                        <option value="Выберите" disabled>Выберите</option>
                        <option value="ул. Фрунзе">ул.Фрунзы</option>
                        <option value="ул. Ленина">ул. Ленина</option>
                        <option value="ул. Темирзяева">ул. Темирзяева</option>
                        <option value="ул. Дзержинского">ул. Дзержинского</option>
                        <option value="ул. Кирова">ул. Кирова</option>
                    </select>
                </div>
                <button onClick={sendData}>Отправить</button>
            </main>
        </div>
    );
};

export default AddStuff