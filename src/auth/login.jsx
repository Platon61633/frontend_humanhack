import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Login = () => {

    const navigate = useNavigate();

    const [Password , SetPassword] = useState('');
    const [Email , SetEmail] = useState('');

    const check = (email, password, isCookie)=>{
        if (email === 'user' && password === '0000'){
            Cookies.set('email', email);
            Cookies.set('password', password)
            console.log('Успешный вход');
            navigate('/main');
        }else if(!isCookie){
            alert('Неверная почта или пароль.');
        }
    }

    useEffect(()=>{
        // console.log(Cookies.get());
        const dataCookies = Cookies.get();
        check(dataCookies.email, dataCookies.password, true);
        
    }, [])
    return(
        <div className='Login'>
            
            <main>
                <img src="/assets/logo.jpg" alt="" width={100} height={100}/>
                <div className="form">
                    <div className='item-login'>
                        <label htmlFor="email">Почта</label>
                        <input onChange={e=>SetEmail(e.target.value)} value={Email} type="email" name="email" id="email" placeholder="Введите почту" />
                    </div>
                    <div className='item-login'>
                        <label htmlFor="password">Пароль</label>
                        <input onChange={e=>SetPassword(e.target.value)} value={Password} type="password" name="password" id="password" placeholder="Введите пароль" />
                    </div>
                    <div className='item-login'>
                        <button onClick={()=>check(Email, Password, false)}>Войти</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login