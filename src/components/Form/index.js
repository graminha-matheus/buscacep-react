import React, {useEffect, useState} from 'react';
import './style.css';

const Form = () => {
    const [search, setSearch] = useState([]);
    const [end, setEnd] = useState([]);
    const [isWarningVisible] = useState(false)
    
    const onChangeHandler = event => {
        /* Essa função serve para setar o valor inicial de search para = evento recebido pelo input */
                setSearch(event.target.value) 
    }

    const handlerSubmit = async event => {
        event.preventDefault();
            await fetch(`https://viacep.com.br/ws/${search}/json/`)
            .then(function(response) {
            
                useEffect(() => {
                    if(response.erro === true) {
                        document.body.classList.toggle('form-error', isWarningVisible);
                    } else {
                        response.json().then(data => {
                            setEnd(data)
                        })
                    } 
                    }, [isWarningVisible])
            
            })
    }

    console.log(end)

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

                <span className="form-error">CPF inválido</span>
                
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