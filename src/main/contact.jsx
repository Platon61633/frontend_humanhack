import React from 'react';
import Header from './header';

const Contact = () => {

    let arr = []

    for (let i = 0; i < 100; i++) {
        arr.push('Победители хакатона 2025 ')
    }

    return(
        <div className='Contact'>
            <Header/>
                <section>
                    {arr.map(e=>
                    <div className="line">
                        {arr.map(e=>
                            <span>{e}</span>
                        )}
                    </div>
                    )}
                </section>
                <main>
                    <div>
                        <p>tg: <a href="https://t.me/not_ALP">Платон</a> <a href="https://t.me/fname0">Климентий</a> <a href='https://t.me/Artemkanoe'>Артём</a></p>
                        <img src="assets/tagan.png" alt="" width={200}/>
                    </div>
                    
                </main>
        </div>
    );
};

export default Contact