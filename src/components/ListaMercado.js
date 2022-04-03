import React from 'react';
import '../style/ListaMercado.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons'


function ListaMercado() {
    return (
        <div className='container'>
            <div className="container-form">
                <h1>Lista de Mercado</h1>
                <div className='item-enviar'>
                    <input id="input-lista"></input>
                    <button id="button-lista">Enviar</button>
                </div>
                <div className="container-lista">
                    <div className='item-lista'>
                        <span className='item-nome'>
                            Banana
                        </span>
                        <div className='item-controles'>
                            <FontAwesomeIcon id="editar" icon={faEdit} />
                            <FontAwesomeIcon id="excluir" icon={faTrashCan} />
                        </div>
                    </div>
                    <div className='item-lista'>
                        <span className='item-nome'>
                            Melancia
                        </span>
                        <div className='item-controles'>
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>

                    <div className='container-clear'>
                        <button>Limpar Tudo</button>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default ListaMercado;