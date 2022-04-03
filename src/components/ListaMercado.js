import { React, useState, useEffect } from 'react';
// Importei gerador de id  
import geraId from "react-id-generator";
import '../style/ListaMercado.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faEdit, faCopy } from '@fortawesome/free-regular-svg-icons'


function ListaMercado() {
    const listaInicial = [];
    const [texto, setTexto] = useState('');
    const [lista, setLista] = useState(listaInicial);
    const [indexEdit, setIndexEdit] = useState();

    const input = document.querySelector('#input-lista');
    const btn = document.querySelector('#button-lista');
    const spanBtnCopiar = document.querySelector(".btn-copiar span");

    useEffect(() => {
        // console.log(lista)
    }, [lista])
    function pegaValor(e) {
        setTexto(e.target.value);
        // localStorage.teste = 1;
    }

    function btnClicado() {

        // Ve se tem valor para ser editado, se tiver ele faz essa condição
        if (indexEdit || indexEdit == 0) {
            lista.splice(indexEdit, 1, { nome: texto, id: geraId() });
            setIndexEdit();
            btn.innerText = "Enviar";
            input.value = "";
            setTexto('');
            return;
        }
        //  Seta o valor na lista e depois apaga ele
        if (texto.length > 0) {
            setLista([...lista,
            {
                nome: texto,
                id: geraId()
            }
            ]);
            input.value = "";
            setTexto('');

        }

    }

    function apagaItem(idItem) {

        setLista(lista.filter((item) => {
            //Se o id for igual ao Id clicado, ele nao retorna ele
            // Se nao for igual, ele retorna normalmente
            if (item.id == idItem) {
                return;
            }
            return item;
        }))

    }
    function editarItem(item) {
        // console.log(item);
        const index = lista.findIndex((element) => element.nome === item.nome && element.id == item.id);
        setIndexEdit(index);
        btn.innerText = "Mudar";
        setTexto(item.nome);
        input.value = item.nome;


    }
    function apagarTudo() {
        if (lista.length > 0) {
            setLista(listaInicial);
            input.value = "";
            setTexto('');
        }
    }
    function copiarLista() {
        let listaParaCopia = "";
        lista.forEach((item, index) => {
            if (lista.length == index + 1) {
                // Ultimo item ele tira a virgula 
                listaParaCopia = listaParaCopia + "-" + `${index + 1} ` + `${item.nome} `;

            } else {
                listaParaCopia = listaParaCopia + "-" + `${index + 1} ` + `${item.nome} , `;
            }
        })
        navigator.clipboard.writeText(listaParaCopia);

        spanBtnCopiar.innerText = " copiado!";
        setTimeout(() => {
            spanBtnCopiar.innerText = "";
        }, 2000)

    }
    return (
        <div className='container'>
            <div className="container-form">
                <div className='container-copiar'>
                    <div className="btn-copiar" onClick={copiarLista}>
                        <FontAwesomeIcon icon={faCopy} />
                        <span></span>
                    </div>
                </div>
                <h1>Lista de Mercado</h1>
                <div className='item-enviar'>
                    <input id="input-lista" onChange={(e) => {
                        pegaValor(e);
                    }}></input>
                    <button id="button-lista" onClick={btnClicado}>Enviar</button>
                </div>
                <div className="container-lista">
                    {lista.map((item, key) => {
                        return (
                            <div className='item-lista' key={key}>
                                <span className='item-nome'>
                                    {item.nome}
                                </span>
                                <div className='item-controles'>
                                    <FontAwesomeIcon className="editar" onClick={() => {
                                        editarItem(item);
                                    }} icon={faEdit} />
                                    <FontAwesomeIcon className="excluir" onClick={() => {
                                        apagaItem(item.id);
                                    }} icon={faTrashCan} />
                                </div>
                            </div>
                        );
                    })}


                    <div className='container-clear'>
                        <button onClick={apagarTudo}>Limpar Tudo</button>
                    </div>
                </div>
            </div>

        </div >
    );
};
export default ListaMercado;