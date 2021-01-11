import React, {useState} from 'react';

import client from '../../ZAFClient';

import {FaSearch} from 'react-icons/fa';
import './style.css';

const initialValues = {
    'numero': '',
    'complemento': '',    
}

const Form = () => {
    const [search, setSearch] = useState([]);
    const [end, setEnd] = useState([]);
    const [error, setError] = useState(false);
    const [showResponse, setShowResponse] = useState(true);
    const [values, setValues] = useState(initialValues);

    const defaultValues = {
        'rua': end.logradouro,
        'numero': values.numero,
        'complemento': values.complemento,
        'uf': end.uf,
        'localidade': end.localidade,
        'bairro': end.bairro,
        'cep': end.cep
    }

    const onChangeHandler = event => {
        setSearch(event.target.value)
    }

    function onChangeNumber(ev) {
        const numero = ev.target.value;

        setValues({ ...values, numero: numero})
    }

    function onChangeComp(ev) {
        const complemento = ev.target.value;

        setValues({ ...values, complemento: complemento})
    }

    console.log(defaultValues)

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

    const handleData = event => {
        event.preventDefault()
    }

    const submitForm = data => {
        
        let endereco = `\n${data.rua}, ${data.numero}` +
        ((data.complemento) ? `\n${data.complemento},`: '') + // se houver complemento imprime na tela
        `\n${data.localidade} - ${data.uf}` +
        `\n${data.bairro}, ${data.cep}\n`


        client.invoke('comment.appendMarkdown', endereco)
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

                <form className="result-form" onSubmit={handleData}>

                    <input 
                        value={end.logradouro} 
                        name="rua" id="rua" 
                        disabled 
                        className="log-input" 
                    >
                    </input>
                    
                    <div className="dual-input">
                        <input 
                            placeholder="Numero" 
                            name="numero" 
                            id="numero" 
                            className="num-input" 
                            
                            onChange={onChangeNumber}
                        >
                        </input>
                        <input 
                            placeholder="Complemento" 
                            name="complemento" 
                            id="complemento" 
                            
                            onChange={onChangeComp}
                            className="comp-input">
                                
                        </input>
                    </div>

                    <div className="dual-input">
                        <input 
                            value={end.uf} 
                            name="uf" id="uf" 
                            disabled 
                            className="uf-input">
                        </input>

                        <input 
                            value={end.localidade} 
                            name="localidade" 
                            id="localidade" 
                            disabled 
                            className="city-input">
                        </input>
                    </div>

                    <div className="dual-input">
                        <input
                            value={end.bairro} 
                            name="bairro" id="bairro" 
                            disabled 
                            className="bairro-input">
                        </input>

                        <input 
                            value={end.cep}
                            name="cep" 
                            disabled 
                            className="cep-input">
                        </input>
                    </div>

                    <div className="dual-input">
                        <button 
                            onClick={() => setShowResponse(true)} 
                            className="return">
                            Nova Consulta
                        </button>

                        <button 
                            type="submit" 
                            className="handle-submit" 
                            onClick={() => submitForm(defaultValues)}>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form;