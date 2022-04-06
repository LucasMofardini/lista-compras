import { React, useState, useEffect } from 'react';
import '../style/ListaMercado.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faEdit, faCopy } from '@fortawesome/free-regular-svg-icons'


function ListaMercado() {
    const listaInicial = [];
    const [texto, setTexto] = useState('');
    const [lista, setLista] = useState(listaInicial);
    const [indexEdit, setIndexEdit] = useState();
    const [id, setId] = useState();

    const [listaLocalStorageState, setlistaLocalStorageState] = useState(listaInicial);

    const input = document.querySelector('#input-lista');
    const btn = document.querySelector('#button-lista');
    const spanBtnCopiar = document.querySelector(".btn-copiar span");

    useEffect(() => {
        // Primeira vez que uma pessoa entra no site, ele seta o localstorage lista
        if (!localStorage.getItem('lista')) {
            localStorage.setItem('lista', "[]");
        }
        // Puxa os valores do localStorage e seta na lista
        const itens = JSON.parse(localStorage.getItem('lista'));
        setLista(itens);
        // Verifica se o tamanho dos itens vindo do localStorage 
        if (itens.length === 0) {
            // Se não tiver 
            setId(1);
        } else {
            // Retorna só os ids 
            const idsItens = itens.map((item) => {
                return item.id;
            });

            // Pega o maior valor do array de ids
            const ultimoId = Math.max(...idsItens);
            console.log(ultimoId);
            //Pega o ultimo Id e acrescenta 1 
            setId(ultimoId + 1);

        }



    }, [listaLocalStorageState]);


    function pegaValor(e) {
        setTexto(e.target.value);

    }

    function btnClicado() {

        // Ve se tem valor para ser editado, se tiver ele faz essa condição
        if (indexEdit || indexEdit === 0) {
            // Transforma os valores salvos no localStorage em objeto js
            const parseLista = JSON.parse(localStorage.lista);
            // Pega o Index do item a ser alterado e coloca o novo objeto nele
            parseLista.splice(indexEdit, 1, {
                nome: texto,
                id: id
            });
            // Coloca novamente no localStorage
            localStorage.lista = JSON.stringify(parseLista);
            // Seta na lista do local storage
            setlistaLocalStorageState(parseLista);

            // Reseta os campos
            setIndexEdit();
            btn.innerText = "Enviar";
            input.value = "";
            setTexto('');
            return;
        }

        setaNoLocalStorageOItem();
        input.value = "";
        setTexto('');


    }
    function setaNoLocalStorageOItem() {
        if (input.value.length) {
            const parseLista = JSON.parse(localStorage.lista);
            localStorage.lista = JSON.stringify([...parseLista,
            {
                nome: texto,
                id: id
            }
            ]);

            setlistaLocalStorageState(parseLista);

        }

    }

    function apagaItem(idItem) {
        const parseLista = JSON.parse(localStorage.lista);
        const listaItemApagado = parseLista.filter((item) => {
            //Se o id for igual ao Id clicado, ele nao retorna ele
            // Se nao for igual, ele retorna normalmente
            if (item.id === idItem) {
                return null;
            }
            return item;
        });

        localStorage.lista = JSON.stringify(listaItemApagado);
        setlistaLocalStorageState(listaItemApagado);


    }
    function editarItem(item) {
        const index = lista.findIndex((element) => {
            return element.id === item.id;
        }
        );
        // console.log(item);

        setIndexEdit(index);

        btn.innerText = "Mudar";
        setTexto(item.nome);
        input.value = item.nome;


    }
    function apagarTudo() {

        localStorage.lista = "[]";
        setlistaLocalStorageState(listaInicial);

        input.value = "";
        setTexto('');


    }
    function copiarLista() {
        let listaParaCopia = "";
        lista.forEach((item, index) => {
            if (lista.length === index + 1) {
                // Ultimo item ele tira a virgula 
                listaParaCopia = listaParaCopia + "-" + (index + 1) + " " + (item.nome) + ".";

            } else {
                listaParaCopia = listaParaCopia + "-" + (index + 1) + " " + (item.nome) + ", ";
            }
        })
        navigator.clipboard.writeText(listaParaCopia);

        spanBtnCopiar.innerText = " copiado!";
        setTimeout(() => {
            spanBtnCopiar.innerText = "";
        }, 2000)

    } return (
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
                    {lista.length ? lista.map((item, key) => {
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
                    }) :
                        <div className="container-no-itens">
                            <span> Sem Itens! </span>
                        </div>

                    }


                    <div className='container-clear'>
                        <button onClick={apagarTudo}>Limpar Tudo</button>
                    </div>
                </div>
            </div>

        </div >
    );
};
export default ListaMercado;
