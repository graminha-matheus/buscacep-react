import React from 'react';
import './style.css'

import BCRlogo from '../../assets/BCR vazado.png';
import {FcSearch} from 'react-icons/fc';

const Footer = () => {
    return (
        <div className="footer-container">
            <img src={BCRlogo} alt="Logo BCR" className="footer-img"></img>
            <FcSearch size={30}/>
        </div>
    )
}

export default Footer;