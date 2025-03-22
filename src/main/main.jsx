import React, { useState } from 'react';

const Main = () => {

    const [Data , SetData] = useState(
        [
            {title: 'Шкаф', weight_in_kg: 4.5, sum: 1, location: 'ул. Фрунзе', img: 'photo_1.jpg'},
            {title: 'Табурет', weight_in_kg: 0.9, sum: 5, location: 'ул. Кирова', img: 'photo_2.jpg'},
            {title: 'Диван', weight_in_kg: 7.1, sum: 2, location: 'ул. Тимирязева', img: 'photo_3.jpg'},
            {title: 'Стол', weight_in_kg: 1.11, sum: 2, location: 'ул. Ленина', img: 'photo_4.jpg'},
            {title: 'Тумба', weight_in_kg: 4.47, sum: 1, location: 'ул. Володарского', img: 'photo_5.jpg'},
            {title: 'Кресло', weight_in_kg: 8, sum: 2, location: 'ул. Кирова', img: 'photo_6.jpg'},
            {title: 'Комод', weight_in_kg: 5.7, sum: 3, location: 'ул. Фрунзе', img: 'photo_7.jpg'},
            {title: 'Полка', weight_in_kg: 5.7, sum: 2, location: 'ул. Фрунзе', img: 'photo_8.jpg'},
            {title: 'Мука', weight_in_kg: 4, sum: 2, location: 'ул. Ленина', img: 'photo_9.jpg'},
            {title: 'Компьютер', weight_in_kg: 1.2, sum: 2, location: 'ул. Фрунзе', img: 'photo_10.jpg'},
        ]
    );
    
    return(
        <div className='Main'>
            <header>
                <div className="logo">
                    <img src="/assets/logo.jpg" alt="" width={30} height={30}/>
                    <h2>Textura</h2>
                </div>
                <menu>
                    <div>
                        Мои вещи
                    </div>
                    <div>
                        Карта
                    </div>
                    <div>
                        Контакты
                    </div>
                </menu>
            </header>
            <main>
                <div className='filter'>Фильтр</div>
                <div className='list'>
                    {Data.map((e, id)=>{
                        return(
                            <div className='item-main'>
                                <img src={`https://img-items.vercel.app/${e.img}`} alt=""/>
                                <div className="title">{e.title}</div>
                                <div className="weight">Вес: {e.weight_in_kg}</div>
                                <div className="sum">Кол-во: {e.sum}</div>
                            </div>
                        )        
                    })}
                </div>
            </main>
        </div>
    );
};

export default Main