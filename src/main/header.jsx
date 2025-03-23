import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <header>
                <div className="logo">
                    <img src="/assets/logo.jpg" alt="" width={30} height={30}/>
                    <h2>Textura</h2>
                </div>
                <menu>
                    <div>
                        <Link to="/main" style={{color: 'black', textDecoration: 'none'}}>Главная</Link>
                    </div>
                    <div>
                        Карта
                    </div>
                    <div>
                        <Link style={{color: 'black', textDecoration: 'none'}} to="/contact" >Контакты</Link>
                    </div>
                </menu>
            </header>
    );
};

export default Header