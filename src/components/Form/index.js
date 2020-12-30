import React, {useState} from 'react';
import './style.css';

const Form = () => {
    const [search, setSearch] = useState([]);
    const [end, setEnd] = useState([]);
    const [error, setError] = useState(false)
    
    
    const onChangeHandler = event => {
        /* Essa função serve para setar o valor inicial de search para = evento recebido pelo input */
                setSearch(event.target.value) 
    }

    const handlerSubmit = async event => {
        event.preventDefault();
            await fetch(`https://viacep.com.br/ws/${search}/json/`)
            .then(response => response.json())
            .then(data => {
                setEnd(data)
                setError(false)
            }).catch(err => {
                setError(true)
            })
    }

    console.log(end)
    console.log(error)

    return (
        <div>
            <form>
                <input 
                    type="text" 
                    placeholder="CEP"
                    value={search}
                    onChange={onChangeHandler} /* onChange captura o evento específico */
                    >
                </input>

                <span className={error === false ? 'dontshow' : 'show'}>CPF inválido</span>
                
                <button
                    type="submit"
                    onClick={handlerSubmit}
                    >
                        Buscar
                </button>
            </form>
        </div>
    )
}

export default Form;