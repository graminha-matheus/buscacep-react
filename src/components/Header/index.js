import React from 'react';
import './style.css';

import Lupa from '../../assets/lupa2.png'

const Header = () => {
    return (
        <div>
            <img src={Lupa} alt="busca cep logo"></img>
        </div>
    )
}

export default Header;