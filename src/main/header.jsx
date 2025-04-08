import React, { useState } from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';
import ImgMenu from '../img/menu.png'

const Header = () => {

    const [OpenMenu , SetOpenMenu] = useState(false);
    

    return(
        <header>
                {OpenMenu
                ?
                <div className="window-header" onClick={()=>SetOpenMenu(false)}>
                    <p onClick={e=>e.stopPropagation()}>
                        <menu>
                            <div>
                                <Link to="/main" style={{color: 'black', textDecoration: 'none'}}>Главная</Link>
                            </div>
                            <hr color='black'/>
                            <div>
                                <Link style={{color: 'black', textDecoration: 'none'}} to="/add_stuff" >Добавить</Link>
                            </div>
                            <hr color='black'/>
                            <div>
                                <Link to='/map' style={{color: 'black', textDecoration: 'none'}}>Карта</Link>
                            </div>
                            <hr color='black'/>
                            <div>
                                <Link style={{color: 'black', textDecoration: 'none'}} to="/contact" >Контакты</Link>
                            </div>
                        </menu>
                    </p>
                </div>
                :
                null}
                <div className="logo">
                    <img src="/assets/logo.jpg" alt="" width={30} height={30}/>
                    <h2>Textura</h2>
                </div>
                <MediaQuery minWidth={700}>
                <menu>
                    <div>
                        <Link to="/main" style={{color: 'black', textDecoration: 'none'}}>Главная</Link>
                    </div>
                    <div>
                        <Link style={{color: 'black', textDecoration: 'none'}} to="/add_stuff" >Добавить</Link>
                    </div>
                    <div>
                        <Link to='/map' style={{color: 'black', textDecoration: 'none'}}>Карта</Link>
                    </div>
                    <div>
                        <Link style={{color: 'black', textDecoration: 'none'}} to="/contact" >Контакты</Link>
                    </div>
                </menu>
                </MediaQuery>
                <MediaQuery maxWidth={699}>
                    <img onClick={()=>SetOpenMenu(true)} style={{padding: '0 20px'}} src={ImgMenu} alt="" width={50}/>
                </MediaQuery>
            </header>
    );
};

export default Header