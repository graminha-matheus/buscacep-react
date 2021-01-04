import React, {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import './style.css';

const Form = () => {
    const [search, setSearch] = useState([]);
    const [end, setEnd] = useState([]);
    const [error, setError] = useState(false);
    const [showResponse, setShowResponse] = useState(true);
    
    const onChangeHandler = event => {
        setSearch(event.target.value) 
    }
    
    const handlerSubmit = async event => {
        event.preventDefault();
            await fetch(`https://viacep.com.br/ws/${search}/json/`)
            .then(response => response.json())
            .then(data => {
                setEnd(data)
                setError(false)
                setShowResponse(false)
            }).catch(err => {
                setError(true)
            })
    }

    return (
        <div>
            <form className="searchform">
                <input 
                    type="text" 
                    placeholder="CEP"
                    value={search}
                    onChange={onChangeHandler}
                    >
                </input>

                <button
                    type="submit"
                    onClick={handlerSubmit}
                    >
                        <FaSearch size="20"></FaSearch>
                </button>
            </form>

            <div className="div-span">
                <span className={error === false ? 'dontshow' : 'show'}>CPF inválido</span>
            </div>

            <div className={showResponse === true ? 'dont-show-response' : 'show-response'}>
                <form className="result-form">
                    <input value={end.logradouro} disabled className="log-input"></input>
                    
                    <div className="dual-input">
                        <input placeholder="Numero" className="num-input"></input>
                        <input placeholder="Complemento"className="comp-input"></input>
                    </div>

                    <div className="dual-input">
                        <input value={end.uf} disabled className="uf-input"></input>
                        <input value={end.localidade} disabled className="city-input"></input>
                    </div>

                    <div className="dual-input">
                        <input value={end.bairro} disabled className="bairro-input"></input>
                        <input value={end.cep} disabled className="cep-input"></input>
                    </div>

                    <button type="submit" onClick={() => setShowResponse(true)}>Nova Consulta</button>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Form;