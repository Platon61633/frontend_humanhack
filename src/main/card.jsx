import React from 'react';
import edit from '../img/edit.svg';
import trash from '../img/trash.svg';

const Card = ({e, edit_func, check_delete_func, ismain}) => {
    return(
        <div className='Main'>
                    <div className='item-main'>
            <img src={`https://img-items.vercel.app/photo_${e.id%10}.jpg`} alt=""/>
            <div className="title">{e.title}</div>
            <div className="weight">Вес: {e.weight} кг</div>
            <div className="sum">Кол-во: {e.sum}</div>
            <div className="location">Место хран.: {e.location}</div>
            <hr style={{margin: '10px 0'}}/>
            {ismain?<div className="option">
                <img src={edit} onClick={()=>edit_func(e)} alt="" height={40}/>
                <img src={trash} onClick={()=>check_delete_func(e.id, e.title)
                } alt="" height={40} />
            </div>
            :null}
            

            </div>
        </div>
    );
};

export default Card